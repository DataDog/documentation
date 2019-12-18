---
title: Créer une intégration PagerDuty
type: apicontent
order: 19.2
external_redirect: "/api/#creer-une-integration-pagerduty"
---

## Créer une intégration PagerDuty

Créez une intégration Datadog/PagerDuty.

**Remarque** : tous les arguments sont requis lors de la création (`PUT`) d'une configuration PagerDuty.

**ARGUMENTS**:

* **`services`** :
    Le tableau des objets de service PagerDuty. Découvrez  comment configurer votre service Datadog avec la [documentation de PagerDuty][1]. Un objet de service PagerDuty est composé de ce qui suit :

    * **`service_name`** [*obligatoire*] :
        Le nom de votre service dans PagerDuty.

    * **`service_key`** [*obligatoire*] :
        La clé de service associée au nom de votre service dans Pagerduty.

* **`subdomain`** :
    Le nom du sous-domaine personnalisé de votre compte PagerDuty.

* **`schedules`** :
    Tableau de vos URL programmées, par ex. :
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

* **`api_token`** :
  Votre token d'API PagerDuty.

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
