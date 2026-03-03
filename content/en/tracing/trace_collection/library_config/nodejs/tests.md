### Continuous Integration Visibility

`DD_CIVISIBILITY_AGENTLESS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Agentless mode in CI Visibility. Default value is false (disabled).

`DD_CIVISIBILITY_AGENTLESS_URL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the intake base URL used for agentless CI test reporting. When set, payloads are sent to this URL instead of the default site-based intake URL.

`DD_CIVISIBILITY_AUTO_INSTRUMENTATION_PROVIDER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Marks CI test sessions as running under an auto-instrumentation workflow. Any non-empty value enables this marker for telemetry.

`DD_CIVISIBILITY_DANGEROUSLY_FORCE_COVERAGE`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Force-enables CI Visibility code coverage collection for debugging, even when remote settings disable it.

`DD_CIVISIBILITY_DANGEROUSLY_FORCE_TEST_SKIPPING`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Force-enables test skipping logic for debugging, even when remote settings disable it.

`DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `false`<br>
Is disabled if DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_ENABLED is false

`DD_CIVISIBILITY_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enabling or disabling CI Visibility

`DD_CIVISIBILITY_FLAKY_RETRY_COUNT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `5`<br>
Can be set to any non-negative number to change the maximum number of retries per test case.

`DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
A kill switch for the auto test retries feature.

`DD_CIVISIBILITY_GIT_UNSHALLOW_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Provide users the option to enable/disable the `git unshallow` process wheen retrieving git metadata.

`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Disable git upload if the DD_CIVISIBILITY_GIT_UPLOAD_ENABLED is set to false

`DD_CIVISIBILITY_IMPACTED_TESTS_DETECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility impacted tests detection (TIA). When enabled, impacted-tests detection is requested/applied as part of execution settings propagated to child processes.

`DD_CIVISIBILITY_ITR_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables Intelligent Test Runner in CI Visibility. Default Value is false (disabled).

`DD_CIVISIBILITY_MANUAL_API_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility manual API mode for reporting test events programmatically without framework auto-instrumentation.

`DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `500`<br>
CI Visibility (Selenium): after calling `window.DD_RUM.stopSession()` at the end of a browser test, waits this many milliseconds before proceeding to allow RUM data to flush (default: 500ms).

`DD_CIVISIBILITY_TEST_COMMAND`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the test command string propagated to child test JVMs (for example, `mvn test` or `gradle test`). It is used to build the CI Visibility test session name when an explicit session name is not set.

`DD_CIVISIBILITY_TEST_MODULE_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility test module identifier used to correlate spans across worker processes.

`DD_CIVISIBILITY_TEST_SESSION_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility test session trace identifier used to correlate spans across worker processes.

`DD_GIT_COMMIT_AUTHOR_DATE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
The date when the author submitted the commit expressed in ISO 8601 format.

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit author email reported as CI metadata.

`DD_GIT_COMMIT_AUTHOR_NAME`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit author name reported as CI metadata.

`DD_GIT_COMMIT_COMMITTER_DATE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
The date when the committer submitted the commit expressed in ISO 8601 format.

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit committer email reported as CI metadata.

`DD_GIT_COMMIT_COMMITTER_NAME`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit committer name reported as CI metadata.

`DD_GIT_COMMIT_HEAD_SHA`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the git head commit SHA for the current build/pull request, used to populate pull request info and CI git tags (for example, `git.commit.head.sha`) when user-supplied git metadata is needed.

`DD_GIT_COMMIT_MESSAGE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit message reported as CI metadata.

`DD_GIT_COMMIT_SHA`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git commit SHA reported as CI metadata and used for git metadata tagging when enabled.

`DD_TEST_MANAGEMENT_ATTEMPT_TO_FIX_RETRIES`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
CI Visibility Test Management: overrides the number of retry executions for tests marked as "attempt to fix". If unset, the value from backend/remote settings is used.

`DD_TEST_MANAGEMENT_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility Test Management: enables Test Management features (disabled/quarantined/attempt-to-fix tests) when backend/remote settings allow. Acts as a local kill-switch. Default: true.
