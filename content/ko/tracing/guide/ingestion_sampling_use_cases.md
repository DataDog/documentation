---
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: 지침
  text: 수집된 볼륨을 제어하는 방법
title: 트레이스 샘플링 사용 사례
---

## 개요

트레이스 데이터는 반복적인 경향이 있습니다. 애플리케이션의 문제가 트레이스 한 곳에서만 확인되고 다른 곳에서는 확인되지 않는 경우는 거의 없습니다. 처리량이 많은 서비스, 특히 주의가 필요한 인시던트의 경우, 한 문제가 여러 추적에서 반복적으로 증상을 보이는 경우가 많습니다. 따라서 일반적으로 서비스나 엔드포인트의 모든 트레이스 내의 모든 스팬을 수집할 필요가 없습니다. Datadog APM의 [수집 제어 메커니즘][1]은 문제 해결에 필요한 가시성을 유지하면서 소음을 줄이고 비용을 관리할 수 있도록 도와줍니다.

수집 메커니즘은 추적 라이브러리의 Datadog Agent 및 Datadog 추적 라이브러리 내에서 구성됩니다. 애플리케이션을 계측하기 위해 OpenTelemetry SDK를 사용하는 경우 [OpenTelemetry를 사용한 수집 샘플링][2]을 참조하세요.

이 가이드는 주요 사용 사례에 따른 수집 제어 설정 사용 시점과 방법을 이해할 수 있도록 지원합니다. 가이드에서는 다음을 다룹니다.

- 특정 서비스에 [어떤 수집 메커니즘이 사용되는지 결정하기](#determining-which-ingestion-mechanisms-are-used)
- [특정 유형의 트레이스 유지에 중점을 둔 사용 사례](#keeping-certain-types-of-traces)
- [수집된 트레이스를 줄이는 데 중점을 둔 사용 사례](#reducing-ingestion-for-high-volume-services)


## 사용할 수집 메커니즘 결정하기

Datadog 환경에서 현재 어떤 수집 메커니즘이 사용되고 있는지 확인하려면 [수집 제어 페이지][3]로 이동하세요.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Ingestion Control Page" style="width:90%;" >}}

이 표는 수집된 볼륨에 대한 *서비스별* 인사이트를 제공합니다. 설정 열은 현재 설정에 일차적인 표시를 제공합니다. 다음이 표시됩니다.
- `AUTOMATIC` Datadog Agent에서 계산된 샘플링 속도가 서비스에서 시작되는 추적에 적용되는 경우. 자세한 내용은 [Datadog Agent 수집 로직][5]을 참조하세요.
- `CONFIGURED` 트레이스 라이브러리에서 설정된 사용자 지정 트레이스 샘플링 속도가 서비스에서 시작하는 추적에 적용되는 경우입니다.

서비스를 클릭하면 각 서비스에 사용되는 샘플링 의사 결정자(예: Agent 또는 트레이스 라이브러리, 규칙 또는 샘플 속도)와 수집된 범위의 서비스에 어떤 [수집 샘플링 메커니즘][1]이 활용되는지에 대한 세부 정보를 확인할 수 있습니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="서비스 수집 요약" style="width:90%;" >}}

위의 서비스 수집 요약 예시에서 **수집 이유 분석** 표를 보면 이 서비스의 수집 이유 대부분이 `rule`([사용자 정의 샘플링 규칙][6])에서 비롯된 것임을 알 수 있습니다.

이 서비스의 상위 샘플링 의사 결정권자는 `web-store` 서비스가 `web-store`, `shopist-web-ui`, `shipping-worker`, `synthetics-browser`, `product-recommendation`에서 샘플링 결정을 내리는 것으로 나타났습니다. 이 다섯 가지 서비스는 모두 `web-store` 서비스 범위에 영향을 미치는 전체 샘플링 결정에 기여합니다. 웹 스토어에 수집을 미세 조정하는 방법을 결정할 때는 다섯 가지 서비스를 모두 고려해야 합니다.

## 특정 유형의 트레이스 유지

### 전체 거래 트레이스 유지

전체 트랜잭션 추적을 수집하면 특정 개별 요청에 **엔드투엔드 서비스 요청 흐름**에 관한 가시성을 확보할 수 있습니다.

#### 솔루션: 헤드 기반 샘플링

[헤드 기반 샘플링][4] 메커니즘으로 완전한 트레이스를 수집할 수 있습니다. 트레이스를 유지할지 삭제할지 여부는 트레이스가 생성될 때 트레이스 첫 번째 스팬인 *헤드*에서 결정됩니다. 이 결정은 요청 컨텍스트를 통해 다운스트림 서비스로 전파됩니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="헤드 기반 샘플링" style="width:100%;" >}}

유지 및 삭제할 트레이스를 결정하기 위해 Datadog Agent에서는 애플리케이션 트래픽을 기반으로 트레이스 생성 시 적용할 각 서비스의 [기본 샘플링 속도][5]를 계산합니다.
- 트래픽이 적은 애플리케이션의 경우 샘플링 속도 100%가 적용됩니다.
- 트래픽이 많은 애플리케이션의 경우, 더 낮은 샘플링 속도가 적용되는데, 각 Agent에서 초당 10개의 완전한 트레이스를 목표로 합니다.

서비스별 샘플링 속도를 구성하여 기본값 Agent 샘플링 속도를 재정의할 수도 있습니다. 자세한 내용은 [특정 서비스에 더 많은 추적 유지](#keeping-more-traces-for-specific-services-or-resources) 도움말을 참조하세요.

#### 헤드 기반 샘플링 구성

기본 샘플링 속도는 Agent에 따라 초당 10개의 완전한 트레이스를 목표로 계산됩니다. 이는 *목표* 트레이스 수이며 일정 기간의 트레이스를 평균한 결과입니다. 이는 하드 제한이 *아닙니다*. 트래픽이 급증하면 단기간에 Datadog로 훨씬 더 많은 트레이스가 전송될 수 있습니다.

Datadog Agent 파라미터 `max_traces_per_second` 또는 환경 변수 `DD_APM_MAX_TPS`를 구성하여 이 목표를 늘리거나 줄일 수 있습니다. [헤드 기반 샘플링 수집 메커니즘][5]에서 자세히 알아보세요.

**참고:** Agent 설정을 변경하면 Datadog Agent에 트레이스를 보고하는 *모든 서비스*의 샘플링 비율에 영향을 미칩니다.

대부분의 시나리오에서 이 Agent 수준 설정은 할당된 할당량 내에서 애플리케이션 성능에 충분한 가시성을 제공하고 비즈니스에 적합한 의사 결정을 내리는 데 도움이 됩니다.

### 특정 서비스 또는 리소스에 더 많은 트레이스 유지

일부 서비스 및 요청이 비즈니스에 중요한 경우, 이에 관한 가시성을 높이고 싶어 합니다. 모든 관련 추적을 Datadog 으로 보내 개별 트랜잭션을 살펴볼 수 있도록 하세요.

#### 솔루션: 샘플링 규칙

기본적으로 샘플링 속도는 Datadog Agent당 초당 10개의 트레이스를 목표로 계산됩니다. 추적 라이브러리에서 [샘플링 규칙][6]을 구성하여 기본 계산된 샘플링 속도를 재정의할 수 있습니다.

서비스별로 샘플링 규칙을 설정할 수 있습니다. 규칙의 특정 서비스에서 시작하는 트레이스의 경우 Agent의 기본 샘플링 속도 대신 정의된 백분율 샘플링 속도가 적용됩니다.

#### 샘플링 규칙 설정하기

환경 변수 `DD_TRACE_SAMPLING_RULES`를 설정하여 샘플링 규칙을 구성할 수 있습니다.

예를 들어 서비스 `my-service` 에 관해 트레이스의 20%를 보내는 방법:

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

[샘플링 규칙 수집 메커니즘][6]에 관해 자세히 알아보세요.

### 오류 관련 트레이스 더 많이 유지

오류 스팬이 있는 트레이스는 시스템 장애 증상인 경우가 많습니다. 오류가 있는 트랜잭션의 비율을 높게 유지하면 항상 관련 개별 요청에 액세스할 수 있습니다.

#### 솔루션: 오류 샘플링 속도

헤드 기반 샘플링된 트레이스 외에도 오류 샘플링 속도를 높여 각 Agent가 관련 트레이스가 헤드 기반 샘플링으로 유지되지 않더라도 추가 오류 스팬을 유지할 수 있도록 합니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Error Sampling" style="width:100%;" >}}

**참조**:
- 샘플링이 Datadog Agent 수준에서 로컬로 이루어지므로 분산된 트레이스 조각은 수집되지 않을 수 있습니다.
- **Datadog Agent 6/7.41.0 이상**부터 `DD_APM_FEATURES=error_rare_sample_tracer_drop`은 트레이스 라이브러리 규칙 또는 `manual.drop`에 의해 삭제된 스팬을 포함하도록 설정할 수 있습니다. 자세한 내용은 [수집 메커니즘 설명서의 오류 추적 섹션][9]에서 확인할 수 있습니다.

#### 오류 샘플링 구성

환경 변수 `DD_APM_ERROR_TPS`를 구성하여 캡처할 Agent당 초당 오류 조각 수를 구성할 수 있습니다. 기본값은 초당 `10` 오류 수입니다. **모든 오류**를 수집하려면 임의의 높은 값으로 설정하세요. 오류 샘플링을 사용하지 않으려면 `DD_APM_ERROR_TPS`를 `0`로 설정합니다.

## 대용량 서비스의 수집량 줄이기

### 데이터베이스 또는 캐시 서비스에서 볼륨 줄이기

추적되는 데이터베이스 호출의 경우 수집 데이터 양이 대량일 수 있습니다. 그러나 애플리케이션 성능 메트릭(예: 오류 수, 요청 히트 수, 지연 시간)은 데이터베이스 상태를 확인할 수 있는 정도입니다.

#### 솔루션: 데이터베이스 호출을 사용한 트레이스 샘플링 규칙

데이터베이스 호출을 추적하여 생성된 스팬 볼륨을 줄이려면 트레이스의 헤드에서 샘플링을 설정합니다.

데이터베이스 서비스는 트레이스를 시작하는 일이 거의 없습니다. 일반적으로 클라이언트 데이터베이스 범위는 계측된 백엔드 서비스 스팬의 하위 서비스입니다.

**데이터베이스 트레이스를 시작하는 서비스**를 파악하려면, 수집 제어 페이지 [서비스 수집 요약][7]의 `Top Sampling Decision Makers` 상위 목록 그래프를 사용하세요. 이러한 특정 서비스에 헤드 기반 샘플링을 설정하면 수집되는 데이터베이스 스팬의 양을 줄이면서 불완전한 트레이스가 수집되지 않도록 할 수 있습니다. 분산된 트레이스는 유지되거나 모두 삭제됩니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="상위 샘플링 의사 결정자" style="width:90%;" >}}

예를 들어, 추적 중인 `web-store-mongo` 데이터베이스 호출의 경우, 트레이스의 99%가 `web-store` 및 `shipping-worker` 서비스에서 시작됩니다. 따라서 `web-store-mongo`의 볼륨을 줄이려면 `web-store` 및 `shipping-worker` 서비스의 샘플링을 설정합니다.

#### 데이터베이스 스팬을 삭제하도록 샘플링 설정

샘플링 규칙 구문에 관한 자세한 내용은 [샘플링 규칙 설정 섹션](#configuring-a-sampling-rule)을 참조하세요.

백엔드 서비스 `web-store`는 트레이스당 여러 번 Mongo 데이터베이스를 호출하며, 원치 않는 스팬 볼륨을 많이 생성하고 있습니다.

- 백엔드 서비스 `web-store`에 **트레이스 샘플링 규칙**을 설정하여 Mongo 스팬을 포함하여 전체 트레이스의 10%가 유지되도록 합니다.

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- 선택적으로 모든 `web-store` 스팬을 유지하려면 백엔드 서비스 `web-store`에 스팬의 100%를 유지하도록 **단일 스팬 샘플링 규칙**을 설정합니다. 이 샘플링은 위에서 파악한 10% 이외의 데이터베이스 호출 스팬을 수집하지 않습니다.

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **참고**: 단일 스팬 샘플링 규칙을 설정하는 것은 수집된 스팬에서 파생된 [스팬 기반 메트릭][8]을 사용하는 경우에 특히 유용합니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling3.png" alt="데이터베이스 스팬 샘플링" style="width:100%;" >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[2]: /ko/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[7]: /ko/tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary
[8]: /ko/tracing/trace_pipeline/generate_metrics/
[9]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=java#error-and-rare-traces