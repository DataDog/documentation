---
aliases:
- /ko/agent/faq/kubernetes-cluster-name-detection
- /ko/agent/guide/kubernetes-cluster-name-detection
further_reading:
- link: /agent/autodiscovery/
  tag: 도움말
  text: Docker Agent 자동 탐지
- link: /agent/kubernetes/host_setup/
  tag: 도움말
  text: Kubernetes 호스트 설정
- link: /agent/kubernetes/integrations/
  tag: 도움말
  text: 커스텀 통합
kind: 도움말
title: Kubernetes 클러스터 이름 자동 탐지
---

Agent v6.11+의 경우 Datadog Agent는 Google GKE, Azure AKS 및 AWS EKS에서 Kubernetes 클러스터 이름을 자동으로 감지할 수 있습니다. 감지되면 클러스터 이름이 수집된 모든 데이터에 노드 이름의 접미사로 추가되어 Kubernetes 클러스터 전체에서 노드를 쉽게 식별할 수 있습니다. Google GKE 및 Azure AKS에서는 클러스터 이름이 클라우드 공급자 API에서 검색됩니다. AWS EKS의 경우 클러스터 이름은 EC2 인스턴스 태그에서 검색됩니다. AWS에서는 Agent가 EC2 인스턴스 태그를 쿼리할 수 있도록 Datadog IAM 정책에 `ec2:DescribeInstances` [권한][1]을 추가해야 합니다.

**참고**: Agent 설정 파라미터 [`clusterName`][2] 또는 `DD_CLUSTER_NAME` 환경 변수를 통해 Agent  v6.5+를 사용하여 이 클러스터 이름 값을 수동으로 설정할 수 있습니다.

[1]: /ko/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml#L66