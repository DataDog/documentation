---
aliases:
- /ko/dora_metrics/data_collected/
description: DORA Metrics 이벤트, 필드, 태그 및 배포 빈도, 변경 리드 타임, 변경 실패 분석을 위한 변경 리드 타임 단계에
  대해 알아보세요.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: 설명서
  text: DORA Metrics에 대해 알아보기
- link: /delivery_performance/dora_metrics/setup/
  tag: 설명서
  text: DORA Metrics용 데이터 소스 설정
- link: /metrics/
  tag: 설명서
  text: 메트릭에 대해 알아보기
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
title: 수집된 DORA Metrics 데이터
---
## 개요 {#overview}

DORA Metrics는 관련 필드와 태그가 포함된 이벤트를 생성합니다.

| 이벤트 유형 | 설명 |
| :--- | :--- |
|배포 | env, service 및 version 태그로 고유하게 식별되는 단일 코드 배포입니다.<br><br>배포는 [실패로 표시][17]할 수 있으며 배포 빈도, 변경 실패율 및 실패한 배포의 복구 시간을 계산하는 데 사용됩니다.
|풀 요청 | 배포에 포함된 풀 요청입니다. 작성자, 검토자, 레이블, 초안 작성, 검토 및 병합에 소요된 시간 등의 메타데이터가 포함됩니다. 커밋은 관련 풀 요청 내에 중첩됩니다.<br><br>풀 요청은 코드 검토 워크플로 및 PR 수준의 사이클 타임을 분석하는 데 사용됩니다.
|커밋 | 배포에 포함된 각 개별 커밋에 대해 생성된 이벤트입니다. 메타데이터가 포함되며 해당 배포에 자동으로 연결됩니다. 커밋은 관련 풀 요청 내에 중첩됩니다.<br><br>커밋은 변경 리드 타임을 계산하는 데 사용됩니다.

**참고**: DORA Metrics 이벤트의 보존 기간은 2년입니다.

### 기본 태그 {#default-tags}

모든 이벤트에는 사용 가능한 경우 다음 태그가 포함됩니다.

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

태그 사용에 대한 자세한 내용은 [태그 시작하기][6]를 참조하세요.

### 사용자 지정 태그 {#custom-tags}

배포 이벤트에 사용자 지정 태그를 추가하여 DORA Metrics를 필터링할 수 있습니다. 이러한 태그에는 두 가지 가능한 소스가 있습니다.

- 카탈로그: 배포 이벤트가 카탈로그의 서비스와 연결되어 있는 경우, `language` 태그와 [서비스 정의에서 정의한 사용자 지정 태그][13]가 자동으로 추가됩니다.
- DORA Metrics API: [API][7]를 사용하면 사용자 제공 사용자 지정 태그를 최대 100개까지 배포 이벤트에 추가할 수 있습니다.

DORA Metrics에서 사용자 지정 태그를 사용하는 방법에 대한 자세한 내용은 [DORA Metrics 개요][16]를 참조하세요.

## 이벤트별 필드 {#event-specific-fields}

### 배포 필드 {#deployment-fields}

| 필드                      | 설명                |
|----------------------------|----------------------------|
| `Duration` | 배포 소요 시간입니다. |
| `Avg Change Lead Time`      | 모든 커밋의 [변경 리드 타임](#commit-fields) 평균 소요 시간입니다.  |
| `Avg Time to PR Ready`          | 모든 커밋의 [PR 준비 완료까지](#commit-fields) 평균 소요 시간입니다. |
| `Avg Review Time`       | 모든 커밋의 평균 [검토](#commit-fields) 소요 시간입니다. |
| `Avg Merge Time`       | 모든 커밋의 평균 [병합 ](#commit-fields)소요 시간입니다. |
| `Avg Time to Deploy`       | 모든 커밋의 [배포까지 ](#commit-fields)평균 소요 시간입니다. |
| `Number of Commits`        | 배포에 포함된 모든 커밋의 개수입니다. |
| `Deployment Type` | 배포 유형 (`standard`, `rollback` 또는 `rollforward`). |
| `Change Failure` | 배포가 변경 실패로 표시되었는지 여부를 나타내는 부울 값입니다. |
| `Recovery Time` | 실패한 배포의 시점`finished_at`와 해당 수정이 이루어진 시점`finished_at` 사이의 소요 시간(초)입니다. 변경 실패로 표시된 배포에만 사용할 수 있습니다. |
| `Remediation Type` | 적용된 수정 유형 (`rollback` 또는 `rollforward`)입니다. 변경 실패로 표시된 배포에만 사용할 수 있습니다. |

### 풀 요청 필드 {#pull-request-fields}

| 필드  | 설명                |
|------------|----------------------------|
| `PR Cycle Time`       | 첫 번째 커밋부터 병합까지의 총 소요 시간입니다. |
| `Time to PR Ready`       | 첫 번째 커밋부터 PR이 검토 준비 완료로 표시될 때까지의 소요 시간입니다. |
| `Review Time`       | PR이 검토 준비 완료로 표시된 시점부터 승인까지의 소요 시간입니다. |
| `Merge Time`       | PR 승인부터 병합까지의 소요 시간입니다. |
| `Time to Deploy`       | 병합부터 배포 시작까지의 소요 시간입니다. |
| `Deploy Time`       | 배포 시작부터 배포 종료까지의 소요 시간입니다. |
| `Number of Commits`       | 풀 요청에 포함된 커밋 개수입니다. |
| `Number of Reviewers`       | 풀 요청을 검토한 리뷰어 수입니다. |
| `Number of Files Changed` | 풀 요청에서 변경된 파일 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Number of Lines Added` | 풀 요청에서 추가된 줄 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Number of Lines Deleted` | 풀 요청에서 삭제된 줄 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Total Number of Lines Changed` | 풀 요청에서 추가 및 삭제된 줄의 총 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Time to First Human Review` | 풀 요청이 사람으로부터 첫 검토를 받을 때까지의 소요 시간입니다. GitHub에서만 사용할 수 있습니다. |
| `Number of Comments` | 풀 요청의 댓글 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Number of Human Comments` | 사람이 작성한 풀 요청 댓글 수입니다. GitHub에서만 사용할 수 있습니다. |
| `Fully Automated` | 풀 요청이 사람의 개입 없이 생성되고 병합되었는지 여부를 나타내는 부울 값입니다. |
| `Creator Bot Type` | 풀 요청을 생성한 봇의 유형입니다. |
| `Creator Bot Name` | 풀 요청을 생성한 봇의 이름입니다. |
| `Time CI Failing` | 풀 요청의 커밋에서 CI가 실패 상태로 유지된 총 소요 시간입니다. CI Visibility가 필요합니다. |
| `Test Session Duration` | 풀 요청의 헤드 커밋 또는 병합 커밋에 대한 테스트 세션의 총 소요 시간입니다. Test Optimization이 필요합니다. |
| `Test Session Duration After Approval` | 풀 요청이 승인된 후 풀 요청의 헤드 커밋 또는 병합 커밋에 대한 테스트 세션의 총 소요 시간입니다. Test Optimization이 필요합니다. |
| `Time to Pass` | 첫 번째 CI 시도부터 풀 요청의 헤드 커밋 또는 병합 커밋에 대한 첫 번째 성공적인 파이프라인 실행까지의 소요 시간입니다. CI Visibility가 필요합니다. |
| `Time to Pass After Approval` | 풀 요청 승인 후 첫 번째 CI 시도부터 풀 요청의 헤드 커밋 또는 병합 커밋에 대한 첫번째 성공적인 파이프라인 실행까지의 소요 시간입니다. CI Visibility가 필요합니다. |
| `Patch Coverage` | 풀 요청의 헤드 커밋 또는 병합 커밋에서 신규 또는 수정된 줄 중 테스트로 커버되는 줄의 비율입니다. Code Coverage가 필요합니다. |


### 커밋 필드 {#commit-fields}

| 필드  | 설명                |
|------------|----------------------------|
| `Change Lead Time`       | 커밋이 프로덕션 환경에 반영되기까지의 소요 시간입니다. |
| `Time to PR Ready`       | 커밋 생성부터 PR이 검토 준비 완료로 표시될 때까지의 소요 시간입니다. |
| `Review Time`       | PR이 검토 준비 완료로 표시된 시점부터 승인까지의 소요 시간입니다. |
| `Merge Time`       | PR 승인부터 병합까지의 소요 시간입니다. |
| `Time to Deploy`       | 병합부터 배포 시작까지의 소요 시간입니다. |
| `Deploy Time`       | 배포 시작부터 배포 종료까지의 소요 시간입니다. |
| `Has Failed Jobs` | 재시도 후 성공한 경우를 포함하여, 해당 커밋의 CI 작업 실행이 실패했는지를 나타내는 부울 값입니다. CI Visibility가 필요합니다. |
| `Has Failed Tests` | 해당 커밋에서 Flaky 테스트가 아닌 테스트의 실행이 실패했는지를 나타내는 부울 값입니다. Test Optimization이 필요합니다. |
| `Has New Flaky Tests` | 해당 커밋의 테스트 세션에서 새로운 Flaky 테스트가 감지되었는지를 나타내는 부울 값입니다. Test Optimization이 필요합니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events/explorer/
[2]: /ko/api/latest/metrics/#query-timeseries-points
[3]: /ko/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /ko/getting_started/tagging/
[7]: /ko/api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/ko/metrics/
[10]: /ko/delivery_performance/dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /ko/delivery_performance/dora_metrics/setup/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[16]: /ko/delivery_performance/dora_metrics/
[17]: /ko/delivery_performance/dora_metrics/change_failure_detection/