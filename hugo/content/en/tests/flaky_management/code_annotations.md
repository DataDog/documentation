---
title: Control Test Automation with Code Annotations
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

| Annotation | Effect |
|------------|--------|
| Prevent failure suppression | Keeps a test eligible to run despite Datadog disabling and prevents Datadog quarantine from suppressing its failures. It does not prevent retries or turn passing tests into failures. |
| Disable automatic retries | Excludes a test from Datadog [Auto Test Retries][1], [Early Flake Detection][2], and [Attempt to Fix][3] retries. Explicit retries configured in the test framework remain available. |

Apply either annotation independently, or combine them to exclude a test from both behaviors.

## Prerequisites and scope

Code annotations are supported for JavaScript/TypeScript and Ruby. Other languages are not supported.

Set up [Test Optimization][4] with native instrumentation for the test framework. Annotations do not apply to JUnit XML uploads.

Annotations follow these scope rules:

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
| v5 | [5.135.0][8] |
| v6 | [6.24.0][9] |

Configure [Test Optimization for JavaScript and TypeScript][10] for the test framework.

### Annotation names

`dd-trace` provides one helper for each annotation:

- `preventFailureSuppression`: Protects a test from Datadog quarantine and disabling.
- `noAutoRetry`: Excludes a test from Datadog Auto Test Retries, Early Flake Detection, and Attempt to Fix retries.

Cucumber.js uses scenario tags instead of helpers.

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
- Vitest requires version 1.6 or later. Both helpers support initialized workers, Browser Mode, and no-worker-tracer mode. No-worker-tracer mode requires isolated workers and Vitest 3.2.6 or later.
- WebdriverIO requires version 9 or later with the Mocha or Jasmine adapter.
- Cucumber.js supports serial scenarios from version 7. In parallel mode, exclusions for quarantine, disabling, and Attempt to Fix require version 11 or later.

Explicit framework retries, such as `jest.retryTimes`, Mocha retries, Playwright retry settings, and Cucumber.js `--retry`, remain available when `noAutoRetry` is present.

In Playwright serial groups, `noAutoRetry` excludes the entire group from Datadog retries so tests run with their prerequisites. Explicit Playwright retry settings still apply.

[6]: /tests/setup/javascript/?tab=cypress#retries-require-cypress-test-isolation
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.135.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.24.0
[10]: /tests/setup/javascript/

{{% /tab %}}

{{% tab "Ruby" %}}

### SDK requirements

Use the `datadog-ci` gem version [1.43.0][11] or later. Configure [Test Optimization for Ruby][12] and load Datadog's instrumentation before defining tests.

### Annotation names

`datadog-ci` provides one annotation for each behavior:

- `datadog_prevent_failure_suppression`: Protects a test from Datadog quarantine and disabling.
- `datadog_no_auto_retry`: Excludes a test from Datadog Auto Test Retries, Early Flake Detection, and Attempt to Fix retries.

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

## Find annotated test executions

Search in the [Test Optimization Explorer][7] with:

- `@test.test_management.prevent_failure_suppression:true`
- `@test.test_management.no_auto_retry:true`

Datadog reports each annotation as `true` when present and omits its tag when absent. Reported skipped tests also include annotations when the instrumentation discovers them. Tests excluded by selection or Test Impact Analysis remain excluded.

Flaky Tests Management tags continue to describe assigned states, even when an annotation overrides the execution behavior. For example, a protected test can retain `test.test_management.is_quarantined:true` while its final failure still fails the test command. An excluded Attempt to Fix assignment does not produce Attempt to Fix retries or a completion result.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/auto_test_retries/
[2]: /tests/flaky_tests/early_flake_detection/
[3]: /tests/flaky_management/#confirm-fixes-for-flaky-tests
[4]: /tests/setup/
[5]: /tests/test_impact_analysis/
[7]: /tests/explorer/
