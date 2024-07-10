---
aliases:
- /fr/synthetics/explorer/search
description: Examinez des lots de tâches CI exécutées et corrigez le résultat des
  tests échoués.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de surveillance Synthetic et de tests en
    continu
title: Rechercher des lots de tests
---

## Présentation

Après avoir sélectionné un intervalle dans le menu déroulant en haut à droite, vous pouvez rechercher des lots de tâches CI en cliquant sur le type d'événement **CI Batches** dans l'[Explorateur de surveillance et de tests en continu Synthetic][1].

Vous pouvez utiliser des facettes pour réaliser les actions suivantes :

- Observez les derniers lots de tests exécutés sur un pipeline CI.
- Agrégez des lots CI et identifiez des ID de test à ajouter à votre pipeline CI.
- Comparez les chiffres des tests ayant échoué en vous basant sur l'état de leur blocage.

## Explorer les facettes

Le volet des facettes sur la gauche répertorie plusieurs facettes que vous pouvez utiliser pour effectuer une recherche dans vos lots. Pour commencer à personnaliser la requête de recherche, cliquez dans la liste des facettes commençant par **Batch**.

### Attributs de lots

Les facettes **Batch** vous permettent de filtrer les attributs de vos lots.

| Facette            | Description                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | Le statut du lot : `Passed`, `Failed` et `In Progress`. |
| `Duration`       | La durée totale du lot.                          |
| `ID`             | L'ID du lot.                                               |

### Attributs CI

Les facettes **CI** vous permettent de filtrer les attributs CI de vos lots.

| Facette          | Description                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | Le fournisseur de CI associé au lot.  |
| `Job Name`     | Le nom de tâche associé au lot.     |
| `Job URL`      | L'URL de tâche associée au lot.      |
| `Pipeline ID`  | L'ID de pipeline associé au lot.  |
| `Pipeline Name` | Le nom de pipeline ou de référentiel associé au lot. |
| `Pipeline Number` | Le numéro de pipeline ou de build associé au lot. |
| `Pipeline URL` | L'URL de pipeline associée au lot. |
| `Stage Name`   | Le nom d'étape associé au lot.   |

### Attributs du résultat de test

Les facettes de **Test result** vous permettent de filtrer les attributs des résultats de vos tests exécutés.

| Facette            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| <code>Execution&nbsp;Rule</code> | La règle d'exécution associée au résultat de test du lot : `Blocking`, `Non Blocking` et `Skipped`. |
| `Fast Retries`   | Le nombre de nouvelles tentatives rapides avec le résultat de test du lot.                                |
| `Location`       | La localisation associée au résultat de test du lot.                                              |
| `Test ID`        | L'ID de test associé au résultat de test du lot.                                               |
| `Test Name`      | Le nom de test associé au résultat de test du lot.                                             |

### Attributs Git

Les facettes **Git** vous permettent de filtrer les attributs Git de vos lots.

| Facette       | Description                               |
|-------------|-------------------------------------------|
| `Author Email` | L'adresse e-mail de l'auteur du commit. |
| `Branch`    | La branche associée au lot.     |
| `Commit SHA`| Le SHA du commit associé au lot. |
| `Repository URL`| L'URL du référentiel Git associé au lot. |
| `Tag`       | Le tag Git associé au lot.    |

Pour filtrer des lots de tâches CI exécutées pendant la journée, créez une requête de recherche, comme `@ci.provider.name:github`, et indiquez la valeur `1d` pour l'intervalle.

Pour en savoir plus sur la recherche de lots CI, consultez la section [Syntaxe de recherche de logs][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /fr/continuous_testing/explorer/search_syntax