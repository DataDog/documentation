---
title: Agentic Instrumentation
aliases:
- /llm_observability/instrumentation/agentic/
---

## Guidelines

**Important**: Follow **all** guidelines listed here when following hyperlinks to other steps.

1. Only add Datadog Agent Observability and Datadog tracer-related code. Unless for the purposes of manual instrumentation, do not modify unrelated code.
2. If being run in a monorepo or project with multiple services or instrumentation targets, confirm with the user which service or sub-project should be instrumented with Agent Observability.
3. Check whether the installed Datadog SDK supports the instrumentation required for the application. If it does, use that version. If instrumentation requires an SDK update, explain why and ask before updating the dependency. Defer updates required only for optional Prompt Management until the user chooses that integration.
4. Preserve the application's existing provider, model, prompt content, behavior, package manager, and secret-management workflow.

First, complete instrumentation, including Prompt Tracking, and any requested context sharing. Then offer optional hosted Prompt Management. Prompt Management is not required for instrumentation, context sharing, or check recommendations.

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
| Python | [Python Application Agentic Instrumentation][1] |
| Node.js | [Node.js Application Agentic Instrumentation][2] |
| Java | [Java Application Agentic Instrumentation][3] |
| OpenTelemetry | [OpenTelemetry Instrumentation][4] |

## Instrument prompts

Prompt Tracking is part of the default Agent Observability instrumentation. For each selected LLM call, identify where the application builds the prompt. Keep the prompt template separate from the variable values used to populate it.

For local prompts, follow the [Prompt Tracking instructions][5] to record the prompt template and variable values with the LLM span. Keep the existing code that builds the prompt. Do not replace it with code that retrieves prompts from Datadog Prompt Management.

If the application already retrieves prompts from Datadog Prompt Management, keep that integration. Automatic tracking applies when the formatted prompt is passed unchanged to a supported, automatically instrumented provider. If the application copies or modifies the formatted prompt before sending it to the provider, add explicit annotations as described in [Track prompt usage][6]. Do not add manual annotations when automatic tracking already captures the prompt metadata.

{{< agent-only >}}
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

   Keep the encoded `context` object at or below 64 KiB and use these collection limits:

   - Up to 20 capabilities and 30 tools.
   - Between 1 and 30 behavioral expectations.
   - Up to 20 handoff conditions.
   - Between 1 and 60 source references.

   Use between 1 and 10 unique source-reference IDs for each capability, tool, behavioral expectation, and handoff condition. Each behavioral expectation and handoff condition must cite at least one `prompt`, `instruction`, `policy`, or `test` source and include between 1 and 6 unique observable signals.

   Keep `agent_summary` between 1 and 1,000 characters. Keep names and handoff destinations between 1 and 120 characters. Keep descriptions, purposes, behaviors, applicability statements, failures, handoff conditions, and source paths between 1 and 500 characters. Keep source-reference descriptions between 1 and 300 characters.

   Give every source reference, behavioral expectation, and handoff condition an ID between 1 and 64 characters that contains only letters, numbers, hyphens, or underscores. Source-reference IDs must be unique within `source_references`. Behavioral-expectation and handoff-condition IDs must be unique across both collections. The IDs are local to this upload and let each recommended check cite its evidence.

   Use `source_kind` only from `prompt`, `instruction`, `policy`, `test`, `tool_definition`, or `implementation`. Use `observable_signals` only from `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result`, or `tool_order`. If you include `line_end`, also include a positive `line_start`, and make `line_end` greater than or equal to `line_start`.

4. Send the JSON once to the upload URL from the onboarding prompt. Use `POST`, set `Content-Type: application/json`, and pass the upload token only in the `Authorization: Bearer <upload-token>` header.

Follow these security requirements:

- Treat the upload token as a one-time secret. Do not write it to source files, configuration, shell history, output, or logs.
- Upload only the structured summary. Do not upload raw source code, full prompts, secrets, credentials, environment variables, customer data, trace contents, or arbitrary metadata.
- Use normalized repository-relative POSIX source paths and the smallest useful line ranges. Do not use absolute paths, backslashes, colons, non-normalized separators, or `.` or `..` path segments. Source references identify the evidence; they must not copy its contents.
- If the upload fails, continue instrumentation and tell the user that Datadog did not receive the optional context. Do not retry with broader data.

{{< /agent-only >}}
## Viewing traces

Report the instrumentation changes, any remaining setup requirements, and whether the context upload succeeded when that step was requested. Let the user know how to run their application and view its data in Datadog. Do not claim that traces or recommendations are available without verification.

**Mandatory**: provide a permalink where the user can view the data associated with this application. This will take the form of

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Fill in the provided values:
1. `dd_site` - if the value was provided for [Datadog site][7], use that value. Otherwise, use `datadoghq.com`.
2. `application_name` - use either the provided or inferred value from the [Agent Observability application name][8] section.

## Optional prompt management

After completing instrumentation and any requested context sharing, report the results. Then address optional hosted Prompt Management for Python applications:

- If the user already supplied a Datadog managed prompt ID, follow the [Prompt Management agentic integration guide][9]. Do not ask whether to enable Prompt Management again.
- Otherwise, identify the application's local prompts and ask whether the user wants to manage them in Datadog. If they agree, follow the guide to create managed versions of the selected prompts and update the application to retrieve them.
- If the user declines or does not answer, keep the instrumented local prompts unchanged.

Follow the guide's [Track prompt usage section][6] to determine whether automatic tracking or explicit annotations are required. Avoid duplicate prompt metadata.

If Prompt Management requires an SDK update, explain why and ask before updating the dependency. This optional update must not delay core instrumentation or context sharing.

## Language-specific instructions

{{< whatsnext desc="Instrument an application with a coding agent:" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Python Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Node.js Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Java Application Agentic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Prompt Management Agentic Integration{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /llm_observability/instrument/agentic/python.md
[2]: /llm_observability/instrument/agentic/nodejs.md
[3]: /llm_observability/instrument/agentic/java.md
[4]: /llm_observability/instrument/otel_instrumentation.md
[5]: /llm_observability/instrument/prompt_tracking.md
[6]: /llm_observability/instrument/agentic/prompt_management.md#track-prompt-usage
[7]: #datadog-site
[8]: #agent-observability-application-name
[9]: /llm_observability/instrument/agentic/prompt_management.md
