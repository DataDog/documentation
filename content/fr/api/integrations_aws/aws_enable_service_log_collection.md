---
title: Activer la collecte de logs d'un service AWS
type: apicontent
order: 15.09
external_redirect: '/api/#enable-an-aws-service-log-collection'
---
## Activer la collecte de logs d'un service AWS

Activez la collecte automatique de logs pour vos services AWS.

**ARGUMENTS**:

* **`account_id`** [*obligatoire*] :

    Votre identifiant de compte AWS sans les tirets.
   [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'identifiant de votre compte AWS.

* **services** [*obligatoire*] :
  Un tableau d'ID de services définis pour activer la collecte automatique de logs.
    Découvrez la liste des services disponibles avec le endpoint d'API [Obtenir la liste des services AWS prêts pour les logs][2]

[1]: /fr/integrations/amazon_web_services/#configuration
[2]: /fr/api/#get-list-of-aws-log-ready-services