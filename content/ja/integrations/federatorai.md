---
"app_id": "federatorai"
"app_uuid": "c9192d7c-101d-44b2-8ddf-c5fcbe5c5306"
"assets":
  "dashboards":
    "ProphetStor Federator.ai Application Overview": assets/dashboards/application-overview.json
    "ProphetStor Federator.ai Cluster Overview": assets/dashboards/cluster-overview.json
    "ProphetStor Federator.ai Cost Analysis Overview": assets/dashboards/cost-analysis-overview.json
    "ProphetStor Federator.ai Cost Management - Cluster": assets/dashboards/cost-management-cluster-overview.json
    "ProphetStor Federator.ai Cost Management - Namespace": assets/dashboards/cost-management-namespace-overview.json
    "ProphetStor Federator.ai Cost Management - Node": assets/dashboards/cost-management-node-overview.json
    "ProphetStor Federator.ai Kafka Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": federatorai.integration.status
      "metadata_path": metadata.csv
      "prefix": federatorai.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10104"
    "source_type_name": Federator.ai
  "monitors":
    "Node CPU Load Prediction in Next 24 Hours is High": assets/monitors/federatorai_node_cpu_prediction.json
    "Node Memory Usage Prediction in Next 24 Hours is High": assets/monitors/federatorai_node_mem_prediction.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": ProphetStor
  "sales_email": support@prophetstor.com
  "support_email": support@prophetstor.com
"categories":
- containers
- kubernetes
- ai/ml
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "federatorai"
"integration_id": "federatorai"
"integration_title": "Federator.ai"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "federatorai"
"public_title": "Federator.ai"
"short_description": "Integration with ProphetStor Federator.ai to optimize application performance"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::AI/ML"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Integration with ProphetStor Federator.ai to optimize application performance
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Federator.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview


[ProphetStor Federator.ai][1] is an AI-based solution designed to enhance computing resource management for Kubernetes and Virtual Machine (VM) clusters. With its holistic observability of IT operations, including multi-tenant Large Language Model (LLM) training, resources for mission-critical applications, namespaces, nodes, and clusters can be efficiently allocated, and KPIs can be effectively achieved with minimum resource wastage.

Using advanced machine learning algorithms to predict application workloads, Federator.ai offers:
* AI-based workload prediction for containerized applications in Kubernetes clusters, as well as VMs in VMware clusters, Amazon Web Services (AWS) Elastic Compute Cloud (EC2), Azure Virtual Machine, and Google Compute Engine
* Resource recommendations based on workload prediction, application, Kubernetes, and other related metrics
* Automatic provisioning of CPU/memory for generic Kubernetes application controllers/namespaces
* Automatic scaling of Kubernetes application containers, Kafka consumer groups, and NGINX Ingress upstream services
* Multicloud cost analysis and recommendations based on workload predictions for Kubernetes clusters and VM clusters
* Actual cost and potential savings based on recommendations for clusters, Kubernetes applications, VMs, and Kubernetes namespaces
* MultiTenant LLM training observability and actionable resource optimizations without performance compromise

[ProphetStor Federator.ai][1] provides full-stack observability through its APIs integrated with Datadog Agents, from application-level workloads, including LLM training, to cluster-level resource consumption. This integration fosters a dynamic loop between live monitoring and predictive analytics, continuously improving resource management, optimizing costs, and ensuring efficient application operation. You can easily track and predict the resource usages of Kubernetes containers, namespaces, and cluster nodes to make the right recommendations to prevent costly over-provisioning or performance-impacting under-provisioning. With easy integration to CI/CD pipeline, Federator.ai enables continuous optimization of containers whenever they are deployed in a Kubernetes cluster. Using application workload predictions, Federator.ai auto-scales application containers at the right time and optimizes performance with the right number of container replicas through Kubernetes HPA or [Datadog Watermark Pod Autoscaling (WPA)][2].

For additional information on Federator.ai, see the [ProphetStor Federator.ai Feature Demo][3] and [ProphetStor Federator.ai for Datadog][4] videos.


**ProphetStor Federator.ai Cluster Overview**

![ProphetStor Federator.ai Cluster Overview][5]

* Cluster Resource Usage Predictions and Recommendations
   - This table shows the maximum, minimum, and average value of the CPU memory workload prediction and the recommended CPU memory resource usage from Federator.ai for cluster resource planning.

* Cluster Node Resource Usage Predictions and Recommendations
   - This table shows the maximum, minimum, and average value of the CPU memory workload prediction and the recommended CPU memory resource usage from Federator.ai for node resource planning.

* Node Current/Predicted Memory Usage (Daily)
   - This graph shows daily predicted memory usage from Federator.ai and the memory usage of the nodes.

* Node Current/Predicted Memory Usage (Weekly)
   - This graph shows weekly predicted memory usage from Federator.ai and the memory usage of the nodes.

* Node Current/Predicted Memory Usage (Monthly)
   - This graph shows monthly predicted memory usage from Federator.ai and the memory usage of the nodes.

* Node Current/Predicted CPU Usage (Daily)
   - This graph shows daily predicted CPU usage from Federator.ai and the CPU usage of the nodes.

* Node Current/Predicted CPU Usage (Weekly)
   - This graph shows weekly predicted CPU usage from Federator.ai and the CPU usage of the nodes.

* Node Current/Predicted CPU Usage (Monthly)
   - This graph shows monthly predicted CPU usage from Federator.ai and the CPU usage of the nodes.


**ProphetStor Federator.ai Application Overview**

![Application Overview Dashboard][6]

* Workload Prediction for Next 24 Hours
   - This table shows the maximum, minimum, and average value of the CPU memory workload prediction and the recommended CPU memory resource usage from Federator.ai for the controller resource planning in the next 24 hours.

* Workload Prediction for Next 7 Days
   - This table shows the maximum, minimum, and average value of the CPU memory workload prediction and the recommended CPU memory resource usage from Federator.ai for the controller resource planning in the next 7 days.

* Workload Prediction for Next 30 Days
   - This table shows the maximum, minimum, and average value of the CPU memory workload prediction and the recommended CPU memory resource usage from Federator.ai for the controller resource planning in the next 30 days.

* Current/Predicted CPU Usage (Daily)
   - This graph shows daily predicted CPU usage from Federator.ai and the CPU usage of the controllers.

* Current/Predicted CPU Usage (Weekly)
   - This graph shows weekly predicted CPU usage from Federator.ai and the CPU usage of the controllers.

* Current/Predicted CPU Usage (Monthly)
   - This graph shows monthly predicted CPU usage from Federator.ai and the CPU usage of the controllers.

* Current/Predicted Memory Usage (Daily)
   - This graph shows daily predicted memory usage from Federator.ai and the memory usage of the controllers.

* Current/Predicted Memory Usage (Weekly)
   - This graph shows weekly predicted memory usage from Federator.ai and the memory usage of the controllers.

* Current/Predicted Memory Usage (Monthly)
   - This graph shows monthly predicted memory usage from Federator.ai and the memory usage of the controllers.

* Current/Desired/Recommended Replicas
   - This graph shows the recommended replicas from Federator.ai and the desired and current replicas of the controllers.

* Memory Usage/Request/Limit vs Rec Memory Limit
   - This graph shows the recommended memory limit from Federator.ai and the requested, limited and current memory usage of the controllers.

* CPU Usage/Request/Limit vs Rec CPU Limit
   - This graph shows the recommended CPU limit from Federator.ai and the requested, limited and current CPU usage of the controllers.

* CPU Usage/Limit Utilization
   - This graph shows the CPU utilization of the controller and visualizes if the CPU utilization is over the limit or under the limit.


**ProphetStor Federator.ai Kafka Overview**

![Dashboard Overview][7]

* Recommended Replicas vs Current/Desired Replicas
   - This timeseries graph shows the recommended replicas from Federator.ai and the desired and current replicas in the system.

* Production vs Consumption vs Production Prediction
   - This timeseries graph shows the Kafka message production rate and consumption rate and the production rate predicted by Federator.ai.

* Kafka Consumer Lag
   - This timeseries graph shows the sum of consumer lags from all partitions.

* Consumer Queue Latency (msec)
   - This timeseries graph shows the average latency of a message in the message queue before it is received by a consumer.

* Deployment Memory Usage
   - This timeseries graph shows the memory usage of consumers.

* Deployment CPU Usage
   - This timeseries graph shows the CPU usage of consumers.


**ProphetStor Federator.ai Multi-Cloud Cost Analysis Overview**

![Multi-Cloud Cost Analysis Overview][8]

* Current Cluster Cost and Current Cluster Configuration
   - These tables show the current cost and the environment configuration of the clusters.

* Recommended Cluster - AWS and Recommended Cluster Configuration - AWS
   - These tables show the recommended AWS instances configuration from Federator.ai and the cost of the recommended AWS instances.

* Recommended Cluster - Azure and Recommended Cluster Configuration - Azure
   - These tables show the recommended Azure instances configuration from Federator.ai and the cost of the recommended Azure instances.

* Recommended Cluster - GCP and Recommended Cluster Configuration - GCP
   - These tables show the recommended GCP instances configuration from Federator.ai and the cost of the recommended GCP instances.

* Namespace with Highest Cost ($/day)
   - This graph shows the highest daily cost of the namespaces in the current cluster.

* Namespace with Highest Predicted Cost ($/month)
   - This graph shows the highest predicted monthly cost of the namespaces in the current cluster.


## Setup

* Follow the instructions below to download and set up Federator.ai.

### Installation

1. Log in to your OpenShift/Kubernetes cluster
2. Install Federator.ai for OpenShift/Kubernetes with the following command:

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

3. Verify Federator.ai pods are running properly.

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Log in to Federator.ai GUI, URL and login credential could be found in the output of Step 2.


### Configuration

1. Log in to Datadog with your account and get an [API key and application key][9] for using the Datadog API.

2. Configure Federator.ai for the metrics data source per cluster.
    - Launch Federator.ai GUI->Configuration->Clusters->Click "Add Cluster"
    - Enter API key and application key

    ![Add Cluster Window][10] 

3. See the [Federator.ai - Installation and Configuration Guide][11] and [User Guide][12] for more details. 


## Data Collected

### Metrics
{{< get-metrics-from-git "federatorai" >}}



### Service Checks

Federator.ai does not include any service checks.

### Events

Federator.ai does not include any events.

## Troubleshooting

Need help? Read the [Federator.ai - Installation and Configuration Guide][11] or contact [Datadog support][14].

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/AeSH8yGGA3Q
[4]: https://youtu.be/qX_HF_zZ4BA
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[9]: https://docs.datadoghq.com/account_management/api-app-keys/
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png
[11]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[12]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://docs.datadoghq.com/help/

