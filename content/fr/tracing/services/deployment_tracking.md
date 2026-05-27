---
aliases:
- /fr/tracing/version_tracking
- /fr/tracing/deployment_tracking/
description: Utiliser Datadog pour suivre vos déploiements à l'aide de tags de version
further_reading:
- link: getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: En savoir plus sur le tagging de service unifié et les tags réservés
- link: tracing/app_analytics
  tag: Documentation
  text: Utiliser la version en tant que dimension dans vos requêtes App Analytics
title: Suivi des déploiements
---
## La balise de version {#the-version-tag}

La balise `version` est réservée au sein du Tagging de service unifié. Elle est appliquée aux métriques d'infrastructure (hôte, conteneur, processus et NPM checks), aux métriques de trace, aux traces, aux profils et aux journaux.

Vous pouvez utiliser la balise `version` pour surveiller les déploiements et le comportement des services en soutien à votre stratégie de déploiement logiciel.

Si vous n'avez pas configuré la balise `version`, référez-vous à la [documentation du Tagging de service unifié][1] pour les informations de configuration.

## Utilisation des balises de version sur la page de service {#using-version-tags-on-the-service-page}

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versions sur la page de service" style="width:100%;">}}

Sur la page de service, si la balise `version` est disponible, vous pouvez limiter le widget des Requêtes à :

- Total des requêtes par version, ou
- Requêtes par seconde par version

Vous pouvez définir le contexte du widget Erreurs sur :

- Total des erreurs par version
- Erreurs par seconde par version, ou
- % taux d'erreur par version

Les widgets Requêtes et Erreurs peuvent être exportés vers des dashboards et des monitors.

## Utilisation des balises de version pour la détection automatique des déploiements défectueux {#using-version-tags-for-automatic-faulty-deployment-detection}

Configurer vos services avec la balise `version` permet la [Détection Automatique des Déploiements Défectueux][4]. 

Vous pouvez configurer un moniteur pour être automatiquement notifié de tous les déploiements potentiellement défectueux. Pour ce faire, accédez à la page des Nouveaux Moniteurs et choisissez Événements, et incluez `tags:deployment_analysis` dans la requête de recherche définissant le moniteur.


## Versions déployées {#versions-deployed}

Un service configuré avec des balises `version` a une section de version sur sa page de service, en dessous des principaux graphiques de santé du service. La section de version montre toutes les versions du service qui étaient actives pendant l'intervalle de temps sélectionné, avec les services actifs en haut.

Voici les informations que vous verrez par défaut :

- Les noms de version déployés pour ce service au cours de la période.
- Les moments auxquels les traces correspondant à cette version ont été vues pour la première et la dernière fois.
- Un indicateur des types d'erreurs, qui montre combien de types d'erreurs apparaissent dans chaque version qui n'étaient pas présents dans la version immédiatement précédente.

    > **Remarque :** Cet indicateur montre les erreurs qui n'ont pas été vues dans les traces de la version précédente. Cela ne signifie pas que cette version a nécessairement introduit ces erreurs. Examiner de nouveaux types d'erreurs peut être un excellent moyen de commencer à enquêter sur les erreurs.

- Requêtes par seconde.
- Taux d'erreur en pourcentage du total des requêtes.


Vous pouvez ajouter ou supprimer des colonnes de ce tableau de synthèse et vos sélections seront enregistrées. Les colonnes supplémentaires disponibles sont :

- Points de terminaison qui sont actifs dans une version qui n'étaient pas dans la version précédente.
- Temps actif, montrant la durée entre la première trace et la dernière trace envoyée à Datadog pour cette version.
- Nombre total de requêtes.
- Nombre total d'erreurs.
- Latence mesurée par p50, p75, p90, p95, p99 ou max.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page de service" style="width:100%;">}}

**Remarque :** La section des versions apparaît uniquement s'il y a plus d'une version rapportant pendant l'intervalle de temps sélectionné en haut de la page.

## Comparaison de déploiement {#deployment-comparison}

Cliquez sur n'importe quelle ligne de version dans le tableau de synthèse des versions pour ouvrir une page de comparaison de version, vous permettant de comparer deux versions du même service. Par défaut, la version sélectionnée sera comparée à la version immédiatement précédente, mais vous pouvez la changer pour comparer deux versions dans les 30 derniers jours.

La page de comparaison de versions affiche les informations suivantes :

- [Graphiques de comparaison](#comparison-graphs) : Une visualisation des requêtes et des erreurs aux services, utile pour observer divers types de [déploiements](#deployment-strategies).
- [Comparaison des erreurs](#error-comparison) : Erreurs qui ont pu être introduites ou résolues par une version.
- [Comparaison des points de terminaison](#endpoint-comparison) : Comment la latence des points de terminaison et les taux d'erreur se comportent dans chaque version.

### Graphiques de comparaison {#comparison-graphs}

Semblables aux graphiques de la page de service, les graphiques de Requêtes et d'Erreurs montrent un aperçu d'un déploiement ou des pics dans les taux d'erreur. Sur cette page, les graphiques mettent en évidence les versions sélectionnées pour la comparaison et laissent toutes les autres versions en gris pour un contexte supplémentaire.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="Graphiques de comparaison de déploiement" style="width:100%;">}}

Si [le Profiler Continu est activé][5], vous voyez également des comparaisons des indicateurs de performance clés, tels que le Temps CPU ou la Mémoire Allouée, décomposés par ressource APM. À partir de là, vous pouvez passer à la [Page de comparaison de profil][6] :

{{< img src="tracing/deployment_tracking/DeploymentTrackingProfileComparison.png" alt="Graphiques de comparaison de profil de déploiement" style="width:100%;">}}

### Comparaison des erreurs {#error-comparison}

Cette section répertorie les différences en termes de types d'erreur détectés pour chacune des deux versions et met en évidence les informations suivantes :

 - Types d'erreurs apparaissant uniquement dans la version source, utile pour le dépannage ;
 - Types d'erreurs n'apparaissant plus dans la version source, utile pour valider les corrections ; et
 - Types d'erreurs actifs dans les deux.

Ce tableau vous permet d'afficher les traces recueillies en temps réel ou les traces historiques correspondant à l'erreur sélectionnée pour effectuer un examen plus poussé.

**Remarque :** La comparaison des erreurs est basée sur les types d'erreurs _observés_. Si un type d'erreur est rare, il pourrait être listé comme n'apparaissant plus uniquement parce qu'il n'a pas été vu _encore_.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="Comparaison des erreurs" video=true style="width:100%;">}}

### Comparaison des points de terminaison {#endpoint-comparison}

Cette section vous permet de comparer la performance (requêtes, latence et erreurs) de chaque point de terminaison dans le service. Triez le tableau par Valeur pour valider que les points de terminaison à fort débit sont toujours sains après un déploiement, ou par % de Changement pour repérer de grands changements dans la latence ou les taux d'erreur.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="Comparaison des points de terminaison" style="width:100%;">}}

## Stratégies de déploiement {#deployment-strategies}

L'outil de suivi des déploiements de Datadog vous permet d'analyser les performances du code déployé lorsque vous utilisez les stratégies de déploiement suivantes (ou d'autres stratégies) de façon à détecter les mauvais déploiements de code, maîtriser l'impact des modifications et intervenir plus rapidement en cas d'incident.

### Déploiements progressifs {#rolling-deploys}

Les déploiements progressifs permettent d'éliminer les downtimes en dirigeant le trafic vers d'autres instances pendant qu'une nouvelle version est déployée sur les hosts ou les conteneurs l'un après l'autre.

Vous pouvez utiliser Datadog pour surveiller vos déploiements progressifs et détecter tout pic d'erreurs qui en résulterait.

{{< img src="tracing/deployment_tracking/rolling.png" alt="Déploiement progressif" style="width:100%;">}}

### Déploiements bleu et vert {#blue-and-green-deploys}

Les déploiements bleus et verts (ou dans toute autre combinaison de couleurs) permettent de réduire les downtimes en exécutant deux clusters de services qui acceptent tous les deux le trafic, ou en maintenant l'un d'eux en veille, mais prêt à prendre le relais en cas de problème avec l'autre.

Définir et visualiser les balises `version` pour ces services vous permet de comparer les requêtes et les erreurs afin de détecter si l'un des clusters affiche un taux d'erreur supérieur à l'autre, si un cluster ne respecte pas les SLO ou si un cluster qui ne devrait pas recevoir de trafic en reçoit.

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Déploiement bleu/vert" style="width:100%;">}}

### Déploiement canari {#canary-deploys}

Lors d'un déploiement Canary, un service est déployé sur un nombre limité de hosts ou pour un nombre limité de clients afin de tester un nouveau déploiement en limitant les risques.

L'utilisation des `version` balises dans Datadog vous permet de comparer les taux d'erreur, les traces et le comportement des services pour le déploiement canari.

Sur l'image suivante, on constate par exemple qu'une version Canary a été déployée puis supprimée après un petit nombre d'erreurs. Les traces correspondant à cette version sont disponibles à des fins d'examen sans aucun impact supplémentaire.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="Déploiement canari" style="width:100%;">}}

### Déploiement en ombre {#shadow-deploys}

Lors d'un déploiement fantôme, une version release candidate est déployée avec la version de production et le trafic entrant est envoyé aux deux services. Les utilisateurs constatent uniquement les résultats de la version de production, mais vous recueillez les données des deux versions.

Le déploiement en ombre vous permet de tester une version potentielle contre un trafic de production réel. Appliquer la balise `version` aux déploiements en ombre vous permet de comparer les taux d'erreur, les traces et le comportement des services entre les deux versions afin de déterminer si la version en ombre doit être publiée.

## Utilisation des balises de version ailleurs dans Datadog {#using-version-tags-elsewhere-within-datadog}

La balise `version` peut être utilisée n'importe où dans Datadog, que ce soit pour filtrer une vue de recherche à une version spécifique, ou pour comparer des métriques de différentes versions.

### Page des ressources {#resource-page}

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Versions sur la page des ressources" style="width:100%;">}}

Sur la page Ressource, si le tag « version » est disponible, vous pouvez définir le contexte du widget Requêtes sur :

- Requêtes totales par version
- Requêtes par seconde par version

Le widget des erreurs peut être limité à l'une des trois options qui impliquent la balise `version` :

- Total des erreurs par version
- Erreurs par seconde par version
- % Taux d'erreur par version

Toutes ces informations peuvent être exportées vers des dashboards et des monitors.

### Recherche de traces et analyses {#trace-search-and-analytics}

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="Version dans l'analyse d'application" video=true style="width:100%;">}}

Lorsque disponible, `version` peut être utilisé comme une balise pour la recherche de traces et les analyses, soit pour filtrer le mode de recherche en direct et les traces indexées, soit pour filtrer ou regrouper les requêtes d'analyses.

Les analyses, y compris le filtrage sur la balise `version`, peuvent être exportées vers des tableaux de bord et des moniteurs.

### Profils par version {#profiles-by-version}

Vous pouvez rechercher des profils qui correspondent à une version particulière. Vous pouvez également cliquer sur **Voir les profils** en haut à droite de la page [Comparaison de déploiement](#deployment-comparison) pour ouvrir le profileur continu limité à l'une ou l'autre des versions comparées.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="Filtrer les profils par version" style="width:100%;">}}

<br>

## La métrique du temps entre les déploiements {#the-time-between-deployments-metric}

Chaque fois qu'un nouveau déploiement d'un service est détecté, le suivi des déploiements calcule une valeur pour la métrique `time_between_deployments`, calculée comme la durée en secondes entre le nouveau déploiement et le déploiement de la version la plus récente avant cela. 

### Définition de la métrique {#metric-definition}

`datadog.service.time_between_deployments{env, service, second_primary_tag}`
: **Prérequis :** Cette métrique existe pour tout service APM avec le tagging de version activé via [Tagging de service unifié][1].<br>
**Description :** Le temps en secondes écoulé entre un déploiement d'un service et le déploiement de la version la plus récente avant cela.<br>
**Type de métrique :** [Distribution][2]<br>
**Tags :** La métrique est taguée avec le `env` du service, `service`, et [deuxième tag principal][3].

### Exemples {#examples}

Si vous avez un service qui déploie la version A à l'instant = 0 et la version B à l'instant = 10, alors la valeur de la métrique `datadog.service.time_between_deployments` est 10 :

Temps = 0
: `{service: foo, env: prod, cluster-name: dev-shopist, version: A}`

Temps = 10
: `{service: foo, env: prod, cluster_name: dev-shopist, version: B}`

Temps entre les déploiements
: `datadog.service.time_between_deployments{env: prod, cluster_name: dev-shopist} = 10`


Si vous déployez la version X à l'heure = 20 sur le cluster `dev-shopist`, la version Y à l'heure = 30 sur le cluster `us-staging`, et la version Y à nouveau à l'heure = 45 sur le cluster `dev-shopist`, la valeur `max` de la métrique `datadog.service.time_between_deployments` pour n'importe quel cluster est 25 (le temps du Y le plus récent moins le dernier X) : 

Temps = 20
: `{service: foo, env: staging, cluster-name: dev-shopist, version: X}`

Temps = 30
: `{service: foo, env: staging, cluster-name: us-staging, version: Y}`

Temps = 45
: `{service: foo, env: staging, cluster-name: dev-shopist, version: Y}`

Temps maximum entre les déploiements :
: `max:datadog.service.time_between_deployments{env: staging, cluster-name: *} = 25`


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/metrics/types/?tab=distribution#metric-types
[3]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: /fr/watchdog/faulty_deployment_detection/
[5]: /fr/profiler/enabling/
[6]: /fr/profiler/compare_profiles