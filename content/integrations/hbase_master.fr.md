---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/hbase_master/
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
has_logo: false
integration_title: Hbase Master
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: hbase_master
public_title: Intégration Datadog-Hbase Master
short_description: intégration HBase master
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service hbase_master en temps réel pour:

* Visualiser et monitorer les états de hbase_master.
* Être informé des failovers et des événements de hbase_master.

## Implémentation

### Configuration

Modifiez le fichier `hbase_master.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) vous devriez observer la réponse suivante:

    Checks
    ======

        hbase_master
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 0 service checks

## Compatibilité

Le check hbase_master est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Evénements
Le check Hbase Master n'inclut aucun événement pour le moment.

### Checks de Service
Le check Hbase Master n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


## Intégration Hbase_regionserver

## Aperçu

Obtenir les métriques du service hbase_regionserver en temps réel pour:

* Visualiser et monitorer les états de hbase_regionserver.
* Être informé des failovers et des événements de hbase_regionserver.

## Implémentation

### Configuration

Modifiez le fichier `hbase_regionserver.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) vous devriez observer la réponse suivante:

    Checks
    ======

        hbase_regionserver
        -----------
          - instance #0 [OK]
          - Collected 150 metrics, 0 events & 0 service checks

## Compatibilité

Le check hbase_regionserver est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Evénements
Le check Hbase Region Server n'inclut aucun événement pour le moment.

### Checks de Service
Le check Hbase Region Server n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
