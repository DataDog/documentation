---
title: Spans
---

## Overview

A *span* represents some unit of work that your application is performing. Spans have a start time, duration, name, tags, and attributes.

Multiple spans combine to form a trace:

{{< img src="tracing/llm_observability/example-trace.png" alt="An LLM Observability trace made up of several spans" style="width:90%;" >}}

TODO: Link to the higher-level tracing documentation for a sense of how spans fit into the bigger picture.

## Span kinds

As shown in the image above, an LLM Observability trace can contain several kinds of spans: Agent, LLM, Workflow, and so on. The *span kind* categorizes the type of work the span is performing in an LLM application. 

Different span kinds have different parent-child relationships, and only some kinds can be the root span of a trace.

LLM Observability supports the following span kinds:

| Kind      | Represents   | Root span?   | Can have child spans? |
|-----------|--------------|--------------|-------------|
| [Agent](#agent-span)     | A series of choices made by a language model, often consisting of tool calls and calls to external knowledge bases | Yes | Yes  |
| [Workflow](#workflow-span)  | A predetermined sequence of steps, often consisting of some combination of tool calls and data retrieval | Yes | Yes |
| [LLM](#llm-span)      | Individual LLM calls, such as a call to OpenAI GPT-4 | Yes | No |
| [Tool](#tool-span)      | Function calls to external programs or services, such as a web search API | No | No |
| [Embedding](#embedding-span) | A call to an embedding model to create an embedding suitable for sending into a subsequent retrieval step | No  | Yes |
| [Retrieval](#retrieval-span) | An array of documents returned from an external knowledge base | No | No | 
| [Task](#task-span)      | A step in the chain that does not involve a call to an external service, such as a data preprocessing step | No | No |

TODO: Transfer the details removed from this table into the individual span sections.

### Agent span

Agent spans represent a dynamic sequence of operations where an autonomous decision-maker determines which operations and tools to execute. For example, an agent span might represent a series of reasoning steps controlled by a [ReAct agent][react-agent].

Agent spans are frequently the root span for traces controlled by LLM reasoning engines.

#### Child spans

Agent spans may have multiple workflow spans as children. These represent child steps orchestrated by a reasoning engine.

#### Tracing an Agent span

You can trace an Agent span by using `LLMObs.agent()` as a context manager with the following argument:

`name`
: optional - _string_ - **default**: `"agent"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def run_agent():
	with LLMObs.agent(name="react_agent") as agent_span:
		... # user application logic
	return 
{{< /code-block >}}

### Workflow span

Workflow spans represent any *static* sequence of operations. Use workflows to group together an LLM call with its supporting contextual operations.

Workflow spans are frequently the root span of a trace consisting of a standard sequence. For example, a function might take an arXiv paper link and return a summary. This process might involve a tool call to fetch the paper, some text-processing tasks, and an LLM summarization.

#### Child spans

Workflow spans have child spans representing the sequence of steps in the workflow.

#### Tracing a workflow span

You can trace a workflow span by using `LLMObs.workflow()` as a context manager with the following argument:

`name`
: optional - _string_ - **default**: `"workflow"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
	with LLMObs.workflow(name="process_message") as workflow_span:
		... # user application logic
	return 
{{< /code-block >}}

### LLM span

An LLM span represents an invocation call to an LLM where input and outputs are represented as text.

Occasionally, a trace contains a single LLM span, in which case the LLM span is the root of the trace.

#### Child spans

LLM spans do not have child spans, as they are leaf nodes representing a direct call to an LLM.

#### Tracing an LLM span

If you are using one of the following LLM providers, you do not need to manually start a span to trace these operations, as Datadog's existing integrations automatically trace and annotate the LLM calls:

- OpenAI (using the [OpenAI Python SDK][open-ai-python-sdk])
- AWS Bedrock (using [Boto3][boto3]/[Botocore][botocore])
- LangChain LLM/Chat Models/Chains (using [LangChain][langchain])

You can trace an LLM span by using `LLMObs.llm()` as a context manager with the following arguments:

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_ - **default**: `"llm"`
<br/>The name of the operation.

`model_provider`
: optional - _string_ - **default**: `"custom"`

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def llm_call():
	with LLMObs.llm(name="invoke_llm", model_name="claude", model_provider="anthropic") as llm_span:
		completion = ... # user application logic to invoke LLM
	return completion
{{< /code-block >}}

### Tool span

Tool spans represent a standalone step in a workflow or agent that involves a call to an external program or service, such as a web API or database.

#### Child spans

Tool spans do not have child spans, as they are leaf nodes representing a tool execution.

#### Tracing a tool span

You can trace a tool span by using `LLMObs.tool()` as a context manager with the following argument:

`name`
: optional - _string_ - **default**: `"tool"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def call_weather_api():
	with LLMObs.tool(name="get_current_weather") as tool_span:
		... # user application logic
	return 
{{< /code-block >}}

### Embedding span

Embedding spans represent a standalone call to an embedding model or function to create an embedding, such as a call to OpenAI's embedding endpoint.

#### Child spans

Embedding spans can have task spans as children, but often do not have children.

#### Tracing an embedding span

You can trace an embedding span by using `LLMObx.embedding()` as a context manager with the following arguments:

`name`
: optional - _string_ - **default**: `"embedding"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def perform_embedding():
	with LLMObs.embedding(name="openai_embedding") as embedding_span:
		... # user application logic
	return 
{{< /code-block >}}

### Retrieval span

Retrieval spans represent a vector search operation involving a list of documents being returned from an external knowledge base, such as a similarity search to a vector store to collect relevant documents for augmenting a user prompt for a given topic.

When used alongside embedding spans, retrieval spans can provide visibility into retrieval augmented generation (RAG) operations.

#### Child spans

Retrieval spans do not have child spans, as they represent a single retrieval step.

#### Tracing a retrieval span

You can trace a retrieval span by using `LLMObs.retrieval()` as a context manager with the following argument:

`name`
: optional - _string_ - **default**: `"retrieval"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def similarity_search():
	with LLMObs.retrieval(name="get_relevant_docs") as retrieval_span:
		... # user application logic
	return 
{{< /code-block >}}

### Task span

Task spans represent a standalone step in a workflow or agent that does not involve a call to an external service, such as a data sanitization step before a prompt is submitted to an LLM.

#### Child spans

Task spans do not have child spans.

#### Tracing a task span

You can trace a task span by using `LLMObs.task()` as a context manager with the following argument:

`name`
: optional - _string_ - **default**: `"task"`
<br/>The name of the operation.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def sanitize_input():
	with LLMObs.task(name="sanitize_input") as task_span:
		... # user application logic
	return 
{{< /code-block >}}

[open-ai-python-sdk]: https://github.com/openai/openai-python
[boto3]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[botocore]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[langchain]: https://github.com/langchain-ai/langchain
[react-agent]: https://react-lm.github.io/