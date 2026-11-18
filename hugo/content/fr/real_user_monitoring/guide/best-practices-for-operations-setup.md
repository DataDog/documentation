---
description: Apprenez à définir des opérations RUM qui génèrent des métriques de disponibilité
  et de latence fiables pour les parcours.
further_reading:
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: Guide
  text: Bonnes pratiques pour la création de SLO pour les opérations RUM
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: Documentation
  text: Découvrez la surveillance des opérations
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
title: Meilleures pratiques pour configurer les opérations RUM
---
## Présentation {#overview}

Ce guide vous aide à choisir la méthode appropriée pour définir des opérations et à appliquer les bonnes pratiques lors de la définition de chaque [opération][1].

Des opérations bien définies génèrent des [métriques de disponibilité et de latence][2] fiables à partir de tout le trafic de session dans votre application RUM. Lorsque vous liez une opération à un parcours, ces métriques vous aident à évaluer les étapes critiques du parcours et à identifier les problèmes de performance qui empêchent les utilisateurs de terminer le parcours.

## Choisissez une méthode d'instrumentation {#choose-an-instrumentation-method}

Choisissez une méthode d'instrumentation en fonction de votre capacité à modifier votre code frontend et du niveau de contrôle dont vous avez besoin sur le cycle de vie de l'opération. Vous pouvez définir des opérations de deux manières :

1. Ajoutez l'instrumentation directement à votre code d'application frontend avec les [API du SDK RUM][3].
2. Créez des opérations à partir d'événements RUM existants avec l'interface utilisateur Datadog ou la Datadog API.

Les API du SDK RUM offrent un meilleur contrôle sur une opération. L'interface utilisateur Datadog et la Datadog API vous permettent de définir des opérations sans déployer de modifications du code frontend.

### Utilisez les API du SDK RUM {#use-rum-sdk-apis}

Utilisez les API du SDK RUM si vous avez accès à votre base de code frontend et pouvez déployer des modifications. Cette méthode vous permet de définir quand une opération commence et se termine, de spécifier si elle réussit ou échoue, et d'identifier les échecs causés par des erreurs ou l'abandon. Vous pouvez également ajouter des attributs personnalisés pour fournir du contexte sur chaque opération.

### Utilisez l'interface utilisateur Datadog ou la Datadog API {#use-the-datadog-ui-or-api}

Utilisez l'interface utilisateur Datadog si vous ne pouvez pas accéder à votre base de code frontend ou si vous souhaitez générer des événements et des métriques d'opération sans modifier le code frontend. Avec cette méthode, vous définissez une opération en mappant des événements RUM, tels que des vues, des ressources et des erreurs, aux conditions de début, de succès et d'échec de l'opération. Comme l'opération repose sur des événements déjà collectés par RUM, ses limites sont restreintes à ces événements.

Utilisez la Datadog API pour créer des opérations en masse après avoir déterminé quels événements RUM existants définissent chaque opération.

<div class="alert alert-warning">Une application RUM prend en charge jusqu'à 1 000 opérations créées avec l'interface utilisateur Datadog ou la Datadog API. Les API du SDK RUM ne limitent pas le nombre d'opérations que vous pouvez définir.</div>

## Appliquez les meilleures pratiques lors de la définition des opérations {#apply-best-practices-when-defining-operations}

### Mesurez le travail contrôlé par l'application {#measure-application-controlled-work}

Définissez une opération autour d'une étape technique que votre application effectue et que les utilisateurs s'attendent à voir se terminer de manière fiable. Par exemple, une opération pourrait mesurer le temps nécessaire pour charger des résultats de recherche ou soumettre un formulaire. Des opérations lentes ou ayant échoué peuvent frustrer les utilisateurs et les empêcher de terminer le parcours.

Excluez le temps passé à attendre une saisie utilisateur, comme la lecture de contenu ou la décision de ce qu'il faut sélectionner. Le temps contrôlé par l'utilisateur augmente la latence mesurée même lorsque l'application fonctionne comme prévu, ce qui rend plus difficile l'identification des problèmes de performance de l'application.

### Maintenez le taux de délai d'attente à 1 % ou moins {#keep-the-timeout-rate-at-or-below-1}

Chaque opération doit avoir un début et une fin enregistrés. La fin indique si l'opération a réussi ou échoué. Si RUM enregistre le début mais pas la fin correspondante, l'[opération expire][4] (voir la note sous **Parallélisation**), et Datadog ne peut pas déterminer son résultat.

Les opérations expirées réduisent l'échantillon d'opérations avec des données de résultat significatives et peuvent masquer des erreurs ou l'abandon des utilisateurs. Maintenez le taux de délai d'attente à 1 % ou moins afin que Datadog puisse classer au moins 99 % des opérations démarrées comme des succès ou des échecs. Un taux de délai d'attente plus élevé rend les métriques de performance des opérations moins représentatives et peut indiquer une instrumentation incomplète.

### Liez les opérations aux parcours {#link-operations-to-journeys}

Liez une opération à un parcours lors de sa création afin que l'opération contribue au statut du parcours. La liaison est facultative lors de la création de l'opération, et vous pouvez ultérieurement lier l'opération à des parcours supplémentaires ou supprimer des liens existants.

### Créez des SLO pour votre parcours {#create-slos-for-your-journey}

Pour une analyse complète, consultez [Bonnes pratiques pour la création de SLO pour les opérations RUM][7].

### Donnez la priorité à l'opération finale d'un parcours {#prioritize-the-final-operation-in-a-journey}

Donnez la priorité à l'opération qui représente l'étape finale d'un parcours, car son résultat détermine souvent si l'utilisateur termine le parcours. Définissez le début et le résultat positif de l'opération autour de cette étape finale. Exemple :

- **Parcours de paiement** : démarrez l'opération finale lorsque l'utilisateur clique sur **Pay now**, et marquez-la comme réussie lorsque le paiement est terminé.
- **Parcours de connexion** : démarrez l'opération finale lorsque l'utilisateur clique sur **Sign in** avec des identifiants valides, et marquez-la comme réussie lorsque l'application authentifie l'utilisateur.
- **Parcours de recherche** : démarrez l'opération finale lorsque l'utilisateur soumet une requête de recherche valide, et marquez-la comme réussie lorsque la page de résultats affiche les éléments correspondants.

## Dépanner l'instrumentation des opérations {#troubleshoot-operation-instrumentation}

Utilisez les outils suivants pour examiner les résultats d'opération inattendus ou vérifier qu'une opération est correctement instrumentée :

- Lancez une [Bits Investigation][5] à partir d'une carte de recommandation sur la page des détails de l'opération pour analyser les erreurs, l'abandon, les délais d'attente, les plantages et la lenteur.
- Examinez des exemples de sessions sur la page des détails de l'opération pour le résultat que vous souhaitez étudier.
- Interrogez les événements d'opération dans le [RUM Explorer][6] pour inspecter leurs attributs et le contexte de session environnant.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#monitor-your-availability-on-datadog
[3]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#start-an-operation
[4]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#parallelization
[5]: /fr/real_user_monitoring/bits_ai/optimize_performance/#operations-monitoring
[6]: /fr/real_user_monitoring/explorer/
[7]: /fr/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/