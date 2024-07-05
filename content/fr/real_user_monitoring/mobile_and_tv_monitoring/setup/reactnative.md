---
aliases:
- /fr/real_user_monitoring/react-native/
- /fr/real_user_monitoring/reactnative/
code_lang: reactnative
code_lang_weight: 40
description: Recueillez des données RUM depuis vos projets React Native.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentation
  text: Configuration avancée du RUM pour React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Code source de dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Surveiller des applications React Native
- link: network_monitoring/performance/guide/
  tag: Documentation
  text: Apprendre à explorer vos données RUM
title: Configuration de la surveillance RUM pour React Native
type: multi-code-lang
---
## Présentation

Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

Le SDK RUM pour React Native prend en charge la version 0.63.4 et les versions ultérieures de React Native. La compatibilité avec les versions antérieures n'est pas garantie, et nécessite potentiellement des ajustements.

Le SDK RUM pour React Native prend en charge [Expo][12]. Pour en savoir plus, consultez la [documentation relative à Expo][13].

## Implémentation

Pour effectuer l'installation avec NPM, exécutez :

```sh
npm install @datadog/mobile-react-native
```

Pour effectuer l'installation avec Yarn, exécutez :

```sh
yarn add @datadog/mobile-react-native
```

### iOS

Installez le pod ajouté :

```sh
(cd ios && pod install)
```

### Android

Si votre version de React Native est supérieure à la version 0.67, assurez-vous d'utiliser la version 17 de Java. Si votre version de React Native est égale ou inférieure à la version 0.67, assurez-vous d'utiliser la version 11 de Java.

Dans votre fichier `android/build.gradle`, spécifiez la `kotlinVersion` pour éviter les conflits entre les dépendances kotlin :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Dans le cadre de la configuration de l'application Android, le SDK React Native Datadog nécessite `compileSdkVersion = 31` ou une version ultérieure, ce qui implique que vous devez utiliser la version 31 ou une version ultérieure de Build Tools, la version 7 d'Android Gradle Plugin, ainsi que la version 7 de Gradle ou une version ultérieure. Pour modifier les versions, modifiez les valeurs dans le bloc `buildscript.ext` du fichier `build.gradle` de niveau supérieur de votre application. Datadog recommande d'utiliser la version activement prise en charge de React Native.

### Ajouter les détails de l'application dans l'interface utilisateur

1. Dans l'[application Datadog][1], accédez à **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choisissez `react-native` comme type d'application.
3. Indiquez le nom de votre application pour générer un ID d'application Datadog et un token client uniques.
4. Pour désactiver la collecte automatique des IP client ou des données de géolocalisation, décochez les cases correspondant à ces paramètres.

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Créer une application RUM pour React Native dans Datadog" style="width:90%;">}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `@datadog/mobile-react-native`, ces clés seront exposées côté client dans le code de l'application React Native.

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][4].

### Initialiser la bibliothèque avec le contexte de l'application

{{< site-region region="us" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés).
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.site = 'US1';
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true;
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sessionSamplingRate = 80;
// Facultatif : effectuer un échantillonnage des intégrations de tracing pour les appels réseau entre votre application et votre backend (ici, 80 % des appels vers votre backend instrumenté sont liés à la vue APM à partir de la vue RUM. Valeur par défaut : 20 %)
// Vous devez spécifier les hosts de vos backends pour activer le tracing avec ces backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // englobe 'example.com' et les sous-domaines, comme 'api.example.com'
// Facultatif : définir le nom du service indiqué (Valeur par défaut : nom du package / bundleIdentifier de votre application Android / iOS, respectivement)
config.serviceName = 'com.example.reactnative';
// Facultatif : permettre au SDK d'afficher les logs internes (événements supérieurs ou égaux au niveau indiqué). Valeur par défaut = non définie (aucun log)
config.verbosity = SdkVerbosity.WARN;

// Incorporer le contenu du composant App dans un composant DatadogProvider, de manière à lui transmettre votre configuration :

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Une fois le SDK React Native Datadog pour RUM initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés).
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.site = 'US3';
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true;
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sessionSamplingRate = 80;
// Facultatif : effectuer un échantillonnage des intégrations de tracing pour les appels réseau entre votre application et votre backend (ici, 80 % des appels vers votre backend instrumenté sont liés à la vue APM à partir de la vue RUM. Valeur par défaut : 20 %)
// Vous devez spécifier les hosts de vos backends pour activer le tracing avec ces backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // englobe 'example.com' et les sous-domaines, comme 'api.example.com'

await DdSdkReactNative.initialize(config);

// Une fois le SDK React Native Datadog pour RUM initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés).
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.site = 'US5';
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true;
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sessionSamplingRate = 80;
// Facultatif : effectuer un échantillonnage des intégrations de tracing pour les appels réseau entre votre application et votre backend (ici, 80 % des appels vers votre backend instrumenté sont liés à la vue APM à partir de la vue RUM. Valeur par défaut : 20 %)
// Vous devez spécifier les hosts de vos backends pour activer le tracing avec ces backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // englobe 'example.com' et les sous-domaines, comme 'api.example.com'

await DdSdkReactNative.initialize(config);

// Une fois le SDK React Native Datadog pour RUM initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés).
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.site = 'EU1';
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true;
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sessionSamplingRate = 80;
// Facultatif : effectuer un échantillonnage des intégrations de tracing pour les appels réseau entre votre application et votre backend (ici, 80 % des appels vers votre backend instrumenté sont liés à la vue APM à partir de la vue RUM. Valeur par défaut : 20 %)
// Vous devez spécifier les hosts de vos backends pour activer le tracing avec ces backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // englobe 'example.com' et les sous-domaines, comme 'api.example.com'

await DdSdkReactNative.initialize(config);

// Une fois le SDK React Native Datadog pour RUM initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés).
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.site = 'US1_FED';
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true;
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sessionSamplingRate = 80;
// Facultatif : effectuer un échantillonnage des intégrations de tracing pour les appels réseau entre votre application et votre backend (ici, 80 % des appels vers votre backend instrumenté sont liés à la vue APM à partir de la vue RUM. Valeur par défaut : 20 %)
// Vous devez spécifier les hosts de vos backends pour activer le tracing avec ces backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // englobe 'example.com' et les sous-domaines, comme 'api.example.com'

await DdSdkReactNative.initialize(config);

// Une fois le SDK React Native Datadog pour RUM initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM
```

{{< /site-region >}}

### Remplacer la version transmise

Par défaut, le SDK React Native Datadog spécifie comme `version` la version commerciale de votre app (« 1.2.44 », par exemple).

Si vous utilisez un fournisseur de mises à jour OTA (Over The Air) tel que CodePush de Microsoft, vous pouvez remplacer cette version par celle de votre code JavaScript  en cours d'exécution.

Datadog recommande d'apposer un `versionSuffix` à l'objet `DdSdkReactNativeConfiguration` :

```js
const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true,
    true,
    true
);

config.versionSuffix = 'codepush.3';
```

Si « 1.2.44 » est la version commerciale de votre app, cette version sera indiquée sous la forme « 1.2.44-codepush.3 » dans Datadog. Un tiret (`-`) est ajouté automatiquement entre la version et le suffixe.

Vous pouvez également remplacer complètement la version en spécifiant le champ `version`. Toutefois, assurez-vous de le spécifier correctement, car la version doit correspondre à celle spécifiée pendant l'importation de vos source maps et autres fichiers de mappage.

Pour en savoir plus sur les limitations du champ version, consultez la [documentation relative aux tags][15].

### Suivi des interactions utilisateur

Si le suivi des interactions utilisateur est activé, comme dans l'exemple de code ci-dessus, le SDK React Native Datadog accède à la hiérarchie des composants (à commencer par le composant qui a fait l'objet de l'action de toucher) et recherche la propriété `dd-action-name`. Une fois cette propriété trouvée, elle sert à nommer l'action recueillie.

Vous avez également la possibilité d'utiliser la propriété de l'élément `accessibilityLabel` pour nommer l'action de toucher. Sinon, le type de l'élément est transmis. Vous pouvez consulter notre prototype d'application pour découvrir des exemples d'utilisation.

### Suivre la navigation dans les vues

React Native propose un large choix de bibliothèques pour créer une navigation d'écran. Pour cette raison, seul le suivi manuel des vues est pris en charge. Pour que les sessions RUM s'affichent dans Datadog, vous devez implémenter le suivi des vues.

Vous pouvez démarrer et arrêter manuellement une vue à l'aide des méthodes `startView()` et `stopView` suivantes.

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// Démarrer une vue avec un identifiant de vue unique, un nom de vue personnalisé et un objet permettant d'ajouter des attributs supplémentaires à la vue
DdRum.startView(
    '<view-key>', // <view-key> doit être unique, par exemple ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Arrêter la vue démarrée précédemment avec le même identifiant unique de vue et un objet permettant d'ajouter des attributs supplémentaires à la vue
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Si vous utilisez l'une des bibliothèques suivantes, tirez parti des intégrations Datadog pour effectuer automatiquement le suivi des vues :

-   Si vous utilisez la bibliothèque [`react-native-navigation`][5], ajoutez le package `@datadog/mobile-react-native-navigation` et suivez les [instructions de configuration][6].
-   Si vous utilisez la bibliothèque [`react-navigation`][7], ajoutez le package `@datadog/mobile-react-navigation` et suivez les [instructions de configuration][8].

Si vous rencontrez des problèmes lors de la configuration du suivi des vues avec `@datadog/mobile-react-navigation`, vous pouvez consulter notre [exemple d'application][16] à titre de référence.

## Suivre des attributs personnalisés

Vous pouvez associer des informations utilisateur à chaque événement RUM pour obtenir des informations plus détaillées sur vos sessions RUM.

### Informations utilisateur

Pour associer des informations propres à l'utilisateur, utilisez le code suivant n'importe où dans votre application (après l'initialisation du SDK). Les attributs `id`, `name` et `email` sont intégrés dans Datadog, et vous pouvez ajouter d'autres attributs selon vos besoins.

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

Si vous souhaitez effacer les informations utilisateur (lorsque l'utilisateur se déconnecte, par exemple), transmettez un objet vide, comme suit :

```js
DdSdkReactNative.setUser({});
```

### Attributs globaux

Vous pouvez également conserver des attributs globaux pour effectuer le suivi d'informations concernant une session spécifique, telles que la configuration de test A/B, l'origine d'une campagne publicitaire ou le statut d'un panier.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## Effectuer le suivi d'événements en arrière-plan

<div class="alert alert-info"><p>Le suivi d'événements en arrière-plan peut générer des sessions supplémentaires et augmenter vos coûts. En cas de question, <a href="https://docs.datadoghq.com/help/">contactez l'assistance Datadog.</a></p>
</div>

Vous pouvez effectuer le suivi d'événements, tels que les crashs et les requêtes réseau, pendant que votre application s'exécute en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

```javascript
configuration.trackBackgroundEvents = true;
```

## Stockage des données

### Android

Avant que les données ne soient importées dans Datadog, elles sont stockées en clair dans le répertoire cache de votre application. Ce répertoire est protégé par le [sandbox d'applications Android][10]. Ainsi, sur la plupart des appareils, ces données ne peuvent pas être lues par d'autres applications. Toutefois, si l'appareil mobile est rooté ou si l'intégrité du kernel Linux a été compromise, il est possible que les données stockées soient accessibles.

### iOS

Avant que les données ne soient importées dans Datadog, elles sont stockées en clair dans le répertoire cache (`Library/Caches`) du [sandbox de votre application][11]. Aucune autre application installée sur l'appareil ne peut lire ces données.

## Mode développement

Avec le mode développement, votre application peut envoyer des événements supplémentaires associés à l'outil React Native, notamment les erreurs de transformation du code et les requêtes transmises à un serveur de développement local.

Pour éviter que ces événements s'affichent dans le dashboard, vous pouvez désactiver le suivi des erreurs et des ressources en mode développement à l'aide du flag `__DEV__` :

```js
const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    ID_APPLICATION,
    true,
    !__DEV__  /* trackResources prendra pour valeur false en mode DEV, et true dans les autres cas */,
    !__DEV__  /* trackErrors prendra pour valeur false en mode DEV, et true dans les autres cas */,
    trackingConsent
)
```

## Prise en charge de la nouvelle architecture

Les versions `>=1.8.0`. du SDK RUM pour React Native prennent en charge la [nouvelle architecture React Native][17].

La nouvelle architecture est prise en charge par la version `0.71` et les versions ultérieures de React Native.

## Dépannage

### Utilisation avec `use_frameworks!`

Si `use_frameworks!` est activé dans votre `Podfile`, l'exécution de `pod install` après avoir ajouté le SDK risque de générer une erreur comme celle qui suit :

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

Pour ne pas obtenir cette erreur, modifiez votre `Podfile` de façon à installer le pod du SDK React Native en tant que bibliothèque statique :

```ruby
static_libraries = ['DatadogSDKReactNative']

# Convertir les pods avec dépendances statiques en bibliothèques statiques en remplaçant la fonction static_framework? de façon à renvoyer true
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

**Remarque** : cette solution provient de ce post [StackOverflow][14].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: /fr/real_user_monitoring/reactnative/integrated_libraries/
[7]: https://github.com/react-navigation/react-navigation
[8]: /fr/real_user_monitoring/reactnative/integrated_libraries/
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: /fr/real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[15]: /fr/getting_started/tagging/#define-tags
[16]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[17]: https://reactnative.dev/docs/the-new-architecture/landing-page