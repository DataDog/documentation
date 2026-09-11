---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/flume/README.md
display_name: flume
draft: false
git_integration_title: flume
guid: 39644ce3-222b-4b97-81b4-55dd8a1db3ea
integration_id: flume
integration_title: flume
integration_version: 0.0.1
is_public: true
custom_kind: integration
maintainer: kealan.maas@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flume.
metric_to_check: flume.channel.capacity
name: flume
public_title: flume
short_description: Surveiller le récepteur, le canal et la source de l'Agent Apache Flume
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Apache Flume][1].

## Configuration

Le check Flume n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Flume sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Configurez l'Agent Flume pour activer JMX en ajoutant les arguments JVM suivants à votre [flume-env.sh][5] :

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Modifiez le fichier `flume.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Flume.
   Consultez le [fichier d'exemple `flume.d/conf.yaml`][6] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][7] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][8].

3. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `flume` dans la section Checks.

### Métriques des composants

Les métriques récupérées par ce check dépendent de la source, du canal et du récepteur utilisés par votre Agent Flume. Pour obtenir la liste complète des métriques exposées pour chaque composant, consultez la section [Available Component Metrics][9] (en anglais) de la documentation Apache Flume. Pour obtenir la liste des métriques consultables dans Datadog, référez-vous à la rubrique [Métriques](#metriques) de cette page.

## Données collectées

### Métriques
{{< get-metrics-from-git "flume" >}}


### Événements

Flume n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "flume" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://flume.apache.org/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[6]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/integrations/java/
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/flume/assets/service_checks.json