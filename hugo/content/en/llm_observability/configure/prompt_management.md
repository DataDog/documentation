---
title: Prompt Management
aliases:
- /llm_observability/monitoring/prompt_management/
description: Create, version, and retrieve managed prompts in your applications with Prompt Management.

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

Prompt retrieval and Prompt Tracking are separate: you can retrieve a managed prompt without enabling Agent Observability, but Agent Observability must be enabled to create LLM spans and associate prompt metadata with them.

After creating prompt versions, use [Prompt Experimentation][10] to compare them with an A/B test or deploy one progressively with a Guarded Rollout.

Use [Prompt Tracking][1] to see which managed prompt was used in each LLM call. See [Track prompt usage](#track-prompt-usage) for setup.

## Prerequisites

{{< tabs >}}
{{% tab "Python" %}}

- Python 3.9 or later.
- `ddtrace` version **4.13.0 or later**.
- Your [Datadog site][2] and a [Datadog API key][3]. The API key is required for prompt retrieval even if traces are sent through the Datadog Agent.
- An [application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to retrieve deployed prompts directly from Datadog. It is not needed when retrieval succeeds through the Agent.
- To manage prompts through the API or SDK, provide both keys. The application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions for writes.

[2]: /getting_started/site/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
{{% /tab %}}
{{% tab "Node.js" %}}

- `dd-trace` version **5.128.0 or later in the 5.x release line**, or **6.17.0 or later**.
- Node.js **18 or later** for `dd-trace` 5.x, or **22 or later** for 6.x.
- Your [Datadog site][2] and a [Datadog API key][3].
- An [application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to retrieve deployed prompts directly from Datadog. It is not needed when retrieval succeeds through the Agent.
- To manage prompts through the API or SDK, provide both keys. The application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions for writes.

**Agent setup:** When retrieving an environment's deployed prompt through the Agent, neither key is required in the application. Follow [Configure prompt retrieval](#configure-prompt-retrieval). Retrieving an exact or latest version still requires `DD_API_KEY`.

[2]: /getting_started/site/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
{{% /tab %}}
{{< /tabs >}}

## Install the SDK

Install or upgrade the SDK to a supported version listed in [Prerequisites](#prerequisites).

{{< tabs >}}
{{% tab "Python" %}}

```shell
pip install --upgrade ddtrace
```

For installation and application setup, see the [Python SDK guide][18].

[18]: /tracing/trace_collection/dd_libraries/python/#getting-started
{{% /tab %}}
{{% tab "Node.js" %}}

```shell
npm install dd-trace
```

For applications using the 5.x release line, install `dd-trace@^5.128.0` instead.

For installation and application setup, see the [Node.js SDK guide][19].

[19]: /tracing/trace_collection/dd_libraries/nodejs/#getting-started
{{% /tab %}}
{{< /tabs >}}

## Use a managed prompt

### Integrate Prompt Management with a coding agent

Paste the following prompt into your coding agent:

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

Provide configuration through the workflow already used by your application, such as its environment file, Docker Compose or Kubernetes configuration, deployment platform, or secret manager. Set configuration before initializing the SDK.

`DD_ENV` selects the deployment environment and must match an environment where the prompt is deployed.

The examples below configure direct retrieval from Datadog. You can also retrieve deployed prompts through a Datadog Agent with [Remote Configuration][11] enabled. The notes in each tab explain which credentials are still needed; keep both keys to allow direct retrieval if the Agent is unavailable.

{{< tabs >}}
{{% tab "Python" %}}

Set the following environment variables before importing `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

**Agent setup:** Install `ddtrace[openfeature]` and set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`. Keep `DD_API_KEY`; `DD_APP_KEY` is not needed when retrieval succeeds through the Agent.

{{% /tab %}}
{{% tab "Node.js" %}}

Set the following environment variables before initializing `dd-trace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

Follow the [Node.js SDK initialization guide][16] if the SDK is not already initialized. No additional initialization is required for Prompt Management.

**Agent setup:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`. Neither key is needed when retrieval succeeds through the Agent. Keep `DD_API_KEY` if you also retrieve exact or latest versions.

[16]: /tracing/trace_collection/dd_libraries/nodejs/#import-and-initialize-the-tracer
{{% /tab %}}
{{< /tabs >}}

### Retrieve, format, and use a prompt

Preserve the prompt already used by your application as the fallback. The fallback keeps the application working if the managed prompt cannot be retrieved.

These examples retrieve and format a chat prompt, then pass the messages to OpenAI.

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme",
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

If retrieval fails and no fallback is provided, `get_prompt()` raises a `ValueError`. A fallback does not replace the API-key requirement described in [Prerequisites](#prerequisites).

{{% /tab %}}
{{% tab "Node.js" %}}

After initializing the tracer, use this example inside an async application function:

```javascript
const tracer = require('dd-trace')
const OpenAI = require('openai')

const defaultMessages = [
  { role: 'system', content: 'You are a support agent for {{company}}.' },
  { role: 'user', content: '{{question}}' },
]
const variables = {
  company: 'Acme',
  question: 'How do I reset my password?',
}

const prompt = await tracer.llmobs.prompts.getPrompt('customer-support-greeting', {
  fallback: defaultMessages,
})
const messages = prompt.format(variables)

const client = new OpenAI()

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages,
})
```

`prompt.format()` returns a string for a text prompt and an array of messages for a chat prompt. Pass the formatted value to the corresponding text or messages parameter of your LLM provider call.

If retrieval fails and no cached prompt or fallback is available, `getPrompt()` rejects with an error.

{{% /tab %}}
{{< /tabs >}}

Managed prompts cannot reference other managed prompts in their templates. To compose prompts, combine them in application code or manage the final provider-facing prompt as a single prompt.

### Select a version

By default, the SDK selects the prompt version as follows:

- **With `DD_ENV`:** The version deployed to that environment, including any matching targeting rules or A/B test assignment.
- **Without `DD_ENV`:** The latest prompt version.

To select an exact numeric version, use the option shown below. It takes precedence over `DD_ENV` and targeting rules. Retrieving either an exact version or the latest version requires `DD_API_KEY`, even when the application uses an Agent. For environment-specific credential requirements, see [Prerequisites](#prerequisites).

{{< tabs >}}
{{% tab "Python" %}}

```python
prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    version=2,
    fallback="You are a helpful support agent.",
)
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('customer-support-greeting', {
  version: 2,
  fallback: 'You are a helpful support agent.',
})
```

{{% /tab %}}
{{< /tabs >}}

### Track prompt usage

The examples below retrieve a managed system prompt, format it for an audience, and append the user's question before calling OpenAI Responses. Use the same variables for formatting and prompt tracking so the recorded prompt matches the model call.

{{< tabs >}}
{{% tab "Python" %}}

[Enable Agent Observability][5] and [automatic instrumentation][6] for your model client. Passing a formatted managed prompt directly to a supported client tracks it automatically.

If you modify the formatted prompt, as in this example, use `LLMObs.annotation_context()` to associate it with the LLM call:

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

[5]: /llm_observability/instrument/sdk/?tab=python
[6]: /llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[1]: /llm_observability/instrument/prompt_tracking
{{% /tab %}}
{{% tab "Node.js" %}}

[Enable Agent Observability][13] and initialize the tracer before importing a [supported model client][14]. Formatting a managed prompt does not automatically track it in Node.js. Use `annotationContext()` to associate the managed prompt with the resulting LLM span:

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('customer-support-system-prompt', {
  fallback: 'You are a helpful support agent writing for a {{audience}} audience.',
})
const variables = { audience }
const systemPrompt = prompt.format(variables)
const combinedPrompt = `${systemPrompt}\n\nUser question: ${question}`

const response = await tracer.llmobs.annotationContext(
  { prompt: prompt.toAnnotation(variables) },
  () => client.responses.create({
    model: 'gpt-4o',
    input: combinedPrompt,
  }),
)
```

The context associates metadata with LLM spans created inside the callback; it does not create a span. For model clients without automatic instrumentation, [create an LLM span manually][13].

[13]: /llm_observability/instrument/sdk/?tab=nodejs
[14]: /llm_observability/instrument/auto_instrumentation/?tab=nodejs
{{% /tab %}}
{{< /tabs >}}

## Create and manage prompts

Create prompts and publish new versions in the {{< ui >}}Prompts{{< /ui >}} UI, through a supported SDK, or through the API.

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
| {{< ui >}}Prompt ID{{< /ui >}} | A unique identifier for the prompt, such as `customer-support-greeting`. Use this ID to retrieve the prompt with the SDK. |
| {{< ui >}}Description{{< /ui >}} | Optional notes about this version. |
| {{< ui >}}Deployment{{< /ui >}} | The environment to which this version is deployed. |

Click {{< ui >}}Create Prompt{{< /ui >}} to save the prompt to the registry.

### Update, list, and delete prompts

#### In the UI

Open a prompt in the {{< ui >}}Prompts{{< /ui >}} page to:

- **Create a new version**: Click {{< ui >}}Edit{{< /ui >}} and update the messages in the Prompt Editor.
- **Deploy a version to another environment**: Select a version and update its {{< ui >}}Deployment{{< /ui >}} environments.
- **Delete a prompt**: Select {{< ui >}}Delete{{< /ui >}} from the prompt's options menu. This removes the prompt and its version history from the registry.

### Manage prompts programmatically

For a text prompt, pass a string instead of a message array.

Treat prompt creation, versioning, and deployment as setup operations, not application startup or request-path operations. These methods require the API and application key permissions listed in [Prerequisites](#prerequisites). The `env_ids` or `envIds` values are Feature Flags environment IDs from the [List environments API][9], not environment names.

{{< tabs >}}
{{% tab "Python" %}}

Use `LLMObs.create_prompt()` to create a prompt and deploy its first version to one or more environments:

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

| Operation | Method |
|-----------|--------|
| List prompts | `LLMObs.list_prompts()` |
| List a prompt's versions | `LLMObs.list_prompt_versions()` |
| Update prompt metadata | `LLMObs.update_prompt()` |
| Update version metadata or deployments | `LLMObs.update_prompt_version()` |
| Delete a prompt and all its versions | `LLMObs.delete_prompt()` |

{{% /tab %}}
{{% tab "Node.js" %}}

Use `createPrompt()` to create a prompt and deploy its first version to one or more environments. Run this example inside an async setup function:

```javascript
const prompts = tracer.llmobs.prompts
const chatTemplate = [
  { role: 'system', content: 'You are a support agent for {{company}}.' },
  { role: 'user', content: '{{question}}' },
]

const createdPrompt = await prompts.createPrompt('customer-support-greeting', chatTemplate, {
  envIds: ['<FEATURE_FLAG_ENVIRONMENT_ID>'],
})
```

To publish and deploy another version, use `createPromptVersion()`:

```javascript
const createdVersion = await prompts.createPromptVersion(
  'customer-support-greeting',
  updatedChatTemplate,
  { envIds: ['<FEATURE_FLAG_ENVIRONMENT_ID>'] },
)
```

| Operation | Method |
|-----------|--------|
| List prompts | `prompts.listPrompts()` |
| List a prompt's versions | `prompts.listPromptVersions()` |
| Update prompt metadata | `prompts.updatePrompt()` |
| Update version metadata or deployments | `prompts.updatePromptVersion()` |
| Delete a prompt and all its versions | `prompts.deletePrompt()` |

Use `await` with these methods.

{{% /tab %}}
{{< /tabs >}}

### Use the API

Use the Prompt Management API to create, retrieve, update, and delete prompts and prompt versions. See the [Agent Observability API reference][8] for endpoint schemas, request media types, and examples.

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

## Advanced usage

### Serve multiple versions from one environment

Prompt Management builds on Datadog's Feature Flags product. Each environment resolves prompt retrieval calls to a default version, and can also serve a different version to calls that match a targeting rule.

For example, roll out an unstable prompt version to a subset of users in `production` with a targeting rule, while everyone else keeps getting the stable version:

{{< tabs >}}
{{% tab "Python" %}}

```python
# DD_ENV=production
prompt = LLMObs.get_prompt(
    "my-prompt",
    tag="unstable",
    fallback="You are a helpful assistant.",
)
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// DD_ENV=production
const prompt = await tracer.llmobs.prompts.getPrompt('my-prompt', {
  attributes: { tag: 'unstable' },
  fallback: 'You are a helpful assistant.',
})
```

{{% /tab %}}
{{< /tabs >}}

To configure this:

1. On the prompt's version list, hover over an environment and click {{< ui >}}Targeting Rules{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="An environment panel showing the environment currently serving one prompt version, with a link to Targeting Rules." style="width:60%;" >}}

2. Click {{< ui >}}Add Targeting Rule{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="The Targeting Rules panel for an environment, showing the default version served when no rules match and an Add Targeting Rule button." style="width:100%;" >}}

3. Define the rule filter. For example, match calls that pass the attribute `tag=unstable`, and set the resulting variant to the unstable prompt version.

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="The targeting rule filter builder, matching a tag attribute set to unstable." style="width:100%;" >}}

4. Save the rule. Calls with `tag=unstable` resolve to the matched version; all other calls fall back to the default version.

Pass the attributes used by your targeting rule, as shown above. Use string, number, or Boolean values. Calls that don't pass a matching attribute continue to resolve to the environment's default version.

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
[11]: /remote_configuration/
[13]: /llm_observability/instrument/sdk/?tab=nodejs
[14]: /llm_observability/instrument/auto_instrumentation/?tab=nodejs
