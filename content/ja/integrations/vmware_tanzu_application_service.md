---
aliases:
- /ja/integrations/cloud_foundry/
- /ja/integrations/pivotal_platform/
categories:
- provisioning
- configuration & deployment
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/vmware_tanzu_application_service.md
description: Track the health of your VMware Tanzu Application Service (formerly Pivotal
  Cloud Foundry) VMs and the jobs they run.
doc_link: /integrations/vmware_tanzu_application_service/
further_reading:
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: Blog
  text: Pivotal Platform Monitoring with Datadog
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Application Monitoring for VMware Tanzu
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Cluster Monitoring for VMware Tanzu
integration_id: pivotal-platform
integration_title: VMware Tanzu Application Service
is_public: true
name: vmware_tanzu_application_service
newhlevel: true
public_title: Datadog-VMware Tanzu Application Service (Pivotal Cloud Foundry) Integration
short_description: Track the health of VMware Tanzu Application Service VMs and the
  jobs they run.
updated_for_agent: 6.0
---

## Overview

Any VMware Tanzu Application Service (formerly known as Pivotal Cloud Foundry, see the [VMware announcement][1] for more information) deployment can send metrics and events to Datadog. You can track the health and availability of all nodes in the deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more.

For the best experience, use this page to automatically set up monitoring through Tanzu Ops Manager for your application on VMware Tanzu Application Service and your VMware Tanzu Application Service cluster. For manual setup steps, see the [VMware Tanzu Application Service Manual Setup Guide][2].

There are three main components for the VMware Tanzu Application Service integration with Datadog. First, the buildpack is used to collect custom metrics from your applications. Second, the BOSH Release collects metrics from the platform. Third, the Loggregator Firehose Nozzle collects all other metrics from your infrastructure. Read the [Datadog VMware Tanzu Application Service architecture][3] guide for more information.

## Monitor your applications

Use the [VMware Tanzu installation and configuration][4] guide to install the integration through the Tanzu Ops Manager. For manual setup steps, read the [Monitor your applications][5] section in the manual setup guide.

### 構成

#### Metric collection

Set an API Key in your environment to enable the buildpack:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_API_KEY <DATADOG_API_KEY>
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP>
```

#### Trace and profile collection

The Datadog Trace Agent (APM) is enabled by default. Learn more about setup for your specific language in [APM setup][6] and [Profiling setup][7].

#### Log collection

{{% site-region region="us3" %}}

Log collection is not supported for this site.

{{% /site-region %}}

{{% site-region region="us,us5,eu,gov,ap1" %}}

##### Enable log collection

To start collecting logs from your application in VMware Tanzu Application Service, the Agent contained in the buildpack needs to be activated and log collection enabled.

```shell
cf set-env <YOUR_APP_NAME> DD_LOGS_ENABLED true
# Disable the Agent core checks to disable system metrics collection
cf set-env <YOUR_APP_NAME> DD_ENABLE_CHECKS false
# Redirect Container Stdout/Stderr to a local port so the Agent collects the logs
cf set-env <YOUR_APP_NAME> STD_LOG_COLLECTION_PORT <PORT>
# Configure the Agent to collect logs from the wanted port and set the value for source and service
cf set-env <YOUR_APP_NAME> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP_NAME>
```

##### Configure log collection

The following table describes the parameters above, and how they can be used to configure log collection:

| Parameter                 | Description                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_LOGS_ENABLED`         | Set to `true` to enable Datadog Agent log collection.                                                                                      |
| `DD_ENABLE_CHECKS`        | Set to `false` to disable the Agent's system metrics collection through core checks.                                                       |
| `STD_LOG_COLLECTION_PORT` | Must be used when collecting logs from `stdout` or `stderr`. It redirects the `stdout` or `stderr` stream to the corresponding local port value. |
| `LOGS_CONFIG`             | Use this option to configure the Agent to listen to a local TCP port and set the value for the `service` and `source` parameters.          |

**Example:**

A Java application named `app01` is running in VMware Tanzu Application Service. The following configuration redirects the container `stdout`/`stderr` to the local port `10514`. It then configures the Agent to collect logs from that port while setting the proper value for `service` and `source`:

```shell
# Redirect Stdout/Stderr to port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configure the Agent to listen to port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### Notification in case of misconfigured proxy

For Agent version 6.12 or greater, when using a [proxy configuration][101] with the buildpack, a verification is made to check if the connection can be established. Log collection is started depending on the result of this test.

If the connection fails to establish and log collection does not start, an event like this appears in the [Events Explorer][102]. Set up a monitor to track these events and be notified when a misconfigured Buildpack is deployed:

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="An event in Datadog with the title Log endpoint cannot be reached - Log collection not started and a message stating that a TCP connection could not be established" >}}

### タグ

In order to add custom tags to your application, set the `DD_TAGS` environment variable through the `manifest.yml` file or the CF CLI command:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_TAGS key1=value1,key2=value2
# restage the application to make it pick up the new environment variable and use the new tags
cf restage <YOUR_APP>
```

[101]: /ja/agent/logs/proxy/
[102]: /ja/events/explorer/

{{% /site-region %}}

### DogStatsD

You can use [DogStatsD][10] to send custom application metrics to Datadog. See [Metric Submission: DogStatsD][11] for more information. There is a list of [DogStatsD libraries][12] compatible with a wide range of applications.

## Monitor your VMware Tanzu Application Service cluster

Use the [VMware Tanzu installation and configuration][13] guide to install the integration through the Tanzu Ops Manager. For manual setup steps, read the [Monitor your VMware Tanzu Application Service cluster][14] section in the manual setup guide.

## 収集データ

### メトリクス

The following metrics are sent by the Datadog Firehose Nozzle and are prefixed with `cloudfoundry.nozzle`. The Datadog Agent sends metrics from any Agent checks you configure in the Director runtime configuration, and [system][15], [network][16], [disk][17], and [NTP][18] metrics by default.

The Datadog Firehose Nozzle only collects CounterEvents (as metrics, not events), ValueMetrics, and ContainerMetrics; it ignores LogMessages and Errors.

Your specific list of metrics may vary based on the PCF version and the deployment. Datadog collects counter and gauge metrics emitted from the [Loggregator v2 API][19]. See [Cloud Foundry Component Metrics][20] for a list of metrics emitted by default.

{{< get-metrics-from-git "cloud_foundry">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20%28PCF%29%20is%20now%20VMware%20Tanzu%20Application%20Service
[2]: /ja/integrations/guide/pivotal-cloud-foundry-manual-setup
[3]: /ja/integrations/faq/pivotal_architecture
[4]: /ja/integrations/guide/application-monitoring-vmware-tanzu/
[5]: /ja/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-applications
[6]: /ja/tracing/setup/
[7]: /ja/profiler/enabling/
[8]: /ja/agent/logs/proxy/
[9]: /ja/events/explorer/
[10]: /ja/developers/dogstatsd/
[11]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[12]: /ja/libraries/
[13]: /ja/integrations/guide/cluster-monitoring-vmware-tanzu/#installation
[14]: /ja/integrations/guide/cloud-foundry-setup/#monitor-your-cloud-foundry-cluster
[15]: /ja/integrations/system/#metrics
[16]: /ja/integrations/network/#metrics
[17]: /ja/integrations/disk/#metrics
[18]: /ja/integrations/ntp/#metrics
[19]: https://github.com/cloudfoundry/loggregator-api
[20]: https://docs.cloudfoundry.org/running/all_metrics.html