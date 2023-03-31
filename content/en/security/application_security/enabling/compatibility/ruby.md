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

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>

## ASM capabilities support

The following ASM capabilities are supported in the Ruby library, for the specified tracer version:

| ASM capability                   | Minimum Ruby tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | not supported<br/><br/><br/>     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | not supported<br/><br/> |

The minimum tracer version to get all supported ASM capabilities for Ruby is y.y.

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>

[1]: /tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/