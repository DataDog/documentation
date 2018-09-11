---
title: Récupérer un embed spécifique
type: apicontent
order: 10.3
external_redirect: /api/#get-specific-embed
---

## Récupérer un embed spécifique
Obtenez le fragment HTML pour une embed générée précédemment avec embed_id.

Réponse: Un objet JSON avec 8 éléments:

* embed_id: Token de l'embed
* graph_title: titre du graphique
* dash_name: Nom du dashboard sur lequel le graphique est activé (null si aucun)
* dash_url: URL du dashboard sur lequel le graphique est activé (null si aucun)
* shared_by: ID de l'utilisation qui a partagé l'intégration
* html: Fragment HTML pour l'embed (iframe)
* revoked: Indicateur booléen pour indiquer si l'embed est révoquée ou non

En cas d'échec, la valeur de retour est un JSON contenant un message d'erreur {errors: [messages]}.

**ARGUMENTS**:

* **`size`** [*optionnel*, *défaut*=**medium**]:  
  La taille du graphique, doit être parmis:
    * **small**, 
    * **medium**, 
    * **large**, 
    * **xlarge**.
* **`legend`** [*optionnel*, *default*=**no**]:  
    Le flag déterminant si le graphique inclut une légende. Doit être soit **yes** soit **no**.
* **`template_variables`** [*optionnel*, *défaut*=**None**]:  
    Remplacez les template variables dans les requêtes par form $var. Pour remplacer $var par val, utilisez var=val comme paramètre pour chaque template variable que vous souhaitez remplacer. Si des template variables manquantes sont manquantes dans l'URL d' iframe source, alors (*) est utilisé comme valeur.
