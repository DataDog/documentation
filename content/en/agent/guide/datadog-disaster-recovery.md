---
title: Datadog Disater Recovery
private: true
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-disaster-recovery/" header="false" >}}
 Datadog Disaster Recovery is in preview. To request access, complete the form.
{{< /callout >}}

## Overview 
Datadog Disaster Recovery (DDR) provides customers observability continuity in rare outage events that may impact a cloud service provider region or Datadog services running within a cloud provider region. In such cases, DDR enables your organization to meet your observability, availability, and business continuity goals. 

Using DDR, customers can recover live observability at an alternate, functional Datadog site in typically under an hour.

With DDR, customers can also periodically conduct disaster recovery drills to not only to test their ability to recover from outage events but also meet their business and regulatory compliance needs.


## Prerequisites 

Datadog Agents versions **7.54 or above** is required for Datadog Disaster Recovery. 

## Setup 
To enable DDR, follow these steps:


1. **Create your secondary Datadog organization** <br>
--
_(Note: Datadog can set this up for you if you prefer.)_ <br>  -- Identify which site you are on by matching your Datadog website URL to [the site URL][1]. <br> -- Select a Datadog secondary site for a new Datadog organization. For example, if you are hosted in US1 (https://app.datadoghq.com), select the US5 Datadog site which is hosted on GCP Central US, and geographically separated from your primary organization to ensure observability continuity in the event of a regional disaster.

<br>



2. **Contact Datadog to share your new organization** <br>
--
-- Share your organization name with your Datadog contact(`IS THIS THE CSM`?). The Datadog team will configure your new organization to be your secondary failover organization. <br> -- This organization will appear in your Datadog billing hierarchy, but all usage and cost associated will _not_ be billed during the private beta.

3. **Create your Datadog API and App key for syncing**<br>
At the secondary Datadog site, create a set of API key and App key. You will use these keys in steps 7 to copy dashboards and monitors between Datadog sites.

    For your Agents, Datadog can copy API key signatures to the secondary backup account for you to prevent you from maintaining another set of API keys for your agent.










[1]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site