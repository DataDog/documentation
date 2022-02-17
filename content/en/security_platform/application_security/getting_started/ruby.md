---
title: Ruby Applications
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
      text: "OOTB Application Security Rules"
---

{{% appsec-getstarted %}}

## Get started

1. **Update your Gemfile to include the Datadog library**:

   ```
   gem 'ddtrace', '~> 1.0.0.beta1'
   ```

   For information about which language and framework versions are supported by the library, see [Compatibility][1].

   See our [upgrade guide to 1.0][2] if you were using a 0.x version of `ddtrace`.

2. **Enable Application Security**, either in your code:
   {{< tabs >}}

{{% tab "Rails" %}}
   The APM tracer is required to operate AppSec. If you want to enable the APM tracer via auto-instrument, update your Gemfile:

   ```
   gem 'ddtrace', '~> 1.0.0.beta1', require: 'ddtrace/auto_instrument'
   ```

   Add an initializer:

   ```
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     # not needed if `gem 'ddtrace', require: 'ddtrace/auto_instrument'` is used
     c.tracing.instrument :rails

     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```
{{% /tab %}}

{{% tab "Sinatra" %}}
   The APM tracer is required to operate AppSec.

   And add to your app's startup:

   ```
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     # not needed if `require 'ddtrace/auto_instrument'` is used
     c.tracing.instrument :sinatra

     # enable appsec for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   The APM tracer is required to operate AppSec. Add this to your `config.ru`:

   ```
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

```
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```
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

```
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

Initialize Application Security in your code or set `DD_APPSEC_ENABLED` environment variable to true in your service invocation:
```
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2 %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/application_security/setup_and_configure/?code-lang=ruby#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
