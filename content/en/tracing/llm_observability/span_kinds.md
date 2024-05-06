---
title: Span kinds
kind: documentation
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

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

## Agent span

Agent spans represent a dynamic sequence of operations where an autonomous decision-maker determines which operations and tools to execute. For example, an agent span might represent a series of reasoning steps controlled by a [ReAct agent][react-agent].

Agent spans are frequently the root span for traces controlled by LLM reasoning engines.

### Child spans

Agent spans may have multiple workflow spans as children. These represent child steps orchestrated by a reasoning engine.

## Workflow span

Workflow spans represent any *static* sequence of operations. Use workflows to group together an LLM call with its supporting contextual operations.

Workflow spans are frequently the root span of a trace consisting of a standard sequence. For example, a function might take an arXiv paper link and return a summary. This process might involve a tool call to fetch the paper, some text-processing tasks, and an LLM summarization.

### Child spans

Workflow spans have child spans representing the sequence of steps in the workflow.

## LLM span

An LLM span represents an invocation call to an LLM where input and outputs are represented as text.

Occasionally, a trace contains a single LLM span, in which case the LLM span is the root of the trace.

### Child spans

LLM spans do not have child spans, as they are leaf nodes representing a direct call to an LLM.

## Tool span

Tool spans represent a standalone step in a workflow or agent that involves a call to an external program or service, such as a web API or database.

### Child spans

Tool spans do not have child spans, as they are leaf nodes representing a tool execution.

## Embedding span

Embedding spans represent a standalone call to an embedding model or function to create an embedding, such as a call to OpenAI's embedding endpoint.

### Child spans

Embedding spans can have task spans as children, but often do not have children.

## Retrieval span

Retrieval spans represent a vector search operation involving a list of documents being returned from an external knowledge base, such as a similarity search to a vector store to collect relevant documents for augmenting a user prompt for a given topic.

When used alongside embedding spans, retrieval spans can provide visibility into retrieval augmented generation (RAG) operations.

### Child spans

Retrieval spans do not have child spans, as they represent a single retrieval step.

## Task span

Task spans represent a standalone step in a workflow or agent that does not involve a call to an external service, such as a data sanitization step before a prompt is submitted to an LLM.

### Child spans

Task spans do not have child spans.

[open-ai-python-sdk]: https://github.com/openai/openai-python
[boto3]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[botocore]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[langchain]: https://github.com/langchain-ai/langchain
[react-agent]: https://react-lm.github.io/