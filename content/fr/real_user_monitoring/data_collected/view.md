---
title: Vues RUM
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Visualisez vos données RUM via des dashboards prêts à l'emploi
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standard Datadog
---
Une vue de page correspond à la consultation d'une page de votre site Web par un utilisateur. À chaque vue de page, les [erreurs][1], les [ressources][2], les [tâches longues][3] et les [actions utilisateur][4] associées sont mises en relation avec la vue via un attribut `view.id` unique. Notez que les vues de page sont mises à jour lorsque de nouveaux événements sont recueillis.

Pour les vues de page, des métriques de performance de chargement sont recueillies à partir de l'[API Paint Timing][5] ainsi que de l'[API Navigation Timing][6].

Pour les applications monopage (SPA), les métriques de performance sont uniquement disponibles pour la première page à laquelle l'utilisateur accède. Les frameworks Web modernes tels que ReactJS, AngularJS ou VueJS fonctionnent en mettant à jour le contenu du site sans recharger la page, ce qui empêche Datadog de recueillir les métriques de performance traditionnelles. La fonction RUM permet toutefois de surveiller les changements de page à l'aide de l'[API History][7].

## Mesures collectées

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Vue d'ensemble des mesures"  >}}

| Attribut                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                                  |
| `view.measures.first_contentful_paint` | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canevas non blanc ou d'un SVG. [En savoir plus][8]                                                                                                |
| `view.measures.dom_interactive`        | nombre (ns) | Le moment auquel le parser termine de travailler sur le document principal. [Consulter la documentation MDN pour en savoir plus][9]                                                                                                               |
| `view.measures.dom_content_loaded`     | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial est entièrement chargé et parsé, même si les stylesheets, les images et les subframes qui ne bloquent pas le rendu n'ont pas fini de charger. [Consulter la documentation MDN pour en savoir plus][10] |
| `view.measures.dom_complete`           | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. [Consulter la documentation MDN pour en savoir plus][11]                                                                             |
| `view.measures.load_event_end`         | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. [Consulter la documentation MDN pour en savoir plus][12]                                                                                   |
| `view.measures.error_count`            | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                        |
| `view.measures.long_task_count`        | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                           |
| `view.measures.resource_count`         | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                            |
| `view.measures.user_action_count`      | nombre      | Nombre total d'actions utilisateur recueillies pour cette vue.                                                                                                                                                                         |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/error/
[2]: /fr/real_user_monitoring/data_collected/resource/
[3]: /fr/real_user_monitoring/data_collected/long_task/
[4]: /fr/real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: https://www.w3.org/TR/paint-timing/#sec-terminology
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event