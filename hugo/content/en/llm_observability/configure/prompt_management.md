---
title: Prompt Management
aliases:
- /llm_observability/monitoring/prompt_management/
description: Create, version, and retrieve managed prompts in Python applications with Prompt Management.

further_reading:
  - link: "/llm_observability/instrument/prompt_tracking"
    tag: "Documentation"
    text: "Prompt Tracking"
  - link: "/llm_observability/improve/playground"
    tag: "Documentation"
    text: "Playground"
  - link: "/llm_observability/instrument/sdk/?tab=python"
    tag: "Documentation"
    text: "Agent Observability SDK"

---

## Overview

Prompt Management provides a centralized registry for the prompts used by your LLM applications. Instead of hardcoding prompt templates in application code or configuration files, create, version, and update prompts through Agent Observability, then retrieve them at runtime.

Runtime retrieval is supported in Python through the `ddtrace` SDK. Prompt retrieval and Prompt Tracking are separate: `LLMObs.get_prompt()` can retrieve a managed prompt without enabling Agent Observability, but Agent Observability must be enabled to create LLM spans and associate prompt metadata with them.

Prompt Management works alongside [Prompt Tracking][1]. When Agent Observability is enabled, managed prompts passed directly to supported, automatically instrumented LLM calls are associated with the resulting spans.

## Prerequisites

- Python 3.9 or later.
- ddtrace>=4.13.0
- Your [Datadog site][2] and a [Datadog API key][3]. The API key is required for prompt retrieval even if traces are sent through the Datadog Agent.
- A [Datadog application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to resolve prompts by environment. If you select an existing application key in Datadog, ensure that it has these permissions.
- To manage prompts through the API or Python SDK, the application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions.

## Install the SDK

Install or upgrade the latest `ddtrace` package in the Python environment used by your application:

```shell
pip install --upgrade ddtrace
```

## Use a managed prompt in Python

### Integrate Prompt Management with a coding agent

Integrate a managed prompt with a coding agent of your choice by pasting in the following prompt:

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

Optionally, append selected Datadog credentials so the coding agent can configure and verify the integration in the same session:

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**Note:** Including the API and application keys in the prompt is optional and is not required for the coding agent to integrate Prompt Management. Include them only in a trusted coding-agent session.

After the integration is complete, run your application and trigger the modified LLM flow. Return to the prompt page to view usage; new prompt calls may take a minute to appear.

### Configure prompt retrieval

Provide the Datadog site, credentials, and deployment environment through the configuration and secret-management workflow already used by your application. For example, use the application's environment file, Docker Compose or Kubernetes configuration, deployment platform, or secret manager. At runtime, the following environment variables must be set before importing `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` selects the environment used to resolve the prompt version and must match an environment where the prompt is deployed.

### Retrieve, format, and use a prompt

Preserve the prompt already used by your application as the fallback. The fallback keeps the application working if registry, environment-resolution, network, or server failures occur.

The following example retrieves and formats a chat prompt, then passes the formatted messages directly to OpenAI:

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

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

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

`prompt.format()` returns a string for a text prompt and a list of messages for a chat prompt. Pass the formatted value to the corresponding text or messages parameter of your LLM provider call.

If retrieval fails and no fallback is provided, `get_prompt()` raises a `ValueError`. A fallback does not replace authentication: `DD_API_KEY` is always required, and `DD_APP_KEY` is also required when `DD_ENV` is set.

To reuse an exact version of another managed prompt, request access to the [prompt composition Preview](#reuse-prompts-with-composition).

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

### Track prompt usage

To associate a managed prompt with an LLM span, [enable Agent Observability][5] and run the application with automatic instrumentation through its existing execution workflow.

If the application receives its configuration before the Python process starts, use `ddtrace-run`. For example, the equivalent shell command is:

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

If the application loads its configuration in Python, load the configuration first, then import `ddtrace.auto` before importing the LLM provider or other application modules:

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

Run this setup with the application's normal Python command, such as `python app.py`. Do not also use `ddtrace-run`; it initializes `ddtrace` before the application can load its configuration.

If the application does not send data through a Datadog Agent, also set `DD_LLMOBS_AGENTLESS_ENABLED=1`.

For a [supported automatically instrumented provider][6], pass the value returned by `prompt.format()` directly to the provider call, as shown in [Retrieve, format, and use a prompt](#retrieve-format-and-use-a-prompt). This automatically associates the managed prompt with the resulting span.

Copying, rebuilding, or converting the formatted value can discard its prompt-tracking metadata. For example, concatenating a managed system prompt with a user question creates a new string without that metadata. Use `LLMObs.annotation_context()` to associate the managed prompt with the resulting LLM span:

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent writing for a {{audience}} audience.",
)
variables = {"audience": audience}
system_prompt = prompt.format(**variables)
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(**variables),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

Pass the same variables to `to_annotation_dict()` that you pass to `format()` so that the tracked prompt includes the values used for that call.

`annotation_context()` associates metadata with an LLM span created inside the context; it does not create the span. For providers that are not automatically instrumented, first [manually instrument the LLM call][7] to create an LLM span. An explicit `annotation_context()` takes precedence over automatic prompt tracking. See [Prompt Tracking][1] for more information.

## Create and manage prompts

Create prompts and publish new versions in the {{< ui >}}Prompts{{< /ui >}} UI, through the Python SDK, or through the API.

### Create a prompt

#### Promote a tracked prompt

To promote a prompt already tracked in Agent Observability to a managed prompt, navigate to the {{< ui >}}Prompts{{< /ui >}} page, open the prompt, and click {{< ui >}}Register{{< /ui >}}. You can then update the prompt in the UI and retrieve it at runtime.

#### In the UI from scratch

Navigate to the {{< ui >}}Prompts{{< /ui >}} page and click {{< ui >}}\+ New Prompt{{< /ui >}}.

In the Prompt Editor:

1. Add one or more messages and assign each a role: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}}, or {{< ui >}}Assistant{{< /ui >}}.
2. Use `{{variable_name}}` syntax in any message to add dynamic content.
3. Optional: Click {{< ui >}}Run{{< /ui >}} to test the prompt with sample values.
4. Click {{< ui >}}Save Prompt{{< /ui >}} to open the save dialog.

Structure the prompt so the user query and context are injected as variables:

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="The Playground with a System Prompt message reading 'You are a support agent for {{company}}' and a User Prompt message containing {{question}}, with the Save Prompt button in the top right." style="width:100%;" >}}

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

### Use the Python SDK

Use `LLMObs.create_prompt()` to create a prompt and deploy its first version to one or more environments. The `env_ids` values are Feature Flags environment IDs, which you can obtain from the [List environments API][9]:

```python
from ddtrace.llmobs import LLMObs

chat_template = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

created_prompt = LLMObs.create_prompt(
    "customer-support-greeting",
    chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

To publish and deploy another version, use `LLMObs.create_prompt_version()`:

```python
created_version = LLMObs.create_prompt_version(
    "customer-support-greeting",
    updated_chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

Treat prompt creation, versioning, and deployment as setup operations. Do not perform them during application startup or from a request path. At runtime, retrieve deployed prompts with `LLMObs.get_prompt()`.

These methods require the API and application key permissions listed in [Prerequisites](#prerequisites).

Use `LLMObs.list_prompts()` and `LLMObs.list_prompt_versions()` to inspect managed prompts, `LLMObs.update_prompt()` and `LLMObs.update_prompt_version()` to update metadata or deployments, and `LLMObs.delete_prompt()` to delete a prompt and all of its versions.

### Use the API

Use the Prompt Management API to create, retrieve, update, and delete prompts and prompt versions. See the [Agent Observability API reference][8] for endpoint schemas, request media types, and examples.

## Reuse prompts with composition

<div class="alert alert-info"><strong>Preview:</strong> Prompt composition is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager.</div>

Reuse shared instructions or examples across managed prompts by including an exact version of another prompt. For example, include the same response policy in several customer-support prompts without copying its text into each template.

Each include is pinned to a numeric version. Saving a composed prompt resolves its includes and stores the resulting text or messages. Publishing a new version of an included prompt does not change existing composed versions or their deployments.

### Include a prompt in the editor

1. Create or edit a prompt and select {{< ui >}}Include Prompt{{< /ui >}}.
2. Select the source prompt and its version. Preview its content before including it.
3. For a text prompt, insert the reference into a message. For a chat prompt, include all its messages or choose individual messages.
4. To change a selected message's position or repeat it, use the message ordering and duplication controls. Selection alone does not determine message order.
5. Review the resulting prompt, supply sample variable values, and test it in the Playground before saving a version.

Text references remain inline as `{{>prompt-id version=N}}`, so their placement and surrounding whitespace remain visible. Hover over a reference to inspect its source link. Chat includes appear as expandable {{< ui >}}Included Prompt{{< /ui >}} rows. Use the separate source link to open the referenced version without leaving the editor, or edit the include to change its version or selected messages.

### Include text through the API

Use the permissions listed in [Prerequisites](#prerequisites). Send requests with `Content-Type: application/vnd.api+json`; see the [Agent Observability API reference][8] for authentication and request schemas.

First, save a text prompt named `response-policy` whose version 1 contains:

```text
Be concise and address {{customer_name}} by name.
```

Create a parent prompt with `POST /api/v2/llm-obs/v1/prompts`:

```json
{
  "data": {
    "type": "prompt-templates",
    "attributes": {
      "prompt_id": "support-answer",
      "template": "{{>response-policy version=1}}\n\nAnswer {{question}}."
    }
  }
}
```

The saved, resolved template is:

```text
Be concise and address {{customer_name}} by name.

Answer {{question}}.
```

Composition does not add separators. Include any spaces or line breaks you need around the reference. Variables from the included text remain runtime variables; supply `customer_name` and `question` when formatting the parent. A variable name shared by several includes uses the same runtime value.

Only `{{>prompt-id version=N}}`, with a positive numeric version, is an inline include. Unversioned text such as `{{>response-policy}}` remains literal text. Inline includes must reference text prompts, not chat prompts.

### Include chat messages through the API

Use an authored `messages` object to combine chat includes with ordinary messages. For example, assume version 1 of `response-examples` contains these messages:

```json
[
  { "role": "user", "content": "How do I reset my password?" },
  { "role": "assistant", "content": "Select Reset password on the sign-in page." },
  { "role": "user", "content": "Where can I find my invoices?" }
]
```

Create a parent with this request:

```json
{
  "data": {
    "type": "prompt-templates",
    "attributes": {
      "prompt_id": "support-chat",
      "template": {
        "messages": [
          { "role": "system", "content": "You are a support assistant." },
          { "include": { "prompt_id": "response-examples", "version": 1 } },
          { "role": "user", "content": "{{question}}" }
        ]
      }
    }
  }
}
```

Omitting `items` includes every source message in its original order. To select, reorder, or repeat messages, add an ordered list of zero-based indexes:

```json
{ "include": { "prompt_id": "response-examples", "version": 1, "items": [2, 0, 0] } }
```

This inserts the invoice question, followed by the password question twice. Review the resulting role sequence for compatibility with your model provider. Indexes must refer to existing source messages; an empty selection is not supported. Structured includes always require a version.

### Inspect and update a composed prompt

On a saved version, {{< ui >}}Prompt Template{{< /ui >}} shows the authored references, and {{< ui >}}Resolved Prompt{{< /ui >}} shows the expanded content. When references are available, {{< ui >}}Used By{{< /ui >}} identifies parent versions that include the selected version directly or through another prompt. Open a parent version to inspect or update its include; creating a child version does not update those references automatically.

To adopt an updated policy, edit the parent to reference the new child version, save a parent version, test it, and deploy that parent version. Each nested include is also pinned to an exact version.

API version-detail responses return the resolved content in `template` and the authored references in `authoring_template` for composed versions. Use the authored template when creating another composed version. Ordinary versions omit `authoring_template`.

### Retrieve and handle unavailable sources

Retrieve and format the parent using the existing Prompt Management workflow. Includes are resolved when saving, not by fetching each child from your application at runtime.

Deleting a source prompt does not change the resolved content of existing parent versions. However, a new include cannot reference a deleted source. Recreating a prompt with the same name does not replace the original source identity in existing parents. Update the reference and save another parent version to use the recreated source.

If Preview access is removed, existing compiled versions remain available for execution. Creating or editing composition requires access. Without access, inline reference syntax remains literal text and structured includes are unsupported. Contact Datadog Support or your Customer Success Manager if the composition controls are unavailable.


## Advanced usage

### Serve multiple versions from one environment

Prompt Management builds on Datadog's Feature Flags product. Each environment resolves `get_prompt()` calls to a default version, and can also serve a different version to calls that match a targeting rule.

For example, roll out an unstable prompt version to a subset of users in `production` with a targeting rule, while everyone else keeps getting the stable version:

```python
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
```

To configure this:

1. On the prompt's version list, hover over an environment and click {{< ui >}}Targeting Rules{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="An environment panel showing the environment currently serving one prompt version, with a link to Targeting Rules." style="width:60%;" >}}

2. Click {{< ui >}}Add Targeting Rule{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="The Targeting Rules panel for an environment, showing the default version served when no rules match and an Add Targeting Rule button." style="width:100%;" >}}

3. Define the rule filter. For example, match calls to `get_prompt()` that pass the attribute `tag=unstable`, and set the resulting variant to the unstable prompt version.

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="The targeting rule filter builder, matching a tag attribute set to unstable." style="width:100%;" >}}

4. Save the rule. Calls with `tag=unstable` resolve to the matched version; all other calls fall back to the default version.

Pass the attributes referenced by your targeting rules as keyword arguments to `get_prompt()`. Calls that don't pass a matching attribute continue to resolve to the environment's default version.

To retrieve an exact version regardless of any targeting rule, pass `version` as described in [Select a version](#select-a-version).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrument/prompt_tracking
[2]: /getting_started/site/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
[5]: /llm_observability/instrument/sdk/?tab=python
[6]: /llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[8]: /api/latest/agent-observability/
[9]: /api/latest/feature-flags/list-environments/
