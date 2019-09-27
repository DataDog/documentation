---
title: Générer des ID externes
type: apicontent
order: 15.06
external_redirect: '/api/#generer-desID-externes'
---
## Générer des ID externes

Générer un nouvel ID externe AWS pour une paire compte AWS/nom de rôle donnée.

**ARGUMENTS**:


* **`account_id`** [*obligatoire*] :

    Votre identifiant de compte AWS sans les tirets.
   [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'identifiant de votre compte AWS.

* **`role_name`** [*obligatoire*] :

    Le nom de votre délégation de rôle Datadog.
   [Consultez les informations sur l'intégration Datadog/AWS pour en savoir plus][2] sur l'identifiant de votre compte AWS.

[1]: /fr/integrations/amazon_web_services/#configuration
[2]: /fr/integrations/amazon_web_services/#installation