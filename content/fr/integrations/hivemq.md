---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  logs:
    source: hivemq
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - messaging
  - processing
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md'
display_name: HiveMQ
git_integration_title: hivemq
guid: 905e4d87-2777-4253-ad44-f91ee66ad888
integration_id: hivemq
integration_title: HiveMQ
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hivemq.
metric_to_check: hivemq.messages.queued.count
name: hivemq
public_title: Intégration Datadog/HiveMQ
short_description: Surveillez vos clusters HiveMQ.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[HiveMQ][1] est une plateforme de messagerie MQTT conçue pour le déplacement rapide, efficace et fiable de données depuis et vers des appareils IoT connectés. Cet agent est conforme aux protocoles MQTT 3.1, 3.1.1 et 5.0.

## Configuration

### Installation

Le check HiveMQ est inclus avec le paquet de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Host

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `hivemq.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance HiveMQ.
   Consultez le [fichier d'exemple hivemq.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][4] afin d'obtenir des instructions détaillées.
   Si vous souhaitez surveiller davantage de métriques, contactez [l'assistance Datadog][5].

2. [Redémarrez l'Agent][6].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez le bloc de configuration suivant à votre fichier `hivemq.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple hivemq.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

3. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][7].

##### Collecte de logs

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][8].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "hivemq", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `hivemq` dans la section **JMXFetch** :

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Données collectées

### Métriques
{{< get-metrics-from-git "hivemq" >}}


### Checks de service

**hivemq.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance HiveMQ qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

HiveMQ n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://www.hivemq.com/hivemq/
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/integrations/java
[5]: https://docs.datadoghq.com/fr/help
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/fr/agent/docker/log/
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/hivemq/metadata.csv