---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: GitHub
  text: Recueillir des traces, logs et métriques custom à partir de services GCR
kind: documentation
title: Google Cloud Run
---

## Présentation
Google Cloud Run est une plateforme sans serveur entièrement gérée qui permet de déployer et de faire évoluer des applications basées sur des conteneurs. La surveillance et la collecte de logs Cloud Run est assurée par Datadog via l'[intégration GCP][1]. Datadog fournit également une solution (actuellement en bêta publique) visant à instrumenter vos application Cloud Run avec un Agent spécialement conçu pour activer le tracing, les métriques custom et la collecte directe de logs.

  <div class="alert alert-warning">Cette fonctionnalité est disponible en bêta publique. Pour nous faire part de votre avis à son sujet, utilisez <a href="https://forms.gle/HSiDGnTPvDvbzDAQA">ce formulaire</a> ou les canaux d'assistance standard. Durant toute la bêta, la surveillance de Cloud Run et le tracing d'APM ne génèrent aucun coût direct. Cette fonctionnalité peut entraîner une augmentation des coûts de volume et d'ingestion des spans pour les clients APM existants. </div>

## Tracing et métriques custom
### Générer le build de votre conteneur

Si la création du build de votre application repose sur un Dockerfile, procédez comme suit :

1. Instrumentez votre application avec une [bibliothèque de tracing Datadog prise en charge][2].

2. Utilisez l'instruction `COPY` pour copier le [binaire `serverless-init` Datadog][3] dans votre image Docker :

3. Utilisez l'instruction `ENTRYPOINT` pour exécuter le binaire `serverless-init` au moment de l'initialisation de votre conteneur Docker.

4. Utilisez l'instruction `CMD` pour exécuter votre application existante ainsi que les autres commandes requises en tant qu'arguments.

Les exemples suivants illustrent ces trois étapes. Vous devrez potentiellement les modifier afin de les adapter à la configuration existante de votre Dockerfile.


{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/chemin/vers/votre-binaire-go"] (modifier cette ligne en fonction de vos besoins)
```
Consultez la section [Tracer des applications Go][1] ou l'[exemple de code pour une application Go simple][2] pour en savoir plus.


[1]: /fr/tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["ddtrace-run", "python", "app.py"] (modifier cette ligne en fonction de vos besoins)
```

Consultez la section [Tracer des applications Python][1] ou l'[exemple de code pour une application Python simple][2] pour en savoir plus.

[1]: /fr/tracing/setup_overview/setup/python/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/python
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/chemin/vers/votre/app.js"] (modifier cette ligne en fonction de vos besoins)

```

Consultez la section [Tracer des applications Node.js][1] ou l'[exemple de code pour une application Node.js simple][2] pour en savoir plus.

[1]: /fr/tracing/setup_overview/setup/nodejs/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/js
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"] (modifier cette ligne en fonction de vos besoins)

```

Consultez la section [Tracer des applications Java][1] ou l'[exemple de code pour une application Java simple][2] pour en savoir plus.

[1]: /fr/tracing/setup_overview/setup/java/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/java
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"] (modifier cette ligne en fonction de vos besoins)

```

Consultez la section [Tracer des applications .NET Core][1] ou l'[exemple de code pour une application .NET simple][2] pour en savoir plus.

[1]: /fr/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers
[2]: https://github.com/DataDog/crpb/tree/main/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"] (modifier cette ligne en fonction de vos besoins)

```

Consultez la section [Tracer des applications Ruby][1] ou l'[exemple de code pour une application Ruby simple][2] pour en savoir plus.

[1]: /fr/tracing/trace_collection/dd_libraries/ruby/
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Dépannage
Pour que cette intégration fonctionne, votre runtime doit disposer d'une implémentation SSL complète. Si vous utilisez une image légère pour Node, vous devrez peut-être ajouter la commande suivante à votre Dockerfile afin d'inclure des certificats.

```
RUN apt-get update && apt-get install -y ca-certificates
```

#### Créer le build avec le buildpack Datadog

1. Exécutez ce qui suit pour créer le build de votre application :
   ```
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:beta4 \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME

   ```

   **Remarque** : ce code n'est pas compatible avec Alpine.

 2. Transmettez votre image à GCP :
    ```
    docker push gcr.io/YOUR_PROJECT/YOUR_APP_NAME
    ```

### Effectuer le déploiement sur Cloud Run
Les instructions ci-dessous permettent de déployer un service Cloud Run à l'aide des outils GCP standard. Si vous disposez d'autres systèmes pour la gestion des images de conteneur, des secrets ou des déploiements, vous êtes libre de les utiliser.

3. Exécutez la commande suivante pour transmettre votre build à GCP.

   ```
   gcloud builds submit --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```
4. Créez un secret à partir de votre clé d'API Datadog.
   Depuis votre console GCP, accédez à [Secret Manager][4] et cliquez sur **Créer un secret**.

   Définissez un nom (comme `datadog-api-key`) dans le champ **Nom**. Collez ensuite votre clé d'API Datadog dans le champ **Valeur du secret**.
5. Déployez votre service.
   Depuis votre console GCP, accédez à [Cloud Run][5] et cliquez sur **Créer un service**.

   Sélectionnez **Déployer une révision à partir d'une image de conteneur existante**. Choisissez l'image que vous venez de créer.

   Sélectionnez votre méthode d'authentification.

   Pointez vers le secret que vous venez de créer. Accédez à la section **Conteneur, variables et secrets, connexions, sécurité** et sélectionnez l'onglet **Variable et secrets**.

   Sous **Secrets**, cliquez sur **Référencer un Secret** et choisissez le secret que vous avez créé à partir de votre clé d'API Datadog. Vous devrez peut-être autoriser votre utilisateur à accéder au secret.

   Sous **Méthode de référence**, sélectionnez **Exposée sous forme de variable d'environnement**.

   Dans la section **Variables d'environnement**, vérifiez que le nom est défini sur `DD_API_KEY`.

### Métriques custom
Vous pouvez envoyer des métriques custom à l'aide d'un [client DogStatsD][6].

**Remarque** : seules les métriques de type `DISTRIBUTION` doivent être utilisées.

### Options et configurations avancées

#### Variables d'environnement

| Variable | Description |
| -------- | ----------- |
| `DD_SITE` | Le [site Datadog][7]. |
| `DD_LOGS_ENABLED` | Si cette variable est définie sur true, les logs (stdout et stderr) sont envoyés à Datadog. Valeur par défaut : false. |
| `DD_SERVICE` | Voir la section [Tagging de service unifié][8]. |
| `DD_VERSION` | Voir la section [Tagging de service unifié][8]. |
| `DD_ENV` | Voir la section [Tagging de service unifié][8]. |
| `DD_SOURCE` | Voir la section [Tagging de service unifié][8]. |
| `DD_TAGS` | Voir la section [Tagging de service unifié][8]. |

## Collecte de logs

Vous pouvez vous servir de l'[intégration GCP][1] pour recueillir des logs. Il est également possible de définir la variable d'environnement `DD_LOGS_ENABLED` sur true pour recueillir les logs d'application via l'Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/google_cloud_platform/#log-collection
[2]: /fr/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://registry.hub.docker.com/r/datadog/serverless-init
[4]: https://console.cloud.google.com/security/secret-manager
[5]: https://console.cloud.google.com/run
[6]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /fr/getting_started/site/
[8]: /fr/getting_started/tagging/unified_service_tagging/