---
aliases:
- /ko/tracing/guide/adaptive_sampling
description: 서비스 엔드포인트에 대한 가시성을 유지하면서 특정 예산에 맞춰 샘플링 비율을 자동으로 조정합니다.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: 설명서
  text: 수집 메커니즘
- link: /tracing/trace_pipeline/ingestion_controls
  tag: 설명서
  text: Ingestion Controls
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: 아키텍처 센터
  text: '분산 트레이싱 최적화: 예산 범위 내에서 중요 트레이스를 캡처하기 위한 모범 사례'
site_support_id: adaptive_sampling
title: 적응형 샘플링
---
## 개요 {#overview}

Datadog **적응형 샘플링**은 특정 예산(수집된 기가바이트)에 근접한 수준을 유지하면서 더 관련성 높은 트레이스를 캡처하는 데 도움이 됩니다.

적응형 샘플링을 샘플링 전략으로 선택하면 하나 이상의 서비스에 대한 트레이스 수집의 월간 타겟 볼륨을 선택하게 됩니다. 이를 통해 이러한 서비스의 소비량이 월말에 타겟 볼륨과 일치하도록 보장하면서 엔드포인트에 대한 가시성을 유지할 수 있습니다.

적응형 샘플링은 [Remote Configuration][3]과 기존 [샘플링 규칙][7] 메커니즘을 사용하여 각 환경, 서비스 및 리소스 조합에 대한 샘플링 비율을 동적으로 조정합니다. 이를 통해 다음을 수행할 수 있습니다.
- 지정된 월간 예산에 맞춥니다.
- 각 서비스, 리소스 및 환경 조합에 대해 5분마다 최소 하나의 트레이스를 캡처하여 트래픽이 적은 서비스 및 엔드포인트에 대한 가시성을 보장합니다.

서비스가 적응형 샘플링을 사용하도록 구성하려면 아래 나열된 지침을 따르세요.

## 요구 사항 {#requirements}

- Datadog Agent[7.53.0][2] 이상.
- Agent에 [Remote Configuration][3]이 활성화됨.
- `APM Remote Configuration Write` [권한][4].  
   **참고**: 해당 권한이 없는 경우, Datadog 관리자에게 조직 설정에서 권한을 업데이트해 달라고 요청하세요.

### 트레이싱 라이브러리 버전 {#tracing-library-versions}

다음 표는 적응형 샘플링에 필요한 최소 SDK 버전을 나열합니다.

| 언어    | 필요한 최소 버전 |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v3.14.2][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |
| Rust        | [v0.4.0][20]             |

## 제한 사항 {#limitations}

샘플링 구성에 따라 서비스 및 환경 조합에 제한이 적용됩니다.

#### 적응형 샘플링 {#adaptive-sampling}

- 적응형 샘플링에 온보딩된 `service/env` 조합의 최대 개수는 800개입니다.
- 적응형 샘플링을 위해 구성된 각 고유 `service/env` 쌍은 이 제한에 포함됩니다.

#### 원격 샘플링 구성 {#remote-sampling-configuration}

- 원격 샘플링 구성을 사용하는 `service/env` 조합의 최대 개수는 **1000개**입니다.
- 이 제한은 각 서비스에 대해 정의된 샘플링 규칙 수와 관계없이 적용됩니다.
- 원격 샘플링이 활성화된 각 고유 `service/env` 쌍은 이 제한에 한 번씩 포함됩니다.

#### 적응형 샘플링 및 원격 샘플링을 모두 사용하는 서비스 {#services-using-both-adaptive-and-remote-sampling}

- `service/env` 조합이 적응형 샘플링과 원격 샘플링 구성을 모두 사용하는 경우, 각 제한에 한 번씩 포함됩니다(적응형 샘플링 제한 800개에 한 번, 원격 샘플링 제한 1000개에 한 번).
- 각 개별 제한 내에서 두 번 계산되지 **않습니다**.

## 적응형 샘플링 타겟 구성 {#configure-the-adaptive-sampling-target}

적응형 샘플링을 시작하려면 먼저 타겟 전략 설정을 선택해야 합니다.

- {{< ui >}}Set Budget by Number of APM Hosts{{< /ui >}}: 할당량 및 온보딩된 서비스 수에 비례하는 예산을 구성합니다(예: APM 호스트 수 기준).
- {{< ui >}}Set Budget by Data Volume{{< /ui >}}: 기가바이트 단위로 월간 고정 타겟을 구성합니다.


|          | APM 호스트 수별 예산                                                                                                              | 데이터 볼륨별 예산                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **장점** | APM 호스트 수 및 온보딩된 서비스 수에 따라 확장되며, 한 번만 설정하면 됩니다.                                                 | 예산을 초과하지 않도록 보장합니다.                                                      |
| **단점** | Datadog에 APM 데이터를 보고하는 호스트 수에 따라 달라질 수 있으므로 특정 볼륨 이하로 유지하려는 경우에는 적합하지 않습니다. | 새 서비스를 적응형 샘플링에 온보딩할 때마다 예산을 편집해야 합니다. |

적응형 샘플링 월간 타겟을 설정하려면 다음을 수행하세요.
1. [Ingestion Control][18] 페이지로 이동합니다.
2. {{< ui >}}Manage Adaptive Sampling Target{{< /ui >}}을 클릭합니다.
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="적응형 샘플링 타겟 설정을 위한 클릭 유도 문구" style="width:100%;">}}
3. 샘플링을 위한 타겟 전략을 선택합니다.
   - [APM 호스트 수별 예산 설정](#set-budget-by-number-of-apm-hosts-recommended)
   - [데이터 볼륨별 예산 설정](#set-budget-by-data-volume)
4. {{< ui >}}Apply{{< /ui >}}를 클릭합니다.

### APM 호스트 수별 예산 설정(권장) {#set-budget-by-number-of-apm-hosts-recommended}

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="백분율 기반 타겟 설정" style="width:100%;">}}

월간 타겟을 할당량의 백분율로 설정하세요. 페이지 하단에서 해당 백분율이 월간 타겟 볼륨으로 어떻게 변환되는지에 대한 더 자세한 설명을 확인할 수 있습니다. 이는 다음 항목들의 곱으로 산출됩니다. 

- The {{< ui >}}global allotment{{< /ui >}}: `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- 위에서 구성한 {{< ui >}}percentage of allotment{{< /ui >}}
- 할당량에 대한 {{< ui >}}contribution of onboarded services{{< /ui >}}. 예를 들어, 적응형 샘플링에 온보딩된 서비스가 전체 수집 볼륨의 10%를 차지하는 경우, Datadog은 전체 할당량의 10%를 타겟으로 합니다. 이 수치는 온보딩된 서비스 수에 따라 증가합니다.

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="백분율 기반 타겟 계산" style="width:100%;">}}

해당 월간 타겟 볼륨은 30분마다 다시 계산됩니다.

### 데이터 볼륨별 예산 설정 {#set-budget-by-data-volume}

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="볼륨 기반 타겟 설정" style="width:100%;">}}

적응형 샘플링에 첫 번째 서비스를 구성하는 경우, 수집 볼륨 타겟이 `>0`인지 확인하세요. 후속 서비스의 경우, 새 서비스가 온보딩된 후 새로운 볼륨을 고려하여 할당된 예산을 늘려야 합니다.  
  <div class="alert alert-info">구성된 예산은 적응형 샘플링에 등록된 서비스에만 할당됩니다. 여기에는 적응형 샘플링에 등록되지 않은 서비스, 로컬 샘플링 규칙 또는 Agent나 SDK에서 로컬로 구성된 기타 <a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">샘플링 메커니즘</a>에서 수집된 볼륨은 포함되지 않습니다.</div>

## 서비스에 대한 적응형 샘플링 구성 {#configure-adaptive-sampling-for-a-service}

### 서비스의 리소스별 샘플링 비율 보기 {#view-sampling-rates-by-resource-for-a-service}

서비스에 대해 적응형 샘플링을 구성하기 전에 해당 서비스의 현재 수집 구성을 확인할 수 있습니다.

구성된 샘플링 비율을 확인하려면 다음을 수행하세요.

1. [Ingestion Control][18] 페이지로 이동합니다.
2. 서비스를 클릭하여 {{< ui >}}Service Ingestion Summary{{< /ui >}}를 확인합니다.
3. 서비스의 리소스별로 적용된 샘플링 비율을 나열한 표를 확인합니다.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="리소스별 샘플링 비율 표" style="width:100%;">}}

표에는 다음 내용이 포함됩니다.
- {{< ui >}}Ingested bytes{{< /ui >}}: 서비스 및 리소스의 스팬에서 수집된 바이트입니다.
- {{< ui >}}Downstream bytes{{< /ui >}}: 해당 서비스 및 리소스에서 샘플링 결정이 시작되는 스팬(다운스트림 서비스 포함)에서 수집된 바이트입니다.
- {{< ui >}}Configuration{{< /ui >}}: 리소스 샘플링 비율의 소스:
  - `AUTOMATIC`: Agent의 [기본 헤드 기반 샘플링 메커니즘][8]입니다.
  - `CONFIGURED LOCAL`: SDK에서 로컬로 설정된 [샘플링 규칙][7]입니다.
  - `CONFIGURED REMOTE`: Datadog UI에서 설정된 원격 샘플링 규칙입니다.
  - `ADAPTIVE REMOTE`: Datadog에서 설정된 적응형 샘플링 규칙입니다.

서비스가 적응형 샘플링에 온보딩되면 샘플링 비율이 10분마다 조정 및 재계산됩니다.

### 적응형 샘플링에 대한 서비스 온보딩 {#onboard-a-service-to-adaptive-sampling}

서비스를 적응형 샘플링에 온보딩하려면 다음을 수행하세요.

1. [Ingestion Control][18] 페이지로 이동합니다.
2. 서비스를 클릭하여 {{< ui >}}Service Ingestion Summary{{< /ui >}}를 확인합니다.
3. {{< ui >}}Manage Ingestion Rate{{< /ui >}}를 클릭합니다.
4. 서비스의 샘플링 전략으로 {{< ui >}}Datadog adaptive sampling rates{{< /ui >}}를 선택합니다.
5. (선택 사항) 특정 리소스에 대해 더 많은 데이터(예: `GET /checkout` 엔드포인트의 100%) 또는 더 적은 데이터(예: `/health` 요청의 0.1%)를 캡처하려는 경우 명시적 [샘플링 비율][15]을 구성합니다.
6. {{< ui >}}Apply{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">이 구성을 <strong>원격으로</strong> 적용하는 작업이 비활성화된 경우, <a href="#requirements">Remote Configuration 요구 사항</a>을 충족하는지 확인하세요.</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="적응형 샘플링 설정 모달" style="width:70%;">}}

구성이 적용되는 데 5-6분 정도 소요됩니다. 이 시간은 Datadog이 서비스의 트래픽 패턴을 관찰하고, 계산한 다음, 샘플링 비율을 적용하는 데 걸리는 시간입니다. 원격으로 구성된 리소스는 `Configured Remote`로 표시되며, {{< ui >}}Configuration{{< /ui >}} 열에 나타납니다.

## 권한 {#permissions}

기본적으로 `Datadog Admin` 역할이 있는 사용자만 적응형 샘플링 구성을 수정하거나 적응형 샘플링에 서비스를 온보딩할 수 있습니다.

조직에서 사용자 지정 역할을 사용하는 경우, `APM Remote Configuration Write` 및 `APM Service Ingest Write` [권한][4]이 포함된 사용자 지정 역할을 사용자에게 할당하세요.

### 액세스 제한 {#restrict-access}
[세분화된 액세스 제어][19]를 사용하여 서비스의 적응형 샘플링 구성을 수정할 수 있는 사용자를 관리하세요. 역할, 팀 또는 개별 사용자를 기준으로 액세스를 제한할 수 있습니다.

{{< img src="/tracing/guide/adaptive_sampling/add_restriction.png" alt="권한 제한 모달" style="width:60%;">}}

액세스를 제한하려면 다음을 수행하세요.

{{< img src="/tracing/guide/adaptive_sampling/restrict_service_ingestion_permissions.png" alt="세분화된 액세스 제어 모달을 엽니다." style="width:100%;">}}

**참고**: `remote_config_write` 권한이 있는 사용자만 개별 서비스의 적응형 샘플링 구성에 대한 액세스를 제한할 수 있습니다.

1. 서비스의 Ingestion Control 사이드 패널에서 {{< ui >}}Permissions{{< /ui >}} 섹션을 엽니다.

2. {{< ui >}}Restrict access{{< /ui >}}를 클릭합니다.

3. 액세스 권한을 부여할 팀, 역할 또는 사용자를 선택합니다.

4. {{< ui >}}Add{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /ko/agent/remote_config
[4]: /ko/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /ko/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /ko/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.14.2
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /ko/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /ko/tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
[19]: /ko/account_management/rbac/granular_access/
[20]: https://github.com/DataDog/dd-trace-rs/releases/tag/datadog-opentelemetry-v0.4.0