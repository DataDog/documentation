---
beta: true
dependencies:
  - https://github.com/DataDog/dd-sdk-ios/blob/master/docs/trace_collection.md
description: Recueillez des traces à partir de vos applications iOS.
further_reading:
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: Github
    text: Code source dd-sdk-ios
  - link: tracing/visualization/
    tag: Documentation
    text: Explorer vos services, ressources et traces
kind: documentation
title: Collecte de traces iOS
---
<div class="alert alert-info">La collecte de traces iOS est en bêta publique. Si vous avez des questions, contactez notre <a href="https://docs.datadoghq.com/help/" target="_blank">équipe d'assistance</a>.</div>

Envoyez des [traces][1] à Datadog à partir de vos applications iOS avec la [bibliothèque de tracing côté client `dd-sdk-ios` de Datadog][2]. Vous pourrez notamment :

* Créer des [spans][3] personnalisées pour diverses opérations dans votre application
* Envoyer des logs pour chaque span individuellement
* Utiliser des attributs par défaut et ajouter des attributs personnalisés à chaque span
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

1. Déclarez la bibliothèque en tant que dépendance en fonction de votre gestionnaire de packages :

    {{< tabs >}}
    {{% tab "CocoaPods" %}}

Vous pouvez utiliser [CocoaPods][1] pour installer `dd-sdk-ios` :
```
pod 'DatadogSDK'
```


[1]: https://cocoapods.org/
    {{% /tab %}}
    {{% tab "Swift Package Manager (SPM)" %}}

Pour réaliser l'intégration grâce au Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

    {{% /tab %}}
    {{% tab "Carthage" %}}

Vous pouvez utiliser [Carthage][1] pour installer `dd-sdk-ios` :
```
github "DataDog/dd-sdk-ios"
```


[1]: https://github.com/Carthage/Carthage
    {{% /tab %}}
    {{< /tabs >}}

2. Initialisez la bibliothèque avec le contexte de votre application et votre [token client Datadog][4]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][5] pour configurer la bibliothèque `dd-sdk-ios`, car elles risqueraient d'être exposées côté client dans le bytecode de l'IPA de l'application iOS. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4].

    {{< tabs >}}
    {{% tab "Site américain" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .build()
)
```

    {{% /tab %}}
    {{% tab "Site européen" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(tracesEndpoint: .eu)
        .build()
)
```

    {{% /tab %}}
    {{< /tabs >}}

     Lors de la création de votre application, vous pouvez activer les logs de développement. Tous les messages internes dans le SDK dont la priorité est égale ou supérieure au niveau spécifié sont alors enregistrés dans les logs de la console.

    ```swift
    Datadog.verbosityLevel = .debug
    ```

3. Le traceur Datadog utilise la [norme Open Tracing][6]. Configurez et enregistrez le `Tracer` globalement via le paramètre `Global.sharedTracer` d'Open Tracing. Vous ne devez effectuer cette opération qu'une seule fois, généralement dans votre code `AppDelegate` :

    ```swift
    import Datadog

    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(
            sendNetworkInfo: true
        )
    )
    ```

4. Instrumentez votre code à l'aide des méthodes suivantes :

    ```swift
    let span = Global.sharedTracer.startSpan(operationName: "<span_name>")
    // do something you want to measure ...
    // ... then, when the operation is finished:
    span.finish()
    ```

5. (Facultatif) Définissez la relation enfant-parent entre vos spans :

    ```swift
    let responseDecodingSpan = Global.sharedTracer.startSpan(
        operationName: "response decoding",
        childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
    )
    // ... decode HTTP response data ...
    responseDecodingSpan.finish()
    ```

6. (Facultatif) Fournissez des tags supplémentaires avec votre span :

    ```swift
    span.setTag(key: "http.url", value: url)
    ```

7. (Facultatif) Ajoutez une erreur à une span ; pour ce faire, vous pouvez loguer les informations d'erreur à l'aide des [champs de log Open Tracing standard][7] :

    ```swift
    span.log(
        fields: [
            OTLogFields.event: "error",
            OTLogFields.errorKind: "I/O Exception",
            OTLogFields.message: "File not found",
            OTLogFields.stack: "FileReader.swift:42",
        ]
    )
    ```

8. (Facultatif) Distribuez vos traces entre vos environnements (par exemple frontend/backend). Vous pouvez le faire manuellement ou en tirant parti de notre instrumentation automatique.

    * Pour propager manuellement la trace, injectez le contexte de span dans les en-têtes `URLRequest` :

    ```swift
    import Datadog

    var request: URLRequest = ... // the request to your API

    let span = Global.sharedTracer.startSpan(operationName: "network request")

    let headersWritter = HTTPHeadersWriter()
    Global.sharedTracer.inject(spanContext: span.context, writer: headersWritter)

    for (headerField, value) in headersWritter.tracePropagationHTTPHeaders {
        request.addValue(value, forHTTPHeaderField: headerField)
    }
    ```
    Des en-têtes de tracing supplémentaires seront alors définis sur votre requête, afin que votre backend puisse procéder à l'extraction et poursuivre le tracing distribué. Une fois la requête terminée, appelez `span.finish()` dans un gestionnaire d'achèvement. Si votre backend est également instrumenté avec [l'APM et le profileur en continu Datadog][8], la trace frontend/backend complète s'affiche dans le dashboard Datadog.

    * Pour que le SDK trace automatiquement toutes les requêtes réseau vers des hosts donnés, spécifiez le tableau `tracedHosts` lors de l'initialisation de Datadog :

    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
            .set(tracedHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```
    Vous pourrez ainsi tracer toutes les requêtes acheminées vers `example.com` et `api.yourdomain.com` (par exemple, `https://api.yourdomain.com/v2/users` ou `https://subdomain.example.com/image.png`).

    **Remarque** : l'instrumentation automatique prend uniquement en charge les requêtes effectuées avec `URLSession.dataTask(request:completionHandler:)` et `URLSession.dataTask(url:completionHandler:)`. Elle utilise le swizzling `URLSession`. Ce swizzling est entièrement facultatif : si vous spécifiez pas `tracedHosts`, aucun swizzling n'est appliqué.


## Collecte groupée de spans

Toutes les spans sont d'abord stockées sur l'appareil local sous forme groupée. Chaque groupe de spans respecte les spécifications d'admission. Les groupes de spans sont envoyés périodiquement si le réseau est disponible et si la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de spans est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/fr/tracing/visualization/#spans
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[6]: https://opentracing.io
[7]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[8]: https://docs.datadoghq.com/fr/tracing/