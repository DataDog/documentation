---
title: Enabling AAP for Ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /security_platform/application_security/getting_started/ruby
  - /security/application_security/getting_started/ruby
  - /security/application_security/enabling/tracing_libraries/threat_detection/ruby/
  - /security/application_security/threats/setup/threat_detection/ruby
  - /security/application_security/threats_detection/ruby
  - /security/application_security/setup/aws/fargate/ruby
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: "Source Code"
      text: 'Ruby Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

You can monitor App and API Protection for Ruby apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection

### Get started

1. **Update your Gemfile to include the Datadog library**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

   For more information about upgrading to v2 from a `dd-trace` 1.x version, see [the Ruby tracer upgrade guide][2].

2. **Enable AAP** by enabling the APM tracer. The following options describe a quick setup that covers the most common cases. Read [the Ruby tracer documentation][3] for more details.

   You can enable AAP either in your code:

   {{< tabs >}}

{{% tab "Rails" %}}
   Enable the APM tracer by adding an initializer in your application code:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rails

     # enable AAP
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   Or enable the APM tracer through auto-instrumentation by updating your Gemfile to auto-instrument:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   And also enable `appsec`:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable AAP
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   Enable the APM tracer by adding the following to your application's startup:

   ```ruby
   require 'sinatra'
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :sinatra

     # enable AAP for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   Or enable the APM tracer through auto-instrumentation:

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation

     # enable AAP for Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

{{% /tab %}}

{{% tab "Rack" %}}
   Enable the APM tracer by adding the following to your `config.ru` file:

   ```ruby
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer
     c.tracing.instrument :rack

     # enable AAP for Rack
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

Initialize AAP in your code or set `DD_APPSEC_ENABLED` environment variable to true in your service invocation:

```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Using AAP without APM tracing

If you want to use Application & API Protection without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][standalone_billing_guide].
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /tracing/trace_collection/dd_libraries/ruby/
