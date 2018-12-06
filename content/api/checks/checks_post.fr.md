---
title: Envoyer le résultat d'un check
type: apicontent
order: 6.1
external_redirect: /api/#post-a-check-run
---

## Envoyer le résultat d'un check

##### ARGUMENTS

* **`check`** *[obligatoire]*:  
    Le texte du message

* **`host_name`** *[obligatoire]*:  
    Le nom de l'hôte qui soumet le check

* **`status`** *[facultatif]*:   
    Entier pour l'état du check:
    * 0 : OK
    * 1 : Warning
    * 2 : CRITICAL
    * 3 : UNKNOWN


* **`timestamp`** *[facultatif]*:  
    Timestamp POSIX de l'événement.

* **`message`** *[facultatif]*:  
    Une description de la raison pour laquelle ce statut s'est produit

* **`tags`** *[facultatif]*:  
    Une liste de tags key:val pour ce check

