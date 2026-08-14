---
title: Set Up Test Parallelization
description: Set up Test Parallelization with ddtest, configure CI providers, and distribute test execution across CI nodes.
further_reading:
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Configure Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
  - link: "/tests/test_parallelization/best_practices/"
    tag: "Documentation"
    text: "Test Parallelization Best Practices"
  - link: "/tests/setup/"
    tag: "Documentation"
    text: "Set up Test Optimization"
---

## Prerequisites

Before setting up Test Parallelization:

- Set up [{{< prodname >}}Test Optimization{{< /prodname >}}][1].
- For Ruby: use the `datadog-ci` gem version `1.31.0` or later.
- For Python: use the `ddtrace` package version `4.11.0` or later and `pytest`.
- For JavaScript: use the `dd-trace` package version `5.111.0` or later for `v5` or `v6.0.0` or later for `v6`, Node.js, and Jest.
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
: The CI node count or local worker count that `ddtest` chooses after estimating test file durations.

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

These examples download the latest Linux AMD64 binary. For another operating system or architecture, select the corresponding asset from [GitHub Releases][3].

## Adopt ddtest in CI

Adopt Test Parallelization in four steps. First, add planning without changing how tests run. After validating the plan, replace the existing test command with `ddtest`, choose an execution mode, and measure the resulting CI savings.

Make these changes on a feature branch. Commit and push each CI configuration change, then review the resulting CI run before continuing.

### 1. Add test planning

After setting up dependencies and {{< prodname >}}Test Optimization{{< /prodname >}}, add `ddtest plan` before your existing test step. Keep the existing test command in place during this step.

Choose the minimum and maximum parallelism for your CI environment. For example, the following values allow `ddtest` to choose between 1 and 8 CI nodes or local workers:

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --min-parallelism 1 \
  --max-parallelism 8
{{< /code-block >}}

`--platform` identifies the language platform, and `--framework` identifies the test framework. Supported combinations include `ruby` with `rspec` or `minitest`, `python` with `pytest`, and `javascript` with `jest`. For all supported values and defaults, see [Configuration][4].

Planning discovers tests, retrieves test duration and Test Impact Analysis data, and chooses a parallelism level. It does not execute tests. The generated `.testoptimization/` directory contains the test files and splits selected for execution.

### 2. Inspect the plan

The following commands are one way to inspect the proposed runner count and test files in the CI logs:

{{< code-block lang="bash" >}}
# Show the number of runners selected by ddtest.
cat .testoptimization/runner/parallel-runners.txt

# Count the test files selected for execution.
wc -l .testoptimization/runner/test-files.txt

# Preview the first 20 test files to verify test discovery.
sed -n '1,20p' .testoptimization/runner/test-files.txt

# Optional: List the per-runner split files to see how ddtest distributed the tests.
find .testoptimization/runner/tests-split -maxdepth 1 -type f -print
{{< /code-block >}}

Alternatively, download the `.testoptimization/` directory as a CI artifact and open the files in your editor.

Confirm that `test-files.txt` contains a list of files to run. If Test Impact Analysis is enabled, files whose tests are all skipped are absent from the plan.

### 3. Replace the existing test command

After the plan contains the expected tests, replace the existing test command with:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK>
{{< /code-block >}}

`ddtest run` reuses the plan generated earlier in the workflow. Choose how to run the selected splits based on your CI architecture.

#### Run workers on one CI node

On a single CI node, `ddtest plan` is optional. Run `ddtest run` directly, or run `ddtest plan` and `ddtest run` back-to-back in the same job if you want to inspect the plan first. The selected parallelism is the number of local worker processes that `ddtest` starts. The command does not require additional options.

#### Distribute tests across CI nodes

Run `ddtest plan` once in a planning job. Share the complete `.testoptimization/` directory with the test jobs, and use the selected parallelism to define the size of your CI matrix. On each node, run:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

In CI-node mode, `ddtest` uses one local worker by default. To start multiple workers in each CI node, set `--ci-node-workers` to a positive integer or `ncpu`.

The CI examples on this page show how to pass the generated plan and selected runner count between jobs.

### 4. Measure CI savings

After replacing the test command, confirm in the [Test Optimization Explorer][6] that the expected tests completed. Use the [CI Visibility Explorer][7] to compare test job durations and the number of test jobs between pipeline runs. If CI Visibility is not enabled, use the equivalent job metrics in your CI provider.

If all workers run on one CI node, parallel execution shortens the test stage without changing the number of CI nodes. If each worker runs on a separate CI node, use the runner count in `parallel-runners.txt` to size the CI matrix. Because Test Impact Analysis removes unaffected tests before `ddtest` selects the runner count, smaller changes can result in fewer CI nodes being started.

Use `--max-parallelism` to limit CI capacity. The planner accounts for the setup cost of each additional runner through `--ci-job-overhead`. For details about these settings, see [Configuration][4].

Add `.testoptimization/` to `.gitignore`. Generate a fresh plan for each CI workflow run, and share it only between jobs for the same source revision and execution environment. Run planning and tests from the same working directory. For details about the generated files, see [Plan artifacts][5].

## CI examples

Use the following examples as starting points for GitHub Actions and CircleCI.

{{< collapse-content title="Ruby" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

The plan job chooses the CI node count and emits a matrix. The test job downloads the `.testoptimization/` artifact and runs only the files assigned to its matrix node.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: ruby
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: rspec
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

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

{{< /collapse-content >}}

{{< collapse-content title="Python" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

The plan job chooses the CI node count and emits a matrix. The test job downloads the `.testoptimization/` artifact and runs only the files assigned to its matrix node.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: python
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: pytest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

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
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
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
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

The setup workflow runs `ddtest plan`, stores `.testoptimization/`, and continues into a test workflow with the selected CI node count.

In `.circleci/config.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform python --framework pytest
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
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="python-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform python --framework pytest --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="JavaScript" level="h3" >}}

Use the same plan and test job structure as the Ruby and Python examples. Configure the runner and setup steps for Jest.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Set these environment variables at the workflow or job level:

{{< code-block lang="yaml" >}}
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
{{< /code-block >}}

Replace each language setup step with Node.js dependency installation:

{{< code-block lang="yaml" >}}
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
- name: Install JavaScript dependencies
  run: npm ci
{{< /code-block >}}

Configure Datadog Test Optimization for JavaScript:

{{< code-block lang="yaml" >}}
- name: Configure Datadog Test Optimization
  uses: datadog/test-visibility-github-action@v2
  with:
    languages: js
    api_key: ${{ secrets.DD_API_KEY }}
    site: datadoghq.com
{{< /code-block >}}

The `ddtest plan` and `ddtest run --ci-node ${{ matrix.ci_node_index }}` commands remain unchanged when the platform and framework are provided through the environment.

{{% /tab %}}
{{% tab "CircleCI" %}}

Use a Node.js image and set the runner environment in the `plan` job:

{{< code-block lang="yaml" >}}
jobs:
  plan:
    docker:
      - image: cimg/node:22.14
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
    steps:
      - checkout
      - run:
          name: Install JavaScript dependencies
          command: npm ci
      - test-optimization-circleci-orb/autoinstrument:
          languages: js
          site: datadoghq.com
{{< /code-block >}}

Keep the `ddtest` download, plan, cache, and continuation steps from the CircleCI workflow. In the test job, install dependencies, autoinstrument JavaScript, and pass the CircleCI node index to `ddtest`:

{{< code-block lang="yaml" >}}
- run:
    name: Install JavaScript dependencies
    command: npm ci
- test-optimization-circleci-orb/autoinstrument:
    languages: js
    site: datadoghq.com
- run:
    name: Run tests
    command: |
      NODE_INDEX=${CIRCLE_NODE_INDEX:-0}
      bin/ddtest run --platform javascript --framework jest --ci-node "${NODE_INDEX}"
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

`ddtest` prepends `NODE_OPTIONS=-r dd-trace/ci/init` for Jest worker processes, so the project dependencies installed before `ddtest plan` must include `dd-trace`.

{{< /collapse-content >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: /tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /tests/test_parallelization/configuration/
[5]: /tests/test_parallelization/configuration/#plan-artifacts
[6]: /tests/explorer/
[7]: /continuous_integration/explorer/
