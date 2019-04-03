---
title: Envoyer le résultat d'un check
type: apicontent
order: 6.1
external_redirect: /api/#envoyer-le-resultat-d-un-check
---

## Envoyer le résultat d'un check

##### ARGUMENTS

* **`check`** *[obligatoire]* :
  Le texte du message.

* **`host_name`** *[obligatoire]* :
    Le nom du host qui soumet le check.

* **`status`** *[facultatif]* :
  L'entier du statut du check :
    * 0 : OK
    * 1 : WARNING
    * 2 : CRITICAL
    * 3 : UNKNOWN


* **`timestamp`** *[faculatif]* :
  Timestamp POSIX de l'événement.

* **`message`** *[facultatif]* :
    La description de la raison pour laquelle ce statut est généré.

* **`tags`** *[facultatif]* :
    La liste des tags key:val pour ce check.

