---
description: 여정 및 연결된 자산에 대한 액세스를 제어하는 역할, 권한 및 제한 정책을 검토하세요.
further_reading:
- link: /journey_monitoring/
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/guide/configuring_journeys/
  tag: 설명서
  text: Datadog Journey Monitoring에서 여정 구성하기
- link: /account_management/rbac/permissions/
  tag: 설명서
  text: Datadog 역할 권한 전체 목록 검토하기
title: 역할 및 권한
---
## 개요 {#overview}

여정은 Product Analytics, RUM 및 Synthetic Monitoring의 자산을 연결합니다. 대부분의 작업에는 Journey Monitoring 권한과 해당 작업의 대상이 되는 기본 자산에 대한 권한이 모두 필요합니다.

## 여정 생성 및 편집 {#create-and-edit-journeys}

| 작업 | 필요한 액세스 권한 |
|--------|-----------------|
| 여정 생성 또는 편집 | [Journey Monitoring write][perms] |
| 여정의 Synthetic 테스트 모음 생성 | [Journey Monitoring write][perms] 및 Synthetic Monitoring write |
| 전환율 모니터 추가 또는 편집 | [Journey Monitoring write][perms] 및 monitor write |
| 여정 SLO 추가 또는 편집 | [Journey Monitoring write][perms] 및 SLO write |
| 강하게 연결된 RUM 작업 편집 | [Journey Monitoring write][perms] 및 RUM write |

자산 생성은 best-effort 방식으로 수행됩니다. [Journey Monitoring write][perms] 액세스 권한만으로도 여정을 생성할 수 있습니다. Datadog은 해당 자산에 대한 권한도 보유한 경우에만 테스트 모음과 같은 연결된 자산을 생성합니다. 그렇지 않으면 Datadog은 이를 건너뛰며 나중에 추가할 수 있습니다. 테스트 모음이 없는 여정도 유효한 상태입니다.

## 여정 및 연결된 자산 보기 {#view-journeys-and-linked-assets}

| 작업 | 필요한 액세스 권한 |
|--------|-----------------|
| 여정 및 세부 정보 보기 | [Journey Monitoring read][perms] 및 여정의 RUM 애플리케이션에 대한 RUM read |
| 테스트 모음, 테스트 및 가동 시간 SLO 보기 | Synthetic Monitoring read 및 테스트 모음에 대한 읽기 제한 정책 |
| 강하게 연결된 RUM 작업 보기 | [Journey Monitoring read][perms] 및 RUM read |
| 작업의 SLO 보기 | SLO read |
| 여정 Session Replay 보기 | RUM read, RUM 데이터 액세스 제어 적용 |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[perms]: /account_management/rbac/permissions/#digital-experience-monitoring