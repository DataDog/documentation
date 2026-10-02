---
title: Correlate Agent Observability with RUM
description: "Connect RUM sessions with Agent Observability to track user interactions with AI agents from the frontend to backend AI processing."
aliases:
- /real_user_monitoring/correlate_with_other_telemetry/llm_observability/
further_reading:
  - link: "/llm_observability/instrument/sdk/"
    tag: "Documentation"
    text: "Agent Observability SDK Reference"
algolia:
  tags: ['llmobs', 'ai agents', 'llm']
---

## Overview

Correlate RUM and Agent Observability sessions to gain more visibility on how your web application interacts with AI Agents. This correlation connects frontend user interactions with backend AI processing.

The link between RUM and Agent Observability is created by forwarding the RUM Session ID to the Agent Observability SDK.

## Prerequisites

Before you begin, you need:

- [RUM Browser SDK][1] installed and configured in your web application
- [Agent Observability SDK][2] installed in your backend service
- Datadog account with [RUM][3] and [Agent Observability][4] enabled
- AI Agent endpoint that your web application can call

## Setup

### Step 1: Configure your RUM Browser SDK

Initialize the RUM Browser SDK in your web application. For detailed setup instructions, see the [RUM Browser Setup Guide][1].

You need to send your RUM Session ID in every call from your web application to an AI Agent. See examples below.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  /* RUM Browser SDK configuration */
});
```

### Step 2: Modify your frontend AI calls

Update your web application to include the RUM Session ID in every call to your AI Agent. For more information about RUM session management, see [Manage Sessions][3].

```javascript
 /**
 * Example call to an AI Agent.
 *
 * We send the `session_id` in the body of the request. If the call to the AI agent
 * needs to be a GET request, the `session_id` can be sent as a query param.
 */
 const response = await fetch("/ai-agent-endpoint", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message, session_id: datadogRum.getInternalContext().session_id }),
});
```

### Step 3: Update your backend handler

Modify your server-side code to extract the session ID and pass it to the Agent Observability SDK. For detailed Agent Observability setup, see the [Agent Observability Setup Guide][5].

```python
# Read the session_id sent by the web application
message_data = json.loads(request_body)
session_id = message_data.get("session_id")

# Pass the session_id to your AI agent
await agent_loop(
    message=message_data.get("message", ""),
    session_id=session_id,
    # Other arguments your agent needs
)
```

Use the Agent Observability SDK to instrument your agent and tools, and pass it the `session_id`.

### Step 4: Instrument your AI agent

Use the Agent Observability SDK to instrument your agent and associate it with the RUM session. For detailed reference, see the [Agent Observability SDK documentation][6].

```python
async def agent_loop(
    session_id,
    # Other kwargs
):
    LLMObs.annotate(
        span=None,
        tags={"session_id": session_id},
    )
    # Rest of your agent code
```

## Navigating between RUM and Agent Observability

After configuration is complete, you can navigate between correlated data:

- **From RUM to LLM**: In a RUM session, click the {{< ui >}}LLM Traces{{< /ui >}} button in the side panel header to view associated AI interactions.
- **From LLM to RUM**: In an LLM trace, click the {{< ui >}}RUM Session{{< /ui >}} link to view the corresponding user session replay.

## Next step

Continue to [Correlate RUM and Frontend Logs](/real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/logs/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/setup/install/?platform=browser
[2]: /llm_observability/instrument/
[3]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=browser
[4]: /llm_observability/
[5]: /llm_observability/instrument/
[6]: /llm_observability/instrument/sdk/
