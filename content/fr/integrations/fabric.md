---
categories:
  - orchestration
ddtype: crawler
dependencies: []
description: Consultez des tâches Fabric dans votre flux d'événements Datadog et effectuez des recherches au sein de celles-ci.
doc_link: 'https://docs.datadoghq.com/integrations/fabric/'
git_integration_title: fabric
has_logo: true
integration_title: Fabric
is_public: true
kind: integration
manifest_version: '1.0'
name: fabric
public_title: Intégration Datadog/Fabric
short_description: Consultez des tâches Fabric dans votre flux d'événements Datadog et effectuez des recherches au sein de celles-ci.
version: '1.0'
---
## Présentation
**Attention** : cette intégration est obsolète et n'est plus activement développée.

Associez Fabric à Datadog pour :

* Enregistrer et rechercher des événements de déploiement dans le flux d'événements
* Corréler les événements de déploiement avec les changements de métriques sur les dashboards

## Implémentation
### Configuration

1. Installez le package dogapi :

```
sudo easy_install --upgrade dogapi
```
ou :

```
sudo pip install dogapi
```

2. Importez dogapi et configurez votre clé d'API :

```
from dogapi.fab import setup, notify
setup("<VOTRE_CLÉ_API_DATADOG")
```

Ajoutez ensuite le décorateur de notification pour chaque tâche que vous souhaitez associer à Datadog. Assurez-vous que @notify ait lieu juste avant @task.

```
@notify
@task
def a_fabric_task(...):
    # À vous de jouer
```

## Données collectées
### Métriques

L'intégration Fabric n'inclut aucune métrique.

### Événements
L'intégration Fabric n'inclut aucun événement.

### Checks de service
L'intégration Fabric n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}