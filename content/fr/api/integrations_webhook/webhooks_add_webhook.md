---
title: Ajouter un Webhook à une intégration Webhooks
type: apicontent
order: 20.3
external_redirect: '/api/#ajouter-un-webhook-a-une-integration-webhooks'
---
## Ajouter un Webhook à une intégration Webhooks

Ajoutez un Webhook spécifique à une intégration Datadog/Webhooks.

**ARGUMENTS**:


* **`hooks`** [*obligatoire*] :
   Tableau d'objets Webhook. Un objet Webhook est composé de :

    * **`name`** [*obligatoire*] :
      Le nom de votre Webhook.
      [Découvrez comment l'utiliser dans des notifications de monitor][1].
    * **`url`** [*obligatoire*] :
      L'URL de votre Webhook.
    * **`use_custom_payload`** [*facultatif*, *défaut*=**False**] :
      Si défini sur **true**, vous permet de spécifier une charge utile personnalisée pour votre Webhook.

    * **`custom_payload`** [*facultatif*, *défaut*=**None**] :
        Si `use_custom_payload` est défini sur **true**, spécifiez votre propre charge utile pour ajouter vos propres champs personnalisés à la requête en [utilisant ces variables][2].

    * **`encode_as_form`** [*facultatif*, *défaut*=**False**] :
        Si `use_custom_payload` est défini sur **true**, définissez sur **true** pour chiffrer l'URL de votre charge utile.
    * **`headers`** [*facultatif*, *défaut*=**None**] :
      En-têtes attachés à votre Webhook.

[1]: /fr/monitors/notifications
[2]: /fr/integrations/webhooks/#usage