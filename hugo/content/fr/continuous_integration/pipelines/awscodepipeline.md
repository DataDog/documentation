---
aliases:
- /fr/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/search/
  tag: Documentation
  text: Recherchez et gérez les pipelines CI
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: Blog
  text: Surveillez et améliorez votre CI/CD sur AWS CodePipeline avec Datadog CI Visibility
title: Configuration d'AWS CodePipeline pour CI Visibility
---
## Présentation {#overview}

[AWS CodePipeline][1] est un service de livraison continue entièrement géré qui vous aide à automatiser vos pipelines de publication pour des mises à jour rapides et fiables de vos applications et de votre infrastructure.

Configurez CI Visibility pour AWS CodePipeline afin de collecter des données sur les exécutions de pipeline, d'analyser les goulots d'étranglement de performance ou les problèmes opérationnels, et de surveiller vos workflows de déploiement.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Relances partielles][14] | Pipelines partiels | Affichez les exécutions de pipeline ayant fait l'objet d'une relance partielle. |
| *[Pipelines en cours][15] | Pipelines en cours | Affichez les exécutions de pipeline en cours. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| **Corrélation des logs | Corrélation des logs	| Corrélez les spans de pipeline et de job aux logs. Nécessite [Logs Storage](#logs-storage). |
| [Temps d'attente d'approbation][17] | Temps d'attente d'approbation  | Affichez la durée pendant laquelle les jobs et les pipelines attendent des approbations manuelles. |
| [Spans personnalisés][18] | Spans personnalisés | Configurez des spans personnalisés pour vos pipelines. |
| [Filtrer les jobs CI sur le chemin critique][19] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Temps d'exécution][20] | Temps d'exécution  | Affichez la durée pendant laquelle les pipelines ont exécuté des jobs. |

*Les pipelines AWS CodePipeline en cours d'exécution ne disposent pas d'informations Git tant qu'ils ne sont pas terminés.\
**La corrélation des logs AWS CodePipeline est uniquement disponible pour les actions AWS CodeBuild.

### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et AWS CodePipeline :

| Datadog  | AWS CodePipeline |
|----------|------------------|
| Pipeline | Pipeline         |
| Phase    | Étape            |
| Job      | Action           |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}

Pour configurer l'intégration entre [AWS CodePipeline][1] et Pipeline Visibility, créez deux ressources AWS.

[Destination d'API][2]
: Un endpoint HTTP pointant vers l'ingestion de Datadog.

[Règle AWS EventBridge][3]
: Une règle qui transfère les événements CodePipeline vers la destination d'API.

Vous pouvez créer ces ressources séparément, ou en même temps, lors du processus de création de la règle EventBridge.
Pour plus d'informations sur la surveillance des événements de pipeline, consultez le [guide officiel AWS][4].

## Créez la destination d'API {#create-the-api-destination}

1. Dans la console AWS, accédez à {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}API destinations{{< /ui >}} et cliquez sur {{< ui >}}Create API destination{{< /ui >}}.
2. Choisissez un nom pour la destination d'API (par exemple, `datadog-ci-visibility-api`) et ajoutez éventuellement une description.
3. Sous {{< ui >}}API destination endpoint{{< /ui >}}, saisissez <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Sous {{< ui >}}HTTP method{{< /ui >}}, sélectionnez {{< ui >}}POST{{< /ui >}}.
5. Sous Type de connexion, sélectionnez {{< ui >}}Create a new connection{{< /ui >}} :
   1. Choisissez un nom pour la connexion (par exemple, `datadog-ci-visibility-connection`) et ajoutez éventuellement une description.
   2. Sous {{< ui >}}Destination type{{< /ui >}}, sélectionnez {{< ui >}}Other{{< /ui >}}.
   3. Sous {{< ui >}}Authorization type{{< /ui >}}, sélectionnez {{< ui >}}API key{{< /ui >}}. Saisissez `DD-API-KEY` comme {{< ui >}}API key name{{< /ui >}} et ajoutez votre [clé d'API Datadog][5] dans le champ {{< ui >}}Value{{< /ui >}}.
6. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Créez la règle EventBridge {#create-the-eventbridge-rule}

1. Dans la console AWS, accédez à {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}Rules{{< /ui >}} et cliquez sur {{< ui >}}Create Rule{{< /ui >}}.
2. Choisissez un nom pour la règle (par exemple, `datadog-ci-visibility-integration`) et ajoutez éventuellement une description.
3. Laissez le bus d'événements sur {{< ui >}}default{{< /ui >}} et, sous {{< ui >}}Rule Type{{< /ui >}}, sélectionnez {{< ui >}}Rule with an event pattern{{< /ui >}}. Cliquez sur {{< ui >}}Next{{< /ui >}}.
4. Sous {{< ui >}}Event Source{{< /ui >}}, sélectionnez {{< ui >}}AWS events or EventBridge partner events{{< /ui >}}.
5. Sous {{< ui >}}Creation Method{{< /ui >}}, sélectionnez {{< ui >}}Custom pattern (JSON editor){{< /ui >}}. Ensuite, sous {{< ui >}}Event Pattern{{< /ui >}}, saisissez ce qui suit :

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   Le JSON ci-dessus configure l'intégration pour tous vos pipelines. Pour restreindre l'ensemble des pipelines,
   suivez la section [Surveiller uniquement des pipelines spécifiques](#only-monitor-specific-pipelines) ci-dessous.

6. Cliquez sur {{< ui >}}Next{{< /ui >}}.
7. Sous {{< ui >}}Target Types{{< /ui >}}, sélectionnez {{< ui >}}EventBridge API destination{{< /ui >}}. Ensuite, choisissez {{< ui >}}Use an existing API Destination{{< /ui >}} et sélectionnez la destination d'API que vous avez créée à l'étape précédente. Alternativement, vous pouvez également créer la destination d'API en suivant les étapes décrites dans la section [Créer la destination d'API](#create-the-api-destination).
8. Sous {{< ui >}}Headers Parameters{{< /ui >}}, cliquez sur {{< ui >}}Add header parameter{{< /ui >}}. Saisissez `DD-CI-PROVIDER-AWSCODEPIPELINE` comme clé et `true` comme valeur.
9. Choisissez {{< ui >}}Create a new role for this specific resource{{< /ui >}} (ou utilisez-en un existant).
10. Vérifiez que les informations sont correctes et créez la règle.

Une fois la règle créée, vous pouvez surveiller vos pipelines dans Datadog.

## Configuration avancée {#advanced-configuration}

### Surveiller uniquement des pipelines spécifiques {#only-monitor-specific-pipelines}

Vous pouvez éventuellement restreindre les pipelines surveillés par Pipeline Visibility.
Pour ce faire, ajoutez le filtre `detail.pipeline` dans le modèle d'événement de règle défini lors de la création de la règle EventBridge. Par exemple :

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

### Corréler les pipelines avec les tests {#correlate-pipelines-with-tests}

Si vous utilisez [Test Optimization][8] et que votre pipeline contient une ou plusieurs actions [AWS CodeBuild][9] pour exécuter des tests, vous pouvez corréler vos tests avec le pipeline associé dans Datadog Pipeline Visibility. Pour obtenir des instructions, reportez-vous à [Ajouter l'ID d'exécution du pipeline](#add-the-pipeline-execution-id-as-an-environment-variable).

### Logs Storage {#logs-storage}

L'intégration AWS CodePipeline permet de corréler les actions **CodeBuild** avec leurs spans de job et de pipeline respectifs. Pour activer le stockage des logs pour vos actions CodeBuild, consultez le [guide de transfert de logs AWS][16].

<div class="alert alert-warning">Si vous utilisez des noms de groupe de logs ou de flux de logs CloudWatch personnalisés pour vos actions CodeBuild, activez <a href="/integrations/amazon_web_services/#resource-collection">Cloud Resource Collection</a> dans l'intégration AWS afin que Datadog puisse résoudre la configuration personnalisée du groupe et du flux de logs.</div>

Logs Storage est facturé séparément de CI Visibility. La rétention, l'exclusion et les index des logs sont configurés dans [Log Management][21]. Les logs pour AWS CodeBuild peuvent être identifiés par les tags `source:codebuild` et `sourcecategory:aws`.

### Ajouter l'ID d'exécution du pipeline en tant que variable d'environnement {#add-the-pipeline-execution-id-as-an-environment-variable}

L'ID d'exécution du pipeline est un identifiant dont Datadog a besoin pour identifier de manière unique une exécution de pipeline. Effectuez les étapes suivantes pour attribuer un ID d'exécution de pipeline afin de corréler les pipelines avec les tests et les commandes personnalisées :

1. Dans la console AWS, accédez à la configuration de votre pipeline et cliquez sur {{< ui >}}Edit{{< /ui >}}
2. Accédez à la phase contenant l'action AWS CodeBuild, cliquez sur {{< ui >}}Edit Stage{{< /ui >}}, puis modifiez l'action concernée.
3. Sous {{< ui >}}Environment variables{{< /ui >}}, ajoutez une variable d'environnement.
Nommez la variable `DD_PIPELINE_EXECUTION_ID` et la valeur `#{codepipeline.PipelineExecutionId}`. Laissez le type sur _Texte brut_.
4. Cliquez sur {{< ui >}}Done{{< /ui >}} pour enregistrer vos modifications.

Les étapes ci-dessus vous permettent d'ajouter l'ID d'exécution du pipeline aux variables d'environnement de votre action CodeBuild. Pour plus d'informations sur l'utilisation des variables, consultez le [guide officiel AWS][10].

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Consultez vos données sur les pages [**CI Pipeline List**][11] et [**Executions**][12] une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Rechercher et gérer les pipelines CI][13].

## Pour aller plus loin {#further-reading}

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
[21]: /fr/logs/guide/best-practices-for-log-management/