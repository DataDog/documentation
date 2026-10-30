---
title: Integrate Prompt Management
aliases:
- /llm_observability/instrument/agentic/prompt_management/
- /llm_observability/instrumentation/agentic/prompt_management/
description: Retrieve managed prompts in a Python or Node.js application, preserve local prompts as fallbacks, and track prompt usage in Agent Observability.
---

## Overview

Use an existing Datadog managed prompt or promote an application's local prompt. Preserve the application's existing behavior as a fallback, and track use of the managed prompt in Agent Observability.

Prompt Management is optional. Complete [instrumentation][1] before starting this integration.

## Select the workflow

- **Use an existing managed prompt**: Retrieve a prompt from the Datadog registry using its prompt ID, deployment environment, and variable names.
- **Promote a local prompt**: Create a managed version of a local text or chat prompt, deploy its first version to the target environment, and then integrate runtime retrieval.

{{< agent-only >}}
Complete instrumentation and any requested context sharing before starting this integration. Prompt Management is not required for context sharing or check recommendations.

If the user's request includes a prompt ID, environment, and variable names, use them without asking whether to enable Prompt Management again. Promote a local prompt only after the user opts in through the main [instrumentation guide](/llm_observability/instrument.md).
{{< /agent-only >}}

## Prerequisites

This guide covers Prompt Management runtime retrieval in Python and Node.js applications. To record local prompt templates and variables without runtime retrieval, use [Prompt Tracking][2].

Before changing prompt construction, identify the application's package manager, configuration and secret-management workflow, startup command, Datadog instrumentation, LLM provider, and provider call site.

Keep retrieval at the existing prompt-construction boundary. Preserve the application's provider, model, startup workflow, and behavior. When local prompt fragments form a single provider-facing message list, promote that final list as one managed prompt. Do not create nested managed-prompt references. To manage a fragment independently, preserve the existing composition and track the fragment explicitly.

Creating and deploying a managed prompt is a one-time setup operation. Do not create, update, or deploy prompts from application startup or a request path.

{{< agent-only >}}
1. Use the public Prompt Management APIs for the application's language: `LLMObs` from `ddtrace.llmobs` for Python, or `tracer.llmobs.prompts` from `dd-trace` for Node.js. For another language, check its SDK documentation for runtime retrieval support. If unsupported, return to the main [instrumentation guide](/llm_observability/instrument.md) and use structured Prompt Tracking instead. Do not implement a direct HTTP client or rewrite the application in another language.
2. Inspect the application before modifying it. Identify its package manager, configuration and secret-management workflow, startup command, existing Datadog instrumentation, LLM provider, prompt construction, and provider call site.
3. For an existing managed prompt, use the prompt ID, environment, and variable names supplied in the user's prompt without asking the user to confirm them. For a promotion, derive a descriptive prompt ID from the selected prompt's purpose and ask the user to confirm it before creating the prompt.
4. If multiple prompt or provider call sites are plausible, ask the user which one to modify and wait for an answer before editing.
5. Preserve the application's existing package manager, configuration workflow, startup command, provider, model, and business behavior. Existing ambient environment-variable usage, such as `os.getenv()` or `process.env`, is a configuration convention even when no `.env` or configuration file exists. Extend that convention without asking. If the repository has no applicable convention, ask the user which approach to use and wait for an answer instead of introducing one.
6. Keep managed-prompt retrieval at the application's existing prompt-construction boundary. Do not move prompt construction into the provider call site or duplicate it there when a helper, library, or other component already owns it.
7. When multiple local prompt fragments are composed into one provider call, promote the final provider-facing message list as a single managed prompt. Do not create nested managed-prompt references. If the user explicitly wants a fragment managed independently, preserve the existing composition and track that fragment explicitly.
8. Follow repository ownership boundaries. If the checked-out repository is a library and an unavailable host application owns runtime configuration, secrets, instrumentation, or startup, still implement the package dependency, prompt construction, and provider-call changes owned by the library. Do not invent host-owned configuration, initialize tracing inside the library, or claim live verification. Report the exact host-side work that remains. Ask for the host application only when a required code change is not owned by the checked-out repository.
9. Treat any API or application key supplied in the user's prompt as a secret. Do not commit it or repeat it in source code, tracked configuration, documentation, logs, or the final response. Configure supplied credentials through the application's existing non-committed local configuration or secret-management workflow, and do not require the user to enter them again. Never place credential values in command arguments or search patterns. Verify that secrets are untracked using file paths, `git status`, and `git diff`, without searching for literal credential values. When the task was supplied directly in the conversation, do not print or reread a local credential-bearing copy of it.
10. Never create, update, or deploy a managed prompt from application startup or a request path. Promotion is a one-time setup operation performed by the coding agent after the user opts in.

{{< /agent-only >}}

## Install the Prompt Management SDK

Use a `ddtrace` version for Python or a `dd-trace` version for Node.js that supports the public Prompt Management APIs required by the selected workflow. Reuse a compatible installed version. If installation or an update is required, use the application's existing package manager and preserve its dependency-management conventions. The dependency must be available after installation from a clean environment.

- **Python**: Use `ddtrace` version 4.13.0 or later.
- **Node.js**: Use `dd-trace` version 5.128.0 or later in the 5.x release line, or 6.17.0 or later in the 6.x release line.

{{< agent-only >}}
Inspect the installed SDK before changing dependencies. Explain any required installation or update. Ask before updating an existing dependency, and treat this optional integration separately from updates required for instrumentation. For Node.js, preserve the application's module system and async control flow.
{{< /agent-only >}}

## Promote a local prompt

Skip this section if you use an existing managed prompt.

1. At the existing prompt-construction boundary, separate the static text or chat-message template from its dynamic values. Use `{{variable}}` placeholders and keep a value available for every variable.
2. Choose a stable, descriptive prompt ID and the deployment environment.
3. Obtain a Datadog API key and a one-time application key with the `llm_observability_write`, `feature_flag_config_write`, and `feature_flag_environment_config_read` permissions. Keep this setup credential out of the application's runtime configuration.
4. Follow the [List environments API][3] and call `GET /api/v2/feature-flags/environments?dd_env=<URL_ENCODED_DD_ENV>`. The `dd_env` filter matches `DD_ENV` exactly against each environment's `attributes.queries`.
   - If exactly one environment matches, use its `data[].id` as the Feature Flags environment ID.
   - If multiple environments match, select the intended environment.
   - If no environment matches, create a matching environment with the [Create an environment API][4] before deploying the prompt. Set `queries` to contain the exact `DD_ENV` value, choose a display name, and specify whether the environment represents production. Environment creation requires `feature_flag_environment_config_write`. Use the returned `data.id`.
5. Check for an exact prompt-ID match with `LLMObs.list_prompts()` in Python or `await tracer.llmobs.prompts.listPrompts()` in Node.js. If a managed prompt already uses the ID, integrate that prompt or choose another ID. A tracked prompt that is not yet managed can be promoted with its existing ID.
6. Create and deploy the first version with the environment ID:

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs

created_prompt = LLMObs.create_prompt(
    "<PROMPT_ID>",
    chat_template,
    env_ids=[environment_id],
)
```

{{% /tab %}}
{{% tab "Node.js" %}}

With `dd-trace` initialized, run this once in an async setup function:

```javascript
const tracer = require('dd-trace')

const createdPrompt = await tracer.llmobs.prompts.createPrompt(
  '<PROMPT_ID>',
  chatTemplate,
  { envIds: [environmentId] }
)
```

{{% /tab %}}
{{< /tabs >}}

For a text prompt, pass the existing text template instead of a message array.

Use the public SDK method for promotion. The installed SDK must support `env_ids` in Python or `envIds` in Node.js to deploy the prompt during creation. If creation reports a conflict, list prompts again and check that the ID belongs to the intended managed prompt before integrating it. Do not overwrite an existing managed prompt.

The returned `created_prompt["id"]` in Python or `createdPrompt.id` in Node.js is the prompt UUID used by the Datadog prompt page: `https://<APPLICATION_HOST>/llm/prompts/<PROMPT_UUID>`. Use the application host for your [Datadog site][5].

After promotion, configure runtime retrieval. If retrieval requires an application key, use a separate key with the read permissions in the next section. Remove the one-time write-capable setup key when it is no longer needed.

{{< agent-only >}}
Before promotion, propose a prompt ID based on its purpose and wait for confirmation. If the deployment environment is missing, ask for it at the same time. If the user did not supply a suitable application key, ask for one.

For environment resolution:

- If multiple environments match `DD_ENV`, ask which one to use. Do not guess.
- If none match, explain that the application's `DD_ENV` is not mapped to a Feature Flags environment and ask whether to create one. Do not ask for a different `DD_ENV` or create an environment without explicit approval.
- If the user agrees, ask for the display name and whether the environment represents production. Attempt creation with the supplied application key. If Datadog rejects it for missing permissions, ask for `feature_flag_environment_config_write` or a key with that permission, then retry. Leave feature-flag approval disabled unless the user requests it.
- If the user declines, do not deploy to another environment. Explain that a matching Feature Flags environment is required.

If the prompt ID already belongs to a managed prompt, ask whether to integrate it or choose a different ID. If creation reports a conflict, list prompts again. Integrate only if the confirmed ID belongs to the intended managed prompt; otherwise, ask for a different ID. Do not silently update or replace an existing managed prompt.

If the SDK does not accept `env_ids` in Python or `envIds` in Node.js, report that it cannot deploy during creation. Do not call private SDK methods or the Prompt Management HTTP API as a workaround.

Keep the UUID returned by `LLMObs.create_prompt()` or `tracer.llmobs.prompts.createPrompt()`. Determine the application host from `DD_SITE`: use `app.datadoghq.com` for `datadoghq.com`, `app.datadoghq.eu` for `datadoghq.eu`, `app.ddog-gov.com` for `ddog-gov.com`, and the `DD_SITE` value itself for other supported sites. Include the direct prompt-page link after successful promotion. If the host cannot be determined safely, identify the prompt by its prompt ID and ask the user to open it from Prompt Management instead of guessing a URL.
{{< /agent-only >}}

## Configure the application

For direct retrieval of an environment's deployed prompt, make the following values available before `ddtrace` or `dd-trace` initializes, using the application's existing configuration and secret-management workflow:

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

Preserve the application's existing identity. If `DD_SERVICE` or `DD_LLMOBS_ML_APP` is configured, keep that value. If neither is configured, set `DD_SERVICE` to a name based on the application, service, or project.

Direct retrieval of an environment's deployed prompt requires both keys. The application key must have the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions.

For retrieval through the Agent, follow [Configure prompt retrieval][6] for your language. Python requires `DD_API_KEY`. Node.js requires neither key when retrieval succeeds through the Agent. Both languages require `DD_API_KEY` to retrieve an exact or latest version. Retain any keys required by other application features or Agentless span export.

If the application does not send data through a Datadog Agent, also set:

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

{{< tabs >}}
{{% tab "Python" %}}

If configuration is available before process startup, preserve the startup workflow and use `ddtrace-run` if needed for automatic instrumentation. If the application loads configuration in Python, load it before importing `ddtrace.auto`, then run the application's normal Python command. Do not combine application-level configuration loading with `ddtrace-run`.

{{% /tab %}}
{{% tab "Node.js" %}}

Load configuration before initializing `dd-trace`, and initialize it before importing the LLM provider. Reuse existing SDK initialization and loader hooks; do not initialize the tracer a second time. Follow the [automatic instrumentation setup][1] or the [Next.js guide][2] for the application's framework.

Use the initialized tracer's `tracer.llmobs.prompts` API for Prompt Management. Call its asynchronous methods from an async function in the application's existing workflow.

[1]: /llm_observability/instrument/auto_instrumentation/?tab=nodejs#set-up-automatic-instrumentation
[2]: /llm_observability/guide/nextjs_guide/
{{% /tab %}}
{{< /tabs >}}

For shell-based startup, export variables, assign them inline on the launch command, or use the application's existing mechanism to pass them to the child process. Bare, unexported shell assignments do not pass configuration to that process.

If runtime retrieval requires an application key, use a separate key with the required read permissions. A write-capable promotion key is a one-time setup credential.

{{< agent-only >}}
Do not add the promotion key to runtime configuration unless the user explicitly selected it for runtime use and it also has the required read permissions.

For an existing managed-prompt integration, if the user did not supply credentials, do not ask for them. Complete the code and configuration references where possible, then report that live prompt resolution and tracking could not be verified. Promotion requires user approval and the write-capable credentials described above.
{{< /agent-only >}}

## Retrieve and format the managed prompt

1. Identify the prompt ID and variable names for the existing or promoted prompt.
2. Make a meaningful value available for every variable at the existing prompt-construction boundary.
3. In Python, import `LLMObs` from `ddtrace.llmobs` at that boundary. In Node.js, access `tracer.llmobs.prompts` from the initialized `dd-trace` tracer.
4. Replace the prompt construction with `LLMObs.get_prompt()` in Python or `await tracer.llmobs.prompts.getPrompt()` in Node.js using the selected prompt ID.
5. Preserve the existing text or chat prompt as the `fallback`.
6. Use `{{variable}}` placeholders in the fallback with the managed prompt's exact variable names. Do not leave Python-style `{variable}` placeholders in the fallback.
7. Call `prompt.format()` with values for every variable. Pass the formatted value to the existing provider call without changing the provider, model, or unrelated behavior. In Node.js, await retrieval but not formatting.

{{< agent-only >}}
Use the supplied prompt ID and variable names without asking for confirmation. For a promoted prompt, use the values confirmed during promotion. Ask for missing metadata instead of guessing. If a required variable has no meaningful value at the prompt-construction boundary, ask how to map it and wait for an answer.
{{< /agent-only >}}

For example:

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": company,
    "question": question,
}

prompt = LLMObs.get_prompt(
    "<PROMPT_ID>",
    fallback=default_messages,
)
messages = prompt.format(**variables)
```

{{% /tab %}}
{{% tab "Node.js" %}}

With `dd-trace` initialized, retrieve the prompt in an async application function:

```javascript
const tracer = require('dd-trace')

const defaultMessages = [
  { role: 'system', content: 'You are a support agent for {{company}}.' },
  { role: 'user', content: '{{question}}' }
]
const variables = { company, question }

const prompt = await tracer.llmobs.prompts.getPrompt('<PROMPT_ID>', {
  fallback: defaultMessages
})
const messages = prompt.format(variables)
```

Attach the prompt metadata to the provider call as described in [Track prompt usage](#track-prompt-usage).

{{% /tab %}}
{{< /tabs >}}

## Track prompt usage

{{< tabs >}}
{{% tab "Python" %}}

When the formatted value is passed directly to a supported automatically instrumented provider, preserve it unchanged so Datadog can associate the managed prompt with the LLM span automatically. Do not add manual annotations when automatic tracking captures the prompt metadata.

If the application copies, rebuilds, concatenates, mutates, or otherwise transforms the formatted value before the provider call, wrap that call with `LLMObs.annotation_context()`. Pass the same variables to `prompt.to_annotation_dict()` that were passed to `prompt.format()`.

Appending or extending a formatted chat message list with user messages, assistant replies, tool calls, or tool results is a transformation. For multi-turn conversations, keep the annotation context active for every provider call that uses that conversation.

{{< agent-only >}}
Before completing the integration, inspect the data flow from `prompt.format()` to every provider call. If anything copies, rebuilds, concatenates, mutates, or converts the formatted value, use `annotation_context()`.
{{< /agent-only >}}

```python
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

`annotation_context()` does not create an LLM span. Use an automatically instrumented provider or preserve the application's existing manual LLM span instrumentation.

{{% /tab %}}
{{% tab "Node.js" %}}

Wrap each provider call that uses the managed prompt with `tracer.llmobs.annotationContext()`. Pass the same variables to `prompt.toAnnotation()` that you passed to `prompt.format()`. Formatting a prompt does not attach its metadata to LLM spans automatically.

```javascript
const messages = prompt.format(variables)

const response = await tracer.llmobs.annotationContext(
  { prompt: prompt.toAnnotation(variables) },
  () => client.chat.completions.create({
    model: 'gpt-4o',
    messages
  })
)
```

Keep the annotation context around every provider call that uses the prompt, including calls with copied or transformed messages and later turns in a conversation.

`annotationContext()` does not create an LLM span. Use an automatically instrumented provider or preserve the application's existing manual LLM span instrumentation.

{{< agent-only >}}
Inspect every provider call that uses the managed prompt. Attach metadata with `prompt.toAnnotation(variables)` in `tracer.llmobs.annotationContext()`, including when formatted messages pass directly to the provider. Preserve existing annotations without duplicating them.
{{< /agent-only >}}

{{% /tab %}}
{{< /tabs >}}

## Verify the integration

1. Run local checks with the application's existing workflow.
2. Run the application and exercise the modified provider call when you are ready to make provider requests and send telemetry.
3. Open the prompt page in Datadog and allow a short delay for prompt usage to appear. Use the UUID returned by `LLMObs.create_prompt()` or `tracer.llmobs.prompts.createPrompt()` for a promoted prompt.
4. Check for authentication, authorization, retrieval, or tracking errors.

{{< agent-only >}}
1. Use the application's existing workflow to perform local checks that do not make external requests.
2. Do not query Datadog or use SDK span-reading methods to verify prompt tracking.
3. If verification requires running the application, making a provider request, incurring cost, emitting telemetry, or causing another external side effect, do not finish the task merely by providing the run command. Request approval for that exact command through the coding environment's approval mechanism, or ask the user directly and wait for confirmation. A tool execution approval counts as confirmation.
4. If the user authorizes the run, use the application's normal execution workflow and exercise the modified provider call. If the user declines, give the user the exact command or action needed to do so.
5. In the final response, state whether the application was run. After a promotion, include the direct prompt-page link constructed from the UUID returned by `LLMObs.create_prompt()` or `tracer.llmobs.prompts.createPrompt()`. Otherwise, include a direct prompt-page link when its UUID and application host are known. Ask the user to trigger the modified LLM flow if necessary, return to that prompt page in Datadog, and allow a short delay for prompt usage to appear.
6. Report any authentication, authorization, retrieval, or tracking failure accurately. Do not claim that Datadog-side tracking was verified unless the user confirms it.

{{< /agent-only >}}

[1]: /llm_observability/instrument/
[2]: /llm_observability/instrument/prompt_tracking/
[3]: /api/latest/feature-flags/list-environments/
[4]: /api/latest/feature-flags/create-an-environment/
[5]: /getting_started/site/
[6]: /llm_observability/configure/prompt_management/#configure-prompt-retrieval
