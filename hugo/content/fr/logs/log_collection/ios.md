---
description: Recueillez des logs à partir de vos applications iOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: Code source dd-sdk-ios
- link: logs/explorer
  tag: Documentation
  text: Apprendre à explorer vos logs
title: Collecte de logs iOS
---
## Présentation

Envoyez des logs à Datadog à partir de vos applications iOS avec la [bibliothèque de logging côté client `dd-sdk-ios` de Datadog][1]. Vous pourrez notamment :

* Envoyer des logs vers Datadog au format JSON en natif
* Utiliser des attributs par défaut et ajouter des attributs personnalisés à chaque log envoyé
* Enregistrer les adresses IP et user agents réels du client
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

La bibliothèque `dd-sdk-ios` prend en charge toutes les versions d'iOS à partir de la version 11.

## Implémentation

1. Déclarez la bibliothèque en tant que dépendance en fonction de votre gestionnaire de packages :

   {{< tabs >}}
   {{% tab "CocoaPods" %}}

   Vous pouvez utiliser [CocoaPods][6] pour installer `dd-sdk-ios` :
   ```
   pod 'DatadogSDK'
   ```

   [6]: https://cocoapods.org/

   {{% /tab %}}
   {{% tab "Swift Package Manager (SPM)" %}}

   Pour réaliser l'intégration grâce au Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :
   ```swift
   .package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
   ```

   {{% /tab %}}
   {{% tab "Carthage" %}}

   Vous pouvez utiliser [Carthage][7] pour installer `dd-sdk-ios` :
   ```
   github "DataDog/dd-sdk-ios"
   ```

   [7]: https://github.com/Carthage/Carthage

   {{% /tab %}}
   {{< /tabs >}}

2. Initialisez la bibliothèque avec le contexte de votre application et votre [token client Datadog][2]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][3] pour configurer la bibliothèque `dd-sdk-ios`, car elles risqueraient d'être exposées côté client dans le bytecode de l'IPA de l'application iOS. 

   Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][2].

   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Swift" %}}
   ```swift
   Datadog.initialize(
       appContext: .init(),
       trackingConsent: trackingConsent,
       configuration: Datadog.Configuration
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .us1)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint us1]];

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
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .eu1)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint eu1]];

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
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .us3)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint us3]];

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
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .us5)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint us5]];

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
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .us1_fed)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint us1_fed]];

   [DDDatadog initializeWithAppContext:[DDAppContext new]
                       trackingConsent:trackingConsent
                       configuration:[builder build]];
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   {{< tabs >}}
   {{% tab "Swift" %}}

   ```swift
   Datadog.initialize(
       appContext: .init(),
       trackingConsent: trackingConsent,
       configuration: Datadog.Configuration
           .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
           .set(serviceName: "app-name")
           .set(endpoint: .ap1)
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                               environment:@"<environment_name>"];
   [builder setWithServiceName:@"app-name"];
   [builder setWithEndpoint:[DDEndpoint ap1]];

   [DDDatadog initializeWithAppContext:[DDAppContext new]
                       trackingConsent:trackingConsent
                       configuration:[builder build]];
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   Pour répondre aux exigences du RGPD, le SDK nécessite la valeur `trackingConsent` à son initialisation.
   Voici les différentes valeurs possibles pour `trackingConsent` :

   - `.pending` : le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à Datadog. Il attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
   - `.granted` : le SDK commence à recueillir les données et les envoie à Datadog.
   - `.notGranted` : le SDK ne recueille aucune donnée. Les logs, traces et événements RUM ne sont pas envoyés à Datadog.

   Pour modifier la valeur du consentement au suivi une fois le SDK initialisé, utilisez l'appel d'API `Datadog.set(trackingConsent:)`.

   Le SDK ajuste son comportement en fonction de la nouvelle valeur. Imaginons qu'elle est actuellement définie sur `.pending` :

   - Si la nouvelle valeur est `.granted`, le SDK enverra toutes les données actuelles et futures à Datadog.
   - Si la nouvelle valeur est `.notGranted`, le SDK effacera toutes les données actuelles et ne recueillera pas les futures données.

   Avant que les données ne soient transmises à Datadog, elles sont stockées en clair dans le répertoire cache (`Library/Caches`) du [sandbox de votre application][6]. Aucune autre application installée sur l'appareil ne peut lire ces données.

   Lors de la création de votre application, activez les logs de développement pour afficher dans la console tous les messages internes du SDK dont la priorité est supérieure ou égale au niveau spécifié.

   {{< tabs >}}
   {{% tab "Swift" %}}
   ```swift
   Datadog.verbosityLevel = .debug
   ```
   {{% /tab %}}
   {{% tab "Objective-C" %}}
   ```objective-c
   DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
   ```
   {{% /tab %}}
   {{< /tabs >}}

3. Configurez le `Logger` :

    {{< tabs >}}
    {{% tab "Swift" %}}
    ```swift
    let logger = Logger.builder
        .sendNetworkInfo(true)
        .printLogsToConsole(true, usingFormat: .shortWith(prefix: "[iOS App] "))
        .set(datadogReportingThreshold: .info)
        .build()
    ```
    {{% /tab %}}
    {{% tab "Objective-C" %}}
    ```objective-c
    DDLoggerBuilder *builder = [DDLogger builder];
    [builder sendNetworkInfo:YES];
    [builder setWithDatadogReportingThreshold:.info];
    [builder printLogsToConsole:YES];

    DDLogger *logger = [builder build];
    ```
    {{% /tab %}}
    {{< /tabs >}}

4. Envoyez une entrée de log personnalisée directement à Datadog en utilisant l'une des méthodes suivantes :

    {{< tabs >}}
    {{% tab "Swift" %}}
    ```swift
    logger.debug("A debug message.")
    logger.info("Some relevant information?")
    logger.notice("Have you noticed?")
    logger.warn("An important warning...")
    logger.error("An error was met!")
    logger.critical("Something critical happened!")
    ```
    {{% /tab %}}
    {{% tab "Objective-C" %}}
    ```objective-c
    [logger debug:@"A debug message."];
    [logger info:@"Some relevant information?"];
    [logger notice:@"Have you noticed?"];
    [logger warn:@"An important warning..."];
    [logger error:@"An error was met!"];
    [logger critical:@"Something critical happened!"];
    ```
    {{% /tab %}}
    {{< /tabs >}}

5. (Facultatif) Fournissez une map d'`attributes` avec votre message de log pour ajouter des attributs au log envoyé. Chaque entrée de la map est ajoutée en tant qu'attribut.

    {{< tabs >}}
    {{% tab "Swift" %}}
    ```swift
    logger.info("Clicked OK", attributes: ["context": "onboarding flow"])
    ```
    {{% /tab %}}
    {{% tab "Objective-C" %}}
    ```objective-c
    [logger info:@"Clicked OK" attributes:@{@"context": @"onboarding flow"}];
    ```
    {{% /tab %}}
    {{< /tabs >}}

## Logging avancé

### Initialisation

Les méthodes suivantes dans `Logger.Builder` peuvent être utilisées lors de l'initialisation du logger afin d'envoyer des logs à Datadog :

| Méthode                           | Description                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sendNetworkInfo(true)`    | Ajouter des attributs `network.client.*` à tous les logs. Les données loguées par défaut sont les suivantes : `reachability` (`yes`, `no`, `maybe`), `available_interfaces` (`wifi`, `cellular`, etc.), `sim_carrier.name` (par exemple `AT&T - US`), `sim_carrier.technology` (`3G`, `LTE`, etc.) et `sim_carrier.iso_country` (par exemple `US`). |
| `set(serviceName: "<NOM_SERVICE>")` | Définir `<NOM_SERVICE>` en tant que valeur pour l'[attribut standard][4] `service` joint à tous les logs envoyés à Datadog.                                                                                                                        |
| `printLogsToConsole(true)`     | Définir ce paramètre sur `true` pour envoyer les logs à la console de debugging.                                                                                                                                                                                         |
| `sendLogsToDatadog(true)`    | Définir ce paramètre sur `true` pour envoyer les logs à Datadog.                                                                                                                                                                                              |
| `set(loggerName: "<NOM_LOGGER>")`   | Définir `<NOM_LOGGER>` en tant que valeur pour l'attribut `logger.name` joint à tous les logs envoyés à Datadog.                                                                                                                                   |
| `build()`                        | Créer une instance de logger avec toutes les options définies.                                                                                                                                                                                   |

### Configuration globale

Suivez les méthodes ci-dessous pour ajouter ou supprimer les tags et les attributs de tous les logs envoyés par un logger donné.

#### Tags globaux

##### Ajouter des tags

Utilisez la méthode `addTag(withKey:value:)` pour ajouter des tags à tous les logs envoyés par un logger spécifique :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Ajouter un tag build_configuration:debug
logger.addTag(withKey: "build_configuration", value: "debug")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addTagWithKey:@"build_configuration" value:@"debug"];
```
{{% /tab %}}
{{< /tabs >}}

`<VALEUR_TAG>` doit être une `chaîne`.

##### Supprimer des tags

Utilisez la méthode `removeTag(withKey:)` pour supprimer des tags de tous les logs envoyés par un logger spécifique :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Supprimer tous les tags commençant par build_configuration
logger.removeTag(withKey: "build_configuration")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeTagWithKey:@"build_configuration"];
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Débuter avec les tags][5].

#### Attributs globaux

##### Ajouter des attributs

Par défaut, les attributs suivants sont ajoutés à tous les logs envoyés par un logger :

* `http.useragent` et ses propriétés extraites `device` et `OS`
* `network.client.ip` et ses propriétés géographiques extraites (`country`, `city`)
* `logger.version`, la version du SDK Datadog
* `logger.thread_name`, (`main`, `background`)
* `version`, la version de l'application du client extraite de `Info.plist`
* `environment`, le nom de l'environnement utilisé pour initialiser le SDK

Utilisez la méthode `addAttribute(forKey:value:)` pour ajouter un attribut personnalisé à tous les logs envoyés par un logger spécifique :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Ajouter un attribut device-model avec une valeur sous forme de chaîne
logger.addAttribute(forKey: "device-model", value: UIDevice.current.model)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addAttributeForKey:@"device-model" value:UIDevice.currentDevice.model];
```
{{% /tab %}}
{{< /tabs >}}

`<VALEUR_ATTRIBUT>` peut être n'importe quelle valeur de type `encodable` (`chaîne`, `date`, modèle de données `codable` personnalisé, etc.)

##### Supprimer des attributs

Utilisez la méthode `removeAttribute(forKey:)` pour supprimer un attribut personnalisé de tous les logs envoyés par un logger spécifique :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Supprimer l'attribut "device-model" de tous les prochains logs envoyés.
logger.removeAttribute(forKey: "device-model")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeAttributeForKey:@"device-model"];
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/logs/processing/attributes_naming_convention/
[5]: /fr/getting_started/tagging/
[6]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web