---
title: Test Configurations
kind: guide
further_reading:
  - link: "/continuous_integration/guides/flaky_test_management"
    tag: "Guide"
    text: "Flaky test management"
  - link: "/continuous_integration/explore_tests"
    tag: "Documentation"
    text: "Exploring tests"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Tests evaluate the behavior of code for a set of given conditions. Some of those conditions are related to the environment where the tests are run, such as the operating system or the runtime used. The same code executed under different sets of conditions can behave differently, so developers usually configure their tests to run in different sets of conditions and validate that the behavior is the expected for all of them. This specific set of conditions is called a *configuration*.

In CI Visibility, a test with multiple configurations is treated as multiple tests, a separate test for each configuration. In the case where one of the configurations fails but the others pass, only that specific test and configuration combination is marked as failed.

For example, suppose you're testing a single commit and you have a Python test that runs against three different Python versions. If the test fails for one of those versions, that specific test is marked as failed, while the other versions are marked as passed. If you retry the tests against the same commit and now the test for all three Python versions pass, the test with the version that previously failed is now marked as both passed and flaky, while the other two versions remain passed, with no flakiness detected.

## Default configurations

When you run your tests with CI Visibility, the library detects and reports information about the environment where tests are run as test tags. For example, the operating system name, such as `Windows` or `Linux`, and the architecture of the platform, such as `arm64` or `x86_64`, are added as tags on each test. These values are shown in the commit and on branch overview pages when a test fails or is flaky for a specific configuration but not others. Only those configuration tags that change between different test runs are shown on the UI.

{{< img src="ci/test_configurations_in_errors.png" alt="Configuration for test failures" style="width:100%;">}}

The following tags are automatically collected to identify test configurations. Some only apply to specific platforms:

* `os.platform` - Name of the operating system where the tests are run
* `os.version` - Version of the operating system where the tests are run
* `os.architecture` - Architecture of the operating system where the tests are run
* `runtime.name` - Name of the runtime system for the tests
* `runtime.version` - Version of the runtime system
* `runtime.architecture` - Architecture of the runtime system
* `runtime.vendor` - Vendor that built the runtime platform where the tests are run
* `device.model` - The device model running the tests
* `device.name` - Name of the device
* `ui.appearance` - User Interface style
* `ui.orientation` - Orientation the UI is run in
* `ui.localization` - Language of the application

## Custom configurations

There are some configurations that cannot be directly identified and reported automatically because they can depend on environment variables, test run arguments, or other approaches that developers use. For those cases, you must provide the configuration details to the library so CI Visibility can properly identify them.

Define these tags as part of the `DD_TAGS` environment variable using the `test.configuration` prefix. For example, the following test configuration tags identify a test configuration where disk response time is slow and available memory is low:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

All tags with the `test.configuration` prefix are used as configuration tags, in addition to the automatically collected ones.

**Note**: To filter using these configurations tags, [you must explicitly create facets for these tags][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/facets/#creating-facets
