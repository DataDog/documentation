---
description: 테스트 병렬화 환경 변수, 병렬성 선택, 워커 설정 및 플랜 아티팩트를 구성합니다.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: 설명서
  text: 테스트 병렬화 설정
- link: /tests/test_parallelization/troubleshooting/
  tag: 설명서
  text: 테스트 병렬화 문제 해결
- link: /tests/test_parallelization/best_practices/
  tag: 설명서
  text: 테스트 병렬화 모범 사례
title: 테스트 병렬화 구성
---
## 환경 변수 {#environment-variables}

대부분의 `ddtest` 설정은 CLI 플래그 또는 환경 변수로 전달할 수 있습니다. CLI 플래그가 환경 변수보다 우선합니다.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: 프로그래밍 언어입니다.<br/>
**CLI 플래그:** `--platform`<br/>
**기본값:** `ruby`<br/>
**지원되는 값:** `ruby`, `python`, `javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: 테스트 프레임워크입니다.<br/>
**CLI 플래그:** `--framework`<br/>
**기본값:** `rspec`<br/>
**지원되는 값:** `rspec`, `minitest`, `pytest`, `jest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: 기본 테스트 명령을 재정의합니다. `ddtest`는 선택한 테스트 파일과 프레임워크별 플래그를 명령에 추가합니다. Ruby, JavaScript 및 Python에 대해 지원됩니다. Python 지원을 위해서는 ddtest 1.7.0 이상이 필요합니다. pytest를 사용하는 1.7.0 이전 버전의 ddtest의 경우 명령을 변경할 수 없습니다. `PYTEST_ADDOPTS`를 사용하여 추가 플래그를 전달합니다. 자세한 내용은 [사용자 지정 테스트 명령](#custom-test-commands)을 참조하세요.<br/>
**CLI 플래그:** `--command`<br/>
**기본값:** 비어 있음<br/>
**예시:** `bundle exec rspec --profile`, `pnpm jest --runInBand`, `pytest`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: 계획 시 `ddtest`가 고려하는 최소 CI 노드 또는 워커 수입니다.<br/>
**CLI 플래그:** `--min-parallelism`<br/>
**기본값:** 물리적 CPU 수<br/>
**예시:** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: 계획 시 `ddtest`가 고려하는 최대 CI 노드 또는 워커 수입니다.<br/>
**CLI 플래그:** `--max-parallelism`<br/>
**기본값:** 물리적 CPU 수<br/>
**예시:** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: 추가 CI 노드를 시작하는 데 필요한 예상 오버헤드입니다. `ddtest` 플래너는 해당 노드가 벽시계 시간을 최소 이 값만큼 단축하는 경우에만 다른 CI 노드를 추가합니다.<br/>자세한 내용은 [병렬성 선택](#parallelism-selection)을 참조하세요.<br/>
**CLI 플래그:** `--ci-job-overhead`<br/>
**기본값:** `25s`<br/>
**예시:** `25s`, `45s`, `1m`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_TARGET_TIME`
: 선택한 분할에 대한 목표 벽시계 시간입니다. `ddtest`는 이 벽시계 시간 이하의 분할을 먼저 고려합니다. 구성된 병렬성 범위 내에서 목표를 충족할 수 있는 분할이 없는 경우, `ddtest`는 예상 벽시계 시간이 가장 짧은 분할을 선택합니다. 자세한 내용은 [병렬성 선택](#parallelism-selection)을 참조하세요.<br/>
**CLI 플래그:** `--target-time`<br/>
**기본값:** `0s`<br/>
**예시:** `10m`, `300s`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`
: CI 노드 `N`에 할당된 파일만 실행합니다(여기서 `N`은 0부터 시작하는 인덱스입니다).<br/>
**CLI 플래그:** `--ci-node`<br/>
**기본값:** `-1`<br/>
**예시:** `0`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS`
: 이 CI 노드에서 시작할 워커 수입니다. 양의 정수를 사용하거나 `ncpu`를 사용하여 사용 가능한 모든 물리적 CPU를 사용합니다.<br/>
**CLI 플래그:** `--ci-node-workers`<br/>
**기본값:** `1`<br/>
**예시:** `2`, `ncpu`

`DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV`
: 각 워커 프로세스에 대한 환경 변수를 설정합니다. `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables](#worker-environment-variables).<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: 테스트 파일을 찾는 데 사용되는 Glob 패턴입니다. 기본값은 RSpec의 경우 `spec/**/*_spec.rb`, Minitest의 경우 `test/**/*_test.rb`, pytest의 경우 pytest 구성(`testpaths` 및 `python_files`) 또는 `**/{test_*,*_test}.py`, Jest 구성 또는 Jest의 기본 테스트 일치 항목입니다.<br/>**CLI 플래그:**`--tests-location`<br/>**별칭:**`KNAPSACK_PRO_TEST_FILE_PATTERN`<br/>**기본값:**프레임워크 기본값<br/>**예시:**`custom/spec/**/*_spec.rb`, `tests/**/*_test.py`, `packages/**/__tests__/**/*.test.ts`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN`
: 검색에서 테스트 파일을 제외하는 데 사용되는 Glob 패턴입니다.<br/>
**CLI 플래그:** `--tests-exclude-pattern`<br/>
**별칭:** `KNAPSACK_PRO_TEST_FILE_EXCLUDE_PATTERN`<br/>
**기본값:** 비어 있음<br/>
**예시:** `spec/system/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE`
: 복원된 테스트 검색 캐시 파일의 경로입니다. `ddtest`는 계획 전에 이를 가져오고 성공적인 전체 검색 후 내부 검색 캐시를 새로 고칩니다.<br/>
**CLI 플래그:** `--test-discovery-cache`<br/>
**기본값:** 비어 있음<br/>
**예시:** `.ddtest-cache/tests-discovery.json`

`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`
: Ruby에 대해 Test Impact Analysis 건너뛰기가 테스트 수준 또는 스위트 수준의 세분성을 사용할지 여부를 제어합니다. 유효하지 않은 값은 `test`로 대체됩니다.<br/>
**CLI 플래그:** `--test-skipping-mode`<br/>
**기본값:** `test`<br/>
**지원되는 값:** `test`, `suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: 프레임워크가 지원하는 경우 스위트 수준 건너뛰기 모드를 포함하여 전체 테스트 검색을 강제합니다.<br/>
**CLI 플래그:** `--force-full-test-discovery`<br/>
**기본값:** `false`<br/>
**지원되는 값:** `true`, `false`

`DD_TEST_OPTIMIZATION_RUNNER_STRICT_DISCOVERY`
: 전체 테스트 검색에서 오류가 발생하면 계획에 실패합니다. 전체 검색이 취소되면(예: 시간 초과로 인해), `ddtest`는 실패하는 대신 빠른 테스트 파일 검색으로 대체됩니다.<br/>
**CLI 플래그:** `--strict-discovery`<br/>
**기본값:** `false`<br/>
**예시:** `true`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: 건너뛸 수 있는 테스트를 가져오는 데 사용되는 런타임 태그를 재정의하는 JSON 문자열입니다. `ddtest`가 건너뛸 수 있는 테스트를 계산하는 데 사용되는 CI 환경 외부에서 실행될 때 이를 사용하세요.<br/>
**CLI 플래그:** `--runtime-tags`<br/>
**별칭:** `DD_TEST_OPTIMIZATION_RUNTIME_TAGS`<br/>
**기본값:** 비어 있음<br/>
**예시:** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: 명령 실행 후 `ddtest`가 사람이 읽을 수 있는 보고서를 출력할지 여부를 제어합니다. 이 설정은 환경 변수로만 사용할 수 있습니다.<br/>
**CLI 플래그:** 없음<br/>
**기본값:** `true`<br/>
**예시:** `false`

## 병렬성 선택 {#parallelism-selection}

`ddtest plan`은 각 실행 가능한 테스트 파일에 걸리는 시간을 추정한 다음 `--min-parallelism`과 `--max-parallelism` 사이의 모든 병렬성 값을 평가합니다.

CI 노드 모드에서 이 값은 CI 노드 수입니다. 단일 CI 노드에서 이 값은 워커 수입니다.

지속 시간 추정치는 Datadog 테스트 모음 p50 타이밍(사용 가능한 경우)을 기반으로 하며, 그렇지 않은 경우 로컬 검색 가중치로 대체됩니다. 각 후보 수는 예상되는 가장 느린 워커 시간과 노드 수에 `--ci-job-overhead`를 곱한 값을 더하여 점수가 매겨집니다.

점수가 동점일 경우, `ddtest`는 더 적은 CI 노드나 워커를 선호하며, 그다음으로 더 낮은 예상 벽시계 시간, 그다음으로 워커 간의 더 낮은 불균형을 선호합니다.

`ddtest` 는 `--ci-job-overhead` 설정을 사용하여 항상 최대 CI 노드 수를 선택하지 않도록 합니다. 기본값인 `25s`를 사용하면 `ddtest`은 해당 노드가 최소 25초의 벽시계 시간을 절약할 것으로 예상될 때만 다른 CI 노드를 추가합니다.

CI 노드를 더 적게 사용하려면 `--ci-job-overhead`를 높이세요. 더 빠른 벽시계 시간을 선호하면 이를 낮추세요. `25s`, `1m` 또는 `1500ms`와 같은 지속 시간 값을 사용하세요. `0s`를 설정하여 항상 테스트 실행을 `--max-parallelism` 노드로 분산하세요.

`--target-time`을 설정하여 `ddtest`이 해당 대상 이하의 분할을 먼저 평가하도록 합니다. `10m`, `300s` 또는 `1500ms`와 같은 지속 시간 값을 사용하세요. 기본값인 `0s`는 대상을 비활성화합니다.

대상을 충족하는 분할이 없으면 `ddtest`는 경고를 기록합니다. CI 작업 오버헤드는 무시하고 예상 벽시계 시간이 가장 낮은 분할을 선택합니다.

## 사용자 지정 테스트 명령{#custom-test-commands}

Ruby 프레임워크 및 Jest의 경우 `--command`를 사용하여 기본 테스트 명령을 재정의하세요.

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

`--command`를 사용할 때는 명령에 테스트 파일을 포함하지 마세요. `ddtest`는 명령에 테스트 파일과 프레임워크별 플래그를 추가합니다.

`--command`에 `--` 구분 기호를 포함하지 마세요. 명령에 `--`가 포함되어 있으면 `ddtest`는 경고를 내보내고 구분 기호와 그 뒤의 모든 내용을 제거합니다.

pytest의 경우 `ddtest`는 기본적으로 `python -m pytest <files>`를 실행합니다. 버전 1.7.0 이상에서는 `--command`를 설정하여 기본 명령을 재정의하세요. 예를 들어, `--command pytest`는 `python -m pytest` 대신 `pytest` 콘솔 스크립트를 실행합니다. `ddtest`는 `<command> <files>`를 실행하며 `-m pytest`를 추가하지 않습니다. 기본 명령을 변경하지 않고 추가 pytest 플래그를 전달하려면 `PYTEST_ADDOPTS`를 사용하세요. `ddtest`는 `PYTEST_ADDOPTS`에 `--ddtrace`를 자동으로 추가하므로 pytest 구성을 변경하지 않고도 `ddtrace` pytest 플러그인이 로드됩니다.

Jest의 경우, `ddtest`는 이미 존재하지 않는 한 워커 프로세스에 대해 `NODE_OPTIONS` 앞에 `-r dd-trace/ci/init`를 추가하므로, `ddtest`가 실행되는 프로젝트에 `dd-trace` 패키지가 설치되어 있어야 합니다.

## Pytest 테스트 검색 {#pytest-test-discovery}

pytest의 경우, `ddtest`는 다음 우선순위를 사용하여 테스트 파일을 검색합니다.

1. `--tests-location`(설정된 경우).
2. `pytest.ini`, `pyproject.toml`, `tox.ini`, 또는 `setup.cfg`에서 가져온 Pytest 구성(`testpaths` 및 `python_files` 사용).
3. 내장 패턴 `**/{test_*,*_test}.py`.

Pytest에는 RSpec의 패턴 플래그와 동일한 기능이 없으므로, `ddtest`는 구성된 pytest 명령을 호출하기 전에 패턴을 명시적 파일 경로로 변환합니다. 기본값은 `python -m pytest`입니다. 버전 1.7.0 이상에서는 `--command`가 이를 재정의합니다.

## Jest 테스트 검색 및 계측 {#jest-test-discovery-and-instrumentation}

Jest의 경우, `ddtest`는 Jest 자체의 `--listTests` 명령을 사용하여 테스트 파일을 검색합니다. 다음 우선순위를 사용합니다.

1. `--command`(설정된 경우), `--listTests`가 추가됩니다.
2. 로컬 실행 파일 `node_modules/.bin/jest`(존재하는 경우).
3. `npx jest`.

Jest는 `--listTests`에 대해 자체 구성 및 기본 테스트 일치를 사용합니다. `--tests-location`이 설정되면 `ddtest`는 검색 후 Jest가 반환한 파일 목록을 필터링합니다. 이는 `--tests-location`을 Jest의 `--testMatch`로 전달하지 않습니다.

Jest 지원은 스위트 수준의 Test Impact Analysis를 사용합니다. `ddtest`는 개별 Jest 테스트가 아닌 테스트 파일 및 스위트와 함께 작동하며 `--runTestsByPath`로 선택된 파일을 실행합니다.

실행 중에 `NODE_OPTIONS`가 이미 `dd-trace/ci/init`를 로드하지 않는 한, `ddtest`는 워커 프로세스에 대해 `NODE_OPTIONS` 앞에 `-r dd-trace/ci/init`를 추가합니다.

## 워커 환경 변수{#worker-environment-variables}

`--worker-env`를 사용하여 각 워커의 환경 변수를 설정하세요. 이 값은 `{{nodeIndex}}` and `{{workerIndex}}` 자리 표시자를 지원합니다.

`{{nodeIndex}}`
: `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE에서 가져온 CI 노드입니다. `. In single-node runs, the value is `0`.

`{{workerIndex}}`
: 현재 CI 노드 내의 워커 프로세스 인덱스이며, `0`부터 시작합니다.

형식은 `ENV=value`입니다. 여러 값을 `;`으로 구분하세요.

예를 들어, 각 워커에 고유한 테스트 데이터베이스를 할당합니다.

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest`는 변수가 설정되지 않은 경우 각 워커에 대해 `DD_TEST_SESSION_NAME`을 `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>`로 자동 설정합니다. `DD_TEST_SESSION_NAME`을 설정하면 `ddtest`는 이를 유지하고 각 워커를 시작하기 전에 동일한 자리 표시자를 확장합니다.

## 런타임 태그 안정화{#stabilize-runtime-tags}

Test Impact Analysis 건너뛰기 가능 테스트는 OS, 아키텍처, Ruby 버전과 같은 런타임 태그로 범위가 지정됩니다. `ddtest`에서 0개의 테스트를 건너뛰었다고 자주 보고하는 경우, CI 러너 간에 런타임 태그가 다른지 확인하세요. 예를 들어, AWS 러너는 작업마다 다른 `os.version` 값을 보고할 수 있습니다.

일치를 안정적으로 만들려면 `ddtest` 및 워커 프로세스 모두에서 사용하는 환경에 고정 런타임 태그를 설정하세요.

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
ddtest run
{{< /code-block >}}

`ddtest`는 러너별 `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` 환경 변수 및 `--runtime-tags` CLI 플래그도 허용합니다.

## 플랜 아티팩트 {#plan-artifacts}

`ddtest plan`은 현재 작업 디렉터리에 `.testoptimization/` 디렉터리를 작성합니다. 이 디렉터리를 플랜 작업에서 `ddtest run`을 실행하거나 `ddtest` 플랜 파일 목록을 사용하는 모든 CI 작업으로 복사하세요.

대부분의 통합은 `.testoptimization/`을 생성된 아티팩트로 처리해야 합니다. 외부 소비자를 위한 안정적인 파일은 다음과 같습니다.

| 파일 | 설명 |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | 플랜 레이아웃 버전입니다. |
| `.testoptimization/runner/test-files.txt` | 실행할 테스트 파일의 줄바꿈으로 구분된 목록입니다. 각 파일에는 건너뛰지 않은 테스트가 하나 이상 포함되어 있습니다. |
| `.testoptimization/runner/parallel-runners.txt` | 선택된 CI 노드 수 또는 워커 수입니다. |
| `.testoptimization/runner/skippable-percentage.txt` | Test Impact Analysis에 의해 건너뛴 테스트 시간의 백분율입니다. |
| `.testoptimization/runner/tests-split/runner-N` | 인덱스 `N`에 할당된 파일의 줄바꿈으로 구분된 목록입니다. |
| `.testoptimization/github/config` | GitHub Actions 매트릭스 출력으로, `ddtest`가 GitHub Actions를 탐지할 때 작성됩니다. |

`.testoptimization/runner/cache/`, `.testoptimization/tests-discovery/` 및 `.testoptimization/cache/http/*.json` 아래의 파일은 구현 세부 사항입니다. 문제 해결을 위해서만 사용하세요.

## 다른 테스트 러너와 함께 플랜 사용 {#use-a-plan-with-another-test-runner}

실행 가능한 테스트 파일을 `ddtest`가 선택하되, 실제 실행은 다른 러너가 수행하도록 하려면 `ddtest` 플랜을 사용하세요.

다른 러너가 사용할 수 있는 `test-files.txt` 및 러너별 `tests-split/runner-N` 파일에 대해서는 [ 플랜 아티팩트](#plan-artifacts)를 참조하세요.

예를 들어, Knapsack Pro와 함께 `.testoptimization/runner/test-files.txt`를 사용합니다.

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

pytest의 경우, `PYTEST_ADDOPTS`를 사용하여 `ddtrace` 플러그인을 활성화하고 파일 목록을 `python -m pytest`로 전달합니다.

{{< code-block lang="bash" >}}
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }--ddtrace"
if [ -s .testoptimization/runner/test-files.txt ]; then
  xargs python -m pytest < .testoptimization/runner/test-files.txt
fi
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}