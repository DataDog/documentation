---
aliases:
- /ko/cloud_cost_management/reporting/anomalies
- /ko/cloud_cost_management/anomalies
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: /cloud_cost_management/cost_changes/monitors
  tag: 모니터
  text: 비용 모니터 생성
title: 이상 징후 페이지
---
## 개요 {#overview}

Datadog Cloud Cost Management(CCM)는 환경을 지속적으로 모니터링하여 예상치 못한 비용 변화를 탐지하고 우선순위를 지정함으로써 이상 징후를 공유, 조사 및 해결할 수 있도록 지원합니다. 비용 이상 징후는 AWS, Azure, Google Cloud, Oracle Cloud, Datadog, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI, Gemini 및 Databricks에서 사용할 수 있으며 CCM 설정 후 추가 설정이 필요하지 않습니다.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="서비스 이름, 사용 유형 및 비용 영향을 보여주는 비용 이상 징후 목록" style="width:80;" >}}

일반적인 워크플로는 다음과 같습니다.

1. **조회**: {{< ui >}}Anomalies{{< /ui >}} 탭에서 이상 징후를 조회합니다.
2. **조사**: Watchdog Explains를 사용하여 비용 변화의 원인을 파악합니다.
3. **엔지니어링 팀과 공유**: 세부 정보를 검토하고, 추가 조사를 수행하거나, 모니터링을 설정하여 조치를 취할 수 있도록 합니다.
4. **해결**: 예상되었거나 중요하지 않은 이상 징후를 해결합니다.

## 이상 징후 정의 방법 {#how-anomalies-are-defined}

이상 징후는 일반적인 패턴에서 벗어난 중요하고 예상치 못한 변화입니다. Datadog은 사용자의 특정 사용 패턴에 적응하는 머신러닝 기술을 사용하여 이상 징후를 자동으로 식별합니다.

실제 이상 징후와 예상되는 변동을 구분하기 위해 Datadog의 알고리즘은 다음을 수행합니다.
- 매주 월요일의 비용 증가나 매월 4일의 급증과 같이 반복되는 비용 급증 및 급락을 인식합니다.
- 엔지니어링 사용량에 집중합니다(세금, 크레딧, 환불 및 Reserved Instance 요금 제외).
- 영향이 적은 이상 징후를 필터링하여 노이즈를 줄입니다.

## 이상 징후 탐지 사용자 지정 {#customize-anomaly-detection}

기본적으로 Datadog은 각 클라우드 공급자에 대한 비용 이상 징후를 자동으로 탐지합니다. `cloud_cost_management_write` 권한이 있는 경우, 조직의 비용 구조에 더 잘 맞도록 공급자별로 Datadog이 이상 징후를 탐지하는 방식을 사용자 지정할 수 있습니다. 사용자 지정 이상 징후 탐지는 AWS, Azure, Google Cloud, Datadog, Oracle Cloud, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI 및 Gemini에서 사용할 수 있습니다.

이상 징후 탐지를 사용자 지정하려면 다음 단계를 따르세요.

1. [{{< ui >}}Anomalies{{< /ui >}} 탭][1]에서 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Configure Cost Anomalies{{< /ui >}} 패널에서 공급자를 선택합니다. 체크 표시는 공급자가 사용자 지정 설정을 사용함을 나타내고, 빈 원은 Datadog의 기본 설정을 사용함을 나타냅니다.
1. 선택한 공급자에 대해 다음 설정을 조정합니다.
   - **Detection dimension**: Datadog이 비용 이상 징후를 탐지하는 차원입니다(예: 서비스 또는 요금 설명). 이 설정은 필수입니다.
   - **Minimum daily cost**: 변경 사항이 이상 징후로 플래그 지정되기 전에 도달해야 하는 최소 일일 비용입니다(조직 통화 기준으로 최소 5). 저비용 변경으로 인한 노이즈를 줄이려면 이 값을 높이세요.
   - **Breakdown tags**: 탐지된 이상 징후를 세분화하는 데 사용되는 최대 5개의 추가 태그로, [Bits Chat의 Cloud Cost 스킬][5]이 각 이상 징후를 유발하는 요인을 식별하도록 돕습니다. 기본 태그 세트는 항상 포함되며 제거할 수 없습니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 변경 사항은 향후 탐지되는 이상 징후에 적용됩니다.

공급자를 Datadog의 기본 설정으로 되돌리려면 공급자를 선택하고 {{< ui >}}Revert{{< /ui >}}를 클릭한 다음 {{< ui >}}Save{{< /ui >}}를 클릭하세요.

## 비용 이상 징후 조회 {#view-cost-anomalies}

[Datadog의 Cloud Cost 페이지에 있는 Anomalies 탭][1]에서 이상 징후를 조회하고 필터링할 수 있습니다.

- {{< ui >}}Active{{< /ui >}}: 가장 최근 온전한 하루 치 비용 데이터의 (일반적으로 2~3일 전)의 이상 징후입니다.
- {{< ui >}}Past{{< /ui >}}: 7일 이상 지속되었거나 더 이상 이상으로 탐지되지 않는 이상 징후입니다. 과거 이상 징후는 보고용으로 유용할 수 있지만, 긴급성이나 실행 가능성은 떨어지는 경우가 많습니다.
- {{< ui >}}Resolved{{< /ui >}}: 컨텍스트와 함께 해결됨으로 표시한 이상 징후입니다.

각 이상 징후 카드에는 다음이 표시됩니다.
- 서비스 이름(예: `rds`)
- 사용 유형
- 영향을 받는 클라우드 계정
- 예상 비용 대 실제 비용
- 비용 추세 그래프(지난 1개월)

이상 징후는 비용 영향도 순으로 정렬되며, 가장 큰 변화가 상단에 표시됩니다.

## 이상 징후 조사 {#investigate-anomalies}

### 이상 징후 유발 원인 파악 {#understand-what-drives-anomalies}

CCM은 조사 도우미인 [Watchdog Explains][2]를 자동으로 사용하여 비용 이상 징후를 유발하는 원인을 파악하도록 돕습니다. Watchdog Explains는 다음의 구체적인 항목을 분석하고 식별합니다.

- 계정
- 팀
- 서비스
- Kubernetes 또는 ECS 클러스터
- 리전

이와 같이 이상 징후가 발생한 위치를 파악하여 수동 조사 단계를 줄여줍니다. 이상 징후 그래프 위에 마우스를 올리면 두 개의 그래프를 볼 수 있습니다. 하나는 Watchdog Explains가 식별한 태그가 포함된 그래프이고, 다른 하나는 포함되지 않은 그래프입니다. 이는 특정 태그를 제거했을 때 급증 현상이 어떻게 완화되는지를 보여주며, 비용에 미치는 영향을 확인해 줍니다.

### 이상 징후에 대한 조치 취하기 {#take-action-on-anomalies}

다음 단계에 따라 이상 징후를 조사하고 해결하세요.

1. 이상 징후 위로 마우스를 가져가 이상을 유발하는 요인을 확인하거나 {{< ui >}}See more{{< /ui >}}를 클릭하여 사이드 패널을 엽니다.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="See More를 클릭하여 이상 징후 세부 정보, 조사 옵션 및 작업 버튼이 표시된 사이드 패널을 확인합니다." style="width:80;" >}}

1.  영향을 받는 서비스, 관련된 팀, 영향을 받는 환경, 리소스 ID 또는 사용량 및 단가가 비용 이상 징후를 유발하는 방식에 대한 세부 정보를 검토합니다.
1. **추가 조사**: Cost Explorer 또는 Datadog 노트북에서 이상 징후를 확인하여 추가 차원을 사용해 더 자세히 조사합니다. 그런 다음 이상 징후, 탐색기 링크 또는 노트북을 Watchdog Explains에서 식별한 서비스 소유자나 팀에 보낼 수 있습니다. 이를 통해 팀은 이상 징후가 발생한 이유와 예상된 상황인지 여부에 대한 컨텍스트를 바탕으로 이상 징후를 해결할 수 있습니다.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Take Action을 클릭하여 Cost Explorer에서 이상 징후를 확인하거나 노트북에 추가합니다." style="width:80;" >}}
1. **모니터링 설정**: 유사한 패턴에 대한 비용 이상 징후 모니터를 생성하거나 향후 발생할 이상 징후에 대한 경보를 구성합니다.
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="비용 이상 징후 모니터 생성" style="width:80;" >}}

## 이상 징후 해결 {#resolve-anomalies}

이상 징후를 조사하다 보면 중요하지 않거나, 실제로는 예상된 비용이거나, 그 외 이상 징후로 간주되지 않는 항목을 발견할 수 있습니다.

이상 징후를 해결하려면 다음 단계를 따르세요.

1. {{< ui >}}Resolve Anomaly{{< /ui >}}를 클릭하여 해결 팝업을 엽니다.
1. 다음 해결 방법 중 하나를 선택합니다.
   - {{< ui >}}The anomaly amount was too small{{< /ui >}}
   - {{< ui >}}This is an unexpected increase{{< /ui >}}
   - {{< ui >}}This is an expected increase{{< /ui >}}
1. 이상 징후인 이유 또는 이상 징후가 아닌 이유에 대한 컨텍스트를 추가합니다.
1. {{< ui >}}Resolve{{< /ui >}}를 클릭하여 {{< ui >}}Resolved{{< /ui >}} 탭으로 이동합니다.

다음은 비용 이상 징후를 중요하다고 표시하고, 이상 징후인 이유를 설명하는 방법의 예시입니다.

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="설명 필드가 포함된 예상치 못한 이상 징후 표시 양식" style="width:80;" >}}

## 문제 해결 {#troubleshooting}

예상되는 이상 징후가 나타나지 않는 경우 다음 단계를 따르세요.
- CCM이 [올바르게 설정][3]되었는지 확인합니다.
- AWS, Azure, Google Cloud 또는 Oracle Cloud에 필요한 권한이 있는지 검사합니다.
- 이상 징후 보기의 시간 범위를 검토합니다.

도움이 더 필요하면 [Datadog 지원팀][4]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /ko/dashboards/graph_insights/watchdog_explains
[3]: /ko/cloud_cost_management/setup/
[4]: /ko/help/
[5]: /ko/cloud_cost_management/cloud_cost_skill/