---
title: Prompt Management
description: Create, version, and retrieve prompts from a centralized registry with Prompt Management, decoupling prompt iteration from your application's deployment cycle.

further_reading:
  - link: "/llm_observability/monitoring/prompt_tracking"
    tag: "Documentation"
    text: "Prompt Tracking"
  - link: "/llm_observability/playground"
    tag: "Documentation"
    text: "Playground"
  - link: "/llm_observability/instrumentation/sdk"
    tag: "Documentation"
    text: "Agent Observability SDK"

---

## Overview

Prompt Management provides a centralized registry for the prompts used by your LLM applications. Instead of hardcoding prompt templates in application code, notebooks, or configuration files, create, version, and update prompts through the Agent Observability SDK, then fetch them at runtime.

This decouples prompt changes from your application's deployment cycle: publish a new prompt version, test it, and roll it back, without a code deployment.

Prompt Management works alongside [Prompt Tracking][1]: prompts fetched from the registry are automatically tagged on the LLM spans that use them, and their version history is visible in the Prompts view.

## Prerequisites

- Agent Observability Python SDK (`ddtrace`)
- A [Datadog API key][2]. Write operations (creating or updating prompts) also require an [application key][3]

## Create and manage prompts

Use the following SDK methods to manage the lifecycle of a prompt in the registry.

### Create a prompt

```python
from ddtrace.llmobs import LLMObs

LLMObs.create_prompt(
    "customer-support-greeting",
    [
        {"role": "system", "content": "You are a support agent for {{company}}."},
        {"role": "user", "content": "{{question}}"},
    ],
    title="Customer support greeting",
    description="Initial greeting template used by the support bot",
)
```

`create_prompt` takes a prompt ID and a template, either a single string or a list of `{"role": ..., "content": ...}` chat messages. Creating a prompt with an ID that already exists raises a `PromptConflictError`.

### Publish a new version

Publish a new version of an existing prompt without changing its ID:

```python
LLMObs.create_prompt_version(
    "customer-support-greeting",
    [
        {"role": "system", "content": "You are a helpful support agent for {{company}}."},
        {"role": "user", "content": "Please answer: {{question}}"},
    ],
    description="Add politeness instruction",
    user_version="v2",
    labels=["staging"],
)
```

Use `labels` (for example, `development`, `staging`, `production`) to mark which version of a prompt is deployed to a given environment. To promote a version from staging to production, apply the `production` label to it with `update_prompt_version`, without publishing a new version.

### Update, list, and delete prompts

| Method | Description |
|--------|-------------|
| `update_prompt(prompt_id, *, title, description)` | Update a prompt's metadata. |
| `update_prompt_version(prompt_id, version, *, labels, description)` | Update a specific version's labels or description. |
| `list_prompts()` | List all prompts in the registry. |
| `list_prompt_versions(prompt_id)` | List all versions of a prompt. |
| `delete_prompt(prompt_id)` | Delete a prompt and its version history. |

Each write method raises a typed exception on failure: `PromptValidationError` (invalid input), `PromptNotFoundError` (404), `PromptConflictError` (409), `PromptAuthError` (401/403), or `PromptServerError` (5xx).

## Retrieve a prompt

Fetch a prompt from the registry with `get_prompt`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting", label="production")
messages = prompt.format(company="Acme Inc.", question="How do I reset my password?")
```

By default, `get_prompt` returns the latest version of a prompt. Pass `label` to fetch the version tagged for a given environment (for example, `production`).

Retrieved prompts are cached locally for 60 seconds by default (configurable with `DD_LLMOBS_PROMPTS_CACHE_TTL`), so repeated calls to `get_prompt` don't add a network call on every LLM request.

### Use a retrieved prompt in an LLM call

Pass the output of `prompt.format()` directly to an auto-instrumented LLM call. Agent Observability automatically tags the resulting LLM span with the prompt's ID, version, and variables, without an explicit annotation:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
messages = prompt.format(company="Acme Inc.", question="How do I reset my password?")

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
# The resulting LLM span is automatically tagged with the customer-support-greeting prompt.
```

Automatic tagging applies to LLM spans created by auto-instrumented provider integrations, such as OpenAI and Anthropic. If the formatted value is copied or rebuilt before the call (for example, wrapped in a new list), the span isn't tagged automatically; annotate the span with `annotation_context(prompt=...)` instead. See [Prompt Tracking][1] for details.

<div class="alert alert-info">An explicit <code>annotate(prompt=...)</code> or <code>annotation_context(prompt=...)</code> call always takes priority over automatic tagging.</div>

## Environments and targeting

Set `DD_ENV` to scope which prompt version an application receives at runtime, independent of the `label` argument. Combine `DD_ENV` with a `targeting_key` to roll out a new prompt version to a subset of traffic before making it the default for an environment:

```python
prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    targeting_key=user_id,
)
```

Retrieving a prompt with `label` uses the static registry version tagged with that label and doesn't support targeting. Use `DD_ENV` and `targeting_key` together for environment-scoped rollouts with targeting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_tracking
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#application-keys
