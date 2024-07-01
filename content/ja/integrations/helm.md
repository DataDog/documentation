---
"app_id": "helm"
"app_uuid": "754a061c-d896-4f3c-b54e-87125bb66241"
"assets":
  "dashboards":
    "Helm - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": helm.release
      "metadata_path": metadata.csv
      "prefix": helm.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10257"
    "source_type_name": Helm
  "monitors":
    "[helm] Monitor Helm failed releases": assets/monitors/monitor_failed_releases.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- configuration & deployment
- containers
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/helm/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "helm"
"integration_id": "helm"
"integration_title": "Helm Check"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "helm"
"public_title": "Helm Check"
"short_description": "Track your Helm deployments with Datadog"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Track your Helm deployments with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Helm Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors Helm deployments through the Datadog Agent.

Helm supports multiple storage backends. In v3, Helm defaults to Kubernetes secrets and in v2, Helm defaults to ConfigMaps. This check supports both options.

## Setup

### Installation

The Helm check is included in the [Datadog Agent][1] package.
No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Helm" %}}

This is a cluster check. You can enable this check by adding `datadog.helmCheck.enabled` to your Helm chart.

**Note**: If no configuration is required, an empty `conf.d` can be passed.

For more information, see the [Cluster Check documentation][1].

[1]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
{{% /tab %}}
{{% tab "Operator (v1.5.0+)" %}}

This is a cluster check. You can enable this check by adding `spec.features.helmCheck.enabled` to your `DatadogAgent` deployment configuration.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    helmCheck:
      enabled: true
```

{{% /tab %}}
{{% tab "Operator (< v1.5.0)" %}}

This is a cluster check. You can enable this check by providing a configuration file `helm.yaml` to the cluster Agent in your `DatadogAgent` deployment configuration.

```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    clusterAgent:
      [...]
      extraConfd:
        configDataMap:
          helm.yaml: |-
            init_config:
            instances:
            - collect_events: false
```

This check requires additional permissions bound to the Kubernetes service account used by the cluster Agent pod to access the releases stored by Helm.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-helm-check
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-helm-check
subjects:
  - kind: ServiceAccount
    name: datadog-cluster-agent
    namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-helm-check
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  - configmaps
  verbs:
  - get
  - list
  - watch
```

**Note**: The `ServiceAccount` subject is an example with the installation in the `default` namespace. Adjust `name` and `namespace` in accordance with your deployment.

{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `helm` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "helm" >}}


### Events

This check emits events when the `collect_events` option is set to `true`. The default is `false`.

When the option is enabled, the check emits events when:
- A new release is deployed.
- A release is deleted.
- A release is upgraded (new revision).
- There's a status change, for example from deployed to superseded.

### Service Checks
{{< get-service-checks-from-git "helm" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].

## Further Reading

Additional helpful documentation, links, and articles:

- [Blog: Monitor your Helm-managed Kubernetes applications with Datadog][4]



[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/
