### Continuous Integration Visibility

`DD_CIVISIBILITY_AGENTLESS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Agentless mode in CI Visibility. Default value is false (disabled).

`DD_CIVISIBILITY_AGENTLESS_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the intake base URL used for agentless CI test reporting. When set, payloads are sent to this URL instead of the default site-based intake URL.

`DD_CIVISIBILITY_AUTO_INSTRUMENTATION_PROVIDER`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Identifies the auto instrumentation provider for CI Visibility. This is used to track which instrumentation method was used (e.g., single-step, manual, etc.).

`DD_CIVISIBILITY_CODE_COVERAGE_COLLECTORPATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the code coverage collector.

`DD_CIVISIBILITY_CODE_COVERAGE_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables Code Coverage in CI Visibility.

`DD_CIVISIBILITY_CODE_COVERAGE_ENABLE_JIT_OPTIMIZATIONS`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables JIT optimizations in Code Coverage.

`DD_CIVISIBILITY_CODE_COVERAGE_MODE`
: **Type**: `string`<br>
**Default**: N/A<br>
Selects the code coverage mode: LineExecution or LineCallCount.

`DD_CIVISIBILITY_CODE_COVERAGE_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Destination path for code coverage JSON files.

`DD_CIVISIBILITY_CODE_COVERAGE_SNK_FILEPATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the SNK file used for re-signing assemblies after Code Coverage modification.

`DD_CIVISIBILITY_DI_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Dependency injection for divisibility

`DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the early flake detection feature in CI Visibility.

`DD_CIVISIBILITY_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enabling or disabling CI Visibility

`DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the external code coverage file.

`DD_CIVISIBILITY_FLAKY_RETRY_COUNT`
: **Type**: `int`<br>
**Default**: `5`<br>
Can be set to any non-negative number to change the maximum number of retries per test case.

`DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
A kill switch for the auto test retries feature.

`DD_CIVISIBILITY_FORCE_AGENT_EVP_PROXY`
: **Type**: `string`<br>
**Default**: N/A<br>
Forces the use of the Agent's EVP Proxy.

`DD_CIVISIBILITY_GAC_INSTALL_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables Datadog.Trace GAC installation.

`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables uploading Git metadata in CI Visibility. Default Value is false (disabled).

`DD_CIVISIBILITY_IMPACTED_TESTS_DETECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables Impacted Tests Detection.

`DD_CIVISIBILITY_ITR_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables Intelligent Test Runner in CI Visibility. Default Value is false (disabled).

`DD_CIVISIBILITY_KNOWN_TESTS_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the known tests feature in CI Visibility.

`DD_CIVISIBILITY_LOGS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Logs direct submission. Default value is false (disabled).

`DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS`
: **Type**: `int`<br>
**Default**: `500`<br>
CI Visibility (Selenium): after calling `window.DD_RUM.stopSession()` at the end of a browser test, waits this many milliseconds before proceeding to allow RUM data to flush (default: 500ms).

`DD_CIVISIBILITY_TESTSSKIPPING_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the Intelligent Test Runner test skipping feature in CI Visibility.

`DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`
: **Type**: `int`<br>
**Default**: `1000`<br>
Sets the maximum total number of automatic test retries allowed across the entire test session. This limit is applied when automatic flaky-test retries are enabled and defaults to 1000.

`DD_GIT_COMMIT_AUTHOR_DATE`
: **Type**: `string`<br>
**Default**: N/A<br>
The date when the author submitted the commit expressed in ISO 8601 format.

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit author email reported as CI metadata.

`DD_GIT_COMMIT_AUTHOR_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit author name reported as CI metadata.

`DD_GIT_COMMIT_COMMITTER_DATE`
: **Type**: `string`<br>
**Default**: N/A<br>
The date when the committer submitted the commit expressed in ISO 8601 format.

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit committer email reported as CI metadata.

`DD_GIT_COMMIT_COMMITTER_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit committer name reported as CI metadata.

`DD_GIT_COMMIT_MESSAGE`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit message reported as CI metadata.

`DD_GIT_COMMIT_SHA`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit SHA reported as CI metadata and used for git metadata tagging when enabled.

`DD_TEST_MANAGEMENT_ATTEMPT_TO_FIX_RETRIES`
: **Type**: `int`<br>
**Default**: N/A<br>
CI Visibility Test Management: overrides the number of retry executions for tests marked as "attempt to fix". If unset, the value from backend/remote settings is used.

`DD_TEST_MANAGEMENT_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the Test Management feature.
