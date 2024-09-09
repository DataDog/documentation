---
disable_toc: false
further_reading:
- link: /tracing/services/
  tag: 설명서
  text: 서비스 모니터링
- link: /tracing/trace_collection/
  tag: 설명서
  text: Datadog으로 트레이스 전송
- link: /tracing/trace_collection/dd_libraries/
  tag: 설명서
  text: Datadog 트레이싱 라이브러리 추가
private: true
title: 신규 서비스(현황) 페이지 및 추론 서비스
---

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Opt in to the private beta!" >}}
추론 서비스와 신규 서비스(현황) 페이지 레이아웃은 비공개 베타 버전입니다. 사용하려면 해당 양식을 작성해주세요.
{{< /callout >}}

다음 단계에 따라 [서비스(현황) 페이지][1]에서 신규 종속성 맵을 활성화합니다. [서비스 카테고리][3] 페이지와 [서비스 맵][2]에 _inferred services_를 추가합니다.

## 추론 서비스

Datadog는 아직 종속성 여부가 추론되지 않았다 하더라도, 데이터베이스 또는 타사 API 등의 추론 서비스에 대한 종속성 여부를 자동으로 식별할 수 있습니다. Datadog는 추론 서비스의 아웃바운드 요청 정보에 기반하여 해당 종속성 여부와 성능을 추정합니다.

Datadog은 추론 서비스의 이름과 유형을 결정하기 위해 스팬(span) 속성을 사용합니다. 추론한 외부 API는 기본 명명체계 `net.peer.name`를 따릅니다. (예: `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`) 추론 데이터베이스는 기본 명명체계 `db.instance`를 따릅니다.

Go, 자바(Java), NodeJS, PHP, .NET 또는 루비(Ruby) 트레이서를 사용한다면, 추론 서비스의 이름 기본값을 사용자 지정할 수 있습니다. 자세한 내용을 확인하려면 하단의 해당 언어용 '피어 서비스 매핑' 섹션을 참조하세요.

**참고**: 베타 기간 동안 모니터, 대시보드, 또는 노트북을 지정 추론 서비스로 설정하는 경우, 명명체계 변경 시 이를 업데이트해야 할 수도 있습니다.

## 종속성 맵

종속성 맵을 활용하여 서비스-투-서비스(service-to-service) 통신을 시각화하고 데이터베이스, 대기열 및 타사 종속성 등 시스템 구성 요소에 대한 통찰을 얻을 수 있습니다. 종속성을 유형별로 그룹화하고 요청, 레이턴시 또는 오류별로 필터링하여 속도가 느리거나 실패한 연결을 식별할 수 있습니다.

{{< img src="tracing/services/service_page/dependencies.png" alt="The dependency section" style="width:100%;">}}

## 옵트인

옵트인(opt in)하려면 Datadog 에이전트 및 애플리케이션 성능 모니터링(APM) 트레이서 설정을 변경해야 합니다. [글로벌 디폴트 서비스 네이밍 마이그레이션](#global-default-service-naming-migration)을 참조하여 마이그레이션해야 하는지 확인합니다.

### Datadog 에이전트 구성

필수 요건:
- Datadog 에이전트 버전 >= [7.45.0][4].

`datadog.yaml` [설정 파일][5]에 다음과 같은 설정을 적용합니다:
- `DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true`
- `DD_APM_PEER_SERVICE_AGGREGATION=true`


### OpenTelemetry 컬렉터(Collector) Datadog 익스포터 설정

`collector.yaml` [설정 파일][6]에 다음과 같은 설정을 적용합니다:
- `compute_stats_by_span_kind=true`
- `peer_service_aggregation=true`


### 애플리케이션 성능 모니터링(APM) 트레이서 설정

{{< tabs >}}
{{% tab "Java" %}}

필수 자바(Java) 트레이서 버전은 최소 1.16.0입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

[자바(Java) 트레이서 최신 버전 다운로드][1].

옵트인(opt in)하려면 트레이서 설정에 다음 환경 변수 또는 시스템 속성을 추가하세요:

| 환경 변수 | 시스템 속성 |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `-Ddd.trace.peer.service.defaults.enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `-Ddd.trace.remove.integration-service-names.enabled=true` |

설정에서 다음 설정을 삭제합니다:

| 환경 변수 | 삭제 사유 |
| ---  | ----------- |
| `DD_SERVICE_MAPPING` | 모든 서비스 이름은 기본값으로 `DD_SERVICE`로 설정됩니다. |
| `DD_TRACE_SPLIT_BY_TAGS` | 추론 서비스는 `peer.service` 태그와 함께 자동으로 표시됩니다. |
| `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | DB 인스턴스는 `peer.service` 태그에 기반하여 추론됩니다. |

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `dd.trace.peer.service.mapping` |

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

필수 Go 트레이서 버전은 최소 [v1.52.0][1]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정에 다음 환경 변수 또는 시스템 속성을 추가하세요:

| 환경 변수 | 시스템 속성 |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `WithPeerServiceDefaultsEnabled(true)` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `WithPeerServiceMapping`|

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab "NodeJS" %}}

필수 NodeJS 트레이서 버전은 최소 [2.44.0][1], [3.31.0][2] 또는 [4.10.0][3]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정에 다음 환경 변수 또는 시스템 속성을 추가하세요:

| 환경 변수 | 시스템 속성 |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `spanComputePeerService=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `spanRemoveIntegrationFromService=true` |

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `peerServiceMapping`|

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v2.44.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.31.0
[3]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.10.0

{{% /tab %}}

{{% tab "PHP" %}}
필수 PHP 트레이서 버전은 최소 [0.90.0][1]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정에 다음 환경 변수 또는 시스템 속성을 추가하세요:

| 환경 변수 | 시스템 속성 |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `datadog.trace.peer_service_defaults_enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `datadog.trace.remove_integration_service_names_enabled=true` |

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `datadog.trace.peer_service_mapping` |

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.90.0
{{% /tab %}}

{{% tab ".NET" %}}

필수 .NET 트레이서 버전은 최소 [v2.35.0][1]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정 또는 시스템 속성에 다음 환경 변수를 추가하세요:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
| Environment variable | TracerSettings |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings`|

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.35.0

{{% /tab %}}

{{% tab "Python" %}}

필수 파이썬(Python) 트레이서 버전은 최소 [v1.16.0][1]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정 또는 시스템 속성에 다음 환경 변수를 추가하세요:

트레이서 설정 또는 시스템 속성에 다음 환경 변수를 추가하세요:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### 피어 서비스 매핑

Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 다음 설정을 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다:

| 환경 변수 | 트레이서 설정 |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings` |

각 설정은 쉼표로 구분된 목록 `key1:value1,key2:value2`을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

현재 트레이서 버전 `v1.16.0`은 Boto2를 제외한 모든 라이브러리를 지원합니다.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{% tab "Ruby" %}}
필수 루비(Ruby) 트레이서 버전은 최소 [v1.13.0][1]입니다. 변경 사항 및 버그 수정에 접근하려면 정기적으로 최신 버전으로 업데이트합니다

옵트인(opt in)하려면 트레이서 설정 또는 시스템 속성에 다음 환경 변수를 추가하세요:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### 피어 서비스 매핑
**참고**: `key:value` 쌍은 대소문자를 구분합니다.
Datadog은 추론 서비스에 기본 명명체계를 적용합니다. 필요한 경우 `DD_TRACE_PEER_SERVICE_MAPPING` 환경 변수를 활용하여 특정 값을 피어 서비스에 매핑할 수 있습니다. 각 환경 변수는 쉼표로 구분된 키값 쌍 목록을 허용합니다.

예를 들어 환경 변수를 사용하고 피어 서비스 `10.0.32.3`의 이름을 `my-service`로 변경해야 하는 경우 다음 설정을 적용합니다:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

특정 통합 작업으로 생성한 스팬(span)에 `peer.service` 값을 설정할 수도 있습니다. 해당 경우, 정의한 설정값은 트레이서가 자동으로 할당한 값보다 우선시됩니다. 통합 작업에 대한 값을 설정하려면 환경 변수에 `DD_TRACE_<INTEGRATION_NAME>_PEER_SERVICE` 구문을 적용합니다.

예를 들어, 모든 Dalli 스팬(span)에 `peer.service` 값을 설정하려면
`DD_TRACE_DALLI_PEER_SERVICE=billing-api`을 사용합니다.

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.13.0
{{% /tab %}}

{{< /tabs >}}

### 글로벌 디폴트 서비스 네이밍 마이그레이션

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` 환경 변수를 활성화하면 지원하는 모든 트레이싱 라이브러리 언어 및 통합에서 서비스-투-서비스(service-to-service) 연결 및 추론 서비스의 Datadog 시각화 표시 방식이 개선됩니다.

기존에는 일부 트레이싱 라이브러리에 서비스 이름 태깅 연관 통합 작업이 포함되었습니다. 예를 들어, .NET은 gRCP 호출을 `service:<DD_SERVICE>-grpc-client`로 태그하고, 파이썬(Python) 은 `service:grpc-client`로 태그합니다. 해당 옵션을 활성화하면 지원하는 모든 트레이싱 라이브러리 태그는 다운스트림 서비스에서 호출 서비스의 이름인 `service:<DD_SERVICE>`로 스팬(span)되어 a _global default service name_를 제시합니다.

따라서, 기존 통합이 있는 경우:

- 애플리케이션 성능 모니터링(APM) 메트릭
- 애플리케이션 성능 모니터링(APM) 커스텀 스팬(span) 메트릭
- 트레이스 분석
- 리텐션 필터
- 민감한 데이터 스캔
- 이러한 항목을 쿼리하는 모니터, 대시보드 또는 노트북

글로벌 디폴트 서비스 태그(`service:<DD_SERVICE>`)를 대신 사용하도록 해당 항목을 업데이트합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/service_page/
[2]: /ko/tracing/services/services_map/
[3]: /ko/tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.45.0
[5]: /ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L328-L341