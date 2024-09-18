---
app_id: federatorai
app_uuid: c9192d7c-101d-44b2-8ddf-c5fcbe5c5306
assets:
  dashboards:
    ProphetStor Federator.ai Application Overview: assets/dashboards/application-overview.json
    ProphetStor Federator.ai Cluster Overview: assets/dashboards/cluster-overview.json
    ProphetStor Federator.ai Cost Analysis Overview: assets/dashboards/cost-analysis-overview.json
    ProphetStor Federator.ai Cost Management - Cluster: assets/dashboards/cost-management-cluster-overview.json
    ProphetStor Federator.ai Cost Management - Namespace: assets/dashboards/cost-management-namespace-overview.json
    ProphetStor Federator.ai Cost Management - Node: assets/dashboards/cost-management-node-overview.json
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: federatorai.integration.status
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10104
    source_type_name: Federator.ai
  monitors:
    Node CPU Load prediction is high: assets/monitors/federatorai_node_cpu_prediction.json
    Node memory usage prediction is high: assets/monitors/federatorai_node_mem_prediction.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ProphetStor
  sales_email: support@prophetstor.com
  support_email: support@prophetstor.com
categories:
- containers
- 쿠버네티스(Kubernetes)
- ai/ml
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md
display_on_public_website: true
draft: false
git_integration_title: federatorai
integration_id: federatorai
integration_title: Federator.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: federatorai
public_title: Federator.ai
short_description: ProphetStor Federator.ai와 통합하여 애플리케이션 성능 최적화
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::AI/ML
  - Category::Orchestration
  - Supported OS::Linux
  - 제공::통합
  configuration: README.md#Setup
  description: ProphetStor Federator.ai와 통합하여 애플리케이션 성능 최적화
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Federator.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요


[ProphetStor Federator.ai][1]는 Kubernetes 및 VM(가상 머신) 클러스터에 대한 컴퓨팅 리소스 관리를 향상하도록 설계된 AI 기반 솔루션입니다. 멀티 테넌트 LLM(대형 언어 모델) 교육을 포함한 IT 운영에 대한 전체적인 옵저버빌리티를 통해 미션 크리티컬 애플리케이션, 네임스페이스, 노드 및 클러스터에 대한 리소스를 효율적으로 할당하고 리소스 낭비를 최소화하면서 KPI를 효과적으로 달성할 수 있습니다.

Federator.ai는 고급 머신 러닝 알고리즘을 사용하여 애플리케이션 작업 부하를 예측하며 다음을 제공합니다.
* Kubernetes 클러스터의 컨테이너화된 애플리케이션은 물론 VMware 클러스터의 VM, Amazon Web Services(AWS) Elastic Compute Cloud(EC2), Azure Virtual Machine 및 Google Compute Engine에 대한 AI 기반 워크로드 예측
* 워크로드 예측, 애플리케이션, Kubernetes 및 기타 관련 메트릭을 기반으로 한 리소스 권장 사항
* 일반 Kubernetes 애플리케이션 컨트롤러/네임스페이스를 위한 CPU/메모리 자동 프로비저닝
* Kubernetes 애플리케이션 컨테이너, Kafka 소비자 그룹 및 NGINX Ingress 업스트림 서비스의 자동 확장
* Kubernetes 클러스터 및 VM 클러스터에 대한 워크로드 예측을 기반으로 하는 멀티클라우드 비용 분석 및 권장 사항
* 클러스터, Kubernetes 애플리케이션, VM 및 Kubernetes 네임스페이스에 대한 권장 사항을 기반으로 한 실제 비용 및 잠재적 절감액
* 성능 저하 없이 MultiTenant LLM 트레이닝 옵저버빌리티 및 실행 가능한 리소스 최적화

[ProphetStor Federator.ai][1]는 Datadog Agent와 통합된 API를 통해 LLM 트레이닝을 포함한 애플리케이션 수준 워크로드에서 클러스터 수준 리소스 소비에 이르기까지 전체 스택 가시성을 제공합니다. 이 통합은 실시간 모니터링과 예측 분석 간의 동적 루프를 촉진하여 리소스 관리를 지속적으로 개선하고 비용을 최적화하며 애플리케이션의 효율적인 운영을 보장합니다. Kubernetes 컨테이너, 네임스페이스 및 클러스터 노드의 리소스 사용량을 쉽게 추적하고 예측하여 비용이 많이 드는 오버 프로비저닝 또는 성능에 영향을 미치는 언더 프로비저닝을 방지하는 올바른 권장 사항을 제시할 수 있습니다. CI/CD 파이프라인에 쉽게 통합되는 Federator.ai는 Kubernetes 클러스터에 배포될 때마다 컨테이너를 지속적으로 최적화할 수 있습니다. Federator.ai는 애플리케이션 워크로드 예측을 사용하여 적시에 애플리케이션 컨테이너를 자동 확장하고 Kubernetes HPA 또는 [Datadog Watermark Pod Autoscaling(WPA)][2]을 통해 적절한 수의 컨테이너 복제본으로 성능을 최적화합니다.

Federator.ai에 대한 자세한 내용은 [ProphetStor Federator.ai 기능 데모][3] 및 [Datadog용 ProphetStor Federator.ai][4] 동영상을 참조하세요.


**ProphetStor Federator.ai 클러스터 개요**

![ProphetStor Federator.ai 클러스터 개요][5]

* Cluster Resource Usage Predictions and Recommendations
   - 이 표는 CPU 메모리 작업 부하 예측의 최대, 최소 및 평균 값과 클러스터 리소스 계획을 위해 Federator.ai에서 권장하는 CPU 메모리 리소스 사용량을 보여줍니다.

* Cluster Node Resource Usage Predictions and Recommendations
   - 이 표는 노드 리소스 계획을 위해 Federator.ai에서 CPU 메모리 워크로드 예측의 최대, 최소 및 평균 값과 권장 CPU 메모리 리소스 사용량을 보여줍니다.

* Node Current/Predicted Memory Usage (Daily)
   - 이 그래프는 Federator.ai의 일일 예상 메모리 사용량과 노드의 메모리 사용량을 보여줍니다.

* Node Current/Predicted Memory Usage (Weekly)
   - 이 그래프는 Federator.ai의 주간 예상 메모리 사용량과 노드의 메모리 사용량을 보여줍니다.

* Node Current/Predicted Memory Usage (Monthly)
   - 이 그래프는 Federator.ai의 월간 예상 메모리 사용량과 노드의 메모리 사용량을 보여줍니다.

* Node Current/Predicted CPU Usage (Daily)
   - 이 그래프는 Federator.ai의 일일 예상 CPU 사용량과 노드의 CPU 사용량을 보여줍니다.

* Node Current/Predicted CPU Usage (Weekly)
   - 이 그래프는 Federator.ai의 주간 예상 CPU 사용량과 노드의 CPU 사용량을 보여줍니다.

* Node Current/Predicted CPU Usage (Monthly)
   - 이 그래프는 Federator.ai의 월간 예상 CPU 사용량과 노드의 CPU 사용량을 보여줍니다.


**ProphetStor Federator.ai 애플리케이션 개요**

![애플리케이션 개요 대시보드][6]

* Workload Prediction for Next 24 Hours
   - 이 표에는 향후 24시간 동안 컨트롤러 리소스 계획을 위해 Federator.ai에서 제공하는 CPU 메모리 워크로드 예측의 최대, 최소 및 평균 값과 권장 CPU 메모리 리소스 사용량이 나와 있습니다.

* Workload Prediction for Next 7 Days
   - 이 표에는 향후 7일 동안 컨트롤러 리소스 계획을 위해 Federator.ai에서 제공하는 CPU 메모리 워크로드 예측의 최대, 최소 및 평균 값과 권장 CPU 메모리 리소스 사용량이 나와 있습니다.

* Workload Prediction for Next 30 Days
   - 이 표에는 향후 30일 동안 컨트롤러 리소스 계획을 위해 Federator.ai에서 제공하는 CPU 메모리 워크로드 예측의 최대, 최소 및 평균 값과 권장 CPU 메모리 리소스 사용량이 나와 있습니다.

* Current/Predicted CPU Usage (Daily)
   - 이 그래프는 Federator.ai의 일일 예상 CPU 사용량과 컨트롤러의 CPU 사용량을 보여줍니다.

* Current/Predicted CPU Usage (Weekly)
   - 이 그래프는 Federator.ai의 주간 예상 CPU 사용량과 컨트롤러의 CPU 사용량을 보여줍니다.

* Current/Predicted CPU Usage (Monthly)
   - 이 그래프는 Federator.ai의 월간 예상 CPU 사용량과 컨트롤러의 CPU 사용량을 보여줍니다.

* Current/Predicted Memory Usage (Daily)
   - 이 그래프는 Federator.ai의 일일 예상 메모리 사용량과 컨트롤러의 메모리 사용량을 보여줍니다.

* Current/Predicted Memory Usage (Weekly)
   - 이 그래프는 Federator.ai의 주간 예상 메모리 사용량과 컨트롤러의 메모리 사용량을 보여줍니다.

* Current/Predicted Memory Usage (Monthly)
   - 이 그래프는 Federator.ai의 월간 예상 메모리 사용량과 컨트롤러의 메모리 사용량을 보여줍니다.

* Current/Desired/Recommended Replicas
   - 이 그래프는 Federator.ai의 권장 복제본과 컨트롤러의 이상적인 복제본 및 현재 복제본을 보여줍니다.

* Memory Usage/Request/Limit vs Rec Memory Limit
   - 이 그래프는 Federator.ai의 권장 메모리 제한과 컨트롤러의 요청, 제한 및 현재 메모리 사용량을 보여줍니다.

* CPU Usage/Request/Limit vs Rec CPU Limit
   - 이 그래프는 Federator.ai의 권장 CPU 제한과 컨트롤러의 요청, 제한 및 현재 CPU 사용량을 보여줍니다.

* CPU Usage/Limit Utilization
   - 이 그래프는 컨트롤러의 CPU 사용률을 표시하고 CPU 사용률이 한도를 초과하는지 아니면 한도 미만인지를 시각화합니다.


**ProphetStor Federator.ai Kafka 개요**

![대시보드 개요][7]

* Recommended Replicas vs Current/Desired Replicas
   - 이 시계열 그래프는 Federator.ai의 권장 복제본과 시스템의 이상적인 복제본 및 현재 복제본을 보여줍니다.

* Production vs Consumption vs Production Prediction
   - 이 시계열 그래프는 Kafka 메시지 생성 속도 및 소비 속도와 Federator.ai가 예측한 생성 속도를 보여줍니다.

* Kafka Consumer Lag
   - 이 시계열 그래프는 모든 파티션의 소비자 지연 합계를 보여줍니다.

* Consumer Queue Latency (msec)
   - 이 시계열 그래프는 소비자가 메시지를 수신하기 전에 메시지 대기열에 있는 메시지의 평균 대기 시간을 보여줍니다.

* Deployment Memory Usage
   - 이 시계열 그래프는 소비자의 메모리 사용량을 보여줍니다.

* Deployment CPU Usage
   - 이 시계열 그래프는 소비자의 CPU 사용량을 보여줍니다.


**ProphetStor Federator.ai Multi-Cloud 비용 분석 개요**

![Multi-Cloud 비용 분석 개요][8]

* Current Cluster Cost and Current Cluster Configuration
   - 이 표는 클러스터의 현재 비용과 환경 설정을 보여줍니다.

* Recommended Cluster - AWS and Recommended Cluster Configuration - AWS
   - 이 표에는 Federator.ai의 권장 AWS 인스턴스 구성과 권장 AWS 인스턴스 비용이 나와 있습니다.

* Recommended Cluster - Azure and Recommended Cluster Configuration - Azure
   - 이 표에는 Federator.ai의 권장 Azure 인스턴스 구성과 권장 Azure 인스턴스 비용이 나와 있습니다.

* Recommended Cluster - GCP and Recommended Cluster Configuration - GCP
   - 이 표에는 Federator.ai의 권장 GCP 인스턴스 구성과 권장 GCP 인스턴스 비용이 나와 있습니다.

* Namespace with Highest Cost ($/day)
   - 이 그래프는 현재 클러스터에 있는 네임스페이스의 일일 최고 비용을 보여줍니다.

* Namespace with Highest Predicted Cost ($/month)
   - 이 그래프는 현재 클러스터에 있는 네임스페이스의 가장 높은 예상 월별 비용을 보여줍니다.


## 설정

* 아래 지침에 따라 Federator.ai를 다운로드하고 설정하세요.

### 설치

1. OpenShift/Kubernetes 클러스터에 로그인합니다.
2. 다음 명령을 사용하여 OpenShift/Kubernetes용 Federator.ai를 설치합니다.

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ...
   Please enter Federator.ai version tag [default: latest]:latest
   Please enter the path of Federator.ai directory [default: /opt]:

   Downloading v4.5.1-b1562 tgz file ...
   Done
   Do you want to use a private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]:

   Executing install.sh ...
   Checking environment version...
   ...Passed
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   Downloading Federator.ai alamedascaler sample files ...
   Done
   ========================================
   Which storage type you would like to use? ephemeral or persistent?
   [default: persistent]:
   Specify log storage size [e.g., 2 for 2GB, default: 2]:
   Specify AI engine storage size [e.g., 10 for 10GB, default: 10]:
   Specify InfluxDB storage size [e.g., 100 for 100GB, default: 100]:
   Specify storage class name: managed-nfs-storage
   Do you want to expose dashboard and REST API services for external access? [default: y]:

   ----------------------------------------
   install_namespace = federatorai
   storage_type = persistent
   log storage size = 2 GB
   AI engine storage size = 10 GB
   InfluxDB storage size = 100 GB
   storage class name = managed-nfs-storage
   expose service = y
   ----------------------------------------
   Is the above information correct [default: y]:
   Processing...

   (snipped)
   .........
   All federatorai pods are ready.

   ========================================
   You can now access GUI through https://<YOUR IP>:31012
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the target you would like to monitor.
   Review administration guide for further details. 
   ========================================
   ========================================
   You can now access Federatorai REST API through https://<YOUR IP>:31011
   The default login credential is admin/admin
   The REST API online document can be found in https://<YOUR IP>:31011/apis/v1/swagger/index.html
   ========================================

   Install Federator.ai v4.5.1-b1562 successfully

   Downloaded YAML files are located under /opt/federatorai/installation

   Downloaded files are located under /opt/federatorai/repo/v4.5.1-b1562
   ```

3. Federator.ai 파드가 제대로 실행되고 있는지 확인합니다.

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Federator.ai GUI에 로그인하면 URL 및 로그인 크리덴셜을 2단계에서 찾을 수 있습니다.


### 구성

1. Datadog에 로그인하여 Datadog API를 사용하기 위한 [API 키 및 애플리케이션 키][9]를 가져옵니다.

2. 클러스터당 메트릭 데이터 소스에 대해 Federator.ai를 구성합니다.
    - Federator.ai GUI에서 Configuration->Clusters로 이동 후 "Add Cluster"를 클릭합니다.
    - API 키와 애플리케이션 키를 입력합니다.

    ![Add Cluster 창][10] 

3. 자세한 내용은 [Federator.ai - 설치 및 구성 가이드][11] 및 [사용자 가이드][12]를 참조하세요.


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "federatorai" >}}



### 서비스 점검

Federator.ai는 서비스 점검을 포함하지 않습니다.

### 이벤트

Federator.ai는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요?  [Federator.ai - 설치 및 구성 가이드][11]를 확인하시거나 [Datadog 지원팀][14]에 문의하세요.

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/AeSH8yGGA3Q
[4]: https://youtu.be/qX_HF_zZ4BA
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[9]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png
[11]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[12]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://docs.datadoghq.com/ko/help/