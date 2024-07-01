---
"app_id": "calico"
"app_uuid": "9e361f97-5332-4c86-8119-e1594b83841e"
"assets":
  "dashboards":
    "[calico] dashboard overview": ./assets/dashboards/calico_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": calico.felix.active.local_endpoints
      "metadata_path": metadata.csv
      "prefix": calico.
    "process_signatures":
    - calico-node
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10236"
    "source_type_name": Calico
  "monitors":
    "[calico] monitor dataplane failures": assets/monitors/dataplane_failures.json
    "[calico] monitor ipsets error": assets/monitors/ipset_error.json
    "[calico] monitor iptables restore errors": assets/monitors/iptables_restore_errors.json
    "[calico] monitor iptables save errors": assets/monitors/iptables_save_errors.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- metrics
- network
- security
- kubernetes
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/calico/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "calico"
"integration_id": "calico"
"integration_title": "calico"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "calico"
"public_title": "calico"
"short_description": "Calico is a networking and network security solution for containers."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Security"
  - "Category::Kubernetes"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Calico is a networking and network security solution for containers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": calico
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Calico][1] through the Datadog Agent.

The Calico check sends metrics concerning network and security in a Kubernetes cluster set up with Calico.

## Setup

### Installation

The Calico check is included in the [Datadog Agent][2] package. 

#### Installation with a Kubernetes cluster-based Agent

Using annotations:

1. Set up Calico on your cluster.

2. Enable Prometheus metrics using the instructions in [Monitor Calico component metrics][3].
   Once enabled, you should have a `felix-metrics-svc` service running in your cluster, as well as a `prometheus-pod`.

3. To use Autodiscovery, modify `prometheus-pod`. Add the following snippet to your Prometheus YAML configuration file:

   ```
   metadata:
     [...]
     annotations:
      ad.datadoghq.com/prometheus-pod.check_names: |
      ["openmetrics"]
      ad.datadoghq.com/prometheus-pod.init_configs: |
      [{}]
      ad.datadoghq.com/prometheus-pod.instances: |
        [
           {
              "prometheus_url": "http://<FELIX-SERVICE-IP>:<FELIX-SERVICE-PORT>/metrics",
              "namespace": "calico",
              "metrics": ["*"]
           }
        ]
     spec:
       [....]
   ```

You can find values for `<FELIX-SERVICE-IP>` and `<FELIX-SERVICE-PORT>` by running `kubectl get all -all-namespaces`.

#### Installation with an OS-based Agent

1. Follow [Monitor Calico component metrics][3] until you have a `felix-metrics-svc` service running by using `kubectl get all --all-namespaces`.

2. If you are using minikube, you must forward port 9091 to `felix-metrics-svc`.
   Run `kubectl port-forward service/felix-metrics-svc 9091:9091 -n kube-system`.

   If you are not using minikube, check that `felix-metrics-svc` has an external IP. If the service does not have an external IP, use `kubectl edit svc` to change its type from `ClusterIP` to `LoadBalancer`.


### Configuration

Follow the instructions to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `calico.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Calico performance data.
   The only required parameter is the `openmetrics_endpoint` URL. See the [sample calico.d/conf.yaml][1] for all available configuration options.

2. If you are using minikube, use 'http://localhost:9091/metrics' as your `openmetrics_endpoint` URL.
   If you are not using minikube, use `http://<FELIX-METRICS-SVC-EXTERNAL-IP>:<PORT>/metrics` as your `openmetrics_endpoint` URL.

3. [Restart the Agent][2].

##### Metric collection

1. The default configuration of your `calico.d/conf.yaml` file activate the collection of your [Calico metrics](#metrics). See the [sample calico.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

##### Log collection

Since Calico structure is set up in a Kubernetes cluster, it is built with deployments, pods, and services. The Kubernetes integration fetches logs from containers.

After setting up the [Kubernetes][3] integration, Calico logs become available in the Datadog Log Explorer.

Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

[1]: https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/kubernetes
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below. 

##### Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `calico`                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{openmetrics_endpoint: <OPENMETRICS_ENDPOINT>}`           |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "calico", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `calico` under the Checks section.

### Metrics
{{< get-metrics-from-git "calico" >}}


### Events

The Calico integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "calico" >}}



## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Calico with Datadog][6]


[1]: https://www.tigera.io/project-calico/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.tigera.io/calico/3.25/operations/monitor/monitor-component-metrics
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-calico-with-datadog/
