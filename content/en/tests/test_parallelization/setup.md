---
title: Set Up Test Parallelization
further_reading:
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Configure Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
  - link: "/tests/test_parallelization/best_practices/"
    tag: "Documentation"
    text: "Test Parallelization best practices"
  - link: "/tests/setup/"
    tag: "Documentation"
    text: "Set up Test Optimization"
---

## Prerequisites

Before setting up Test Parallelization:

- Set up [Test Optimization][1].
- Use the `datadog-ci` gem version `1.31.0` or later.
- Enable [Test Impact Analysis][2] for the test service when you want Test Parallelization to split only the tests affected by a code change.

## Concepts

Runner
: A program that runs tests. `ddtest` can run tests directly or write file lists for another runner.

CI node
: One CI execution environment, such as a GitHub Actions job, CircleCI parallel container, Kubernetes pod, VM, or local machine.

Worker
: A process started by `ddtest` to execute tests. One CI node can run one worker or multiple workers.

Plan
: The generated `.testoptimization/` directory. It contains the runnable test files, the selected parallelism, and per-node file lists used by `ddtest run` or another runner.

Selected parallelism
: The CI node count or local worker count that `ddtest` chooses after estimating test file duration and balancing execution time against CI job overhead.

## Install ddtest

Install the `ddtest` CLI in your CI job. Datadog publishes precompiled binaries in [GitHub Releases][3].

{{< tabs >}}
{{% tab "GitHub CLI" %}}

{{< code-block lang="yaml" >}}
- name: Download ddtest binary
  run: |
    mkdir -p bin
    gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
    mv bin/ddtest-linux-amd64 bin/ddtest
    chmod +x bin/ddtest
  env:
    GH_TOKEN: ${{ github.token }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "curl" %}}

{{< code-block lang="bash" >}}
mkdir -p bin
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Run on one CI node

On one CI node, run `ddtest run`:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec
{{< /code-block >}}

By default, `ddtest` can start one worker for each physical CPU core available on the node.

## Run across multiple CI nodes

For multiple CI nodes, run `ddtest plan` once, share the `.testoptimization/` directory with every CI node, and pass each node its zero-indexed CI node number:

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform ruby \
  --framework rspec \
  --min-parallelism 1 \
  --max-parallelism 8

bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

In CI-node mode, `ddtest` uses one local worker by default. To start multiple workers in each CI node, set `--ci-node-workers` to a positive integer or `ncpu`.

## Common settings

Every `ddtest` setting can be passed as a CLI flag or as an environment variable. CLI flags take precedence over environment variables.

| CLI flag | Environment variable | Description |
| -------- | -------------------- | ----------- |
| `--platform` | `DD_TEST_OPTIMIZATION_RUNNER_PLATFORM` | Language or platform.<br>**Default:** `ruby` |
| `--framework` | `DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK` | Test framework. Supported values are `rspec` and `minitest`.<br>**Default:** `rspec` |
| `--command` | `DD_TEST_OPTIMIZATION_RUNNER_COMMAND` | Overrides the default test command.<br>**Default:** Empty |
| `--min-parallelism` | `DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM` | Minimum CI node or worker count `ddtest` considers.<br>**Default:** Physical CPU count |
| `--max-parallelism` | `DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM` | Maximum CI node or worker count `ddtest` considers.<br>**Default:** Physical CPU count |
| `--ci-job-overhead` | `DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD` | Modeled overhead for adding one CI node.<br>**Default:** `25s` |
| `--ci-node` | `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE` | Runs only the files assigned to CI node `N`, where `N` is zero-indexed.<br>**Default:** `-1` |
| `--ci-node-workers` | `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS` | Number of workers to start on this CI node. Use a positive integer or `ncpu`.<br>**Default:** `1` |
| `--worker-env` | `DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV` | Templates environment variables per worker.<br>**Default:** Empty |
| `--tests-location` | `DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION` | Glob pattern used to discover test files. Defaults to `spec/**/*_spec.rb` for RSpec and `test/**/*_test.rb` for Minitest.<br>**Default:** Framework default |
| `--runtime-tags` | `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` | JSON string that overrides runtime tags used to fetch skippable tests.<br>**Default:** Empty |
| N/A | `DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED` | Prints human-readable plan and run reports. Set to `false` to disable reports.<br>**Default:** `true` |

For more information about parallelism, worker environment variables, and plan artifacts, see [Configuration][4].

### Custom test commands

Use `--command` to override the default test command:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec --profile"
{{< /code-block >}}

When using `--command`, do not include test files in the command. `ddtest` appends test files and framework-specific flags to the command.

Do not include the `--` separator in `--command`. If the command contains `--`, `ddtest` emits a warning and removes the separator and everything after it.

## CI examples

Use the following examples as starting points for GitHub Actions and CircleCI.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

The plan job chooses the CI node count and emits a matrix. The test job downloads the `.testoptimization/` artifact and runs only the files assigned to its matrix node.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: ruby
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: rspec

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
        env:
          DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
          DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
        env:
          DD_TEST_SESSION_NAME: ddtest-runner-${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

The setup workflow runs `ddtest plan`, stores `.testoptimization/`, and continues into a test workflow with the selected CI node count.

In `.circleci/config.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform ruby --framework rspec
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

In `.circleci/test.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="ruby-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform ruby --framework rspec --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Use third-party test runners

Use `ddtest` plan files when you want `ddtest` to choose which files should run, but another runner should execute them.

| File | Use |
| ---- | --- |
| `.testoptimization/runner/test-files.txt` | All runnable test files after Test Impact Analysis skips are applied. |
| `.testoptimization/runner/tests-split/runner-N` | Files assigned to CI node or worker `N`. |

For example, use `.testoptimization/runner/test-files.txt` with Knapsack Pro:

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: /tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /tests/test_parallelization/configuration/
