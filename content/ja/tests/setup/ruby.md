---
title: Ruby Tests
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/setup_tests/ruby
  - /continuous_integration/tests/ruby
  - /continuous_integration/tests/setup/ruby
further_reading:
    - link: /continuous_integration/tests/containers/
      tag: Documentation
      text: Forwarding Environment Variables for Tests in Containers
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported languages:

| Language | Version |
|---|---|
| Ruby | >= 2.7 |
| JRuby | >= 9.4 |

Supported test frameworks:

| Test Framework | Version |
|---|---|
| RSpec | >= 3.0.0 |
| Minitest | >= 5.0.0 |
| Cucumber | >= 3.0 |

Supported test runners:

| Test runner | Version |
|---|---|
| Knapsack Pro | >= 7.2.0 |
| ci-queue | >= 0.53.0 |

## Configuring reporting method

To report test results to Datadog, you need to configure the `datadog-ci` gem:

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Installing the Ruby test visibility library

To install the Ruby test visibility library:

1. Add the `datadog-ci` gem to your `Gemfile`:

{{< code-block lang="ruby" filename="Gemfile" >}}
source "<https://rubygems.org>"
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. Install the gem by running `bundle install`

## Instrumenting your tests

{{< tabs >}}
{{% tab "RSpec" %}}

The RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

```ruby
require "rspec"
require "datadog/ci"

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test visibility
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    # Enables the RSpec instrumentation
    c.ci.instrument :rspec
  end
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

The Minitest integration traces all executions of tests when using the `minitest` framework.

To activate your integration, add this to the `test_helper.rb` file:

```ruby
require "minitest"
require "datadog/ci"

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test visibility
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake test
```

<div class="alert alert-warning">
<strong>Note:</strong> When using `minitest/autorun`, ensure that `datadog/ci` is required before `minitest/autorun`.
</div>

Example configuration with `minitest/autorun`:

```ruby
require "datadog/ci"
require "minitest/autorun"

if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    c.ci.enabled = true

    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

{{% /tab %}}

{{% tab "Cucumber" %}}

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、次のコードをアプリケーションに追加します。

```ruby
require "cucumber"
require "datadog/ci"

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # enables test visibility
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = "my-ruby-app"

    # Enables the Cucumber instrumentation
    c.ci.instrument :cucumber
  end
end
```

環境変数 `DD_ENV` でテストが実行されている環境を指定し、通常どおりテストを実行します。
以下の環境が使えます。

* 開発者のワークステーションでテストを実行している場合は `local`
* CI プロバイダー上で実行している場合は `ci`

例:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### テストにカスタムタグを追加する

You can add custom tags to your tests by using the current active test:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][2] section of the Ruby custom instrumentation documentation.

### Adding custom measures to tests

Like tags, you can add custom measures to your tests by using the current active test:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

For more information on custom measures, see the [Add Custom Measures Guide][3].

## 構成設定

The following is a list of the most important configuration settings that can be used with the test visibility library, either in code by using a `Datadog.configure` block, or using environment variables:

`service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `$PROGRAM_NAME`<br/>
**例**: `my-ruby-app`

`env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][4].

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][5]オプションも使用できます。

## Using additional instrumentation

It can be useful to have rich tracing information about your tests that includes time spent performing database operations or other external calls, as seen in the following flame graph:

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Test trace with Redis instrumented" >}}

To achieve this, configure additional instrumentation in your `configure` block:

```ruby
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    #  ... ci configs and instrumentation here ...
    c.tracing.instrument :redis
    c.tracing.instrument :pg
    # ... any other instrumentations supported by datadog gem ...
  end
end
```

Alternatively, you can enable automatic instrumentation in `test_helper/spec_helper`:

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Note**: In CI mode, these traces are submitted to CI Visibility, and they do **not** show up in Datadog APM.

For the full list of available instrumentation methods, see the [tracing documentation][6]

## Webmock/VCR

[Webmock][7] and [VCR][9]
are popular Ruby libraries that stub HTTP requests when running tests.
By default, they fail when used with datadog-ci because traces are being sent
to Datadog with HTTP calls.

To allow HTTP connections for Datadog backend, you need to configure
Webmock and VCR accordingly.

```ruby
# Webmock
# when using Agentless mode:
WebMock.disable_net_connect!(:allow => /datadoghq/)

# when using Agent running locally:
WebMock.disable_net_connect!(:allow_localhost => true)

# or for more granular setting set your Agent URL, for example:
WebMock.disable_net_connect!(:allow => "localhost:8126")

# VCR
VCR.configure do |config|
  # ... your usual configuration here ...

  # when using Agent
  config.ignore_hosts "127.0.0.1", "localhost"

  # when using Agentless mode
  config.ignore_request do |request|
    # ignore all requests to datadoghq hosts
    request.uri =~ /datadoghq/
  end
end
```

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## 手動テスト API の使用

If you use RSpec, Minitest, or Cucumber, **do not use the manual testing API**, as CI Visibility automatically instruments them and sends the test results to Datadog. The manual testing API is **incompatible** with already supported testing frameworks.

Use the manual testing API only if you use an unsupported testing framework or have a different testing mechanism.
Full public API documentation is available on [YARD site][8].

### ドメインモデル

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

#### テストセッション

A test session represents a test command run.

To start a test session, call `Datadog::CI.start_test_session` and pass the Datadog service and tags (such as the test framework
you are using).

When all your tests have finished, call `Datadog::CI::TestSession#finish`, which closes the session and sends the session
trace to the backend.

#### テストモジュール

A test module represents a smaller unit of work within a session.
For supported test frameworks, test module is always same as test session.
For your use case, this could be a package in your componentized application.

To start a test module, call `Datadog::CI.start_test_module` and pass the name of the module.

When the module run has finished, call `Datadog::CI::TestModule#finish`.

#### Test suite

A test suite comprises a set of tests that test similar functionality.
A single suite usually corresponds to a single file where tests are defined.

Create test suites by calling `Datadog::CI#start_test_suite` and passing the name of the test suite.

Call `Datadog::CI::TestSuite#finish` when all the related tests in the suite have finished their execution.

#### テスト

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、テストのロジックを含む 1 つのメソッドに対応します。

Create tests in a suite by calling `Datadog::CI#start_test` or `Datadog::CI.trace_test` and passing the name of the test and name of the test suite. Test suite name must be the same as name of the test suite started in previous step.

Call `Datadog::CI::Test#finish` when a test has finished execution.

### コード例

The following code represents example usage of the API:

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /tests/guides/add_custom_measures/?tab=ruby
[4]: /getting_started/tagging/unified_service_tagging
[5]: /tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
