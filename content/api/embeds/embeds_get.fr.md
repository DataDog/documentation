---
title: Récupérer un embed spécifique
type: apicontent
order: 10.3
external_redirect: /api/#recuperer-un-embed-specifique
---

## Récupérer un embed spécifique
Récupérez le fragment HTML d'un embed généré précédemment avec embed_id.

Renvoie un objet JSON avec 8 éléments ::

* embed_id : jeton de l'embed.
* graph_title : titre du graphique.
* dash_name : nom du dashboard sur lequel le graphique est affiché (null si aucun).
* dash_url : URL du dashboard sur lequel le graphique est affiché (null si aucun).
* shared_by : ID de l'utilisation qui a partagé l'embed.
* html : fragment HTML pour l'embed (iframe).
* revoked : flag booléen indiquant si l'embed est révoquée ou non.

En cas d'échec, la valeur renvoyée est un JSON contenant un message d'erreur {errors: [messages]}.

##### ARGUMENTS
* **`size`** [*facultatif*, *défaut* = **medium**] :
  La taille du graphique. Valeurs autorisées :
    * **small**, 
    * **medium**, 
    * **large**, 
    * **xlarge**.
* **`legend`** [*facultatif*, *défaut* = **no**] :
    Le flag déterminant si le graphique inclut ou non une légende. Valeurs autorisées : **yes** ou **no**.
* **`template_variables`** [*facultatif*, *défaut* = **None**] :
    Remplacez les template variables dans les requêtes par form $var. Pour remplacer $var par val, utilisez var=val comme paramètre pour chaque template variable que vous souhaitez remplacer. Si des template variables n'ont pas de valeur dans l'URL source de l'iframe, (*) est alors utilisé comme valeur.
