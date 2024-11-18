---
algolia:
  subcategory: Marketplace 통합
app_id: prophetstor-federatorai-license
app_uuid: 965e6142-3b99-4999-a7c6-09a00775e511
assets:
  integration:
    auto_install: false
    configuration:
      spec: ''
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10187
    source_type_name: Federator.ai.license
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor
  sales_email: dd_subscription@prophetstor.com
  support_email: support@prophetstor.com
  vendor_id: prophetstor
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- marketplace
- orchestration
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: prophetstor_federatorai
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: prophetstor_federatorai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: federatorai-license
  short_description: 월 $2000
  unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: 쿠버네티스(Kubernetes) 애플리케이션 최적화를 위한 Federator.ai 라이선스
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Orchestration
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 쿠버네티스(Kubernetes) 애플리케이션 최적화를 위한 Federator.ai 라이선스
  media:
  - caption: ProphetStor Federator.ai 클러스터 개요 대시보드 리소스 사용량 예측 및 권장 사항 쿠버네티스(Kubernetes)
      클러스터 및 노드 및 과거 사용량을 표시합니다.
    image_url: images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai 애플리케이션 개요( 대시보드 )는 각 애플리케이션에 대한 예상 CPU 및 메모리
      사용량과 권장 사항을 표시합니다.
    image_url: images/Federator_ai_Datadog_Application_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai 카프카 개요( 대시보드 )는 카프카 소비자 복제본 자동 확장에 대한 사용 정보
      및 권장 사항을 표시합니다.
    image_url: images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: image
  - caption: ProphetStor Federator.ai 비용 분석 개요 대시보드 에는 쿠버네티스(Kubernetes) 클러스터 의 배포
      비용과 클러스터 설정 의 권장 사항, 퍼블릭 클라우드 서비스 제공업체에 배포할 경우 예상되는 비용/절감 효과가 나와 있습니다.
    image_url: images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: image
  - caption: Federator.ai 대시보드 는 쿠버네티스(Kubernetes) 또는 VM 클러스터 및 애플리케이션에 대한 워크로드 예측
      및 리소스 권장 사항을 표시합니다.
    image_url: images/Federator_ai_Dashboard.png
    media_type: image
  - caption: 클러스터, 노드, 네임스페이스, 애플리케이션, 컨트롤러에 대한 예측 및 리소스 권장 사항을 제공합니다.
    image_url: images/Federator_ai_Workload_Prediction.png
    media_type: image
  - caption: 클러스터 예상 워크로드를 기반으로, Federator.ai는 다양한 퍼블릭 클라우드 공급자 에 대해 가장 비용 효율적인 클러스터
      설정을 추천합니다.
    image_url: images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: image
  - caption: Federator.ai는 개인별 네임스페이스에 대한 비용 추세를 분석하고 예측합니다.
    image_url: images/Federator_ai_Cost_Allocation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ProphetStor Federator.ai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[ProphetStor Federator.ai][1]는 Kubernetes 및 VM(가상 머신) 클러스터에 대한 컴퓨팅 리소스 관리를 향상하도록 설계된 AI 기반 솔루션입니다. 멀티 테넌트 LLM(대형 언어 모델) 교육을 포함한 IT 운영에 대한 전체적인 옵저버빌리티를 통해 미션 크리티컬 애플리케이션, 네임스페이스, 노드 및 클러스터에 대한 리소스를 효율적으로 할당하고 리소스 낭비를 최소화하면서 KPI를 효과적으로 달성할 수 있습니다.

* Kubernetes 클러스터의 컨테이너화된 애플리케이션은 물론 VMware 클러스터의 VM, Amazon Web Services(AWS) Elastic Compute Cloud(EC2), Azure Virtual Machine 및 Google Compute Engine에 대한 AI 기반 워크로드 예측
* 운영 메트릭을 파악한 후 AI 엔진이 생성한 애플리케이션 인식 워크로드 예측을 통해 지능형 리소스를 추천합니다. 
* 일반 Kubernetes 애플리케이션 컨트롤러/네임스페이스를 위한 CPU/메모리 자동 프로비저닝
* Kubernetes 애플리케이션 컨테이너, Kafka 소비자 그룹 및 NGINX Ingress 업스트림 서비스의 자동 확장
* 쿠버네티스(Kubernetes) 클러스터 및 VM에 대한 워크로드 예측을 기반으로 한 최적의 멀티 클라우드 비용 분석 및 권장 사항 클러스터입니다.
* 클러스터, Kubernetes 애플리케이션, VM 및 Kubernetes 네임스페이스에 대한 권장 사항을 기반으로 한 실제 비용 및 잠재적 절감액
* 성능 저하 없이 MultiTenant LLM 트레이닝 옵저버빌리티 및 실행 가능한 리소스 최적화

[ProphetStor Federator.ai][1]는 Datadog 에이전트와 통합된 API를 통해 LLM 교육을 포함한 애플리케이션 수준의 워크로드부터 클러스터 수준의 리소스 소비까지 전체 스택에 대한 가시성을 제공합니다. 이 통합 는 라이브 모니터링 와 예측 분석 간의 동적 루프를 촉진하여 리소스 관리를 지속적으로 개선하고 비용을 최적화하며 효율적인 애플리케이션 운영을 보장합니다. ProphetStor Federator.ai 라이선스를 사용하면 AI 기반 솔루션을 적용하여 쿠버네티스(Kubernetes) 컨테이너, 네임스페이스 및 클러스터 노드의 리소스 사용을 추적하고 예측하여 비용이 많이 드는 오버-프로비저닝 또는 성능에 영향을 미치는 언더-프로비저닝 를 방지하기 위한 올바른 권장 사항을 만들 수 있습니다. 애플리케이션 워크로드 예측을 활용하여, Federator.ai는 적시에 애플리케이션 컨테이너를 자동 확장하고 쿠버네티스(Kubernetes) HPA 또는 [Datadog 워터마크 포드 자동 확장(WPA)][3]을 통해 적절한 수의 컨테이너 복제본으로 성능을 최적화합니다.

이 Federator.ai 라이선스와는 별도로 즉시 사용 가능한 대시보드 및 권장 모니터가 포함된 공식 [Datadog 통합 ][9]를 사용할 수 있습니다. Federator.ai에 대한 자세한 내용은 [ProphetStor Federator.ai 기능 데모][2] 비디오 에서 확인할 수 있습니다.

## 지원

지원이나 요청이 있는 경우 [ProphetStor 지원](mailto:support@prophetstor.com)으로 문의하세요.


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: /ko/integrations/federatorai

---
이 애플리케이션은 Datadog 마켓플레이스를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">마켓플레이스에서 이 애플리케이션을 구입하세요</a>.