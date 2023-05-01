---
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/crash_reporting.md
---
## Présentation

Activez les rapports de crash et le suivi des erreurs pour iOS afin d'accéder à des rapports de crash complets et à des tendances sur les erreurs grâce à la solution RUM. Cette fonctionnalité vous permet d'accéder aux ressources suivantes :

 - Des dashboards et des attributs agrégés sur les crashs iOS
 - Des rapports de crash iOS décodés
 - Des analyses de tendance grâce au suivi des erreurs iOS

Afin de décoder vos stack traces, recherchez vos fichiers .dSYM et importez-les dans Datadog. Vérifiez ensuite votre configuration en exécutant un crash test et en redémarrant votre application.

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][8].

## Configuration

Si vous n'avez pas encore configuré le SDK iOS, consultez les [instructions de configuration intégrées à l'application][1] ou la [documentation sur la configuration du RUM sur iOS][2].

### Ajouter des rapports de crash

Ajoutez le package en fonction de votre gestionnaire de dépendances et mettez à jour votre extrait d'initialisation.

{{< tabs >}}
{{% tab "CocoaPods" %}}
Ajoutez `DatadogSDKCrashReporting` à votre `Podfile` :
```ruby
platform :ios, '11.0'
use_frameworks!

target 'App' do
  pod 'DatadogSDKCrashReporting'
end
```
{{% /tab %}}
{{% tab "Swift Package Manager" %}}
Ajoutez le package à l'emplacement `https://github.com/DataDog/dd-sdk-ios` et liez `DatadogCrashReporting` à la cible de votre application.

**Remarque :** remplacez votre liaison vers `Datadog` ou la bibliothèque `DatadogStatic` par une liaison vers `DatadogCrashReporting`.

{{% /tab %}}
{{% tab "Carthage" %}}
Ajoutez `github "DataDog/dd-sdk-ios"` à votre `Cartfile` et liez `DatadogCrashReporting.xcframework` à la cible de votre application.
{{% /tab %}}
{{< /tabs >}}

Modifiez votre extrait d'initialisation afin d'inclure la fonctionnalité de rapport de crash :

```
import DatadogCrashReporting

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
    .builderUsing(
        rumApplicationID: "<id_application_RUM>",
        clientToken: "<token_client>",
        environment: "<nom_environnement>"
    )
    .trackUIKitActions()
    .trackUIKitRUMViews()
    .enableCrashReporting(using: DDCrashReportingPlugin())
    .build()
)
Global.rum = RUMMonitor.initialize()
```

## Décoder des rapports de crash

Les rapports de crash sont recueillis dans un format brut et contiennent principalement des adresses mémoire. Pour convertir ces adresses en informations symboliques lisibles, Datadog utilise des fichiers .dSYM qui sont générés lors du processus de build ou de distribution de votre application.

### Rechercher votre fichier dSYM

Chaque application iOS génère des fichiers .dSYM pour chaque module. Ces fichiers minimisent la taille du binaire d'une application afin d'accélérer son téléchargement. Chaque version de l'application contient un ensemble de fichiers .dSYM.

Selon votre configuration, vous devrez peut-être télécharger des fichiers .dSYM depuis l'App Store Connect ou les rechercher sur votre machine locale.

| Bitcode activé | Description                                                                                                                                                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Oui             | Les fichiers dSYM sont disponibles une fois que l'[App Store Connect][6] a créé votre application.                                                                                                                                                                                                    |
| Non              | Xcode exporte les fichiers .dSYM vers `$DWARF_DSYM_FOLDER_PATH` après le build de votre application. Assurez-vous que le paramètre de build `DEBUG_INFORMATION_FORMAT` est défini sur **DWARF with dSYM File**. Par défaut, les projets Xcode définissent uniquement `DEBUG_INFORMATION_FORMAT` sur **DWARF with dSYM File** pour la configuration du projet de mise en production. |

### Importer votre fichier dSYM

Lorsque vous importez votre fichier .dSYM dans Datadog, vous pouvez accéder au chemin ainsi qu'au numéro de ligne de chaque cadre dans la stack trace associée à une erreur.

Lorsque vous redémarrez votre application après un crash, le SDK iOS importe un rapport de crash dans Datadog.

#### Datadog CI

Vous pouvez utiliser l'outil de ligne de commande [@datadog/datadog-ci][5] pour importer votre fichier dSYM :

```sh
export DATADOG_API_KEY="<CLÉ_API>"

// Si vos fichiers dSYM se trouvent dans un zip
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// Si vos fichiers dSYM se trouvent dans un dossier
npx @datadog/datadog-ci dsyms upload /chemin/vers/appDsyms/
```

**Remarque** : pour configurer cet outil à l'aide de l'endpoint européen, définissez la variable d'environnement `DATADOG_SITE` sur `datadoghq.eu`. Pour ignorer l'URL complète du endpoint d'admission, définissez la variable `DATADOG_DSYM_INTAKE_URL`.

Si vous utilisez Fastlane ou GitHub Actions dans vos workflows, vous pouvez également tirer parti de ces intégrations au lieu de `datadog-ci` :

#### Plug-in Fastlane

Le plug-in Datadog facilite l'importation de fichiers dSYM dans Datadog depuis votre configuration Fastlane.

1. Ajoutez [`fastlane-plugin-datadog`][3] à votre projet.

   ```sh
   fastlane add_plugin datadog
   ```

2. Configurez Fastlane afin d'importer vos symboles.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

Pour en savoir plus, consultez le référentiel [`fastlane-plugin-datadog`][3].

#### Action GitHub

L'[action GitHub Datadog Upload dSYMs][4] vous permet d'importer vos symboles dans les tâches de vos actions GitHub :

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
            chemin/vers/dossier/dsyms
            chemin/vers/zip/dsyms.zip
```

Pour en savoir plus, consultez la section [Commandes dSYM][7] (en anglais).

## Vérifier les rapports de crash

Pour vérifier la configuration des fonctionnalités de rapport de crash et de suivi des erreurs pour iOS, générez un crash dans votre application RUM et confirmez que l'erreur s'affiche dans Datadog.

1. Exécutez votre application sur un simulateur iOS ou un véritable appareil. Assurez-vous que l'outil de debugging n'est pas connecté, sans quoi Xcode capture le crash avant le SDK iOS.
2. Exécutez le code contenant le crash suivant :

   ```swift
   func didTapButton() {
   fatalError(“Crash the app”)
   }
   ```

3. Après le crash, redémarrez votre application et patientez le temps que le SDK iOS importe le rapport de crash dans l'interface [**Error Tracking**][8].

**Remarque :** RUM prend en charge le décodage des fichiers de symboles système pour les architectures arm64 et arm64e (iOS 14 et ultérieur).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/ios
[3]: https://github.com/DataDog/datadog-fastlane-plugin
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://appstoreconnect.apple.com/
[7]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[8]: https://app.datadoghq.com/rum/error-tracking