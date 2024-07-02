---
"app_id": "amazon-eks"
"app_uuid": "abb8b86b-eeb7-4e38-b436-f4cbb09b4398"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10018"
    "source_type_name": "Amazon EKS"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "cloud"
- "configuration & deployment"
- "containers"
- "kubernetes"
- "log collection"
- "orchestration"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_eks"
"integration_id": "amazon-eks"
"integration_title": "Amazon EKS"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_eks"
"public_title": "Amazon EKS"
"short_description": "Amazon EKS is a managed service that makes it easy to run Kubernetes on AWS"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Amazon EKS is a managed service that makes it easy to run Kubernetes on AWS"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Amazon EKS"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![EKS Dashboard][1]

## Overview

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that automates certain aspects of deployment and maintenance for any standard Kubernetes environment. Whether you are migrating an existing Kubernetes application to Amazon EKS, or are deploying a new cluster on Amazon EKS on AWS Outposts, Datadog helps you monitor your EKS environments in real time.

## セットアップ

Because Datadog already integrates with Kubernetes and AWS, it is ready-made to monitor EKS. If you're running the Agent in a Kubernetes cluster and plan to migrate to EKS, you can continue monitoring your cluster with Datadog. 

Additionally, [Amazon EKS Managed Node Groups][2] and [Amazon EKS on AWS Outposts][3] are supported.

### EKS Anywhere

See the [Amazon EKS Anywhere integration][4] for setup instructions.

### Metric collection

Monitoring EKS requires that you set up one of the following Datadog integrations along with integrations for any other AWS services you're running with EKS, such as [ELB][5].

- [Kubernetes][6]
- [AWS][7]
- [AWS EC2][8]

### Log collection

_Available for Agent versions >6.0_

The setup is exactly the same as for Kubernetes.
To start collecting logs from all your containers, use your Datadog Agent [environment variables][9].

Take also advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][10].

Follow the [container log collection steps][11] to learn more about those environment variables and discover more advanced setup options.

## トラブルシューティング

Need help? Contact [Datadog support][12].

## Further Reading

- [Monitor Amazon EKS with Datadog][13]
- [Key metrics for Amazon EKS monitoring][14]
- [Amazon EKS on AWS Fargate][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/integrations/eks_anywhere/
[5]: https://docs.datadoghq.com/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/integrations/kubernetes/
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/
[8]: https://docs.datadoghq.com/integrations/amazon_ec2/
[9]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
[10]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation
[11]: https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation
[12]: https://docs.datadoghq.com/help/
[13]: https://www.datadoghq.com/blog/announcing-eks
[14]: https://www.datadoghq.com/blog/eks-cluster-metrics
[15]: https://docs.datadoghq.com/integrations/eks_fargate/

