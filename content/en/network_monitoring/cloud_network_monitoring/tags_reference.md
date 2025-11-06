---
title: Tags Reference
description: Reference guide for default tags available in Cloud Network Monitoring.
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics'
      tag: 'Documentation'
      text: 'Network Analytics'
    - link: '/getting_started/tagging/'
      tag: 'Documentation'
      text: 'Getting Started with Tags'
    - link: '/getting_started/tagging/unified_service_tagging/'
      tag: 'Documentation'
      text: 'Unified Service Tagging'
---

## Overview

Cloud Network Monitoring provides a comprehensive set of default tags for querying and analyzing network traffic. These tags are available out-of-the-box and can be used in search queries, filters, and groupings across the Network Analytics page, Network Map, and other CNM views.

## Default tags

The following is a list of default `server` and `client` tags available for querying and analyzing network traffic:

| server                    | client                      |
|---------------------------|-----------------------------|
| server_team               | client_team                |
| server_role               | client_role                |
| server_env                | client_env                 |
| server_environment        | client_environment         |
| server_app                | client_app                 |
| server_domain             | client_datacenter          |
| server_dns_server         | client_instance-id         |
| server_datacenter         | client_instance-type       |
| server_instance-id        | client_security-group-name |
| server_instance-type      | client_security-group      |
| server_security-group-name| client_name                |
| server_security-group     | client_image               |
| server_name               | client_account             |
| server_image              | client_kernel_version      |
| server_account            | client_autoscaling_group   |
| server_kernel_version     | client_region              |
| server_autoscaling_group  | client_terraform.module    |
| server_region             | client_site                |
| server_terraform.module   | client_image_name          |
| server_site               | client_pod_name            |
| server_image_name         | client_kube_deployment     |
| server_pod_name           | client_kube_replica_set    |
| server_kube_deployment    | client_kube_job            |
| server_kube_replica_set   | client_kube_cronjob        |
| server_kube_job           | client_kube_daemon_set     |
| server_kube_cronjob       | client_kube_stateful_set   |
| server_kube_daemon_set    | client_kube_cluster_name   |
| server_kube_stateful_set  | client_kube_service        |
| server_kube_cluster_name  | client_kube_namespace      |
| server_kube_service       | client_kubernetes_cluster  |
| server_kube_namespace     | client_cluster-name        |
| server_kubernetes_cluster | client_kube_container_name |
| server_cluster-name       | client_kube-labels         |
| server_kube_container_name| client_task_name           |
| server_kube-labels        | client_task_version        |
| server_task_name          | client_task_family         |
| server_task_version       | client_ecs_cluster         |
| server_task_family        | client_loadbalancer        |
| server_ecs_cluster        | client_mesos_task          |
| server_loadbalancer       | client_marathon_app        |
| server_cacheclusterid     | client_chronos_job         |
| server_mesos_task         | client_chronos_job_owner   |
| server_marathon_app       | client_nomad_task          |
| server_chronos_job        | client_nomad_group         |
| server_chronos_job_owner  | client_nomad_job           |
| server_nomad_task         | client_rancher_container   |
| server_nomad_group        | client_rancher_service     |
| server_nomad_job          | client_rancher_stack       |
| server_rancher_container  | client_swarm_service       |
| server_rancher_service    | client_swarm_namespace     |
| server_rancher_stack      | client_container_id        |
| server_swarm_service      | client_container_name      |
| server_swarm_namespace    | client_image_tag           |
| server_container_id       | client_short_image         |
| server_container_name     | client_docker_image        |
| server_image_tag          | client_kubernetescluster   |
| server_short_image        | client_kube_cluster        |
| server_cluster            | client_protocol            |
| server_docker_image       |                             |
| server_kubernetescluster  |                             |
| server_kube_cluster       |                             |
| server_s3_bucket          |                             |
| server_rds_instance_id    |                             |
| server_cloud_endpoint_detection |                      |
| server_gateway_id         |                             |
| server_protocol           |                             |

## Tag categories

### Infrastructure tags

Tags related to infrastructure components such as hosts, instances, and availability zones:
- `server_instance-id` / `client_instance-id`
- `server_instance-type` / `client_instance-type`
- `server_datacenter` / `client_datacenter`
- `server_region` / `client_region`

### Kubernetes tags

Tags for Kubernetes resources and orchestration:
- `server_pod_name` / `client_pod_name`
- `server_kube_deployment` / `client_kube_deployment`
- `server_kube_namespace` / `client_kube_namespace`
- `server_kube_cluster_name` / `client_kube_cluster_name`
- `server_kube_service` / `client_kube_service`

### Container tags

Tags for containerized workloads:
- `server_container_id` / `client_container_id`
- `server_container_name` / `client_container_name`
- `server_docker_image` / `client_docker_image`
- `server_short_image` / `client_short_image`
- `server_image_tag` / `client_image_tag`

### Cloud provider tags

Tags specific to cloud resources:
- `server_s3_bucket`
- `server_rds_instance_id`
- `server_loadbalancer` / `client_loadbalancer`
- `server_autoscaling_group` / `client_autoscaling_group`
- `server_security-group` / `client_security-group`

### Application tags

Tags for application-level grouping:
- `server_app` / `client_app`
- `server_env` / `client_env`
- `server_environment` / `client_environment`
- `server_team` / `client_team`
- `server_role` / `client_role`

### Orchestration platform tags

Tags for various orchestration platforms:
- **ECS**: `server_ecs_cluster` / `client_ecs_cluster`, `server_task_name` / `client_task_name`
- **Mesos**: `server_mesos_task` / `client_mesos_task`, `server_marathon_app` / `client_marathon_app`
- **Nomad**: `server_nomad_task` / `client_nomad_task`, `server_nomad_job` / `client_nomad_job`
- **Rancher**: `server_rancher_service` / `client_rancher_service`, `server_rancher_stack` / `client_rancher_stack`

## Using tags

### In search queries
Use tags in the search bar to filter traffic:
```
client_service:web-store server_region:us-east-1
```

### In groupings
Use tags in the **Group By** dropdown to aggregate traffic:
- Group by `client_kube_namespace` and `server_availability-zone` to see cross-AZ traffic by namespace
- Group by `client_env` and `server_env` to identify cross-environment dependencies

### In facet panels
Browse available tag values in the facet panels on the left side of the Network Analytics page. Switch between **Client** and **Server** tabs to see respective tags.

## Custom tags

In addition to these default tags, you can use any custom tags applied to your infrastructure through integrations or the Datadog Agent. To add custom tags to the facet panels for filtering, see [Custom facets][1] in the Network Analytics documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/network_analytics/#custom-facets

