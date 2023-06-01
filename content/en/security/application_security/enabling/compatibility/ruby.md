---
title: Ruby Compatibility Requirements
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
---

## Language and framework compatibility

### Supported Ruby versions

The Datadog Ruby library supports the latest gem for the following Ruby interpreters:

- [MRI][2] versions 2.1 to 3.1

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

## ASM capabilities support

The following ASM capabilities are supported in the Ruby library, for the specified tracer version:

| ASM capability                   | Minimum Ruby tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.9.0<br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | 1.11.0<br/><br/><br/>     |
| Vulnerability Management <br/> --> Open source vulnerability detection <br/> --> Custom code vulnerability detection | not supported<br/><br/> |

The minimum tracer version to get all supported ASM capabilities for Ruby is 1.11.0.

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, or for your Ruby framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

[1]: /tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/
