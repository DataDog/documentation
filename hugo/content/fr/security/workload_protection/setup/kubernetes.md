---
aliases:
- /fr/security/workload_protection/setup/agent/kubernetes
description: Activez Workload Protection sur Kubernetes avec Datadog Operator, Helm
  ou un DaemonSet.
disable_toc: false
title: Configuration de Workload Protection sur Kubernetes
---
Utilisez les instructions suivantes pour activer Workload Protection.

<div class="alert alert-info">Pour déployer Workload Protection sur Amazon EKS configuré avec l'option de calcul Fargate, consultez <a href="/security/workload_protection/setup/fargate/">la page de déploiement Fargate</a>.</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## Prérequis {#prerequisites}

- Dernière version du Datadog Agent. Pour obtenir des instructions d'installation, consultez [Débuter avec l'Agent][5] ou installez l'Agent depuis l'[interface utilisateur de Datadog][6].

**Remarque** : SBOM collection n'est pas compatible avec l'image streaming feature dans Google Kubernetes Engine (GKE). Pour la désactiver, consultez la section [Disable Image streaming][7] de la documentation GKE.

## Installation {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Ajoutez ce qui suit à la section `spec` du fichier `datadog-agent.yaml` :

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

2. Appliquez les modifications et redémarrez l'Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Ajoutez ce qui suit à la section `datadog` du fichier `datadog-values.yaml` :

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

2. Redémarrez l'Agent.

Pour résoudre les problèmes RBAC, exécutez le chart avec l'option `clusterRole.allowCreatePodsExec` activée pour le `clusterRole` :

```sh
helm install datadog-operator datadog/datadog-operator --set clusterRole.allowCreatePodsExec=true
```

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Ajoutez les paramètres suivants à la section `env` de `security-agent` et `system-probe` dans le fichier `daemonset.yaml`. Pour enrichir les événements Workload Protection avec les identités utilisateur Kubernetes, définissez également les variables optionnelles `DD_ADMISSION_CONTROLLER_ENABLED` et `DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED` dans `cluster-agent-deployment.yaml`.

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


[5]: /fr/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable