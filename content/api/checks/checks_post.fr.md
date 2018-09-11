---
title: Envoyer le résultat d'un check
type: apicontent
order: 6.1
external_redirect: /api/#post-a-check-run
---

## Envoyer le résultat d'un check

**ARGUMENTS**:

* **`check`** *[obligatoire]*:  
    Le texte du message

* **`host_name`** *[obligatoire]*:  
    Le nom de l'hôte qui soumet le check

* **`status`** *[optionnel]*:   
    Entier pour l'état du check:
    * 0 : OK
    * 1 : Warning
    * 2 : CRITICAL
    * 3 : UNKNOWN

* **`timestamp`** *[optionnel]*:  
    Timestamp POSIX de l'événement.

* **`message`** *[optionnel]*:  
    Une description de la raison pour laquelle ce statut s'est produit

* **`tags`** *[optionnel]*:  
    Une liste de tags key:val pour ce check

