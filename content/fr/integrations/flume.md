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
draft: true
git_integration_title: flume
guid: 39644ce3-222b-4b97-81b4-55dd8a1db3ea
integration_id: flume
integration_title: flume
is_public: false
kind: integration
maintainer: kealan.maas@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flume.
metric_to_check: ''
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

Pour installer le check Flume sur votre host :

1. Installez le [kit de développement][2].

2. Exécutez `ddev release build flume` pour générer le package.

3. [Téléchargez l'Agent Datadog][3].

4. Importez l'artefact du build sur tous les hosts avec un Agent et
 exécutez `datadog-agent integration install -w
 path/to/flume/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Configurez l'Agent Flume pour activer JMX en ajoutant les arguments JVM suivants à votre [flume-env.sh][4] :

```
export JAVA_OPTS=”-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false”

```

2. Modifiez le fichier `flume.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Flume.
   Consultez le [fichier d'exemple `flume.d/conf.yaml`][5] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][6] afin d'obtenir des instructions détaillées.
   Si vous souhaitez surveiller davantage de métriques, contactez [l'assistance Datadog][7].

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `flume` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "flume" >}}
Les métriques dépendent de la source, du canal et du récepteur utilisés par votre Agent Flume. 
Pour obtenir la liste complète des métriques exposées par chaque composant, veuillez consulter les [métriques des composants disponibles][11] dans la documentation relative à Apache Flume.

### Checks de service

**flume.can_connect** :

Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Flume qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Flume n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].


[1]: https://flume.apache.org/
[2]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[5]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/integrations/java/
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[11]: https://flume.apache.org/FlumeUserGuide.html#available-component-metrics