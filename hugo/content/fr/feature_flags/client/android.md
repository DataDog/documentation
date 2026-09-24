---
aliases:
- /fr/feature_flags/setup/android/
description: Configurez les Datadog Feature Flags pour les applications Android et
  Android TV en utilisant l'API standard OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: https://openfeature.dev/docs/reference/technologies/client/kotlin/
  tag: Externe
  text: OpenFeature Kotlin SDK
- link: /real_user_monitoring/android/
  tag: Documentation
  text: Surveillance Android et Android TV
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guide
  text: Proxy du trafic du SDK Feature Flag
title: Feature Flags Android et Android TV
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application Android ou Android TV avec le Datadog Feature Flags SDK. Les Datadog Feature Flags offrent un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Le Datadog Feature Flags SDK pour Android est basé sur [OpenFeature][1], une norme ouverte pour la gestion des Feature Flags. Ce guide explique comment installer le SDK, configurer le fournisseur Datadog et évaluer les indicateurs dans votre application.

<div class="alert alert-info">Pour la plupart des applications, l'API OpenFeature est l'approche recommandée. Si vous avez besoin de plusieurs contextes d'évaluation indépendants dans la même application, consultez <a href="#direct-flagsclient-integration-advanced">l'intégration directe de FlagsClient</a>.</div>

## Mise en route {#getting-started}

Voici un exemple minimal pour faire fonctionner les Feature Flags dans votre application Android :

```kotlin
// 1. Add dependencies (see Installation section)

// 2. Initialize the Datadog Android SDK (in Application.onCreate)
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()
Datadog.initialize(this, configuration, TrackingConsent.GRANTED)

// 3. Enable Feature Flags
Flags.enable()

// 4. Create and set up the OpenFeature provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()
OpenFeatureAPI.setProviderAndWait(provider)

// 5. Set evaluation context (who is the user)
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf("tier" to Value.String("premium"))
    )
)

// 6. Evaluate flags anywhere in your app
val client = OpenFeatureAPI.getClient()
val isEnabled = client.getBooleanValue("my-feature", false)
```

Le reste de ce guide explique chaque étape en détail.

## Installation {#installation}

Ajoutez le Datadog Feature Flags SDK et le OpenFeature Provider en tant que dépendances Gradle dans le fichier `build.gradle` de votre module d'application :

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Initialisez Datadog le plus tôt possible dans le cycle de vie de votre application, généralement dans la méthode `onCreate()` de votre classe `Application`. Cela permet de garantir que toutes les évaluations des Feature Flags et la télémétrie sont correctement capturées. Pour créer un jeton client, consultez [Jetons client][2].

```kotlin
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
```

## Activer les Feature Flags {#enable-flags}

Après avoir initialisé Datadog, activez `Flags` pour l'attacher à l'instance actuelle du Datadog Android SDK et préparer la création du fournisseur et l'évaluation des Feature Flags :

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

Vous pouvez également transmettre un objet de configuration ; consultez [Configuration avancée](#advanced-configuration).

## Créer et configurer le fournisseur {#create-and-configure-the-provider}

Créez un `FlagsClient` et convertissez-le en fournisseur OpenFeature à l'aide de l'extension `asOpenFeatureProvider()`. Effectuez cette opération une fois au démarrage de l'application :

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

// Create and configure the provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()

// Set it as the OpenFeature provider
OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

<div class="alert alert-info">Le fournisseur OpenFeature enveloppe un Datadog <code>FlagsClient</code> en interne. Il s'agit d'un détail d'implémentation ; une fois configuré, vous interagissez exclusivement via l'API OpenFeature standard.</div>

<div class="alert alert-warning">Le SDK OpenFeature Kotlin utilise un fournisseur global unique et un contexte d'évaluation. Si vous avez besoin de plusieurs contextes d'évaluation indépendants dans la même application (par exemple, pour différents utilisateurs dans une application multi-utilisateurs), consultez <a href="#direct-flagsclient-integration-advanced">Intégration directe de FlagsClient</a>.</div>

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi s'applique l'évaluation du Feature Flag en utilisant un `ImmutableContext`. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Définissez ceci avant d'évaluer les Feature Flags pour aider à garantir un ciblage approprié.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.Value

OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to Value.String("user@example.com"),
            "tier" to Value.String("premium")
        )
    )
)
{{< /code-block >}}

<div class="alert alert-info">Les attributs OpenFeature doivent utiliser des <code>Value</code> des primitives telles que <code>Value.String()</code>, <code>Value.Integer()</code>, <code>Value.Double()</code>, ou <code>Value.Boolean()</code>. La clé de ciblage doit être cohérente pour le même utilisateur afin de garantir une évaluation cohérente des Feature Flags au fil des sessions. Pour les utilisateurs anonymes, utilisez un UUID persistant stocké, par exemple, dans <code>SharedPreferences</code>.</div>

## Évaluer les Feature Flags {#evaluate-flags}

Une fois votre fournisseur et votre contexte d'évaluation configurés, vous pouvez lire les valeurs des Feature Flags dans toute votre application. L'évaluation des flags est _locale et instantanée_ : le SDK utilise des données mises en cache localement, donc aucune requête réseau n'est effectuée lors de l'évaluation des flags. Cela permet d'effectuer les évaluations en toute sécurité sur le thread principal.

Chaque Feature Flag est identifié par une _clé_ (une chaîne unique) et peut être évalué avec une méthode typée qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

Tout d'abord, obtenez un client OpenFeature :

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

val client = OpenFeatureAPI.getClient()
{{< /code-block >}}

### Feature Flags booléens {#boolean-flags}

Les Feature Flags booléens représentent des conditions d'activation/désactivation ou vrai/faux :

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = client.getBooleanValue(
    key = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Les Feature Flags de type chaîne sélectionnent entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="kotlin" >}}
val theme = client.getStringValue(
    key = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### Feature Flags entiers et doubles {#integer-and-double-flags}

Les Feature Flags numériques sont appropriés lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="kotlin" >}}
val maxItems = client.getIntegerValue(
    key = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = client.getDoubleValue(
    key = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

### Feature Flags structurés {#structured-flags}

Les Feature Flags structurés sont utiles pour les scénarios de configuration à distance où plusieurs propriétés doivent être fournies ensemble sous forme de données de type JSON :

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.Value

val config = client.getObjectValue(
    key = "ui.config",
    defaultValue = Value.Structure(mapOf(
        "color" to Value.String("#00A3FF"),
        "fontSize" to Value.Integer(14)
    ))
)

// Access nested values
val color = config.asStructure()?.get("color")?.asString()
val fontSize = config.asStructure()?.get("fontSize")?.asInteger()
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la valeur du Feature Flag, vous pouvez obtenir des métadonnées d'évaluation détaillées, notamment la valeur évaluée, le nom de la variante, la raison et tout code d'erreur :

{{< code-block lang="kotlin" >}}
val details = client.getStringDetails(
    key = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Reason for this value (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // Error code, if any
{{< /code-block >}}

Des méthodes de détail similaires existent pour d'autres types : `getBooleanDetails()`, `getIntegerDetails()`, `getDoubleDetails()` et `getObjectDetails()`.

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Observer les événements du fournisseur{#observe-provider-events}

<div class="alert alert-info">L'observation des événements du fournisseur est disponible dans <code>dd-sdk-android-flags-openfeature</code> 3.6.0 et versions ultérieures. Utilisez la même version pour <code>dd-sdk-android-flags</code>.</div>

Utilisez `OpenFeatureAPI.observe()` pour réagir aux changements d'état du fournisseur. Le fournisseur OpenFeature Datadog émet `ProviderReady`, `ProviderStale` et `ProviderError` en fonction de l'état `FlagsClient` sous-jacent.

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

val stateJob = lifecycleScope.launch {
    OpenFeatureAPI.observe<OpenFeatureProviderEvents>()
        .catch {
            // Handle Flow collection errors.
        }
        .collect { event ->
            when (event) {
                is OpenFeatureProviderEvents.ProviderReady -> {
                    // The provider is ready to evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderStale -> {
                    // Cached assignments are available, but they may be out of date.
                }
                is OpenFeatureProviderEvents.ProviderError -> {
                    // The provider cannot evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderConfigurationChanged -> {
                    // The provider configuration changed.
                }
                else -> {
                    // Handle other OpenFeature provider events as needed.
                }
            }
        }
}
{{< /code-block >}}

Annulez le job de collecte lorsque le composant d'observation s'arrête. Par exemple, effectuez la collecte à partir de `lifecycleScope` dans un `Activity` ou `Fragment` Android, ou à partir de `viewModelScope` dans un `ViewModel`.

## Configuration avancée {#advanced-configuration}

### Configuration globale {#global-configuration}

L'`Flags.enable()`API accepte une configuration facultative avec les options listées ci-dessous. Ces paramètres s'appliquent globalement à tous les fournisseurs :

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`trackExposures()`
: Lorsque `true` (par défaut), le SDK enregistre automatiquement un _événement d'exposition_ lorsqu'un Feature Flag est évalué. Ces événements contiennent des métadonnées sur le Feature Flag auquel il a été accédé, la variante qui a été servie et dans quel contexte : Ils sont envoyés à Datadog afin que vous puissiez analyser ultérieurement l'adoption des Feature Flags. Si vous n'avez besoin que d'une évaluation locale sans télémétrie, vous pouvez la désactiver avec : `trackExposures(false)`.

`rumIntegrationEnabled()`
: Lorsque `true` (par défaut), les évaluations des Feature Flags sont suivies dans RUM, ce qui permet de les corréler avec les sessions utilisateur. Cela permet des analyses telles que _« Les utilisateurs de la variante B rencontrent-ils plus d'erreurs ? »_. Si votre application n'utilise pas RUM, ce Feature Flag n'a aucun effet et peut être laissé en toute sécurité à sa valeur par défaut. Utilisez `rumIntegrationEnabled(false)` pour désactiver l'intégration RUM.

`gracefulModeEnabled()`
: Contrôle la façon dont le SDK gère une utilisation incorrecte de l'API — par exemple, la création d'un client avant d'appeler `Flags.enable()`, la création d'un client en double avec le même nom, ou la récupération d'un client qui n'a pas encore été créé.

  Le comportement exact du mode Graceful dépend de votre configuration de build :

  * **Builds de version** : Le SDK applique toujours le mode Graceful : toute utilisation incorrecte est uniquement consignée en interne si `Datadog.setVerbosity()` est configuré.
  * **Builds de débogage** avec `gracefulModeEnabled = true` (par défaut) : Le SDK consigne toujours des avertissements dans la console.
  * **Builds de débogage** avec `gracefulModeEnabled = false` : Le SDK déclenche `IllegalStateException` en cas d'utilisation incorrecte de l'API, imposant une approche de type fail-fast qui aide à détecter rapidement les erreurs de configuration.

  Vous pouvez ajuster `gracefulModeEnabled()` en fonction de votre phase de développement ou de QA.

### Configuration par fournisseur {#per-provider-configuration}

Vous pouvez configurer des fournisseurs individuels avec des endpoints personnalisés avant de les créer :

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .useCustomEvaluationEndpoint("https://your-proxy.example.com/evaluations")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

## Intégration directe de FlagsClient (avancé) {#direct-flagsclient-integration-advanced}

Pour la plupart des applications, l'API OpenFeature décrite ci-dessus est l'approche recommandée. Cependant, vous pouvez utiliser directement le `FlagsClient` Datadog si vous avez des besoins spécifiques non pris en charge par l'abstraction OpenFeature.

**Utilisez FlagsClient directement uniquement si vous :**

- Avez besoin de **contextes d'évaluation indépendants multiples** dans la même application (par exemple, des contextes différents pour des utilisateurs différents dans une application multi-utilisateurs)
- Souhaitez travailler directement avec des **types Kotlin natifs** (`JSONObject` au lieu de `Value.Structure`)
- Avez besoin d'un **contrôle précis** sur le cycle de vie du client et la configuration par instance

### Installation (FlagsClient) {#installation-flagsclient}

Si vous n'avez besoin que de l'API directe, vous pouvez omettre la dépendance OpenFeature :

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### Créer et récupérer un client (FlagsClient) {#create-and-retrieve-a-client-flagsclient}

Créez un client une seule fois, généralement au démarrage de l'application :

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

Récupérez le même client n'importe où dans votre application :

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

Vous pouvez également créer et récupérer plusieurs clients en fournissant le paramètre `name` :

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">Si un client avec le nom donné existe déjà, l'instance existante est réutilisée.</div>

### Définir le contexte d'évaluation (FlagsClient) {#set-the-evaluation-context-flagsclient}

{{< code-block lang="kotlin" >}}
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to "user@example.com",
            "tier" to "premium"
        )
    )
)
{{< /code-block >}}

Cette méthode récupère les attributions des Feature Flags depuis le serveur de manière asynchrone en arrière-plan. L'opération est non bloquante et sûre pour les threads. Les mises à jour des Feature Flags sont disponibles pour les évaluations ultérieures une fois l'opération en arrière-plan terminée.

### Observer les changements d'état du client direct {#observe-direct-client-state-changes}

<div class="alert alert-info">L'observation de l'état du client direct avec <code>flagsClient.state</code> est disponible dans <code>dd-sdk-android-flags</code> 3.4.0 et versions ultérieures.</div>

Utilisez `flagsClient.state` pour vérifier l'état actuel du client direct ou enregistrer un écouteur pour les changements d'état :

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsStateListener
import com.datadog.android.flags.model.FlagsClientState

val listener = object : FlagsStateListener {
    override fun onStateChanged(newState: FlagsClientState) {
        when (newState) {
            FlagsClientState.NotReady -> {
                // The client has not loaded assignments yet.
            }
            FlagsClientState.Reconciling -> {
                // The client is fetching assignments for a context change.
            }
            FlagsClientState.Ready -> {
                // Assignments are loaded and available for evaluation.
            }
            FlagsClientState.Stale -> {
                // Cached assignments are available, but the latest fetch failed.
            }
            is FlagsClientState.Error -> {
                // No assignments are available for evaluation.
            }
        }
    }
}

flagsClient.state.addListener(listener)

val currentState = flagsClient.state.getCurrentState()
{{< /code-block >}}

L'écouteur reçoit l'état actuel lors de son enregistrement, puis reçoit les futurs changements d'état. Veillez à ce que le callback soit rapide et déléguez les tâches longues à un autre thread. Appelez `flagsClient.state.removeListener(listener)` lorsque le composant d'observation s'arrête.

### Évaluer les Feature Flags (FlagsClient) {#evaluate-flags-flagsclient}

{{% collapse-content title="Feature Flags booléens" level="h4" %}}
{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Feature Flags de type chaîne" level="h4" %}}
{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Feature Flags entiers et doubles" level="h4" %}}
{{< code-block lang="kotlin" >}}
val maxItems = flagsClient.resolveIntValue(
    flagKey = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = flagsClient.resolveDoubleValue(
    flagKey = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Feature Flags structurés" level="h4" %}}
{{< code-block lang="kotlin" >}}
import org.json.JSONObject

val config = flagsClient.resolveStructureValue(
    flagKey = "ui.config",
    defaultValue = JSONObject().apply {
        put("color", "#00A3FF")
        put("fontSize", 14)
    }
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Détails de l'évaluation des Feature Flags" level="h4" %}}
{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}
{{% /collapse-content %}}

### Comparaison d'API {#api-comparison}

Ce tableau met en évidence les différences clés entre les API OpenFeature et `FlagsClient` pour vous aider à choisir l'intégration qui correspond à vos besoins.

| Fonctionnalité | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **Standard d'API** | OpenFeature (neutre vis-à-vis du fournisseur) | Spécifique à Datadog |
| **Contexte d'évaluation** | Global/statique | Par instance de client |
| **Flags structurés** | `Value.Structure` | `JSONObject` |
| **Sécurité de type** | Types `Value` OpenFeature | Types natifs Kotlin |
| **Verrouillage fournisseur** | Faible (neutre vis-à-vis du fournisseur)| Plus élevé (spécifique à Datadog)|
| **Gestion d'état** | Observation basée sur les flux| Enregistrement manuel de listeners|

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le fournisseur Datadog réel, ou le remplacer par un `FeatureProvider` en mémoire pour contrôler directement les valeurs des flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. Le SDK OpenFeature Kotlin en amont ne fournit pas de [`InMemoryProvider`][3], les tests utilisent donc un petit `FeatureProvider` personnalisé. L'exemple ci-dessous remplace le fournisseur de `OpenFeatureAPI` — si votre code de production utilise directement le wrapper `FlagsClient` de Datadog, votre test doit effectuer des assertions via le même client `OpenFeatureAPI` que celui utilisé par le wrapper, et non `FlagsClient`.

Ajoutez `kotlinx-coroutines-test` à votre configuration de test (le `initialize` du SDK est une fonction `suspend`) :

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1'
}
{{< /code-block >}}

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.*
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import kotlin.test.assertTrue

class FakeProvider(private val flags: Map<String, Any>) : FeatureProvider {
    override val hooks = emptyList<Hook<*>>()
    override val metadata = object : ProviderMetadata { override val name = "fake" }
    private val events = MutableSharedFlow<OpenFeatureProviderEvents>(replay = 1)

    override suspend fun initialize(initialContext: EvaluationContext?) {
        // No-op. The SDK emits ProviderReady after initialize returns.
    }
    override fun shutdown() {}
    override suspend fun onContextSet(old: EvaluationContext?, new: EvaluationContext) {}

    override fun getBooleanEvaluation(key: String, defaultValue: Boolean, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Boolean) ?: defaultValue)
    override fun getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? String) ?: defaultValue)
    override fun getIntegerEvaluation(key: String, defaultValue: Int, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Int) ?: defaultValue)
    override fun getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Double) ?: defaultValue)
    override fun getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Value) ?: defaultValue)

    override fun observe(): Flow<OpenFeatureProviderEvents> = events
}

class CheckoutFlagsTest {
    private lateinit var client: Client

    @Before
    fun setUp() = runTest {
        OpenFeatureAPI.setProviderAndWait(
            FakeProvider(mapOf("new-checkout-flow" to true))
        )
        client = OpenFeatureAPI.getClient()
    }

    @Test
    fun newCheckoutEnabled() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI` est un singleton à l'échelle du processus, réinitialisez-le donc entre les classes de test si les tests partagent une JVM. Enveloppez `setProviderAndWait` dans `runTest { ... }` — il ne peut pas être appelé depuis une méthode `@Before` simple car il est `suspend`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: https://github.com/open-feature/kotlin-sdk/pull/226