---
title: Test Parallelization Best Practices
description: Optimize Test Parallelization planning and test discovery for Ruby, Rails, Python, and JavaScript test suites.
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Configure Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
---

Use these options after [setting up your first CI run](/tests/test_parallelization/setup/). Keep framework settings consistent between planning and execution.

## Choose a parallelism budget

Set `--min-parallelism` and `--max-parallelism` on `ddtest plan`, or on `ddtest run` when it plans automatically. In CI-node mode these values count nodes. On one node, they count worker processes.

Start within your CPU, memory, concurrency, and cost limits. The setup examples' maximum of 10 nodes is an example budget, not a CLI default. Both CLI bounds default to the available physical CPU count.

After representative CI runs, compare duration and cost. Reduce the maximum if jobs spend more time starting up or competing for resources than running tests. Increase it only when the suite and available capacity can benefit.

- `--ci-job-overhead` defaults to `25s`. Increase it to favor fewer runners; decrease it to favor shorter expected wall time. `0s` removes the overhead penalty but does not force the maximum count.
- `--target-time` sets a target duration, such as `10m`. If no bounded split meets it, the planner warns and chooses the fastest expected split without the overhead penalty.
- `--ci-node-workers` controls processes inside each distributed node and defaults to `1`. Increase it only after checking resource isolation.

See [Parallelism selection](/tests/test_parallelization/configuration/#parallelism-selection) for the scoring rules.

## Isolate workers

Give concurrent workers separate databases, ports, temporary directories, and report paths when the test framework does not already isolate them. Use both node and worker indexes when multiple workers share a node:

{{< code-block lang="bash" >}}
bin/ddtest run --ci-node "$CI_NODE_INDEX" --ci-node-workers 2 \
  --worker-env 'DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}'
{{< /code-block >}}

Create the matching resources before tests run. Adapt the variable name to what your application reads; `ddtest` does not create databases. Keep services, fixtures, application readiness checks, and browser installation in every execution job. Cypress processes sharing a machine must not contend for the same Xvfb display.

Use unique report output paths or separate upload names to avoid overwriting another worker's results. See [Worker environment variables](/tests/test_parallelization/configuration/#worker-environment-variables) for session names and templates.

## Keep suites and environments separate

Generate a plan for each suite and OS/runtime combination. Plan and run from the same directory, with matching dependencies, configuration, `DD_SERVICE`, and Test Optimization settings.

In a monorepo, run from the package directory and transfer that package's complete `.testoptimization/` directory. Use distinct artifact names or pipeline-specific transport keys for independent suites. Do not add a second partitioner on top of `ddtest` assignments.

## Optimize the planning step

Test Parallelization adds a planning step that discovers tests before execution. Keep this step lightweight so the time saved by parallel execution is not offset by planning overhead.

### Preinstall system dependencies with Docker

If your tests need operating system packages, include them in a CI base image instead of installing them during every CI run.

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### Cache project dependencies

Restore reusable dependencies in **both the planning and execution jobs**. Reuse existing action or orb caching and install dependencies on a cache miss. Keep keys compatible with the runtime and the project's actual dependency files.

Keep three kinds of data separate:

| Data | Lifetime | How to use it |
| --- | --- | --- |
| Dependencies | Reusable across compatible runs | Restore before the existing install step. |
| Discovery cache | Reusable after validation | Import the discovery file before generating a new plan. |
| Execution plan | One workflow, suite, and environment | Transfer the complete `.testoptimization/` directory to its test jobs. Never restore an old plan during planning. |

For GitHub Actions, Bundler caching also installs gems:

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: "3.3"
    bundler-cache: true
{{< /code-block >}}

For Python projects, use `actions/setup-python` with pip caching:

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
    cache-dependency-path: requirements.txt
- run: python -m pip install -r requirements.txt
{{< /code-block >}}

For JavaScript projects, use `actions/setup-node` with npm caching:

{{< code-block lang="yaml" >}}
- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
    cache-dependency-path: package-lock.json
- run: npm ci
{{< /code-block >}}

Use the project's runtime versions, package manager, and lockfiles. pip and npm caches contain downloads; they do not replace installation. On CircleCI, reuse language-orb caching, such as `ruby/install-deps`, or cache the package manager's download directory before the existing install step.

### Skip database setup during discovery

Discovery does not execute test bodies, but it can load configuration, test modules, or support code. Keep setup required for collection. Skip database setup, migrations, seeds, or fixtures only after verifying that discovery still selects the expected suite.

During discovery, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` is set to `1`. Use this variable to skip expensive setup code during planning.

For example, in Rails:

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

After these changes, test discovery can run faster and avoid failures when the database is unavailable during planning.

### Cache test discovery

If full test discovery takes too long, cache the `ddtest` discovery file between CI runs. Restore your CI cache before planning, and pass the restored file to `ddtest`:

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

After planning, save the refreshed internal discovery file back to your CI cache:

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest` rejects missing or corrupt caches, mismatched platform/framework or include/exclude settings, unavailable source commits, and changes under the effective test root. In monorepos, invalidation is scoped to the project directory. Refresh the cache after successful full discovery.

Keep dependency and configuration changes in your CI cache key when they can affect collection. This cache is an input to a **new plan**, not a replacement for planning.

### Use suite-level skipping for Ruby

If Ruby test discovery remains a bottleneck after applying these optimizations, configure Test Impact Analysis to use suite-level skipping. This mode lets `ddtest plan` use test file discovery instead of discovering every individual test. It trades test-level skipping precision for lower planning overhead because Test Impact Analysis skips or runs an entire suite.

Suite-level skipping requires `datadog-ci >= 1.34.0`. Set `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite` for both planning and test execution:

{{< code-block lang="bash" >}}
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest plan
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest run
{{< /code-block >}}

If you execute tests with another command, set the same environment variable for that command. In CI workflows that plan and run tests in separate jobs, set the variable in both jobs.

## Configure pytest

`ddtest` runs pytest as `python -m pytest` by default and appends the selected test files. Set `--command` to override the base command. For example, `--command pytest` runs the `pytest` console script instead of `python -m pytest`. `ddtest` runs `<command> <files>` and does not add `-m pytest`. It appends `--ddtrace` to `PYTEST_ADDOPTS`, preserving any existing value, so the `ddtrace` pytest plugin loads without changing your pytest config. To pass extra pytest flags without changing the base command, use `PYTEST_ADDOPTS`.

For test discovery, `ddtest` reads `testpaths` and `python_files` from `pytest.ini`, `pyproject.toml`, `tox.ini`, or `setup.cfg`. If no pytest config defines those settings, `ddtest` uses `**/{test_*,*_test}.py`.

During discovery, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` is set to `1`. Use this variable to skip expensive setup code during planning, similar to [skipping database setup during discovery](#skip-database-setup-during-discovery).

## Configure JavaScript frameworks

Except for Vitest, use a direct framework command when you need a package manager, profile, project, or configuration override. Preserve the existing options and suite boundaries. See [Custom test commands](/tests/test_parallelization/configuration/#custom-test-commands) for separators and supported overrides.

Keep the existing [Test Optimization instrumentation][1]. `ddtest` preserves project loaders and selects the Datadog preload from the environment or the project. An action-installed tracer does not need a duplicate project dependency. Vitest uses its Node.js API and has separate configuration instructions below.

### Cucumber.js

Use a command that invokes `cucumber-js` directly when selecting profiles or passing Cucumber filters:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework cucumber --command "pnpm exec cucumber-js --profile ci --tags=@smoke"
{{< /code-block >}}

During planning, `ddtest` performs a serial dry run and uses Cucumber Messages to discover feature files. It includes only files containing scenarios selected by the effective paths, profile, tags, and name filters. Cucumber loads support code, but does not execute step or hook bodies. During execution, `ddtest` replaces positional feature paths and rerun files in `--command` with the files assigned to each worker while preserving Cucumber options. Prefer tag or name filters over scenario line selectors because `ddtest` plans at feature-file granularity.

### Cypress

Use a command that invokes Cypress directly when selecting component testing, an alternate project root, or a custom configuration file:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework cypress --command "pnpm exec cypress run --project apps/web --component"
{{< /code-block >}}

`ddtest` asks Cypress to resolve its effective configuration during planning and replaces any command-level `--spec` value with the files assigned to each worker during execution. Cypress calls the project's `setupNodeEvents` function while resolving configuration, so side effects in that function also occur during planning. Cypress requires [manual Test Optimization instrumentation][1].

### Jest

`ddtest` runs Jest through the local `node_modules/.bin/jest` executable when it exists, or through `npx jest` otherwise. Use `--command` when your project runs Jest through a package manager or wrapper:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework jest --command "pnpm jest --runInBand"
{{< /code-block >}}

`ddtest` discovers and splits test files and suites, not individual Jest tests.

### Mocha

Use a command that invokes Mocha directly when passing framework options:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework mocha --command "pnpm exec mocha --parallel"
{{< /code-block >}}

`ddtest` reads Mocha's effective configuration without loading test modules during discovery. During execution, it replaces configured `spec` inputs with the files assigned to each worker and preserves shared `--file` setup.

### Playwright

Use a command that invokes `playwright test` directly when selecting a configuration, projects, or other Playwright options:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework playwright --command "pnpm exec playwright test --config apps/web/playwright.config.ts --project chromium"
{{< /code-block >}}

Do not include Playwright's `--shard` option. `ddtest` asks Playwright to list tests with its effective configuration, deduplicates files shared by multiple projects, and passes each worker only its assigned files. Configuration, project, grep, and positional filters are preserved during discovery. Playwright loads test modules and their top-level code while listing tests, but does not run test bodies. During execution, `ddtest` preserves configuration, project, grep, reporter, retry, and worker options, replaces positional filters, and removes interactive UI options because workers run non-interactively. Playwright remains responsible for running dependency and teardown projects associated with the selected projects.

### Vitest

Use Vitest 1.6 or later. For `dd-trace`, use version 5.125.0 or later on v5, or 6.14.0 or later on v6. Run from the project directory with Vitest and any coverage or environment packages installed.

`ddtest` calls the Node.js API directly. Remove `--command` and `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`. Move options from the existing command to the selected Vitest configuration:

| Existing CLI option | Vitest setting under `test` |
| --- | --- |
| `--project unit` | `project: ['unit']` |
| `--testNamePattern smoke` | `testNamePattern: 'smoke'` |
| `--reporter junit` | `reporters: ['junit']` |
| `--outputFile reports/tests.xml` | `outputFile: 'reports/tests.xml'` |
| `--coverage` | `coverage.enabled: true` |
| `--passWithNoTests` | `passWithNoTests: true` |

Preserve existing include/exclude rules, setup, teardown, snapshot policy, coverage provider, and thresholds. For example, if an existing object configuration needs project, reporting, and coverage overrides, extend it in `vitest.ci.config.ts`:

{{< code-block lang="typescript" filename="vitest.ci.config.ts" >}}
import base from './vitest.config'

export default {
  ...base,
  test: {
    ...base.test,
    project: ['unit'],
    reporters: ['junit'],
    outputFile: 'reports/tests.xml',
    coverage: {
      ...base.test?.coverage,
      enabled: true,
    },
  },
}
{{< /code-block >}}

For function or asynchronous configurations, apply overrides to the resolved object instead of spreading the function. Include only overrides needed by your original command.

Select the same configuration in both phases:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=vitest
export DD_TEST_OPTIMIZATION_RUNNER_VITEST_CONFIG=vitest.ci.config.ts
bin/ddtest plan --min-parallelism 1 --max-parallelism 10
# On each CI node, after transferring the plan:
bin/ddtest run --ci-node "$CI_NODE_INDEX"
{{< /code-block >}}

Run preparation and npm life cycle commands before `ddtest`; the adapter does not invoke package scripts. Keep environment variables and Node.js loaders in the execution environment. Regenerate the plan after changing configuration or selection.

`ddtest` executes only the project/pool specifications for assigned canonical file paths. A file selected by multiple projects can run in each project. Remove native `test.shard` to avoid splitting an assignment again. Use Vitest directly for watch mode, UI, benchmarks, snapshot updates, and report merging.

## Configure Minitest in non-Rails projects

For non-Rails Minitest projects, `ddtest` uses `bundle exec rake test` and passes selected files in the `TEST_FILES` environment variable. Update the existing `Rake::TestTask` to read `TEST_FILES` after configuring its normal file list:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/javascript/
