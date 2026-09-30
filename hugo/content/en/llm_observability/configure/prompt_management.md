---
title: Prompt Management
aliases:
- /llm_observability/monitoring/prompt_management/
description: Create, version, and retrieve managed prompts in Python, Go, and JavaScript applications with Prompt Management.

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

After creating prompt versions, use [Prompt Experimentation][10] to compare them with an A/B test or deploy one progressively with a Guarded Rollout.

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
3. Optional: If you have access to the message placeholders Preview, click {{< ui >}}Add Message Placeholder{{< /ui >}}. See the [Insert messages at runtime](#insert-messages-at-runtime) section.
4. Optional: Click {{< ui >}}Run{{< /ui >}} to test the prompt with sample values.
5. Click {{< ui >}}Save Prompt{{< /ui >}} to open the save dialog.

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

## Insert messages at runtime

<div class="alert alert-info"><strong>Preview:</strong> Message placeholders are available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager.</div>

Message placeholders insert conversation history or tool interactions into a saved prompt at runtime. A text variable, such as `{{question}}`, replaces text inside a message. A message placeholder inserts a list of complete messages.

The prompt version stores the placeholder's name and position, not the messages you pass at runtime. To move the history within the prompt, publish a new prompt version. You do not need to change application code.

**Preview SDK access:** Contact [Datadog Support](https://www.datadoghq.com/support/) or your Customer Success Manager for the SDK version to use for your language.

### Define the placeholder

In the Prompt Editor, click {{< ui >}}Add Message Placeholder{{< /ui >}} and enter a name, such as `history`. Use the up and down arrow buttons to move the placeholder between messages. Use a different name from any text variable in the prompt. The editor shows the compatible SDK requirement before you save.

{{< img src="llm_observability/monitoring/message-placeholder-editor.png" alt="Prompt Editor with a history message placeholder between system instructions and a user message containing the question variable." >}}

To create the same prompt with the Python SDK, add an item with `"type": "placeholder"` where the history belongs:

```python
from ddtrace.llmobs import LLMObs

LLMObs.create_prompt(
    "support-assistant",
    [
        {"role": "system", "content": "You are a concise assistant for {{plan}} customers."},
        {"type": "placeholder", "name": "history"},
        {"role": "user", "content": "{{question}}"},
    ],
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

The placeholder name, `history`, is the key your application uses to pass messages at runtime. It is not a message role. For setup requirements and environment IDs, see the [Use the Python SDK](#use-the-python-sdk) section.

### Supply runtime values

Retrieve the prompt, then pass the history list with the text variables. The SDK inserts the history messages in order at the placeholder's position.

{{< tabs >}}
{{% tab "Python" %}}
```python
prompt = LLMObs.get_prompt("support-assistant")

variables = {
    "plan": "enterprise",
    "question": "Can I export the report?",
    "history": [
        {"role": "user", "content": "Where are reports located?"},
        {"role": "assistant", "content": "Under Analytics."},
    ],
}
messages = prompt.format(**variables)
```
{{% /tab %}}

{{% tab "Go" %}}
```go
prompt, err := llmobs.GetPrompt(ctx, "support-assistant")
if err != nil {
	return err
}

variables := map[string]any{
	"plan":     "enterprise",
	"question": "Can I export the report?",
	"history": []map[string]any{
		{"role": "user", "content": "Where are reports located?"},
		{"role": "assistant", "content": "Under Analytics."},
	},
}
rendered, err := prompt.Format(variables)
if err != nil {
	return err
}
messages := rendered.Messages
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const prompt = await tracer.llmobs.getPrompt('support-assistant')

const variables = {
  plan: 'enterprise',
  question: 'Can I export the report?',
  history: [
    { role: 'user', content: 'Where are reports located?' },
    { role: 'assistant', content: 'Under Analytics.' }
  ]
}
const messages = prompt.format(variables)
```
{{% /tab %}}
{{< /tabs >}}

The result contains four messages, with no placeholder item:

```json
[
  {"role": "system", "content": "You are a concise assistant for enterprise customers."},
  {"role": "user", "content": "Where are reports located?"},
  {"role": "assistant", "content": "Under Analytics."},
  {"role": "user", "content": "Can I export the report?"}
]
```

Pass the formatted messages to your model provider. If an inserted message contains `{{variable}}` syntax, the SDK leaves it as literal text.

Use the same [prompt tracking](#track-prompt-usage) workflow as for other managed prompts. Prompt metadata preserves the placeholder definition rather than its runtime values; expanded messages follow the existing input-capture and privacy settings.

### Include tool interactions

A placeholder can also insert tool calls and tool responses. Use your model provider's message format. For example, in the OpenAI Chat Completions format, set each tool response's `tool_call_id` to the `id` of its tool call:

```python
variables["history"] = [
    {
        "role": "assistant",
        "tool_calls": [{
            "id": "call_1",
            "type": "function",
            "function": {"name": "get_plan", "arguments": "{}"},
        }],
    },
    {"role": "tool", "tool_call_id": "call_1", "content": "enterprise"},
]
messages = prompt.format(**variables)
```

The SDK inserts these messages unchanged. Your application executes the tool and supplies its response.

### Message placeholder requirements and limits

- Pass a list for every placeholder. An empty list (`[]`) inserts no messages.
- Inserted messages can contain text, assistant tool calls, or tool responses. The SDK does not execute tools or validate provider-specific fields.
- If a prompt uses the same placeholder name more than once, each occurrence inserts the same list. Different placeholder names can receive different lists.
- Nested placeholders and multimodal content, such as images or audio, are not supported.

## Version prompt configuration

Store settings alongside your prompt so you can update and roll back both as one version. Use configuration for:

- **Model settings**, such as `model` and `temperature`.
- **Structured output schemas**, such as `response_format`.
- **Tool definitions**, such as `tools` and `tool_choice`.

Configuration is a JSON object whose fields you define. Your application reads and applies these settings; Datadog does not automatically apply them to Playground runs or model calls. Do not store secrets in configuration.

### Add configuration

1. On the {{< ui >}}Prompts{{< /ui >}} page, click {{< ui >}}New Prompt{{< /ui >}} and write your template.
2. Click {{< ui >}}Save Prompt{{< /ui >}}. Enter a prompt ID, expand {{< ui >}}Configuration (optional){{< /ui >}}, and add settings:

   ```json
   {
     "model": "<MODEL_NAME>",
     "temperature": 0.2
   }
   ```

3. Replace `<MODEL_NAME>` with a model that supports these settings, then click {{< ui >}}Create prompt{{< /ui >}}.

The editor requires a valid JSON object. Its example text is a placeholder, not a saved configuration.

{{< img src="llm_observability/monitoring/create-prompt-configuration-document-extractor.png" alt="Create new prompt dialog with the optional Configuration section expanded, showing model, temperature, and JSON response format settings." style="width:100%;" >}}

### Update configuration

1. Open a prompt version and select the {{< ui >}}Configuration{{< /ui >}} tab.
2. Click {{< ui >}}Update configuration{{< /ui >}} and edit the settings.
3. Click {{< ui >}}Save version{{< /ui >}}. To inspect the diff before saving, click {{< ui >}}Review changes{{< /ui >}} first.

{{< img src="llm_observability/monitoring/configuration-tab-app-configured-cropped.png" alt="Configuration tab showing saved model settings and the Update Configuration button." style="width:100%;" >}}

This creates a version without overwriting the original. Use {{< ui >}}Compare{{< /ui >}} to inspect configuration changes.

Deploy the version to an environment when it is ready. Applications retrieving that environment receive its selected template and configuration together. To roll back both, deploy an earlier version. Saving alone does not change the version an environment serves.

### Use configuration in your application

Retrieve the prompt deployed to your application's environment, then pass its configuration to your model client.

**Preview SDK access:** Contact Datadog Support or your Customer Success Manager for the SDK version to use for your language.

These examples use a prompt named `summarizer` with the configuration shown above.

{{< tabs >}}
{{% tab "Python" %}}

Access configuration through `prompt.config`:

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt("summarizer")
config = prompt.config

model = config["model"]
temperature = config.get("temperature", 0.2)
```

Use these values alongside `prompt.format(...)` in your [model call](#retrieve-format-and-use-a-prompt).

{{% /tab %}}
{{% tab "Node.js" %}}

With `dd-trace` initialized, access `prompt.config` inside your async application code:

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('summarizer')
const config = prompt.config

const model = config.model
const temperature = config.temperature ?? 0.2
```

Pass these values to your existing model client along with the formatted prompt.

{{% /tab %}}
{{% tab "Go" %}}

Access `prompt.Config()` in your request handler or application function:

```go
prompt, err := llmobs.GetPrompt(ctx, "summarizer")
if err != nil {
    return err
}
config := prompt.Config()

model := config["model"].(string)
temperature, ok := config["temperature"].(float64)
if !ok {
    temperature = 0.2
}
```

Pass these values to your model client along with the messages returned by `prompt.Format(...)`.

{{% /tab %}}
{{< /tabs >}}

**API authoring:** You can also create prompts and versions with the [Prompt Management API][8]. Omitting `config` creates an empty configuration for a new prompt or inherits the latest configuration for a new version. Send `{}` to clear it.

## Reuse prompts with composition

<div class="alert alert-info"><strong>Preview:</strong> Prompt composition is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager.</div>

Reuse shared instructions across prompts without copying them. For example, a support assistant and a billing assistant can include the same response policy.

Include **text** within a message or **chat messages** as a group. Each reference uses an exact version, so updating the source does not change prompts that already include it.

### Include a prompt

#### In the UI

This example uses the Datadog UI to add a shared response policy to a support assistant.

1. Save a prompt named `response-policy` with one System message: `Answer concisely. If you do not know the answer, say so.`
2. In another prompt's editor, click {{< ui >}}Include Prompt{{< /ui >}}, select `response-policy` version 1, and click {{< ui >}}Add prompt{{< /ui >}}.
3. Add a User message containing `{{question}}` after the include. Remove any unused empty messages.

Your prompt now contains:

```text
System: Answer concisely. If you do not know the answer, say so.
User: {{question}}
```

The included policy supplies the instructions; the `question` variable supplies a value at runtime. Your application [retrieves and formats the prompt](#retrieve-format-and-use-a-prompt) as usual—there is no need to fetch the policy separately.

{{< img src="llm_observability/monitoring/prompt-composition-example.png" alt="The Playground showing response-policy version 1 included as a System message, followed by a User message containing the question variable." style="width:100%;" >}}

All source messages are included by default. To edit an existing include, click {{< ui >}}Included Prompt{{< /ui >}} in the prompt editor, then select {{< ui >}}Customize messages{{< /ui >}} in the dialog to choose, reorder, or repeat messages without changing the source.

#### With the API

Use an `include` object in `template.messages` to reference an existing chat prompt. After saving `response-policy` version 1 as above, create the same support assistant by sending this JSON body to `POST /api/v2/llm-obs/v1/prompts`:

```json
{
  "data": {
    "type": "prompt-templates",
    "attributes": {
      "prompt_id": "support-assistant-composed",
      "template": {
        "messages": [
          { "include": { "prompt_id": "response-policy", "version": 1 } },
          { "role": "user", "content": "{{question}}" }
        ]
      }
    }
  }
}
```

For authentication and message-selection options, see [Create an Agent Observability prompt][11].

### Reuse text within a message

To reuse a phrase rather than complete messages, select a **text prompt** through {{< ui >}}Include Prompt{{< /ui >}} and click {{< ui >}}Insert text{{< /ui >}}. This inserts a reference into the last editable message.

For example, if `response-style` version 1 contains `Answer concisely.`, write:

```text
{{>response-style version=1}} Answer {{question}}.
```

The resolved template is:

```text
Answer concisely. Answer {{question}}.
```

Keep any spaces or line breaks you need around the reference. Always specify a version; `{{>response-style}}` alone is literal text, not an include.

In API requests, use the same syntax in a text `template` or a chat message's `content`.

### Review and update includes

On a saved version, {{< ui >}}Prompt Template{{< /ui >}} shows the references you authored. {{< ui >}}Resolved Prompt{{< /ui >}} shows the expanded messages, before runtime variables are filled in.

When a shared policy changes, use its {{< ui >}}Used By{{< /ui >}} tab to find prompts that reference it. Open a consuming prompt, replace the include with the new source version, then test, save, and deploy the updated prompt. Existing versions keep their original content, even if the source is later deleted.

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
[10]: /llm_observability/configure/prompt_experimentation/
[11]: /api/latest/agent-observability/create-an-agent-observability-prompt/
