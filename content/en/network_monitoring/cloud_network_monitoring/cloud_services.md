---
title: Cloud Service Monitoring
description: Monitor network traffic to and from cloud services and external endpoints.
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics'
      tag: 'Documentation'
      text: 'Network Analytics'
    - link: '/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution'
      tag: 'Documentation'
      text: 'Enhanced Resolution Setup'
    - link: '/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/'
      tag: 'Documentation'
      text: 'AWS Supported Services'
    - link: '/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/'
      tag: 'Documentation'
      text: 'Google Cloud Supported Services'
---

## Overview

Cloud Network Monitoring provides comprehensive visibility into traffic between your applications and cloud services, including managed services like S3, RDS, and load balancers. Use cloud service monitoring to track performance, assess latency, and visualize dependencies across your hybrid infrastructure.

## Cloud service autodetection

If you're relying on managed cloud services like S3 or Kinesis, you can monitor the performance of traffic to those services from your internal applications. Scope your view to a particular AWS, Google Cloud, or Azure dependency to pinpoint latency, assess database performance, and visualize your network more completely.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="Side panel of a network connection, scoped by `server_service:aws.s3`" >}}

For instance, you can:

- Visualize data flow from your internal Kubernetes cluster to `server_service:aws.s3` in the [Network Map][1].
- Pivot to the [Network Analytics page][2] to isolate which pods are establishing the most connections to that service.
- Validate that their request is successful by analyzing S3 performance metrics, which are correlated with traffic performance directly in the side panel for a given dependency, under the *Integration Metrics* tab.

CNM automatically maps:

- Network calls to S3 (which can broken down by `s3_bucket`), RDS (which can be broken down by `rds_instance_type`), Kinesis, ELB, Elasticache, and other [AWS services][3].
- API calls to AppEngine, Google DNS, Gmail, and other [Google Cloud services][4].

To monitor other endpoints where an Agent cannot be installed (such as public APIs), group the destination by the [`domain` tag](#domain-resolution). Or, see the section below for cloud service resolution.

## Cloud service enhanced resolution

With [enhanced resolution configured][5] for AWS or Azure, CNM filters and groups network traffic using resources collected from these cloud providers. The available tags vary by cloud provider and resource. Datadog automatically applies the tags listed below in addition to any user-defined tags.

### Amazon Web Services

{{< tabs >}}
{{% tab "Loadbalancers" %}}
- name
- loadbalancer
- load_balancer_arn
- dns_name (format loadbalancer/dns:)
- region
- account_id
- scheme
- custom (user-defined) tags applied to AWS Loadbalancers
{{% /tab %}}

{{% tab "NAT Gateways" %}}
- gateway_id
- gateway_type
- aws_nat_gateway_id
- aws_nat_gateway_public_ip
- aws_account
- availability-zone
- region
- custom (user) tags applied to AWS Nat Gateways
{{% /tab %}}

{{% tab "VPC Internet Gateway" %}}
- gateway_id
- gateway_type
- aws_internet_gateway_id
- aws_account
- region
- custom (user) tags applied to VPC Internet Gateways
{{% /tab %}}

{{% tab "VPC Endpoint" %}}
- gateway_id
- gateway_type
- aws_vpc_endpoint_id
- custom (user) tags applied to VPC Internet Endpoints
{{% /tab %}}

{{< /tabs >}}

### Azure

{{< tabs >}}
{{% tab "Loadbalancers and Application Gateways" %}}
- name
- loadbalancer
- cloud_provider
- region
- type
- resource_group
- tenant_name
- subscription_name
- subscription_id
- sku_name
- custom (user-defined) tags applied to Azure Loadbalancers and Application Gateways
{{% /tab %}}
{{< /tabs >}}

## Domain resolution

Starting with Agent 7.17+, the Agent resolves IPs to human-readable domain names for external and internal traffic. Domain allows you to monitor cloud provider endpoints where a Datadog Agent cannot be installed, such as S3 buckets, application load balancers, and APIs. Unrecognizable domain names such as DGA domains from C&C servers may point to network security threats. `domain` **is encoded as a tag in Datadog**, so you can use it in search bar queries and the facet panel to aggregate and filter traffic.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="Domain aggregation" >}}

**Note**: DNS resolution is supported for hosts where the system probe is running on the root network namespace, which is usually caused by running the system-probe in a container without using the host network.

## Network address translation (NAT)

NAT is a tool used by Kubernetes and other systems to route traffic between containers. When investigating a specific dependency (for example, service to service), you can use the presence or absence of pre-NAT IPs to distinguish between Kubernetes-native services, which do their own routing, and services that rely on external clients for routing. This feature does not include resolution of NAT gateways.

To view pre-NAT and post-NAT IPs, use the **Show pre-NAT IPs** toggle in the table settings. When this setting is toggled off, IPs shown in the **Client IP** and **Server IP** columns are by default post-NAT IPs. In cases where you have multiple pre-NAT IPs for one post-NAT IP, the top 5 most common pre-NAT IPs are displayed. `pre_nat.ip` is a tag like any other in the product, so you can use it to aggregate and filter traffic.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="pre-NAT IPs" >}}

## Network ID

CNM users may configure their networks to have overlapping IP spaces. For instance, you may want to deploy in multiple VPCs (virtual private clouds) which have overlapping address ranges and communicate only through load balancers or cloud gateways.

To correctly classify traffic destinations, CNM uses the concept of a network ID, which is represented as a tag. A network ID is an alphanumeric identifier for a set of IP addresses that can communicate with one another. When an IP address mapping to several hosts with different network IDs is detected, this identifier is used to determine the particular host network traffic is going to or coming from.

In AWS and Google Cloud, the network ID is automatically set to the VPC ID. For other environments, the network ID may be set manually, either in `datadog.yaml` as shown below, or by adding the `DD_NETWORK_ID` to the process and core Agent containers.

```yaml
network:
   Id: <your-network-id>
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/network_map/
[2]: /network_monitoring/cloud_network_monitoring/network_analytics/
[3]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution

