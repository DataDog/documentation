---
title: Datadog-Cloud Foundry Integration
integration_title: Cloud Foundry
kind: integration
git_integration_title: cloud_foundry
newhlevel: true
beta: true
---
# Overview

Any Cloud Foundry deployment can send metrics and events to Datadog that help you track the health and availability of all nodes in the deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more.

There are three points of integration with Datadog, each of which achieves a different goal:

* **Datadog Agent BOSH release** — Install the Datadog Agent on every node in your deployment to track system, network, and disk metrics. Enable any other Agent checks you wish.
* **Datadog Firehose Nozzle** — Deploy one or more Datadog Firehose Nozzle jobs. The jobs tap into your deployment's Loggregator Firehose and send all non-container metrics to Datadog.
* **Datadog plugin for BOSH Health Monitor** — Configure your BOSH Director's Health Monitor to send heartbeats (as metrics) and alerts (as events) from each node's BOSH Agent to Datadog.

These integrations are meant for Cloud Foundry deployment administrators, not end users.

# Prerequisites

You need to have a working Cloud Foundry deployment and access to the BOSH Director that manages it. You also need BOSH CLI to deploy each integration. You may use either major version of the CLI—[v1](https://bosh.io/docs/bosh-cli.html) or [v2](https://bosh.io/docs/cli-v2.html#install).

To configure the Datadog plugin for BOSH Health Monitor, you need access to the `state.json` (or similarly named) file that accurately reflects the current state of your BOSH Director. If you don't have such a file, you will need to generate one.

# Install the Datadog Agent BOSH Release

Datadog provides tarballs of the Datadog Agent packaged as a BOSH release. You can upload the latest release to your BOSH Director and then easily install it on every node in your deployment as an [addon](https://bosh.io/docs/runtime-config.html#addons) (i.e. the same way a Director deploys the BOSH Agent to all nodes).

### Upload Datadog's release to your BOSH Director

~~~
# BOSH CLI v1
bosh upload release https://github.com/DataDog/datadog-agent-boshrelease/releases/download/1.0.5130/datadog-agent-release-1.0.5130.tgz

# BOSH CLI v2
bosh upload-release https://github.com/DataDog/datadog-agent-boshrelease/releases/download/1.0.5130/datadog-agent-release-1.0.5130.tgz
~~~

If you'd like to create your own release, see the [Datadog Agent BOSH Release repository](https://github.com/DataDog/datadog-agent-boshrelease).

### Configure the Agent as an addon in your BOSH Director

Add the following to your BOSH Director's runtime configuration file (e.g. `runtime.yml`):

~~~
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # specify the real version, e.g. 1.0.5130, not 'latest'

addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: yes
      dogstatsd_port: 18125               # Many CF deployments have a StatsD already on port 8125
      api_key: <YOUR_DATADOG_API_KEY>
      tags: ["cloudfoundry_deployment_1"] # any tags you wish
      generate_processes: true            # to enable the process check
~~~

If you don't have a local copy of the runtime configuration, get it from the Director (`bosh runtime-config`) and add the above to it. If the Director's runtime configuration is empty, add the above to a new `runtime.yml`.

### Enable extra Agent checks

For each extra Agent check you want to enable across your deployment, add its configuration under the `properties.dd.integrations` key, e.g.:

~~~
  properties:
    dd:
      integrations:
        directory:
          init_config: {}
          instances:
            directory: "."</code></pre>
        #process:
        #  init_config: {}
        #...
~~~

The configuration under each check name should look the same as if you were configuring the check in its own file in the Agent's conf.d directory.

You cannot configure a check for a subset of nodes in your deployment; everything you configure in `runtime.yml` will apply to every node.

To customize configuration for the default checks—system, network, disk, and ntp—see the [full list of configuration options](https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec) for the Datadog Agent BOSH release.

### Sync the runtime configuration to the Director

~~~
# BOSH CLI v1
bosh update runtime-config runtime.yml

# BOSH CLI v2
bosh update-runtime-config runtime.yml
~~~

### Redeploy your Cloud Foundry deployment

~~~
# BOSH CLI v1
bosh deployment yourDeploymentManifest.yml
bosh -n deploy

# BOSH CLI v2
bosh -n -d yourDeployment deploy yourDeploymentManifest.yml
~~~

Since runtime configuration applies globally, BOSH will redeploy every node in your deployment. If you have more than one deployment, redeploy those, too, to install the Datadog Agent everywhere.

### Verify the Agent is installed everywhere

The easiest way to check that Agent installs were successful is to filter for them in the [Host map page](https://app.datadoghq.com/infrastructure/map) in Datadog. The Agent BOSH release tags each host with a generic `cloudfoundry` tag, so filter by that, and optionally group hosts by any tag you wish (e.g. `bosh_job`), as in the following screenshot:

![cloud-foundry-host-map](/static/images/cloud-foundry-host-map.png)

Click on any host to zoom in, then click 'system' within its hexagon to make sure Datadog is receiving metrics for it:

![cloud-foundry-host-map-detail](/static/images/cloud-foundry-host-map-detail.png)

# Deploy the Datadog Firehose Nozzle

As with the Datadog Agent, Datadog provides a BOSH release of the Datadog Firehose Nozzle. After uploading the release to your Director, you can add the Nozzle to an existing deployment, or create a new deployment that only includes the Nozzle. The instructions below assume you're adding it to an existing Cloud Foundry deployment that has a working Loggregator Firehose.

### Upload Datadog's release to your BOSH Director

~~~
# BOSH CLI v1
bosh upload release https://github.com/DataDog/datadog-firehose-nozzle-release/releases/download/61/datadog-firehose-nozzle-release-62.tgz

# BOSH CLI v2
bosh upload-release https://github.com/DataDog/datadog-firehose-nozzle-release/releases/download/61/datadog-firehose-nozzle-release-62.tgz
~~~

If you'd like to create your own release, see the [Datadog Firehose Nozzle release repository](https://github.com/DataDog/datadog-firehose-nozzle-release).

### Configure a UAA client

In the manifest that contains your UAA configuration, add a new client for the Datadog Nozzle so the job(s) can access the Firehose:

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

### Add Nozzle jobs

Configure one or more Nozzle jobs in your main Cloud Foundry deployment manifest (e.g. cf-manifest.yml):

~~~
jobs:
#- instances: 4
#  name: some_other_job
#  ...
- instances: 1            # add more instances if one job cannot keep up with the Firehose
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

See [all configuration options](https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec) for the Datadog Firehose Nozzle.

In the same manifest, add the Datadog Nozzle release name and version:

~~~
releases:
# - name: some-other-release
#   version: x.y.z
# ...
  - name: datadog-firehose-nozzle
    version: $VERSION_YOU_UPLOADED # specify the real version, e.g. 62, not 'latest' 
~~~

### Redeploy the deployment

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

# Configure the Datadog plugin for BOSH Health Monitor

This plugin is packaged with the BOSH Health Monitor, so if the Health Monitor is already installed and running on your BOSH Director, you simply need to configure the plugin and redeploy the Director.

### Add the configuration

In the manifest originally used to deploy the Director (e.g. bosh.yml), configure the Datadog plugin:

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

### Redeploy the Director

BOSH cannot simply configure the plugin and restart the Health Monitor; it must destroy the Director and redeploy it as a new instance. To do this while retaining the Director's current disk and database, you MUST redeploy using a `state.json` (or similarly named) file that accurately reflects the current state of your Director. If you don't have such a file, follow the BOSH docs on [Deployment State](https://bosh.io/docs/cli-envs.html#deployment-state) to create a basic `state.yml`.

You may use [bosh-init](https://bosh.io/docs/install-bosh-init.html) or BOSH CLI v2 to redeploy the Director. If you use bosh-init, your state file must be named similarly to your manifest; for a manifest named `bosh.yml`, `bosh-init` expects a state file named `bosh-state.yml`.

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

The BOSH Agent sets a severity for each alert it generates, and the Datadog Health Monitor plugin uses that severity to prioritize the event it emits. Alerts with an Error, Critical, or Alert severity become Normal priority events in Datadog. Alerts with any other severity become Low priority events.

# Metrics

The following metrics are sent by the Datadog Firehose Nozzle (`cloudfoundry.nozzle`) and the BOSH Health Monitor Datadog plugin (`bosh.healthmonitor`). The Datadog Agent release does not send any special metrics of its own, just the usual metrics from any Agent checks you configure in the Director runtime config (and, by default, [system](/integrations/system/#metrics), [network](/integrations/network/#metrics), [disk](/integrations/disk/#metrics), and [ntp](/integrations/ntp/#metrics) metrics).

The Datadog Firehose Nozzle only collects CounterEvents (as metrics, not events) and ValueMetrics; it ignores LogMessages, Errors, and ContainerMetrics.

<%= get_metrics_from_git()%>
