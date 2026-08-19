---
title: "Quickstart: Send a Python Trace from Linux with SSI"
description: Install Datadog APM with Single Step Instrumentation and send a trace from a sample Python application on a Linux host or VM.
further_reading:
    - link: '/getting_started/tracing/'
      tag: 'Documentation'
      text: 'Choose an APM setup for another environment or language'
    - link: '/tracing/trace_collection/single-step-apm/linux/'
      tag: 'Documentation'
      text: 'Configure Single Step Instrumentation on Linux'
    - link: '/tracing/trace_collection/dd_libraries/python/'
      tag: 'Documentation'
      text: 'Trace Python applications'
---

## Overview

This quickstart uses Single Step Instrumentation (SSI) to install the Datadog Agent, instrument a sample Python application on a Linux host or VM, and send a trace to Datadog.

For another language or deployment environment, [choose an APM setup][1].

## Prerequisites

To complete this guide, you need:

- A [Datadog account][2] and [API key][3].
- A Linux host or VM with a [supported operating system][4].
- Python 3.7 or later.
- Permission to install software and restart services on the host.

## Create the sample application

1. On your Linux host or VM, create a file named `hello.py`.
1. Add the following code:

   {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
from flask import Flask
import random

app = Flask(__name__)

quotes = [
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
]

@app.route('/')
def index():
    quote = random.choice(quotes) + "\n"
    return quote

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
   {{< /code-block >}}

## Set up Datadog APM

1. Run the following command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="<YOUR_DD_SITE>" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   DD_APM_INSTRUMENTATION_LIBRARIES=python:4 \
   DD_ENV=<AGENT_ENV> \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][3], `<YOUR_DD_SITE>` with your [Datadog site][5], and `<AGENT_ENV>` with an environment name such as `development`.

1. Restart the services on your host or VM.
1. Confirm that the Agent is running:

   ```shell
   sudo datadog-agent status
   ```

The command installs or updates the Datadog Agent, enables APM, and configures SSI to load the Python SDK at runtime.

## Run the application

1. Create a Python virtual environment:

   ```shell
   python3 -m venv ./venv
   ```

1. Activate the virtual environment:

   ```shell
   source ./venv/bin/activate
   ```

1. Install Flask:

   ```shell
   pip install flask
   ```

1. Set the service name and run the application:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Generate a trace

1. In another terminal, send a request to the application:

   ```shell
   curl http://0.0.0.0:5050/
   ```

1. Confirm that the application returns a quote. For example:

   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Each request creates a trace and sends it to Datadog.

## Explore the trace

1. In Datadog, go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][6].
1. Select the `hello` service to view latency, throughput, and error metrics.
1. Go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][7].
1. Select a trace for the `hello` service to inspect its spans and flame graph.

If the service does not appear, follow the [SSI verification steps][8], then see [Troubleshooting Single Step APM][9].

## Next steps

- Apply [Unified Service Tags][10] to correlate telemetry by service, environment, and version.
- Review [Python SDK configuration][11].
- [Correlate Python logs and traces][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tracing/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[4]: /tracing/trace_collection/single-step-apm/compatibility/#linux-distributions-reference
[5]: /getting_started/site/
[6]: https://app.datadoghq.com/services
[7]: https://app.datadoghq.com/apm/traces
[8]: /tracing/trace_collection/single-step-apm/linux/#verify-the-installation
[9]: /tracing/trace_collection/single-step-apm/troubleshooting/
[10]: /getting_started/tagging/unified_service_tagging/
[11]: /tracing/trace_collection/library_config/python/
[12]: /tracing/other_telemetry/connect_logs_and_traces/python/
