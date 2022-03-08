---
title: Suivi des déploiements
kind: documentation
description: Utiliser Datadog pour suivre vos déploiements à l'aide de tags de version
aliases:
  - /fr/tracing/version_tracking
further_reading:
  - link: getting_started/tagging/unified_service_tagging/
    tag: Documentation
    text: En savoir plus sur le tagging de service unifié et les tags réservés
  - link: tracing/app_analytics
    tag: Documentation
    text: Utiliser la version en tant que dimension dans vos requêtes App Analytics
---
## Tag « version »

Le tag `version` est réservé au tagging de service unifié. Il est appliqué aux métriques d'infrastructure (checks de host, de conteneur, de processus et NPM), métriques de trace, traces, profils et logs.

Vous pouvez utiliser le tag `version` pour surveiller les déploiements et le comportement d'un service dans le cadre de votre stratégie de déploiement logiciel.

Si vous n'avez pas encore configuré le tag `version`, consultez la [documentation dédiée au tagging de service unifié][1] pour connaître la marche à suivre.

## Utiliser les tags de version sur la page Service

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versions sur la page Service"  style="width:100%;">}}

Sur la page Service, si le tag `version` est disponible, vous pouvez définir le contexte du widget Requêtes sur :

- Total Requests by Version, ou
- Requests Per Second by Version

Vous pouvez définir le contexte du widget Erreurs sur :

- Total Errors by Version
- Errors Per Second by Version, ou
- % Error Rate by Version

Les widgets Requêtes et Erreurs peuvent être exportés vers des dashboards et des monitors.

## Versions déployées

Lorsqu'un service est configuré avec des tags `version`, une section sur les versions est affichée sur sa page dédiée, en dessous des principaux graphiques illustrant la santé du service. La section sur les versions affiche toutes les versions du service qui étaient actives pendant l'intervalle sélectionné, et les services actifs s'affichent en haut.

Voici les informations que vous verrez par défaut :

- Les noms des versions déployées pour ce service sur l'intervalle sélectionné.
- Quand les traces correspondant à cette version ont été observées pour la première fois et pour la dernière fois.
- Un indicateur Error Types, qui affiche le nombre de types d'erreur présents dans une version mais pas dans la version qui la précède.

    > **Remarque :** cet indicateur affiche les erreurs qui n'ont pas été observées dans les traces de la version précédente ; cela ne signifie pas forcément que ces erreurs sont apparues dans cette version pour la première fois. Le nombre de nouveaux types d'erreurs est particulièrement utile pour commencer à analyser les erreurs.

- Les requêtes par seconde.
- Le taux d'erreur, exprimé en tant que pourcentage du nombre total de requêtes.


Vous avez la possibilité d'ajouter des colonnes au tableau ou d'en supprimer. Vos sélections seront enregistrées. Voici les colonnes supplémentaires disponibles :

- Endpoints actifs dans une version, mais qui ne l'étaient pas dans la version précédente.
- Durée d'activité, qui affiche le temps écoulé entre la première et la dernière trace envoyée à Datadog pour cette version.
- Nombre total de requêtes.
- Nombre total d'erreurs.
- Latence mesurée au p50, p75, p90, p95, p99, ou latence max.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page Service"  style="width:100%;">}}

**Remarque :** la section sur les versions s'affiche uniquement lorsque plusieurs versions ont transmis des données pendant l'intervalle sélectionné en haut de la page.

## Comparaison de déploiements

Cliquez sur une ligne du tableau récapitulatif des versions pour ouvrir une page de comparaison. Vous pouvez ainsi comparer deux versions du même service. Par défaut, la version sélectionnée est comparée à la version qui la précède immédiatement, mais vous avez la possibilité de comparer n'importe quelle paire de versions au cours des 30 derniers jours.

La page de comparaison de versions affiche les informations suivantes :

- [Graphiques de comparaison](#graphiques-de-comparaison) : représentation graphique des requêtes et des erreurs liées aux services, vous permettant ainsi de surveiller les différents types de [déploiements](#strategies-de-deploiement).
- [Comparaison des erreurs](#comparaison-des-erreurs) : affiche les erreurs qui ont pu être introduites ou résolues par une version.
- [Comparaison des endpoints](#comparaison-des-endpoints) : affiche la latence et les taux d'erreur des endpoints pour chaque version.

### Graphiques de comparaison

À l'instar des graphiques sur la page Service, les graphiques relatifs aux requêtes et aux erreurs affichent une vue globale d'un déploiement ou les pics de taux d'erreur. Les versions comparées sont mises en évidence tandis que les autres versions sont affichées en gris en guise de contexte supplémentaire.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="Graphiques de comparaison de déploiements" style="width:100%;">}}

### Comparaison des erreurs

Cette section répertorie les différences en termes de types d'erreur détectés pour chacune des deux versions et met en évidence les informations suivantes :

 - Les types d'erreur qui sont présents uniquement dans la version source, permettant ainsi d'effectuer leur dépannage
 - Les types d'erreur qui ne sont plus présents dans la version source, permettant ainsi de valider les correctifs
 - Les types d'erreur actifs dans les deux versions

Ce tableau vous permet d'afficher les traces recueillies en temps réel ou les traces historiques correspondant à l'erreur sélectionnée pour effectuer un examen plus poussé.

**Remarque :** la comparaison d'erreurs est basée sur les types d'erreur _observés_ . Si un type d'erreur est rare, il est possible qu'il soit indiqué comme absent uniquement du fait qu'il n'a pas _encore_ été observé.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="Comparaison des erreurs" video=true style="width:100%;">}}

### Comparaison des endpoints

Cette section vous permet de comparer les performances (requêtes, latence et erreurs) de chaque endpoint du service. Triez le tableau par Value pour vérifier que les endpoints présentant les taux de requête les plus élevés sont toujours sains après un déploiement, ou par % Change pour détecter les pics de latence ou de taux d'erreur.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="Comparaison des endpoints"  style="width:100%;">}}

## Stratégies de déploiement

L'outil de suivi des déploiements de Datadog vous permet d'analyser les performances du code déployé lorsque vous utilisez les stratégies de déploiement suivantes (ou d'autres stratégies) de façon à détecter les mauvais déploiements de code, maîtriser l'impact des modifications et intervenir plus rapidement en cas d'incident.

### Déploiements progressifs

Les déploiements progressifs permettent d'éliminer les downtimes en dirigeant le trafic vers d'autres instances pendant qu'une nouvelle version est déployée sur les hosts ou les conteneurs l'un après l'autre.

Vous pouvez utiliser Datadog pour surveiller vos déploiements progressifs et détecter tout pic d'erreurs qui en résulterait.

{{< img src="tracing/deployment_tracking/rolling.png" alt="Déploiement progressif"  style="width:100%;">}}

### Déploiements bleus et verts

Les déploiements bleus et verts (ou dans toute autre combinaison de couleurs) permettent de réduire les downtimes en exécutant deux clusters de services qui acceptent tous les deux le trafic, ou en maintenant l'un d'eux en veille, mais prêt à prendre le relais en cas de problème avec l'autre.

Lorsque vous définissez et affichez les tags `version` pour ces services, vous pouvez comparer les requêtes et les erreurs afin de détecter si l'un des clusters présente un taux d'erreur plus élevé que l'autre cluster, si un cluster n'est pas conforme aux SLO, ou si un cluster qui n'est pas censé recevoir de trafic en reçoit.

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Déploiement bleu/vert"  style="width:100%;">}}

### Déploiements Canary

Lors d'un déploiement Canary, un service est déployé sur un nombre limité de hosts ou pour un nombre limité de clients afin de tester un nouveau déploiement en limitant les risques.

L'utilisation de tags `version` dans Datadog vous permet de comparer les taux d'erreur, les traces et le comportement des services pendant le déploiement Canary.

Sur l'image suivante, on constate par exemple qu'une version Canary a été déployée puis supprimée après un petit nombre d'erreurs. Les traces correspondant à cette version sont disponibles à des fins d'examen sans aucun impact supplémentaire.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="Déploiement canary"  style="width:100%;">}}

### Déploiements fantômes

Lors d'un déploiement fantôme, une version release candidate est déployée avec la version de production et le trafic entrant est envoyé aux deux services. Les utilisateurs constatent uniquement les résultats de la version de production, mais vous recueillez les données des deux versions.

Les déploiements fantômes vous permettent de comparer une nouvelle version potentielle au trafic de production réel. En appliquant le tag `version` aux versions fantômes, vous avez la possibilité de comparer les taux d'erreur, les traces et le comportement des services entre les deux versions afin de déterminer si la version fantôme doit être publiée.

## Utiliser les tags de version ailleurs dans Datadog

Le tag `version` peut être utilisé n'importe où dans Datadog, que ce soit pour filtrer les résultats d'une recherche en fonction d'une version spécifique ou pour comparer des métriques provenant de versions différentes.

### Page Ressource

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Versions sur la page Ressource"  style="width:100%;">}}

Sur la page Ressource, si le tag « version » est disponible, vous pouvez définir le contexte du widget Requêtes sur :

- Total Requests by Version
- Requests per second by Version

Vous pouvez définir le contexte du widget Erreurs sur l'une des trois options qui utilisent le tag `version` :

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

Toutes ces informations peuvent être exportées vers des dashboards et des monitors.

### Analyse et recherche de traces

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="Version dans App Analytics" video=true style="width:100%;">}}

Lorsqu'il est disponible, le tag `version` peut être utilisé pour la recherche et l'analyse de traces, que ce soit pour filtrer le mode Live Search et les traces indexées, ou pour filtrer ou regrouper des requêtes d'analyse.

Les analyses peuvent être exportées vers des dashboards et des monitors, même après un filtrage en fonction du tag `version`.

### Profils par version

Vous avez la possibilité de rechercher les profils correspondant à une version spécifique. Vous pouvez également cliquer sur **View Profiles** en haut à droite de la page de [comparaison de déploiements](#comparaison-de-deploiements) pour ouvrir le profileur en continu dans le contexte de l'une des versions comparées.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="Filtrer les profils par version"  style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/unified_service_tagging/