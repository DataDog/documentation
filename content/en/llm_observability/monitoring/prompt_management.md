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

{{< callout url="https://www.datadoghq.com/" btn_hidden="true">}}
Prompt Management is in Preview.
{{< /callout >}}


## Overview

Prompt Management provides a centralized registry for the prompts used by your LLM applications. Instead of hardcoding prompt templates in application code or configuration files, create, version, and update prompts through Agent Observability, then fetch them at runtime.

This decouples prompt changes from your application's deployment cycle and allows non-technical stakeholders (PMs, SMEs) to test ideas without a code deployment.

Prompt Management works alongside [Prompt Tracking][1]: prompts fetched from the registry are automatically tagged on the LLM spans that use them, and their version history is visible in the Prompts view.

## Prerequisites

- Agent Observability Python SDK (`ddtrace`)
- A [Datadog API key][2]. Write operations (creating or updating prompts) also require an [application key][3]

## Create and manage prompts

Create prompts and publish new versions from the {{< ui >}}Prompts{{< /ui >}} UI, or programmatically through the API.

### Create a prompt

#### Via UI: from an existing tracked prompt

To add a prompt that you already track in Agent Observability (see [Prompt Tracking][1]), navigate to the Prompt registry, open that prompt and click {{< ui >}}Register{{< /ui >}} to promote it.
You can then import start iterating on it from the UI, and fetch it at runtime from Datadog.

#### Via UI: from scratch

Navigate to the Prompts registry page and click {{< ui >}}+ New Prompt{{< /ui >}} to build a prompt from scratch. 

In the Prompt Editor:

1. Add one or more messages and assign each a role: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}}, or {{< ui >}}Assistant{{< /ui >}}.
2. Use `{{variable_name}}` syntax in any message to add dynamic content.
3. (Optional) Click {{< ui >}}Run{{< /ui >}} to test the prompt with sample values.
4. Click {{< ui >}}Save Prompt{{< /ui >}} to open the save dialog.

We recommend structuring your prompt so that the user query and context get injected as variable like so:

{{< code-block lang="bash" >}}
  "template": [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"}
  ]
{{< /code-block >}}


In the save dialog:

| Field | Description |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | A unique identifier for the prompt (for example, `customer-support-greeting`). Use this ID to fetch the prompt at runtime with `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Optional notes about this version. |
| {{< ui >}}Deployment{{< /ui >}} | The environment to deploy this version to. |

Click {{< ui >}}Create Prompt{{< /ui >}} to save the prompt to the registry.

#### Via API

Create a prompt with the following endpoint:

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/prompts`

Method
: `POST`

Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/json"`

{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "prompt_id": "customer-support-greeting",
  "title": "Customer support greeting",
  "description": "Initial greeting template used by the support bot",
  "template": [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"}
  ]
}'
{{< /code-block >}}

Creating a prompt with a `prompt_id` that already exists in the registry returns a `409` response.

### Update, list, and delete prompts

#### Via UI

Open a prompt in the {{< ui >}}Prompts{{< /ui >}} page to:

- **Create a new version**: {{< ui >}}Edit{{< /ui >}} the messages in the Prompt Editor to create a new version of an existing prompt.
- **Deploy a version to a different environment**: select a version and update its {{< ui >}}Deployment{{< /ui >}} target.
- **Delete a prompt**: select {{< ui >}}Delete{{< /ui >}} from the prompt's options menu. This removes the prompt and its version history from the registry.

#### Via API

All endpoints below are relative to `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1`. `GET` endpoints require a `DD-API-KEY`. `POST`, `PATCH`, and `DELETE` endpoints also require a `DD-APPLICATION-KEY`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/prompts/{prompt_id}/versions` | Publish a new version of an existing prompt. |
| `GET` | `/prompts` | List all prompts in the registry. |
| `GET` | `/prompts/{prompt_id}/versions` | List all versions of a prompt. |
| `PATCH` | `/prompts/{prompt_id}` | Update a prompt's title or description. |
| `PATCH` | `/prompts/{prompt_id}/versions/{version}` | Update a version's description or deployed environments. |
| `DELETE` | `/prompts/{prompt_id}` | Delete a prompt and its version history. |

For example, publish a new version of a prompt:

{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts/customer-support-greeting/versions" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "description": "Add politeness instruction",
  "template": [
    {"role": "system", "content": "You are a helpful support agent for {{company}}."},
    {"role": "user", "content": "Please answer: {{question}}"}
  ]
}'
{{< /code-block >}}

## Retrieve a prompt

### Via SDK

Fetch a prompt from the registry with `get_prompt`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
messages = prompt.format(company="Acme Inc.", question="How do I reset my password?")
```

By default, `get_prompt` returns the latest version of a prompt. Retrieved prompts are cached locally for 60 seconds by default (configurable with `DD_LLMOBS_PROMPTS_CACHE_TTL`), so repeated calls to `get_prompt` don't add a network call on every LLM request.

#### Environments

Set `DD_ENV` to scope which prompt version an application receives at runtime, based on where a version is deployed in the registry (see [Create a prompt](#create-a-prompt)):

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

<div class="alert alert-warning">The <code>label</code> argument on <code>get_prompt</code> is deprecated in favor of <code>DD_ENV</code>-based scoping.</div>

For advanced serving rules, such as rolling out a new prompt version to a subset of traffic, set up [Feature Flags][8].

### Via API

Fetch the latest version of a prompt with the following endpoint:

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/prompts/{prompt_id}`

Method
: `GET`

Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`

{{< code-block lang="bash" >}}
curl -X GET "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts/customer-support-greeting" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>"
{{< /code-block >}}

The raw HTTP endpoint always returns the latest version of a prompt. `DD_ENV`-based resolution is only available through the SDK's `get_prompt` method.

#### Fetch a specific version

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/prompts/{prompt_id}/versions/{version}`

Method
: `GET`

Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`

{{< code-block lang="bash" >}}
curl -s -X GET "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts/customer-support-greeting/versions/2" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>"
{{< /code-block >}}

## Monitor prompt usage

To see prompt metadata on the LLM spans it generates, Agent Observability must be enabled (with `LLMObs.enable()` or the equivalent environment variables).   

For LLM calls made through an auto-instrumented provider integration (OpenAI, Anthropic, and others), passing the output of `prompt.format()` directly into the call tags the resulting span automatically, without extra instrumentation:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
messages = prompt.format(company="Acme Inc.", question="How do I reset my password?")

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
# The resulting LLM span is automatically tagged with the customer-support-greeting prompt.
```

For LLM calls that aren't auto-instrumented, or when the formatted value is copied or rebuilt before the call (for example, wrapped in a new list), tag the span manually with `LLMObs.annotation_context` and `prompt.to_annotation_dict()`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
variables = {"company": "Acme Inc.", "question": "How do I reset my password?"}

with LLMObs.annotation_context(prompt=prompt.to_annotation_dict(**variables)):
    response = your_llm_client.chat(messages=prompt.format(**variables))
```

See [Prompt Tracking][1] for details.

<div class="alert alert-info">An explicit <code>annotate(prompt=...)</code> or <code>annotation_context(prompt=...)</code> call always takes priority over automatic tagging.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_tracking
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#application-keys
[8]: /feature_flags/
