---
title: Set Up Test Parallelization
description: Select your CI provider, platform, and framework for a recommended Test Parallelization setup.
content_filters:
  - trait_id: ci_provider
    option_group_id: test_parallelization_ci_options
    label: "CI provider"
  - trait_id: prog_lang
    option_group_id: test_parallelization_language_options
    label: "Platform"
  - trait_id: platform
    option_group_id: test_parallelization_<PROG_LANG>_framework_options
    label: "Framework"
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

Choose your CI provider, platform, and test framework to see the recommended configuration for your suite. {% #adopt-ddtest-in-ci %}

{% collapse-content title="Concepts: CI nodes, workers, and plans" level="h3" id="concepts" %}

- A **CI node** is one execution environment, such as a GitHub Actions job.
- A **worker** is a test process started by `ddtest`. Each CI node runs one worker by default.
- A **plan** is the `.testoptimization/` directory containing the selected test files, parallelism, and assignments.

{% /collapse-content %}

## Prerequisites

- Confirm that your framework, runtime, and Datadog library meet the [Test Parallelization compatibility requirements](/tests/test_parallelization/#compatibility).
- Set up [Test Optimization](/tests/setup/) for the suite. Reuse its credentials, `DD_SITE`, `DD_SERVICE`, and instrumentation.
- Install Git and check out the repository.
- Use the same runtime, dependencies, configuration, environment, project directory, and source revision for planning and execution.

{% if not(equals($platform, "webdriverio")) %}

To skip unaffected tests, enable [Test Impact Analysis](/tests/test_impact_analysis/) for the service.

{% /if %}

## Install ddtest

Install the latest `ddtest` into `bin` in the planning and test environments. Use the same version in both; the CircleCI example transfers the binary from the planning job: {% #1-add-test-planning %}

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash -s -- --dir bin
```

## Configure your CI jobs

`ddtest` reuses your existing framework configuration. Replace your existing test invocation with the configuration below. Keep services, fixtures, report uploads, and Test Optimization instrumentation. The examples use the repository root and Bash. {% #3-replace-the-existing-test-command %}

{% if equals($prog_lang, "ruby") %}

Repeat your [Ruby Test Optimization setup](/tests/setup/ruby/) in the planning job before `ddtest plan`, including the auto-instrumentation action or orb if used. Test discovery needs the `datadog-ci` gem installed in the same Ruby/Bundler environment as the tests. Keep this setup in every test job too.

{% /if %}
{% if equals($prog_lang, "python") %}

Repeat your [Python Test Optimization setup](/tests/setup/python/) in the planning job before `ddtest plan`, including the auto-instrumentation action or orb if used. Full discovery needs `ddtrace` available in the environment used by pytest; `ddtest` enables its pytest plugin. Keep this setup in every test job too.

{% /if %}
{% if equals($prog_lang, "javascript") %}

JavaScript file discovery does not require auto-instrumentation, but planning needs a Datadog connection to retrieve settings, test durations, and Test Impact Analysis decisions. For Agentless mode, set `DD_API_KEY`, `DD_SITE`, and `DD_CIVISIBILITY_AGENTLESS_ENABLED=true` in every job that runs `ddtest`. For Agent-based setups, make the same Agent connection available to planning and test jobs.

Install the dependencies used by your test configuration and discovery hooks, including any Datadog SDK imports they contain. Keep your [JavaScript Test Optimization setup](/tests/setup/javascript/) in every test job before `ddtest run`.

{% /if %}

{% if equals($ci_provider, "other_ci_single_node") %}

Set `DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM` to the maximum number of local workers your CI node can support. See [parallelism tuning](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget).

{% /if %}
{% if not(equals($ci_provider, "other_ci_single_node")) %}

Set `DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM` to the maximum number of CI nodes in your budget. See [parallelism tuning](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget).

{% /if %}

<!-- actions / ruby -->
{% if and(equals($ci_provider, "github_actions"), equals($prog_lang, "ruby")) %}

Use `ruby/setup-ruby` with `bundler-cache: true` in both planning and test jobs to restore the same Ruby version and Bundler dependencies.

{% /if %}
<!-- End actions / ruby -->
<!-- actions / python -->
{% if and(equals($ci_provider, "github_actions"), equals($prog_lang, "python")) %}

Use `actions/setup-python` with `cache: pip` and your dependency file path in both jobs. Install dependencies after restoring the cache; a pip cache does not install packages.

{% /if %}
<!-- End actions / python -->
<!-- actions / javascript -->
{% if and(equals($ci_provider, "github_actions"), equals($prog_lang, "javascript")) %}

Use `actions/setup-node` with your Node.js version and package-manager cache in both jobs. For npm, set `cache: npm` and run `npm ci`; keep your existing installation command for pnpm or Yarn.

{% /if %}
<!-- End actions / javascript -->
<!-- Other CI providers -->
{% if includes($ci_provider, ["circleci", "other_ci_multi_node", "other_ci_single_node"]) %}

Restore dependency caches and run your installation command before planning and execution. Key caches by runtime and dependency files.

{% /if %}

See [dependency caching](/tests/test_parallelization/best_practices/#cache-project-dependencies) for cache examples. {% #ci-examples %}

<!-- actions -->
{% if equals($ci_provider, "github_actions") %}

Merge the workflow-level `env` settings and jobs into your workflow, keeping existing environment variables, job dependencies, and credentials. Keep credentials in GitHub secrets. Replace the setup comments with your runtime, dependency, instrumentation, and `ddtest` installation steps. {% #actions %}

{% if includes($prog_lang, ["ruby", "python"]) %}

Set the `DD_API_KEY` repository secret and change `site` to your Datadog site. The action configures Test Optimization before planning and execution; retain any existing service and tracer settings.

{% /if %}

{% if includes($prog_lang, ["ruby", "python"]) %}

```yaml
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      # Insert your runtime, dependencies, and ddtest install.
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v3
        with:
          languages: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}"
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: plan
        name: Plan tests
        run: |
          rm -rf .testoptimization
          bin/ddtest plan
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
      # Insert matching runtime, dependencies, ddtest install, and required test services.
      - uses: actions/download-artifact@v4
        with:
          name: ddtest-plan
          path: .testoptimization/
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v3
        with:
          languages: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}"
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run assigned tests
        run: |
          test -f .testoptimization/manifest.txt
          bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
      # Keep existing report and coverage upload steps.
```

{% /if %}
{% if equals($prog_lang, "javascript") %}

These examples use Agentless mode. Set the `DD_API_KEY` repository secret and change `DD_SITE` to your Datadog site.

```yaml
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      # Insert your runtime, dependencies, and ddtest install.
      - id: plan
        name: Plan tests
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_SITE: datadoghq.com
          DD_CIVISIBILITY_AGENTLESS_ENABLED: "true"
        run: |
          rm -rf .testoptimization
          bin/ddtest plan
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
      # Insert matching runtime, dependencies, ddtest install, and required test services.
      # Keep your JavaScript Test Optimization instrumentation.
      - uses: actions/download-artifact@v4
        with:
          name: ddtest-plan
          path: .testoptimization/
      - name: Run assigned tests
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_SITE: datadoghq.com
          DD_CIVISIBILITY_AGENTLESS_ENABLED: "true"
        run: |
          test -f .testoptimization/manifest.txt
          bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
      # Keep existing report and coverage upload steps.
```

{% /if %}

`ddtest plan` writes the matrix to `$GITHUB_OUTPUT`, so GitHub creates only the planned number of test jobs. Each job downloads the same plan and runs its zero-based node index.

{% collapse-content title="Subdirectories and multiple suites" level="h4" id="suite-paths" %}

If your tests run from a subdirectory such as `backend/`:

- Set `working-directory: backend` on the shell steps that install `ddtest`, plan tests, and run tests.
- Set `path: backend/.testoptimization/` in both `actions/upload-artifact` and `actions/download-artifact`. These actions need their own paths, even when you set a default working directory for shell steps.

The upload step saves the plan as a GitHub Actions artifact named `ddtest-plan`. The download step uses the same `name: ddtest-plan` to retrieve it.

If one workflow creates several plans, give each plan a different name. For example, use `backend-plan` for backend tests and `frontend-plan` for frontend tests. Use the matching name in each plan's upload and download steps.

Use different plan names when testing with different Ruby or Python versions, too. Each test job must download the plan created for its environment.

For workflows with several suites, put each suite's `DD_TEST_OPTIMIZATION_RUNNER_*` settings under `env:` in its planning and test jobs. Avoid workflow-level settings that would apply to every suite.

{% /collapse-content %}

{% /if %}
<!-- End actions -->

<!-- circleci -->
{% if equals($ci_provider, "circleci") %}

Enable [dynamic configuration](https://circleci.com/docs/guides/orchestrate/dynamic-config/) to pass the planned node count to a continuation workflow. Keep one setup workflow and continue immediately after planning. Extend an existing continuation if you have one; preserve its parameters, contexts, filters, and unrelated jobs. CircleCI allows one continuation per pipeline, within six hours of creation. {% #circleci %}

In `.circleci/config.yml`, retain your executor and setup steps. Use the same `environment` settings in both jobs and retain their existing variables. Keep credentials in CircleCI contexts or project settings. The `cimg/base` image below is a placeholder for the **existing test image** with the selected language runtime:

{% if includes($prog_lang, ["ruby", "python"]) %}

Set `DD_API_KEY` in a context available to both jobs or in the project settings, and change `site` to your Datadog site. Both configuration files declare the Test Optimization orb and call `autoinstrument` before `ddtest`. Retain any existing service and tracer settings.

{% /if %}

{% if includes($prog_lang, ["ruby", "python"]) %}

```yaml {% filename=".circleci/config.yml" %}
version: 2.1
setup: true

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@2

jobs:
  dd_plan:
    docker:
      - image: cimg/base:stable # Replace with your existing test image.
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"
    steps:
      - checkout
      # Insert dependency caching, installation, and ddtest install.
      - test-optimization-circleci-orb/autoinstrument:
          languages: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}"
          site: datadoghq.com
      - run:
          name: Plan tests
          command: |
            rm -rf .testoptimization
            bin/ddtest plan
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
```

{% /if %}
{% if equals($prog_lang, "javascript") %}

These examples use Agentless mode. Set `DD_API_KEY` in the project settings or a context available to both jobs, and change `DD_SITE` to your Datadog site.

```yaml {% filename=".circleci/config.yml" %}
version: 2.1
setup: true

orbs:
  continuation: circleci/continuation@2

jobs:
  dd_plan:
    docker:
      - image: cimg/base:stable # Replace with your existing test image.
    environment:
      DD_SITE: datadoghq.com
      DD_CIVISIBILITY_AGENTLESS_ENABLED: "true"
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"
    steps:
      - checkout
      # Insert dependency caching, installation, and ddtest install.
      - run:
          name: Plan tests
          command: |
            rm -rf .testoptimization
            bin/ddtest plan
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
```

{% /if %}

In the continuation configuration:

{% if includes($prog_lang, ["ruby", "python"]) %}

```yaml {% filename=".circleci/test-parallelization.yml" %}
version: 2.1

parameters:
  ddtest_parallelism:
    type: integer
    default: 1

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  dd_test:
    parallelism: << pipeline.parameters.ddtest_parallelism >>
    docker:
      - image: cimg/base:stable # Use the same test image as the planning job.
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"
    steps:
      - checkout
      # Insert matching dependency caching and installation.
      # Keep required test services and preparation.
      - restore_cache:
          keys:
            - ddtest-plan-v1-<< pipeline.id >>-tests
      - test-optimization-circleci-orb/autoinstrument:
          languages: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}"
          site: datadoghq.com
      - run:
          name: Run assigned tests
          command: |
            test -f .testoptimization/manifest.txt
            test -f bin/ddtest
            chmod +x bin/ddtest
            bin/ddtest run --ci-node "$CIRCLE_NODE_INDEX"
      # Keep existing report and coverage upload steps.

workflows:
  tests:
    jobs:
      - dd_test # Keep the required contexts, filters, and dependencies.
```

{% /if %}
{% if equals($prog_lang, "javascript") %}

```yaml {% filename=".circleci/test-parallelization.yml" %}
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
    environment:
      DD_SITE: datadoghq.com
      DD_CIVISIBILITY_AGENTLESS_ENABLED: "true"
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: "{% if equals($prog_lang, "ruby") inline=true %}ruby{% /if %}{% if equals($prog_lang, "python") inline=true %}python{% /if %}{% if equals($prog_lang, "javascript") inline=true %}javascript{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: "{% if equals($platform, "rspec") inline=true %}rspec{% /if %}{% if equals($platform, "minitest") inline=true %}minitest{% /if %}{% if equals($platform, "pytest") inline=true %}pytest{% /if %}{% if equals($platform, "jest") inline=true %}jest{% /if %}{% if equals($platform, "vitest") inline=true %}vitest{% /if %}{% if equals($platform, "mocha") inline=true %}mocha{% /if %}{% if equals($platform, "cucumber") inline=true %}cucumber{% /if %}{% if equals($platform, "cypress") inline=true %}cypress{% /if %}{% if equals($platform, "playwright") inline=true %}playwright{% /if %}{% if equals($platform, "webdriverio") inline=true %}webdriverio{% /if %}"
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: "1"
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: "10"
    steps:
      - checkout
      # Insert matching dependency caching and installation.
      # Keep your JavaScript Test Optimization instrumentation.
      # Keep required test services and preparation.
      - restore_cache:
          keys:
            - ddtest-plan-v1-<< pipeline.id >>-tests
      - run:
          name: Run assigned tests
          command: |
            test -f .testoptimization/manifest.txt
            test -f bin/ddtest
            chmod +x bin/ddtest
            bin/ddtest run --ci-node "$CIRCLE_NODE_INDEX"
      # Keep existing report and coverage upload steps.

workflows:
  tests:
    jobs:
      - dd_test # Keep the required contexts, filters, and dependencies.
```

{% /if %}

This cache transports the plan and binary across workflows in the **same pipeline**. Use the exact pipeline-specific key; do not add fallback keys or restore it in planning. Add suite and runtime identifiers to the key for multiple test environments. Reusable dependency caches are separate.

Start a new pipeline to repeat setup. Do not replan in each parallel container or combine this split with CircleCI's native test splitter.

{% /if %}
<!-- End circleci -->

{% if includes($ci_provider, ["other_ci_multi_node", "other_ci_single_node"]) %}

Set these variables in your CI provider's environment settings for the planning and test jobs. Keep credentials in its secret store.

| Variable | Value |
|----------|-------|
| `DD_TEST_OPTIMIZATION_RUNNER_PLATFORM` | {% if equals($prog_lang, "ruby") %}ruby{% /if %}{% if equals($prog_lang, "python") %}python{% /if %}{% if equals($prog_lang, "javascript") %}javascript{% /if %} |
| `DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK` | {% if equals($platform, "rspec") %}rspec{% /if %}{% if equals($platform, "minitest") %}minitest{% /if %}{% if equals($platform, "pytest") %}pytest{% /if %}{% if equals($platform, "jest") %}jest{% /if %}{% if equals($platform, "vitest") %}vitest{% /if %}{% if equals($platform, "mocha") %}mocha{% /if %}{% if equals($platform, "cucumber") %}cucumber{% /if %}{% if equals($platform, "cypress") %}cypress{% /if %}{% if equals($platform, "playwright") %}playwright{% /if %}{% if equals($platform, "webdriverio") %}webdriverio{% /if %} |
| `DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM` | 1 |
| `DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM` | {% if equals($ci_provider, "other_ci_single_node") %}4{% /if %}{% if equals($ci_provider, "other_ci_multi_node") %}10{% /if %} |

{% /if %}

<!-- multi -->
{% if equals($ci_provider, "other_ci_multi_node") %}

Generate one plan in a planning job: {% #distribute-tests-across-ci-nodes %}

```bash
rm -rf .testoptimization
bin/ddtest plan
cat .testoptimization/runner/parallel-runners.txt
```

Use the count in `.testoptimization/runner/parallel-runners.txt` to create jobs indexed **0** through **count minus one**. Share the complete `.testoptimization/` directory, including hidden files, with each test job in the same pipeline.

In each test job, set `DDTEST_CI_NODE_INDEX` to that job's zero-based index and run its assignment:

```bash
test -f .testoptimization/manifest.txt
bin/ddtest run --ci-node "${DDTEST_CI_NODE_INDEX:?Set the zero-based node index for this job}"
```

Replace native test splitting with `ddtest` assignments. Keep plans separate from reusable dependency caches; each plan belongs to one suite and source revision.

{% /if %}
<!-- End multi -->

<!-- single -->
{% if equals($ci_provider, "other_ci_single_node") %}

Replace the test command in your existing job with: {% #run-workers-on-one-ci-node %}

```bash
rm -rf .testoptimization
bin/ddtest run
```

`run` creates a plan and starts up to **4 local workers**. Omit `--ci-node`; no separate planning job or artifact transfer is needed.

If the existing job is already sharded, preserve its suite boundary or consolidate it first. Running this command unchanged on every shard repeats the full suite.

{% /if %}
<!-- End single -->

{% collapse-content title="Custom test commands" level="h4" id="configure-your-framework" %}

Keep options such as tags, seeds, and formatters. To customize test file selection, use `DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION` to include files and `DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN` to exclude them. Both accept file patterns, such as `spec/requests/**/*_spec.rb`.

Keep your existing instrumentation and apply the same environment settings to planning and execution. See [Custom test commands](/tests/test_parallelization/configuration/#custom-test-commands).

<!-- ruby -->
{% if equals($prog_lang, "ruby") %}

<!-- rspec -->
{% if equals($platform, "rspec") %}

### RSpec

`ddtest` uses executable `bin/rspec` when present, otherwise `bundle exec rspec`.

Remove test file and directory paths from your custom command and `.rspec` so they do not run on multiple workers. Use the include/exclude settings above and keep other options.

For example, replace `bundle exec rspec spec/requests --tag smoke` with these CI environment settings:

```yaml
DD_TEST_OPTIMIZATION_RUNNER_COMMAND: "bundle exec rspec --tag smoke"
DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION: "spec/requests/**/*_spec.rb"
```

Use the same settings for planning and execution.

{% /if %}
<!-- End rspec -->

<!-- minitest -->
{% if equals($platform, "minitest") %}

### Minitest {% #minitest %}

For Rails, `ddtest` uses executable `bin/rails test` when present, otherwise `bundle exec rails test`. Preserve any setup and options from custom Rake tasks, but use the Rails test command: a `rake test` override does not receive assigned files correctly.

For non-Rails projects, `ddtest` uses `bundle exec rake test`. Add `TEST_FILES` handling after the existing task configuration:

```ruby
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing configuration here.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
```

{% /if %}
<!-- End minitest -->

{% /if %}
<!-- End ruby -->
<!-- python -->
{% if equals($prog_lang, "python") %}

### Python (pytest) {% #pytest %}

Activate your virtual environment before calling `ddtest`, which runs `python -m pytest` by default.

Keep existing `PYTEST_ADDOPTS`; `ddtest` adds `--ddtrace` to load the pytest plugin.

{% collapse-content title="Custom launchers, configuration, or suite roots" level="h3" id="pytest-custom-command" %}

For an existing command such as `uv run pytest -c config/pytest.ini -q tests/unit tests/integration`, add these settings to your CI environment, preserving any existing `PYTEST_ADDOPTS`:

```yaml
DD_TEST_OPTIMIZATION_RUNNER_COMMAND: "uv run pytest"
PYTEST_ADDOPTS: "-c config/pytest.ini -q"
DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION: "{tests/unit,tests/integration}/**/test_*.py"
```

Adapt the quoted glob to your **files**, using braces for multiple roots. Keep file paths out of `PYTEST_ADDOPTS`; `ddtest` supplies each worker's files. Alternate configuration files and collection overrides may also need a matching glob. See [pytest discovery](/tests/test_parallelization/configuration/#pytest-test-discovery).

Install `ddtrace` in the launcher's environment. For wrappers such as tox, allow Datadog and CI environment variables through.

{% /collapse-content %}

{% /if %}
<!-- End python -->
<!-- javascript -->
{% if equals($prog_lang, "javascript") %}

Keep your package manager, lockfile, and `NODE_OPTIONS` loaders. `ddtest` reuses existing Datadog instrumentation.

<!-- jest -->
{% if equals($platform, "jest") %}

### Jest {% #jest %}

Test Optimization supports `jest-circus` with the `node` or `jsdom` test environment.

Retain existing flags such as `--runInBand` in a [custom Jest command](/tests/test_parallelization/best_practices/#jest).

{% /if %}
<!-- End jest -->

<!-- vitest -->
{% if equals($platform, "vitest") %}

### Vitest {% #vitest %}

Install Vitest and any configured coverage or environment packages in the project.

For a non-default configuration file, also set `DD_TEST_OPTIMIZATION_RUNNER_VITEST_CONFIG` to its path in your CI environment.

**Do not set `--command` or `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`** for Vitest. Put projects, filters, reporters, output paths, and coverage options in [Vitest configuration](/tests/test_parallelization/best_practices/#vitest).

Run from the package directory and run any package-script preparation before `ddtest`; it does not run npm life cycle scripts. Keep Vitest's setup and teardown.

{% /if %}
<!-- End vitest -->

<!-- mocha -->
{% if equals($platform, "mocha") %}

### Mocha {% #mocha %}

Keep `.mocharc.*`, all suite paths, and shared `--file` and `--require` setup. `ddtest` uses the suite paths during discovery and runs only each worker's assigned test files. Shared setup runs in every worker. For command-line options, see [Mocha command overrides](/tests/test_parallelization/best_practices/#mocha).

{% /if %}
<!-- End mocha -->

<!-- cucumber -->
{% if equals($platform, "cucumber") %}

### Cucumber.js {% #cucumber %}

Preserve profiles, support code, paths, tags, and name filters in a [custom Cucumber command](/tests/test_parallelization/best_practices/#cucumberjs). Use tag or name filters instead of scenario-line or rerun selections: `ddtest` assigns whole feature files. Run preparation and other frameworks from mixed test scripts separately.

{% /if %}
<!-- End cucumber -->

<!-- cypress -->
{% if equals($platform, "cypress") %}

### Cypress {% #cypress %}

Keep its [Test Optimization plugin and support-file instrumentation](/tests/setup/javascript/?tab=cypress).

`ddtest` supplies `--spec`. Move any existing `--spec` selection to a file glob in your CI environment:

```yaml
DD_TEST_OPTIMIZATION_RUNNER_COMMAND: 'pnpm exec cypress run --browser electron'
DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION: 'cypress/e2e/smoke-*.cy.js'
```

Start the application and wait for it to be ready in every test job. Install the required browser and [isolate resources](/tests/test_parallelization/best_practices/#isolate-workers), including Xvfb displays, when workers share a node.

{% /if %}
<!-- End cypress -->

<!-- playwright -->
{% if equals($platform, "playwright") %}

### Playwright {% #playwright %}

Remove native `--shard` options. Keep browser installation, project dependencies, and setup/teardown in Playwright configuration. Preserve selected projects and other flags in a [custom Playwright command](/tests/test_parallelization/best_practices/#playwright).

{% /if %}
<!-- End playwright -->

<!-- webdriverio -->
{% if equals($platform, "webdriverio") %}

### WebdriverIO {% #webdriverio %}

Use WebdriverIO with the local runner and the Mocha or Jasmine adapter.

Install `@wdio/cli` in the project. `ddtest` uses the local `wdio run` executable and detects `wdio.conf.*`. To select another configuration, set this environment variable:

```yaml
DD_TEST_OPTIMIZATION_RUNNER_COMMAND: 'pnpm exec wdio run config/wdio.ci.conf.ts'
```

Keep browser capabilities, services, hooks, reporters, and application setup. `ddtest` preserves capability selections and disables native sharding.

Remote cloud grids and grouped specs such as `[['setup.js', 'case.js']]` are unsupported. Flatten groups only if the files can run independently.

Keep [WebdriverIO instrumentation](/tests/setup/javascript/?tab=webdriverio) for test reporting; Test Impact Analysis skipping and per-test coverage are unsupported. [Isolate ports and report paths](/tests/test_parallelization/best_practices/#isolate-workers) when workers share a node.

{% /if %}
<!-- End webdriverio -->

{% /if %}
<!-- End javascript -->

{% /collapse-content %}

## Validate your setup

Inspect the planned files and parallelism: {% #2-inspect-the-plan %}

```bash
cat .testoptimization/runner/parallel-runners.txt
cat .testoptimization/runner/test-files.txt
```

Check that:

- The plan covers the intended suite without unexpected omissions or duplicates. Test Impact Analysis can exclude skipped files.
- CI node and worker counts respect your capacity, and concurrent workers have [isolated resources](/tests/test_parallelization/best_practices/#isolate-workers).
- Tests, failures, and skips appear in [Test Optimization Explorer](/tests/explorer/), and test and coverage reports upload.

Compare CI cost and duration with your previous setup, then [adjust the parallelism budget](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget). {% #4-measure-ci-savings %}
