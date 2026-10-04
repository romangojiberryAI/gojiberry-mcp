# dsh-gojiberry

DeepSeek Harness (`dsh`) plugin for [Gojiberry](https://gojiberry.ai). It connects the agent to the Gojiberry MCP server so it can search contacts, manage lists and campaigns, inspect lead-finding agents, and read the Unibox.

## Install

```bash
dsh plugin --profile web add dsh-gojiberry
```

Copy an API key from **app.gojiberry.ai → Settings → API → Create API Key** and export it before starting dsh, or put it in `$DSH_HOME/.env`:

```bash
export GOJIBERRY_API_KEY=your-api-key
dsh web
```

Restart the profile after installing. Ask the agent *"List my Gojiberry contacts"* to verify the connection.

## What you get

The bundle mounts two rows:

| Row | Package | Role |
|---|---|---|
| `gojiberry` | `dsh-gojiberry` (this package) | Reads the API key, exposes `ctx.gojiberry` (`url`, `headers`), and registers the `gojiberry` skill. |
| `gojiberry-mcp` | `@deepseek-ai/dsh-mcp-client` (shipped with dsh) | Connects to `https://mcp.gojiberry.ai/mcp` over streamable HTTP with a `Bearer` header and registers the server's tools. |

The model sees the tools under `mcp__gojiberry__*`. The list comes from the server at connect time. Read-only tools can be used directly. Writes, email enrichment (1 credit), and LinkedIn sends wait for an explicit confirmation.

## Configuration

Override the `gojiberry` row in `$DSH_HOME/profiles/web/cordis.patch.yml`:

```yaml
- id: gojiberry
  config:
    apiKeyEnv: GOJIBERRY_API_KEY
    baseUrl: https://mcp.gojiberry.ai
    skill: true
```

| Field | Default | Description |
|---|---|---|
| `apiKeyEnv` | `GOJIBERRY_API_KEY` | Environment variable read at boot for the API key. |
| `apiKey` | `''` | Inline key. Prefer the env var. |
| `baseUrl` | `https://mcp.gojiberry.ai` | Host. The MCP endpoint is `/mcp`. |
| `skill` | `true` | Register the `gojiberry` skill on `ctx.skills`. |

Without a key the `gojiberry` row logs a warning, and the `gojiberry-mcp` row registers no tools. dsh keeps booting.

## Development

```bash
cd dsh-gojiberry
npm install
npm test
```

Link a local checkout into a profile:

```bash
dsh plugin --profile web add /absolute/path/to/dsh-gojiberry
```

## License

MIT
