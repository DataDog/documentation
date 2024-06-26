---
aliases:
- /ko/guides/azure/
- /ko/integrations/azure_storage/
categories:
- azure
- cloud
- iot
- log collection
- network
- notifications
dependencies: []
description: 인스턴스와 수많은 Azure 서비스에서 메트릭을 수집해 보세요.
doc_link: https://docs.datadoghq.com/integrations/azure/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: 블로그
  text: Datadog 서버리스 보기로 Azure 앱 서비스 살펴보기
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: 블로그
  text: Microsoft Azure VM 모니터링 사용법
- link: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/
  tag: 블로그
  text: Datadog으로 Ampere Altra Arm 기반 CPU가 탑재된 Microsoft Azure VM을 모니터링 해보시는 건 어떨까요?
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: 블로그
  text: Microsoft Azure 플랫폼 로그 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 Azure 서비스 상태 이벤트 모니터링
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: 블로그
  text: Azure 컨테이너 앱을 Datadog으로 모니터링하기
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: 블로그
  text: Datadog CI 가시성을 갖춘 Azure 파이프라인 모니터링하기
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: 블로그
  text: Azure Government를 Datadog으로 모니터링하기
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: 블로그
  text: Datadog으로 엔터프라이즈 규모의 Azure 환경을 몇 분 만에 모니터링 시작하기
- link: https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/
  tag: 설명서
  text: Azure 통합 아키텍처 및 설정
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: 설명서
  text: Azure 포털에서 Datadog 사용
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 설명서
  text: 클라우드 인스턴스에 Datadog 에이전트를 설치해야 하는 이유는 무엇인가요?
- link: https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/
  tag: 블로그
  text: Datadog으로 Azure OpenAI 모니터링
- link: https://www.datadoghq.com/blog/datadog-aks-cluster-extension/
  tag: 블로그
  text: Datadog AKS 클러스터 확장 프로그램으로 Azure 컨테이너 모니터링 간소화
- link: https://www.datadoghq.com/blog/azure-integration-configuration/
  tag: 블로그
  text: 모든 Azure 통합에 대한 통합 관측성(observability) 설정을 한 번에 미세 조정하기
git_integration_title: azure
has_logo: true
integration_id: azure
integration_title: Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  '[Azure App Gateway] Backend Hosts': assets/monitors/app_gateway_backend_hosts.json
  '[Azure App Gateway] CPU Utilization': assets/monitors/app_gateway_cpu_utilization.json
  '[Azure App Gateway] Failed Requests': assets/monitors/app_gateway_failed_requests.json
  '[Azure App Gateway] Response HTTP Status Anomaly': assets/monitors/app_gateway_http_status_anomalies.json
  '[Azure App Service] App Service Errors': assets/monitors/app_service_app_service_errors.json
  '[Azure App Service] App Service Plan CPU Utilization': assets/monitors/app_service_cpu.json
  '[Azure App Service] App Service Plan Memory Utilization': assets/monitors/app_service_memory.json
  '[Azure App Service] Connections': assets/monitors/app_service_connections.json
  '[Azure App Service] Function App Errors': assets/monitors/app_service_function_app_errors.json
  '[Azure App Service] Requests': assets/monitors/app_service_requests.json
  '[Azure App Service] Response Time': assets/monitors/app_service_response_times.json
  '[Azure SQL Database] CPU Utilization': assets/monitors/sql_db_cpu_percent.json
  '[Azure SQL Database] DTU Consumption': assets/monitors/sql_db_dtu_consumption_percent.json
  '[Azure SQL Database] Deadlock Anomalies': assets/monitors/sql_db_deadlock_anomalies.json
  '[Azure SQL Database] Failed Connections': assets/monitors/sql_db_connections_failed.json
  '[Azure SQL Database] Georeplication Link Status ': assets/monitors/sql_db_replication_links.json
  '[Azure SQL Database] Storage Utilization': assets/monitors/sql_db_storage_percent.json
  '[Azure VM] CPU Utilization Monitor': assets/monitors/vm_cpu_utilization.json
  '[Azure VM] Resource Health Status Monitor': assets/monitors/vm_resource_health_status.json
  '[Azure] API Rate Limit': assets/monitors/rate_limits.json
  '[Azure] Integration Errors': assets/monitors/integration_errors.json
  '[Azure] Resource Quotas': assets/monitors/resource_quotas.json
  '[Azure] Service Health Events': assets/monitors/service_health_events.json
name: azure
public_title: Datadog-Microsoft Azure 통합
short_description: 인스턴스와 수많은 Azure 서비스에서 메트릭을 수집해 보세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog의 Azure 통합 기능으로 Azure 환경에서 메트릭 및 로그를 수집할 수 있도록 도와드립니다. 설정 옵션은 조직에서 사용하는 Datadog 사이트에 따라 달라집니다.

**모든 사이트:** 모든 Datadog 사이트에서 앱 등록 자격 증명 프로세스로 메트릭 수집을 구현하고, 이벤트 허브를 설정해 Azure 플랫폼 로그를 전송할 수 있습니다. _Azure 통합으로 Azure China을 모니터링하는 경우, 중국 본토에서(또는 중국 내 환경과 관련한) Datadog 서비스의 모든 사용은 당사 웹사이트의 [제한된 서비스 지역][1] 섹션에 고지된 면책 조항의 적용을 받습니다._

**US3:** 조직이 Datadog US3 사이트를 사용한다면 Azure Native 통합으로 Azure 환경 관리 및 데이터 수집을 간소화해 보세요. Datadog은 가능한 이 방법을 사용할 것을 권장합니다. 본 설정으로 Azure에서 Datadog 리소스를 생성하여 Azure 구독을 Datadog 조직에 연결합니다. 이러한 방식으로 메트릭 수집용 앱 등록 자격 증명 프로세스 및 로그 전달용 이벤트 허브 설정을 대체할 수 있습니다.

아래의 용도로 Microsoft Azure에 연결합니다.
- Datadog 에이전트를 설치하거나 설치 없이 Azure VM에서 메트릭을 수집합니다.
- 모든 Azure 서비스용 표준 Azure 모니터링 메트릭 수집: 애플리케이션 게이트웨이, 앱 서비스 (웹 및 모바일), 배치 서비스, 이벤트 허브, IoT 허브, 로직 앱, Redis 캐시, 서버 팜(앱 서비스 플랜), SQL 데이터베이스, SQL 엘라스틱 풀, 가상 머신 스케일 세트 등.
- Azure 환경에서 정의한 지역, 리소스 그룹, 태그 등의 관련 리소스에 대한 Azure 독점 정보로 Azure 메트릭스를 태깅합니다.
- Datadog 생성 메트릭으로 Azure 환경에 대한 고유한 통찰을 제공합니다.
- 로그, 메트릭, 애플리케이션 성능 모니터링(APM) 트레이싱, 사용자 활동, Datadog 조직 내 기타 데이터 등, Azure 애플리케이션의 데이터를 상호 연결합니다.

<div class="alert alert-warning">
Datadog의 Azure 통합은 <a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">Azure 모니터링의 메트릭을 모두 수집하도록</a> 제작되었습니다. Datadog은 하위 통합을 모두 포괄하기 위해 문서를 지속적으로 업데이트하려고 노력하나, 클라우드 서비스는 신규 메트릭 및 서비스를 빠르게 출시하므로 통합 목록의 업데이트가 종종 늦어질 수도 있습니다.<br> <code>azure.*.status</code> 및 <code>azure.*.count</code> 메트릭은  Datadog Azure Resource Health가 생성합니다. 자세한 내용을 확인하려면 <a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric">Azure 상태 및 카운트 메트릭</a>을 참조하세요.
</div>

| 통합                     | 설명                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [분석 서비스][2]          | 클라우드에서 데이터 모델을 제공하는 서비스입니다.                                                         |
| [API 관리][3]             | API를 게시, 보호, 변환, 유지 관리 및 모니터링하는 서비스입니다.                                      |
| [앱 서비스][4]                | 웹, 모바일, API 및 비즈니스 로직 애플리케이션을 배포 및 확장하는 서비스입니다.                      |
| [앱 서비스 환경][5]    | 상위 스케일에서 앱 서비스 앱을 안전하게 실행할 수 있는 환경 을 제공하는 서비스입니다.               |
| [앱 서비스 플랜][6]           | 웹 앱 실행용 컴퓨팅 리소스 세트입니다.                                                          |
| [애플리케이션 게이트웨이][7]        | 웹 애플리케이션의 트래픽을 관리할 수 있도록 도와드리는 웹 트래픽 로드 밸런서입니다.                  |
| [자동화][8]                 | 환경에서 자동화 및 설정 관리를 제공하는 서비스입니다.                 |
| [배치 서비스][9]              | 관리형 작업 스케줄러 및 프로세서입니다.                                                                     |
| [인지 서비스(Cognitive Services)][10]         | AI 또는 데이터 사이언스 지식 없이도 애플리케이션을 구축할 수 있도록 도와드리는 API, SDK 및 서비스입니다.       |
| [컨테이너 인스턴스][11]       | 기본 인프라스트럭처를 프로비저닝하거나 관리하지 않고도 컨테이너를 배포할 수 있는 서비스입니다.     |
| [컨테이너 서비스][12]         | 운영환경에서 사용할 수 있는(production-ready) 쿠버네티스(Kubernetes), DC/OS 또는 도커(Docker) 스웜 클러스터입니다.                                            |
| [코스모스 DB][13]                 | 문서, 키-값, 와이드 컬럼, 그래프 데이터베이스를 지원하는 데이터베이스 서비스입니다.                   |
| [고객 인사이트][14]         | 해당 기능으로 조직이 데이터 세트를 통합하여 고객에 대한 360° 뷰를 구축할 수 있습니다.                |
| [데이터 탐색기][15]             | 빠르면서도 확장성이 뛰어난 데이터 탐색 서비스입니다.                                                        |
| [데이터 팩토리][16]              | 데이터 저장, 이동 및 처리 서비스를 자동화된 데이터 파이프라인으로 구성할 수 있도록 도와드리는 서비스입니다.       |
| [데이터 레이크 분석][17]       | 빅 데이터를 간소화하는 분석 작업 서비스입니다.                                                        |
| [데이터 레이크 스토어][18]           | 빅 데이터 분석을 지원하는 무제한 데이터 레이크입니다.                                                     |
| [MariaDB용 데이터베이스][19]      | 완전관리형 엔터프라이즈 지원 커뮤니티 MariaDB 데이터베이스를 제공하는 서비스입니다.                       |
| [이벤트 그리드][20]                | 게시-구독 모델로 이벤트 소비량을 균일화하는 이벤트 라우팅 서비스입니다.       |
| [이벤트 허브][21]                 | 라지 스케일 데이터 스트림 관리 서비스입니다.                                                                   |
| [ExpressRoute][22]              | 온프레미스 네트워크를 클라우드로 확장하는 서비스입니다.                                             |
| [방화벽][23]                  | Azure Virtual 네트워크 리소스를 보호하는 클라우드 네이티브 네트워크 보안 서비스입니다.                            |
| [함수][24]                 | 이벤트 트리거에 대한 응답으로 서버리스 코드를 실행하는 서비스입니다.                                      |
| [HDInsights][25]                | 방대한 양의 데이터를 처리하는 클라우드 서비스입니다.                                                   |
| [IOT 허브][26]                   | 수백만 개의 IOT 에셋을 연결, 모니터링, 관리합니다.                                                      |
| [키 볼트][27]                 | 클라우드 애플리케이션 및 서비스에서 사용하는 암호화 키 및 기밀 정보를 보호 및 관리해 드리는 서비스입니다. |
| [로드 밸런서][28]             | 애플리케이션을 확장하여 서비스를 더욱 폭넓게 활용할 수 있도록 도와드립니다.                                   |
| [로직 앱][29]                 | 강력한 통합 솔루션을 구축하세요.                                                                     |
| [기계 학습][30]          | 더 빠르게 빌드 및 배포할 수 있는 엔터프라이즈급 기계 학습 서비스 모델입니다.                              |
| [네트워크 인터페이스][31]        | 인터넷, Azure, 온프레미스 리소스로 VM 커뮤니케이션을 지원합니다.                                 |
| [알림 허브][32]         | 백엔드에서 모든 플랫폼으로 알림을 전송할 수 있는 푸시 엔진입니다.                     |
| [공용 IP 주소][33]         | 인터넷에서 인바운드 통신 및 아웃바운드 연결을 가능하게 하는 리소스입니다.                |
| [복구 서비스 볼트][34]    | 시간에 따라 생성된 백업 및 복구 지점을 저장하는 엔티티입니다.                                  |
| [레디스(Redis) 캐시][35]               | 관리형 데이터 캐시입니다.                                                                                       |
| [릴레이(Relay)][36]                     | 기업 네트워크에서 실행되는 서비스를 공용 클라우드에 안전하게 노출하도록 도와드립니다.                          |
| [인지 검색][37]          | 검색 경험을 더욱 풍부하게 하는 도구를 제공해 드리는 서비스형 검색 클라우드 솔루션(search-as-a-service cloud solution)입니다.             |
| 저장                         | [블롭(blob)][38], [파일][39], [대기열][40], [테이블][41]용 스토리지입니다.                                     |
| [스트림 분석][42]          | 이벤트-프로세싱 엔진으로 기기에서 대용량 데이터 스트리밍을 검사합니다.                        |
| [SQL 데이터베이스][43]              | 뛰어난 확장성의 관계형 클라우드 데이터베이스입니다.                                                         |
| [SQL 데이터베이스 엘라스틱 풀][44] | 다중 데이터베이스의 성능을 관리합니다.                                                              |
| [시냅스 분석][45]         | 데이터 통합, 엔터프라이즈 데이터 웨어하우징 및 빅 데이터 분석을 통합하는 분석 서비스입니다. |
| [사용량 및 할당량][46]          | Azure 사용량을 추적합니다.                                                                                  |
| [가상 머신][47]           | 가상 머신 관리 서비스입니다.                                                                       |
| [가상 머신 확장 세트][48] | 동일한 VM 세트를 배포, 관리 및 오토스케일링합니다.                                                     |
| [가상 네트워크][49]           | Azure 리소스가 서로, 인터넷, 온-프레미스와 안전하게 통신할 수 있도록 지원하는 서비스입니다.    |

## 설정

### 자동

_모든 사이트:_  
Azure에서 표준 Datadog 통합을 자동 설정하는 방법을 확인하려면 [표준 Azure 통합 프로그래밍 관리 가이드][50]를 참조하세요. Terraform 또는 Azure CLI로 통합을 설정하고, Datadog Azure VM 확장 프로그램으로 Datadog 에이전트를 Azure에 기본 배포하고, 자동 스크립트를 실행하여 로그 수집을 활성화합니다.

_US3:_  
Azure의 Datadog 리소스를 사용하여 Terraform으로 Datadog Azure Native 통합을 설정하는 방법에 대한 지침을 확인하려면 [Azure Native 통합 프로그래밍 관리 지침][51]을 참조하세요.

### 수동

_모든 사이트:_  
Azure 포털 또는 CLI를 통해 Azure로 Datadog 통합을 수동으로 설정하는 방법, VM 확장 프로그램 또는 AKS 클러스터 확장 프로그램을 사용하여 Azure에 Datadog 에이전트를 직접 배포하는 방법에 대해 확인하려면 [표준 Azure 통합 수동 설정 지침][52]을 참조하세요.

_US3:_  
Datadog으로 Azure Native 통합을 수동으로 설정하는 방법을 확인하려면 [Azure Native 통합 수동 설정 지침][53]을 참조하세요. 본 지침에는 VM 확장 프로그램 또는 AKS 클러스터 확장 프로그램을 사용하여 Azure에 Datadog 에이전트를 직접 배포하여 Azure에서 Datadog 리소스를 생성하는 방법과 SSO(single sign-on) 옵션 설정 방법이 포함됩니다.

## 로그 수집

_모든 사이트:_  
Azure 로그를 Datadog에 전송하는 방법을 확인하려면 [Datadog에 Azure 로그 전송하기][54] 지침을 참조하세요. Datadog-Azure 함수와 Azure 이벤트 허브를 통해 로그 수집 프로세스를 자동 또는 수동으로 설정할 수 있습니다. Azure Blob 스토리지 함수로 모든 Azure 앱 서비스에서 로그를 수집할 수도 있습니다.

_US3:_  
구독 레벨, Azure 리소스, Azure Active Directory 로그를 Datadog으로 전송하는 방법을 확인하려면 [Datadog 리소스로 Azure 로그 전송][55] 지침을 참조하세요.

## 수집한 데이터

### 메트릭

모든 표준 Azure 모니터링 메트릭과 [특정 Datadog 생성 메트릭][56]입니다.

자세한 메트릭 목록을 확인하려면 [개요 섹션](#overview)에서 적절한 Azure 서비스를 선택하세요.

### 이벤트

Azure 통합은 Azure 서비스 상태 이벤트를 자동 수집합니다. Datadog에서 확인하려면 [이벤트 탐색기][57]로 이동하여 `Azure Service Health` 네임스페이스로 필터링합니다.

### 서비스 점검

Azure 통합에는 서비스 점검이 포함되지 않습니다.

### 태그

Azure 통합 메트릭, 이벤트, 서비스 점검은 Azure 환경에 정의된 태그 외에도 다음의 태그를 수신합니다.

| 통합                             | 네임스페이스                                   | Datadog 태그 키                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 모든 Azure 통합                  | 전체                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (해당되는 경우)                                                            |
| Azure VM 통합                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Azure 앱 서비스 플랜                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Azure 앱 서비스 웹 앱 및 함수 | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (linux 웹 앱 전용), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure SQL DB                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>복제 링크 전용: `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure 로드 밸런서                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure 사용량 및 할당량                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## 트러블슈팅

[Azure 트러블슈팅][58] 지침을 참조하세요.

도움이 더 필요하신가요? [Datadog 고객 지원 팀][59]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/legal/restricted-service-locations/
[2]: https://docs.datadoghq.com/ko/integrations/azure_analysis_services/
[3]: https://docs.datadoghq.com/ko/integrations/azure_api_management/
[4]: https://docs.datadoghq.com/ko/integrations/azure_app_services/
[5]: https://docs.datadoghq.com/ko/integrations/azure_app_service_environment/
[6]: https://docs.datadoghq.com/ko/integrations/azure_app_service_plan/
[7]: https://docs.datadoghq.com/ko/integrations/azure_application_gateway/
[8]: https://docs.datadoghq.com/ko/integrations/azure_automation/
[9]: https://docs.datadoghq.com/ko/integrations/azure_batch/
[10]: https://docs.datadoghq.com/ko/integrations/azure_cognitive_services/
[11]: https://docs.datadoghq.com/ko/integrations/azure_container_instances/
[12]: https://docs.datadoghq.com/ko/integrations/azure_container_service/
[13]: https://docs.datadoghq.com/ko/integrations/azure_cosmosdb/
[14]: https://docs.datadoghq.com/ko/integrations/azure_customer_insights/
[15]: https://docs.datadoghq.com/ko/integrations/azure_data_explorer/
[16]: https://docs.datadoghq.com/ko/integrations/azure_data_factory/
[17]: https://docs.datadoghq.com/ko/integrations/azure_data_lake_analytics/
[18]: https://docs.datadoghq.com/ko/integrations/azure_data_lake_store/
[19]: https://docs.datadoghq.com/ko/integrations/azure_db_for_mariadb/
[20]: https://docs.datadoghq.com/ko/integrations/azure_event_grid/
[21]: https://docs.datadoghq.com/ko/integrations/azure_event_hub/
[22]: https://docs.datadoghq.com/ko/integrations/azure_express_route/
[23]: https://docs.datadoghq.com/ko/integrations/azure_firewall/
[24]: https://docs.datadoghq.com/ko/integrations/azure_functions/
[25]: https://docs.datadoghq.com/ko/integrations/azure_hd_insight/
[26]: https://docs.datadoghq.com/ko/integrations/azure_iot_hub/
[27]: https://docs.datadoghq.com/ko/integrations/azure_key_vault/
[28]: https://docs.datadoghq.com/ko/integrations/azure_load_balancer/
[29]: https://docs.datadoghq.com/ko/integrations/azure_logic_app/
[30]: https://docs.datadoghq.com/ko/integrations/azure_machine_learning_services/
[31]: https://docs.datadoghq.com/ko/integrations/azure_network_interface/
[32]: https://docs.datadoghq.com/ko/integrations/azure_notification_hubs/
[33]: https://docs.datadoghq.com/ko/integrations/azure_public_ip_address/
[34]: https://docs.datadoghq.com/ko/integrations/azure_recovery_service_vault/
[35]: https://docs.datadoghq.com/ko/integrations/azure_redis_cache/
[36]: https://docs.datadoghq.com/ko/integrations/azure_relay/
[37]: https://docs.datadoghq.com/ko/integrations/azure_search/
[38]: https://docs.datadoghq.com/ko/integrations/azure_blob_storage/
[39]: https://docs.datadoghq.com/ko/integrations/azure_file_storage/
[40]: https://docs.datadoghq.com/ko/integrations/azure_queue_storage/
[41]: https://docs.datadoghq.com/ko/integrations/azure_table_storage/
[42]: https://docs.datadoghq.com/ko/integrations/azure_stream_analytics/
[43]: https://docs.datadoghq.com/ko/integrations/azure_sql_database/
[44]: https://docs.datadoghq.com/ko/integrations/azure_sql_elastic_pool/
[45]: https://docs.datadoghq.com/ko/integrations/azure_synapse/
[46]: https://docs.datadoghq.com/ko/integrations/azure_usage_and_quotas/
[47]: https://docs.datadoghq.com/ko/integrations/azure_vm/
[48]: https://docs.datadoghq.com/ko/integrations/azure_vm_scale_set/
[49]: https://docs.datadoghq.com/ko/integrations/azure_virtual_networks/
[50]: https://docs.datadoghq.com/ko/integrations/guide/azure-programmatic-management/
[51]: https://docs.datadoghq.com/ko/integrations/guide/azure-native-programmatic-management/
[52]: https://docs.datadoghq.com/ko/integrations/guide/azure-manual-setup/
[53]: https://docs.datadoghq.com/ko/integrations/guide/azure-native-manual-setup/
[54]: https://docs.datadoghq.com/ko/logs/guide/azure-logging-guide/
[55]: https://docs.datadoghq.com/ko/logs/guide/azure-native-logging-guide/
[56]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[57]: https://app.datadoghq.com/event/explorer
[58]: https://docs.datadoghq.com/ko/integrations/guide/azure-troubleshooting/
[59]: https://docs.datadoghq.com/ko/help/