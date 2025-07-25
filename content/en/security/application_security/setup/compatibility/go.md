---
title: Go Compatibility Requirements
code_lang: go
type: multi-code-lang
code_lang_weight: 20
aliases:
  - /security/application_security/threats/setup/compatibility/go
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the Go library, for the specified tracer version:

| App and API Protection capability                   | Minimum Go tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| API Security | 1.59.0 |
| Threat Protection |  1.50.0   |
| Customize response to blocked requests | 1.53.0 |
| Automatic user activity event tracking | not supported |

The minimum tracer version to get all supported App and API Protection capabilities for Go is 1.59.0.

**Note**: Threat Protection requires enabling [Remote Configuration][1], which is included in the listed minimum tracer version.

### Supported deployment types
| Type        | Threat Detection support |
|-------------|--------------------------|
| Docker      | {{< X >}}                |
| Kubernetes  | {{< X >}}                |
| Amazon ECS  | {{< X >}}                |
| AWS Fargate | {{< X >}}                |
| AWS Lambda  | {{< X >}}                |

## Language and framework compatibility

### Supported Go versions

The Datadog Go Tracing library is open source. View the [GitHub repository][2] for more information.

The Datadog Go Tracing Library has a [version support policy][3] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in [maintenance][4]. Older versions may function, but no support is provided by default. For special requests, [contact support][5].

You must be running Datadog Agent v5.21.1+

Starting from tracer version 1.53.0, App and API Protection capabilities do not require [CGO][15].

## Integrations

The Go tracer includes support for the following frameworks, data stores and libraries.

The Go packages listed in this page are relevant for App and API Protection capabilities. You can also find more tracing integrations in [APM's tracing compatibility page][16].

{{% tracing-go-v2 %}}

Supported packages have changed between v1 and v2 of the Go tracer.

{{% tabs %}}
{{% tab "v2" %}}

**Note**: The [Go integrations documentation][19] provides a detailed overview of the supported packages and their APIs, along with usage examples.

<div class="alert alert-info">If you don't see your library of choice listed, fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this form to send details</a>.</div>

### Web framework compatibility

| Framework         | Threat Detection supported? | Threat Protection supported? |
|-------------------|-----------------------------|------------------------------|
| [net/http][25]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][20]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][21] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][23]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][22]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [chi][24] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### Networking framework compatibility

| Framework             | Threat Detection supported? | Threat Protection supported? |
|-----------------------|-----------------------------|------------------------------|
| [gRPC client][23]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http client][25] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### Data store compatibility

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][26]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[26]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2

{{% /tab %}}
{{% tab "v1" %}}

**Note**: The [Go integrations documentation][6] provides a detailed overview of the supported packages and their APIs, along with usage examples.

<div class="alert alert-info">If you don't see your library of choice listed, fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this form to send details</a>.</div>

### Web framework compatibility

| Framework         | Threat Detection supported? | Threat Protection supported? |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][7]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][8] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][11]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][9]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [echo v3][10]     | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [chi][12] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### Networking framework compatibility

| Framework             | Threat Detection supported? | Threat Protection supported? |
|-----------------------|-----------------------------|------------------------------|
| [gRPC client][11]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http client][13] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### Data store compatibility

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

{{% /tab %}}
{{% /tabs %}}

[1]: /tracing/guide/remote_config
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[15]: https://github.com/golang/go/wiki/cgo
[16]: /tracing/compatibility_requirements/go
