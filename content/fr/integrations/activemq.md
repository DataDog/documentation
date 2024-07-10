---
app_id: activemq
app_uuid: ab0b15e8-b7ae-4570-bde2-433a079cdb83
assets:
  dashboards:
    activemq: assets/dashboards/activemq_dashboard.json
    artemis: assets/dashboards/artemis_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - activemq.queue.size
      - activemq.artemis.queue.message_count
      metadata_path: metadata.csv
      prefix: activemq.
    process_signatures:
    - activemq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ActiveMQ
  logs:
    source: activemq
  monitors:
    '[ActiveMQ Artemis] High disk store usage': assets/recommended_monitors/activemq_artemis_high_disk_store.json
    '[ActiveMQ Artemis] High unrouted messages': assets/recommended_monitors/activemq_artemis_unrouted_messages.json
  saved_views:
    activemq_processes: assets/saved_views/activemq_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- messaging
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/activemq/README.md
display_on_public_website: true
draft: false
git_integration_title: activemq
integration_id: activemq
integration_title: ActiveMQ
integration_version: 3.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: activemq
public_title: ActiveMQ
short_description: Recueillez des métriques sur les agents, les files d'attente, les
  producteurs, les consommateurs, et plus encore.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Messaging
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Recueillez des métriques sur les agents, les files d'attente, les producteurs,
    les consommateurs, et plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ActiveMQ
---



## Présentation

Le check ActiveMQ recueille des métriques sur les agents, les files d'attente, les producteurs, les consommateurs, et plus encore.

**Remarque :** ce check prend également en charge ActiveMQ Artemis (future version `6` d'ActiveMQ) et transmet les métriques sous l'espace de nommage `activemq.artemis`. Consultez [metadata.csv][1] pour découvrir la liste complète des métriques fournies par cette intégration.

**Remarque** : si vous utilisez une version d'ActiveMQ antérieure à 5.8.0, consultez les [exemples de fichiers pour l'Agent 5.10.x][2].

## Implémentation

### Installation

Le check ActiveMQ de l'Agent est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos nœuds ActiveMQ.

Le check recueille des métriques à partir de JMX via [JMXFetch][4]. Une JVM est donc nécessaire sur chaque nœud pour que l'Agent puisse exécuter JMXFetch. Datadog vous conseille d'utiliser une JVM fournie par Oracle.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. **Vérifiez que l'[accès distant à JMX est activé][1] sur votre serveur ActiveMQ.**
2. Configurez l'Agent pour le connecter à ActiveMQ. Modifiez `activemq.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple activemq.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles. La liste des métriques recueillies par défaut est disponible dans le [fichier `metrics.yaml`][4].

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

3. [Redémarrez l'Agent.][5]

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `activemq.d/conf.yaml` pour commencer à recueillir vos logs ActiveMQ :

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Redémarrez l'Agent][5].

[1]: https://activemq.apache.org/jmx.html
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `activemq`                           |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%","port":"1099"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "activemq", "service": "<VOTRE_NOM_APPLICATION>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `activemq` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "activemq" >}}
 Les noms des métriques associées à ActiveMQ Artemis comportent l'indicateur `artemis`. Toutes les autres métriques transmises correspondent à la version classique d'ActiveMQ.

### Événements

Le check ActiveMQ n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "activemq" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Architecture et métriques clés d'ActiveMQ][7]
- [Surveiller les métriques et performances d'ActiveMQ][8]




## Intégration ActiveMQ XML

## Présentation

Recueillez des métriques d'ActiveMQ XML en temps réel pour :

- Visualiser et surveiller les états d'ActiveMQ XML
- Être informé des failovers et des événements d'ActiveMQ XML

## Implémentation

### Installation

Le check ActiveMQ XML est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour la configuration dans un environnement conteneurisé.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `activemq_xml.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][9] avec votre `url` stats. Consultez le [fichier d'exemple activemq_xml.d/conf.yaml][10] pour découvrir toutes les options de configuration disponibles.

   **Remarque** : l'intégration ActiveMQ XML peut potentiellement générer des [métriques custom][11], ce qui peut avoir une incidence sur votre [facture][12]. Par défaut, une limite de 350 métriques est appliquée. Si vous souhaitez utiliser davantage de métriques, contactez l'[assistance Datadog][6].

2. [Redémarrez l'Agent][13].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `activemq_xml.d/conf.yaml` ou `activemq.d/conf.yaml` pour commencer à recueillir vos logs ActiveMQ :

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Redémarrez l'Agent][13].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][14].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `activemq_xml` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "activemq_xml" >}}


### Événements

Le check ActiveMQ XML n'inclut aucun événement.

### Checks de service

Le check ActiveMQ XML n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Surveiller les métriques et performances d'ActiveMQ][8]


[1]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[2]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/jmxfetch
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[8]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[11]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[12]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent