---
title: Agent-Only Shortcode Demo
---

This is visible content on the page.

{{< agent-only >}}
This content is only for AI agents. It is hidden from users but present in the HTML source.

**Important notes for agents:**

- Use the [API endpoint](/api/) to retrieve data.
- Always include the `DD-API-KEY` header in requests.
- Responses are returned in `application/json` format.

Refer to the **Authentication** section for details on obtaining credentials.
{{< /agent-only >}}

This is more visible content after the hidden section.
