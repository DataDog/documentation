---
description: 여정 및 연결된 자산에 대한 액세스를 제어하는 역할, 권한 및 제한 정책을 검토하세요.
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/configuring_journeys/
  tag: 문서
  text: Datadog Journey Monitoring에서 여정 구성하기
- link: /account_management/rbac/permissions/
  tag: 문서
  text: Datadog 역할 권한 전체 목록 검토하기
title: 여정 역할 및 권한
---
## 개요 {#overview}

여정에는 [Product Analytics][2], [Real User Monitoring (RUM)][3] 및 [Synthetic Monitoring & Testing][4]의 에셋이 포함될 수 있습니다. 여정 또는 해당 에셋 중 하나를 관리하려면 관련 [Journey Monitoring 권한][1] 및 제품별 권한이 필요합니다.

## 여정 생성 및 편집 {#create-and-edit-journeys}

| 작업 | 필요한 액세스 권한 |
|--------|-----------------|
| 여정 생성 또는 편집 | Journey Monitoring write |
| 여정의 [Synthetic 테스트 모음][5] 생성 | Journey Monitoring write 및 Synthetic Monitoring write |
| [RUM 작업][6] 연결 또는 편집 | Journey Monitoring write 및 RUM write |

여정을 생성하려면 Journey Monitoring write 권한만 있으면 됩니다. Datadog은 Synthetic Monitoring write 권한도 보유한 경우에만 해당 여정의 Synthetic 테스트 모음을 생성합니다. 그렇지 않으면 Datadog은 테스트 모음 없이 여정을 생성합니다. 필요한 권한을 확보한 후 테스트 모음을 추가하세요.

## 여정 및 연결된 자산 보기 {#view-journeys-and-linked-assets}

| 작업 | 필요한 액세스 권한 |
|--------|-----------------|
| 이벤트 기반 여정 및 세부 정보 조회 | Journey Monitoring read 및 여정의 RUM 애플리케이션에 대한 RUM read |
| Synthetics 전용 여정 조회 | Journey Monitoring read |
| 테스트 모음, 테스트 및 [가동 시간 SLO][7] 조회 | Synthetic Monitoring 읽기 권한 및 테스트 모음에 대한 읽기 제한 정책 |
| 연결된 RUM 작업 조회 | Journey Monitoring 읽기 권한 및 RUM 읽기 권한 |
| 작업의 SLO 보기 | SLO read |
| 여정 [Session Replays][8] 조회 | RUM 읽기 권한, 데이터 액세스 제어에 따라 달라짐 |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#digital-experience-monitoring
[2]: /ko/product_analytics/
[3]: /ko/real_user_monitoring/
[4]: /ko/synthetics/
[5]: /ko/synthetics/test_suites/
[6]: /ko/real_user_monitoring/operations_monitoring/
[7]: /ko/synthetics/test_suites/#service-level-objectives
[8]: /ko/session_replay/