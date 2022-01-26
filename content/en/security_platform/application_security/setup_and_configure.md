---
title: Setup and Configure Application Security Monitoring
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog Application Security"
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Guide"
  text: "How Datadog Application Security Monitoring Works"
- link: "/security_platform/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box Application Security Rules"
---

## Compatibility

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

### Supported Java versions

The Datadog library supports Java JRE 1.8 and higher of both Oracle JDK and OpenJDK, on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (mcvc) x86, x86-64

Datadog does not officially support any early-access versions of Java. 

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   | 
| ----------------------- | --------------------------- |
| Servlet                 | 2                           |
| Spring                  | 3.1                         |



{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Supported .NET versions

The following .NET versions are supported:
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

These are supported on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (mcvc) x86, x86-64

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   | 
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

### Supported Go versions

The Datadog Go tracing library supports Go version 1.14 and greater, on the following architectures:
- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64

### Supported frameworks

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

**Note**: The [integrations documentation][1] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | GoDoc Datadog Documentation           
|-------------------|------------------------------------|
| [Gorilla Mux][2] | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][3]                |
| [gRPC][4]        | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][5]     |
| net/http   | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][6] |
| [chi less than v 5][7]         | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][8] |
| [echo v2 or greater][9]     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][10]           |



[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: http://www.gorillatoolkit.org/pkg/mux
[3]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[4]: https://github.com/grpc/grpc-go
[5]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[7]: https://github.com/go-chi/chi
[8]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[9]: https://github.com/labstack/echo
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Supported Ruby versions

The Datadog Ruby library supports the latest gem for the following Ruby interpreters:

| Type  | Documentation              | Version |
| ----- | -------------------------- | -----   |
| MRI   | https://www.ruby-lang.org/ | 2.7     |
|       |                            | 2.6     | 
|       |                            | 2.5     | 
|       |                            | 2.4     | 
|       |                            | 2.3     | 
|       |                            | 2.2     | 
|       |                            | 2.1     | 

These are supported on the following architectures:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   | 
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (also depends on Ruby version) |
| Sinatra                 | 1.4                         |

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

php

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

nodejs

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Enabling and disabling Application Security Monitoring

After you instrument with the DD library, how to turn on in your Agent and start collecting

## Scanning for sensitive data

Description and link to /account_management/org_settings/sensitive_data_detection/

## Creating exclusion filters

If very lengthy, could be its own page

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
