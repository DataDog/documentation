---
description: 비용 최적화를 위해 특정 리소스 및 엔드포인트를 기준으로 트레이스 수집을 제어하는 리소스 기반 샘플링을 구성하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: 설명서
  text: 수집 메커니즘
- link: /tracing/trace_pipeline/ingestion_controls
  tag: 설명서
  text: Ingestion Control 페이지
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: 아키텍처 센터
  text: '분산 트레이스 최적화: 예산 범위 내에서 중요 트레이스를 캡처하기 위한 모범 사례'
site_support_id: resource_based_sampling
title: 리소스 기반 샘플링
---
## 개요 {#overview}

Remote Configuration을 사용하면 서비스를 재배포할 필요 없이 Datadog UI에서 [서비스 및 리소스 이름별 수집 샘플링 비율][7]을 동적으로 설정할 수 있습니다.

## 요구 사항 {#requirements}

- Datadog Agent [7.41.1][2] 이상.
- Agent에 활성화된 [Remote Configuration][3].
- `APM Remote Configuration Write` [권한][4]. 해당 권한이 없는 경우, Datadog 관리자에게 조직 설정에서 권한을 업데이트해 달라고 요청하세요.

### 트레이싱 라이브러리 버전 {#tracing-library-version}

아래에서 해당 기능에 필요한 최소 SDK 버전을 참조하세요.

언어  | 필요한 최소 버전
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.4.0][11]
Node.js   | [v5.16.0][12]
PHP       | [v1.4.0][15]
.NET      | [v.2.53.2][13]
C++       | [v0.2.2][14]

## Ingestion Control 페이지에서 리소스별 샘플링 비율 확인 {#see-sampling-rates-by-resource-in-the-ingestion-control-page}

리소스별로 구성된 샘플링 비율을 확인하려면 Ingestion controls [Service Ingestion summary][1]로 이동하세요. 표에 서비스의 리소스별로 적용된 샘플링 비율이 나열되어 있습니다.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="리소스별 샘플링 비율 표" style="width:100%;">}}

- `Ingested bytes` 열에는 서비스 및 리소스의 스팬에서 수집된 바이트가 표시되고, `Downstream bytes` 열에는 해당 서비스 및 리소스에서 시작하는 샘플링 결정이 내려진 스팬에서 수집한 바이트가 표시되며, 여기에는 콜 체인의 다운스트림 서비스에서 수집한 바이트도 포함합니다.
- `Configuration` 열에는 리소스 샘플링 비율이 어디에서 적용되었는지 표시됩니다. 
  - `Automatic` Agent의 [기본 헤드 기반 샘플링 메커니즘][8]이 적용되는 경우.
  - `Local Configured` SDK에서 [샘플링 규칙][7]이 로컬로 설정된 경우.
  Datadog UI에서 원격 샘플링 규칙이 설정된 경우 - `Remote Configured`. Ingestion Control 페이지에서 샘플링 규칙을 구성하는 방법을 알아보려면 [샘플링 규칙 원격 구성](#remotely-configure-sampling-rules-for-the-service) 관련 섹션을 참조하세요.

## 서비스의 샘플링 규칙 원격 구성 {#remotely-configure-sampling-rules-for-the-service}

리소스 이름별로 서비스의 샘플링 비율을 구성하려면 다음 단계를 따르세요. 
1. {{< ui >}}Manage Ingestion rate{{< /ui >}}를 클릭합니다. Remote Configuration 옵션이 비활성화된 경우, 나열된 [요구 사항](#compatibility-requirements)이 모두 충족되었는지 확인하세요.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_modal.png" alt="구성 모달" style="width:100%;">}}
1. {{< ui >}}Add new rule{{< /ui >}}을 클릭하여 일부 리소스의 샘플링 비율을 설정합니다. 샘플링 규칙은 전역 패턴 매칭을 사용하므로, 와일드카드(`*`)를 사용하여 동시에 여러 리소스에 매칭할 수 있습니다.
1. {{< ui >}}Apply{{< /ui >}}를 클릭하여 구성을 저장합니다.

구성은 1분 이내에 적용됩니다. 구성 변경 사항은 [Live Search Explorer][9]에서 관측할 수 있습니다.

{{< ui >}}Service Ingestion Summary{{< /ui >}}에서 샘플링 비율이 원격으로 적용된 리소스는 {{< ui >}}Configuration{{< /ui >}} 열에 `Remote Configured`로 표시되어야 합니다.



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /ko/tracing/guide/remote_config/
[4]: /ko/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /ko/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /ko/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.4.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0