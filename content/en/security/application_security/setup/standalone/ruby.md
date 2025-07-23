---
title: Enabling Application & API Protection for Ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /security_platform/application_security/getting_started/ruby
  - /security/application_security/getting_started/ruby
  - /security/application_security/enabling/tracing_libraries/threat_detection/ruby/
  - /security/application_security/threats/setup/standalone/ruby
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: "Source Code"
      text: 'Ruby Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App & API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App & API Protection"
---

You can monitor App and API Protection for Ruby apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted-standalone %}}

## Enabling Application & API Protection
### Get started

1. **Update your Gemfile to include the Datadog library**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   To check that your service's language and framework versions are supported for Application & API Protection capabilities, see [Compatibility][1].

   For more information about upgrading to v2 from a `dd-trace` 1.x version, see [the Ruby tracer upgrade guide][2].

2. **Enable Application & API Protection** by enabling the APM tracer. The following options describe a quick setup that covers the most common cases. Read [the Ruby tracer documentation][3] for more details.

   You can enable Application & API Protection either in your code:

   {{< tabs >}}

{{% tab "Rails" %}}
   Enable the APM tracer by adding an initializer in your application code:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :rails
     c.tracing.enabled = false

     # enable Application & API Protection
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   Or enable the APM tracer through auto-instrumentation by updating your Gemfile to auto-instrument:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   And also enable `appsec` and disable tracing:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # the APM tracer is enabled by auto-instrumentation
     c.tracing.enabled = false

     # enable Application & API Protection
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
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :sinatra
     c.tracing.enabled = false

     # enable Application & API Protection for Sinatra
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
     c.tracing.enabled = false

     # enable Application & API Protection for Sinatra
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
     # enable the APM tracer but disable trace processing - for security-only use
     c.tracing.instrument :rack
     c.tracing.enabled = false

     # enable Application & API Protection for Rack
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

Update your configuration container for APM by adding the following arguments in your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable values to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the environment variables:

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
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding these in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialize Application & API Protection in your code or set the environment variables in your service invocation:
```shell
env DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /tracing/trace_collection/dd_libraries/ruby/
