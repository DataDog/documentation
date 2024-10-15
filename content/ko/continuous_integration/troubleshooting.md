---
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: CI 테스트 모니터링 방법 알아보기
- link: /continuous_integration/pipelines
  tag: 설명서
  text: CI 파이프라인 모니터링 방법 알아보기
- link: /continuous_integration/intelligent_test_runner
  tag: 설명서
  text: Intelligent Test Runner에 대해 알아보기
title: CI Visibility 트러블슈팅
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

이 페이지는 CI Visibility 문제 해결에 도움이 되는 정보를 제공합니다. 추가적인 도움이 필요하시면 [Datadog 지원팀][2]에 문의하세요.

## CI 테스트

### 테스트는 계측되지만 Datadog에 데이터가 표시되지 않습니다

1. 계측 중인 언어의 [**Tests**][3] 페이지로 이동하여 사용 중인 테스트 프레임워크가 **Compatibility** 섹션에서 지원되는지 확인합니다.
2. [**Test Runs**][4] 섹션에 테스트 결과가 있는지 확인합니다. 결과는 표시되지만 [**Tests**][5] 섹션에 표시되지 않는다면 Git 정보가 누락된 것입니다. 이 문제를 해결하려면 [Test Runs에는 데이터가 표시되나 Tests에는 표시되지 않음](#data-appears-in-test-runs-but-not-tests)을 참조하세요.
3. Datadog Agent를 통해 데이터를 보고하는 경우 테스트가 실행되는 호스트에서 데이터가 실행되고 있는지(`localhost:8126`에서 액세스 가능) 확인해야 합니다. 또는, 다른 호스트 이름이나 포트에서 액세스할 수 있는 경우 `DD_AGENT_HOST`에 설정된 적절한 Agent 호스트 이름과 `DD_TRACE_AGENT_PORT` 환경 변수에 있는 적절한 포트를 사용하여 테스트를 실행해야 합니다. 트레이서에서 [디버깅 모드][6]를 활성화하여 Agent에 연결할 수 있는지 확인할 수 있습니다.
4. 그래도 결과가 나타나지 않는다면, [지원팀에 문의][2]하세요.

### `datadog-ci`와 함께 JUnit 테스트 보고서를 업로드하고 있지만 일부 또는 모든 테스트가 누락됩니다.
`datadog-ci` CLI를 사용하여 JUnit 테스트 보고서 파일을 업로드하는 경우 테스트가 표시되지 않으면 보고서가 올바르지 않은 것으로 간주되어 테스트가 폐기될 수 있습니다.

다음과 같은 경우 JUnit 테스트 보고서가 올바르지 않습니다:
* 보고된 테스트의 타임스탬프가 보고서 업로드 시점보다 **18시간** 이전인 테스트.
* 이름이 없는 테스트 스위트.

### 데이터가 테스트 실행에는 표시되지만 테스트에는 표시되지 않음.

**Test Runs** 탭에 테스트 결과 데이터가 표시되지만 **Test** 탭에 표시되지 않으면 Git 메타데이터 (리포지토리, 커밋 또는 브랜치)가 누락되었을 수 있습니다. 이를 확인하려면 [**Test Runs**][4] 섹션에서 테스트 실행을 열고 `git.repository_url`, `git.commit.sha` 또는 `git.branch`가 없는지 확인합니다. 이러한 태그가 입력되지 않으면 [**Tests**][5] 섹션에 아무것도 표시되지 않습니다.

1. 트레이서는 먼저 CI 공급자가 설정한 환경 변수가 있으면 이를 사용하여 Git 정보를 수집합니다. 지원되는 각 CI 공급자에 대해 트레이서가 읽으려는 환경 변수 목록은 [컨테이너 내에서 테스트 실행][7]을 참조하세요. 이렇게 하면 최소한 리포지토리, 커밋 해시 및 브랜치 정보가 입력됩니다.
2. 그 다음, 로컬 `.git` 폴더가 있으면 `git` 명령을 실행하여 Git 메타데이터를 가져옵니다. 이렇게 하면 커밋 메시지, 작성자 및 커미터 정보를 포함한 모든 Git 메타데이터 필드가 채워집니다. `.git` 폴더가 있고 `git` 바이너리가 설치되어 있으며 `$PATH`에 있는지 확인하세요. 이 정보는 이전 단계에서 발견되지 않은 속성을 입력하는 데 사용됩니다.
3. 이전 단계에서 감지한 정보를 재정의하는 환경 변수를 사용하여 Git 정보를 수동으로 제공할 수도 있습니다.

   Git 정보를 제공하기 위해 지원되는 환경 변수는 다음과 같습니다:

   `DD_GIT_REPOSITORY_URL` **(필수)**
   : 코드가 저장된 리포지토리의 URL입니다. HTTP 및 SSH URL 모두 지원됩니다.<br/>
   **예**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_COMMIT_SHA` **(필수)**
   : 전체 (40자 길이의 SHA1) 커밋 해시.<br/>
   **예**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

   `DD_GIT_BRANCH`
   : 테스트 중인 Git 브랜치입니다. 대신 태그 정보를 제공하는 경우 비워 둡니다.<br/>
   **예**: `develop`

   `DD_GIT_TAG`
   : 테스트 중인 Git 태그입니다(해당되는 경우). 대신 브랜치 정보를 제공하는 경우 비워 둡니다.<br/>
   **예**: `1.0.1`

   `DD_GIT_COMMIT_MESSAGE`
   : 커밋 메시지.<br/>
   **예**: `Set release number`

   `DD_GIT_COMMIT_AUTHOR_NAME`
   : 커밋 작성자 이름. <br/>
   **예**: `John Smith`

   `DD_GIT_COMMIT_AUTHOR_EMAIL`
   : 커밋 작성자 이메일.<br/>
   **예**: `john@example.com`

   `DD_GIT_COMMIT_AUTHOR_DATE`
   : 커밋 작성자 날짜 (ISO 8601 형식).<br/>
   **예**: `2021-03-12T16:00:28Z`

   `DD_GIT_COMMIT_COMMITTER_NAME`
   : 커밋의 커미터 이름.<br/>
   **예**: `Jane Smith`

   `DD_GIT_COMMIT_COMMITTER_EMAIL`
   : 커밋의 커미터 이메일 주소.<br/>
   **예**: `jane@example.com`

   `DD_GIT_COMMIT_COMMITTER_DATE`
   : 커밋의 커미터 날짜 (ISO 8601 형식).<br/>
   **예**: `2021-03-12T16:00:28Z`

4. CI 공급자 환경 변수가 발견되지 않으면 Git 메타데이터 없이 테스트 결과가 전송됩니다.

### 테스트 월 타임이 비어 있음

테스트 월 타임이 표시되지 않으면 CI 제공자 메타데이터가 누락되었을 수 있습니다. 이를 확인하려면 [**Test Runs**][4] 섹션에서 테스트 실행을 열고 `ci.pipeline.id`, `ci.pipeline.name`, `ci.pipeline.number` 또는 `ci.job.url`태그가 누락되었는지 확인합니다. 이러한 태그가 입력되지 않으면 월 타임 열에 아무것도 표시되지 않습니다.

1. 트레이서는 CI 공급자가 설정한 환경 변수를 사용하여 이 정보를 수집합니다. 지원되는 각 CI 제공자에 대해 트레이서가 읽으려는 환경 변수 목록은 [컨테이너 내에서 테스트 실행][7]을 참조하세요. 환경 변수에 예상 값이 설정되어 있는지 확인하세요.
2. 지원되는 CI 공급자에서 테스트가 실행되고 있는지 확인하세요. 지원되는 CI 공급자 목록은 [컨테이너 내에서 테스트 실행][7]을 참조하세요. 이러한 CI 공급자만 정보를 추출하여 CI 정보로 테스트 메타데이터를 보강할 수 있습니다.
3. 여전히 월 타임이 표시되지 않으면 [Datadog 지원팀][2]에 문의하시기 바랍니다.

### 테스트 월 타임이 예상과 다름

#### 월 타임 계산 방법
월 타임은 지정된 파이프라인에 대한 첫 번째 테스트 시작 시간과 마지막 테스트 종료 시간 사이의 시간 차이로 정의됩니다.

이 작업은 다음 알고리즘을 사용하여 수행됩니다:

1. CI 정보를 기반으로 해시를 계산하여 테스트를 그룹화합니다.
    1. 테스트가 `ci.job.url`를 포함하는 경우 이 태그를 사용하여 해시를 계산합니다.
    2. 테스트가 `ci.job.url`를 포함하지 않으면 `ci.pipeline.id` +`ci.pipeline.name` +`ci.pipeline.number`를 사용하여 해시를 계산합니다.
2. 계산된 월 타임은 지정된 해시와 연결됩니다. **참고**: 테스트를 실행하는 작업이 여러 개인 경우 각 작업에 대해 월 타임이 계산되며, 계산된 모든 월 타임의 최대값이 표시됩니다.

#### 월 타임 계산에 발생할 수 있는 문제
Ruby의 [timecop][8]이나 Python의 [FreezeGun][9]과 같이 시간에 따라 달라지는 코드를 테스트하기 위해 라이브러리를 사용하는 경우, 테스트 타임스탬프가 잘못되어 월 타임이 계산되었을 수 있습니다. 이 경우 테스트를 완료하기 전에 시간에 대한 수정 사항이 롤백되었는지 확인하세요.

### 테스트 상태 번호가 예상과 다름

테스트 상태 번호는 수집된 고유한 테스트를 기반으로 계산됩니다. 테스트의 고유성은 테스트의 스위트와 이름뿐만 아니라 테스트 파라미터 및 테스트 설정에 의해서도 정의됩니다.

#### 숫자가 예상보다 낮음

숫자가 예상보다 낮으면 테스트 데이터를 수집하는 데 사용하는 라이브러리나 도구에서 테스트 파라미터 및/또는 일부 테스트 설정을 수집할 수 없습니다.

1. JUnit 테스트 보고서 파일을 업로드하는 경우:
    1. 다른 환경 설정에서 동일한 테스트를 실행하는 경우 [업로드 중에 해당 설정 태그를 설정하고 있는지 확인하세요][10].
    2. 매개 변수화된 테스트를 실행 중인 경우 JUnit 보고서에 해당 정보가 없을 가능성이 높습니다. [네이티브 라이브러리를 사용하여 테스트 데이터를 보고하세요][3].
2. 여전히 예상 결과가 나타나지 않으면 [Datadog 지원팀에 문의하시기 바랍니다][2].

#### 통과/실패/건너뛴 숫자가 예상과 다름

동일한 커밋에 대한 동일한 테스트를 다른 상태에서 여러 번 수집하는 경우 집계 결과는 아래 표의 알고리즘을 따릅니다:

| **테스트 상태 - 첫 번째 시도** | **테스트 상태 - 재시도 #1** | **결과** |
|-----------------------------|----------------------------|------------|
| `Passed`                    | `Passed`                   | `Passed`   |
| `Passed`                    | `Failed`                   | `Passed`   |
| `Passed`                    | `Skipped`                  | `Passed`   |
| `Failed`                    | `Passed`                   | `Passed`   |
| `Failed`                    | `Failed`                   | `Failed`   |
| `Failed`                    | `Skipped`                  | `Failed`   |
| `Skipped`                   | `Passed`                   | `Passed`   |
| `Skipped`                   | `Failed`                   | `Failed`   |
| `Skipped`                   | `Skipped`                  | `Skipped`  |

### 기본 브랜치가 올바르지 않음

#### 제품에 미치는 영향

기본 브랜치는 다음과 같은 제품의 일부 기능을 구동하는 데 사용됩니다:

- 테스트 페이지의 기본 브랜치 목록: 이 목록에는 기본 브랜치만 표시됩니다. 잘못된 기본 브랜치를 설정하면 기본 브랜치 목록에서 데이터가 누락되거나 잘못될 수 있습니다.

- 기본값이 아닌 브랜치의 월 타임 비교: Tests 페이지의 브랜치 보기에서 **VS Default** 열은 현재 브랜치의 월 타임과 기본 브랜치의 월 타임을 비교하여 계산됩니다.

- 새로운 비정상적 테스트: 현재 기본 브랜치에서 비정상으로 분류되지 않은 테스트입니다. 기본 브랜치가 제대로 설정되지 않은 경우 새로 감지된 비정상적 테스트 수가 잘못되었을 수 있습니다.

- 파이프라인 목록: 파이프라인 목록에는 기본 브랜치만 표시됩니다. 잘못된 기본 브랜치를 설정하면 파이프라인 목록에서 데이터가 누락되거나 잘못될 수 있습니다.

#### 기본 브랜치를 수정하는 방법

관리자 권한이 있는 경우 [리포지토리 설정 페이지][11]에서 업데이트할 수 있습니다.

## CI 파이프라인

### Jenkins 인스턴스가 계측되나, Datadog에는 데이터가 표시되지 않음

1. 하나 이상의 파이프라인 실행이 완료되었는지 확인합니다. 파이프라인 실행 정보는 파이프라인이 완료된 후에만 전송됩니다.
2. Datadog Agent 호스트가 올바르게 설정되어 있고 Datadog 플러그인에서 연결할 수 있는지 확인합니다. Jenkins 플러그인 설정 UI에서 **Check connectivity with the Datadog Agent** 버튼을 클릭하여 연결을 테스트할 수 있습니다.
3. Jenkins 로그에 오류가 있는지 확인합니다. Datadog 플러그인에 대해 [`logging.properties` 파일을 생성하고][1] `org.datadog.level = ALL` 행을 추가하여 디버그 수준 로그를 실행할 수 있습니다.

### 파이프라인을 찾을 수 없음

진행 중인 파이프라인에서 오는 불완전한 데이터를 클릭하면 "Pipeline not found" 메시지가 표시됩니다. 단계, 작업 또는 커스텀 명령에 대해 데이터가 점진적으로 수신됩니다. 파이프라인이 완료될 때까지 기다렸다가 다시 시도하세요.

## Intelligent Test Runner

### Intelligent Test Runner가 작동하지 않음

[Intelligent Test Runner][12]는 과거 테스트 실행에 대한 코드 적용 범위 정보와 함께 커밋 기록을 분석하여 실행해야 하는 테스트와 안전하게 건너뛸 수 있는 테스트를 결정합니다. Intelligent Test Runner가 올바르게 작동하려면 최소한의 정보가 있어야 합니다:

- 리포지토리에는 지난 한 달 동안 최소 2건의 커밋 기록이 있어야 합니다.
- Intelligent Test Runner가 활성화된 테스트 실행에서 발생하는 과거 커밋에서 테스트 코드 범위를 수집해야 합니다.
- git 클론에는 커밋 및 트리 기록이 포함되어야 합니다. Intelligent Test Runner는 히스토리 (`git clone --depth=0`)를 포함하지 않는 git 클론을 덜 얕게 만드려고 하지만 이전 버전의 git에서는 작동하지 않을 수 있습니다. CI 작업에서 얕은 git 클론을 사용하는 경우 `git clone --filter=blob:none` 명령을 사용하여 부분적인 git 클론을 사용하도록 변경할 수 있습니다.

이러한 제한으로 인해 Intelligent Test Runner를 처음 활성화할 때 건너뛴 테스트를 볼 수 없으며 코드 적용 범위가 자동으로 수집되므로 테스트 실행 시간이 평소보다 느릴 수 있습니다.

Intelligent Test Runner는 지난 한 달 동안의 커밋 기록과 테스트 코드 적용 범위 정보만 고려합니다. 또한 커밋이 이루어진 후 일주일 이상 지나 생성된 코드 적용 범위 정보는 고려하지 않습니다.

[GitHub의 UI에서 포크를 동기화][13]하면 생성된 동기화 커밋에 대해 모든 테스트가 실행된다는 제한이 있습니다.

### Intelligent Test Runner가 테스트를 잘못 건너뛰었음

Intelligent Test Runner는 코드 범위를 기반으로 테스트 영향 분석을 수행하여 특정 커밋 또는 커밋 세트의 영향을 받는 테스트를 결정합니다. 이 전략은 대부분의 테스트에 효과적이지만 Intelligent Test Runner가 실행해야 하는 테스트를 건너뛸 수 있는 알려진 시나리오가 있습니다:

- 라이브러리 종속성 변경.
- 컴파일러 옵션 변경.
- 외부 서비스 변경.
- 데이터 구동 테스트에서 데이터 파일 변경.

이러한 경우를 포함하는 커밋을 작성하는 경우 Git 커밋 메시지의 아무 곳에나 `ITR:NoSkip`(대소문자를 구분하지 않음)을 추가하여 Intelligent Test Runner에서 테스트 건너뛰기를 강제로 비활성화할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /ko/help/
[3]: /ko/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /ko/tracing/troubleshooting/tracer_debug_logs
[7]: /ko/continuous_integration/tests/containers/
[8]: https://github.com/travisjeffery/timecop
[9]: https://github.com/spulec/freezegun
[10]: /ko/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[11]: https://app.datadoghq.com/ci/settings/repository
[12]: /ko/continuous_integration/intelligent_test_runner/
[13]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui