---
title: Datadog Cluster Monitoring for VMware Tanzu
kind: guide
description: "Datadog Cluster Monitoring for VMware Tanzu"
further_reading:
- link: "https://www.datadoghq.com/blog/collecting-pcf-logs/"
  tag: "Blog"
  text: "Collecting Pivotal Platform logs and metrics"
- link: "https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/"
  tag: "Blog"
  text: Pivotal Platform Monitoring with Datadog
- link: "/integrations/guide/application-monitoring-vmware-tanzu/"
  tag: "documentation"
  text: "Datadog Application Monitoring for VMware Tanzu"
---


## Overview

Datadog Cluster Monitoring for VMware Tanzu combines the [Datadog Firehose Nozzle][6] with the [Datadog Agent][7], and enables VMware Tanzu users and administrators to monitor the health and performance of their VMware Tanzu clusters.
It consists of the following three components:

* The Datadog Firehose Nozzle
* The Datadog Agent
* The Datadog Cluster Agent

The Datadog Firehose Nozzle is a [Cloud Foundry][8] component which forwards metrics from the [Loggregator Firehose][14] to the Datadog monitoring platform. Any Cloud Foundry deployment can send metrics and events to Datadog. The data helps you track the health and availability of all nodes in your deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more.

## Prerequisites

Datadog Cluster Monitoring for VMware Tanzu has the following requirements:

* You must have or create a [Datadog account][4] before configuring the tile.
* You must generate a [Datadog API key][3].
* Install the Datadog Agent BOSH release as outlined in Datadog's [Pivotal Platform documentation][5].
* Install the [Datadog Cluster Agent][15] BOSH release.

## Key features

Datadog Cluster Monitoring for VMware Tanzu includes the following key features:

* Visualization of all cluster-level operational metrics and KPIs.
* Alerting on VMware Tanzu cluster and component health.
* Monitoring of jobs.
* Tracking and reporting of BOSH events.
* Autodiscovery of integrations.

## Installation

1. Install the [BOSH Health Monitor][10].
2. Download the **Datadog Cluster Monitoring for VMware Tanzu** product file from [Pivotal Network][11].
3. Go to the Tanzu Ops Manager installation dashboard and click **Import a Product** to upload the product file.
4. Click **Import a Product** to upload the product file.
5. Select the product file downloaded in step **2**. This adds the tile to your staging area.
6. Click the newly added **Datadog Cluster Monitoring for VMware Tanzu** tile.
7. Enter your [Datadog API key][3] in the **Datadog Config** section. Leave the Datadog API URL unchanged, unless directed otherwise by [Datadog Support][2].
8. Create a UAA client account for Datadog using the [UAA CLI][12]. The Firehose Nozzle requires access to the Loggregator Firehose.
    ```sh
    $ uaac client add datadog-firehose-nozzle \
         --name datadog-firehose-nozzle \
         --scope doppler.firehose,cloud_controller.admin_read_only,oauth.login \
         --authorities doppler.firehose,cloud_controller.admin_read_only,openid,oauth.approvals \
         --authorized_grant_types client_credentials,refresh_token \
         --access_token_validity 1209600 \
         -s $CLIENT_SECRET
    ```

9. In the **Cloud Foundry Settings** section, specify a UAA Client and UAA Secret from the previous step.
10. If Ops Manager requires you to upload a stemcell, [download a stemcell][13] from the 621 line of releases. Upload it to Ops Manager with the **Import Stemcell** button.
11. The **Datadog Firehose Nozzle Config** section contains optional configurations for the Nozzle, and the **Datadog Agent Config** section contains optional configurations for the Agent. You do not need to configure anything in either section.
    <p class='note'><strong>Note:</strong> If you are using a single Datadog account to monitor multiple foundations, you must check the <strong>Use UUID Hostname</strong> checkbox.</p>
12. The **Datadog Cluster Agent Settings** section contains configurations for the [Datadog Cluster Agent][15] that provides autodiscovery of integrations and application container features.

13. Return to the Tanzu Ops Manager Installation Dashboard and click **Apply Changes** to install Datadog Cluster Monitoring for the VMware Tanzu tile.

## View metrics and dashboards

1. Review the Cloud Foundry [Overview][18] Dashboard.

 {{< img src="/integrations/guide/vmware_tanzu/cloud-foundry-dashboard_2.png" alt="The Cloud Foundry Overview dashboard" >}}

2. Explore individual metrics on the [Metrics explorer][19] page, search for metrics beginning with `cloudfoundry.nozzle`:

 {{< img src="/integrations/guide/vmware_tanzu/metrics-explorer-cloud-foundry.png" alt="Cloud foundry metrics that start with cloudfoundry.nozzle" >}}

3. [Create alerts][16] for your Cloud Foundry metrics.
4. See the [Datadog Cloud Foundry Integration][17] for troubleshooting steps.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /help/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://app.datadoghq.com/signup
[5]: /integrations/pivotal_platform/#monitor-your-pivotal-platform-cluster/
[6]: https://github.com/DataDog/datadog-firehose-nozzle
[7]: /agent/
[8]: /integrations/guide/cloud-foundry-setup/
[10]: /integrations/cloud_foundry/#configure-the-datadog-plugin-for-bosh-health-monitor
[11]: https://network.pivotal.io/products/datadog/
[12]: https://docs.pivotal.io/application-service/uaa/uaa-user-management.html
[13]: https://network.pivotal.io/products/stemcells-ubuntu-xenial/#/releases/721399
[14]: https://www.datadoghq.com/blog/pivotal-cloud-foundry-architecture/#loggregator
[15]: https://github.com/DataDog/datadog-cluster-agent-boshrelease#datadog-cluster-agent-bosh-release
[16]: /guides/monitors/
[17]: /integrations/cloud_foundry/
[18]: https://app.datadoghq.com/screen/integration/cloudfoundry
[19]: https://app.datadoghq.com/metric/explorer
