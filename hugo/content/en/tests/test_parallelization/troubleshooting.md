---
title: Test Parallelization Troubleshooting
description: Diagnose missing plans, unexpected test selection, tracer errors, and parallel worker failures.
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Test Parallelization settings reference"
  - link: "/tests/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshoot Test Optimization"
---

Use the error code and framework output in your CI logs to locate the failure. DDTest reports fatal errors as `[error_code] message`. See [Error codes](#error-codes) for meanings and next steps.

## Missing or invalid plan artifacts

For errors such as `run_plan_load_failed` or `run_ci_node_test_files_missing`:

1. Generate a fresh plan in the planning job.
2. Transfer the **complete** `.testoptimization/` directory to every test job, including hidden files and caches.
3. Run from the same project directory as planning. Confirm `manifest.txt` is directly inside `.testoptimization/`, not another nested directory.
4. Pass a zero-based `--ci-node` matching an assignment in `runner/tests-split/`.

On GitHub Actions, use `include-hidden-files: true` when uploading. Artifact paths are relative to the workspace, even if shell steps set a different working directory.

On CircleCI, use the same pipeline-specific save/restore key without prefix fallback keys. A revision-only key can restore a different run's plan. Do not generate a replacement plan independently in each worker.

## Unexpected CI node or worker count

Check these settings in the **planning job**:

- `--min-parallelism` and `--max-parallelism` bound the count. Both default to the available physical CPU count.
- `--ci-job-overhead` favors fewer runners as it increases. The default is `25s`; `0s` removes the penalty without forcing maximum parallelism.
- `--target-time` sets a duration target. If no split meets it, the planner selects the fastest expected split within the bounds.

In CI-node mode, the plan count means CI nodes, and `--ci-node-workers` controls processes per node. On one node without `--ci-node`, the plan count means local processes. A plan selecting one node is valid. See [parallelism tuning](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget).

## No skippable tests are applied

Check that:

- Test Impact Analysis is enabled for the test service.
- Git is installed and `ddtest` runs inside the intended Git checkout.
- Planning and execution use the same `DD_SERVICE`, suite, source revision, OS, and language runtime.
- Runtime tags match the environment used to calculate skippable tests.

Ruby and Python can fall back to file discovery when full discovery fails or a Datadog SDK is absent. Check the discovery logs before assuming a successful plan applied test-level skipping. `--strict-discovery` makes full-discovery failures fatal; canceled full discovery still falls back.

See [runtime tags](/tests/test_parallelization/configuration/#stabilize-runtime-tags) and [Test Impact Analysis troubleshooting](/tests/test_impact_analysis/troubleshooting/).

## Planning works but execution cannot load the tracer

Planning does not require a Datadog SDK; execution does. Keep [Test Optimization setup](/tests/setup/) in every test job.

For Python, check the environment used by the configured launcher. For JavaScript, check the existing Datadog CI require in `NODE_OPTIONS`, then `DD_TRACE_PACKAGE`, then the project-local `dd-trace` package. An invalid explicit preload causes an error instead of falling back to another installation.

Keep project loaders and action-provided tracer paths. Do not overwrite `NODE_OPTIONS` or add a second tracer to work around a resolution error. See [JavaScript instrumentation](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation).

## Minitest does not run the selected files

In a detected Rails application, `ddtest` passes files as positional arguments. Use its Rails default or a compatible `bin/rails test` or `bundle exec rails test` override. A `rake test` override does not change the file-forwarding mode. Preserve custom Rake setup before switching commands.

For non-Rails projects, `ddtest` passes assigned files through `TEST_FILES`. Update the existing `Rake::TestTask` after its normal configuration:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## Custom commands do not run the expected files

Compare the original command, configuration, and environment with both the planning and execution steps. Preserve filters, seeds, reporters, shared setup, and suite boundaries.

`--command` must invoke the selected framework through a supported launcher. Shell chains and scripts that run multiple frameworks are not supported. Vitest rejects command overrides entirely.

Framework-specific checks:

| Framework | What to check |
| --- | --- |
| pytest | `--tests-location` must match files. Preserve `PYTEST_ADDOPTS` and the environment used by the launcher. For multiple roots, use one brace glob such as `'{tests/unit,tests/integration}/**/test_*.py'`. |
| Jest | Keep configuration and selection flags, including an existing `--runInBand`. |
| Mocha | Keep all suite paths and shared `--file` or `--require` setup. `ddtest` replaces configured `spec` inputs during execution. |
| Cucumber.js | Paths and rerun files select features during discovery, but execution runs assigned feature files. Use tag or name filters to preserve scenario scope. |
| Cypress | `ddtest` owns `--spec`. Put a subset in `--tests-location` or Cypress configuration. |
| Playwright | Keep the package directory, configuration, and selected projects. Remove native `--shard` when using `ddtest` splits. |
| Vitest | Remove `--command` and `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`. Use the same `--vitest-config` in both phases and move command options into that configuration. |

A package-manager separator before the framework executable is preserved. A framework's own `--` ends its options; `ddtest` inserts discovery flags before it and replaces the file selection after it during execution. See [Custom test commands](/tests/test_parallelization/configuration/#custom-test-commands).

## Tests pass but coverage or reports are missing

Check the expected suite and project selection, not only the exit status. Preserve the original reporters, output paths, coverage provider and thresholds, and upload steps. Give concurrent workers distinct output paths or artifact names.

Vitest's Node.js API does not run package-script preparation or npm life cycle commands. Move those steps before `ddtest` and retain reporting and coverage options in the selected config. See [Configure Vitest](/tests/test_parallelization/best_practices/#vitest).

## Tests fail only in parallel

Look for shared databases, ports, temporary files, browser displays, and report paths. Keep application startup and readiness checks in each execution job. Use [worker isolation](/tests/test_parallelization/best_practices/#isolate-workers) and lower parallelism while investigating.

Do not combine `ddtest` assignments with another whole-suite splitter. Check that each worker runs its assignment and that the original full-suite command no longer runs alongside it.

## Error codes

Fatal `ddtest plan` and `ddtest run` errors include a code in the form `[error_code] message`. Use the code to identify the failed step, then read the rest of the message for the specific cause.

### Planning errors

| Error code | Meaning and next step |
| --- | --- |
| `plan_git_unavailable` | Git could not be found. Install Git and check that it is on `PATH` in the planning job. |
| `plan_platform_detection_failed` | The language platform could not be selected or initialized. Check the runtime installation and the `--platform` setting. |
| `plan_platform_tags_creation_failed` | Runtime or operating-system tags could not be collected. Check the runtime environment or supply [runtime tags](/tests/test_parallelization/configuration/#stabilize-runtime-tags). |
| `plan_runtime_tags_invalid` | The runtime-tag override could not be parsed. Supply a valid JSON object with string keys and values. |
| `plan_framework_detection_failed` | The test framework is unsupported or could not be initialized. Check the framework installation, `--framework`, and selected platform. |
| `plan_optimization_client_creation_failed`, `plan_optimization_client_initialization_failed` | The Test Optimization client could not be created or initialized. Review the underlying error and check credentials, `DD_SITE`, and network access. |
| `plan_test_files_resolution_failed` | Test-file patterns could not be resolved or the file scan failed. Check the working directory, include/exclude patterns, and file permissions. |
| `plan_full_test_discovery_failed` | Full discovery failed with strict discovery enabled. Check the framework output and fix discovery setup or configuration. |
| `plan_fast_test_discovery_failed` | File discovery failed and no full-discovery result was available. Check test paths, file permissions, and framework discovery output. |
| `plan_full_discovery_results_processing_failed`, `plan_fast_discovery_results_processing_failed` | Discovery results could not be matched to the configured test selection. Check the project directory, file paths, and include/exclude patterns. |
| `plan_manifest_write_failed`, `plan_cache_write_failed`, `plan_test_files_write_failed`, `plan_skippable_percentage_write_failed`, `plan_parallel_runners_write_failed`, `plan_test_splits_write_failed` | A planning artifact could not be written. Check permissions and available disk space for `.testoptimization/`, then generate a fresh plan. |

### Execution errors

| Error code | Meaning and next step |
| --- | --- |
| `run_git_unavailable` | Git could not be found. Install Git and check that it is on `PATH` in the test job. |
| `run_planning_failed` | Automatic planning failed. Review the accompanying error. When a planning error has its own `plan_*` code, that code is reported instead. |
| `run_plan_status_check_failed` | DDTest could not check whether plan artifacts exist. Check the working directory and permissions for `.testoptimization/`. |
| `run_plan_load_failed` | The saved plan could not be loaded. Transfer the complete plan or regenerate it; see [Missing or invalid plan artifacts](#missing-or-invalid-plan-artifacts). |
| `run_parallel_runners_read_failed`, `run_parallel_runners_parse_failed` | The runner-count artifact could not be read or did not contain an integer. Check the transferred plan and regenerate it if necessary. |
| `run_platform_detection_failed` | The language platform could not be selected or initialized. Check the runtime installation and the `--platform` setting in the test job. |
| `run_framework_detection_failed` | The test framework is unsupported or could not be initialized. Check dependencies, framework settings, and instrumentation in the test job. |
| `run_sequential_test_files_read_failed`, `run_parallel_splits_read_failed`, `run_parallel_test_files_read_failed`, `run_ci_node_test_files_read_failed` | A test-file list or split directory could not be read. Check that the complete plan was transferred and that its files are readable. |
| `run_ci_node_test_files_missing` | No split file exists for the requested CI node. Check the zero-based `--ci-node` index against the plan's assignments. |
| `run_sequential_tests_failed`, `run_parallel_tests_failed`, `run_ci_node_tests_failed` | The test framework failed during execution. Check its output for test failures, missing dependencies, or setup errors. See [Tests fail only in parallel](#tests-fail-only-in-parallel) for isolation checks. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
