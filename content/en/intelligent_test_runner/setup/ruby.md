---
title: Intelligent Test Runner for Ruby
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: "/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< beta-callout url="#" btn_hidden="true" >}}Intelligent Test Runner for Ruby in beta.{{< /beta-callout >}}

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `datadog-ci >= 1.0.0.beta3`
* `Ruby >= 2.7`
  * JRuby is not supported.
* `rspec >= 3.0.0`
* `minitest >= 5.0.0`
  * [Rails parallel testing][2] is not supported as of library version `1.0.0.beta6`.
* `cucumber >= 3.0.0`

## Setup

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Ruby][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

### Use the latest version of a Test Visibility library

Intelligent Test Runner for Ruby is available in `datadog-ci` gem version `1.0.0.beta3` and later.

Add to your Gemfile:

```ruby
group :test do
  gem 'datadog-ci', '~> 1.0.0.beta6'
end
```

If you use other datadog products, upgrade to `2.0.0.rc1` version of gem `datadog`:

```ruby
gem 'datadog', '~> 2.0.0.rc1'

group :test do
  gem 'datadog-ci', '~> 1.0.0.beta6'
end
```

## Run tests with the Intelligent Test Runner enabled

<div class="alert alert-info">Setting <code>DD_CIVISIBILITY_ITR_ENABLED</code> to true is required while the Intelligent Test Runner support for Ruby is in beta. </div>

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ITR_ENABLED="true" DD_ENV=ci DD_SERVICE=my-app bundle exec rake test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ITR_ENABLED="true" DD_ENV=ci DD_SERVICE=my-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY bundle exec rake test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Disabling skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

* Tests that read data from text files
* Tests that interact with APIs outside of the code being tested (such as remote REST APIs)
* Tests that run external processes
* Tests that use threads or fork process (code coverage tracks only code executed in main thread)

Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/ruby
[2]: https://edgeguides.rubyonrails.org/testing.html#parallel-testing
