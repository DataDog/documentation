---
title: Universal Service Monitoring
aliases:
- /tracing/universal_service_monitoring/
further_reading:
- link: "/universal_service_monitoring/setup/"
  tag: "Documentation"
  text: "Setting Up Universal Service Monitoring"
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Golden signals in seconds with Universal Service Monitoring"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/services_map/"
  tag: "Documentation"
  text: "Read about the Service Map"
cascade:
    algolia:
        rank: 70
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Universal Service Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Overview

Universal Service Monitoring (USM) provides visibility into your service health metrics universally across your entire stack _without having to instrument your code_. It relies solely on the presence of a configured Datadog Agent and [Unified Service Tagging][1], and brings performance data about your uninstrumented services into views such as the Service Catalog and Service Map. USM also works with [Deployment Tracking][2], Monitors, Dashboards, and SLOs.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Video demonstrating Universal Service Monitoring. An overview of a service is accessed by clicking on a service on the Service Map and selecting View service overview." video="true" >}}

## Setup

For information about supported platforms and protocols, and for instructions on getting started, read [Setting Up Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Beta: Additional protocols and encryption methods</strong><p>USM has beta support for discovering cloud services and for decoding additional protocols and traffic encryption methods. For more information and to request access to the private beta, read <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>

## Automatic service tagging

Universal Service Monitoring automatically detects services running in your infrastructure. If it does not find [unified service tags][1], it assigns them a name based on one of the tags: `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

To update the service's name, set up [Unified Service Tagging][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="When Datadog automatically detects your services, the tag used for this is shown on the top of the service page" style="width:80%;" >}}

## Exploring your services

After you configure the Agent, wait about five minutes for your service to appear in the Service Catalog. Click the service to see the service details page. An operation name of `universal.http.server` or `universal.http.client` in the upper left indicates that the service telemetry comes from Universal Service Monitoring.

The `universal.http.server` operation name captures health metrics for inbound traffic to your service. The corresponding `universal.http.client` operation name represents outbound traffic to other destinations.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="The operation dropdown menu on the Services tab shows the available operation names" style="width:100%;" >}}

After enabling Universal Service Monitoring, you can:


- Navigate to **APM** > **Service Catalog** or **APM** > **Service Map** to [visualize your services and their dependencies][3].

- Click into specific Service pages to see golden signal metrics (requests, errors, and duration), and correlate these against recent code changes with [Deployment Tracking][2].

- Create [monitors][4], [dashboards][5], and [SLOs][6] using the `universal.http.*` metrics.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: /tracing/services/deployment_tracking/
[3]: /tracing/service_catalog/
[4]: /monitors/types/apm/?tab=apmmetrics
[5]: /dashboards/
[6]: /service_management/service_level_objectives/metric/
[7]: /universal_service_monitoring/setup/