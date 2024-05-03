---
title: Quickstart
---

Our quickstart docs make use of our Python SDK. For detailed usage, see [SDK Usage].

For information about the API, [go here.](TODO).

## 1. Jupyter notebook quickstart

To try out LLM Observability in a series of guided notebooks, follow the instructions in [this repo](https://github.com/DataDog/llm-observability).


## 2. Command line quickstart

Install the following ddtrace package hash:

```bash
pip install git+https://github.com/DataDog/dd-trace-py.git@c03cc8764c508cf53ea38b7b0f0eb6cb39627d91
```

Next, let's make a simple Python quickstart.py script that makes a single OpenAI call.

```py
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
```

Grab your Datadog API key and your Datadog Site (e.g. datadoghq.com), and run the following command: 

```bash
DD_LLMOBS_ENABLED=1 DD_LLMOBS_APP_NAME=onboarding-quickstart DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DATADOG_SITE> DD_LLMOBS_NO_APM=1 ddtrace-run python quickstart.py
```

You should now see a trace of your LLM call appear in the "Traces" tab in Datadog's LLM Observability product!


The trace you see is composed of a single LLM span. The `ddtrace-run` command automatically traces your LLM calls from Datadog's list of supported integrations.
