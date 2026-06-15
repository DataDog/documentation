---
assets:
  dashboards:
    'Retool + Datadog: ElasticSearch Action Console': assets/dashboards/retool_retool_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - Outils de développement
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/retool/README.md
display_name: Retool
draft: false
git_integration_title: retool
guid: c058f7b5-c3b3-46c4-910f-a5eba256a152
integration_id: retool
integration_title: Retool
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@retool.com
manifest_version: 1.0.0
metric_prefix: retool
metric_to_check: ''
name: retool
public_title: Retool
short_description: Retool vous permet de développer des outils internes rapidement
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation
La surveillance et les analyses permettent de mettre en lumière des informations clés, mais les développeurs doivent souvent basculer entre plusieurs outils cloisonnés et propriétaires différents pour prend les mesures qui s'imposent, ce qui les empêche d'intervenir efficacement lorsqu'un problème est détecté.

Retool aide les développeurs à créer des applications sur mesure qui s'intègrent directement à un dashboard Datadog, afin de prendre des mesures et d'automatiser des processus sans jamais quitter Datadog.

![Screenshot1][1]

### Métriques
L'application Retool intégrée de Datadog pour la gestion d'Elasticsearch tire parti de votre visibilité existante sur les métriques et les logs clés d'Elasticsearch tout en vous offrant la possibilité de gérer vos clusters, vos comptes et plus encore directement depuis le dashboard Datadog.

### Dashboards
Retool a mis au point une application intégrée pour la gestion d'Elasticsearch. Vous étiez déjà en mesure de surveiller les métriques, les traces et les logs d'Elasticsearch depuis Datadog ; désormais, grâce à notre application intégrée, vous pouvez prendre les mesures nécessaires en fonction de ces données directement depuis le dashboard Datadog. Cette application vous permet notamment d'accomplir ce qui suit :

- Ajouter un nouvel index avec des partitions et des réplicas
- Gérer les nœuds en modifiant le routage des partitions et en excluant des index
- Créer des snapshots et restaurer des index

## Configuration
L'intégration Retool est fournie avec un dashboard prêt à l'emploi, qui vous proposera de vous connecter à Retool ou de créer un compte via un iframe.

Vous êtes invité à vous connecter à votre cluster ElasticSearch avec une chaîne de connexion. Cette application est automatiquement ajoutée à votre instance. Ensuite, cliquez sur « Resources » dans la barre de navigation et créez une ressource Datadog (en ajoutant votre clé d'API et votre clé d'application). Enfin, connectez votre ressource Datadog aux deux requêtes Datadog en la sélectionnant dans la liste déroulante de l'éditeur de requêtes.

Retournez sur Datadog pour voir l'application en cours d'exécution dans votre dashboard. Vous pouvez la modifier à tout moment afin de l'adapter à vos processus DevOps.

## Données collectées

### Métriques
L'intégration Retool n'inclut actuellement aucune métrique.

### Événements
L'intégration Retool n'inclut actuellement aucun événement.

### Checks de service
Le check Retool n'inclut actuellement aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/retool/images/1.png
[2]: https://docs.datadoghq.com/fr/help/
