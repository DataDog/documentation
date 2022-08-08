---
title: Test Configurations
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Tests evaluate the behavior of code for a set of given conditions. Some of those conditions are related to the runtime and settings of the system where the tests are run. The same code run in different conditions can have a different behavior, so developers usually configure their tests in order to run in different conditions and validate that the behavior is the expected for all of them.

In CI Visibility, a test with multiple configurations is treated as multiple tests; a separate test for each configuration. In the case where one of the configurations fails but the others pass, only that specific test and configuration combination will be marked as failed.

For example, if you're testing a single commit and you have a python test that runs against three different python versions, if the test fails for one of those versions, that specific test will be marked as failed, while the other versions will be marked as passed. However, if you retry the tests against the same commit and now the test for all three python versions pass, the test with the version that previously failed will now be marked as both passed and flaky, while the other two versions will remain passed, with no flakiness detected.

### Default configurations

When you are running your tests with CI visibility, the library automatically detects and reports information about the conditions that tests are being run in the test tags. For example, if the tests were running in a windows or linux environment, or the architecture of the platform running the tests (arm64, x86_64) those values are reported on the test tags. These values related to configurations are shown in the interface when a test fails or shows flakiness (only those configurations that make a difference are shown):

{{< img src="ci/test_configurations_in_errors.png" alt="Configuration for test failures" style="width:100%;">}}

The tags that are currently being used to automatically identify the configuration for the tests are the following tags (some are platform dependant and don't exist in all languages):

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

 The user must define those tags as part of the DD_TAGS environment variable using the test.configuration prefix, e.g:

DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low

All the entries under the test.configuration prefix will be used as different configuration settings for the tests that include them.

Note: If the developer wants to filter using these configurations, facets must be explicitly created for these tags. [Facets Documentation][1]


[1]: tracing/trace_explorer/facets/#managing-facets
