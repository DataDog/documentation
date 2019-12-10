---
title: Real User Monitoring
kind: documentation
description: 'Visualisez et analysez les performances de vos applications frontend, telles qu''elles sont perçues par vos utilisateurs.'
disable_toc: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standards Datadog
---
## Qu'est-ce que le Real User Monitoring ?

La fonctionnalité Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances de vos applications frontend tel que vos utilisateurs en font l'expérience. Elle évalue la latence du frontend jusqu'au backend et génère ensuite des visualisations avancées. La bibliothèque `datadog-rum` prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles. Sur IE10 et IE11, la collecte de ressources est limitée.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/setup">}}<u>Configuration</u> : Configurer le Real User Monitoring pour votre application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/rum_explorer/">}}<u>RUM Explorer</u> : Explorer la page RUM Explorer et apprendre à ajouter des facettes et des mesures.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/rum_analytics">}}<u>RUM Analytics</u> : Effectuer des analyses RUM à partir de tous vos événements.{{< /nextlink >}}
{{< /whatsnext >}}

## Données collectées

Par défaut, toutes les données recueillies sont conservées avec une granularité complète pendant 15 jours. Le script Real User Monitoring de Datadog envoie 5 grands types d'événements à Datadog :

| Catégorie d'événement | Description                                                                                                                                                                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Vue           | À chaque fois qu'un utilisateur accède à une page de l'application configurée, un événement de type Vue est créé. Tant que l'utilisateur reste sur la page, toutes les données recueillies sont associées à cette vue via l'attribut `view.id`.                                                                                         |
| Ressource       | Un événement de type Ressource peut être généré pour les images, les XHR/Fetch, le CSS ou les bibliothèques JS. Celui-ci contient des informations sur la ressource, telles que son nom et le temps de chargement associé.                                                                                                                  |
| Tâche longue      | Lorsqu'une tâche dans un navigateur bloque le thread principal pendant plus de 50 ms, celle-ci est considérée comme une tâche longue et génère un événement spécifique. Les tâches trop longues entraînent un retard de l'affichage, du traitement des événements, etc. Ces événements sont uniquement disponibles dans Chrome et Opera. Consultez la [documentation MDN sur les tâches longues][1] (en anglais) pour en savoir plus. |
| Erreur          | À chaque fois qu'une erreur frontend est générée par le navigateur, celle-ci est enregistrée et transmise à Datadog en tant qu'événement de type Erreur.                                                                                                                                                                               |
| Action utilisateur    | Un événement de type Action utilisateur correspond à un événement personnalisé qui peut être généré pour une action utilisateur donnée.                                                                                                                                                                                                       |

Les contextes suivants, qui suivent la logique des [attributs standards Datadog][2], sont ensuite joints automatiquement à tous les événements envoyés à Datadog :

* [Requêtes HTTP][3]
* [Détails de l'URL][4]
* [Géolocalisation][5]
* [User-Agent][6]
* `sessionId`   L'ID correspondant à la session de votre utilisateur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
[2]: /fr/logs/processing/attributes_naming_convention
[3]: /fr/logs/processing/attributes_naming_convention/#http-requests
[4]: /fr/logs/processing/attributes_naming_convention/#url-details-attributes
[5]: /fr/logs/processing/attributes_naming_convention/#geolocation
[6]: /fr/logs/processing/attributes_naming_convention/#user-agent-attributes