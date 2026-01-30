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

The Datadog Profiler requires Ruby 2.5+ (Ruby 3.2.3+ or later is recommended). JRuby and TruffleRuby are not supported.

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

You also need either the [`pkg-config`][16] or the [`pkgconf`][17] system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- The `pkg-config` package is available for [Homebrew][18], and [Debian][19]- and [Ubuntu][20]-based Linux
- The `pkgconf` package is available for [Arch][21]- and [Alpine][22]-based Linux
- The `pkgconf-pkg-config` package is available for [Fedora][23]- and [Red-Hat][24]-based Linux

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda. Additionally, [Single Step APM Instrumentation][25] cannot be used to set up the Ruby Profiler.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'datadog', '~> 2.18'
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

    If you're running a version of the gem older than 1.21.0, replace `ddprofrb exec` with `ddtracerb exec`.

    **Note**

    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```

6. Optional: Set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

7. A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][5]. If they do not, refer to the [Troubleshooting][26] guide.

## Configuration

These settings apply to the latest profiler release.

You can configure the profiler using the following environment variables:

| Environment variable                          | Type    | Description                                                                                                                             |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_PROFILING_ENABLED`                        | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `DD_PROFILING_ALLOCATION_ENABLED`             | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `DD_PROFILING_MAX_FRAMES`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`. Not yet compatible with Ruby 4. |
| `DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`. Not yet compatible with Ruby 4. |
| `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][15] for details. |
| `DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `DD_ENV`                                      | String  | The [environment][10] name, for example: `production`.                                                                                  |
| `DD_SERVICE`                                  | String  | The [service][10] name, for example, `web-backend`.                                                                                     |
| `DD_VERSION`                                  | String  | The [version][10] of your service.                                                                                                      |
| `DD_TAGS`                                     | String  | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.          |

Alternatively, you can set profiler parameters in code with these functions, inside a `Datadog.configure` block. Note that parameters provided in code take precedence over those provided as environment variables.

| Environment variable                                  | Type    | Description                                                                                                                             |
| ----------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `c.profiling.enabled`                                 | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `c.profiling.allocation_enabled`                      | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `c.profiling.advanced.max_frames`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `c.profiling.advanced.experimental_heap_enabled`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`. Not yet compatible with Ruby 4. |
| `c.profiling.advanced.experimental_heap_size_enabled` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `experimental_heap_size_enabled`. Not yet compatible with Ruby 4. |
| `c.profiling.advanced.no_signals_workaround_enabled`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][15] for details. |
| `c.profiling.advanced.preview_otel_context_enabled`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `c.env`                                               | String  | The [environment][10] name, for example: `production`.                                                                                  |
| `c.service`                                           | String  | The [service][10] name, for example, `web-backend`.                                                                                     |
| `c.version`                                           | String  | The [version][10] of your service.                                                                                                      |
| `c.tags`                                              | Hash    | Tags to apply to an uploaded profile.                                                                                                   |

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
[10]: /getting_started/tagging/unified_service_tagging
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
[15]: /profiler/profiler_troubleshooting/ruby/#unexpected-failures-or-errors-from-ruby-gems-that-use-native-extensions
[16]: https://www.freedesktop.org/wiki/Software/pkg-config/
[17]: https://github.com/pkgconf/pkgconf
[18]: https://formulae.brew.sh/formula/pkgconf
[19]: https://packages.debian.org/search?keywords=pkg-config
[20]: https://packages.ubuntu.com/search?keywords=pkg-config
[21]: https://archlinux.org/packages/?q=pkgconf
[22]: https://pkgs.alpinelinux.org/packages?name=pkgconf
[23]: https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config
[24]: https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config
[25]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[26]: /profiler/profiler_troubleshooting/ruby/
