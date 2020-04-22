---
title: Créer une organisation enfant
type: apicontent
order: 28.1
external_redirect: '/api/#creer-une-organisation-enfant'
---
## Créer une organisation enfant

Cet endpoint requiert la fonctionnalité de [compte multi-org][1] et doit être activé en [contactant l'assistance][2].

**ARGUMENTS**:

* **`name`** [*obligatoire*] :
    Le nom de la nouvelle organisation enfant, limité à 32 caractères.
* **`subscription`** [*obligatoire*] :
    Un tableau JSON contenant les types d'abonnement. Les types disponibles sont les suivants : `trial`, `free` et `pro`.
* **`billing`** [*obligatoire*] :
    Un tableau JSON contenant les types de facturation. (seul le type `parent_billing` est pris en charge).

Une fois que vous avez créé une organisation enfant, vous pouvez interagir avec celle-ci en utilisant `org.public_id`, `api_key.key` et `application_key.hash` fournis dans la réponse.

[1]: /fr/account_management/multi_organization
[2]: /fr/help