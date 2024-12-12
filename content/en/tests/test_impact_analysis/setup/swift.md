---
title: Test Impact Analysis for Swift
is_beta: true
code_lang: swift
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/intelligent_test_runner/swift/
  - /continuous_integration/intelligent_test_runner/setup/swift/
  - /intelligent_test_runner/setup/swift
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< callout url="#" btn_hidden="true" >}}Test Impact Analysis for Swift is in beta.{{< /callout >}}

## Compatibility

Test Impact Analysis is only supported on [`dd-sdk-swift-testing`][1] in versions `2.2.0`+.

## Setup

### Test Optimization

Prior to setting up Test Impact Analysis, set up [Test Optimization for Swift][2]. The **code coverage** option must also be enabled in the test settings of your scheme or test plan, or `--enable-code-coverage` must be added to your Swift test command (if using a SPM target).

If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

### Enable Test Impact Analysis

To enable Test Impact Analysis, set the following environment variables:

`DD_TEST_RUNNER`
: Enables or disables the instrumentation of tests. Set this value to `$(DD_TEST_RUNNER)` so you can enable and disable test instrumentation with a environment variable defined outside of the test process (for example, in the CI build).<br/>
**Default**: `false`<br/>
**Recommended**: `$(DD_TEST_RUNNER)`

{{% ci-itr-activation-instructions %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
[2]: /continuous_integration/tests/swift
