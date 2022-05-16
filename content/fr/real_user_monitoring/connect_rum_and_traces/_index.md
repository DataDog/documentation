---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
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
  tag: Blog
  text: Résoudre vos problèmes grâce aux outils de développement Browser de Session Replay
kind: documentation
title: Associer RUM à vos traces
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM et traces"  style="width:100%;">}}

L'intégration d'APM avec la fonctionnalité Real User Monitoring vous permet de lier les requêtes de vos applications Web et mobiles aux traces backend correspondantes. Avec cette association, vous pouvez visualiser toutes vos données frontend et backend sous un seul angle.

Grâce aux données frontend de la fonctionnalité RUM et aux données relatives au backend, à l'infrastructure et aux logs provenant de l'injection d'ID de trace, vous pouvez identifier la cause de vos problèmes, où qu'ils se trouvent dans votre pile. Ainsi, vous saisissez parfaitement l'expérience que vous offrez à vos utilisateurs.

## Utilisation

### Prérequis

-   Vous devez avoir configuré le [tracing APM][1] pour les services ciblés par vos applications RUM.
-   Vos services utilisent un serveur HTTP.
-   Vos serveurs HTTP utilisent [une bibliothèque prenant en charge le tracing distribué](#bibliotheques-prises-en-charge).
-   Vous disposez de ressources XMLHttpRequest (XHR) ou Fetch dans le RUM Explorer pour votre paramètre `allowedTracingOrigins`.
-   Vous disposez de traces correspondants aux requêtes vers `allowedTracingOrigins`.

### Configurer RUM

{{< tabs >}}
{{% tab "RUM Browser" %}}

1.  Configurez la [surveillance Browser RUM][1].

2.  Initialisez le SDK RUM. Configurez le paramètre d'initialisation `allowedTracingOrigins` à l'aide de la liste des origines internes first party appelées par votre application Browser.

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingOrigins: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/]
    })
    ```

Pour associer RUM à vos traces, vous devez indiquer votre application Browser dans le champ `service`.

**Remarque** : `allowedTracingOrigins` accepte les chaînes JavaScript et les expressions régulières ; ces dernières doivent correspondre aux origines appelées par votre application Browser, qui sont définies comme suit : `<schéma> "://" <hostname> [ ":" <port> ]`.

<div class="alert alert-info">Le tracing de bout en bout est disponible pour les requêtes déclenchées après l'initialisation du SDK Browser. Le tracing de bout en bout du document HTML initial ainsi que des premières requêtes Browser n'est pas pris en charge.</div>

[1]: /fr/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "RUM pour Android" %}}

1.  Configurez la [surveillance Android RUM][1].

2.  Configurez l'intercepteur `OkHttpClient` à l'aide de la liste des origines internes first party appelées par votre application Android.
    ```java
    val tracedHosts =  listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

**Remarque** : par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

[1]: /fr/real_user_monitoring/android/
{{% /tab %}}
{{% tab "RUM pour iOS" %}}

1.  Configurez la [surveillance iOS RUM][1].

2.  Configurez le paramètre d'initialisation `firstPartyHosts` à l'aide de la liste des origines internes first party appelées par votre application iOS.
    ```swift
    Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
        .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .build()
    )
    ```

3.  Initialisez URLSession tel qu'indiqué à la rubrique [Configuration][1] :
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

**Remarque** : par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing de `api.example.com` et `foo.example.com`.

[1]: /fr/real_user_monitoring/ios/
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


## Comment les ressources RUM sont-elles associées aux traces ?

Datadog utilise un protocole de tracing distribué et configure les en-têtes HTTP suivants :

`x-datadog-trace-id`
: Généré à partir du SDK RUM. Permet à Datadog de lier la trace à la ressource RUM.

`x-datadog-parent-id`
: Généré à partir du SDK RUM. Permet à Datadog de générer la première span depuis la trace.

`x-datadog-origin: rum`
: Permet de s'assurer que les traces générées à partir de la fonctionnalité RUM ne rentrent pas en compte dans le calcul de vos spans indexées APM.

`x-datadog-sampling-priority: 1`
: Permet de s'assurer que l'Agent conserve la trace.

`x-datadog-sampled: 1`
: Généré à partir du SDK RUM. Indique que cette requête est sélectionnée pour l'échantillonnage.

**Remarque** : ces en-têtes HTTP ne sont pas ajoutés à la liste blanche du mécanisme CORS. Vous devez donc [configurer Access-Control-Allow-Headers][16] sur le serveur traitant les requêtes que le SDK surveille. Le serveur doit également accepter les [requêtes préliminaires][17] (requêtes OPTIONS), qui sont transmises par le SDK avant chaque requête.

## Cela a-t-il une incidence sur les quotas de l'APM ?

L'en-tête `x-datadog-origin: rum` indique au backend APM que les traces sont générées depuis la fonctionnalité RUM. Les traces générées n'ont par conséquent aucun impact sur le calcul de vos spans indexées.

## Combien de temps les traces sont-elles conservées ?

Ces traces sont conservées [aussi longtemps comme vos traces APM standard][18].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing
[2]: /fr/tracing/setup_overview/setup/python/
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[4]: /fr/tracing/setup_overview/setup/go/
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: /fr/tracing/setup_overview/setup/java/
[7]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[8]: /fr/tracing/setup_overview/setup/ruby/
[9]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[10]: /fr/tracing/setup_overview/setup/nodejs/
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[12]: /fr/tracing/setup_overview/setup/php/
[13]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[14]: /fr/tracing/setup_overview/setup/dotnet-core/
[15]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[16]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[17]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[18]: /fr/tracing/trace_retention/