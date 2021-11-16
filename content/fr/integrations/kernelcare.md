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
  - 'https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md'
display_name: Kernelcare
draft: false
git_integration_title: kernelcare
guid: 8b35942d-40cd-4c86-b584-af1837ea67ca
integration_id: kernelcare
integration_title: Kernelcare
is_public: true
kind: integration
maintainer: schvaliuk@cloudlinux.com
manifest_version: 1.0.0
metric_prefix: kernelcare.
metric_to_check: kernelcare.uptodate
name: kernelcare
public_title: Intégration Datadog/Kernelcare
short_description: Surveillez des métriques Kernelcare concernant l'activité et le statut de vos serveurs.
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

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Kernelcare sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][6].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].
### Configuration

1. Modifiez le fichier `kernelcare.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Kernelcare. Consultez le [fichier d'exemple kernelcare.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `kernelcare` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kernelcare" >}}


### Checks de service

**`kernelcare.can_connect`** :

Renvoie `Critical` si l'Agent ne parvient pas à se connecter à Kernelcare pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

kernelcare n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://www.kernelcare.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/