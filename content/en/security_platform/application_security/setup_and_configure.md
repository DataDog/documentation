---
title: Setup and Configure
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog ASM"
- link: "/security_platform/application_security/getting_started/"
  tag: "Documentation"
  text: "Getting Started Enabling ASM Monitoring for Your Services"
- link: "/security_platform/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box ASM Rules"
- link: "/security_platform/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting ASM Monitoring"
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Documentation"
  text: "How ASM Works in Datadog"
---

<div class="alert alert-warning">
ASM is in public beta. See the <a href="https://app.datadoghq.com/security/appsec?instructions=all">in-app instructions</a> to get started.
</div>

## Compatibility

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

### Supported Java versions

The Datadog library supports Java JRE 1.8 and higher of both Oracle JDK and OpenJDK, on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

Datadog does not officially support any early-access versions of Java.

You can monitor ASM for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Servlet Compatible      | 2.3+, 3.0+                  |
| Spring                  | 3.1                         |

**Note**: Many application servers are Servlet compatible and are supported by ASM, such as WebSphere, WebLogic, and JBoss. Also, frameworks like Spring Boot are supported by virtue of using a supported embedded application server (such as Tomcat, Jetty, or Netty).


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
- Windows (msvc) x86, x86-64

You can monitor ASM for .NET apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).

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

You can monitor ASM for Go apps running in Docker, Kubernetes, and AWS ECS.


### Supported frameworks

Integrate the Go tracer with the following list of web frameworks using one of the corresponding APM tracer integration. Click to see the [integrations documentation][1], which provides a detailed overview of the supported packages and their APIs, along with usage examples.

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]
- [HttpRouter][7]

### Enabling CGO

Compiling your code with ASM enabled involves [CGO][8] and therefore requires:

- The `gcc` compiler for the target `GOOS` and `GOARCH`.
- The C library headers.
- The CGO bindings enabled. This is controlled by the `CGO_ENABLED` environment variable which is enabled by default when compiling natively.

To install the above requirements:

| Operating system     | Console command |
|----------------------|-----------------|
| Debian, Ubuntu       | `$ apt install gcc libc6-dev`   |
| Alpine               | `$ apk add gcc musl-dev`        |
| RHEL, CentOS, Fedora | `$ yum install gcc glibc-devel` |
| macOS                | `$ xcode-select --install`      |

**Note**: The Go toolchain disables CGO when cross-compiling and so, CGO needs to be explicitly enabled.

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package
[8]: https://github.com/golang/go/wiki/cgo
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Supported Ruby versions

The Datadog Ruby library supports the latest gem for the following Ruby interpreters:

- MRI (https://www.ruby-lang.org/) versions 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1

These are supported on the following architectures:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

You can monitor ASM for Ruby apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (also depends on Ruby version) |
| Sinatra                 | 1.4                         |

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

The Datadog PHP library supports PHP version 7.0 and above on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64

You can monitor ASM for PHP apps running in Docker, Kubernetes, and AWS ECS.

It supports the use of all PHP frameworks, and also the use no framework.

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Supported NodeJS versions

The Datadog NodeJS library supports the following NodeJS versions:

- NodeJS 13.10.0 and higher
- NodeJS 12.17.0 and higher

These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor ASM for NodeJS apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Data security considerations

The data that you’re collecting with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect. Additionally, it may contain synthetic traffic that might cause your threat detection be inaccurate, or cause Datadog to not accurately indicate the security of your services.

By default ASM will collect from suspicious requests to help users understand why the request was flagged as suspicious. Before sending, ASM will automatically scan the data for patterns and keywords that might mean the data is sensitive. If the data is deemed sensitive, it will be replaced with a `<redacted>` flag, so users will understand that although the request was suspicious, the request data could not be collected because of data security concerns.

To protect user's data, sensitive data scanning is activated by default in ASM. I can be customized using two environment variables. The scanning is based on the [RE2 syntax](https://github.com/google/re2/wiki/Syntax), so to customize scanning these environment variables should be set to a valid RE2 patten:

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - this pattern will be used to scan for key values that commonly contain suspicious data. If found, both the key and all child values will be redacted.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - this pattern will be used to scan for values patterns that could indicate suspicious data. If found, value and all child nodes it contains will be redacted.

The following are examples of data that would be flagged as sensitive:

* pwd, password, ipassword or pass_phrase
* secret
* key, api_key private_key or public_key
* token
* consumer_id, consumer_key or consumer_secret
* sign, signed or signature
* bearer
* authorization
* BEGIN PRIVATE KEY
* ssh-rsa

See [APM Data Security][1] for other mechanisms in the Datadog agent and libraries details that can also be used to remove sensitive data.

## Exclusion filters

There may be a time when an ASM signal, or a suspicious request, is a false positive. For example, ASM repeatedly detects
the same suspicious request and a signal is generated, but the signal has been reviewed and is not a threat.

You can set an exclusion filter, which ignore events from a rule, to eliminate these noisy signal patterns and focus on legitimate suspicious requests.

To create an exclusion filter, do one of the following:

- Click on a signal in [ASM Signals][2] and click the **Create Exclusion Filter** button in the top left corner. This method automatically generates a filter query for the targeted service.
- Navigate to [Exclusion Filters Configuration][3] and manually configure a new exclusion filter based on your own filter query.

**Note**: Requests (traces) matching an exclusion filter are not billed.

## Disable ASM

To disable ASM, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration. Once removed, restart your service.

If you need additional help, contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/configure_data_security/
[2]: https://app.datadoghq.com/security/appsec/signals
[3]: https://app.datadoghq.com/security/appsec/exclusions
[4]: /help/
