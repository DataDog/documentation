---
title: Mettre à jour une intégration Webhooks
type: apicontent
order: 20.3
external_redirect: '/api/#mettre-a-jour-une-integration-webhooks'
---
## Mettre à jour une intégration Webhooks

Ajoutez un Webhook spécifique à une intégration Datadog/Webhooks.

**ARGUMENTS** :


* **`hooks`** [*obligatoire*] :
   tableau d'objets Webhook. Un objet Webhook est composé de :

    * **`name`** [*obligatoire*] :
      le nom de votre Webhook.
      [Découvrez comment l'utiliser dans les notifications de monitor][1].
    * **`url`** [*obligatoire*] :
      l'URL de votre Webhook.
    * **`use_custom_payload`** [*facultatif*, *défaut*=**False**] :
      si défini sur **true**, vous permet de spécifier une charge utile personnalisée pour votre Webhook.

    * **`custom_payload`** [*facultatif*, *défaut*=**None**] :
        si `use_custom_payload` est défini sur **true**, spécifiez votre propre charge utile pour ajouter vos propres champs personnalisés à la requête [en utilisant ces variables][2].

    * **`encode_as_form`** [*facultatif*, *défaut*=**False**] :
        si `use_custom_payload` est défini sur **true**, définissez ce paramètre sur **true** pour encoder votre charge utile dans une URL.
    * **`headers`** [*facultatif*, *défaut*=**None**] :
      en-têtes associés à votre Webhook.

[1]: /fr/monitors/notifications
[2]: /fr/integrations/webhooks/#usage