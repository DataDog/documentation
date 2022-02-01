---
title: Surveillance des performances de pages
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
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
  - link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
    tag: Blog
    text: Surveiller les signaux Web essentiels avec la surveillance Synthetic et la solution RUM de Datadog
---
{{< img src="real_user_monitoring/browser/waterfall.png" alt="Graphique en cascade des chargements de page Real User Monitoring" style="width:75%;" >}}

## Métriques de performance pour les vues

Les événements de vue RUM recueillent un large éventail de métriques de performance pour chaque vue de page. Nous vous recommandons d'analyser les métriques de performance à l'aide des ressources suivantes :
- Les **dashboards** vous offrent une vue d'ensemble des performances de votre application. Par exemple, sur le [dashboard Performance Overview][1] prêt à l'emploi, vous pouvez appliquer un filtre basé sur des [attributs par défaut][2] recueillis par la fonctionnalité RUM afin d'afficher les problèmes qui concernent un sous-ensemble d'utilisateurs. Ce dashboard peut être dupliqué et adapté à vos besoins spécifiques. Toutes les [métriques de performance RUM](#toutes-les-metriques-de-performance) peuvent être utilisées dans des requêtes de dashboard.
- Le **graphique en cascade RUM** est disponible pour chaque événement de vue RUM du [RUM Explorer][3]. Il vous permet d'analyser les performances associées à une vue de page en particulier. Vous pouvez ainsi visualiser l'impact des ressources de votre site Web, des tâches longues et des erreurs frontend sur les performances de vos utilisateurs finaux, et ce pour chaque page.

### Signaux Web essentiels
<div class="alert alert-warning"> 
  <strong>Remarque :</strong>Les métriques sur les signaux Web essentiels sont disponibles dans Datadog depuis le package <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> pour la version 2.0.0 et les versions ultérieures.
</div>

Les [signaux Web essentiels de Google][4] désignent trois métriques visant à surveiller l'expérience utilisateur d'un site. Ces métriques sont conçues pour vous offrir une vue globale des performances de chargement, de l'interactivité et de la stabilité visuelle. Une plage de valeurs correspondant à une expérience utilisateur acceptable est fournie pour chaque métrique. Nous vous conseillons de surveiller le 75e centile de ces métriques.

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Visualisation de la synthèse des signaux Web essentiels"  >}}


| Métrique                   | Caractéristique            | Description                                                                                           | Valeur cible |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][5] | Performances de chargement | Temps nécessaire lors du chargement de la page pour afficher le plus grand objet DOM dans la fenêtre d'affichage.         | < 2,5 s       |
| [First Input Delay][6]        | Interactivité    | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.             | < 100 ms      |
| [Cumulative Layout Shift][7]  | Stabilité visuelle | Nombre de mouvements de page inattendus causés par le chargement dynamique de contenu (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur 0. | < 0,1        |

**Remarques** :
- Les métriques First Input Delay et Largest Contentful Paint ne sont pas recueillies pour les pages ouvertes en arrière-plan (par exemple, dans une fenêtre ou un nouvel onglet non actif).
- Les métriques recueillies à partir des vues de page de vos utilisateurs réels peuvent différer de celles calculées à partir des chargements de page d'un environnement fixe, comme celui des [tests Browser Synthetic][8].

### Toutes les métriques de performance


| Attribut                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                       |
| `view.largest_contentful_paint` | nombre (ns) | Temps nécessaire lors du chargement de la page pour afficher le plus grand objet DOM dans la fenêtre d'affichage.                                                                                                |
| `view.first_input_delay`        | nombre (ns) | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.                                                                                                                             |
| `view.cumulative_layout_shift`  | nombre      | Nombre de mouvements de page inattendus causés par le chargement dynamique de contenu (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur 0.                                                                               |
| `view.loading_time`             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. [En savoir plus][9].                                                                             |
| `view.first_contentful_paint`   | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'image (images d'arrière-plan incluses), de canvas non blanc ou de SVG. Pour en savoir plus sur l'affichage par le navigateur, consultez la [définition du w3c][10] (en anglais).                               |
| `view.dom_interactive`          | nombre (ns) | Le moment auquel le parser termine de travailler sur le document principal. [Consultez la documentation MDN pour en savoir plus][11].                                                                                                         |
| `view.dom_content_loaded`       | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial a été entièrement chargé et parsé, même si les feuilles de style, les images et les sous-cadres qui ne bloquent pas l'affichage n'ont pas fini de charger. [Consultez la documentation MDN pour en savoir plus][12]. |
| `view.dom_complete`             | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. [Consultez la documentation MDN pour en savoir plus][13].                                                                       |
| `view.load_event`               | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. [Consultez la documentation MDN pour en savoir plus][14].                                                                             |
| `view.error.count`              | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                          |
| `view.long_task.count`          | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                      |
| `view.resource.count`           | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                       |
| `view.action.count`             | nombre      | Nombre total d'actions recueillies pour cette vue.                                                                                                                                                                         |

## Surveillance d'applications monopages

Pour les applications monopages, le SDK RUM différencie les navigations `initial_load` et `route_change` avec l'attribut `loading_type`. Si un clic sur votre page Web redirige vers une nouvelle page sans actualisation complète de la page, le SDK RUM initie un nouvel événement de vue avec `loading_type:route_change`. La solution RUM détecte les changements de page à l'aide de l'[API History][15].

Datadog fournit une métrique de performance unique, `loading_time`, qui calcule le temps nécessaire au chargement d'une page. Cette métrique fonctionne pour les navigations `initial_load` et `route_change`.

### Comment le temps de chargement est-il calculé ?

Pour assurer la compatibilité avec les applications Web modernes, le temps de chargement est calculé à partir des requêtes réseau et des mutations DOM.

- **Chargement initial** : le temps de chargement est égal à _la mesure la plus longue_ entre :

  - La différence entre `navigationStart` et `loadEventEnd` ;
  - La différence entre `navigationStart` et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

- **Changement de route dans une application monopage** : le temps de chargement est égal à la différence entre le clic de l'utilisateur et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

### Navigation par hash dans une application monopage

Le SDK RUM surveille automatiquement les frameworks qui reposent sur une navigation par hash (`#`). Il détecte les `HashChangeEvent` et génère une nouvelle vue. Les événements issus d'une ancre HTML n'affectent pas le contexte de la vue actuelle et sont ignorés.

## Ajouter vos propres durées de performance
Outre les durées de performance proposées par défaut par la solution RUM, il est possible de mesurer de façon flexible combien de temps votre application consacre à chaque tâche. Grâce à l'API `addTiming`, vous pouvez facilement ajouter des durées de performance supplémentaires. Par exemple, il est possible d'ajouter le temps écoulé avant l'affichage de votre bannière :

```html
<html>
  <body>
    <img onload="DD_RUM.addTiming('hero_image')" src="/chemin/vers/img.png" />
  </body>
</html>
```

Ou de mesurer la durée avant que l'utilisateur ne commence à faire défiler la page :

```javascript
document.addEventListener("scroll", function handler() {
    //Supprimer l'écouteur d'événements afin de ne le déclencher qu'une seule fois
    document.removeEventListener("scroll", handler);
    DD_RUM.addTiming('first_scroll');
});
```

Une fois la durée envoyée, elle est accessible via `@view.custom_timings.<nom_durée>` (p. ex., `@view.custom_timings.first_scroll`). Vous devez [créer une mesure][16] avant de pouvoir représenter cette durée dans des analyses RUM ou dans des dashboards.

**Remarque** : pour les applications monopages, l'API `addTiming` envoie une durée relative au début de la vue RUM actuelle. Par exemple, si un utilisateur accède à votre application (chargement initial), visite une autre page après 5 secondes (changement d'itinéraire), puis déclenche enfin `addTiming` après 8 secondes, la durée est égale à 8 - 5, soit 3 secondes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/dashboards/performance_overview_dashboard
[2]: /fr/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /fr/real_user_monitoring/explorer/
[4]: https://web.dev/vitals/
[5]: https://web.dev/lcp/
[6]: https://web.dev/fid/
[7]: https://web.dev/cls/
[8]: /fr/synthetics/browser_tests/
[9]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-is-loading-time-calculated
[10]: https://www.w3.org/TR/paint-timing/#sec-terminology
[11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/History
[16]: /fr/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures