---
title: Envoyer le résultat d'un check
type: apicontent
order: 6.1
external_redirect: /api/#envoyer-le-resultat-d-un-check
---

## Envoyer le résultat d'un check

**ARGUMENTS**:

* **`check`** *[obligatoire]* :
  le texte du message.

* **`host_name`** *[obligatoire]* :
    le nom du host qui soumet le check.

* **`status`** *[obligatoire]* :
  l'entier du statut du check :
    * 0 : OK
    * 1 : WARNING
    * 2 : CRITICAL
    * 3 : UNKNOWN

* **`tags`** *[obligatoire]* :
    la liste des tags key:val pour ce check.

* **`timestamp`** *[facultatif]* :
  timestamp POSIX de l'événement.

* **`message`** *[facultatif]* :
  une description de la raison pour laquelle ce statut est généré.
