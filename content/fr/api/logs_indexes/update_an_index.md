---
title: Mettre à jour un index
type: apicontent
order: 24.3
external_redirect: '/api/#mettre-a-jour-un-index'
---
## Mettre à jour un index

<div class="alert alert-warning">
Cet endpoint est en bêta public. Si vous souhaitez nous faire part de vos remarques, <a href="/help">contactez l'assistance Datadog</a>.
</div>

Cet endpoint met à jour un `Index` identifié par son nom. Il renvoie l'objet `Index` passé dans le corps de la requête lorsque celle-ci est réussie.

**ARGUMENTS** :

**Remarque** : la méthode `PUT` permet de mettre à jour la configuration de votre index en **remplaçant** votre configuration actuelle par la nouvelle, envoyée à votre organisation Datadog.


* **`filter.query`**  [*facultatif*] :
    seuls les logs qui correspondent aux critères du filtre sont pris en compte pour cet index. La requête de recherche respecte la [syntaxe de recherche de logs][1]
* **`exclusion_filters`** : un tableau d'objets `ExclusionFilter` (voir ci-après). Les logs sont testés avec la requête de chaque `ExclusionFilter`, en suivant l'ordre défini dans le tableau. Seul le premier `ExclusionFilter` actif qui correspond est pris en compte, les éventuels autres sont ignorés. L'objet `ExclusionFilter` décrit la configuration d'un [filtre d'exclusion][2]. Ses attributs sont les suivants :

  * **`name`** [*obligatoire*] :
    nom du filtre d'exclusion.
  * **`is_enabled`**  [*facultatif*, *défaut*=**False**] :
    valeur booléenne précisant si l'exclusion est active ou non.
  * **`filter.query`** [*facultatif*] :
    seuls les logs qui correspondent aux critères du filtre ET à la requête de l'index parent sont pris en compte pour ce filtre d'exclusion. La requête de recherche respecte la [syntaxe de recherche de logs][1]
  * **`filter.sample_rate`** [*obligatoire*] :
    pourcentage de logs exclus par le filtre d'exclusion, lorsque celui-ci est actif. L'échantillonnage est uniforme.

[1]: /fr/logs/explorer/search
[2]: /fr/logs/indexes/#exclusion-filters