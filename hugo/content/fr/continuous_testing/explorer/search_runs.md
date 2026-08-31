---
description: Examinez toutes vos exécutions de tests et résoudre les problèmes liés
  aux résultats des tests ayant échoué.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: En savoir plus sur l'Explorateur de surveillance Synthetic et de tests en
    continu
title: Rechercher des exécutions de test
---

## Présentation

Après avoir sélectionné une plage temporelle dans le menu déroulant en haut à droite, recherchez des exécutions de tests en cliquant sur le type d'événement **Test Runs** dans l'[Explorateur de surveillance Synthetic et de tests en continu][1].

{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Rechercher et gérer vos exécutions de tests dans l'Explorateur de surveillance Synthetic et de tests en continu" style="width:100%;">}}

Vous pouvez utiliser des facettes pour réaliser les actions suivantes :

- Consultez les dernières exécutions de tests ayant nécessité de nouvelles tentatives.
- Agrégez les exécutions de tests API ayant échoué par code de statut HTTP et tracer les tendances.

## Explorer les facettes

Le panneau de facettes sur la gauche répertorie plusieurs facettes que vous pouvez utiliser pour rechercher dans vos exécutions de tests. Pour commencer à personnaliser la requête de recherche, parcourez la liste de facettes en commençant par **Common**.

### Attributs communs d'exécution de test

Les facettes **Common** vous permettent de filtrer sur les attributs de vos exécutions de tests.

| Facette            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Batch ID`        | L'ID du batch associé à l'exécution de test.                                               |
| <code>Execution&nbsp;Rule</code> | La règle d'exécution associée au résultat de test du batch CI : `Blocking`, `Non Blocking` et `Skipped`. |
| `Location`       | La localisation associée au résultat de test du lot.                                              |
| `Passed`        | Le statut global de l'exécution de test.                                               |
| `Run Type`      | Le type d'exécution de l'exécution de test. Il peut être planifié, CI ou déclenché manuellement.                                             |

### Attributs de durée

Les facettes **Timings** vous permettent de filtrer sur les attributs liés à la durée pour les exécutions de tests API.

| Facette          | Description                                 |
|----------------|---------------------------------------------|
| `DNS`  | La durée de résolution du nom DNS pour une exécution de test API.  |
| `Download`     | La durée de téléchargement de la réponse pour une exécution de test API.     |
| `First Byte`      | La durée d'attente de la réception du premier octet de la réponse pour une exécution de test API.      |
| `Open`  | La durée globale pendant laquelle un websocket est resté ouvert pour une exécution de test WebSocket.  |
| `Received` | La durée globale pendant laquelle une connexion websocket a reçu des données pour une exécution de test WebSocket. |
| `TCP` | La durée d'établissement d'une connexion TCP pour une exécution de test API. |
| `Total` | La durée de réponse totale pour une exécution de test API. |

### Attributs HTTP

Les facettes **HTTP** vous permettent de filtrer sur les attributs HTTP.

| Facette          | Description                                 |
|----------------|---------------------------------------------|
| `HTTP Status Code`  | Le code de statut HTTP pour l'exécution de test.  |

### Attributs gRPC

Les facettes **gRPC** sont liées aux exécutions de tests gRPC.

| Facette       | Description                               |
|-------------|-------------------------------------------|
| `Health Check Status`       | Le statut du check de santé pour le test gRPC. Les statuts sont `Serving` ou `Failing`.    |

### Attributs SSL

Les facettes **SSL** sont liées aux exécutions de tests SSL.

| Facette       | Description                               |
|-------------|-------------------------------------------|
| `AltNames`       |Les noms d'enregistrement alternatifs associés à un certificat SSL.    |

### Attributs TCP

Les facettes **TCP** sont liées aux connexions TCP pendant les exécutions de tests.

| Facette       | Description                               |
|-------------|-------------------------------------------|
| `Connection Outcome`       | Le statut de la connexion pour la connexion TCP. Les résultats peuvent être `established`, `timeout` ou `refused`.    |

Pour filtrer sur les exécutions de tests qui sont des nouvelles tentatives, créez une requête de recherche en utilisant `@result.isFastRetry:true`. Vous pouvez également récupérer la dernière exécution d'un test avec de nouvelles tentatives en utilisant le champ `@result.isLastRetry:true`.

Pour en savoir plus sur la recherche d'exécutions de tests, consultez la section [Syntaxe de recherche][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /fr/continuous_testing/explorer/search_syntax