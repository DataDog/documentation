---
aliases:
- /fr/synthetics/dashboards/testing_coverage
- /fr/synthetics/test_coverage
description: Évaluez la couverture de votre collection de tests pour les actions de
  navigateur.
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: Blog
  text: Suivez la couverture des tests avec Datadog RUM et Synthetic Monitoring
- link: /synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests de navigateurs Synthetic
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentation
  text: En savoir plus sur les actions RUM
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: En savoir plus sur Session Replay
title: Couverture des tests
---
## Présentation {#overview}

Explorez la couverture des tests Synthetic de votre collection de tests concernant les actions de navigateur RUM sur la [{{< ui >}}Test Coverage{{< /ui >}} page][1], que vous trouverez sous {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}.

La [{{< ui >}}Test Coverage{{< /ui >}} page][1] fournit des informations exploitables sur la couverture globale des tests de vos [applications RUM][2]. Elle utilise les [données collectées à partir du SDK RUM pour navigateur][3] et les [résultats des tests de navigateur Synthetic][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Page Couverture des tests avec une section Vue d'ensemble, une section Actions non testées et une section Actions testées" style="width:100%" >}}

La page Couverture des tests présente les informations suivantes :

- Les pages web les plus visitées
- Le pourcentage d'[actions RUM][5] testées
- Le nombre d'actions testées et le nombre total d'actions
- Le nombre de tests de navigateur couvrant les actions
- Le nombre d'interactions réelles des utilisateurs 

## Étudiez la couverture des tests pour une application ou une vue {#investigate-test-coverage-for-an-application-or-view}

Construisez une collection de tests plus complète et précise en identifiant les actions non testées et en les associant aux interactions réelles des utilisateurs sur la page Couverture des tests. 

Pour identifier les zones de votre application ou de vos vues où vous devriez créer des tests de navigateur :

1. Sélectionnez une application RUM dans le {{< ui >}}Application{{< /ui >}} menu déroulant ou une vue dans le {{< ui >}}View Name{{< /ui >}} menu déroulant. 
2. Cliquez sur {{< ui >}}Custom{{< /ui >}} pour filtrer les données sur les [actions personnalisées][5], qui sont uniques et offrent des résultats de couverture plus précis que les actions générées. Si vous souhaitez inclure les actions générées dans l'analyse de la couverture des tests, sélectionnez {{< ui >}}All Actions{{< /ui >}}.
3. Identifiez les lacunes dans votre couverture de tests en examinant les informations présentées dans les sections suivantes : 

   {{< ui >}}Test Coverage Overview{{< /ui >}} 
   : Affiche le pourcentage d'actions testées, le pourcentage d'actions testées pondéré par le nombre d'interactions réelles des utilisateurs, ainsi qu'une liste des vues principales avec leur nombre de sessions utilisateur et de tests de navigateur, et le pourcentage d'actions testées. 

   {{< ui >}}Untested Actions{{< /ui >}}
   : Affiche le nombre d'actions utilisateur non testées, le nombre total d'actions collectées et une liste des principales actions avec lesquelles les utilisateurs réels interagissent le plus mais qui _ne sont pas_ testées.

   {{< ui >}}Tested Actions{{< /ui >}}
   : Affiche le nombre de tests de navigateur couvrant les actions des utilisateurs, le nombre d'interactions réelles des utilisateurs et une liste des principales actions avec lesquelles les utilisateurs réels interagissent le plus et qui _sont_ testées. 

La [page Couverture des tests][1] renseigne les actions qui sont largement utilisées et masque les actions qui sont moins couramment utilisées dans votre application. Pour plus d'informations sur les données affichées, consultez [Métriques Synthetic Monitoring][6].

## Voir les replays et ajouter des tests {#view-replays-and-add-tests}

Utilisez les informations de la [page Couverture des tests][1] pour répondre aux questions suivantes :

- Quelles actions ne sont pas testées dans votre application ?
- Quelles vues sont les plus populaires auprès de vos utilisateurs ? 
- Quelles actions nécessitent davantage de tests de navigateur ?
- Quel pourcentage de tests de navigateur couvre les actions des utilisateurs ? 

### Voir les Session Replays {#view-session-replays}

Cliquez sur l'icône {{< ui >}}Play{{< /ui >}} à côté d'une action dans le tableau {{< ui >}}Untested Actions{{< /ui >}} pour examiner un [enregistrement de l'interaction réelle de l'utilisateur][7] dans [Session Replay][8]. 

### Examiner les actions {#examine-actions}

Cliquez sur une action pour accéder au nombre de tests, de vues, de sessions, ainsi qu'à un sous-ensemble de ces tests, vues et sessions qui incluent l'action sélectionnée. 

{{< img src="synthetics/test_coverage/tested_action.png" alt="Un panneau latéral d'action avec des onglets affichant les tests Synthetic, les vues RUM et les Session Replays associés" style="width:100%" >}}

Ajoutez les sections les plus populaires de votre application à un test de navigateur, nouveau ou existant, afin d'être alertés lorsque les parcours utilisateur clés de votre application sont affectés négativement par une modification de code.

 Pour créer un test, cliquez sur {{< ui >}}+ New Test{{< /ui >}} en haut à droite de la [page Couverture des tests][1]. Vous pouvez exécuter des tests [directement dans vos pipelines CI/CD][9] pour vous assurer qu'aucune régression ne se produit avant de publier du code en production.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /fr/synthetics/guide/explore-rum-through-synthetics/
[3]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /fr/synthetics/browser_tests/
[5]: /fr/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /fr/synthetics/metrics/
[7]: /fr/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /fr/continuous_testing/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser