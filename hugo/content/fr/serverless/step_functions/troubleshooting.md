---
title: Dépannage de la Serverless Monitoring pour AWS Step Functions
---
## Je ne vois aucune trace {#i-cannot-see-any-traces}

#### Vérifiez que votre Step Function est configurée pour envoyer tous les journaux {#verify-that-your-step-function-is-configured-to-send-all-logs}
- Assurez-vous que la balise `DD_TRACE_ENABLED` est définie sur `true` sur la Step Function dans votre console AWS.
- Dans votre console AWS, ouvrez l'onglet de journalisation de votre Step Function. Assurez-vous que {{< ui >}}Log level{{< /ui >}} est défini sur `ALL`, et que {{< ui >}}Include execution data{{< /ui >}} est sélectionné.
- Assurez-vous que le groupe de journaux CloudWatch (également disponible dans l'onglet de journalisation) dispose d'un filtre d'abonnement vers le Datadog Lambda Forwarder dans la même région.

#### Vérifiez que les journaux sont transférés avec succès vers Datadog {#verify-that-logs-are-forwarded-successfully-to-datadog}
- Vérifiez si le Datadog Lambda Forwarder contient des messages d'erreur. Assurez-vous d'avoir correctement défini votre clé d'API et votre site Datadog.
- Activez les journaux `DEBUG` sur le Datadog Lambda Forwarder en définissant la variable d'environnement `DD_LOG_LEVEL` sur `debug`.

#### Vérifiez que les journaux sont consultables dans Live Search et possèdent la balise DD_TRACE_ENABLED {#verify-that-logs-are-searchable-on-live-search-and-have-dd-trace-enabled-tag}
Dans Datadog, accédez à [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Log Stream{{< /ui >}}][2]. Recherchez `source:stepfunction`. Vous devrez peut-être déclencher la machine d'état à quelques reprises. Si vous devez mettre à niveau le Datadog Lambda Forwarder depuis une version antérieure, vérifiez qu'après la mise à niveau, le Forwarder possède la balise `DD_FETCH_STEP_FUNCTIONS_TAGS` définie sur `true`. Si le Forwarder mis à niveau ne possède pas la balise `DD_FETCH_STEP_FUNCTIONS_TAGS`, il est possible qu'il n'ait pas été mis à niveau correctement.

Si les balises du Forwarder et de la machine d'état sont configurées correctement avec les étapes précédentes, les journaux sont marqués avec `DD_TRACE_ENABLED:true`.

#### Vérifiez que votre Step Function utilise la dernière version {#verify-that-your-step-function-is-using-the-latest-version}
- AWS peut publier des mises à jour de l'API Step Function ou introduire de nouvelles versions des définitions de Step Function. Les versions antérieures peuvent entraîner un formatage des journaux ou un comportement inattendu.
- Il est également recommandé d'utiliser la dernière version du Datadog Lambda Forwarder pour éviter les écarts dans la manière dont les journaux sont transférés.

#### Attention lors de l'utilisation de pipelines de journaux personnalisés {#caution-when-using-custom-log-pipelines}
- Les pipelines de journaux personnalisés peuvent offrir une flexibilité dans le traitement des journaux, mais trop modifier le format des journaux peut entraîner des problèmes en aval, tels que des journaux non analysés ou non reconnus.
- Évitez d'apporter des modifications importantes à la structure des journaux Step Function qui modifient le format JSON.

## Les traces Lambda ne fusionnent pas avec les traces Step Function {#lambda-traces-are-not-merging-with-step-function-traces}
- Vérifiez que vous pouvez voir à la fois les traces Lambda et les traces Step Function dans Datadog.
- Vérifiez que vous utilisez la version correcte de la couche ou du traceur conformément au guide [fusion des traces][6]. Assurez-vous également que l'étape Lambda est instrumentée dans la définition de votre machine d'état.
- Exécutez votre Step Function une fois et vérifiez que le journal d'événements `TaskScheduled` de l'étape Lambda contient la charge utile avec les données de l'[objet de contexte Step Function][4].
- Si votre Lambda a la variable d'environnement `DD_TRACE_EXTRACTOR` définie, ses traces ne peuvent pas être fusionnées.

## Je peux voir le root span `aws.stepfunctions`, mais je ne vois aucun step span {#i-can-see-the-awsstepfunctions-root-span-but-i-cannot-see-any-step-spans}
Veuillez activer l'option {{< ui >}}Include execution data{{< /ui >}} dans la journalisation de la machine d'état. Après avoir activé cette option, l'entrée d'exécution, les données transmises entre les états et la sortie d'exécution sont consignées. Le backend Datadog utilise les journaux pour construire ces step spans pour vous.

## Les traces sont manquantes par intermittence {#traces-are-missing-intermittently}
Lors de la recherche de traces, sélectionnez l'option {{< ui >}}Live Search{{< /ui >}} dans le coin supérieur droit. Si Live Search affiche votre trace, ajoutez « @trace_type:stepfunctions » au [retention filter](https://docs.datadoghq.com/fr/tracing/trace_pipeline/trace_retention/#retention-filters) et définissez le taux de rétention souhaité. Pour le débogage, Datadog recommande de définir le taux de rétention à 100 %. Le filtre peut être désactivé une fois le débogage terminé.

## Certaines step spans sont manquantes dans les traces {#some-step-spans-are-missing-in-the-traces}
- Les actions de Lambda, DynamoDB, StepFunction et de la plupart des autres services AWS sont prises en charge.
- `Wait`, `Choice`, `Success`, `Fail`, `Pass`, `Inline MapState` et `Parallel` sont pris en charge, tandis que [`Distributed MapState`][8] bénéficie d'une prise en charge limitée.

## Rechercher des logs historiques {#search-historic-logs}
Pour activer la recherche de logs historiques, ajoutez un index temporaire aux logs transférés. Dans Datadog, ouvrez l'onglet Logs [{{< ui >}}Indexes{{< /ui >}}][3]. Cliquez sur le bouton {{< ui >}}New Index{{< /ui >}} en haut à droite.

Choisissez un nom, définissez le filtre d'index sur `Source:stepfunction`, laissez tout le reste avec les valeurs par défaut et enregistrez.

{{< img src="serverless/step_functions/log_index.png" alt="Nouvel index de log" style="width:80%;" >}}

Si votre organisation dispose d'un index global existant avec une limite basse, placez votre nouvel index en haut.

**Remarque** : L'indexation des logs n'est pas une exigence pour obtenir des traces et peut entraîner des coûts supplémentaires. Si vous dépannez un problème spécifique, vous souhaiterez peut-être envoyer temporairement des logs vers un index, déboguer, puis supprimer l'index par la suite. Consultez [Indexes][5] pour plus d'informations.

## Logs manquants au sein d'une exécution {#missing-logs-within-an-execution}
Vous pouvez utiliser des [filtres d'exclusion][7] pour exclure un certain pourcentage de tous les logs avec un `execution_arn` particulier. L'utilisation de filtres d'exclusion n'a pas d'impact sur le traçage.

Dans l'exemple suivant, le filtre exclut les logs pour 90 % du `@execution_arn`.

{{< img src="serverless/step_functions/exclusion_filter.png" alt="Un filtre d'exclusion nommé Step Functions. La zone « Définir la requête d'exclusion » contient « source:stepfunction ». Sous « Définir le pourcentage d'exclusion », le filtre est configuré pour exclure 90 % de @execution_arn." style="width:80%;" >}}

## Méthode personnalisée pour déployer le Datadog Lambda Forwarder {#customized-way-to-deploy-datadog-lambda-forwarder}
Si vous utilisez votre méthode personnalisée pour déployer le Datadog Lambda Forwarder, voici quelques conseils qui peuvent vous aider à déboguer l'activation du traçage de Step Functions :
- Sur le forwarder, définissez la variable d'environnement `DD_FETCH_STEP_FUNCTIONS_TAGS` sur `true`.
- Pour activer la génération de traces Step Functions sur le backend Datadog, la version de la couche Datadog-Forwarder doit être supérieure à 31. Cette version est capable de récupérer les tags de la machine d'état, y compris le tag `DD_TRACE_ENABLED` requis.
- Vous pouvez également définir le tag `DD_STEP_FUNCTIONS_TRACE_ENABLED` au niveau du Forwarder pour activer le traçage pour toutes les Step Functions utilisant ce Forwarder en version 3.121.0+.
- Le rôle IAM pour le forwarder doit disposer de l'autorisation `tags:getResources`.
- Configurez un filtre d'abonnement sur votre groupe de logs CloudWatch de machine d'état vers le forwarder Datadog.
- Pour vérifier si les logs atteignent le backend Datadog, ouvrez la page {{< ui >}}Log Explorer{{< /ui >}} et effectuez une recherche `source:stepfunction` avec la période de recherche {{< ui >}}Live{{< /ui >}} (qui affiche tous les logs entrant dans l'ingestion de logs de Datadog). Si vous ne voyez aucun log, vérifiez s'il existe des logs d'erreur sur le Datadog Forwarder, tels qu'une clé d'API incorrecte/invalide. L'ajout de la variable d'environnement `DD_LOG_LEVEL` définie sur `DEBUG` vous aide à déboguer le problème du Forwarder. Si vous voyez les logs de Step Functions, vérifiez qu'ils possèdent le tag `dd_trace_enable:true` (tous les tags sont normalisés) et vous devriez voir les traces de Step Function associées au log en quelques minutes.


[1]: /fr/logs
[2]: /fr/logs/livetail
[3]: /fr/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: /fr/logs/log_configuration/indexes/
[6]: /fr/serverless/step_functions/merge-step-functions-lambda/?tab=serverlessframework#merge-step-functions-traces-with-downstream-lambda-traces
[7]: /fr/logs/log_configuration/indexes/#exclusion-filters
[8]: /fr/serverless/step_functions/distributed-maps