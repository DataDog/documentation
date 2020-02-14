---
aliases:
  - /fr/integrations/expressjs/
categories:
  - web
ddtype: library
dependencies: []
description: Surveillez les délais de réponse globaux et les taux de requête par code de réponse.
doc_link: 'https://docs.datadoghq.com/integrations/express/'
git_integration_title: express
has_logo: true
integration_title: ExpressJS
is_public: true
kind: integration
manifest_version: '1.0'
name: express
public_title: Intégration Datadog/ExpressJS
short_description: Surveillez les délais de réponse globaux et les taux de requête par code de réponse.
version: '1.0'
---
{{< img src="integrations/expressjs/expressjs_graph.png" alt="graphique ExpressJS" popup="true">}}

## Présentation

Ajoutez le [middleware connect-datadog][1] de Datadog à votre application pour :

- Recevoir des alertes sur vos délais de réponse
- Surveiller vos codes de réponse

## Implémentation

### Configuration

**Remarque** : l'intégration Express nécessite l'Agent Datadog.

1. Installez le middleware :

    ```shell
    npm install connect-datadog
    ```

2. Modifiez votre code de façon à ajouter le middleware Datadog :

    ```js
    var dd_options = {
      'response_code':true,
      'tags': ['app:my_app']
    }

    var connect_datadog = require('connect-datadog')(dd_options);

    // Add your other middlewares
    app.use(...);

    // Add the datadog-middleware before your router
    app.use(connect_datadog);
    app.use(router);
    ```

## Données collectées

### Métriques
{{< get-metrics-from-git "express" >}}


### Événements

L'intégration Express n'inclut aucun événement.

### Checks de service

L'intégration Express n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://www.npmjs.com/package/connect-datadog
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/express/express_metadata.csv
[3]: https://docs.datadoghq.com/fr/help