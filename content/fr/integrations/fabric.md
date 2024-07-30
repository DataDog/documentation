---
categories:
- orchestration
dependencies: []
description: Consultez et recherchez des tâches Fabric depuis votre flux d'événements
  Datadog.
doc_link: https://docs.datadoghq.com/integrations/fabric/
draft: false
git_integration_title: fabric
has_logo: true
integration_id: fabric
integration_title: Fabric
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: fabric
public_title: Intégration Datadog/Fabric
short_description: Consultez et recherchez des tâches Fabric depuis votre flux d'événements
  Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

**Attention** : cette intégration est obsolète et n'est plus activement développée.

Associez Fabric à Datadog pour :

- Enregistrer et rechercher des événements de déploiement dans le flux d'événements
- Corréler les événements de déploiement avec les changements de métriques sur les dashboards

## Formule et utilisation

### Dépannage de la solution Browser

1. Installez le package dogapi :

    ```shell
    sudo easy_install --upgrade dogapi
    ```

   ou :

    ```shell
    sudo pip install dogapi
    ```

2. Importez dogapi et configurez votre clé d'API :

    ```python
    from dogapi.fab import setup, notify
    setup("<YOUR_DATADOG_API_KEY")
    ```

3. Ajoutez le décorateur de notification pour chaque tâche que vous souhaitez associer à Datadog. Assurez-vous que @notify ait lieu juste avant @task.

    ```python
    @notify
    @task
    def a_fabric_task(...):
        # do things
    ```

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration Fabric n'inclut aucune métrique.

### Aide

L'intégration Fabric n'inclut aucun événement.

### Aide

L'intégration Fabric n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://docs.datadoghq.com/fr/help/