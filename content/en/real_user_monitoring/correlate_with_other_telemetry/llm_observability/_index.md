---
title: Correlate LLM Observability with RUM
description: "Connect RUM sessions with LLM Observability to track user interactions with AI agents and understand the complete user journey."
further_reading:
  - link: "/llm_observability/sdk"
    tag: "Documentation"
    text: "LLM Observability SDK Reference"
algolia:
  tags: ['llmobs', 'ai agents', 'llm']
---

## Overview
Correlate RUM and LLM Observability sessions to gain more visibility on how your web application interacts with AI Agents. This correlation helps you understand the complete user journey by connecting frontend user interactions with backend AI processing.

The link between RUM and LLM Observability is created by forwarding the RUM Session ID to the LLM Observability SDK.

## Prerequisites

Before you begin, ensure you have:
- [RUM Browser SDK][1] installed and configured in your web application
- [LLM Observability SDK][2] installed in your backend service
- Datadog account with [RUM][3] and [LLM Observability][4] enabled
- AI Agent endpoint that your web application can call

## Setup
### Step 1: Configure your RUM Browser SDK

Ensure your RUM Browser SDK is properly initialized in your web application. For detailed setup instructions, see the [RUM Browser Setup Guide][1].

You need to send your RUM Session ID in every call from your web application to an AI Agent. See examples below.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  /* RUM Browser SDK configuration */
});
```

### Step 2: Modify your frontend AI calls

Update your web application to include the RUM Session ID in every call to your AI Agent. For more information about RUM session management, see the [RUM Browser Documentation][3].

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

Modify your server-side code to extract the session ID and pass it to the LLM Observability SDK. For detailed LLM Observability setup, see the [LLM Observability Setup Guide][4].

```python
# Read the session_id from the incoming request
class MessagesHandler:
    def __init__(self, handler):
        try:
            post_data = handler.rfile.read(content_length)

            # Parse the JSON message
            message_data = json.loads(post_data.decode('utf-8'))
            message = message_data.get('message', '')

            # Read the session_id
            current_session_id = message_data.get('session_id', None)

            # Call AI Agent and pass the session_id
            await agent_loop(
                messages=messages,
                model="claude-3-7-sonnet-20250219",
                provider="anthropic",
                api_key=os.getenv("ANTHROPIC_API_KEY"),
                max_tokens=4096,
                session_id=current_session_id,
                # Other kwargs your agent might need
            )
        except Exception as e:
            handler.send_error(500, str(e))
```

Use the LLMObs SDK to instrument your agent and tools and tell the LLMObs SDK what the `session_id` should be.

### Step 4: Instrument your AI agent

Use the LLM Observability SDK to instrument your agent and associate it with the RUM session. For detailed reference, see the [LLM Observability SDK documentation][4].
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

## Navigating between RUM and LLM Observability
After configuration is complete, you can navigate between correlated data:

- **From RUM to LLM**: In a RUM session, click the "LLM Traces" button in the side panel header to view associated AI interactions.
- **From LLM to RUM**: In an LLM trace, click the "RUM Session" link to view the corresponding user session replay.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/
[2]: /llm_observability/setup/
[3]: /real_user_monitoring/application_monitoring/browser/
[4]: /llm_observability/
