---
title: APM Troubleshooting
kind: documentation
further_reading:
- link: ""
  tag: ""
  text: ""
---

## Tracer Troubleshooting

When experiencing any issue with the tracer, there are a few common issues to look for before contacting Datadog support. Enable debugging and check the logs. To enable debugging, simply set the `debug` option to true in the tracer initialization configuration.

If the trace could be sent to the agent properly, you should see a `Response from the agent: OK` log entry. In this case, it means the tracer is working properly, which means the problem probably comes from the Agent. [Refer to the agent troubleshooting guide][6].

If an error was reported by the Agent or the Agent could not be reached, you will see a `Error from the agent` entry instead. In this case, validate your network configuration to ensure the Agent can be reached. If you are confident this is the case and the error is coming from the Agent, please refer to the [Agent troubleshooting guide](#agent-troubleshooting).

If you see no such entry at all, no request was sent to the agent, which probably means the tracer is not instrumenting. In this case you should [contact Datadog support][3] and provide the logs.

### Language Tracer Troubleshooting

{{< tabs >}}
{{% tab "JavaScript" %}}

#### Traces are not reported in Datadog UI

Make sure `tracer.init()` is called before importing other modules
In order for the tracer to patch other modules, it hooks into `require`. If instrumented modules are imported before the tracer, it never gets the chance to intercept the call to `require` for the module.

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

Make sure the required plugins are enabled and when initializing the tracer make sure you are using supported versions of supported modules
You can find the list in the [corresponding language documentation][5].

#### Related spans are not in the same trace

##### Make sure your spans are actually related.

If you are using manual instrumentation, make sure to set the `childOf` option when calling `startSpan()`, and to use the scope manager to set the span as active so that our integrations will use this span as a parent as well.

If you are not using manual instrumentation or made sure that the parent is properly set, this is probably a bug in our integrations and you should contact [Datadog support][3].

[3]: /help
[5]: /tracing/setup/#setup-process

{{% /tab %}}
{{< /tabs >}}


## Agent Troubleshooting

When experiencing any issue with the agent, there are a few common issues to look for before contacting support. Going through those will greatly help Datadog support understanding any issues you might have.

### Make sure the agent has APM enabled.

Check this by running the following command on the Agent host:

`netstat -anp | grep 8126`

If you don’t see an entry, then the Agent is not listening on port `8126` which usually means either that the Agent is not running or APM is not enabled in your `datadog.yaml` file.

See the instructions to enable APM in the [APM Agent setup documentation][1]. 

### Make sure the agent is not having an issue

In some cases the Agent may have issues sending traces to Datadog. This can happen for a variety of reasons which you can find out by checking the [trace Agent logs][2]. [Enable debugging][4] and check the Agent logs logs.

The most common reason for dropped traces is clock drift. If using Docker make sure that `/etc/localtime` is mounted from the host to prevent the container slowly drifting. Otherwise syncing the host with NTP is generally the best approach.

If there are errors that you don’t understand, or traces are reported to be flushed to the backend and you still cannot see them in the UI, [please contact Datadog support][3].

## Datadog Interface Troubleshooting

### Make sure you are looking at the right environment

The current environment can be changed in the top left corner of the UI. If you are sending traces for a different environment, make sure to select it in the UI as well.

[1]: /tracing/setup/#agent-configuration
[2]: /agent/basic_agent_usage/#log-location
[3]: /help
[4]: /agent/troubleshooting/?tab=agentv6#get-more-logging-from-the-agent
[5]: /tracing/setup/#setup-process
[6]: /agent/troubleshooting/