---
aliases:
- /fr/feature_flags/setup/ios/
description: Configurez les Feature Flags Datadog pour les applications iOS et tvOS.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /real_user_monitoring/ios/
  tag: Documentation
  text: Surveillance iOS et tvOS
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guide
  text: Faites transiter le trafic du SDK Feature Flag par un proxy
title: Feature Flags pour iOS et tvOS
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application iOS ou tvOS avec le SDK Datadog Feature Flags. Les Datadog Feature Flags offrent un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Ce guide explique comment installer et activer le SDK, créer et utiliser un `FlagsClient`, et configurer des options avancées.

## Installation {#installation}

Déclarez `DatadogFlags` comme dépendance dans votre projet. La méthode d'installation recommandée est Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}
Pour installer le SDK Datadog Feature Flags à l'aide de Swift Package Manager d'Apple, ajoutez ce qui suit en tant que dépendance à votre fichier `Package.swift` :

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

Dans votre projet, associez les bibliothèques suivantes :

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
Pour installer le SDK Datadog Feature Flags avec [CocoaPods][1], déclarez les pods suivants dans votre `Podfile` :

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
Pour installer le SDK Datadog Feature Flags avec [Carthage][1], ajoutez `dd-sdk-ios` à votre `Cartfile` :

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**Remarque** : Datadog ne fournit pas de binaires Carthage préconstruits. Cela signifie que Carthage compile le SDK à partir de la source. Pour compiler et intégrer le SDK, exécutez :

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

Après la compilation, ajoutez les XCFrameworks suivants à votre projet Xcode (dans la section {{< ui >}}Frameworks, Libraries, and Embedded Content{{< /ui >}}) :

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## Initialiser le SDK {#initialize-the-sdk}

Initialisez Datadog le plus tôt possible dans le cycle de vie de votre application, généralement dans `application(_:didFinishLaunchingWithOptions:)` (ou avec `@UIApplicationDelegateAdaptor` pour les applications SwiftUI). Cela garantit que toutes les évaluations de feature flags et la télémétrie sont capturées correctement. Pour créer un jeton client, consultez [Jetons client][2].

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

## Activer les flags {#enable-flags}

Après avoir initialisé Datadog, activez `Flags` pour l'attacher à l'instance actuelle du SDK Datadog iOS et préparer la création du client ainsi que l'évaluation des flags :

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

Vous pouvez également transmettre un objet de configuration ; consultez [Configuration avancée](#advanced-configuration).

## Créer et récupérer un client {#create-and-retrieve-a-client}

Créez un client une seule fois, généralement au démarrage de l'application :

{{< code-block lang="swift" >}}
FlagsClient.create() // Creates the default client
{{< /code-block >}}

Récupérez le même client n'importe où dans votre application :

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Retrieves the "default" client
{{< /code-block >}}

Vous pouvez également créer et récupérer plusieurs clients en fournissant le paramètre `name` :

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">Si un client avec le nom donné existe déjà, l'instance existante est réutilisée.</div>

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi s'applique l'évaluation du flag en utilisant un `FlagsEvaluationContext`. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Appelez cette méthode avant d'évaluer les flags pour garantir un ciblage approprié.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="swift" >}}
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "email": .string("user@example.com"),
            "tier":  .string("premium")
        ]
    )
)
{{< /code-block >}}

Cette méthode récupère les attributions de flags depuis le serveur de manière asynchrone. En fournissant un rappel de fin optionnel ou en utilisant la variante async/await, vous pouvez gérer le résultat de l'évaluation du contexte :

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Context set successfully
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir créé le `FlagsClient` et défini son contexte d'évaluation, vous pouvez commencer à lire les valeurs des flags dans toute votre application. L'évaluation des flags est _locale et instantanée_ : le SDK utilise des données mises en cache localement, donc aucune requête réseau n'est effectuée lors de l'évaluation des flags. Cela permet d'effectuer les évaluations en toute sécurité sur le thread principal.

Chaque flag est identifié par une _clé_ (une chaîne unique) et peut être évalué avec un _getter typé_ qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `getBooleanValue(key:defaultValue:)` pour les flags qui représentent des conditions activé/désactivé ou vrai/faux. Exemple :

{{< code-block lang="swift" >}}
let isNewCheckoutEnabled = flagsClient.getBooleanValue(
    key: "checkout.new",
    defaultValue: false
)

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `getStringValue(key:defaultValue:)` pour les flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration. Exemple :

{{< code-block lang="swift" >}}
let theme = flagsClient.getStringValue(
    key: "ui.theme",
    defaultValue: "light"
)

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Flags entiers et doubles {#integer-and-double-flags}

Pour les flags numériques, utilisez `getIntegerValue(key:defaultValue:)` ou `getDoubleValue(key:defaultValue:)`. Ils sont appropriés lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="swift" >}}
let maxItems = flagsClient.getIntegerValue(
    key: "cart.items.max",
    defaultValue: 20
)

let priceMultiplier = flagsClient.getDoubleValue(
    key: "pricing.multiplier",
    defaultValue: 1.0
)
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Pour les données structurées ou de type JSON, utilisez `getObjectValue(key:defaultValue:)`. Cette méthode renvoie un `AnyValue`, qui peut représenter des primitives, des tableaux ou des dictionnaires. Les flags d'objet sont utiles pour les scénarios de configuration à distance où plusieurs propriétés doivent être fournies ensemble. Exemple :

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du flag, utilisez les API `get<Type>Details`. Ces méthodes renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

Exemple :

{{< code-block lang="swift" >}}
let details = flagsClient.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Evaluated value (for example: "A", "B", or "control")
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.error)    // The error that occurred during evaluation, if any
{{< /code-block >}}

Les détails du flag peuvent vous aider à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Observer les changements d'état {#observe-state-changes}

<div class="alert alert-info">L'observation de l'état avec <code>FlagsClient.state</code> est disponible dans <code>dd-sdk-ios</code> 3.11.0 et versions ultérieures.</div>

Utilisez `flagsClient.state` pour vérifier si un `FlagsClient` est prêt à évaluer les flags et pour réagir lorsque son état change. Les changements d'état se produisent lorsque vous appelez `setEvaluationContext` et que le SDK récupère les attributions de flags pour ce contexte.

{{< code-block lang="swift" >}}
final class FeatureFlagStateObserver: FlagsStateListener {
    func flagsStateDidChange(_ newState: FlagsClientState) {
        switch newState {
        case .notReady:
            // The client has not loaded assignments yet.
            break
        case .reconciling:
            // The client is fetching assignments for a context change.
            break
        case .ready:
            // Assignments are loaded and available for evaluation.
            break
        case .stale:
            // Cached assignments are available, but the latest fetch failed.
            break
        case .error:
            // No assignments are available for evaluation.
            break
        }
    }
}

let observer = FeatureFlagStateObserver()
flagsClient.state.addListener(observer)

let currentState = flagsClient.state.currentState
{{< /code-block >}}

Conservez une référence forte à l'écouteur aussi longtemps que vous souhaitez recevoir des mises à jour. L'écouteur reçoit l'état actuel lorsqu'il est enregistré, puis reçoit les changements d'état futurs.

## Utilisation avec OpenFeature {#use-with-openfeature}

Les exemples ci-dessus utilisent directement l'API `FlagsClient` de Datadog. Si vous préférez l'API standard [OpenFeature](https://openfeature.dev/), Datadog propose un fournisseur OpenFeature pour iOS qui encapsule `FlagsClient` et l'expose via `OpenFeatureAPI.shared`. Les mêmes données d'indicateur sont servies via l'une ou l'autre interface ; choisissez l'API qui convient à votre application.

<div class="alert alert-info">Le pont OpenFeature pour iOS (<a href="https://github.com/DataDog/dd-openfeature-provider-swift"><code>dd-openfeature-provider-swift</code></a>) est disponible en tant que package pré-1.0. Jusqu'à ce qu'il atteigne la version 1.0, les mises à jour de version peuvent inclure des changements incompatibles. Utilisez cette section pour effectuer l'intégration via OpenFeature ; utilisez <code>FlagsClient</code> directement pour l'interface API iOS la plus stable.</div>

### Installer le fournisseur OpenFeature {#install-the-openfeature-provider}

Ajoutez `dd-openfeature-provider-swift` à votre `Package.swift` :

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/DataDog/dd-openfeature-provider-swift.git", .upToNextMajor(from: "0.2.0"))
{{< /code-block >}}

Liez le produit `DatadogOpenFeatureProvider` à votre cible d'application. Le pont dépend du SDK OpenFeature Swift 0.3.0.

### Initialisez OpenFeature {#initialize-openfeature}

Initialisez Datadog et activez les flags comme indiqué dans [Initialiser le SDK](#initialize-the-sdk). Créez ensuite un `DatadogProvider` et enregistrez-le avec `OpenFeatureAPI.shared` :

{{< code-block lang="swift" >}}
import DatadogCore
import DatadogFlags
import DatadogOpenFeatureProvider
import OpenFeature

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)

Flags.enable()

let context = MutableContext(targetingKey: "user-123")
let provider = DatadogProvider()
await OpenFeatureAPI.shared.setProviderAndWait(provider: provider, initialContext: context)
{{< /code-block >}}

`setProviderAndWait` est `async` et ne génère pas d'exception. Une fois qu'il a renvoyé une valeur, le fournisseur est prêt et les évaluations de flags utilisent les valeurs mises en cache.

### Définissez le contexte d'évaluation {#set-the-evaluation-context-1}

Le contexte d'évaluation identifie à qui ou à quoi s'applique l'évaluation du flag. Transmettez-le lors de l'enregistrement du fournisseur, comme indiqué ci-dessus, ou mettez-le à jour ultérieurement :

{{< code-block lang="swift" >}}
let updatedContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "email": Value.string("user@example.com"),
        "tier":  Value.string("premium")
    ])
)

await OpenFeatureAPI.shared.setEvaluationContextAndWait(evaluationContext: updatedContext)
{{< /code-block >}}

La `targetingKey` est le sujet de randomisation pour les déploiements progressifs — la même clé reçoit toujours la même variante pour un flag donné.

### Évaluer les flags {#evaluate-flags-1}

Récupérez le client OpenFeature global et appelez les getters typés :

{{< code-block lang="swift" >}}
let client = OpenFeatureAPI.shared.getClient()

let isNewCheckoutEnabled = client.getBooleanValue(key: "checkout.new", defaultValue: false)

let theme = client.getStringValue(key: "ui.theme", defaultValue: "light")

let maxItems = client.getIntegerValue(key: "cart.items.max", defaultValue: 20)

let priceMultiplier = client.getDoubleValue(key: "pricing.multiplier", defaultValue: 1.0)

let config = client.getObjectValue(
    key: "ui.config",
    defaultValue: Value.structure([
        "color": Value.string("#00A3FF"),
        "fontSize": Value.integer(14)
    ])
)
{{< /code-block >}}

Les évaluations sont synchrones et peuvent être effectuées en toute sécurité sur le thread principal — elles lisent à partir du cache local du SDK et n'effectuent pas de requêtes réseau. Notez que `getIntegerValue` renvoie `Int64` ; effectuez un cast vers `Int` sur le site d'appel si nécessaire.

### Détails de l'évaluation du flag {#flag-evaluation-details-1}

Utilisez les méthodes `get<Type>Details` lorsque vous avez besoin de la raison, de la variante ou de toute erreur d'évaluation en plus de la valeur :

{{< code-block lang="swift" >}}
let details = client.getStringDetails(key: "paywall.layout", defaultValue: "control")

print(details.value)    // Evaluated value
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Reason (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode) // Error code, if evaluation failed
{{< /code-block >}}

### Observer les événements du fournisseur {#observe-provider-events}

<div class="alert alert-info">L'observation des événements du fournisseur pour le fournisseur Datadog OpenFeature est disponible dans <code>dd-openfeature-provider-swift</code> 0.2.0 et versions ultérieures. La version 0.2.0 dépend de <code>dd-sdk-ios</code> 3.13.0 ou version ultérieure.</div>

Utilisez `OpenFeatureAPI.shared.observe()` pour réagir aux événements du fournisseur OpenFeature. Le fournisseur Datadog OpenFeature émet `.ready`, `.stale` et `.error` en fonction de l'état `FlagsClient` sous-jacent. Le SDK OpenFeature peut également émettre des événements de cycle de vie tels que `.reconciling` et `.contextChanged` lorsque le contexte d'évaluation change.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature

final class FeatureFlagEventObserver {
    private var cancellable: AnyCancellable?

    func startObserving() {
        cancellable = OpenFeatureAPI.shared.observe().sink { event in
            guard let event else {
                return
            }

            switch event {
            case .ready:
                // The provider is ready to evaluate flags.
                break
            case .stale:
                // Cached assignments are available, but they may be out of date.
                break
            case .error(_, _):
                // The provider cannot evaluate flags.
                break
            case .reconciling:
                // The provider is reconciling after a context change.
                break
            case .contextChanged:
                // The context change completed.
                break
            case .configurationChanged:
                // The provider configuration changed.
                break
            }
        }
    }
}
{{< /code-block >}}

## Configuration avancée {#advanced-configuration}

L'API `Flags.enable()` accepte une configuration optionnelle avec les options listées ci-dessous.

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
: Lorsque `true` (par défaut), le SDK enregistre automatiquement un _événement d'exposition_ lorsqu'un flag est évalué. Ces événements contiennent des métadonnées sur le flag accédé, la variante servie et le contexte utilisé. Ils sont envoyés à Datadog afin que vous puissiez analyser ultérieurement l'adoption des fonctionnalités. Si vous avez uniquement besoin d'une évaluation locale sans télémétrie, vous pouvez désactiver cette option.

`rumIntegrationEnabled`
: Lorsque `true` (par défaut), les évaluations de flag sont suivies dans RUM, ce qui permet de les corréler avec les sessions utilisateur. Cela permet des analyses telles que _« Les utilisateurs de la variante B rencontrent-ils plus d'erreurs ? »_. Si votre application n'utilise pas RUM, ce flag n'a aucun effet et peut être laissé en toute sécurité à sa valeur par défaut.

`gracefulModeEnabled`
: Contrôle la façon dont le SDK gère une utilisation incorrecte de l'API `FlagsClient` — par exemple, la création d'un client avant l'appel de `Flags.enable()`, la création d'un client en double avec le même nom, ou la récupération d'un client qui n'a pas encore été créé.

  Le comportement exact du mode Graceful dépend de votre configuration de build :

  * **Builds de release**: Le SDK applique toujours le mode Graceful: toute utilisation incorrecte est uniquement consignée en interne si `Datadog.verbosityLevel` est configuré.
  * **Builds de debug** avec `gracefulModeEnabled = true` (par défaut): Le SDK consigne toujours des avertissements dans la console.
  * **Builds de debug** avec `gracefulModeEnabled = false`: Le SDK génère `fatalError` en cas d'utilisation incorrecte de l'API, appliquant une approche de fail-fast qui aide à détecter rapidement les erreurs de configuration.

  Vous pouvez ajuster `gracefulModeEnabled` en fonction de votre phase de développement ou de QA.

`customFlagsEndpoint`
: Configure une URL de serveur personnalisée pour récupérer les attributions d'indicateurs :

`customExposureEndpoint`
: Configure une URL de serveur personnalisée pour envoyer les données d'exposition des indicateurs :

`customEvaluationEndpoint`
: Configure une URL de serveur personnalisée pour envoyer la télémétrie d'évaluation des indicateurs :

`customFlagsHeaders`
: Définit des en-têtes HTTP supplémentaires à joindre aux requêtes effectuées vers `customFlagsEndpoint` : Cela peut être utile pour l'authentification ou le routage lors de l'utilisation de votre propre service d'indicateurs.

## Tests {#testing}

Les exemples ci-dessus utilisent directement l'API `FlagsClient` de Datadog. Si vous utilisez le pont [OpenFeature](https://openfeature.dev/) ou si vous écrivez des tests autour de l'API OpenFeature, remplacez-le par un fournisseur en mémoire pour les valeurs d'indicateurs contrôlées par le code.

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par un `FeatureProvider` en mémoire pour contrôler directement les valeurs des indicateurs dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. Le SDK OpenFeature pour Swift ne fournit pas de `InMemoryProvider`, les tests utilisent donc un petit `FeatureProvider` personnalisé à la place.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature
import XCTest
@testable import MyApp

// Minimal in-memory provider for tests. Copy into your test target.
final class InMemoryTestProvider: FeatureProvider {
    var hooks: [any Hook] = []
    var metadata: ProviderMetadata = Metadata(name: "in-memory-test")
    private let subject = CurrentValueSubject<ProviderEvent?, Never>(.ready)
    private let bools: [String: Bool]
    private let strings: [String: String]

    init(bools: [String: Bool] = [:], strings: [String: String] = [:]) {
        self.bools = bools
        self.strings = strings
    }

    func observe() -> AnyPublisher<ProviderEvent?, Never> { subject.eraseToAnyPublisher() }

    func initialize(initialContext: EvaluationContext?) async throws {}

    func onContextSet(oldContext: EvaluationContext?, newContext: EvaluationContext) async throws {}

    func getBooleanEvaluation(key: String, defaultValue: Bool, context: EvaluationContext?) throws -> ProviderEvaluation<Bool> {
        ProviderEvaluation(value: bools[key] ?? defaultValue, variant: bools[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) throws -> ProviderEvaluation<String> {
        ProviderEvaluation(value: strings[key] ?? defaultValue, variant: strings[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getIntegerEvaluation(key: String, defaultValue: Int64, context: EvaluationContext?) throws -> ProviderEvaluation<Int64> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) throws -> ProviderEvaluation<Double> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) throws -> ProviderEvaluation<Value> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    private struct Metadata: ProviderMetadata { var name: String? }
}

final class CheckoutFlagTests: XCTestCase {
    override func tearDown() {
        OpenFeatureAPI.shared.clearProvider()
    }

    func testNewCheckoutEnabled() async throws {
        let provider = InMemoryTestProvider(bools: ["new-checkout-flow": true])
        await OpenFeatureAPI.shared.setProviderAndWait(provider: provider)

        let client = OpenFeatureAPI.shared.getClient()
        XCTAssertTrue(client.getBooleanValue(key: "new-checkout-flow", defaultValue: false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI.shared` est un singleton global, donc appelez `clearProvider()` dans `tearDown` pour empêcher que les indicateurs d'un test ne se retrouvent dans un autre. `setProviderAndWait(provider:)` est `async` et ne génère pas d'exception, donc aucun `try` n'est requis.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/account_management/api-app-keys/#client-tokens