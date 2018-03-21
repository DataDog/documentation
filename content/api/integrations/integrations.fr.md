---
title: Intégrations
type: apicontent
order: 13
external_redirect: /api/#integrations
---

## Intégrations

Configurez vos intégrations avec l'API Datadog. Les intégrations disponibles sont:

* [AWS](/api/#aws)
* [PagerDuty](/api/#pagerduty)
* [Slack](/api/#slack)
* [Webhooks](/api/#webhooks)

Les endpoints disponibles sont:

* Pour créer une intégration dans Datadog :
    **`POST /api/v1/integration/<source_type_name>`**

* Pour éditer une configuration d'intégration :
    **`PUT /api/v1/integration/<source_type_name>`**

* Pour récupérer l'état d'une intégration :
    **`GET /api/v1/integration/<source_type_name>`**

* Pour supprimer une intégration de Datadog :
    **`DELETE /api/v1/integration/<source_type_name>`**
