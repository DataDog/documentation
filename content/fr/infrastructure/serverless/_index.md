---
title: Environnement sans serveur
kind: documentation
aliases:
  - /fr/graphing/infrastructure/cloudfunctions
  - /fr/graphing/infrastructure/serverless_functions
  - /fr/graphing/infrastructure/serverless/
further_reading:
  - link: /integrations/amazon_xray/
    tag: Intégration X-Ray
    text: Intégration AWS X-Ray
  - link: /integrations/amazon_lambda/
    tag: Intégration AWS Lambda
    text: Intégration AWS Lambda
---
## Présentation

L'informatique sans serveur consiste à écrire du code orienté événement et à l'importer dans un fournisseur de cloud afin qu'il gère toutes les ressources de calcul sous-jacentes. [L'informatique sans serveur Datadog][1] regroupe en une unique vue les métriques, traces et logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur.

## Installation

Le dashboard dédié ne nécessite aucune installation. Il repose cependant sur des sources de données qui doivent être installées. Consultez les instructions dédiées de votre fournisseur de cloud :

{{< partial name="serverless/serverless-setup.html" >}}

## Recherche, filtrage et tri

Utilisez la fonctionnalité de recherche à facettes sur la gauche de la page pour limiter le nombre de fonctions affichées. Tous vos tags personnalisés ainsi que les tags de votre fournisseur de cloud peuvent être utilisés en tant que filtres.

### Sélectionner des métriques dans le tableau

L'icône en forme d'engrenage des paramètres vous permet de cocher ou de décocher des colonnes de métriques dans le tableau de fonctions. Vous trouverez ci-dessous un tableau de métriques, les types d'intégration qui leur sont associés ainsi qu'une mention indiquant si la colonne s'affiche ou non par défaut :

| Métrique                | Type   | Valeur par défaut |
|-----------------------|--------|---------|
| Invocations           | Métrique | Oui     |
| Duration (Avg)        | Métrique | Oui     |
| Erreurs                | Métrique | Oui     |
| Throttles             | Métrique | Non      |
| Dead Letter Errors    | Métrique | Non      |
| Concurrent Executions | Métrique | Non      |
| Iterator Age          | Métrique | Non      |
| Est Cost              | Logs   | Oui     |
| Memory Used           | Logs   | Oui     |
| Last Start            | Logs   | Oui     |
| % Memory Used         | Logs   | Non      |

## Vue détaillée des fonctions

Cliquez sur une fonction spécifique dans le tableau de synthèse des fonctions pour accéder à la page détaillée des fonctions. Cette page fournit des informations détaillées sur les logs et traces de cette fonction.

{{< img src="infrastructure/serverless/functiondetailview.png" alt="sans serveur - Vue détaillée des fonctions" >}}

### Graphiques de synthèse et sélecteur d'intervalle

Utilisez les graphiques de synthèse en haut de l'écran et le sélecteur de durée pour afficher l'intervalle qui vous intéresse. Tout changement d'intervalle entraîne la mise à jour de la page entière, y compris des traces et logs affichés.

### Traces

Les traces de la fonction visualisée apparaissent dans la section `Traces`. Vous pouvez les trier selon leurs attributs, comme leur date, durée ou statut.

{{< img src="infrastructure/serverless/traces.png" alt="Traces" >}}

### Logs

La section `Logs` agrège les logs de tous les appels récents de la fonction actuelle. Elle se met à jour en temps réel afin d'afficher les nouveaux logs envoyés à Datadog par vos fonctions.

{{< img src="infrastructure/serverless/logs2.png" alt="Traces" >}}

## Vue détaillée des traces

Cliquez sur une trace spécifique pour ouvrir la vue détaillée de cette trace. Pour AWS, les sous-segments X-Ray sont convertis en spans Datadog tout en conservant les modèles de nommage, les tags de span et la structure de l'ensemble de la trace.

{{< img src="infrastructure/serverless/traces2.png" alt="Traces" >}}

Datadog fournit des traces sans serveur spécialement formatées pour améliorer leur lisibilité et facilité d'utilisation. Cliquez sur la span à partir d'une autre fonction Lambda pour créer un lien vers la page détaillée de la fonction. Vous pouvez ainsi passer d'une fonction de la trace à une autre en toute simplicité.

### Logs de trace

Tous les logs émis par une fonction et toutes les fonctions que celle-ci appelle s'affichent également sur la page détaillée. Affinez l'intervalle de la page en sélectionnant un moment précis pour afficher les logs d'un instant donné. Cliquez sur les logs du tableau pour afficher tous leurs détails.

{{< img src="infrastructure/serverless/logs.png" alt="logs" >}}

### Erreurs

L'onglet des erreurs remonte les exceptions qui se sont produites pendant la durée de la trace. Cette fonctionnalité permet de comprendre rapidement les problèmes survenus pendant l'exécution.

{{< img src="infrastructure/serverless/errors.png" alt="logs" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions