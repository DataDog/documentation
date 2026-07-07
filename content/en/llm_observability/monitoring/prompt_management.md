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

Prompt Management provides a centralized registry for the prompts used by your LLM applications. Instead of hardcoding prompt templates in application code or configuration files, create, version, and update prompts through Agent Observability, then fetch them at runtime.

This decouples prompt changes from your application's deployment cycle and allows non-technical stakeholders (PMs, SMEs) to test ideas without a code deployment.

Prompt Management works alongside [Prompt Tracking][1]: prompts fetched from the registry are automatically tagged on the LLM spans that use them, and their version history is visible in the Prompts view.

## Prerequisites

- Agent Observability Python SDK (`ddtrace`)
- A [Datadog API key][2]. Write operations (creating or updating prompts) also require an [application key][3]

## Create and manage prompts

Create prompts and publish new versions from the {{< ui >}}Prompts{{< /ui >}} UI, or programmatically through the API.

### Create a prompt

#### Via UI

Navigate to {{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Prompts{{< /ui >}} and click {{< ui >}}+ New Prompt{{< /ui >}} to build a prompt from scratch. To add a prompt that Agent Observability already detected from your application's spans (see [Prompt Tracking][1]) to the registry, open that prompt in the Prompts view and click {{< ui >}}Save As{{< /ui >}} to promote it using the same editor.

In the Prompt Editor:

1. Add one or more messages and assign each a role: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}}, or {{< ui >}}Assistant{{< /ui >}}.
1. Use `{{variable_name}}` syntax in any message to add dynamic content.
1. (Optional) Click {{< ui >}}Run{{< /ui >}} to test the prompt with sample values.
1. Click {{< ui >}}Save As{{< /ui >}} to open the save dialog.

In the save dialog:

| Field | Description |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | A unique identifier for the prompt (for example, `support-reply`). Use this ID to fetch the prompt at runtime with `LLMObs.get_prompt()`. |
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

{{< tabs >}}
{{% tab "Curl" %}}
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
{{% /tab %}}
{{< /tabs >}}

Creating a prompt with a `prompt_id` that already exists in the registry returns a `409` response.

### Update, list, and delete prompts

#### Via UI

Open a prompt in the {{< ui >}}Prompts{{< /ui >}} view to:

- **Publish a new version**: edit the messages in the Prompt Editor and click {{< ui >}}Save As{{< /ui >}} to add a version to the existing prompt.
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

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts/customer-support-greeting/versions" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "description": "Add politeness instruction",
  "user_version": "v2",
  "template": [
    {"role": "system", "content": "You are a helpful support agent for {{company}}."},
    {"role": "user", "content": "Please answer: {{question}}"}
  ]
}'
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Retrieve a prompt

### Via SDK

Fetch a prompt from the registry with `get_prompt`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
messages = prompt.format(company="Acme Inc.", question="How do I reset my password?")
```

By default, `get_prompt` returns the latest version of a prompt. If `DD_ENV` is set, `get_prompt` instead returns the version deployed to that environment. See [Environments and targeting](#environments-and-targeting).

Retrieved prompts are cached locally for 60 seconds by default (configurable with `DD_LLMOBS_PROMPTS_CACHE_TTL`), so repeated calls to `get_prompt` don't add a network call on every LLM request.

### Via API

Fetch the latest version of a prompt with the following endpoint:

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/unstable/llm-obs/v1/prompts/{prompt_id}`

Method
: `GET`

Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X GET "https://api.datadoghq.com/api/unstable/llm-obs/v1/prompts/customer-support-greeting" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

The raw HTTP endpoint always returns the latest version of a prompt. `DD_ENV`-based resolution is only available through the SDK's `get_prompt` method.

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

Set `DD_ENV` to scope which prompt version an application receives at runtime, based on where a version is deployed in the registry (see [Create a prompt](#create-a-prompt)). Combine `DD_ENV` with a `targeting_key` to roll out a new prompt version to a subset of traffic before making it the default for an environment:

```python
prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    targeting_key=user_id,
)
```

<div class="alert alert-warning">The <code>label</code> argument on <code>get_prompt</code> is deprecated in favor of <code>DD_ENV</code>-based scoping. Use <code>DD_ENV</code> and <code>targeting_key</code> for environment-scoped rollouts and targeting.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_tracking
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#application-keys
