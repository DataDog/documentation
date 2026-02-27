### Continuous Integration Visibility

`DD_CIVISIBILITY_ADDITIONAL_CHILD_PROCESS_JVM_ARGS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Extra JVM arguments appended when CI Visibility auto-configures child JVM processes (for example, Maven/Gradle forked test JVMs) that are started with the tracer attached.

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

`DD_CIVISIBILITY_AGENT_JAR_URI`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
URI to the Java tracer `-javaagent` JAR used by CI Visibility auto-configuration to inject the tracer into child JVM processes (for example, Maven/Gradle test JVMs). This value is converted to a file path and used to build the `-javaagent:<path>` argument.

`DD_CIVISIBILITY_AUTO_CONFIGURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility auto-configuration for build systems. When disabled, the Maven/Gradle configurators do not inject `-javaagent` into forked test JVMs and do not apply automatic CI Visibility configuration.

`DD_CIVISIBILITY_AUTO_INSTRUMENTATION_PROVIDER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Marks CI test sessions as running under an auto-instrumentation workflow. Any non-empty value enables this marker for telemetry.

`DD_CIVISIBILITY_BACKEND_API_TIMEOUT_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30000`<br>
Timeout (milliseconds) for HTTP calls to CI Visibility backend APIs. When CI Visibility is enabled, this value is used as the shared HTTP client timeout instead of the generic agent timeout.

`DD_CIVISIBILITY_BUILD_INSTRUMENTATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility build system instrumentation (for example, Maven/Gradle build instrumentation). When disabled, CI Visibility build instrumentations are not applied.

`DD_CIVISIBILITY_CIPROVIDER_INTEGRATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI provider integration for CI Visibility. When disabled, the tracer does not try to detect Jenkins/GitLab/GitHub Actions/etc from environment variables and uses an "unknown" CI provider.

`DD_CIVISIBILITY_CODE_COVERAGE_COLLECTORPATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the code coverage collector.

`DD_CIVISIBILITY_CODE_COVERAGE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility per-test code coverage collection/reporting. When enabled, the tracer configures an additional intake track (`CITESTCOV`) to submit coverage data; when disabled, code coverage data is not sent.

`DD_CIVISIBILITY_CODE_COVERAGE_ENABLE_JIT_OPTIMIZATIONS`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables JIT optimizations in Code Coverage.

`DD_CIVISIBILITY_CODE_COVERAGE_EXCLUDES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `datadog.trace.*:org.apache.commons.*:org.mockito.*`<br>
Colon-separated list of package patterns to exclude from CI Visibility code coverage (JaCoCo exclusion format). These patterns are split on `:` and used to build excluded package prefixes.

`DD_CIVISIBILITY_CODE_COVERAGE_INCLUDES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `:`<br>
Colon-separated list of package patterns to include for CI Visibility code coverage (JaCoCo inclusion format). If set and non-empty, it overrides auto-detected repository root packages; otherwise, root packages are derived from the repo index.

`DD_CIVISIBILITY_CODE_COVERAGE_LINES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Enables line-level (probe-based) code coverage instrumentation for CI Visibility (JaCoCo). When enabled, the tracer applies JaCoCo agent instrumentations needed for per-test line granularity.

`DD_CIVISIBILITY_CODE_COVERAGE_MODE`
: **Type**: `string`<br>
**Default**: N/A<br>
Selects the code coverage mode: LineExecution or LineCallCount.

`DD_CIVISIBILITY_CODE_COVERAGE_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Destination path for code coverage JSON files.

`DD_CIVISIBILITY_CODE_COVERAGE_REPORT_DUMP_DIR`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Directory where CI Visibility dumps generated aggregated JaCoCo coverage reports (HTML and `jacoco.xml`). When set, reports are written under `<dumpDir>/(session|module)-<eventId>/aggregated`.

`DD_CIVISIBILITY_CODE_COVERAGE_REPORT_UPLOAD_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether CI Visibility uploads aggregated code coverage reports to Datadog. This value is used as a local default/fallback for execution settings (remote CI Visibility settings may override it).

`DD_CIVISIBILITY_CODE_COVERAGE_ROOT_PACKAGES_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Maximum number of root packages to keep when deriving the repository package list for CI Visibility code coverage. If there are more packages than the limit, the package list is coarsened/truncated to fit.

`DD_CIVISIBILITY_CODE_COVERAGE_SNK_FILEPATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the SNK file used for re-signing assemblies after Code Coverage modification.

`DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables automatic configuration of the Datadog Java compiler plugin (dd-javac-plugin) for CI Visibility in supported build tools (for example, Maven/Gradle). When disabled, the tracer does not auto-configure the compiler plugin.

`DD_CIVISIBILITY_COMPILER_PLUGIN_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `0.2.4`<br>
Version of the Datadog Java compiler plugin (dd-javac-plugin and dd-javac-plugin-client) to use when CI Visibility auto-configures compilation instrumentation in supported build tools.

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

`DD_CIVISIBILITY_DEBUG_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
When CI Visibility auto-configures forked JVM processes, sets the JDWP debug port and adds a `-agentlib:jdwp=...address=<port>` argument (suspending the child JVM waiting for a debugger connection).

`DD_CIVISIBILITY_DI_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Dependency injection for divisibility

`DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `false`<br>
Is disabled if DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_ENABLED is false

`DD_CIVISIBILITY_EARLY_FLAKE_DETECTION_LOWER_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
Lower limit threshold for CI Visibility Early Flake Detection (EFD). This value is sent/propagated in build execution settings and used to determine EFD behavior thresholds.

`DD_CIVISIBILITY_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enabling or disabling CI Visibility

`DD_CIVISIBILITY_EXECUTION_SETTINGS_CACHE_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `16`<br>
Cache size used by CI Visibility to cache execution settings and JVM info lookups (fixed-size cache for settings per JVM / JVM executable path).

`DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to the external code coverage file.

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

`DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When CI Visibility auto test retries are enabled, restricts fetching flaky tests data to only "known" flakes (otherwise flaky tests data may be skipped unless fail-fast ordering is used).

`DD_CIVISIBILITY_FORCE_AGENT_EVP_PROXY`
: **Type**: `string`<br>
**Default**: N/A<br>
Forces the use of the Agent's EVP Proxy.

`DD_CIVISIBILITY_GAC_INSTALL_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables Datadog.Trace GAC installation.

`DD_CIVISIBILITY_GIT_CLIENT_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables using the local `git` executable to collect Git metadata for CI Visibility. When disabled, a no-op Git client is used and Git data collection features are unavailable.

`DD_CIVISIBILITY_GIT_COMMAND_TIMEOUT_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30000`<br>
Timeout (milliseconds) for running `git` commands when CI Visibility collects Git metadata using the shell Git client.

`DD_CIVISIBILITY_GIT_REMOTE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `origin`<br>
Git remote name (for example, `origin`) used by CI Visibility when resolving the repository URL for Git metadata collection and Git data upload.

`DD_CIVISIBILITY_GIT_UNSHALLOW_DEFER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether CI Visibility defers `git unshallow` until it knows Git data upload is needed. When false, the repo is unshallowed before collecting Git info; when true, unshallow may be performed later only if required.

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

`DD_CIVISIBILITY_GIT_UPLOAD_TIMEOUT_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `60000`<br>
Timeout (milliseconds) to wait for CI Visibility Git data upload to finish before proceeding with backend configuration/settings requests.

`DD_CIVISIBILITY_GRADLE_SOURCESETS`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: `["main", "test"]`<br>
List of Gradle source set names (default: `main`, `test`) used by CI Visibility when selecting which source sets to consider for coverage/module layout in Gradle builds.

`DD_CIVISIBILITY_IMPACTED_TESTS_DETECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility impacted tests detection (TIA). When enabled, impacted-tests detection is requested/applied as part of execution settings propagated to child processes.

`DD_CIVISIBILITY_INJECTED_TRACER_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Tracer version string propagated from a parent process when it auto-injects the tracer into child JVMs. Used to detect mismatched tracer versions and to avoid instrumenting nested build JVMs.

`DD_CIVISIBILITY_INTAKE_AGENTLESS_URL`
: **Since**: 1.55.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Custom base URL for the CI Intake in CI Visibility agentless mode. When set, CI events are sent to `<url>/api/v2/` for the `ci-intake` endpoint (instead of `https://ci-intake.<DD_SITE>/api/v2/`).

`DD_CIVISIBILITY_ITR_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables Intelligent Test Runner in CI Visibility. Default Value is false (disabled).

`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `0.8.14`<br>
JaCoCo plugin version to use when CI Visibility injects/configures JaCoCo for coverage (for example, injected `jacoco-maven-plugin` or Gradle JaCoCo tool version).

`DD_CIVISIBILITY_JVM_INFO_CACHE_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `8`<br>
Cache size for CI Visibility JVM runtime info lookups (cached by JVM executable path).

`DD_CIVISIBILITY_KNOWN_TESTS_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the known tests feature in CI Visibility.

`DD_CIVISIBILITY_KNOWN_TESTS_REQUEST_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables requesting "known tests" data from the backend as part of CI Visibility execution settings (used for known-tests marking and related behaviors).

`DD_CIVISIBILITY_LOGS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Logs direct submission. Default value is false (disabled).

`DD_CIVISIBILITY_MANUAL_API_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables CI Visibility manual API mode for reporting test events programmatically without framework auto-instrumentation.

`DD_CIVISIBILITY_MODULE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the module name used for module-scoped execution settings and tags. In child/forked JVMs, this is typically propagated from the parent build process; when set, it overrides deriving the module name from the repository path or the service name.

`DD_CIVISIBILITY_REMOTE_ENV_VARS_PROVIDER_KEY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the provider key sent as the `DD-Env-Vars-Provider-Key` HTTP header when fetching remote environment variables from `DD_CIVISIBILITY_REMOTE_ENV_VARS_PROVIDER_URL`.

`DD_CIVISIBILITY_REMOTE_ENV_VARS_PROVIDER_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the URL to fetch remote environment variables from (HTTP GET). When set together with `DD_CIVISIBILITY_REMOTE_ENV_VARS_PROVIDER_KEY`, the tracer loads the returned Java properties (env-var keys) and uses them as an additional environment/config source (for example, for CI provider detection).

`DD_CIVISIBILITY_REPO_INDEX_DUPLICATE_KEY_CHECK_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility repo index: when enabled (default), source path resolution fails if the repo index contains multiple entries for the same key (to avoid ambiguous source mapping). When disabled, duplicate index keys are tolerated.

`DD_CIVISIBILITY_REPO_INDEX_FOLLOW_SYMLINKS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
CI Visibility repo index: controls whether symlink directories are traversed while building the repository index. When disabled (default), symlink directories are skipped; when enabled, symlinks may be visited (with safeguards to avoid duplicate results for links pointing inside the repo).

`DD_CIVISIBILITY_RESOURCE_FOLDER_NAMES`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: `["/resources/", "/java/", "/groovy/", "/kotlin/", "/scala/"]`<br>
CI Visibility source indexing: list of conventional resource-folder path segments used to resolve a resource root from an absolute resource file path (naive substring match). Defaults to `/resources/`, `/java/`, `/groovy/`, `/kotlin/`, `/scala/`.

`DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `500`<br>
CI Visibility (Selenium): after calling `window.DD_RUM.stopSession()` at the end of a browser test, waits this many milliseconds before proceeding to allow RUM data to flush (default: 500ms).

`DD_CIVISIBILITY_SCALATEST_FORK_MONITOR_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
CI Visibility (Scalatest/SBT): enables the Scalatest fork monitor used when SBT runs tests with forking (`Test / fork`), to avoid double-reporting by suppressing Scalatest tracing in the parent process and only instrumenting the forked test JVM (default: false).

`DD_CIVISIBILITY_SIGNAL_CLIENT_TIMEOUT_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
CI Visibility IPC: socket timeout (milliseconds) for the Signal client used by child JVMs to connect to the parent process Signal server (applies to connect and read). Default: 10000ms.

`DD_CIVISIBILITY_SIGNAL_SERVER_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `127.0.0.1`<br>
CI Visibility IPC: host/address that the parent process Signal server binds to (and that child JVMs use to connect back). Default: `127.0.0.1`.

`DD_CIVISIBILITY_SIGNAL_SERVER_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
CI Visibility IPC: port that the parent process Signal server binds to (0 selects an ephemeral port). Child JVMs connect to this port to send signals/results back to the parent.

`DD_CIVISIBILITY_SOURCE_DATA_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: enables attaching source code metadata to test and test-suite spans (for example, `test.source.file`, start/end line numbers, and CODEOWNERS). Default: true.

`DD_CIVISIBILITY_SUBTEST_FEATURES_ENABLED`
: **Since**: 2.5.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Kill-switch for subtest-specific CI test management and retry features. Set to false to disable subtest features even if they are enabled by remote settings.

`DD_CIVISIBILITY_TELEMETRY_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: enables CI Visibility telemetry (collects CI Visibility metrics and adds a trace interceptor that reports CI Visibility trace event counts). Default: true.

`DD_CIVISIBILITY_TESTSSKIPPING_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables or disables the Intelligent Test Runner test skipping feature in CI Visibility.

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

`DD_CIVISIBILITY_TEST_ORDER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: configures test execution ordering instrumentation. Currently supports `FAILFAST` to enable fail-fast ordering (for example, installs JUnit 5 class/method orderers); other values are treated as unknown/invalid by the instrumentation.

`DD_CIVISIBILITY_TEST_SESSION_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility test session trace identifier used to correlate spans across worker processes.

`DD_CIVISIBILITY_TEST_SKIPPING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: enables automatic test skipping in instrumented test frameworks (for example, JUnit/TestNG). When enabled, the tracer may mark tests as skipped/ignored based on backend-provided execution settings (for example, Intelligent Test Runner). Default: true.

`DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1000`<br>
Sets the maximum total number of automatic test retries allowed across the entire test session. This limit is applied when automatic flaky-test retries are enabled and defaults to 1000.

`DD_CIVISIBILITY_TRACE_SANITATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: when enabled (default), applies a trace interceptor that drops non-CI Visibility traces (root span origin is not `ciapp-test`) and sets `library_version` on CI Visibility spans.

`DD_CIVISIBILITY_USE_NOOP_TRACER`
: **Since**: 2.5.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled in CI test reporting mode, uses a no-op tracer implementation to reduce changes to test behavior. Defaults to false.

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
: **Type**: `string`<br>
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

`DD_TEST_OPTIMIZATION_ENV_DATA_FILE`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the path to a JSON file containing CI/environment metadata used for test reporting. If not set, a default file next to the test binary is used.
