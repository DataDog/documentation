---
further_reading:
- link: https://learn.datadoghq.com/courses/core-web-vitals-lab
  tag: Centre d'apprentissage
  text: 'Atelier interactif : signaux Web essentiels'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: Blog
  text: Surveiller les signaux Web essentiels avec la surveillance Synthetic et la
    solution RUM de Datadog
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: En savoir plus sur les dashboards RUM
kind: documentation
title: Surveillance des performances de pages
---

## Présentation

Les événements de vue RUM recueillent un large éventail de métriques de performance pour chaque vue de page. Surveillez les vues de page de votre application et explorez les métriques de performance dans les dashboards et le RUM Explorer.

{{< img src="real_user_monitoring/browser/waterfall-4.png" alt="Un graphique en cascade dans l'onglet Performance d'une vue RUM dans le RUM Explorer" style="width:100%;" >}}

Les métriques de performance de vos vues sont accessibles via les ressources suivantes :

- Les [dashboards RUM][1] prêts à l'emploi, qui offrent une vue d'ensemble des performances de votre application. Par exemple, dans le [dahsboard Performance Overview][3], vous pouvez appliquer un filtre basé sur des [attributs par défaut][2] recueillis par la fonctionnalité RUM afin d'afficher les problèmes qui concernent un sous-ensemble d'utilisateurs. Vous pouvez également dupliquer ce dashboard, l'adapter à vos besoins et utiliser n'importe quelle [métrique de performance RUM](#toutes-les-metriques-de-performance) dans la requête du dashboard.
- Un graphique en cascade, disponible pour chaque événement de vue RUM du [RUM Explorer][4]. Il vous permet d'analyser les performances associées à une vue de page en particulier. Vous pouvez ainsi visualiser l'impact des ressources de votre site Web, des tâches longues et des erreurs frontend sur les performances de vos utilisateurs finaux, et ce pour chaque page.

## Durées des événements et signaux Web essentiels

<div class="alert alert-warning">
  Les métriques sur les signaux Web essentiels de Datadog sont disponibles depuis le package <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> pour la version 2.2.0 et les versions ultérieures.
</div>

Les [signaux Web essentiels de Google][5] désignent trois métriques visant à surveiller l'expérience utilisateur d'un site. Ces métriques sont conçues pour vous offrir une vue globale des performances de chargement, de l'interactivité et de la stabilité visuelle. Une plage de valeurs correspondant à une expérience utilisateur acceptable est fournie pour chaque métrique. Nous vous conseillons de surveiller le 75e centile de ces métriques.

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Visualisation de la synthèse des signaux Web essentiels" >}}

- Les métriques First Input Delay et Largest Contentful Paint ne sont pas recueillies pour les pages ouvertes en arrière-plan (par exemple, dans une fenêtre ou un nouvel onglet non actif).
- Les métriques recueillies à partir des vues de page de vos utilisateurs réels peuvent différer de celles calculées à partir des chargements de page d'un environnement contrôlé et fixe, comme celui des [tests Browser Synthetic][6]. La surveillance Synthetic considère les métriques Largest Contentful Paint et Cumulative Layout Shift comme des métriques expérimentales, et non réelles.

| Métrique                   | Caractéristique            | Description                                                                                           | Valeur cible |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][7] | Performances de chargement | Moment où l'objet DOM le plus volumineux est affiché dans la fenêtre d'affichage (à savoir, visible à l'écran) lors du chargement de la page.         | < 2,5 s       |
| [First Input Delay][8]        | Interactivité    | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.             | < 100 ms      |
| [Cumulative Layout Shift][9]  | Stabilité visuelle | Nombre de mouvements de page inattendus causés par le chargement de contenu dynamique (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur 0. | < 0,1        |
| [Interaction To Next Paint][19]| Interactivité    | Durée la plus longue entre l'interaction d'un utilisateur avec la page et le rendu suivant. Requiert la version 5.1.0 du SDK RUM. | <200 ms        |

### Éléments cibles des signaux Web essentiels

L'identification de l'élément ayant déclenché une métrique de signaux Web essentiels élevée est la première étape dans la compréhension de son origine et l'amélioration des performances. RUM transmet l'élément associé à chaque instance des signaux Web essentiels :

- Pour la métrique Largest Contentful Paint, RUM transmet le sélecteur CSS de l'élément correspondant au rendu du contenu principal.
- Pour la métrique Interaction to Next Paint, RUM transmet le sélecteur CSS de l'élément associé à l'interaction la plus longue avant le rendu suivant.
- Pour la métrique First Input Delay, RUM transmet le sélecteur CSS du premier élément avec lequel l'utilisateur a interagi.
- Pour Cumulative Layout Shift, le service RUM transmet le sélecteur CSS de lʼélément le plus modifié contribuant au CLS.

## Toutes les métriques de performance

| Attribut                       | Type        | Description                                                                                                                                                                                                                      |
|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                                  |
| `view.first_byte`               | nombre (ns) | Temps écoulé avant la réception du premier octet de la vue.                                                                                                |
| `view.largest_contentful_paint` | nombre (ns) | Moment dans la chronologie de chargement de page où l'objet DOM le plus volumineux est représenté dans la fenêtre d'affichage et est visible à l'écran.                                                                                                               |
| `view.largest_contentful_paint_target_selector` | chaîne (sélecteur CSS) | Sélecteur CSS de lʼélément correspondant au rendu du contenu principal.                                                                                     |
| `view.first_input_delay`        | nombre (ns) | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.                                                                                                                                        |
| `view.first_input_delay_target_selector`      | chaîne (sélecteur CSS) | Sélecteur CSS du premier élément avec lequel l'utilisateur a interagi.                                                                                                                |
| `view.interaction_to_next_paint`| nombre (ns) | Durée la plus longue entre l'interaction d'un utilisateur avec la page et le rendu suivant.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| chaîne (sélecteur CSS) | Sélecteur CSS de l'élément associé à l'interaction la plus longue avant le rendu suivant.                                                                                                          |
| `view.cumulative_layout_shift`  | nombre      | Nombre de mouvements de page inattendus causés par le chargement dynamique de contenu (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur 0.                                                                                      |
| `view.cumulative_layout_shift_target_selector`  | chaîne (sélecteur CSS) | Sélecteur CSS de lʼélément le plus modifié contribuant au CLS de la page.                                           |
| `view.loading_time`             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. Pour en savoir plus, consultez la rubrique relative à la [surveillance des performances des pages][10].                                                                          |
| `view.first_contentful_paint`   | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'image (images d'arrière-plan incluses), de canvas non blanc ou de SVG. Pour en savoir plus sur l'affichage par le navigateur, consultez la [définition du w3c][11] (en anglais).                                         |
| `view.dom_interactive`          | nombre (ns) | Moment auquel le parser termine de travailler sur le document principal. Pour en savoir plus, consultez la [documentation MDN][12].                                                                                                        |
| `view.dom_content_loaded`       | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial a été entièrement chargé et parsé, même si les feuilles de style, les images et les sous-cadres qui ne bloquent pas l'affichage n'ont pas fini de charger. Pour en savoir plus, consultez la [documentation MDN][13]. |
| `view.dom_complete`             | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. Pour en savoir plus, consultez la [documentation MDN][14].                                                                     |
| `view.load_event`               | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. Pour en savoir plus, consultez la [documentation MDN][15].                                                                            |
| `view.error.count`              | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                                     |
| `view.long_task.count`          | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                                 |
| `view.resource.count`           | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                                  |
| `view.action.count`             | nombre      | Nombre total d'actions recueillies pour cette vue.                                                                                                                                                                                    |

## Surveillance d'applications monopages

Pour les applications monopages, le SDK Browser RUM différencie les navigations `initial_load` et `route_change` avec l'attribut `loading_type`. Si une interaction sur votre page Web redirige vers une nouvelle URL sans actualisation complète de la page, le SDK RUM initie un nouvel événement de vue avec `loading_type:route_change`. La solution RUM détecte les changements d'URL à l'aide de l'[API History][16].

Datadog fournit une métrique de performance unique, `loading_time`, qui calcule le temps nécessaire au chargement d'une page. Cette métrique fonctionne pour les navigations `initial_load` et `route_change`.

### Méthode de calcul du temps de chargement

Pour assurer la compatibilité avec les applications Web modernes, le temps de chargement est calculé à partir des requêtes réseau et des mutations DOM.

- **Chargement initial** : le temps de chargement est égal à _la mesure la plus longue_ entre :

  - La différence entre `navigationStart` et `loadEventEnd` ; ou
  - La différence entre `navigationStart` et le premier moment sans activité sur la page. Lisez la rubrique [Méthode de calcul de l'activité des pages](#methode-de-calcul-de-l-activite-des-pages) pour en savoir plus.

- **Changement de route d'une application monopage** : le temps de chargement correspond à la différence entre le moment où l'URL a changé et le premier moment sans activité sur la page. Lisez la rubrique [Méthode de calcul de l'activité des pages](#methode-de-calcul-de-l-activite-des-pages) pour en savoir plus.

### Méthode de calcul de l'activité des pages

Le SDK Browser RUM suit l'activité des pages afin d'estimer la durée écoulée avant que l'interface ne soit à nouveau stable. À cette fin, on considère qu'une activité a lieu sur une page lorsque :

- des requêtes `xhr` ou `fetch` sont en cours ;
- le navigateur génère des entrées de durée de ressource de performance (fin de chargement de JS, CSS, etc.) ;
- le navigateur génère des mutations DOM.

On estime qu'il n'y a plus aucune activité sur une page lorsqu'aucune activité n'a eu lieu pendant 100 ms.

**Remarque** : seules les activités qui ont lieu après l'initialisation du SDK sont prises en compte.

**Avertissements** :

Il est possible que, dans les scénarios suivants, la durée de 100 ms depuis la dernière requête ou mutation DOM ne permette pas de déterminer avec précision si des activités ont toujours lieu :

- L'application recueille des données d'analyse en envoyant des requêtes à une API sur une base régulière ou après chaque clic.
- L'application utilise des techniques de type « [comet][17] » (à savoir de diffusion ou d'interrogation longue) et la requête demeure en attente pendant une durée indéfinie.

Pour déterminer avec plus de précision si des activités sont en cours dans ces scénarios, définissez le paramètre `excludedActivityUrls` sur la liste des ressources que le SDK Browser RUM ne doit pas prendre en compte lors du calcul de l'activité des pages :

```javascript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        // Exclure des URL précises
        'https://third-party-analytics-provider.com/endpoint',

        // Exclure les URL se terminant par /comet
        /\/comet$/,

        // Exclure les URL pour laquelle la fonction renvoie true
        (url) => url === 'https://third-party-analytics-provider.com/endpoint',
    ]
})
```

### Navigation par hash dans une application monopage

Le SDK RUM surveille automatiquement les frameworks qui reposent sur une navigation par hash (`#`). Il détecte les `HashChangeEvent` et génère une nouvelle vue. Les événements issus d'une ancre HTML n'affectent pas le contexte de la vue actuelle et sont ignorés.

## Ajouter vos propres durées de performance

Outre les durées de performance proposées par défaut par la solution RUM, il est possible de mesurer de façon flexible combien de temps votre application consacre à chaque tâche. Grâce à l'API `addTiming`, vous pouvez facilement ajouter des durées de performance supplémentaires.

Par exemple, il est possible d'ajouter le temps écoulé avant l'affichage de votre bannière :

```html
<html>
  <body>
    <img onload="window.DD_RUM.addTiming('hero_image')" src="/chemin/vers/img.png" />
  </body>
</html>
```

Ou de mesurer la durée avant que l'utilisateur ne commence à faire défiler la page :

```javascript
document.addEventListener("scroll", function handler() {
    // Supprimer l'écouteur d'événements afin de ne le déclencher qu'une seule fois
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

Une fois la durée envoyée, elle est accessible en nanosecondes via `@view.custom_timings.<nom_durée>` (p. ex., `@view.custom_timings.first_scroll`). Vous devez [créer une mesure][18] avant de pouvoir générer une visualisation dans le RUM Explorer ou dans vos dashboards.

Pour les applications monopages, l'API `addTiming` envoie une durée relative au début de la vue RUM actuelle. Par exemple, si un utilisateur accède à votre application (chargement initial), visite une autre page après 5 secondes (changement de route), puis déclenche enfin `addTiming` après 8 secondes, la durée est égale à `8-5 = 3` secondes.

Si votre configuration est basée sur une approche asynchrone, vous pouvez définir votre propre durée (sous forme de timestamp epoch UNIX) comme paramètre secondaire.

Par exemple :

```javascript
document.addEventListener("scroll", function handler() {
    // Supprimer l'écouteur d'événements afin de le déclencher qu'une seule fois
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});

```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/platform/dashboards/
[2]: /fr/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /fr/real_user_monitoring/platform/dashboards/performance
[4]: /fr/real_user_monitoring/explorer/
[5]: https://web.dev/vitals/
[6]: /fr/synthetics/browser_tests/
[7]: https://web.dev/lcp/
[8]: https://web.dev/fid/
[9]: https://web.dev/cls/
[10]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[11]: https://www.w3.org/TR/paint-timing/#sec-terminology
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/History
[17]: https://en.wikipedia.org/wiki/Comet_&#40;programming&#41;
[18]: /fr/real_user_monitoring/explorer/search/#setup-facets-and-measures
[19]: https://web.dev/inp/