---
aliases:
- /fr/tracing/serverless_functions
- /fr/tracing/setup_overview/serverless_functions/
- /fr/serverless/troubleshooting/serverless_apm_metrics/
further_reading:
- link: /tracing/
  tag: Documentation
  text: Explorer l'APM Datadog
- link: /tracing/trace_search_and_analytics/#live-search-pendant-15-minutes
  tag: Documentation
  text: Live Search
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: Blog
  text: Tracing distribué en temps réel pour des fonctions Lambda Go et Java
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Surveiller votre pile sans serveur dans la vue Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Surveillance sans serveur Datadog pour les services AWS entièrement gérés
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: Blog
  text: Tracing distribué en temps réel pour des fonctions Lambda .NET
kind: documentation
title: Tracing distribué avec des applications sans serveur
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur"  style="width:100%;">}}

Associez vos traces sans serveur à vos métriques pour permettre à Datadog de vous offrir une vue d'ensemble détaillée et contextualisée des performances de votre application. Compte tenu de la nature distribuée des applications sans serveur, vous pouvez ainsi mieux dépanner les problèmes de performance.

Les bibliothèques de tracing Python, Node.js, Ruby, Go, Java et .NET Datadog prennent en charge le tracing distribué pour AWS Lambda.

## Choisir votre solution de tracing

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

<div class="alert alert-info"> Vous souhaitez tirer profit de la surveillance sans serveur ? Suivez <a href="/serverless/installation/">ces étapes d'installation</a> pour commencer sur de solides bases.</div>

Pour comment à utiliser la solution APM Datadog avec votre solution sans serveur, vous pouvez choisir de générer des traces à l'aide du client de tracing Datadog (`dd-trace`) ou récupérer des traces X-Ray à partir d'AWS.

| [APM Datadog with dd-trace][1]          | [APM Datadog avec AWS X-Ray][2]           |
|---------------------------------|-------------------------------------------------------------------------|
| Utilise les bibliothèques d'intégration de l'APM Datadog pour un tracing de bout en bout.  | Traces récupérées depuis AWS X-Ray. |
| Traces affichées en temps réel dans Datadog. | Données des traces disponibles dans Datadog après quelques minutes |
| Échantillonnage basé sur le tailing et filtres de rétention basés sur les tags entièrement personnalisables. | Taux d'échantillonnage non configurable. |
| Prise en charge des runtimes Lambda. |  Prise en charge des runtimes Lambda. |

### Recommandations de runtime

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python et Node.js

La bibliothèque Lambda Datadog et les bibliothèques de tracing pour Python et Node.js prennent en charge les fonctionnalités suivantes :
- Corrélation automatique des logs Lambda et des traces avec l'ID de trace et l'injection de traces
- Installation sans modification du code à l'aide des intégrations Serverless Framework, AWS SAM et AWS CDK
- Le tracing des requêtes HTTP appelant des conteneurs ou des fonctions Lambda en aval
- Tracing des appels Lambda consécutifs effectués avec AWS SDK.
- Tracing des appels Lambda asynchrones via AWS Managed Services
  - API Gateway
  - SQS
  - SNS
  - Intégration directe de SNS et SQS
  - Kinesis
  - EventBridge
- Tracing de dizaines de bibliothèques supplémentaires [Python][3] et [Node.js][4] prêtes à l'emploi

Pour les applications sans serveur Python et Node.js, Datadog vous conseille d'[installer les bibliothèques de tracing Datadog][5]. Si vous devez effectuer pour votre application un tracing actif d'AWS X-Ray dans des services AWS gérés, comme AppSync ou Step Functions, il est recommandé d'enrichir vos traces AWS X-Ray à l'aide de la solution APM Datadog. Pour ce faire, configurez _à la fois_ les bibliothèques de tracing d'APM Datadog et d'AWS X-Ray, tel que décrit dans la section [Fusion de traces sans serveur][6].

Si vous effectuez déjà le tracing de vos fonctions sans serveur avec X-Ray, et que vous souhaitez continuer à utiliser ce service, vous pouvez [installer l'intégration AWS X-Ray][2].

*Vous souhaitez tracer d'autres ressources sans serveur ? Créez une demande de fonctionnalité sur [cette page][7].*

#### Ruby

La bibliothèque Lambda Datadog et les bibliothèques de tracing pour Ruby prennent en charge les fonctionnalités suivantes :
- Corrélation automatique des logs Lambda et des traces avec l'ID de trace et l'injection de traces
- Le tracing des requêtes HTTP appelant des conteneurs ou des fonctions Lambda en aval
- Tracing de dizaines de bibliothèques supplémentaires [Ruby][8] prêtes à l'emploi

Vous pouvez tracer vos fonctions sans serveur dans Datadog avec les [bibliothèques de tracing Datadog][5], ou en [installant l'intégration AWS X-Ray][2]. Si vous utilisez les [bibliothèques de tracing Datadog][5] et devez associer des traces de fonctions Lambda dans plusieurs services AWS gérés, Datadog vous conseille d'enrichir vos traces en configurant _à la fois_ les [bibliothèques de tracing d'APM Datadog et d'AWS X-Ray][6].

*Vous souhaitez tracer d'autres ressources sans serveur ? Créez une demande de fonctionnalité sur [cette page][7].*

#### Go

La bibliothèque Lambda Datadog et les bibliothèques de tracing pour Go prennent en charge les fonctionnalités suivantes :
- Corrélation manuelle des logs Lambda et des traces avec l'ID de trace et l'injection de traces
- Le tracing des requêtes HTTP appelant des conteneurs ou des fonctions Lambda en aval
- Tracing de dizaines de bibliothèques supplémentaires [Go][9] prêtes à l'emploi

Pour les applications sans serveur Go, Datadog vous conseille d'installer les [bibliothèques de tracing Datadog][5]. Si vous devez effectuer pour votre application un tracing actif d'AWS X-Ray dans des services AWS gérés, comme API Gateway ou Step Functions, vous pouvez envisager d'utiliser plutôt le [tracing AWS X-Ray avec APM Datadog][2].

*Vous souhaitez tracer d'autres ressources sans serveur ? Créez une demande de fonctionnalité sur [cette page][7].*

#### Java

La bibliothèque Lambda Datadog et les bibliothèques de tracing pour Java prennent en charge les fonctionnalités suivantes :
- Mise en corrélation des logs Lambda et des traces avec l'ID de trace et l'injection de traces (voir la section [Associer vos logs Java à vos traces][10] pour en savoir plus)
- Le tracing des requêtes HTTP appelant des conteneurs ou des fonctions Lambda en aval
- Tracing de dizaines de bibliothèques supplémentaires [Java][11] prêtes à l'emploi

Pour les applications sans serveur Java, Datadog vous conseille d'installer les [bibliothèques de tracing Datadog][5]. Si vous devez effectuer pour votre application un tracing actif d'AWS X-Ray dans des services AWS gérés, comme API Gateway ou Step Functions, vous pouvez envisager d'utiliser plutôt le [tracing AWS X-Ray avec APM Datadog][2].

*Vous souhaitez partager votre avis sur les bibliothèques de tracing Datadog pour les fonctions Lambda Java ? N'hésitez pas à rejoindre le canal [#serverless][12] de la [communauté Slack Datadog][13] pour participer aux discussions.*

#### .NET

La bibliothèque de tracing pour .NET prend en charge les fonctionnalités suivantes :
- Tracing des requêtes HTTP appelant des conteneurs ou des fonctions Lambda en aval
- Tracing de dizaines de bibliothèques supplémentaires [.NET][14] prêtes à l'emploi

Pour les applications sans serveur .NET, Datadog vous conseille d'installer les [bibliothèques de tracing Datadog][5]. Si vous devez effectuer pour votre application un tracing actif d'AWS X-Ray dans des services AWS gérés, comme API Gateway ou Step Functions, vous pouvez envisager d'utiliser plutôt le [tracing AWS X-Ray avec APM Datadog][2].

En savoir plus sur le [tracing via des applications sans serveur Azure .NET][15].

### Environnements hybrides

Si vous avez installé les bibliothèques de tracing Datadog (`dd-trace`) sur vos fonctions Lambda et vos hosts, vos traces dressent automatiquement un tableau complet des requêtes qui franchissent les limites de votre infrastructure, qu'il s'agisse de fonctions Lambda AWS, de hosts sur site ou de services gérés.

Si vous avez installé `dd-trace` sur vos hosts avec l'Agent Datadog, et si le tracing de vos fonctions sans serveur passe par AWS X-Ray, il est nécessaire de fusionner les traces pour afficher une trace unique et associée dans votre infrastructure. Consultez la section [Fusion de traces sans serveur][6] pour en savoir plus sur la fusion de traces entre `dd-trace` et AWS X-Ray.

L'[intégration Datadog/AWS X-Ray][2] fournit uniquement des traces pour les fonctions Lambda. Consultez la [documentation relative à la solution APM Datadog][16] pour en savoir plus sur le tracing dans des environnements basés sur des conteneurs ou des hosts.

## Activer l'APM Datadog

{{< img src="tracing/live_search/livesearchmain.mp4" alt="Live Search" video=true >}}

Les bibliothèques de tracing Python, Node.js, Ruby, Go, Java et .NET Datadog prennent en charge le tracing distribué pour AWS Lambda. Pour activer le tracing sur vos fonctions, suivez les [instructions d'installation][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /fr/integrations/amazon_xray/#overview
[3]: /fr/tracing/setup_overview/compatibility_requirements/python
[4]: /fr/tracing/setup_overview/compatibility_requirements/nodejs
[5]: /fr/serverless/installation/
[6]: /fr/serverless/distributed_tracing/serverless_trace_merging
[7]: https://docs.datadoghq.com/fr/help/
[8]: /fr/tracing/setup_overview/compatibility_requirements/ruby
[9]: /fr/tracing/setup_overview/compatibility_requirements/go
[10]: /fr/tracing/connect_logs_and_traces/java/
[11]: /fr/tracing/setup_overview/compatibility_requirements/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core
[15]: /fr/serverless/azure_app_services
[16]: /fr/tracing/setup_overview/