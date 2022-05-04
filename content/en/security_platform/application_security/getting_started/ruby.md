---
title: Ruby - ASM Get Started
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: 'GitHub'
      text: 'Ruby Datadog Library source code'
    - link: "/security_platform/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Monitoring Rules"
    - link: "/security_platform/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Monitoring"
---

You can monitor application security for Ruby apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate. 

{{% appsec-getstarted %}}

## Get started

1. **Update your Gemfile to include the Datadog library**:

   ```ruby
   gem 'ddtrace', '~> 1.0'
   ```

   For information about which language and framework versions are supported by the library, see [Compatibility][1].

   For more information about upgrading from a `dd-trace` 0.x version, see [the Ruby tracer upgrade guide][2].

2. **Enable ASM**, either in your code:
   {{< tabs >}}

{{% tab "Rails" %}}
   Either enable the tracer through auto-instrumentation by updating your Gemfile:

   ```ruby
   gem 'ddtrace', '~> 1.0', require: 'ddtrace/auto_instrument'
   ```

   Or enable the tracer by adding an initializer in your application code:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     # not needed if `gem 'ddtrace', require: 'ddtrace/auto_instrument' is used
     c.tracing.instrument :rails

     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```
{{% /tab %}}

{{% tab "Sinatra" %}}
   Enable the tracer by adding the following to your application's startup:

   ```ruby
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :sinatra

     # enable appsec for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   Enable the tracer by adding the following to your `config.ru` file:

   ```ruby
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rack

     # enable appsec for Rack
     c.appsec.enabled = true
     c.appsec.instrument :rack
   end

   use Datadog::Tracing::Contrib::Rack::TraceMiddleware
   use Datadog::AppSec::Contrib::Rack::RequestMiddleware
   ```
{{% /tab %}}

{{< /tabs >}}

   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding this in the  environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialize ASM in your code or set `DD_APPSEC_ENABLED` environment variable to true in your service invocation:
```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/application_security/setup_and_configure/?code-lang=ruby#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
