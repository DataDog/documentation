---
algolia:
  tags:
  - rum traces
aliases:
- /fr/real_user_monitoring/connect_rum_and_traces
- /fr/real_user_monitoring/platform/connect_rum_and_traces/
description: Connectez les données RUM du frontend aux traces APM du backend pour
  une visibilité de bout en bout sur l'ensemble de votre pile applicative et du parcours
  utilisateur.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Commencer la surveillance d'applications monopages
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Diagnostics simplifiés grâce à la mise en corrélation entre produits
- link: /tracing/
  tag: Documentation
  text: APM et tracing distribué
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Session Replay
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: Blog
  text: Résoudre vos problèmes grâce aux outils de développement Browser de Session Replay
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Mettre en corrélation les événements Datadog RUM avec les traces de vos applications
    instrumentées via OpenTelemetry
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Activez une visibilité de bout en bout dans vos applications Java avec une
    seule commande
title: Associer votre RUM à vos traces
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM et traces" style="width:100%;">}}

## Présentation {#overview}

L'intégration APM avec Real User Monitoring vous permet de lier les requêtes de vos applications web et mobiles à leurs traces backend correspondantes. Cette combinaison vous permet de visualiser l'ensemble de vos données frontend et backend à travers une seule interface.

Grâce aux données frontend de la fonctionnalité RUM et aux données relatives au backend, à l'infrastructure et aux logs provenant de l'injection d'ID de trace, vous pouvez identifier la cause de vos problèmes, où qu'ils se trouvent dans votre pile. Ainsi, vous saisissez parfaitement l'expérience que vous offrez à vos utilisateurs.

Pour commencer à envoyer les traces de votre application iOS à Datadog, consultez la section [Collecte de traces iOS][1].

## Utilisation {#usage}

### Prérequis {#prerequisites}

-   Vous avez configuré [APM tracing][2] sur les services ciblés par vos applications RUM.
-   Vos services utilisent un serveur HTTP.
-   Vos serveurs HTTP utilisent [une bibliothèque qui prend en charge le traçage distribué](#supported-libraries).
-   Vous avez configuré les éléments suivants en fonction de votre SDK :
    - Avec le **Browser SDK**, vous avez ajouté les ressources XMLHttpRequest (XHR) ou Fetch sur le RUM Explorer à votre `allowedTracingUrls`.
    - Avec le **Mobile SDK**, vous avez ajouté Native ou XMLHttpRequest (XHR) à votre `firstPartyHosts`.
-   Vous disposez d'une trace correspondante pour les requêtes vers `allowedTracingUrls` ou `firstPartyHosts`.

### Configurer RUM {#setup-rum}

**Remarque :** La configuration de RUM et des traces utilise des données APM payantes dans RUM, ce qui peut avoir un impact sur votre facturation APM.

{{< tabs >}}
{{% tab "RUM Browser" %}}

1. Configurez [RUM Browser Monitoring][1].

2. Initialisez le SDK RUM. Configurez le paramètre d'initialisation `allowedTracingUrls` avec la liste des origines internes de première partie appelées par votre application web.

   Pour **npm install** :
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not specified, defaults to 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

   Pour **CDN install** :

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: matches if any substring of the URL matches the provided RegExp. For example, `/^https:\/\/[^\/]+\.my-api-domain\.com/` matches URLs like `https://foo.my-api-domain.com/path`, but not `https://notintended.com/?from=guess.my-api-domain.com`. **Note:** The RegExp is not anchored to the start of the URL unless you use `^`. Be careful, as overly broad patterns can unintentionally match unwanted URLs and cause CORS errors.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

<div class="alert alert-danger">Lors de l'utilisation de RegExp, le modèle est testé par rapport à l'URL entière en tant que sous-chaîne, et non seulement par rapport au préfixe. Pour éviter les correspondances involontaires, ancrez votre RegExp avec <code>^</code> et soyez aussi précis que possible. </div>

3.  _(Facultatif)_ Configurez le paramètre d'initialisation `traceSampleRate` pour conserver un pourcentage défini des traces backend. S'il n'est pas défini, 100 % des traces provenant des requêtes du navigateur sont envoyées à Datadog. Pour conserver 20 % des traces backend, par exemple :

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Remarque** : `traceSampleRate` **n'a pas d'impact** sur l'échantillonnage des sessions RUM. Seules les traces backend sont exclues par échantillonnage.

4. _(Facultatif)_ Si vous définissez un `traceSampleRate`, pour garantir que les décisions d'échantillonnage des services backend sont toujours appliquées, configurez le paramètre d'initialisation `traceContextInjection` sur `sampled` (défini sur `sampled` par défaut).

    Par exemple, si vous définissez le `traceSampleRate` sur 20 % dans le Browser SDK :
    - Lorsque `traceContextInjection` est défini sur `all`, **20 %** des traces backend sont conservées et **80 %** des traces backend sont supprimées.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection défini sur all" style="width:90%;">}}

    - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the SDK head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection défini sur sampled" style="width:90%;">}}

<div class="alert alert-info">Le traçage de bout en bout est disponible pour les requêtes déclenchées après l'initialisation du Browser SDK. Le traçage de bout en bout du document HTML initial et des premières requêtes du navigateur n'est pas pris en charge.</div>

[1]: /fr/real_user_monitoring/application_monitoring/browser/
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "RUM Android" %}}

1. Configurez [RUM Android Monitoring][1].
2. Configurez [Android Trace Collection][2].
3. Ajoutez la dépendance Gradle à la bibliothèque `dd-sdk-android-okhttp` dans le fichier `build.gradle` au niveau du module :

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configurez l'intercepteur `OkHttpClient` avec la liste des origines internes de première partie appelées par votre application Android.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Facultatif)_ Configurez le paramètre `traceSampleRate` pour conserver un pourcentage défini des traces backend. Si rien n'est défini, 100 % des traces provenant des requêtes de l'application sont envoyées à Datadog. Pour conserver 20 % des traces backend :

    ```kotlin
    val tracedHosts = listOf("example.com")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
          DatadogInterceptor.Builder(tracedHosts)
              .setTraceSampleRate(20f)
              .build()
        )
        .build()
    ```

**Note** :
* `traceSampleRate` **n'a pas d'impact** sur l'échantillonnage des sessions RUM. Seules les traces backend sont exclues par échantillonnage.
* Si vous définissez des types d'en-tête de traçage personnalisés dans la configuration Datadog et que vous utilisez un traceur enregistré avec `GlobalTracer`, assurez-vous que les mêmes types d'en-tête de traçage sont définis pour le SDK utilisé.

[1]: /fr/real_user_monitoring/android/
[2]: /fr/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "RUM iOS" %}}

1. Configurez [RUM iOS Monitoring][1].

2. Activez `RUM` et l'instrumentation URLSession avec la configuration `urlSessionTracking` et le paramètre `firstPartyHostsTracing` :
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```
    
   Par défaut, tous les sous-domaines des hôtes listés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le traçage pour `api.example.com` et `foo.example.com`.

   L'injection d'ID de trace fonctionne lorsque vous fournissez un `URLRequest` au `URLSession`. Le traçage distribué ne fonctionne pas lorsque vous utilisez un objet `URL`.

3. _(Facultatif)_ Pour une répartition détaillée des temps (résolution DNS, négociation SSL, délai avant le premier octet, temps de connexion et durée du téléchargement), activez `URLSessionInstrumentation` pour votre type `SessionDelegate` :
    ```swift
    URLSessionInstrumentation.enableDurationBreakdown(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )

    let session = URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   **Remarque** : Le traçage distribué fonctionne automatiquement, mais les mesures de temps des traces sont plus précises après l'activation de `URLSessionInstrumentation`.

4. _(Facultatif)_ Définissez le paramètre `sampleRate` pour conserver un pourcentage défini des traces backend. Si rien n'est défini, 100 % des traces provenant des requêtes de l'application sont envoyées à Datadog.

     Pour conserver 20 % des traces backend :
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 20
                )
            )
        )
    )
    ```
**Remarque** : `sampleRate` **n'a pas d'impact** sur l'échantillonnage des sessions RUM. Seules les traces backend sont exclues par l'échantillonnage.

[1]: /fr/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. Configurez [RUM React Native Monitoring][1].

2. Renseignez le paramètre d'initialisation `firstPartyHosts` pour définir la liste des origines internes de première partie appelées par votre application React Native :
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Facultatif)_ Définissez le paramètre d'initialisation `resourceTracingSamplingRate` pour conserver un pourcentage défini des traces backend. Si rien n'est défini, 100 % des traces provenant des requêtes de l'application sont envoyées à Datadog.

     Pour conserver 20 % des traces backend :
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 20;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /fr/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. Configurez [RUM Flutter Monitoring][1].

2. Suivez les instructions de la section [Automatically track resources][2] pour inclure le package Datadog Tracking HTTP Client et activer le suivi HTTP. Cela inclut les modifications suivantes apportées à votre initialisation pour ajouter une liste d'origines internes de première partie appelées par votre application Flutter :
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /fr/real_user_monitoring/application_monitoring/flutter/setup/
[2]: /fr/real_user_monitoring/application_monitoring/flutter/advanced_configuration#automatically-track-resources
{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le RUM pour Roku n'est pas disponible sur le {{< region-param key="dd_datacenter" >}} site Datadog.</div>
{{< /site-region >}}

1. Configurez [RUM Roku Monitoring][1].

2. Utilisez le composant `datadogroku_DdUrlTransfer` pour effectuer vos requêtes réseau.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /fr/real_user_monitoring/application_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. Configurez [RUM Kotlin Multiplatform Monitoring][1].
2. Configurez [Ktor instrumentation][2].

3. Définissez le paramètre d'initialisation `tracedHosts` dans la configuration du Datadog Ktor Plugin pour définir la liste des origines internes de première partie appelées par votre application Kotlin Multiplatform :
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4. _(Facultatif)_ Définissez le paramètre d'initialisation `traceSampleRate` pour conserver un pourcentage défini des traces backend. Si ce paramètre n'est pas défini, 20 % des traces provenant des requêtes de l'application sont envoyées à Datadog.

     Pour conserver 100 % des traces backend :
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    **Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /fr/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[2]: /fr/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### Vérification de la configuration {#verifying-setup}

Pour vérifier que vous avez bien configuré l'intégration d'APM avec RUM, suivez les étapes ci-dessous en fonction du SDK avec lequel vous avez installé RUM.


{{< tabs >}}
{{% tab "Browser" %}}

1. Accédez à une page de votre application.
2. Dans les outils de développement de votre navigateur, accédez à l'onglet {{< ui >}}Network{{< /ui >}}.
3. Vérifiez que les en-têtes d'une requête de ressource que vous souhaitez corréler contiennent les [en-têtes de corrélation de Datadog][1].

[1]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Exécutez votre application depuis Android Studio.
2. Accédez à un écran de votre application.
3. Ouvrez le [Network Inspector][1] d'Android Studio.
4. Examinez les en-têtes de requête d'une ressource RUM et vérifiez que les [en-têtes requis sont définis par le SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Exécutez votre application depuis Xcode.
2. Accédez à un écran de votre application.
3. Ouvrez l'instrument [Network Connections and HTTP Traffic][1] de Xcode.
4. Examinez les en-têtes de requête d'une ressource RUM et vérifiez que les [en-têtes requis sont définis par le SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Exécutez votre application depuis Xcode (iOS) ou Android Studio (Android).
2. Accédez à un écran de votre application.
3. Ouvrez l'instrument [Network Connections and HTTP Traffic][1] de Xcode ou le [Network Inspector][2] d'Android Studio.
4. Vérifiez les en-têtes de requête pour une ressource RUM et assurez-vous que les [en-têtes requis sont définis par le SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Exécutez votre application en utilisant votre IDE préféré ou `flutter run`.
2. Accédez à un écran de votre application.
3. Ouvrez les [Dev Tools][1] de Flutter et accédez à la [Network View][2].
4. Vérifiez les en-têtes de requête pour une ressource RUM et assurez-vous que les [en-têtes requis sont définis par le SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Exécutez votre application depuis Xcode (iOS) ou Android Studio (Android).
2. Accédez à un écran de votre application.
3. Ouvrez l'instrument [Network Connections and HTTP Traffic][1] de Xcode ou le [Network Inspector][2] d'Android Studio.
4. Vérifiez les en-têtes de requête pour une ressource RUM et assurez-vous que les [en-têtes requis sont définis par le SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## RUM Explorer vers Traces {#rum-explorer-to-traces}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM et traces" style="width:100%;">}}

Pour afficher les traces depuis le RUM Explorer :

1. Accédez à votre [liste de sessions][22] et cliquez sur une session pour laquelle des traces sont disponibles. Vous pouvez également rechercher des ressources avec des traces en utilisant `@_dd.trace_id:*`.

Lorsque vous sélectionnez une session, le panneau de session apparaît avec une répartition de la durée des requêtes, un graphique en flamme pour chaque span et un lien {{< ui >}}View Trace in APM{{< /ui >}}.

## Traces vers RUM Explorer {#traces-to-rum-explorer}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM et traces" style="width:100%;">}}

Pour afficher l'événement RUM à partir de Traces :

1. Dans une vue de trace, cliquez sur {{< ui >}}VIEW{{< /ui >}} pour voir toutes les traces créées pendant la durée de vie de la vue, ou sur {{< ui >}}RESOURCE{{< /ui >}} pour voir les traces associées à la ressource spécifique depuis l'onglet {{< ui >}}Overview{{< /ui >}}.
1. Cliquez sur {{< ui >}}See View in RUM{{< /ui >}} ou {{< ui >}}See Resource in RUM{{< /ui >}} pour ouvrir l'événement correspondant dans RUM Explorer.

## Bibliothèques prises en charge {#supported-libraries}

Vous trouverez ci-dessous une liste des bibliothèques backend prises en charge qui doivent être présentes sur les services recevant les requêtes réseau.

| Bibliothèque          | Version minimale |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## Prise en charge d'OpenTelemetry {#opentelemetry-support}

RUM prend en charge plusieurs types de propagateurs pour associer les ressources aux backends instrumentés avec des bibliothèques OpenTelemetry.

Le style d'injection par défaut est `tracecontext`, `Datadog`.

{{< tabs >}}
{{% tab "RUM Browser" %}}

**Remarque** : si vous utilisez un framework backend tel que Next.js/Vercel qui utilise OpenTelemetry, suivez ces étapes.

1. Configurez RUM pour le connecter à APM comme décrit ci-dessus.

2. Modifiez `allowedTracingUrls` comme suit :
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` accepts the same parameter types (`string`, `RegExp` or `function`) as when used in its simple form, described above.

    `propagatorTypes` accepts a list of strings for desired propagators:
      - `datadog`: Datadog's propagator (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "RUM iOS" %}}

1. Configurez RUM pour le connecter à APM comme décrit ci-dessus.

2. Utilisez `.traceWithHeaders(hostsWithHeaders:sampleRate:)` au lieu de `.trace(hosts:sampleRate:)` comme suit :
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "RUM Android" %}}
1. Configurez RUM pour le connecter à APM comme décrit ci-dessus.

2. Configurez l'intercepteur `OkHttpClient` avec la liste des origines internes de première partie et le type d'en-tête de traçage à utiliser comme suit :
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "React Native RUM" %}}
1. Configurez RUM pour [le connecter à APM](#setup-rum).

2. Configurez le SDK RUM avec la liste des origines internes de première partie et le type d'en-tête de traçage à utiliser comme suit :
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [{
        match: "example.com",
        propagatorTypes: [
            PropagatorType.TRACECONTEXT,
            PropagatorType.DATADOG
        ]
    }];
    ```

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Flutter RUM" %}}
1. Configurez RUM pour le connecter à APM comme décrit ci-dessus.

2. Utilisez `firstPartyHostsWithTracingHeaders` au lieu de `firstPartyHosts` comme suit :
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Kotlin Multiplatform RUM" %}}
1. Configurez RUM pour [le connecter à APM](#setup-rum).

2. Configurez le SDK RUM avec la liste des origines internes de première partie et le type d'en-tête de traçage à utiliser comme suit :
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## Comment les ressources RUM sont liées aux traces {#how-rum-resources-are-linked-to-traces}

Datadog utilise le protocole de traçage distribué et configure les en-têtes HTTP suivants. Par défaut, le contexte de trace et les en-têtes spécifiques à Datadog sont utilisés.

Ces en-têtes sont ajoutés uniquement lorsque leur type de propagateur correspondant est actif. Par défaut, RUM inclut le propagateur `datadog` en plus du contexte de trace. Consultez [la prise en charge d'OpenTelemetry](#opentelemetry-support) pour voir ou modifier les propagateurs activés.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Généré à partir du SDK Real User Monitoring. Permet à Datadog de lier la trace à la ressource RUM.

`x-datadog-parent-id`
: Généré à partir du SDK Real User Monitoring. Permet à Datadog de générer le premier span à partir de la trace.

`x-datadog-origin: rum`
: Généré à partir du SDK Real User Monitoring. Permet à Datadog de détecter la source de la trace.

`x-datadog-sampling-priority`
: Défini sur `1` par le SDK Real User Monitoring si la trace a été échantillonnée, ou sur `0` si elle ne l'a pas été.
{{% /tab %}}
{{% tab "Contexte de trace W3C" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: La spécification actuelle suppose que la version est définie sur `00`.
: `trace id`: ID de trace 128 bits, hexadécimal sur 32 caractères. L'ID de trace source est de 64 bits pour conserver la compatibilité avec APM.
: `parent id`: ID de span de 64 bits, hexadécimal sur 16 caractères.
: `trace flags`: Échantillonné (`01`) ou non échantillonné (`00`)

**Conversion d'ID de trace** : l'ID de trace W3C de 128 bits est créé en complétant l'ID de trace source original de 64 bits avec des zéros en tête. Cela garantit la compatibilité avec APM tout en étant conforme à la spécification W3C Trace Context. L'ID de trace original de 64 bits devient les 64 bits inférieurs de l'ID de trace W3C de 128 bits.

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd` : préfixe fournisseur de Datadog.
: `sampling priority` : défini sur `1` si la trace a été échantillonnée, ou `0` si elle ne l'a pas été.
: `origin` : toujours défini sur `rum` pour éviter que les traces générées par Real User Monitoring n'affectent le nombre d'APM Index Spans.

**Exemples** :

ID de trace source (64 bits) : `8448eb211c80319c`

W3C Trace Context (128 bits) : `00000000000000008448eb211c80319c`

La relation montre que l'ID de trace original de 64 bits `8448eb211c80319c` est complété par 16 zéros en tête (`0000000000000000`) pour créer l'ID de trace W3C de 128 bits.

Exemple complet de traceparent :
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / en-têtes b3 multiples" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: ID de trace de 64 bits, représenté par 16 caractères hexadécimaux.
: `span id`: ID de span de 64 bits, représenté par 16 caractères hexadécimaux.
: `sampled`: vrai (`1`) ou faux (`0`)

Exemple pour l'en-tête unique b3 :
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Exemple pour les en-têtes multiples b3 :
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

Ces en-têtes HTTP ne figurent pas dans la liste des en-têtes autorisés par défaut par CORS. Vous devez donc [configurer Access-Control-Allow-Headers][17] sur le serveur qui traite les requêtes que le SDK est configuré pour surveiller. Le serveur doit également accepter les [requêtes de pré-vérification][18] (requêtes OPTIONS), qui sont effectuées par le navigateur avant chaque requête lorsque le traçage est autorisé sur des URL intersites.

## Rétention des traces {#trace-retention}

Les traces ingérées sont disponibles pendant 15 minutes dans l'explorateur [Live Search][19]. Pour conserver les traces plus longtemps, [créez des filtres de rétention APM][20]. Appliquez ces filtres de rétention à n'importe quel tag de span pour conserver les traces des pages et des actions utilisateur critiques.

Si vous utilisez RUM Without Limits, vous pouvez également utiliser des [filtres de rétention inter-produits][21] pour conserver les traces APM associées à des sessions RUM spécifiques, optimisant ainsi la corrélation entre votre frontend et votre backend. Par défaut, 1 % des [sessions RUM et de leurs traces sont automatiquement conservées][23] sans frais supplémentaires.

## Impact sur les quotas APM {#effect-on-apm-quotas}

L'association des données RUM et des traces peut augmenter considérablement les volumes ingérés par l'APM. Utilisez le paramètre d'initialisation `traceSampleRate` pour contrôler la part des traces backend issues de requêtes provenant de navigateurs et d'appareils mobiles à ingérer.

La configuration de filtres de rétention inter-produits peut également augmenter les volumes indexés par l'APM. Utilisez le taux de rétention des filtres de rétention inter-produits pour contrôler la part des traces backend à indexer.

## Pour aller plus loin {#further-reading}

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
[21]: /fr/real_user_monitoring/rum_without_limits/retention_filters/#cross-product-retention-filters
[22]: https://app.datadoghq.com/rum/explorer
[23]: /fr/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling