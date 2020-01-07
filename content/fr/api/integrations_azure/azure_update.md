---
title: Mettre à jour une intégration Azure
type: apicontent
order: 17.5
external_redirect: '/api/#mettre-a-jour-une-integration-azure'
---
## Mettre à jour une intégration Azure

Mettre à jour l'intégration Datadog/Azure.

**ARGUMENTS** :

Consultez les [instructions d'installation de l'intégration Datadog/Azure][1] pour découvrir comment obtenir les valeurs des champs suivants pour votre organisation.

* **`tenant_name`** [*requis*] :

    Votre ID Azure Active Directory existant.

* **`new_tenant_name`** [*facultatif*] :

  Votre nouvel ID Azure Active Directory.

* **`client_id`** [*requis*] :

  Votre ID d'application Web Azure existant.

* **`new_client_id`** [*facultatif*] :

  Votre nouvel ID d'application Web Azure.

* **`client_secret`** [*requis*] :

    La clé de secret de votre application Web Azure.

* **`host_filters`** [*facultatif*, *défaut*=**None**] :

    Limitez les instances Azure qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.

[1]: /fr/integrations/azure/#installation