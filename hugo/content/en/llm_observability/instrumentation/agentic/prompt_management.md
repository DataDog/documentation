---
title: Prompt Management Agentic Integration
---

## Goal

Use an existing Datadog managed prompt or promote an application's local prompt, preserve the application's existing behavior as a fallback, and track use of the managed prompt in Agent Observability.

## Select the workflow

- **Use an existing managed prompt:** If the user's request includes a prompt ID, environment, and variable names, use them without asking whether to enable Prompt Management again.
- **Promote a local prompt:** Use this workflow only after the user opts in through the main [Agentic Instrumentation guide](/llm_observability/instrumentation/agentic). Promote the selected local chat prompt, deploy its first version to the requested environment, and then integrate runtime retrieval.

## Guidelines

1. Prompt Management runtime retrieval is supported only for Python applications. If the target application is not Python, do not add runtime retrieval. Return to the main [Agentic Instrumentation guide](/llm_observability/instrumentation/agentic) and instrument the selected prompts with structured Prompt Tracking instead. Do not implement a direct HTTP client or rewrite the application in Python.
2. Inspect the application before modifying it. Identify its package manager, configuration and secret-management workflow, startup command, existing Datadog instrumentation, LLM provider, prompt construction, and provider call site.
3. For an existing managed prompt, use the prompt ID, environment, and variable names supplied in the user's prompt without asking the user to confirm them. For a promotion, derive a descriptive prompt ID from the selected prompt's purpose and ask the user to confirm it before creating the prompt.
4. If multiple prompt or provider call sites are plausible, ask the user which one to modify and wait for an answer before editing.
5. Preserve the application's existing package manager, configuration workflow, startup command, provider, model, and business behavior. Existing ambient environment-variable usage, such as `os.getenv()`, is a configuration convention even when no `.env` or configuration file exists. Extend that convention without asking. If the repository has no applicable convention, ask the user which approach to use and wait for an answer instead of introducing one.
6. Keep managed-prompt retrieval at the application's existing prompt-construction boundary. Do not move prompt construction into the provider call site or duplicate it there when a helper, library, or other component already owns it.
7. When multiple local prompt fragments are composed into one provider call, promote the final provider-facing message list as a single managed prompt. Do not create nested managed-prompt references. If the user explicitly wants a fragment managed independently, preserve the existing composition and track that fragment explicitly.
8. Follow repository ownership boundaries. If the checked-out repository is a library and an unavailable host application owns runtime configuration, secrets, instrumentation, or startup, still implement the package dependency, prompt construction, and provider-call changes owned by the library. Do not invent host-owned configuration, initialize tracing inside the library, or claim live verification. Report the exact host-side work that remains. Ask for the host application only when a required code change is not owned by the checked-out repository.
9. Treat any API or application key supplied in the user's prompt as a secret. Do not commit it or repeat it in source code, tracked configuration, documentation, logs, or the final response. Configure supplied credentials through the application's existing non-committed local configuration or secret-management workflow, and do not require the user to enter them again. Never place credential values in command arguments or search patterns. Verify that secrets are untracked using file paths, `git status`, and `git diff`, without searching for literal credential values. When the task was supplied directly in the conversation, do not print or reread a local credential-bearing copy of it.
10. Never create, update, or deploy a managed prompt from application startup or a request path. Promotion is a one-time setup operation performed by the coding agent after the user opts in.

## Install the Prompt Management SDK

Use the application's existing package manager to install or upgrade to the latest `ddtrace` release in the application's Python environment. Make the installation repeatable from a clean environment and preserve the application's existing dependency-management conventions.

## Promote a local prompt

Skip this section when the user supplied an existing managed prompt ID.

1. At the selected prompt-construction boundary, separate the static chat-message template from its dynamic values. Use `{{variable}}` placeholders in the template and keep a value available for every variable.
2. Propose a stable, descriptive prompt ID based on the prompt's purpose, then wait for the user to confirm it. If the deployment environment was not supplied, ask which environment to use at the same time.
3. Before creating the prompt, obtain a Datadog API key and a one-time application key with the `llm_observability_write`, `feature_flag_config_write`, and `feature_flag_environment_config_read` permissions. If the user did not already provide a suitable application key, ask for one. Do not add this setup credential to the application's runtime configuration.
4. Follow the [List environments API](/api/latest/feature-flags/list-environments/) and call `GET /api/v2/feature-flags/environments?dd_env=<URL_ENCODED_DD_ENV>`. The `dd_env` filter matches `DD_ENV` exactly against each environment's `attributes.queries`.
   - If exactly one environment matches, use its `data[].id` as the Feature Flags environment ID.
   - If more than one environment matches, ask the user which one to use. Do not guess.
   - If no environment matches, explain that the application's current `DD_ENV` is not mapped to a Feature Flags environment and ask whether the user wants you to create one. Do not ask for a different `DD_ENV` or create an environment without explicit approval.
     - If the user agrees, ask for the environment's display name and whether it represents production. Then follow the [Create an environment API](/api/latest/feature-flags/create-an-environment/) to create an environment whose `queries` contains the exact `DD_ENV` value. Attempt the request with the supplied application key. If Datadog rejects it because the key lacks permission, ask the user to grant `feature_flag_environment_config_write` or provide an application key with that permission, then retry. Leave feature-flag approval disabled unless the user explicitly requests it, and use the returned `data.id`.
     - If the user declines, do not deploy the managed prompt to another environment. Explain that a Feature Flags environment matching the application's `DD_ENV` must exist before the prompt can be deployed there.
5. Check for an exact prompt-ID match with `LLMObs.list_prompts()`. If the ID already belongs to a managed prompt, do not overwrite it: ask whether to integrate that prompt or choose a different ID. A tracked prompt that is not yet managed can be promoted using its existing ID.
6. Create and deploy the first version in one operation with `env_ids`:

```python
from ddtrace.llmobs import LLMObs

created_prompt = LLMObs.create_prompt(
    "<PROMPT_ID>",
    chat_template,
    env_ids=[environment_id],
)
```

Use this public SDK method for promotion. If the installed SDK does not accept `env_ids`, report that it does not support deploying the prompt during creation. Do not call private SDK methods or the Prompt Management HTTP API as a workaround.

If creation reports a conflict, list prompts again. Integrate the prompt only if the confirmed ID now belongs to the intended managed prompt; otherwise, ask the user to choose a different ID. Do not silently update or replace an existing managed prompt.

Keep the returned `created_prompt["id"]` value. This is the prompt UUID used by the Datadog prompt page. Determine the Datadog application host from `DD_SITE`: use `app.datadoghq.com` for `datadoghq.com`, `app.datadoghq.eu` for `datadoghq.eu`, `app.ddog-gov.com` for `ddog-gov.com`, and the `DD_SITE` value itself for other supported sites. Include `https://<APPLICATION_HOST>/llm/prompts/<PROMPT_UUID>` in the final response after a successful promotion. If the application host cannot be determined safely, identify the created prompt by its prompt ID and ask the user to open it from Prompt Management instead of guessing a URL.

After promotion succeeds, continue with runtime configuration and retrieval below. The one-time write-capable application key can be removed; runtime retrieval should use a least-privilege application key with the read permissions described in the next section.

## Configure the application

Make the following values available before `ddtrace` initializes, using the application's existing configuration and secret-management workflow:

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

Preserve the application's existing identity. If `DD_SERVICE` or `DD_LLMOBS_ML_APP` is already configured, keep that value and do not rename the application as part of this integration. If neither is configured, set `DD_SERVICE` to a logical name based on the existing application, service, or project name.

`DD_API_KEY` is required for prompt retrieval. When `DD_ENV` is set, `DD_APP_KEY` is required to resolve the prompt version deployed to that environment. The application key must have the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions.

If the application does not send data through a Datadog Agent, also set:

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

If configuration is available before process startup, preserve the existing startup workflow and use `ddtrace-run` if needed for automatic instrumentation. If the application loads configuration in Python, load it before importing `ddtrace.auto`, then run the application's normal Python command. Do not combine application-level configuration loading with `ddtrace-run`.

When documenting a shell-based startup, confirm that configuration reaches the child Python process by exporting the variables, assigning them inline on the launch command, or preserving the application's existing mechanism. Do not present bare, unexported shell assignments as runnable setup.

A write-capable application key used to promote a prompt is a one-time setup credential. Do not add it to the application's runtime configuration unless the user explicitly selected it for runtime use and it also has the required read permissions. Otherwise, use a separate, least-privilege runtime application key.

For an existing managed-prompt integration, if the user's prompt does not include credentials, do not ask the user to provide them. Complete the code and configuration references where possible, then report that live prompt resolution and tracking could not be verified. Promotion is different: it is a user-approved setup operation and requires the write-capable credentials described in [Promote a local prompt](#promote-a-local-prompt).

## Retrieve and format the managed prompt

1. Use the prompt ID and variable names supplied for an existing managed prompt without asking the user to confirm them. For a promoted prompt, use the ID and variables confirmed during promotion. If required metadata is missing, ask for it instead of guessing.
2. Confirm that every managed-prompt variable has a meaningful value available at the selected prompt-construction boundary. If the application cannot supply one, ask the user how to map it and wait for an answer.
3. Import `LLMObs` from `ddtrace.llmobs` at the existing prompt-construction boundary.
4. Replace the existing prompt construction there with `LLMObs.get_prompt()` using the prompt ID supplied by the user.
5. Preserve the application's existing chat prompt as a message-list `fallback`.
6. Express dynamic fallback placeholders with `{{variable}}` syntax, using the exact supplied variable names. Do not leave Python-style `{variable}` placeholders in the fallback.
7. Call `prompt.format()` with values for every supplied variable, then pass the formatted messages to the existing provider call without changing the provider, model, or unrelated behavior.

For example:

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

## Track prompt usage

When the formatted value is passed directly to a supported automatically instrumented provider, preserve that value unchanged so Datadog can associate the managed prompt with the resulting LLM span automatically.

If the application copies, rebuilds, concatenates, mutates, or otherwise transforms the formatted value before the provider call, wrap that call with `LLMObs.annotation_context()` and pass the same variables to `prompt.to_annotation_dict()` that were passed to `prompt.format()`. Treat appending or extending a formatted chat message list with user messages, assistant replies, tool calls, or tool results—including across a multi-turn loop—as a transformation, and keep the annotation context active for every provider call that uses that conversation.

Before completing the integration, inspect the actual data flow from `prompt.format()` to every provider call: if anything in between copies, rebuilds, concatenates, mutates, or converts the formatted value, use `annotation_context()`.

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

`annotation_context()` does not create an LLM span. Ensure the provider is automatically instrumented or preserve the application's existing manual LLM span instrumentation.

## Verify the integration

1. Use the application's existing workflow to perform local checks that do not make external requests.
2. Do not query Datadog or use SDK span-reading methods to verify prompt tracking.
3. If verification requires running the application, making a provider request, incurring cost, emitting telemetry, or causing another external side effect, do not finish the task merely by providing the run command. Request approval for that exact command through the coding environment's approval mechanism, or ask the user directly and wait for confirmation. A tool execution approval counts as confirmation.
4. If the user authorizes the run, use the application's normal execution workflow and exercise the modified provider call. If the user declines, give the user the exact command or action needed to do so.
5. In the final response, state whether the application was run. After a promotion, include the direct prompt-page link constructed from the UUID returned by `LLMObs.create_prompt()`. Otherwise, include a direct prompt-page link when its UUID and application host are known. Ask the user to trigger the modified LLM flow if necessary, return to that prompt page in Datadog, and allow a short delay for prompt usage to appear.
6. Report any authentication, authorization, retrieval, or tracking failure accurately. Do not claim that Datadog-side tracking was verified unless the user confirms it.
