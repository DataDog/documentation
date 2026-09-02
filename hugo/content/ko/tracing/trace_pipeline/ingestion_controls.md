---
aliases:
- /ko/tracing/trace_ingestion/control_page
- /ko/tracing/trace_ingestion/ingestion_control_page
- /ko/account_management/billing/usage_control_apm/
- /ko/tracing/app_analytics/
- /ko/tracing/guide/ingestion_control_page/
- /ko/tracing/trace_ingestion/ingestion_controls
description: APM을 사용하여 수집 레이트를 제어하는 방법을 알아보세요.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: 설명서
  text: 수집 메커니즘
- link: /tracing/trace_pipeline/metrics/
  tag: 설명서
  text: 사용량 메트릭
title: Ingestion Control
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="수집 샘플링 규칙" >}}

수집 제어는 애플리케이션이 Datadog으로 어느 트레이스를 전송하는지에 영향을 미칩니다. [APM 메트릭][1]은 항상 모든 트레이스에 기반해 계산되며, 수집 제어의 영향을 받지 않습니다.

Ingestion Control 페이지를 보면 애플리케이션 및 서비스의 수집 구성을 확인할 수 있습니다. [Ingestion Control 페이지][2]에서:

- 서비스 수준 수집 구성에 대한 가시성을 얻습니다.
- 처리량이 많은 서비스 또는 엔드포인트의 트레이스 샘플링 레이트를 조정하여 수집 예산을 더 잘 관리합니다.
- 처리량이 적고, 트래픽이 드문 서비스 또는 엔드포인트의 트레이스 샘플링 레이트를 조정하여 가시성을 강화합니다.
- 트레이스 대부분의 샘플링을 담당하는 [수집 메커니즘][11]이 무엇인지 이해합니다.
- Agent에 대한 제한된 CPU 또는 RAM 리소스와 같은 잠재적 수집 구성 문제를 조사하고 대처합니다.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control 페이지 개요" >}}

## 수집 구성 이해하기 {#understanding-your-ingestion-configuration}

Ingestion Control 헤더의 데이터를 사용하여 트레이스 수집을 모니터링하세요. 헤더에는 지난 한 시간 동안 수집된 데이터 총량, 예상되는 월별 사용량 및 할당된 월별 수집 한도 백분율이 활성 APM 인프라(호스트, Fargate 작업 및 서버리스 함수 등) 기준으로 계산되어 표시됩니다.

월별 사용량이 `100%` 미만이면 예상 수집된 데이터가 월별 할당량 이내입니다. 월별 사용량 값이 `100%`를 초과하면 월별 수집된 데이터가 월별 할당량을 초과할 것으로 예상된다는 의미입니다.

### 서비스별 수집 수준 {#ingestion-levels-by-service}

서비스 표에 수집된 볼륨 및 수집 구성에 관한 정보가 서비스별로 분석하여 기재됩니다.

유형
: 서비스 유형: 웹 서비스, 데이터베이스, 캐시, 브라우저 등

이름
: Datadog으로 트레이스를 전송하는 각 서비스의 이름. 표에 지난 한 시간 동안 데이터가 수집된 루트 서비스 및 비루트 서비스가 포함되어 있습니다.

수집된 초당 트레이스
: 지난 한 시간 동안 서비스에서 시작하여 수집된 초당 트레이스 평균 개수입니다.

수집된 초당 바이트
: 지난 한 시간 동안 서비스에 대해 수집된 초당 바이트 평균 수입니다.

다운스트림 초당 바이트
: 초당 수집된 평균 바이트 수로, 서비스가 이에 대하여 _샘플링 결정을 내립니다_. 여기에는 트레이스 헤드에서 내려진 결정을 따르는 콜 스택의 모든 다운스트림 서비스 스팬의 바이트를 포함합니다. 이 열의 데이터는 `sampling_service` 디멘션 기반이며, `datadog.estimated_usage.apm.ingested_bytes` 메트릭에서 설정됩니다. 자세한 내용은 [APM 사용량 메트릭][15]을 참조하세요.

트래픽 분석
: 서비스에서 시작된, 샘플링된 트레이스와 샘플링되지 않은 트레이스의 상세한 트래픽 분석입니다. 자세한 내용은 [트래픽 분석](#traffic-breakdown)을 참조하세요.

수집 구성
: Agent의 [기본 헤드 기반 샘플링 메커니즘][4]이 적용되는 경우 `Automatic`이 표시됩니다. 수집이 [트레이스 샘플링 규칙][8]을 사용하여 구성된 경우, 서비스는 `Configured`로 표시되며, 샘플링 규칙이 SDK의 구성에서 적용된 경우 `Local` 레이블이 설정되고, 샘플링 규칙이 UI에서 원격으로 적용된 경우 `Remote` 레이블이 설정됩니다. 서비스의 수집 구성과 관련한 자세한 정보는 [기본 수집 레이트 변경](#configure-the-service-ingestion-rate)을 참조하세요.

인프라
: 서비스가 실행되고 있는 호스트, 컨테이너 및 함수입니다.

서비스 상태
: Datadog Agent가 [구성에서 설정된][9] CPU 또는 RAM 한도에 도달했기 때문에 일부 스팬이 드롭된 경우 `Limited Resource`, 일부 스팬이 레거시 [App Analytics 메커니즘][7]을 통해 수집된 경우 `Legacy Setup`, 기타 경우 `OK`가 표시됩니다.

페이지를 환경, 구성 및 상태 기준으로 필터링하여 조처해야 하는 서비스가 무엇인지 조회하세요. 전역 수집 볼륨을 줄이려면 표를 `Downstream Bytes/s` 열 기준으로 정렬하여 수집에서 점유율이 가장 큰 서비스를 조회합니다.

**참고**: 표는 [사용량 메트릭][10] `datadog.estimated_usage.apm.ingested_spans` 및 `datadog.estimated_usage.apm.ingested_bytes` 기반입니다. 이러한 메트릭은 `service`, `env` 및 `ingestion_reason`으로 태그됩니다.

#### 트래픽 분석 {#traffic-breakdown}

트래픽 분석 열에는 서비스에서 시작되는 모든 트레이스의 대상의 상세한 내역이 기재됩니다. 이 열을 보면 수집되고 드롭되는 트래픽의 예상 점유율과 그 이유를 알 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="트레이스 수집의 트래픽 분석" >}}

분석은 다음과 같은 여러 부분으로 구성됩니다.

- **수집된 전체 트레이스**(파란색): Datadog이 수집한 트레이스의 비율입니다.
- **유지되지 않은 전체 트레이스**(회색): Datadog이 수집하지 않은 트레이스의 비율입니다. 일부 트레이스가 드롭되는 가능한 이유는 다음과 같습니다. 

    1. 기본적으로 [Agent가 서비스에서 자동으로 샘플링 레이트를 설정][4]합니다(서비스 트래픽에 따라).
    2. 서비스가 [샘플링 규칙][8]을 사용하여 트레이스의 특정 비율을 수집하도록 구성되었습니다.

- **SDK 레이트 리미터가 드롭한 전체 트레이스**(주황색): 서비스 수집 레이트를 트레이스 샘플링 규칙을 사용하여 백분율로 수동 설정하기로 하면 레이트 리미터가 자동으로 활성화되고, 기본적으로 초당 트레이스 100개로 설정됩니다. 이 레이트를 변경하려면 [레이트 리미터][8] 설명서를 참조하세요.

- **Agent CPU 또는 RAM 한도로 인해 드롭된 트레이스**(빨간색): 이 메커니즘은 스팬을 드롭하고 완전하지 않은 트레이스를 생성할 수 있습니다. 이 문제를 해결하려면 Agent를 실행 중인 인프라의 CPU 및 메모리 할당량을 늘리세요.

## 서비스의 수집 구성 {#configuring-ingestion-for-a-service}

아무 서비스나 클릭하면 Service Ingestion Summary를 조회할 수 있으며, 여기에 실행 가능한 인사이트 및 해당 서비스의 트레이스 수집을 관리하는 구성 옵션이 제공됩니다.

### 서비스의 수집 구성 {#ingestion-configuration-for-a-service}

#### 리소스별 샘플링 레이트 {#sampling-rates-by-resource}

표에 서비스의 리소스별로 적용된 샘플링 레이트를 나열했습니다.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="리소스별 샘플링 레이트 표" style="width:100%;">}}

- `Ingested bytes` 열에는 서비스 및 리소스의 스팬에서 수집된 바이트가 표시되고, `Downstream bytes` 열에는 해당 서비스 및 리소스에서 시작하는 샘플링 결정이 내려진 스팬에서 수집한 바이트가 표시되며, 여기에는 콜 체인의 다운스트림 서비스에서 수집한 바이트도 포함합니다.
- `Configuration` 열에는 리소스 샘플링 레이트가 어디에서 적용되었는지 표시됩니다. 
  Agent의 [기본 헤드 기반 샘플링 메커니즘][4]이 적용되는 경우 - `Automatic`.
  [샘플링 규칙][8]이 SDK에서 로컬로 설정된 경우 - `Local Configured`.
  Datadog UI에서 원격 샘플링 규칙이 설정된 경우 - `Remote Configured`. Ingestion Control 페이지에서 샘플링 규칙을 구성하는 방법을 알아보려면 [샘플링 규칙 원격으로 구성](#configure-the-service-ingestion-rates-by-resource) 관련 섹션을 참조하세요.

**참고**: 서비스가 샘플링 결정을 내리지 않는 경우, 서비스의 리소스가 `Resources not making sampling decisions` 행 아래로 축소됩니다.

**참고**: 시간 프레임이 짧은 경우(1~4시간), 샘플링 레이트가 100%에서 구성되었더라도 유효 샘플링 레이트가 100% 미만으로 표시될 수 있습니다. 이것은 수렴하려면 데이터 포인트가 더 많이 필요한 통계적 계산으로 인해 예상되는 동작입니다. 모든 트레이스가 여전히 정확하게 캡처되고 있습니다. 가장 정확한 정보를 표시하려면, 더 긴 기간에 대하여 샘플링 레이트를 조회하세요.

#### 수집 사유 및 샘플링 결정자 {#ingestion-reasons-and-sampling-decision-makers}

서비스 수집이 어느 메커니즘을 따르는지 확인하려면 **수집 사유 분석**을 살펴보세요. 각각의 수집 사유는 한 가지 [수집 메커니즘][11]과 관련됩니다. 서비스 수집 구성을 변경하고 나서, 지난 한 시간 동안 수집된 데이터에 따른 이 시계열 그래프에서 수집된 바이트 및 스팬이 증가했는지 감소했는지 관측할 수 있습니다.

서비스 수집 볼륨의 대부분이 업스트림 서비스가 내린 결정에 기인하는 경우, **샘플링 결정자** 상위 목록의 세부 정보를 조사하세요. 예를 들어 서비스가 루트가 아닌 경우(즉 트레이스 샘플링 **결정을 내리지 않는다**는 의미), 루트가 아닌 서비스 수집을 담당하는 모든 업스트림 서비스를 관측합니다. 업스트림 루트 서비스가 전체 수집 볼륨을 줄이도록 구성하세요.

추가 조사를 해야 하는 경우, [APM 트레이스 - 예상 사용량 대시보드][12]를 사용하세요. 이 대시보드는 `service`, `env` 및 `ingestion reason` 기준 분석 그래프는 물론 전역 수집 정보도 제공합니다.

#### Agent 및 SDK 버전 {#agent-and-sdk-versions}

서비스가 사용 중인 **Datadog Agent 및 SDK 버전**을 확인하세요. 사용 중인 버전을 가장 최근에 출시된 버전과 비교하여 최근, 최신 버전의 Agent 및 라이브러리를 실행 중인지 확인합니다.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent 및 SDK 버전" >}}

### 서비스의 샘플링 레이트 관리 {#managing-services-sampling-rates}

서비스의 샘플링 레이트를 제어하는 데 사용하기 좋은 방법:
- **적응형 샘플링**: 구성된 월별 수집된 볼륨 예산과 일치하도록 샘플링 레이트를 자동으로 조정합니다.
- **리소스 기반 샘플링**: 리소스별로 명시적인 샘플링 레이트를 수동으로 설정합니다.

이러한 전략의 구성은 Datadog UI를 통해 **원격으로** 적용할 수 있습니다. 이 방법을 사용하면 서비스를 다시 배포하지 않고 변경 사항이 즉시 반영되게 할 수 있습니다. **리소스 기반 샘플링**의 경우, 서비스의 구성 파일을 업데이트하고 다시 배포하여 구성을 **로컬로** 적용하는 옵션도 있습니다.

서비스 수집 레이트에 **Remote Configuration**을 사용하는 데는 구체적인 요구 사항이 있습니다.

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

Datadog이 사용자를 대신해 서비스의 샘플링 레이트를 관리하도록 허용하려면 적응형 샘플링을 사용하세요. 모든 서비스 및 엔드포인트에 대한 가시성을 유지하면서, 하나 또는 여러 개의 서비스에 대한 목표 월별 수집 볼륨을 지정합니다.

적응형 샘플링을 구성하는 방법:

1. [Ingestion Control][2] 페이지로 이동합니다.
2. 서비스를 클릭하여 **Service Ingestion Summary**를 조회합니다.
3. **수집 레이트 관리**를 클릭합니다.
4. **Datadog 적응형 샘플링 레이트**를 서비스의 샘플링 전략으로 선택합니다.
5. **적용**을 클릭합니다.

<div class="alert alert-info">이 구성을 <strong>원격으로</strong> 적용하는 작업이 비활성화된 경우, <a href="#remote-configuration-requirements">Remote Configuration 요구 사항</a>을 충족하는지 확인하세요.</div>

자세한 내용은 [적응형 샘플링][17]을 참조하세요.


#### 리소스 기반 샘플링 {#resource-based-sampling}

리소스 이름별로 서비스의 사용자 지정 샘플링 레이트를 구성하는 방법: 
1. [Ingestion Control][2] 페이지로 이동합니다.
2. 서비스를 클릭하여 **Service Ingestion Summary**를 조회합니다.
3. **수집 레이트 관리**를 클릭합니다.
4. **사용자 지정 샘플링 레이트만**을 클릭합니다.
5. **새 규칙 추가**를 클릭하여 일부 리소스의 샘플링 레이트를 설정합니다.  
   **참고**: 샘플링 규칙은 전역 패턴 매칭을 사용하므로, 와일드카드(`*`)를 사용하여 동시에 여러 리소스에 매칭할 수 있습니다.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="구성 모달" style="width:100%;">}}
6. 구성을 **원격으로** 또는 **로컬로** 적용:
{{< tabs >}}
{{% tab "원격으로" %}}

이 옵션은 Remote Configuration을 사용하여 구성을 적용하므로, 서비스를 다시 배포할 **필요 없이** 변경 사항이 적용됩니다. 구성 변경 사항은 [Live Search Explorer][100]에서 관측할 수 있습니다.

**적용**을 클릭하면 구성이 저장됩니다. 

원격으로 구성된 리소스는 **구성** 열에 `Configured Remote`로 표시됩니다.  

<br><div class="alert alert-info">이 구성을 <strong>원격으로</strong> 적용하는 작업이 비활성화된 경우, <a href="#remote-configuration-requirements">Remote Configuration 요구 사항</a>을 충족하는지 확인하세요.</div>

[100]: /ko/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "로컬로" %}}

이 옵션을 사용하면 사용자가 수동으로 적용할 구성이 생성됩니다.
1. 생성된 구성을 서비스에 적용하세요.  
   **참고**: 서비스 이름 값은 대소문자를 구분합니다. 이 값이 서비스 이름의 대소문자와 일치해야 합니다.
1. 서비스를 다시 배포합니다.
1. 새 비율이 적용되었는지 **트래픽 분석** 열을 보고 확인하세요. 로컬로 구성된 리소스는 **구성** 열에 `Configured Local`로 표시됩니다.

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent 수집 구성 관리 {#managing-datadog-agent-ingestion-configuration}

**Datadog Agent 수집 구성**을 클릭하여 기본 헤드 기반 샘플링 레이트, 오류 샘플링 및 레어 샘플링을 관리합니다.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent 수준 구성 모달" >}}

- **[헤드 기반 샘플링][4]**: 서비스에 대하여 구성된 샘플링 규칙이 없는 경우, Datadog Agent가 서비스에 적용될 샘플링 레이트를 자동으로 계산하며, **Agent당 초당 트레이스 10개**를 목표로 정합니다. 이 목표 트레이스 수는 Datadog에서 변경하거나 Agent 수준에서 `DD_APM_TARGET_TPS`를 로컬로 설정하세요.
- **[오류 스팬 샘플링][5]**: 헤드 기반 샘플링으로 포착되지 않은 트레이스의 경우, Datadog Agent가 **Agent당 초당 트레이스 최대 10개까지** 로컬 오류 트레이스를 포착합니다. 이 목표 트레이스 수는 Datadog에서 변경하거나 Agent 수준에서 `DD_APM_ERROR_TPS`를 로컬로 설정하세요.
- **[레어 스팬 샘플링][6]**: 헤드 기반 샘플링으로 포착되지 않은 트레이스의 경우, Datadog Agent가 **Agent당 초당 트레이스 최대 5개까지** 로컬 레어 트레이스를 포착합니다. 이 설정은 기본적으로 비활성화되어 있습니다. Datadog에서 레어 트레이스 수집을 활성화하거나 Agent 수준에서 `DD_APM_ENABLE_RARE_SAMPLER`를 로컬로 설정하세요.

원격 구성을 사용하는 경우, Agent를 다시 시작하지 않아도 이러한 파라미터를 업데이트할 수 있습니다. `Apply`를 클릭하여 구성 변경 사항을 적용하면 새 구성이 즉시 적용됩니다. Agent 샘플링 파라미터에 대한 원격 구성은 Agent 버전 [7.42.0][13] 이상을 사용하는 경우 사용할 수 있습니다.

**참고**: 파이 차트의 `Other Ingestion Reasons`(회색) 섹션은 기타 수집 사유를 나타내며, 이러한 사유는 Datadog Agent 수준에서 _구성할 수 없습니다_. 

**참고**: 원격으로 구성된 파라미터는 환경 변수 및 `datadog.yaml` 구성과 같은 로컬 구성보다 우선합니다.

## 샘플링 규칙의 우선순위 {#sampling-rules-precedence}

샘플링 규칙이 여러 위치에서 설정된 경우 다음과 같은 우선순위 규칙이 순서대로 적용되며, 목록에 먼저 표시되는 규칙은 우선순위가 낮은 규칙을 재정의할 수 있습니다.

1. [리소스 기반 샘플링](#configure-the-service-ingestion-rates-by-resource)을 통해 설정된, 원격으로 구성된 샘플링 규칙
1. [적응형 샘플링 규칙][17]
1. [로컬로 구성된 샘플링 규칙][8] (`DD_TRACE_SAMPLING_RULES`)
1. [원격으로 구성된 전역 샘플링 레이트][8]
1. [로컬로 구성된 전역 샘플링 레이트][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Agent 설정](#managing-datadog-agent-ingestion-configuration)을 통해 원격으로 또는 로컬로 간접적으로 제어되는 트레이스 에이전트의 레이트(`DD_APM_TARGET_TPS`)

다시 말해, Datadog은 다음과 같은 우선순위 규칙을 사용합니다.
- 트레이서 설정 > Agent 설정
- 샘플링 규칙 > 전역 샘플링 레이트
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