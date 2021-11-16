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
  - 'https://github.com/DataDog/integrations-extras/blob/master/flume/README.md'
display_name: flume
draft: false
git_integration_title: flume
guid: 39644ce3-222b-4b97-81b4-55dd8a1db3ea
integration_id: flume
integration_title: flume
is_public: true
kind: integration
maintainer: kealan.maas@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flume.
metric_to_check: flume.channel.capacity
name: flume
public_title: flume
short_description: 'Surveiller le récepteur, le canal et la source de l''Agent Apache Flume'
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Apache Flume][1].

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Flume sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec [une version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

3. [Téléchargez l'Agent Datadog][5].

2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Configurez l'Agent Flume pour activer JMX en ajoutant les arguments JVM suivants à votre [flume-env.sh][7] :

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Modifiez le fichier `flume.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Flume.
   Consultez le [fichier d'exemple `flume.d/conf.yaml`][8] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][9] afin d'obtenir des instructions détaillées.
   Si vous souhaitez surveiller davantage de métriques, contactez [l'assistance Datadog][10].

3. [Redémarrez l'Agent][11].

### Validation

[Lancez la sous-commande `status` de l'Agent][12] et cherchez `flume` dans la section Checks.

### Métriques des composants

Les métriques récupérées par ce check dépendent de la source, du canal et du récepteur utilisés par votre Agent Flume. Pour obtenir la liste complète des métriques exposées pour chaque composant, consultez la section [Available Component Metrics][11] (en anglais) de la documentation Apache Flume. Pour obtenir la liste des métriques consultables dans Datadog, référez-vous à la rubrique [Métriques](#metriques) de cette page.

## Données collectées

### Métriques
{{< get-metrics-from-git "flume" >}}


### Checks de service

**flume.can_connect** :

Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Flume qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Flume n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://flume.apache.org/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[8]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/integrations/java/
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv