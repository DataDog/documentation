<!--
Ruby profiler setup — self-contained.
-->

The profiler is shipped within Datadog SDKs. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires Ruby 2.5+ (Ruby 3.2.3+ or later is recommended). JRuby and TruffleRuby are not supported.

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

Versions of the `datadog` gem older than 2.30 also need either the [`pkg-config`][4] or the [`pkgconf`][5] system utility installed.
This is no longer needed on modern versions.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda. Additionally, [Single Step APM Instrumentation][6] cannot be used to set up the Ruby Profiler.

## Installation
To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file and install with `bundle install`:

    ```ruby
    gem 'datadog', '~> 2.30'
    ```

3. Enable the profiler:

   {% tabs %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_PROFILING_ENABLED=true
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ```
   {% /tab %}

   {% tab label="In code" %}
   ```ruby
   Datadog.configure do |c|
     c.profiling.enabled = true
     c.env = 'prod'
     c.service = 'my-web-app'
     c.version = '1.0.3'
   end
   ```

   {% alert %}
   For Rails applications, create a `config/initializers/datadog.rb` file with the code configuration above.
   {% /alert %}
   {% /tab %}

   {% /tabs %}

4. Add the `ddprofrb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    {% alert %}
    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```
    {% /alert %}

5. Optional: Set up [Source Code Integration][7] to connect your profiling data with your Git repositories.

6. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][8]. If they do not, see the [Troubleshooting][9] guide.

### AI-assisted installation

Use the following prompt with a local AI coding agent to set up the Ruby profiler for your service. Copy and paste this prompt into your AI agent to get started.

```text
You are helping me set up Datadog Continuous Profiler for my Ruby service.

First, scan my project to auto-detect as much as possible. Look for:
- Gemfile and Gemfile.lock to determine the Ruby version, engine (MRI,
  JRuby, TruffleRuby), and whether the datadog gem (or older ddtrace
  gem) is already a dependency. Also check for opentelemetry-sdk.
- .ruby-version or .tool-versions for the Ruby version and engine.
- config.ru, Procfile, bin/rails, puma.rb, unicorn.rb, or passenger
  config to determine how the application starts.
- Existing Datadog.configure blocks in config/initializers/ or
  application entrypoints to detect current APM or profiler usage.
  Note whether config uses environment variables or in-code style.
- Dockerfile, docker-compose.yml, or Kubernetes manifests for the base
  image (check OS: Linux glibc, Alpine musl, macOS, or Windows; and
  architecture: x86-64 or aarch64), startup command, and existing
  Datadog Agent configuration. Check whether the application targets
  a serverless platform (AWS Lambda) or uses Single Step APM
  Instrumentation.
- Existing environment variables or .env files referencing DD_SERVICE,
  DD_ENV, DD_VERSION, or DD_PROFILING_ENABLED.

Before proceeding, check for unsupported configurations:
- JRuby and TruffleRuby are NOT supported. If detected, warn and stop.
- Only Linux (glibc or musl) on x86-64 and aarch64 is supported.
  macOS and Windows are not supported. If detected, warn and stop.
- Continuous Profiler is not supported on serverless platforms such as
  AWS Lambda. If detected, warn and stop.
- Single Step APM Instrumentation cannot be used to set up the Ruby
  Profiler. If detected, warn that manual setup is required instead.

Present a summary of what you detected, then ask ONLY about what you
could not determine:
- DD_SERVICE, DD_ENV, and DD_VERSION values (if not already set).
- Datadog Agent deployment method (if no Agent config found in the
  project).
- Whether allocation or heap profiling is needed beyond CPU and wall
  time.
- Anything ambiguous from the project files.

Generate the setup steps tailored to what you found:
- If the older ddtrace gem is detected, replace it with the datadog
  gem (~> 2.30) in the Gemfile.
- Add the datadog gem (~> 2.30) to the Gemfile if not already present,
  then run bundle install.
- Enable profiling using environment variables
  (DD_PROFILING_ENABLED=true) or a Datadog.configure block, matching
  the project's existing configuration pattern.
- For Rails apps, create config/initializers/datadog.rb if using
  in-code config.
- Wrap the start command with bundle exec ddprofrb exec. This step is
  required for the profiler to work. Examples:
    bundle exec ddprofrb exec ruby myapp.rb
    bundle exec ddprofrb exec bin/rails s
  The ONLY exception is Phusion Passenger, which does not support
  wrapping. For Passenger, add require 'datadog/profiling/preload'
  to the application entry point (such as config.ru) instead.
- Set DD_SERVICE, DD_ENV, and DD_VERSION.
- If allocation profiling is requested, set
  DD_PROFILING_ALLOCATION_ENABLED=true (or c.profiling.allocation_enabled
  = true in code). The profiler must be enabled first.
- If heap profiling is requested, set
  DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED=true. This requires allocation
  profiling to be enabled as well. For heap size profiling, also set
  DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED=true. Note: heap size
  profiling is not compatible with Ruby 4.
- If opentelemetry-sdk is detected in the Gemfile, set
  DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED=only when using profiling
  directly with OpenTelemetry, or =true for auto-detection.
- Suggest setting up Source Code Integration to connect profiling data
  with Git repositories.
- Show the complete modified startup command or Dockerfile.

Reference: https://docs.datadoghq.com/profiler/enabling/?code-lang=ruby
```

## Configuration

These settings apply to the latest profiler release.

You can configure the profiler using the following environment variables:

| Environment variable                          | Type    | Description                                                                                                                             |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_PROFILING_ENABLED`                        | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `DD_PROFILING_ALLOCATION_ENABLED`             | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `DD_PROFILING_MAX_FRAMES`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`. Currently not compatible with Ruby 4. |
| `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][10] for details. |
| `DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `DD_ENV`                                      | String  | The [environment][11] name, for example: `production`.                                                                                  |
| `DD_SERVICE`                                  | String  | The [service][11] name, for example, `web-backend`.                                                                                     |
| `DD_VERSION`                                  | String  | The [version][11] of your service.                                                                                                      |
| `DD_TAGS`                                     | String  | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.          |

Alternatively, you can set profiler parameters in code with these functions, inside a `Datadog.configure` block. Parameters provided in code take precedence over those provided as environment variables.

| Environment variable                                  | Type    | Description                                                                                                                             |
| ----------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `c.profiling.enabled`                                 | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `c.profiling.allocation_enabled`                      | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `c.profiling.advanced.max_frames`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `c.profiling.advanced.experimental_heap_enabled`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `c.profiling.advanced.experimental_heap_size_enabled` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `experimental_heap_size_enabled`. Currently not compatible with Ruby 4. |
| `c.profiling.advanced.no_signals_workaround_enabled`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][10] for details. |
| `c.profiling.advanced.preview_otel_context_enabled`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `c.env`                                               | String  | The [environment][11] name, for example: `production`.                                                                                  |
| `c.service`                                           | String  | The [service][11] name, for example, `web-backend`.                                                                                     |
| `c.version`                                           | String  | The [version][11] of your service.                                                                                                      |
| `c.tags`                                              | Hash    | Tags to apply to an uploaded profile.                                                                                                   |

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://www.freedesktop.org/wiki/Software/pkg-config/
[5]: https://github.com/pkgconf/pkgconf
[6]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[7]: /integrations/guide/source-code-integration/?tab=ruby
[8]: https://app.datadoghq.com/profiling
[9]: /profiler/profiler_troubleshooting/ruby/
[10]: /profiler/profiler_troubleshooting/ruby/#unexpected-failures-or-errors-from-ruby-gems-that-use-native-extensions
[11]: /getting_started/tagging/unified_service_tagging
