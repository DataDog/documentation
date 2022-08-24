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
Envoyez des [traces][1] à Datadog à partir de vos applications iOS avec la [bibliothèque de tracing côté client `dd-sdk-ios` de Datadog][2]. Vous pourrez notamment :

* Créer des [spans][3] personnalisées pour diverses opérations dans votre application
* Envoyer des logs pour chaque span individuellement
* Utiliser des attributs par défaut et ajouter des attributs personnalisés à chaque span
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

1. Déclarez la bibliothèque en tant que dépendance en fonction de votre gestionnaire de paquets :

{{< tabs >}}
{{< tab "CocoaPods" >}}

Vous pouvez utiliser [CocoaPods][4] pour installer `dd-sdk-ios` :
```
pod 'DatadogSDK'
```

[4]: https://cocoapods.org/

{{< /tab >}}
{{< tab "Swift Package Manager (SPM)" >}}

Pour réaliser l'intégration grâce au Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

{{< /tab >}}
{{< tab "Carthage" >}}

Vous pouvez utiliser [Carthage][5] pour installer `dd-sdk-ios` :
```
github "DataDog/dd-sdk-ios"
```

[5]: https://github.com/Carthage/Carthage

{{< /tab >}}
{{< /tabs >}}

2. Initialisez la bibliothèque avec le contexte de votre application et votre [token client Datadog][6]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][7] pour configurer la bibliothèque `dd-sdk-ios`, car elles risqueraient d'être exposées côté client dans le bytecode de l'IPA de l'application iOS. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][6].

{{< site-region region="us" >}}
{{< tabs >}}
{{< tab "Swift" >}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<jeton_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .build()
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                              environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{< /tab >}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .build()
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                              environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{< /tab >}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .build()
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                              environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{< /tab >}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .build()
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                              environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{< /tab >}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .build()
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                              environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{< /tab >}}
{{< /tabs >}}
{{< /site-region >}}

Pour répondre aux exigences du RGPD, le SDK nécessite la valeur `trackingConsent` à son initialisation.

`trackingConsent` peut prendre l'une des valeurs suivantes :

- `.pending` :   le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à Datadog. Il attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
- `.granted` : le SDK commence à recueillir les données et les envoie à Datadog.
- `.notGranted` : le SDK ne recueille aucune donnée. Aucun log, aucun événement ni aucune trace n'est envoyé à Datadog.

Pour modifier la valeur du consentement au suivi une fois le SDK initialisé, utilisez l'appel d'API `Datadog.set(trackingConsent:)`.

Le comportement du SDK s'adapte à la nouvelle valeur.

 Par exemple, en cas de modification de la valeur de consentement `.pending` :

- Si la nouvelle valeur est `.granted`, le SDK envoie toutes les données actuelles et futures à Datadog.
- Si la nouvelle valeur est `.notGranted`, le SDK efface toutes les données actuelles et ne recueille pas les futures données.

Avant que les données ne soient importées dans Datadog, elles sont stockées en clair dans le répertoire cache (`Library/Caches`) du [sandbox de votre application][11]. Aucune autre application installée sur l'appareil ne peut lire ces données.

Lors de la création de votre application, activez les logs de développement pour afficher dans la console tous les messages internes du SDK dont la priorité est supérieure ou égale au niveau spécifié.

{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.verbosityLevel = .debug
```
{{< /tab >}}
{{< tab "Objective-C" >}}
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{< /tab >}}
{{< /tabs >}}

3. Le traceur Datadog utilise la [norme OpenTracing][8]. Configurez et enregistrez le `Tracer` globalement via le `Global.sharedTracer` d'OpenTracing. Vous ne devez effectuer cette opération qu'une seule fois, généralement dans votre code `AppDelegate` :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
Global.sharedTracer = Tracer.initialize(
    configuration: Tracer.Configuration(
        sendNetworkInfo: true
    )
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDTracerConfiguration *configuration = [[DDTracerConfiguration alloc] init];
[configuration sendNetworkInfo:YES];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:configuration];
```
{{< /tab >}}
{{< /tabs >}}

4. Instrumentez votre code à l'aide des méthodes suivantes :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "<nom_span>")
// tâche à mesurer…
// … puis, une fois l'opération terminée :
span.finish()
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
id<SpanOT> span = [DDGlobal.sharedTracer startSpan:@"<nom_span>"];
// tâche à mesurer…
// … puis, une fois l'opération terminée :
[span finish];
```
{{< /tab >}}
{{< /tabs >}}

5. (Facultatif) Définissez la relation enfant-parent entre vos spans :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
let responseDecodingSpan = Global.sharedTracer.startSpan(
    operationName: "décodage de la réponse",
    childOf: networkRequestSpan.context // définir la span en tant qu'enfant de `networkRequestSpan`
)
// …décoder les données de la réponse HTTP…
responseDecodingSpan.finish()
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
id<SpanOT> responseDecodingSpan = [DDGlobal.sharedTracer startSpan:@"décodage de la réponse"
                                                            childOf:networkRequestSpan.context];
// … décoder les données de la réponse HTTP…
[responseDecodingSpan finish];
```
{{< /tab >}}
{{< /tabs >}}

6. (Facultatif) Fournissez des tags supplémentaires avec votre span :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
span.setTag(key: "http.url", value: url)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
[span setTag:@"http.url" value:url];
```
{{< /tab >}}
{{< /tabs >}}

7. (Facultatif) Ajoutez une erreur à une span ; pour ce faire, vous pouvez loguer les informations d'erreur à l'aide des [champs de log Open Tracing standard][9] :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
span.log(
    fields: [
        OTLogFields.event: "Erreur",
        OTLogFields.errorKind: "Exception E/S",
        OTLogFields.message: "Fichier introuvable",
        OTLogFields.stack: "FileReader.swift:42",
    ]
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
[span log:@{
    @"event": @"Erreur",
    @"error.kind": @"Exception E/S",
    @"message": @"Fichier introuvable",
    @"stack": @"FileReader.swift:42",
}];
```
{{< /tab >}}
{{< /tabs >}}

8. (Facultatif) Distribuez vos traces entre vos environnements (par exemple frontend/backend). Vous pouvez le faire manuellement ou en tirant parti de notre instrumentation automatique.

* Pour propager manuellement la trace, injectez le contexte de span dans les en-têtes `URLRequest` :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
var request: URLRequest = ... // la requête vers votre API

let span = Global.sharedTracer.startSpan(operationName: "requête réseau")

let headersWriter = HTTPHeadersWriter()
Global.sharedTracer.inject(spanContext: span.context, writer: headersWriter)

for (headerField, value) in headersWriter.tracePropagationHTTPHeaders {
    request.addValue(value, forHTTPHeaderField: headerField)
}
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
id<SpanOT> span = [DDGlobal.sharedTracer startSpan:@"requête réseau"];
DDHTTPHeadersWriter *headersWriter = [[DDHTTPHeadersWriter alloc] init];

NSError *error = nil;
[DDGlobal.sharedTracer inject:span.context
                        format:OT.formatTextMap
                        carrier:headersWriter
                        error:&error];

for (NSString *key in headersWriter.tracePropagationHTTPHeaders) {
    NSString *value = headersWriter.tracePropagationHTTPHeaders[key];
    [request addValue:value forHTTPHeaderField:key];
}
```
{{< /tab >}}
{{< /tabs >}}

Des en-têtes de tracing supplémentaires sont définis sur votre requête, afin que votre backend puisse procéder à l'extraction et poursuivre le tracing distribué. Une fois la requête terminée, appelez `span.finish()` dans un gestionnaire de complétion. Si votre backend est également instrumenté avec [APM et le tracing distribué de Datadog][10], la trace frontend/backend complète est accessible depuis le dashboard Datadog.

* Pour que le SDK trace automatiquement toutes les requêtes réseau vers des hosts donnés, spécifiez le tableau `firstPartyHosts` lors de l'initialisation de Datadog et utilisez le paramètre `DDURLSessionDelegate` en tant que délégué de l'instance `URLSession` à surveiller :

{{< tabs >}}
{{< tab "Swift" >}}
```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<token_client>", environment: "<nom_environnement>")
        .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .build()
)

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{< /tab >}}
{{< tab "Objective-C" >}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<token_client>"
                                                                environment:@"<nom_environnement>"];

[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com", @"api.yourdomain.com"]]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                        configuration:[builder build]];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                        delegate:[[DDNSURLSessionDelegate alloc] init]
                                                    delegateQueue:nil];
```
{{< /tab >}}
{{< /tabs >}}

Vous pouvez ainsi tracer toutes les requêtes effectuées avec cette `session` et transmises à `example.com` et `api.yourdomain.com` (par exemple, `https://api.yourdomain.com/v2/users` ou `https://subdomain.example.com/image.png`).

**Remarque** : l'instrumentation automatique du tracing utilise le swizzling `URLSession`. Ce sizzling est entièrement facultatif : si vous ne spécifiez pas de `firstPartyHosts`, il n'est pas appliqué.


## Collecte groupée de spans

Toutes les spans sont d'abord stockées sur l'appareil local sous forme groupée. Chaque groupe de spans respecte les spécifications d'admission. Les groupes de spans sont envoyés périodiquement si le réseau est disponible et si la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de spans est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/fr/tracing/visualization/#spans
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[8]: https://opentracing.io
[9]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[10]: https://docs.datadoghq.com/fr/tracing/
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web