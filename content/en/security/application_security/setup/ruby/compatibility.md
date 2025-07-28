---
title: Ruby Compatibility Requirements
aliases:
  - /security/application_security/threats/setup/compatibility/ruby
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the Ruby library, for the specified tracer version:

| App and API Protection capability                  | Minimum Ruby tracer version |
| -------------------------------------------------- | --------------------------- |
| Threat Detection                                   | 1.9.0                       |
| Threat Protection                                  | 1.11.0                      |
| Customize response to blocked requests             | 1.15.0                      |
| Automatic user activity event tracking             | 1.14.0                      |
| API Security                                       | 2.17.0                      |

The minimum tracer version to get all supported App and API Protection capabilities for Ruby is 2.17.0.

### Supported deployment types

| Type              | Threat Detection support |
|------------------ | ------------------------ |
| Docker            | {{< X >}}                |
| Kubernetes        | {{< X >}}                |
| Amazon ECS        | {{< X >}}                |
| AWS Fargate       | {{< X >}}                |
| AWS Lambda        |                          |
| Google Cloud Run  |                          |

## Language and framework compatibility

### Supported Ruby interpreters

The Datadog Ruby Tracing library is open source. View the [GitHub repository][2] for more information.

- MRI versions 2.5 to 3.5
- JRuby versions 9.2.21.0+ and 9.4

These are supported on the following architectures:

- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

You must be running Datadog Agent v7.41.1+ for App and API Protection features.

## Integrations

The Ruby tracer includes support for the following frameworks, ORMs, and libraries:

### Web and API frameworks

- Rails
- Sinatra
- Grape

### ORMs

- ActiveRecord

### HTTP clients

- Faraday
- Excon
- RestClient

### Other

- GraphQL
- Rack
