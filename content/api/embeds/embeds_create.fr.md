---
title: Création d'embed
type: apicontent
order: 10.2
external_redirect: /api/#create-embed
---

## Création d'embed

Crée un nouveau graphe intégrable.

Retourne: Un JSON composé des mêmes éléments retournés par GET api/v1/graph/embed/<EMBED_ID>. En cas d'échec, la valeur de retour est un JSON contenant un message d'erreur {errors: [messages]}.

Note: Si un embed existe déjà pour la même requête dans une organisation donnée, l'embed le plus ancien est renvoyé au lieu de créer un nouvel embed.

##### ARGUMENTS
* **`graph_json`** [*obligatoire*]:  
    La définition du graphique en JSON. Même format que celui disponible dans l'onglet JSON de l'éditeur de graphique dans Datadog.
* **`timeframe`** [*optionnel*, *défaut*=**1_hour**]:  
    Le timegrame pour le graphique. Doit être l'un des suivants:
    * **1_hour**,
    * **4_hours**, 
    * **1_day**, 
    * **2_days**,
    * **1_week**.
* **`size`** [*optionnel*, *défaut*=**medium**]:  
    La taille du graph doit être parmis:
    * **small**, 
    * **medium**, 
    * **large**, 
    * **xlarge**.
* **`legend`** [*optionnel*, *défaut*=**no**]:  
    Le flag déterminant si le graphique inclut une légende. Doit être soit **yes** soit **no**.
* **`title`** [*optionnel*, *défaut*=**Embed created through API**]:  
  Détermine le titre du graphique.
    *Doit être au moins 1 caractère.*
