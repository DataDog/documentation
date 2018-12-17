---
title: Récupérer l'utilisation de votre compte multi-org
type: apicontent
order: 23.6
external_redirect: /api/#get-usage-across-your-multi-org-account
---

## Récupérer l'utilisation de votre compte multi-org

Récupérer l'utilisation de votre compte multi-org

##### Arguments
* **`start_month`** [*obligatoire*]:  
    Datetime dans le format ISO-8601 , UTC, précis au mois: [YYYY-MM] Pour l'usage depuis le début de ce mois. Maximum de 15 mois dans le passé.
* **`end_month`** [*facultatif*, *défaut*=**current_month-3d**]:
    datetime dans le format ISO-8601 , UTC, précis au mois: [YYYY-MM] Pour l'usage depuis le début de cette heure
* **`include_org_details`** [*facultatif*, *défaut*=**true**]:
  Inclus les résumés d'utilisation pour chaque sous-organisation.
