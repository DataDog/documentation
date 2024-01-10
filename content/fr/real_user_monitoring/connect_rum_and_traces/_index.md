---
algolia:
  tags:
  - rum traces
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
    instrumentées via OpenTelemetry
kind: documentation
title: Associer RUM à vos traces
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM et traces" style="width:100%;">}}

## Présentation

L'intégration d'APM avec la fonctionnalité Real User Monitoring vous permet de lier les requêtes de vos applications Web et mobiles aux traces backend correspondantes. Avec cette association, vous pouvez visualiser toutes vos données frontend et backend sous un seul angle.

Grâce aux données frontend de la fonctionnalité RUM et aux données relatives au backend, à l'infrastructure et aux logs provenant de l'injection d'ID de trace, vous pouvez identifier la cause de vos problèmes, où qu'ils se trouvent dans votre pile. Ainsi, vous saisissez parfaitement l'expérience que vous offrez à vos utilisateurs.

Pour commencer à envoyer les traces de votre application iOS à Datadog, consultez la section [Collecte de traces iOS][1].

## Utilisation

### Prérequis

-   Vous avez configuré le [tracing APM][2] pour les services ciblés par vos applications RUM.
-   Vos services utilisent un serveur HTTP.
-   Vos serveurs HTTP utilisent [une bibliothèque prenant en charge le tracing distribué](#bibliotheques-prises-en-charge).
-   Vous avez configuré ce qui suit en fonction de votre SDK :
    - Avec le **SDK Browser**, vous avez ajouté les ressources XMLHttpRequest (XHR) ou Fetch dans le RUM Explorer pour votre paramètre `allowedTracingUrls`.
    - Avec le **SDK Mobile**, vous avez ajouté les ressources Native ou XMLHttpRequest (XHR) pour votre paramètre `firstPartyHosts`.
-   Vous disposez de traces correspondant aux requêtes vers `allowedTracingUrls` ou `firstPartyHosts`.

### Configurer RUM

**Remarque :** la configuration de RUM et des traces nécessite l'utilisation des données APM facturées dans RUM, ce qui peut affecter votre facture APM.

{{< tabs >}}
{{% tab "RUM Browser" %}}

1. Configurez la [surveillance Browser RUM][1].

2. Initialisez le SDK RUM. Configurez le paramètre d'initialisation `allowedTracingUrls` avec la liste des origines internes first party appelées par votre application Browser.

   Pour une **installation via npm** :
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

   Pour une **installation via CDN** :

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<http://datadoghq.com|datadoghq.com>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: ["<https://api.example.com>", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("<https://api.example.com>")]
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
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

1. Configurez la [surveillance Android RUM][1].
2. Configurez la [collecte de traces Android][2].
3. Ajoutez la dépendance Gradle à la bibliothèque `dd-sdk-android-okhttp` dans le fichier `build.gradle` au niveau du module :

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configurez l'intercepteur `OkHttpClient` avec la liste des origines internes first party appelées par votre application Android.
    ```java
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    Par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

3.  _(Facultatif)_ Configurez le paramètre `traceSampler` pour conserver un certain pourcentage des traces backend. Si ce paramètre n'est pas défini, 20 % des traces issues des requêtes d'application sont envoyées à Datadog. Pour conserver 100 % des traces backend :

```java
    val okHttpClient = OkHttpClient.Builder()
       .addInterceptor(DatadogInterceptor(traceSampler = RateBasedSampler(100f)))
       .build()
  ```

**Remarque** : le paramètre `traceSamplingRate` **n'affecte pas** l'échantillonnage des sessions RUM. Seules les traces backend sont filtrées.

[1]: /fr/real_user_monitoring/android/
[2]: /fr/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "RUM pour iOS" %}}

1. Configurez la [surveillance iOS RUM][1].

2. Appelez la fonction builder `trackURLSession(firstPartyHosts:)` avec la liste des origines internes first party appelées par votre application iOS.
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

1. Configurez la [surveillance React Native RUM][1].

2. Configurez le paramètre d'initialisation `firstPartyHosts` pour définir la liste des origines internes first party appelées par votre application React Native.
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


{{% tab "RUM pour Roku" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM pour Roku n'est pas disponible pour le site US1-FED de Datadog.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">RUM pour Roku est en version bêta.</div>

1. Configurez la [surveillance Roku RUM][1].

2. Utilisez le composant `datadogroku_DdUrlTransfer` pour lancer vos requêtes réseau.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /fr/real_user_monitoring/roku/
{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Vérification de la configuration

Pour vérifier que vous avez bien configuré l'intégration d'APM avec RUM, suivez les étapes ci-dessous en fonction du SDK avec lequel vous avez installé RUM.


{{< tabs >}}
{{% tab "Browser" %}}

1. Consultez une page dans votre application.
2. Dans les outils de développement de votre navigateur, accédez à l'onglet **Network**.
3. Examinez les en-têtes de requête, trouvez une requête de ressource qui devrait être corrélée, et vérifiez qu'elle contient les [en-têtes de mise en corrélation de Datadog][1].

[1]: /fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Exécutez votre application depuis Android Studio.
2. Consultez un écran dans votre application.
3. Ouvrez l'[outil d'inspection de réseau][1] d'Android Studio.
4. Examinez les en-têtes de requête, trouvez une ressource RUM, et vérifiez que les [en-têtes requis sont définis par le SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces?tab=androidrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Exécutez votre application depuis Xcode.
2. Consultez un écran dans votre application.
3. Ouvrez l'[instrument Network Connections and HTTP Traffic][1] de Xcode.
4. Examinez les en-têtes de requête, trouvez une ressource RUM, et vérifiez que les [en-têtes requis sont définis par le SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces/?tab=iosrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Exécutez votre application depuis Xcode (iOS) ou Android Studio (Android).
2. Consultez un écran dans votre application.
3. Ouvrez l'[instrument Network Connections and HTTP Traffic][1] de Xcode ou l'[outil d'inspection de réseau][2] d'Android Studio.
4. Examinez les en-têtes de requête, trouvez une ressource RUM, et vérifiez que les [en-têtes requis sont définis par le SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Exécutez votre application depuis l'IDE de votre choix ou via `flutter run`.
2. Consultez un écran dans votre application.
3. Ouvrez les [outils de développement][1] de Flutter et accédez à la [vue Réseau][2].
4. Examinez les en-têtes de requête, trouvez une ressource RUM, et vérifiez que les [en-têtes requis sont définis par le SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## Bibliothèques compatibles

Les bibliothèques de tracing Datadog suivantes sont prises en charge :

| Bibliothèque          | Version minimale |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]     |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


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

Ces en-têtes HTTP ne sont pas ajoutés à la liste blanche du mécanisme CORS. Vous devez donc [configurer Access-Control-Allow-Headers][17] sur le serveur traitant les requêtes que le SDK surveille. Le serveur doit également accepter les [requêtes préliminaires][18] (requêtes OPTIONS), qui sont transmises par le SDK avant chaque requête.

## Cela a-t-il une incidence sur les quotas d'APM ?

Le fait d'associer RUM à vos traces peut considérablement augmenter les volumes ingérés par APM. Utilisez le paramètre d'initialisation `traceSampleRate` pour ne conserver qu'une partie des traces backend issues des requêtes Browser et Mobile.

## Pendant combien de temps les traces sont-elles conservées ?

Ces traces restent disponibles pendant 15 minutes dans l'explorateur [Live Search][19]. Pour augmenter la durée de rétention des traces, créez des [filtres de rétention][20]. Définissez des tags de span spécifiques sur ces filtres pour ne conserver que les traces associées aux pages et aux actions utilisateur qui vous intéressent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/dd_libraries/ios/?tab=swiftpackagemanagerspm
[2]: /fr/tracing
[3]: /fr/tracing/trace_collection/dd_libraries/python/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: /fr/tracing/trace_collection/dd_libraries/go/
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[7]: /fr/tracing/trace_collection/dd_libraries/java/
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[9]: /fr/tracing/trace_collection/dd_libraries/ruby/
[10]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[11]: /fr/tracing/trace_collection/dd_libraries/nodejs/
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[13]: /fr/tracing/trace_collection/dd_libraries/php/
[14]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[15]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/
[16]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[19]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[20]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters