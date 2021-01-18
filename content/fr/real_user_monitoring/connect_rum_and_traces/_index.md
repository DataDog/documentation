---
title: Associer RUM à vos traces
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /tracing/
    tag: Documentation
    text: APM et tracing distribué
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM et traces"  style="width:100%;">}}


L'intégration de l'APM avec la fonctionnalité Real User Monitoring vous permet d'associer les requêtes de vos applications Web et mobiles aux traces backend correspondantes. Cette association vous permet de visualiser toutes vos données front end et backend sous un seul angle.

Grâce aux données frontend de la fonctionnalité RUM et aux données relatives au backend, à l'infrastructure et aux logs provenant de l'injection d'ID de trace, vous pouvez identifier rapidement la cause de vos problèmes, où qu'ils se trouvent dans votre pile. Ainsi, vous saisissez parfaitement l'expérience que vous offrez à vos utilisateurs.

## Utilisation
### Prérequis

-   Le [tracing APM][1] est configuré pour les services ciblés par vos applications RUM.
-   Vos services utilisent un serveur HTTP.
-   Vos serveurs HTTP utilisent [une bibliothèque prenant en charge le tracing distribué](#bibliotheques-prises-en-charge).

### Configuration de RUM
{{< tabs >}}
{{% tab "RUM pour Browser" %}}

1.  Configurez la fonctionnalité [Real User Monitoring pour Browser][1].

2. Initialisez le SDK RUM. Configurez le paramètre d'initialisation `allowedTracingOrigins` à l'aide de la liste des origines internes (first party) appelées par votre application Browser.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    ...otherConfig,
    allowedTracingOrigins: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/]
})
```

**Remarque** : `allowedTracingOrigins` accepte les chaînes Javascript et les expressions régulières.

[1]: /fr/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "RUM pour Android" %}}

1.  Configurez la fonctionnalité [Real User Monitoring pour Android][1].

2.  Configurez l'intercepteur `OkHttpClient` à l'aide de la liste des origines internes (first party) appelées par votre application Android.
```java
val tracedHosts =  listOf("example.com", "example.eu")

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor(tracedHosts))
    .addNetworkInterceptor(TracingInterceptor(tracedHosts))
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

**Remarque** : Par défaut, tous les sous-domaines des hosts répertoriés sont tracés. Par exemple, si vous ajoutez `example.com`, vous activez également le tracing pour `api.example.com` et `foo.example.com`.

[1]: /fr/real_user_monitoring/android/
{{% /tab %}}
{{% tab "RUM pour iOS" %}}

1.  Configurez la fonctionnalité [Real User Monitoring pour iOS][1].

2.  Configurez le paramètre d'initialisation `firstPartyHosts` à l'aide de la liste des origines internes (first party) appelées par votre application iOS..
```swift
Datadog.initialize(
appContext: .init(),
configuration: Datadog.Configuration
    .builderUsing(rumApplicationID: "<id_app_rum>", clientToken: "<token_client>", environment: "<nom_env>")
    .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
    .build()
)
```

3.  Initialisez URLSession comme indiqué dans [la documentation de configuration][1] :
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

## Bibliothèques prises en charge

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

| EN-TÊTE                         | DESCRIPTION                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `x-datadog-trace-id `            | Généré à partir du SDK RUM. Permet à Datadog d'associer la trace à la ressource RUM.   |
| `x-datadog-parent-id`            | Généré à partir du SDK RUM. Permet à Datadog de générer la première span depuis la trace. |
| `x-datadog-origin: rum`          | Permet de s'assurer que les traces générées à partir de la fonctionnalité RUM ne rentrent pas en compte dans le calcul de vos spans indexées de l'APM.  |
| `x-datadog-sampling-priority: 1` | Permet de s'assurer que l'Agent conserve la trace.                                                           |  
| `x-datadog-sampled: 1`           | Généré à partir du SDK RUM. Indique que cette requête est sélectionnée pour l'échantillonnage.          |

## Cela a-t-il une incidence sur les quotas de l'APM ?

L'en-tête `x-datadog-origin: rum` indique au backend APM que les traces sont générées depuis la fonctionnalité RUM. Les traces générées n'ont par conséquent aucun impact sur le calcul de vos spans indexées.

## Combien de temps les traces sont-elles conservées ?

Ces traces sont conservées [aussi longtemps comme vos traces APM standard][16].

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
[16]: /fr/tracing/trace_retention_and_ingestion/