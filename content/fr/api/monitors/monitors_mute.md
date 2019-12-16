---
title: Désactiver un monitor
type: apicontent
order: 26.10
external_redirect: /api/#desactiver-un-monitor
---

## Désactiver un monitor

**ARGUMENTS**:

* **`scope`** [*facultatif*, *défaut*=**None**] :
    Le contexte auquel appliquer la désactivation, p. ex. **role:db**.
    Par exemple, si votre alerte est groupée selon `{host}`, vous pouvez désactiver `host:app1`.
* **`end`** [*facultatif*, *défaut*=**None**] :
    Timestamp POSIX correspondant à la fin de la désactivation.
