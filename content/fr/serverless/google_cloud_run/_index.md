---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recueillir des traces, logs et métriques custom à partir de services Cloud Run
title: Google Cloud Run
---

## Présentation

Google Cloud Run est une plateforme sans serveur entièrement gérée qui permet d'effectuer le déploiement et le scaling d'applications basées sur des conteneurs. La surveillance et la collecte de logs Cloud Run est assurée par Datadog via l'[intégration Google Cloud][1]. Datadog fournit également une solution visant à instrumenter vos applications Cloud Run avec un Agent spécialement conçu pour activer le tracing, les métriques custom et la collecte directe de logs.

### Prérequis

Assurez-vous de posséder une [clé d'API Datadog][6] et d'utiliser un langage de programmation [pris en charge par une bibliothèque de tracing Datadog][2].

## Instrumenter votre application

Vous pouvez instrumenter votre application de deux façons : avec [Dockerfile](#dockerfile) ou avec un [buildpack](#buildpack). 

### Dockerfile

Datadog publie les nouvelles versions de l'image de conteneur `serverless-init` sur Google gcr.io, AWS ECR et Docker Hub :

| dockerhub.io | gcr.io | public.ecr.aws |
| ------------ | ------ | -------------- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

L'application de tags aux images se base sur la gestion sémantique des versions, chaque nouvelle version recevant trois tags pertinents :

* `1`, `1-alpine` : utilisez ces tags pour suivre les dernières versions mineures, sans changement majeur.
* `1.x.x`, `1.x.x-alpine` : utilisez ces tags pour identifier une version spécifique de la bibliothèque.
* `latest`, `latest-alpine` : utilisez ces tags pour suivre la version la plus récente, qui peut contenir des changements majeurs.

## Fonctionnement de `serverless-init`

L'application `serverless-init` utilise un wrapper pour incorporer votre processus et l'exécute en tant que sous-processus. Elle initie un écouteur DogStatsD pour les métriques ainsi qu'un écouteur d'Agent de trace pour les traces. Elle recueille les logs en utilisant un wrapper pour incorporer les flux stdout/stderr de votre application. Une fois le bootstrap terminé, serverless-init exécute votre commande en tant que sous-processus.

Pour bénéficier d'une instrumentation complète, assurez-vous d'appeler `datadog-init` dans la première commande exécutée au sein de votre conteneur Docker. Pour ce faire, définissez-la comme point d'entrée ou comme premier argument dans CMD.

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

{{% svl-init-nodejs %}}

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{% svl-init-python %}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{% svl-init-java %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% svl-init-go %}}

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

{{% svl-init-ruby %}}

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

{{% svl-init-php %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Buildpack

[`Pack Buildpacks`][3] s'avère utile pour compiler votre conteneur sans utiliser un Dockerfile.

Commencez par installer votre traceur manuellement :
- [Node.JS][14]
- [Python][13]
- [Java][15]
- [Go][12]
- [.NET][18]
- [Ruby][16]
- [PHP][17]

Exécutez ce qui suit pour créer le build de votre application :

```shell
pack build --builder=gcr.io/buildpacks/builder \
--buildpack from=builder \
--buildpack datadog/serverless-buildpack:latest \
gcr.io/VOTRE_PROJET/NOM_DE_VOTRE_APP
```

**Remarque** : l'instrumentation via buildpack n'est pas compatible avec les images Alpine.

## Configurer votre application

Une fois le conteneur créé et envoyé à votre registre, il ne vous reste plus qu'à définir les variables d'environnement requises pour l'Agent Datadog :
- `DD_API_KEY` : correspond à la clé d'API Datadog, qui sert à envoyer les données à votre compte Datadog. Elle doit être configurée en tant que [secret Google Cloud][11] pour éviter tout problème de confidentialité et de sécurité.
- `DD_SITE` : correspond à l'endpoint et au site Web Datadog. Sélectionnez votre site Web situé à droite de cette page, à savoir {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED` : à définir sur `true` pour activer le tracing.
- `DD_TRACE_PROPAGATION_STYLE` : à définir sur `datadog` pour utiliser la propagation de contexte et la corrélation des traces et des logs.

Pour découvrir d'autres variables d'environnement ainsi que leur fonction, consultez la section [Configurations supplémentaires](#configurations-supplementaires).

La commande suivante déploie le service et permet à n'importe quelle connexion externe de l'atteindre. Définissez `DD_API_KEY` en tant que variable d'environnement et le port d'écoute de service sur 8080.

```
shell
gcloud run deploy APP_NAME --image=gcr.io/VOTRE_PROJET/NOM_APP \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --update-env-vars=DD_TRACE_PROPAGATION_STYLE='datadog' \
```

## Résultats

Une fois le déploiement terminé, vos métriques et traces sont envoyées à Datadog. Accédez à **Infrastructure->Serverless** dans Datadog pour consulter vos métriques et traces sans serveur.

## Configurations supplémentaires

- **Tracing avancé :** l'Agent Datadog offre déjà un tracing de base pour les frameworks populaires. Suivez le [guide de tracing avancé][2] pour en savoir plus.

- **Logs :** si vous utilisez l'[intégration Google Cloud][1], vos logs sont déjà recueillis. Vous pouvez également définir la variable d'environnement `DD_LOGS_ENABLED` sur `true` pour recueillir les logs d'application directement via l'instrumentation sans serveur.

- **Métriques custom :** vous pouvez envoyer des métriques custom à l'aide d'un [client DogStatsd][4]. Pour surveiller les applications Cloud Run et d'autres applications sans serveur, utilisez des métriques de [distribution][9]. Les distributions fournissent par défaut les agrégations `avg`, `sum`, `max`, `min` et `count`. Sur la page Metric Summary, vous pouvez activer les agrégations par centile (p50, p75, p90, p95, p99) et gérer les tags. Pour surveiller une distribution pour une métrique de type gauge, utilisez `avg` à la fois pour les [agrégations temporelle et spatiale][11]. Pour surveiller une distribution pour une métrique de type count, utilisez `sum` à la fois pour les agrégations temporelle et spatiale.

### Variables d'environnement

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Clé d'API Datadog][7] - **Obligatoire**|
| `DD_SITE` | [Site Datadog][5] - **Obligatoire** |
| `DD_LOGS_ENABLED` | Si cette variable est définie sur true, les logs (stdout et stderr) sont envoyés à Datadog. Valeur par défaut : false. |
| `DD_LOGS_INJECTION`| Lorsqu'elle est définie sur true, cette variable enrichit tous les logs avec des données de tracing pour les loggers pris en charge en [Java][19], [Node][20], [.NET][21] et [PHP][22]. Consultez la documentation supplémentaire relative à [Python][23], [Go][24] et [Ruby][25]. |
| `DD_TRACE_SAMPLE_RATE`|  Permet de contrôler les taux d'échantillonnage `0.0` et `1.0` de l'ingestion de traces. |
| `DD_SERVICE`      | Voir la section [Tagging de service unifié][6].                                  |
| `DD_VERSION`      | Voir la section [Tagging de service unifié][6].                                  |
| `DD_ENV`          | Voir la section [Tagging de service unifié][6].                                  |
| `DD_SOURCE`       | Voir la section [Tagging de service unifié][6].                                  |
| `DD_TAGS`         | Voir la section [Tagging de service unifié][6].                                  |

## Dépannage

Pour que cette intégration fonctionne, votre runtime doit disposer d'une implémentation SSL complète. Si vous utilisez une image légère, vous devrez peut-être ajouter la commande suivante à votre Dockerfile afin d'inclure des certificats.

```
RUN apt-get update && apt-get install -y ca-certificates
```


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/google_cloud_platform/#log-collection
[2]: /fr/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /fr/getting_started/site/
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /fr/metrics/distributions/
[10]: /fr/metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets
[12]: /fr/tracing/trace_collection/library_config/go/
[13]: /fr/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[14]: /fr/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[15]: /fr/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[16]: /fr/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[17]: /fr/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
[18]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
[19]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[20]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs
[21]: /fr/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[22]: /fr/tracing/other_telemetry/connect_logs_and_traces/php
[23]: /fr/tracing/other_telemetry/connect_logs_and_traces/python
[24]: /fr/tracing/other_telemetry/connect_logs_and_traces/go
[25]: /fr/tracing/other_telemetry/connect_logs_and_traces/ruby