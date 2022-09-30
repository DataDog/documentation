---
title: Go Log Collection
kind: documentation
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
---

To send your Go logs to Datadog, use the open source logging library, [logrus][1], to log to a file and then tail that file with your Datadog Agent. 

Datadog strongly encourages setting up your logging library to produce your logs in JSON format to avoid the need for [custom parsing rules][2].

## Configure your logger

For a classic Go configuration, open a `main.go` file and paste the following code:

```go
package main

import (
  log "github.com/Sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event as usual with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

You can add metas to any log if you provide a JSON object that you want to see in the log event.

These metas can be `hostname`, `username`, `customers`, `metric` or any information that help you troubleshoot and understand what happens in your Go application.

```go
package main

import (
  log "github.com/Sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event as usual with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
  // For metadata, a common pattern is to re-use fields between logging statements  by re-using
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Simple event with global metadata")
}
```

## Configure your Datadog Agent

Once [log collection is enabled][3], set up [custom log collection][4] to tail your log files and send them to Datadog.

1. Create a `go.d/` folder in the `conf.d/` [Agent configuration directory][5].
2. Create a `conf.yaml` file in `go.d/` with the following content:

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "/path/to/your/go/log.log"
        service: go
        source: go
        sourcecategory: sourcecode
    ```

3. [Restart the Agent][6].
4. Run the [Agent’s status subcommand][7] and look for `csharp` under the `Checks` section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][8] to extract log attributes. Use the [Log Explorer][9] to view and troubleshoot your logs.

## Connect Logs and Traces

If APM is enabled for this application, the correlation between application logs and traces can be improved by [following APM Go logging instructions][10] to automatically add trace and span IDs in your logs.

## Getting further

Tips for getting further with Go log collection:

* Always give a name to the logger corresponding to the functionality or service you try to deliver.
* Log a lot in the DEBUG level and log accurately in the INFO, WARNING and FATAL levels; since these are the log levels you'll get in your production environments.
* Start small and try to log the important stuff first, instead of being comprehensive. Then add what is missing after having a discussion with your team.
* Use metas! Add context to any log so you can quickly filter over users, customers or any business centric attribute.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /logs/log_configuration/parsing
[3]: /agent/logs/?tab=tailfiles#activate-log-collection
[4]: /agent/logs/?tab=tailfiles#custom-log-collection
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /logs/log_configuration/parsing/?tab=matchers
[9]: /logs/explorer/#overview
[10]: /tracing/other_telemetry/connect_logs_and_traces/go/
