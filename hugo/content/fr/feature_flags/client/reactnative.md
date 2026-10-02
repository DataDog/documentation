---
description: Configurez Datadog Feature Flags pour les applications React Native.
further_reading:
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /real_user_monitoring/application_monitoring/react_native/
  tag: Documentation
  text: Surveillance React Native
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guide
  text: Proxy du trafic du SDK Feature Flag
title: React Native Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application React Native avec le Datadog Feature Flags SDK. Les Datadog Feature Flags offrent un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Le Datadog Feature Flags SDK pour React Native est basé sur [OpenFeature][1], un standard ouvert pour la gestion des Feature Flags. Ce guide explique comment installer le SDK, configurer le fournisseur Datadog et évaluer les Feature Flags dans vos composants React Native.

## Prérequis {#requirements}

- **React Native** version 0.65 ou ultérieure
- **iOS** version 13 ou ultérieure
- **Android** niveau d'API 23 ou ultérieur
Le - **Datadog React Native SDK** (`@datadog/mobile-react-native`) doit être initialisé en premier.

## Installation {#installation}

Installez le Datadog React Native SDK, le fournisseur OpenFeature et le SDK OpenFeature React à l'aide de votre gestionnaire de paquets préféré :

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Configuration iOS {#ios-setup}

Installez le pod ajouté :

{{< code-block lang="bash" >}}
(cd ios && pod install)
{{< /code-block >}}

### Configuration Android {#android-setup}

Si vous utilisez React Native version 0.68 ou supérieure, utilisez Java 17. Si vous utilisez React Native version 0.67 ou inférieure, utilisez Java version 11.

Dans votre fichier `android/build.gradle`, spécifiez `kotlinVersion` pour éviter les conflits entre les dépendances Kotlin :

{{< code-block lang="groovy" filename="build.gradle" >}}
buildscript {
    ext {
        kotlinVersion = "1.8.21"
    }
}
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Le fournisseur Datadog OpenFeature pour React Native nécessite que le Datadog React Native SDK principal soit initialisé en premier, suivi de l'activation de Feature Flags. Pour créer un jeton client, consultez [Jetons client][2].

### Option 1 : Utilisation du composant DatadogProvider {#option-1-using-datadogprovider-component}

Si vous utilisez le composant `DatadogProvider` pour l'initialisation du SDK, activez les Feature Flags dans le rappel `onInitialized` :

```tsx
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);
config.site = '{{< region-param key="dd_site" code="true" >}}';

export default function App() {
    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();
                OpenFeature.setProvider(provider);
            }}
        >
            <OpenFeatureProvider>
                <Navigation />
            </OpenFeatureProvider>
        </DatadogProvider>
    );
}
```

### Option 2 : Utilisation de l'initialisation impérative {#option-2-using-imperative-initialization}

Si vous initialisez le SDK de manière impérative, activez les Feature Flags une fois l'initialisation terminée :

```tsx
import { DdSdkReactNative, DdFlags, CoreConfiguration } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature } from '@openfeature/react-sdk';

(async () => {
    const config = new CoreConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        '<APPLICATION_ID>'
    );
    config.site = '{{< region-param key="dd_site" code="true" >}}';

    await DdSdkReactNative.initialize(config);

    // Enable Feature Flags after core SDK initialization
    await DdFlags.enable();

    // Set the Datadog provider with OpenFeature
    const provider = new DatadogOpenFeatureProvider();
    OpenFeature.setProvider(provider);
})();
```

<div class="alert alert-info">L'envoi des données d'évaluation des Feature Flags à Datadog est automatiquement activé lors de l'utilisation du SDK Feature Flags. Fournissez <code>rumIntegrationEnabled</code> et <code>trackExposures</code> des paramètres à l' <code>DdFlags.enable()</code> appel pour configurer ce comportement.</div>

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi l'évaluation de l'indicateur s'applique en utilisant un contexte d'évaluation. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Référencez ces attributs dans vos règles de ciblage pour contrôler qui voit chaque variante.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setContext(evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">Le <code>targetingKey</code> est utilisé comme sujet de randomisation pour le ciblage basé sur le pourcentage. Lorsqu'un indicateur cible un pourcentage de sujets (par exemple, 50 %), le <code>targetingKey</code> détermine dans quel « compartiment » un utilisateur se trouve. Les utilisateurs ayant le même <code>targetingKey</code> reçoivent toujours la même variante pour un indicateur donné.</div>

## Enveloppez votre application {#wrap-your-application}

Enveloppez votre application avec le composant `OpenFeatureProvider`. Cela rend les Feature Flags disponibles pour tous les composants enfants via le contexte React.

{{< code-block lang="tsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
    return (
        <OpenFeatureProvider>
            <YourApp />
        </OpenFeatureProvider>
    );
}
{{< /code-block >}}

## Évaluer les Feature Flags {#evaluate-flags}

Le SDK OpenFeature React fournit des hooks pour évaluer les Feature Flags au sein de vos composants. Chaque hook renvoie la valeur du Feature Flag en fonction du contexte d'évaluation que vous avez configuré. L'évaluation des flags est _locale et instantanée_ : le SDK utilise des données mises en cache localement, donc aucune requête réseau n'est effectuée lors de l'évaluation des flags.

### Feature Flags booléens {#boolean-flags}

Utilisez `useBooleanFlagValue(key, defaultValue)` pour les Feature Flags qui représentent des conditions activées/désactivées ou vrai/faux :

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `useStringFlagValue(key, defaultValue)` pour les Feature Flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### Indicateurs numériques {#number-flags}

Utilisez `useNumberFlagValue(key, defaultValue)` pour les Feature Flags numériques tels que les limites, les pourcentages ou les multiplicateurs :

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Utilisez `useObjectFlagValue(key, defaultValue)` pour les données de configuration structurées :

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Prise en charge de Suspense {#suspense-support}

La prise en charge intégrée de [suspense](https://react.dev/reference/react/Suspense) vous permet d'éviter d'afficher les composants avec des indicateurs de fonctionnalité jusqu'à ce que l'initialisation du fournisseur soit terminée, ou lorsque le contexte change. Passez `{ suspend: true }` dans les options du hook pour utiliser cette fonctionnalité.

Exemple :

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du Feature Flag, utilisez les hooks de détail. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

Exemple :

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Exemple complet {#complete-example}

Voici un exemple complet montrant comment configurer et utiliser Datadog Feature Flags dans une application React Native :

```tsx
import { Suspense } from 'react';
import { View } from 'react-native';
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);

// Wrap your app with the DatadogProvider and OpenFeatureProvider.
export default function AppWithProviders() {
    // Based on your auth state.
    const user = getCurrentUser();

    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();

                const evaluationContext = {
                    targetingKey: user.id,
                    region: user.country,
                };

                OpenFeature.setProvider(provider, evaluationContext);
            }}
        >
          <Suspense fallback={<Loading />}>
            <OpenFeatureProvider suspendUntilReady>
                <App />
            </OpenFeatureProvider>
          </Suspense>
        </DatadogProvider>
    );
}

// Use feature flags in your components
function App() {
    const showNewFeature = useBooleanFlagValue('new_feature', false);

    return (
        <View>
            {showNewFeature ? <NewFeature /> : <ExistingFeature />}
        </View>
    );
}
```

## Mettre à jour le contexte d'évaluation {#update-the-evaluation-context}

Pour mettre e0 jour le contexte d'e9valuation apre8s l'initialisation (par exemple, lorsqu'un utilisateur se connecte), utilisez `OpenFeature.setContext()` :

{{< code-block lang="tsx" >}}
import { OpenFeature } from '@openfeature/react-sdk';

// When a user logs in
function onUserLogin(user) {
    OpenFeature.setContext({
        targetingKey: user.id,
        email: user.email,
        plan: user.plan,
    });
}
{{< /code-block >}}

## Configurer les options de Feature Flags {#configure-feature-flags-options}

Passez les options de configuration à `DdFlags.enable()` pour personnaliser le comportement de Feature Flags :

{{< code-block lang="tsx" >}}
await DdFlags.enable({
    // Send flag evaluation data to RUM for session analysis (default: true)
    rumIntegrationEnabled: true,
    // Track flag exposures for analytics (default: true)
    trackExposures: true,
});
{{< /code-block >}}

`rumIntegrationEnabled`
: Lorsque `true` (par défaut), les évaluations des Feature Flags sont suivies dans RUM, ce qui permet de les corréler avec les sessions utilisateur. Cela permet des analyses telles que _« Les utilisateurs de la variante B rencontrent-ils plus d'erreurs ? »_.

`trackExposures`
: Lorsque `true` (par défaut), le SDK enregistre automatiquement un _événement d'exposition_ lorsqu'un Feature Flag est évalué. Ces événements contiennent des métadonnées sur le Feature Flag auquel il a été accédé, la variante qui a été servie et dans quel contexte : Ils sont envoyés à Datadog afin que vous puissiez analyser l'adoption des fonctionnalités.

## Exigences relatives aux attributs de contexte {#context-attribute-requirements}

<div class="alert alert-warning">
Les attributs du contexte d'évaluation doivent être des valeurs primitives plates (chaînes, nombres, booléens). Les objets et tableaux imbriqués ne sont <strong>pas pris en charge</strong> et seront supprimés du contexte d'évaluation.
</div>

Utilisez des attributs plats dans votre contexte d'évaluation :

{{< code-block lang="javascript" >}}
OpenFeature.setContext({
    targetingKey: 'user-123',
    userId: 'user-123',
    tier: 'premium',
    age: 25
});
{{< /code-block >}}

Évitez les objets et les tableaux imbriqués :

{{< code-block lang="javascript" >}}
// These attributes will be dropped from the evaluation context with a console warning.
OpenFeature.setContext({
    targetingKey: 'user-123',
    user: { id: 'user-123' },        // nested object - NOT SUPPORTED
    features: ['beta', 'analytics']  // array - NOT SUPPORTED
});
{{< /code-block >}}

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogOpenFeatureProvider` réel, ou le remplacer par le `TypedInMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des Feature Flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `TypedInMemoryProvider` est exporté depuis `@openfeature/web-sdk`, qui est déjà installé pour React Native Feature Flags.

{{< code-block lang="tsx" >}}
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
    new_checkout_button: {
        variants: { on: true, off: false },
        defaultVariant: 'on',
        disabled: false,
    },
};

beforeEach(async () => {
    await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
    await OpenFeature.close();
});

function CheckoutButton() {
    const enabled = useBooleanFlagValue('new_checkout_button', false);
    return <Text>{enabled ? 'New checkout' : 'Legacy checkout'}</Text>;
}

test('new checkout button is enabled', () => {
    render(
        <OpenFeatureProvider>
            <CheckoutButton />
        </OpenFeatureProvider>
    );

    expect(screen.getByText('New checkout')).toBeTruthy();
});
{{< /code-block >}}

La structure des indicateurs du SDK Web nécessite `variants`, `defaultVariant` et `disabled`. Utilisez `setProviderAndWait` avant de rendre les composants afin que les hooks ne s'évaluent pas par rapport au fournisseur par défaut.

## Dépannage {#troubleshooting}

### Aucun Feature Flag renvoyé {#no-flags-returned}

Si les évaluations de Feature Flags renvoient des valeurs par défaut :

1. Vérifiez que le SDK Datadog React Native est initialisé avant d'appeler `DdFlags.enable()`.
2. Confirmez que `DdFlags.enable()` est terminé avant de définir le fournisseur OpenFeature.
3. Vérifiez que le contexte d'évaluation est défini avant d'évaluer les Feature Flags.
4. Confirmez que le Feature Flag existe et est activé dans votre dashboard Datadog Feature Flags.

### Erreurs d'installation de pod iOS {#ios-pod-install-errors}

Si `use_frameworks!` est activé dans votre `Podfile`, vous pourriez rencontrer des erreurs lors de `pod install`. Modifiez votre `Podfile` pour installer le pod du SDK en tant que bibliothèque statique :

{{< code-block lang="ruby" filename="Podfile" >}}
static_libraries = ['DatadogSDKReactNative']

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
{{< /code-block >}}

### Erreur de Feature Flags non initialisés {#feature-flags-not-initialized-error}

Si vous voyez une erreur indiquant que les Feature Flags ne sont pas initialisés, vérifiez l'ordre d'initialisation :

1. Initialisez d'abord le Datadog React Native SDK principal (`DdSdkReactNative.initialize()` ou `DatadogProvider`).
2. Appelez `DdFlags.enable()` après l'initialisation du SDK.
3. Créez et définissez le `DatadogOpenFeatureProvider` après avoir activé les Feature Flags.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /fr/account_management/api-app-keys/#client-tokens