---
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - log collection
  - autodiscovery
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

## Configuration
### Installation

Le check Harbor est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `harbor.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Harbor. Consultez le [fichier d'exemple harbor.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.
  **Remarque** : vous pouvez spécifier n'importe quel type d'utilisateur dans la configuration, mais un compte avec les autorisations admin est requis pour récupérer les métriques de disque. La métrique `harbor.projects.count` reflète uniquement le nombre de projets auxquels l'utilisateur indiqué a accès.

2. [Redémarrez l'Agent][5].

##### Collecte de logs

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

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                 |
|----------------------|---------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `harbor`                                                                              |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                         |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%", "username": "<ID_UTILISATEUR>", "password": "<MOTDEPASSE_UTILISATEUR>"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][7].

| Paramètre      | Valeur                                               |
|----------------|-----------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "harbor", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `harbor` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "harbor" >}}


### Checks de service

**harbor.can_connect** :<br>
Renvoie `OK` si l'API Harbor est accessible et que l'authentification a réussi. Si ce n'est pas le cas, renvoie `CRITICAL`.

**harbor.status** :<br>
Renvoie `OK` si le composant Harbor spécifié est sain, renvoie `CRITICAL` si ce n'est pas le cas ou renvoie `UNKNOWN` pour les versions antérieures à 1.5 de Harbor.

**harbor.registry.status** :<br>
Renvoie `OK` si le service est sain. Si ce n'est pas le cas, renvoie `CRITICAL`. Surveille la santé des registres externes utilisés par Harbor pour la réplication.

### Événements

L'intégration Harbor n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files
[4]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/docker/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/harbor/metadata.csv
[10]: https://docs.datadoghq.com/fr/help