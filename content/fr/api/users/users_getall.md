---
title: Récupérer tous les utilisateurs
type: apicontent
order: 36.3
external_redirect: /api/#recuperer-tous-les-utilisateurs
---

## Récupérer tous les utilisateurs

Récupère la liste de tous les utilisateurs de l'organisation. Cette liste comprend tous les utilisateurs, même s'ils sont désactivés ou si leur compte n'a pas été vérifié.

**ARGUMENTS**:

* **`page[size]`** [*facultatif*, *défaut*=**10**] : nombre de rôles à renvoyer pour une page donnée.
* **`page[number]`** [*facultatif*, *défaut*=**0**] : numéro de la page à renvoyer.
* **`sort`** [*facultatif*, *défaut*=**name**] : attribut utilisateur servant à trier les résultats. L'ordre de tri est **croissant** par défaut. Il devient **décroissant** si le champ est précédé par un tiret (exemple : *sort=-name*).
  * Options : **name**, **modified_at** et **user_count**.
* **`sort_dir`** [*facultatif*, *défaut*=**desc**] : sens du tri.
    * Valeurs autorisées : `asc` et `desc`.
* **`filter` **[*facultatif*, *défaut*=**None**] : filtre tous les rôles selon la chaîne indiquée.
* **`filter[status]`**[*facultatif*, *défaut*=**None**] : filtre les données selon l'attribut `status`. Liste de valeurs séparées par des virgules : `Active`, `Pending` et `Disabled`.
