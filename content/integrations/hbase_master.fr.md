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

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez  `hbase_master` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Évènements
Le check Hbase Master n'inclut aucun événement pour le moment.

### Checks de Service
Le check Hbase Master n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/metadata.csv
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/



## Intégration Hbase_regionserver

## Aperçu

Obtenir les métriques du service hbase_regionserver en temps réel pour:

* Visualiser et monitorer les états de hbase_regionserver.
* Être informé des failovers et des événements de hbase_regionserver.

## Implémentation

### Configuration

Modifiez le fichier `hbase_regionserver.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Exécutez le sous-commande `status` de l'Agent][1] et cherchez  `hbase_regionserver` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Évènements
Le check Hbase Region Server n'inclut aucun événement pour le moment.

### Checks de Service
Le check Hbase Region Server n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].

[1]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/metadata.csv
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/

