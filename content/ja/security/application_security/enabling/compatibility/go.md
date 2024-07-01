---
title: Go Compatibility Requirements
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 20
---

## Application Security capabilities

The following application security capabilities are supported in the Go library, for the specified tracer version:

| Application Security capability                   | Minimum Go tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| API Security | 1.59.0 |
| Threat Protection |  1.50.0   |
| Customize response to blocked requests | 1.53.0 |
| Software Composition Analysis (SCA) | 1.49.0 |
| Code Security  | not supported |
| Automatic user activity event tracking | not supported |

The minimum tracer version to get all supported application security capabilities for Go is 1.59.0.

**Note**: Threat Protection requires enabling [Remote Configuration][1], which is included in the listed minimum tracer version.

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

## Language and framework compatibility

### Supported Go versions

The Datadog Go Tracing library is open source. View the [GitHub repository][2] for more information.

The Datadog Go Tracing Library has a [version support policy][3] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in [maintenance][4]. Older versions may function, but no support is provided by default. For special requests, [contact support][5].

You must be running Datadog Agent v5.21.1+

Starting from tracer version 1.53.0, application security capabilities do not require [CGO][15].

## Integrations

The Go tracer includes support for the following frameworks, data stores and libraries.

The Go packages listed in this page are relevant for Application Security capabilities. You can also find more tracing integrations in [APM's tracing compatibility page][16].

**Note**: The [Go integrations documentation][6] provides a detailed overview of the supported packages and their APIs, along with usage examples.

<div class="alert alert-info">If you don't see your library of choice listed, fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this form to send details</a>.</div>

### Web framework compatibility

| Framework         | Threat Detection supported? | Threat Protection supported? |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | {{< X >}}  | {{< X >}} |
| [Gin][7]          | {{< X >}} | {{< X >}} |
| [Gorilla Mux][8] | {{< X >}} | {{< X >}} |
| [gRPC][11]          | {{< X >}} | {{< X >}} |
| [echo v4][9]     | {{< X >}}  | {{< X >}} |
| [echo v3][10]     | {{< X >}} | {{< X >}} |
| [chi][12] | {{< X >}} | {{< X >}} |
| [graphql-go][17] | {{< X >}} | {{< X >}} |
| [gqlgen][18] | {{< X >}} | {{< X >}} |


### Networking framework compatibility

| Framework             | Threat Detection supported? | Threat Protection supported? |
|-----------------------|-----------------------------|------------------------------|
| [gRPC client][11]     | {{< X >}}                   | {{< X >}} |
| [net/http client][13] | {{< X >}}                   | {{< X >}} |

### Data store compatibility

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | {{< X >}} |   {{< X >}}    |

[1]: /agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
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
[16]: /tracing/compatibility_requirements/go
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

