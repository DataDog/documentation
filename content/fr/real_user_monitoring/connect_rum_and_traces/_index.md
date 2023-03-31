---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: GitHub
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: GitHub
  text: Surveiller des applications monopages
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Diagnostics simplifiés grâce à la mise en corrélation entre produits
- link: /tracing/
  tag: Documentation
  text: APM et tracing distribué
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Session Replay
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: GitHub
  text: Résoudre vos problèmes grâce aux outils de développement Browser de Session Replay
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Mettre en corrélation les événements RUM Datadog avec les traces de vos applications
    instrumentées via OTel
kind: documentation
title: Associer RUM à vos traces
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM et traces" style="width:100%;">}}

## Présentation

L'intégration d'APM avec la fonctionnalité Real User Monitoring vous permet de lier les requêtes de vos applications Web et mobiles aux traces backend correspondantes. Avec cette association, vous pouvez visualiser toutes vos données frontend et backend sous un seul angle.

Grâce aux données frontend de la fonctionnalité RUM et aux données relatives au backend, à l'infrastructure et aux logs provenant de l'injection d'ID de trace, vous pouvez identifier la cause de vos problèmes, où qu'ils se trouvent dans votre pile. Ainsi, vous saisissez parfaitement l'expérience que vous offrez à vos utilisateurs.

## Utilisation

### Prérequis

-   Vous avez configuré le [tracing APM][1] pour les services ciblés par vos applications RUM.
-   Vos services utilisent un serveur HTTP.
-   Vos serveurs HTTP utilisent [une bibliothèque prenant en charge le tracing distribué](#bibliotheques-prises-en-charge).
-   Vous avez configuré ce qui suit en fonction de votre SDK :
    - Avec le **SDK Browser**, vous avez ajouté les ressources XMLHttpRequest (XHR) ou Fetch dans le RUM Explorer pour votre paramètre `allowedTracingUrls`.
    - Avec le **SDK Mobile**, vous avez ajouté les ressources Native ou XMLHttpRequest (XHR) pour votre paramètre `firstPartyHosts`.
-   Vous disposez de traces correspondant aux requêtes vers `allowedTracingUrls` ou `firstPartyHosts`.

### Configurer RUM

{{< tabs >}}
{{% tab "RUM Browser" %}}

1.  Configurez la [surveillance Browser RUM][1].

2.  Initialisez le SDK RUM. Configurez le paramètre d'initialisation `allowedTracingUrls` avec la liste des origines internes first party appelées par votre application Browser.

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
    })
    ```

    Pour associer RUM à vos traces, vous devez indiquer votre application Browser dans le champ `service`.

    `allowedTracingUrls` prend l'URL complète (`<schéma>://<host>[:<port>]/<chemin>[?<requête>][#<fragment>]`). Ce paramètre accepte les types suivants :
      - `string` : toutes les URL qui commencent par la valeur définie sont incluses. Par exemple, `https://api.example.com` inclut `https://api.example.com/v1/resource`.
      - `RegExp `: exécute un test avec le RegExp et l'URL fournis.
      - `function` : l'URL est utilisée en tant que paramètre pour l'évaluation. Lorsqu'un `boolean` défini sur `true` est renvoyé, cela indique une correspondance.

3.  _(Facultatif)_ Configurez le paramètre d'initialisation `traceSampleRate` pour conserver un certain pourcentage des traces backend. Si ce paramètre n'est pas défini, 100 % des traces issues des requêtes Browser sont envoyées à Datadog. Par exemple, pour ne conserver que 20 % des traces backend :

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Remarque** : le paramètre `traceSampleRate` **n'affecte pas** l'échantillonnage des sessions RUM. Seules les traces backend sont filtrées.

<div class="alert alert-info">Le tracing de bout en bout est disponible pour les requêtes déclenchées après l'initialisation du SDK Browser. Le tracing de bout en bout du document HTML initial ainsi que des premières requêtes Browser n'est pas pris en charge.</div>

[1]: /fr/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "RUM pour Android" %}}

1.  Configurez la [surveillance Android RUM][1].

2.  Configurez l'intercepteur `OkHttpClient` avec la liste des origines internes first party appelées par votre application Android.
    ```java
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    Par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

3.  _(Facultatif)_ Configurez le paramètre `traceSamplingRate` pour conserver un certain pourcentage des traces backend. Si ce paramètre n'est pas défini, 20 % des traces issues des requêtes d'application sont envoyées à Datadog. Pour conserver 100 % des traces backend :

```java
    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(RumInterceptor(traceSamplingRate = 100f))
       .build()
  ```

**Remarque** : le paramètre `traceSamplingRate` **n'affecte pas** l'échantillonnage des sessions RUM. Seules les traces backend sont filtrées.

[1]: /fr/real_user_monitoring/android/
{{% /tab %}}
{{% tab "RUM pour iOS" %}}

1.  Configurez la [surveillance iOS RUM][1].

2.  Appelez la fonction builder `trackURLSession(firstPartyHosts:)` avec la liste des origines internes first party appelées par votre application iOS.
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```

3. Initialisez le `Tracer` global :
    ```swift
    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(...)
    )
    ```

4. Initialisez URLSession tel qu'indiqué à la rubrique [Configuration][1] :
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

   Par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

   Pour que l'injection des ID de trace fonctionne, vous devez spécifier une `URLRequest` pour la `URLSession`. Le tracing distribué ne fonctionne pas lorsque vous utilisez un objet `URL`.

5. _(Facultatif)_ Configurez le paramètre `tracingSamplingRate` pour conserver un certain pourcentage des traces backend. Si ce paramètre n'est pas défini, 20 % des traces issues des requêtes d'application sont envoyées à Datadog.

     Pour conserver 100 % des traces backend :
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
            .set(tracingSamplingRate: 100)
            .build()
    )
    ```
**Remarque** : le paramètre `tracingSamplingRate` **n'affecte pas** l'échantillonnage des sessions RUM. Seules les traces backend sont filtrées.

[1]: /fr/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "RUM pour React Native" %}}

1.  Configurez la [surveillance React Native RUM][1].

2.  Configurez le paramètre d'initialisation `firstPartyHosts` pour définir la liste des origines internes first party appelées par votre application React Native.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    Par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

3. _(Facultatif)_ Configurez le paramètre `resourceTracingSamplingRate` pour conserver un certain pourcentage des traces backend. Si ce paramètre n'est pas défini, 20 % des traces issues des requêtes d'application sont envoyées à Datadog.

     Pour conserver 100 % des traces backend :
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

   **Remarque** : le paramètre `resourceTracingSamplingRate` **n'affecte pas** l'échantillonnage des sessions RUM. Seules les traces backend sont filtrées.

[1]: /fr/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "RUM pour Flutter" %}}

1. Configurez la [surveillance Flutter RUM][1].

2. Suivez les instructions de la section [Suivi automatique de ressources][2] pour inclure le package Datadog Tracking HTTP Client et activer le suivi HTTP. Vous devrez notamment apporter les modifications suivantes à vos paramètres d'initialisation pour ajouter la liste des origines internes first party appelées par votre application Flutter :
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /fr/real_user_monitoring/flutter/
[2]: /fr/real_user_monitoring/flutter/#automatic-resource-tracking

{{% /tab %}}
{{< /tabs >}}

## Bibliothèques compatibles

Les bibliothèques de tracing Datadog suivantes sont prises en charge :

| Bibliothèque                             | Version minimale                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][2]                  | [0.22.0][3]                |
| [Go][4]                  | [1.10.0][5]                |
| [Java][6]                  | [0.24.1][7]                |
| [Ruby][8]                  | [0.20.0][9]                |
| [JavaScript][10]                  | [0.10.0][11]                |
| [PHP][12]                  | [0.33.0][13]                |
| [.NET][14]                  | [1.18.2][15]                |


## Prise en charge d'OpenTelemetry

RUM prend en charge plusieurs types de propagateurs pour associer les ressources aux backends instrumentés avec des bibliothèques OpenTelemetry.

{{< tabs >}} {{% tab "RUM Browser" %}}
1. Configurez RUM pour qu'il se connecte avec APM en suivant les instructions ci-dessus.

2. Modifiez le paramètre `allowedTracingUrls` comme suit :
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` accepte les mêmes types de paramètres (`string`, `RegExp` ou `function`) que lorsqu'il est utilisé dans sa forme simple, comme décrit ci-dessus.

    `propagatorTypes` accepte une liste de chaînes avec les propagateurs souhaités :
      - `datadog` : propagateur de Datadog (`x-datadog-*`)
      - `tracecontext` : [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `b3` : [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi` : [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "RUM pour iOS" %}}
1. Configurez RUM pour qu'il se connecte avec APM en suivant les instructions ci-dessus.

2. Utilisez `trackURLSession(firstPartyHostsWithHeaderTypes:)` au lieu de `trackURLSession(firstPartyHosts:)` comme suit :
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(
                firstPartyHostsWithHeaderTypes: [
                    "api.example.com": [.tracecontext]
                ]
            )
            .build()
        )
    ```
    `trackURLSession(firstPartyHostsWithHeaderTypes:)` accepte `Dictionary<Chaîne, Set<TypeEn-têteTracing>>` en tant que paramètre, la clé étant un host et la valeur étant une liste de types d'en-têtes de tracing pris en charge.

    `TracingHeaderType` est un enum représentant les types d'en-têtes de tracing suivants :
      - `.datadog` : propagateur de Datadog (`x-datadog-*`)
      - `.tracecontext` : [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3` : [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi` : [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "RUM pour Android" %}}
1. Configurez RUM pour qu'il se connecte avec APM en suivant les instructions ci-dessus.

2. Configurez l'intercepteur `OkHttpClient` avec la liste des origines internes first party et le type d'en-tête de tracing à utiliser, comme suit :
    ```java
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT), 
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    `TracingHeaderType` est un enum représentant les types d'en-têtes de tracing suivants :
      - `.DATADOG` : propagateur de Datadog (`x-datadog-*`)
      - `.TRACECONTEXT` : [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3` : [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI` : [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "RUM pour React Native" %}}
1. Configurez RUM pour qu'il se [connecte avec APM](#configurer-rum).

2. Configurez le SDK RUM avec la liste des origines internes first party et le type d'en-tête de tracing à utiliser, comme suit :
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [
        {match: "example.com", propagatorTypes: PropagatorType.TRACECONTEXT},
        {match: "example.com", propagatorTypes: PropagatorType.DATADOG}
    ];
    ```

    `PropagatorType` est un enum représentant les types d'en-têtes de tracing suivants :
      - `PropagatorType.DATADOG` : propagateur de Datadog (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT` : [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3` : [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI` : [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}} 

{{% tab "RUM pour Flutter" %}}
1. Configurez RUM pour qu'il se connecte avec APM en suivant les instructions ci-dessus.

2. Utilisez `firstPartyHostsWithTracingHeaders` au lieu de `firstPartyHosts`, comme suit :
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` accepte `Map<Châine, Set<TypeEn-têteTracing>>` en tant que paramètre, la clé étant un host et la valeur étant une liste de types d'en-têtes de tracing pris en charge.

    `TracingHeaderType` est un enum représentant les types d'en-têtes de tracing suivants :
      - `TracingHeaderType.datadog` : propagateur de Datadog (`x-datadog-*`)
      - `TracingHeaderType.tracecontext` : [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3` : [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi` : [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## Comment les ressources RUM sont-elles associées aux traces ?

Datadog utilise un protocole de tracing distribué et configure les en-têtes HTTP suivants :
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Généré à partir du SDK RUM. Permet à Datadog de lier la trace à la ressource RUM.

`x-datadog-parent-id`
: Généré à partir du SDK RUM. Permet à Datadog de générer la première span depuis la trace.

`x-datadog-origin: rum`
: Permet de s'assurer que les traces générées à partir de la fonctionnalité RUM ne rentrent pas en compte dans le calcul de vos spans indexées APM.

`x-datadog-sampling-priority: 1`
: Permet de s'assurer que l'Agent conserve la trace.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version` : la spécification actuelle part du principe que la version est définie sur `00`.
: `trace id` : ID de trace 128 bits, hexadécimal sur 32 caractères. L'ID de la trace source est en 64 bits pour assurer la compatibilité avec APM.
: `parent id` : ID de span 64 bits, hexadécimal sur 16 caractères.
: `trace flags` : avec échantillonnage (`01`) ou sans échantillonnage (`00`)

Exemple :
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{% tab "b3 / b3 Multiple Headers" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id` : ID de trace 64 bits, hexadécimal sur 16 caractères.
: `span id` : ID de span 64 bits, hexadécimal sur 16 caractères.
: `sampled` : True (`1`) ou False (`0`)

Exemple pour le propagateur b3 single header :
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Exemple pour le propagateur b3 multiple headers :
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

Ces en-têtes HTTP ne sont pas ajoutés à la liste blanche du mécanisme CORS. Vous devez donc [configurer Access-Control-Allow-Headers][16] sur le serveur traitant les requêtes que le SDK surveille. Le serveur doit également accepter les [requêtes préliminaires][17] (requêtes OPTIONS), qui sont transmises par le SDK avant chaque requête.

## Cela a-t-il une incidence sur les quotas d'APM ?

Le fait d'associer RUM à vos traces peut considérablement augmenter les volumes ingérés par APM. Utilisez le paramètre d'initialisation `traceSampleRate` pour ne conserver qu'une partie des traces backend issues des requêtes Browser et Mobile.

## Pendant combien de temps les traces sont-elles conservées ?

Ces traces restent disponibles pendant 15 minutes dans l'explorateur [Live Search][18]. Pour augmenter la durée de rétention des traces, créez des [filtres de rétention][19]. Définissez des tags de span spécifiques sur ces filtres pour ne conserver que les traces associées aux pages et aux actions utilisateur qui vous intéressent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing
[2]: /fr/tracing/trace_collection/dd_libraries/python/
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[4]: /fr/tracing/trace_collection/dd_libraries/go/
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: /fr/tracing/trace_collection/dd_libraries/java/
[7]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[8]: /fr/tracing/trace_collection/dd_libraries/ruby/
[9]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[10]: /fr/tracing/trace_collection/dd_libraries/nodejs/
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[12]: /fr/tracing/trace_collection/dd_libraries/php/
[13]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[14]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/
[15]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[16]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[17]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[18]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[19]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters