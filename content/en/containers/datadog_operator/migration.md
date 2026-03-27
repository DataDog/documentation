---
dependencies:
- https://github.com/DataDog/helm-charts/blob/main/charts/datadog/docs/Migration_Helm_to_Operator.md
description: Migrate the Datadog Helm installation to the Datadog Operator for managing
  Datadog Agent deployments
title: Migrate to the Datadog Operator from the Datadog Helm Chart
---
**Note**: Helm-Operator Migration is in Preview.

## Overview

This guide breaks down the process for migrating from the Datadog Helm chart to the Datadog Operator for managing the Datadog Agent in Kubernetes. Using the Datadog Operator offers the following advantages:

* Operator configuration is more flexible for future enhancements.
* Validation for your Agent configurations.
* Orchestration for creating and updating Agent resources. 
* As a Kubernetes Operator, the Datadog Operator is treated as a first-class resource by the Kubernetes API. 
* Unlike the Helm chart, the Operator is included in the Kubernetes reconciliation loop.

Learn more about the [Datadog Operator][1] and its benefits.

## Prerequisites

* Helm version 3.17.0+
* Datadog Helm chart version 3.174.0+
* Datadog Operator Helm chart version 2.18.0+
* Datadog Operator v1.23.0+

## Migrate existing Datadog Helm release

To migrate Datadog Agent workloads deployed by an existing Datadog Helm release to the DatadogAgent custom resource definition, use the built-in migration tooling available in Datadog Helm chart version 3.172.0 and Datadog Operator version 1.23.0 and later.

The migration tooling supports the following Datadog Helm chart configuration options either minimally or partially:

* Agent credentials and Kubernetes secrets
* Cluster and Datadog site settings
* Tags, environment variables, and name overrides
* Pod-level overrides (partial)
* Kubelet and container runtime sockets
* Network policy (basic)
* APM (hostPort/UDS modes) with basic instrumentation and error tracking
* Logs collection (basic)
* Process monitoring
* DogStatsD
* Cluster Agent overrides and Admission Controller
* Cluster checks and cluster checks runner
* Kubernetes events, KSM core check (basic), Orchestrator Explorer (basic), and Helm check
* Prometheus scraping (partial)
* Remote Configuration

1. **Configure `datadog-values.yaml` to enable migration preview**.
    
    Add the following to your `datadog-values.yaml` file:

   ```yaml
   datadog:
      operator:
         enabled: true
         migration:
            preview: true
   ```

2. **Upgrade your Helm release and provide the file path to your updated `datadog-values.yaml` file using --set-file**.

   Run:

   ```shell
   helm upgrade <DATADOG_RELEASE_NAME> \
      --set-file datadog.operator.migration.userValues=datadog-values.yaml \
      -f datadog-values.yaml \
      datadog/datadog
   ```

3. **Review the migration job pod logs**

   Run:

   ```shell
   kubectl logs job/<DATADOG_RELEASE_NAME>-dda-migration-job --all-containers
   ```

   If there are no configuration mapping errors present in the logs, you can proceed with migrating your current Datadog Helm release.

4. **Configure `datadog-values.yaml` to enable migration**.

   Add the following to your `datadog-values.yaml` file:

   ```yaml
   datadog:
      operator:
         enabled: true
         migration:
            enabled: true
   
   operator:
      image:
         tag: 1.23.0
      datadogCRDs:
         keepCrds: true
   ```

   Note: Setting `operator.datadogCRDs.keepCrds=true` applies the Helm `helm.sh/resource-policy: keep` annotation to the CRDs, so Helm does not delete them when the Datadog Helm release is uninstalled.

5. **Upgrade your Helm release and provide the file path to your updated `datadog-values.yaml` file using --set-file once more**.

   Run:

   ```shell
   helm upgrade <DATADOG_RELEASE_NAME> \
      --set-file datadog.operator.migration.userValues=datadog-values.yaml \
      -f datadog-values.yaml \
      datadog/datadog
   ```

6. **Confirm Datadog Agent installation**.

   Verify that Agent pods (tagged with `app.kubernetes.io/component:agent` and `app.kubernetes.io/managed-by: datadog-operator`) are updating according to the configured update strategy and reporting on the [Containers page][5] in Datadog. Agent pods are detected within a few minutes of deployment.

   Your Datadog Agent workloads are now managed by the DatadogAgent custom resource. To view and save the migrated DatadogAgent custom resource, run: 

   ```shell
   kubectl get datadogagents
   NAME      AGENT              CLUSTER-AGENT         CLUSTER-CHECKS-RUNNER   AGE
   datadog   Updating (5/0/0)   Progressing (1/0/1)                           5s

   kubectl get datadogagent datadog -oyaml > datadog.yaml
   ```

## Install Datadog Operator Helm chart

After migrating your Datadog Agent workloads and validating that the Agent pods are reporting as expected, you can proceed to install the Datadog Operator Helm chart as a standalone Helm release.

1. Run:

   ```shell
   helm install <OPERATOR_RELEASE_NAME> \
      --set apiKeyExistingSecret=datadog-secret \
      --set appKeyExistingSecret=datadog-secret \
      --set datadogCRDs.keepCrds=true \
      --take-ownership \
      datadog/datadog-operator
   ```

   **Important**: If your Datadog Helm release name contains the suffix, `datadog`, do not use release name `<DATADOG_RELEASE_NAME>-operator`. It produces deployment name `<DATADOG_RELEASE_NAME>-operator`, which collides with the subchart Operator. Use a different release name or set `--set fullnameOverride` to a different name to avoid immutable field errors.

   **Note**: `--take-ownership` lets the Datadog Operator release adopt Datadog CRDs that were previously created by the Operator subchart (enabled through `datadog.operator.enabled`).

2. Verify that the Datadog Operator pod is reporting on the [Containers page][5] in Datadog as expected.

To customize the Operator configuration, create an `operator-values.yaml` file to override the default [Datadog Operator Helm chart values][3].

## Uninstall Datadog Helm chart

After you install the Datadog Operator Helm chart, uninstall the Datadog Helm chart.

1. Run:

   ```shell
   helm uninstall <DATADOG_RELEASE_NAME>
   ```

Datadog Agent pods should remain unaffected, and Datadog custom resource definitions (CRDs) should remain installed on the Kubernetes cluster. The Cluster Agent, Cluster Agent service account, and Cluster Checks Runners (if enabled) will be recreated by the Datadog Operator.

## DatadogAgent custom resource configuration

After you install the Datadog Operator Helm chart, you can manage your Datadog Agent workloads using the DatadogAgent custom resource. To make updates to your Datadog Agent deployment, modify the configuration file containing your DatadogAgent spec and deploy it on your cluster:

```shell
kubectl apply -f datadog.yaml
```

For a full list of configuration options, see the [DatadogAgent configuration spec][4].

[1]: /containers/datadog_operator/#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset
[2]: /containers/datadog_operator/migration_advanced
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml
[4]: /containers/datadog_operator/configuration/
[5]: https://app.datadoghq.com/containers
