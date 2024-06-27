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
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: Blog
  text: Surveiller et améliorer votre pipeline de CI/CD sur AWS CodePipeline avec
    CI Visibility de Datadog
title: Configurer le tracing sur un pipeline AWS CodePipeline
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Aperçu

[AWS CodePipeline][1] est un service de déploiement continu entièrement géré qui vous permet d'automatiser vos pipelines de publication de code afin de mettre à jour vos applications et infrastructures de façon rapide et fiable.

Configurez le tracing sur AWS CodePipeline pour recueillir des données sur vos exécutions de pipeline, analyser les goulots d'étranglement des performances, résoudre les problèmes opérationnels et surveiller vos flux de déploiement.

### Compatibilité

| Visibilité du pipeline | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][14] | Pipelines partiels | Consultez les exécutions qui ont fait l'objet d'une nouvelle tentative partielle. |
| *[Pipelines en cours d'exécution][15] | Pipelines en cours d'exécution | Consultez les exécutions de pipelines en cours. |
| **Mise en corrélation des logs | Mise en corrélation des logs | Mettez les spans des pipelines et des tâches en corrélation avec les logs et [activez la collecte des logs de tâches](#activer-la-collecte-des logs-de-taches). |

*Aucune information Git sur un pipeline AWS CodePipeline n'est disponible tant qu'il n'a pas fini de s'exécuter.
**La mise en corrélation des logs AWS CodePipeline est uniquement disponible pour les actions AWS CodeBuild.

## Configurer l'intégration Datadog

Pour configurer l'intégration entre [AWS CodePipeline][1] et Datadog CI Visibility, créez deux ressources AWS :

1. [Destination d'API][2] : un endpoint HTTP qui pointe vers l'ingestion Datadog.
2. [Règle AWS EventBridge][3] : une règle qui transmet les événements CodePipeline à la destination d'API.

Vous pouvez créer ces ressources séparément ou simultanément au cours du processus de création de la règle EventBridge. Pour en savoir plus sur la surveillance des événements de pipeline, consultez le [guide officiel d'AWS][4].
### Créer la destination d'API

1. Dans la console AWS, accédez à **EventBridge > API destinations** et cliquez sur **Create API destination**.
2. Attribuez un nom à la destination d'API (**datadog-ci-visibility-api**, par exemple), puis ajoutez une description si vous le souhaitez.
3. Pour **API destination endpoint**, saisissez <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Pour **HTTP method**, sélectionnez **POST**.
5. Dans **Connection type**, sélectionnez **Create a new connection** :
   1. Attribuez un nom à la connexion (**datadog-ci-visibility-connection**, par exemple) et ajoutez une description si vous le souhaitez.
   2. Dans **Destination type**, sélectionnez **Other**.
   3. Dans **Authorization type**, sélectionnez **API key**.
   Saisissez `DD-API-KEY` en tant que **API key name** ainsi que votre [clé d'API Datadog][5] dans le champ **Value**.
6. Click **Create**.

### Créer la règle EventBridge

1. Dans la console AWS, accédez à **EventBridge > Rules**, puis cliquez sur **Create Rule**.
2. Attribuez un nom à la règle (**datadog-ci-visibility-integration**, par exemple), puis ajoutez une description si vous le souhaitez.
3. Laissez l'option **default** pour le bus d'événements, puis sélectionnez **Rule with an event pattern** pour **Rule Type**. Cliquez ensuite sur **Next**.
4. Pour **Event Source**, sélectionnez **AWS events or EventBridge partner events**.
5. Pour **Creation Method**, sélectionnez **Custom pattern (JSON editor)**. Saisissez ensuite le JSON suivant sous **Event Pattern** :
   ```
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```
   Le JSON ci-dessus configure l'intégration pour l'ensemble de vos pipelines. Pour limiter les pipelines inclus, référez-vous à la section [Surveiller uniquement des pipelines spécifiques][7].
6. Cliquez sur **Next**.
7. Pour **Target Types**, sélectionnez **EventBridge API destination**. Ensuite, choisissez **Use an existing API Destination** et sélectionnez la destination d'API que vous avez créée à l'étape précédente. Si vous le souhaitez, vous pouvez également créer la destination d'API en suivant les étapes décrites dans la section [Créer la destination d'API][6].
8. Dans **Headers Parameters**, cliquez sur **Add header parameter**. Saisissez `DD-CI-PROVIDER-AWSCODEPIPELINE` comme clé et `true` comme valeur.
9. Choisissez **Create a new role for this specific resource** (ou utilisez un rôle existant).
10. Vérifiez que tout est correct et créez la règle.

Une fois la règle créée, l'intégration est terminée et vous pouvez commencer à surveiller vos pipelines dans Datadog.

### Surveiller uniquement des pipelines spécifiques

Vous avez la possibilité de limiter le nombre de pipelines surveillés par Pipeline Visibility. Pour ce faire, appliquez le filtre `detail.pipeline` au pattern d'événements de la règle défini lors de la création de la règle EventBridge. Par exemple :

```
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

Le pattern d'événements ci-dessus configure l'intégration uniquement pour les pipelines `first-pipeline` et `second-pipeline`.

### Mettre en corrélation les pipelines et les tests

Si vous utilisez [Test Visibility][8] et que votre pipeline comporte une ou plusieurs actions [AWS CodeBuild][9] permettant d'exécuter des tests, vous pouvez mettre ces tests en corrélation avec le pipeline associé dans Datadog Pipeline Visibility.
1. Dans la console AWS, accédez à la configuration de votre pipeline et cliquez sur *Edit**.
2. Accédez à l'étape contenant l'action AWS CodeBuild, cliquez sur **Edit Stage**, puis modifiez l'action adéquate.
3. Sous **Environment variables**, ajoutez une variable d'environnement.
Saisissez `DD_PIPELINE_EXECUTION_ID` comme nom de variable, puis la valeur`#{codepipeline.PipelineExecutionId}`. Gardez _Plaintext_ pour le type de variable d'environnement.
4. Cliquez sur **Done** pour enregistrer vos modifications.

Les étapes ci-dessus vous permettent d'ajouter l'ID d'exécution du pipeline aux variables d'environnement de votre action CodeBuild. Pour en savoir plus sur l'utilisation des variables, consultez le [guide officiel d'AWS][10].

### Activer la mise en corrélation des logs

L'intégration AWS CodePipeline prend en charge la mise en corrélation des actions **CodeBuild** avec leurs spans de tâches et de pipelines respectives. Pour activer la collecte de logs pour vos actions CodeBuild, consultez le [Guide de transmission de logs AWS][16].

<div class="alert alert-warning"><strong>Remarque</strong> : pour que la mise en corrélation des logs pour les actions CodeBuild fonctionne, les noms par défaut du groupe de logs et du flux de logs CloudWatch doivent être configurés pour le projet CodeBuild.</div>

## Visualiser les données de pipeline dans Datadog

Consultez vos données sur les pages [**CI Pipeline List**][11] et [**Executions**][12] après l'exécution des pipelines.

La page **CI Pipeline List** affiche des données uniquement pour la [branche par défaut][13] de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /fr/continuous_integration/pipelines/awscodepipeline/#create-the-api-destination
[7]: /fr/continuous_integration/pipelines/awscodepipeline/#only-monitor-specific-pipelines
[8]: https://docs.datadoghq.com/fr/continuous_integration/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: https://docs.datadoghq.com/fr/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[14]: /fr/glossary/#partial-retry
[15]: /fr/glossary/#running-pipeline
[16]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function