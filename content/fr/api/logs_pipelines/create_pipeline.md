---
title: Créer un pipeline
type: apicontent
order: 24.5
external_redirect: '/api/#creer-un-pipeline'
---
## Créer un pipeline

Créez un pipeline dans votre organisation.


**ARGUMENTS**:


* **`name`** [*obligatoire*] :
  Le nom de votre pipeline.

* **`is_enabled`**  [*facultatif*, *défaut*=**False**] :
  Valeur booléenne permettant d'activer votre pipeline.

* **`filter.query`** [*facultatif*] : définit le filtre de votre pipeline. Seuls les logs correspondant aux critères du filtre sont traités par ce pipeline.

* **`processors`** [*facultatif*] : un tableau ordonné de processeurs ou pipelines imbriqués. Consultez la [documentation relative au processeur][1] pour connaître le schémas spécifique à chaque processeur.
[1]: /fr/logs/processing/processors/?tab=api