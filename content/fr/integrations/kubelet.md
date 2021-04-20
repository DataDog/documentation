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
  - 'https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md'
display_name: Kubelet
draft: false
git_integration_title: kubelet
guid: 55039e21-7e89-41fb-968c-ab8bf8f25da0
integration_id: kubelet
integration_title: Kubelet
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.2.0
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
- Les métriques en cours d'exécution ou interrompues de pod
- Les requêtes et limites de pod
- Les métriques de capacité de nœud

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[5]: https://docs.datadoghq.com/fr/help/