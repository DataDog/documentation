---
title: Datadog-Cloud Foundry Integration
integration_title: Cloud Foundry
kind: integration
git_integration_title: cloud_foundry
newhlevel: true
beta: true
---
# Overview

Any Cloud Foundry deployment can send metrics and events to Datadog. The data helps you—the deployment administrator—track the health and availability of all nodes in the deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more.

There are three points of integration with Datadog, each of which achieves a different goal:

* **Datadog Agent BOSH release** — Install the Datadog Agent on every node in your deployment to track system, network, and disk metrics. Enable any other Agent checks you wish.
* **Datadog Firehose Nozzle** — Deploy one or more Datadog Firehose Nozzle jobs. Each job taps into your deployment's Loggregator Firehose and sends all metrics it sees to Datadog.
* **Datadog plugin for BOSH Health Monitor** — Configure your BOSH Director's Health Monitor to send heartbeats (as metrics) and alerts (as events) from each node's BOSH Agent to Datadog.

If you do NOT administer a Cloud Foundry deployment—i.e. if you're an end user deploying applications onto a Cloud Foundry deployment—this page cannot help you.

# Prerequisites

The instructions below assume you have a working Cloud Foundry deployment and access to the BOSH Director that manages it. You may use either major version of the BOSH CLI—[v1](https://bosh.io/docs/bosh-cli.html) or [v2](https://bosh.io/docs/cli-v2.html#install)—to configure and deploy each integration.

To configure the Datadog plugin for BOSH Health Monitor, you MUST have a `state.json` (or similarly named) file that accurately reflects the current state of your BOSH Director.

# Install, Deploy, and Configure

## Datadog Agent BOSH Release

Datadog provides tarballs of the Datadog Agent packaged as a BOSH release. You can upload the latest release to your BOSH Director and then easily install it on every node in your deployment as an [addon](https://bosh.io/docs/runtime-config.html#addons) (i.e. the same way a Director deploys the BOSH Agent to all nodes).

### Install the Agent everywhere

1. Upload Datadog's release to your BOSH Director:

~~~
# BOSH CLI v1
bosh upload release https://url/to/datadog/agent/datadog-agent-x.y.z.tgz

# BOSH CLI v2
bosh upload-release https://url/to/datadog/agent/datadog-agent-x.y.z.tgz
~~~

If you'd like to create your own release, see the [Datadog Agent BOSH Release repository](https://github.com/DataDog/datadog-agent-boshrelease).

2. Configure the Agent as an addon in your BOSH Director

Add the following to your BOSH Director's runtime configuration file (e.g. `runtime.yml`):

~~~
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # i.e. x.y.z

addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: yes
      dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
      api_key: <YOUR_DATADOG_API_KEY>
      tags: ["cloudfoundry_deployment_1"] # any tags you wish 
~~~

If you don't have a local copy of the runtime configuration, get it from the Director (`bosh runtime-config`) and add the above to it. If the Director's runtime configuration is empty, add the above to a new `runtime.yml`.

3. Sync the runtime configuration to the Director

~~~
# BOSH CLI v1
bosh update runtime-config runtime.yml

# BOSH CLI v2
bosh update-runtime-config runtime.yml
~~~

4. Redeploy your Cloud Foundry deployment

~~~
# BOSH CLI v1
bosh deployment yourDeploymentManifest.yml
bosh -n deploy

# BOSH CLI v2
bosh -n -d yourDeployment deploy yourDeploymentManifest.yml
~~~

Since runtime configuration applies globally, BOSH will redeploy every node in your deployment. If you have more than one deployment, redeploy those, too, to install the Datadog Agent everywhere.

### Verify the Agent installs

The easiest way to check that Agent installs were successful is to filter for them in the [Host map page](https://app.datadoghq.com/infrastructure/map) in Datadog. The Agent BOSH release tags each host with a generic `cloudfoundry` tag, so filter by that, and optionally group hosts by any tag you wish (e.g. `bosh_job`), as in the following screenshot:

![cloud-foundry-host-map](/static/images/cloud-foundry-host-map.png)

Click on any host to zoom in, then click 'System' within its hexagon to make sure Datadog is receiving metrics for it:

![cloud-foundry-host-map-detail](/static/images/cloud-foundry-host-map-detail.png)

## Datadog Firehose Nozzle

As with the Datadog Agent, Datadog provides a BOSH release of the Datadog Firehose Nozzle. After uploading the release to your Director, you can add the Nozzle to an existing deployment, or create a new deployment that only includes the Nozzle. The instructions below assume you're adding it to an existing Cloud Foundry that has a working Loggregator Firehose.

### Deploy one or more Nozzle jobs

1. Upload Datadog's release to your BOSH Director:

~~~
# BOSH CLI v1
bosh upload release https://url/to/datadog/nozzle/datadog-firehose-nozzle-x.y.z.tgz

# BOSH CLI v2
bosh upload-release https://url/to/datadog/nozzle/datadog-firehose-nozzle-x.y.z.tgz
~~~

If you'd like to create your own release, see the [Datadog Firehose Nozzle release repository](https://github.com/DataDog/datadog-firehose-nozzle-release).

2. In the manifest that contains your UAA configuration, add a new client for the Datadog Nozzle so the job(s) can access the Firehose:

~~~
uaa:
  clients:
    datadog-firehose-nozzle:
      access-token-validity: 1209600
      authorities: doppler.firehose
      authorized-grant-types: client_credentials
      override: true
      scope: doppler.firehose
      secret: <MAKE_IT_A_GOOD_ONE>
~~~

And redeploy the deployment to add the user.

3. Configure a Nozzle job in your main Cloud Foundry deployment manifest (e.g. cf-manifest.yml):

~~~
jobs:
#- instances: 4
#  name: some_other_job
#  ...
- instances: 1 
  name: datadog_nozzle_z1
  networks:
    - name: cf1           # some network you've configured elsewhere in the manifest
  resource_pool: small_z1 # some resource_pool you've configured elsewhere in the manifest
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: <YOUR_DATADOG_API_KEY>
      api_url: https://app.datadoghq.com/api/v1/series
      flush_duration_seconds: 15          # seconds between flushes to Datadog. Default is 15.
      metric_prefix: cloudfoundry.nozzle. # namespace for all nozzle metrics
    loggregator:
      # do NOT append '/firehose' or even a trailing slash to the URL; 'ws://<host>:<port>' will do
      traffic_controller_url: <LOGGREGATOR_URL> # e.g. ws://traffic-controller.your-cf-domain.com:8081
    nozzle:
      deployment: <DEPLOYMENT_NAME>    # tags each firehose metric with 'deployment:<DEPLOYMENT_NAME>'
      subscription_id: datadog-nozzle  # can be anything (firehose streams data evenly to all jobs using the same subscription_id)
      # disable_access_control: true   # for development only
      # insecure_ssl_skip_verify: true # for development only; enable if your UAA does not use a verifiable cert
    uaa:
      client: datadog-firehose-nozzle # client name you just configured
      client_secret: <SECRET_YOU_JUST_CONFIGURED>
      url: <UAA_URL> # e.g. https://uaa.your-cf-domain.com:8443
~~~

You can set `metrics_prefix` to anything you like, but if you want to use the default Cloud Foundry screenboard and to see metrics metadata in dashboards and graphs, set it to `cloudfoundry.nozzle.`.

In the same manifest, add the Datadog Nozzle release name and version:

~~~
releases:
# - name: some-other-release
#   version: x.y.z
  - name: datadog-firehose-nozzle
    version: $VERSION_YOU_UPLOADED # i.e. x.y.z
~~~

4. Redeploy the deployment to deploy the Nozzle

~~~
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy

# BOSH CLI v2
bosh -n -d cf-manifest deploy cf-manifest.yml
~~~

### Verify the Nozzle is collecting

On the [Metrics explorer](https://app.datadoghq.com/metric/explorer) page in Datadog, search for metrics beginning with the prefix you configured (i.e. `cloudfoundry.nozzle`):

![cloud-foundry-nozzle-metrics](/static/images/cloud-foundry-nozzle-metrics.png)

## Datadog plugin for BOSH Health Monitor

This plugin is packaged with the BOSH Health Monitor, so if the Health Monitor is already installed and running on your BOSH Director, you simply need to configure the plugin and redeploy the Director.

### Configure the plugin in your BOSH Director

1. In the manifest originally used to deploy the Director (e.g. bosh.yml), configure the Datadog plugin:

~~~
instance_groups:
- instances: 1
  properties:
    hm:
    # loglevel: info
    # resurrector: enabled
    #...other stuff
      datadog_enabled: true
      datadog:
        api_key: <YOUR_DATADOG_API_KEY>
        application_key: <YOUR_DATADOG_APP_KEY>
        pagerduty_service_name: "your_service_name" # optional
~~~

2. Redeploy the Director

BOSH cannot simply configure the plugin and restart the Health Monitor; it must redeploy the Director entirely. **To do this without without fully wiping the Director—including its persistent disks and its PostgreSQL database—you MUST have a `state.json` (or similarly named) file that accurately reflects the current state of your Director.**

You may use [bosh-init](https://bosh.io/docs/install-bosh-init.html) or BOSH CLI v2 to redeploy the Director. If you use bosh-init, your state file must be named similarly to your manifest; for a manifest named `bosh.yml`, it expects a state file named `bosh-state.yml`.

~~~
# bosh-init (legacy)
bosh-init deploy bosh.yml

# BOSH CLI v2 - if your state file is not named bosh-state.yml, provide its name via --state
bosh create-env --state=your-state-file.json bosh.yml
~~~

### Verify the plugin is working

On the [Metrics explorer](https://app.datadoghq.com/metric/explorer) page in Datadog, search for metrics beginning `bosh.healthmonitor`:

![cloud-foundry-bosh-hm-metrics](/static/images/cloud-foundry-bosh-hm-metrics.png)

# Events

The BOSH Health Monitor Datadog plugin emits an event to Datadog for any alert it receives from your deployment's BOSH Agents. Read the [BOSH Health Monitor docs](https://bosh.io/docs/monitoring.html) to see what kinds of alerts might show up in your Datadog event stream.

The BOSH Agent sets a severity for each alert it generates, and the Datadog Health Monitor plugin uses that severity to prioritize the event. An alert with severity Alert, Critical, or Error becomes a Normal priority event in Datadog. An alert with other severities becomes a Low priority event.

# Metrics

The following metrics are sent by the Datadog Firehose Nozzle (`cloudfoundry.nozzle`) and the BOSH Health Monitor Datadog plugin (`bosh.healthmonitor`). The Datadog Agent release does not send any special metrics of its own, just the usual metrics from any Agent checks you configure in the Director runtime config (and, by default, [system](/integrations/system/#metrics), [network](/integrations/network/#metrics), [disk](/integrations/disk/#metrics), and [ntp](/integrations/ntp/#metrics) metrics).

The Datadog Firehose Nozzle only collects CounterEvents (as metrics, not events) and ValueMetrics; it ignores LogMessages, Errors, and ContainerMetrics.

<%= get_metrics_from_git()%>

# Further Reading

* See [all configuration options](https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec) for the Datadog Agent BOSH release
* See [all configuration options](https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec) for the Datadog plugin for BOSH Health Monitor
