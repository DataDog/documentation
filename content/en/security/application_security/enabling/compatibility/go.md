---
title: Go Compatibility Requirements 
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 20
---

## Language and framework compatibility

### Supported Go versions

The Datadog Go tracing library supports Go version 1.14 and greater, on the following architectures:
- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64

You can monitor application security for Go apps running in Docker, Kubernetes, and AWS ECS.

### Supported frameworks

Integrate the Go tracer with the following list of web frameworks using one of the corresponding APM tracer integrations. Refer to [Go's integrations documentation][1] for a detailed overview of the supported packages and their APIs, along with usage examples.

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]
- [HttpRouter][7]

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

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


## ASM capabilities support

The following ASM capabilities are supported in the Go library, for the specified tracer version:

| ASM capability                   | Minimum Go tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.47.0 <br/>  |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   |  <br/> --> 1.48.0<br/> --> not supported<br/> --> 1.48.0     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | not supported<br/><br/> |

The minimum tracer version to get all supported ASM capabilities for Go is 1.48.0.

**Note**: Threat Protection requires enabling [Remote Configuration][10], which is included in the listed minimum tracer version.  

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package
[8]: https://github.com/golang/go/wiki/cgo
[9]: /tracing/trace_collection/compatibility/go/
[10]: /agent/guide/how_remote_config_works/#enabling-remote-configuration
