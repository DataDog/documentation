---
title: Agent Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "https://www.datadoghq.com/blog/llm-observability-hallucination-detection/"
  tag: "Blog"
  text: "Detect hallucinations in your RAG LLM applications with Datadog LLM Observability"
aliases:
    - /llm_observability/evaluations/agent_evaluations
---

Agent evaluations help ensure that your LLM-powered applications are making the right tool calls and resolving user requests successfully. These checks are designed to catch common failure modes when agents interact with external tools, APIs, or workflows.


## Tool Selection

This evaluation checks whether the agent successfully selected the appropriate tools to address the user’s request. Incorrect or irrelevant tool choices lead to wasted calls, higher latency, and failed tasks.

### Evaluation Summary

| **Span kind** | **Method** | **Definition** | 
|---|---|---|
| Evaluated on **LLM spans**| Evaluated using LLM | Verifies that the tools chosen by the LLM align with the user’s request and the set of available tools. Flags irrelevant or incorrect tool calls. |

### Example

{{< img src="llm_observability/evaluations/tool_selection_failure.png" alt="A tool selection failure detected by the evaluation in LLM Observability" style="width:100%;" >}}

### How to use
1. Ensure you are running `dd-trace` v3.12+.
1. Instrument your agent with available tools. The example below uses the OpenAI Agents SDK to illustrate how tools are made available to the agent and to the evaluation:
1. Enable the `ToolSelection` evaluation in the Datadog UI by [creating a new evaluation][1] or [editing an existing evaluation][2].

This evaluation is supported in `dd-trace` version 3.12+. The example below uses the OpenAI Agents SDK to illustrate how tools are made available to the agent and to the evaluation:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from agents import Agent, ModelSettings, function_tool

@function_tool
def add_numbers(a: int, b: int) -> int:
    """
    Adds two numbers together.
    """
    return a + b

@function_tool
def subtract_numbers(a: int, b: int) -> int:
    """
    Subtracts two numbers.
    """
    return a - b
    

# List of tools available to the agent 
math_tutor_agent = Agent(
    name="Math Tutor",
    handoff_description="Specialist agent for math questions",
    instructions="You provide help with math problems. Please use the tools to find the answer.",
    model="o3-mini",
    tools=[
        add_numbers, subtract_numbers
    ],
)

history_tutor_agent = Agent(
    name="History Tutor",
    handoff_description="Specialist agent for history questions",
    instructions="You provide help with history problems.",
    model="o3-mini",
)

# The triage agent decides which specialized agent to hand off the task to — another type of tool selection covered by this evaluation.
triage_agent = Agent(  
    'openai:gpt-4o',
    model_settings=ModelSettings(temperature=0),
    instructions='What is the sum of 1 to 10?',  
    handoffs=[math_tutor_agent, history_tutor_agent],
)
{{< /code-block >}}

### Troubleshooting

- If you frequently see irrelevant tool calls, review your tool descriptions—they may be too vague for the LLM to distinguish.
- Make sure you include descriptions of the tools (i.e. the quotes containing the tool description under the function name, the sdk autoparses this as the description)

## Tool Argument Correctness

Even if the right tool is selected, the arguments passed to it must be valid and contextually relevant. Incorrect argument formats (for example, a string instead of an integer) or irrelevant values cause failures in downstream execution.

### Evaluation summary

| **Span kind** | **Method** | **Definition** | 
|---|---|---|
| Evaluated on **LLM spans** | Evaluated using LLM | Verifies that arguments provided to a tool are correct and relevant based on the tool schema. Identifies invalid or irrelevant arguments. |

### Example

{{< img src="llm_observability/evaluations/tool_argument_correctness_error.png" alt="A tool argument correctness error detected by the evaluation in LLM Observability" style="width:100%;" >}}

##### Instrumentation

This evaluation is supported in `dd-trace` v3.12+. The example below uses the OpenAI Agents SDK to illustrate how tools are made available to the agent and to the evaluation:

### How to use

1. Install `dd-trace` v3.12+.
1. Instrument your agent with available tools that require arguments. The example below uses Pydantic AI Agents SDK to illustrate how tools are made available to the agent and to the evaluation:

Enable the ToolArgumentCorrectness evaluation in the Datadog UI by [creating a new evaluation][1] or [editing an existing evaluation][2].

{{< code-block lang="python" >}}
import os

from ddtrace.llmobs import LLMObs
from pydantic_ai import Agent


# Define tools as regular functions with type hints
def add_numbers(a: int, b: int) -> int:
    """
    Adds two numbers together.
    """
    return a + b


def subtract_numbers(a: int, b: int) -> int:
    """
    Subtracts two numbers.
    """
    return a - b

    
def multiply_numbers(a: int, b: int) -> int:
    """
    Multiplies two numbers.
    """
    return a * b


def divide_numbers(a: int, b: int) -> float:
    """
    Divides two numbers.
    """
    return a / b


# Enable LLMObs
LLMObs.enable(
    ml_app="jenn_test",
    api_key=os.environ["DD_API_KEY"],
    site=os.environ["DD_SITE"],
    agentless_enabled=True,
)


# Create the Math Tutor agent with tools
math_tutor_agent = Agent(
    'openai:gpt-5-nano',
    instructions="You provide help with math problems. Please use the tools to find the answer.",
    tools=[add_numbers, subtract_numbers, multiply_numbers, divide_numbers],
)

# Create the History Tutor agent (note: gpt-5-nano doesn't exist, using gpt-4o-mini)
history_tutor_agent = Agent(
    'openai:gpt-5-nano',
    instructions="You provide help with history problems.",
)

# Create the triage agent
# Note: pydantic_ai handles handoffs differently - you'd typically use result_type 
# or custom logic to route between agents
triage_agent = Agent(
    'openai:gpt-5-nano',
    instructions=(
        'DO NOT RELY ON YOUR OWN MATHEMATICAL KNOWLEDGE, '
        'MAKE SURE TO CALL AVAILABLE TOOLS TO SOLVE EVERY SUBPROBLEM.'
    ),
    tools=[add_numbers, subtract_numbers, multiply_numbers, divide_numbers],
)


# Run the agent synchronously
result = triage_agent.run_sync(
    '''
    Help me solve the following problem:
    What is the sum of the numbers between 1 and 100?
    Make sure you list out all the mathematical operations (addition, subtraction, multiplication, division) in order before you start calling tools in that order.
    '''
)
{{< /code-block >}}

### Troubleshooting
- Make sure your tools use type hints—the evaluation relies on schema definitions.
- Make sure to include a tool description (for example, the description in quotes under the function name), this is used in the auto-instrumentation process to parse the tool’s schema
- Validate that your LLM prompt includes enough context for correct argument construction.


## Goal Completeness

An agent can call tools correctly but still fail to achieve the user’s intended goal. This evaluation checks whether your LLM chatbot can successfully carry out a full session by effectively meeting the user’s needs from start to finish. This completeness measure serves as a proxy for gauging user satisfaction over the course of a multi-turn interaction and is especially valuable for LLM chatbot applications.

### Evaluation summary
| **Span kind** | **Method** | **Definition** | 
|---|---|---|
| Evaluated on LLM spans | Evaluated using LLM | Checks whether the agent resolved the user’s intent by analyzing full session spans. Runs only on sessions marked as completed. |

### Example
{{< img src="llm_observability/evaluations/goal_completeness.png" alt="A Goal Completeness evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}


##### How to Use

To enable Goal Completeness evaluation, you need to instrument your application to track sessions and their completion status. This evaluation works by analyzing complete sessions to determine if all user intentions were successfully addressed.

The evaluation requires sending a span with a specific tag when the session ends. This signal allows the evaluation to identify session boundaries and trigger the completeness assessment:

For optimal evaluation accuracy and cost control, it is preferable to send a tag when the session is finished and configure the evaluation to run only on session with this tag. The evaluation returns a detailed breakdown including resolved intentions, unresolved intentions, and reasoning for the assessment. A session is considered incomplete if more than 50% of identified intentions remain unresolved.


{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

# Call this function whenever your session has ended
@llm(model_name="model_name", model_provider="model_provider")
def send_session_ended_span(input_data, output_data) -> None:
    """Send a span to indicate the chat session has ended."""
    LLMObs.annotate(
        input_data=input_data,
        output_data=output_data,
        tags={"session_status": "completed"}
    )
{{< /code-block >}}

Replace `session_status` and `completed` with your preferred tag key and value.

The span should contain meaningful `input_data` and `output_data` that represent the final state of the session. This helps the evaluation understand the session's context and outcomes when assessing completeness.

##### Goal completeness configuration

After instrumenting your application to send session-end spans, configure the evaluation to run only on sessions with your specific tag. This targeted approach ensures the evaluation analyzes complete sessions rather than partial interactions.

1. Go to the **Goal Completeness** settings
2. Configure the evaluation data:
   - Select **spans** as the data type since Goal Completeness runs on LLM spans which contains the full session history.
   - Choose the tag name associated with the span that corresponds to your session-end function (for example, `send_session_ended_span`).
   - In the **tags** section, specify the tag you configured in your instrumentation (for example, `session_status:completed`).

This configuration ensures evaluations run only on complete sessions. This provides accurate assessments of user intention resolution.

### Troubleshooting
- If evaluations are skipped, check that you are tagging session-end spans correctly.
- Ensure your agent is configured to signal the end of a user request cycle.


[1]: /llm_observability/evaluations/managed_evaluations/#create-new-evaluations
[2]: /llm_observability/evaluations/managed_evaluations/#edit-existing-evaluations
