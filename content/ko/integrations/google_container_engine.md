---
categories:
- cloud
- containers
- google cloud
- log collection
custom_kind: 통합
dependencies: []
description: GCE 컨테이너의 리소스 사용량을 모니터링합니다.
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
draft: false
git_integration_title: google_container_engine
has_logo: true
integration_id: google-container-engine
integration_title: Google Container Engine
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_container_engine
public_title: Datadog-Google Container Engine 통합
short_description: GCE 컨테이너의 리소스 사용량을 모니터링합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

<div class="alert alert-danger">
본 통합은 지원 중단되었습니다. 대신 <a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">Google 쿠버네티스(Kubernetes) 엔진 통합</a> 지침을 참조하세요. 지원 중단된 메트릭에 대한 자세한 내용을 확인하려면 <a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">Google Cloud 메트릭</a> 문서를 참조하세요.
</div>

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-container-engine" >}}


### 이벤트

Google Container Engine 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Container Engine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[2]: https://docs.datadoghq.com/ko/help/