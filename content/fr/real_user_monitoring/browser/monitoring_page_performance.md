---
title: Surveillance des performances de pages
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: Générer des analyses à partir de vos événements
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Dashboards RUM
---
Lorsqu'un utilisateur visite une page de votre site Web, un nouvel **événement Vue RUM** est créé. La vue rassemble le chargement de la page en direct ainsi que des métriques de performance. Ces dernières sont envoyées régulièrement à Datadog pendant que la page finit de se charger. Elles peuvent être vides pendant quelques secondes avant de s'afficher dans l'interface Datadog.

## Identification des goulots d'étranglement limitant les performances

Pour découvrir ce qui nuit aux performances d'une page :

1. Configurez la [surveillance Browser RUM][1] pour votre application.
2. Depuis la page RUM Applications, ouvrez le [dashboard Performance Overview][2], afin d'accéder à une vue d'ensemble de vos pages surveillées. Appliquez des filtres pour restreindre votre recherche et révéler les problèmes de performance.
3. Après avoir trouvé une page problématique, cliquez sur **View RUM events**, puis sur une vue utilisateur spécifique, afin de passer rapidement du dashboard de synthèse à une vue RUM illustrant le problème dans le [RUM Explorer][3]. Le graphique en cascade du volet latéral affiche des détails sur les performances, tels que les durées de chargement des ressources, afin de faciliter la suppression du goulot d'étranglement ou la correction de tout autre problème.
    {{< img src="real_user_monitoring/browser/rum-page-performance-dive.gif" alt="Passez du dashboard de synthèse aux détails des performances pour une vue présentant un problème."  >}}

## Métriques de performance pour les vues

Les métriques de performance sont recueillies pour chaque vue. Vous pouvez les combiner au contexte RUM recueilli par défaut (informations sur la vue de page actuelle, données GeoIP, informations sur le navigateur, etc.) ainsi qu'au [contexte global][4] afin d'identifier précisément la nature du problème.

Ces métriques de performance s'avèrent particulièrement utiles pour commencer vos enquêtes :

- **Time To First Byte :** la durée de traitement de la requête par le serveur. Si le serveur n'est pas réactif, essayez d'utiliser l'APM pour mieux comprendre les raisons derrière les lenteurs côté serveur.
- **First Contentful Paint :** temps écoulé avant l'affichage d'un élément. Consultez le graphique en cascade RUM pour identifier les ressources entraînant un blocage ainsi que les longues tâches empêchant l'affichage du contenu dans le navigateur.
- **Loading Time :** temps écoulé avant que l'utilisateur puisse interagir avec la page. Consultez le graphique en cascade RUM pour découvrir si vous chargez un trop grand nombre de ressources, ou si certaines d'entre elles bloquent l'affichage.

## Toutes les métriques de performance

Pour en savoir plus sur les attributs par défaut de tous les types d'événements RUM, consultez la section [Données collectées][5]. Pour obtenir des instructions afin de configurer l'échantillonnage, le contexte global ou des actions utilisateur et des erreurs personnalisées, consultez la section [Configuration avancée][6]. Le tableau suivant répertorie les métriques spécifiques à Datadog ainsi que les métriques de performance recueillies à l'aide de l'[API Navigation Timing][7] et de l'[API Paint Timing][8] :

| Attribut                              | Type        | Description                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                                  |
| `view.loading_time`                             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. [En savoir plus](#comment-le-temps-de-chargement-est-il-calcule).|
| `view.first_contentful_paint` | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canvas non blanc ou d'un SVG. Pour en savoir plus sur le rendu par le navigateur, consultez la [définition du w3][9].                                                                                            |
| `view.dom_interactive`        | nombre (ns) | Le moment auquel le parser termine de travailler sur le document principal. [Consulter la documentation MDN pour en savoir plus][10].                                                                                                               |
| `view.dom_content_loaded`     | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial a été entièrement chargé et parsé, même si les stylesheets, les images et les subframes qui ne bloquent pas le rendu n'ont pas fini de charger. [Consulter la documentation MDN pour en savoir plus][11]. |
| `view.dom_complete`           | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. [Consulter la documentation MDN pour en savoir plus][12].                                                                             |
| `view.load_event_end`         | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. [Consulter la documentation MDN pour en savoir plus][13].                                                                                   |
| `view.error.count`            | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                        |
| `view.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                           |
| `view.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                            |
| `view.action.count`      | nombre      | Nombre total d'actions recueillies pour cette vue.

## Surveillance d'applications monopages

Pour les applications monopage (SPA), le SDK RUM différencie les navigations `initial_load` et `route_change` avec l'attribut `loading_type`. Si un clic sur votre page Web dirige vers une nouvelle page sans actualisation complète de la page, le SDK RUM initie un nouvel événement d'affichage avec `loading_type:route_change`. La solution RUM détecte les changements de page à l'aide de l'[API History][14].

Datadog fournit une métrique de performance unique, `loading_time`, qui calcule le temps nécessaire au chargement d'une page. Cette métrique fonctionne pour les navigations `initial_load` et `route_change`.

### Comment le temps de chargement est-il calculé ?

Pour assurer la compatibilité avec les applications Web modernes, le temps de chargement est calculé à partir des requêtes réseau et des mutations DOM.

- **Chargement initial** : le temps de chargement est égal à _la mesure la plus longue_ entre :

  - La différence entre `navigationStart` et `loadEventEnd` ;
  - La différence entre `navigationStart` et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

- **Changement de route dans une application monopage** : le temps de chargement est égal à la différence entre le clic de l'utilisateur et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

### Navigation par hash dans une application monopage

Le SDK RUM surveille automatiquement les frameworks qui reposent sur une navigation par hash (`#`). Il détecte les `HashChangeEvent` et génère une nouvelle vue. Les événements issus d'une ancre HTML n'affectent pas le contexte de la vue actuelle et sont ignorés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/
[2]: /fr/real_user_monitoring/dashboards/performance_overview_dashboard
[3]: /fr/real_user_monitoring/explorer/
[4]: /fr/real_user_monitoring/browser/advanced_configuration/#add-global-context
[5]: /fr/real_user_monitoring/browser/data_collected/
[6]: /fr/real_user_monitoring/browser/advanced_configuration/
[7]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[8]: https://www.w3.org/TR/paint-timing/
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/History