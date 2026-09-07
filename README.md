# Gojiberry AI for Cursor

Official Cursor plugin for the hosted Gojiberry MCP server.

It lets the agent work in your live Gojiberry workspace: contacts, lists, campaigns, lead-finding agents, and Unibox conversations.

- MCP endpoint: https://mcp.gojiberry.ai/mcp
- Product docs: https://help.gojiberry.ai/en/articles/14540015-using-the-gojiberry-mcp-server
- API docs: https://ext.gojiberry.ai/documentation

## Install from the Cursor Marketplace

1. Open Cursor Settings → Customize (or browse cursor.com/marketplace).
2. Search for Gojiberry AI.
3. Install the plugin and approve the OAuth prompt.
4. Sign in with your Gojiberry account at https://app.gojiberry.ai

No API key is required when OAuth completes.

## Manual install

Add this to ~/.cursor/mcp.json:

{
  "mcpServers": {
    "gojiberry": {
      "url": "https://mcp.gojiberry.ai/mcp"
    }
  }
}

Or use a personal API key from app.gojiberry.ai → Settings → API:

{
  "mcpServers": {
    "gojiberry": {
      "url": "https://mcp.gojiberry.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}

## What you can ask

**Contacts** — search, view, add, update, pause outreach, intent breakdown.
**Lists** — create lists and enroll/remove contacts (this is how campaigns get people).
**Campaigns** — browse campaigns and inspect steps.
**Agents** — list and refine ICP targeting.
**Unibox** — pull LinkedIn and email threads.

## Example prompts

- Show me my 20 most qualified contacts from this month.
- Pause Marie Dupont's outreach.
- Add contacts 1234 and 5678 to my Q2 Outbound list.
- Refine my ICP: Heads of Sales in SaaS, 50–200 employees, France.
- Create a list called AI founders linked to my AI outbound campaign.
- What did I last say to John Smith?

## License

MIT
