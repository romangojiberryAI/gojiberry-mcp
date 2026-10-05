---
name: gojiberry
description: Search Gojiberry contacts, lists, campaigns, lead-finding agents, and the Unibox. Use when the user asks about leads, outreach, pipeline, or inbox replies. Confirm before any write, credit spend, or sent message.
---

# Gojiberry

Gojiberry is a B2B prospecting workspace. Call the hosted MCP server at `https://mcp.gojiberry.ai/mcp` with the header `Authorization: Bearer $GOJIBERRY_API_KEY`.

The key comes from app.gojiberry.ai → Settings → API → Create API Key. It is shown once. If `GOJIBERRY_API_KEY` is missing, ask the user to set it and stop.

Call only tools the server actually exposes. Do not invent a tool name, field, or filter.

A list holds contacts. Adding a contact to a list enrolls them in the campaign linked to that list. A lead-finding agent imports leads into its list. A campaign runs outreach on the contacts of its lists.

## Read freely

- `list_contacts`, `get_contact`
- `list_lists`
- `list_campaigns`, `get_campaign`
- `list_agents`, `get_agent_logs`
- `get_intent_type_counts`
- `list_unibox_threads`, `get_unibox_thread_messages`

If a name is missing from the connected server, skip it and use the tools that are present.

## Confirm before you change anything

Show the exact change and wait for an explicit yes before calling:

- `create_contact`, `update_contact`
- `create_list`, `add_contacts_to_list`, `remove_contacts_from_list`
- `update_campaign`
- `enrich_contact_email` — spends 1 credit when it succeeds
- `send_unibox_linkedin_message` — sends a LinkedIn reply in an existing thread

Never send a message, enroll contacts, or spend a credit because the task implied it. Draft the text, show it, and stop until the user confirms.
