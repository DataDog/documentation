---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md'
display_name: pihole
git_integration_title: pihole
guid: f0a69a1e-3961-43e2-9848-469342734e34
integration_id: pihole
integration_title: Pi-hole
is_public: false
kind: integration
maintainer: monganai@tcd.ie
manifest_version: 1.0.0
metric_prefix: pihole.
metric_to_check: ''
name: pihole
public_title: Intégration Datadog/Pi-hole
short_description: Intégration pour recueillir les métriques Pi-hole par défaut
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Pi-hole][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Pour installer le check Pi-hole sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build pihole` pour générer le package.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/pihole/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `pihole.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Pi-hole. Consultez le [fichier d'exemple pihole.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `pihole` dans la section Checks.


### Métriques
{{< get-metrics-from-git "pihole" >}}


### Checks de service

**`pihole.running`** :

Renvoie `CRITICAL` si l'Agent ne parvient pas à communiquer avec le host cible ou renvoie `OK` si la connexion à Pi-hole est établie.

### Événements

Pi-hole n'inclut aucun événement.





[1]: https://pi-hole.net/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv