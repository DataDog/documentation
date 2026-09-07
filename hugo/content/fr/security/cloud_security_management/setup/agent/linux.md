---
aliases:
- /fr/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /fr/security/cloud_security_management/setup/csm_pro/agent/linux/
- /fr/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Configuration de Cloud Security sur Linux
type: multi-code-lang
---
Utilisez les instructions suivantes pour activer Misconfigurations et Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Prérequis {#prerequisites}

- Datadog Agent version `7.46` ou ultérieure.

## Installation {#installation}

Pour un déploiement basé sur des paquets, [installez le paquet Datadog][6] avec votre gestionnaire de paquets, puis modifiez les fichiers listés ci-dessous.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**Remarque** : `enrichment.usage.enabled: true` nécessite le Datadog Agent **7.79.0 ou une version ultérieure**. Consultez la section [Runtime Package Prioritization](#runtime-package-prioritization-preview) pour connaître les prérequis.

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**Remarque** : L'analyseur `languages` nécessite le Datadog Agent **7.70 ou une version ultérieure**. Lorsqu'elle est activée, cette fonctionnalité détecte les vulnérabilités dans les bibliothèques applicatives gérées par des gestionnaires de paquets tels que npm, pip, Maven/Gradle, NuGet, les modules Go, Cargo et Bundler, en plus des paquets système. Lorsque le champ `analyzers` est omis, seuls les paquets système sont scannés pour les images de conteneur. Consultez [Gestionnaires de paquets applicatifs pris en charge](#supported-application-library-package-managers) pour obtenir la liste complète.

### Gestionnaires de paquets de bibliothèques d'applications pris en charge {#supported-application-library-package-managers}

L<small>'</small>analyzer `languages` couvre les écosystèmes de paquets suivants :

| Écosystème | Gestionnaire de paquets / format |
|-----------|--------------------------|
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

*Le paquet est en cours d'exécution* alimente la dimension **Reachability** du [Runtime Prioritization Engine][8]. Pour interroger ces signaux directement, consultez [Filtrer les résultats par signaux d'exécution][9].

**Prérequis** :
- Datadog Agent **7.79.0 ou version ultérieure**.
- Linux uniquement (dépendance eBPF). Consultez [Workload Protection setup][10] pour connaître les distributions et les versions de noyau prises en charge.

Runtime signals s'appliquent aux gestionnaires de paquets du système d'exploitation (`apt`, `yum` ou `apk`) dans les résultats de vulnérabilité des images de conteneur.

Ajoutez le bloc `enrichment` à la section `sbom` de votre fichier `datadog.yaml` :

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

Redémarrez l'Agent après avoir appliqué les modifications.

Pour vérifier la configuration, filtrez les résultats de vulnérabilité par [signaux d'exécution][9].

**Remarques** :

- Vous pouvez également utiliser le [Agent install script][5] suivant pour activer automatiquement Misconfigurations et Threat Detection :

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Si vous utilisez le script d'installation de l'Agent pour activer Misconfigurations et Vulnerability Management, vous devez mettre à jour manuellement le fichier `datadog.yaml` pour activer `host_benchmarks` pour Misconfigurations, ainsi que `sbom` et `container_image` pour Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /fr/security/cloud_security_management/misconfigurations/
[2]: /fr/security/threats
[3]: /fr/security/cloud_security_management/vulnerabilities
[4]: /fr/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /fr/getting_started/agent/#installation
[6]: /fr/agent/?tab=Linux
[7]: /fr/security/workload_protection/
[8]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[9]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[10]: /fr/security/workload_protection/setup/