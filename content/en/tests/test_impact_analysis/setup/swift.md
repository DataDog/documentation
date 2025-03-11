---
title: Test Impact Analysis for Swift
code_lang: swift
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/intelligent_test_runner/swift/
  - /continuous_integration/intelligent_test_runner/setup/swift/
  - /intelligent_test_runner/setup/swift
further_reading:
    - link: "/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimisation"
---

## Compatibility

Test Impact Analysis is only supported on [`dd-sdk-swift-testing`][1] in versions `2.2.0`+.

## Setup

### Test Optimization

Prior to setting up Test Impact Analysis, set up [Test Optimization for Swift][2]. The **code coverage** option must also be enabled in the test settings of your scheme or test plan, or `--enable-code-coverage` must be added to your Swift test command (if using a SPM target).

If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

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

```swift
import XCTest
import DatadogSDKTesting

class SomeTestCase: XCTestCase {
  func testMethod() {}
}

extension SomeTestCase: ExtendableTaggedType {
  static func extendableTypeTags() -> ExtendableTypeTags {
    withTagger { tagger in
      // Mark all class unskippable
      tagger.set(type: .itrSkippable, to: false)
      // Set only one method unskippable
      tagger.set(instance: .itrSkippable, to: false, method: #selector(testMethod))
    }
  }
}
```

### Temporarily disabling Test Impact Analysis

Test Impact Analysis can be disabled locally by setting the `DD_CIVISIBILITY_ITR_ENABLED` environment variable to `false` or `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (Optional)
: Enable the Test Impact Analysis coverage and test skipping features<br />
**Default**: `(true)`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
[2]: /tests/setup/swift
