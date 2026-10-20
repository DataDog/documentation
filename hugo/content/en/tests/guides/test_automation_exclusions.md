---
title: Control Test Automation with Code Annotations
description: Exclude individual tests from Datadog failure suppression and automatic retries with JavaScript, Java, and Python annotations.
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

| Annotation | Effect |
|------------|--------|
| `prevent_failure_suppression` | Keeps a test eligible to run despite Datadog disabling and prevents Datadog quarantine from suppressing its failures. It does not prevent retries or turn passing tests into failures. |
| `no_auto_retry` | Excludes a test from Datadog [Auto Test Retries][1], [Early Flake Detection][2], and [Attempt to Fix][3] retries. Explicit retries configured in the test framework remain available. |

These names describe the shared behavior. Use the language-specific names and syntax in the following sections. Apply either annotation independently, or combine them to exclude a test from both behaviors.

## Prerequisites and scope

<div class="alert alert-warning">These annotation APIs are not available in published SDK releases. Use a development build that includes the annotation implementation for the test framework.</div>

| Language | Datadog SDK | First supported SDK release |
|----------|-------------|-----------------------------|
| JavaScript and TypeScript | `dd-trace` | Unreleased |
| Java | `dd-trace-java` | Unreleased |
| Python | `ddtrace` | Unreleased |

The minimum versions for Test Optimization or a test framework do not establish support for these annotation APIs.

Set up [Test Optimization][4] with native instrumentation for the test framework. Annotations do not apply to JUnit XML uploads. An annotation only affects automation that the Datadog library supports for that framework.

Annotations apply to individual test declarations. An annotated parameterized declaration applies to every generated test case. They preserve framework skips, test filters, and expected-failure behavior. They do not override [Test Impact Analysis][5]: a test or file excluded by Test Impact Analysis remains excluded. The annotations do not disable test discovery or flakiness reporting.

Apply annotations in test source code. Setting a span tag with the same name does not change test execution. The annotations control execution without changing the test's configured state in Flaky Tests Management.

## JavaScript and TypeScript

Import `preventFailureSuppression` and `noAutoRetry` from `dd-trace/test-optimization` and wrap the test callback. For example, with Jest:

```javascript
const { preventFailureSuppression, noAutoRetry } = require('dd-trace/test-optimization')

test('critical behavior', preventFailureSuppression(noAutoRetry(() => {
  expect(2 + 2).toBe(4)
})))
```

Use the same helpers on callbacks passed to Mocha, Vitest, Cypress, Playwright, and WebdriverIO Jasmine test declarations. Apply them to the callback passed to `test.each` or another parameterized declaration to annotate every generated case. Importing the helpers does not initialize the tracer; configure Test Optimization instrumentation separately.

For Playwright, wrap the callback that declares the test fixtures:

```javascript
import { test, expect } from '@playwright/test'
import { preventFailureSuppression, noAutoRetry } from 'dd-trace/test-optimization'

test('critical behavior', preventFailureSuppression(noAutoRetry(async ({ page }) => {
  await page.setContent('<h1>Checkout</h1>')
  await expect(page.getByRole('heading')).toHaveText('Checkout')
})))
```

### Cucumber.js

Use native scenario tags instead of wrapping step definitions:

```gherkin
@datadog:prevent_failure_suppression @datadog:no_auto_retry
Scenario: Critical behavior
  Given a customer has items in their cart
  When the customer completes checkout
  Then the order is confirmed
```

Tags on a `Scenario Outline` apply to every example.

### Framework requirements

- Jest requires the `jest-circus` runner. The legacy Jest Jasmine runner does not enforce these helpers.
- Cypress requires version 12 or later. Datadog retries also require [test isolation][6] to be enabled.
- Playwright requires version 1.38 or later.
- Vitest requires version 1.6 or later. Its no-worker-tracer mode requires version 3.2.6 or later.
- WebdriverIO Jasmine requires WebdriverIO 9 or later.
- Cucumber.js supports serial scenarios from version 7. Parallel Test Management exclusions require version 11 or later.

Explicit framework retries, such as `jest.retryTimes`, Mocha retries, Playwright retry settings, and Cucumber.js `--retry`, remain available when `noAutoRetry` is present.

## Java

Add a `com.datadoghq:dd-trace-api` dependency that matches the Datadog Java tracer version used by the tests. Import the annotations from `datadog.trace.api.civisibility`.

### Method annotations

With JUnit 4, JUnit 5, or TestNG, apply `@PreventFailureSuppression` and `@NoAutoRetry` to the test method. For example, with JUnit 5:

```java
import datadog.trace.api.civisibility.NoAutoRetry;
import datadog.trace.api.civisibility.PreventFailureSuppression;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CriticalTest {
  @Test
  @PreventFailureSuppression
  @NoAutoRetry
  public void criticalBehavior() {
    assertEquals(4, 2 + 2);
  }
}
```

Use the same annotations with JUnit 4 and TestNG test methods. The annotations target methods, not classes, and apply to every invocation of a parameterized method. Datadog automatic retries, Early Flake Detection, quarantine, and Attempt to Fix require TestNG 7.5 or later. Test disabling is also supported by earlier instrumented TestNG versions.

### Spock

Apply the same annotations to the feature method:

```groovy
import datadog.trace.api.civisibility.NoAutoRetry
import datadog.trace.api.civisibility.PreventFailureSuppression
import spock.lang.Specification

class CriticalSpec extends Specification {
  @PreventFailureSuppression
  @NoAutoRetry
  def "critical behavior"() {
    expect:
    2 + 2 == 4
  }
}
```

### Scenario tags

With Cucumber and Karate, apply native tags to the scenario or Scenario Outline. Java scenario tags use underscores, unlike Cucumber.js tags. For example, with Cucumber:

```gherkin
@datadog_prevent_failure_suppression @datadog_no_auto_retry
Scenario: Critical behavior
  Given a customer has items in their cart
  When the customer completes checkout
  Then the order is confirmed
```

With Karate, apply the same tags to its scenario:

```gherkin
@datadog_prevent_failure_suppression @datadog_no_auto_retry
Scenario: Critical behavior
  * assert 2 + 2 == 4
```

### Scala test frameworks

**ScalaTest:** Declare native ScalaTest tags with the public constants:

```scala
import datadog.trace.api.civisibility.TestAutomationExclusions
import org.scalatest.Tag
import org.scalatest.funsuite.AnyFunSuite

class CriticalTest extends AnyFunSuite {
  test("critical behavior",
    new Tag(TestAutomationExclusions.PREVENT_FAILURE_SUPPRESSION),
    new Tag(TestAutomationExclusions.NO_AUTO_RETRY)) {
    assert(2 + 2 == 4)
  }
}
```

**MUnit:** Attach native tags to the test name:

```scala
import datadog.trace.api.civisibility.TestAutomationExclusions
import munit.FunSuite

class CriticalTest extends FunSuite {
  test("critical behavior"
    .tag(new munit.Tag(TestAutomationExclusions.PREVENT_FAILURE_SUPPRESSION))
    .tag(new munit.Tag(TestAutomationExclusions.NO_AUTO_RETRY))) {
    assertEquals(2 + 2, 4)
  }
}
```

MUnit does not support Datadog test disabling. Its `PREVENT_FAILURE_SUPPRESSION` tag protects against quarantine failure suppression.

**Weaver:** Add the public tag names to a native `TestName`:

**Framework compatibility:** Weaver 0.8.4 and 0.9.0 support these custom string tags. Weaver 0.13.0 does not support this API.

```scala
import cats.effect.IO
import datadog.trace.api.civisibility.TestAutomationExclusions
import weaver._

object CriticalTest extends SimpleIOSuite {
  private def excluded(name: String): TestName =
    TestName.fromString(name)
      .tagged(TestAutomationExclusions.PREVENT_FAILURE_SUPPRESSION)
      .tagged(TestAutomationExclusions.NO_AUTO_RETRY)

  test(excluded("critical behavior")) {
    IO.pure(expect(2 + 2 == 4))
  }
}
```

Weaver reports the annotation metadata. It does not support Datadog quarantine, disabling, or automatic retries, so these tags do not change its execution behavior.

## Python

With pytest, import the decorators from `ddtrace.testing` and apply them to the test function:

```python
import pytest
from ddtrace.testing import no_auto_retry, prevent_failure_suppression


@pytest.mark.parametrize("value", [1, 2])
@prevent_failure_suppression
@no_auto_retry
def test_positive(value):
    assert value > 0
```

The decorators apply to every parameterized case. Explicit retries configured through a pytest retry plugin remain available. These decorators do not change pytest skips or `xfail` behavior.

## Find annotated test executions

Search in the [Test Optimization Explorer][7] with:

- `@test.test_management.prevent_failure_suppression:true`
- `@test.test_management.no_auto_retry:true`

Datadog reports each annotation as `true` when present and omits its tag when absent. Reported skipped tests also include annotations when the instrumentation discovers them. Annotations do not require tests excluded by selection or Test Impact Analysis to run.

Test Management tags continue to describe assigned states, even when an annotation overrides the execution behavior. For example, a protected test can retain `test.test_management.is_quarantined:true` while its failure affects the test command. An excluded Attempt to Fix assignment does not produce Attempt to Fix retries or a completion result.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/auto_test_retries/
[2]: /tests/flaky_tests/early_flake_detection/
[3]: /tests/flaky_management/#confirm-fixes-for-flaky-tests
[4]: /tests/setup/
[5]: /tests/test_impact_analysis/
[6]: /tests/setup/javascript/?tab=cypress#retries-require-cypress-test-isolation
[7]: /tests/explorer/
