---
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/crash_reporting.md
description: Configurez le suivi des erreurs pour vos projets React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: Code source dd-sdk-ios
- link: real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Explorateur de suivi des erreurs
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: GitHub
  text: RUM permet désormais d'effectuer un suivi des erreurs et d'obtenir des rapports
    de crash pour React Native
kind: documentation
title: Rapports de crash et suivi des erreurs pour React Native
---
## Présentation

Activez les rapports de crash et le suivi des erreurs pour React Native afin d'accéder à des rapports de crash complets et à des tendances sur les erreurs grâce à la solution RUM. Cette fonctionnalité vous permet d'accéder aux ressources suivantes :

-   Des dashboards et des attributs agrégés sur les crashs pour React Native
-   Des rapports de crash (iOS ou Android natifs, et JavaScript) décodés pour React Native
-   Des analyses de tendance grâce au suivi des erreurs pour React Native

Pour décoder vos stack traces, importez manuellement vos fichiers de mappage dans Datadog.

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][1].

## Configuration

Si vous n'avez pas encore installé le SDK RUM pour React Native, consultez les [instructions de configuration intégrées à l'application][2] ou la [documentation sur la configuration de RUM pour React Native][3].

### Ajouter des rapports de crash

Modifiez votre code d'initialisation pour activer les rapports de crash JavaScript natifs :

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true,
    true,
    true // active les rapports de crash JavaScript
);
config.nativeCrashReportEnabled = true; // active les rapports de crash natifs
```

## Limites

<div class="alert alert-warning"><p>
Datadog accepte les importations de fichiers de 50 Mo maximum.
</p></div>

Pour calculer la taille de vos source maps et de votre bundle, exécutez cette commande :

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

## Décoder les rapports de crash

Pour diminuer la taille de votre application, son code est minifié lors de la phase de déploiement officiel. Pour associer les erreurs au code utilisé, vous devez importer les fichiers de décodage suivants :

-   La source map JavaScript pour votre bundle JavaScript iOS
-   La source map JavaScript pour votre bundle JavaScript Android
-   Le fichier dSYMs pour votre code iOS natif
-   Les fichiers de mappage Proguard si vous avez activé l'obfuscation du code pour votre code Android natif

Pour que votre projet envoie automatiquement les fichiers de décodage, exécutez la commande `npx datadog-react-native-wizard`.

Consultez la [documentation officielle][13] de l'assistant pour découvrir les différentes options disponibles.

## Tester votre implémentation des rapports de crash

Pour vérifier que vos source maps ont bien été envoyées et associées à votre application, vous pouvez générer des crashes à l'aide du package [`react-native-performance-limiter`][14].

Installez le package avec yarn ou npm, puis réinstallez vos pods :

```shell
yarn install react-native-performance-limiter # ou npm install react-native-performance-limiter
(cd ios && pod install)
```

Faire crasher le thread JavaScript de votre application :

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Créez un nouveau build de votre application pour envoyer les nouvelles source maps, déclenchez le crash et attendez que l'erreur apparaisse sur la page [Error Tracking][1].

Pour vérifier que vos fichiers dSYM et vos fichiers de mappage Proguard ont bien été importés, faites crasher le thread principal natif :

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## Alternatives à la commande `datadog-react-native-wizard`

En cas d'échec de la commande `datadog-react-native-wizard` ou si vous ne souhaitez pas importer automatiquement vos fichiers de décodage sur chaque version, suivez les étapes ci-dessous afin de décoder les rapports de crash.

### Importer des source maps JavaScript sur des builds iOS

Vous devez installer `@datadog/datadog-ci` en tant que dépendance de développement pour votre projet :

```bash
yarn add -D @datadog/datadog-ci

npm install --save-dev @datadog/datadog-ci
```

#### Automatiquement sur chaque build de version (React Native >= 0.69)

L'importation manuelle de vos source maps sur chaque build de version est chronophage et source d'erreurs. Datadog vous recommande d'envoyer automatiquement vos source maps chaque fois que vous exécutez un build de version.

À la racine de votre projet, créez un fichier script intitulé `datadog-sourcemaps.sh` et comportant les commandes suivantes :

```shell
#!/bin/sh
set -e

# Si le build est exécuté à partir de XCode, il n'est pas possible d'utiliser yarn.
# Vérifiez d'abord quel exécutable yarn il convient d'utiliser
package_manager_test_command="bin" # `yarn bin` et `npm bin` sont des commandes valides
test_and_set_package_manager_bin()
{
  $(echo $1 $package_manager_test_command) && export PACKAGE_MANAGER_BIN=$1
}

test_and_set_package_manager_bin "yarn" || # Remplacez yarn par npm si vous utilisez npm
test_and_set_package_manager_bin "/opt/homebrew/bin/node /opt/homebrew/bin/yarn" || # Remplacez yarn par npm si vous utilisez npm
echo "package manager not found"

REACT_NATIVE_XCODE="node_modules/react-native/scripts/react-native-xcode.sh"
DATADOG_XCODE="$(echo $PACKAGE_MANAGER_BIN) datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE $REACT_NATIVE_XCODE"
```

Ce script identifie la meilleure façon d'exécuter la commande `yarn datadog-ci react-native xcode` :

-   `yarn` peut être utilisé si vous avez recours à un outil tel que [fastlane][9] ou à un service tel que [Bitrise][10] ou [AppCenter][11] pour créer votre application.
-   `/opt/homebrew/bin/node /opt/homebrew/bin/yarn` doit être utilisé sur Mac si vous exécutez le build de version directement à partir de Xcode

Il exécute cette commande qui importe les source maps avec tous les paramètres adéquats. Pour en savoir plus, consultez la [documentation relative à datadog-ci][12].

Ouvrez votre `.xcworkspace` avec Xcode, puis sélectionnez votre projet et suivez le chemin ci-après : Build Phases > Bundle React Native code and images. Modifiez le script pour qu'il ressemble à l'exemple ci-dessous :

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# Ajoutez ces deux lignes
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=./main.jsbundle.map

# Modifiez la ligne suivante
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

Pour que l'importation ait lieu, vous devez fournir votre clé d'API Datadog. Si vous utilisez un outil de ligne de commande ou un service externe, vous pouvez la spécifier en tant que variable d'environnement via `DATADOG_API_KEY`. Si vous exécutez le build à partir de Xcode, créez à la racine de votre projet un fichier `datadog-ci.json` contenant la clé d'API :

```json
{
    "apiKey": "<VOTRE_CLÉ_API_DATADOG>"
}
```

Vous pouvez également spécifier le site Datadog (`datadoghq.eu`, par exemple) avec la variable d'environnement `DATADOG_SITE` ou avec la clé `datadogSite` dans votre fichier `datadog-ci.json`.

#### Automatiquement sur chaque build de version (React Native < 0.69)

Ouvrez votre `.xcworkspace` avec Xcode, puis sélectionnez votre projet et suivez le chemin ci-après : Build Phases > Bundle React Native code and images. Modifiez le script pour qu'il ressemble à l'exemple ci-dessous :

```shell
set -e

export NODE_BINARY=node
# Si le build est exécuté à partir de XCode, il n'est pas possible d'utiliser ${this.packageManager}.
# Il faut donc d'abord vérifier quelle commande ${this.packageManager} est valide
package_manager_test_command="bin" # `yarn bin` et `npm bin` sont des commandes valides
test_and_set_package_manager_bin()
{
  $(echo $1 $package_manager_test_command) && export PACKAGE_MANAGER_BIN=$1
}

test_and_set_package_manager_bin "yarn" || # Remplacez yarn par npm si vous utilisez npm
test_and_set_package_manager_bin "/opt/homebrew/bin/node /opt/homebrew/bin/yarn" || # Remplacez yarn par npm si vous utilisez npm
echo "package manager not found"

export SOURCEMAP_FILE=./build/main.jsbundle.map
$(echo $PACKAGE_MANAGER_BIN datadog-ci react-native xcode)
```

Ce script identifie la meilleure façon d'exécuter la commande `yarn datadog-ci react-native xcode` :

-   `yarn` peut être utilisé si vous avez recours à un outil tel que [fastlane][9] ou à un service tel que [Bitrise][10] ou [AppCenter][11] pour créer votre application.
-   `/opt/homebrew/bin/node /opt/homebrew/bin/yarn` doit être utilisé sur Mac si vous exécutez le build de version directement à partir de Xcode

Il exécute cette commande qui importe les source maps avec tous les paramètres adéquats. Pour en savoir plus, consultez la [documentation relative à datadog-ci][12].

Pour que l'importation ait lieu, vous devez fournir votre clé d'API Datadog. Si vous utilisez un outil de ligne de commande ou un service externe, vous pouvez la spécifier en tant que variable d'environnement via `DATADOG_API_KEY`. Si vous exécutez le build à partir de Xcode, créez à la racine de votre projet un fichier `datadog-ci.json` contenant la clé d'API :

```json
{
    "apiKey": "<VOTRE_CLÉ_API_DATADOG>"
}
```

Vous pouvez également spécifier le site Datadog (`datadoghq.eu`, par exemple) en tant que variable d'environnement `DATADOG_SITE` ou en tant que clé `datadogSite` dans votre fichier `datadog-ci.json`.

#### Manuellement sur chaque build

Pour générer une source map, vous devez modifier la phase de build Xcode « Bundle React Native Code and Images ».

1. Ouvrez le fichier `ios/YourAppName.xcworkspace` dans Xcode.
2. Dans le volet de gauche, sélectionnez l'icône « File », puis cliquez sur votre projet.
3. Dans le volet central, sélectionnez « Build Phases » dans la barre supérieure.

Modifiez le script en ajoutant ce qui suit après la ligne `set -e` :

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ajoutez cette ligne pour générer des source maps
# ne modifiez pas le reste du script
```

À présent, vous trouverez les source maps de votre bundle sur chaque build iOS.

Pour localiser le chemin d'accès au fichier de votre bundle depuis Xcode, affichez le navigateur de rapports sur Xcode, puis filtrez par `BUNDLE_FILE` pour trouver son emplacement.

Le fichier se trouve généralement à l'emplacement suivant : `~/Library/Developer/Xcode/DerivedData/Nomdevotreapp-trèslonghash/Build/Intermediates.noindex/ArchiveIntermediates/Nomdevotreapp/BuildProductsPath/Release-iphoneos/main.jsbundle`, `Nomdevotreapp` étant le nom de votre app, et `trèslonghash` un hash de 28 caractères.

Pour importer les source maps, exécutez ce qui suit à partir de votre projet React Native :

```bash
export DATADOG_API_KEY= # renseignez votre clé API
export SERVICE=com.myapp # remplacez par le nom de votre service
export VERSION=1.0.0 # remplacez par la version de votre app dans XCode
export BUILD=100 # remplacez par le build de votre app dans XCode
export BUNDLE_PATH= # renseignez le chemin d'accès à votre build

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

#### Manuellement sur chaque build (avec Hermes pour React Native < 0.71)

Jusqu'à la version 0.71 de React Native, il existe un bug qui génère une source map incorrecte en cas d'utilisation d'Hermes.

Pour le résoudre, vous devez ajouter d'autres lignes **à la toute fin** de la phase de build afin de générer un fichier de source map correct.

Modifiez votre phase de build comme suit :

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ajoutez cette ligne pour générer des source maps
# Pour React Native 0.70, vous devez définir USE_HERMES sur true pour que des source maps soient générées
export USE_HERMES=true

# ne modifiez pas le reste du script

# ajoutez ces lignes pour composer les source maps du packager et du compilateur au sein d'un seul et même fichier
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # Avant RN 0.70, le script était intitulé comme suit : find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

Pour importer la source map, exécutez ce qui suit à partir de la racine de votre projet React Native :

```bash
export DATADOG_API_KEY= # renseignez votre clé API
export SERVICE=com.myapp # remplacez par le nom de votre service
export VERSION=1.0.0 # remplacez par la version de votre app dans XCode
export BUILD=100 # remplacez par le build de votre app dans XCode
export BUNDLE_PATH= # renseignez le chemin d'accès à votre build

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

### Importer des source maps JavaScript sur des builds Android

#### Automatiquement sur chaque build de version (React Native >= 0.71)

Dans votre fichier `android/app/build.gradle`, ajoutez ce qui suit après la ligne `apply plugin: "com.facebook.react"` :

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

Pour que l'importation ait lieu, vous devez fournir votre clé d'API Datadog. Vous pouvez la spécifier en tant que variable d'environnement via `DATADOG_API_KEY` ou créer à la racine de votre projet un fichier `datadog-ci.json` contenant la clé d'API :

```json
{
    "apiKey": "<VOTRE_CLÉ_API_DATADOG>"
}
```

Vous pouvez également spécifier le site Datadog (`datadoghq.eu`, par exemple) en tant que variable d'environnement `DATADOG_SITE` ou en tant que clé `datadogSite` dans votre fichier `datadog-ci.json`.

#### Automatiquement sur chaque build de version (React Native < 0.71)

Dans votre fichier `android/app/build.gradle`, ajoutez ce qui suit après la ligne `apply from: "../../node_modules/react-native/react.gradle"` :

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

Pour que l'importation ait lieu, vous devez fournir votre clé d'API Datadog. Vous pouvez la spécifier en tant que variable d'environnement via `DATADOG_API_KEY` ou créer à la racine de votre projet un fichier `datadog-ci.json` contenant la clé d'API :

```json
{
    "apiKey": "<VOTRE_CLÉ_API_DATADOG>"
}
```

Vous pouvez également spécifier le site Datadog (`datadoghq.eu`, par exemple) en tant que variable d'environnement `DATADOG_SITE` ou en tant que clé `datadogSite` dans votre fichier `datadog-ci.json`

#### Manuellement sur chaque build

Sur Android, le fichier de source map est situé à l'emplacement suivant : `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map`. L'emplacement du fichier bundle dépend de vos versions de React Native (RN) et d'Android Gradle Plugin (AGP) :

-   RN >= 0.71 et AGP >= 7.4.0 : `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN >= 0.71 et AGP < 7.4.0 : `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN < 0.71 : `android/app/build/generated/assets/react/release/index.android.bundle`

La version d'Android Gradle Plugin est indiquée dans le fichier `android/build.gradle`, sous `com.android.tools.build:gradle`. Par exemple : `classpath("com.android.tools.build:gradle:7.3.1")`.

Si votre application dispose de variantes plus complètes, remplacez `release` par le nom de votre variante dans les chemins d'accès. Si vous avez spécifié un `bundleAssetName` dans votre configuration React dans `android/app/build.gradle`, remplacez `index.android.bundle` par sa valeur.

Une fois que vous avez exécuté votre build, importez votre source map en exécutant ce qui suit à partir de la racine de votre projet React Native :

```bash
export DATADOG_API_KEY= # renseignez votre clé d'API
export SERVICE=com.myapp # remplacez par le nom de votre service
export VERSION=1.0.0 # remplacez par la propriété versionName de android/app/build.gradle
export BUILD=100 # remplacez par la propriété versionCode de android/app/build.gradle
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

### Importer des fichiers dSYM pour iOS

#### Manuellement sur chaque build

Pour en savoir plus, consultez la [documentation relative aux rapports de crash et suivi des erreurs pour iOS][4].

### Importer des fichiers de mappage Proguard pour Android

Commencez par vous assurer que la minimisation Proguard est activée sur votre projet. Par défaut, elle n'est pas activée sur les projets React Native.

Pour en savoir plus, consultez la [documentation relative à Proguard pour React Native][5].

En cas de doute, vérifiez si la commande `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` renvoie quelque chose. Si c'est le cas, la minimisation est activée.

#### Manuellement sur chaque build

Dans votre fichier `android/app/build.gradle`, ajoutez le plug-in et configurez-le **tout en haut du fichier** :

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "1.5.1"
}

datadog {
    checkProjectDependencies = "none" // systématiquement requis pour les projets React Native
}
```

Pour que l'importation ait lieu, vous devez fournir votre clé d'API Datadog. Vous pouvez la spécifier en tant que variable d'environnement via `DATADOG_API_KEY` ou créer à la racine de votre projet un fichier `datadog-ci.json` contenant la clé d'API :

```json
{
    "apiKey": "<VOTRE_CLÉ_API_DATADOG>"
}
```

Vous pouvez également spécifier le site Datadog (`datadoghq.eu`, par exemple) en tant que variable d'environnement `DATADOG_SITE` ou en tant que clé `datadogSite` dans votre fichier `datadog-ci.json`.
Pour en savoir plus, consultez la section [Plug-in Gradle pour le SDK Datadog pour Android][6].

Pour exécuter le plug-in après un build, exécutez `(cd android && ./gradlew app:uploadMappingRelease)`.

#### Automatiser l'importation sur chaque build

Installez le plug-in comme indiqué à l'étape précédente.

Trouvez la boucle sur `applicationVariants` dans le fichier `android/app/build.gradle`. Elle doit ressembler à ceci : `applicationVariants.all { variant ->`.

Ajoutez l'extrait de code suivant dans la boucle :

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

### Vérifier les rapports de crash

Pour vérifier la configuration des fonctionnalités de rapport de crash et de suivi des erreurs pour React Native, installez un package tel que [`react-native-crash-tester`][7] afin de faire délibérément planter votre application côté natif ou JavaScript.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/reactnative/
[4]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/datadog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter