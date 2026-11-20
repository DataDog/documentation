---
aliases:
- /fr/security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
- /fr/security/cloud_security_management/setup/csm_enterprise/agent/docker
code_lang: docker
code_lang_weight: 65
title: Configuration Cloud Security sur Docker
type: multi-code-lang
---
Utilisez les instructions suivantes pour activer Misconfigurations et Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prérequis {#prerequisites}

- Datadog Agent version `7.46` ou ultérieure.

## Installation {#installation}

La commande suivante démarre le Runtime Security Agent et `system-probe` dans un environnement Docker :

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_CONTAINER_IMAGE_ENABLE=true
  -e DD_SBOM_ENABLED=true
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true
  -e DD_SBOM_HOST_ENABLED=true
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}

## Runtime Package Prioritization{#runtime-package-prioritization}

Runtime package prioritization identifie quels packages dans une image de conteneur sont utilisés à l'exécution, afin que vous puissiez prioriser les vulnérabilités du code qui s'exécute par rapport aux vulnérabilités des packages installés mais jamais exécutés.

Lorsqu'il est activé, le Datadog Agent utilise eBPF pour observer l'accès aux fichiers sur vos charges de travail et ajoute ces signaux aux résultats de vulnérabilité pour cette image :

| Signal | Ce qu'il vous indique |
|--------|-------------------|
| Package is running | Les fichiers du paquet ont été observés comme étant accédés par un processus en cours d'exécution. |
| Accessed by root process | Le paquet a été accédé par un processus s'exécutant en tant que root (UID 0). |
| SUID binary present | Le paquet contient un binaire avec le bit SUID défini, ce qui peut permettre une élévation de privilèges. |

*Package is running* alimente la dimension **Reachability** du [Runtime Prioritization Engine][5]. Pour interroger directement ces signaux, consultez [Filtrer les découvertes par signaux d'exécution][6].

**Prérequis** :
- Datadog Agent **7.79.0 ou version ultérieure**.
- Linux uniquement (dépendance eBPF). Consultez [Workload Protection setup][7] pour les distributions et les versions de noyau prises en charge.

Les signaux d'exécution s'appliquent aux gestionnaires de paquets du système d'exploitation (`apt`, `yum` ou `apk`) dans les résultats de vulnérabilité des images de conteneur.

Ajoutez `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true` à votre Docker run command :

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

Pour vérifier la configuration, filtrez les résultats de vulnérabilité par [signaux d'exécution][6].

[1]: /fr/security/cloud_security_management/misconfigurations/
[2]: /fr/security/threats
[3]: /fr/security/cloud_security_management/setup#supported-deployment-types-and-features
[4]: /fr/security/workload_protection/
[5]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[6]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[7]: /fr/security/workload_protection/setup/