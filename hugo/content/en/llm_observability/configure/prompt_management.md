---
title: Prompt Management
aliases:
- /llm_observability/monitoring/prompt_management/
description: Create, version, and retrieve managed prompts in Python, Node.js, and Go applications with Prompt Management.

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

Runtime retrieval is supported by the Python, Node.js, and Go SDKs. Prompt retrieval and Prompt Tracking are separate: you can retrieve a managed prompt without enabling Agent Observability, but Agent Observability must be enabled to create LLM spans and associate prompt metadata with them.

After creating prompt versions, use [Prompt Experimentation][10] to compare them with an A/B test or deploy one progressively with a Guarded Rollout.

Prompt Management works alongside [Prompt Tracking][1]. Python supports automatic tracking for supported, automatically instrumented LLM calls. In Node.js and Go, explicitly annotate the LLM call with the managed prompt, as shown in [Track prompt usage](#track-prompt-usage).

## Prerequisites

{{< tabs >}}
{{% tab "Python" %}}

- Python 3.9 or later.
- `ddtrace` version **4.13.0 or later**.
- Your [Datadog site][2] and a [Datadog API key][3]. The API key is required for prompt retrieval even if traces are sent through the Datadog Agent.
- An [application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to retrieve prompts by environment. Check these permissions if you use an existing key.
- To manage prompts through the API or Python SDK, the application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions.

{{% /tab %}}
{{% tab "Node.js" %}}

- `dd-trace` version **5.128.0 or later in the 5.x release line**, or **6.17.0 or later**.
- Your [Datadog site][2] and a [Datadog API key][3].
- An [application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to retrieve prompts by environment. Check these permissions if you use an existing key.
- To manage prompts through the API or Node.js SDK, provide both keys. The application key also requires the `llm_observability_write` and `feature_flag_config_write` permissions for writes.

**Agent setup:** When retrieving an environment's deployed prompt through the Agent, neither key is required in the application. Follow [Configure prompt retrieval](#configure-prompt-retrieval). Retrieving an exact or latest version still requires `DD_API_KEY`.

{{% /tab %}}
{{% tab "Go" %}}

- `dd-trace-go/v2` version **2.12.0 or later**.
- Your [Datadog site][2] and a [Datadog API key][3].
- An [application key][4] with the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions to retrieve prompts by environment. Check these permissions if you use an existing key.

**Agent setup:** When retrieving an environment's deployed prompt through the Agent, neither key is required in the application. Follow [Configure prompt retrieval](#configure-prompt-retrieval). Retrieving an exact or latest version still requires `DD_API_KEY`.

The Go Prompt Management SDK supports retrieval and formatting. To create or manage prompts, use the UI or API.

{{% /tab %}}
{{< /tabs >}}

## Install the SDK

{{< tabs >}}
{{% tab "Python" %}}

Install or upgrade the latest `ddtrace` package in the Python environment used by your application:

```shell
pip install --upgrade ddtrace
```

{{% /tab %}}
{{% tab "Node.js" %}}

Install or upgrade `dd-trace` in the application:

```shell
npm install dd-trace@^6.17.0
```

For applications using the 5.x release line, install `dd-trace@^5.128.0` instead.

{{% /tab %}}
{{% tab "Go" %}}

Install or upgrade the Go SDK:

```shell
go get github.com/DataDog/dd-trace-go/v2@v2.12.0
```

Also install the package that enables A/B test reporting. Include it even if you are not running experiments yet, so the application is ready when you create one:

```shell
go get github.com/DataDog/dd-trace-go/v2/openfeature@v2.12.0
```

{{% /tab %}}
{{< /tabs >}}

## Use a managed prompt

### Integrate Prompt Management with a coding agent

The coding-agent workflow below is for Python applications. For Node.js and Go, follow the language tabs in [Configure prompt retrieval](#configure-prompt-retrieval).

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

Provide configuration through the workflow already used by your application, such as its environment file, Docker Compose or Kubernetes configuration, deployment platform, or secret manager. Set configuration before initializing the SDK.

`DD_ENV` selects the deployment environment and must match an environment where the prompt is deployed.

{{< tabs >}}
{{% tab "Python" %}}

Set the following environment variables before importing `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

With a Datadog Agent and [Remote Configuration][11] enabled, use the following setup to retrieve deployed prompts and report A/B test assignments. This setup is recommended even if you are not running A/B tests yet:

```shell
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
export DD_SERVICE="<SERVICE_NAME>"
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

Initialize `dd-trace` before importing the model client or other instrumented modules:

```javascript
const tracer = require('dd-trace').init()
```

After initializing the tracer, call `getPrompt()` as shown below. No additional initialization is needed for Prompt Management or A/B test reporting.

Optionally, set `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` so the application can retrieve a deployed prompt directly from Datadog if it is unavailable through the Agent. The same credentials let you retrieve deployed prompts without an Agent. Use a [fallback](#retrieve-format-and-use-a-prompt) to keep the application working if retrieval fails. For other deployment options, see [Server SDK Configuration Sources][12].

{{% /tab %}}
{{% tab "Go" %}}

With a Datadog Agent and [Remote Configuration][11] enabled, use the following setup to retrieve deployed prompts and report A/B test assignments. This setup is recommended even if you are not running A/B tests yet:

```shell
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
export DD_SERVICE="<SERVICE_NAME>"
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
```

Include the A/B testing package in the imports and start the tracer during application startup:

```go
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    _ "github.com/DataDog/dd-trace-go/v2/openfeature"
)

func main() {
    if err := tracer.Start(); err != nil {
        log.Fatal(err)
    }
    defer tracer.Stop()

    // Start the application and call llmobs.GetPrompt in its request handlers.
}
```

Keep the `_ "github.com/DataDog/dd-trace-go/v2/openfeature"` import: together with the setting above, it enables reporting which prompt version each user is assigned in an A/B test. No additional initialization is needed for Prompt Management or A/B test reporting.

Optionally, set `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` so the application can retrieve a deployed prompt directly from Datadog if it is unavailable through the Agent. The same credentials let you retrieve deployed prompts without an Agent. Use a [fallback](#retrieve-format-and-use-a-prompt) to keep the application working if retrieval fails.

{{% /tab %}}
{{< /tabs >}}

### Retrieve, format, and use a prompt

Preserve the prompt already used by your application as the fallback. The fallback keeps the application working if the managed prompt cannot be retrieved.

{{< tabs >}}
{{% tab "Python" %}}

The following example retrieves and formats a chat prompt, then passes the formatted messages directly to OpenAI:

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

If retrieval fails and no fallback is provided, `get_prompt()` raises a `ValueError`. A fallback does not replace authentication: `DD_API_KEY` is always required, and `DD_APP_KEY` is also required when `DD_ENV` is set.

{{% /tab %}}
{{% tab "Node.js" %}}

After initializing the tracer, use this example inside an async application function:

```javascript
const OpenAI = require('openai')
const client = new OpenAI()

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

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages,
})
```

`format()` returns a string for a text prompt and a message array for a chat prompt. Use `await` for `getPrompt()`, but not for `format()`. If retrieval fails and no cached prompt or fallback is available, `getPrompt()` rejects. Handle the rejection in the application's error-handling workflow.

{{% /tab %}}
{{% tab "Go" %}}

Add these imports:

```go
import (
    "encoding/json"

    "github.com/DataDog/dd-trace-go/v2/llmobs"
    "github.com/openai/openai-go/v3"
)
```

Inside an application function that returns an error, use the request's `ctx`:

```go
defaultMessages := []llmobs.ChatTemplateItem{
    {Message: &llmobs.ChatMessage{Role: "system", Content: "You are a support agent for {{company}}."}},
    {Message: &llmobs.ChatMessage{Role: "user", Content: "{{question}}"}},
}
variables := map[string]any{
    "company":  "Acme",
    "question": "How do I reset my password?",
}

prompt, err := llmobs.GetPrompt(ctx, "customer-support-greeting",
    llmobs.WithPromptFallback(llmobs.PromptFallback{
        Template: llmobs.PromptTemplate{Messages: defaultMessages},
    }),
)
if err != nil {
    return err
}
rendered, err := prompt.Format(variables)
if err != nil {
    return err
}

// Convert the formatted messages to the OpenAI client's message type.
data, err := json.Marshal(rendered.Messages)
if err != nil {
    return err
}
var messages []openai.ChatCompletionMessageParamUnion
if err := json.Unmarshal(data, &messages); err != nil {
    return err
}

client := openai.NewClient()
response, err := client.Chat.Completions.New(ctx, openai.ChatCompletionNewParams{
    Model:    "gpt-4o",
    Messages: messages,
})
if err != nil {
    return err
}
```

`Format()` returns a `FormattedPrompt` and an error. For chat prompts, `rendered.Messages` contains typed `FormattedMessage` values. Convert them to the model client's message type, preserving the text and any tool calls or results. For text prompts, pass `rendered.Text` to the model client. A text fallback uses `llmobs.PromptTemplate{Text: "You are a helpful assistant."}`.

If retrieval fails and no cached prompt or fallback is available, `GetPrompt()` returns an error. Handle it before formatting or calling the model.

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
{{% tab "Go" %}}

```go
prompt, err := llmobs.GetPrompt(ctx, "customer-support-greeting",
    llmobs.WithPromptVersion(2),
    llmobs.WithPromptFallback(llmobs.PromptFallback{
        Template: llmobs.PromptTemplate{Text: "You are a helpful support agent."},
    }),
)
if err != nil {
    return err
}
```

{{% /tab %}}
{{< /tabs >}}

### Track prompt usage

The examples below retrieve a managed system prompt, format it for an audience, and append the user's question before calling OpenAI Responses. Use the same variables for formatting and prompt tracking so the recorded prompt matches the model call.

{{< tabs >}}
{{% tab "Python" %}}

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

{{% /tab %}}
{{% tab "Go" %}}

[Enable Agent Observability][15]. Formatting a managed prompt does not automatically track it in Go. Create an LLM span around the model call and annotate it with the managed prompt.

Add these imports:

```go
import (
    "fmt"

    "github.com/DataDog/dd-trace-go/v2/llmobs"
    "github.com/openai/openai-go/v3"
    "github.com/openai/openai-go/v3/responses"
)
```

Inside an application function that returns an error, use the application's `client` and request `ctx`:

```go
prompt, err := llmobs.GetPrompt(ctx, "customer-support-system-prompt",
    llmobs.WithPromptFallback(llmobs.PromptFallback{
        Template: llmobs.PromptTemplate{
            Text: "You are a helpful support agent writing for a {{audience}} audience.",
        },
    }),
)
if err != nil {
    return err
}
variables := map[string]any{"audience": audience}
systemPrompt, err := prompt.Format(variables)
if err != nil {
    return err
}
combinedPrompt := fmt.Sprintf("%s\n\nUser question: %s", systemPrompt.Text, question)

span, llmCtx := llmobs.StartLLMSpan(ctx, "customer-support",
    llmobs.WithModelName("gpt-4o"),
    llmobs.WithModelProvider("openai"),
)
span.Annotate(llmobs.WithAnnotatedPrompt(prompt.Annotation(variables)))

response, err := client.Responses.New(llmCtx, responses.ResponseNewParams{
    Model: "gpt-4o",
    Input: responses.ResponseNewParamsInputUnion{OfString: openai.String(combinedPrompt)},
})
if err != nil {
    span.Finish(llmobs.WithError(err))
    return err
}
span.AnnotateLLMIO(
    []llmobs.LLMMessage{{Role: "user", Content: combinedPrompt}},
    []llmobs.LLMMessage{{Role: "assistant", Content: response.OutputText()}},
)
span.Finish()
```

{{% /tab %}}
{{< /tabs >}}

## Create and manage prompts

Create prompts and publish new versions in the {{< ui >}}Prompts{{< /ui >}} UI, through the Python or Node.js SDK, or through the API. The Go SDK is read-only.

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

Use `LLMObs.list_prompts()` and `LLMObs.list_prompt_versions()` to inspect managed prompts, `LLMObs.update_prompt()` and `LLMObs.update_prompt_version()` to update metadata or deployments, and `LLMObs.delete_prompt()` to delete a prompt and all of its versions.

{{% /tab %}}
{{% tab "Node.js" %}}

After initializing the tracer, create a prompt and deploy its first version from an async setup function:

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

For a text prompt, pass a string instead of a message array. Publish and deploy another version with `createPromptVersion()`:

```javascript
const createdVersion = await prompts.createPromptVersion(
  'customer-support-greeting',
  updatedChatTemplate,
  { envIds: ['<FEATURE_FLAG_ENVIRONMENT_ID>'] },
)
```

Use `listPrompts()` and `listPromptVersions(promptId)` to inspect prompts, `updatePrompt(promptId, options)` to update metadata, and `updatePromptVersion(promptId, version, options)` to update version metadata or environment assignments. `deletePrompt(promptId)` deletes a prompt and all its versions. All these methods return Promises.

{{% /tab %}}
{{% tab "Go" %}}

Use the UI or the [Prompt Management API][8] to create, update, list, or delete prompts. The Go SDK exposes `llmobs.GetPrompt()` for runtime retrieval, not management operations.

{{% /tab %}}
{{< /tabs >}}

### Use the API

Use the Prompt Management API to create, retrieve, update, and delete prompts and prompt versions. See the [Agent Observability API reference][8] for endpoint schemas, request media types, and examples.

## Version prompt configuration

<div class="alert alert-info"><strong>Preview:</strong> Versioned prompt configuration is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager.</div>

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
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
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
{{% tab "Go" %}}

```go
// DD_ENV=production
prompt, err := llmobs.GetPrompt(ctx, "my-prompt",
    llmobs.WithPromptTargetingAttributes(map[string]any{"tag": "unstable"}),
    llmobs.WithPromptFallback(llmobs.PromptFallback{
        Template: llmobs.PromptTemplate{Text: "You are a helpful assistant."},
    }),
)
if err != nil {
    return err
}
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

Pass targeting attributes as keyword arguments in Python, through `attributes` in Node.js, or through `WithPromptTargetingAttributes()` in Go. Use flat string, number, or Boolean values. Calls that don't pass a matching attribute continue to resolve to the environment's default version.

To retrieve an exact version regardless of any targeting rule, pass `version` as described in [Select a version](#select-a-version).

### Assign users to an A/B test

After configuring a [prompt A/B test][10], pass a stable targeting key, such as a user or session identifier. Use the same key for the same subject across requests. Set `DD_ENV` to the experiment's environment and omit the exact version so the SDK can select a variant.

{{< tabs >}}
{{% tab "Python" %}}

```python
prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    targeting_key=user_id,
    fallback="You are a helpful support agent.",
)
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('customer-support-greeting', {
  targetingKey: userId,
  fallback: 'You are a helpful support agent.',
})
```

To report A/B test assignments through the Agent, use the [recommended setup](#configure-prompt-retrieval), including `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`. Pass the user's targeting key to `getPrompt()`; no separate reporting call is needed.

{{% /tab %}}
{{% tab "Go" %}}

```go
prompt, err := llmobs.GetPrompt(ctx, "customer-support-greeting",
    llmobs.WithPromptTargetingKey(userID),
    llmobs.WithPromptFallback(llmobs.PromptFallback{
        Template: llmobs.PromptTemplate{Text: "You are a helpful support agent."},
    }),
)
if err != nil {
    return err
}
```

To report A/B test assignments through the Agent, use the [recommended setup](#configure-prompt-retrieval), including the `openfeature` import and `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`. Pass the user's targeting key to `GetPrompt()`; no separate reporting call is needed.

{{% /tab %}}
{{< /tabs >}}

An A/B test exposure records which prompt version a user is assigned. It is separate from [tracking the prompt used in an LLM call](#track-prompt-usage). For Node.js and Go, if retrieval through the Agent is unavailable and the SDK uses the backup API credentials to retrieve a prompt directly, that retrieval does not record an A/B test exposure.

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
[12]: /feature_flags/concepts/configuration_sources/
[13]: /llm_observability/instrument/sdk/?tab=nodejs
[14]: /llm_observability/instrument/auto_instrumentation/?tab=nodejs
[15]: /llm_observability/instrument/sdk/?tab=go
