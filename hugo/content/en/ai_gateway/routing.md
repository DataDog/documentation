---
title: Route Requests with AI Gateway
description: Create stable model aliases, split traffic by session, let a decision model pick destinations, and configure fallbacks with AI Gateway routing rules.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/llm_observability/instrument/sdk/#tracking-user-sessions"
    tag: "Documentation"
    text: "Track user sessions in Agent Observability"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

A routing rule gives callers a stable `router/<RULE_SLUG>` model value while the rule selects the destination. Use a routing rule to change models or providers without changing application code, and to add fallback destinations.

## Create a routing rule

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Routing{{< /ui >}}][7] and click {{< ui >}}New routing rule{{< /ui >}}.
2. Enter a slug using lowercase letters, numbers, and hyphens, up to 128 characters. You cannot change the slug after you create the rule. The page shows the resulting `router/<RULE_SLUG>` identifier.
3. Configure the first routing step. Select one model, use {{< ui >}}Weighted{{< /ui >}} to assign traffic shares across [sessions](#sessions), use {{< ui >}}Smart{{< /ui >}} to let a decision model pick a destination for each session (see [Smart routing steps](#smart-routing-steps)), or select {{< ui >}}Another route{{< /ui >}} to link a routing rule. A model destination can use a specific provider account or any configured provider that serves that model.
4. Optional: Add fallback steps in priority order.
5. Review the {{< ui >}}Access{{< /ui >}} stage and choose who can call the routing rule. The default, {{< ui >}}Decide later{{< /ui >}}, grants no access: requests to the rule return HTTP `403` with `no_permitted_target` until an access policy includes the rule. See [Control model access](/ai_gateway/access_control/).
6. Review and save the rule, then copy its identifier into the `model` field of your requests.

Configure [data capture](/ai_gateway/security/#configure-data-capture) through organization defaults and scoped overrides under {{< ui >}}Policies{{< /ui >}}.

## Model served by any provider

A model served by any configured provider considers all enabled providers in your organization that serve that model. A caller who has access to the routing rule can use every provider the rule reaches, without direct access to those models. To let callers use a model only through a routing rule, for example one that limits reasoning effort, grant [access](/ai_gateway/access_control/) to the rule and not to the model. AI Gateway tries the providers in slug order and sends each one its provider model ID.

## Fallback behavior

AI Gateway tries the next provider or fallback destination when the current one cannot serve the request or returns HTTP `401`, `402`, `403`, `408`, `429`, or `5xx`. A successful response, or any other `4xx` response (such as `400`, `404`, or `422`), is returned to the caller. If every attempt returns one of the fallback statuses, the caller receives the last of those responses. If no destination can serve the request, the request fails.

Fallback applies before a response starts. If a streamed response fails after it has started, AI Gateway does not retry it on another destination.

[Budgets](/ai_gateway/spend_controls/#set-budgets) in Block mode are checked per destination. If a budget blocks one destination, AI Gateway falls back to the next. If budgets block every destination, AI Gateway returns HTTP `402` until the budget window resets.

[Rate limits](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode are also checked per destination. A rate limit scoped to one model or provider makes AI Gateway fall back to the next destination. A rate limit that matches every destination, such as an organization-wide limit, returns HTTP `429`.

If destinations are blocked for different reasons, such as a budget on one and a rate limit on another, AI Gateway returns HTTP `400` with `no_eligible_target`.

## Smart routing steps

A {{< ui >}}Smart{{< /ui >}} step lets a decision model choose the destination for each session based on the user's first request. For example, send quick questions to a fast, low-cost model and complex coding work to a stronger one.

### Create a Smart step

1. In a routing rule's first step, select {{< ui >}}Smart{{< /ui >}}. A rule can have one Smart step, and it must be the first.
2. Under {{< ui >}}Classifier{{< /ui >}}, select a {{< ui >}}Decision model{{< /ui >}} and its account. The list shows models that support a [decision API](/ai_gateway/requests/#native-gemini-and-decision-apis).
3. Optional: Add a {{< ui >}}Context prompt{{< /ui >}} that tells the decision model about the traffic, such as who sends it and how to choose between destinations.
4. Add 1 to 9 destinations. For each, select a model, one account, and an optional reasoning level, and write a rubric of up to 300 characters that says when to pick it, for example "quick factual questions and short rewrites."
5. Select the {{< ui >}}Catch-all destination{{< /ui >}} and set the {{< ui >}}Confidence threshold{{< /ui >}}.
6. Use {{< ui >}}Try it{{< /ui >}} to see which destination sample messages would get, and with what confidence.
7. Optional: Add fallback steps.

### How a Smart step chooses a destination

When a request reaches the Smart step, AI Gateway sends the decision model the user messages of the conversation's opening turn, the context prompt, and the rubrics. Notes that coding agents add to user messages are removed first. The decision model picks one destination, or none.

AI Gateway uses the catch-all destination when the decision model picks none of the destinations, when the pick's confidence is below the threshold, or when the decision model errors, refuses, or times out.

A Smart step decides once per session. [Session pinning](#session-pinning) keeps the session on the destination that served it, so later requests skip the decision model. Subagents start on their main session's destination. A request without a session ID is identified by its [prompt fingerprint](#requests-without-a-session-id), so a Smart step still decides once per conversation. OpenAI Responses requests that continue stored history have no fingerprint, so without a session ID each of them is classified again.

If the picked destination fails, AI Gateway tries the catch-all destination, then the fallback steps. It never tries destinations the decision model did not pick.

Decision calls run on your provider account and count toward your [budgets and rate limits](/ai_gateway/spend_controls/). The request's spans in Agent Observability record the decision in `classified_routing.*` tags: the outcome, the chosen destination, and its confidence.

## Sessions

A session is the set of requests that belong to one conversation or one agent run. A routing rule uses each request's session to keep the conversation on one destination, so the provider's prompt cache stays warm and turns that depend on provider-side state reach the destination that holds it:

- A [weighted routing step](#weighted-routing-steps) splits sessions between destinations, not individual requests.
- A [Smart routing step](#smart-routing-steps) chooses a destination once per session.
- [Session pinning](#session-pinning) remembers the destination that served the session and sends its later requests there.

AI Gateway also groups a session's requests as one session in Agent Observability. See [Observe AI Gateway Activity](/ai_gateway/observability/).

Send a session ID with the `x-session-id` request header. Claude Code, Codex, and several other coding agents send their own session IDs, so you do not need to set the header for them. Without any session ID, AI Gateway identifies the conversation by a [prompt fingerprint](#requests-without-a-session-id).

### Set the session for a request

Add the `x-session-id` header with a value that identifies the conversation, and send the same value on every request of that conversation:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
  -H "x-session-id: 3f6c1e9a-8d2b-4c4e-9a31-5b7d0e2f4a18" \
  -d '{"model": "router/<RULE_SLUG>", "messages": [{"role": "user", "content": "Woof!"}]}'
```

A valid session ID:

- Is 1 to 256 bytes long after leading and trailing spaces and tabs are removed.
- Is valid UTF-8 and contains no ASCII control characters.
- Is sent in exactly one `x-session-id` header. If a request repeats the header, AI Gateway ignores all its values, even if they are identical.

AI Gateway treats a session ID as an opaque value. It does not split the value on commas, and it does not forward the `x-session-id` header to the model provider.

Session IDs are scoped to your Datadog organization. Within an organization, every request that sends the same session ID belongs to the same session, whoever sends it. Use a value that is unique to the conversation, such as a UUID, rather than a user name or a fixed string.

### Session signals

AI Gateway reads the session from the first valid signal in the following order:

| Order | Signal | Sent by |
|---|---|---|
| 1 | `x-session-id` header | Your application, OpenCode 1.17 and later, Kilo Code 7, and clients that follow OpenRouter's `x-session-id` convention |
| 2 | `x-claude-code-session-id` header. For a subagent, combined with the `x-claude-code-agent-id` header. | Claude Code, including applications built with the Claude Agent SDK |
| 3 | `client_metadata.session_id` in the request body, or `client_metadata.thread_id` when `session_id` is absent. OpenAI Responses requests only. | Codex |
| 4 | `x-dd-tag-client_session_id` header, sent exactly once | Any client |
| 5 | `x-session-affinity` header | OpenCode 1.4 to 1.16, Kilo Code 7, and, when the model's `compat.sendSessionAffinityHeaders` option is set, pi and OpenClaw on OpenAI Chat Completions and Anthropic Messages requests |
| 6 | `session-id` header, or `session_id` header when `session-id` is absent or invalid. OpenAI Responses requests only. | pi, the OpenAI providers of Roo Code and OpenCode, and OpenClaw when the model's `compat.sendSessionIdHeader` option is set |
| 7 | `x-litellm-session-id` header | OpenHands SDK |

Header signals follow the same rules as `x-session-id`: each must be sent exactly once, with a valid value. A missing or invalid signal does not reject the request. AI Gateway ignores it and checks the next signal. AI Gateway does not read `x-client-request-id`, because that header identifies a single request rather than a session.

The same value produces the same session, whichever signal carries it. For example, `x-session-id: abc` and `x-dd-tag-client_session_id: abc` name the same session.

Notes on specific clients:

- **Claude Code** sends `x-claude-code-session-id` on every request of a session, including background requests. Subagent requests keep the parent's session ID and add `x-claude-code-agent-id`, so each subagent has its own session for routing and pinning. In Agent Observability, subagent requests appear in the parent's session.
- **Codex** keeps the same `client_metadata.session_id` across a session's turns and when you resume a session, and changes it when you start a new one.
- **Other clients** that can add request headers can send `x-session-id`, for example Qwen Code with its `customHeaders` setting. Use a value that is unique to each conversation: if every conversation sends the same value, they all share one session.

If you set `x-session-id` for a coding agent, for example in Claude Code's `ANTHROPIC_CUSTOM_HEADERS` setting, it takes precedence over the agent's own signal. All requests, including subagent requests, then share that one session.

### Requests without a session ID

If a request carries no valid session signal, AI Gateway identifies its conversation by a fingerprint of how the conversation opens: its tools, system instructions, and first message.

- [Weighted routing steps](#weighted-routing-steps) order destinations by the opening's fingerprint. Every turn of a conversation keeps the same opening, so the conversation stays on one destination.
- [Session pinning](#session-pinning) and [Smart routing steps](#smart-routing-steps) identify the first turn by its opening, and later turns by the opening plus the model's first reply. Conversations that open the same way separate after their first turn. The second turn starts on the destination that served the first.

A fingerprint identifies an opening, not a conversation. Conversations with identical openings share a weighted destination, even when they are unrelated. For example, a batch job that sends the same system prompt and first message for every item sends all of them to the same destination. A change to the opening, such as an added tool or an edited system prompt, produces a new fingerprint, and the conversation can move to another destination. AI Gateway does not store the opening content: the fingerprint is a hash scoped to your organization.

OpenAI Responses requests that continue stored history, with `previous_response_id` or `conversation`, carry only the new turn, so they have no fingerprint. Without a session ID, they use the step's configured order and are not pinned.

The request's span in Agent Observability has no session, unless the request sends an `x-dd-tag-session_id` header. See [Sessions and request tags](#sessions-and-request-tags).

To keep unrelated conversations apart, send each one its own `x-session-id`.

### Opt out of session routing

To route a request without session affinity or session pinning, send the `x-session-id` header with an empty value. With curl, `-H "x-session-id;"` sends an empty header.

An empty `x-session-id` header is different from no header. For routing, AI Gateway does not fall back to any other session signal or to the opening-content fingerprint. Weighted steps use their configured order, and session pinning does not apply.

### Weighted routing steps

In a {{< ui >}}Weighted{{< /ui >}} step of a routing rule, weights divide sessions between destinations, not individual requests. AI Gateway computes an order of the step's destinations from the session and the weights. The same session always gets the same order, so its requests start at the same destination and reuse its prompt cache.

For example, with destination A at weight 70 and destination B at weight 30, about 70% of sessions start at A and 30% start at B. Weights are relative: 7 and 3 produce the same split as 70 and 30. Because each session has its own volume, the split of requests, tokens, or spend can differ from the weights.

When the first destination returns a [fallback status](#fallback-behavior), AI Gateway tries the next destination in the session's order, then the rule's later steps. Without session pinning, the next request of the session starts again at the session's first destination.

Weighted ordering applies to OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, and Gemini requests. Other operations use the step's configured order.

A request without a session ID is ordered by its [prompt fingerprint](#requests-without-a-session-id). To use the step's configured order for a request instead, [opt out of session routing](#opt-out-of-session-routing).

OpenAI Responses requests need a session signal for weighted ordering. Without one, a weighted step uses its configured order, so every such request starts at the first destination listed in the step. The exception is a request that sets `store` to `false` and references no stored state: no `previous_response_id`, no `conversation`, and no input item that references a stored item. Such a request can be ordered by its opening-content fingerprint.

Without session pinning, changes to a weighted step, such as new weights or an added or removed destination, can move active sessions to another destination. Moving a session can cost a prompt-cache miss, or a failed request when the conversation depends on provider-side state.

### Session pinning

Session pinning remembers which destination served a session and sends the session's later requests there. It applies to requests that call a routing rule (`router/<RULE_SLUG>`) and have a session ID or a [prompt fingerprint](#requests-without-a-session-id). Requests to a specific model (`<PROVIDER_SLUG>/<MODEL_ID>`) are not pinned, because they have only one destination.

AI Gateway keeps one record per session, routing rule, and request format. The same session ID used with two routing rules, or with both `/chat/completions` and `/responses`, has a separate record for each.

A record is created by the session's first successful response and expires 4 hours after the session's last successful response. Each successful response resets the 4 hours. Failed requests do not extend or shorten it, and a session that keeps succeeding stays pinned with no maximum duration.

A pinned session is in one of two states:

| State | When | Routing |
|---|---|---|
| Preferred | The session holds no provider-side state. | AI Gateway tries the pinned destination first. If it returns a fallback status, AI Gateway continues through the rule's ordinary order, skipping the pinned destination. |
| Stateful | A request of the session carried or might have created provider-side state. | AI Gateway sends every request of the session to the pinned destination only, and never falls back to another destination. |

A session becomes stateful when a successful request might leave state that only its destination can use, and it stays stateful until its record expires. Examples include:

- OpenAI Responses requests that store responses (`store` is `true` or omitted), reference `previous_response_id`, a `conversation`, or a stored item, or request encrypted reasoning.
- Anthropic Messages requests with extended thinking enabled, or that carry thinking blocks, server web search or code execution tools, a code execution container, or uploaded files.
- Gemini requests with a `thinkingConfig`, thought signatures, a `cachedContent` reference, or a Files API or Cloud Storage file reference.
- Requests that reference uploaded files or stored audio by ID.
- Requests translated between API formats, when AI Gateway returns reasoning state that only the original destination can read.

Most coding agent sessions become stateful after their first response, because coding agents use extended thinking, stored responses, or encrypted reasoning.

#### Pinning, weights, and fallback

- **Weight and order changes**: Changing a routing rule's weights or order does not move pinned sessions. New sessions, and sessions whose record has expired, use the new configuration.
- **Fallback in a preferred session**: If the pinned destination fails and another destination serves the request, the session moves to the destination that served it, where its prompt cache is warm. The session stays there after the original destination recovers, until its record expires or a later fallback moves it again.
- **Errors in a stateful session**: If the pinned destination returns an error, AI Gateway returns that error instead of falling back. A [budget](/ai_gateway/spend_controls/#set-budgets) in Block mode or a [rate limit](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode that blocks the pinned destination returns its `402` or `429` response, even when another destination is within its limits.
- **Pinned destination no longer available**: If a stateful session's destination is removed from the routing rule, is no longer allowed by an [access policy](/ai_gateway/access_control/), or no longer supports the request's format, AI Gateway returns HTTP `409` with the `session_destination_unavailable` error code. See [Session destination unavailable](#session-destination-unavailable).

If AI Gateway cannot read or write a session's record, it routes the request as if session pinning were off, and does not fail the request.

A session identified by its prompt fingerprint can be shared by conversations that open the same way. For such a session, a request that carries no provider-side state treats a stateful record as a preference: it tries the pinned destination first and keeps fallback. A new conversation that opens like an earlier one is therefore never refused with `session_destination_unavailable`.

#### Session destination unavailable

AI Gateway returns this error when a stateful session's pinned destination can no longer serve it:

| Field | Value |
|---|---|
| HTTP status | `409`. For Gemini, the error status is `ABORTED`. |
| `X-Ai-Gateway-Error-Code` header | `session_destination_unavailable` |
| `X-Should-Retry` header | `false`. The OpenAI and Anthropic SDKs, which retry `409` responses by default, read this header and do not retry. |
| Error message | `this conversation is bound to a provider destination that is no longer available; start a new conversation or session` |

Retrying the same request returns the same error. To recover, start a new conversation with a new session ID. The record expires 4 hours after the session's last successful response, and the session's requests then use ordinary routing. A request that carries the old destination's state, such as a `previous_response_id`, can still fail on the new destination.

### Sessions and request tags

Sessions and `x-dd-tag-<KEY>` request tags do different jobs:

| | Session (`x-session-id`) | Request tags (`x-dd-tag-<KEY>`) |
|---|---|---|
| Purpose | Identifies one conversation or agent run | Labels traffic with your own dimensions, such as a team, an agent, or an environment |
| Routing | Drives weighted ordering, Smart routing, and session pinning | No effect |
| [Budgets](/ai_gateway/spend_controls/#set-budgets), [rate limits](/ai_gateway/spend_controls/#set-rate-limits), and [data capture overrides](/ai_gateway/security/#configure-data-capture) | Not matched | Matched by custom tag filters |
| Agent Observability | Groups the requests into one session | Adds the tags to the request's span |

A session does not have a budget or rate limit of its own. To cap spend or traffic for a workload, send a request tag, such as `x-dd-tag-eval_run: <RUN_ID>`, and create a budget or rate limit that filters on it.

Two request tags have a session meaning:

`x-dd-tag-client_session_id`
: A session signal, fourth in precedence. See [Session signals](#session-signals). It is also recorded as a request tag.

`x-dd-tag-session_id`
: Sets the session of the request's span in Agent Observability when the request has no other session signal. It does not affect routing or session pinning. To route by session, use `x-session-id`.

### Example: One session per agent role

An evaluation harness, such as an agent benchmark, often calls models in several roles for one task: the agent under test, a user simulator, and a reviewer or judge. If all the roles send the same session ID, their requests share one session:

- They share a weighted destination and a pinning record, so a stateful request from one role can bind the others to its destination and take away their fallback.
- Their requests appear as one session in Agent Observability, mixing the agent's conversation with the simulator's and reviewer's.

If the roles send no session ID, AI Gateway tells their conversations apart only by their [prompt fingerprints](#requests-without-a-session-id), and Agent Observability shows no session for them.

Give each role in each task its own session ID, and add request tags for the dimensions you want to budget or filter by. The following example uses the OpenAI Python SDK:

```python
import os
import uuid

from openai import OpenAI

client = OpenAI(
    base_url="https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1",
    api_key=os.environ["DATADOG_ACCESS_TOKEN"],
)

RUN_ID = uuid.uuid4().hex


def complete(role, task_id, trial, messages):
    return client.chat.completions.create(
        model="router/<RULE_SLUG>",
        messages=messages,
        extra_headers={
            # One session per run, task, trial, and role
            "x-session-id": f"{RUN_ID}:{task_id}:{trial}:{role}",
            # Tags for budgets, rate limits, and filtering
            "x-dd-tag-eval_run": RUN_ID,
            "x-dd-tag-eval_role": role,
        },
    )


# Each role keeps its own session for the whole task
complete("agent", task_id, trial, agent_messages)
complete("user_simulator", task_id, trial, simulator_messages)
complete("reviewer", task_id, trial, reviewer_messages)
```

With this setup:

- Each role's conversation has its own destination, prompt cache, and pinning record.
- Agent Observability shows a separate session for each role of each task.
- A budget or rate limit with the custom tag filter `eval_run:<RUN_ID>` covers the whole run, and one with `eval_role:agent` covers only the agent's requests.

Sessions of the same routing rule are distributed independently, so in a weighted step the agent and the user simulator of one task can start at different destinations. To send each role to a specific model, give each role its own routing rule or model.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[7]: https://app.datadoghq.com/llm/gateway/routing
