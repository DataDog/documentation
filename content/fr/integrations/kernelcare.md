---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- security
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md
display_name: Kernelcare
draft: false
git_integration_title: kernelcare
guid: 8b35942d-40cd-4c86-b584-af1837ea67ca
integration_id: kernelcare
integration_title: Kernelcare
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: schvaliuk@cloudlinux.com
manifest_version: 1.0.0
metric_prefix: kernelcare.
metric_to_check: kernelcare.uptodate
name: kernelcare
public_title: Intégration Datadog/Kernelcare
short_description: Surveillez des métriques Kernelcare concernant l'activité et le
  statut de vos serveurs.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

[KernelCare][1] est un système de live patching qui applique automatiquement des patchs de sécurité aux vulnérabilités affectant le kernel Linux, sans aucun redémarrage. Il est utilisé sur plus de 500 000 serveurs et a permis de patcher des serveurs fonctionnant depuis plus de 6 ans pour Dell, Zoom et d'autres grandes entreprises. Il est compatible avec toutes les principales distributions Linux, telles que RHEL, CentOS, Amazon Linux et Ubuntu, ainsi qu'avec les scanners de vulnérabilité, les outils de surveillance Cloud et les solutions de gestion des patchs les plus courants.

Cette intégration vous permet de récupérer les métriques Kernelcare avec l'Agent Datadog.

## Configuration

Le check Kernelcare n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Kernelcare sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `kernelcare.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kernelcare. Consultez le [fichier d'exemple kernelcare.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `kernelcare` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kernelcare" >}}


### Événements

L'intégration Kernelcare n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "kernelcare" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.kernelcare.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/