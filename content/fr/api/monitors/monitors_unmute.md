---
title: Réactiver un monitor
type: apicontent
order: 27.11
external_redirect: /api/#reactiver-un-monitor
---

## Réactiver un monitor

**ARGUMENTS**:

* **`scope`** [*facultatif*, *défaut*=**None**] :
    Le contexte auquel appliquer la désactivation.
    Par exemple, si votre alerte est groupée par {host}, vous pouvez désactiver 'host:app1'.
* **`all_scopes`** [*facultatif*, *défaut*=**False**] :
    Supprime les désactivations pour tous les contextes.
