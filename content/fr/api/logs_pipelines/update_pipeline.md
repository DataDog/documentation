---
title: Mettre à jour un pipeline
type: apicontent
order: 24.6
external_redirect: '/api/#mettre-a-jour-un-pipeline'
---
## Mettre à jour un pipeline

Mettez à jour une configuration de pipeline donnée pour modifier ses processeurs ou leur ordre.


**ARGUMENTS**:

**Remarque** : la méthode `PUT` permet de mettre à jour la configuration de votre pipeline en **remplaçant** votre configuration actuelle par la nouvelle, envoyée à votre organisation Datadog.

* **`name`** [*obligatoire*] :
  Le nom de votre pipeline.

* **`is_enabled`**  [*facultatif*, *défaut*=**False**] :
  Valeur booléenne permettant d'activer votre pipeline.

* **`filter.query`** [*facultatif*] : définit le filtre de votre pipeline. Seuls les logs correspondant aux critères du filtre sont traités par ce pipeline.

* **`processors`** [*facultatif*] : un tableau séquentiel de processeurs ou pipelines imbriqués. Consultez la [documentation relative au processeur][1] pour obtenir le schéma spécifique à chaque processeur.
[1]: /fr/logs/processing/processors/?tab=api