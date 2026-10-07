---
description: 팀이 소유한 뷰의 이벤트 데이터를 필터링할 수 있도록 Real User Monitoring에서 뷰 기반 소유권을 사용하는 방법에
  대한 가이드입니다.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM에 대해 알아보기
- link: https://www.datadoghq.com/blog/simplify-micro-frontend-observability-with-datadog-rum/
  tag: 블로그
  text: Datadog RUM을 사용하여 마이크로 프론트엔드의 관측 가능성 간소화하기
title: 뷰 소유권
---
## 개요 {#overview}

뷰 소유권을 사용하면 팀이 소유한 애플리케이션 부분에 대한 RUM 메트릭과 이벤트만 볼 수 있습니다. 뷰 소유권을 설정하면 해당 뷰에 연결된 모든 RUM 이벤트와 메트릭에 팀 이름이 **태그 지정**됩니다. [팀 필터][2]를 사용하여 선택한 팀에 대해 뷰의 범위를 지정하세요. 이는 {{< ui >}}Summary{{< /ui >}}, {{< ui >}}Optimization{{< /ui >}}, {{< ui >}}Session Explorer{{< /ui >}} 페이지에 나타납니다.

{{< img src="/real_user_monitoring/ownership_of_views/ownership-sessions-explorer-1.png" alt="Sessions Explorer 뷰에서는 팀 소유권에 할당된 팀을 기준으로 사용자 세션을 필터링하여 팀과 관련된 리플레이를 쉽게 찾을 수 있습니다." >}}

팀을 선택하면 해당 팀이 소유한 뷰에 대해 메트릭과 이벤트 데이터가 필터링됩니다. 여러 팀에 속해 있는 경우 팀을 조합하여 선택할 수 있습니다. 팀별 필터링을 중단하려면 선택을 해제하세요. 뷰를 소유한 팀 목록은 모든 이벤트 사이드 패널의 오른쪽 상단 모서리에도 나열됩니다.

## 소유권 규칙 {#ownership-rules}

뷰 소유권을 구성하는 규칙에는 두 가지 유형이 있습니다.

1. **정확 일치 규칙**: 뷰의 이름과 일대일로 매핑됩니다. 
2. **접두사 규칙**: 뷰의 이름에 접두사가 포함된 모든 뷰를 캡처합니다.

{{< img src="/real_user_monitoring/ownership_of_views/ownership-rule-type.png" alt="뷰 소유권을 정의하는 두 가지 다른 유형의 규칙을 표시하는 사이드 패널입니다." >}}

모든 규칙에는 최소한 하나의 **팀**과 하나의 **범위**가 정의되어 있어야 합니다. 두 가지 범위 유형이 지원됩니다.
- 모든 서비스에 걸친 **현재 RUM 애플리케이션**용
- 모든 애플리케이션에 걸친 **특정 서비스**용

## 설정 {#setup}

<div class="alert alert-info">이 기능을 사용하려면 조직에서 팀을 활성화하고 구성해야 합니다.</div>

애플리케이션의 뷰에 대한 팀 소유권을 구성하려면 다음을 수행하세요.

1. Datadog에서 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][1] 페이지로 이동하여 애플리케이션을 선택합니다.
2. 왼쪽 탐색 메뉴에서 {{< ui >}}Ownership{{< /ui >}}을 선택합니다.
3. 각 뷰에 대해 {{< ui >}}Missing Ownership{{< /ui >}}을 클릭하고 해당 뷰에 대한 규칙을 생성합니다.
4. {{< ui >}}All Rules{{< /ui >}} 탭을 클릭하여 생성된 모든 규칙과 관련된 뷰를 검토합니다.

뷰를 팀과 연결하면 Datadog은 새로운 이벤트 데이터를 해당 팀에 자동으로 할당합니다.

<div class="alert alert-danger">팀과 뷰 매핑을 변경하더라도 과거의 메트릭이나 이벤트에는 새로운 팀 태그가 소급 적용되지 않습니다.</div>

{{< img src="/real_user_monitoring/ownership_of_views/ownership-application-management-2.png" alt="팀 소유권 페이지의 뷰로, 여기에서 애플리케이션의 여러 페이지를 특정 팀에 할당할 수 있습니다." >}}

<div class="alert alert-info"><a href="https://docs.datadoghq.com/api/latest/rum-teams-ownership/">Datadog API</a>를 사용하여 뷰 소유권을 구성할 수도 있습니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ko/account_management/teams/#team-filter