---
title: Récupérer un embed spécifique
type: apicontent
order: 11.3
external_redirect: /api/#recuperer-un-embed-specifique
---

## Récupérer un embed spécifique

Récupérez le fragment HTML d'un embed généré précédemment avec embed_id.

Renvoie un objet JSON avec 8 éléments :

* embed_id : token de l'embed.
* graph_title : titre du graphique.
* dash_name : nom du dashboard sur lequel le graphique est affiché (null si aucun).
* dash_url : URL du dashboard sur lequel le graphique est affiché (null si aucun).
* shared_by : ID de l'utilisateur qui a partagé l'embed.
* html : fragment HTML pour l'embed (iframe).
* revoked : flag booléen indiquant si l'embed est révoqué ou non.

En cas d'échec, la valeur renvoyée correspond à un JSON contenant un message d'erreur {errors: [messages]}.

**ARGUMENTS**:

Cet endpoint ne prend aucun argument JSON.
