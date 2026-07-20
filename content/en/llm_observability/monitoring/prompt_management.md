---
title: Prompt Management
description: Create, version, and retrieve managed prompts in Python applications with Prompt Management.

further_reading:
  - link: "/llm_observability/monitoring/prompt_tracking"
    tag: "Documentation"
    text: "Prompt Tracking"
  - link: "/llm_observability/playground"
    tag: "Documentation"
    text: "Playground"
  - link: "/llm_observability/instrumentation/sdk/?tab=python"
    tag: "Documentation"
    text: "Agent Observability SDK"

---

{{< callout url="https://www.datadoghq.com/" btn_hidden="true">}}
Prompt Management is in Preview.
{{< /callout >}}

## Overview

Prompt Management provides a centralized registry for the prompts used by your LLM applications. Instead of hardcoding prompt templates in application code or configuration files, create, version, and update prompts through Agent Observability, then retrieve them at runtime.

Runtime retrieval is supported in Python through the `ddtrace` SDK. Prompt retrieval and prompt tracing are separate: `LLMObs.get_prompt()` can retrieve a managed prompt without enabling Agent Observability, but Agent Observability must be enabled to create LLM spans and associate prompt metadata with them.

Prompt Management works alongside [Prompt Tracking][1]. When Agent Observability is enabled, managed prompts passed directly to supported, automatically instrumented LLM calls are associated with the resulting spans.

## Prerequisites

- Python 3.9 or later.
- Your [Datadog site][2] and a [Datadog API key][3]. The API key is required for prompt retrieval even if traces are sent through the Datadog Agent.
- A [Datadog application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to resolve prompts by environment.
- To manage prompts through the API, the application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions.

### Install the Preview SDK build

The released `ddtrace` package does not yet include Prompt Management. During Preview evaluation, install the temporary build in the Python environment used by your application:

{{< code-block lang="shell" >}}
curl -fsSL https://dd-trace-py-builds.s3.amazonaws.com/main/install.sh | bash
{{< /code-block >}}

This temporary installation procedure will be replaced with a released minimum `ddtrace` version before Prompt Management becomes generally available.

## Use a managed prompt in Python

### Configure prompt retrieval

Provide the Datadog site, credentials, and deployment environment through the configuration and secret-management workflow already used by your application. For example, use the application's environment file, Docker Compose or Kubernetes configuration, deployment platform, or secret manager. At runtime, the following environment variables must be set before importing `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` must match a DD_ENV query configured for an environment to which the prompt is deployed. Add references to the API and application keys through the existing configuration workflow; do not add their values to source code, committed configuration, or coding-agent prompts.

When using a coding agent, instruct it to preserve the application's existing configuration and execution conventions. If no convention exists, the agent should ask which configuration and secret-management approach to use instead of introducing one. If the existing workflow does not make credentials available to the agent, it can implement the integration but should report that live prompt resolution and tracking remain unverified. Do not provide credential values through the conversation.

### Retrieve and format a prompt

Preserve the prompt already used by your application as the fallback. The fallback keeps the application working if registry, environment-resolution, network, or server failures occur.

The following example retrieves and formats a chat prompt:

```python
from ddtrace.llmobs import LLMObs

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme Inc.",
    "question": "How do I reset my password?",
}

prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    fallback=default_messages,
)
messages = prompt.format(**variables)
```

`prompt.format()` returns a string for a text prompt and a list of messages for a chat prompt. Pass the formatted value to the corresponding text or messages parameter of your LLM provider call.

If retrieval fails and no fallback is provided, `get_prompt()` raises a `ValueError`. A fallback does not replace authentication: `DD_API_KEY` is always required, and `DD_APP_KEY` is also required when `DD_ENV` is set.

### Select a version

Without `DD_ENV`, `get_prompt()` retrieves the latest prompt version:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

With `DD_ENV`, `get_prompt()` resolves the prompt version for that environment. This requires `DD_APP_KEY` with the read permissions listed in [Prerequisites](#prerequisites).

To retrieve an exact numeric version independently of `DD_ENV`, pass `version`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

The `version` argument takes precedence over environment resolution.

Retrieved prompts are cached in memory. After 60 seconds by default, an access returns the cached prompt and triggers a background refresh. Set `DD_LLMOBS_PROMPTS_CACHE_TTL` to configure this refresh interval in seconds.

### Track prompt usage

To associate a managed prompt with an LLM span, [enable Agent Observability][5] and run the application with automatic instrumentation through its existing execution workflow. For example, the equivalent shell command is:

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

If the application does not send data through a Datadog Agent, also set `DD_LLMOBS_AGENTLESS_ENABLED=1`.

For a [supported automatically instrumented provider][6], pass the value returned by `prompt.format()` directly to the provider call. The following OpenAI example automatically associates the managed prompt with the resulting span:

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

Copying, rebuilding, or converting the formatted value can discard its prompt-tracking metadata. For example, concatenating a managed system prompt with a user question creates a new string without that metadata. Use `LLMObs.annotation_context()` to associate the managed prompt with the resulting LLM span:

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent.",
)
system_prompt = prompt.format()
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

`annotation_context()` associates metadata with an LLM span created inside the context; it does not create the span. For providers that are not automatically instrumented, first [manually instrument the LLM call][7] to create an LLM span. An explicit `annotation_context()` takes precedence over automatic prompt tracking. See [Prompt Tracking][1] for more information.

## Create and manage prompts

Create prompts and publish new versions in the {{< ui >}}Prompts{{< /ui >}} UI or through the API.

### Create a prompt

#### In the UI from an existing tracked prompt

To add a prompt already tracked in Agent Observability, navigate to the Prompt registry, open the prompt, and click {{< ui >}}Register{{< /ui >}}. You can then update the prompt in the UI and retrieve it at runtime.

#### In the UI from scratch

Navigate to the Prompt registry and click {{< ui >}}+ New Prompt{{< /ui >}}.

In the Prompt Editor:

1. Add one or more messages and assign each a role: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}}, or {{< ui >}}Assistant{{< /ui >}}.
2. Use `{{variable_name}}` syntax in any message to add dynamic content.
3. Optional: Click {{< ui >}}Run{{< /ui >}} to test the prompt with sample values.
4. Click {{< ui >}}Save Prompt{{< /ui >}} to open the save dialog.

Structure the prompt so the user query and context are injected as variables:

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="Creating a Prompt in Agent Observability." style="width:100%;" >}}

In the save dialog:

| Field | Description |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | A unique identifier for the prompt, such as `customer-support-greeting`. Use this ID to retrieve the prompt with `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Optional notes about this version. |
| {{< ui >}}Deployment{{< /ui >}} | The environment to which this version is deployed. |

Click {{< ui >}}Create Prompt{{< /ui >}} to save the prompt to the registry.

### Update, list, and delete prompts

#### In the UI

Open a prompt in the {{< ui >}}Prompts{{< /ui >}} page to:

- **Create a new version**: Click {{< ui >}}Edit{{< /ui >}} and update the messages in the Prompt Editor.
- **Deploy a version to another environment**: Select a version and update its {{< ui >}}Deployment{{< /ui >}} environments.
- **Delete a prompt**: Select {{< ui >}}Delete{{< /ui >}} from the prompt's options menu. This removes the prompt and its version history from the registry.

### Use the API

Use the Prompt Management API to create, retrieve, update, and delete prompts and prompt versions. See the [LLM Observability API reference][8] for endpoint schemas, request media types, and examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_tracking
[2]: /getting_started/site/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
[5]: /llm_observability/instrumentation/sdk/?tab=python
[6]: /llm_observability/instrumentation/auto_instrumentation/?tab=python
[7]: /llm_observability/instrumentation/sdk/?tab=python#manual-instrumentation
[8]: /api/latest/llm-observability/
