---
aliases:
- /fr/synthetics/apm/browser_tests
description: Consultez les résultats des tests de navigateur synthétiques et comparez
  les exécutions d'échantillons réussies ou échouées aux exécutions de test.
further_reading:
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentation
  text: Explorer des données RUM et Session Replay dans Synthetics
- link: /synthetics/dashboards/browser_test/
  tag: Documentation
  text: Découvrez le dashboard des performances des tests de navigateur
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: Premiers pas avec Synthetic Monitoring et les tests de navigateur
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Surveiller les signaux Web essentiels avec Synthetic Monitoring
- link: https://www.datadoghq.com/blog/bits-investigation-synthetic-tests/
  tag: Blog
  text: Diagnostiquez plus rapidement les échecs de tests Synthetic avec Bits Investigation
title: Résultats des tests de navigateurs
---
## Présentation {#overview}

La page des détails du test s'ouvre après l'exécution d'un test de navigateur synthétique et est organisée en quatre onglets: [{{< ui >}}Activity{{< /ui >}}](#test-activity), [{{< ui >}}Test Runs{{< /ui >}}](#test-runs), [{{< ui >}}Performance{{< /ui >}}](#test-performance) et [{{< ui >}}Properties{{< /ui >}}](#test-properties). Utilisez ces onglets pour surveiller la disponibilité, inspecter les exécutions individuelles, examiner les métriques de performance globales et gérer la configuration des tests. Lorsqu'une exécution échoue, consultez [Résultats échoués](#failed-results) pour obtenir des outils de dépannage tels que des résumés d'échec par IA et une comparaison de captures d'écran.

## Activité du test {#test-activity}

Dans l'onglet {{< ui >}}Activity{{< /ui >}}, vous pouvez voir:

- Le graphique {{< ui >}}Global Uptime{{< /ui >}}, qui affiche la disponibilité totale de tous les emplacements de test sur un intervalle de temps donné. La visualisation de la disponibilité globale ne s'affiche en rouge que si les [conditions d'alerte][20] configurées pour un test sont déclenchées dans l'intervalle de temps donné. Étant donné que la disponibilité par emplacement est calculée en fonction du résultat final du test une fois les nouvelles tentatives terminées, les intervalles de [nouvelle tentative rapide][24] ont un impact direct sur ce qui apparaît dans votre graphique de disponibilité totale. Pour plus d'informations sur la surveillance de la disponibilité, consultez le guide [Surveillance de la disponibilité des sites Web avec des SLO][14].
- Une {{< ui >}}Timeline{{< /ui >}} des déclenchements d'alerte, des rétablissements et des modifications de test.
- Un panneau {{< ui >}}Summary{{< /ui >}} pour l'événement de chronologie sélectionné, montrant ce qui s'est passé, le résultat de l'échec et les prochaines étapes suggérées pour l'investigation.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="L'onglet Activité sur une page Détails du test de navigateur montrant la disponibilité globale, la chronologie des alertes et un panneau de détails d'échec avec Bits Investigation." style="width:100%;" >}}

## Exécutions de test {#test-runs}

Dans l'onglet {{< ui >}}Test Runs{{< /ui >}}, vous pouvez voir toutes les exécutions individuelles de votre test. Filtrez par statut (réussi ou échoué), type d'exécution, emplacement ou appareil, et cliquez sur n'importe quelle ligne pour inspecter cette exécution en détail.

{{< img src="synthetics/browser_tests/synthetics_test_runs.png" alt="L'onglet Exécutions de test sur une page Détails du test de navigateur affichant un tableau filtrable des exécutions de test avec des colonnes pour le statut, la date, le type d'exécution, les étapes, la durée, l'emplacement, l'appareil, le navigateur et la version du test." style="width:100%" >}}

Les exécutions de test de navigateur incluent des composants tels que [des captures d'écran](#screenshots-and-actions), [des données de performance de page](#test-performance), [des erreurs](#errors-and-warnings), [des ressources](#resources) et [des traces backend](#backend-traces) pour vous aider à résoudre votre [échec de test](#failed-results).

{{% collapse-content title="Colonnes d'exécution de test" level="h3" %}}

Ce qui suit décrit chaque colonne du tableau {{< ui >}}Test Runs{{< /ui >}}:

Status
: Le statut de l'exécution du test (`PASSED` ou `FAILED`).

Date
: Le temps relatif et l'horodatage auxquels l'exécution a eu lieu.

Type d'exécution
: Le type d'exécution de test (planifiée, CI ou déclenchée manuellement).

Étapes
: Le nombre d'étapes de test terminées sur le total configuré pour l'exécution.

Duration
: La durée nécessaire à l'exécution du test pour se terminer.

Région
: L'emplacement géré ou privé à partir duquel le test a été exécuté.

Appareil
: Le type d'appareil à partir duquel le test a été exécuté.

Browser
: Le type de navigateur à partir duquel le test a été exécuté.

Version du test
: La version de la configuration de test utilisée pour l'exécution.

{{% /collapse-content %}}

### Sessions RUM {#rum-sessions}

Pour afficher les sessions associées et les replays disponibles dans le [RUM Explorer][22], cliquez sur {{< ui >}}View Session in RUM{{< /ui >}}. Pour accéder à une session utilisateur pour une action ou une étape particulière dans [Session Replay][23], cliquez sur {{< ui >}}Replay Session{{< /ui >}}. Pour plus d'informations, consultez [Explorer RUM et Session Replay dans Synthetic Monitoring][16].

### Captures d'écran et actions {#screenshots-and-actions}

Chaque étape de test exécutée contient une capture d'écran de l'action de l'étape, un lien vers la session dans Session Replay, la description de l'étape, l'URL de départ pour une étape donnée, l'ID de l'étape, la durée de l'étape et des informations sur les performances de la page.

### Erreurs et avertissements {#errors-and-warnings}

Cliquez sur la pastille {{< ui >}}Errors{{< /ui >}} pour accéder à l'onglet {{< ui >}}Errors & Warnings{{< /ui >}} et examiner une liste d'erreurs séparées par type d'erreur (`js` ou `network`) et par statut (le code d'état réseau).

{{< img src="synthetics/browser_tests/test_results/synthetics_errors.png" alt="Détails de l'exécution du test de navigateur avec la pastille Erreurs mise en évidence sur chaque étape, indiquant où cliquer pour ouvrir l'onglet Erreurs et avertissements" style="width:100%" >}}

L'onglet {{< ui >}}Errors & Warnings{{< /ui >}} affiche une liste d'erreurs séparées par type d'erreur (`js` ou `network`) et par statut (le code d'état réseau).

Le type d'erreur est consigné lorsque le test de navigateur interagit avec la page. Il correspond aux erreurs collectées entre le moment où la page est ouverte et le moment où il est possible d'interagir avec la page. Le nombre maximal d'erreurs pouvant être affichées est de 8, par exemple : 2 `network` + 6 `js` erreurs.

### Ressources {#resources}

Cliquez sur la pastille {{< ui >}}Resources{{< /ui >}} pour accéder à l'onglet {{< ui >}}Resources{{< /ui >}} et examiner la combinaison de requêtes et de ressources, y compris la durée totale de l'étape sous {{< ui >}}Fully Loaded{{< /ui >}} et le fournisseur CDN qui dessert les ressources. 

{{< img src="synthetics/browser_tests/test_results/synthetics_resources.png" alt="Détails de l'exécution du test de navigateur avec la pastille Ressources mise en évidence sur chaque étape, indiquant où cliquer pour ouvrir l'onglet Ressources" style="width:100%" >}}

Vous pouvez filtrer les ressources par type et effectuer une recherche par nom dans la barre de recherche. Le nombre maximal de ressources pouvant être affichées est de 100. Les ressources sont classées par heure de début et les 100 premières sont affichées dans Datadog.

{{% collapse-content title="Colonnes de l'onglet Ressources" level="h4" %}}

Ce qui suit décrit les en-têtes de colonne de l'onglet {{< ui >}}Resources{{< /ui >}} :

Temps relatif 
: Le moment où la ressource a commencé à se charger pendant l'étape de test.

CDN
: Le fournisseur CDN qui a servi la ressource. Survolez l'icône d'un fournisseur CDN pour voir l'état brut du cache.  
Datadog détecte Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva et Sucuri.

Resource
: L'URL de la ressource.

Type
: Le type de ressource (HTML, Téléchargement, CSS, Fetch, Image, JavaScript, XHR ou Autre).

Méthode
: La méthode de la requête.

Protocole
: Le protocole de la requête.

Status
: Le code d'état de la réponse HTTP.

Duration
: Le temps nécessaire pour effectuer la requête.

Size
: La taille de la réponse de la requête.

{{% /collapse-content %}}

Pour les ressources Fetch et XHR, cliquez sur une ligne de ressource pour afficher ses en-têtes et son corps de requête et de réponse. Les détails de la charge utile ne sont disponibles que lorsque {{< ui >}}Capture HTTP payloads{{< /ui >}} est activé dans les [options avancées][28] du test.

### Traces backend {#backend-traces}

Cliquez sur la pastille {{< ui >}}Traces{{< /ui >}} pour accéder à l'onglet {{< ui >}}Traces{{< /ui >}} et explorer les traces APM associées au test de navigateur. Bien que l'interface utilisateur soit similaire à la [Vue des traces][7] dans le Trace Explorer, une étape de test de navigateur peut effectuer plusieurs requêtes vers différentes URL ou différents endpoints. Cela entraîne plusieurs traces associées, en fonction de votre configuration de traçage et des URL que vous avez autorisées pour les tests de navigateur sur la [page Paramètres de Synthetic Monitoring][8]. 

Pour plus d'informations sur la corrélation entre les produits, consultez le guide [Facilitez le dépannage grâce à la corrélation entre les produits][21].

### Durée de l'étape {#step-duration}

La durée de l'étape représente le temps nécessaire pour qu'une étape soit considérée comme entièrement chargée en utilisant le [système de localisation Datadog][9]. Pour plus d'informations, consultez [Comment la durée de l'étape est déterminée dans les tests de navigateur][25].

Si votre test atteint le temps d'exécution maximal, le message de délai d'attente indique que la durée totale inclut à la fois les étapes du test et la surcharge du système. Par conséquent, la durée de test rapportée peut différer de la somme des durées des étapes individuelles.

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="Message d'erreur de durée d'exécution du test indiquant « Temps d'exécution maximal du test atteint. Cela inclut les étapes de test et la surcharge du système, de sorte que les durées de test rapportées peuvent varier. »" style="width:90%;" >}}

## Performances du test{#test-performance}

Sur l'onglet {{< ui >}}Performance{{< /ui >}}, vous pouvez voir les métriques de performance globales sur toutes les exécutions de votre test :

Cartes - **Taux de réussite du navigateur** pour chaque type de navigateur (Chrome, Firefox, Edge), affichant le pourcentage d'exécutions réussies dans l'intervalle de temps sélectionné.
Graphiques - **Durée moyenne du test par type de navigateur** et **Durée moyenne du test par emplacement et appareil**, qui affichent le temps que chaque navigateur, emplacement et appareil prend pour terminer le test dans un intervalle de temps donné.
Graphiques - **p75 Largest Contentful Paint** et **p75 Cumulative Layout Shift**, qui affichent le 75e percentile de ces [métriques Core Web Vital][6] agrégés sur les exécutions.

{{< img src="synthetics/browser_tests/synthetics_browser_graphs.png" alt="L'onglet Performances sur une page Détails du test de navigateur affichant les taux de réussite de Chrome, Firefox et Edge, les graphiques de durée de test par type de navigateur et emplacement, ainsi que les métriques Core Web Vital p75 LCP et CLS" style="width=80%" >}}

Au sein d'une exécution de test individuelle, le [Largest Contentful Paint][2] et le [Cumulative Layout Shift][3] sont affichés sous forme de pastilles à droite de l'URL de chaque étape. Le [First Input Delay][4] est disponible en tant que métrique réelle si vous utilisez le [Real User Monitoring][5] pour collecter des données utilisateur réelles. Pour plus d'informations, consultez [Monitoring Page Performance][6].

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Métriques de laboratoire synthétiques" style="width:100%" >}}

## Propriétés du test{#test-properties}

L'onglet {{< ui >}}Properties{{< /ui >}} contient les détails de configuration, les informations de propriété et les intégrations associées à votre test. Utilisez la navigation de gauche pour basculer entre les sections.

{{< img src="synthetics/browser_tests/synthetics_properties_tab.png" alt="L'onglet Propriétés sur une page Détails du test de navigateur affichant les sections Propriété, Exécution et Monitor, avec une navigation à gauche pour les configurations Continuous Testing, Parent Tests et autres" style="width=80%" >}}

{{% collapse-content title="Sections de l'onglet Propriétés" level="h3" %}}

Ce qui suit décrit chaque section disponible sur l'onglet {{< ui >}}Properties{{< /ui >}} :

{{< ui >}}Ownership{{< /ui >}}
: Affiche le propriétaire du test, l'éditeur, la date de création, la date de dernière modification, les environnements, les équipes et les tags. Les tests renvoient également à un [dashboard de test de navigateur][11] synthétique prêt à l'emploi.

{{< ui >}}Execution{{< /ui >}}
: Affiche la fréquence de test, les conditions d'alerte et le comportement de nouvelle tentative.

{{< ui >}}Monitor{{< /ui >}}
: Contient le nom du [monitor de test Synthetic][13], la priorité, les destinataires configurés et le message de notification.

{{< ui >}}Continuous Testing{{< /ui >}}
: Définit la [règle d'exécution][12] utilisée lorsque ce test s'exécute dans le cadre d'un [pipeline Continuous Testing CI][19].

{{< ui >}}Parent Tests{{< /ui >}}
: Répertorie les tests qui font référence à ce test, tels que les tests multi-étapes qui l'incluent en tant que sous-test.

{{< ui >}}Parent Suites{{< /ui >}}
: Répertorie les [suites de tests][26] auxquelles ce test appartient.

{{< ui >}}Downtimes{{< /ui >}}
: Répertorie les [indisponibilités planifiées][27] qui suspendent l'exécution de ce test, par exemple pendant les fenêtres de maintenance planifiée.

{{< ui >}}Configuration as Code{{< /ui >}}
: Exporte la configuration de test dans des formats tels que Terraform pour gérer les tests en tant que code.

{{% /collapse-content %}}

## Résultats ayant échoué {#failed-results}

Un résultat de test est considéré comme `FAILED` s'il ne satisfait pas ses assertions ou si une étape a échoué pour une autre raison. Vous pouvez résoudre les exécutions ayant échoué en examinant leurs captures d'écran, en vérifiant les [erreurs](#errors-and-warnings) potentielles au niveau de l'étape et en consultant les [ressources][17] et les [traces backend](#backend-traces) générées par leurs étapes.

### Résumés d'échec par IA {#ai-failure-summaries}

Lorsqu'une exécution de test de navigateur échoue, Datadog génère un résumé d'échec par IA pour vous aider à identifier la cause et les prochaines étapes de l'investigation. Chaque résumé comprend :

- Une brève explication de ce qui a échoué, basée sur les données d'exécution telles que les erreurs réseau, les assertions et les captures d'écran.
- Une classification de l'échec en tant que **véritable échec** (un problème réel avec votre application) ou **mauvaise configuration de test** (un problème avec la configuration du test).
- Prochaines étapes suggérées pour le dépannage.

Les résumés d'échec par IA apparaissent sur la page des détails d'exécution de test pour toute exécution de test de navigateur ayant échoué. Considérez-les comme un point de départ pour l'investigation, et non comme une analyse de cause racine faisant autorité, car le contenu généré par LLM peut contenir des inexactitudes. Utilisez les boutons 👍 et 👎 sur le résumé pour partager vos commentaires et aider à améliorer les résultats futurs.

{{< img src="synthetics/browser_tests/test_results/synthetics_ai_summaries_new.png" alt="Panneau de résumé d'échec par IA sur une exécution de test de navigateur ayant échoué" style="width:100%" >}}

### Comparer les captures d'écran {#compare-screenshots}

Pour vous aider lors de l'investigation, cliquez sur {{< ui >}}Compare Screenshots{{< /ui >}} pour recevoir des captures d'écran côte à côte du résultat ayant échoué et de la dernière exécution réussie. La comparaison vous aide à repérer les différences qui auraient pu causer l'échec du test.

{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="Comparer les captures d'écran entre vos exécutions ayant échoué et celles ayant réussi" style="width:90%;" >}}

**Remarque**: La comparaison est effectuée entre deux exécutions de test ayant la même version, la même URL de départ, le même appareil, le même navigateur et le même type d'exécution (planifiée, déclenchement manuel, CI/CD). S'il n'y a pas d'exécution réussie antérieure avec les mêmes paramètres, aucune comparaison n'est proposée.
### Erreurs courantes de test de navigateur {#common-browser-test-errors}

`Element located but it's invisible` 
: L'élément est sur la page mais ne peut pas être cliqué — par exemple, si un autre élément est superposé par-dessus.

`Cannot locate element`
: L'élément est introuvable dans le HTML.

`Select did not have option`
: L'option spécifiée est absente du menu déroulant.

`Forbidden URL`
: Le test a probablement rencontré un protocole non pris en charge. [Contactez le support][10] pour plus de détails.

`General test failure`
: Un message d'erreur général. [Contactez le support][10] pour plus de détails.

## Événements de test {#test-events}

Les alertes de vos monitors de test Synthetic apparaissent sur la chronologie dans l'onglet [{{< ui >}}Activity{{< /ui >}}](#test-activity), où vous pouvez examiner les déclenchements d'alerte, les rétablissements et les modifications de test parallèlement au graphique de disponibilité global. Pour rechercher des alertes provenant de tests Synthetic dans Events Explorer, accédez à [{{< ui >}}Events{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][18] et saisissez `@evt.type:synthetics_alert` dans la requête de recherche. Pour en savoir plus, consultez la section [Utiliser des monitors de test Synthetic][13].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /fr/real_user_monitoring/
[6]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /fr/tracing/trace_explorer/trace_view/
[8]: /fr/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /fr/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /fr/help/
[11]: /fr/synthetics/dashboards/browser_test/
[12]: /fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /fr/synthetics/guide/synthetic-test-monitors/
[14]: /fr/synthetics/guide/uptime-percentage-widget/
[15]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /fr/synthetics/guide/explore-rum-through-synthetics/
[17]: /fr/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /fr/continuous_testing/cicd_integrations
[20]: /fr/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /fr/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /fr/real_user_monitoring/explorer
[23]: /fr/real_user_monitoring/session_replay
[24]: /fr/synthetics/browser_tests/?tab=requestoptions#fast-retry
[25]: /fr/synthetics/guide/step-duration/
[26]: /fr/synthetics/test_suites/
[27]: /fr/synthetics/platform/downtime/
[28]: /fr/synthetics/browser_tests/#advanced-options