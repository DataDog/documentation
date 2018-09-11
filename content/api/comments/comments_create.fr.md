---
title: Créer un commentaire
type: apicontent
order: 7.1
external_redirect: /api/#create-a-comment
---

## Créer un commentaire
Les commentaires sont essentiellement des cas spéciaux d'évènements qui s'apparaissent dans le [flux d'évènements][1]. Ils peuvent entamer un nouveau fil de discussion ou, facultativement, répondre dans un autre fil.

**ARGUMENTS**:

* **`message`** [*obligatoire*]:  
  Le texte du commentaire

* **`handle`** [*optionnel*, *défaut* = **application key owner**]:  
    Le pseudonyme de l'utilisateur faisant le commentaire.

* **`related_event_id`** [*optionnel*, *défaut* = **None**]:  
    L'identification d'un autre commentaire ou évènement à répondre.

[1]: /graphing/event_stream
