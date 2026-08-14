---
title: Agentic Instrumentation
---

## Guidelines

**Important**: Follow **all** guidelines listed here when following hyperlinks to other steps.

1. Only add Datadog Agent Observability and Datadog tracer-related code. Unless for the purposes of manual instrumentation, do not modify unrelated code.
2. If being run in a monorepo or project with multiple services or instrumentation targets, confirm with the user which service or sub-project should be instrumented with {{< prodname >}}Agent Observability{{< /prodname >}}.
3. Install the latest Datadog SDKs. If it is already installed, check with the user if it is ok to update the dependency.

## Pre-requisites

1. A Datadog API key is required to send {{< prodname >}}Agent Observability{{< /prodname >}} data to Datadog. Without an API key, the user will not receive {{< prodname >}}Agent Observability{{< /prodname >}} data, so this is a **hard requirement**. If the user has not provided one already and does not wish to provide one, continue instrumenting their application, making sure in an explicit call-out at the end that they must set it, and point them to where it can be set.
2. Determine the programming language and framework being used in the application to instrument. This is important for correctly instrumenting the application.

## Environment variables

All environment variables should be set _either_ before the main application process starts up, or as the first lines of the application entrypoint.

These environment variables should not be inlined. Rather, they should be read from the process directly.

- For local development, set them in an appropriate `.env`, or similar, file for the application and the language it is written in, making sure those are populated when the Agent Observability SDK is initiated (see the language-specific guides for each)
- For non-local development, also let the user know which environment variables they will need to set

### API Key

This is **critical**. Set the API key with the following environment variable.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Enable Agent Observability

This is **critical**. Set the following environment variables to properly enable {{< prodname >}}Agent Observability{{< /prodname >}}.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Agent Observability application name

This is **strongly suggested**. If the user provided an application name (or `DD_LLMOBS_ML_APP`) as part of the initial prompt, use that value. Otherwise, use a logical name based on the folder, repository, or project name.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Datadog site

This is **optional**. Set the Datadog site, corresponding to the datacenter associated with the user's API key. If not provided (possibly via `DD_SITE`), inform the user that the site of `datadoghq.com` will be used. _If_ a value is provided, set it as an environment variable.

```bash
DD_SITE=<provided-dd-site>
```

## Instrument the application

Follow the instructions for the detected language:

| Language | Instructions |
|----------|-------------|
| Python | [Python Application Agentic Instrumentation](/llm_observability/instrumentation/agentic/python.md) |
| Node.js | [Node.js Application Agentic Instrumentation](/llm_observability/instrumentation/agentic/nodejs.md) |
| Java | [Java Application Agentic Instrumentation](/llm_observability/instrumentation/agentic/java.md) |
| OpenTelemetry | [OpenTelemetry Instrumentation](/llm_observability/instrumentation/otel_instrumentation.md) |

## Instrument prompts and offer Prompt Management

Prompt Tracking is part of the default {{< prodname >}}Agent Observability{{< /prodname >}} instrumentation. Identify the prompt-construction boundary for each selected LLM call and preserve the prompt template separately from its dynamic variables.

1. If the user's request already specifies a Datadog managed prompt ID, follow the [Prompt Management agentic integration guide](/llm_observability/instrumentation/agentic/prompt_management.md). Do not ask whether to use Prompt Management again.
2. Otherwise, identify the application's prompts and the dynamic variables used to format them. Preserve the existing provider, model, prompt content, and application behavior.
3. For a supported Python application, tell the user which prompts you identified and ask whether they want to manage those prompts with Datadog. If they agree, follow the [Prompt Management agentic integration guide](/llm_observability/instrumentation/agentic/prompt_management.md) to promote the selected local prompts and replace their local construction with managed-prompt retrieval.
4. If the user declines Prompt Management, or the application language is unsupported, instrument the selected prompts with structured prompt metadata by following the [Prompt Tracking instructions](/llm_observability/monitoring/prompt_tracking). Do not add runtime prompt retrieval.

When Prompt Management replaces a local prompt, use the managed prompt's automatic tracking rather than attaching duplicate structured prompt metadata.

## Viewing traces

Let the user know that they can hit their application and see data in Datadog.

**Mandatory**: provide a permalink where the user can view the data associated with this application. This will take the form of

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Fill in the provided values:
1. `dd_site` - if the value was provided for [Datadog site](#datadog-site), use that value. Otherwise, use `datadoghq.com`.
2. `application_name` - use either the provided or inferred value from the [Agent Observability application name](#llm-observability-application-name) section.
