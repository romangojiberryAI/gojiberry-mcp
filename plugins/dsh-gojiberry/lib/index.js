/**
 * dsh-gojiberry provider plugin.
 *
 * Provides the `gojiberry` service so the bundle's cordis.patch.yml can point
 * one `@deepseek-ai/dsh-mcp-client` row at the Gojiberry MCP server without
 * putting the API key in configuration: the mcp-client row injects `gojiberry`
 * and reads `ctx.gojiberry.url` / `ctx.gojiberry.headers` in its `!!js` config.
 *
 * It also registers the `gojiberry` skill on `ctx.skills` (when a skills
 * service is mounted).
 *
 * Named exports only (no default export): a stray default export makes the
 * Loader collapse the namespace and drop `inject`/`apply`.
 */
import z from '@deepseek-ai/schemastery'
import { SKILL_CONTENT, SKILL_DESCRIPTION, SKILL_NAME } from './skill.js'

/** Stable Cordis plugin name. */
export const name = 'dsh-gojiberry'

/** Service provided by this plugin and injected by the mcp-client row. */
export const GOJIBERRY_SERVICE = 'gojiberry'

/** Default Gojiberry MCP host. The endpoint path is `/mcp`. */
export const DEFAULT_BASE_URL = 'https://mcp.gojiberry.ai'

export const Config = z.object({
  /** Environment variable that holds the Gojiberry API key. */
  apiKeyEnv: z.string().default('GOJIBERRY_API_KEY'),
  /** Inline API key. Prefer `apiKeyEnv`; this exists for patch-level overrides. */
  apiKey: z.string().role('secret').default(''),
  /** Gojiberry MCP host. The endpoint is `<baseUrl>/mcp`. */
  baseUrl: z.string().default(DEFAULT_BASE_URL),
  /** Register the `gojiberry` workflow skill on `ctx.skills`. */
  skill: z.boolean().default(true),
})

/**
 * Resolve the connection values from config and environment.
 *
 * @param {object} config - validated plugin config.
 * @param {Record<string, string | undefined>} env - environment to read the key from.
 * @returns {{ url: string, headers: Record<string, string>, configured: boolean, source: string }}
 */
export function resolveConnection(config, env = process.env) {
  const base = String(config?.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '')
  const url = base.endsWith('/mcp') ? base : `${base}/mcp`
  const envName = String(config?.apiKeyEnv || 'GOJIBERRY_API_KEY')
  const inline = String(config?.apiKey || '').trim()
  const fromEnv = String(env[envName] || '').trim()
  const key = inline || fromEnv
  const source = inline ? 'config.apiKey' : fromEnv ? `env.${envName}` : 'none'
  return {
    url,
    headers: key ? { Authorization: `Bearer ${key}` } : {},
    configured: key.length > 0,
    source,
  }
}

/**
 * @param {object} ctx - plugin context.
 * @param {object} config - validated plugin config.
 */
export function apply(ctx, config) {
  const cfg = Config(config ?? {})
  const conn = resolveConnection(cfg)
  const log = ctx.logger ?? console

  if (conn.configured) {
    log.info?.(`dsh-gojiberry: Gojiberry MCP endpoint ${conn.url} (key from ${conn.source})`)
  } else {
    log.warn?.(
      `dsh-gojiberry: no Gojiberry API key found — set ${cfg.apiKeyEnv} (app.gojiberry.ai → Settings → API) ` +
        `or \`apiKey\` on the \`gojiberry\` row; the gojiberry-mcp row will connect to ${conn.url} without credentials and register no tools.`,
    )
  }

  // Plain, unfrozen values on purpose: the mcp-client row validates the
  // interpolated `headers` with schemastery, which rejects frozen objects.
  // The getter hands every evaluation its own copy.
  ctx.provide(GOJIBERRY_SERVICE, {
    url: conn.url,
    get headers() {
      return { ...conn.headers }
    },
    configured: conn.configured,
  })

  if (cfg.skill) {
    ctx.inject(['skills'], (sctx) => {
      if (typeof sctx.skills?.register !== 'function') return
      sctx.skills.register({
        name: SKILL_NAME,
        description: SKILL_DESCRIPTION,
        content: SKILL_CONTENT,
        source: 'runtime',
        invocation: { modelInvocable: true, userInvocable: true },
      })
    })
  }
}
