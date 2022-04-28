---
title: Enabling the Ruby Profiler
kind: Documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
    - link: 'https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/'
      tag: 'Blog'
      text: 'Analyze Ruby code performance with Datadog Continuous Profiler'
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

The Datadog Profiler requires MRI Ruby 2.1+. **Wall time profiling is available for users on every platform (including macOS and Windows), but CPU time profiles are currently only available on Linux platforms**.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][2]+ or [6.20.2][3]+.

2. Add the `ddtrace` and `google-protobuf` gems to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'ddtrace', '~> 1'
    gem 'google-protobuf', '~> 3.0'
    ```

2. Install the gems with `bundle install`.

3. Enable the profiler:

   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

```ruby
Datadog.configure do |c|
  c.profiling.enabled = true
  c.env = 'prod'
  c.service = 'my-web-app'
  c.version = '1.0.3'
end
```

**Note**: For Rails applications, create a `config/initializers/datadog.rb` file with the code configuration above.

{{% /tab %}}
{{< /tabs >}}

4. Add the `ddtracerb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddtracerb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddtracerb exec bin/rails s
    ```

    **Note**

    If starting the application via `ddtracerb exec` is not an option (eg. when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point such as `config.ru` for a web application:

    ```ruby
    require 'datadog/profiling/preload'
    ```


4. A minute or two after starting your Ruby application, your profiles will show up on the [Datadog APM > Profiler page][4].

## Not sure what to do next?

The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/profiler/
