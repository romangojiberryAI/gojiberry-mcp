/**
 * The `gojiberry` skill registered on `ctx.skills`.
 *
 * Teaches the agent how to use the tools the sibling `gojiberry-mcp` row
 * exposes as `mcp__gojiberry__*`. The live tool list comes from the server.
 */

export const SKILL_NAME = 'gojiberry'

export const SKILL_DESCRIPTION =
  'Search Gojiberry contacts, lists, campaigns, lead-finding agents, and the Unibox. Use when the user wants pipeline data, warm leads, outreach status, or a reply drafted from their inbox. Confirm before any write, credit spend, or sent message.'

export const SKILL_CONTENT = `# Gojiberry

Gojiberry is a B2B prospecting workspace. The \`mcp__gojiberry__*\` tools talk
to the user's account. Call only tools the server actually exposes. Do not
invent a tool name, field, or filter.

A list holds contacts. Adding a contact to a list enrolls them in the campaign
linked to that list. A lead-finding agent imports leads into its list. A
campaign runs outreach (LinkedIn, email) on the contacts of its lists.

## Read freely

These tools are read-only. Use them to answer questions:

- \`mcp__gojiberry__list_contacts\` and \`mcp__gojiberry__get_contact\`
- \`mcp__gojiberry__list_lists\`
- \`mcp__gojiberry__list_campaigns\` and \`mcp__gojiberry__get_campaign\`
- \`mcp__gojiberry__list_agents\` and \`mcp__gojiberry__get_agent_logs\`
- \`mcp__gojiberry__get_intent_type_counts\`
- \`mcp__gojiberry__list_unibox_threads\` and \`mcp__gojiberry__get_unibox_thread_messages\`

If a name is missing from the connected server, skip it and use the tools that
are present.

## Confirm before you change anything

Show the exact change and wait for an explicit yes before calling:

- \`mcp__gojiberry__create_contact\`, \`mcp__gojiberry__update_contact\`
- \`mcp__gojiberry__create_list\`, \`mcp__gojiberry__add_contacts_to_list\`,
  \`mcp__gojiberry__remove_contacts_from_list\`
- \`mcp__gojiberry__update_campaign\`
- \`mcp__gojiberry__enrich_contact_email\` — spends 1 credit when it succeeds
- \`mcp__gojiberry__send_unibox_linkedin_message\` — sends a LinkedIn reply in
  an existing thread

Never send a message, enroll contacts, or spend a credit because the task
implied it. Draft the text, show it, and stop until the user confirms.

## Setup

The tools are missing when no API key is configured. The key comes from
\`GOJIBERRY_API_KEY\` (app.gojiberry.ai → Settings → API → Create API Key).
The key is shown once. It is sent as \`Authorization: Bearer <key>\` to
\`https://mcp.gojiberry.ai/mcp\`.
`
