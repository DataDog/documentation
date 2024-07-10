---
title: Ruby Compatibility Requirements
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
---

## Application Security capabilities support

The following application security capabilities are supported in the Ruby library, for the specified tracer version:

| Application Security capability  | Minimum Ruby tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection  | 1.9.0  |
| Threat Protection | 1.11.0 |
| Customize response to blocked requests | 1.15.0 |
| Software Composition Analysis (SCA) | 1.11.0 |
| Code Security        | not supported |
| Automatic user activity event tracking | 1.14.0 |
| API Security | 1.15.0 |

The minimum tracer version to get all supported application security capabilities for Ruby is 1.15.0.

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, or for your Ruby framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                |                               |
| Kubernetes  | {{< X >}}                |                               |
| Amazon ECS  | {{< X >}}                |                               |
| AWS Fargate | {{< X >}}                |                               |
| AWS Lambda  |                          |                               |

## Language and framework compatibility


**Supported Ruby interpreters**
The Datadog Ruby library supports the latest gem for the following Ruby interpreters:

- [MRI][2] versions 2.1 to 3.1

These are supported on the following architectures:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Supported web servers
- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Application Security Capability Notes
- **Code Security** is not supported

| Framework                | Threat Detection supported? | Threat Protection supported? |
| ------------------------ | ----------- | --------------- |
| Rack          |  {{< X >}} |  {{< X >}} |
| Rails         |  {{< X >}} |  {{< X >}} |
| Sinatra       |  {{< X >}} |  {{< X >}} |
| Grape         |  {{< X >}} |  {{< X >}} |
| Unicorn       |  {{< X >}} |  {{< X >}} |
| Passenger     |  {{< X >}} |  {{< X >}} |

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (also depends on Ruby version) |
| Sinatra                 | 1.4                         |

### Networking framework compatibility

**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### Application Security Capability Notes
- **Code Security** is not supported

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| Rack         | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Application Security Capability Notes
- **Code Security** is not supported
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.

| Framework         | Threat Detection supported?    | Threat Protection supported?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| MongoDB        | {{< X >}} |   {{< X >}}    |
| Active Record        | {{< X >}} |   {{< X >}}    |
| MySQL2        | {{< X >}} |   {{< X >}}    |
| Presto        | {{< X >}} |   {{< X >}}    |
| Resque        | {{< X >}} |   {{< X >}}    |
| Sequel        | {{< X >}} |   {{< X >}}    |
| Elasticsearch     | {{< X >}} |   {{< X >}}    |

### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- Account Takeover detection monitoring for user login events

| Framework         | Minimum Framework Version   |
|-------------------| --------------------------- |
| Devise            | 3.2.1

[1]: /tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/
