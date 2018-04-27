---
title: Intégrations
type: apicontent
order: 14
external_redirect: /api/#integrations
---

## Intégrations

Configurez vos intégrations avec l'API Datadog. Les intégrations disponibles sont:

* [AWS][1]
* [PagerDuty][2]
* [Slack][3]
* [Webhooks][4]

Les endpoints disponibles sont:

* Pour **créer** ou **modifier** une intégration dans Datadog:
    **`POST /api/v1/integration/<source_type_name>`**

* Pour **remplacer** une configuration d'intégration:
    **`PUT /api/v1/integration/<source_type_name>`**

     ATTENTION: Utiliser `PUT` va remplacer votre configuration actuelle.

* Pour récupérer la configuration d'une intégration:
    **`GET /api/v1/integration/<source_type_name>`**

* Pour supprimer une intégration de Datadog :
    **`DELETE /api/v1/integration/<source_type_name>`**

[1]: /api/#aws
[2]: /api/#pagerduty
[3]: /api/#slack
[4]: /api/#webhooks
