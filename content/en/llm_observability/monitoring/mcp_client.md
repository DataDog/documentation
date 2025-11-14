---
title: Monitor MCP Clients
description: Learn how to instrument and monitor MCP clients with LLM Observability.
aliases:
  - /llm_observability/guide/mcp_client
---

## Automatic Instrumentation

If you are using the official MCP Python package to connect to an MCP server with an MCP client session, you can enable automatic instrumentation by

1. Installing the `ddtrace` package:

{{< code-block lang="shell">}}
pip install ddtrace
{{< /code-block >}}

2. Setting the required environment variables:

{{< code-block lang="shell">}}
export DD_LLMOBS_ENABLED=true
export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
export DD_LLMOBS_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
{{< /code-block >}}

3. Running your application with the `ddtrace-run` command:

{{< code-block lang="shell">}}
ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

## Manual Instrumentation

If you are not using the official MCP Python package, or your MCP clients are written in a different language, you can manually instrument your MCP clients using the LLM Observability SDKs to add the required spans and tags to utilize the LLM Observability MCP client monitoring features.

1. Import the LLM Observability SDK:

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
from ddtrace.llmobs import LLMObs
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
const { llmobs } = require('dd-trace');
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
import datadog.trace.api.llmobs.LLMObs;
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

2. Start a workflow span around your MCP client session:

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
with LLMObs.workflow(name="MCP Client Session") as client_session_span:
    # MCP client session logic
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
llmobs.trace({ kind: 'workflow', name: 'MCP Client Session' }, async (clientSessionSpan) => {
  // MCP client session logic
})
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
LLMObsSpan clientSessionSpan = LLMObs.startWorkflowSpan("MCP Client Session");
// MCP client session logic
clientSessionSpan.finish();
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. Start a task span around your MCP client session initialization call within your client session. Annotate the parent client session span with the server information returned from the initialization call.

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
with LLMObs.task(name="MCP Client Session Initialization"):
    server_info = initialize_mcp_client()
    LLMObs.annotate(
        client_session_span,
        tags={
            "mcp_server_name": server_info.name,
            "mcp_server_version": server_info.version,
            "mcp_server_title": server_info.title,
        }
    )
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
llmobs.trace({ kind: 'task', name: 'MCP Client Session Initialization' }, async () => {
  const serverInfo = await initializeMcpClient();
  llmobs.annotate(clientSessionSpan, {
    tags: {
      mcp_server_name: serverInfo.name,
      mcp_server_version: serverInfo.version,
      mcp_server_title: serverInfo.title,
    }
  });
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
LLMObsSpan initializationTaskSpan = LLMObs.startTaskSpan("MCP Client Session Initialization");
Object serverInfo = initializeMcpClient();
clientSessionSpan.setTags(Map.of(
  "mcp_server_name", serverInfo.name(),
  "mcp_server_version", serverInfo.version(),
  "mcp_server_title", serverInfo.title(),
));
initializationTaskSpan.finish();
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

4. Start a tool span around your tool calls to the MCP server within your client session. Annotate the tool span with the MCP tool type ("client", as opposed to "server" for server-side monitoring), as well as the server name from the information returned from the initialization call. If the tool call returns an error from the MCP server, even if it would not normally raise or throw an error, mark the tool span with an error.

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
name, arguments = get_next_tool_call()
with LLMObs.tool(name=f"MCP Client Tool: {name}") as tool_span:
    result = call_tool(name, arguments)

    if result.isError:
        tool_span.error = 1
        tool_span.set_tag("error.message", result.content[0].text)

    LLMObs.annotate(
            input_data=arguments,
            output_data=result,
            tags={
              "mcp_server_name": server_info.name,
              "mcp_tool_kind": "client",
            }
        )
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
const { name, arguments } = await getNextToolCall();
llmobs.trace({ kind: 'tool', name: `MCP Client Tool: ${name}` }, async () => {
  const result = await callTool(name, arguments);

  if (result.isError) {
    toolSpan.setTag("error", true);
    toolSpan.setTag("error.message", result.content[0].text);
  }

  llmobs.annotate({
    inputData: arguments,
    outputData: result,
    tags: { mcp_server_name: serverInfo.name, mcp_tool_kind: "client" }
  });
})
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
Object tool = await getNextToolCall();
LLMObsSpan toolSpan = LLMObs.startToolSpan("MCP Client Tool: " + tool.name());
Object result = callTool(tool.name(), tool.arguments());

if (result.isError) {
  toolSpan.setError(true);
  toolSpan.setErrorMessage(result.content[0].text);
}

toolSpan.annotateIO(arguments, result);
toolSpan.setTag("mcp_tool_kind", "client");
toolSpan.setTag("mcp_server_name", serverInfo.name());
toolSpan.finish();
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

5. In total, your MCP client should be instrumented as follows

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
with LLMObs.workflow(name="MCP Client Session") as client_session_span:
    with LLMObs.task(name="MCP Client Session Initialization"):
        server_info = initialize_mcp_client()
        LLMObs.annotate(
            client_session_span,
            tags={
                "mcp_server_name": server_info.name,
                "mcp_server_version": server_info.version,
                "mcp_server_title": server_info.title,
            }
        )

    tools = list_tools()  # get the list of tools from the MCP server

    # tool calls as part of a user feedback loop or user interaction
    name, arguments = get_next_tool_call()
    with LLMObs.tool(name=f"MCP Client Tool: {name}") as tool_span:
        result = call_tool(name, arguments)

        if result.isError:
            tool_span.error = 1
            tool_span.set_tag("error.message", result.content[0].text)

        LLMObs.annotate(
            input_data=arguments,
            output_data=result,
            tags={
              "mcp_server_name": server_info.name,
              "mcp_tool_kind": "client",
            }
        )
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
llmobs.trace({ kind: 'workflow', name: 'MCP Client Session' }, async (clientSessionSpan) => {
  llmobs.trace({ kind: 'task', name: 'MCP Client Session Initialization' }, async () => {
    const serverInfo = await initializeMcpClient();
    llmobs.annotate(clientSessionSpan, {
      tags: {
        mcp_server_name: serverInfo.name,
        mcp_server_version: serverInfo.version,
        mcp_server_title: serverInfo.title,
      }
    });
  });

  const tools = await listTools(); // get the list of tools from the MCP server

  // tool calls as part of a user feedback loop or user interaction
  const { name, arguments } = await getNextToolCall();
  llmobs.trace({ kind: 'tool', name: `MCP Client Tool: ${name}` }, async () => {
    const result = await callTool(name, arguments);

    if (result.isError) {
      toolSpan.setTag("error", true);
      toolSpan.setTag("error.message", result.content[0].text);
    }

    llmobs.annotate({
      inputData: arguments,
      outputData: result,
      tags: { mcp_server_name: serverInfo.name, mcp_tool_kind: "client" }
    });
  });
})
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
LLMObsSpan clientSessionSpan = LLMObs.startWorkflowSpan("MCP Client Session");
LLMObsSpan initializationTaskSpan = LLMObs.startTaskSpan("MCP Client Session Initialization");
Object serverInfo = initializeMcpClient();
clientSessionSpan.setTags(Map.of(
  "mcp_server_name", serverInfo.name(),
  "mcp_server_version", serverInfo.version(),
  "mcp_server_title", serverInfo.title(),
));
initializationTaskSpan.finish();

List<Object> tools = listTools(); // get the list of tools from the MCP server

// tool calls as part of a user feedback loop or user interaction
Object tool = getNextToolCall();
LLMObsSpan toolSpan = LLMObs.startToolSpan("MCP Client Tool: " + tool.name());
Object result = callTool(tool.name(), tool.arguments());

if (result.isError) {
  toolSpan.setTag("error", true);
  toolSpan.setTag("error.message", result.content[0].text);
}

toolSpan.annotateIO(tool.arguments(), result);
toolSpan.setTag("mcp_tool_kind", "client");
toolSpan.setTag("mcp_server_name", serverInfo.name());
toolSpan.finish();
// ... more tool calls, tasks, or user interactions
clientSessionSpan.finish(); // finish at the end of the client session scope
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

6. Set the necessary environment variables to enable MCP client monitoring:

{{< code-block lang="shell">}}
export DD_LLMOBS_ENABLED=true
export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
export DD_LLMOBS_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
{{< /code-block >}}

7. Run your application:

{{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
java -javaagent:dd-java-agent.jar -Ddd.llmobs.enabled=true -Ddd.llmobs.ml-app=<YOUR_ML_APP_NAME> -Ddd.llmobs.agentless-enabled=true -Ddd.api-key=<YOUR_API_KEY> -Ddd.site=<YOUR_DATADOG_SITE> <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}
