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

Runtime retrieval is supported through the Python, Go, and JavaScript tracing SDKs. Prompt retrieval and Prompt Tracking are separate: an application can retrieve a managed prompt without enabling Agent Observability, but Agent Observability must be enabled to create LLM spans and associate prompt metadata with them.

Prompt Management works alongside [Prompt Tracking][1]. When Agent Observability is enabled, managed prompts passed directly to supported, automatically instrumented LLM calls are associated with the resulting spans.

## Prerequisites

- For the Python setup below: Python 3.9 or later and `ddtrace>=4.13.0`.
- For Go and JavaScript, install the [Go tracing SDK][10] or [JavaScript tracing SDK][11]. Message placeholders require an SDK release that supports them; the base Prompt Management requirements alone are not sufficient.
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

Managed prompts cannot reference other managed prompts in their templates. To compose prompts, combine them in application code or manage the final provider-facing prompt as a single prompt.

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

Navigate to the {{< ui >}}Prompts{{< /ui >}} page and click {{< ui >}}+ New Prompt{{< /ui >}}.

In the Prompt Editor:

1. Add one or more messages and assign each a role: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}}, or {{< ui >}}Assistant{{< /ui >}}.
2. Use `{{variable_name}}` syntax in any message to add dynamic content.
3. Optional: Select {{< ui >}}Add Message Placeholder{{< /ui >}}, enter a name, and position the placeholder between messages. The editor shows the compatible SDK requirement before you save.
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

Message placeholders insert conversation history or tool interactions into a saved prompt at runtime. A text variable replaces text inside a message; a message placeholder inserts a list of complete messages.

The prompt version stores the placeholder's name and position, not the runtime list. Change its position in another version to compare message arrangements in experiments without hardcoding those arrangements in your application.

Message placeholders must be enabled for your organization. Use a compatible SDK release before deploying a prompt that contains them. If access is disabled, saved templates remain readable and compatible SDKs can still format deployed prompts.

### Define the placeholder

In the Prompt Editor, select {{< ui >}}Add Message Placeholder{{< /ui >}}, enter a name such as `history`, and use the arrows to position it between messages. Use a different name from any text variable in the same prompt.

For SDK or API authoring, add the placeholder as a complete chat-template item. This example places the conversation history between the system instructions and the new question:

```json
[
  {
    "role": "system",
    "content": "You are a concise assistant for {{plan}} customers."
  },
  {
    "type": "placeholder",
    "name": "history"
  },
  {
    "role": "user",
    "content": "{{question}}"
  }
]
```

Save this template as `support-assistant`. The name `history` identifies the value the application supplies; it is not a message role.

### Supply runtime values

Retrieve the prompt and pass the history alongside its text variables. The SDK inserts the history in order, at the placeholder's position.

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
	"history": []llmobs.PromptMessage{
		{Role: "user", Content: "Where are reports located?"},
		{Role: "assistant", Content: "Under Analytics."},
	},
}
rendered, err := prompt.Format(variables)
if err != nil {
	return err
}
messages := rendered.Messages
```
{{% /tab %}}

{{% tab "JavaScript" %}}
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

Pass the formatted messages to your model provider. The SDK does not replace text variables inside the inserted history.

### Include tool interactions

A placeholder can also insert assistant tool calls and tool responses. For example, an OpenAI-style `history` value can contain:

```json
[
  {
    "role": "assistant",
    "tool_calls": [
      {
        "id": "call_1",
        "type": "function",
        "function": {"name": "get_report_status", "arguments": "{\"report_id\":\"weekly\"}"}
      }
    ]
  },
  {"role": "tool", "tool_call_id": "call_1", "content": "The weekly report is ready."}
]
```

Use the message format expected by your provider, including matching tool-call IDs. The SDK preserves tool fields; it does not execute the tools or validate their provider-specific arguments.

### Track placeholder usage

The tracked prompt contains the placeholder definition, not the expanded runtime messages. Placeholder values are excluded from `prompt.variables`. Expanded messages follow the existing Agent Observability input-capture and privacy settings. When automatic prompt association is unavailable, annotate the prompt using the same variables passed to the formatter. The Python and JavaScript examples below assume an initialized model client and enabled automatic instrumentation:

{{< tabs >}}
{{% tab "Python" %}}
```python
with LLMObs.annotation_context(prompt=prompt.to_annotation_dict(**variables)):
    response = client.chat.completions.create(model="gpt-4o", messages=messages)
```
{{% /tab %}}

{{% tab "Go" %}}
```go
span, ctx := llmobs.StartLLMSpan(ctx, "support-request")
defer span.Finish()
span.Annotate(llmobs.WithAnnotatedPrompt(prompt.Annotation(variables)))
// Make the model call with ctx before this function returns.
```
{{% /tab %}}

{{% tab "JavaScript" %}}
```javascript
const response = await tracer.llmobs.annotationContext(
  { prompt: prompt.toAnnotation(variables) },
  () => client.chat.completions.create({ model: 'gpt-4o', messages })
)
```
{{% /tab %}}
{{< /tabs >}}

### Test in the Playground

1. Open the prompt in the Playground.
2. Under {{< ui >}}Message placeholder test values{{< /ui >}}, enter a JSON array for `history`. Select {{< ui >}}Insert Example{{< /ui >}} for a starting value.
3. Check {{< ui >}}Rendered messages{{< /ui >}} to confirm the order and content of the expanded messages.
4. Select a model and click {{< ui >}}Run{{< /ui >}}.

Each distinct placeholder has one test input, even if it appears multiple times in the template. Test values are not saved with the prompt. Running the prompt sends the expanded messages to the model; those messages follow your Agent Observability input-capture and privacy settings.

### Compare versions in experiments

Use the same dataset to compare prompt versions with different instructions or placeholder positions. Each dataset row supplies its own conversation or tool history.

1. Create a [dataset][12] with `plan`, `question`, and `history` keys in each record's Input. For API-created records, these keys belong inside `input_data`:

   ```json
   {
     "plan": "enterprise",
     "question": "Can I export the report?",
     "history": [
       {"role": "user", "content": "Where are reports located?"},
       {"role": "assistant", "content": "Under Analytics."}
     ]
   }
   ```

2. Open the prompt in the Playground, click {{< ui >}}Add Dataset{{< /ui >}}, and select the dataset.
3. Check the placeholder mapping. The name `history` maps automatically to `input.history`; no separate mapping is needed. The displayed messages preview the first selected row.
4. Correct any placeholder validation errors, select a model, and run a preview before saving and running the experiment.

If the first selected row has a missing or malformed value, the UI blocks the preview until you correct the row or select another dataset. During experiment execution, an invalid placeholder value fails the affected row without calling the model for that row.

### Supported values and troubleshooting

- Supply a list for every placeholder. An empty list (`[]`) inserts no messages. If the entire prompt expands to no messages, add a message before running it in the Playground or an experiment.
- Each message needs a string `role` and either string `content` or a non-empty `tool_calls` or `tool_results` list. For tool messages, `content` may be omitted or `null`. Use roles supported by the model provider; the Playground also validates supported roles.
- Repeated placeholders reuse the same value. Different placeholder names can receive different lists.
- Do not use the same name for a text variable and a message placeholder.
- Nested placeholders and image, audio, or other multimodal content blocks are not supported.
- If formatting reports a missing value, pass the placeholder's exact name to the formatter. For experiments, check the identically named key under the dataset's Input.
- If {{< ui >}}Add Message Placeholder{{< /ui >}} is unavailable, check that the feature is enabled for your organization.

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

[10]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[11]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[12]: /llm_observability/improve/datasets/
