---
title: Setup and Configure
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog Application Security Monitoring"
- link: "/security_platform/application_security/getting_started/"
  tag: "Documentation"
  text: "Getting Started Enabling ASM for Your Services"
- link: "/security_platform/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box Application Security Monitoring Rules"
- link: "/security_platform/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting ASM"
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Monitoring Works in Datadog"
---

<div class="alert alert-warning">
Application Security Monitoring is in public beta. See the <a href="https://app.datadoghq.com/security/appsec?instructions=all">in-app instructions</a> to get started.
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

### Supported NodeJS versions

The Datadog NodeJS library supports the following NodeJS versions:

- NodeJS 13.10.0 and higher
- NodeJS 12.17.0 and higher

These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for NodeJS apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Add user information to traces

Instrument your services with the standardized user tags to track authenticated user activity, whether you're tracking application performance or application security.

This way, you can identify bad actors that are generating suspicious security activity, review all their activity around this time frame, and prioritize handling the most advanced attacks and signals targeting your authenticated attack surface.

You can [add custom tags to your root span][1], or use the instrumentation functions described below.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

Use the the Java tracer's API for adding custom tags to a root span and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied on the root span and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

**Note**: Check that you have added [necessary dependencies to your application][1].

The example below shows how to obtain the root span and add the relevant user monitoring tags:

```java
// Get the active span
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // Setting the mandatory user id tag
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // Setting optional user monitoring tags
   localRootSpan.setTag("usr.name", "Jean Example");
   localRootSpan.setTag("usr.email", "jean.example@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}
```


[1]: /tracing/setup_overview/open_standards/java/#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

The .NET tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace. For information and options, read [the .NET tracer documentation][1].
<p></p>

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

The Go tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace. For more options, see [the Go tracer documentation][1]. 

This example shows how to retrieve the current tracer span and use it to set user monitoring tags:

```go
// Retrieve the current tracer span from an HTTP request's context
if span, ok := tracer.SpanFromContext(request.Context()); ok {
    // Record user information in the trace the span belongs to
    tracer.SetUser(span, usr.id, tracer.WithUserEmail(usr.email), tracer.WithUserName(usr.name))
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Use the the Ruby tracer's API for adding custom tags to a trace, and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied on the trace and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

The example below shows how to obtain the root span and add relevant user monitoring tags:

**Notes**:
- Tag values must be strings.
- The `usr.id` tag is mandatory.

```ruby
# Get the active trace
trace = Datadog::Tracing.active_trace

# Set mandatory user id tag
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# Set optional user monitoring tags
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')
```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Use the the PHP tracer's API for adding custom tags to a root span, and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied to the `meta` section of the root span and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

The example below shows how to obtain the root span and add the relevant user monitoring tags:

```php
<?php
$rootSpan = \DDTrace\root_span();

 // Required unique identifier of the user.
$rootSpan->meta['usr.id'] = ‘123456789’;

// All other fields are optional.
$rootSpan->meta['usr.name'] = ‘Jean Example’;
$rootSpan->meta['usr.email'] = ‘jean.example@example.com’;
$rootSpan->meta['usr.session_id'] = ‘987654321’;
$rootSpan->meta['usr.role'] = ‘admin’;
$rootSpan->meta['usr.scope'] = ‘read:message, write:files’;
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

The Node tracer package provides the `tracer.setUser(user)` function, which allows you to monitor authenticated requests by adding user information to the trace. For information and options, read [the NodeJS tracer documentation][1].

<p></p>


[1]: https://github.com/DataDog/dd-trace-js/blob/master/docs/API.md#user-identification
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Data security considerations

The data that you collect with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect. Additionally, it may contain synthetic traffic that might cause your threat detection be inaccurate, or cause Datadog to not accurately indicate the security of your services.

By default, ASM collects information from suspicious requests to help you understand why the request was flagged as suspicious. Before sending the data, ASM scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag, so you observe that although the request was suspicious, the request data could not be collected because of data security concerns.

To protect users' data, sensitive data scanning is activated by default in ASM. You can customize the configuration by using the following environment variables. The scanning is based on the [RE2 syntax][2], so to customize scanning, set the value of these environment variables to a valid RE2 patten:

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - Pattern for scanning for keys whose values commonly contain sensitive data. If found, the key, all corresponding values, and any child nodes are redacted.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - Pattern for scanning for values that could indicate sensitive data. If found, the value and all its child nodes are redacted.

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

## Exclusion filters

There may be a time when an ASM signal, or a suspicious request, is a false positive. For example, ASM repeatedly detects
the same suspicious request and a signal is generated, but the signal has been reviewed and is not a threat.

You can set an exclusion filter, which ignore events from a rule, to eliminate these noisy signal patterns and focus on legitimate suspicious requests.

To create an exclusion filter, do one of the following:

- Click on a signal in [ASM Signals][4] and click the **Create Exclusion Filter** button in the top left corner. This method automatically generates a filter query for the targeted service.
- Navigate to [Exclusion Filters Configuration][5] and manually configure a new exclusion filter based on your own filter query.

**Note**: Requests (traces) matching an exclusion filter are not billed.

## Disabling Application Security Monitoring

To disable ASM, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration. Once it's removed, restart your service.

If you need additional help, contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/custom_instrumentation/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /tracing/setup_overview/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/appsec/exclusions
[6]: /help/
