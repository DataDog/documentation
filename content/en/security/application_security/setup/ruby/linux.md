---
title: Set up App and API Protection for Ruby on Linux
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

{{% app-and-api-protection-ruby-setup-options platform="linux" %}}

{{% app-and-api-protection-ruby-overview %}}

## Prerequisites

- Linux operating system
- Ruby application
- Root or sudo privileges
- Your Datadog API key
- Datadog Ruby tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Linux hosts](/agent/?tab=Linux).

## 2. Enabling App and API Protection monitoring

Add the `datadog` gem to your Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Install the gem:

```bash
bundle install
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Configure Datadog library in `config/initializers/datadog.rb`:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'

  c.tracing.enabled = true
  c.appsec.enabled = true
end
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

Set environment variables for your application. Add these to your deployment configuration or shell environment:

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing configuration to false.
{{< tabs >}}
{{% tab "Configuration file" %}}

Configure Datadog library in `config/initializers/datadog.rb`:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'

  c.tracing.enabled = false
  c.appsec.enabled = true
end
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

Set environment variables for your application:

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3: Run Your Application

Start your application with above settings.

## 4. Verify setup

To verify that App and API Protection is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer](https://app.datadoghq.com/security/appsec) in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Ruby application, see the [Ruby App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/ruby/compatibility
[2]: /security/application_security/setup/ruby/troubleshooting
