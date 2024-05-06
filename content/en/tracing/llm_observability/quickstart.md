---
title: Quickstart
---
<div class="alert alert-info">LLM Observability is in public beta.</a></div>

Our quickstart docs make use of our Python SDK. For detailed usage, see [the SDK documentation][1]. If your application is written in another language, you can create traces by calling the [API] instead.

## Jupyter notebook quickstart

To try out LLM Observability in a series of guided notebooks, follow the instructions in [the LLM Observability onboarding repo][2].

## Command line quickstart

Use the steps below to run a simple Python script that generates an LLM Observability trace.

### 1. Install the SDK

Install the following `ddtrace` package hash:

{{< code-block lang="shell" >}}
pip install git+https://github.com/DataDog/dd-trace-py.git@c03cc8764c508cf53ea38b7b0f0eb6cb39627d91
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

To generate a trace, use the following command to run the Python script:

{{< code-block lang="shell" >}}
DD_LLMOBS_ENABLED=1 DD_LLMOBS_APP_NAME=onboarding-quickstart DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DATADOG_SITE> DD_LLMOBS_NO_APM=1 ddtrace-run python quickstart.py
{{< /code-block >}}

### 4. View the trace

A trace of your LLM call should appear in [the Traces tab][3] of LLM Observability in Datadog.

The trace you see is composed of a single LLM span. The `ddtrace-run` command automatically traces your LLM calls from Datadog's list of supported integrations.

[1]: http://localhost:1313/tracing/llm_observability/sdk/
[2]: https://github.com/DataDog/llm-observability
[3]: https://app.datadoghq.com/llm/traces
