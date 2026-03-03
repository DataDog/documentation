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
: **Type**: `string`<br>
**Default**: N/A<br>
Marks CI test sessions as running under an auto-instrumentation workflow. Any non-empty value enables this marker for telemetry.

`DD_CIVISIBILITY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enabling or disabling CI Visibility

`DD_CIVISIBILITY_FLAKY_RETRY_COUNT`
: **Type**: `int`<br>
**Default**: `5`<br>
Can be set to any non-negative number to change the maximum number of retries per test case.

`DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
A kill switch for the auto test retries feature.

`DD_CIVISIBILITY_IMPACTED_TESTS_DETECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility impacted tests detection (TIA). When enabled, impacted-tests detection is requested/applied as part of execution settings propagated to child processes.

`DD_CIVISIBILITY_LOGS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Logs direct submission. Default value is false (disabled).

`DD_CIVISIBILITY_SUBTEST_FEATURES_ENABLED`
: **Since**: 2.5.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Kill-switch for subtest-specific CI test management and retry features. Set to false to disable subtest features even if they are enabled by remote settings.

`DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`
: **Type**: `int`<br>
**Default**: `1000`<br>
Sets the maximum total number of automatic test retries allowed across the entire test session. This limit is applied when automatic flaky-test retries are enabled and defaults to 1000.

`DD_CIVISIBILITY_USE_NOOP_TRACER`
: **Since**: 2.5.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled in CI test reporting mode, uses a no-op tracer implementation to reduce changes to test behavior. Defaults to false.

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
: **Since**: 2.3.0 <br>
**Type**: `int`<br>
**Default**: `-1`<br>
Overrides the maximum number of retries for the test management attempt-to-fix feature. When set, it replaces the value provided by remote settings.

`DD_TEST_MANAGEMENT_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility Test Management: enables Test Management features (disabled/quarantined/attempt-to-fix tests) when backend/remote settings allow. Acts as a local kill-switch. Default: true.

`DD_TEST_OPTIMIZATION_ENV_DATA_FILE`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the path to a JSON file containing CI/environment metadata used for test reporting. If not set, a default file next to the test binary is used.
