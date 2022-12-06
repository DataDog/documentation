---
title: Pivotal Cloud Foundry Manual Setup Guide
kind: guide
description: "Steps for manually setting up the Pivotal Cloud Foundry Integration"
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-tanzu-application-service/"
  tag: "Blog"
  text: "Monitor applications running on VMware Tanzu Application Service"
---

## Overview

Pivotal Cloud Foundry (PCF) deployments can send metrics and events to Datadog. You can track the health and availability of all nodes in a deployment, monitor the jobs they run, collect metrics from the Loggregator Firehose, and more. This page walks you through how to manually set up monitoring for your PCF application.

There are three main components for the PCF integration with Datadog. First, the buildpack is used to collect custom metrics from your applications. Second, the BOSH Release collects metrics from the platform. Third, the Loggregator Firehose Nozzle collects all other metrics from your infrastructure. Read the [Datadog VMware Tanzu Application Service architecture][32] guide for more information.

## Monitor your applications

Use the **Datadog Pivotal Cloud Foundry Buildpack** to monitor your PCF application. This is a [supply buildpack][2] for PCF that installs the Datadog Container Agent, Datadog Trace Agent for APM, and Datadog DogStatsD binary file in the container your app is running on.

### Pivotal Cloud Foundry < 1.12

The Datadog buildpack uses the Pivotal Cloud Foundry [Pushing an App with Multiple Buildpacks][3] feature that was introduced in version `1.12`.

For older versions, Pivotal Cloud Foundry provides a backwards compatible version of this feature in the form of a [multi-buildpack][4]. You must install and configure this version in order to use Datadog's buildpack.

1. Upload the multi-buildpack back-port. Download the latest multi-buildpack release and upload it to your Pivotal Cloud Foundry environment.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. Add a multi-buildpack manifest to your application. As detailed in the [usage section][5] of the multi-buildpack repository, create a `multi-buildpack.yml` file at the root of your application and configure it for your environment. Add a link to the Datadog Pivotal Cloud Foundry Buildpack and to your regular buildpack:

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

      The URLs for the Datadog Buildpack are:

      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      Do not use the `latest` version here (replace `x.y.z` with the specific version you want to use).

      **Your regular buildpack should be the last in the manifest to act as a final buildpack**. To learn more, see [Pivotal Cloud Foundry's How Buildpacks Work][6].

3. Push your application with the multi-buildpack. Ensure that the `multi-buildpack` is the buildpack selected by Pivotal Cloud Foundry for your application:

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

### Pivotal Cloud Foundry Platform >= 1.12

1. Upload the Datadog Pivotal Cloud Foundry Buildpack. [Download the latest Datadog build pack release][7] and upload it to your Pivotal Cloud Foundry environment.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. Push your application with the Datadog buildpack and your buildpacks. The process to push your application with multiple buildpacks is described in [Pushing an App with Multiple Buildpacks][3].

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

      **If you were using a single buildpack before, it should be the last one loaded so it acts as a final buildpack**. To learn more, see [Pivotal Cloud Foundry's How Buildpacks Work][6].

### Meta-Buildpack **(deprecated)**

If you are a [meta-buildpack][8] user, Datadog's buildpack can be used as a decorator out of the box.

**Note**: Pivotal has deprecated the meta-buildpack in favor of the multi-buildpack.

## Monitor your PCF cluster

There are two points of integration with Datadog, each of which achieves a different goal:

- **Datadog Agent BOSH release** - Install the Datadog Agent on every node in your deployment to track system, network, and disk metrics. Enable any other Agent checks you wish.
- **Datadog Firehose Nozzle** - Deploy one or more Datadog Firehose Nozzle jobs. The jobs tap into your deployment's Loggregator Firehose and send all non-container metrics to Datadog.

<div class="alert alert-warning">
These integrations are meant for PCF deployment administrators, not end users.
</div>

### Prerequisites

You must have a working Cloud Foundry deployment and access to the BOSH Director that manages it. You also need BOSH CLI to deploy each integration. You may use either major version of the CLI -- [v1][15] or [v2][16].

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

Add the following to your BOSH Director's runtime configuration file (`runtime.yml`):

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

To see which `datadog-agent` release version was uploaded earlier, run `bosh releases`.

#### Load the runtime.yml

Check if you have a previously configured `runtime-config` by running:

```text
# BOSH CLI v1
`bosh runtime-config`
# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

In BOSH v2, if the `runtime.yml` file is empty, you should see the response: `No runtime config`.

#### Enable extra Agent checks

For each extra Agent check to enable across your deployment, add its configuration under the `properties.dd.integrations` key, for example:

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

The configuration under each check name uses the same format as when configuring the check in its own file in the Agent's `conf.d` directory.

Everything you configure in `runtime.yml` applies to every node. You cannot configure a check for a subset of nodes in your deployment.

To customize configuration for the default checks (system, network, disk, and NTP), see the [full list of configuration options][19] for the Datadog Agent BOSH release.

#### Sync the runtime configuration to the BOSH Director

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml
# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### Redeploy your PCF deployment

```text
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

Since runtime configuration applies globally, BOSH redeploys every node in your deployment. If you have more than one deployment, redeploy all deployments to install the Datadog Agent everywhere.

#### Verify the Agent is installed everywhere

To check if the Agent installations were successful, filter by `cloudfoundry` on the [Host Map][20]. The Datadog Agent BOSH release tags each host with `cloudfoundry`. Optionally, group hosts by any tag, such as `bosh_job`, as in the following screenshot:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="The host map in Datadog with cloudfoundry entered in the Filter section and bosh_job in the Group section"  >}}

Click on any host to zoom in, then click **system** within its hexagon to make sure Datadog is receiving system metrics:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="The detail view for a host in the Datadog host map with the system integration selected and multiple graphs displaying data"  >}}

#### Collect CAPI metadata and Cluster Agent tags in PCF containers

For Datadog Agent versions `7.40.1` and later, you can collect CAPI metadata and Datadog Cluster Agent (DCA) tags from PCF containers. Application labels and annotations are present in the application logs, metrics, and traces. 

### Install the Datadog Cluster Agent (DCA) BOSH release

The Datadog Cluster Agent BOSH release is a BOSH package for running the DCA on Cloud Foundry.

This package is to be used in conjunction with the [Datadog Agent BOSH Release][18].
It provides a BOSH link consumed by the Datadog Agent BOSH release to Autodiscover and schedule integrations for your apps, as well as improved tagging for application containers and process discovery. For more information, see the [spec in GitHub][33].

#### Upload Datadog's Cluster Agent release to your BOSH Director

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
```

#### Deployment
Use the example deploy manifest template below to deploy the Datadog Cluster Agent and expose it to the Datadog Agent. See the [spec in GitHub][33] for available properties.

```yaml
jobs:
- name: datadog-cluster-agent
  release: datadog-cluster-agent
  properties:
    cluster_agent:
      token: <TOKEN>  # 32 or more characters in length 
      bbs_poll_interval: 10
      warmup_duration: 5
      log_level: INFO
      bbs_ca_crt: <CA_CERTIFICATE>
      bbs_client_crt: <CLIENT_CERTIFICATE>
      bbs_client_key: <CLIENT_PRIVATE_KEY>
  provides:
    datadog-cluster-agent:
      aliases:
        - domain: <DNS_NAME (e.g. datadog-cluster-agent)>
```

**Note**: This creates a DNS alias for the Datadog Cluster Agent service which makes it addressable through a static alias. See [Aliases to services](https://bosh.io/docs/dns/#aliases-to-services) in the BOSH documentation for more details on BOSH DNS aliases.

This DNS alias is specified in the [`cluster_agent.address`](https://bosh.io/jobs/dd-agent?source=github.com/DataDog/datadog-agent-boshrelease&version=4.0.0#p%3dcluster_agent.address) job property of the Datadog Agent runtime configuration, as shown in the example template below:

```yaml
jobs:
- name: datadog-agent
  release: datadog-agent
  properties: 
    ...
    cluster_agent:
      address: <DNS_NAME>
    ...
```

#### Integration configurations discovery
The Datadog Cluster Agent discovers integrations based on an `AD_DATADOGHQ_COM` environment variable set in your applications.
This environment variable is a JSON object containing the Autodiscovery configuration templates for your application. The Datadog Cluster Agent can discover and render two types of configurations:
  1. Configurations for services bound to your application, whether they be user-provided or from a service broker.
  2. Configurations for services running inside your application, for example, a web-server.

The JSON object should be a dictionary associating a service name to its Autodiscovery template:
```
{
    "<SERVICE_NAME>": {
        "check_names": [<LIST_OF_INTEGRATION_NAMES_TO_CONFIGURE>],
        "init_configs": [<LIST_OF_INIT_CONFIGS>],
        "instances": [<LIST_OF_INSTANCES>],
        "variables": [<LIST_OF_VARIABLES_DEFINITIONS>]
    }
}
```

For services bound to the application, the `<SERVICE_NAME>` should be the name of the service as it appears in the `cf services` command output. For services running inside the application, the `<SERVICE_NAME>` can be anything.  

The `variables` key is used only for bound services to resolve template variables inside the configuration template, and must contain the JSON path of the desired value for the `VCAP_SERVICES` environment variable. You can inspect this with the `cf env <APPLICATION_NAME>` command.

**Note:** The Datadog Cluster Agent is only able to resolve credentials of services directly available in the `VCAP_SERVICES` environment variable for Autodiscovery.

##### Example

This Autodiscovery configuration in the `AD_DATADOGHQ_COM` environment variable demonstrates a Cloud Foundry application running a web server bound to a PostgreSQL service:

```
AD_DATADOGHQ_COM: '{
    "web_server": {
        "check_names": ["http_check"],
        "init_configs": [{}],
        "instances": [
            {
                "name": "My Nginx",
                "url": "http://%%host%%:%%port_p8080%%",
                "timeout": 1
            }
        ]
    }
    "postgres-service-name": {
        "check_names": ["postgres"],
        "init_configs": [{}],
        "instances": [
            {
                "host": "%%host%%",
                "port": 5432,
                "username": "%%username%%",
                "dbname": "%%dbname%%",
                "password": "%%password%%"
            }
        ],
        "variables": {
            "host": "$.credentials.host",
            "username": "$.credentials.Username",
            "password": "$.credentials.Password",
            "dbname": "$.credentials.database_name"
        }
    }
}'
```

This example demonstrates the accompanying `VCAP_SERVICES` environment variable:

```
VCAP_SERVICES: '{
    "my-postgres-service": [
        {
            "credentials": {
                Password: "1234",
                Username: "User1234",
                host: "postgres.example.com",
                database_name: "my_db",
            },
            "name": "postgres-service-name",
        }
    ]
}'
```

In the example above, the first item `web_server` is a configuration for a service running inside the application.
There are no `variables`, and it uses the `%%host%%` and `%%port%%` template variables available through Autodiscovery.

The second item `postgres-service-name` is a configuration for a service bound to the application.
To resolve the template variables, it uses the `variables` dictionary to define the values used in the instance configuration.
This dictionary contains a JSONPath object indicating where to find the variable values for the service `postgres-service-name` defined in the `VCAP_SERVICES` environment variable.

#### Improve CCCache performance on cache miss

For Datadog Agent versions `7.40.1` and later, you can add more flags to increase control over the CCCache behavior and the number of API calls:

- `refresh_on_cache_miss` to control cache miss behavior
- Split `advanced_tags` into `sidecars_tags` and `isolation_segments_tags`

#### Improved tagging for application containers and process discovery

Once the two releases are linked, the Datadog Cluster Agent automatically provides cluster-level metadata, which the Node Agents attach as tags to their corresponding Cloud Foundry application containers.

### Deploy the Datadog Firehose Nozzle

Datadog provides a BOSH release of the Datadog Firehose Nozzle. After uploading the release to your Director, add the Nozzle to an existing deployment, or create a new deployment that only includes the Nozzle. The instructions below assume you're adding it to an existing PCF deployment that has a working Loggregator Firehose.

#### Upload Datadog's release to your BOSH Director

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

If you'd like to create your own release, see the [Datadog Firehose Nozzle release repository][21].

#### Configure a UAA client

In the manifest that contains your UAA configuration, add a new client for the Datadog Nozzle so that jobs can access the Firehose:

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

Redeploy to add the user.

#### Add Firehose Nozzle jobs

Configure one or more Nozzle jobs in your main PCF deployment manifest (`cf-manifest.yml`):

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
      # for example, ws://traffic-controller.your-cf-domain.com:8081
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
      url: <UAA_URL> # for example, https://uaa.your-cf-domain.com:8443
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

To see which `datadog-firehose-nozzle` release version was uploaded earlier, run `bosh releases`.

#### Redeploy the deployment

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Verify the Firehose Nozzle is collecting data

In the [Metrics Explorer][23], search for metrics beginning with `cloudfoundry.nozzle`.

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="The Metrics Explorer in Datadog with cloudfoundry.nozzle entered in the search bar"  >}}

#### Control the application metadata prefix

You can enable or disable the application metadata prefix in the Firehose Nozzle app metrics.

{{< img src="integrations/cloud_foundry/enable_metadata_app_prefix.png" alt="The integration tile settings in Datadog with Enable Metadata App Metrics Prefix unchecked" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[3]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[4]: https://github.com/cloudfoundry/multi-buildpack
[5]: https://github.com/cloudfoundry/multi-buildpack#usage
[6]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[7]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[8]: https://github.com/cf-platform-eng/meta-buildpack
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/infrastructure/map
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /integrations/system/#metrics
[25]: /integrations/network/#metrics
[26]: /integrations/disk/#metrics
[27]: /integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /profiler/enabling/
[32]: /integrations/faq/pivotal_architecture
[33]: https://github.com/DataDog/datadog-cluster-agent-boshrelease/blob/master/jobs/datadog-cluster-agent/spec