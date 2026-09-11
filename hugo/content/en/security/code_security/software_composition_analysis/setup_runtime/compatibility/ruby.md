---
title: Ruby Compatibility Requirements
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
---

## Code Security capabilities support

The following code security capabilities are supported in the Ruby library, for the specified tracer version:

| Code Security capability                    | Minimum Ruby tracer version |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.11.0                      |
| Runtime Code Analysis (IAST)                | not supported               |

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, or for your Ruby framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Preview (1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## Language and framework compatibility

**Supported Ruby interpreters**
The Datadog Ruby library supports the latest gem for the following Ruby interpreters:

- [MRI][2] versions 2.1 to 3.1

These are supported on the following architectures:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Supported web servers
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.
- **Runtime Code Analysis (IAST)** is not supported

### Networking framework compatibility

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.
- **Runtime Code Analysis (IAST)** is not supported

### Data store compatibility

**Datastore tracing provides:**

- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all databases.
- **Runtime Code Analysis (IAST)** is not supported

[1]: /tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/
