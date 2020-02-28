---
title: Créer un commentaire
type: apicontent
order: 7.1
external_redirect: '/api/#creer-un-commentaire'
---
## Créer un commentaire

Les commentaires sont fondamentalement des événements spéciaux qui apparaissent dans le [flux d'événements][1]. Ils peuvent débuter un nouveau fil de discussion ou encore fournir une réponse dans un autre fil.

**ARGUMENTS**:

* **`message`** [*obligatoire*] :
    Le texte du commentaire.

* **`handle`** [*facultatif*, *défaut*=**application key owner**] :
    Le handle de l'utilisateur qui publie le commentaire.

* **`related_event_id`** [*facultatif*, *défaut*=**None**] :
    L'ID d'un autre commentaire ou événement auquel répondre.

[1]: /fr/events