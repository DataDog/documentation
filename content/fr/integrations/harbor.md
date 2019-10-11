---
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/harbor/README.md'
display_name: Harbor
git_integration_title: harbor
guid: 8fcaa5d7-a121-45ea-bde2-f12d55bc6286
integration_id: harbor
integration_title: Harbor
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: harbor.
metric_to_check: harbor.projects.count
name: harbor
public_title: Intégration Datadog/Harbor
short_description: Surveiller la santé de votre registre de conteneur Harbor
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Harbor][1] avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Harbor est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `harbor.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de performance Harbor. Consultez le [fichier d'exemple harbor.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

Vous pouvez spécifier n'importe quel type d'utilisateur dans la configuration, toutefois, un compte avec les autorisations admin est requis pour récupérer les métriques de disque. La métrique `harbor.projects.count` reflète uniquement le nombre de projets auxquels l'utilisateur indiqué a accès.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `harbor.d/conf.yaml` pour commencer à recueillir vos logs Harbor :

    ```
      logs:
        - type: file
          path: /var/log/harbor/*.log
          source: harbor
          service: <SERVICE_NAME>
    ```

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `harbor` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "harbor" >}}


### Checks de service

- `harbor.can_connect`
Renvoie `OK` si l'API Harbor est accessible et l'authentification est réussie. Si ce n'est pas le cas, renvoie `CRITICAL`.

- `harbor.status`
Renvoie `OK` si le composant Harbor spécifié est sain, renvoie `CRITICAL` si ce n'est pas le cas ou renvoie `UNKNOWN` pour les versions antérieures à 1.5 de Harbor.

- `harbor.registry.status`
Renvoie `OK` si le service est sain. Si ce n'est pas le cas, renvoie `CRITICAL`. Surveille la santé des registres externes utilisés par Harbor pour la réplication.


### Événements

L'intégration Harbor n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://goharbor.io
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files
[5]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/harbor/metadata.csv
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}