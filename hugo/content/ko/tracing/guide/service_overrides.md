---
disable_toc: false
further_reading:
- link: /tracing/services/inferred_services
  tag: 문서
  text: 추론 서비스
title: 서비스 재정의
---

## 개요

[추론 서비스][1]는 Datadog가 서비스 종속성을 나타내는 방식을 개선합니다. 이 문서에서는 변경 사항과 구성을 조정하는 방법을 설명합니다.

### 추론 서비스 전

Datadog를 사용하여 클라이언트 스팬의 서비스 이름(`span (스팬).kind:client`)을 변경해 데이터베이스, 대기열 및 제 3자 종속성을 나타낼 수 있습니다. 예를 들어, 서비스 `A`에서 PostgreSQL 데이터베이스로의 클라이언트 호출은 `service:postgres` 또는 `service:A-postgres`로 태그됩니다. 이 가이드에서는 스팬 서비스 이름을 변경하는 것을 [**서비스 재정의**](#service-override)라고 표기합니다. 초기 서비스 이름은 [**기본 서비스**](#base-service)라고 표기합니다.

이 접근 방식에서는 `auth-dotnet` 서비스에서 PostgreSQL 데이터베이스로의 클라이언트 호출을 나타내는 스팬에 `service:auth-dotnet-postgres` 태그를 지정합니다. 서비스 맵에서 이러한 종속성은 아래와 같이 별도의 서비스로 표현됩니다.

{{< img src="/tracing/guide/service_overrides/old_service_rep.png" alt="기존 서비스 표시" style="width:80%;">}}

### 추론 서비스 사용

종속성은 클라이언트 스팬에서 수집된 스팬 속성(예: `db.system`, `db.name`)에서 자동으로 추론됩니다. 클라이언트 스팬은 기본 서비스 이름을 유지하며 데이터베이스는 다른 속성을 사용하여 추론됩니다. 따라서 이제 클라이언트 스팬에서 `service` 속성을 변경할 필요가 없습니다.

이전 예시로 돌아가보면, 이제 클라이언트 스팬은 기본 서비스 이름 `auth-dotnet`로 태그 지정되고 데이터베이스는 `db.name:user-db` 및 `db.system:postgres`과 같은 속성에서 추론됩니다. 서비스 맵 표시는 다음과 같습니다.

{{< img src="/tracing/guide/service_overrides/new_service_rep.png" alt="새 서비스 표시" style="width:70%;">}}


### 서비스 재정의에 미치는 영향

추론된 서비스 종속성을 사용하면 서비스 재정의가 서비스 목록과 맵을 오염시킬 수 있습니다. 서비스 맵에는 다음과 같은 노드가 순서대로 표시됩니다.
1. 기본 서비스 노드(예: `auth-dotnet`).
1. 서비스 재정의 노드(예: `auth-dotnet-postgres`) .
1. 새 추론된 서비스 노드(예: `user-db`) .

{{< img src="/tracing/guide/service_overrides/service_overrides_new_service_rep.png" alt="서비스 재정의" style="width:100%;">}}

서비스 재정의(`auth-dotnet-postgres`)는 기본 서비스와 추론된 서비스 사이의 직접 연결을 끊습니다. 이제 데이터베이스 종속성이 추론된 서비스에 의해 올바르게 표현되므로 필요가 없습니다.

## 서비스 재정의 설정 방법

#### 통합 서비스 재정의

Datadog 추적 라이브러리는 통합에서 데이터베이스, 대기열 또는 타사 서비스 종속성을 나타내기 위해 클라이언트 스팬에 다른 서비스 이름을 자동으로 설정합니다. 이 가이드에서는 이러한 유형의 서비스 재정의를 **통합 서비스 재정의**라고 표기합니다.

#### 커스텀 서비스 재정의

예를 들어 서비스의 특정 구성 요소(공유 라이브러리, 미들웨어 레이어)의 가시성을 확보하기 위해 사용자가 서비스 이름을 수동으로 설정할 수도 있습니다. 이 가이드에서는 이러한 유형의 서비스 재정의를 **커스텀 서비스 재정의**라고 표기합니다.

## Datadog에서 서비스 재정의가 표시되는 방식

서비스 재정의의 중요도를 낮추기 위해 APM 제품 페이지에는 서비스 재정의가 시각적으로 다르게 처리됩니다. 

#### 서비스 및 리소스 페이지

서비스 재정의된 서비스의 경우 서비스 페이지 헤더에 해당 플래그가 표시되어 있습니다. 마우스 커서를 올리면 서비스 이름이 재정의된 기본 서비스 목록을 [커스텀](#custom-service-overrides) 방식으로 찾거나 [통합](#integration-service-overrides)의 기본 설정으로 찾을 수 있습니다.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="서비스 페이지 재정의" style="width:70%;">}}

#### 서비스 맵

서비스 맵에서 서비스 재정의는 기본 서비스에서 추론된 서비스로 이어지는 에지의 일부로 표시됩니다.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_map.png" alt="서비스 맵 재정의" style="width:80%;">}}

#### 트레이스

트레이스 사이드 패널에서 클라이언트 스팬 헤더는 기본 서비스에서 추론된 서비스로의 호출을 나타냅니다. 개요 섹션의 상단에는 기본 서비스 이름, 재정의된 서비스 이름 및 추론된 엔티티 이름에 대한 정보도 표시됩니다.

{{< img src="/tracing/guide/service_overrides/service_overrides_traces.png" alt="트레이스 사이드 패널 서비스 재정의" style="width:80%;">}}


## 서비스 재정의 제거

*통합 서비스 재정의*를 제거하려면 환경 변수를 설정하세요.

```sh
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

이렇게 하면 `service` 속성이 항상 통합 이름(예:`*-postgres`, `*-http-client`)을 추가하는 대신, 기본 서비스 이름을 사용하도록 할 수 있습니다.

<div class="alert alert-warning">서비스 재정의 제거는 중대한 <b>변경</b> 사항입니다. 재정의된 서비스 이름을 기반으로 하는 메트릭, 모니터 또는 대시보드 쿼리가 더 이상 일치하지 않게 되기 때문입니다.</div>

변경으로 인해 중요한 자산(대시보드, 모니터, 보존 필터 등)이 영향을 받지 않도록 서비스별로 서비스 재정의를 점진적으로 제거하는 것이 좋습니다. 새 모델로 원활하게 전환하려면 [상세 지침](#remove-service-overrides-progressively)을 따르세요.

### 예제 

예시:

- .NET는 gRPC 호출을 `service:<DD_SERVICE>-grpc-client`로 태깅
- Python은 gRPC 호출을 `service:grpc-client`로 태깅

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` 옵션을 `true`로 설정하면 지원되는 모든 추적 라이브러리가 다운스트림 서비스로의 호출을 캡처하는 클라이언트 스팬에 호출 서비스 이름 `service:<DD_SERVICE>`로 태그를 지정합니다. 이렇게 하면 모든 스팬이 항상 *기본 서비스 이름*으로 태그 지정됩니다. [`peer.*`][6] 속성은 호출된 종속성(예: 데이터베이스 또는 대기열)을 설명하는 데 사용됩니다.

| 시나리오 | 서비스 이름 | 추가 `peer.*` 속성 |
|----------|--------------|--------------------------------|
| 추론된 서비스를 *사용하지 않고* 서비스 재정의를 *사용*하는 경우 | `service:my-service-grpc-client` 또는 `service:grpc-client` | `peer.*` 속성이 설정되지 않음 |
| 추론된 서비스 *사용* 및 서비스 재정의 *사용 안 함*  | `service:myservice` | `@peer.service:otherservice`(여기서 `otherservice`는 gRPC로 호출되는 원격 서비스 이름) |

마찬가지로 MySQL 데이터베이스로의 호출을 나타내는 스팬의 경우에도 마찬가지입니다.

| 시나리오 | 서비스 이름 | 추가 `peer.*` 속성 |
|----------|--------------|--------------------------------|
| 추론된 서비스를 *사용하지 않고* 서비스 재정의를 *사용*하는 경우 | `service:my-service-MySQL` 또는 `service:MySQL` | `peer.*` 태그가 설정되지 않음 |
| 추론된 서비스 *사용* 및 서비스 재정의 *사용 안 함*  | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:MySQL` |

### 서비스 재정의 점진적 제거

1. 제거하려는 서비스 재정의를 식별하고 해당 **서비스 페이지**로 이동합니다.
2. 페이지 헤더의 서비스 재정의 알약에 마우스 커서를 올리고 기본 서비스 이름을 확인합니다. 해당 서비스가 재정의가 있는 스팬을 전송하는 원래 서비스입니다. 이 계측 서비스에 맞게 구성을 업데이트해야 합니다.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="서비스 페이지 재정의" style="width:70%;">}}

3. 재정의 서비스 이름을 사용하여 쿼리가 포함될 수 있는 기존 자산을 검색합니다.

   - [APM 트레이스 메트릭][5] 기반 모든 모니터, 대시보드 및 노트북 쿼리
   - [스팬의 APM 메트릭][2]
   - [트레이스 분석 모니터][3](인덱싱된 스팬 기준)
   - [보존 필터][4]
   - Sensitive Data Scanner 파이프라인

4. 기본 서비스 이름(`service:<DD_SERVICE>`)을 사용하도록 이 쿼리를 업데이트합니다. 이렇게 하면 서비스 재정의 제거 시에도 쿼리가 계속 일치할 수 있습니다.

5. 통합 서비스 재정의에 `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`를 설정합니다.

**참고**: 위의 구성은 [통합 서비스 재정의](#integration-service-overrides)만 제거합니다. 커스텀 서비스 재정의는 코드에서 직접 제거해야 합니다.

## 용어

##### 서비스 재정의
기본 `DD_SERVICE` 이름과 다른 스팬에 설정된 서비스 이름입니다. 일부 Datadog 연동 서비스에서 [자동으로](#integration-service-overrides) 설정하거나 사용자가 [수동으로](#custom-service-overrides) 설정할 수 있습니다.

##### 기본 서비스
기본값은 `DD_SERVICE` 이름입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/inferred_services
[2]: /ko/tracing/trace_pipeline/generate_metrics
[3]: /ko/monitors/types/apm/?tab=traceanalytics
[4]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /ko/tracing/metrics/metrics_namespace/
[6]: /ko/tracing/services/inferred_services/#peer-tags