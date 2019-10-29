---
title: Créer un embed
type: apicontent
order: 11.2
external_redirect: '/api/#creer-un-embed'
---
## Créer un embed

Crée un nouveau graphique intégrable.

Renvoie un JSON composé des mêmes éléments renvoyés par GET api/v1/graph/embed/<ID_EMBED>. En cas d'échec, la valeur renvoyée correspond à un JSON contenant un message d'erreur {errors: [messages]}.

Remarque : si un embed existe déjà pour la même requête dans une organisation donnée, au lieu de créer un nouvel embed, l'embed le plus ancien est renvoyé.

Si vous souhaitez utiliser des template variables, consultez la section [Graphiques intégrables avec des template variables][1].

**ARGUMENTS**:

* **`graph_json`** [*obligatoire*] :
    La définition du graphique en JSON. Même format que celui disponible dans l'onglet JSON de l'éditeur de graphiques dans Datadog.
* **`timeframe`** [*facultatif*, *défaut*=**1_hour**] :
    Le timegrame pour le graphique. Doit correspondre à l'une des valeurs suivantes :
    * **1_hour**
    * **4_hours**
    * **1_day**
    * **2_days**
    * **1_week**
* **`size`** [*facultatif*, *défaut*=**medium**] :
    La taille du graphique. Valeurs autorisées :
    * **small**
    * **medium**
    * **large**
    * **xlarge**
* **`legend`** [*facultatif*, *défaut*=**no**] :
    Le flag déterminant si le graphique inclut ou non une légende. Valeurs autorisées : **yes** ou **no**.
* **`title`** [*facultatif*, *défaut*=**Embed created through API**] :
    Détermine le titre du graphique.
    *Doit inclure au moins 1 caractère.*

[1]: /fr/graphing/faq/embeddable-graphs-with-template-variables
