---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - caching
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ignite/README.md'
display_name: Ignite
git_integration_title: ignite
guid: fd5a21d5-ddfe-4d04-855f-28492b4d270e
integration_id: ignite
integration_title: ignite
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ignite.
metric_to_check: ignite.received_messages
name: ignite
public_title: Intégration Datadog/Ignite
short_description: Recueillez des métriques à partir de votre serveur Ignite.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Ignite][1].

## Configuration

### Installation

Le check Ignite est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Configuration d'Ignite

L'exportateur de métriques JMX est activé par défaut, mais vous devrez peut-être choisir le port à exposer ou activer l'authentification en fonction des paramètres de sécurité de votre réseau. L'image Docker officielle utilise le port `49112` par défaut.

Pour le logging, nous vous conseillons fortement d'activer [log4j][3] afin que les logs affichent les dates complètes.

#### Host

1. Modifiez le fichier `ignite.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ignite. Consultez le [fichier d'exemple ignite.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][5] afin d'obtenir des instructions détaillées.
   Si vous souhaitez surveiller davantage de métriques, contactez [l'assistance Datadog][6].

2. [Redémarrez l'Agent][7].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `ignite.d/conf.yaml` pour commencer à recueillir vos logs Ignite :

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple ignite.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

Pour recueillir des métriques avec l'intégration Datadog/Ignite, consultez le guide [Autodiscovery avec JMX][9].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][10].

| Paramètre      | Valeur                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<NOM_SERVICE>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |


### Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `ignite` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ignite" >}}


### Checks de service

**ignite.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Ignite qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

L'intégration Ignite n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://ignite.apache.org/
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/java/
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[9]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[10]: https://docs.datadoghq.com/fr/agent/docker/log/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/ignite/metadata.csv