---
description: ddtest로 테스트 병렬화를 설정하고, CI 공급자를 구성하며, CI 노드 전반에 걸쳐 테스트 실행을 분산합니다.
further_reading:
- link: /tests/test_parallelization/configuration/
  tag: 설명서
  text: 테스트 병렬화 구성
- link: /tests/test_parallelization/troubleshooting/
  tag: 설명서
  text: 테스트 병렬화 문제 해결
- link: /tests/test_parallelization/best_practices/
  tag: 설명서
  text: 테스트 병렬화 모범 사례
- link: /tests/setup/
  tag: 설명서
  text: Test Optimization 설정
title: 테스트 병렬화 설정
---
## 전제 조건 {#prerequisites}

테스트 병렬화를 설정하기 전에:

- [Test Optimization][1]을 설정합니다.
- Ruby의 경우:  `datadog-ci` gem 버전 `1.31.0` 이상을 사용합니다.
- Python의 경우:  `ddtrace` 패키지 버전 `4.11.0` 이상 및 `pytest`를 사용합니다.
- JavaScript의 경우:  `v5`의 경우 `dd-trace` 패키지 버전 `5.111.0` 이상, `v6`의 경우 `v6.0.0` 이상, Node.js 및 [지원되는 프레임워크 버전][8]을 사용합니다. Cucumber.js, Cypress, Mocha, Playwright 및 Vitest는 `ddtest` 1.6.0 이상이 필요합니다.
- 코드 변경의 영향을 받는 테스트만 테스트 병렬화로 분할하려면 테스트 서비스에 [Test Impact Analysis][2]를 활성화하세요.

## 개념 {#concepts}

러너
: 테스트를 실행하는 프로그램입니다. `ddtest`는 테스트를 직접 실행하거나 다른 러너를 위한 파일 목록을 작성할 수 있습니다.

CI 노드
: GitHub Actions 작업, CircleCI 병렬 컨테이너, Kubernetes 포드, VM 또는 로컬 머신과 같은 하나의 CI 실행 환경입니다.

워커
: 테스트를 실행하기 위해 `ddtest`에 의해 시작되는 프로세스입니다. 하나의 CI 노드는 하나의 워커 또는 여러 워커를 실행할 수 있습니다.

계획
: 생성된 `.testoptimization/` 디렉터리입니다. 여기에는 실행 가능한 테스트 파일, 선택된 병렬 처리 수준, 그리고 `ddtest run` 또는 다른 러너가 사용하는 노드별 파일 목록이 포함되어 있습니다.

선택된 병렬 처리
: 테스트 파일 실행 시간을 예측한 후 `ddtest`가 선택하는 CI 노드 수 또는 로컬 워커 수입니다.

## ddtest 설치 {#install-ddtest}

CI 작업에 `ddtest` CLI를 설치하세요. Datadog은 [GitHub Releases][3]에 사전 컴파일된 바이너리를 게시합니다.

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

이 예시들은 최신 Linux AMD64 바이너리를 다운로드합니다. 다른 운영 체제나 아키텍처의 경우, [GitHub Releases][3]에서 해당 자산을 선택하세요.

## CI에 ddtest 도입 {#adopt-ddtest-in-ci}

4단계로 테스트 병렬화를 도입하세요. 먼저, 테스트 실행 방식을 변경하지 않고 계획 단계를 추가합니다. 계획을 검증한 후, 기존 테스트 명령을 `ddtest`로 교체하고 실행 모드를 선택한 다음, 그에 따른 CI 절감 효과를 측정하세요.

이러한 변경 사항은 기능 브랜치에서 적용하세요. 각 CI 구성 변경 사항을 커밋하고 푸시한 다음, 계속하기 전에 결과 CI 실행을 검토하세요.

### 1. 테스트 계획 추가 {#1-add-test-planning}

종속성 및 Test Optimization을 설정한 후, 기존 테스트 단계 앞에 `ddtest plan`을 추가합니다. 이 단계에서는 기존 테스트 명령을 그대로 유지하세요.

CI 환경에 대한 최소 및 최대 병렬 처리 수준을 선택합니다. 예를 들어, 다음 값을 사용하면 `ddtest`가 1~8개의 CI 노드 또는 로컬 워커를 선택할 수 있습니다.

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --min-parallelism 1 \
  --max-parallelism 8
{{< /code-block >}}

`--platform`은 언어 플랫폼을 식별하고, `--framework`는 테스트 프레임워크를 식별합니다. 지원되는 모든 값과 기본값은 [구성][4]을 참조하세요.

계획 단계에서는 테스트를 검색하고, 테스트 기간 및 Test Impact Analysis 데이터를 가져오며, 병렬 처리 수준을 선택합니다. 이 단계에서 테스트를 실행하지는 않습니다. 생성된 `.testoptimization/` 디렉터리에는 실행을 위해 선택된 테스트 파일과 분할이 포함되어 있습니다.

### 2. 계획 검사 {#2-inspect-the-plan}

다음 명령은 CI 로그에서 제안된 러너 수와 테스트 파일을 검사하는 한 가지 방법입니다.

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

또는 `.testoptimization/` 디렉터리를 CI 아티팩트로 다운로드하여 편집기에서 파일을 열어 보세요.

`test-files.txt`에 실행할 파일 목록이 포함되어 있는지 확인하세요. Test Impact Analysis가 활성화된 경우, 테스트가 모두 건너뛰어진 파일은 계획에서 제외됩니다.

### 3. 기존 테스트 명령 교체 {#3-replace-the-existing-test-command}

계획에 예상된 테스트가 포함된 다음에는 기존 테스트 명령을 다음으로 교체합니다.

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK>
{{< /code-block >}}

`ddtest run`은 워크플로에서 이전에 생성된 계획을 재사용합니다. CI 아키텍처에 따라 선택된 분할을 실행하는 방법을 선택하세요.

#### 단일 CI 노드에서 워커 실행 {#run-workers-on-one-ci-node}

단일 CI 노드에서는 `ddtest plan`이 선택 사항입니다. `ddtest run`을 직접 실행하거나, 계획을 먼저 검사하려면 동일한 작업에서 `ddtest plan` 및 `ddtest run`을 연속으로 실행하세요. 선택된 병렬 처리 수준은 `ddtest`가 시작하는 로컬 워커 프로세스의 수입니다. 이 명령은 추가 옵션이 필요하지 않습니다.

#### CI 노드 간에 테스트 분산 {#distribute-tests-across-ci-nodes}

계획 작업에서 `ddtest plan`을 한 번 실행하세요. `.testoptimization/` 디렉터리 전체를 테스트 작업과 공유하고, 선택한 병렬 처리를 사용하여 CI 매트릭스 크기를 정의합니다. 각 노드에서 다음을 실행하세요.

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

CI-노드 모드에서 `ddtest`는 기본적으로 하나의 로컬 워커를 사용합니다. 각 CI 노드에서 여러 워커를 시작하려면 `--ci-node-workers`를 양의 정수 또는 `ncpu`로 설정하세요.

이 페이지의 CI 예시는 생성된 계획과 선택된 러너 수를 작업 간에 전달하는 방법을 보여줍니다.

### 4. CI 절감 효과 측정 {#4-measure-ci-savings}

테스트 명령을 교체한 후, [Test Optimization Explorer][6]에서 예상된 테스트가 완료되었는지 확인하세요. [CI Visibility Explorer][7]를 사용하여 파이프라인 실행 간의 테스트 작업 기간과 테스트 작업 수를 비교합니다. CI Visibility가 활성화되지 않은 경우, CI 공급자의 동등한 작업 메트릭을 사용하세요.

모든 워커가 하나의 CI 노드에서 실행되는 경우, 병렬 실행은 CI 노드 수를 변경하지 않고 테스트 단계를 단축합니다. 각 워커가 별도의 CI 노드에서 실행되는 경우, `parallel-runners.txt`의 러너 수를 사용하여 CI 매트릭스 크기를 조정하세요. Test Impact Analysis는 `ddtest`가 러너 수를 선택하기 전에 영향을 받지 않는 테스트를 제거하므로, 변경 범위가 작을수록 시작되는 CI 노드 수가 줄어들 수 있습니다.

`--max-parallelism`을 사용하여 CI 용량을 제한하세요. 플래너는 `--ci-job-overhead`를 통해 각 추가 러너의 설정 비용을 고려합니다. 이러한 설정에 대한 자세한 내용은 [구성][4]을(를) 참조하세요.

`.gitignore`에`.testoptimization/`을 추가하세요. 각 CI 워크플로 실행에 대해 새로운 계획을 생성하고, 동일한 소스 수정 버전 및 실행 환경에 대한 작업 간에만 공유하세요. 동일한 작업 디렉터리에서 계획 및 테스트를 실행합니다. 생성된 파일에 대한 자세한 내용은 [계획 아티팩트][5]를 참조하세요.

## CI 예시 {#ci-examples}

GitHub Actions 및 CircleCI의 시작점으로 다음 예시를 활용하세요.

{{< collapse-content title="Ruby" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

계획 작업은 CI 노드 수를 선택하고 매트릭스를 내보냅니다. 테스트 작업은 `.testoptimization/` 아티팩트를 다운로드하고 해당 매트릭스 노드에 할당된 파일만 실행합니다.

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

설정 워크플로는 `ddtest plan`을 실행하고 `.testoptimization/`을 저장하며, 선택된 CI 노드 수로 테스트 워크플로를 계속 진행합니다.

`.circleci/config.yml`에서:

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

`.circleci/test.yml`에서:

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

계획 작업은 CI 노드 수를 선택하고 매트릭스를 내보냅니다. 테스트 작업은 `.testoptimization/` 아티팩트를 다운로드하고 해당 매트릭스 노드에 할당된 파일만 실행합니다.

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

설정 워크플로는 `ddtest plan`을 실행하고 `.testoptimization/`을 저장하며, 선택된 CI 노드 수로 테스트 워크플로를 계속 진행합니다.

`.circleci/config.yml`에서:

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

`.circleci/test.yml`에서:

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

Ruby 및 Python 예시와 동일한 계획 및 테스트 작업 구조를 사용합니다. `DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`를 `cucumber`, `cypress`, `jest`, `mocha`, `playwright` 또는 `vitest`로 설정하세요. 다음 예제는 Jest를 사용합니다. `jest`를 테스트 모음에 맞는 프레임워크로 바꾸세요.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

워크플로 또는 작업 수준에서 다음 환경 변수를 설정합니다.

{{< code-block lang="yaml" >}}
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
{{< /code-block >}}

각 언어 설정 단계를 Node.js 종속성 설치로 바꿉니다.

{{< code-block lang="yaml" >}}
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
- name: Install JavaScript dependencies
  run: npm ci
{{< /code-block >}}

JavaScript용 Datadog Test Optimization을 구성합니다.

{{< code-block lang="yaml" >}}
- name: Configure Datadog Test Optimization
  uses: datadog/test-visibility-github-action@v2
  with:
    languages: js
    api_key: ${{ secrets.DD_API_KEY }}
    site: datadoghq.com
{{< /code-block >}}

`ddtest plan` 및 `ddtest run --ci-node ${{ matrix.ci_node_index }}` 명령은 플랫폼과 프레임워크가 환경을 통해 제공될 때 변경되지 않습니다.

{{% /tab %}}
{{% tab "CircleCI" %}}

Node.js 이미지를 사용하고 `plan` 작업에서 러너 환경을 설정하세요.

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

CircleCI 워크플로에서 `ddtest` 다운로드, 계획, 캐시 및 연속 단계를 유지하세요. 테스트 작업에서 종속성을 설치하고, JavaScript를 자동 계측하며, CircleCI 노드 인덱스를 `ddtest`에 전달합니다.

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

`ddtest`는 JavaScript 워커 프로세스에 `NODE_OPTIONS=-r dd-trace/ci/init`를 추가하므로, `ddtest plan` 이전에 설치된 프로젝트 종속성에 `dd-trace`가 포함되어야 합니다. 이는 프레임워크별 [Test Optimization 설정][8]을 대체하지 않습니다. 예를 들어, Cypress는 구성 파일에서 수동 계측이 필요합니다.

{{< /collapse-content >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/setup/
[2]: /ko/tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /ko/tests/test_parallelization/configuration/
[5]: /ko/tests/test_parallelization/configuration/#plan-artifacts
[6]: /ko/tests/explorer/
[7]: /ko/continuous_integration/explorer/
[8]: /ko/tests/setup/javascript/