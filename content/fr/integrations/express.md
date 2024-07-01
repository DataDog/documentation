---
aliases:
- /fr/integrations/expressjs/
categories:
- web
ddtype: library
dependencies: []
description: Surveillez les délais de réponse globaux et les taux de requête par code
  de réponse.
doc_link: https://docs.datadoghq.com/integrations/express/
draft: false
git_integration_title: express
has_logo: true
integration_id: express
integration_title: ExpressJS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: express
public_title: Intégration Datadog/ExpressJS
short_description: Surveillez les délais de réponse globaux et les taux de requête
  par code de réponse.
version: '1.0'
---

{{< img src="integrations/expressjs/expressjs_graph.png" alt="graphique ExpressJS" popup="true">}}

## Présentation

<div class="alert alert-danger">L'intégration Express est obsolète et est remplacée par l'APM Datadog. L'APM Datadog génère les mêmes <a href="https://docs.datadoghq.com/tracing/runtime_metrics/nodejs/">métriques</a> que l'intégration Express et offre de nombreuses autres fonctionnalités et intégrations. Datadog vous conseille vivement de passer à l'<a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/">APM</a>, étant donné que l'intégration Express ne recevra plus aucune mise à jour.</div>

Ajoutez le [middleware connect-datadog][1] de Datadog à votre application pour :

- Recevoir des alertes sur vos délais de réponse
- Surveiller vos codes de réponse

## Configuration

L'intégration Express doit accéder au serveur DogStatsD de l'Agent Datadog pour transmettre les métriques recueillies à Datadog.

Après avoir [installé l'Agent][2] sur votre host, consultez la [documentation sur la configuration de DogStatsD][3] pour l'activer.

### Procédure à suivre

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

    // Add your other middleware
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

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://www.npmjs.com/package/connect-datadog
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent#setup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/express/express_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/