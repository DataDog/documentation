---
title: Set up App and API Protection for Ruby on macOS
code_lang: macos
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

{{% app-and-api-protection-ruby-overview %}}

## Prerequisites

- macOS operating system
- Ruby application
- Homebrew (recommended for Agent installation)
- Administrator privileges for some configuration steps
- Your Datadog API key
- Datadog Ruby tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for macOS](/agent/?tab=macOS).

## 2. Enabling App and API Protection monitoring

Install and configure the `datadog` gem in your Ruby application.

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Add the `datadog` gem to your Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Install dependencies:

```bash
bundle install
```

Configure Datadog library by adding an initializer:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.tracing.enabled = true

  # Tracing instrumentation for Rails has to be explicitly enabled
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # Rails instrumentation is required for App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

Add the `datadog` gem to your Gemfile and require auto-instrumentation:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Install dependencies:

```bash
bundle install
```

Set environment variables for your application. Add these to your deployment configuration or shell environment:

```bash
export DD_APPSEC_ENABLED=true
export DD_API_SECURITY_ENABLED=true
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

Add the `datadog` gem to your Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Install dependencies:

```bash
bundle install
```

Configure Datadog library by adding an initializer:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  # Disable APM Tracing
  c.tracing.enabled = false

  # Tracing instrumentation for Rails has to be explicitly enabled
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # Rails instrumentation is required for App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment Variables" %}}

Add the `datadog` gem to your Gemfile and require auto-instrumentation:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Install dependencies:

```bash
bundle install
```

Set environment variables for your application. Add these to your deployment configuration or shell environment:

```bash
export DD_APPSEC_ENABLED=true
export DD_API_SECURITY_ENABLED=true
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

1. Send some traffic to your application.
2. Check the [App and API Protection Service Inventory](https://app.datadoghq.com/security/appsec/inventory/services) in Datadog.
3. Find your service and check that App and API protection is enabled in the **Coverage** column.

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Ruby application, see the [Ruby App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/ruby/compatibility
[2]: /security/application_security/setup/ruby/troubleshooting
