---
title: Supprimer une intégration Azure
type: apicontent
order: 17.3
external_redirect: '/api/#supprimer-une-integration-azure'
---
## Supprimer une intégration Azure

Supprimez une intégration Datadog/Azure donnée.

**ARGUMENTS**:

Consultez les [instructions d'installation de l'intégration Datadog/Azure][1] pour découvrir comment obtenir les valeurs des champs suivants pour votre organisation.

* **`tenant_name`** [*requis*] :

    Votre ID Azure Active Directory.

* **`client_id`** [*requis*] :

    Votre ID d'application Web Azure

* **`host_filters`** [*facultatif*, *valeur par défaut*=**Aucune**] :

    Limitez les instances Azure qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.

[1]: /fr/integrations/azure/#installation