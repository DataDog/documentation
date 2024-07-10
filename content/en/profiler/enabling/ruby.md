---
title: Enabling the Ruby Profiler
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/ruby'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
    - link: 'https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/'
      tag: 'Blog'
      text: 'Analyze Ruby code performance with Datadog Continuous Profiler'
aliases:
  - /tracing/profiler/enabling/ruby/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][14].

The Datadog Profiler requires Ruby 2.5+. JRuby and TruffleRuby are not supported.

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

You also need either the [`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) or the [`pkgconf`](https://github.com/pkgconf/pkgconf) system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- The `pkg-config` package is available for [Homebrew](https://formulae.brew.sh/formula/pkg-config), and [Debian](https://packages.debian.org/search?keywords=pkg-config)- and [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config)-based Linux
- The `pkgconf` package is available for [Arch](https://archlinux.org/packages/?q=pkgconf)- and [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf)-based Linux
- The `pkgconf-pkg-config` package is available for [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/)- and [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config)-based Linux

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

[Single Step Instrumentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/) is not supported for Linux hosts, VMs, or Docker.
Single Step Instrumentation is supported for Kubernetes (using the Datadog Helm chart), but you need to manually set the `DD_PROFILING_ENABLED=true` environment variable to enable profiling.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'datadog', '~> 2.0'
    ```
3. Install the gems with `bundle install`.

4. Enable the profiler:

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

5. Add the `ddprofrb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    If you're running a version of `ddtrace` older than 1.21.0, replace `ddprofrb exec` with `ddtracerb exec`.

    **Note**

    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```

6. Optional: Set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

7. A minute or two after starting your Ruby application, your profiles will show up on the [Datadog APM > Profiler page][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /integrations/guide/source-code-integration/?tab=ruby
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
