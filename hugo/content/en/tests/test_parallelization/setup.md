---
title: Set Up Test Parallelization
description: Choose your language, framework, and CI provider to set up Test Parallelization.
further_reading:
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Test Parallelization settings reference"
  - link: "/tests/test_parallelization/best_practices/"
    tag: "Documentation"
    text: "Tune parallelism, caching, and worker isolation"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshoot Test Parallelization"
---

Choose your language and framework, then connect `ddtest` to your CI provider. Make the changes on a branch and [check the first CI run](#4-measure-ci-savings) before adopting them.

## Prerequisites

- Set up [Test Optimization](/tests/setup/) for the suite. Reuse its credentials, `DD_SITE`, `DD_SERVICE`, and instrumentation.
- Use `ddtest` **1.12.0 or later** for these instructions. Install the same version in planning and test jobs.
- Install Git and check out the repository.
- Keep the suite's runtime, dependencies, configuration, and required services. Run planning and tests from the same project directory and source revision.
- Enable [Test Impact Analysis](/tests/test_impact_analysis/) for the service if you want to skip tests unaffected by a change. It is optional for parallelization.

Planning does not require a Datadog SDK. Ruby and Python can use one for full test discovery; without one, normal planning falls back to file discovery. Test execution requires the library and Test Optimization setup. Keep existing instrumentation in both jobs when it is already configured.

## Install ddtest

Add this step to the jobs that need `ddtest`. This example pins the Linux AMD64 binary to version 1.12.0:

{{< code-block lang="bash" >}}
mkdir -p bin
curl -fsSL https://github.com/DataDog/ddtest/releases/download/v1.12.0/ddtest-linux-amd64 -o bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

For another operating system or architecture, choose the matching asset from [DDTest releases](https://github.com/DataDog/ddtest/releases). Add `.testoptimization/` to your existing `.gitignore`; keep its other entries.

{{< collapse-content title="Download with the GitHub CLI" level="h3" >}}

If your CI job uses the GitHub CLI, download the same pinned release with:

{{< code-block lang="bash" >}}
mkdir -p bin
gh release download v1.12.0 --repo DataDog/ddtest --pattern ddtest-linux-amd64 --dir bin
mv bin/ddtest-linux-amd64 bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

In GitHub Actions, set the step's `GH_TOKEN` environment variable to `${{ github.token }}`.

{{< /collapse-content >}}

## Choose your language and framework

Save the selected framework's settings in `.ci/ddtest-env.sh`. The CI examples source this file before both planning and execution. Keep secrets in your existing CI secret store.

Preserve the effective test command: configuration, filters, seeds, reporters, and environment. Adapt the examples to your suite. See [Custom test commands](/tests/test_parallelization/configuration/#custom-test-commands) for command and file selection rules.

{{< tabs >}}
{{% tab "Ruby" %}}

Use `datadog-ci` **1.31.0 or later** and complete the [Ruby Test Optimization setup](/tests/setup/ruby/). Keep the project's Ruby version, Bundler dependencies, and Rails environment.

Open your framework:

{{< collapse-content title="RSpec" level="h3" id="rspec" >}}

Use RSpec **3.0 or later**. `ddtest` uses executable `bin/rspec` when present, otherwise `bundle exec rspec`.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=ruby
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=rspec
{{< /code-block >}}

Keep `.rspec` and the suite's configuration. If the existing command has options, add them to the same file. For example, retain an existing example filter with:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='bundle exec rspec --example billing'
{{< /code-block >}}

{{< /collapse-content >}}

{{< collapse-content title="Minitest" level="h3" id="minitest" >}}

Use Minitest **5.0 or later**.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=ruby
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=minitest
{{< /code-block >}}

For Rails, `ddtest` uses executable `bin/rails test` when present, otherwise `bundle exec rails test`. It passes assigned files as positional arguments. If your Rails job runs a custom Rake task, preserve its setup and options before switching to Rails. A `rake test` override does not receive assigned files correctly in a detected Rails application.

For non-Rails projects, `ddtest` uses `bundle exec rake test`. Update the existing `Rake::TestTask` to consume `TEST_FILES` after its normal file list is configured:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing configuration here.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

{{< /collapse-content >}}

Cache dependencies in **both** jobs. On GitHub Actions, use `ruby/setup-ruby` with `bundler-cache: true`. On CircleCI, reuse `ruby/install-deps` with caching enabled. See [dependency caching](/tests/test_parallelization/best_practices/#cache-project-dependencies).

{{% /tab %}}
{{% tab "Python" %}}

Use pytest **6.0 or later** and `ddtrace` **4.11.0 or later**, with a compatible Python version. Complete the [Python Test Optimization setup](/tests/setup/python/).

`ddtest` uses `python -m pytest` by default. Activate the existing virtual environment before calling `ddtest` in both jobs.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=python
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=pytest
{{< /code-block >}}

Keep existing `PYTEST_ADDOPTS`; `ddtest` adds `--ddtrace` to load the pytest plugin. Preserve options in both planning and execution.

{{< collapse-content title="Custom launchers, configuration, or suite roots" level="h3" id="pytest-custom-command" >}}

For an existing command such as `uv run pytest -c config/pytest.ini -q tests/unit tests/integration`, add these settings to `.ci/ddtest-env.sh`:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='uv run pytest'
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }-c config/pytest.ini -q"
export DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION='{tests/unit,tests/integration}/**/test_*.py'
{{< /code-block >}}

Adapt the glob to your filenames. `--tests-location` accepts one glob matching **files**, not a list of directories. Use braces for multiple roots and quote the pattern. Keep file paths out of `PYTEST_ADDOPTS` because `ddtest` supplies each worker's files.

`ddtest` reads `testpaths` and `python_files` from standard pytest configuration files. Alternate configuration and command-line overrides can need a matching candidate glob. For example, retain `-o python_files=check_*.py` in `PYTEST_ADDOPTS` and use `tests/ui/**/check_*.py` as the location. See [pytest discovery](/tests/test_parallelization/configuration/#pytest-test-discovery).

Install `ddtrace` in the environment used by the launcher. For tox or another environment wrapper, preserve Datadog and CI environment variables in its allowlist.

{{< /collapse-content >}}

Cache dependencies in **both** jobs. For pip on GitHub Actions, use `actions/setup-python` with `cache: pip` and the actual dependency file path, then run the existing installation command. A pip cache does not install packages. See [dependency caching](/tests/test_parallelization/best_practices/#cache-project-dependencies).

{{% /tab %}}
{{% tab "JavaScript" %}}

Complete the [JavaScript Test Optimization setup](/tests/setup/javascript/) for your framework. Use Node.js and framework versions supported by your Datadog SDK. The minimum `dd-trace` version is **5.111.0** on v5 or **6.0.0** on v6; Vitest has an additional requirement below.

Install dependencies using the existing package manager and lockfile. Keep project loaders in `NODE_OPTIONS`. `ddtest` reuses an existing Datadog preload or the tracer installed by the Test Optimization action. See [tracer selection](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation).

Open your framework and save its settings:

{{< collapse-content title="Jest" level="h3" id="jest" >}}

Use Jest **24.8 or later** with `dd-trace` v5, or **28.0 or later** with v6. Test Optimization supports `jest-circus` with the `node` or `jsdom` test environment.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=jest
{{< /code-block >}}

`ddtest` lists tests with Jest's `--listTests` and runs assigned files with `--runTestsByPath`. Preserve existing flags. For example, if the suite uses `--runInBand`, add:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='pnpm exec jest --runInBand'
{{< /code-block >}}

{{< /collapse-content >}}

{{< collapse-content title="Vitest" level="h3" id="vitest" >}}

Use Vitest **1.6 or later** and `dd-trace` **5.125.0 or later on v5**, or **6.14.0 or later on v6**. Install Vitest and any configured coverage or environment packages in the project.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=vitest
{{< /code-block >}}

For a non-default configuration file, also set `DD_TEST_OPTIMIZATION_RUNNER_VITEST_CONFIG` to its path in `.ci/ddtest-env.sh`.

`ddtest` uses Vitest's Node.js API. **Do not set `--command` or `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`**: Vitest rejects both. Put selected projects, filters, reporters, output paths, and coverage options in the Vitest configuration. Keep its existing setup and teardown.

Run package-script preparation steps before `ddtest`; the adapter does not run npm life cycle scripts. Run from the package directory where Node.js can resolve Vitest. For a command-to-config example, see [Configure Vitest](/tests/test_parallelization/best_practices/#vitest).

{{< /collapse-content >}}

{{< collapse-content title="Mocha" level="h3" id="mocha" >}}

Use Mocha **8 or later**.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=mocha
{{< /code-block >}}

Preserve `.mocharc.*`, shared setup, and all suite paths. For example, to keep an existing command with two suite directories, add:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='pnpm exec mocha --require test/support/env --check-leaks test/ test/acceptance/'
{{< /code-block >}}

`ddtest` reads Mocha's effective configuration and replaces its `spec` inputs with assigned files. Shared `--file` setup runs in every worker.

{{< /collapse-content >}}

{{< collapse-content title="Cucumber.js" level="h3" id="cucumber" >}}

DDTest tests compatibility with `@cucumber/cucumber` **7 through 13**.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=cucumber
{{< /code-block >}}

Keep profiles, support code, paths, tags, and name filters. For example, to retain an existing feature subset, add:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='pnpm exec cucumber-js features/api/*.feature --profile ci'
{{< /code-block >}}

Planning uses a dry run. Execution replaces feature paths and rerun files with assigned feature files. Scenario line and rerun selections do not remain scenario-level filters during execution; use equivalent tag or name filters when that scope matters. Keep other work from mixed framework scripts in separate steps.

{{< /collapse-content >}}

{{< collapse-content title="Cypress" level="h3" id="cypress" >}}

Use Cypress **12 or later**. Keep its [Test Optimization plugin and support-file instrumentation](/tests/setup/javascript/?tab=cypress).

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=cypress
{{< /code-block >}}

`ddtest` supplies `--spec` for each worker. If the existing command uses it to select a subset, move that selection to a `ddtest` glob. For example:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='pnpm exec cypress run --browser electron'
export DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION='cypress/e2e/smoke-*.cy.js'
{{< /code-block >}}

Keep the application server, readiness check, browser, and fixtures in every test job. When running multiple processes on one node, [isolate their resources](/tests/test_parallelization/best_practices/#isolate-workers), including Xvfb displays.

{{< /collapse-content >}}

{{< collapse-content title="Playwright" level="h3" id="playwright" >}}

Use Playwright **1.18 or later** with `dd-trace` v5, or **1.38 or later** with v6.

{{< code-block lang="bash" filename=".ci/ddtest-env.sh" >}}
export DD_TEST_OPTIMIZATION_RUNNER_PLATFORM=javascript
export DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK=playwright
{{< /code-block >}}

Keep configuration, projects, filters, reporters, retries, and browser installation. For example, to retain an existing project selection, add:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNNER_COMMAND='pnpm exec playwright test --project chromium'
{{< /code-block >}}

Run both phases from the same package directory. `ddtest` lists tests with Playwright and assigns exact file paths to workers. Remove native `--shard` when `ddtest` owns the split. Keep project dependencies and teardown in Playwright configuration.

{{< /collapse-content >}}

Cache dependencies in **both** jobs. For npm on GitHub Actions, use `actions/setup-node` with `cache: npm`, then run `npm ci`. Reuse equivalent caching for your package manager on CircleCI. See [dependency caching](/tests/test_parallelization/best_practices/#cache-project-dependencies).

{{% /tab %}}
{{< /tabs >}}

## Adopt ddtest in CI

On GitHub Actions or CircleCI, let the plan choose the number of CI nodes within your budget. If your workflow must stay on one executor, use **One CI node** below. Keep existing capacity limits and unrelated test jobs.

{{< collapse-content title="Concepts: CI nodes, workers, and plans" level="h3" id="concepts" >}}

- A **CI node** is one execution environment, such as a GitHub Actions job or CircleCI parallel container.
- A **worker** is a test process started by `ddtest`. In CI-node mode, each node runs one worker by default.
- A **plan** is the generated `.testoptimization/` directory. It records runnable files, selected parallelism, and assignments.
- A **runner** executes tests. You can use `ddtest` or [another runner](/tests/test_parallelization/configuration/#use-a-plan-with-another-test-runner).

{{< /collapse-content >}}

### 1. Add test planning

After the existing dependency and Test Optimization setup, source the selected settings and generate a fresh plan:

{{< code-block lang="bash" >}}
source .ci/ddtest-env.sh
rm -rf .testoptimization
bin/ddtest plan --min-parallelism 1 --max-parallelism 10
{{< /code-block >}}

The example's maximum of **10** is a starting budget, not the CLI default or an optimal value. Reduce it to available capacity. For distributed execution, it counts CI nodes; for one-node execution, it counts local workers.

### 2. Inspect the plan

Before replacing the test command, inspect the selected files and count:

{{< code-block lang="bash" >}}
cat .testoptimization/runner/parallel-runners.txt
wc -l .testoptimization/runner/test-files.txt
sed -n '1,20p' .testoptimization/runner/test-files.txt
{{< /code-block >}}

Compare the file list with the intended suite, including nested directories. Test Impact Analysis can remove files whose tests are all skipped. An empty plan can be valid, but unexpected omissions need investigation.

### 3. Replace the existing test command

Use the CI example below to run the plan. Preserve services, fixtures, report uploads, working directories, and instrumentation in each test job. Replace the original suite invocation so it does not run twice.

## CI examples

The snippets show the planning and execution connections. **Insert your existing runtime, dependency-cache, installation, and Test Optimization steps at the marked locations.** Use the same framework settings in both jobs. The examples assume the suite runs from the repository root.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Merge these jobs into your workflow. Keep existing job dependencies and credentials. Install `ddtest` and restore dependencies in both jobs. Reuse the [cache and install steps](/tests/test_parallelization/best_practices/#cache-project-dependencies) for your language.

{{< code-block lang="yaml" >}}
jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      # Insert your runtime, dependencies, Datadog setup, and ddtest install.
      - id: plan
        name: Plan tests
        run: |
          source .ci/ddtest-env.sh
          rm -rf .testoptimization
          bin/ddtest plan --min-parallelism 1 --max-parallelism 10
      - uses: actions/upload-artifact@v4
        with:
          name: ddtest-plan
          path: .testoptimization/
          include-hidden-files: true
          if-no-files-found: error

  dd_test:
    needs: dd_plan
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix: ${{ fromJSON(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      # Insert matching setup, ddtest install, and required test services.
      - uses: actions/download-artifact@v4
        with:
          name: ddtest-plan
          path: .testoptimization/
      - name: Run assigned tests
        run: |
          source .ci/ddtest-env.sh
          test -f .testoptimization/manifest.txt
          bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
      # Keep existing report and coverage upload steps.
{{< /code-block >}}

`ddtest plan` writes the matrix to `$GITHUB_OUTPUT`. Every test job downloads the complete plan, including hidden files, and runs its zero-based node index. Do not generate a separate plan in each test job.

For a suite in a subdirectory, set the same `working-directory` for shell steps and prefix both artifact paths with that directory. Artifact actions do not use `defaults.run.working-directory`. Give separate suites or runtime combinations distinct artifact names.

{{% /tab %}}
{{% tab "CircleCI" %}}

Use [dynamic configuration](https://circleci.com/docs/guides/orchestrate/dynamic-config/) to pass the planned node count to a continuation workflow. Extend an existing continuation if you have one; preserve its parameters, contexts, filters, and unrelated jobs. CircleCI allows one continuation per pipeline, within six hours of creation.

In `.circleci/config.yml`, retain your executor and setup steps. The `cimg/base` image below is a placeholder for the **existing test image** with the selected language runtime:

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1
setup: true

orbs:
  continuation: circleci/continuation@2

jobs:
  dd_plan:
    docker:
      - image: cimg/base:stable # Replace with your existing test image.
    steps:
      - checkout
      # Insert dependency caching, installation, Datadog setup, and ddtest install.
      - run:
          name: Plan tests
          command: |
            source .ci/ddtest-env.sh
            rm -rf .testoptimization
            bin/ddtest plan --min-parallelism 1 --max-parallelism 10
      - save_cache:
          key: ddtest-plan-v1-<< pipeline.id >>-tests
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Pass the planned node count
          command: |
            count=$(cat .testoptimization/runner/parallel-runners.txt)
            printf '{"ddtest_parallelism": %s}\n' "$count" > ddtest-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test-parallelization.yml
          parameters: ddtest-parameters.json

workflows:
  setup:
    jobs:
      - dd_plan # Keep the required contexts and filters.
{{< /code-block >}}

In the continuation configuration:

{{< code-block lang="yaml" filename=".circleci/test-parallelization.yml" >}}
version: 2.1

parameters:
  ddtest_parallelism:
    type: integer
    default: 1

jobs:
  dd_test:
    parallelism: << pipeline.parameters.ddtest_parallelism >>
    docker:
      - image: cimg/base:stable # Use the same test image as the planning job.
    steps:
      - checkout
      # Insert matching dependency caching, installation, and Datadog setup.
      # Keep required test services and preparation.
      - restore_cache:
          keys:
            - ddtest-plan-v1-<< pipeline.id >>-tests
      - run:
          name: Run assigned tests
          command: |
            source .ci/ddtest-env.sh
            test -f .testoptimization/manifest.txt
            test -f bin/ddtest
            chmod +x bin/ddtest
            bin/ddtest run --ci-node "$CIRCLE_NODE_INDEX"
      # Keep existing report and coverage upload steps.

workflows:
  tests:
    jobs:
      - dd_test # Keep the required contexts, filters, and dependencies.
{{< /code-block >}}

This cache transports the plan and binary across workflows in the **same pipeline**. Use the exact pipeline-specific key; do not add fallback keys or restore it in planning. Add suite and runtime identifiers to the key for multiple test environments. Reusable dependency caches are separate.

Start a new pipeline to repeat setup. Do not replan in each parallel container or combine this split with CircleCI's native test splitter.

{{% /tab %}}
{{% tab "One CI node" %}}

Use local workers when your workflow must stay on one executor, or for another CI provider without an adaptive workflow configured. Keep the existing job and its dependency cache, runtime, services, and Test Optimization setup.

Replace its test command with:

{{< code-block lang="bash" >}}
source .ci/ddtest-env.sh
rm -rf .testoptimization
bin/ddtest run --min-parallelism 1 --max-parallelism 4
{{< /code-block >}}

`run` plans automatically when no plan exists. The example permits up to **4 worker processes in this job**. Adjust the maximum to available CPU, memory, and isolated resources. Omit `--ci-node`; there is no artifact transfer or extra planning job.

If the existing job is already sharded, preserve its suite boundary or consolidate it first. Running this command unchanged on every shard repeats the full suite.

{{% /tab %}}
{{< /tabs >}}

<a id="run-workers-on-one-ci-node"></a>
<a id="distribute-tests-across-ci-nodes"></a>
For the execution modes, select **One CI node**, **GitHub Actions**, or **CircleCI** above. To run more than one process per distributed node, see [`--ci-node-workers`](/tests/test_parallelization/configuration/#environment-variables).

### 4. Check the first CI run {#4-measure-ci-savings}

Confirm all of the following:

- The plan contains the intended suite and each node receives its assigned files, without omitted or repeated suites.
- The selected node and worker counts respect your limits. A plan choosing one node is valid.
- Expected tests, failures, and skips appear in [Test Optimization Explorer](/tests/explorer/). Required test and coverage reports still upload.
- Services, fixtures, browsers, and per-worker resources work under parallel execution.

After representative runs, compare total workflow duration, test job duration, and CI cost with the previous setup. Use [CI Visibility Explorer](/continuous_integration/explorer/) or your provider's metrics. More nodes do not guarantee a shorter or cheaper run.

Change **`--max-parallelism` in the planning step**, or in `run` for automatic planning, to adjust the budget. See [parallelism tuning](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget) for overhead and target-time settings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
