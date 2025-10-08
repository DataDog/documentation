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

**Note**: The [Go integrations documentation][19] provides a detailed overview of the supported packages and their APIs, along with usage examples.

### Web framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Networking framework compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Data store compatibility

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks


[1]: /remote_configuration#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[15]: https://github.com/golang/go/wiki/cgo
[16]: /tracing/compatibility_requirements/go
[17]: /tracing/trace_collection/custom_instrumentation/go/migration
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
