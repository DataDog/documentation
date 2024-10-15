---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md
display_name: Kubelet
draft: false
git_integration_title: kubelet
guid: 55039e21-7e89-41fb-968c-ab8bf8f25da0
integration_id: kubelet
integration_title: Kubelet
integration_version: 7.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kubernetes.
metric_to_check: kubernetes.cpu.usage.total
name: kubelet
public_title: Intégration Datadog/Kubelet
short_description: Recueillez des statistiques sur les conteneurs depuis kubelet.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration recueille les métriques de conteneur depuis kubelet.

- Visualisez et surveillez les statistiques de kubelet.
- Soyez informé des failovers et des événements de kubelet.

## Configuration

### Installation

Le check Kubelet est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `kubelet.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] afin de spécifier votre serveur et votre port. Définissez ensuite les tags à envoyer avec les métriques.

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `kubelet` dans la section Checks.

### Compatibilité

Le check Kubelet peut être exécuté avec deux modes :

- Le mode prometheus par défaut, qui est compatible avec la version 1.7.6 ou une version ultérieure de Kubernetes.
- Le mode cAdvisor (activé à l'aide de l'option `cadvisor_port`), qui est normalement compatible avec la version 1.3 et les versions ultérieures. Pour bénéficier de tags et de filtres cohérents, la version 6.2 ou une version ultérieure de l'Agent est requise.

## Prise en charge d'OpenShift < 3.7

Le port 4194 cAdvisor est désactivé par défaut sur OpenShift. Pour l'activer, vous devez ajouter
les lignes suivantes à votre [fichier node-config][4] :

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

Si vous ne pouvez pas ouvrir le port, vous pouvez désactiver les deux sources de collecte de métriques de conteneur en définissant :

- `cadvisor_port` sur `0`
- `metrics_endpoint` sur `""`

Ce check pourra toujours recueillir :

- Les checks de service de santé Kubelet
- Les métriques liées aux pods en cours d'exécution ou interrompus
- Les requêtes et limites de pod
- Les métriques de capacité de nœud

## Données collectées

### Checks de service
{{< get-service-checks-from-git "kubelet" >}}


### Exclure des conteneurs

Vous pouvez empêcher la collecte de données pour un sous-ensemble de conteneurs déployés en définissant la [variable d'environnement `DD_CONTAINER_EXCLUDE`](https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent). Les métriques issues des conteneurs spécifiés dans cette variable d'environnement ne seront pas transmises par cette intégration.

Pour les métriques réseau transmises au niveau du pod, il n'est pas possible d'exclure des conteneurs en utilisant leur nom ou le nom de leur image étant donné que d'autres conteneurs peuvent faire partie du même pod. Ainsi, si `DD_CONTAINER_EXCLUDE` s'applique à un espace de nommage, les métriques au niveau du pod ne seront pas transmises si le pod fait partie de cet espace de nommage. Toutefois, si `DD_CONTAINER_EXCLUDE` fait référence à un nom de conteneur ou à un nom d'image, les métriques au niveau du pod seront transmises même si les règles d'exclusion définies s'appliquent à certains conteneurs du pod.


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[5]: https://github.com/DataDog/integrations-core/blob/master/kubelet/assets/service_checks.json
[6]: https://docs.datadoghq.com/fr/help/