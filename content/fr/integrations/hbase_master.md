---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md'
display_name: "HBase\_master"
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: "Hbase\_master"
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 1.0.0
metric_prefix: hbase.
name: hbase_master
public_title: "Intégration Datadog/Hbase\_Master"
short_description: "Intégration HBase\_master."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Hbase_master en temps réel pour :

* Visualiser et surveiller les états de Hbase_master
* Être informé des failovers et des événements de Hbase_master

### Installation

Pour installer le check Hbase_master sur votre host :

1. [Téléchargez l'Agent Datadog][1].
2. Créez un dossier `hbase_master.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
3. Créez un fichier `conf.yaml` dans le dossier `hbase_master.d/` précédemment créé.
4. Consultez le [fichier d'exemple hbase_master.yaml][2] et copiez son contenu dans le fichier `conf.yaml`.
5. [Redémarrez l'Agent][3].

### Configuration

Pour configurer le check Hbase_master :

1. Ouvrez le fichier `conf.yaml` créé pendant l'installation.
2. Modifiez le fichier `conf.yaml` afin qu'il redirige vers votre serveur et votre port. Définissez ensuite les masters à surveiller.
3. [Redémarrez l'Agent][3].

## Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `hbase_master` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Événements
Le check Hbase_master n'inclut aucun événement.

### Checks de service
Le check Hbase_master n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/metadata.csv
[6]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}


## Intégration HBase RegionServer

## Présentation

Recueillez des métriques du service HBase RegionServer en temps réel pour :

* Visualiser et surveiller les états de HBase RegionServer
* Être informé des failovers et des événements de HBase RegionServer

## Implémentation

Le check HBase RegionServer n'est **PAS** inclus dans le paquet de l'[Agent Datadog][1].

### Installation

Pour installer le check HBase RegionServer sur votre host :

1. [Téléchargez l'Agent Datadog][1].
2. Créez un dossier `hbase_regionserver.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent. 
3. Créez un fichier `conf.yaml` dans le dossier `hbase_regionserver.d/` précédemment créé.
4. Consultez le [fichier d'exemple hbase_regionserver.yaml][2] et copiez son contenu dans le fichier `conf.yaml`.
5. [Redémarrez l'Agent][3].

### Configuration

Pour configurer le check HBase RegionServer :

1. Ouvrez le fichier `conf.yaml` créé pendant l'installation.
2. Modifiez le fichier `conf.yaml` afin qu'il redirige vers votre serveur et votre port. Définissez ensuite les masters à surveiller.
3. [Redémarrez l'Agent][3].

## Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `hbase_regionserver` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Événements
Le check HBase RegionServer n'inclut aucun événement.

### Checks de service
Le check HBase RegionServer n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/metadata.csv
[6]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}