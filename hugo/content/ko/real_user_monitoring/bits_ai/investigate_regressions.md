---
description: RUM 바이탈 차트에서 탐지된 이상을 바탕으로 Bits Investigation을 시작하거나 Bits가 RUM 모니터 경보를
  자동으로 조사하도록 설정합니다.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: 설명서
  text: RUM에서 Bits 사용
- link: /bits_ai/bits_investigation/investigate_issues/
  tag: 설명서
  text: Bits Investigation으로 문제 조사
- link: /monitors/types/real_user_monitoring/
  tag: 설명서
  text: RUM 모니터
title: Bits AI로 성능 저하 및 경보 조사
---
## 개요 {#overview}

성능 메트릭이 갑자기 저하되면 다음 두 가지 방법으로 근본 원인을 파악할 수 있습니다.

- [이상 조사](#investigate-an-anomaly-on-a-vital-chart): RUM이 바이탈 차트에서 탐지한 이상을 조사합니다.
- [자동 조사 활성화](#automatically-investigate-rum-monitor-alerts): RUM 모니터에서 자동 조사를 활성화하면 모니터가 경보를 발생시키는 즉시 Bits가 조사를 시작합니다.

## 바이탈 차트의 이상 조사 {#investigate-an-anomaly-on-a-vital-chart}

RUM은 브라우저 애플리케이션의 RUM 요약 페이지에 있는 Core Web Vitals 차트에서 이상을 탐지합니다. 바이탈 지표가 예상치 못하게 저하되면 RUM은 차트에서 이상이 발생한 시간 범위를 강조 표시하고 그 아래에 **Anomaly · Investigate** 버튼을 표시합니다.

{{< img src="real_user_monitoring/bits_ai/anomaly-investigate.png" alt="이상 구간이 분홍색으로 강조 표시되고 차트 아래에 Anomaly · Investigate 버튼이 있는 First Contentful Paint 차트" style="width:50%;" >}}

조사를 시작하려면 **Anomaly · Investigate**를 클릭합니다. 새 탭에서 Bits Investigation이 열리고 바이탈 지표, 활성 쿼리 및 보기, 차트 시간 범위, 이상 발생 시작 및 종료 시간이 표시됩니다. Bits는 이상이 발생한 구간을 전후 기간과 비교하여 변경된 사항과 영향을 받은 릴리스, 페이지 또는 사용자 세그먼트를 설명합니다.

**참고**: Largest Contentful Paint 또는 Cumulative Layout Shift 값이 증가하는 등 성능이 저하된 경우에만 강조 표시됩니다. 개선 사항은 이상으로 플래그 지정되지 않습니다.

## RUM 모니터 경보 자동 조사 {#automatically-investigate-rum-monitor-alerts}

Bits Investigation은 [RUM 모니터][1]를 지원합니다. RUM 모니터에서 자동 조사를 활성화하면 모니터가 경보 상태로 전환될 때마다 Bits가 조사를 시작하므로, 온콜 엔지니어가 경보를 열었을 때 근본 원인과 관련 증거를 바로 확인할 수 있습니다.

RUM 모니터에서 자동 조사를 활성화하려면 다음 단계를 따르세요.

1. [RUM 모니터][2]를 생성하거나 편집합니다.
2. **Configure notifications & automations**에서 **Investigate with Bits**를 **Enabled**로 설정합니다.
3. 모니터를 저장합니다.

{{< img src="real_user_monitoring/bits_ai/monitor-auto-investigate.png" alt="모니터 경보를 자동으로 조사하도록 'Investigate with Bits'가 'Enabled'로 설정된 모니터 편집기" style="width:100%;" >}}

개별 RUM 모니터 경보에서도 수동으로 조사를 시작할 수 있습니다. 사용 가능한 모든 진입점과 자동 조사를 트리거하는 조건은 [문제 조사][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /ko/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations