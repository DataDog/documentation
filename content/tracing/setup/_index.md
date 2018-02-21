---
title: Setup
kind: Documentation
further_reading:
- link: "/tracing/setup/docker"
  tag: "Documentation"
  text: Docker setup
- link: "/tracing/setup/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "/tracing/setup/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "/tracing/setup/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "/tracing/setup/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

## Setup process

With our infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: The application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s](https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170).  

To start tracing your application:

1. **Install the Datadog Agent**:    
  Install and configure the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 6.0 or above is required). For additional information, reference the [getting started guide](https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration).

2. **Install the Trace Agent**:  
  Depending on your operating system, install the Datadog Trace Agent separately:
  * On **Linux**, and **[Docker](/tracing/setup/docker)** the Trace Agent is pre-packaged with the standard Datadog Agent and no extra configuration is needed.

  * On **MacOS** and **Windows**, install and run the [Trace Agent](https://github.com/DataDog/datadog-trace-agent) in addition to the Datadog Agent.  
  See the [MacOS Trace Agent](https://github.com/DataDog/datadog-trace-agent#run-on-osx) and [Windows Trace Agent](https://github.com/DataDog/datadog-trace-agent/#run-on-windows) dedicated documentation.  

    On Heroku, Deploy the Datadog Trace Agent via the [Datadog Heroku Buildpack](https://github.com/DataDog/heroku-buildpack-datadog).  

3. **Configure your environment**:  
  Environment is an important notion for the APM product, configure it in your Datadog Agent in order to benefit from all Datadog functionalities. [Learn how to so with the environment dedicated setup documentation](/tracing/setup/environment).

4. **Instrument your application**:   
  Select one of the following supported languages:

  - [Go](/tracing/setup/go)
  - [Java](/tracing/setup/java)
  - [Python](/tracing/setup/python)
  - [Ruby](/tracing/setup/ruby)

    To instrument an application written in a language that does not yet have official library support, reference the [Tracing API](/api/?lang=console#traces), or visit our list of [community tracing libraries](/developers/libraries/#community-tracing-apm-libraries).

## Agent configuration

On Linux and Docker the Datadog Agent uses the [configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent) for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

{{% table responsive="true" %}}
| File setting            | Environment variable | Description                                                                                                                                                      |
|------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **main**                |                      |                                                                                                                                                                  |
| `apm_enabled`           | `DD_APM_ENABLED`     | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| **trace.sampler**       |                      |                                                                                                                                                                  |
| `extra_sample_rate`     | -                    | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). The default value is `1` |
| `max_traces_per_second` | -                    | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.                              |
| **trace.receiver**      |                      |                                                                                                                                                                  |
| `receiver_port`         | `DD_RECEIVER_PORT`   | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | -                    | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| **trace.ignore**        |                      |                                                                                                                                                                  |
| `resource`              | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their Resource name.                                                                                  |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page](/agent/) or refer to the [`datadog.conf.example` file](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example).

## Example: Simple tracing

We have a Flask Python application that when called on `/doc` returns **42**

We [instrumented our python code](/tracing/setup) in order to generate traces from it:

```python
import time
import blinker as _

from flask import Flask, Response

from ddtrace import tracer
from ddtrace.contrib.flask import TraceMiddleware

# Tracer configuration
tracer.configure(hostname='datadog')
app = Flask('API')
traced_app = TraceMiddleware(app, tracer, service='doc_service')

@tracer.wrap(name='doc_work')
def work():
    time.sleep(0.5)
    return 42

@app.route('/doc/')
def doc_resource():
    time.sleep(0.3)
    res = work()
    time.sleep(0.3)
    return Response(str(res), mimetype='application/json')
```

Each time its called, the following code produces this **trace**:

{{< img src="tracing/simple_trace.png" alt="Simple Trace" responsive="true" popup="true">}}

[Learn more about traces with the dedicated Trace documentation](/tracing/services/trace)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}