---
description: 자동화된 권장 사항을 검토하여 대용량 로그 패턴을 제외하거나 샘플링하거나 메트릭으로 변환하여 로그 볼륨을 최적화하십시오.
further_reading:
- link: logs/log_configuration/indexes/#exclusion-filters
  tag: 설명서
  text: 제외 필터
- link: logs/log_configuration/logs_to_metrics/
  tag: 설명서
  text: 로그를 메트릭으로 변환
title: 로그 최적화 도구
---
## 개요 {#overview}

Log Optimizer는 반복적이거나 노이즈가 많은 데이터를 대량으로 생성하는 로그 패턴을 식별하도록 돕습니다. Datadog은 인덱싱된 로그를 분석하여 로그를 제외하거나 샘플링하거나 메트릭으로 변환하는 등의 작업을 권장하므로, 로그 볼륨을 최적화할 수 있고 문제 해결 및 분석에 가장 관련성이 높은 정보에 집중할 수 있습니다.

이 기능은 [Logging without Limits™][1]를 기반으로 하며 [Exclusion Filters][2] 및 [로그를 메트릭으로 변환][3]과 같은 도구를 보완합니다.

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_main.png" alt="Datadog의 Log Optimizer 랜딩 페이지에서 로그 볼륨과 노이즈를 줄이기 위한 권장 사항을 조회하십시오." style="width:100%;" >}}

## 작동 방식 {#how-it-works}

Datadog은 **인덱싱된** 로그를 지속적으로 검토하여 대량 또는 반복적인 데이터 볼륨을 생성하는 패턴을 찾습니다. Log Optimizer는 하루에 한 번 이러한 패턴을 Datadog 모범 사례와 비교하여 최적화의 이점을 얻을 수 있는 로그를 식별합니다.

그런 다음 Log Optimizer는 중요한 이벤트에 대한 가시성을 잃지 않으면서 노이즈를 줄일 수 있도록 작업(예: 디버그 수준 메시지 제외, 루틴 로그 샘플링 또는 정적 메시지를 메트릭으로 변환)을 제안합니다.

<div class="alert alert-danger">Log Optimizer는 기존 제외 필터나 로그-메트릭 변환을 고려하지 않습니다. 중복을 방지하기 위해 새로운 작업을 적용하기 전에 설정을 검토하십시오.</div>

### Datadog이 분석하는 항목 {#what-datadog-analyzes}

* **인덱싱된 로그:** 분석은 Standard 및 Flex 인덱스에 저장된 로그를 대상으로 합니다.
* **대용량 패턴:** Datadog은 전체 로그 볼륨에서 상당한 비중을 차지하는 패턴을 감지합니다.
* **메시지 일관성 및 콘텐츠:** 반복적이거나 변동성이 낮은 메시지가 포함된 로그는 최적화 후보로 평가됩니다. 예를 들어, 로그 메시지가 성공적인 작업(예: "process executed successfully")을 나타내는 경우, Log Optimizer는 노이즈를 줄이기 위해 해당 로그를 제외하도록 권장할 수 있습니다.
* **플랫폼 전반의 사용량 모니터링:** Datadog은 권장 패턴을 활성 모니터링 목록과 대조하여 로그가 어디에 사용되는지 보여줍니다. 

### 권장 작업 {#recommended-actions}

각 권장 사항에는 설명과 제안된 작업이 포함되어 있습니다.

| 권장 사항 | 설명 | 일반적인 예 |
| :---- | :---- | :---- |
| {{< ui >}}Exclude{{< /ui >}} | 노이즈를 유발하여 중요한 신호에 집중하기 어렵게 만드는 로그의 인덱싱을 중지하십시오. | 디버그 수준 메시지 또는 상세 시스템 출력. |
| {{< ui >}}Sample{{< /ui >}} | 반복적인 로그의 비율을 낮추어 가시성을 잃지 않으면서 노이즈를 줄이십시오. | 변동성이 거의 없는 로그(타임스탬프나 ID와 같은 필드만 변경될 수 있음) |
| {{< ui >}}Convert to metric{{< /ui >}} | 반복되는 로그를 메트릭으로 대체하여 시간 경과에 따른 수나 추세를 추적하십시오. | 항상 동일한 메시지나 상태를 보여주는 로그. |

## 권장 사항 검토 및 적용 {#review-and-apply-recommendations}

[{{< ui >}}Log Optimizer{{< /ui >}}][4] 페이지로 이동하여 각 권장 사항에 대한 로그 패턴, 샘플 메시지, 볼륨 데이터 및 쉬운 언어로 된 설명을 조회하십시오.

권장 사항을 적용하려면:

1. 권장 사항을 클릭하여 측면 패널을 엽니다.
2. 작업 버튼({{< ui >}}Exclude Logs{{< /ui >}}, {{< ui >}}Sample Logs{{< /ui >}} 또는 {{< ui >}}Create Metric{{< /ui >}})을 클릭하십시오.

변경 사항은 구성에 즉시 적용됩니다. 단, Log Optimizer 페이지는 다음 일일 분석이 실행될 때까지 새로 고쳐지지 않으므로 권장 사항이 일시적으로 계속 표시될 수 있습니다.

또한 티켓을 생성하여 조직 내 다른 팀과 검토를 시작하십시오. Jira 티켓을 열거나 Datadog Work Management로 작업 항목을 생성하십시오. 해결한 권장 사항은 해결됨으로 표시하여 권장 사항 피드에서 숨기십시오.

{{% collapse-content title="사례 연구: Log Optimizer를 사용하여 반복적인 로그 데이터 제외하기" level="h3" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="작업 및 패턴 세부 정보가 표시된 Log Optimizer 권장 사항 측면 패널" style="width:100%;" >}}

{{< ui >}}Log Optimizer{{< /ui >}} 페이지를 검토할 때 `shopist-support` 서비스에서 발생하는 대용량 패턴을 발견합니다. "Verifying ticket" 메시지가 여러 호스트에서 매일 130만 번 이상 나타납니다.

Datadog은 이를 변경되지 않는 반복적인 패턴으로 감지하며, 이를 메트릭으로 변환하고 인덱싱에서 로그를 제외할 것을 권장합니다. 권장 사항을 검토하고 해당 로그가 반복적임을 확인한 후 {{< ui >}}Recommendation{{< /ui >}} 측면 패널에서 직접 제외를 적용합니다.

동일한 서비스의 치명적인 오류 로그는 계속 표시되므로 관측 가능성을 잃지 않으면서 의미 있는 신호에 집중할 수 있습니다. 다음 일일 분석 후, 업데이트된 구성에서 인덱싱된 볼륨이 감소한 것을 확인할 수 있습니다.
{{% /collapse-content %}}

## 적용된 변경 사항 추적 {#track-applied-changes}

권장 사항을 적용하면 로그에서 제외 필터 또는 메트릭이 생성됩니다. 해당 필터나 메트릭 정의를 확인하거나, 변경하거나, 제거하려면 다음 페이지로 이동하십시오.

* **제외 필터**: [{{< ui >}}Logs Indexes{{< /ui >}}][5] 페이지
* **로그-메트릭 변환**: [{{< ui >}}Metrics Configuration{{< /ui >}}][6] 페이지

해당 페이지에서 언제든지 이러한 구성을 편집하거나 제거할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/logging_without_limits/
[2]: /ko/logs/indexes/#exclusion-filters
[3]: /ko/logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer
[5]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: https://app.datadoghq.com/logs/pipelines/generate-metrics