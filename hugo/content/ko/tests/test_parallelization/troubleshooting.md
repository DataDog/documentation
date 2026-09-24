---
description: 테스트 병렬화 계획 아티팩트, CI 노드 선택, 건너뛸 수 있는 테스트 및 사용자 지정 명령 문제를 해결합니다.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: 설명서
  text: 테스트 병렬화 설정
- link: /tests/test_parallelization/configuration/
  tag: 설명서
  text: 테스트 병렬화 구성
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: 테스트 병렬화 문제 해결
---
## 누락되었거나 잘못된 계획 아티팩트 {#missing-or-invalid-plan-artifacts}

`ddtest run --ci-node <N>`가 할당된 테스트 파일을 찾을 수 없는 경우, 계획 작업의 `.testoptimization/` 디렉터리를 테스트 작업에서 사용할 수 있는지 확인하세요.

테스트 작업은 다음 항목에 액세스할 수 있어야 합니다.

- `.testoptimization/manifest.txt`
- `.testoptimization/runner/parallel-runners.txt`
- `.testoptimization/runner/tests-split/runner-N`

GitHub Actions를 사용하는 경우 `include-hidden-files: true`를 사용하여 `.testoptimization/`을 업로드하세요. 그렇지 않으면 아티팩트 업로드 시 숨겨진 디렉터리가 생략될 수 있습니다.

## 예상치 못한 CI 노드 또는 작업자 수 {#unexpected-ci-node-or-worker-count}

`ddtest`가 예상보다 많거나 적은 CI 노드를 선택하는 경우 다음 설정을 검토하세요.

- `--min-parallelism`: `ddtest`가 고려하는 최소 CI 노드 또는 작업자 수입니다.
- `--max-parallelism`: `ddtest`가 고려하는 최대 CI 노드 또는 작업자 수입니다.
- `--ci-job-overhead`: 추가 CI 노드를 시작하는 데 필요한 예상 오버헤드입니다.
- `--target-time`: 선택한 분할의 목표 경과 시간입니다.

CI 노드 수를 줄이려면 `--ci-job-overhead` 값을 늘리세요. 실제 경과 시간을 더 짧게 하려면 이 값을 줄이세요.

## 건너뛸 수 있는 테스트가 적용되지 않음 {#no-skippable-tests-are-applied}

테스트 병렬화가 실행되기 전에 Test Impact Analysis가 테스트를 건너뛰지 않는 경우 다음을 확인하세요.

- 테스트 서비스에 대해 Test Impact Analysis가 활성화되어 있습니다.
- `git` 실행 파일이 존재하며, `.git` 폴더가 있는 Git 리포지토리에서 `ddtest`를 실행합니다.
- `ddtest plan`을 실행하는 작업과 테스트를 실행하는 작업이 동일한 `DD_SERVICE` 값을 사용합니다.
- `ddtest plan` 테스트와 동일한 OS 및 언어 런타임에서 실행됩니다.

자세한 내용은 [Test Impact Analysis 문제 해결][1]을 참조하세요.

## Minitest에서 선택한 파일이 실행되지 않음 {#minitest-does-not-run-the-selected-files}

Rails 외 Minitest 프로젝트의 경우, `ddtest`는 `bundle exec rake test`를 사용하고 `TEST_FILES` 환경 변수를 통해 선택한 파일을 전달합니다. `Rake::TestTask`는 `TEST_FILES`를 읽어야 합니다.

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## 사용자 지정 명령어에서 예상한 파일이 실행되지 않음 {#custom-commands-do-not-run-the-expected-files}

`--command`를 사용할 때는 명령어에 테스트 파일이나 `--` 구분 기호를 포함하지 마세요. `ddtest`가 선택한 테스트 파일을 직접 추가합니다.

잘못된 예:

{{< code-block lang="bash" >}}
bin/ddtest run --command "bundle exec rspec -- spec/models/"
{{< /code-block >}}

올바른 예:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec"
{{< /code-block >}}

Cucumber.js, Cypress, Mocha, Playwright 및 Vitest의 경우, 명령어는 선택한 프레임워크를 직접 호출해야 합니다. 패키지 관리자 래퍼가 지원됩니다. 예를 들면 다음과 같습니다.

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework playwright --command "pnpm exec playwright test --project chromium"
{{< /code-block >}}

사용자 지정 JavaScript 명령어가 예상치 못한 선택 항목을 실행하는 경우, `ddtest`가 대체하는 프레임워크 입력을 확인하세요.

- Cucumber.js 위치 경로 및 재실행 파일
- Cypress `--spec`
- Mocha에 구성된 `spec` 입력
- Playwright `--shard` 및 대화형 UI 옵션

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/test_impact_analysis/troubleshooting/