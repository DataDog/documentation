---

title: Mettre à niveau l'instrumentation des fonctions Lambda Java
---

Cet article décrit la marche à suivre pour mettre à niveau l'instrumentation Datadog des fonctions Lambda Java. Si vous configurez l'instrumentation pour la première fois, suivez plutôt les [instructions d'installation pour les fonctions Lambda Java][7].

Les couches Lambda Datadog `dd-trace-java:5` et `Datadog-Extension:25` apportent les modifications suivantes au processus de configuration de l'instrumentation sur les fonctions Lambda Java :

1. La bibliothèque [datadog-lambda-java][1] est obsolète et n'est plus requise.
2. Aucune modification du code (telle que le wrapper `DDLambda`) n'est requise, sauf dans le cas d'une instrumentation personnalisée.
3. Vous pouvez configurer Datadog à l'aide de l'[interface de ligne de commande Datadog][2] et du [plug-in Serverless Datadog][3].

### Mise à niveau

1. Supprimez la bibliothèque `datadog-lambda-java` de `build.gradle` ou `pom.xml`, car elle n'est désormais plus requise.
2. Supprimez `DDLambda` et l'instruction d'importation du code de votre fonction.
3. Définissez la variable d'environnement `AWS_LAMBDA_EXEC_WRAPPER` sur `/opt/datadog_wrapper`.
4. Incrémentez la version de `dd-trace-java` vers `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` et la version de `Datadog-Extension` vers `{{< latest-lambda-layer-version layer="extension" >}}`.
5. Si vous envoyez des métriques custom à l'aide de la fonction auxiliaire `DDLambda.metric()`, utilisez le [client DogStatsD pour Java][4] standard et suivez l'[exemple de code][5] pour envoyer une métrique en tant que distribution. Notez que [seules les distributions peuvent être utilisées dans les fonctions Lambda][6].

[1]: https://github.com/DataDog/datadog-lambda-java
[2]: /fr/serverless/installation/java/?tab=datadogcli
[3]: /fr/serverless/installation/java/?tab=serverlessframework
[4]: /fr/developers/dogstatsd/?tab=hostagent&code-lang=java
[5]: /fr/serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[6]: /fr/serverless/custom_metrics#understanding-distribution-metrics
[7]: /fr/serverless/installation/java/
