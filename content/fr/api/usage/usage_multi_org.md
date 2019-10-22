---
title: Récupérer l'utilisation de votre compte multi-org
type: apicontent
order: 34.8
external_redirect: /api/#recuperer-l-utilisation-de-votre-compte-multi-org
---

## Récupérer l'utilisation de votre compte multi-org

Récupérez l'utilisation de votre compte multi-org

**ARGUMENTS**:

* **`start_month`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, au mois près : [AAAA-MM]. Pour une utilisation commençant ce mois-là. Maximum de 15 mois dans le passé.
* **`end_month`** [*facultatif*, *défaut*=**current_month-3d**] :
    datetime au format ISO-8601, UTC, au mois près : [AAAA-MM]. Pour une utilisation se terminant ce mois-là.
* **`include_org_details`** [*facultatif*, *défaut*=**true**] :
    inclure les résumés d'utilisation pour chaque sous-organisation.
