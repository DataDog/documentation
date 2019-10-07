---
title: Ajouter l'ARN de Lambda pour les logs AWS
type: apicontent
order: 15.08
external_redirect: '/api/#add-aws-log-lambda-arn'
---
## Ajouter l'ARN de Lambda pour les logs AWS

Attachez l'ARN du Lambda créé pour la [collecte de logs AWS de Datadog][1] à votre identifiant de compte AWS pour activer la collecte de logs.

**ARGUMENTS**:

* **`account_id`** [*obligatoire*] :

    Votre identifiant de compte AWS sans les tirets.
    [Consultez l'intégration Datadog/AWS pour en savoir plus][2] sur l'identifiant de votre compte AWS.

* **`lambda_arn`** [*obligatoire*] :
    L'ARN du [Lambda Datadog créé durant la configuration de la collecte de logs Amazon Web Services de Datadog][1].

[1]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: /fr/integrations/amazon_web_services/#configuration