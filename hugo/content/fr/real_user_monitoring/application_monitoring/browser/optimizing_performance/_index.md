---
aliases:
- /fr/real_user_monitoring/browser/monitoring_performance_vitals/
- /fr/real_user_monitoring/browser/optimizing_performance/
description: Utilisez la page RUM Optimization pour identifier et résoudre les problèmes
  de performance des navigateurs grâce à l'analyse des Core Web Vitals et à la visualisation
  de l'expérience utilisateur.
further_reading:
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurez les tests de navigateur dans Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: Centre d'apprentissage
  text: 'Interactive Lab : Optimisez les performances frontend avec Datadog RUM Browser
    Monitoring'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: Blog
  text: Surveiller les signaux Web essentiels avec Datadog RUM et Synthetic Monitoring
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: Blog
  text: 'Des données à l''action : Optimisez les Core Web Vitals et plus encore avec
    Datadog RUM'
title: Optimisation des performances
---
## Présentation {#overview}

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization vous aide à trouver la cause première des problèmes de performance des navigateurs à partir du trafic réel des utilisateurs." video="true" >}}

La page Optimization aide à identifier la cause première des problèmes de performance des navigateurs à partir des données de trafic réel des utilisateurs. Recherchez les causes de la lenteur des pages à l'aide d'indicateurs clés de performance du navigateur tels que les [Core Web Vitals][1] (CWV) et l'indicateur personnalisé de Datadog [Loading Time][2], qui évalue le temps de chargement complet de la page du point de vue de l'utilisateur.

Pour une analyse plus approfondie, la page Optimization fournit une répartition détaillée des Core Web Vitals selon les caractéristiques des utilisateurs, telles que le navigateur, la région et la version de l'application. Vous pouvez utiliser ces informations pour suivre les tendances de performance au fil du temps, comprendre quels groupes d'utilisateurs sont les plus touchés et hiérarchiser les optimisations avec précision.

## Prérequis {#prerequisites}

Pour optimiser votre application, assurez-vous d'utiliser :

- [RUM Browser SDK][3] version 5.4.0 ou ultérieure
- [Session Replay][4] pour au moins certaines sessions

## Sélection d'un indicateur vital {#selecting-a-vital}

Accédez à la [page Optimization][5], située sous l'onglet [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6].

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="Vous pouvez vérifier la page Optimization pour les pages les plus visitées ou pour des pages spécifiques." style="width:100%;" >}}

Depuis cette vue, il existe deux façons de sélectionner une page ou un indicateur vital :

- Choisissez parmi les pages les plus visitées sur une treemap
- Saisissez un nom de vue dans la zone de saisie et sélectionnez la page

Les indicateurs vitaux disponibles incluent :

- **[Loading Time (LT)][2]** : KPI personnalisé de Datadog qui mesure le temps de chargement d'une page du point de vue de l'utilisateur.
- **[Largest Contentful Paint (LCP)][8]** : mesure la rapidité avec laquelle le plus grand élément visuel de votre page se charge, ce qui est un facteur critique tant pour l'expérience utilisateur que pour le classement SEO. Un LCP lent peut frustrer les utilisateurs, augmenter les taux de rebond et nuire à la visibilité dans les recherches. La page Optimization décompose le LCP en sous-parties (Time to First Byte (TTFB), délai de chargement des ressources, temps de chargement des ressources, délai de rendu) afin que vous puissiez identifier quelle phase contribue le plus à la métrique globale.
- **[First Contentful Paint (FCP)][9]** : mesure le temps écoulé entre le moment où l'utilisateur a accédé à la page pour la première fois et celui où une partie du contenu de la page est affichée à l'écran. Un FCP rapide aide à rassurer l'utilisateur sur le fait qu'une action est en cours.
- **[Cumulative Layout Shift (CLS)][10]** : mesure la plus grande série de décalages de mise en page inattendus qui se produisent pendant le cycle de vie d'une page. Un décalage de mise en page se produit lorsqu'un élément visible se déplace d'une image rendue à la suivante sans aucune interaction de l'utilisateur, perturbant la stabilité visuelle de la page. Un KPI important pour mesurer la stabilité visuelle, car il aide à quantifier la fréquence à laquelle les utilisateurs rencontrent des décalages de mise en page inattendus. Un CLS faible contribue à garantir que la page est agréable.
- **[Interaction to Next Paint (INP)][11]** : mesure le temps nécessaire pour qu'une page réponde visuellement après qu'un utilisateur a interagi avec elle. La page Optimization décompose l'INP en sous-parties (délai d'entrée, durée de traitement, délai de présentation) afin que vous puissiez déterminer si le goulot d'étranglement est dû à une contention du thread principal, à l'exécution des gestionnaires d'événements ou au rendu.

## Filtrer et évaluer {#filter-and-evaluate}

Après avoir sélectionné une page et un indicateur vital, analysez les informations sur les performances :

- Ajustez la période dans le coin supérieur droit
- Utilisez les menus déroulants pour filtrer par attributs
- Sélectionnez un groupe dans {{< ui >}}Show Filter Breakdown{{< /ui >}}
- Évaluez les indicateurs vitaux à différents centiles

Par exemple, une évaluation pc75 représente la valeur du 75e centile, couramment utilisée pour les CWV.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filtrez et évaluez vos indicateurs vitaux pour la vue sélectionnée." style="width:100%;" >}}

## Visualisez l'expérience de l'utilisateur {#visualize-the-users-experience}

La partie suivante de la page vous aide à visualiser exactement ce que vivent vos utilisateurs.

En fonction de la période et du trafic sélectionnés, la page Optimization met en évidence l'exemple le plus typique de ce que les utilisateurs voient sur la page lorsque l'indicateur vital sélectionné est capturé. Si vous utilisez [Session Replay][4], c'est ici que vous voyez un aperçu visuel de la page.

Pour certains indicateurs vitaux, vous pouvez également sélectionner d'autres versions de la page à examiner en cliquant sur {{< ui >}}See a different element{{< /ui >}}.

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Sélectionnez différents éléments pour prévisualiser et visualiser l'expérience de l'utilisateur." style="width:100%;" >}}

Pour les métriques Largest Contentful Paint et Interaction to Next Paint, la page Optimization affiche également leur répartition en différentes phases. Utilisez la répartition pour identifier quelle phase contribue le plus à la métrique globale et orientez le travail d'optimisation vers la phase concernée. Pour plus de détails sur chaque sous-partie, consultez [Diagnostiquer les Core Web Vitals avec les sous-parties][14].

## Diagnostiquer les problèmes liés aux ressources et aux erreurs {#troubleshoot-resources-and-errors}

Dans la section de dépannage, vous pouvez voir les ressources et les erreurs que les utilisateurs ont rencontrées sur la page et qui pourraient avoir affecté la performance de l'indicateur vital. Par exemple, pour le Largest Contentful Paint (LCP), vous pouvez voir les ressources qui ont été chargées avant que le LCP ne soit déclenché. Puisque le LCP est un indicateur du temps nécessaire au chargement du plus grand élément sur la page, vous pourriez examiner les points suivants :

- Tout ce qui se produit avant cela pourrait causer des lenteurs ou des problèmes de rendu
- Les ressources particulièrement lentes ou volumineuses pourraient contribuer aux problèmes de performance
- Les erreurs récurrentes qui pourraient causer des problèmes

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="La section Troubleshooting affiche les ressources et les erreurs que les utilisateurs ont rencontrées sur la page et qui pourraient avoir affecté la performance de l'indicateur vital." style="width:100%;" >}}

## Voir les exemples d'événements {#view-event-samples}

Pour tout voir dans le contexte du reste de l'activité de la page, faites défiler la page jusqu'au diagramme en cascade et à la chronologie des événements. Le diagramme en cascade affiche la chronologie des événements jusqu'au moment où l'indicateur vital a été capturé.

Vous pouvez sélectionner un autre exemple d'événement à l'aide du menu déroulant en haut à gauche, et déplier n'importe quel événement dans le diagramme en cascade en cliquant dessus pour voir le panneau latéral, comme illustré ci-dessous.

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="Affichez des exemples d'événements pour tout voir dans le contexte du reste de l'activité de la page." style="width:100%;" >}}

## Profilage de navigateur au sein des exemples d'événements {#browser-profiling-within-event-samples}
Pour une analyse plus approfondie des causes profondes, utilisez le profilage de navigateur avec RUM pour identifier quelle activité JavaScript ou de rendu provoque des expériences lentes ou non réactives. Le profilage révèle des problèmes de performance qui ne sont pas toujours visibles uniquement via les Core Web Vitals. Pour commencer, [assurez-vous que le profilage de navigateur est activé dans la configuration de votre RUM SDK][12].
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Exemple de profilage de navigateur lors de l'analyse d'un exemple d'événement." style="width:100%;" >}}

## Audits Lighthouse {#lighthouse-audits}

[Lighthouse][15] est un outil Google open source qui évalue vos pages sur des catégories telles que la performance, l'accessibilité, les bonnes pratiques, le SEO et la navigation agentique, afin que vous puissiez trouver et corriger ce qui ralentit ou frustre les utilisateurs.

Un [test Synthetic de navigateur][7] peut exécuter un audit Lighthouse et envoyer les scores à la vue RUM correspondante. Les mesures de laboratoire Lighthouse complètent les données recueillies auprès des utilisateurs réels sur cette page, afin que vous puissiez suivre régulièrement la qualité du front-end.

L'audit s'exécute une fois par exécution de test, sur l'URL finale atteinte par le test, et fournit cinq scores, un par catégorie, allant de 0 à 100 :

- **Performance** : mesure la rapidité avec laquelle la page se charge, affiche le contenu et devient interactive.
- **Accessibility** : mesure dans quelle mesure les personnes handicapées peuvent naviguer sur la page et l'utiliser, sur la base de checks automatisés.
- **Best Practices** : mesure si la page respecte les normes modernes en matière de sécurité, de compatibilité avec les navigateurs et de qualité du code.
- **SEO** : mesure si les moteurs de recherche peuvent découvrir, comprendre et indexer la page.
- **Agentic** : mesure dans quelle mesure les agents IA peuvent comprendre la page, y naviguer et interagir avec elle.

### Prérequis {#prerequisites-1}

- Un [test Synthetic de navigateur][7] qui s'exécute sur **Chrome pour ordinateur** depuis un emplacement géré (Datadog).
- [Collecte de données RUM activée sur le test][16], avec une application RUM sélectionnée. Le test injecte le RUM Browser SDK dans la page qu'il charge, de sorte que le site testé n'a pas besoin d'être instrumenté séparément pour RUM.
- Le test doit être enregistré et exécuté selon un planning ou à la demande. Les audits ne s'exécutent pas pendant que vous créez ou enregistrez un test, ni lors des exécutions déclenchées depuis CI/CD.

### Configurer un audit Lighthouse {#set-up-a-lighthouse-audit}

Vous pouvez activer les audits Lighthouse depuis une application RUM ou depuis Synthetic Monitoring :

- **Depuis une application RUM** : sur la page Optimization, sélectionnez une vue qui ne contient pas encore de données Lighthouse, puis sélectionnez {{< ui >}}Create a Synthetics test{{< /ui >}} dans le panneau {{< ui >}}Lighthouse{{< /ui >}} lorsqu'il est vide. La collecte de données RUM et l'audit Lighthouse sont activés automatiquement, et le test est lié à l'application RUM. Terminez la configuration du test et enregistrez-le.
- **Depuis Synthetic Monitoring** : créez ou modifiez un [test de navigateur][7], activez la [collecte de données RUM][16] et sélectionnez votre application RUM, puis activez {{< ui >}}Run Lighthouse audit{{< /ui >}} (disponible uniquement lorsque la collecte de données RUM est activée). Enregistrez les étapes permettant d'atteindre la page que vous souhaitez auditer, puis enregistrez le test.

### Afficher les résultats Lighthouse {#view-lighthouse-results}

Une fois le test exécuté, les résultats Lighthouse apparaissent à deux endroits sous [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6]. Le panneau et le tableau Lighthouse sont définis uniquement en fonction de l'application, de la vue et de la période. Les autres filtres de page, tels que le navigateur, le pays ou l'équipe, ne s'appliquent pas.

Sur la page **Optimization**, lorsqu'une seule vue est sélectionnée, le panneau {{< ui >}}Lighthouse{{< /ui >}} affiche l'audit le plus récent de la vue pour la période sélectionnée :

- Cinq jauges de score de catégorie
- L'évolution de chaque score de catégorie par rapport à la période précédente
- Métriques de laboratoire mesurées par Lighthouse
- Nombre d'audits réussis et échoués
- Tendances des scores au fil du temps

Depuis le panneau, vous pouvez ouvrir le rapport dans la visionneuse Lighthouse, le télécharger au format JSON ou ouvrir le résultat du test Synthetic d'origine.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-panel.png" alt="Le panneau Lighthouse affichant les scores de catégorie, les métriques de laboratoire, les résultats d'audit et une tendance des scores au fil du temps." style="width:100%;" >}}

Sur la **page de synthèse Performance Monitoring**, la section {{< ui >}}Lighthouse{{< /ui >}} affiche le tableau **Lighthouse scores by view**, qui compare les scores entre les vues. Utilisez le sélecteur de centile (p75 par défaut) pour choisir le centile des scores d'audit affiché dans le tableau pour la période sélectionnée, puis sélectionnez une ligne pour ouvrir la page Optimization de cette vue.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-scores-by-view.png" alt="Le tableau Lighthouse scores by view compare les scores de catégorie entre les vues RUM et comporte un sélecteur de centile." style="width:100%;" >}}

### Métriques et attributs {#metrics-and-attributes}

L'attribut `@synthetics.lighthouse_audited` est défini sur `true` pour chaque vue auditée. Pour trouver les vues auditées dans [RUM Explorer][17], définissez le type d'événement sur {{< ui >}}Views{{< /ui >}} et recherchez `@synthetics.lighthouse_audited:true`. Les vues auditées proviennent de tests Synthetic plutôt que de sessions d'utilisateurs réels, donc supprimez tout filtre `@session.type:user` de la requête.

Les scores de catégorie sont disponibles en tant que métriques : vous pouvez donc les représenter graphiquement sur des dashboards et configurer des alertes en cas de régression à l'aide de monitors :

- `rum.measure.lighthouse.performance`
- `rum.measure.lighthouse.accessibility`
- `rum.measure.lighthouse.best_practices`
- `rum.measure.lighthouse.seo`
- `rum.measure.lighthouse.agentic`

Les métriques de score Lighthouse sont marquées avec `application.id` et `view.name`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[4]: /fr/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /fr/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /fr/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[14]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[7]: /fr/synthetics/browser_tests/
[15]: https://developer.chrome.com/docs/lighthouse/overview/
[16]: /fr/synthetics/guide/explore-rum-through-synthetics/
[17]: /fr/real_user_monitoring/explorer/