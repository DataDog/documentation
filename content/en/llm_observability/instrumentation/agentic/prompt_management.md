---
title: Prompt Management Agentic Integration
---

## Goal

Integrate the Datadog managed prompt and environment specified by the user into their application, preserve the application's existing behavior as a fallback, and track use of the managed prompt in Agent Observability.

## Guidelines

1. Prompt Management runtime retrieval is supported only for Python applications. If the target application is not Python, explain that the integration is unsupported and stop. Do not implement a direct HTTP client or rewrite the application in Python.
2. Inspect the application before modifying it. Identify its package manager, configuration and secret-management workflow, startup command, existing Datadog instrumentation, LLM provider, prompt construction, and provider call site.
3. Use the prompt ID, environment, prompt type, and variable names supplied in the user's prompt without asking the user to confirm them.
4. If multiple prompt or provider call sites are plausible, ask the user which one to modify and wait for an answer before editing.
5. Preserve the application's existing package manager, configuration workflow, startup command, provider, model, and business behavior. Existing ambient environment-variable usage, such as `os.getenv()`, is a configuration convention even when no `.env` or configuration file exists. Extend that convention without asking. If the repository has no applicable convention, ask the user which approach to use and wait for an answer instead of introducing one.
6. Keep managed-prompt retrieval at the application's existing prompt-construction boundary. Do not move prompt construction into the provider call site or duplicate it there when a helper, library, or other component already owns it.
7. If the checked-out repository is a library and an unavailable host application owns configuration, secrets, instrumentation, or startup, ask for the host application and wait. Do not modify the library unless the user explicitly authorizes a library-only change.
8. Treat any API or application key supplied in the user's prompt as a secret. Do not commit it or repeat it in source code, configuration, documentation, logs, or the final response.

## Install the Prompt Management SDK

Use the application's existing package manager to install or upgrade the following Preview package in the application's Python environment:

- Package: `ddtrace==4.13.0rc1`
- Flat package source: `https://dd-trace-py-builds.s3.amazonaws.com/main/index.html`

The package source is a flat links page, not a Python package index. With `pip`, use `--find-links`, not `--index-url` or `--extra-index-url`.

Make the installation repeatable from a clean environment. Apply the flat package source to the command that resolves the application's dependencies; do not first run a dependency installation that requires this Preview package without making the source available. For example, a pip project installed from its root can use:

```shell
pip install --find-links https://dd-trace-py-builds.s3.amazonaws.com/main/index.html -e .
```

## Configure the application

Make the following values available before `ddtrace` initializes, using the application's existing configuration and secret-management workflow:

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

`DD_API_KEY` is required for prompt retrieval. When `DD_ENV` is set, `DD_APP_KEY` is required to resolve the prompt version deployed to that environment. The application key must have the `llm_observability_read`, `feature_flag_config_read`, and `feature_flag_environment_config_read` permissions.

If the application does not send data through a Datadog Agent, also set:

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

If configuration is available before process startup, preserve the existing startup workflow and use `ddtrace-run` if needed for automatic instrumentation. If the application loads configuration in Python, load it before importing `ddtrace.auto`, then run the application's normal Python command. Do not combine application-level configuration loading with `ddtrace-run`.

If the user's prompt does not include credentials, do not ask the user to provide them. Complete the code and configuration references where possible, then report that live prompt resolution and tracking could not be verified.

## Retrieve and format the managed prompt

1. Use the prompt ID, prompt type, and variable names supplied in the user's prompt without asking the user to confirm them. If required metadata is missing, ask for it instead of guessing.
2. Confirm that every managed-prompt variable has a meaningful value available at the selected prompt-construction boundary. If the application cannot supply one, ask the user how to map it and wait for an answer.
3. Import `LLMObs` from `ddtrace.llmobs` at the existing prompt-construction boundary.
4. Replace the existing prompt construction there with `LLMObs.get_prompt()` using the prompt ID supplied by the user.
5. Preserve the application's existing prompt as the `fallback`. Match the supplied prompt type: use a string fallback for a text prompt and a message-list fallback for a chat prompt.
6. Express dynamic fallback placeholders with `{{variable}}` syntax, using the exact supplied variable names. Do not leave Python-style `{variable}` placeholders in the fallback.
7. Call `prompt.format()` with values for every supplied variable, then pass the formatted string or messages to the existing provider call without changing the provider, model, or unrelated behavior.

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

If the application copies, rebuilds, concatenates, or otherwise transforms the formatted value before the provider call, wrap that call with `LLMObs.annotation_context()` and pass the same variables to `prompt.to_annotation_dict()` that were passed to `prompt.format()`:

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

1. Use the application's existing installation and execution workflow.
2. Exercise the modified provider call.
3. Confirm that the application retrieved and used the managed prompt rather than its fallback.
4. Confirm that the resulting prompt usage appears in Agent Observability.
5. Report any authentication, authorization, retrieval, or tracking failure accurately. Do not claim successful live verification based only on a syntax or import check.
