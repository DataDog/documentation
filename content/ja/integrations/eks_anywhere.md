---
"app_id": "eks-anywhere"
"app_uuid": "21bd91d8-7594-4c2f-bbd8-11595e4511d1"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10248"
    "source_type_name": Amazon EKS Anywhere
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- cloud
- containers
- kubernetes
- log collection
- orchestration
- provisioning
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/eks_anywhere/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "eks_anywhere"
"integration_id": "eks-anywhere"
"integration_title": "Amazon EKS Anywhere"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "eks_anywhere"
"public_title": "Amazon EKS Anywhere"
"short_description": "An EKS deployment option for operating Kubernetes clusters on-premises"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Orchestration"
  - "Category::Provisioning"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": An EKS deployment option for operating Kubernetes clusters on-premises
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon EKS Anywhere
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS Dashboard][1]

## Overview

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that automates certain aspects of deployment and maintenance for any standard Kubernetes environment. Whether you are migrating an existing Kubernetes application to Amazon EKS, or deploying a new cluster on Amazon EKS on AWS Outposts, Datadog helps you monitor your EKS environments in real time.

[Amazon EKS Anywhere][2] is a deployment option that enables you to create and operate Kubernetes clusters on-premises, including virtual machines (for example, VMware vSphere) and bare metal servers.

## セットアップ

Because Datadog already integrates with Kubernetes and AWS, it is ready-made to monitor EKS. If you're running the Agent in a Kubernetes cluster and plan to migrate to EKS, you can continue monitoring your cluster with Datadog. 

Additionally, [Amazon EKS Managed Node Groups][3] and [Amazon EKS on AWS Outposts][4] are supported.

### Datadog Helm chart configuration

Use the [Agent deployment instructions with Helm][5] with these additional configuration instructions:

1. Set `datadog.kubelet.tlsVerify` to `false`.
2. Set a toleration on the Agent pod. This is necessary for monitoring the control plane.

The following Helm snippet demonstrates the specific changes for monitoring EKS Anywhere:

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

### Metric collection

Monitoring EKS requires setting up one of the following Datadog integrations along with integrations for any other AWS services you're running with EKS, such as [ELB][6].

- [Kubernetes][7]
- [AWS][8]
- [AWS EC2][9]

### Log collection

_Available for Agent versions >6.0_

The setup is exactly the same as for Kubernetes.
To start collecting logs from all your containers, use your Datadog Agent [environment variables][10].

Use DaemonSets to [automatically deploy the Datadog Agent on all of your nodes][11].

Follow the [container log collection instructions][12] to learn more about environment variables and advanced setup options.

## トラブルシューティング

Need help? Contact [Datadog support][13].

## Further Reading

- [Monitor Amazon EKS with Datadog][14]
- [Key metrics for Amazon EKS monitoring][15]
- [Amazon EKS on AWS Fargate][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://aws.amazon.com/eks/eks-anywhere/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[5]: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#installation
[6]: https://docs.datadoghq.com/integrations/amazon_elb/
[7]: https://docs.datadoghq.com/integrations/kubernetes/
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/integrations/amazon_ec2/
[10]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation
[12]: https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation
[13]: https://docs.datadoghq.com/help/
[14]: https://www.datadoghq.com/blog/announcing-eks
[15]: https://www.datadoghq.com/blog/eks-cluster-metrics
[16]: https://docs.datadoghq.com/integrations/eks_fargate/

