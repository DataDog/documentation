---
title: Datadog-Kubernetes Integration
integration_title: Kubernetes
kind: integration
---

###Overview
{: #int-overview}

Enabling Kubernetes integration in the datadog agent will provide the following:

* A wide range of metrics from cluster containers, both from application as well as system level
* A set of service checks that reflect cluster operating conditions

The Kubernetes integration collects metrics from the built-in cAdvisor instance embedded in the kubelet daemon. In such an environment, the most common agent deployment is expected to be a docker container. Therefore configuration defaults are set to match this use-case. If your environment differs, here is the list of key items to adjust:

* Metrics API endpoint: `host`, `port`

* Kubelet health check endpoint: `master_host`, `master_port`

###Network access
The kubelet daemon runs on the host and we need to access it from a docker container to obtain metrics. Instead of enabling full host network access for our container, we try to reach the default router instead and log the result during initialization time. If these assumptions are incorrect for your installation please specify the above endpoint configuration variables.

###Default Metrics
By default, the Kubernetes check will publish the following metrics:

* `memory.usage`
* `network.rx_bytes`, `network.tx_bytes`, `network_errors`
* `diskio.io_service_bytes.stats.total`
* `cpu.usage.total`
* `filesystem.usage_pct`

###Tags
Data is tagged using the Kubernetes pod name and docker container name, in addition to hostname and project name.

###Additional metrics
To enable additional metrics, please add items under `enabled_gauges` and `enabled_rates` configuration lists. Metrics topics are constructed as discovered from the API data, therefore specifying `diskio.*` will enable all diskio related metrics.

###Using Histograms
Under Kubernetes we may have multiple instances of an application container that are virtually identical except for the docker container id. For example, we may have 2 instances of redis running on 2 separate hosts, with no persistent identifying characteristics. Such cases become more prevalent when autoscaling is used. To provide useful metrics we can essentially aggregate data into a histogram; this is enabled by the `use_histogram` option.
