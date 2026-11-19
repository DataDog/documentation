---
aliases:
- /ko/tracing/trace_ingestion/control_page
- /ko/tracing/trace_ingestion/ingestion_control_page
- /ko/account_management/billing/usage_control_apm/
- /ko/tracing/app_analytics/
- /ko/tracing/guide/ingestion_control_page/
- /ko/tracing/trace_ingestion/ingestion_controls
description: APM을 사용하여 수집 속도를 제어하는 방법을 알아보세요.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: 설명서
  text: 수집 메커니즘
- link: /tracing/trace_pipeline/metrics/
  tag: 설명서
  text: 사용량 메트릭
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: 아키텍처 센터
  text: '분산 추적 마스터: 데이터 볼륨 문제와 효율적인 샘플링을 위한 Datadog의 접근 방식'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: 아키텍처 센터
  text: '분산 추적 최적화: 예산 범위 내에서 중요 트레이스를 캡처하기 위한 모범 사례'
title: 수집 제어
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="수집 샘플링 규칙" >}}

수집 제어는 애플리케이션이 Datadog으로 어느 트레이스를 전송하는지에 영향을 미칩니다. [APM 메트릭][1]은 항상 모든 트레이스에 기반해 계산되며, 수집 제어의 영향을 받지 않습니다.

Ingestion Control 페이지를 보면 애플리케이션 및 서비스의 수집 구성을 확인할 수 있습니다. [Ingestion Control 페이지][2]에서는 다음을 할 수 있습니다.

- 서비스 수준 수집 구성에 대한 가시성을 확보합니다.
- 처리량이 많은 서비스 또는 엔드포인트의 트레이스 샘플링 비율을 조정하여 할당량을 더 잘 관리합니다.
- 처리량이 적고 트래픽이 드문 서비스 또는 엔드포인트의 트레이스 샘플링 비율을 조정하여 가시성을 높입니다.
- 트레이스 대부분의 샘플링을 담당하는 [수집 메커니즘][11]이 무엇인지 이해합니다.
- Agent에 대한 제한된 CPU 또는 RAM 리소스와 같은 잠재적 수집 구성 문제를 조사하고 대처합니다.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page_redesigned.png" style="width:100%;" alt="Ingestion Control 페이지 개요" >}}

## 수집 구성 이해 {#understanding-your-ingestion-configuration}

페이지 헤더의 데이터를 사용하여 트레이스 수집을 모니터링하세요.

Monthly Ingestion
: 이번 달에 지금까지 수집된 데이터 양, 예상 월말 수집량, 월간 할당량을 보여줍니다. 예상 수집량이 할당량 내에 유지될지 여부를 나타내는 상태 메시지도 함께 표시됩니다.

APM Adaptive Sampling
: 월간 할당량 중 [적응형 샘플링][17] 목표가 차지하는 비율과 서비스 제한 대비 온보딩된 서비스 수를 보여줍니다.

Ingestion Over Time
: 출처(APM, 기타 Datadog 제품 또는 OTel)별로 분석된 시간에 따른 수집 볼륨 그래프로, 월간 할당량이 참조 선으로 표시됩니다.

예상 수집량이 월간 할당량 미만이면 정상적으로 진행 중인 것입니다. 할당량을 초과할 것으로 예상되는 경우, [서비스 수집 속도](#configuring-ingestion-for-a-service) 또는 [적응형 샘플링 목표][21]를 조정하세요.

### 서비스별 수집 수준 {#ingestion-levels-by-service}

서비스 표에는 서비스별로 분석된 수집 볼륨 및 수집 구성에 대한 정보가 포함되어 있습니다. 표 위의 **All services**, **Managed by APM**, **Managed by other Datadog products**, **Managed by OTel** 탭을 사용하여 수집 출처별로 서비스를 필터링하세요.

Type
: 서비스 유형: 웹 서비스, 데이터베이스, 캐시, 브라우저 등입니다.

Name
: Datadog으로 트레이스를 전송하는 각 서비스의 이름입니다. 표에 지난 한 시간 동안 데이터가 수집된 루트 서비스 및 비루트 서비스가 포함되어 있습니다.

Ingested Traces/s
: 지난 한 시간 동안 서비스에서 시작하여 수집된 초당 트레이스 평균 개수입니다.

Ingested Bytes/s
: 지난 한 시간 동안 서비스에 대해 수집된 초당 바이트 평균 개수입니다.

Downstream Bytes/s
: 수집된 초당 바이트 평균 개수로, 서비스가 이에 대하여 _샘플링 결정을 내립니다_. 여기에는 트레이스 헤드에서 내려진 결정을 따르는 호출 스택의 모든 다운스트림 서비스 스팬의 바이트가 포함됩니다. 이 열의 데이터는 `sampling_service` 차원을 기반으로 하며, `datadog.estimated_usage.apm.ingested_bytes` 메트릭에서 설정됩니다. 자세한 내용은 [APM 사용량 메트릭][15]을 참조하세요.

Traffic Breakdown
: 서비스에서 시작하여 트레이스에 대해 샘플링된 트래픽과 샘플링되지 않은 트래픽의 상세 분석 정보입니다. 서비스 트래픽의 25% 이상이 속도 리미터에 의해 제거되면 분석 정보 옆에 경고 아이콘이 표시됩니다. 자세한 내용은 [트래픽 분석](#traffic-breakdown)을 참조하세요.

Configuration
: 서비스의 수집 출처가 된 제품을 표시하며, APM 서비스의 경우 샘플링 구성 방식도 표시합니다. Agent의 [기본 헤드 기반 샘플링 메커니즘][4]이 적용되는 경우 `APM Agent`이고, SDK 구성의 [샘플링 규칙][8]이 적용되는 경우 `APM Local`이며, 샘플링 규칙(사용자 정의 또는 [적응형 샘플링][17])이 UI를 통해 원격으로 적용되는 경우 `APM Remote`입니다. OpenTelemetry를 통한 수집에는 `OTel` 레이블이 지정됩니다. 기타 Datadog 제품에서의 수집에는 `RUM`, `Synthetics`, `AppSec`, `CI Visibility` 또는 `AWS X-Ray` 레이블이 지정됩니다. 둘 이상의 범주와 일치하는 서비스에는 `N Configurations` 배지가 표시됩니다. 전체 목록을 보려면 배지 위로 마우스를 가져가세요. 서비스 수집 구성에 대한 자세한 내용은 [기본 수집 속도 변경](#configuring-ingestion-for-a-service)을 참조하세요.

Adaptive Sampling
: 서비스의 [적응형 샘플링][17] 도입 상태를 보여줍니다. 서비스에 적응형 샘플링이 적용되는 경우 `Full` 또는 `Partial`이고(배지 위로 마우스를 가져가면 적용 범위 비율 확인 가능), 서비스를 온보딩할 수 있지만 아직 온보딩되지 않은 경우 `Compatible`이고, 서비스의 트레이서 또는 Agent 버전이 적응형 샘플링을 지원하지 않는 경우 `Not Compatible`이며, 서비스에 대해 적응형 샘플링이 명시적으로 해제되어 있는 경우 `Disabled`입니다.

Infrastructure
: 서비스가 실행되고 있는 호스트, 컨테이너 및 함수입니다. 이 열은 기본적으로 숨겨져 있습니다. 표의 **Options** 메뉴에서 활성화하세요.

서비스 이름, 환경, 구성 또는 적응형 샘플링 상태별로 페이지를 필터링하거나 **Root services only**를 전환하여 조치가 필요한 서비스를 확인하세요. 전역 수집 볼륨을 줄이려면 `Downstream Bytes/s` 열을 기준으로 표를 정렬하여 수집에서 점유율이 가장 큰 서비스를 조회합니다.

**참고**: 표는 [사용량 메트릭][10] `datadog.estimated_usage.apm.ingested_spans` 및 `datadog.estimated_usage.apm.ingested_bytes` 기반입니다. 이러한 메트릭은 `service`, `env` 및 `ingestion_reason`으로 태그가 지정됩니다.

#### Traffic breakdown {#traffic-breakdown}

Traffic Breakdown 열에는 서비스에서 시작하여 모든 트레이스의 목적지를 분석한 정보가 포함됩니다. 이 열을 보면 수집되고 제거되는 트래픽의 예상 점유율과 그 이유를 알 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="트레이스 수집의 트래픽 분석" >}}

분석은 다음과 같은 여러 부분으로 구성됩니다.

- {{< ui >}}Complete traces ingested{{< /ui >}}(파란색): Datadog이 수집한 트레이스의 비율입니다.
- {{< ui >}}Complete traces not retained{{< /ui >}} (회색): Datadog이 수집하지 않은 트레이스의 비율입니다. 일부 트레이스가 제거될 수 있는 이유는 다음과 같습니다. 

    1. 기본적으로 서비스에서 [Agent가 자동으로 샘플링 비율을 설정][4]합니다(서비스 트래픽에 따름).
    2. 서비스가 [샘플링 규칙][8]을 사용하여 트레이스의 특정 비율을 수집하도록 구성되었습니다.

- {{< ui >}}Complete traces dropped by the SDK rate limiter{{< /ui >}} (주황색): 트레이스 샘플링 규칙을 사용하여 서비스 수집 속도를 백분율로 수동 설정하기로 하면 속도 리미터가 자동으로 활성화되고, 기본적으로 초당 트레이스 100개로 설정됩니다. 이 속도를 변경하려면 [속도 리미터][8] 설명서를 참조하세요.

- {{< ui >}}Traces dropped due to the Agent CPU or RAM limit{{< /ui >}} (빨간색): 이 메커니즘은 스팬을 제거하고 불완전한 트레이스를 생성할 수 있습니다. 이 문제를 해결하려면 Agent를 실행 중인 인프라의 CPU 및 메모리 할당량을 늘리세요.

## 서비스의 수집 구성 {#configuring-ingestion-for-a-service}

아무 서비스나 클릭하면 Service Ingestion Summary를 조회할 수 있으며, 여기에 실행 가능한 인사이트 및 해당 서비스의 트레이스 수집을 관리하는 구성 옵션이 제공됩니다.

### 서비스의 수집 구성 {#ingestion-configuration-for-a-service}

#### 리소스별 샘플링 비율 {#sampling-rates-by-resource}

표에 서비스의 리소스별로 적용된 샘플링 비율이 나열되어 있습니다.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="리소스별 샘플링 비율 표" style="width:100%;">}}

- `Ingested bytes` 열에는 서비스 및 리소스의 스팬에서 수집된 바이트가 표시됩니다. 또한 `Downstream bytes` 열에는 해당 서비스 및 리소스에서 시작하여 샘플링 결정이 내려진 스팬에서 수집된 바이트가 표시되며, 여기에는 호출 체인의 다운스트림 서비스에서 수집된 바이트도 포함됩니다.
- `Ingested traces` 열은 서비스 및 리소스에서 시작되는 트레이스 수를 계산합니다. 내부 메서드와 같이 하위 스팬에만 나타나는 리소스의 경우 수집된 트레이스가 `0`개로 표시됩니다. 해당 스팬의 바이트는 여전히 `Ingested bytes` 열에 표시됩니다.
- `Configuration` 열에는 리소스 샘플링 비율이 어디에서 적용되었는지 표시됩니다. 
  - `Automatic`: Agent의 [기본 헤드 기반 샘플링 메커니즘][4]이 적용되는 경우
  - `Local Configured`: [샘플링 규칙][8]이 SDK에서 로컬로 설정된 경우
  - `Remote Configured`: Datadog UI에서 원격 샘플링 규칙이 설정된 경우. Ingestion Control 페이지에서 샘플링 규칙을 구성하는 방법을 알아보려면 [샘플링 규칙 원격으로 구성](#configure-the-service-ingestion-rates-by-resource) 관련 섹션을 참조하세요.

**참고**: 서비스가 샘플링 결정을 내리지 않는 경우, 서비스의 리소스가 `Resources not making sampling decisions` 행 아래로 축소됩니다.

**참고**: 시간 프레임이 짧은 경우(1~4시간), 샘플링 비율이 100%에서 구성되었더라도 Effective Sampling Rate가 100% 미만으로 표시될 수 있습니다. 이는 수렴하려면 데이터 포인트가 더 많이 필요한 통계적 계산으로 인해 예상되는 동작입니다. 모든 트레이스가 여전히 정확하게 캡처되고 있습니다. 가장 정확한 정보를 표시하려면 더 긴 기간에 대해 샘플링 비율을 조회하세요.

#### 수집 이유 및 샘플링 결정자 {#ingestion-reasons-and-sampling-decision-makers}

{{< ui >}}Ingestion reasons breakdown{{< /ui >}}을 탐색하여 어떤 메커니즘이 서비스 수집을 담당하는지 확인하세요. 각각의 수집 이유는 한 가지 [수집 메커니즘][11]과 관련됩니다. 서비스 수집 구성을 변경한 후 지난 한 시간 동안 수집된 데이터를 바탕으로 이 시계열 그래프에서 수집된 바이트 및 스팬이 증가했는지 또는 감소했는지 관측할 수 있습니다.

서비스 수집 볼륨의 대부분이 업스트림 서비스가 내린 결정에 기인하는 경우, {{< ui >}}Sampling decision makers{{< /ui >}} 상위 목록의 세부 정보를 조사하세요. 예를 들어, 서비스가 루트가 아닌 경우(트레이스 샘플링 **결정을 내리지 않는다**는 의미), 루트가 아닌 서비스 수집을 담당하는 모든 업스트림 서비스를 관측합니다. 업스트림 루트 서비스가 전체 수집 볼륨을 줄이도록 구성하세요.

추가 조사를 해야 하는 경우, [APM 트레이스 - 예상 사용량 대시보드][12]를 사용하세요. 이 대시보드는 `service`, `env` 및 `ingestion reason` 기준 분석 그래프는 물론 전역 수집 정보도 제공합니다.

#### Agent 및 SDK 버전 {#agent-and-sdk-versions}

서비스가 사용 중인 {{< ui >}}Datadog Agent and SDK versions{{< /ui >}}를 확인하세요. 사용 중인 버전을 가장 최근에 출시된 버전과 비교하여 최신 버전의 Agent 및 라이브러리를 실행 중인지 확인합니다.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent 및 SDK 버전" >}}

### 서비스의 샘플링 비율 관리 {#managing-services-sampling-rates}

서비스의 샘플링 비율을 제어하는 데 사용하기 좋은 방법은 다음과 같습니다.
- {{< ui >}}Adaptive sampling{{< /ui >}}: 구성된 월별 수집 볼륨 목표에 맞춰 샘플링 비율을 자동으로 조정합니다.
- {{< ui >}}Resource-based sampling{{< /ui >}}: 리소스별로 명시적 샘플링 비율을 수동으로 설정합니다.

이러한 전략에 대한 구성은 Datadog UI를 통해 {{< ui >}}Remotely{{< /ui >}} 옵션으로 적용할 수 있습니다. 이 방법을 사용하면 서비스를 다시 배포하지 않고 변경 사항이 즉시 반영되게 할 수 있습니다. {{< ui >}}Resource-based Sampling{{< /ui >}}의 경우, 서비스의 구성 파일을 업데이트하고 다시 배포하여 구성을 **로컬로** 적용하는 옵션도 있습니다.

서비스 수집 속도에 **Remote Configuration**을 사용하는 데는 구체적인 요구 사항이 있습니다.

{{% collapse-content title="Remote Configuration 요구 사항" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] 이상.
- Agent에 [Remote Configuration][3]이 활성화됨.
- `APM Remote Configuration Write` [권한][20]. 해당 권한이 없는 경우, Datadog 관리자에게 조직 설정에서 권한을 업데이트해 달라고 요청하세요.

아래에서 해당 기능에 필요한 최소 SDK 버전을 참조하세요.

| 언어 | 필요한 최소 버전 |
|----------|--------------------------|
| Java     | v1.34.0                  |
| Go       | v1.64.0                  |
| Python   | v.2.9.0                  |
| Ruby     | v2.0.0                   |
| Node.js  | v5.16.0                  |
| PHP      | v1.4.0                   |
| .NET     | v2.53.2                  |
| C++      | v0.2.2                   |

{{% /collapse-content %}}

#### 적응형 샘플링 {#adaptive-sampling}

Datadog이 사용자를 대신해 서비스의 샘플링 비율을 관리하도록 허용하려면 적응형 샘플링을 사용하세요. 모든 서비스 및 엔드포인트에 대한 가시성을 유지하면서, 하나 또는 여러 개의 서비스에 대한 목표 월별 수집 볼륨을 지정합니다.

적응형 샘플링을 구성하려면 다음 단계를 따르세요.

1. [Ingestion Control][2] 페이지로 이동합니다.
2. 서비스를 클릭하여 {{< ui >}}Service Ingestion Summary{{< /ui >}}를 확인합니다.
3. {{< ui >}}Manage Ingestion Rate{{< /ui >}}를 클릭합니다.
4. 서비스의 샘플링 전략으로 {{< ui >}}Datadog adaptive sampling rates{{< /ui >}}를 선택합니다.
5. {{< ui >}}Apply{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">이 구성을 <strong>원격으로</strong> 적용하는 작업이 비활성화된 경우, <a href="#remote-configuration-requirements">Remote Configuration 요구 사항</a>을 충족하는지 확인하세요.</div>

자세한 내용은 [적응형 샘플링][17]을 참조하세요.


#### 리소스 기반 샘플링 {#resource-based-sampling}

리소스 이름별로 서비스의 사용자 지정 샘플링 비율을 구성하는 방법은 다음과 같습니다. 
1. [Ingestion Control][2] 페이지로 이동합니다.
2. 서비스를 클릭하여 {{< ui >}}Service Ingestion Summary{{< /ui >}}를 확인합니다.
3. {{< ui >}}Manage Ingestion rate{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Custom sampling rates only{{< /ui >}}를 클릭합니다.
5. {{< ui >}}Add new rule{{< /ui >}}을 클릭하여 일부 리소스의 샘플링 비율을 설정합니다.  
   **참고**: 샘플링 규칙은 전역 패턴 매칭을 사용하므로, 와일드카드(`*`)를 사용하여 동시에 여러 리소스에 매칭할 수 있습니다.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="구성 모달" style="width:100%;">}}
6. {{< ui >}}Remotely{{< /ui >}} 또는 {{< ui >}}Locally{{< /ui >}} 구성을 적용합니다.
{{< tabs >}}
{{% tab "Remotely" %}}

이 옵션은 Remote Configuration을 사용하여 구성을 적용하므로, 서비스를 다시 배포할 **필요 없이** 변경 사항이 적용됩니다. 구성 변경 사항은 [Live Search Explorer][100]에서 관측할 수 있습니다.

{{< ui >}}Apply{{< /ui >}}를 클릭하여 구성을 저장합니다. 

원격으로 구성된 리소스는 `Configured Remote`로 표시되며, {{< ui >}}Configuration{{< /ui >}} 열에 나타납니다.  

<br><div class="alert alert-info">이 구성을 <strong>원격으로</strong> 적용하는 작업이 비활성화된 경우, <a href="#remote-configuration-requirements">Remote Configuration 요구 사항</a>을 충족하는지 확인하세요.</div>

[100]: /ko/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Locally" %}}

이 옵션을 사용하면 사용자가 수동으로 적용할 구성이 생성됩니다.
1. 생성된 구성을 서비스에 적용합니다.  
   **참고**: 서비스 이름 값은 대소문자를 구분합니다. 이 값이 서비스 이름의 대소문자와 일치해야 합니다.
1. 서비스를 다시 배포합니다.
1. 새 비율이 적용되었는지 {{< ui >}}Traffic Breakdown{{< /ui >}} 열을 보고 확인합니다. 로컬로 구성된 리소스는 `Configured Local`로 표시되며, {{< ui >}}Configuration{{< /ui >}} 열에 나타납니다.

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent 수집 구성 관리 {#managing-datadog-agent-ingestion-configuration}

{{< ui >}}Configure Datadog Agent Ingestion{{< /ui >}}을 클릭하여 기본 헤드 기반 샘플링 비율, 오류 샘플링 및 레어 샘플링을 관리합니다.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent 수준 구성 모달" >}}

- [{{< ui >}}Head-based Sampling{{< /ui >}}][4]: 서비스에 구성된 샘플링 규칙이 없는 경우, Datadog Agent가 서비스에 적용할 샘플링 비율을 자동으로 산정하며, **Agent당 초당 트레이스 10개**를 목표로 정합니다. 이 목표 트레이스 수는 Datadog에서 변경하거나 Agent 수준에서 `DD_APM_TARGET_TPS`를 로컬로 설정하세요.
- [{{< ui >}}Error Spans Sampling{{< /ui >}}][5]: 헤드 기반 샘플링으로 포착되지 않은 트레이스의 경우, Datadog Agent가 **Agent당 초당 최대 10개의 로컬 오류 트레이스**를 포착합니다. 이 목표 트레이스 수는 Datadog에서 변경하거나 Agent 수준에서 `DD_APM_ERROR_TPS`를 로컬로 설정하세요.
- [{{< ui >}}Rare Spans Sampling{{< /ui >}}][6]: 헤드 기반 샘플링으로 포착되지 않은 트레이스의 경우, Datadog Agent가 **Agent당 초당 최대 5개의 로컬 레어 트레이스**를 포착합니다. 이 설정은 기본적으로 비활성화되어 있습니다. Datadog에서 레어 트레이스 수집을 활성화하거나 Agent 수준에서 `DD_APM_ENABLE_RARE_SAMPLER`를 로컬로 설정하세요.

원격 구성을 사용하는 경우, Agent를 다시 시작하지 않아도 이러한 파라미터를 업데이트할 수 있습니다. `Apply`를 클릭하여 구성 변경 사항을 적용하면 새 구성이 즉시 적용됩니다. Agent 샘플링 파라미터에 대한 원격 구성은 Agent 버전 [7.42.0][13] 이상을 사용하는 경우 사용할 수 있습니다.

**참고**: 파이 차트의 `Other Ingestion Reasons`(회색) 섹션은 기타 수집 이유를 나타내며, 이러한 이유는 Datadog Agent 수준에서 _구성할 수 없습니다_. 

**참고**: 원격으로 구성된 파라미터는 환경 변수 및 `datadog.yaml` 구성과 같은 로컬 구성보다 우선합니다.

## 샘플링 규칙의 우선 순위 {#sampling-rules-precedence}

샘플링 규칙이 여러 위치에서 설정된 경우 다음과 같은 우선 순위 규칙이 순서대로 적용되며, 목록에 먼저 표시되는 규칙은 우선 순위가 낮은 규칙을 재정의할 수 있습니다.

1. 원격으로 구성된 샘플링 규칙([리소스 기반 샘플링](#configure-the-service-ingestion-rates-by-resource)을 통해 설정됨)
1. [적응형 샘플링 규칙][17]
1. [로컬로 구성된 샘플링 규칙][8](`DD_TRACE_SAMPLING_RULES`)
1. [원격으로 구성된 전역 샘플링 비율][8]
1. [로컬로 구성된 전역 샘플링 비율][8](`DD_TRACE_SAMPLE_RATE`)
1. [Agent 설정](#managing-datadog-agent-ingestion-configuration)을 통해 원격으로 또는 로컬로 간접적으로 제어되는 트레이스 에이전트의 비율(`DD_APM_TARGET_TPS`)

다시 말해, Datadog은 다음과 같은 우선 순위 규칙을 사용합니다.
- 트레이서 설정 > Agent 설정
- 샘플링 규칙 > 전역 샘플링 비율
- 원격 > 로컬

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: /ko/tracing/guide/remote_config
[4]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /ko/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /ko/tracing/trace_pipeline/metrics
[11]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /ko/remote_configuration#enabling-remote-configuration
[15]: /ko/tracing/trace_pipeline/metrics#what-is-the-sampling-service
[17]: /ko/tracing/trace_pipeline/adaptive_sampling/
[18]: /ko/tracing/guide/trace_ingestion_volume_control/#globally-configure-the-ingestion-sampling-rate-at-the-agent-level
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[20]: /ko/account_management/rbac/permissions/
[21]: /ko/tracing/trace_pipeline/adaptive_sampling/#configure-the-adaptive-sampling-target