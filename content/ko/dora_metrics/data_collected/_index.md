---
further_reading:
- link: /dora_metrics/
  tag: 설명서
  text: DORA 메트릭에 대해 알아보기
- link: /dora_metrics/setup/
  tag: 설명서
  text: DORA 메트릭용 데이터 소스 설정
- link: /metrics/
  tag: 설명서
  text: 메트릭에 대해 자세히 알아보기
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
title: 수집된 DORA 메트릭 데이터
---

<div class="alert alert-danger">DORA 메트릭은 공개 베타 버전입니다.</div>

## 개요

DORA 메트릭은 네 가지 핵심 DORA 메트릭 각각에 대한 [메트릭][9]을 생성합니다. 또한, [이벤트 탐색기][1]에서 사용할 수 있는 관련 태그 및 속성을 포함하는 이벤트를 생성합니다.

## 기본 메트릭

DORA 메트릭은 다음과 같은 기본 메트릭을 제공합니다.

| 메트릭 | 유형 | 설명 |
| :--- | :--- | :--- |
| `dora.deployments.count` | 카운트 | 선택한 [배포 데이터 소스][10]를 기준으로 Datadog 에서 감지한 배포 수입니다.
| `dora.change_lead_time` | 분포 | 배포 시점에 관련된 Git 커밋의 수명(`seconds`)입니다.
| `dora.incidents_impact` | 개수 | 인시던트의 영향을 받은 서비스 또는 팀을 추적합니다. `dora.incidents_impact / dora.deployments.count` 공식을 통해 변경 실패율에 사용합니다. 영향이 시작되는 시점과 배포 사이의 시차를 고려하기 위해 최소 1주일의 롤업 시간이 권장됩니다.
| `dora.time_to_restore` | 분포 | 인시던트의 `started_at` 및 `finished_at` 타임스탬프 사이의 시간(`seconds`)입니다.

### 기본 태그

모든 기본 메트릭에는 다음 태그가 포함되어 있습니다.

- `service`
- `team`
- `env`
- `repository_id`

**참고**: 장애의 근원이 된 데이터 소스에서 제공된 경우 `dora.incidents_impact` 및 `dora.time_to_restore` 메트릭에서 `severity` 태그를 사용할 수 있습니다.

`env`, `service`, `version` 태그 사용에 대한 자세한 내용은 [태그 시작하기][6]를 참조하세요.

## 리드 타임 메트릭 변경

Datadog는 커밋 생성부터 배포까지 다양한 단계를 나타내는 메트릭으로 변경 리드 타임을 세분화합니다.

| 메트릭 | 유형 | 설명 |
|---|---|---|
| `dora.time_to_pr_ready` | 기간 | 커밋이 생성된 시점부터 PR을 검토할 준비가 될 때까지의 시간입니다. 이 메트릭은 PR이 검토 준비 완료로 표시되기 전에 만들어진 커밋에만 사용할 수 있습니다. |
| `dora.review_time` | 기간 | PR이 검토 준비됨으로 표시된 시점부터 최종 승인을 받을 때까지의 시간입니다. 이 메트릭은 PR이 승인되기 전에 만들어진 커밋에만 사용할 수 있습니다. |
| `dora.merge_time` | 기간 | 마지막 승인부터 PR이 병합될 때까지의 시간입니다. |
| `dora.time_to_deploy` | 기간 | PR 병합부터 배포 시작까지의 시간입니다. 커밋에 연결된 PR이 없는 경우 이 메트릭은 커밋 생성부터 배포 시작까지의 시간으로 계산됩니다. |
| `dora.deploy_time` | 기간 | 배포 시작부터 배포 종료까지의 시간입니다. 배포 기간 정보가 없는 경우 메트릭을 사용할 수 없습니다. |

이러한 메트릭은 리포지토리 메타데이터의 출처가 GitHub이고 커밋과 연결된 풀 리퀘스트(PR)가 있는 경우에만 계산됩니다(해당 경우). 커밋은 PR을 병합할 때 커밋이 대상 브랜치에 처음 도입된 경우 PR과 연결됩니다. 커밋에 연결된 PR이 없는 경우 `dora.time_to_deploy` 및 `dora.deploy_time` 메트릭만 사용할 수 있습니다.

**참고:** 이 메트릭은 배포할 때마다 전송되는 것이 아니라 모든 커밋에 대해 전송됩니다.

## 이벤트 관리에서 메트릭 살펴보기

기본 DORA 메트릭 는 [이벤트 탐색기][1]에서 사용할 수 있습니다. 검색 메트릭 이벤트 으로 이동하여 [**서비스 관리** > **이벤트 관리** > ** 탐색기][11]로 이동한 후 검색 쿼리에 `source:software_delivery_insights`를 입력합니다.

{{< img src="dora_metrics/events.png" alt="Events collected from DORA Metrics in the Events Explorer" style="width:100%;" >}}

이러한 메트릭은 [쿼리 시계열 포인트][5] 및 [여러 제품에 대한 쿼리 시계열 데이터][6] API 엔드포인트와 소스 `software_delivery_insights`를 사용하여 프로그래밍 방식으로 쿼리할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/events/explorer/
[2]: /ko/api/latest/metrics/#query-timeseries-points
[3]: /ko/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /ko/getting_started/tagging/
[7]: /ko/api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/ko/metrics/
[10]: /ko/dora_metrics/setup/deployments/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true