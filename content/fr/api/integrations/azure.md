---
title: Azure
type: apicontent
order: 15.2
external_redirect: '/api/#azure'
---
## Azure

Configurez votre intégration Datadog/Azure directement avec l’API Datadog.  
[En savoir plus sur l’intégration Datadog/Azure][1].

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle de votre organisation Datadog.

##### ARGUMENTS

Consultez les [instructions d'installation de l'intégration Datadog/Azure][2] pour découvrir comment obtenir les valeurs des champs suivants pour votre organisation.

* **`tenant_name`** [*requis*] :

    Votre ID Azure Active Directory.

* **`client_id`** [*requis*] :

    Votre ID d'application Web Azure

* **`client_secret`** [*requis*] :

    La clé de secret de votre application Web Azure.

* **`host_filters`** [*facultatif*, *défaut*=**None**] :

    Limitez les instances Azure qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.


[1]: /fr/integrations/azure
[2]: /fr/integrations/azure/#installation