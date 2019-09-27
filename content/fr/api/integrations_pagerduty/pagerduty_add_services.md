---
title: Ajout de nouveaux services et calendriers
type: apicontent
order: 18.3
external_redirect: "/api/#ajout-de-nouveaux-services-et-calendriers"
---

## Ajout de nouveaux services et calendriers

Ajoutez de nouveaux services et calendriers à votre intégration Datadog/PagerDuty.

**ARGUMENTS**:

* **`services`** :
    Le tableau des objets de service PagerDuty. Découvrez  comment configurer votre service Datadog avec la [documentation de PagerDuty][1]. Un objet de service PagerDuty est composé de :

    * **`service_name`** [*obligatoire*] :
        Le nom de votre service dans PagerDuty.

    * **`service_key`** [*obligatoire*] :
        La clé de service associée au nom de votre service dans Pagerduty.

* **`schedules`** :
    Le tableau des URL de vos calendriers :
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
