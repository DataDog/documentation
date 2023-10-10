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

The Datadog Profiler requires Ruby 2.3+ (JRuby and TruffleRuby are not supported).

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

You also need either the [`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) or the [`pkgconf`](https://github.com/pkgconf/pkgconf) Linux system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- The `pkg-config` package is available for [Homebrew](https://formulae.brew.sh/formula/pkg-config), and [Debian](https://packages.debian.org/search?keywords=pkg-config)- and [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config)-based Linux
- The `pkgconf` package is available for [Arch](https://archlinux.org/packages/?q=pkgconf)- and [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf)-based Linux
- The `pkgconf-pkg-config` package is available for [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/)- and [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config)-based Linux

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][2]+ or [6.20.2][3]+.

2. Add the `ddtrace` gem to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'ddtrace', '~> 1.15'
    ```

    If you're running a version of `ddtrace` older than 1.15.0, add the `google-protobuf` gem (version ~> 3.0) as a dependency.

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

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
