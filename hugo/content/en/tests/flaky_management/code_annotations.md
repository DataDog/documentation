---
title: Test Code Annotations
description: Protect individual tests from Datadog quarantine, disabling, and automatic retries with code annotations.
further_reading:
  - link: "/tests/flaky_management/"
    tag: "Documentation"
    text: "Manage flaky tests"
  - link: "/tests/flaky_tests/auto_test_retries/"
    tag: "Documentation"
    text: "Configure Auto Test Retries"
  - link: "/tests/flaky_tests/early_flake_detection/"
    tag: "Documentation"
    text: "Configure Early Flake Detection"
---

## Overview

Use code annotations to exclude individual tests from Datadog automation. For example, protect a critical test from quarantine or disabling, or prevent Datadog from retrying a test with side effects.

The supported test code annotations include:
| Annotation | Effect |
|------------|--------|
| Prevent failure suppression | Overrides the {{< ui >}}Quarantined{{< /ui >}} and {{< ui >}}Disabled{{< /ui >}} states in [Flaky Test Management][8]. With this annotation, a disabled test still runs, and a quarantined test's failures still fail the build. This annotation doesn't affect retries. |
| Disable automatic retries | Excludes a test from Datadog [Auto Test Retries][1], [Early Flake Detection][2], and [Attempt to Fix][3] retries. Explicit retries configured in the test framework remain available. |

Apply either annotation independently, or combine them to exclude a test from both behaviors.

## Prerequisites


Annotations require [Test Optimization][4] set up with a Datadog SDK for your test framework. They don't work with [JUnit XML report uploads][9], because the SDK applies annotations while tests run, and a JUnit XML upload happens after tests finish.

## Scope of test code annotations

Code annotations are supported for JavaScript/TypeScript, Ruby, Java, .NET, Python, Go, and Swift. Other languages are not supported.

Test code annotations follow these scope rules:

- An annotation affects only automation that the Datadog library supports for that framework.
- Annotations apply to individual test declarations. An annotation on a parameterized declaration applies to every generated test case. Some frameworks also accept an annotation on a class, suite, module, or feature, which applies to every test in it; the language tabs below say where.
- Annotations preserve framework skips, test filters, and expected-failure behavior.
- Annotations do not override [Test Impact Analysis][5]. A test or file that Test Impact Analysis excludes remains excluded.
- Annotations do not disable test discovery or flakiness reporting.
- Annotations take effect only in test source code. Manually setting a `test.test_management.*` annotation tag on a span does not change test execution.
- Annotations control execution without changing the test's configured state in Flaky Tests Management.

## Language-specific setup

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### SDK requirements

Use a supported `dd-trace` version:

| Release line | Minimum version |
|--------------|-----------------|
| v5 | [5.136.0][8] |
| v6 | [6.25.0][9] |

Configure [Test Optimization for JavaScript and TypeScript][10] for the test framework.

### Annotation names

`dd-trace` provides one helper for each annotation:

- `preventFailureSuppression`
- `noAutoRetry`

Cucumber.js uses the scenario tags `@datadog_prevent_failure_suppression` and `@datadog_no_auto_retry` instead of helpers.

### Annotate test callbacks

Import `preventFailureSuppression` and `noAutoRetry` from `dd-trace/ci/test-annotations` and wrap the test callback. For example, with Jest:

```javascript
const { preventFailureSuppression, noAutoRetry } = require('dd-trace/ci/test-annotations')

test('critical behavior', preventFailureSuppression(noAutoRetry(() => {
  expect(2 + 2).toBe(4)
})))
```

Use the same helpers on callbacks passed to Mocha, Vitest, Cypress, Playwright, and WebdriverIO Mocha or Jasmine test declarations. Apply them to the callback passed to `test.each` or another parameterized declaration to annotate every generated case. Importing the helpers does not initialize the tracer; configure Test Optimization instrumentation separately.

For Playwright, wrap the callback that declares the test fixtures:

```javascript
import { test, expect } from '@playwright/test'
import { preventFailureSuppression, noAutoRetry } from 'dd-trace/ci/test-annotations'

test('critical behavior', preventFailureSuppression(noAutoRetry(async ({ page }) => {
  await page.setContent('<h1>Checkout</h1>')
  await expect(page.getByRole('heading')).toHaveText('Checkout')
})))
```

### Annotate Cucumber.js scenarios

Use native scenario tags instead of wrapping step definitions:

```gherkin
@datadog_prevent_failure_suppression @datadog_no_auto_retry
Scenario: Critical behavior
  Given a customer has items in their cart
  When the customer completes checkout
  Then the order is confirmed
```

Tags on a `Scenario Outline` apply to every example.

### Framework requirements

For supported test frameworks and versions, see [Test Optimization compatibility][13].

Explicit framework retries, such as `jest.retryTimes`, Mocha retries, Playwright retry settings, and Cucumber.js `--retry`, remain available when `noAutoRetry` is present.

In Playwright serial groups, `noAutoRetry` excludes the entire group from Datadog retries so tests run with their prerequisites. Explicit Playwright retry settings still apply.

[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.136.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.25.0
[10]: /tests/setup/javascript/
[13]: /tests/setup/javascript/#compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

### SDK requirements

Use the `datadog-ci` gem version [1.43.0][11] or later. Configure [Test Optimization for Ruby][12] and load Datadog's instrumentation before defining tests.

### Annotation names

`datadog-ci` provides one annotation for each behavior:

- `datadog_prevent_failure_suppression`
- `datadog_no_auto_retry`

### RSpec

Add metadata to the test example:

```ruby
RSpec.describe "Critical behavior" do
  it "checks a critical behavior", datadog_prevent_failure_suppression: true, datadog_no_auto_retry: true do
    expect(2 + 2).to eq(4)
  end
end
```

### Minitest

Apply the declarations after defining the test method:

```ruby
class CriticalTest < Minitest::Test
  def test_critical_behavior
    assert_equal 4, 2 + 2
  end

  datadog_prevent_failure_suppression :test_critical_behavior
  datadog_no_auto_retry :test_critical_behavior
end
```

Undefined method names are ignored with a warning.

### Cucumber

Use native tags on a scenario or Scenario Outline:

```gherkin
@datadog_prevent_failure_suppression @datadog_no_auto_retry
Scenario: Critical behavior
  Given a customer has items in their cart
  When the customer completes checkout
  Then the order is confirmed
```

Tags on a `Scenario Outline` apply to every example.

[11]: https://github.com/DataDog/datadog-ci-rb/releases/tag/v1.43.0
[12]: /tests/setup/ruby/

{{% /tab %}}

{{% tab "Java" %}}

### SDK requirements

Use the Java tracer (`dd-java-agent`) version [1.69.0][40] or later, and configure [Test Optimization for Java][41].

To use the annotations or their tag constants, add the `dd-trace-api` artifact, version 1.69.0 or later, to the test classpath. With Gradle:

```groovy
testImplementation 'com.datadoghq:dd-trace-api:1.69.0'
```

With Maven:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>1.69.0</version>
  <scope>test</scope>
</dependency>
```

Cucumber and Karate tags don't need this dependency.

### Annotation names

The `datadog.trace.api.civisibility` package provides one annotation for each behavior:

- `@PreventFailureSuppression`
- `@NoAutoRetry`

Apply the annotations to test methods. Frameworks that use string tags or groups use the equivalent tags `datadog_prevent_failure_suppression` and `datadog_no_auto_retry` instead, also available as the constants `PreventFailureSuppression.TAG` and `NoAutoRetry.TAG`.

### JUnit 4 and JUnit 5

Annotate the test method. For example, with JUnit 5:

```java
import datadog.trace.api.civisibility.NoAutoRetry;
import datadog.trace.api.civisibility.PreventFailureSuppression;
import org.junit.jupiter.api.Test;

class CheckoutTest {
  @Test
  @PreventFailureSuppression
  @NoAutoRetry
  void completesCheckout() {
    // test body
  }
}
```

With JUnit 5, you can also use `@Tag(PreventFailureSuppression.TAG)` and `@Tag(NoAutoRetry.TAG)`. A tag on the test class applies to every test in the class. JUnit 4 categories are not recognized as annotations.

### TestNG

Annotate the test method, or add the tags to the test's groups:

```java
import datadog.trace.api.civisibility.NoAutoRetry;
import datadog.trace.api.civisibility.PreventFailureSuppression;
import org.testng.annotations.Test;

public class CheckoutTest {
  @Test(groups = {PreventFailureSuppression.TAG, NoAutoRetry.TAG})
  public void completesCheckout() {
    // test body
  }
}
```

Groups declared with a class-level `@Test` annotation apply to every test in the class.

### Spock

Annotate the feature method:

```groovy
import datadog.trace.api.civisibility.NoAutoRetry
import datadog.trace.api.civisibility.PreventFailureSuppression
import spock.lang.Specification

class CheckoutSpec extends Specification {
  @PreventFailureSuppression
  @NoAutoRetry
  def "completes checkout"() {
    expect:
    2 + 2 == 4
  }
}
```

With Spock 2.2 or later, you can also use `@Tag(PreventFailureSuppression.TAG)` and `@Tag(NoAutoRetry.TAG)` on a feature or a specification. Annotations on a data-driven feature apply to every iteration.

### Cucumber and Karate

Use native tags on a scenario or a feature:

```gherkin
Feature: Checkout

  @datadog_prevent_failure_suppression @datadog_no_auto_retry
  Scenario: Critical behavior
    Given a customer has items in their cart
    When the customer completes checkout
    Then the order is confirmed
```

Tags on a feature apply to every scenario in the feature.

### ScalaTest and MUnit

Pass the tags to the test declaration. With ScalaTest:

```scala
import datadog.trace.api.civisibility.{NoAutoRetry, PreventFailureSuppression}
import org.scalatest.Tag
import org.scalatest.funsuite.AnyFunSuite

class CheckoutSuite extends AnyFunSuite {
  test("completes checkout", new Tag(PreventFailureSuppression.TAG), new Tag(NoAutoRetry.TAG)) {
    assert(2 + 2 == 4)
  }
}
```

With MUnit:

```scala
import datadog.trace.api.civisibility.{NoAutoRetry, PreventFailureSuppression}

class CheckoutSuite extends munit.FunSuite {
  test("completes checkout".tag(new munit.Tag(PreventFailureSuppression.TAG)).tag(new munit.Tag(NoAutoRetry.TAG))) {
    assertEquals(2 + 2, 4)
  }
}
```

### Framework requirements

For supported test frameworks and versions, see [Test Optimization compatibility][42]. Annotations are not supported for Weaver.

Explicit framework retries remain available when `@NoAutoRetry` is present, except in TestNG. When Auto Test Retries, Early Flake Detection, or Flaky Test Management is enabled, Datadog replaces the `retryAnalyzer` of TestNG tests, so a TestNG test with `@NoAutoRetry` runs once.

[40]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.69.0
[41]: /tests/setup/java/
[42]: /tests/setup/java/#compatibility

{{% /tab %}}

{{% tab ".NET" %}}

### SDK requirements

Use the .NET tracer version [3.58.0][50] or later, and configure [Test Optimization for .NET][51] for the test framework.

The attributes ship in the [`Datadog.Trace` NuGet package][52]. Add `Datadog.Trace` version 3.58.0 or later to the test project, and keep its version in sync with the .NET tracer that runs the tests.

### Annotation names

The `Datadog.Trace.Ci` namespace provides one attribute for each annotation:

- `[PreventFailureSuppression]`
- `[NoAutoRetry]`

Apply the attributes to test methods; they can't be applied to test classes. An attribute on a parameterized test method applies to every generated test case. A test method inherited from a base class keeps the attributes of its declaration, but an overriding method must declare them again.

### xUnit, NUnit, and MSTest

Add the attributes to the test method. For example, with xUnit:

```csharp
using Datadog.Trace.Ci;
using Xunit;

public class CheckoutTests
{
    [Fact]
    [PreventFailureSuppression]
    [NoAutoRetry]
    public void CriticalBehavior()
    {
        Assert.Equal(4, 2 + 2);
    }
}
```

Use the same attributes on NUnit `[Test]` and `[TestCase]` methods, and on MSTest `[TestMethod]` methods.

### Framework requirements

For supported test frameworks and versions, see [Test Optimization compatibility][53].

Explicit framework retries, such as the MSTest `[Retry]` attribute, remain available when `[NoAutoRetry]` is present.

[50]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.58.0
[51]: /tests/setup/dotnet/
[52]: https://www.nuget.org/packages/Datadog.Trace
[53]: /tests/setup/dotnet/#compatibility

{{% /tab %}}

{{% tab "Python" %}}

### SDK requirements

Use the `ddtrace` package version [4.17.0][60] or later. Configure [Test Optimization for Python][61] and run your tests with the `ddtrace` pytest plugin.

### Annotation names

`ddtrace` provides one pytest marker for each annotation:

- `dd_prevent_failure_suppression`
- `dd_no_auto_retry`

`ddtrace` registers both markers even when Test Optimization is disabled, so runs with `--strict-markers` don't fail.

### pytest

Apply the markers to a test function:

```python
import pytest

@pytest.mark.dd_prevent_failure_suppression
@pytest.mark.dd_no_auto_retry
def test_critical_behavior():
    assert 2 + 2 == 4
```

The markers follow pytest marker scoping. Apply them to a test class, set `pytestmark` at module level, or mark an individual parameter case:

```python
import pytest

pytestmark = pytest.mark.dd_no_auto_retry

@pytest.mark.parametrize("value", [
    pytest.param(1, marks=pytest.mark.dd_prevent_failure_suppression),
    2,
])
def test_parameter(value):
    assert value > 0
```

A marker on a parameterized test function applies to every case. Tests that share one function object, such as aliases, also share its markers. To give them different annotations, use separate test functions or parameter markers.

### Framework requirements

The markers are available for pytest only. Tests run with the `unittest` runner are not supported. For supported pytest versions, see [Test Optimization compatibility][62].

Explicit retries from `pytest-rerunfailures` and `flaky` remain available when `dd_no_auto_retry` is present. With `pytest-xdist`, `dd_no_auto_retry` also prevents Datadog from rerunning the test after a worker crash.

[60]: https://github.com/DataDog/dd-trace-py/releases/tag/v4.17.0
[61]: /tests/setup/python/
[62]: /tests/setup/python/#compatibility

{{% /tab %}}

{{% tab "Go" %}}

### SDK requirements

Use [`ddtest`][80] version [1.17.0][81] or later, and run your tests with `ddtest instrument go test` as described in [Test Optimization for Go][82]. The annotations have no effect with `ddtest instrument --runtime=sdk`, or when you use `dd-trace-go` or Orchestrion without `ddtest`.

### Annotation names

Go uses one comment directive for each annotation:

- `//dd:test.prevent_failure_suppression`
- `//dd:test.no_auto_retry`

### Annotate tests

Add the directives to the doc comment directly above the test declaration. Write them with no space after `//`, and leave no blank line between the comment and `func`:

```go
// TestPaymentCapture guards a merge-blocking payment flow.
//
//dd:test.prevent_failure_suppression
//dd:test.no_auto_retry
func TestPaymentCapture(t *testing.T) {
	// ...
}
```

The directives work on test functions, Testify suite methods, named functions passed to `t.Run`, fuzz targets, and examples. A function literal passed to `t.Run` can't carry them. To annotate a subtest, pass a named function:

```go
//dd:test.no_auto_retry
func checkRefund(t *testing.T) {
	// ...
}

func TestRefunds(t *testing.T) {
	t.Run("refund", checkRefund)
}
```

### Framework requirements

Go retries a top-level test as a whole. After a subtest or Testify suite method with `//dd:test.no_auto_retry` runs, Datadog doesn't retry its parent test, so the other subtests of that test also get no automatic retries in that run.

`//dd:test.prevent_failure_suppression` overrides only the quarantined or disabled state of the annotated test itself. If its parent test or Testify suite is quarantined or disabled, the parent's state still applies.

`ddtest` reads the directives from the test's source file when the test runs. If the source file is not available at that time, for example when a compiled test binary runs without the source checkout, the directives have no effect.

[80]: https://github.com/DataDog/ddtest
[81]: https://github.com/DataDog/ddtest/releases/tag/v1.17.0
[82]: /tests/setup/go/

{{% /tab %}}

{{% tab "Swift" %}}

### SDK requirements

Use the Datadog Swift testing SDK (`dd-sdk-swift-testing`) version [2.7.14][70] or later, and configure [Test Optimization for Swift][71]. Swift Testing suites, or standalone Swift Testing tests, need the `.datadogTesting` trait, as described there.

### Annotation names

The `DatadogSDKTesting` module provides one tag for each annotation. Each tag has an opposite value, so a test can override a declaration on its suite or class:

| Annotation | Swift Testing | XCTest (Swift) | XCTest (Objective-C) |
|------------|---------------|----------------|----------------------|
| Prevent failure suppression | `.dd.preventFailureSuppression` (opposite: `.dd.allowFailureSuppression`) | `.preventFailureSuppression` set to `true` | `DDTag.preventFailureSuppressionType` and `DDTag.preventFailureSuppressionInstanceMethod` set to `@YES` |
| Disable automatic retries | `.dd.nonretriable` (opposite: `.dd.retriable`) | `.retriable` set to `false` | `DDTag.retriableType` and `DDTag.retriableInstanceMethod` set to `@NO` |

### Swift Testing

Add the tags to a suite or a test, next to the `.datadogTesting` trait:

```swift
import Testing
import DatadogSDKTesting

@Suite(.datadogTesting, .tags(.dd.nonretriable, .dd.preventFailureSuppression))
struct CheckoutTests {
    @Test
    func completesCheckout() throws {
        // Not retried by Datadog, and its failure is never suppressed
    }

    @Test(.tags(.dd.retriable, .dd.allowFailureSuppression))
    func showsRecommendations() throws {
        // Overrides the suite: Datadog can retry, quarantine, and disable this test
    }
}
```

The most specific declaration wins: a test's tags override its suite's tags, and a nested suite's tags override its parent suite's tags. If one declaration lists a tag and its opposite, the last one listed wins. Tags on a parameterized test apply to every generated case.

### XCTest

A tag declared for the test class applies to every test in the class. A tag declared for a test method overrides it for that test.

In Swift, adopt `FinalTaggedType` and declare the tags in `finalTypeTags`, passing test method names as strings:

```swift
import XCTest
import DatadogSDKTesting

final class CheckoutTests: XCTestCase, FinalTaggedType {
    static var finalTypeTags: FinalTypeTags<CheckoutTests> {
        withTagger { tagger in
            // Every test in the class
            tagger.set(type: .retriable, to: false)
            tagger.set(type: .preventFailureSuppression, to: true)
            // Override for one test
            tagger.set(instance: .retriable, to: true, method: "testShowsRecommendations")
            tagger.set(instance: .preventFailureSuppression, to: false, method: "testShowsRecommendations")
        }
    }

    func testCompletesCheckout() throws {}
    func testShowsRecommendations() throws {}
}
```

For a test class that other test classes inherit from, adopt `ExtendableTaggedType` and declare the tags in `extendableTypeTags()` instead, with the same `withTagger` calls.

In Objective-C, adopt `DDTaggedType` and return the tags from `attachedTypeTags`:

```objective-c
@import XCTest;
@import DatadogSDKTesting;

@interface CheckoutTests : XCTestCase <DDTaggedType>
@end

@implementation CheckoutTests

+ (DDTypeTags *)attachedTypeTags {
    DDTypeTagger *tagger = [DDTypeTagger forType:self];
    // Every test in the class
    [tagger setWithTypeTag:DDTag.retriableType toValue:@NO];
    [tagger setWithTypeTag:DDTag.preventFailureSuppressionType toValue:@YES];
    // Override for one test
    [tagger setWithTag:DDTag.retriableInstanceMethod toValue:@YES forMember:@"testShowsRecommendations"];
    [tagger setWithTag:DDTag.preventFailureSuppressionInstanceMethod toValue:@NO forMember:@"testShowsRecommendations"];
    return [tagger tags];
}

- (void)testCompletesCheckout {}
- (void)testShowsRecommendations {}

@end
```

### Framework requirements

For supported test frameworks and versions, see [Test Optimization compatibility][72].

To keep Test Impact Analysis from skipping a test, use its separate unskippable tags (`.dd.tia.unskippable`, `.tiaSkippable`), described in [Test Impact Analysis for Swift][73]. They follow the same override order.

[70]: https://github.com/DataDog/dd-sdk-swift-testing/releases/tag/2.7.14
[71]: /tests/setup/swift/
[72]: /tests/setup/swift/#compatibility
[73]: /tests/test_impact_analysis/setup/swift/#disabling-skipping-for-specific-tests

{{% /tab %}}
{{< /tabs >}}

## Find annotated test runs

To view runs of tests with annotations, search in the [Test Optimization Explorer][7] with:

- `@test.test_management.prevent_failure_suppression:true`
- `@test.test_management.no_auto_retry:true`

Datadog reports each annotation as `true` when present and omits its tag when absent. Reported skipped tests also include annotations when the instrumentation discovers them.

Flaky Tests Management tags continue to describe assigned states, even when an annotation overrides the execution behavior. For example, a test with the **Prevent failure suppression** annotation can retain `test.test_management.is_quarantined:true` while its failure still fails the test command. Go is an exception: Go test runs report the state that applied, so when an annotation overrides an assigned state, the run omits that state's tag.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/auto_test_retries/
[2]: /tests/flaky_tests/early_flake_detection/
[3]: /tests/flaky_management/#confirm-fixes-for-flaky-tests
[4]: /tests/setup/
[5]: /tests/test_impact_analysis/
[7]: /tests/explorer/
[8]: /tests/flaky_management/#change-a-flaky-tests-state
[9]: /tests/setup/junit_xml/
