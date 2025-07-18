---
title: Correlate LLM Observability with RUM
further_reading:
  - link: "llm_observability/sdk"
  - tag: "Documentation"
  - text: "LLM Observability SDK Reference"
algolia:
  tags: ['llmobs', 'ai agents', 'llm']
---

# Overview
Correlate RUM and LLM Observability sessions to gain more visibility on how your web application interacts with AI Agents.

The link between RUM and LLM Observability is created by forwarding the RUM Session ID to the LLM Observability SDK.

# Setup

## Step 1: Configure your RUM Browser SDK

Ensure your RUM Browser SDK is properly initialized in your web application. For detailed setup instructions, see the [RUM Browser Setup Guide][1].

**On the client**

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  /* RUM Browser SDK configuration */
});


/**
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

**On the server**

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

Use the LLMObs SDK to instrument your agent and tools and let the LLMObs SDK what the session_id should be.

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

# Navigating between RUM and LLM observability
You can access the LLM Traces associated with your RUM Session right from the RUM Session Side Panel by clicking the `LLM Traces` button in the side panel header.

Similarly, on an LLM Trace you can access the matching RUM Session replay.
