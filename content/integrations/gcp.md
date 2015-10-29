---
title: Datadog-Google Cloud Platform Integration
integration_title: Google Cloud Platform
kind: integration
---

### Overview

Connect to Google Cloud Platform to:

* See your Google Compute Engine hosts in the infrastructure overview
* Import your Google Compute Engine host tags
* Tag your Google Compute Engine hosts with additional compute-specific metadata (e.g. zone)

### Installation

From the Integrations page in the Datadog app, select the Google Cloud Platform tile. Switch to the **Configuration** tab and click the **Sign in with Google** button. After you allow access you can add the Project you wish to monitor. Enter the Project ID for each project. The Project ID is the multi-word id and not the Project Number.

### Metrics Collected

The following metrics are collected from the Google Cloud Platform

* gcp.gce.instance.is_running
* gcp.gce.project.quota.backend_services.limit
* gcp.gce.project.quota.backend_services.usage
* gcp.gce.project.quota.firewalls.limit
* gcp.gce.project.quota.firewalls.usage
* gcp.gce.project.quota.forwarding_rules.limit
* gcp.gce.project.quota.forwarding_rules.usage
* gcp.gce.project.quota.health_checks.limit
* gcp.gce.project.quota.health_checks.usage
* gcp.gce.project.quota.images.limit
* gcp.gce.project.quota.images.usage
* gcp.gce.project.quota.in_use_addresses.limit
* gcp.gce.project.quota.in_use_addresses.usage
* gcp.gce.project.quota.instance_templates.limit
* gcp.gce.project.quota.instance_templates.usage
* gcp.gce.project.quota.networks.limit
* gcp.gce.project.quota.networks.usage
* gcp.gce.project.quota.routes.limit
* gcp.gce.project.quota.routes.usage
* gcp.gce.project.quota.snapshots.limit
* gcp.gce.project.quota.snapshots.usage
* gcp.gce.project.quota.ssl_certificates.limit
* gcp.gce.project.quota.ssl_certificates.usage
* gcp.gce.project.quota.static_addresses.limit
* gcp.gce.project.quota.static_addresses.usage
* gcp.gce.project.quota.target_http_proxies.limit
* gcp.gce.project.quota.target_http_proxies.usage
* gcp.gce.project.quota.target_https_proxies.limit
* gcp.gce.project.quota.target_https_proxies.usage
* gcp.gce.project.quota.target_instances.limit
* gcp.gce.project.quota.target_instances.usage
* gcp.gce.project.quota.target_pools.limit
* gcp.gce.project.quota.target_pools.usage
* gcp.gce.project.quota.target_vpn_gateways.limit
* gcp.gce.project.quota.target_vpn_gateways.usage
* gcp.gce.project.quota.url_maps.limit
* gcp.gce.project.quota.url_maps.usage
* gcp.gce.project.quota.vpn_tunnels.limit
* gcp.gce.project.quota.vpn_tunnels.usage


### Tags Assigned

Tags are automatically assigned based on a variety of configuration options with regards to Google Cloud Platform and the Google Compute Engine. The following tags will be automatically assigned:

* Zone
* Instance-type
* Instance-id
* Automatic-restart
* On-host-maintenance
* Project
* Numeric_project_id
* Name

To learn more about tags in the Datadog platform, refer to the [Guide to Tagging](/guides/tagging)
