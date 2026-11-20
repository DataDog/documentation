---
description: 누락된 플랜, 예상치 못한 테스트 선택, 트레이서 오류 및 병렬 워커 실패를 진단하세요.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: 설명서
  text: 테스트 병렬화 설정
- link: /tests/test_parallelization/configuration/
  tag: 설명서
  text: 테스트 병렬화 설정 참조
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: 테스트 병렬화 문제 해결
---
`ddtest`에서 치명적인 오류를 `[error_code] message`로 보고합니다. 구체적인 원인은 CI 로그에서 메시지와 프레임워크 출력을 읽으세요.

## 누락되었거나 잘못된 플랜 아티팩트 {#missing-or-invalid-plan-artifacts}

`run_plan_load_failed` 또는 `run_ci_node_test_files_missing`과 같은 오류의 경우 다음과 같이 하세요.

1. 플랜 작업에서 새로운 플랜을 생성합니다.
2. 숨겨진 파일 및 캐시를 포함하여 **전체** `.testoptimization/` 디렉터리를 모든 테스트 작업으로 전송합니다.
3. 플랜과 동일한 프로젝트 디렉터리에서 실행합니다. `manifest.txt`의 위치가 다른 중첩된 디렉터리가 아니라 `.testoptimization/` 바로 안인지 확인합니다.
4. `runner/tests-split/`의 할당과 일치하는 0 기반 `--ci-node`를 전달합니다.

GitHub Actions에서는 업로드 시 `include-hidden-files: true`를 사용합니다. 아티팩트 경로는 셸 단계에서 다른 작업 디렉터리를 설정하더라도 작업 공간을 기준으로 합니다.

CircleCI에서는 접두사 폴백 키 없이 캐시를 저장하고 복원할 때 동일한 파이프라인별 키를 사용합니다. 수정 전용 키는 다른 실행의 플랜을 복원할 수 있습니다. 각 워커에서 독립적으로 대체 플랜을 생성하지 마세요.

## Ruby 또는 Python에서 플랜이 느림 {#planning-is-slow-for-ruby-or-python}

테스트 검색으로 인해 플랜이 느려지면 모음 수준 건너뛰기를 고려하세요. 플랜 작업과 테스트 작업 모두에 대해 CI 환경에서 `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`를 `suite`로 설정합니다.

이렇게 하면 개별 테스트 대신 테스트 파일을 찾아 검색 작업이 줄어듭니다. pytest의 경우 테스트 모듈 및 `conftest.py`의 수집과 가져오기가 방지됩니다. 단점은 건너뛰기 정확도가 떨어진다는 점입니다. Test Impact Analysis는 전체 모음을 건너뛰거나 실행하므로 더 많은 테스트가 실행될 수 있습니다.

자세한 내용은 [Ruby 및 Python의 모음 수준 건너뛰기](/tests/test_parallelization/best_practices/#use-suite-level-skipping-for-ruby) 및 [pytest 모음 모드](/tests/test_parallelization/configuration/#pytest-suite-mode)를 참조하세요.

## 예상치 못한 CI 노드 또는 워커 수 {#unexpected-ci-node-or-worker-count}

**플랜 작업**에서 다음 설정을 확인하세요.

- `--min-parallelism` 및 `--max-parallelism`은 개수를 제한합니다. 둘 다 기본값은 사용 가능한 물리적 CPU 수입니다.
- `--ci-job-overhead` 를 사용하면 러너가 증가함에 따라 더 적은 러너가 우선적으로 사용됩니다. 기본값은 `25s`입니다. `0s`를 사용하면 최대 병렬 처리가 강제되지 않으면서 페널티가 제거됩니다.
- `--target-time` 을 사용하면 지속 시간 목표가 설정됩니다. 목표를 충족하는 분할이 없으면 플래너는 제한 내에서 가장 빠른 예상 분할을 선택합니다.

CI 노드 모드에서 플랜 수는 CI 노드를 의미하며, `--ci-node-workers`가 노드당 프로세스 수를 제어합니다. `--ci-node`가 없는 단일 노드에서 플랜 수는 로컬 프로세스 수를 의미합니다. 하나의 노드를 선택하는 플랜도 유효합니다. [병렬 처리 튜닝](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget)을 참조하세요.

## 건너뛸 수 있는 테스트가 적용되지 않음 {#no-skippable-tests-are-applied}

WebdriverIO는 밸런싱을 지원하지만 Test Impact Analysis 건너뛰기는 지원하지 않습니다.

다음을 확인하세요.

- 테스트 서비스에 대해 Test Impact Analysis가 활성화되어 있습니다.
- Git이 설치되어 있고 `ddtest`가 의도한 Git 체크아웃 내부에서 실행됩니다.
- 플랜 및 실행 시 동일한 `DD_SERVICE`, 모음, 소스 수정, OS 및 언어 런타임이 사용됩니다.
- 런타임 태그가 건너뛸 수 있는 테스트를 계산하는 데 사용되는 환경과 일치합니다.

Ruby와 Python은 전체 검색이 실패하거나 Datadog SDK가 없는 경우 파일 검색으로 폴백될 수 있습니다. 성공적인 플랜이 테스트 수준 건너뛰기를 적용했다고 가정하기 전에 검색 로그를 확인하세요. `--strict-discovery`를 사용하면 전체 검색 실패가 치명적인 오류로 처리되지만 전체 검색이 취소된 경우에는 여전히 폴백됩니다.

[런타임 태그](/tests/test_parallelization/configuration/#stabilize-runtime-tags) 및 [Test Impact Analysis 문제 해결](/tests/test_impact_analysis/troubleshooting/)을 참조하세요.

## Pytest가 가져오기 파일 불일치 또는 누락된 테스트를 보고함 {#pytest-reports-an-import-file-mismatch-or-missing-tests}

기본 이름이 동일한 Python 테스트 파일은 pytest의 기본 가져오기 모드에서 충돌할 수 있습니다. `ddtest`를 사용하면 선택된 러너 수가 충분할 때 그러한 파일이 분리됩니다. 파일을 분산할 때는 그 밖의 조건에서는 실행 가능한 모든 파일이 유지되며, 단일 러너를 사용하는 경우를 포함해 기본 이름이 중복된 파일이 한 러너를 공유해야 할 경우 경고가 표시됩니다.

충돌을 해결하려면 다음 중 하나를 수행하세요.

- 테스트가 고유한 정규화된 모듈 이름을 갖도록 `__init__.py` 파일을 추가합니다.
- 충돌하는 파일의 이름을 변경합니다.
- pytest를 `--import-mode=importlib`로 설정합니다.

가져오기를 수정한 후에도 기본 이름 경고가 표시될 수 있습니다. 분할해도 분산 전에 테스트를 수집하는 전체 검색 중 발생하는 충돌이 방지되지 않습니다. 경고에 전체 검색 결과에서 누락된 파일이 나열되면 해당 파일을 조사하세요. 해당 파일은 예약되지 않습니다.

[pytest 모음 모드](/tests/test_parallelization/configuration/#pytest-suite-mode)에서는 일반적인 파일 전용 플랜에 `-k` 및 `-m`과 같은 선택기가 적용되지 않으며, pytest가 실행 중 이를 적용합니다. 강제 전체 검색 시에도 플랜 중 선택기가 적용됩니다. `ddtest`는 모음 모드 워커의 pytest 종료 코드 5를 성공으로 처리하므로 완전히 선택 해제된 실행도 성공할 수 있습니다. 테스트가 실행되지 않을 때는 선택기와 플래닝된 파일을 확인하세요. 테스트 모드는 pytest 워커의 종료 코드 5 실패를 유지하지만 빈 플랜은 pytest를 시작하지 않고도 성공할 수 있습니다.

## 플랜은 작동하지만 실행으로 트레이서를 로드할 수 없음 {#planning-works-but-execution-cannot-load-the-tracer}

플랜에는 Datadog SDK가 필요하지 않지만 실행에는 필요합니다. 모든 테스트 작업에서 [Test Optimization 설정](/tests/setup/)을 유지하세요.

Python의 경우 구성된 런처에서 사용되는 환경을 확인합니다. JavaScript의 경우 `NODE_OPTIONS`, `DD_TRACE_PACKAGE`, 프로젝트 로컬 `dd-trace` 패키지 순으로 기존의 'Datadog CI require' 설정을 확인합니다. 잘못된 명시적 프리로드를 수행하면 다른 설치로 폴백되는 대신 오류가 발생합니다.

프로젝트 로더 및 액션에서 제공하는 트레이서 경로를 유지하세요. 확인 오류를 우회하기 위해 `NODE_OPTIONS`를 덮어쓰거나 두 번째 트레이서를 추가하지 마세요. [JavaScript 계측](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation)을 참조하세요.

## Minitest에서 선택된 파일이 실행되지 않음 {#minitest-does-not-run-the-selected-files}

탐지된 Rails 애플리케이션에서 `ddtest`는 파일을 위치 인수로 전달합니다. 해당 Rails 기본값 또는 호환되는 `bin/rails test` 또는 `bundle exec rails test` 재정의를 사용하세요. `rake test` 재정의로 파일 전달 모드가 변경되지 않습니다. 명령을 전환하기 전에 사용자 지정 Rake 설정을 유지하세요.

Rails가 아닌 프로젝트의 경우, `ddtest`는 할당된 파일을 `TEST_FILES`를 통해 전달합니다. 일반 구성 후 기존 `Rake::TestTask`를 업데이트하세요.

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## 사용자 지정 명령으로 예상한 파일이 실행되지 않음 {#custom-commands-do-not-run-the-expected-files}

원래 명령, 구성 및 환경을 플랜 및 실행 단계 모두와 비교하세요. 필터, 시드, 리포터, 공유 설정 및 모음 경계를 유지하세요.

`--command` 는 지원되는 런처를 통해 선택된 프레임워크를 호출해야 합니다. 여러 프레임워크를 실행하는 셸 체인 및 스크립트는 지원되지 않습니다. Vitest는 명령 재정의를 완전히 거부합니다.

프레임워크별 확인 사항은 다음과 같습니다.

| 프레임워크 | 확인할 사항 |
| --- | --- |
| pytest | `--tests-location`은 파일과 일치해야 합니다. `PYTEST_ADDOPTS` 및 런처에서 사용하는 환경을 유지하세요. 여러 루트의 경우 `'{tests/unit,tests/integration}/**/test_*.py'`와 같은 중괄호 glob 하나를 사용하세요. |
| Jest | 기존 `--runInBand`를 포함하여 구성 및 선택 플래그를 유지하세요. |
| Mocha | 모든 모음 경로와 공유 `--file` 또는 `--require` 설정을 유지하세요. `ddtest`는 구성된 `spec` 입력을 실행 중 대체합니다. |
| Cucumber.js | 경로 및 재실행 파일은 검색 중 기능을 선택하지만 실행 시에는 할당된 기능 파일이 실행됩니다. 시나리오 범위를 유지하려면 태그 또는 이름 필터를 사용하세요. |
| Cypress | `ddtest`는 `--spec`을 소유합니다. `--tests-location` 또는 Cypress 구성에 하위 세트를 넣으세요. |
| Playwright | 패키지 디렉터리, 구성 및 선택된 프로젝트를 유지하세요. `ddtest` 분할을 사용할 때 네이티브 `--shard`를 제거하세요. |
| Vitest | `--command` 및 `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`를 제거하세요. 두 단계 모두에서 동일한 `--vitest-config`를 사용하고 명령 옵션을 해당 구성으로 이동하세요. |
| WebdriverIO | 구성 및 기능 선택을 유지하세요. 그룹화된 사양을 독립적인 파일로 분산할 수 없으며, 원격 클라우드 그리드는 지원되지 않습니다. [WebdriverIO 설정](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio)을 참조하세요. |

프레임워크 실행 파일 앞의 패키지 관리자 구분 기호가 유지됩니다. 프레임워크 자체의 `--`는 해당 옵션을 끝냅니다. `ddtest`는 검색 플래그를 그 앞에 삽입하고, 실행 중에는 그 뒤의 파일 선택을 대체합니다. [사용자 지정 테스트 명령](/tests/test_parallelization/configuration/#custom-test-commands)을 참조하세요.

## 테스트는 통과하지만 적용 범위 또는 보고서가 누락됨 {#tests-pass-but-coverage-or-reports-are-missing}

종료 상태뿐만 아니라 예상 모음 및 프로젝트 선택을 확인하세요. 원래 리포터, 출력 경로, 적용 범위 공급자 및 임계값, 업로드 단계를 유지하세요. 동시 워커에 고유한 출력 경로 또는 아티팩트 이름을 부여하세요.

Vitest의 Node.js API는 패키지 스크립트 준비 또는 npm 수명 주기 명령을 실행하지 않습니다. 해당 단계를 `ddtest` 앞으로 이동하고 선택된 구성에서 보고 및 적용 범위 옵션을 유지하세요. [Vitest 구성](/tests/test_parallelization/best_practices/#vitest)을 참조하세요.

## 테스트가 병렬 실행 시에만 실패함 {#tests-fail-only-in-parallel}

공유 데이터베이스, 포트, 임시 파일, 브라우저 디스플레이 및 보고서 경로를 확인하세요. 각 실행 작업에서 애플리케이션 시작 및 준비 상태 검사를 유지하세요. 조사하는 동안 [워커 격리](/tests/test_parallelization/best_practices/#isolate-workers)를 사용하고 병렬 처리 수준을 낮추세요.

`ddtest` 할당을 다른 전체 모음 분할기와 결합하지 마세요. 각 워커가 해당 할당을 실행하는지, 원래의 전체 모음 명령이 더 이상 이와 동시에 실행되지 않는지 확인하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}