---
title: Agentic Instrumentation
---

## Guidelines

**Important**: Follow **all** guidelines listed here when following hyperlinks to other steps.

1. Only add Datadog LLM Observability and Datadog tracer-related code. Unless for the purposes of manual instrumentation, do not modify unrelated code.
2. If being run in a monorepo or project with multiple services or instrumentation targets, confirm with the user which service or sub-project should be instrumented with LLM Observability.
3. Install the latest Datadog SDKs. If it is already installed, check with the user if it is ok to update the dependency.

## Pre-requisites

1. A Datadog API key is required to send LLM Observability data to Datadog. If not provided as part of the prompt, ask the user to input one before continuing on to subsequent steps. Without an API key, the user will not receive LLM Observability data, so this is a **hard requirement**.
2. Determine the programming language and framework being used in the application to instrument. This is important for correctly instrumenting the application.

## Environment variables

All environment variables should be set _either_ before the main application process starts up, or as the first lines of the application entrypoint.

### API Key

This is **critical**. Set the API key with the following environment variable.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Enable LLM Observability

This is **critical**. Set the following environment variables to properly enable LLM Observability.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### LLM Observability application name

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


## Run the application

Run the application from any instructions in the project, or by inferring from the project structure. If you are not able to determine how to run the application, delegate that to the user, giving them necessary instructions for extra environment variables if some need to be set.

## Viewing traces

Let the user know that they can hit their application and see data in Datadog.

**Mandatory**: provide a permalink where the user can view the data associated with this application. This will take the form of

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Fill in the provided values:
1. `dd_site` - if the value was provided for [Datadog site](#datadog-site), use that value. Otherwise, use `datadoghq.com`.
2. `application_name` - use either the provided or inferred value from the [LLM Observability application name](#llm-observability-application-name) section.
