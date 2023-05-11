---
description: Découvrez comment utiliser un module React Native côté client pour interagir
  avec Appcenter Codepush et Datadog.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Code source dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentation
  text: En savoir plus sur la surveillance React Native
kind: documentation
title: CodePush
---
## Présentation

Activez les rapports de crash et le suivi des erreurs pour React Native afin d'accéder à des rapports de crash complets et à des tendances sur les erreurs via la solution Real User Monitoring..

Chaque fois que vous publiez une nouvelle version de [CodePush][1] pour votre application React Native, vous devez importer les source maps sur Datadog afin de déminifier les erreurs.

Datadog vous conseille d'utiliser `@datadog/mobile-react-native-code-push` dans votre app et la commande [datadog-ci][3] `react-native codepush` pour importer vos source maps. De cette façon, la `version` indiquée sera identique dans les rapports de crash et dans les source maps importées.

## Implémentation

Consultez les [instructions d'installation de la page Surveillance React Native][2] pour installer `@datadog/mobile-react-native`.

Ensuite, installez `@datadog/mobile-react-native-code-push`.

Pour effectuer l'installation avec NPM, exécutez :

```sh
npm install @datadog/mobile-react-native-code-push
```

Pour effectuer l'installation avec Yarn, exécutez :

```sh
yarn add @datadog/mobile-react-native-code-push
```

### Initialisation avec DdSdkReactNative.initialize

Remplacez `DdSdkReactNative.initialize` par `DatadogCodepush.initialize` dans votre code :

```js
import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';

const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // effectuer le suivi des interactions utilisateur (comme des sélections de boutons). Vous pouvez utiliser la propriété de l'élément 'accessibilityLabel' pour nommer l'action de toucher. Sinon, le type de l'élément est transmis.
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
);

await DatadogCodepush.initialize(config);
```

### Initialisation avec DatadogProvider

Remplacez `DatadogProvider` par `DatadogCodepushProvider` dans votre composant App :

```js
import { DatadogCodepushProvider } from '@datadog/mobile-react-native-code-push';

export default function App() {
    return (
        <DatadogCodepushProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogCodepushProvider>
    );
}
```

Étant donné que l'obtention de la version de CodePush est une étape asynchrone qui doit être effectuée avant d'initialiser le SDK React Native Datadog pour RUM, il n'y a aucune différence entre `InitializationMode.SYNC` et `InitializationMode.ASYNC` lors de l'utilisation de `DatadogCodepushProvider`.

## Importer des source maps CodePush

Installez [`@datadog/datadog-ci`][3] en tant que dépendance de développement pour votre projet.

Pour l'installer avec NPM :

```sh
npm install @datadog/datadog-ci --save-dev
```

Pour l'installer avec Yarn :

```sh
yarn add -D @datadog/datadog-ci
```

Créez un fichier gitignore `datadog-ci.json` à la racine de votre projet contenant votre clé API et le site Datadog (s'il ne s'agit pas de `datadoghq.com`) :

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

Vous pouvez également les exporter en tant que variables d'environnement `DATADOG_API_KEY` et `DATADOG_SITE`.

Lors de la publication d'un nouveau bundle CodePush, indiquez le répertoire dans lequel placer les source maps et le bundle :

```sh
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

Exécutez la commande `datadog-ci react-native codepush` en passant les arguments CodePush `app` et `deployment` adéquats.

Pour l'exécuter avec NPM :

```sh
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

Pour l'exécuter avec Yarn :

```sh
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

## Solutions alternatives

Ces étapes permettent de s'assurer que la `version` correspond au format `{commercialVersion}-codepush.{codePushLabel}`, tel que `1.2.4-codepush.v3`.

Vous pouvez également y parvenir en spécifiant un `versionSuffix` dans la configuration du SDK :

```js
const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // effectuer le suivi des interactions utilisateur (p. ex. : sélections de boutons. Vous pouvez utiliser la propriété de l'élément 'accessibilityLabel' pour nommer l'action de toucher. Sinon le type de l'élément est transmis.)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
);

config.versionSuffix = `codepush.${codepushVersion}`; // aura pour résultat "1.0.0-codepush.v2"
```

Afin d'éviter les conflits de versions potentiels, le `versionSuffix` ajoute un tiret (`-`) avant le suffixe.

Pour obtenir la `codepushVersion`, vous pouvez la coder en dur ou utiliser [`CodePush.getUpdateMetadata`][4].

Ensuite, importez vos source maps à l'aide de la commande [`datadog-ci react-native upload`][5] et assurez-vous que l'argument `--release-version` correspond à celui défini dans la configuration du SDK.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /fr/real_user_monitoring/reactnative/
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref#codepushgetupdatemetadata
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#upload