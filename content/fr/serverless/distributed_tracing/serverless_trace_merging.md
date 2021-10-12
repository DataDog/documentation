---
title: Fusion de traces sans serveur
kind: documentation
description: Enrichir le tracing AWS X-Ray avec l'APM Datadog
further_reading:
  - link: serverless
    text: Surveillance sans serveur avec Datadog
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur"  style="width:100%;" >}}

## Cas d'utilisation

Si vous avez configuré à la fois les bibliothèques de tracing de Datadog (`dd-trace`) et d'AWS X-Ray dans votre application, vous devez fusionner les traces sans serveur pour pouvoir visualiser une seule trace connectée. Si vous ne savez pas quelle bibliothèque de tracing utiliser, [consultez cette page afin de choisir votre bibliothèque de tracing][1].

Il existe deux scénarios justifiant l'instrumentation des bibliothèques de tracing `dd-trace` et AWS X-Ray :
- Dans un environnement AWS sans serveur, vous effectuez déjà le tracing de vos fonctions Lambda avec `dd-trace`. De plus, un tracing actif d'AWS X-Ray est requis pour les services AWS gérés, comme API Gateway ou Step Functions. Or, vous devez visualiser les spans `dd-trace` et AWS X-Ray au sein d'une unique trace.
- Dans un environnement hybride comprenant des fonctions Lambda et des hosts, `dd-trace` instrumente vos hosts, tandis qu'AWS X-Ray instrumente vos fonctions Lambda. Or, vous devez visualiser les traces connectées pour les transactions de l'ensemble de vos fonctions Lambda et de vos hosts.

Attention : la fusion des traces peut entraîner une augmentation de vos coûts. Les spans X-Ray seront toujours disponibles dans vos traces fusionnées pendant une durée de deux à cinq minutes. Dans la plupart des cas, nous vous conseillons d'utiliser une seule bibliothèque de tracing. Pour en savoir plus sur la sélection d'une bibliothèque de tracing, consultez [cette section][1].

Voici des instructions de configuration pour les deux scénarios évoqués ci-dessus :

- [Fusion de traces dans un environnement principalement sans serveur](#trace-merging-in-a-serverless-first-environment)
- [Fusion de traces entre des fonctions Lambda AWS et des hosts](#trace-merging-across-aws-lambda-and-hosts)

### Fusion de traces dans un environnement AWS sans serveur

AWS X-Ray propose à la fois un service AWS backend (le tracing actif d'AWS X-Ray) et un ensemble de bibliothèques client. [Lorsque le service AWS backend est activé indépendamment dans la console Lambda][2], vous disposez des spans `Initialization` et `Invocation` pour vos fonctions Lambda AWS. Vous pouvez également activer le tracing actif d'AWS X-Ray depuis les consoles API Gateway et Step Function.

Le SDK AWS X-Ray et les bibliothèques client de l'APM Datadog (`dd-trace`) accèdent directement à la fonction pour ajouter des métadonnées et des spans aux appels en aval. Si vous utilisez `dd-trace` pour effectuer le tracing au niveau du gestionnaire, voici à quoi ressemble la configuration finale :

1. Vous avez activé le [tracing actif d'AWS X-Ray][2] sur vos fonctions Lambda depuis la console AWS Lambda, ainsi que notre [intégration Datadog/AWS X-Ray][3].
2. Vous avez instrumenté vos fonctions Lambda avec l'APM Datadog (`dd-trace`) en suivant les [instructions d'installation pour votre runtime Lambda][4].
3. Les bibliothèques tierces sont automatiquement patchées par `dd-trace` ; les bibliothèques client AWS X-Ray n'ont donc pas besoin d'être installées.
4. Vous avez défini la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `true` (ou la variable d'environnement `DD_MERGE_DATADOG_XRAY_TRACES` pour Ruby) sur vos fonctions Lambda afin de fusionner les traces X-Ray et `dd-trace`.

### Configurer le tracing de fonctions AWS Lambda et de hosts

Si vous avez installé les bibliothèques de tracing Datadog (`dd-trace`) sur vos fonctions Lambda et vos hosts, vos traces dressent automatiquement un tableau complet des requêtes qui franchissent les limites de votre infrastructure, qu'il s'agisse de fonctions Lambda AWS, de hosts sur site ou de services gérés.

Si vous avez installé `dd-trace` sur vos hosts avec l'Agent Datadog, et si le tracing de vos fonctions sans serveur passe par AWS X-Ray, voici à quoi ressemble la configuration finale :

1. Vous avez installé l'[intégration AWS X-Ray][2] pour le tracing de vos fonctions Lambda. Par la même occasion, vous avez activé le tracing actif d'AWS X-Ray et installé les bibliothèques client X-Ray.
2. Vous avez installé la [bibliothèque Lambda Datadog pour votre runtime Lambda][4] et défini la variable d'environnement `DD_TRACE_ENABLED` sur `false`.
3. L'[APM Datadog][5] est configurée sur vos hosts et votre infrastructure à base de conteneurs.

Pour que les traces d'AWS X-Ray et de l'APM Datadog s'affichent dans le même flamegraph, tous les services doivent avoir le même tag `env`.

**Remarque** : le tracing distribué est pris en charge pour tout runtime d'application basée sur des hosts ou des conteneurs. Vos hosts et vos fonctions Lambda n'ont pas besoin d'être dans le même runtime.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="tracing d'une requête entre un host et une fonction Lambda" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/distributed_tracing/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[4]: /fr/serverless/installation/
[5]: /fr/tracing/send_traces/