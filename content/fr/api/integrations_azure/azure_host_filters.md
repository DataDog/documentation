---
title: Mettre à jour les filtres de host d'une intégration Azure
type: apicontent
order: 17.4
external_redirect: '/api/#mettre-a-jour-les-filtres-d-host-d-une-integration-azure'
---
## Mettre à jour les filtres de host d'une intégration Azure

Mettez à jour la liste définie des filtres de host pour une intégration Datadog/Azure donnée.

**ARGUMENTS**:

Consultez les [instructions d'installation de l'intégration Datadog/Azure][1] pour découvrir comment obtenir les valeurs des champs suivants pour votre organisation.

* **`tenant_name`** [*requis*] :

    Votre ID Azure Active Directory.

* **`client_id`** [*requis*] :

    Votre ID d'application Web Azure

* **`client_secret`** [*requis*] :

    La clé de secret de votre application Web Azure.

* **`host_filters`** [*facultatif*, *défaut*=**None**] :

    Limitez les instances Azure qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.

[1]: /fr/integrations/azure/#installation