---
aliases:
- /es/security/workload_protection/setup/agent/kubernetes
description: Habilite Workload Protection en Kubernetes con el Datadog Operator, Helm
  o un DaemonSet.
disable_toc: false
title: Configuración de Workload Protection en Kubernetes
---
Utilice las siguientes instrucciones para habilitar Workload Protection.

<div class="alert alert-info">Para implementar Workload Protection en Amazon EKS configurado con la opción de cómputo Fargate, consulte <a href="/security/workload_protection/setup/fargate/">la página de implementación de Fargate</a>.</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- Última versión de Datadog Agent. Para obtener instrucciones de instalación, consulte [Getting Started with the Agent][5] o instale el Agent desde la [Datadog UI][6].

**Nota**: la recopilación de SBOM no es compatible con la función de transmisión de imágenes en Google Kubernetes Engine (GKE). Para deshabilitarla, consulte la sección [Deshabilitar la transmisión de imágenes][7] de la documentación de GKE.

## Instalación {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Agregue lo siguiente a la sección `spec` del archivo `datadog-agent.yaml`:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          enabled: true
          cwsInstrumentation:
            enabled: true

        remoteConfiguration:
          enabled: true
        # Enables Threat Detection
        cws:
          enabled: true
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Enables Container Vulnerability Management
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true

            # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
            # uncompressedLayersSupport: true

          # Enables Host Vulnerability Management
          host:
            enabled: true
    ```

2. Aplique los cambios y reinicie el Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Agregue lo siguiente a la sección `datadog` del archivo `datadog-values.yaml`:

    ```yaml
    # datadog-values.yaml file

    # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        enabled: true
        cwsInstrumentation:
          enabled: true

    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        # Enables Threat Detection
        runtime:
          enabled: true
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      sbom:
        containerImage:
          enabled: true

          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true

        # Enables Host Vulnerability Management
        host:
          enabled: true

        # Enables Container Vulnerability Management
        # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
        # containerImageCollection:
        #   enabled: true
    ```

2. Reinicie el Agent.

Para resolver problemas de RBAC, ejecute el chart con la opción `clusterRole.allowCreatePodsExec` habilitada para `clusterRole`:

```sh
helm install datadog-operator datadog/datadog-operator --set clusterRole.allowCreatePodsExec=true
```

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Agregue la siguiente configuración a la sección `env` de `security-agent` y `system-probe` en el archivo `daemonset.yaml`. Para enriquecer los eventos de Workload Protection con identidades de usuario de Kubernetes, establezca también las variables opcionales `DD_ADMISSION_CONTROLLER_ENABLED` y `DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED` en `cluster-agent-deployment.yaml`.

    ```bash
      # Source: datadog/templates/daemonset.yaml
      apiVersion:app/1
      kind: DaemonSet
      [...]
      spec:
      [...]
      spec:
          [...]
            containers:
            [...]
              - name: agent
                [...]
                env:
                  - name: DD_REMOTE_CONFIGURATION_ENABLED
                    value: "true"
              - name: system-probe
                [...]
                env:
                  - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                    value: "true"
                  - name: DD_COMPLIANCE_CONFIG_ENABLED
                    value: "true"
                  - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                    value: "true"
                  - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
                    value: "true"
              [...]

      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_ADMISSION_CONTROLLER_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "true"
    ```

{{% /tab %}}
{{< /tabs >}}


[5]: /es/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable