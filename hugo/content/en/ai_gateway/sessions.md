---
title: AI Gateway Sessions
description: Identify AI Gateway sessions with the x-session-id header or a coding agent's own session signal, and separate the conversations or agent roles that share a routing rule.

further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/llm_observability/instrument/sdk/#tracking-user-sessions"
    tag: "Documentation"
    text: "Track user sessions in Agent Observability"
  - link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations/"
    tag: "Documentation"
    text: "Session-level evaluations"

---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

A session is the set of [AI Gateway][1] requests that belong to one conversation or one agent run. AI Gateway uses a request's session to:

- Keep the session on the same destination of a [weighted routing step](/ai_gateway/routing/#weighted-routing-steps), so the provider's prompt cache stays warm across turns.
- Remember the destination that served the session with [session pinning](/ai_gateway/routing/#session-pinning), so later turns, including turns that depend on provider-side state, return to it.
- Group the session's requests as one session in Agent Observability.

Send a session ID with the `x-session-id` request header. Claude Code and Codex send their own session IDs, so you do not need to set the header for them. See [Claude Code and Codex sessions](#claude-code-and-codex-sessions).

## Set the session for a request

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

### Session signals and precedence

AI Gateway reads the session from the first valid signal in this order:

| Order | Signal | Sent by |
|---|---|---|
| 1 | `x-session-id` header | Your application |
| 2 | `x-claude-code-session-id` header. For a subagent, combined with the `x-claude-code-agent-id` header. | Claude Code |
| 3 | `client_metadata.session_id` in the request body, or `client_metadata.thread_id` when `session_id` is absent. OpenAI Responses requests only. | Codex |
| 4 | `x-dd-tag-client_session_id` header, sent exactly once | Any client |

A missing or invalid signal does not reject the request. AI Gateway ignores it and checks the next signal.

The same value produces the same session, whichever signal carries it. For example, `x-session-id: abc` and `x-dd-tag-client_session_id: abc` name the same session. A Claude Code subagent is the exception. Its session combines the parent session ID and the agent ID, so each subagent has a session of its own.

### Requests without a session

If a request carries no valid session signal:

- In a [weighted routing step](/ai_gateway/routing/#weighted-routing-steps), AI Gateway groups the request by a fingerprint of the conversation's opening content: its tools, system instructions, and first message. Conversations with identical openings share a destination, even when they are unrelated. OpenAI Responses requests are an exception and use the step's configured order. See [Weighted routing steps](/ai_gateway/routing/#weighted-routing-steps).
- [Session pinning](/ai_gateway/routing/#session-pinning) does not apply.
- The request's span in Agent Observability has no session, unless the request sends an `x-dd-tag-session_id` header. See [Sessions and request tags](#sessions-and-request-tags).

### Opt out of session routing

To route a request without session affinity or session pinning, send the `x-session-id` header with an empty value. With curl, `-H "x-session-id;"` sends an empty header.

An empty `x-session-id` header is different from no header. For routing, AI Gateway does not fall back to a coding agent's session signal or to the opening-content fingerprint. Weighted steps use their configured order, and session pinning does not apply.

<!-- vale Datadog.headings = NO -->

## Claude Code and Codex sessions

<!-- vale Datadog.headings = YES -->

Claude Code and Codex identify their sessions without extra configuration:

Claude Code
: Sends `x-claude-code-session-id` on every request of a session, including background requests. Subagent requests keep the parent's session ID and add `x-claude-code-agent-id`, so each subagent has its own session for routing and pinning. In Agent Observability, subagent requests appear in the parent's session.

Codex
: Sends `client_metadata.session_id` in the body of OpenAI Responses requests. The value stays the same across a session's turns and when you resume a session, and changes when you start a new one.

If you set `x-session-id` for a coding agent, for example in Claude Code's `ANTHROPIC_CUSTOM_HEADERS` setting, it takes precedence over the agent's own signal. All requests, including subagent requests, then share that one session.

## How sessions affect routing

Sessions decide where a routing rule sends a conversation: weighted steps split sessions, not requests, and session pinning keeps a session on the destination that served it. See [Sessions and routing](/ai_gateway/routing/#sessions-and-routing).

## Sessions and request tags

Sessions and `x-dd-tag-<KEY>` request tags do different jobs:

| | Session (`x-session-id`) | Request tags (`x-dd-tag-<KEY>`) |
|---|---|---|
| Purpose | Identifies one conversation or agent run | Labels traffic with your own dimensions, such as a team, an agent, or an environment |
| Routing | Drives weighted ordering and session pinning | No effect |
| [Budgets][2], [rate limits][3], and [data capture overrides][4] | Not matched | Matched by custom tag filters |
| Agent Observability | Groups the requests into one session | Adds the tags to the request's span |

A session does not have a budget or rate limit of its own. To cap spend or traffic for a workload, send a request tag, such as `x-dd-tag-eval_run: <RUN_ID>`, and create a budget or rate limit that filters on it.

Two request tags have a session meaning:

`x-dd-tag-client_session_id`
: A session signal, with the lowest precedence. See [Session signals and precedence](#session-signals-and-precedence). It is also recorded as a request tag.

`x-dd-tag-session_id`
: Sets the session of the request's span in Agent Observability when the request has no other session signal. It does not affect routing or session pinning. To route by session, use `x-session-id`.

## Example: one session per agent role

An evaluation harness, such as an agent benchmark, often calls models in several roles for one task: the agent under test, a user simulator, and a reviewer or judge. If all the roles send the same session ID, their requests share one session:

- They share a weighted destination and a pinning record, so a stateful request from one role can bind the others to its destination and take away their fallback.
- Their requests appear as one session in Agent Observability, mixing the agent's conversation with the simulator's and reviewer's.

If the roles send no session ID, their requests get no session pinning and no session in Agent Observability.

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

[1]: /ai_gateway/
[2]: /ai_gateway/spend_controls/#set-budgets
[3]: /ai_gateway/spend_controls/#set-rate-limits
[4]: /ai_gateway/security/#configure-data-capture
