---
title: LLM Observability Quickstart
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

Our quickstart docs make use of the LLM Observability SDK for Python. For detailed usage, see [the SDK documentation][1]. If your application is written in another language, you can create traces by calling the [API][8] instead.

## Jupyter notebook quickstart

To run examples from Jupyter notebooks, see the [LLM Observability Jupyter Notebooks repository][12].

## Command-line quickstart

Use the steps below to run a simple Python script that generates an LLM Observability trace.

### Prerequisites

- LLM Observability requires a Datadog API key (see [the instructions for creating an API key][7]).
- The example script below uses OpenAI, but you can modify it to use a different provider. To run the script as written, you need:
    - An OpenAI API key stored in your environment as `OPENAI_API_KEY`. To create one, see [Account Setup][4] and [Set up your API key][6] in the OpenAI documentation.
    - The OpenAI Python library installed. See [Setting up Python][5] in the OpenAI documentation for instructions.

### 1. Install the SDK

Install the following `ddtrace` package hash and `openai` package:

{{< code-block lang="shell" >}}
pip install git+https://github.com/DataDog/dd-trace-py.git@main
pip install openai
{{< /code-block >}}

### 2. Create the script

The Python script below makes a single OpenAI call. Save it as `quickstart.py`.

{{< code-block lang="python" filename="quickstart.py" >}}
import os
from openai import OpenAI

oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

completion = oai_client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
)
{{< /code-block >}}

### 3. Run the script

Run the Python script with the following shell command, sending a trace of the OpenAI call to Datadog:

{{< code-block lang="shell" >}}
DD_LLMOBS_ENABLED=1 DD_LLMOBS_APP_NAME=onboarding-quickstart \ 
DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DATADOG_SITE> \ 
DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
{{< /code-block >}}

For details on the required environment variables, see [the SDK documentation][9].

### 4. View the trace

A trace of your LLM call should appear in [the Traces tab][3] of LLM Observability in Datadog.

{{< img src="tracing/llm_observability/quickstart-trace.png" alt="An LLM Observability trace displaying a single LLM request" style="width:100%;" >}}

The trace you see is composed of a single LLM span. The `ddtrace-run` command automatically traces your LLM calls from [Datadog's list of supported integrations][10].

If your application consists of more elaborate prompting or complex chains or workflows involving LLMs, you can trace it using the [instrumentation guide][11] and the [SDK documentation][1].


[1]: /tracing/llm_observability/sdk/
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /tracing/llm_observability/api
[9]: /tracing/llm_observability/sdk/#command-line-setup
[10]: /tracing/llm_observability/sdk/#llm-integrations
[11]: /tracing/llm_observability/trace_an_llm_application
[12]: https://github.com/DataDog/llm-observability