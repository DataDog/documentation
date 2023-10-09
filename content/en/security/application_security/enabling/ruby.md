---
title: Enabling ASM for Ruby
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /security_platform/application_security/getting_started/ruby
  - /security/application_security/getting_started/ruby
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: 'GitHub'
      text: 'Ruby Datadog library source code'
    - link: "/security/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

You can monitor application security for Ruby apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Get started

1. **Update your Gemfile to include the Datadog library**:

   ```ruby
   gem 'ddtrace', '~> 1.1'
   ```

   To check that your service's language and framework versions are supported for ASM capabilities, see [Compatibility][1].

   For more information about upgrading from a `dd-trace` 0.x version, see [the Ruby tracer upgrade guide][2].

2. **Enable ASM** by enabling the APM tracer. The following options describe a quick setup that covers the most common cases. Read [the Ruby tracer documentation][3] for more details.

   You can enable ASM either in your code:

   {{< tabs >}}

{{% tab "Rails" %}}
   Enable the APM tracer by adding an initializer in your application code:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rails

     # enable ASM
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   Or enable the APM tracer through auto-instrumentation by updating your Gemfile to auto-instrument:

   ```ruby
   gem 'ddtrace', '~> 1.1', require: 'ddtrace/auto_instrument'
   ```

   And also enable `appsec`:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable ASM
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   Enable the APM tracer by adding the following to your application's startup:

   ```ruby
   require 'sinatra'
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :sinatra

     # enable ASM for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   Or enable the APM tracer through auto-instrumentation:

   ```ruby
   require 'sinatra'
   require 'ddtrace/auto_instrument'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable ASM for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   Enable the APM tracer by adding the following to your `config.ru` file:

   ```ruby
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rack

     # enable ASM for Rack
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

```Dockerfile
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
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding this in the environment section:

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

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/enabling/compatibility/ruby
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[3]: /tracing/trace_collection/dd_libraries/ruby/
