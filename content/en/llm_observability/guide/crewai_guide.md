---
title: Datadog-CrewAI integration for LLM Observability
---

This guide demonstrates how to integrate LLM Observability with [CrewAI][1] using [auto-instrumentation][2]. This also includes how to submit LLM Observability traces to Datadog and view your CrewAI agent runs in Datadog's [Agentic Execution View][3].

## Getting started

### Install dependencies

Run this command to install the required dependencies:

```shell 
pip install ddtrace crewai crewai-tools

### Set environment variables

If you do not have a Datadog API key, create an account and [get your API key][4].

You also need to specify an _ML application name_ in the following environment variables. An ML application is a grouping of LLM Observability traces associated with a specific LLM-based application. See [Application naming guidelines][5] for more information on limitations with ML application names.

```shell 
export DD_API_KEY=<YOUR_DD_API_KEY>
export DD_SITE=<YOUR_DD_SITE>
export DD_LLMOBS_ENABLED=true
export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
export DD_LLMOBS_AGENTLESS_ENABLED=true
export DD_APM_TRACING_ENABLED=false
```

Additionally, configure any LLM provider API keys:

```shell 
export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
export ANTHROPIC_API_KEY=<YOUR_ANTHROPIC_API_KEY>
export GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
...
```

### Create a CrewAI agent application

The following example creates a CrewAI agent to solve a simple problem:


```python 
# crewai_agent.py
from crewai import Agent, Task, Crew

from crewai_tools import (
    WebsiteSearchTool
)

web_rag_tool = WebsiteSearchTool()

writer = Agent(
    role="Writer",
    goal="You make math engaging and understandable for young children through poetry",
    backstory="You're an expert in writing haikus but you know nothing of math.",
    tools=[web_rag_tool],
)

task = Task(
    description=("What is {multiplication}?"),
    expected_output=("Compose a haiku that includes the answer."),
    agent=writer
)

crew = Crew(
    agents=[writer],
    tasks=[task],
    share_crew=False
)

output = crew.kickoff(dict(multiplication="2 * 2"))
```

### Run the application with Datadog auto-instrumentation

With the [environment variables](#set-environment-variables) set, you can now run the application with Datadog auto-instrumentation.

```shell 
ddtrace-run python crewai_agent.py
```

### View the traces in Datadog

After running the application, you can view the traces in [Datadog LLM Observability's Traces View][6], selecting the ML application name you chose from the top-left dropdown.

Clicking on a trace shows you the details of the trace, including total tokens used, number of LLM calls, models used, and estimated cost. Clicking into a specific span narrows down these details and shows related input, output, and metadata.

{{< img src="llm_observability/guides/crewai/trace_view.png" alt="A trace in LLM Observability, where the user has clicked into a CrewAI Crew workflow span. Toggled to 'Span Details' view. On the left, a tree view of tool calls and LLM calls in the span. Input, output, and metadata are displayed." style="width:100%;" >}}

Additionally, you can view the execution graph view of the trace, which shows the control and data flow of the trace. This scales with larger agents to show handoffs and relationships between LLM calls, tool calls, and agent interactions.

{{< img src="llm_observability/guides/crewai/execution_graph.png" alt="The same trace in LLM Observability, toggled to 'Execution Graph' view. Control and data flow of the trace is displayed." style="width:100%;" >}}

[1]: https://docs.crewai.com/en/introduction
[2]: /llm_observability/instrumentation/auto_instrumentation
[3]: /llm_observability/monitoring/agent_monitoring
[4]: /account_management/api-app-keys/#api-keys
[5]: /llm_observability/instrumentation/sdk?tab=python#application-naming-guidelines
[6]: https://app.datadoghq.com/llm/traces