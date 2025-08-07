---
app_id: external-dns
categories:
- 네트워크
custom_kind: 통합
description: Datadog으로 모든 외부 DNS 메트릭을 추적하세요
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: 외부 DNS
---
## 개요

외부 DNS 서비스에서 실시간으로 메트릭을 가져와 Kubernetes 외부 DNS Prometheus 애드온으로 수집된 DNS 메트릭을 시각화하고 모니터링하세요.

For more information about external DNS, see the [Github repo](https://github.com/kubernetes-incubator/external-dns).

## 설정

### 설치

The external DNS check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you don't need to install anything else on your servers.

### 설정

Edit the `external_dns.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory), to point to your server and port, and to set the masters to monitor. See the [sample external_dns.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example) for all available configuration options.

#### 서비스 탐지 사용

Kubernetes 작업자 노드당 하나의 Datadog Agent 파드를 사용하는 경우 외부 DNS 파드에서 다음 예제 주석을 사용하여 데이터를 자동으로 검색합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- `externaldns-pod` 태그는 대상 DNS 파드 IP를 추적합니다. 다른 태그는 자동탐지를 사용하여 정보를 폴링하는 Datadog Agent와 관련이 있습니다.
- 자동탐지 주석은 파드에서 수행됩니다. 배포하려면 템플릿 사양의 메타데이터에 주석을 추가하세요.

### 검증

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `external_dns` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **external_dns.controller.last_sync** <br>(gauge) | Timestamp of last successful sync with the DNS provider<br>_Shown as second_ |
| **external_dns.registry.endpoints.total** <br>(gauge) | Number of registry endpoints<br>_Shown as resource_ |
| **external_dns.registry.errors.total** <br>(gauge) | Number of registry errors<br>_Shown as error_ |
| **external_dns.source.endpoints.total** <br>(gauge) | Number of source endpoints<br>_Shown as resource_ |
| **external_dns.source.errors.total** <br>(gauge) | Number of source errors<br>_Shown as error_ |

### 이벤트

외부 DNS 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

**external_dns.prometheus.health**

Returns `CRITICAL` if the check cannot access the metrics endpoint, otherwise returns `OK`.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.