---
title: Test Configurations
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Tests evaluate the behavior of code for a set of given conditions. Some of those conditions are related to the environment where the tests are run, such as the operating system or the runtime used. The same code executed different sets of conditions can behave differently, so developers usually configure their tests to run in different sets of conditions and validate that the behavior is the expected for all of them. A specific set of conditions is what we call a "configuration".

In CI Visibility, a test with multiple configurations is treated as multiple tests; a separate test for each configuration. In the case where one of the configurations fails but the others pass, only that specific test and configuration combination will be marked as failed.

For example, if you're testing a single commit and you have a Python test that runs against three different Python versions, if the test fails for one of those versions, that specific test will be marked as failed, while the other versions will be marked as passed. However, if you retry the tests against the same commit and now the test for all three Python versions pass, the test with the version that previously failed will now be marked as both passed and flaky, while the other two versions will remain passed, with no flakiness detected.

### Default configurations

When you are running your tests with CI Visibility, the library automatically detects and reports information about the environment where tests are being run as test tags. For example, the operating system name (e.g. Windows, Linux) and the architecture of the platform (e.g. arm64, x86_64) are reported as tags on each test. These values are shown in the commit and branch overview pages when a test fails or is flaky for a specific configuration but not others. Note that only the configuration tags that change between different test runs are shown on the UI.

{{< img src="ci/test_configurations_in_errors.png" alt="Configuration for test failures" style="width:100%;">}}

These are the tags that are automatically collected to identify test configurations. Note that some only apply to specific platforms:

* `os.platform` - Name of the OS where the tests are run
* `os.version` - Version of the OS where the tests are run
* `os.architecture` - Architecture of the OS where the tests are run
* `runtime.name` - Name of the runtime system for the tests
* `runtime.version` - Version of the runtime system
* `runtime.architecture` - Architecture of the runtime system
* `runtime.vendor` - Vendor that built the runtime platform where the tests are executed
* `device.model` - The device model running the tests
* `device.name` - Name of the device
* `ui.appearance` - User Interface style
* `ui.orientation` - Orientation the UI is run
* `ui.localization` - Language of the application

### Custom configurations

There are some configurations that cannot be directly identified and reported automatically because they can depend on environment variables, on test run arguments, or other approaches that developers use. For those cases the developer must provide the configuration to the library so CI Visibility can properly identify them.

These tags must be defined as part of the `DD_TAGS` environment variable using the `test.configuration` prefix, for example:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

All tags with the `test.configuration` prefix will be used as configuration tags, in addition to the automatically collected ones.

Note that in order to filter using these configurations tags, [facets must be explicitly created for these tags][1].


[1]: tracing/trace_explorer/facets/#creating-facets
