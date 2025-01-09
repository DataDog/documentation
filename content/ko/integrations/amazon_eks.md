---
app_id: amazon-eks
app_uuid: abb8b86b-eeb7-4e38-b436-f4cbb09b4398
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10018
    source_type_name: Amazon EKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- configuration & deployment
- containers
- kubernetes
- log collection
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks
integration_id: amazon-eks
integration_title: Amazon EKS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks
public_title: Amazon EKS
short_description: Amazon EKS는 관리형 서비스로, AWS에서 쿠버네티스(Kubernetes)를 손쉽게 실행할 수 있도록 해줍니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS는 관리형 서비스로, AWS에서 쿠버네티스(Kubernetes)를 손쉽게 실행할 수 있도록 해줍니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EKS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS Dashboard][1]

## 개요

Amazon EKS(Elastic Kubernetes Service)는 관리형 쿠버네티스(Kubernetes) 서비스로 모든 표준 쿠버네티스 환경에 대해 배포와 유지관리의 일정 부분을 자동화해줍니다. 기존 쿠버네티스 애플리케이션을 Amazon EKS로 마이그레이션하는지, 아니면 Amazon EKS on AWS Outposts에 새로운 클러스터를 배포하는지에 관계없이 Datadog를 통해 실시간으로 EKS 환경을 모니터링할 수 있습니다.

## 설정

그 이유는 바로 Datadog가 이미 쿠버네티스(Kubernetes)와 AWS에 통합되었기 때문입니다. EKS 모니터링에 바로 사용할 수 있습니다. 쿠버네티스 클러스터에서 에이전트를 실행하거나 EKS로 마이그레이션할 계획이라면 Datadog를 사용해 클러스터를 계속 모니터링할 수 있습니다.

또한, [Amazon EKS Managed Node Groups][2] 및 [Amazon EKS on AWS Outposts][3]가 지원됩니다.

### EKS Anywhere

설치 지침은 [Amazon EKS Anywhere 통합][4]을 참조해 주세요.

### 메트릭 수집

EKS 모니터링을 위해서는 다음 Datadog 통합 중 하나를 설치해야 합니다. 또한, [ELB][5] 등 EKS와 함께 실행하고 있는 기타 AWS 서비스에 대한 통합이 필요합니다.

- [쿠버네티스][6]
- [AWS][7]
- [AWS EC2][8]

### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

설치 방법은 쿠버네티스의 설치 방법과 동일합니다.
모든 컨테이너에서 로그 수집을 시작하려면 Datadog 에이전트 [환경 변수][9]를 사용하세요.

DaemonSets를 활용하여 [모든 노드에 Datadog 에이전트를 자동으로 배포할 수 있습니다.][10]

[컨테이너 로그 수집 단계][11]를 따라 해당 환경 변수에 대해 자세히 알아보고 더 진보된 설치 옵션을 확인하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

## 참고 자료

- [Datadog를 사용해 Amazon EKS 모니터링][13]
- [Amazon EKS 모니터링을 위한 핵심 메트릭][14]
- [AWS Fargate에서의 Amazon EKS][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/ko/integrations/eks_anywhere/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/ko/integrations/kubernetes/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[8]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/
[9]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#log-collection-setup
[10]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#container-installation
[11]: https://docs.datadoghq.com/ko/logs/log_collection/docker/#option-2-container-installation
[12]: https://docs.datadoghq.com/ko/help/
[13]: https://www.datadoghq.com/blog/announcing-eks
[14]: https://www.datadoghq.com/blog/eks-cluster-metrics
[15]: https://docs.datadoghq.com/ko/integrations/eks_fargate/