---
title: Tracing your LLM Applications
---
## Background Concepts
These terms and concepts will help you break down your application into distinct components to maximize the effectiveness of Datadog's LLM Monitoring product:

- Span - a span represents some unit of work your application is performing. Spans have a start time, duration, name, tags, and attributes. Spans can have parents and children.

- Span kind - span kind is a categorization of what kind of work the span is performing in your LLM application. They also determine the appropriate parent-child relationships.

- Root span - a root span is the first span in a trace.

## Span Kinds
Datadog's LLM Observability product currently supports 7 different span kinds. View a summary comparison of all span kinds here. [TODO: link to table]

### 1. LLM Span Kind
An LLM span represents an invocation call to an LLM where input and outputs are represented as text.

#### Python SDK
You can trace an LLM span by using LLMObs.llm() as a context manager with the following arguments:
model_name (Required): The name of the invoked LLM.
name: [default value: "lmm"] The name of the operation. 
model_provider:  [default value: "custom"] The name of the invoked LLM provider. 
from ddtrace.llmobs import LLMObs

```py
def llm_call():
	with LLMObs.llm(name="invoke_llm", model_name="claude", model_provider="anthropic") as llm_span:
		completion = ... # user application logic to invoke LLM
	return completion
```

Note: if you are using the following LLM providers, you do not need to manually start a span to trace these operations as Datadog's existing integrations automatically trace and annotate the LLM calls:
OpenAI (Using the OpenAI Python SDK)
AWS Bedrock (Using boto3/botocore)
LangChain LLM/Chat Models/Chains (Using LangChain)

### 2. Workflow Span Kind
Workflow spans represent any static sequence of operations. We recommend using workflows to group together an LLM call with its supporting contextual operations.

#### Python SDK
You can trace a workflow span by using LLMObs.workflow() as a context manager, and optionally specify the name argument with the name of the operation [default value: "workflow"].

```py
from ddtrace.llmobs import LLMObs

def process_message():
	with LLMObs.workflow(name="process_message") as workflow_span:
		... # user application logic
	return 
```

### 3. Agent Span Kind
Agent spans represent a dynamic sequence of operations where an autonomous decision maker determines which operations and tools to execute. Agent spans may have multiple workflow spans as children.

Example: A trace of a series of reasoning steps controlled by a ReAct agent 

#### Python SDK
You can trace an agent span by using LLMObs.agent() as a context manager, and optionally specify the name argument with the name of the operation [default value: "agent"].

```py
from ddtrace.llmobs import LLMObs

def run_agent():
	with LLMObs.agent(name="react_agent") as agent_span:
		... # user application logic
	return 
```

### 4. Tool Span Kind
Tool spans represent a standalone step in a workflow or agent that involves a call to an external program or service.

Examples: A call to a web API, a database query

#### Python SDK
You can trace a tool span by using LLMObs.tool() as a context manager, and optionally specify the name argument with the name of the operation [default value: "tool"].

```py
from ddtrace.llmobs import LLMObs

def call_weather_api():
	with LLMObs.tool(name="get_current_weather") as tool_span:
		... # user application logic
	return 
```

### 5. Task Span Kind
Task spans represent a standalone step in a workflow or agent that does not involve a call to an external service.

Example: A data sanitization step before a prompt is submitted to the LLM

#### Python SDK
You can trace a task span by using LLMObs.task() as a context manager and optionally specify the name argument with the name of the operation [default value: "task"].

```py
from ddtrace.llmobs import LLMObs

def sanitize_input():
	with LLMObs.task(name="sanitize_input") as task_span:
		... # user application logic
	return 
```

### 6. Embedding Span Kind
Embedding spans represent a standalone call to an embedding model or function to create an embedding.

Example: A call to OpenAI's embedding endpoint

#### Python SDK

You can trace an embedding span by using LLMObs.embedding() as a context manager and optionally specify the name argument with the name of the operation [default value: "embedding"].

```py
from ddtrace.llmobs import LLMObs

def perform_embedding():
	with LLMObs.embedding(name="openai_embedding") as embedding_span:
		... # user application logic
	return 
```

### 7. Retrieval Span Kind

Retrieval spans represent a vector search operation involving a list of documents being returned from an external knowledge base. When used alongside embedding spans, retrieval spans can provide visibility into retrieval augmented generation (RAG) operations.

Example: A similarity search to a vector store to return relevant documents to be used to augment a user prompt for a given topic

#### Python SDK
You can trace a retrieval span by using LLMObs.retrieval() as a context manager and optionally specify the name argument with the name of the operation [default value: "retrieval"].

```py
from ddtrace.llmobs import LLMObs

def similarity_search():
	with LLMObs.retrieval(name="get_relevant_docs") as retrieval_span:
		... # user application logic
	return 
	```

## Span Kind Comparison Table

| Use Case  | Description | Root span? | Has Children? | Examples |
|-----------|-------------|------------|---------------|----------|
| Agent     | Agent spans represent a series of choices made by a language model, often consisting of tool calls and calls to external knowledge bases. | Yes, agent spans are frequently the root span for traces that are controlled by LLM reasoning engines | Yes, agent spans consist of a series of child steps orchestrated by a reasoning engine | An airlines customer service chatbot that can book flights, answer frequently asked questions, help with general trip planning, and more. A trace of a series of reasoning steps controlled by a ReAct agent |
| Workflow  | Workflow spans represent a predetermined sequence of steps, often consisting of some combination of tool calls and data retrieval. | Yes, workflows are frequently the root span for a trace that consists of a standardized sequence. | Yes, workflow spans represent a sequence of child spans. | A function/service that takes an arxiv paper link and returns a summary. Involves a tool call to fetch the paper, some text processing tasks, and an LLM summarization. |
| LLM       | LLM represents individual LLM calls. | Yes, on occasion simple traces will consist of a single LLM span | No, LLM spans are leaf nodes that represent direct calls to an LLM | A call to a model like OpenAI gpt 4 |
| Tool      | Tool spans represent function calls to external programs or services | No | No, tool spans are leaf nodes that represent a tool execution | A call to a web search API. A calculator |
| Embedding | Embedding spans represent a call to an embedding model to create an embedding suitable for sending into a subsequent retrieval step | No | Yes, on occasion embedding spans can have task span children – but often they will be leaf spans | A call to an embedding model such as text-embedding-ada-002 |
| Retrieval | Retrieval spans represent an array of documents returned from an external knowledge base | No | No, retrieval spans represent a single retrieval step | A call to a vector database that returns an array of ranked documents |
| Task      | A task span is a step in the chain that does not involve a call to an external service | No | No, task spans are leaf nodes that represent a self-contained task | A data preprocessing step |
