---
description: Configurez les Datadog Feature Flags pour les applications Java.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: Documentation
  text: Java APM et traçage distribué
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration des SDK côté serveur
title: Feature Flags pour Java
---
## Présentation {#overview}

Cette page décrit comment ajouter des Datadog Feature Flags à une application Java. Dans la version 1.66.0 et ultérieure, `dd-openfeature` charge la configuration des indicateurs directement depuis le CDN géré par Datadog par défaut. Cette source agentless prend en charge les serveurs à exécution longue et les environnements d'exécution serverless qui ne peuvent pas se connecter à un Datadog Agent.

Le fournisseur Datadog implémente la norme [OpenFeature](https://openfeature.dev/). Il utilise `dd-java-agent` pour la distribution de la configuration. La distribution agentless supprime l'exigence d'un Datadog Agent externe, mais `dd-java-agent` doit toujours être chargé dans la JVM.

La version agentless de Java évalue localement les indicateurs et envoie des événements d'exposition aux expériences ainsi que des événements agrégés d'évaluation d'indicateurs via l'Event Platform Proxy (EVP). Il privilégie un relais de télémétrie local compatible. Il envoie les deux types d'événements directement lorsqu'aucun relais compatible n'est disponible.

##  Exigences de compatibilité {#compatibility-requirements}

Pour la configuration agentless par défaut, vous avez besoin de :

- **Java 11 ou version ultérieure**
- **Agent Java Datadog** (`dd-java-agent`, chargé avec `-javaagent`) : Version **1.66.0** ou ultérieure
- **Fournisseur OpenFeature Datadog** (`com.datadoghq:dd-openfeature`, ajouté en tant que dépendance de build) : Version **1.66.0** ou ultérieure
- **SDK OpenFeature** : Version **1.20.1** ou ultérieure
- Une [**clé d'API**][7] Datadog
- Votre [**site**][14] Datadog

Utilisez la même version de `dd-java-agent` et `dd-openfeature`. La distribution agentless ne nécessite pas de service Datadog Agent distinct.

<div class="alert alert-info">Pour Java serverless, l'environnement d'exécution doit prendre en charge l' <code>-javaagent</code> option JVM. Vous pouvez transmettre l'option dans la commande Java ou via <code>JAVA_TOOL_OPTIONS</code>. Consultez la configuration Java pour <a href="/serverless/google_cloud_run/functions/java/?tab=maven">Cloud Run Functions</a> ou <a href="/serverless/google_cloud_run/containers/in_container/java/">Cloud Run containers</a> pour des exemples.</div>

Pour une liste complète de la prise en charge des versions Java et des frameworks par Datadog, lisez [Compatibility Requirements](/tracing/trace_collection/compatibility/java/).

## Mise en route {#getting-started}

Installez les dépendances OpenFeature et ajoutez l'agent Java à la JVM.

## Installation {#installation}

Vous avez besoin du fournisseur OpenFeature de Datadog et des dépendances du SDK OpenFeature.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
Ajoutez les dépendances suivantes à votre `build.gradle` :

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.66.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
Ajoutez les dépendances suivantes à votre `build.gradle.kts` :

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.20.1")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.66.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
Ajoutez les dépendances suivantes à votre `pom.xml` :

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.20.1</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.66.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Les exemples d'installation Gradle et Maven fixent des versions spécifiques de `dd-openfeature` et du SDK OpenFeature. Consultez [les exigences de compatibilité](#compatibility-requirements) pour les versions minimales prises en charge.

Les métriques d'évaluation des indicateurs utilisent un chemin de télémétrie distinct de la configuration des indicateurs. Consultez [Set Up Server-Side Flag Evaluation Metrics][8].

### Ajoutez l'agent Java à la JVM {#add-the-java-agent-to-the-jvm}

Chargez `dd-java-agent` avec l'option JVM `-javaagent`. Pour les instructions d'installation, consultez [Add the Java SDK to the JVM](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm).

Si l'environnement d'exécution contrôle la commande Java, définissez l'option via `JAVA_TOOL_OPTIONS`. Consultez la configuration Java pour [Cloud Run Functions][15] ou [Cloud Run containers][16] pour des exemples.

## Configuration {#configuration}

### Configurer la livraison agentless {#configure-agentless-delivery}

Configurez la clé d'API, le site Datadog et l'environnement dans le processus d'application :

{{< code-block lang="bash" >}}
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_VERSION=<YOUR_APP_VERSION>

java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

Aucune activation de Feature Flags ni aucun paramètre de source n'est requis. Initialisez le fournisseur OpenFeature de Datadog pour commencer l'interrogation.

## Initialisez le fournisseur OpenFeature {#initialize-the-openfeature-provider}

Initialisez le fournisseur OpenFeature Datadog dans le code de démarrage de votre application. Le fournisseur démarre la source de configuration sélectionnée.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;
import dev.openfeature.sdk.exceptions.ProviderNotReadyError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
    private static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Client client;

    public static void main(String[] args) throws Exception {
        // Initialize the Datadog provider
        logger.info("Initializing Datadog OpenFeature Provider...");
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();

        try {
            // Set provider and wait for initial configuration (recommended)
            api.setProviderAndWait(new Provider());
            client = api.getClient("my-app");
            logger.info("OpenFeature provider initialized successfully");
        } catch (ProviderNotReadyError e) {
            // Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (configuration unavailable), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        } catch (Exception e) {
            logger.error("Failed to initialize OpenFeature provider", e);
            throw e;
        }

        // Your application code here
    }
}
{{< /code-block >}}

Utilisez `setProviderAndWait()` pour bloquer l'évaluation jusqu'à ce que la source sélectionnée fournisse la configuration initiale des indicateurs. Cela charge les indicateurs avant que l'application ne commence à traiter le trafic. Le délai d'initialisation par défaut est de 30 secondes.

`ProviderNotReadyError` est une exception du SDK OpenFeature levée lorsque le fournisseur expire pendant l'initialisation. La capturer permet à l'application de démarrer avec des valeurs d'indicateurs par défaut si la livraison de la configuration est indisponible. Si elle n'est pas capturée, l'exception se propage et peut empêcher le démarrage de l'application. Gérez cela en fonction de vos exigences de disponibilité.

### Initialisation asynchrone {#asynchronous-initialization}

Pour une initialisation non bloquante, utilisez `setProvider()` et écoutez les événements du fournisseur :

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
Client client = api.getClient();

// Listen for provider state changes
client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flags ready!");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Provider configuration is stale");
});

// Set provider asynchronously
api.setProvider(new Provider());
{{< /code-block >}}

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Le contexte d'évaluation définit le sujet (utilisateur, appareil, session) pour l'évaluation des indicateurs. Il détermine quelles variantes d'indicateurs sont renvoyées en fonction des règles de ciblage.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

Le `targetingKey` (par exemple, `user-123`) est l'identifiant principal utilisé pour des évaluations d'indicateurs cohérentes et des déploiements basés sur des pourcentages. Il s'agit généralement d'un identifiant utilisateur, d'un identifiant de session ou d'un identifiant d'appareil.

## Évaluer les Feature Flags {#evaluate-flags}

Évaluez les Feature Flags à l'aide du client OpenFeature. Tous les types d'indicateurs sont pris en charge : booléen, chaîne, entier, double et objet.

{{< tabs >}}
{{% tab "Booléen" %}}
{{< code-block lang="java" >}}
// Simple Boolean evaluation
boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}

// Get detailed evaluation result
import dev.openfeature.sdk.FlagEvaluationDetails;

FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

logger.info("Value: {}", details.getValue());
logger.info("Variant: {}", details.getVariant());
logger.info("Reason: {}", details.getReason());
{{< /code-block >}}
{{% /tab %}}

{{% tab "String" %}}
{{< code-block lang="java" >}}
// Evaluate string flags (e.g., UI themes, API endpoints)
String theme = client.getStringValue("ui.theme", "light", context);

String apiEndpoint = client.getStringValue(
    "payment.api.endpoint",
    "https://api.example.com/v1",
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Numéro" %}}
{{< code-block lang="java" >}}
// Integer flags (e.g., limits, quotas)
int maxRetries = client.getIntegerValue("retries.max", 3, context);

// Double flags (e.g., thresholds, rates)
double discountRate = client.getDoubleValue("pricing.discount.rate", 0.0, context);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Objet" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Value;

// Evaluate object/JSON flags for complex configuration
Value config = client.getObjectValue("ui.config", new Value(), context);

// Access structured data
if (config.isStructure()) {
    Value timeout = config.asStructure().getValue("timeout");
    Value endpoint = config.asStructure().getValue("endpoint");
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Gestion des erreurs {#error-handling}

Le SDK OpenFeature utilise un modèle de valeur par défaut. Si l'évaluation échoue pour une raison quelconque, la valeur par défaut que vous fournissez est renvoyée.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ErrorCode;

// Check evaluation details for errors
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

if (details.getErrorCode() != null) {
    switch (details.getErrorCode()) {
        case FLAG_NOT_FOUND:
            logger.warn("Flag does not exist: {}", "checkout.new");
            break;
        case PROVIDER_NOT_READY:
            logger.warn("Provider not initialized yet");
            break;
        case TARGETING_KEY_MISSING:
            logger.warn("Evaluation context missing targeting key");
            break;
        case TYPE_MISMATCH:
            logger.error("Flag value type doesn't match requested type");
            break;
        default:
            logger.error("Evaluation error for flag: {}", "checkout.new", details.getErrorCode());
    }
}
{{< /code-block >}}

### Codes d'erreur courants {#common-error-codes}

| Code d'erreur | Description | Résolution |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | Configuration initiale non reçue | Attendez l'initialisation du fournisseur ou utilisez `setProviderAndWait()` |
| `FLAG_NOT_FOUND` | L'indicateur n'existe pas dans la configuration | Vérifiez la clé de l'indicateur ou créez l'indicateur dans l'interface utilisateur Datadog |
| `TARGETING_KEY_MISSING` | Aucune clé de ciblage dans le contexte d'évaluation | Fournissez une clé de ciblage lors de la création du contexte |
| `TYPE_MISMATCH` | La valeur de l'indicateur ne peut pas être convertie dans le type demandé | Utilisez la méthode d'évaluation correcte pour le type d'indicateur |
| `INVALID_CONTEXT` | Le contexte d'évaluation est nul | Fournissez un contexte d'évaluation valide |

## Configuration avancée {#advanced-configuration}

Utilisez [Sources de configuration du SDK serveur][9] comme référence canonique pour la sélection de la source et les paramètres opérationnels :

- [Configurer la distribution agentless][12], y compris les paramètres d'interrogation, de délai d'expiration de requête et d'endpoints
- [Utiliser un endpoint agentless personnalisé][10] pour des tests avancés, le développement local ou un proxy géré par l'opérateur
- [Utiliser Agent Remote Configuration][13] pour conserver la distribution gérée par l'agent
- [Migrer une Remote Configuration existante][11] et supprimer le paramètre obsolète `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`

En mode agentless, Java privilégie un relais de télémétrie local compatible pour l'exposition aux expériences et les événements d'évaluation d'indicateurs agrégés. Il envoie les deux types d'événements directement lorsqu'aucun relais compatible n'est disponible. Le chemin direct utilise les paramètres `DD_API_KEY` et `DD_SITE` de l'application. Pour les environnements serverless sans agent, vous pouvez utiliser [`serverless-init`][17] comme relais de télémétrie local.

La métrique `feature_flag.evaluations` utilise la configuration OTLP distincte dans le guide [Métriques d'évaluation d'indicateurs côté serveur][8].

Pour plus d'informations sur les graphiques disponibles, consultez [Graphiques d'indicateurs de fonctionnalité](/feature_flags/concepts/flag_graphs/).

### Délai d'initialisation personnalisé {#custom-initialization-timeout}

Configurez la durée pendant laquelle le fournisseur attend la configuration initiale :

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### Événements de modification de configuration {#configuration-change-events}

Écoutez les mises à jour provenant de la source de configuration sélectionnée :

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED` est un événement OpenFeature facultatif. Consultez la documentation du fournisseur Datadog pour vérifier si cet événement est pris en charge dans votre version.

### Clients multiples {#multiple-clients}

Utilisez des clients nommés pour organiser le contexte et les indicateurs par domaine ou par équipe :

{{< code-block lang="java" >}}
// Named clients share the same provider instance but can have different contexts
Client checkoutClient = api.getClient("checkout");
Client analyticsClient = api.getClient("analytics");

// Each client can have its own evaluation context
EvaluationContext checkoutContext = new MutableContext("session-abc");
EvaluationContext analyticsContext = new MutableContext("user-123");

boolean newCheckout = checkoutClient.getBooleanValue(
    "checkout.ui.new", false, checkoutContext
);

boolean enhancedAnalytics = analyticsClient.getBooleanValue(
    "analytics.enhanced", false, analyticsContext
);
{{< /code-block >}}

L'instance `Provider` est partagée globalement. Les noms des clients sont uniquement à des fins organisationnelles et ne créent pas d'instances de fournisseur distinctes. Tous les clients utilisent le même fournisseur Datadog sous-jacent et les mêmes configurations d'indicateurs.

## Bonnes pratiques {#best-practices}

### Initialiser tôt {#initialize-early}
Initialisez le fournisseur OpenFeature le plus tôt possible dans le cycle de vie de votre application (par exemple, dans `main()` ou au démarrage de l'application). Cela permet de garantir que les indicateurs sont prêts avant l'exécution de la logique métier.

### Utilisez des valeurs par défaut significatives {#use-meaningful-default-values}
Fournissez toujours des valeurs par défaut judicieuses qui maintiennent un comportement sûr si l'évaluation de l'indicateur échoue :

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### Créez le contexte une seule fois {#create-context-once}
Créez le contexte d'évaluation une seule fois par requête/utilisateur/session et réutilisez-le pour toutes les évaluations d'indicateurs :

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

Recréer le contexte d'évaluation pour chaque évaluation d'indicateur ajoute une surcharge inutile. Créez le contexte une seule fois au début du cycle de vie de la requête, puis transmettez-le à toutes les évaluations d'indicateurs ultérieures.

### Gérez les échecs d'initialisation (facultatif) {#handle-initialization-failures-optional}
Envisagez de gérer les échecs d'initialisation si votre application peut fonctionner avec des valeurs d'indicateur par défaut :

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

Si les Feature Flags sont essentiels au fonctionnement de votre application, laissez l'exception se propager pour empêcher le démarrage.

### Utilisez des clés de ciblage cohérentes {#use-consistent-targeting-keys}
Utilisez des identifiants cohérents et stables comme clés de ciblage :
- **Bon**: User IDs, session IDs, device IDs
- **À éviter** : Horodatages, valeurs aléatoires, ID changeant fréquemment

### Surveillez l'évaluation des indicateurs {#monitor-flag-evaluation}
Utilisez les résultats d'évaluation détaillés pour la journalisation et le débogage :

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("feature.critical", false, context);

logger.info("Flag: {} | Value: {} | Variant: {} | Reason: {}",
    "feature.critical",
    details.getValue(),
    details.getVariant(),
    details.getReason()
);
{{< /code-block >}}

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le `InMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des indicateurs dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `InMemoryProvider` est fourni dans `dev.openfeature:sdk` (déjà une dépendance de portée de test), donc aucune bibliothèque supplémentaire n'est requise. Ajoutez `dev.openfeature:sdk` à votre configuration de test s'il n'est pas déjà présent.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.providers.memory.Flag;
import dev.openfeature.sdk.providers.memory.InMemoryProvider;
import java.util.Map;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckoutFlagTest {
    private Client client;

    @BeforeEach
    void setUp() {
        Map<String, Flag<?>> flags = Map.of(
            "new-checkout-flow", Flag.<Boolean>builder()
                .variant("on", true)
                .variant("off", false)
                .defaultVariant("on")
                .build(),
            "ui-theme", Flag.<String>builder()
                .variant("dark", "dark")
                .variant("light", "light")
                .defaultVariant("light")
                .build()
        );

        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new InMemoryProvider(flags));
        client = api.getClient();
    }

    @AfterEach
    void tearDown() {
        OpenFeatureAPI.getInstance().shutdown();
    }

    @Test
    void newCheckoutEnabledByDefault() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false));
    }

    @Test
    void missingFlagReturnsDefault() {
        assertFalse(client.getBooleanValue("does-not-exist", false));
    }
}
{{< /code-block >}}

`OpenFeatureAPI.getInstance()` est un singleton. Appelez toujours `shutdown()` dans `@AfterEach` (ou équivalent); sinon, l'état du fournisseur se propage entre les classes de test et entraîne des suites instables.

Dans les tests Spring Boot, enregistrez le `InMemoryProvider` via un bean `@TestConfiguration` ou dans un hook `@BeforeAll` sur une classe `@SpringBootTest` — le singleton de l'API OpenFeature persiste pendant toute la durée de vie du contexte Spring, l'initialisation ne doit donc être exécutée qu'une seule fois.

## Dépannage {#troubleshooting}

Suivez le chemin des données de l'indicateur depuis la **plateforme d'indicateurs** via la source de configuration sélectionnée jusqu'au **SDK Java**. La configuration agentless et la Remote Configuration ont des exigences différentes. Vérifiez la source active avant de dépanner la connectivité.

### 1. Plateforme d'indicateurs: Vérifiez la configuration de l'indicateur {#1-flagging-platform-verify-flag-configuration}

Avant de vérifier l'infrastructure, confirmez que l'indicateur lui-même est correctement configuré:

1. L'indicateur est **activé** pour l'environnement cible, et non désactivé. Les indicateurs sont désactivés par défaut dans chaque environnement.
2. L'indicateur cible le **bon environnement** (`DD_ENV`). Les indicateurs ne ciblent pas de services spécifiques ; ils s'appliquent à tous les services au sein de l'environnement activé.
3. Votre valeur `DD_ENV` apparaît dans [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]. S'il est absent, l'environnement n'a pas encore reçu de trafic d'indicateur.

### 2. Vérifiez la source de configuration {#2-verify-the-configuration-source}

#### Agentless {#agentless}

1. Confirmez que `dd-openfeature` et `dd-java-agent` sont en version 1.66.0 ou ultérieure. Utilisez la même version pour les deux composants.
2. Confirmez que la JVM charge `dd-java-agent` avec `-javaagent`, soit dans la commande Java, soit via `JAVA_TOOL_OPTIONS`.
3. Confirmez que `DD_FEATURE_FLAGS_ENABLED` n'est pas défini ou est défini sur `true`.
4. Confirmez que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` est défini, ou que les paramètres de la source et du fournisseur hérité ne sont pas définis.
5. Confirmez que le code de l'application initialise le fournisseur OpenFeature de Datadog.
6. Confirmez que `DD_API_KEY`, `DD_SITE` et `DD_ENV` sont configurés dans le processus de l'application.
7. Confirmez que l'application peut effectuer des requêtes HTTPS sortantes vers Datadog.
8. Activez `DD_TRACE_DEBUG=true` et vérifiez l'absence de messages d'authentification, de délai d'attente ou de charge utile mal formée provenant de l'endpoint agentless Feature Flags.

#### Agent Remote Configuration {#agent-remote-configuration}

1. Confirmez que `dd-openfeature` et `dd-java-agent` sont en version 1.66.0 ou ultérieure. Utilisez la même version pour les deux composants.
2. Confirmez que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` est défini. Pendant la fenêtre de migration, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` sélectionne également la Remote Configuration lorsqu'aucune source n'est définie.
3. Confirmez que `DD_FEATURE_FLAGS_ENABLED` n'est pas défini ou est défini sur `true`.
4. Confirmez que l'agent 7.55 ou une version ultérieure est en cours d'exécution et accessible. Consultez [APM Connection Errors][2].
5. Confirmez que Remote Configuration est activée sur l'agent. S'il est désactivé, définissez `remote_configuration.enabled: true` dans `datadog.yaml` ou `DD_REMOTE_CONFIGURATION_ENABLED=true`. Consultez [Remote Configuration][1].
6. Confirmez que `DD_API_KEY` est valide sur l'agent et appartient à l'organisation cible.
7. Confirmez que `DD_SITE` est correctement défini sur l'agent. Consultez [Agent Site Issues][3].
8. Exécutez `datadog-agent status` et examinez la section Configuration à distance. Consultez [Agent Commands][6].

### 3. SDK : Vérifiez l'état du SDK Java {#3-sdk-verify-java-sdk-state}

#### Activez la journalisation du débogage {#enable-debug-logging}

Définissez `DD_TRACE_DEBUG=true` pour activer les messages de démarrage des Feature Flags. Pour la source agentless par défaut, confirmez que l'interrogation du CDN démarre après l'initialisation du fournisseur.

Avec `remote_config`, le fournisseur utilise le pont dans l'agent Java. Un agent plus ancien produit une erreur d'initialisation du fournisseur qui indique la version d'agent requise. Il ne revient pas à la distribution par CDN.

#### Surveillez les changements d'état du fournisseur {#monitor-provider-state-changes}

Ajoutez des écouteurs d'événements tôt au démarrage de l'application pour observer les transitions du cycle de vie du fournisseur. Les écouteurs d'événements détectent les changements de connectivité après l'initialisation :

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flag provider is ready");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Feature flag provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Feature flag provider configuration is stale");
});

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Feature flag configuration updated");
});
{{< /code-block >}}

Un événement `PROVIDER_ERROR` ou `PROVIDER_STALE` après un fonctionnement normal indique une perturbation dans la source de configuration sélectionnée.

#### Fournisseur non prêt {#provider-not-ready}

`PROVIDER_NOT_READY` est renvoyé lorsqu'une évaluation d'indicateur est tentée avant que le fournisseur ne reçoive sa première configuration de la source sélectionnée.

Causes courantes :

- **Initialisation asynchrone** : `setProvider()` a été utilisé à la place de `setProviderAndWait()`. Les évaluations effectuées avant l'arrivée de la première configuration renvoient `PROVIDER_NOT_READY`.
- **Délai d'initialisation dépassé** : `setProviderAndWait()` a expiré (30 secondes par défaut) et a levé `ProviderNotReadyError`, qui a été intercepté. L'application continue d'évaluer les indicateurs en attendant la première configuration.

Si `PROVIDER_NOT_READY` persiste au-delà des intervalles d'interrogation et d'initialisation, vérifiez à nouveau la source sélectionnée.

#### Déboguez les évaluations d'indicateurs {#debug-flag-evaluations}

Si les indicateurs renvoient des valeurs inattendues, utilisez `getBooleanDetails()` au lieu de `getBooleanValue()`. La variante `Details` renvoie un objet `FlagEvaluationDetails` exposant l'état interne du fournisseur :

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("your.flag.key", false, context);

logger.info("Flag evaluation details: value={}, variant={}, reason={}, errorCode={}",
    details.getValue(),
    details.getVariant(),
    details.getReason(),
    details.getErrorCode());
{{< /code-block >}}

Consultez `reason` et `errorCode` pour comprendre pourquoi le fournisseur a renvoyé un résultat donné.

#### Erreurs de non-concordance de type {#type-mismatch-errors}

`TYPE_MISMATCH` est renvoyé lorsque la méthode d'évaluation ne correspond pas au type configuré de l'indicateur. Utilisez la méthode correcte pour chaque type d'indicateur : `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()`.

### 4. Plateforme d'indicateurs : Vérifiez que les données apparaissent dans Datadog {#4-flagging-platform-verify-data-appears-in-datadog}

<div class="alert alert-warning">Lorsqu'aucun chemin de télémétrie pris en charge n'est configuré, Java n'exporte pas les événements d'exposition ou le <code>feature_flag.evaluations</code> expérimentale. Leur absence n'indique pas que le chargement de la configuration ou l'évaluation locale a échoué.</div>

#### Métriques d'évaluation des feature flags {#flag-evaluation-metrics}

Les comptes d'évaluation d'indicateurs apparaissent dans Datadog sous forme de métrique de compteur `feature_flag.evaluations` marquée avec la clé d'indicateur, la variante de résultat et la raison de l'évaluation. Consultez <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configurer les métriques d'évaluation des feature flags côté serveur</a> pour le guide de configuration complet et les étapes de dépannage.

#### Expositions d'expériences{#experiment-exposures}

Lorsque le chemin de configuration sélectionné prend en charge les expositions, les expositions n'apparaissent que pour les feature flags associés à une expérience. Les Feature Flags standard ne génèrent pas d'événements d'exposition. Si les expositions sont manquantes :

1. Vérifiez que le feature flag est associé à une expérience dans l'interface utilisateur Datadog.
2. Vérifiez la clé d'API de l'agent et la connectivité.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration/
[2]: /fr/tracing/troubleshooting/connection_errors/
[3]: /fr/agent/troubleshooting/site/
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /fr/agent/configuration/agent-commands/
[7]: /fr/account_management/api-app-keys/#api-keys
[8]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[9]: /fr/feature_flags/concepts/configuration_sources/
[10]: /fr/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[11]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[12]: /fr/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[13]: /fr/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[14]: /fr/getting_started/site/
[15]: /fr/serverless/google_cloud_run/functions/java/?tab=maven
[16]: /fr/serverless/google_cloud_run/containers/in_container/java/
[17]: /fr/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry