---
aliases:
- /fr/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/search/
  tag: Documentation
  text: Rechercher et gérer les pipelines CI
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: Blog
  text: Surveiller et améliorer votre CI/CD sur AWS CodePipeline avec Datadog CI Visibility
title: Configuration d'AWS CodePipeline pour CI Visibility
---

## Section Overview

[AWS CodePipeline][1] est un service de livraison continue entièrement géré qui vous aide à automatiser vos pipelines de version pour des mises à jour d'application et d'infrastructure rapides et fiables.

Configurer CI Visibility pour AWS CodePipeline afin de recueillir des données sur les exécutions de pipeline, d'analyser les goulots d'étranglement en matière de performances ou les problèmes opérationnels et de surveiller vos workflows de déploiement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][14] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| *[Pipelines en cours d'exécution][15] | Pipelines en cours d'exécution | Afficher les exécutions de pipeline en cours d'exécution. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| **Corrélation de logs | Corrélation de logs | Mettre en corrélation les spans de pipeline et de tâches avec les logs et activer la [corrélation de logs de tâches](#collect-job-logs). |
| [Temps d'attente d'approbation][17] | Temps d'attente d'approbation  | Afficher le temps d'attente des tâches et des pipelines pour les approbations manuelles. |
| [Spans personnalisées][18] | Spans personnalisées | Configurer des spans personnalisées pour vos pipelines. |
| [Filtrer les tâches CI sur le chemin critique][19] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Temps d'exécution][20] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |

*Les pipelines AWS CodePipeline en cours d'exécution ne disposent pas d'informations Git tant qu'ils ne sont pas terminés.\
**La corrélation de logs AWS CodePipeline est uniquement disponible pour les actions AWS CodeBuild.

### Termes

Ce tableau présente le mappage des concepts entre Datadog CI Visibility et AWS CodePipeline :

| Datadog  | CodePipeline AWS |
|----------|------------------|
| Pipeline | Pipeline         |
| Stage    | Stage            |
| Job      | Action           |

## Configurer l'intégration Datadog

Pour configurer l'intégration entre [AWS CodePipeline][1] et Pipeline Visibility, créez deux ressources AWS.

[Destination d'API][2]
: un endpoint HTTP pointant vers l'ingestion de Datadog.

[Règle AWS EventBridge][3]
: une règle qui transmet les événements CodePipeline à la destination d'API.

Vous pouvez créer ces ressources séparément, ou en même temps, lors du processus de création de règle EventBridge.
Pour plus d'informations sur la surveillance des événements de pipeline, consultez le [guide AWS officiel][4].

## Créer la destination d'API

1. Dans la console AWS, accédez à **EventBridge > API destinations** et cliquez sur **Create API destination**.
2. Choisissez un nom pour la destination d'API (par exemple, `datadog-ci-visibility-api`) et ajoutez éventuellement une description.
3. Sous **API destination endpoint**, saisissez <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Sous **HTTP method**, sélectionnez **POST**.
5. Sous Connection type, sélectionnez **Create a new connection** :
   1. Choisissez un nom pour la connexion (par exemple, `datadog-ci-visibility-connection`) et ajoutez éventuellement une description.
   2. Sous **Destination type**, sélectionnez **Other**.
   3. Sous **Authorization type**, sélectionnez **API key**. Saisissez `DD-API-KEY` comme **API key name** et ajoutez votre [clé d'API Datadog][5] dans le champ **Value**.
6. Cliquez sur **Create**.

## Créer la règle EventBridge

1. Dans la console AWS, accédez à **EventBridge > Rules** et cliquez sur **Create Rule**.
2. Choisissez un nom pour la règle (par exemple, `datadog-ci-visibility-integration`) et ajoutez éventuellement une description.
3. Laissez le bus d'événements sur **default**, et sous **Rule Type**, sélectionnez **Rule with an event pattern**. Cliquez sur **Next**.
4. Sous **Event Source**, sélectionnez **AWS events or EventBridge partner events**.
5. Sous **Creation Method**, sélectionnez **Custom pattern (JSON editor)**. Ensuite, sous **Event Pattern**, saisissez ce qui suit :

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   Le JSON ci-dessus configure l'intégration pour tous vos pipelines. Pour restreindre l'ensemble des pipelines,
   suivez la section [Surveiller uniquement des pipelines spécifiques](#only-monitor-specific-pipelines) ci-dessous.

6. Cliquez sur **Next**.
7. Sous **Target Types**, sélectionnez **EventBridge API destination**. Ensuite, choisissez **Use an existing API Destination** et sélectionnez la destination d'API que vous avez créée à l'étape précédente. Vous pouvez également créer la destination d'API en suivant les étapes décrites dans la section [Créer la destination d'API](#create-the-api-destination).
8. Sous **Headers Parameters**, cliquez sur **Add header parameter**. Saisissez `DD-CI-PROVIDER-AWSCODEPIPELINE` comme clé et `true` comme valeur.
9. Choisissez **Create a new role for this specific resource** (ou utilisez un rôle existant).
10. Vérifiez que les informations sont correctes et créez la règle.

Une fois la règle créée, vous pouvez surveiller vos pipelines dans Datadog.

## Configuration avancée

### Surveiller uniquement des pipelines spécifiques

Si vous le souhaitez, vous pouvez choisir de limiter le nombre de pipelines surveillés par Pipeline Visibility.
Pour ce faire, appliquez le filtre `detail.pipeline` au pattern d'événement de la règle défini lors de la création de la règle EventBridge. Par exemple :

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

Le modèle d'événement configure l'intégration uniquement pour les pipelines `first-pipeline` et `second-pipeline`.

### Mettre en corrélation les pipelines avec les tests

Si vous utilisez [Test Optimization][8] et que votre pipeline contient une ou plusieurs actions [AWS CodeBuild][9] pour exécuter des tests, vous pouvez mettre en corrélation vos tests avec le pipeline associé dans Datadog Pipeline Visibility. Pour obtenir des instructions, consultez la section [Ajouter l'ID d'exécution de pipeline](#add-the-pipeline-execution-id-as-an-environment-variable).

### Collecter les logs de tâches

L'intégration AWS CodePipeline prend en charge la corrélation des actions **CodeBuild** avec leurs spans de tâches et de pipeline respectifs. Pour activer la collecte de logs pour vos actions CodeBuild, consultez le [guide de transfert de logs AWS][16].

<div class="alert alert-warning">La corrélation de logs pour les actions CodeBuild nécessite que le projet CodeBuild ait les noms de groupe de logs et de flux de logs CloudWatch par défaut.</div>

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index de logs sont configurés dans les paramètres de logs. Les logs pour AWS CodeBuild peuvent être identifiés par les tags `source:codebuild` et `sourcecategory:aws`.

### Ajouter l'ID d'exécution de pipeline en tant que variable d'environnement

L'ID d'exécution de pipeline est un identifiant dont Datadog a besoin pour identifier de manière unique une exécution de pipeline. Effectuez les étapes suivantes pour attribuer un ID d'exécution de pipeline afin de mettre en corrélation les pipelines avec les tests et les commandes personnalisées :

1. Dans la console AWS, accédez à la configuration de votre pipeline et cliquez sur **Edit**
2. Accédez au stage contenant l'action AWS CodeBuild, cliquez sur **Edit Stage**, puis modifiez l'action concernée.
3. Sous **Environment variables**, ajoutez une variable d'environnement.
Nommez la variable `DD_PIPELINE_EXECUTION_ID`, et la valeur `#{codepipeline.PipelineExecutionId}`. Laissez le type sur _Plaintext_.
4. Cliquez sur **Done** pour enregistrer vos modifications.

Les étapes ci-dessus vous permettent d'ajouter l'ID d'exécution de pipeline à vos variables d'environnement d'action CodeBuild. Pour plus d'informations sur l'utilisation des variables, consultez le [guide AWS officiel][10].

## Visualiser les données de pipeline dans Datadog

Consultez vos données sur les pages [**CI Pipeline List**][11] et [**Executions**][12] après l'exécution des pipelines.

La page **CI Pipeline List** affiche des données uniquement pour la branche par défaut de chaque référentiel. Pour plus d'informations, consultez la section [Rechercher et gérer les pipelines CI][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /fr/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: /fr/continuous_integration/search/#search-for-pipelines
[14]: /fr/glossary/#partial-retry
[15]: /fr/glossary/#running-pipeline
[16]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /fr/glossary/#approval-wait-time
[18]: /fr/glossary/#custom-span
[19]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /fr/glossary/#pipeline-execution-time