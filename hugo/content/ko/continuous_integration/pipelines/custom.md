---
aliases:
- /ko/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: 문서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/guides/pipeline_data_model
  tag: 문서
  text: 파이프라인 데이터 모델 및 실행 유형에 대해 알아보기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결
title: Datadog에 사용자 지정 파이프라인 전송
---
## 개요 {#overview}

CI 공급자가 지원되지 않는 경우 [공개 API 엔드포인트][1]를 사용하여 HTTP를 통해 사용자 지정 파이프라인을 전송할 수 있습니다. 파이프라인 실행이 모델링되는 방법에 대한 자세한 내용은 [파이프라인 데이터 모델 및 실행 유형][2]을 참조하세요.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [로그 분석][21] | 로그 분석 | 관련 로그에 LLM 모델을 사용하여 실패한 CI 작업의 근본 원인을 분석합니다. |
| 로그 상관관계 | 로그 상관관계 | 파이프라인 및 작업 스팬을 로그와 연계합니다. [로그 스토리지](#logs-storage)가 필요합니다. |
| [실행 중인 파이프라인][15] | 실행 중인 파이프라인 | 실행 중인 파이프라인 실행을 조회합니다. |
| [런타임 시][6] [사용자 지정 태그 및 측정값][5] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][7]을 구성합니다. |
| [수동 단계][8] | 수동 단계 | 수동으로 트리거된 파이프라인을 조회합니다. |
| [파라미터][9] | 파라미터 | 파이프라인이 트리거될 때 사용자 지정 파라미터를 설정합니다. |
| [부분 재시도][10] | 부분 파이프라인 | 부분 재시도된 파이프라인 실행을 조회합니다. |
| [파이프라인 실패 원인][11] | 파이프라인 실패 원인 | 오류 메시지에서 파이프라인 실패 원인을 파악합니다. |
| [대기 시간][12] | 대기 시간 | 파이프라인 작업이 처리되기 전까지 대기열에 남아있는 시간을 조회합니다. |
| [임계 경로의 CI 작업 필터링][16] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 CI 작업별로 필터링합니다. |
| [실행 시간][17] | 실행 시간  | 파이프라인이 작업을 실행하는 데 걸린 시간을 조회합니다. |


## CI Visibility 구성 {#configure-ci-visibility}

파이프라인 이벤트를 프로그래밍 방식으로 Datadog에 전송하려면 [`DD_API_KEY`][14]가 올바르게 구성되어 있는지 확인하세요.

1. HTTP 요청 헤더를 설정합니다.

   - `DD-API-KEY`: [Datadog API 키][14].
   - `Content-Type`: `application/json`.

2. cURL 명령에 [파이프라인 실행][2]에 대한 정보를 입력하여 페이로드 본문을 준비합니다.

   | 파라미터 이름 | 설명 | 예제 값 |
   |---|---|---|
   | 고유 ID | 파이프라인 실행의 UUID입니다. ID는 부분 재시도를 포함하여 모든 재시도와 파이프라인 전체에서 고유해야 합니다. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | 이름 | 파이프라인 이름입니다. 빌드에 대한 모든 파이프라인 실행은 이름이 동일해야 합니다. | `Documentation Build` |
   | Git 리포지토리 | 파이프라인을 트리거한 Git 리포지토리 URL입니다. | `https://github.com/Datadog/documentation` |
   | 커밋 작성자 | 파이프라인을 트리거한 커밋 작성자의 이메일입니다. | `contributor@github.com` |
   | 커밋 SHA | 파이프라인을 트리거한 커밋 해시입니다. | `cf852e17dea14008ac83036430843a1c` |
   | 상태 | 파이프라인의 최종 상태입니다. 허용되는 열거형 값: `success`, `error`, `canceled`, `skipped`, `blocked` 또는 `running`. | `success` |
   | 부분 재시도 | 파이프라인이 이전 시도의 부분 재시도인지 여부입니다. 이 필드에는 불리언 값(`true` 또는 `false`)이 필요합니다. 부분 재시도는 원래 작업의 하위 집합만 실행하는 재시도를 의미합니다. | `false` |
   | 시작 | 파이프라인 실행이 시작된 시간입니다([대기 시간][12] 제외). 시간 형식은 RFC3339여야 합니다. | `2024-08-22T11:36:29-07:00` |
   | 종료 | 파이프라인 실행이 완료된 시간입니다. 시간 형식은 RFC3339여야 합니다. 종료 시간은 시작 시간으로부터 1년을 초과할 수 없습니다. | `2024-08-22T14:36:00-07:00` |
   | URL | CI 공급자 UI에서 파이프라인을 확인하기 위한 URL입니다. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   예를 들어, 이 페이로드는 Datadog에 CI 파이프라인 이벤트를 전송합니다:

   {{< code-block lang="bash" >}}
   curl -X POST "https://api.datadoghq.com/api/v2/ci/pipeline" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <YOUR_API_KEY>" \
   -d @- << EOF
   {
     "data": {
       "attributes": {
         "provider_name": "<YOUR_CI_PROVIDER>",
         "resource": {
           "level": "pipeline",
           "unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
           "name": "Documentation Build",
           "git": {
             "repository_url": "https://github.com/Datadog/documentation",
             "author_email": "contributor@github.com",
             "sha": "cf852e17dea14008ac83036430843a1c"
           },
           "status": "success",
           "start": "2024-08-22T11:36:29-07:00",
           "end": "2024-08-22T14:36:00-07:00",
           "partial_retry": false,
           "url": ""
         }
       },
       "type": "cipipeline_resource_request"
     }
   }
   EOF
   {{< /code-block >}}

3. 파이프라인 이벤트를 Datadog에 전송한 후 `stage`, `job`, `step`과 같은 추가 이벤트 유형을 통합할 수 있습니다. 자세한 내용은 [파이프라인 이벤트 전송 엔드포인트][1]를 참조하세요.

## 실행 중인 파이프라인 {#running-pipelines}

`status`가 `running`으로 설정된 상태로 전송된 파이프라인 이벤트는 최종 파이프라인 이벤트와 `unique_id`가 동일합니다. 실행 중인 파이프라인은 실행되는 동안 더 많은 정보를 추가하여 업데이트할 수 있습니다. 실행 중인 파이프라인은 다음 이벤트로 구성됩니다.

1. `status`가 `running`으로 설정된 최초 실행 중인 파이프라인 이벤트
2. 필요시 `unique_id`가 동일하고 `status`가 `running`으로 설정된 파이프라인을 더 많은 정보로 업데이트하는 실행 중인 파이프라인 이벤트 `N`개
3. `running` 상태가 **없으며** `unique_id`가 동일한 최종 파이프라인 이벤트.

**참고**: 필드가 업데이트될 때 UI에 표시되는 값이 항상 가장 최근 값은 아닐 수 있습니다. 예를 들어, 첫 번째 실행 중인 파이프라인에서 태그 `my_tag`가 `value1`로 설정된 후 `value2`로 업데이트되면 UI에 `value2` 대신 `value1`이 표시될 수 있습니다. 실행 중인 파이프라인은 기존 필드를 수정하는 대신 필드를 추가하여 업데이트하는 것이 좋습니다.

## 실행 중인 작업 {#running-jobs}

`status`를 `running`으로 설정하여 작업이 실행되는 동안 작업 이벤트 역시 보낼 수 있습니다. 실행 중인 파이프라인과 마찬가지로, 동일한 작업에 대한 모든 이벤트는 동일한 `id` 및 `pipeline_unique_id`를 공유합니다. 실행 중인 작업은 다음 이벤트로 구성됩니다.

1. `status`가 `running`으로 설정된 최초 실행 중인 작업 이벤트
2. 터미널 상태(예: `success` 또는 `error` 등)가 있고 `id` 및 `pipeline_unique_id`가 동일한 최종 작업 이벤트

실행 중인 작업 이벤트에는 `end` 시간이 필요하지 않습니다. 최종 작업 이벤트가 전송될 때 `end` 시간이 설정됩니다.

## 작업 로그 관리 {#manage-job-logs}

### 로그 분석 {#logs-analysis}

로그 분석은 LLM 모델을 사용하여 CI 공급자에서 제공되는 관련 로그를 기반으로 작업 실패의 근본 원인을 분류합니다.
자세한 설명은 [로그 분석 가이드][21]를 참조하세요.

로그 분석은 Datadog에서 기본적으로 활성화되어 있지만, 아래 설명된 대로 작업 로그 전달을 구성해야 합니다. 다음
[CI/CD Optimization Repository settings][22]에서 조직 또는 개별 리포지토리에 대해 로그 분석을 활성화하거나
비활성화할 수 있습니다.

사용자 지정 CI 작업에 대한 로그 라인을 [CI 작업 로그 수집 API][19]로 전송합니다. 그런 다음
[CI Visibility Pipelines API][1]를 통해 전송하는 파이프라인 및 작업 이벤트와 일치하는 식별자를 사용하세요. 각 로그 객체에는 다음과 같은 세 가지 필수 필드가 있습니다.

- `message`: 로그 라인의 비어 있지 않은 텍스트입니다.
- `pipeline_unique_id`: 파이프라인 이벤트의 `resource.unique_id` 및 작업 이벤트의
  `resource.pipeline_unique_id`와 일치해야 합니다.
- `job_id`: 작업 이벤트의 `resource.id`와 일치해야 합니다.

다른 모든 로그 필드는 선택 사항입니다. 제공되는 경우, `provider_name`은 파이프라인 이벤트의 `provider_name`과 일치해야 합니다.
Datadog은 파이프라인 이벤트와 로그 라인 둘 다에서 해당 필드가 생략된 경우 `custom`을 사용합니다.

작업이 실행되는 동안 로그 라인을 배치로 전송하거나 작업이 완료되면 배치를 전송합니다. 완료된 작업 이벤트를
제출하기 전에 모든 배치를 전송하는 것이 좋습니다. 해당 이벤트를 제출하면 Datadog에서는 새 라인 없는 상태에서
20초 후에 작업 로그를 닫습니다. 로그가 닫힌 후 수신된 줄은 작업의 로그 탭에 나타나지 않을 수 있습니다.

다음 요청은 작업에 대한 로그 한 줄을 보냅니다. 이 예제에서는 US1 사이트를 사용합니다. 필요시 `datadoghq.com`를
Datadog 사이트로 교체합니다.

{{< code-block lang="bash" >}}
curl -X POST "https://http-intake.logs.datadoghq.com/api/v2/cilogs" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "message": "Running go test ./...",
  "pipeline_unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
  "job_id": "job-456",
  "provider_name": "<YOUR_CI_PROVIDER>"
}
EOF
{{< /code-block >}}

요청 하나에는 로그 객체 하나 또는 최대 1,000개의 로그 객체 배열이 포함될 수 있으며, 압축되지 않은 본문 크기는 최대 5.1MiB입니다.
압축, 재시도 지침, 선택적 속성 및 작업별 제한에 대한 자세한 내용은 [CI 작업 로그 API 참조 보내기][19]를 참조하세요.

### 로그 스토리지 {#logs-storage}

[로그 분석](#logs-analysis)의 설명대로 작업 로그 전달을 설정한 후
[CI/CD Optimization Repository settings][22]로 이동하여 조직 또는 개별 리포지토리에 대해 로그 스토리지를 활성화합니다.
저장된 로그는 작업의 {{< ui >}}Logs{{< /ui >}} 탭에 표시됩니다.

로그 스토리지는 CI Visibility와 별도로 청구됩니다. [Log Management][20]에서 로그 보존, 제외 필터 및 인덱스를
구성합니다.

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

처리를 위해 파이프라인이 수락되면 [**CI Pipeline List**][3]와 [**Executions**][4] 페이지가 데이터로 채워집니다.

**CI Pipeline List** 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리하기][13]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /ko/continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ko/glossary/#custom-tag
[6]: /ko/glossary/#custom-measure
[7]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ko/glossary/#manual-step
[9]: /ko/glossary/#parameter
[10]: /ko/glossary/#partial-retry
[11]: /ko/glossary/#pipeline-failure
[12]: /ko/glossary/#queue-time
[13]: /ko/continuous_integration/search/#search-for-pipelines
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: /ko/glossary/#running-pipeline
[16]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[17]: /ko/glossary/#pipeline-execution-time
[19]: /ko/api/latest/ci-visibility-logs/send-ci-job-logs/
[20]: /ko/logs/
[21]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: https://app.datadoghq.com/ci/settings/ci-cd/repositories