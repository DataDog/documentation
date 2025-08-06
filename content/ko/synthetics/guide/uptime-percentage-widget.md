---
aliases:
- /ko/graphing/guide/uptime-percentage-widget
- /ko/dashboards/guide/uptime-percentage-widget
further_reading:
- link: /monitors/monitor_uptime_widget/
  tag: 설명서
  text: 업타임 모니터링 위젯
- link: /getting_started/synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링 시작하기
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: 블로그
  text: Improve SLO accuracy and performance with Datadog Synthetic Monitoring
title: Service Level Objectives로 웹사이트 업타임 모니터링
---

## 개요

내외부 고객과의 서비스 수준 계약을 유지하려면 종종 업타임 퍼센트를 측정해야 합니다.

본 지침에서는 예제 웹사이트(`http://example.com/`)를 통해 Datadog [신서틱(Synthetic) 모니터링][1] 및 [SLO 위젯][2]으로 이를 측정하는 방법을 알아봅니다.

## Create a Synthetic Monitoring test

`http://example.com/` 를 통해 [신서틱 API 테스트][3]를 생성하려면 [단일 API 테스트 생성하기][4]를 참조하세요.

**Test URL**을 클릭하면 웹사이트의 서비스 상태의 어설션이 표시됩니다. SLI에 맞게 해당 어설션을 조정합니다.

## SLO 위젯 설정하기

### SLO 생성하기

1. 신서틱 테스트 결과를 기반으로 웹사이트 업타임을 추적하려면 [새 SLO를 생성][5]합니다.
2. **Monitor Based**를 선택하고 신서틱 테스트 이름을 입력합니다.

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="SLO 설정" >}}

3. 측정하려는 타겟을 정의합니다.

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="SLO 타겟" >}}

4. 이름, 메시지, 태그를 입력하여 SLO에 관한 추가 세부 정보를 제공합니다.

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="SLO 알림" >}}

5. **Save**를 클릭합니다.

### 대시보드에서 SLO 불러오기

1. [새 대시보드를 생성][6]하여 SLO 위젯을 호스팅합니다.
2. SLO 위젯을 보드에 끌어다 놓습니다.
3. 위에서 정의한 SLO를 선택합니다.

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="SLO 위젯 선택" >}}

4. 필요에 맞게 SLO 위젯을 사용자 지정합니다.

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="SLO 위젯 설정" >}}

5. 위젯을 설명하는 제목을 입력하고 **Done**를 클릭합니다.

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="최종 대시보드" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/
[2]: /ko/dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ko/getting_started/synthetics/api_test#define-request
[5]: https://app.datadoghq.com/slo/new
[6]: https://app.datadoghq.com/dashboard/lists