---
aliases:
- /fr/real_user_monitoring/ios/getting_started
beta: true
description: Recueillez des données RUM depuis vos applications iOS et tvOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: Code source de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: Apprendre à explorer vos données RUM
- link: /real_user_monitoring/error_tracking/ios/
  tag: Documentation
  text: Apprendre à suivre les erreurs iOS
- link: /real_user_monitoring/ios/swiftui/
  tag: Documentation
  text: En savoir plus sur l'instrumentation des applications SwiftUI
kind: documentation
title: Surveillance iOS et tvOS avec RUM
---

## Présentation

La solution Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Implémentation

1. Déclarez le SDK en tant que dépendance.
2. Ajoutez les détails de l'application dans l'interface utilisateur.
3. Initialisez la bibliothèque.
4. Initialisez le monitor RUM, `DatadogURLSessionDelegate`, pour commencer à envoyer des données.

**Remarque** : la version 11 et les versions ultérieures du SDK iOS Datadog sont prises en charge. Le SDK iOS Datadog prend également en charge tvOS.

### Déclarer le SDK en tant que dépendance

Déclarez la bibliothèque en tant que dépendance en fonction de votre gestionnaire de packages :

{{< tabs >}}
{{% tab "CocoaPods" %}}

Vous pouvez utiliser [CocoaPods][4] pour installer `dd-sdk-ios` :
```
pod 'DatadogCore'
pod 'DatadogRUM'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Pour réaliser l'intégration grâce au Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

Dans votre projet, associez les bibliothèques suivantes :
```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "Carthage" %}}

Vous pouvez utiliser [Carthage][5] pour installer `dd-sdk-ios` :
```
github "DataDog/dd-sdk-ios"
```

Dans Xcode, associez les frameworks suivants :
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Ajouter les détails de l'application dans l'interface utilisateur

1. Accédez à [**UX Monitoring** > **RUM Applications** > **New Application**][5].
2. Sélectionnez le type d'application `iOS` et attribuez un nom à l'application, afin de générer un ID d'application Datadog unique ainsi qu'un token client.
3. Pour instrumenter vos vues Web, cliquez sur le bouton **Instrument your webviews**. Pour en savoir plus, consultez la section [Suivi des vues Web iOS][12].
4. Pour désactiver la collecte automatique des IP client ou des données de géolocalisation, décochez les cases correspondant à ces paramètres. Pour en savoir plus, consultez la section [Données RUM recueillies (iOS)][14].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Créer une application RUM application pour iOS dans Datadog" style="width:100%;border:none" >}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][6] pour configurer la bibliothèque `dd-sdk-ios`, ces clés seront exposées côté client dans le bytecode de l'application iOS.

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][7].

### Initialiser la bibliothèque

Dans l'extrait d'initialisation, définissez un nom d'environnement, un nom de service et un numéro de version. Dans les exemples ci-dessous, `app-name` spécifie la variante de l'application qui génère des données.

Pour en savoir plus, consultez la section [Utiliser les tags][11].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    service: "<nom du service>"
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    site: .eu1,
    service: "<nom du service>"
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    site: .us3,
    service: "<nom du service>"
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    site: .us5,
    service: "<nom du service>"    
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    site: .us1_fed,
    service: "<nom du service>"
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    site: .ap1,
    service: "<nom du service>"
  ), 
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.service = @"<nom du service>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
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
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<ID d'application RUM>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<ID d'application RUM>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{% /tabs %}}

Pour surveiller les requêtes envoyées par l'instance `URLSession` en tant que ressources, assignez `DDURLSessionDelegate()` en tant que `delegate` de la `URLSession` en question :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DatadogURLSessionDelegate(),
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
## Effectuer le suivi d'événements en arrière-plan

<div class="alert alert-info"><p>Le suivi d'événements en arrière-plan peut générer des sessions supplémentaires et augmenter vos coûts. Si vous avez la moindre question, <a href="https://docs.datadoghq.com/help/">contactez l'assistance Datadog.</a></p>
</div>

Vous pouvez effectuer le suivi d'événements, tels que les crashs et les requêtes réseau, pendant que votre application s'exécute en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Suivi des erreurs iOS

[Les rapports de crash et le suivi des erreurs pour iOS][13] mettent en évidence les problèmes au sein de votre application et les dernières erreurs disponibles. Vous pouvez visualiser les détails des erreurs ainsi que les attributs, y compris le JSON, dans le [RUM Explorer][10]. 

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
[13]: https://docs.datadoghq.com/fr/real_user_monitoring/error_tracking/ios/
[14]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/data_collected/