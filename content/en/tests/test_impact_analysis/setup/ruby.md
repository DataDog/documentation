---
title: Test Impact Analysis for Ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
aliases:
    - /intelligent_test_runner/setup/ruby
further_reading:
    - link: "/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

## Compatibility

Test Impact Analysis is only supported in the following versions and testing frameworks:

* `datadog-ci >= 1.0`
* `Ruby >= 2.7`
  * JRuby is not supported.
* `rspec >= 3.0.0`
* `minitest >= 5.0.0`
* `cucumber >= 3.0.0`

## Setup

### Test Optimization

Prior to setting up Test Impact Analysis, set up [Test Optimization for Ruby][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

After completing setup, run your tests as you normally do.

## Disabling skipping for specific tests

You can override the Test Impact Analysis's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

* Tests that read data from text files
* Tests that interact with APIs outside of the code being tested (such as remote REST APIs)
* Tests that run external processes
* Tests that depend on global shared state (for example, caches created by a different test or process)
* Tests that use forked processes (per test code coverage only collects coverage for the main process)
* Integration tests that use capybara or selenium-webdriver

Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

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
To mark an entire feature file as unskippable in Cucumber, use the `@datadog_itr_unskippable` tag. This prevents Test Impact Analysis from skipping any of the scenarios defined in that feature file.

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

### Temporarily disabling Test Impact Analysis

Test Impact Analysis can be disabled locally by setting the `DD_CIVISIBILITY_ITR_ENABLED` environment variable to `false` or `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (Optional)
: Enable the Test Impact Analysis coverage and test skipping features<br />
**Default**: `(true)`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/ruby
