---
title: Go Log Collection
aliases:
  - /logs/languages/go
further_reading:
- link: "https://www.datadoghq.com/blog/go-logging/"
  tag: "Blog"
  text: "How to collect, standardize, and centralize Golang logs"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'  
---

To send your Go logs to Datadog, log to a file and then [tail][11] that file with your Datadog Agent. You can use the following setup with [logrus][1], an open source logging library.

Datadog strongly encourages setting up your logging library to produce your logs in JSON to avoid the need for [custom parsing rules][2].

## Configure your logger

For a classic Go configuration, open a `main.go` file and paste in the following code:

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event as usual with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

You can add metas to any log if you provide a JSON object that you want to see in the log event.

These metas can be `hostname`, `username`, `customers`, `metric` or any information that can help you troubleshoot and understand what happens in your Go application.

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
    
  // for metadata, a common pattern is to reuse fields between logging statements by reusing
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Simple event with global metadata")
}
```

## Configure your Datadog Agent

Once [log collection is enabled][3], set up [custom log collection][4] to tail your log files and send new logs to Datadog.

1. Create a `go.d/` folder in the `conf.d/` [Agent configuration directory][5].
2. Create a `conf.yaml` file in `go.d/` with the following content:

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "<path_to_your_go_log>.log"
        service: <service_name>
        source: go
        sourcecategory: sourcecode
    ```

3. [Restart the Agent][6].
4. Run the [Agent's status subcommand][7] and look for `go` under the `Checks` section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][8] to extract log attributes. Use the [Log Explorer][9] to view and troubleshoot your logs.

## Connect logs and traces

If APM is enabled for this application, the correlation between application logs and traces can be improved by following the [APM Go logging documentation][10] to automatically add trace and span IDs in your logs.

## Best practices

* Name the logger with a name that corresponds to the relevant functionality or service.
* Use the `DEBUG`, `INFO`, `WARNING`, and `FATAL` log levels. In Datadog, Go's `FATAL` maps to a severity level of `Emergency`.
* Start with logging the information that is most important. Expand the comprehensiveness of your logging with further iterations.
* Use metas to add context to any log. This enables you to quickly filter over users, customers, business-centric attributes, etc.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /logs/log_configuration/parsing
[3]: /agent/logs/?tab=tailfiles#activate-log-collection
[4]: /agent/logs/?tab=tailfiles#custom-log-collection
[5]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /logs/log_configuration/parsing/?tab=matchers
[9]: /logs/explorer/#overview
[10]: /tracing/other_telemetry/connect_logs_and_traces/go/
[11]: /glossary/#tail
