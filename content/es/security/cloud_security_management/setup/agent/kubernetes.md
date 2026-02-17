---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /es/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Configuración de Cloud Security en Kubernetes
type: multi-code-lang
---

Sigue las siguientes instrucciones para activar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Requisitos previos

- Versión más reciente del Datadog Agent. Para obtener instrucciones de instalación, consulta [Empezando con el Agent][5] o instala el Agent desde la [interfaz de usuario Datadog][6].

**Nota**: La recopilación de SBOM no es compatible con la función de transmisión de imágenes en Google Kubernetes Engine (GKE). Para desactivarla, consulta la sección [Desactivar la transmisión de imágenes][7] de la documentación de GKE.

## Instalación

{{< tabs >}}

{{% tab "Datadog Operador" %}}

1. Añade lo siguiente a la sección `spec` del archivo `datadog-agent.yaml`:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
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

2. Aplica los cambios y reinicia el Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Añade lo siguiente a la sección `datadog` del archivo `datadog-values.yaml`:

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
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

2. Reinicia el Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

Añade la siguiente configuración a la sección `env` de `security-agent` y `system-probe` en el archivo `daemonset.yaml`:

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
          - name: system-probe
            [...]
            env:
              - name: DD_COMPLIANCE_CONFIG_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                value: "true"
              - name: DD_CONTAINER_IMAGE_ENABLED
                value: "true"
              - name: DD_SBOM_ENABLED
                value: "true"
              - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
                value: "true"
              - name: DD_SBOM_HOST_ENABLED
                value: "true"
              - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
                value: "true"
          [...]
```

{{% /tab %}}
{{< /tabs >}}

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /es/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable