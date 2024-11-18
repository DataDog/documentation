---
title: Trace An LLM Application
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability'
      tag: 'Documentation'
      text: 'Learn about LLM Observability'
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This guide uses the [LLM Observability SDK for Python][1]. If your application is written in another language, you can create traces by calling the [API][8] instead.

## Setup

### Jupyter notebooks

To better understand LLM Observability terms and concepts, you can explore the examples in the [LLM Observability Jupyter Notebooks repository][12]. These notebooks provide a hands-on experience, and allow you to apply these concepts in real time. 

## Command line

To generate an LLM Observability trace, you can run a Python script.

### Prerequisites

- LLM Observability requires a Datadog API key. For more information, see [the instructions for creating an API key][7].
- The following example script uses OpenAI, but you can modify it to use a different provider. To run the script as written, you need:
    - An OpenAI API key stored in your environment as `OPENAI_API_KEY`. To create one, see [Account Setup][4] and [Set up your API key][6] in the official OpenAI documentation.
    - The OpenAI Python library installed. See [Setting up Python][5] in the official OpenAI documentation for instructions.

1. Install the SDK by adding the `ddtrace` and `openai` packages:

   {{< code-block lang="shell" >}}
   pip install ddtrace
   pip install openai
   {{< /code-block >}}

1. Create a Python script and save it as `quickstart.py`. This Python script makes a single OpenAI call.
   
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

1. Run the Python script with the following shell command. This sends a trace of the OpenAI call to Datadog.

   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE={{< region-param key="dd_site" >}} \
   DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
   ```

   For more information about required environment variables, see [the SDK documentation][9]. 
   
   **Note**: `DD_LLMOBS_AGENTLESS_ENABLED` is only required if you do not have the Datadog Agent running. If the Agent is running in your production environment, make sure this environment variable is unset.

1. View the trace of your LLM call on the **Traces** tab [of the **LLM Observability** page][3] in Datadog.

   {{< img src="llm_observability/quickstart_trace_1.png" alt="An LLM Observability trace displaying a single LLM request" style="width:100%;" >}}

The trace you see is composed of a single LLM span. The `ddtrace-run` command automatically traces your LLM calls from [Datadog's list of supported integrations][10].

If your application consists of more elaborate prompting or complex chains or workflows involving LLMs, you can trace it using the [Setup documentation][11] and the [SDK documentation][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/setup/api
[9]: /llm_observability/setup/sdk/#command-line-setup
[10]: /llm_observability/setup/auto_instrumentation/
[11]: /llm_observability/setup/
[12]: https://github.com/DataDog/llm-observability
