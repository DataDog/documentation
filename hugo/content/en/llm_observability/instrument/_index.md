---
title: Agent Observability Instrumentation
aliases:
- /llm_observability/instrumentation/
description: Instrument an LLM application with Datadog SDKs, OpenTelemetry, or the HTTP API, and track prompts and traces in Agent Observability.
further_reading:
    - link: '/llm_observability/instrument/auto_instrumentation/'
      tag: 'Documentation'
      text: 'Automatic Instrumentation for Agent Observability'
    - link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
      tag: Blog
      text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
    - link: "https://learn.datadoghq.com/courses/llm-obs-getting-started"
      tag: "Learning Center"
      text: "Getting Started with Agent Observability"
---

## Overview

Instrument your LLM application or agent to collect traces, prompts, token usage, latency, and errors in Agent Observability. Use automatic instrumentation for supported providers and frameworks, and add custom spans for other operations. You can follow these steps yourself or give this page to a coding agent.

{{< agent-only >}}
Follow these guidelines throughout this page and its linked setup guides:

1. Add only Agent Observability and Datadog tracer-related code. Do not modify unrelated application code except where manual instrumentation requires it.
2. For a monorepo or project with multiple services, confirm which service or sub-project to instrument before editing.
3. Inspect the installed Datadog SDK. Reuse it if it supports the required instrumentation. If an update is required, explain why and ask before changing the dependency. Defer updates required only for optional Prompt Management until the user chooses that integration.
4. Preserve the application's provider, model, prompt content, behavior, package manager, and secret-management workflow.
5. Complete instrumentation, including Prompt Tracking and any requested context sharing, before offering optional hosted Prompt Management. Prompt Management is not required for instrumentation, context sharing, or check recommendations.
{{< /agent-only >}}

## Prerequisites

- Identify the application's programming language, framework, LLM provider, and startup command.
- Obtain a [Datadog API key][8] for sending data directly to Datadog. If you send data through a Datadog Agent, use the [SDK configuration][2] for that setup.
- Select the [Datadog site][9] associated with your account.

{{< agent-only >}}
Inspect the application to identify its language and framework before choosing a setup guide. For agentless setup, use the API key supplied by the user through the existing secret-management workflow. If the user has not supplied a key and does not want to provide one, continue the code changes. In the final response, explain that data submission requires the key and show where to configure it. Do not claim data submission succeeded without it.
{{< /agent-only >}}

## Configure environment variables

Set environment variables before the application starts or load them before the SDK initializes. Use the application's existing configuration or secret-management workflow. For local development, this can be an existing `.env` file. Keep credentials out of source code.

The following example sends data directly to Datadog without a Datadog Agent. Replace the placeholders and load these values into the application process:

```text
DD_API_KEY=<DATADOG_API_KEY>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
DD_SITE=<DATADOG_SITE>
```

If the application sends data through a Datadog Agent, use the [SDK configuration][2] instead of enabling agentless mode.

### Agent Observability application name

Set `DD_LLMOBS_ML_APP` to the name used to group the application's traces and spans. Keep an existing application name, or choose a name based on the service, repository, or project. See the [application naming guidelines][10].

{{< agent-only >}}
If the user supplied an application name or `DD_LLMOBS_ML_APP`, use it. Otherwise, preserve the existing name or infer a logical name from the folder, repository, or project. Report the name used.
{{< /agent-only >}}

### Datadog site

Set `DD_SITE` to the site associated with your API key. The default is `datadoghq.com`. See [Datadog sites][9] for other values.

{{< agent-only >}}
Use the supplied `DD_SITE` value. If no value is supplied or configured, tell the user that `datadoghq.com` is used. For deployments outside local development, list the environment variables that the user must configure before startup.
{{< /agent-only >}}

## Instrument the application

Choose the approach that matches your application:

| Approach | Use it for |
|----------|------------|
| [Automatic instrumentation][1] | Supported LLM providers and frameworks in Python, Node.js, and Java. |
| [SDK instrumentation][2] | Custom spans, workflows, evaluations, and session tracking. Go support is experimental and provides manual instrumentation only. |
| [OpenTelemetry instrumentation][4] | Applications and frameworks that emit supported OpenTelemetry spans. |
| [HTTP API instrumentation][3] | Custom integrations that submit spans and evaluations directly over HTTP. |

Automatic instrumentation captures input prompts, output completions, token usage and cost when available, latency, errors, model parameters, and framework metadata. Supported LLM calls do not require manual span creation.

Follow the [automatic instrumentation setup][11] to install and initialize the SDK for your language. For custom operations, add spans with the [SDK reference][2].

For direct HTTP submissions, use the [Spans API][12] and [Evaluations API][13].

{{< agent-only >}}
For Python, Node.js, or Java, follow the language-specific setup in the [automatic instrumentation guide](/llm_observability/instrument/auto_instrumentation.md#set-up-automatic-instrumentation). For a Next.js application, follow the [Next.js guide](/llm_observability/guide/nextjs_guide.md) instead of the general Node.js setup. For an OpenTelemetry application, follow the [OpenTelemetry guide](/llm_observability/instrument/otel_instrumentation.md). Return here after setup to instrument prompts and complete the remaining steps.
{{< /agent-only >}}

## Instrument prompts

See [Integrate Prompt Management][7] for prompt instrumentation instructions. You can use an existing managed prompt or promote a local prompt. Keep the local prompt as a fallback.

Complete instrumentation before adding this optional integration. Follow [Track prompt usage][6] to choose between automatic tracking and explicit annotations.

{{< agent-only >}}
After reporting the instrumentation results:

- If the user supplied a Datadog managed prompt ID, follow the [Prompt Management integration guide](/llm_observability/instrument/prompt_management.md). Do not ask whether to enable it again.
- Otherwise, identify the Python application's local prompts and ask whether the user wants to manage them in Datadog. If they agree, follow the guide to promote the selected prompts and integrate runtime retrieval.
- If the user declines or does not answer, leave the instrumented local prompts unchanged.
- If Prompt Management requires an SDK update, explain why and ask before changing the dependency. This optional update must not delay core instrumentation or context sharing.
{{< /agent-only >}}

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

## View traces

Run the application and exercise an instrumented LLM call. Open [Agent Observability][14] and select the application to inspect its traces.

To link directly to the application's data, use the application host for your [Datadog site][9] and filter by the application name:

```text
https://<APPLICATION_HOST>/llm/applications?query=@ml_app:<APPLICATION_NAME>
```

{{< agent-only >}}
Report the instrumentation changes, remaining setup requirements, and how to run the application. If context sharing was requested, report whether the upload succeeded. Do not claim that traces or recommendations are available without verification.

Provide a direct application link using the supplied or inferred application name. Determine the application host from `DD_SITE`: use `app.datadoghq.com` for `datadoghq.com`, `app.datadoghq.eu` for `datadoghq.eu`, `app.ddog-gov.com` for `ddog-gov.com`, and the `DD_SITE` value itself for other supported sites. URL-encode the query value.
{{< /agent-only >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrument/auto_instrumentation/
[2]: /llm_observability/instrument/sdk/
[3]: /llm_observability/instrument/api/
[4]: /llm_observability/instrument/otel_instrumentation/
[6]: /llm_observability/instrument/prompt_management/#track-prompt-usage
[7]: /llm_observability/instrument/prompt_management/
[8]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[9]: /getting_started/site/
[10]: /llm_observability/instrument/sdk/#application-naming-guidelines
[11]: /llm_observability/instrument/auto_instrumentation/#set-up-automatic-instrumentation
[12]: /llm_observability/instrument/api/?tab=model#spans-api
[13]: /llm_observability/instrument/api/?tab=model#evaluations-api
[14]: https://app.datadoghq.com/llm/applications
