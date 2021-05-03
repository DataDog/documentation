---
integration_title: Pivotal Platform
name: pivotal_platform
kind: integration
aliases:
  - /integrations/cloud_foundry/
git_integration_title: pivotal_platform
newhlevel: true
updated_for_agent: 6.0
description: 'Track the health of your Pivotal Platform (formerly Cloud Foundry) VMs and the jobs they run.'
is_public: true
public_title: Datadog-Pivotal Platform Integration
short_description: 'Track the health of Pivotal Platform VMs and the jobs they run.'
categories:
    - provisioning
    - configuration & deployment
    - log collection
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/pivotal_platform.md']
aliases:
    - /integrations/cloud_foundry/
doc_link: /integrations/pivotal_platform/
ddtype: check
integration_id: "pivotal-platform"
---

## Overview

Any Pivotal Platform (formerly known as Cloud Foundry) deployment can send metrics and events to Datadog. The data helps you track the health and availability of all nodes in the deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more. Use this page to learn how to monitor your [application on Pivotal Platform](#monitor-your-applications-on-pivotal-platform) and your [Pivotal Platform cluster](#monitor-your-pivotal-platform-cluster).

There are three main components for the Pivotal Platform integration with Datadog. First, use the buildpack to collect custom metrics from your applications. Then, use the BOSH Release to collect metrics from the platform. Finally, use the Loggregator Firehose Nozzle to collect all of the other metrics from your infrastructure.

For Pivotal Platform, you have the option to install the Datadog integration tiles with Ops Manager:

- [Datadog Cluster Monitoring for Pivotal Platform][1]
- [Datadog Application Monitoring for Pivotal Platform][2]

## PKS

PKS environments can utilize the Datadog [Cluster Monitoring tile][1] and the [pivotal_pks][3] integration together to monitor your cluster.

For kubelet cluster based workloads, utilize the [pivotal_pks integration][3] to install the Datadog Agent with your workers.

Use the [Cluster Monitoring Tile][1] to install the Datadog Agent on each non worker VM in your PKS environment. In environments without PAS installed, select the `Resource Config` section of the tile and set `instances` of the `datadog-firehose-nozzle` to `0`.

## Monitor your applications

Use the **Datadog Pivotal Platform Buildpack** to monitor your Pivotal Platform application. This is a [supply buildpack][4] for Pivotal Platform that installs a [Datadog DogStatsD binary][5] and Datadog Agent in the container your app is running on.

### Setup

#### Pivotal Platform < 1.12

Our buildpack uses the Pivotal Platform [multi-buildpack][6] feature that was introduced in version `1.12`.

For older versions, Pivotal Platform provides a back-port of this feature in the form of a [buildpack][7]. You must install and configure this backport in order to use Datadog's buildpack:

1. **Upload the multi-buildpack back-port.** Download the latest [multi-build pack release][7] and upload it to your Pivotal Platform environment.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. **Add a multi-buildpack manifest to your application.** As detailed [on the multi-buildpack back-port repo][8], create a `multi-buildpack.yml` file at the root of your application and configure it for your environment. Add a link to the Datadog Pivotal Platform Buildpack and to your regular buildpack:

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

      The URLs for the Datadog Buildpack are:

      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      Do not use the `latest` version here (replace `x.y.z` by the specific version you want to use).

      **Important**: Your regular buildpack should be the last in the manifest to act as a final buildpack. To learn more refer to  [Pivotal Platform documentation][9] about buildpacks.

3. **Push your application with the multi-buildpack**. Ensure that the `multi-buildpack` is the buildpack selected by Pivotal Platform for your application:

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

#### Pivotal Platform >= 1.12

1. **Upload the Datadog Pivotal Platform Buildpack.** Download the latest Datadog [build pack release][10] and upload it to your Pivotal Platform environment.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. **Push your application with the Datadog buildpack and your buildpacks.** The process to push your application with multiple buildpacks is described in the [Pivotal Platform documentation][9].

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

      **Important**: If you were using a single buildpack before, it should be the last one loaded so it acts as a final buildpack. To learn more refer to [Pivotal Platform documentation][9] about buildpacks.

#### Meta-Buildpack **(deprecated)**

If you are a [meta-buildpack][11] user, Datadog's buildpack can be used as a decorator out of the box.

**Note**: The [meta-buildpack][11] has been deprecated by pivotal in favor of the [multi-buildpack][7] and Datadog might drop support for it in a future release.

### Configuration

#### Metric collection

**Set an API Key in your environment to enable the buildpack**:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_API_KEY <DATADOG_API_KEY>
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP>
```

#### Trace collection

The Datadog Trace Agent (APM) is enabled by default. Learn more about setup for your specific language in [APM Setup][12].

#### Log collection

##### Enable

To start collecting logs from your application in Pivotal Platform, the Agent contained in the buildpack needs to be activated and log collection enabled.

```text
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

##### Configure

The following parameters can be used to configure log collection:

| Parameter                 | Description                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `STD_LOG_COLLECTION_PORT` | Must be used when collecting logs from `stdout`/`stderr`. It redirects the `stdout`/`stderr` stream to the corresponding local port value. |
| `LOGS_CONFIG`             | Use this option to configure the Agent to listen to a local TCP port and set the value for the `service` and `source` parameters.          |

**Example**:

A Java application named `app01` is running in Pivotal Platform. The following configuration redirects the container `stdout`/`stderr` to the local port `10514`. It then configures the Agent to collect logs from that port while setting the proper value for `service` and `source`:

```text
# Redirect Stdout/Stderr to port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configure the Agent to listen to port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### Notification in case of misconfigured proxy

For Agent v6.12+, when using a [proxy configuration][13] with the Buildpack, a verification is made to check if the connection can be established. Log collection is started depending on the result of this test.

If the connection fails to be established and the log collection is not started, an event like the one below is sent to your Datadog event stream. Set up a monitor to track these events and be notified when a misconfigured Buildpack is deployed:

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="cloud-foundry-log-misconfigured_proxy"  >}}

### Build

To build this buildpack, edit the relevant files and run the `./build` script. To upload it, run `./upload`.

### DogStatsD

See [the DogStatsD documentation][5] for more information. There is [a list of DogStatsD libraries][14] compatible with a wide range of applications.

## Monitor your Pivotal Platform cluster

There are two points of integration with Datadog, each of which achieves a different goal:

- **Datadog Agent BOSH release** - Install the Datadog Agent on every node in your deployment to track system, network, and disk metrics. Enable any other Agent checks you wish.
- **Datadog Firehose Nozzle** - Deploy one or more Datadog Firehose Nozzle jobs. The jobs tap into your deployment's Loggregator Firehose and send all non-container metrics to Datadog.

<div class="alert alert-warning">
These integrations are meant for Pivotal Platform deployment administrators, not end users.
</div>

### Prerequisites

You must have a working Cloud Foundry deployment and access to the BOSH Director that manages it. You also need BOSH CLI to deploy each integration. You may use either major version of the CLI-[v1][15] or [v2][16].

### Install the Datadog Agent BOSH release

Datadog provides tarballs of the Datadog Agent packaged as a BOSH release. Upload the latest release to your BOSH Director and then install it on every node in your deployment as an [addon][17] (the same way a Director deploys the BOSH Agent to all nodes).

#### Upload Datadog's release to your BOSH Director

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

If you'd like to create your own release, see the [Datadog Agent BOSH Release repository][18].

#### Configure the Agent as an addon in your BOSH Director

Add the following to your BOSH Director's runtime configuration file (e.g. `runtime.yml`):

```text
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # specify the real version (x.y.z not 'latest')

addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # Many CF deployments have a StatsD already on port 8125
      api_key: <DATADOG_API_KEY>
      tags: ["<KEY:VALUE>"]       # any tags you wish
      generate_processes: true    # to enable the process check
```

To see which `datadog-agent` release version you uploaded earlier, run `bosh releases`.

#### Load the runtime.yml

Check if you have a previously configured `runtime-config` by running:

```text
# BOSH CLI v1
`bosh runtime-config`

# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

In Bosh v2, if the `runtime.yml` file is empty, you should see the response: `No runtime config`.

#### Enable extra Agent checks

For each extra Agent check you want to enable across your deployment, add its configuration under the `properties.dd.integrations` key, for example:

```yaml
properties:
    dd:
        integrations:
            directory:
                init_config: {}
                instances:
                    directory: '.'
            #process:
            #  init_config: {}
            #...
```

The configuration under each check name should look the same as if you were configuring the check in its own file in the Agent's conf.d directory.

Everything you configure in `runtime.yml` applies to every node. You cannot configure a check for a subset of nodes in your deployment.

To customize configuration for the default checks-system, network, disk, and ntp-see the [full list of configuration options][19] for the Datadog Agent BOSH release.

#### Sync the runtime configuration to the BOSH Director

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml

# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### Redeploy your Pivotal Platform deployment

```text
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

Since runtime configuration applies globally, BOSH redeploys every node in your deployment. If you have more than one deployment, redeploy all deployments to install the Datadog Agent everywhere.

#### Verify the Agent is installed everywhere

To check if the Agent installs were successful, filter by `cloudfoundry` on the [Host map page][20] in Datadog. The Agent BOSH release tags each host with a generic `cloudfoundry` tag. Optionally group hosts by any tag, such as `bosh_job`, as in the following screenshot:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="cloud-foundry-host-map"  >}}

Click on any host to zoom in, then click **system** within its hexagon to make sure Datadog is receiving metrics for it:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="cloud-foundry-host-map-detail"  >}}

### Deploy the Datadog Firehose Nozzle

Datadog provides a BOSH release of the Datadog Firehose Nozzle. After uploading the release to your Director, add the Nozzle to an existing deployment, or create a new deployment that only includes the Nozzle. The instructions below assume you're adding it to an existing Pivotal Platform deployment that has a working Loggregator Firehose.

#### Upload Datadog's release to your BOSH Director

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz

# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

If you'd like to create your own release, see the [Datadog Firehose Nozzle release repository][21].

#### Configure a UAA client

In the manifest that contains your UAA configuration, add a new client for the Datadog Nozzle so the job(s) can access the Firehose:

```yaml
uaa:
    clients:
        datadog-firehose-nozzle:
            access-token-validity: 1209600
            authorities: doppler.firehose,cloud_controller.admin_read_only
            authorized-grant-types: client_credentials
            override: true
            scope: doppler.firehose,cloud_controller.admin_read_only
            secret: <YOUR_SECRET>
```

Redeploy the deployment to add the user.

#### Add Firehose Nozzle jobs

Configure one or more Nozzle jobs in your main Pivotal Platform deployment manifest (e.g. cf-manifest.yml):

```yaml
jobs:
#- instances: 4
#  name: some_other_job
#  ...
# add more instances if one job cannot keep up with the Firehose
- instances: 1
  name: datadog_nozzle_z1
  networks:
    # some network you've configured elsewhere in the manifest
    - name: cf1
  # some resource_pool you've configured elsewhere in the manifest
  resource_pool: small_z1
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: "<YOUR_DATADOG_API_KEY>"
      api_url: https://api.datadoghq.com/api/v1/series
      # seconds between flushes to Datadog. Default is 15.
      flush_duration_seconds: 15
    loggregator:
      # do NOT append '/firehose' or even a trailing slash to the URL; 'ws://<host>:<port>' works
      # e.g. ws://traffic-controller.your-cf-domain.com:8081
      traffic_controller_url: "<LOGGREGATOR_URL>"
    nozzle:
      # tags each firehose metric with 'deployment:<DEPLOYMENT_NAME>'
      deployment: "<DEPLOYMENT_NAME>"
      # can be anything (firehose streams data evenly to all jobs using the same subscription_id)
      subscription_id: datadog-nozzle
      # for development only
      # disable_access_control: true
      # for development only; enable if your UAA does not use a verifiable cert
      # insecure_ssl_skip_verify: true
    uaa:
      client: datadog-firehose-nozzle # client name you just configured
      client_secret: "<SECRET_YOU_JUST_CONFIGURED>"
      url: <UAA_URL> # e.g. https://uaa.your-cf-domain.com:8443
```

To see all available configuration options, check the [Datadog Firehose Nozzle repository][22].

In the same manifest, add the Datadog Nozzle release name and version:

```yaml
releases:
    # - name: "<SOME_OTHER_RELEASE>"
    #   version: <x.y.z>
    # ...
    - name: datadog-firehose-nozzle
      version: '<VERSION_YOU_UPLOADED>' # specify the real version (x.y.z not 'latest')
```

To see which `datadog-firehose-nozzle` release version you uploaded earlier, run `bosh releases`.

#### Redeploy the deployment

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate

# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Verify the Firehose Nozzle is collecting

On the [Metrics explorer][23] page in Datadog, search for metrics beginning `cloudfoundry.nozzle`:

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="cloudfoundry.nozzle.metrics"  >}}

## Data Collected

### Metrics

The following metrics are sent by the Datadog Firehose Nozzle (`cloudfoundry.nozzle`). The Datadog Agent release does not send any special metrics of its own, just the usual metrics from any Agent checks you configure in the Director runtime config and, by default, [system][24], [network][25], [disk][26], and [NTP][27] metrics.

The Datadog Firehose Nozzle only collects CounterEvents (as metrics, not events), ValueMetrics, and ContainerMetrics; it ignores LogMessages and Errors.

Your specific list of metrics may vary based on the PCF version and the deployment. Datadog collects counter and gauge metrics emitted from the [Loggregator v2 API][28]. See the [PCF docs][29] for a list of metrics emitted by default.

{{< get-metrics-from-git "cloud_foundry">}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: /integrations/pivotal_pks/
[4]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[5]: /developers/metrics/dogstatsd_metrics_submission/
[6]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[7]: https://github.com/cloudfoundry/multi-buildpack
[8]: https://github.com/cloudfoundry/multi-buildpack#usage
[9]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[10]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[11]: https://github.com/cf-platform-eng/meta-buildpack
[12]: /tracing/setup/
[13]: /agent/logs/proxy/
[14]: /libraries/
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/graphing/infrastructure/hostmap
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /integrations/system/#metrics
[25]: /integrations/network/#metrics
[26]: /integrations/disk/#metrics
[27]: /integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
