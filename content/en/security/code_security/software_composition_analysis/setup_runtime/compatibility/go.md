---
title: Go Compatibility Requirements
code_lang: go
type: multi-code-lang
code_lang_weight: 20
---

## Code Security capabilities

The following code security capabilities are supported in the Go library, for the specified tracer version:

| Code Security capability                    | Minimum Go tracer version   |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.49.0                      |
| Runtime Code Analysis (IAST)                | not supported               |

### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                           |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                           |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                           |
| AWS Fargate       | {{< X >}}                                   |                                     |
| AWS Lambda        |                                             |                                     |

## Language and framework compatibility

### Supported Go versions

The Datadog Go Tracing library is open source. View the [GitHub repository][2] for more information.

The Datadog Go Tracing Library has a [version support policy][3] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in [maintenance][4]. Older versions may function, but no support is provided by default. For special requests, [contact support][5].

You must be running Datadog Agent v5.21.1+

Starting from tracer version 1.53.0, code security capabilities do not require [CGO][15].

## Integrations

The Go tracer includes support for the following frameworks, data stores and libraries.

The Go packages listed in this page are relevant for Code Security capabilities. You can also find more tracing integrations in [APM's tracing compatibility page][16].

{{< tabs >}}
{{% tab "v1" %}}

**Note**: The [Go integrations documentation][6] provides a detailed overview of the supported packages and their APIs, along with usage examples.

<div class="alert alert-info">If you don't see your library of choice listed, fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this form to send details</a>.</div>

### Web framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Networking framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Data store compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[15]: https://github.com/golang/go/wiki/cgo
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

{{% /tab %}}

{{% tab "v2" %}}

**Note**: The [Go integrations documentation][19] provides a detailed overview of the supported packages and their APIs, along with usage examples.

<div class="alert alert-info">If you don't see your library of choice listed, fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this form to send details</a>.</div>

### Web framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Networking framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Data store compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo/v2
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[26]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2

{{% /tab %}}
{{< /tabs >}}

[1]: /agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[16]: /tracing/compatibility_requirements/go
