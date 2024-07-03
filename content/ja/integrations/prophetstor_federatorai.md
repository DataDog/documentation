---
algolia:
  subcategory: Marketplace Integrations
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
- containers
- kubernetes
- marketplace
- orchestration
- ai/ml
custom_kind: インテグレーション
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
  short_description: $2000 per month
  unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: Federator.ai license for optimizing Kubernetes applications
supported_os:
- linux
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
  description: Federator.ai license for optimizing Kubernetes applications
  media:
  - caption: The ProphetStor Federator.ai Cluster Overview dashboard displays resource
      usage predictions and recommendations for Kubernetes clusters and nodes and
      historical usage.
    image_url: images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: image
  - caption: The ProphetStor Federator.ai Application Overview dashboard displays
      predicted CPU and memory usage and recommendations for each application.
    image_url: images/Federator_ai_Datadog_Application_Overview.png
    media_type: image
  - caption: The ProphetStor Federator.ai Kafka Overview dashboard displays usage
      information and recommendations about autoscaling Kafka consumer replicas.
    image_url: images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: image
  - caption: The ProphetStor Federator.ai Cost Analysis Overview dashboard shows deployment
      cost of a Kubernetes cluster and recommendations of cluster configuration and
      estimated cost/savings when it is deployed on public cloud service providers.
    image_url: images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: image
  - caption: Federator.ai dashboard displays workload prediction and resource recommendations
      for Kubernetes or VM clusters and applications.
    image_url: images/Federator_ai_Dashboard.png
    media_type: image
  - caption: Federator.ai provides predictions and resource recommendations for clusters,
      nodes, namespaces, applications, and controllers
    image_url: images/Federator_ai_Workload_Prediction.png
    media_type: image
  - caption: Based on predicted workload of a cluster, Federator.ai recommends most
      cost-effective cluster configuration for different public cloud provider.
    image_url: images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: image
  - caption: Federator.ai analyzes and projects cost trend for individual namespace.
    image_url: images/Federator_ai_Cost_Allocation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ProphetStor Federator.ai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[ProphetStor Federator.ai][1] is an AI-based solution designed to enhance computing resource management for Kubernetes and Virtual Machine (VM) clusters. With its holistic observability of IT operations, including multi-tenant Large Language Model (LLM) training, resources for mission-critical applications, namespaces, nodes, and clusters can be efficiently allocated, and KPIs can be effectively achieved with minimum resource wastage.

* AI-based workload prediction for containerized applications in Kubernetes clusters, as well as VMs in VMware clusters, Amazon Web Services (AWS) Elastic Compute Cloud (EC2), Azure Virtual Machine, and Google Compute Engine
* Intelligent resource recommendations from application-aware workload predictions produced by AI engines after digesting the operational metrics
* Automatic provisioning of CPU/memory for generic Kubernetes application controllers/namespaces
* Automatic scaling of Kubernetes application containers, Kafka consumer groups, and NGINX Ingress upstream services
* Optimal MultiCloud cost analysis and recommendations based on workload predictions for Kubernetes clusters and VM clusters
* Actual cost and potential savings based on recommendations for clusters, Kubernetes applications, VMs, and Kubernetes namespaces
* MultiTenant LLM training observability and actionable resource optimizations without performance compromise

[ProphetStor Federator.ai][1] provides full-stack observability through its APIs integrated with Datadog Agents, from application-level workloads, including LLM training, to cluster-level resource consumption. This integration fosters a dynamic loop between live monitoring and predictive analytics, continuously improving resource management, optimizing costs, and ensuring efficient application operation. With a ProphetStor Federator.ai license, you can apply an AI-based solution to track and predict the resource usages of Kubernetes containers, namespaces, and cluster nodes to make the right recommendations to prevent costly over-provisioning or performance-impacting under-provisioning. Utilizing application workload predictions, Federator.ai auto-scales application containers at the right time and optimizes performance with the right number of container replicas through Kubernetes HPA or [Datadog Watermark Pod Autoscaling (WPA)][3].

Separate from this Federator.ai license, an official [Datadog Integration][9] with out-the-box dashboards and recommended monitors is available. For additional information on Federator.ai, you can view the [ProphetStor Federator.ai Feature Demo][2] video.

## Support

For support or requests, contact [ProphetStor support](mailto:support@prophetstor.com).


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: /ja/integrations/federatorai

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">Click Here</a> to purchase this application.