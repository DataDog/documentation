---
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centre d'apprentissage
  text: Créez des Datadog Notebooks pour enquêter sur les incidents
- link: https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/
  tag: Guide
  text: Prise en main des fonctionnalités d'analyse des Notebooks
title: Prise en main des Datadog Notebooks
---
## Vue d'ensemble {#overview}

Les Datadog Notebooks combinent des graphiques en direct, des métriques, des logs, des monitors et [Analysis Features][1] pour créer un environnement collaboratif en temps réel à l'aide de vos données. Les équipes peuvent utiliser les notebooks pour isoler et enquêter sur les problèmes, documenter les détails des incidents, créer des guides interactifs et élaborer des rapports spéciaux pour améliorer leurs workflows proactifs.

Ce guide présente les Datadog Notebooks et démontre comment les types de notebooks améliorent la collaboration d'équipe et les workflows d'investigation.

### Avantages clés {#key-benefits}

- **Accès direct aux données** : interrogez et visualisez vos métriques, logs et traces Datadog sans quitter le document
- **Collaboration en temps réel** : plusieurs membres de l'équipe peuvent modifier simultanément, laisser des commentaires et suivre les modifications
- **Intégration des workflows** : créez des notebooks à partir d'alertes, de tableaux de bord, de logs ou de Datadog Work Management pour commencer vos investigations là où les problèmes apparaissent

## Choisir le bon type de notebook {#choosing-the-right-notebook-type}

Sélectionner le type de notebook approprié aide votre équipe à comprendre l'objectif et le résultat attendu du document. Chaque type répond à un besoin spécifique de workflow :

{{< ui >}}Investigation{{< /ui >}}Les Notebooks capturent les efforts de dépannage en temps réel. Utilisez ce type lors de l'exploration de problèmes inconnus, de comportements inattendus ou d'anomalies système. Documentez votre processus de découverte, la collaboration de votre équipe et les résolutions réussies.

{{< ui >}}Runbook{{< /ui >}} Les Notebooks fournissent des procédures étape par étape pour les tâches courantes. Utilisez ce type pour les processus de déploiement, les workflows de réponse aux incidents ou toute opération répétable que votre équipe effectue régulièrement.

{{< ui >}}Documentation{{< /ui >}} Les Notebooks servent de documents de référence vivants. Utilisez ce type pour les présentations de l'architecture système, les guides d'intégration des équipes ou les normes de configuration qui évoluent au fil du temps.

{{< ui >}}Report{{< /ui >}} Les Notebooks synthétisent les conclusions pour les parties prenantes. Utilisez-les pour résumer les incidents trimestriels, présenter des données de planification importantes ou communiquer des décisions techniques à la direction.

{{< ui >}}Postmortem{{< /ui >}} Les Notebooks analysent les incidents terminés. Créez-les après des interruptions de service pour documenter les chronologies, identifier les causes profondes et suivre les actions d'amélioration.

Chaque type de notebook permet de collaborer avec d'autres personnes et se connecte à vos données Datadog.

## Exemple d'étude de cas : Enquêter sur des erreurs de log avec des Notebooks {#example-case-study-investigating-log-errors-with-notebooks}

Lorsque des logs d'erreurs apparaissent dans votre système, la création d'un Notebook se fait en un clic. Voici un exemple de la façon dont votre équipe peut utiliser un Notebook collaboratif pour enquêter et découvrir la cause profonde de récents échecs de vérification. Ce processus permet à l'équipe d'effectuer les ajustements nécessaires pour éviter des problèmes similaires à l'avenir.

1. **Vous remarquez des pics d'erreurs dans vos logs d'application**
   {{< img src="/getting_started/notebooks/log-explorer-errors.png" alt="Description de votre image" style="width:100%;" >}}

1. **Créer un notebook depuis le Log Explorer**<br>
   Cliquez sur {{< ui >}}Open in Notebooks{{< /ui >}} et sélectionnez {{< ui >}}New notebook{{< /ui >}} sur l'écran suivant.

   {{< img src="/getting_started/notebooks/notebooks-button.png" alt="Description de votre image" style="width:80%;" >}}

1. **Sélectionnez le type de Notebook {{< ui >}}Investigation{{< /ui >}} dans le coin supérieur gauche du Notebook**

   {{< img src="/getting_started/notebooks/notebook-type.png" alt="Description de votre image" style="width:80%;" >}}

   Le Notebook conserve automatiquement vos données de log pertinentes, votre requête et votre plage temporelle depuis le Log Explorer:

   {{< img src="/getting_started/notebooks/log-errors-preserved-in-notebooks.png" alt="Description de votre image" style="width:100%;" >}}

1. **Taguez vos coéquipiers et enquêtez ensemble**

   Taguez votre coéquipier à l'aide de @mentions pour l'inclure dans l'enquête. Ils peuvent voir les mêmes modèles d'erreurs et ajouter leur analyse directement dans le Notebook. Grâce aux fonctionnalités de collaboration des Notebooks, les coéquipiers peuvent communiquer et travailler ensemble en temps réel.

   Dans cet exemple, en utilisant la fonctionnalité _transform_ Analysis Notebook, votre coéquipier est en mesure de filtrer les messages Log Error et de constater qu'une vérification spécifique échoue :

   {{< img src="/getting_started/notebooks/transform-analysis-feature.png" alt="Description de votre image" style="width:100%;" >}}

1. **Ajoutez un Monitor à votre Notebook**

   Vous ajoutez un Monitor Summary au Notebook en utilisant `/monitor` pour visualiser le statut de votre host monitor :

   {{< img src="/getting_started/notebooks/monitor.png" alt="Description de votre image" style="width:100%;" >}}

   Votre coéquipier laisse un message dans le Notebook indiquant que, puisque la vérification Minikube Monitor affiche un statut OK, il devra poursuivre son investigation.

Tout au long de cette investigation, le Notebook devient un enregistrement vivant de votre parcours de dépannage, préservant les requêtes, les découvertes et les analyses pour référence future. Cet exemple démontre la valeur fondamentale des Notebooks : ils transforment le processus de débogage en connaissances d'équipe documentées. Votre équipe dispose désormais de tout ce qui est capturé dans un format partageable et consultable qui empêche la perte de connaissances et accélère les futures investigations.

## Prochaines étapes avec les Notebooks {#next-steps-with-notebooks}

L'investigation n'est que le début. Les Notebooks continuent de gagner en valeur au fil du temps en se transformant de documents réactifs en ressources proactives. Un Notebook d'investigation créé lors d'un incident peut devenir la base de multiples ressources :

- Convertissez votre investigation en {{< ui >}}Runbook{{< /ui >}} en extrayant les étapes de dépannage réussies. Les futurs intervenants peuvent suivre votre chemin éprouvé plutôt que de repartir de zéro.
- Transformez des investigations complexes en {{< ui >}}Documentation{{< /ui >}} qui expliquent le comportement du système et les problèmes connus.
- Créez des {{< ui >}}Reports{{< /ui >}} trimestriels en agrégeant plusieurs investigations pour identifier des modèles et des améliorations systémiques.

Cette évolution crée un référentiel de connaissances centralisé qui profite à l'ensemble de l'organisation. Les nouveaux membres de l'équipe peuvent consulter ces Notebooks lors de leur intégration, les ingénieurs d'astreinte peuvent les utiliser comme runbooks lors d'incidents, et la direction peut examiner les rapports pour la planification des capacités.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/notebooks/advanced_analysis/getting_started/