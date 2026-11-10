---
code_lang: ios
code_lang_weight: 20
description: Activez le signalement complet des crashs et le Error Tracking pour les
  applications iOS afin de surveiller et de résoudre les problèmes grâce à des rapports
  détaillés.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-watchos-visionos-datadog-rum/
  tag: Blog
  text: Surveillez les applications watchOS et visionOS avec Datadog RUM
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Code source
  text: Code source de dd-sdk-ios
title: Rapports d'incidents et Error Tracking pour iOS
type: multi-code-lang
---
## Présentation {#overview}

Activez le signalement des crashs et Error Tracking iOS pour obtenir des rapports détaillés sur les crashs et des tendances des erreurs. Avec cette fonctionnalité, vous pouvez accéder à :

 - Tableaux de bord et attributs agrégés des plantages iOS
 - Rapports de plantages iOS symbolisés
 - Analyse des tendances avec Error Tracking iOS

Pour symboliser vos traces de pile, recherchez et téléchargez vos fichiers `.dSYM` vers Datadog. Ensuite, vérifiez votre configuration en exécutant un plantage de test et en redémarrant votre application.

Vos rapports de plantage apparaissent dans [{{< ui >}}Error Tracking{{< /ui >}}][1].

## Compatibilité {#compatibility}

Consultez les [Versions prises en charge][15] pour obtenir une liste des versions de systèmes d'exploitation et des plateformes compatibles avec le SDK iOS.

## Configuration {#setup}

Pour commencer à envoyer des données Error Tracking depuis votre application iOS ou tvOS vers Datadog :

### Étape 1 - Déclarez le SDK iOS comme dépendance {#step-1-declare-the-ios-sdk-as-a-dependency}

Déclarez la bibliothèque iOS comme dépendance en fonction de votre gestionnaire de paquets. Datadog recommande d'utiliser Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Pour effectuer l'intégration à l'aide de Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

Dans votre projet, associez les bibliothèques suivantes :

```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

Vous pouvez utiliser [CocoaPods][1] pour installer `dd-sdk-ios` :

```
pod 'DatadogCore'
pod 'DatadogRUM'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

Vous pouvez utiliser [Carthage][1] pour installer `dd-sdk-ios` :

```
github "DataDog/dd-sdk-ios"
```

**Remarque** : Datadog ne fournit pas de binaires Carthage préconstruits. Cela signifie que Carthage compile le SDK à partir de la source.
Pour compiler et intégrer le SDK, exécutez :

```
carthage bootstrap --use-xcframeworks --no-use-binaries
```

Après la compilation, ajoutez les XCFrameworks suivants à votre projet Xcode (dans la section « Frameworks, Libraries, and Embedded Content ») :

```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Étape 2 - Spécifiez les détails de l'application dans l'interface utilisateur {#step-2-specify-application-details-in-the-ui}

1. Accédez à {{< ui >}}Error Tracking{{< /ui >}} > [{{< ui >}}Settings{{< /ui >}}][2] > {{< ui >}}Browser and Mobile{{< /ui >}}.
2. Cliquez sur {{< ui >}}New Application{{< /ui >}}.
3. Saisissez un nom d'application et sélectionnez {{< ui >}}iOS{{< /ui >}} comme type d'application.
4. Cliquez sur {{< ui >}}Create Application{{< /ui >}} pour générer un ID d'application Datadog et un jeton client uniques.

### Étape 3 - Initialisez la bibliothèque {#step-3-initialize-the-library}

#### Mettez à jour l'extrait d'initialisation {#update-the-initialization-snippet}

Dans l'extrait d'initialisation, définissez un nom d'environnement et un nom de service.

Pour garantir la sécurité de vos données, vous devez utiliser un jeton client. Si vous utilisiez uniquement des [clés Datadog API][5] pour configurer la bibliothèque `dd-sdk-ios`, elles seraient exposées côté client dans le bytecode de l'application iOS.

Pour plus d'informations sur la configuration d'un jeton client, consultez la [documentation sur les jetons clients][6].

Le SDK doit être initialisé le plus tôt possible dans le cycle de vie de l'application, spécifiquement dans le rappel `application(_:didFinishLaunchingWithOptions:)` de `AppDelegate`. Cela garantit que toutes les mesures, y compris la durée de démarrage de l'application, sont capturées correctement. Pour les applications créées avec SwiftUI, vous pouvez utiliser `@UIApplicationDelegateAdaptor` pour vous connecter au `AppDelegate`.

<div class="alert alert-warning">L'initialisation du SDK ailleurs (par exemple, plus tard lors du chargement de la vue) peut entraîner des données de télémétrie inexactes ou manquantes, en particulier concernant les performances au démarrage de l'application.</div>

Pour plus d'informations, consultez [Utilisation des tags][7].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

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
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
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
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
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
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
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
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us2_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us2_fed];

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
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap2,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap2];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="uk1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .uk1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite uk1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

#### Instrumentez vos webviews (facultatif) {#instrument-your-webviews-optional}

Ajoutez le module DatadogWebViewTracking en utilisant votre gestionnaire de dépendances préféré.

Pour suivre les erreurs et les problèmes de performance dans le contenu web, activez le suivi webview pour vos instances WKWebView. Cela vous permet de surveiller les erreurs JavaScript, les requêtes réseau et les interactions utilisateur qui se produisent dans les pages web intégrées, vous offrant une visibilité complète sur les composants web de votre application hybride.

Spécifiez les hôtes à suivre en fournissant une liste de domaines. Seul le contenu web provenant des hôtes spécifiés est surveillé et signalé à Datadog.

```swift
import DatadogWebViewTracking

let webview = WKWebView(...)

// start tracking webviews
WebViewTracking.enable(webView: webview, hosts: ["foo.bar"])

//stop tracking webviews (after the user stops navigating the web page)
WebViewTracking.disable(webView: webview)
```

Pour plus d'informations, consultez [Web View Tracking][3].

### Étape 4 - Ajouter le signalement des crashs {#step-4-add-crash-reporting}

Le signalement des crashs capture les crashs fatals lorsque votre application se termine de manière inattendue, en plus des erreurs qu'Error Tracking affiche dans une interface unifiée.

Pour activer le signalement des crashs, ajoutez le package selon votre gestionnaire de dépendances et mettez à jour votre extrait d'initialisation.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Pour effectuer l'intégration à l'aide de Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

Dans votre projet, associez les bibliothèques suivantes :

```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

Vous pouvez utiliser [CocoaPods][1] pour installer `dd-sdk-ios` :

```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

Vous pouvez utiliser [Carthage][1] pour installer `dd-sdk-ios` :

```
github "DataDog/dd-sdk-ios"
```

Dans Xcode, associez les frameworks suivants :

```
DatadogCrashReporting.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

Modifiez votre extrait d'initialisation en ajoutant les rapports de crash :

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

### Étape 5 - Ajouter le signalement des blocages d'application {#step-5-add-app-hang-reporting}

Les blocages d'application sont un type d'erreur spécifique à iOS qui survient lorsque l'application ne répond pas pendant trop longtemps. Les blocages d'application sont signalés via le SDK iOS (et non via [Logs][10]). Par défaut, le signalement des blocages d'application est **désactivé**, mais vous pouvez l'activer et définir votre propre seuil pour surveiller les blocages d'application qui durent plus longtemps qu'une durée que vous pouvez spécifier dans le paramètre d'initialisation `appHangThreshold`. Une fois activée, toute pause du thread principal supérieure à la valeur `appHangThreshold` spécifiée est considérée comme un « blocage » dans [{{< ui >}}Error Tracking{{< /ui >}}][1]. Un seuil personnalisable vous permet de trouver le juste équilibre entre une observabilité précise et une observabilité bruyante. Consultez [Configurer le seuil de blocage d'application](#configure-app-hang-threshold) pour plus de conseils sur la définition de cette valeur.

Il existe deux types de blocages :

- **Blocage d'application fatal** : Comment un blocage est signalé s'il n'est jamais récupéré et que l'application est terminée. Les blocages d'application fatals sont marqués comme un « Crash » dans Error Tracking et RUM Explorer.

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang-1.png" alt="Un blocage d'application fatal dans le panneau latéral Erreur." style="width:100%;" >}}

- **Blocage d'application non fatal** : Comment un blocage est signalé si l'application se remet d'un blocage relativement court et continue de s'exécuter. Les blocages d'application non fatals ne portent pas de marque « Crash » dans Error Tracking et RUM Explorer.

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang-1.png" alt="Un blocage d'application non fatal dans le panneau latéral Erreur." style="width:100%;" >}}

{{% collapse-content title="Activer la surveillance des blocages d'application" level="h4" expanded=false id="enable-app-hang-monitoring" %}}

Pour activer la surveillance des blocages d'application :

1. [Activez le rapport de crash](#step-4---add-crash-reporting).

2. Mettez à jour l'extrait d'initialisation avec le paramètre `appHangThreshold` défini sur la durée minimale pour laquelle vous souhaitez que les blocages d'application soient signalés, en secondes. Par exemple, utilisez `0.25` pour signaler les blocages durant au moins 250 ms :

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

   Consultez [Configurer le seuil de blocage d'application](#configure-app-hang-threshold) pour plus de conseils sur la définition de cette valeur.

   Assurez-vous de suivre les étapes ci-dessous pour obtenir des [traces de pile désobfusquées](#step-6---get-deobfuscated-stack-traces), qui transforment les adresses mémoire cryptiques en noms de fonctions et numéros de ligne lisibles pour un débogage efficace.

{{% /collapse-content %}}

{{% collapse-content title="Configurer le seuil de blocage d'application" level="h4" expanded=false id="configure-app-hang-threshold" %}}

Choisissez la valeur de seuil appropriée en fonction de vos besoins de surveillance :

- **Pour le développement et le débogage :**
  - Commencez avec `appHangThreshold: 0.25` secondes (250 ms) pour détecter la plupart des problèmes de performance
  - Ajustez progressivement (à la hausse ou à la baisse) pour trouver la configuration adaptée à vos besoins spécifiques
- **Pour la surveillance en production :**
  - Définissez `appHangThreshold` entre `2.0` et `3.0` secondes pour filtrer les blocages non significatifs et vous concentrer sur les problèmes de performance importants.
  - Cela correspond aux attentes en matière d'expérience utilisateur, où les blocages de moins de 2 secondes sont moins perceptibles

#### Limites de seuil {#threshold-limits}
- Minimum : `0.1` secondes (100 ms) - cependant, définir le seuil à des valeurs aussi faibles peut entraîner un signalement excessif des blocages d’application
- Plage recommandée : `0.25` à `3.0` secondes
- Le SDK utilise une tolérance de 2,5 % pour réduire l'utilisation du processeur, ce qui signifie que certains blocages qui durent près de `appHangThreshold` peuvent ne pas être signalés

##### Exemple de configuration {#configuration-example}

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 2.0  // Report hangs lasting 2+ seconds
    )
)
```

{{% /collapse-content %}}

{{% collapse-content title="Désactiver la surveillance des blocages d'application" level="h4" expanded=false id="set-tracking-consent" %}}

Pour désactiver la surveillance des blocages d'application, mettez à jour l'extrait d'initialisation et définissez le paramètre `appHangThreshold` sur `nil`.

{{% /collapse-content %}}

### Étape 6 – Obtenir les traces de pile déobfusquées {#step-6-get-deobfuscated-stack-traces}

Les rapports de plantage sont collectés dans un format brut et contiennent principalement des adresses mémoire. Pour mapper ces adresses en informations de symboles lisibles (un processus appelé symbolication), Datadog nécessite des fichiers `.dSYM`, qui sont générés lors du processus de build ou de distribution de votre application.

**Remarque :** Error Tracking prend en charge la symbolication des fichiers de symboles système pour l'architecture iOS v14+ arm64 et arm64e. Les fichiers `.dSYM` sont limités en taille à **2 Go** chacun.

Pour vous aider à déboguer les erreurs, Datadog utilise un identifiant de build généré unique pour déobfusquer les traces de pile, en les faisant correspondre à leurs fichiers de mappage correspondants. Ce processus se produit indépendamment du fait que les fichiers de mappage aient été téléchargés lors des builds de pré-production ou de production, garantissant que les informations correctes sont disponibles pour des processus d'assurance qualité efficaces lors de l'examen des plantages et des erreurs dans Datadog.

Pour les applications iOS, la correspondance entre les traces de pile et les fichiers de symboles repose sur leur champ `uuid`.

{{% collapse-content title="Trouvez vos fichiers .dSYM" level="h4" expanded=false id="find-your-dsym-files" %}}

Chaque application iOS produit des fichiers `.dSYM` pour chaque module d'application. Ces fichiers minimisent la taille binaire d'une application et permettent une vitesse de téléchargement plus rapide. Chaque version d'application contient un ensemble de fichiers `.dSYM`.

Selon votre configuration, vous devrez peut-être télécharger des fichiers `.dSYM` depuis App Store Connect ou les trouver sur votre machine locale.

| Bitcode activé | Description |
|---|---|
| Oui, les fichiers | `.dSYM` sont disponibles une fois que [App Store Connect][12] a terminé le traitement du build de votre application. |
| Non | Xcode exporte `.dSYM` des fichiers vers `$DWARF_DSYM_FOLDER_PATH` à la fin du build de votre application. Assurez-vous que le paramètre de build `DEBUG_INFORMATION_FORMAT` est défini sur {{< ui >}}DWARF with dSYM File{{< /ui >}}. Par défaut, les projets Xcode définissent uniquement `DEBUG_INFORMATION_FORMAT` sur {{< ui >}}DWARF with dSYM File{{< /ui >}} pour la configuration de projet Release. |

{{% /collapse-content %}}

{{% collapse-content title="Téléchargez vos fichiers .dSYM" level="h4" expanded=false id="upload-your-dsym-files" %}}

En téléchargeant vos fichiers `.dSYM` vers Datadog, vous accédez au chemin de fichier et au numéro de ligne de chaque frame dans la trace de pile associée à une erreur.

Une fois que votre application plante et que vous la redémarrez, le SDK iOS téléverse un rapport de plantage vers Datadog.

**Remarque** : Le re-téléversement d'un fichier `.dSYM` avec la même version d'application ne remplace pas celui existant.

{{< tabs >}}
{{% tab "Datadog CI" %}}

Vous pouvez utiliser l'outil de ligne de commande [@datadog/datadog-ci][1] pour téléverser vos fichiers `.dSYM` :

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**Remarque** : Pour configurer l'outil en utilisant l'endpoint UE, définissez la variable d'environnement `DATADOG_SITE` sur `datadoghq.eu`. Pour remplacer l'URL complète de l'endpoint d'ingestion, définissez la variable d'environnement `DATADOG_DSYM_INTAKE_URL`.

  Par exemple, pour configurer différents sites Datadog :

  ```sh
  # For EU endpoint
  export DATADOG_SITE="datadoghq.eu"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip

  # For custom intake URL
  export DATADOG_DSYM_INTAKE_URL="https://your-custom-endpoint.com"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip
  ```

[1]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{% tab "Fastlane" %}}

Le plugin Fastlane vous aide à téléverser des fichiers `.dSYM` vers Datadog depuis votre configuration Fastlane.

1. Ajoutez [`fastlane-plugin-datadog`][1] à votre projet.

   ```sh
   fastlane add_plugin datadog
   ```

2. Configurez Fastlane pour téléverser vos symboles.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

Pour plus d'informations, consultez [`fastlane-plugin-datadog`][1].

[1]: https://github.com/DataDog/datadog-fastlane-plugin

{{% /tab %}}
{{% tab "GitHub Actions" %}}

L'action GitHub [Datadog Upload dSYMs GitHub Action][1] vous permet de téléverser vos symboles dans vos jobs GitHub Action :

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

Pour plus d'informations, consultez [dSYMs commands][2].

[1]: https://github.com/marketplace/actions/datadog-upload-dsyms
[2]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/dsyms/README.md

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Testez votre implémentation {#test-your-implementation}

Pour vérifier votre configuration de rapport de crash et de Error Tracking iOS, provoquez un plantage dans votre application et confirmez que l'erreur apparaît dans Datadog.

1. Exécutez votre application sur un simulateur iOS ou sur un appareil réel. Assurez-vous que le débogueur n'est pas attaché. Sinon, Xcode capture le plantage avant que le SDK iOS ne le fasse.
2. Exécutez le code contenant le plantage :

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. Une fois le plantage survenu, redémarrez votre application et attendez que le SDK iOS téléverse le rapport de plantage dans [{{< ui >}}Error Tracking{{< /ui >}}][1].

## Fonctionnalités avancées d'Error Tracking {#advanced-error-tracking-features}

{{% collapse-content title="Activer le consentement au suivi (conformité au RGPD)" level="h3" expanded=false id="set-tracking-consent" %}}

Pour être conforme au règlement RGPD, le SDK iOS nécessite la valeur de consentement de suivi lors de l'initialisation.

Le paramètre `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.pending` : Le SDK iOS commence à collecter et à regrouper les données, mais ne les envoie pas à Datadog. Le SDK iOS attend la nouvelle valeur de consentement de suivi pour déterminer quoi faire des données regroupées.
2. `.granted` : Le SDK iOS commence à collecter les données et les envoie à Datadog.
3. `.notGranted` : Le SDK iOS ne collecte aucune donnée et n'envoie ni logs, ni traces, ni événements à Datadog.

Pour **modifier la valeur de consentement de suivi** après l'initialisation du SDK iOS, utilisez l'appel d'API `Datadog.set(trackingConsent:)`. Le SDK iOS modifie son comportement en fonction de la nouvelle valeur.

Par exemple, si le consentement de suivi actuel est `.pending` :

- Si vous modifiez la valeur pour `.granted`, le SDK iOS envoie toutes les données actuelles et futures à Datadog.
- Si vous modifiez la valeur pour `.notGranted`, le SDK iOS efface toutes les données actuelles et ne collecte pas les données futures.

{{% /collapse-content %}}

{{% collapse-content title="Taux de session d'échantillonnage" level="h3" expanded=false id="sample-session-rates" %}}

Pour contrôler les données que votre application envoie à Datadog, vous pouvez spécifier un taux d'échantillonnage pour les sessions lors de [l'initialisation du SDK iOS][14]. Le taux est un pourcentage compris entre 0 et 100. Par défaut, `sessionSamplingRate` est défini sur 100 (conserver toutes les sessions).

Par exemple, pour ne conserver que 50 % des sessions, utilisez :

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Envoyer des données lorsque l'appareil est hors ligne" level="h3" expanded=false id="sending-data-device-offline" %}}

Le SDK iOS garantit que les données restent disponibles lorsque l'appareil d'un utilisateur final est hors ligne. Dans les zones à faible réseau, ou lorsque la batterie de l'appareil est trop faible, l'appareil stocke d'abord tous les événements par lots. Il les envoie dès que le réseau est disponible et que la batterie est suffisamment chargée pour garantir que le SDK iOS n'impacte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible pendant que votre application est au premier plan, ou si un téléversement de données échoue, l'appareil conserve le lot jusqu'à ce qu'il puisse réaliser un téléversement réussi.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : Pour garantir que le SDK iOS n'utilise pas trop d'espace disque, l'appareil supprime automatiquement les données sur le disque si elles deviennent trop anciennes.

{{% /collapse-content %}}

{{% collapse-content title="Ajouter le rapport des terminaisons par le watchdog" level="h3" expanded=false id="add-watchdog-terminations-reporting" %}}

Dans l'écosystème Apple, le système d'exploitation utilise un mécanisme appelé watchdog pour contrôler l'état des applications et les termine si elles ne répondent plus ou consomment des ressources excessives comme le processeur et la mémoire. Ces terminaisons par le watchdog sont fatales et irrécupérables (plus de détails dans la [documentation Apple][13] officielle).

Par défaut, le rapport des terminaisons par le watchdog est **désactivé**, mais vous pouvez l'activer en utilisant le paramètre d'initialisation `trackWatchdogTerminations`.

Lorsqu'il est activé, l'application signale une terminaison par le watchdog et se rattache à la session utilisateur précédente au prochain lancement de l'application, si toutes les conditions suivantes sont remplies :

- L'application n'a pas été mise à jour entre-temps,

- Et elle n'a appelé ni `exit`, ni `abort`,

- Et elle n'a pas planté, que ce soit à cause d'une exception ou d'un [gel fatal de l'application](#step-5---add-app-hang-reporting),

- Et elle n'a pas été forcée de quitter par l'utilisateur,

- Et l'appareil n'a pas redémarré (ce qui inclut les mises à jour du système d'exploitation).

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination-1.png" alt="Une terminaison par le watchdog dans le panneau latéral d'Error Tracking." style="width:100%;" >}}

#### Activer le rapport des terminaisons par le watchdog {#enable-watchdog-terminations-reporting}

Pour activer le rapport des terminaisons par le watchdog :

1. [Activez le rapport de crash](#step-4---add-crash-reporting).

2. Mettez à jour l'extrait d'initialisation avec le flag `trackWatchdogTerminations` :

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### Désactivez le rapport des terminaisons par le watchdog {#disable-watchdog-terminations-reporting}

Pour désactiver le rapport des terminaisons par le watchdog, mettez à jour l'extrait d'initialisation et réglez le paramètre `trackWatchdogTerminations` sur `false`.

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/client
[3]: /fr/real_user_monitoring/ios/web_view_tracking/
[4]: /fr/real_user_monitoring/ios/data_collected/
[5]: /fr/account_management/api-app-keys/#api-keys
[6]: /fr/account_management/api-app-keys/#client-tokens
[7]: /fr/getting_started/tagging/using_tags/#rum--session-replay
[8]: /fr/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[9]: /fr/real_user_monitoring/explorer/
[10]: /fr/logs/log_collection/ios
[12]: https://appstoreconnect.apple.com/
[13]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[14]: https://github.com/DataDog/dd-sdk-ios
[15]: /fr/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/