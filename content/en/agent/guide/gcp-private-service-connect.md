---
title: Connect to Datadog over GCP Private Service Connect
kind: guide
further_reading:
    - link: '/integrations/google_cloud_platform/'
      tag: 'Documentation'
      text: 'Datadog-Google Cloud Platform Integration'
    - link: '/agent/guide/private-link'
      tag: 'Documentation'
      text: 'Connect to Datadog over AWS PrivateLink'
---

{{% site-region region="us,us3,eu,gov,ap1" %}}
<div class="alert alert-warning">This feature is not supported for the selected Datadog site.</div>
{{% /site-region %}}

{{% site-region region="us5" %}}
## Overview

[Private Service Connect][1] (PSC) allows users to connect directly to Datadog without using the public internet.

Datadog exposes some of its data intake services in Google Cloud Platform as PSC [_published services_][2]. Users can then configure GCP PSC to expose a private IP address for each Datadog intake service; these IP addresses route traffic to the Datadog backend.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="GCP Private Service Connect schema" >}}

To use this, configure a GCP Private DNS Zone to override the DNS names corresponding to the products for each endpoint that is consumed. This guide explains how to set this up.

## Setup

1. In your GCP console, navigate to **Network services** > **Private Service Connect**.
2. Click on **Connect endpoint**.
   {{< img src="agent/guide/psc/connect-endpoint.png" alt="GCP Private Service Connect schema" >}}
   
   - Under **Target**, select _Published service_.
   - For **Target service**, enter the _PSC target name_ that corresponds to the Datadog intake service that you want to use. You can find your PSC target name in the [table of published services](#published-services).
   - For **Endpoint name**, enter a unique identifier to use for this endpoint. You can use `datadog-<SERVICE>`. For example: `datadog-metrics`.
   - For **Network** and **Subnetwork**, TK
   - For **IP address**, click the dropdown and select _Create IP address_ to create an internal IP from your subnet dedicated to the endpoint. Select this IP.
   - Check **Enable global access** if you intend to connect the endpoint to virtual machines outside of the `us-central1` region.

   **Note**: Datadog exposes PSC producer endpoints from the `us-central1` region. These endpoints support global access, allowing services to connect from any region. However, the forwarding rule must be created in the `us-central1` region.

3. Click **Add endpoint**. Verify that your status is _Accepted_.
   {{< img src="agent/guide/psc/connect-endpoint-success.png" alt="GCP Private Service Connect schema" >}}
   Take note of the IP address.
4. In your GCP console, navigate to **Network services** > **Cloud DNS**.
5. Click on **Create a DNS zone**.
   {{< img src="agent/guide/psc/create-a-dns-zone.png" alt="GCP Private Service Connect schema" >}}

   - Under **Zone type**, select _Private_.
   - For **Zone name**, TK
   - For **DNS name**, enter the _private DNS name_ that corresponds to the Datadog intake service that you want to use. You can find your DNS name in the [table of published services](#published-services).


## Published services
| Datadog intake service | PSC target name | Private DNS name |
| ---------------------- | --------------- | ---------------- |
| Logs (Agent)           | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.us5.datadoghq.com` |

[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services

{{% /site-region %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}