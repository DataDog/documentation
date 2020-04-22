---
title: Créer une intégration Azure
type: apicontent
order: 17.2
external_redirect: '/api/#creer-une-integration-azure'
---
## Créer une intégration Azure

Créer une intégration Datadog/Azure.

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle de votre organisation Datadog.
* La méthode `PUT` permet de mettre à jour la configuration de votre intégration en **remplaçant** votre configuration actuelle par une nouvelle, envoyée à votre organisation Datadog.

**ARGUMENTS**:

Consultez les [instructions d'installation de l'intégration Datadog/Azure][1] pour découvrir comment obtenir les valeurs des champs suivants pour votre organisation.

* **`tenant_name`** [*requis*] :

    Votre ID Azure Active Directory.

* **`client_id`** [*requis*] :

    Votre ID d'application Web Azure

* **`client_secret`** [*requis*] :

    La clé de secret de votre application Web Azure.

* **`host_filters`** [*facultatif*, *valeur par défaut*=**Aucune**] :

    Limitez les instances Azure qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.

[1]: /fr/integrations/azure/#installation