---
title: Index de logs
type: apicontent
order: 23
external_redirect: '/api/#index-de-logs'
---
## Index de logs

<div class="alert alert-warning">
Cet endpoint est en bêta public et n'est pas pris en charge par les bibliothèques client de Datadog. Si vous souhaitez nous faire part de vos remarques, <a href="/help">contactez l'assistance Datadog</a>.
</div>

L'objet `Index` décrit la configuration d'un index de log. Voici ses attributs :

* **`name`** (lecture seule) :
    nom de l'index.
* **`filter.query`** :
    seuls les logs qui correspondent aux critères du filtre sont pris en compte pour cet index.
    requête de recherche respecte la [syntaxe de recherche de log][1].
* **`num_retention_days`** (lecture seule) :
    nombre de jours avant la suppression des logs de cet index.
* **`daily_limit`** (lecture seule) :
    nombre d'événements de log que vous pouvez envoyer avant d'atteindre les limites de débit.
* **`is_rate_limited`** (lecture seule) :
    valeur booléenne précisant si l'index a atteint sa limite de débit, ce qui signifie qu'un nombre de logs supérieur à la limite quotidienne a été envoyé. La limite de débit est réinitialisée tous les jours à 14 h UTC.
* **`exclusion_filters`** :
    tableau d'objets `ExclusionFilter` (voir ci-après). Les logs sont testés avec la requête de chaque `ExclusionFilter`, en suivant l'ordre défini dans le tableau. Seul le premier `ExclusionFilter` actif correspondant est pris en compte, les éventuels autres filtres sont ignorés.

  * **`name`** :
    nom du filtre d'exclusion.
  * **`is_enabled`** :
    valeur booléenne précisant si l'exclusion est active (ce qui entraîne l'exclusion des logs) ou non.
  * **`filter.query`** :
    seuls les logs qui correspondent aux critères du filtre ET à la requête de l'index parent seront pris en compte pour ce filtre d'exclusion.
    La requête de recherche respecte la [syntaxe de recherche de log][1].
  * **`filter.sample_rate`** :
    pourcentage de logs exclus par le filtre d'exclusion, lorsque celui-ci est actif. L'échantillonnage est uniforme.

**Remarque** : vous avez besoin d'une clé d'API et d'application ainsi que de droits administrateur pour interagir avec cet endpoint.

[1]: https://docs.datadoghq.com/fr/logs/explorer/search/#search-syntax