---
integration_title: Pivotal Platform
name: pivotal_platform
kind: integration
aliases:
  - /integrations/cloud_foundry/
git_integration_title: pivotal_platform
newhlevel: true
updated_for_agent: 6.0
description: 'Track the health of your VMware Tanzu Application Service (formerly Pivotal Cloud Foundry) VMs and the jobs they run.'
is_public: true
public_title: Datadog-Pivotal Platform Integration
short_description: 'Track the health of VMware Tanzu Application Service VMs and the jobs they run.'
categories:
    - provisioning
    - configuration & deployment
    - log collection
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/pivotal_platform.md']
aliases:
    - /integrations/cloud_foundry/
doc_link: /integrations/pivotal_platform/
integration_id: "pivotal-platform"
---

## Overview

Any VMware Tanzu Application Service (formerly known as Pivotal Cloud Foundry, read the [VMware announcement][3] for more information) deployment can send metrics and events to Datadog. You can track the health and availability of all nodes in the deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more. For the best experience, use this page to automatically set up monitoring through Tanzu Ops Manager for your application on VMware Tanzu Application Service and your VMware Tanzu Application Service cluster. For manual setup steps, read the [VMware Tanzu Application Service Manual Setup Guide][6].

There are three main components for the VMware Tanzu Application Service integration with Datadog. First, the buildpack is used to collect custom metrics from your applications. Second, the BOSH Release collects metrics from the platform. Third, the Loggregator Firehose Nozzle collects all other metrics from your infrastructure. Read the [Datadog VMware Tanzu Application Service architecture][32] guide for more information.

## Monitor your applications

Use the [VMware Tanzu installation and configuration][7] guide to install the integration through the Tanzu Ops Manager.

### Configuration

#### Metric collection

**Set an API Key in your environment to enable the buildpack**:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_API_KEY <DATADOG_API_KEY>
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP>
```

#### Trace and profile collection

The Datadog Trace Agent (APM) is enabled by default. Learn more about setup for your specific language in [APM setup][12] and [Profiling setup][30].

#### Log collection

{{< site-region region="us3" >}}

Log collection is not supported for this site.

{{< /site-region >}}

{{< site-region region="us,us5,eu,gov" >}}

##### Enable log collection

To start collecting logs from your application in VMware Tanzu Application Service, the Agent contained in the buildpack needs to be activated and log collection enabled.

```shell
cf set-env <YOUR_APP_NAME> RUN_AGENT true
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
| `RUN_AGENT`               | Set to `true` to start the Datadog Agent.                                                                                                  |
| `DD_LOGS_ENABLED`         | Set to `true` to enable Datadog Agent log collection.                                                                                      |
| `DD_ENABLE_CHECKS`        | Set to `false` to disable the Agent's system metrics collection through core checks.                                                       |
| `STD_LOG_COLLECTION_PORT` | Must be used when collecting logs from `stdout`/`stderr`. It redirects the `stdout`/`stderr` stream to the corresponding local port value. |
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

For Agent version 6.12 or greater, when using a [proxy configuration](/agent/logs/proxy/) with the buildpack, a verification is made to check if the connection can be established. Log collection is started depending on the result of this test.

If the connection fails to be established and the log collection is not started, an event like the one below is sent to your Datadog event explorer. Set up a monitor to track these events and be notified when a misconfigured Buildpack is deployed:

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="An event in Datadog with the title Log endpoint cannot be reached - Log collection not started and a message stating that a TCP connection could not be established"  >}}

### Tags

In order to add custom tags to your application, set the `DD_TAGS` environment variable through the `manifest.yml` file or the CF CLI command:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_TAGS key1=value1,key2=value2
# restage the application to make it pick up the new environment variable and use the new tags
cf restage <YOUR_APP>
```

{{< /site-region >}}

### DogStatsD

See [Metric Submission: DogStatsD][5] for more information. There is a list of [DogStatsD libraries][14] compatible with a wide range of applications.

## Monitor your VMware Tanzu Application Service cluster

Use the [VMware Tanzu installation and configuration][9] guide to install the integration through the Tanzu Ops Manager.

## Data Collected

### Metrics

The following metrics are sent by the Datadog Firehose Nozzle and are prefixed with `cloudfoundry.nozzle`. The Datadog Agent release sends metrics from any Agent checks you configure in the Director runtime configuration, and [system][24], [network][25], [disk][26], and [NTP][27] metrics by default.

The Datadog Firehose Nozzle only collects CounterEvents (as metrics, not events), ValueMetrics, and ContainerMetrics; it ignores LogMessages and Errors.

Your specific list of metrics may vary based on the PCF version and the deployment. Datadog collects counter and gauge metrics emitted from the [Loggregator v2 API][28]. See [Cloud Foundry Component Metrics][29] for a list of metrics emitted by default.

{{< get-metrics-from-git "cloud_foundry">}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20(PCF)%20is%20now%20VMware%20Tanzu%20Application%20Service.
[4]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[6]: /integrations/guide/vmware-tanzu-application-service-manual-setup
[7]: https://docs.pivotal.io/partners/datadog-application-monitoring/installing.html
[9]: https://docs.pivotal.io/partners/datadog/installing.html
[10]: /agent/logs/proxy/
[12]: /tracing/setup/
[14]: /libraries/
[24]: /integrations/system/#metrics
[25]: /integrations/network/#metrics
[26]: /integrations/disk/#metrics
[27]: /integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /profiler/enabling/
[32]: /integrations/faq/pivotal_architecture