---
code_lang: ruby
code_lang_weight: 20
further_reading:
- link: /tests
  tag: Documentation
  text: Explore Test Results and Performance
- link: /tests/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
kind: documentation
title: Intelligent Test Runner for Ruby
type: multi-code-lang
---

{{< beta-callout url="#" btn_hidden="true" >}}Intelligent Test Runner for Ruby in beta.{{< /beta-callout >}}

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `datadog-ci >= 1.0`
* `Ruby >= 2.7`
  * JRuby is not supported.
* `rspec >= 3.0.0`
* `minitest >= 5.0.0`
  * [Rails parallel testing][2] is not supported.
* `cucumber >= 3.0.0`

## セットアップ

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Ruby][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

<div class="alert alert-info">Setting <code>DD_CIVISIBILITY_ITR_ENABLED</code> to true is required while the Intelligent Test Runner support for Ruby is in beta. </div>

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ITR_ENABLED="true" DD_ENV=ci DD_SERVICE=my-app bundle exec rake test
{{< /code-block >}}

{{% /tab %}}

{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

設定が完了したら、通常通りテストを実行します。

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ITR_ENABLED="true" DD_ENV=ci DD_SERVICE=my-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY bundle exec rake test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 特定のテストに対するスキップの無効化

Intelligent Test Runner の動作をオーバーライドして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップできないテストと呼ばれます。

### テストをスキップできないようにする理由は？

Intelligent Test Runner は、テストをスキップすべきかどうかを判断するために、コードカバレッジデータを使用します。場合によっては、このデータだけでは判断できないこともあります。

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)
* Tests that run external processes
* Tests that use threads or fork process (code coverage tracks only code executed in main thread)

テストをスキップ不可に指定すると、カバレッジデータに関係なく Intelligent Test Runner がテストを実行します。

### Marking tests as unskippable

{{< tabs >}}
{{% tab "RSpec" %}}
To ensure that RSpec tests within a specific block are not skipped, add the metadata key `datadog_itr_unskippable` with the value `true` to any `describe`, `context`, or `it` block. This marks all tests in that block as unskippable.

```ruby
# mark the whole file as unskippable
RSpec.describe MyClass, datadog_itr_unskippable: true do
  describe "#my_method" do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end

# mark one test as unskippable
RSpec.describe MyClass do
  describe "#my_method" do
    context "when called without arguments" do
      it "works", datadog_itr_unskippable: true do
      end
    end
  end
end

# mark specific block as unskippable
RSpec.describe MyClass do
  describe "#my_method", datadog_itr_unskippable: true do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end
```

{{% /tab %}}
{{% tab "Cucumber" %}}
To mark an entire feature file as unskippable in Cucumber, use the `@datadog_itr_unskippable` tag. This prevents the Intelligent Test Runner from skipping any any of the scenarios defined in that feature file.

To make only specific scenarios unskippable, apply this tag directly to the desired scenario.

```ruby
@datadog_itr_unskippable
Feature: Unskippable feature
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"

Feature: An unskippable scenario

  @datadog_itr_unskippable
  Scenario: Unskippable scenario
    When the ITR wants to skip this scenario
    Then it will never be skipped

  Scenario: Skippable scenario
    When the ITR wants to skip this scenario
    Then it will be skipped
```

{{% /tab %}}
{{% tab "Minitest" %}}
To make an entire Minitest subclass unskippable, use the `datadog_itr_unskippable` method. If you want to mark specific tests within the subclass as unskippable, provide the names of these test methods as arguments to the `datadog_itr_unskippable` method call.

```ruby
# mark the whole class unskippable
class MyTest < Minitest::Test
  datadog_itr_unskippable

  def test_my_method
  end
end

# here only test1 and test2 are unskippab;e
class MyTest < Minitest::Test
  datadog_itr_unskippable "test1", "test2"

  def test1
  end

  def test2
  end

  def test3
  end
end
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/ruby
[2]: https://edgeguides.rubyonrails.org/testing.html#parallel-testing