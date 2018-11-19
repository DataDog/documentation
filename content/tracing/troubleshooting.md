---
title: APM Troubleshooting
kind: documentation
further_reading:
- link: ""
  tag: ""
  text: ""
---

## Tracer Troubleshooting

When experiencing unexpected behavior with the tracer, there are a few common issues to look for before contacting Datadog support. First, enable debugging and check the logs; to enable debugging, set the `debug` option to `true` in the tracer initialization configuration.

If the trace was sent to the Agent properly, you will see a `Response from the Agent: OK` log entry. This indicates that the tracer is working properly, therefore the problem may be with the Agent itself. Refer to the [Agent troubleshooting guide][6] for more information.

If an error was reported by the Agent (or the Agent could not be reached), you will see an `Error from the Agent` log entry. In this case, validate your network configuration to ensure the Agent can be reached. If you are confident the network is functional and that the error is coming from the Agent, refer to the [Agent troubleshooting guide][6].

If neither of these log entries is present, then no request was sent to the Agent, which may mean that the tracer is not instrumenting. In this case, [contact Datadog support][3] and provide the relevant logs entries.

### Language Tracer Troubleshooting

{{< tabs >}}
{{% tab "JavaScript" %}}

#### Traces are not reported in Datadog UI

Ensure that `tracer.init()` is called before importing other modules. In order for the tracer to patch other modules, it hooks into `require`. If instrumented modules are imported before the tracer, it never gets the chance to intercept the call to `require` for the module.

For example:

Correct call:
```
const tracer = require('dd-trace').init()
const express = require('express')
```

Incorrect call, express is not instrumented:
```
const express = require('express')
const tracer = require('dd-trace').init()
```

#### Traces are incomplete

Ensure that the required plugins are enabled, and when initializing the tracer, ensure that you are using supported versions of those modules. See the list in the [corresponding language documentation][1].

#### Related spans are not in the same trace

##### Make sure your spans are actually related

If you are using manual instrumentation, be sure to set the `childOf` option when calling `startSpan()`, and to use the scope manager to set the span as *active*, so that Datadog's integrations will use this span as a parent as well.

If you are not using manual instrumentation, or you've ensured that the parent is properly set, this may be a bug in Datadog's integrations. In this case, contact [Datadog support][2].

[1]: /tracing/setup/#setup-process
[2]: /help

{{% /tab %}}
{{< /tabs >}}


## Agent Troubleshooting

When experiencing unexpected behavior with the Agent, there are a few common issues to look for before contacting [Datadog support][3].

### Make sure the Agent has APM enabled

Run the following command on the Agent host:

`netstat -anp | grep 8126`

If you don't see an entry, then the Agent is not listening on port `8126`, which usually means either that the Agent is not running or that APM is not enabled in your `datadog.yaml` file.

See the [APM Agent setup documentation][1] for more information.

### Ensure that the Agent is functioning properly

In some cases the Agent may have issues sending traces to Datadog. [Enable debugging][4] and check the [trace Agent logs logs][2].

The most common reason for dropped traces is clock drift. When using Docker, ensure that `/etc/localtime` is mounted from the host to prevent the container's time from slowly drifting. Syncing the host with NTP is generally the best approach.

If there are errors that you don't understand, or traces are reported to be flushed to the backend and you still cannot see them in the UI, [contact Datadog support][3].

## Datadog Interface Troubleshooting

### Be sure that you are looking at the right environment

The current environment can be changed in the top left corner of the UI. If you are sending traces for a different environment, make sure to select it in the UI as well.

[1]: /tracing/setup/#agent-configuration
[2]: /agent/basic_agent_usage/#log-location
[3]: /help
[4]: /agent/troubleshooting/?tab=agentv6#get-more-logging-from-the-agent
[5]: /tracing/setup/#setup-process
[6]: /agent/troubleshooting/
