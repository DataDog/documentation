---
title: Modifier un monitor
type: apicontent
order: 16.03
external_redirect: /api/#edit-a-monitor
---

## Modifier un monitor
##### ARGUMENTS
* **`query`** [*obligatoire*]:  
  La requête de la métrique que l'on veut monitorer.
* **`name`** [*obligatoire*]:
    Le nom du monitor. "Default =" dynamique, basé sur la requête
* **`message`** [*optionnel*, *défault* = **dynamique, basé sur la requête**]:
    Un message à inclure avec les notifications pour ce monitor. Les notifications par e-mail peuvent être envoyées à des utilisateurs spécifiques en utilisant la même notation "@username" que les événements.
* **`options`** [*optionnel*, *défaut*=**{}**]:  
    Reportez-vous à la documentation de création de monitor pour plus de détails sur les options disponibles.
* **`tags`** [*optionnel*, *défaut*=**None**]:  
    Une liste de tags à associer à votre monitor. Cela peut vous aider à catégoriser et filtrer les monitors

