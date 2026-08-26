---
title: Agentic Instrumentation
aliases:
- /llm_observability/instrumentation/agentic/
---

## Guidelines

**Important**: Follow **all** guidelines listed here when following hyperlinks to other steps.

1. Only add Datadog Agent Observability and Datadog tracer-related code. Unless for the purposes of manual instrumentation, do not modify unrelated code.
2. If being run in a monorepo or project with multiple services or instrumentation targets, confirm with the user which service or sub-project should be instrumented with Agent Observability.
3. Install the latest Datadog SDKs. If it is already installed, check with the user if it is ok to update the dependency.

## Pre-requisites

1. A Datadog API key is required to send Agent Observability data to Datadog. Without an API key, the user will not receive Agent Observability data, so this is a **hard requirement**. If the user has not provided one already and does not wish to provide one, continue instrumenting their application, making sure in an explicit call-out at the end that they must set it, and point them to where it can be set.
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

This is **critical**. Set the following environment variables to properly enable Agent Observability.

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
| Python | [Python Application Agentic Instrumentation](/llm_observability/instrument/agentic/python.md) |
| Node.js | [Node.js Application Agentic Instrumentation](/llm_observability/instrument/agentic/nodejs.md) |
| Java | [Java Application Agentic Instrumentation](/llm_observability/instrument/agentic/java.md) |
| OpenTelemetry | [OpenTelemetry Instrumentation](/llm_observability/instrument/otel_instrumentation.md) |

## Share agent context for check recommendations

Complete this step only when the initial Datadog onboarding prompt includes an agent-context upload URL, upload token, and schema version.

After instrumentation:

1. Inspect only the repository files needed to understand the agent's purpose, tools, explicit behavioral rules, and handoff conditions.
2. Include only expectations directly supported by a cited prompt, instruction, policy, or test. Record one atomic behavior per expectation, express it in terms observable in agent input or output, trace context, tool calls, tool results, or their order, and omit ambiguous or conflicting rules rather than guessing.
3. Build a bounded JSON summary using the schema version from the onboarding prompt and this exact shape:

   ```json
   {
     "schema_version": "<schema-version-from-the-onboarding-prompt>",
     "context": {
       "agent_summary": "A short description of the agent",
       "capabilities": [
         {
           "name": "...",
           "description": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "tools": [
         {
           "name": "...",
           "purpose": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "behavioral_expectations": [
         {
           "id": "expectation-1",
           "behavior": "...",
           "applicability": "...",
           "failure": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "handoff_conditions": [
         {
           "id": "handoff-1",
           "condition": "...",
           "destination": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "source_references": [
         {
           "id": "source-1",
           "source_kind": "prompt",
           "path": "relative/path",
           "line_start": 1,
           "line_end": 10,
           "description": "Why this source supports the summary"
         }
       ]
     }
   }
   ```

   Give every behavioral expectation and handoff condition a unique `id` containing only letters, numbers, hyphens, or underscores. The ID is local to this upload and lets each recommended check cite its evidence. Use `source_kind` only from `prompt`, `instruction`, `policy`, `test`, `tool_definition`, or `implementation`. Use `observable_signals` only from `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result`, or `tool_order`.

4. Send the JSON once to the upload URL from the onboarding prompt. Use `POST`, set `Content-Type: application/json`, and pass the upload token only in the `Authorization: Bearer <upload-token>` header.

Follow these security requirements:

- Treat the upload token as a one-time secret. Do not write it to source files, configuration, shell history, output, or logs.
- Upload only the structured summary. Do not upload raw source code, full prompts, secrets, credentials, environment variables, customer data, trace contents, or arbitrary metadata.
- Use repository-relative source paths and the smallest useful line ranges. Source references identify the evidence; they must not copy its contents.
- If the upload fails, continue instrumentation and tell the user that Datadog did not receive the optional context. Do not retry with broader data.

## Instrument prompts and offer Prompt Management

Prompt Tracking is part of the default Agent Observability instrumentation. Identify the prompt-construction boundary for each selected LLM call and preserve the prompt template separately from its dynamic variables.

1. If the user's request already specifies a Datadog managed prompt ID, follow the [Prompt Management agentic integration guide](/llm_observability/instrument/agentic/prompt_management.md). Do not ask whether to use Prompt Management again.
2. Otherwise, identify the application's prompts and the dynamic variables used to format them. Preserve the existing provider, model, prompt content, and application behavior.
3. For a supported Python application, tell the user which prompts you identified and ask whether they want to manage those prompts with Datadog. If they agree, follow the [Prompt Management agentic integration guide](/llm_observability/instrument/agentic/prompt_management.md) to promote the selected local prompts and replace their local construction with managed-prompt retrieval.
4. If the user declines Prompt Management, or the application language is unsupported, instrument the selected prompts with structured prompt metadata by following the [Prompt Tracking instructions](/llm_observability/instrument/prompt_tracking). Do not add runtime prompt retrieval.

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

## Language-specific instructions

{{< whatsnext desc="Instrument an application with a coding agent:" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Python Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Node.js Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Java Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Prompt Management Agentic Integration{{< /nextlink >}}
{{< /whatsnext >}}
