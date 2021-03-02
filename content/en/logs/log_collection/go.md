---
title: Go log Collection
kind: documentation
aliases:
  - /logs/languages/go
further_reading:
- link: "https://www.datadoghq.com/blog/go-logging/"
  tag: "Blog"
  text: "How to collect, standardize, and centralize Golang logs"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
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

To send your go logs to Datadog, we recommend logging to a file and then tailing that file with your Datadog Agent. To achieve that we suggest the following setup with the open source logging library called [logrus][1]

We strongly encourage setting up your logging library to produce your logs in JSON format to avoid the need for [custom parsing rules][2].

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

It's very easy to add metas to any log if you provide a JSON object that you want to see in the log event.

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

**Connect Logs and Traces**

If APM is enabled for this application, the correlation between application logs and traces can be improved by [following APM Go logging instructions][3] to automatically add trace and span IDs in your logs.

## Configure your Datadog Agent

Create a `go.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
##Log section
logs:

  - type: file
    path: "/path/to/your/go/log.log"
    service: go
    source: go
    sourcecategory: sourcecode
```

## Getting further

Tips for getting further with Go log collection:

* Always give a name to the logger corresponding to the functionality or service you try to deliver.
* Log a lot in the DEBUG level and log accurately in the INFO, WARNING and FATAL levels; since these are the log levels you'll get in your production environments.
* Start small and try to log the important stuff first, instead of being comprehensive. Then add what is missing after having a discussion with your team.
* Use metas! Add context to any log so you can quickly filter over users, customers or any business centric attribute.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /logs/processing/parsing/
[3]: /tracing/connect_logs_and_traces/go/
