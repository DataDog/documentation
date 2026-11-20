---
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: 가이드
  text: 값에 변화가 없을 때 경고
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: \u0008가이드
  text: 특정 태그가 보고를 멈출 때 경고하도록 설정
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: 가이드
  text: 다운타임 중인 모니터에서 경고 억제
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: 블로그
  text: 권장 모니터로 미리 설정된 경고 사용
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: 블로그
  text: OpsGenie 및 Datadog을 통해 경고 및 이벤트 모니터링
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: 블로그
  text: Datadog으로 서비스 모니터링 및 SLA 설정
title: 모니터 경고 트러블슈팅
---

## 개요

이 가이드는 모니터링의 경고 동작이 올바른지 여부를 판단하는 데 도움이 되는 몇 가지 기본 개념에 대한 개요를 제공합니다. 모니터의 평가가 기본 데이터를 정확하게 반영하지 않는다고 의심되는 경우 모니터를 검사할 때 아래 섹션을 참조하세요.

### 모니터 상태

모니터 *평가*는 상태가 없으므로 주어진 평가의 결과가 이전 평가의 결과에 의존하지 않지만, 모니터 자체는 상태가 있으며 쿼리 및 구성의 평가 결과에 따라 모니터의 상태가 업데이트됩니다. 특정 상태의 모니터를 평가한다고 해서 모니터의 상태가 반드시 동일한 상태로 변경되는 것은 아닙니다. 몇 가지 잠재적인 원인은 아래를 참조하세요:

#### 메트릭 모니터의 평가 창 내에서 메트릭이 너무 희박합니다.

모니터의 평가 창에 메트릭이 없고 모니터가 [데이터 없음 조건][1]을 예상하도록 설정되지 않은 경우 평가는 `skipped`가 될 수 있습니다. 이 경우 모니터 상태가 업데이트되지 않으므로 이전에 `OK` 상태였던 모니터는 `OK`로 유지되며, `Alert` 상태인 모니터도 마찬가지입니다. 모니터 상태 페이지의 [히스토리][2] 그래프를 사용하여 관심 있는 그룹과 시간 프레임을 선택합니다. 데이터가 희박하게 채워진 경우 자세한 내용은 [모니터 산술 및 희소 메트릭][3]을 참조하세요.

#### 외부 조건으로 인한 모니터 상태 업데이트

모니터 상태는 모니터 평가가 없는 경우에도 [자동 해결][4] 등으로 인해 업데이트될 수 있습니다.

### 데이터 유무 확인 

모니터의 상태가 예상과 다른 경우 기본 데이터 원본의 동작을 확인하세요. 메트릭 모니터의 경우 [히스토리][2] 그래프를 사용하여 메트릭 쿼리로 가져오는 데이터 포인트를 볼 수 있습니다. 메트릭 변화에 대해 자세히 조사하려면 상태 그래프 옆에 있는 **Open in a notebook**을 클릭하세요. 이는 모니터 쿼리의 형식화된 그래프를 사용하여 조사 [노트북][20]을 생성합니다.

{{< img src="monitors/monitor_status/notebook-button2.png" alt="모니터 그룹 상태 표시줄 옆의 노트북에서 Open 버튼 위에 마우스 커서가 있는 모니터 상태 페이지r" style="width:60%;">}}

### 경고 조건

예기치 않은 모니터 동작은 [모니터링 유형][6]에 따라 달라지는 [경고 조건][5]이 잘못 설정되어 발생할 수 있습니다. 모니터 쿼리에서 `as_count()` 함수를 사용하는 경우 [모니터 평가에서 `as_count()`][7] 가이드를 확인하세요.

복구 임계값을 사용하는 경우 [복구 임계값 가이드][8]에 나열된 조건을 확인하여 해당 동작이 예상되는지 확인합니다.

### 모니터 상태 및 그룹

모니터 평가와 상태 모두 그룹별로 상태를 추적합니다.

다중 경고 모니터의 경우, 그룹이란 각 그룹 키에 대해 하나의 값을 갖는 태그 집합입니다(예: `env`및 `host`로 그룹화된 모니터의 경우 `env:dev, host:myhost`). 단순 경고인 경우, 모니터 범위 내의 모든 것을 나타내는 하나의 그룹(`*`)만 있습니다.

기본적으로 Datadog은 쿼리가 변경되지 않는 한 24시간 동안(호스트 모니터의 경우 48시간) UI에서 모니터 그룹을 사용할 수 있도록 유지합니다. 자세한 내용은 [모니터 설정 변경 사항이 적용되지 않음][9]을 참조하세요.

다중 경고 모니터 범위 내에서 새 모니터 그룹을 생성할 것으로 예상되는 경우 이러한 새 그룹 평가에 대한 지연을 구성할 수 있습니다. 이를 통해 새 그룹의 예상되는 동작(예: 새 컨테이너 생성과 관련된 높은 리소스 사용량)에 대한 경고를 방지할 수 있습니다. 자세한 내용은 [새 그룹 지연][10]을 참조하세요.

모니터가 크롤러 기반 클라우드 메트릭을 쿼리하는 경우 [평가 지연][11]을 사용하여 모니터가 평가하기 전에 메트릭이 도착했는지 확인합니다. 클라우드 통합 크롤러 일정에 대한 자세한 내용은 [클라우드 메트릭 지연][12]를 참조하세요.

### 알림 문제

모니터링이 예상대로 작동하지만 원하지 않는 알림을 생성하는 경우 알림을 줄이거나 억제할 수 있는 여러 가지 옵션이 있습니다:

- 상태 간에 빠르게 변화하는 모니터인 경우 [경고 휘날림 감소][13]를 참고해 경고로 인한 피로도를 최소화하세요.
- 조직에 유용하지 않거나 예상되는 알림의 경우 [다운타임][14]을 사용하여 원하지 않는 알림을 최소화하세요.
- 경고 라우팅을 제어하려면 [템플릿 변수][15]를 사용하고 **warning** 또는 **alert*** 상태는 [조건부 변수][16]로 구분합니다.

#### 부재 알림

알림이 제대로 전달되지 않는 것으로 의심된다면 아래 항목을 확인하여 알림이 제대로 전달되고 있는지 확인하세요.

- 수신자의 [이메일 기본 설정][17]을 확인하고 `Notification from monitor alerts`가 선택되어 있는지 확인하세요.
- [이벤트 스트림][18]에서 `Error delivering notification` 문자열이 포함된 이벤트를 확인합니다.

#### Opsgenie 다중 알림

모니터에서 여러 개의 `@opsgenie-[...]` 알림을 사용하는 경우 동일한 별칭을 가진 알림을 Opsgenie로 보냅니다.
[Opsgenie 기능][19]을 통해 중복으로 표시되는 것은 Opsgenie가 삭제합니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /ko/monitors/manage/status/#history
[3]: /ko/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /ko/monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /ko/monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /ko/monitors/types
[7]: /ko/monitors/guide/as-count-in-monitor-evaluations/
[8]: /ko/monitors/guide/recovery-thresholds/#behavior
[9]: /ko/monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /ko/monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /ko/monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /ko/integrations/faq/cloud-metric-delay/
[13]: /ko/monitors/guide/reduce-alert-flapping/
[14]: /ko/monitors/guide/suppress-alert-with-downtimes/
[15]: /ko/monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /ko/monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /ko/account_management/#preferences
[18]: /ko/events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /ko/notebooks