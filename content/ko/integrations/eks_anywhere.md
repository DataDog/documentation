---
app_id: eks-anywhere
app_uuid: 21bd91d8-7594-4c2f-bbd8-11595e4511d1
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10248
    source_type_name: Amazon EKS Anywhere
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- 클라우드
- 컨테이너
- 쿠버네티스(Kubernetes)
- 로그 수집
- 오케스트레이션
- 프로비저닝
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_anywhere/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_anywhere
integration_id: eks-anywhere
integration_title: Amazon EKS Anywhere
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eks_anywhere
public_title: Amazon EKS Anywhere
short_description: 온프레미스에서 Kubernetes 클러스터를 운영하기 위한 EKS 배포 옵션
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 온프레미스에서 Kubernetes 클러스터를 운영하기 위한 EKS 배포 옵션
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/announcing-eks
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/eks-cluster-metrics
  - resource_type: 설명서
    url: https://docs.datadoghq.com/integrations/eks_fargate/
  support: README.md#Support
  title: Amazon EKS Anywhere
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS Dashboard][1]

## 개요

Amazon Elastic Kubernetes Service(EKS)는 모든 표준 Kubernetes 환경에 대한 배포 및 유지 관리의 특정 측면을 자동화하는 관리형 Kubernetes 서비스입니다. 기존 Kubernetes 애플리케이션을 Amazon EKS로 마이그레이션하든 AWS Outposts의 Amazon EKS에 새 클러스터를 배포하든 Datadog은 EKS 환경을 실시간으로 모니터링하는 데 도움이 됩니다.

[Amazon EKS Anywhere][2]는 가상 머신(예: VMware vSphere) 및 베어 메탈 서버를 포함하여 온프레미스에서 Kubernetes 클러스터를 생성하고 운영할 수 있는 배포 옵션입니다.

## 설정

그 이유는 바로 Datadog가 이미 쿠버네티스(Kubernetes)와 AWS에 통합되었기 때문입니다. EKS 모니터링에 바로 사용할 수 있습니다. 쿠버네티스 클러스터에서 에이전트를 실행하거나 EKS로 마이그레이션할 계획이라면 Datadog를 사용해 클러스터를 계속 모니터링할 수 있습니다.

또한 [Amazon EKS Managed Node Groups][3] 및 [Amazon EKS on AWS Outposts][4]가 지원됩니다.

### Datadog Helm 차트 설정

다음 추가 구성 지침과 함께 [Helm을 사용한 Agent 배포 지침][5]을 사용하세요.

1. `datadog.kubelet.tlsVerify`를 `false`로 설정합니다.
2.  Agent 파드에서 허용 오차를 설정합니다. 이는 컨트롤 플레인을 모니터링하는 데 필요합니다.

다음 Helm 스니펫은 EKS Anywhere 모니터링에 대한 구체적인 변경 사항을 보여줍니다.

```yaml
datadog:
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
```

### 메트릭 수집

EKS를 모니터링하려면 [ELB][6]와 같이 EKS로 실행 중인 다른 AWS 서비스에 대한 통합과 함께 다음 Datadog 통합 중 하나를 설정해야 합니다.

- [Kubernetes][7]
- [AWS][8]
- [AWS EC2][9]

### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

설정은 Kubernetes와 동일합니다.
모든 컨테이너에서 로그 수집을 시작하려면 Datadog Agent [환경 변수][10]를 사용하세요.

DaemonSets를 사용하여 [모든 노드에 Datadog  Agent를 자동으로 배포][11]합니다.

환경 변수 및 고급 설정 옵션에 대해 자세히 알아보려면 [컨테이너 로그 수집 지침][12]을 따르세요.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.

## 참고 자료

- [Datadog으로 Amazon EKS 모니터링][14]
- [Amazon EKS 모니터링의 주요 메트릭][15]
- [AWS Fargate의 Amazon EKS][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://aws.amazon.com/eks/eks-anywhere/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm#installation
[6]: https://docs.datadoghq.com/ko/integrations/amazon_elb/
[7]: https://docs.datadoghq.com/ko/integrations/kubernetes/
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/
[10]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#container-installation
[12]: https://docs.datadoghq.com/ko/logs/log_collection/docker/#option-2-container-installation
[13]: https://docs.datadoghq.com/ko/help/
[14]: https://www.datadoghq.com/blog/announcing-eks
[15]: https://www.datadoghq.com/blog/eks-cluster-metrics
[16]: https://docs.datadoghq.com/ko/integrations/eks_fargate/