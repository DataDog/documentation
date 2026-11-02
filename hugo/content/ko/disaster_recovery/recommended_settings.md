---
further_reading:
- link: /disaster_recovery/
  tag: 설명서
  text: Datadog Disaster Recovery(DDR)
site_support_id: datadog_disaster_recovery
title: DNS 장애 조치를 위한 권장 설정
---
Datadog Disaster Recovery(DDR)의 DNS 장애 조치에 걸리는 시간을 최소화하도록 DNS 캐싱 및 연결 재사용을 구성합니다.

데이터가 보조 리전에 도달하려면 먼저 DNS 캐시가 새로 고쳐지고 텔레메트리 소스가 다시 연결되어야 하므로 장애 조치에 시간이 걸립니다. 복구 시간 목표(RTO)를 충족하는 데 도움이 되도록 이러한 설정을 함께 구성합니다. 이러한 계층에서 발생하는 지연은 누적될 수 있으므로 TTL(Time to Live)과 연결 재설정 설정을 선택할 때 누적 영향을 고려합니다.

## DNS 레코드 구성 {#dns-record-configuration}

| 설정 | 권장 구성 | 설명 |
| --- | --- | --- |
| A 또는 CNAME 레코드 TTL | 60~300초로 설정합니다. | **영향도 높음** 장애 조치 후 업데이트된 값을 확인할 때까지 DNS 리졸버가 레코드를 캐시하는 시간을 제어합니다. [RFC 1035][1](TTL 필드) 및 [RFC 2181][2](TTL=0 처리에 관한 내용을 포함한 TTL 설명)을 참조하세요. |
| 네거티브 캐싱 TTL | A 또는 CNAME 레코드 TTL과 동일하게 60~300초로 설정합니다. SOA 레코드의 TTL과 `MINIMUM` 필드를 모두 확인합니다. | **영향도 중간** 장애 조치 중에 DNS 조회 결과로 NXDOMAIN(도메인이 존재하지 않음) 또는 NODATA(요청한 레코드 유형이 존재하지 않음)가 반환되면 DNS 리졸버가 해당 응답을 캐시합니다. 네거티브 캐싱 TTL은 SOA 레코드의 TTL과 `MINIMUM` 필드 중 더 낮은 값입니다. [RFC 2308][3]을 참조하세요. |
| CNAME 체인 깊이 | 중간 `CNAME` 레코드 없이 DNS 레코드가 Datadog 데이터 센터 엔드포인트를 직접 가리키도록 설정합니다. | **영향도 중간** 체인의 각 레코드에는 고유한 TTL이 있으며, 홉이 하나 늘어날 때마다 동기화 상태를 유지해야 하는 레코드가 추가됩니다. |

## OS 및 애플리케이션 DNS 캐싱 {#os-and-application-dns-caching}

| 설정 | 권장 구성 | 설명 |
| --- | --- | --- |
| 애플리케이션 DNS 캐싱 | DNS 캐시가 있는 애플리케이션의 경우, 캐시 TTL을 DNS 레코드 TTL과 동일하게 60~300초로 설정합니다. JVM 기반 애플리케이션의 경우 `networkaddress.cache.ttl`을 구성합니다. | **영향도 높음** 애플리케이션 DNS 캐시는 DNS 레코드가 변경된 후에도 이전 주소를 유지할 수 있습니다. 일부 JVM 구성에서는 주소를 무기한 캐시합니다. Go 및 Node.js 클라이언트를 포함하여 각 런타임과 HTTP 클라이언트의 캐싱 동작을 확인합니다. |
| OS DNS 캐싱 | 텔레메트리 전송 구성 요소가 실행되는 호스트에서 OS DNS 캐시 TTL이 300초 이하인지 확인합니다. | **영향도 낮음~중간** `nscd`, `systemd-resolved` 및 Windows DNS Client와 같은 OS DNS 캐시도 장애 조치에 걸리는 시간을 늘릴 수 있습니다. |

## 전송 구성 요소 및 Agent 동작 {#sender-and-agent-behavior}

DDR의 DNS 기반 장애 조치를 사용하는 모든 Datadog Agent는 [DDR 사전 요건][4]을 충족해야 합니다.

| 설정 | 권장 구성 | 설명 |
| --- | --- | --- |
| Agent 연결 재사용 | 각 텔레메트리 유형에 대해 연결 재설정 간격을 1~300초로 설정합니다. 해당 설정은 [Agent 구성 예시](#agent-configuration-examples)를 참조하세요. | **영향도 높음** 장시간 유지되는 연결에서는 DNS 변경 후에도 기본 리전으로 텔레메트리를 계속 보낼 수 있습니다. Agent가 DNS 이름 확인을 다시 수행하도록 주기적인 재연결을 구성합니다. |
| Agent 이외의 텔레메트리 소스 | 각 소스를 개별적으로 검증합니다. 지원되는 경우 300초 이하의 간격으로 주기적인 재연결을 구성합니다. 연결 실패 시 캐시된 IP로 연결을 반복 시도하는 대신 즉시 DNS 이름 확인이 수행되는지 확인합니다. | **영향도 높음** Lambda 확장 프로그램, OpenTelemetry Collector, Fluent Bit, 사용자 지정 API 클라이언트와 같은 Agent 이외의 텔레메트리 소스는 DNS 캐싱과 연결 재사용을 각각 다른 방식으로 처리합니다. 이러한 소스가 연결 실패 후 보이는 동작도 장애 조치 시간에 영향을 미칩니다. |

DNS 이름 확인을 다시 수행하더라도 캐시된 주소가 반환될 수 있습니다. [DNS 레코드 TTL](#dns-record-configuration) 및 [OS 및 애플리케이션 DNS 캐시](#os-and-application-dns-caching)를 연결 재설정 간격과 함께 구성합니다.

### Agent 구성 예시 {#agent-configuration-examples}

`<CUSTOM_INTAKE_URL>`을 DDR 온보딩 과정에서 Datadog이 구성하는 수집 엔드포인트로 바꿉니다. 이 엔드포인트는 Datadog에 위임한 도메인(`<CUSTOMER>.mrf.datadoghq.com`)을 사용합니다. [고객 주도 DNS 장애 조치 설정][5]을 참조하세요.

`datadog.yaml`에서 전송하는 각 텔레메트리 유형에 대한 연결 재설정 간격 설정을 업데이트합니다. 간격을 300초 이하로 구성합니다. 간격을 `0`으로 설정하지 마세요. 이 값으로 설정하면 주기적인 재연결이 비활성화됩니다.

**메트릭**(`datadog.yaml`):

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# Reset connections every 300 seconds to resolve DNS again.
forwarder_connection_reset_interval: 300
```

**로그**(`datadog.yaml`):

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

**APM 트레이스**(`datadog.yaml`):

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc1035
[2]: https://www.rfc-editor.org/rfc/rfc2181
[3]: https://www.rfc-editor.org/rfc/rfc2308
[4]: /ko/disaster_recovery/#prerequisites
[5]: /ko/disaster_recovery/#set-up-customer-initiated-dns-failover