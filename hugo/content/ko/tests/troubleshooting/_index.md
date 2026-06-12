---
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: CI 테스트 모니터링 방법 알아보기
title: 테스트 가시성 트러블슈팅
---

## 개요

이 페이지는 테스트 가시성 관련 문제를 트러블슈팅하기 위한 정보를 제공합니다. 추가 지원이 필요한 경우 [Datadog 지원팀][2]에 문의하세요.

## 테스트가 계측되었지만 Datadog에 데이터가 표시되지 않습니다.

1. 계측 중인 언어의 [**테스트**][3] 페이지로 이동한 다음, **호환성** 섹션에서 사용 중인 테스트 프레임워크가 지원되는지 확인합니다.
2. [**Test Runs**][4] 섹션에 테스트 결과가 있는지 확인합니다. 결과는 표시되지만 [**Tests**][5] 섹션에 표시되지 않는다면 Git 정보가 누락된 것입니다. 이 문제를 해결하려면 [Test Runs에는 데이터가 표시되나 Tests에는 표시되지 않음](#data-appears-in-test-runs-but-not-tests)을 참조하세요.
3. Datadog Agent를 통해 데이터를 보고하는 경우 테스트가 실행되는 호스트에서 데이터가 실행되고 있는지(`localhost:8126`에서 액세스 가능) 확인해야 합니다. 또는, 다른 호스트 이름이나 포트에서 액세스할 수 있는 경우 `DD_AGENT_HOST`에 설정된 적절한 Agent 호스트 이름과 `DD_TRACE_AGENT_PORT` 환경 변수에 있는 적절한 포트를 사용하여 테스트를 실행해야 합니다. 트레이서에서 [디버깅 모드][6]를 활성화하여 Agent에 연결할 수 있는지 확인할 수 있습니다.
4. 그래도 결과가 나타나지 않는다면, [지원팀에 문의][2]하세요.

## `datadog-ci`와 함께 JUnit 테스트 보고서를 업로드하고 있지만 일부 또는 모든 테스트가 누락됩니다.
`datadog-ci` CLI를 사용하여 JUnit 테스트 보고서 파일을 업로드하는 경우 테스트가 표시되지 않으면 보고서가 올바르지 않은 것으로 간주되어 테스트가 폐기될 수 있습니다.

다음과 같은 경우 JUnit 테스트 보고서가 올바르지 않습니다:
* 보고된 테스트의 타임스탬프가 보고서가 업로드된 시점보다 **71시간** 이전입니다.
* 이름이 없는 테스트 스위트.

## 데이터가 테스트 실행에는 표시되지만 테스트에는 표시되지 않음.

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

### 총 테스트 시간이 비어 있습니다.
총 테스트 시간이 표시되지 않는다면 테스트 스위트(suite) 레벨 표시가 활성화되어 있지 않을 가능성이 높습니다. 사용 중인 언어가 [지원되는 기능][14]에서 테스트 스위트 수준 가시성을 지원하는지 확인하세요. 테스트 스위트 레벨 가시성이 지원되는 경우 트레이서를 최신 버전으로 업데이트하세요.

트레이서 버전을 업데이트한 후에도 총 시간이 표시되지 않으면 [Datadog 지원팀][2]에 문의하여 도움을 받으세요.

### 총 테스트 시간이 예상과 다릅니다.

#### 총 시간 계산 방법
총 시간은 최대 테스트 세션 기간의 합으로 정의됩니다.

1. 테스트 세션 지문별로 그룹화된 테스트 세션의 최대 지속 시간이 계산됩니다.
2. 최대 테스트 세션 시간이 합산됩니다.

## 테스트 상태 번호가 예상과 다름

테스트 상태 번호는 수집된 고유한 테스트를 기반으로 계산됩니다. 테스트의 고유성은 테스트의 스위트와 이름뿐만 아니라 테스트 파라미터 및 테스트 설정에 의해서도 정의됩니다.

### 숫자가 예상보다 낮음

숫자가 예상보다 낮으면 테스트 데이터를 수집하는 데 사용하는 라이브러리나 도구에서 테스트 파라미터 및/또는 일부 테스트 설정을 수집할 수 없습니다.

1. JUnit 테스트 보고서 파일을 업로드하는 경우:
    1. 다른 환경 설정에서 동일한 테스트를 실행하는 경우 [업로드 중에 해당 설정 태그를 설정하고 있는지 확인하세요][10].
    2. 매개 변수화된 테스트를 실행 중인 경우 JUnit 보고서에 해당 정보가 없을 가능성이 높습니다. [네이티브 라이브러리를 사용하여 테스트 데이터를 보고하세요][3].
2. 여전히 예상 결과가 나타나지 않으면 [Datadog 지원팀에 문의하시기 바랍니다][2].

### 통과/실패/건너뛴 숫자가 예상과 다름

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

## 기본 브랜치가 올바르지 않음

### 제품에 미치는 영향

기본 브랜치는 다음과 같은 제품의 일부 기능을 구동하는 데 사용됩니다:

- 테스트 페이지의 기본 브랜치 목록: 이 목록에는 기본 브랜치만 표시됩니다. 잘못된 기본 브랜치를 설정하면 기본 브랜치 목록에서 데이터가 누락되거나 잘못될 수 있습니다.

- 새로운 비정상적 테스트: 현재 기본 브랜치에서 비정상으로 분류되지 않은 테스트입니다. 기본 브랜치가 제대로 설정되지 않은 경우 새로 감지된 비정상적 테스트 수가 잘못되었을 수 있습니다.

- 파이프라인 목록: 파이프라인 목록에는 기본 브랜치만 표시됩니다. 잘못된 기본 브랜치를 설정하면 파이프라인 목록에서 데이터가 누락되거나 잘못될 수 있습니다.

### 기본 브랜치를 수정하는 방법

관리자 권한이 있는 경우 [리포지토리 설정 페이지][11]에서 업데이트할 수 있습니다.

## 특정 테스트 사례에 대한 실행 기록은 사용할 수 없습니다.

동일한 문제에 대한 기타 증상들은 다음을 포함합니다.
- 테스트 사례가 비정상적인 경우에도 비정상적(flaky) 사례로 분류되지 않습니다. 
- 테스트 사례는 [지능형 테스트 실행기][12]로 건너뛸 수 없습니다.

[테스트 사례 설정][13]이 불안정한 이유는 테스트 파라미터 중 하나 이상이 비정상적(예: 현재 날짜 또는 임의의 숫자를 포함)이기 때문일 가능성이 높습니다.

이 문제를 해결하는 가장 좋은 방법은 테스트 실행 간에 파라미터 테스트가 동일한지 확인하는 것입니다.

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
[11]: https://app.datadoghq.com/source-code/repositories
[12]: /ko/continuous_integration/intelligent_test_runner/
[13]: /ko/tests/#parameterized-test-configurations
[14]: /ko/tests/#supported-features