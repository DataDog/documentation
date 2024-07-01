---
"app_id": "gke"
"app_uuid": "66d0227c-6e8f-4639-a0d9-aefb147da71d"
"assets":
  "integration":
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": Google Kubernetes Engine
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/gke/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gke"
"integration_id": "gke"
"integration_title": "Google Kubernetes Engine, Agent"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "gke"
"public_title": "Google Kubernetes Engine, Agent Integration"
"short_description": "GKE is a platform for running and orchestrating containerized applications."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Containers"
  - "Category::Orchestration"
  "configuration": "README.md#Setup"
  "description": GKE is a platform for running and orchestrating containerized applications.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Google Kubernetes Engine, Agent Integration
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Google Kubernetes Engine (GKE), a service on the Google Cloud Platform (GCP), is a hosted platform for running and orchestrating containerized applications. Similar to Amazon's Elastic Container Service (ECS), GKE manages Docker containers deployed on a cluster of machines. However, unlike ECS, GKE uses Kubernetes.

## Setup

### Prerequisites

1. Ensure that your role in your [GCP project][1] has the proper permissions to use GKE. 

2. Enable the [Google Container Engine API][2] for your project. 

3. Install the [Google Cloud SDK][3] and the `kubectl` command line tool on your local machine. Once you [pair the Cloud SDK with your GCP account][4], you can control your clusters directly from your local machine using `kubectl`.

4. Create a small GKE cluster named `doglib` with the ability to access the Cloud Datastore by running the following command:

```
$  gcloud container clusters create doglib --num-nodes 3 --zone "us-central1-b" --scopes "cloud-platform"
```

### Set up the GCE integration 

Install the [Google Cloud Platform][5] integration.

You can then access an out-of-the-box [Google Compute Engine dashboard][6] that displays metrics like disk I/O, CPU utilization, and network traffic.

### Set up the GKE integration

Choose a mode of operation. A *mode of operation* refers to the level of flexibility, responsibility, and control that you have over your cluster. GKE offers two modes of operation:

- **Standard**: You manage the cluster's underlying infrastructure, giving you node configuration flexibility.

- **Autopilot**: Google provisions and manages the entire cluster's underlying infrastructure, including nodes and node pools, giving you an optimized cluster with a hands-off experience.

{{< tabs >}}
{{% tab "Standard" %}}

#### Standard

Deploy a [containerized version of the Datadog Agent][1] on your Kubernetes cluster. See [Install the Datadog Agent on Kubernetes][2].


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/containers/kubernetes/installation?tab=operator
{{% /tab %}}
{{% tab "Autopilot" %}}

#### Autopilot

Follow the instructions in the GKE [Autopilot section][1] of the Kubernetes distributions page.

#### Admission Controller

To use [Admission Controller][2] with Autopilot, set the [`configMode`][3] of the Admission Controller to either `service` or `hostip`. 

Because Autopilot does not allow `socket` mode, Datadog recommends using `service` (with `hostip` as a fallback) to provide a more robust layer of abstraction for the controller. 



[1]: https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=helm#autopilot
[2]: https://docs.datadoghq.com/containers/cluster_agent/admission_controller/?tab=operator
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1046
{{% /tab %}}
{{< /tabs >}}

## Further Reading

- [Monitor GKE Autopilot with Datadog][7]
- [Monitor GKE with Datadog][8]
- [Monitor your T2A-powered GKE workloads with Datadog][9]
- [New GKE dashboards and metrics provide deeper visibility into your environment][10]


[1]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[2]: https://console.cloud.google.com/apis/api/container.googleapis.com
[3]: https://cloud.google.com/sdk/docs/
[4]: https://cloud.google.com/sdk/docs/initializing
[5]: /integrations/google_cloud_platform/
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
[8]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[9]: https://www.datadoghq.com/blog/monitor-tau-t2a-gke-workloads-with-datadog-arm-support/
[10]: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
