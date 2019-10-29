---
title: Créer une intégration Webhooks
type: apicontent
order: 20.2
external_redirect: '/api/#creer-une-integration-webhooks'
---
## Créer une intégration Webhooks

Créez une intégration Datadog/Webhooks.

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle de votre organisation Datadog.

**ARGUMENTS** :

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
        si `use_custom_payload` est défini sur **true**, définissez ce paramètre sur **true** pour encoder votre charge utile dans une URL.
    * **`headers`** [*facultatif*, *défaut*=**None**] :
      En-têtes attachés à votre Webhook.

[1]: /fr/monitors/notifications
[2]: /fr/integrations/webhooks/#usage