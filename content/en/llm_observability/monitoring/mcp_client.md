---
title: MCP Clients
description: Learn how to instrument and monitor MCP clients with LLM Observability.

further_reading:
  - link: https://www.datadoghq.com/blog/mcp-client-monitoring
    tag: Blog
    text: Gain end-to-end visibility into MCP clients with Datadog LLM Observability

---

You can monitor your MCP clients with Datadog LLM Observability in two ways:

- [Automatic instrumentation](#automatically-instrument-your-mcp-client): If you are using the official [MCP Python SDK][1]
- [Manual instrumentation](#manually-instrument-your-mcp-client): If you are not using the official MCP Python SDK, or your MCP clients are written in Node.js or Java

## Automatically instrument your MCP client

If you are using the official MCP Python SDK to connect to an MCP server with an MCP client session, use the following steps to automatically instrument your MCP client application:

1. Install `ddtrace`:

   {{< code-block lang="shell">}}
pip install ddtrace
{{< /code-block >}}

2. Set the required environment variables:

   ```shell
   export DD_LLMOBS_ENABLED=true
   export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
   export DD_LLMOBS_AGENTLESS_ENABLED=true
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_SITE={{< region-param key="dd_site" >}}
   ```

3. Run your application with the `ddtrace-run` command:

   {{< code-block lang="shell">}}
ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

## Manually instrument your MCP client

You can also manually instrument your MCP client by using Datadog's [LLM Observability SDKs][2] for Python, Node.js, and Java. Use the following steps to add the required tags and spans:

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

3. Within your client session, start a task span around your MCP client session initialization call. Annotate the parent client session span with the server information returned from the initialization call.

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

4. Start a task span around your call to the MCP server for getting the list of available tools within your client session.

   {{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="python">}}
with LLMObs.task(name="MCP Client Session List Tool"):
    tools = list_tools()
    LLMObs.annotate(
      output_data=tools,
    )
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript">}}
const tools = await llmobs.trace({ kind: 'task', name: 'MCP Client Session List Tool' }, async () => {
  const tools = await listTools();
  llmobs.annotate({
    outputData: tools,
  });

  return tools;
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java">}}
LLMObsSpan toolsListTaskSpan = LLMObs.startTaskSpan("MCP Client Session List Tool");
List<Object> tools = listTools();
toolsListTaskSpan.annotateIO(null, tools);
toolsListTaskSpan.finish();
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

5. Within your client session, start a tool span around your tool calls to the MCP server. Annotate the tool span with:
   - The server name from the information returned from the initialization call
   - The MCP tool type (`client`; for server-side monitoring, use `server`)
    
   
   If the tool call returns an error from the MCP server (even if it would not normally raise or throw an error) mark the tool span with an error.

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

6. At this point, your instrumentation is complete. Your code should resemble the following:

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

    with LLMObs.task(name="MCP Client Session List Tool"):
        tools = list_tools()
        LLMObs.annotate(
          output_data=tools,
        )

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

  const tools = await llmobs.trace({ kind: 'task', name: 'MCP Client Session List Tool' }, async () => {
    const tools = await listTools();
    llmobs.annotate({
      outputData: tools,
    });

    return tools;
  });

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

LLMObsSpan toolsListTaskSpan = LLMObs.startTaskSpan("MCP Client Session List Tool");
List<Object> tools = listTools();
toolsListTaskSpan.annotateIO(null, tools);
toolsListTaskSpan.finish();

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

7. Set the required environment variables:

   ```shell
   export DD_LLMOBS_ENABLED=true
   export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
   export DD_LLMOBS_AGENTLESS_ENABLED=true
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_SITE={{< region-param key="dd_site" >}}
   ```

8. Run your application:

   {{< tabs >}}

{{% tab "Python" %}}
{{< code-block lang="shell">}}
ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="shell">}}
NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="shell">}}
java -javaagent:dd-java-agent.jar -Ddd.llmobs.enabled=true -Ddd.llmobs.ml-app=<YOUR_ML_APP_NAME> -Ddd.llmobs.agentless-enabled=true -Ddd.api-key=<YOUR_API_KEY> -Ddd.site=<YOUR_DATADOG_SITE> <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}


[1]: https://github.com/modelcontextprotocol/python-sdk
[2]: /llm_observability/instrumentation/sdk