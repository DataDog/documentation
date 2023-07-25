---
title: Go Compatibility Requirements 
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 20
---

## ASM capabilities

The following ASM capabilities are supported in the Go library, for the specified tracer version:

| ASM capability                   | Minimum Go tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| Threat Protection |  1.50.0   |
| Vulnerability Management for Open Source Software (OSS) | 1.49.0 |
| Vulnerability Management for Code-level (beta) | not supported |

The minimum tracer version to get all supported ASM capabilities for Go is 1.50.0.

**Note**: Threat Protection requires enabling [Remote Configuration][1], which is included in the listed minimum tracer version.  

### Supported deployment types
|Type | Threat Detection support | Vulnerability Management for OSS support |
| ---           |   ---             |           ----            |
| Docker        | {{< X >}}         | {{< X >}}                 |
| Kubernetes    | {{< X >}}         | {{< X >}}                 | 
| AWS ECS       | {{< X >}}         | {{< X >}}                 |
| AWS Fargate   | {{< X >}}         | {{< X >}}                 |
| AWS Lambda    | {{< X >}}         |                           |  

## Language and framework compatibility

### Supported Go versions

The Go Datadog Trace library is open source. View the [GitHub repository][2] for more information.

The Go Datadog Trace Library has a [version support policy][3] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in [maintenance][4]. Older versions may function, but no support is provided by default. For special requests, [contact support][5]. 

You must be running Datadog Agent v5.21.1+

Starting from tracer version 1.53.0, ASM does not require [CGO][15] anymore.

## Integrations


### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### ASM Capability Notes
- **Vulnerability Management for Code-level** is not supported


| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | {{< X >}} | {{< X >}}               |
| [Gorilla Mux][8] | {{< X >}} | {{< X >}}        |
| [echo v4][9]     | {{< X >}}  | {{< X >}}    |
| [echo v3][10]     | {{< X >}} | {{< X >}}             |

### Networking framework compatibility

**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### ASM Capability Notes
- **Vulnerability Management for Code-level** is not supported

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [gRPC][11]          | {{< X >}} |       |
| [chi][12] | {{< X >}} | {{< X >}}        |
| [http][13]     | {{< X >}}  | {{< X >}}    |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### ASM Capability Notes
- **Vulnerability Management for Code-level** is not supported
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.

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
[8]: http://www.gorillatoolkit.org/pkg/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://github.com/grpc/grpc-go
[12]: https://github.com/go-chi/chi
[13]: https://golang.org/pkg/net/http
[14]: https://golang.org/pkg/database/sql
[15]: https://github.com/golang/go/wiki/cgo


