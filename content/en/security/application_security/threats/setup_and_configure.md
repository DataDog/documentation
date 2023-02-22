---
title: Setup and Configure
kind: documentation
aliases:
  - /security_platform/application_security/setup_and_configure
  - /security/application_security/setup_and_configure
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog Application Security Management"
- link: "/security/application_security/getting_started/"
  tag: "Documentation"
  text: "Getting Started Enabling ASM for Your Services"
- link: "/security/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box Application Security Management Rules"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting ASM"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works in Datadog"
---

## Compatibility

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

### Supported Java versions

The Datadog library supports Java JRE 1.8 and higher of both Oracle JDK and OpenJDK, on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

Datadog does not officially support any early-access versions of Java.

You can monitor application security for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

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

You can monitor application security for .NET apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

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

You can monitor application security for Go apps running in Docker, Kubernetes, and AWS ECS.


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

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
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

- MRI (https://www.ruby-lang.org/) versions 2.1 to 3.1

These are supported on the following architectures:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

You can monitor application security for Ruby apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

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

You can monitor application security for PHP apps running in Docker, Kubernetes, and AWS ECS.

It supports the use of all PHP frameworks, and also the use no framework.

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Supported Node.js versions

The Datadog Node.js library supports the following Node.js versions:

- Node.js 14 and higher

These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for Node.js apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Supported Python versions

The Datadog Python library supports the following Python versions:

- Python 2.7, 3.5 and higher

These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for Python apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server | Minimum Framework Version |
|----------------------|---------------------------|
| Django               | 1.8                       |
| Flask                | 0.10                      |

Support for query strings is not available for Flask.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Configuring a client IP header

ASM automatically attempts to resolve `http.client_ip` from several well-known headers, such as `X-Forwarded-For`. If you use a custom header for this field, or want to bypass the resolution algorithm, set the `DD_TRACE_CLIENT_IP_HEADER` environment variable and the library only checks the specified header for the client IP.

## Track authenticated bad actors

Many critical attacks are performed by authenticated users who can access your most sensitive endpoints. To identify bad actors that are generating suspicious security activity, add user information to traces by instrumenting your services with the standardized user tags. You can add custom tags to your root span, or use instrumentation functions. Read [Tracking User Activity][1] for more information.

## Exclude specific parameters from triggering detections

There may be a time when an ASM signal, or a suspicious request, is a false positive. For example, ASM repeatedly detects
the same suspicious request and a signal is generated, but the signal has been reviewed and is not a threat.

You can add an entry to the passlist, which ignore events from a rule, to eliminate noisy signal patterns and focus on legitimately suspicious requests.

To add a passlist entry, do one of the following:

- Click on a signal in [ASM Signals][4] and click the **Add Entry** link next to the **Add to passlist** suggested action. This method automatically adds an entry for the targeted service.
- Navigate to [Passlist Configuration][5] and manually configure a new passlist entry based on your own criteria.

**Note**: Requests (traces) that match a passlist entry are not billed.

## Data security considerations

The data that you collect with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect. Additionally, it may contain synthetic traffic that might cause your threat detection be inaccurate, or cause Datadog to not accurately indicate the security of your services.

By default, ASM collects information from suspicious requests to help you understand why the request was flagged as suspicious. Before sending the data, ASM scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag, so you observe that although the request was suspicious, the request data could not be collected because of data security concerns.

To protect users' data, sensitive data scanning is activated by default in ASM. You can customize the configuration by using the following environment variables. The scanning is based on the [RE2 syntax][2], so to customize scanning, set the value of these environment variables to a valid RE2 pattern:

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - Pattern for scanning for keys whose values commonly contain sensitive data. If found, the values and any child nodes associated with the key are redacted.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - Pattern for scanning for values that could indicate sensitive data. If found, the value and all its child nodes are redacted.

<div class="alert alert-info"><strong>For Ruby only, starting in <code>ddtrace</code> version 1.1.0</strong>

<p>You can also configure scanning patterns in code:</p>

```ruby
Datadog.configure do |c|
  # ...

  # Set custom RE2 regexes
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


The following are examples of data that are flagged as sensitive by default:

* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

See [APM Data Security][3] for information about other mechanisms in the Datadog Agent and libraries that can also be used to remove sensitive data.

## Disabling Application Security Management

To disable ASM, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration. Once it's removed, restart your service.

If you need additional help, contact [Datadog support][6].

## Configure a custom blocking page or payload

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as ASM blocks requests originating from blocked IPs" width="75%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /help/
