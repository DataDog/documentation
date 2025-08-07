---
app_id: azure_firewall
categories:
- azure
- 클라우드
- 네트워크
custom_kind: 통합
description: 주요 Azure Firewall 메트릭을 추적하세요.
title: Microsoft Azure Firewall
---
## 개요

Azure Firewall은 Azure Virtual Network 리소스를 보호하는 데 사용되는 클라우드 기반 네트워크 보안입니다.

Datadog Azure 통합을 사용해 Firewall 메트릭을 수집할 수 있습니다.

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **azure.network_azurefirewalls.application_rule_hit** <br>(count) | The number of times application rules were hit<br>_Shown as hit_ |
| **azure.network_azurefirewalls.count** <br>(count) | The number of Azure firewalls|
| **azure.network_azurefirewalls.data_processed** <br>(gauge) | The total amount of data processed by a firewall<br>_Shown as byte_ |
| **azure.network_azurefirewalls.firewall_health** <br>(gauge) | Indicates the overall health of a firewall<br>_Shown as percent_ |
| **azure.network_azurefirewalls.network_rule_hit** <br>(count) | The number of times network rules were hit<br>_Shown as hit_ |
| **azure.network_azurefirewalls.snat_port_utilization** <br>(gauge) | The percentage of outbound SNAT ports currently in use<br>_Shown as percent_ |
| **azure.network_azurefirewalls.throughput** <br>(gauge) | The throughput processed by a firewall<br>_Shown as bit_ |

### 이벤트

Azure Firewall 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Firewall 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.