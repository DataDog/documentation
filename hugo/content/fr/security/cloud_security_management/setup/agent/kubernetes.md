---
aliases:
- /fr/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /fr/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /fr/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Configuration de Cloud Security sur Kubernetes
type: multi-code-lang
---
Utilisez les instructions suivantes pour activer Misconfigurations et Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prérequis {#prerequisites}

- Dernière version du Datadog Agent. Pour obtenir des instructions d'installation, consultez [Getting Started with the Agent][5] ou installez l'Agent depuis le [Datadog UI][6].

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
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables Host Vulnerability Management
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Preview, Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. Appliquez les modifications et redémarrez l'Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Ajoutez ce qui suit à la section `datadog` du fichier `datadog-values.yaml` :

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables Host Vulnerability Management
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Preview, Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Redémarrez l'Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Ajoutez les variables d'environnement suivantes à chaque conteneur du Datadog Agent dans le fichier `daemonset.yaml`, y compris `agent`, `security-agent` et `system-probe`. Ces variables activent Misconfigurations, Vulnerability Management, mount-based container image scanning et runtime package prioritization.

    ```yaml
    - name: DD_COMPLIANCE_CONFIG_ENABLED
      value: "true"
    - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
      value: "true"
    - name: DD_SBOM_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
      value: "true"
    - name: DD_SBOM_HOST_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
      value: "true"
    - name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
      value: "true"
    - name: HOST_ROOT
      value: /host/root
    ```

   Si votre DaemonSet monte la racine du host sur un chemin différent, définissez `HOST_ROOT` sur ce chemin de montage dans chaque conteneur du Datadog Agent.

2. Définissez `hostPID: true` dans la spécification du pod et ajoutez les `securityContext` suivants au conteneur `agent`. Ces paramètres sont requis pour mount-based container image scanning avec `DD_SBOM_CONTAINER_IMAGE_USE_MOUNT=true`.

    ```yaml
      # Source: datadog/templates/daemonset.yaml
      apiVersion: apps/v1
      kind: DaemonSet
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            hostPID: true
            containers:
            [...]
              - name: agent
                [...]
                securityContext:
                  capabilities:
                    add:
                      - SYS_ADMIN
                  readOnlyRootFilesystem: true
                  appArmorProfile:
                    type: Unconfined
    ```

3. Redémarrez le Datadog Agent.

{{% /tab %}}

{{< /tabs >}}

**Remarque** : `enrichment.usage.enabled: true` nécessite le Datadog Agent **7.79.0 ou une version ultérieure**. Consultez la section [Runtime Package Prioritization](#runtime-package-prioritization-preview) pour connaître les prérequis.

**Remarque** : L'analyseur `languages` nécessite le Datadog Agent **7.70 ou une version ultérieure**. Lorsqu'il est activé, il détecte les vulnérabilités dans les bibliothèques d'applications gérées par les gestionnaires de paquets ci-dessous, en plus des paquets du système d'exploitation. Lorsque le champ `analyzers` est omis, Datadog analyse uniquement les paquets du système d'exploitation pour les images de conteneur.

### Gestionnaires de paquets de bibliothèques d'applications pris en charge {#supported-application-library-package-managers}

L<small>'</small>analyzer `languages` couvre les écosystèmes de paquets suivants :

| Écosystème | Gestionnaire de paquets/format |
|-----------|------------------------|
| Ruby | Bundler, GemSpec |
| Rust | Cargo, Rust binary |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), Gradle lock, Sbt lock |
| JavaScript | npm (package-lock.json), Yarn, pnpm, Node package |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Python package (egg), pip, Pipenv, Poetry, uv, Conda package, Conda environment |
| Go | Go binary, Go modules |
| C/C++ | Conan lock |
| Swift / Objective-C | CocoaPods, Swift |
| Dart | PubSpec lock |
| Elixir | Mix lock |
| Julia | Julia |

## Runtime Package Prioritization (Preview) {#runtime-package-prioritization-preview}

Runtime package prioritization identifie quels packages dans une image de conteneur sont utilisés à l'exécution, afin que vous puissiez prioriser les vulnérabilités du code qui s'exécute par rapport aux vulnérabilités des packages installés mais jamais exécutés.

Lorsqu'il est activé, le Datadog Agent utilise eBPF pour observer l'accès aux fichiers sur vos charges de travail et ajoute ces signaux aux résultats de vulnérabilité pour cette image :

| Signal | Ce qu'il vous indique |
|--------|-------------------|
| Le paquet est en cours d'exécution | Les fichiers du paquet ont été observés comme étant accédés par un processus en cours d'exécution. |
| Accédé par le processus root | Le paquet a été accédé par un processus s'exécutant en tant que root (UID 0). |
| SUID binary present | Le paquet contient un binaire avec le bit SUID défini, ce qui peut permettre une élévation de privilèges. |

*Package is running* alimente la dimension **Reachability** du [Runtime Prioritization Engine][9]. Pour interroger ces signaux directement, consultez [Filter findings by runtime signals][10].

**Prérequis** :
- Datadog Agent **7.79.0 ou version ultérieure**. Sur Kubernetes, utilisez **7.81.0 ou version ultérieure** pour une couverture de signal la plus complète.
- Linux uniquement (dépendance eBPF). Consultez [Workload Protection setup][11] pour les distributions et les versions de noyau prises en charge.

Runtime signals s'appliquent aux gestionnaires de paquets du système d'exploitation (`apt`, `yum` ou `apk`) dans les résultats de vulnérabilité des images de conteneur.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Ajoutez le bloc `enrichment` à la section `sbom` de votre fichier `datadog-agent.yaml` :

```yaml
spec:
  features:
    sbom:
      enabled: true
      containerImage:
        enabled: true
      # Enables runtime package prioritization (Preview, Agent 7.79+)
      enrichment:
        usage:
          enabled: true
```

Appliquez les modifications et redémarrez le Datadog Agent.

{{% /tab %}}

{{% tab "Helm" %}}

Ajoutez le bloc `enrichment` à la section `sbom` de votre fichier `datadog-values.yaml` :

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    # Enables runtime package prioritization (Preview, Agent 7.79+)
    enrichment:
      usage:
        enabled: true
```

Redémarrez l'Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

Définissez `hostPID: true` dans la spécification du pod, et ajoutez les variables d'environnement suivantes à chaque conteneur du Datadog Agent dans votre fichier `daemonset.yaml`, y compris `agent`, `security-agent` et `system-probe` :

```yaml
# Pod spec
hostPID: true

# Add to each Agent container's env section.
- name: DD_SBOM_ENABLED
  value: "true"
- name: DD_SBOM_CONTAINER_IMAGE_ENABLED
  value: "true"
- name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
  value: "true"
```

Redémarrez l'Agent.

{{% /tab %}}

{{< /tabs >}}

Pour vérifier la configuration, filtrez les résultats de vulnérabilité par [runtime signals][10].

[1]: /fr/security/cloud_security_management/misconfigurations/
[2]: /fr/security/threats
[3]: /fr/security/cloud_security_management/vulnerabilities
[4]: /fr/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /fr/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[8]: /fr/security/workload_protection/
[9]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[10]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[11]: /fr/security/workload_protection/setup/