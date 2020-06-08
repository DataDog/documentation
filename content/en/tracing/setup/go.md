---
title: Tracing Go Applications
kind: documentation
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "GitHub"
  text: "Source code"
- link: "https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "GoDoc"
  text: "Package page"
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---
## Installation and Getting Started

For configuration instructions and details about using the API, see the Datadog [API documentation][1]. For manual instrumentation, use the [integrations section](#integrations) below for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, see the [Getting started with APM section][2]. For details about contributing, check the official repository [README.md][3].

Consult the [migration document][4] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to the newest version.

### Installation

If you already have a Datadog account you can find [step-by-step instructions][5] in our in-app guides for either host-based or container-based set ups.

First [install and configure the Datadog Agent][6]. See the additional documentation for [tracing Docker applications][7] or [Kubernetes applications][8].

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

You are now ready to import the tracer and start instrumenting your code.

## Automatic Instrumentation

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find the list of supported [integrations](#integrations) below.



## Configuration

The tracer is configured with options parameters when the `Start` function is called. An example for generating a trace using the HTTP library:

```go
package main

import (
    "log"
    "net/http"
    "strings"

    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func sayHello(w http.ResponseWriter, r * http.Request) {
    msg := "Hello " + strings.TrimPrefix(r.URL.Path, "/")
    w.Write([] byte(msg))
}

func main() {
    // start the tracer with zero or more options
    tracer.Start(tracer.WithServiceName("test-go"))
    defer tracer.Stop()

    mux := httptrace.NewServeMux() // init the http tracer
    mux.HandleFunc("/", sayHello) // use the tracer to handle the urls

    err := http.ListenAndServe(":9090", mux) // set listen port
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
```

For more tracer settings, see available options in the [configuration documentation][9].

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][10] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default only
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The Go Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```go
package main

import (
    "net"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        os.Getenv("DD_AGENT_HOST"),
        os.Getenv("DD_TRACE_AGENT_PORT"),
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}

```

## Configure APM Environment Name

The [APM environment name][11] may be configured [in the agent][12] or using the [WithEnv][13] start option of the tracer.

```go
package main

import (
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithEnv("<ENVIRONMENT>"))
    defer tracer.Stop()

    // ...
}
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[2]: /tracing/visualization/
[3]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[4]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[5]: https://app.datadoghq.com/apm/install
[6]: /tracing/send_traces/
[7]: /tracing/setup/docker/
[8]: /agent/kubernetes/apm/
[9]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[10]: https://github.com/openzipkin/b3-propagation
[11]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[12]: /getting_started/tracing/#environment-name
[13]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithEnv
