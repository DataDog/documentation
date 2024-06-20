---
further_reading:
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2분
  text: 서비스 대기 시간을 지난 주와 비교
- link: /tracing/guide/slowest_request_daily/
  tag: 3분
  text: 웹 서비스에서 가장 느린 엔드포인트에서 가장 느린 트레이스 디버깅
- link: /tracing/guide/apm_dashboard/
  tag: 4분
  text: APM 메트릭을 추적 및 상호 연결하기 위해 대시보드 생성
- link: /tracing/guide/
  tag: ''
  text: 모든 가이드
kind: 지침
title: 데이터베이스 서비스의 비정상 p99 대기 시간 경보
---

_완료하는 데 걸리는 시간 3분_

{{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_cropped.mp4" video="true" alt="진행 중인 알람이 표시된 모니터링 보기" style="width:90%;">}}

Datadog에서는 계속해서 직접 모니터링을 할 필요 없이 APM으로 서비스 상태를 점검하고 모니터링하도록 설정할 수 있습니다. 이 예시에서는 이상 징후 탐지 모니터를 살펴보겠습니다. [이상 징후 탐지][1]는 메트릭이 과거와 다르게 작동하는 것을 파악하도록 도와주는 알고리듬 기능입니다. 이상 징후를 탐지하는 데에는 계정 추세, 시즌별 요일 추세, 하루 시간별 패턴 등이 이용됩니다. 추세가 강하고 패턴이 반복되며 임계값 기반 경보만으로 모니터링이 어렵거나 불가능한 메트릭에 적합합니다.

1. **[New Monitor Page][2]를 열고 [APM][3]을 선택하세요.**
2. Primary Tags 아래에서 **내 환경을 선택**하고 Service 아래 ** 모니터링할 데이터베이스를 선택**하세요.

   [Resource][4] 아래에서 데이터베이스에서 모니터링할 특정 쿼리를 선택할 수 있습니다. 하지만 이 예시에서는 전체적인 성능을 확인하고자 하기에 `*`로 남겨둡니다.

   [서비스][5]를 선택하고 나면 다음 단계 설정을 할 수 있게 되고 새 모니터가 추적하는 메트릭 성능이 페이지 상단에 나타납니다.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_2_cropped.png" alt="진행 중인 알람이 표시된 모니터링 보기" style="width:90%;">}}

3. **Anomaly Alert**를 선택하고 *For* 옵션 아래에서 p99 latency를 선택합니다.

   Anomaly Alert를 선택한 후 해당 메트릭의 기본 예상 작동을 보여주는 차트가 나타납니다. 이 경우에는 p99 latency입니다.

4. ***Alert when* 필드 값을 100%로 설정합니다**.

   이는 선택한 기간 내 모든 이벤트가 비정상 상태여야 경보가 발동한다는 뜻입니다. 이상 징후 탐지를 사용하기 시작할 때 이 설정으로 시작하는 것이 좋습니다. 시간이 지나면서 내 상황에 맞는 적합한 값을 찾을 수 있습니다. 자세한 내용은 [FAQ][6]에서 이상 징후 탐지 모니터를 참고하세요.

5. **경보 알림 변경**

   이 예시에서는 경보 내용을 기본 텍스트로 남겨두거나 팀원을 경보에 태그할 수 있습니다.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_3.png" alt="진행 중인 경보를 보여주는 모니터 보기" style="width:90%;">}}

   [알림 개요][7]에서 알림 텍스트 표시와 설정할 수 있는 값과 조건에 대해 더 자세히 알아보실 수 있습니다.

6. **사용자 이름이 *Configure notifications and automations notification* 필드**에 표시되는지 확인하고 데이터베이스 지연 시간 이상 발생 시 알림을 받아야 하는 팀원을 추가합니다.

   **참고**: 다른 사용자를 추가하려면 앞부분에 `@`를 입력하고 ***Save*를 클릭합니다**.

   경보가 설정됐으면 이 화면에 있는 파라미터를 변경하여 메트릭 성능을 추적할 수 있습니다.

7. ***Edit* 탭에서 *Status* 탭으로 전환하세요**.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_4_cropped.png" alt="진행 중인 알람이 표시된 모니터링 보기" style="width:90%;">}}

   여기에서는 내 모니터의 현재 상태를 확인하고 음소거하거나 경보 트리거 세부 사항을 탐색할 수 있습니다.

8. **[Service Catalog][8]**로 돌아가서 방금 전 모니터를 설정한 서비스를 찾은 후 **Service Page를 클릭해 들어갑니다**. 여기에서 헤더 아래에 있는 **Monitor 바를 클릭**합니다.

   여기에서 서비스에 설정된 다른 모니터와 설정 추천하는 모니터와 함께 **새 모니터를 볼 수 있습니다**.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_5_cropped.png" alt="진행 중인 알람이 표시된 모니터링 보기" style="width:90%;">}}

   모니터를 생성하면 포함할 서비스, 메트릭, 이벤트가 늘어나고 그에 설정할 조건도 더 복잡해 집니다. 각 모니터는 서비스와 연결되어 있고 Service 페이지와 [Service Map][9]에서 액세스할 수 있습니다.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_6_cropped.png" alt="서비스 맵" style="width:90%;">}}

   맵에 있는 각 서비스에 있는 초록색 원은 각 모니터가 모두 조용하다는 뜻이고, 노란색은 모니터 1개 이상이 경고 상태이나 경보 상태는 아니라는 뜻이며, 빨간색은 모니터 1개 이상이 경보 상태라는 뜻이고, 회색은 서비스에 설정된 모니터가 없다는 뜻입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/anomaly/
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/apm
[4]: /ko/tracing/glossary/#resources
[5]: /ko/tracing/glossary/#services
[6]: /ko/monitors/types/anomaly/#faq
[7]: /ko/monitors/notify/?tab=is_alertis_warning
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/service/map