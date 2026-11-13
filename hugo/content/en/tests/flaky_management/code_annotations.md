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

Code annotations are supported for JavaScript/TypeScript and Ruby. Other languages are not supported.

Test code annotations follow these scope rules:

- An annotation affects only automation that the Datadog library supports for that framework.
- Annotations apply to individual test declarations. An annotation on a parameterized declaration applies to every generated test case.
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
{{< /tabs >}}

## Find annotated test runs

To view runs of tests with annotations, search in the [Test Optimization Explorer][7] with:

- `@test.test_management.prevent_failure_suppression:true`
- `@test.test_management.no_auto_retry:true`

Datadog reports each annotation as `true` when present and omits its tag when absent. Reported skipped tests also include annotations when the instrumentation discovers them.

Flaky Tests Management tags continue to describe assigned states, even when an annotation overrides the execution behavior. For example, a test with the **Prevent failure suppression** annotation can retain `test.test_management.is_quarantined:true` while its failure still fails the test command.

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
