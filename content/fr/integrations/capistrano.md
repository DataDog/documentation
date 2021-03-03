---
categories:
  - orchestration
ddtype: crawler
dependencies: []
description: Enregistrez et recherchez des déploiements pour les superposer sur des graphiques de métriques clés.
doc_link: 'https://docs.datadoghq.com/integrations/capistrano/'
draft: false
git_integration_title: capistrano
has_logo: true
integration_title: Capistrano
is_public: true
kind: integration
manifest_version: '1.0'
name: capistrano
public_title: Intégration Datadog/Capistrano
short_description: Enregistrez et recherchez des déploiements pour les superposer sur des graphiques de métriques clés.
version: '1.0'
---
## Présentation

[Capistrano][1] est un outil de déploiement et d'automatisation de serveur à distance écrit en Ruby.

Installez l'intégration Capistrano/Datadog pour :

- Enregistrer et rechercher des événements de déploiement dans votre flux d'événements
- Superposez des événements de déploiement à d'autres métriques au sein de dashboards dans le but d'identifier les déploiements qui ont une incidence sur les performances de votre application

Lorsque vous activez cette intégration pour un `Capfile` donné, chaque tâche Capistrano terminée est envoyée sous forme d'événement à Datadog. Les informations sur les rôles ainsi que le résultat de la journalisation sont également transmis.

## Configuration

### Installation

Installez la gemme Ruby `dogapi` :

```shell
sudo gem install dogapi --version ">=1.10.0"
```

### Configuration

Ajoutez le bloc suivant au début des `Capfile` pour lesquels vous souhaitez envoyer les tâches à Datadog :

```text
require "capistrano/datadog"
set :datadog_api_key, "${votre_clé_api}"
```

### Validation

Après avoir configuré votre `Capfile` et exécuté au moins une tâche Capistrano :

1. Accédez à votre [flux d'événements][2].
2. Saisissez `sources:capistrano` dans la barre de recherche ou cliquez sur 'Capistrano' dans la liste FROM des intégrations sur la gauche.
3. Saisissez `priority:all` dans la barre de recherche ou cliquez sur 'All' dans la liste PRIORITY à gauche. Les tâches Capistrano sont par défaut envoyées avec la priorité Low. Ainsi, si vous consultez uniquement les événements avec une priorité Normal (le réglage par défaut), vous ne verrez pas vos tâches Capistrano dans le flux d'événements.

{{< img src="integrations/capistrano/capistranoevents.gif" >}}

## Données collectées

### Métriques

L'intégration Capistrano n'inclut aucune métrique.

### Événements

L'intégration Capistrano n'inclut aucun événement.

### Checks de service

L'intégration Capistrano n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: http://capistranorb.com
[2]: https://app.datadoghq.com/event/stream
[3]: https://docs.datadoghq.com/fr/help/