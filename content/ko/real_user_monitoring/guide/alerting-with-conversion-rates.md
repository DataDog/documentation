---
description: 전환율 알림을 생성하는 방법을 안내합니다.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM 모니터링에 대해 알아보기
title: 전환율로 알림
---

## 개요

전환율은 사용자 워크플로의 성공을 모니터링하는데 매우 중요합니다. 본 지침에서는 [RUM Funnel][1] 시각화에서 전환율을 생성하고 전환율이 지정된 임계값 아래로 떨어질 때 알려주는 알림을 생성하는 방법을 설명합니다.

## RUM Explorer에서 Funnel 생성하기

Datadog에서 [Digital Experience > Product Analytics > Funnels][1]로 이동합니다.

{{< img src="real_user_monitoring/funnel_analysis/rum-funnel-creation-2.png" alt="주요 작업이 강조 표시된 Funnel 생성 페이지" style="width:100%;" >}}

**전환 측정 단계 정의** 섹션의 보기 및 작업에서 몇 가지 단계를 생성합니다. 막대 그래프를 클릭하면 사용자 전환 및 이탈 분석이 포함된 사이드 패널을 확인할 수 있습니다. Funnel에 후속 보기 또는 작업을 추가하려면 **+**를 클릭하고 자주 사용하는 다음 단계 중에서 선택합니다.

## 전환율 그래프 내보내기

Funnel에는 전체 전환율 및 이탈률, 전환 또는 이탈한 세션 수, 전환 또는 이탈 세션의 퍼센트가 표시됩니다.  

**Save to Dashboard** 버튼을 클릭하고 드롭다운 메뉴에서 그래프를 내보낼 기존 대시보드를 선택합니다. 옵션으로 **New Dashboard**를 클릭하여 대시보드를 생성합니다.

## 전환율 쿼리 편집하기

대시보드의 **Graph your data**에서 위젯을 편집하고 전환율 쿼리에 액세스합니다.

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/conversion-rate-formula.png" alt="RUM Explorer에서 전환율 쿼리에 액세스하기" style="width:100%;" >}}

## RUM 모니터링 업데이트하기

별도 탭에서 [**Monitors** > **New Monitor**][3]으로 이동한 다음 **Real User Monitoring**을 선택합니다.

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/copy-paste-query-into-rum-monitor.mp4" alt="Funnel 위젯을 기존 대시보드 또는 새 대시보드로 내보내기" video=true >}}

대시보드에서 쿼리를 복사하여 RUM 모니터링 쿼리 편집기에 붙여넣은 다음 `(a / b) * 100`로 수식을 추가합니다.

## 고급 모니터링 설정하기

적용된 쿼리로 알림 조건을 사용자 지정하고 알림을 설정하여 해당 알림이 적절한 수신자나 채널에 전달되도록 합니다. 자세한 내용은 [RUM 모니터링][4]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/funnels
[2]: https://app.datadoghq.com/rum/explorer?viz=timeseries
[3]: https://app.datadoghq.com/monitors/create/rum
[4]: /ko/monitors/types/real_user_monitoring/