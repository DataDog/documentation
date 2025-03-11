---
aliases:
- /ko/integrations/azure_expressroute
categories:
- azure
- cloud
- 네트워크
dependencies: []
description: 주요 Azure ExpressRoute 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_express_route/
draft: false
git_integration_title: azure_express_route
has_logo: true
integration_id: azure-expressroute
integration_title: Microsoft Azure ExpressRoute
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_express_route
public_title: Datadog-Microsoft Azure ExpressRoute 통합
short_description: 주요 Azure ExpressRoute 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure ExpressRoute 서비스를 사용하면 연결 공급자가 지원하는 프라이빗 연결을 통해 온-프레미스 네트워크를 Microsoft 클라우드로 확장할 수 있습니다.

Datadog Azure 통합을 사용하여 Azure ExpressRoute에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_express_route" >}}


### 이벤트

Azure ExpressRoute 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure ExpressRoute 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/