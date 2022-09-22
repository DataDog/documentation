---
aliases:
- /fr/real_user_monitoring/ios/getting_started
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/_index.md
description: Recueillez des données RUM depuis vos applications iOS et tvOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: Code source dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: Apprendre à explorer vos données RUM
- link: /real_user_monitoring/ios/crash_reporting/
  tag: Documentation
  text: Consulter vos rapports de crash et des tendances sur les erreurs dans RUM
kind: documentation
title: Surveillance iOS et tvOS avec RUM
---
## Présentation

La solution Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Configuration

1. Déclarez le SDK en tant que dépendance.
2. Ajoutez les détails de l'application dans l'interface utilisateur.
3. Initialisez la bibliothèque.
4. Initialisez le monitor RUM et `DDURLSessionDelegate` pour commencer à envoyer des données.

**Remarque** : la version 11 et les versions ultérieures du SDK iOS Datadog sont prises en charge. Le SDK iOS Datadog prend également en charge tvOS.

### Déclarer le SDK en tant que dépendance

1. Déclarez [dd-sdk-ios][1] en tant que dépendance, en fonction de votre gestionnaire de packages.


| Gestionnaire de packages            | Méthode d'installation                                                                         |
|----------------------------|---------------------------------------------------------------------------------------------|
| [CocoaPods][2]             | `pod 'DatadogSDK'`                                                                          |
| [Swift Package Manager][3] | `.package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))` |
| [Carthage][4]              | `github "DataDog/dd-sdk-ios"`                                                               |

### Ajouter les détails de l'application dans l'interface utilisateur

1. Accédez à [**UX Monitoring** > **RUM Applications** > **New Application**][5].
2. Sélectionnez le type d'application `iOS` et attribuez un nom à l'application, afin de générer un ID d'application Datadog unique ainsi qu'un token client.
3. Pour instrumenter vos vues Web, cliquez sur le bouton **Instrument your webviews**. Pour en savoir plus, consultez la section [Suivi des vues Web iOS][12].

{{< img src="real_user_monitoring/ios/screenshot_rum.png" alt="Hiérarchie des événements RUM" style="width:100%;border:none" >}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][6] pour configurer la bibliothèque `dd-sdk-ios`, ces clés seront exposées côté client dans le bytecode de l'application iOS.

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][7].

### Initialiser la bibliothèque

Dans l'extrait d'initialisation, définissez un nom d'environnement, un nom de service et un numéro de version. Dans les exemples ci-dessous, `app-name` spécifie la variante de l'application qui génère des données.

Pour en savoir plus, consultez la section [Utiliser les tags][11].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<ID_APPLICATION_RUM>",
            clientToken: "<TOKEN_CLIENT>",
            environment: "<NOM_ENVIRONNEMENT>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<ID_APPLICATION_RUM>",
            clientToken: "<TOKEN_CLIENT>",
            environment: "<NOM_ENVIRONNEMENT>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<ID_APPLICATION_RUM>",
            clientToken: "<TOKEN_CLIENT>",
            environment: "<NOM_ENVIRONNEMENT>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<ID_APPLICATION_RUM>",
            clientToken: "<TOKEN_CLIENT>",
            environment: "<NOM_ENVIRONNEMENT>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<ID_APPLICATION_RUM>",
            clientToken: "<TOKEN_CLIENT>",
            environment: "<NOM_ENVIRONNEMENT>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Le SDK iOS RUM effectue automatiquement le suivi des sessions utilisateur, en fonction des options fournies lors de son initialisation. Pour implémenter la conformité au RGPD pour vos utilisateurs européens et appliquer d'autres [paramètres d'initialisation][9] dans la configuration du SDK, consultez la rubrique [Activer le consentement au suivi][8].

### Initialiser le monitor RUM et `DDURLSessionDelegate`

Configurez et enregistrez le monitor RUM. Cette opération, qui doit être effectuée une seule fois, s'effectue généralement dans le code `AppDelegate` de votre application :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import Datadog

Global.rum = RUMMonitor.initialize()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDGlobal.rum = [[DDRUMMonitor alloc] init];
```
{{% /tab %}}
{{< /tabs >}}

Pour surveiller les requêtes envoyées par l'instance `URLSession` en tant que ressources, assignez `DDURLSessionDelegate()` en tant que `delegate` de la `URLSession` en question :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[DDNSURLSessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

### Effectuer le suivi d'événements en arrière-plan

Vous pouvez effectuer le suivi d'événements, tels que des crashs et des requêtes réseau, pendant que votre application s'exécute en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
.trackBackgroundEvents()

```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>Le suivi d'événements en arrière-plan peut générer des sessions supplémentaires et augmenter vos coûts. Si vous avez la moindre question, <a href="https://docs.datadoghq.com/help/">contactez l'assistance Datadog.</a></p>
</div>

## Consulter les erreurs non résolues

Les rapports de crash et le suivi des erreurs pour iOS mettent en évidence les problèmes et les dernières erreurs disponibles. Vous pouvez visualiser les détails des erreurs ainsi que les attributs, y compris le JSON, dans le [RUM Explorer][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/dd-sdk-ios
[2]: https://cocoapods.org/
[3]: https://swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage
[5]: https://app.datadoghq.com/rum/application/create
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[8]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[9]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[10]: https://docs.datadoghq.com/fr/real_user_monitoring/explorer/
[11]: https://docs.datadoghq.com/fr/getting_started/tagging/using_tags/#rum--session-replay
[12]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/web_view_tracking/