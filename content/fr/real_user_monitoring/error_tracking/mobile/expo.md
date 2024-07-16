---
aliases:
- /fr/real_user_monitoring/error_tracking/expo
code_lang: expo
code_lang_weight: 30
description: Capturez les rapports de crash Expo dans Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Débugger les crashs Android plus rapidement avec Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Débugger efficacement les crashs sous iOS avec Datadog
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: En savoir plus sur le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser les données de suivi des erreurs dans le RUM Explorer
kind: documentation
title: Rapports de crash et suivi des erreurs pour Expo
type: multi-code-lang
---
## Présentation

Activez les rapports de crash et le suivi des erreurs pour Expo afin d'accéder à des rapports de crash complets et à des tendances sur les erreurs via la solution Real User Monitoring.

Cette fonctionnalité vous permet d'accéder à :

-   Des dashboards et des attributs agrégés sur les crashs Expo
-   Des rapports de crash iOS décodés et des rapports de crash Android désobfusqués
-   Des analyses de tendance grâce au suivi des erreurs pour Expo

Afin de décoder vos stack traces et de désobfusquer les crashs Android, importez votre .dSYM, vos fichiers de mappage Proguard et vos source maps dans Datadog via le plug-in de configuration `expo-datadog`.

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][1].

## Configuration

Utilisez [le package et le plug-in de configuration `expo-datadog`[2]. Pour en savoir plus, consultez la [documentation dédiée à Expo et Expo Go][3].

Ajoutez `@datadog/datadog-ci` sous forme de dépendance de développement. Ce package contient des scripts permettant d'importer les source maps. Vous pouvez l'installer avec NPM :

```sh
npm install @datadog/datadog-ci --save-dev
```

Ou avec Yarn :

```sh
yarn add -D @datadog/datadog-ci
```

Exécutez `eas secret:create` pour définir `DATADOG_API_KEY` sur votre clé d'API Datadog.

### Définir le site Datadog

Exécutez `eas secret:create` pour définir `DATADOG_SITE` sur le host de votre site Datadog, par exemple : `datadoghq.eu`. Par défaut, `datadoghq.com` est utilisé.

### Options de configuration du plug-in

| Paramètre                     | Valeur par défaut | Description                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Permet l'importation de fichiers dSYM pour le décodage des crashs iOS natifs.                                                  |
| `iosSourcemaps`               | `true`  | Permet l'importation des source maps JavaScript sur des builds iOS.                                                                     |
| `androidSourcemaps`           | `true`  | Permet l'importation des source maps JavaScript sur des builds Android.                                                                 |
| `androidProguardMappingFiles` | `true`  | Permet l'importation de fichiers de mappage Proguard afin de désobfusquer les crashs Android natifs (ce paramètre est uniquement appliqué lorsque l'obfuscation est activée). |
| `datadogGradlePluginVersion`  | `"1.+"` | Version de `dd-sdk-android-gradle-plugin` utilisée pour l'importation des fichiers de mappage Proguard.     |

## Récupérer les stack traces désobfusquées

### Ajouter les données du référentiel git à vos fichiers de mappage sur Expo Application Services (EAS)

Si vous utilisez EAS pour créer le build de votre application Expo, définissez `cli.requireCommit` sur `true` dans votre fichier `eas.json` pour ajouter les données du référentiel git à vos fichiers de mappage.

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

## Limites

{{< site-region region="us,us3,us5,eu,gov" >}}
Les source maps, fichiers de mappage et fichiers dSYM sont limités à **500** Mo chacun.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Les source maps, fichiers de mappage et fichiers dSYM sont limités à **500** Mo chacun.
{{< /site-region >}}

## Tester votre implémentation

Pour vérifier la configuration des fonctionnalités de rapport de crash et de suivi des erreurs pour Expo, générez une erreur dans votre application RUM et confirmez qu'elle s'affiche dans Datadog.

Pour tester votre implémentation :

1. Exécutez votre application sur un simulateur, un émulateur ou un véritable appareil. Si vous utilisez iOS, assurez-vous que l'outil de debugging n'est pas connecté, sans quoi Xcode capturera le crash avant le SDK Datadog.
2. Exécutez du code contenant une erreur ou un crash. Par exemple :

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. Pour les rapports d'erreur obfusqués qui ne génèrent pas de crash, vous pouvez vérifier le décodage et la désobfuscation dans la section [**Error Tracking**][1].
4. Après le crash, redémarrez votre application et patientez le temps que le SDK React Native importe le rapport de crash dans l'interface [**Error Tracking**][1].

Pour vérifier que vos source maps ont bien été envoyées et associées à votre application, vous pouvez également générer des crashs à l'aide du package [`react-native-performance-limiter`][14].

Installez le package avec yarn ou npm, puis réinstallez vos pods :

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
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
```

## Options de configuration supplémentaires

### Désactiver les importations de fichiers

Vous pouvez désactiver l'importation de certains fichiers en définissant les paramètres `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles` et `androidSourcemaps` sur `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

Si vous souhaitez désactiver **toutes les importations de fichiers**, supprimez `expo-datadog` de la liste des plug-ins.


### Utiliser Expo avec Datadog et Sentry

Les plug-ins de configuration Datadog et Sentry utilisent des expressions régulières pour modifier la phase de build « Bundle React Native Code and Images » et envoyer la source map. Cela peut faire échouer vos builds EAS avec l'erreur suivante : `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context`.

Pour utiliser les deux plug-ins, faites en sorte que le plug-in `expo-datadog` apparaisse en premier dans votre fichier `app.json` :

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

Si vous utilisez `expo-dev-client` et que vous avez déjà le plug-in `expo-datadog`, annulez ses modifications du fichier `project.pbxproj` puis ajoutez `sentry-expo` et exécutez `npx expo prebuild` avec les deux plug-ins.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/expo/#usage