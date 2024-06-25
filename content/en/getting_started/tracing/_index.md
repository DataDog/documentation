---
title: Getting Started with APM Tracing
kind: documentation
aliases:
    - /getting_started/tracing/distributed-tracing
further_reading:
    - link: '/tracing/'
      tag: 'Documentation'
      text: 'Learn more about APM features'
    - link: '/tracing/metrics/runtime_metrics/'
      tag: 'Documentation'
      text: 'Enable runtime metrics'
    - link: 'https://learn.datadoghq.com/courses/intro-to-apm'
      tag: 'Learning Center'
      text: 'Introduction to Application Performance Monitoring'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session to boost your APM understanding'
---

## Overview

Datadog Application Performance Monitoring (APM) provides deep visibility into your applications, enabling you to identify performance bottlenecks, troubleshoot issues, and optimize your services.

This guide demonstrates how to get started with APM and send your first trace to Datadog:

1. Set up Datadog APM to send traces to Datadog.
1. Run your application to generate data.
1. Explore the collected data in Datadog.

## Prerequisites

To complete this guide, you need the following:

1. [Create a Datadog account][1] if you haven't already.
1. Find or create a [Datadog API key][2].
1. Start up a Linux host or VM.

## Create an application

To create an application to observe in Datadog:

1. On your Linux host or VM, create a new Python application named `hello.py`. For example, `nano hello.py`.
1. Add the following code to `hello.py`:

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
      quote = random.choice(quotes)+"\n"
      return quote
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Set up Datadog APM

To set up Datadog APM without needing to modify your application's code or the deployment process, use Single Step APM Instrumentation:

<div class="alert alert-info"><strong>Note</strong>: <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/">Single Step APM Instrumentation</a> is in beta. Alternatively, you can set up APM using <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/">Datadog tracing libraries</a>.</div>

1. Run the installation command:

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][4], `<YOUR_DD_SITE>` with your [Datadog site][3], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. Start a new shell session.
1. Restart the services on your host or VM.
1. Verify the Agent is running:

    ```shell
   sudo datadog-agent status
   ```

This approach automatically installs the Datadog Agent, enables Datadog APM, and [instruments][5] your application at runtime.

## Run the application

When you set up Datadog APM with Single Step Instrumentation, Datadog automatically instruments your application at runtime.

To run `hello.py`:

1. Create a Python virtual environment in the current directory:

   ```shell
   python3 -m venv ./venv
   ```

1. Activate the `venv` virtual environment:

   ```shell
   source ./venv/bin/activate
   ```

1. Install `pip` and `flask`:

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Run `hello.py`:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Test the application

Test the application to send traces to Datadog:

1. In a new command prompt, run the following:

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirm that a random quote is returned.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Each time you run the `curl` command, a new trace is sent to Datadog.

## Explore traces in Datadog

1. In Datadog, go to [**APM** > **Services**][3]. You should see a Python service named `hello`:

   {{< img src="/getting_started/apm/service-catalog.png" alt="Service Catalog shows the new Python service." style="width:100%;" >}}

1. Select a service to view its performance metrics, such as latency, throughput, and error rates.
1. Go to [**APM** > **Traces**][4]. You should see a trace for the `hello` service:

   {{< img src="/getting_started/apm/trace-explorer.png" alt="Trace explorer shows the trace for the hello service." style="width:100%;" >}}

1. Select a trace to see its details, including the flame graph, which helps identify performance bottlenecks.

## Advanced APM setup

Up until this point, you let Datadog automatically instrument the `hello.py` application using Single Step Instrumentation. This is great if you want to capture essential traces across common libraries and languages without touching code or manually installing libraries.

However, if you need to collect traces from custom code or require more fine-grained control, you can add [custom instrumentation][6].

To illustrate this, you are going to import the Datadog Python tracing library into `hello.py` and create a custom span and span tag.

To add custom instrumentation:

1. Install the Datadog tracing library:

   ```shell
   pip install ddtrace
   ```

1. Add the highlighted lines to the code in `hello.py` to create a custom span tag `get_quote` and a custom span tag `quote`:

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ]

    @app.route('/')
    def index():
        with tracer.trace("get_quote") as span:
            quote = random.choice(quotes)+"\n"
            span.set_tag("quote", quote)
            return quote

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5050)
   {{< /highlight >}}

1. Run `hello.py` in the virtual environment from earlier:
   ```shell
   ddtrace-run python hello.py
   ```
1. Run a few `curl` commands in a separate command prompt:
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. In Datadog, go to [**APM** > **Traces**][4].
1. Select the **hello** trace.
1. Find the new custom `get_quote` span in the flame graph and hover over it:

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="The get_quote custom span displays in the flame graph. On hover, the quote span tag is displayed. " style="width:100%;" >}}

1. Notice that the custom `quote` span tag displays on the **Info** tab.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /tracing/glossary/#instrumentation
[6]: /tracing/trace_collection/custom_instrumentation/
