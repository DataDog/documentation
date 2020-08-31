---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
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
git_integration_title: kernelcare
guid: 8b35942d-40cd-4c86-b584-af1837ea67ca
integration_id: kernelcare
integration_title: Kernelcare
is_public: false
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

Pour installer le check kernelcare sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build kernelcare` pour générer le package.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/kernelcare/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `kernelcare.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kernelcare. Consultez le [fichier d'exemple kernelcare.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `kernelcare` dans la section Checks.

## Données collectées

### Metrics
{{< get-metrics-from-git "kernelcare" >}}


### Checks de service

**`kernelcare.can_connect`** :

Renvoie `Critical` si l'Agent ne parvient pas à se connecter à Kernelcare pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

kernelcare n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://www.kernelcare.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/