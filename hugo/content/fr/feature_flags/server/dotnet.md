---
description: Configurez Datadog Feature Flags pour les applications .NET.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/dd_libraries/dotnet-core/
  tag: Documentation
  text: Traçage .NET
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
title: .NET Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application .NET avec le Datadog Feature Flags SDK. Le SDK .NET s'intègre à [OpenFeature][1], un standard ouvert pour la gestion des Feature Flags, et reçoit les mises à jour des flags via Remote Configuration dans le Datadog .NET tracer (`dd-trace-dotnet`).

Ce guide explique comment installer et activer le SDK, créer un client OpenFeature et évaluer les Feature Flags dans votre application.

## Prérequis {#prerequisites}

Avant de configurer le Datadog Feature Flags SDK, assurez-vous de disposer de :

- **Datadog Agent** version 7.55 ou ultérieure avec [Remote Configuration][2] activée
- **Datadog [API key][5]** configurée sur l'Agent
- **Datadog .NET SDK** (`dd-trace-dotnet`):
  - Version 3.36.0 ou ultérieure pour .NET 6+
  - Version 3.38.0 ou ultérieure pour .NET Framework 4.6.2+

Définissez les variables d'environnement suivantes :

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

<div class="alert alert-info">Le <code>EXPERIMENTAL_</code> Le préfixe est conservé pour la rétrocompatibilité ; le provider lui-même est stable.</div>

Pour configurer `feature_flag.evaluations`, y compris la version requise du traceur et la configuration OTLP de l'Agent, consultez [Set Up Server-Side Flag Evaluation Metrics][6]. Pour plus d'informations sur les graphiques disponibles, consultez [Feature Flag Graphs][7].

## Installation {#installation}

Installez le Datadog .NET SDK [3] et l'OpenFeature SDK [4] à l'aide de NuGet :

{{< code-block lang="bash" >}}
dotnet add package Datadog.FeatureFlags.OpenFeature
dotnet add package OpenFeature
{{< /code-block >}}

Ou ajoutez-les à votre fichier `.csproj` :

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="Datadog.FeatureFlags.OpenFeature" />
  <PackageReference Include="OpenFeature" />
</ItemGroup>
{{< /code-block >}}

Si vous activez les métriques d'évaluation des Feature Flags, vous devez également installer le SDK OpenTelemetry et l'exportateur OTLP :

{{< code-block lang="bash" >}}
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
{{< /code-block >}}

Ou ajoutez-les à votre fichier `.csproj` :

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="OpenTelemetry" />
  <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" />
</ItemGroup>
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Enregistrez le provider Datadog OpenFeature auprès de l'API OpenFeature. Le fournisseur se connecte au Remote Configuration du traceur .NET de Datadog pour recevoir les configurations des flags.

### Initialisation bloquante {#blocking-initialization}

Utilisez `SetProviderAsync` avec `await` pour bloquer l'évaluation jusqu'à ce que la configuration initiale du flag soit reçue. Cela garantit que les flags sont prêts avant que votre application ne commence à traiter les requêtes.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
{{< /code-block >}}

### Initialisation non bloquante {#non-blocking-initialization}

Utilisez `SetProvider` pour enregistrer le fournisseur sans attendre. Les évaluations de flags renvoient des valeurs par défaut jusqu'à ce que la configuration soit reçue.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
// Flag evaluations return defaults until configuration is received
{{< /code-block >}}

## Créer un client {#create-a-client}

Créez un client OpenFeature pour évaluer les flags. Vous pouvez créer plusieurs clients avec des noms différents pour différentes parties de votre application :

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez un contexte d'évaluation qui identifie l'utilisateur ou l'entité pour le ciblage des Feature Flags. Le contexte d'évaluation inclut des attributs utilisés pour déterminer quelles variations de Feature Flags doivent être renvoyées :

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")  // Targeting key (typically user ID)
    .Set("email", "user@example.com")
    .Set("country", "US")
    .Set("tier", "premium")
    .Set("age", 25)
    .Build();
{{< /code-block >}}

**Remarque :** Dans les applications côté serveur, créez le contexte d'évaluation une fois par requête en fonction de l'utilisateur actuel, puis transmettez le même contexte à toutes les évaluations des flags au sein de cette requête. Ne reconstruisez le contexte que si les attributs de l'utilisateur changent.

La clé de ciblage est utilisée pour une distribution cohérente du trafic (déploiements progressifs). Des attributs supplémentaires permettent de définir des règles de ciblage, telles que « activer pour les utilisateurs aux États-Unis » ou « activer pour les utilisateurs de niveau premium » dans l'exemple ci-dessus.

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir configuré le fournisseur et créé un client, vous pouvez évaluer les Feature Flags dans toute votre application. L'évaluation des Feature Flags est locale et rapide : le SDK utilise des données de configuration mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée pendant l'évaluation.

Chaque Feature Flag est identifié par une clé (une chaîne unique) et peut être évalué avec une méthode typée qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `GetBooleanValueAsync` pour les flags qui représentent des conditions activé/désactivé ou vrai/faux :

{{< code-block lang="csharp" >}}
var enabled = await client.GetBooleanValueAsync("new-checkout-flow", false, evalCtx);

if (enabled)
{
    ShowNewCheckout();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `GetStringValueAsync` pour les flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="csharp" >}}
var theme = await client.GetStringValueAsync("ui-theme", "light", evalCtx);

switch (theme)
{
    case "dark":
        SetDarkTheme();
        break;
    case "light":
        SetLightTheme();
        break;
    default:
        SetLightTheme();
        break;
}
{{< /code-block >}}

### Feature Flags numériques {#numeric-flags}

Pour les flags numériques, utilisez `GetIntegerValueAsync` ou `GetDoubleValueAsync`. Ils sont appropriés lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Pour les données structurées, utilisez `GetObjectValueAsync`. Ceci renvoie une valeur qui peut être utilisée pour accéder à une configuration complexe :

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var defaultConfig = new Value(new Structure(new Dictionary<string, Value>
{
    ["maxRetries"] = new Value(3),
    ["timeout"] = new Value(30)
}));

var config = await client.GetObjectValueAsync("feature-config", defaultConfig, evalCtx);

// Access configuration values
var maxRetries = config.AsStructure?["maxRetries"].AsInteger ?? 3;
var timeout = config.AsStructure?["timeout"].AsInteger ?? 30;
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du flag, utilisez les méthodes `*DetailsAsync`. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

{{< code-block lang="csharp" >}}
var details = await client.GetBooleanDetailsAsync("new-feature", false, evalCtx);

Console.WriteLine($"Value: {details.Value}");
Console.WriteLine($"Variant: {details.Variant}");
Console.WriteLine($"Reason: {details.Reason}");
Console.WriteLine($"Error Type: {details.ErrorType}");
Console.WriteLine($"Error Message: {details.ErrorMessage}");
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## En attente de l'initialisation du fournisseur {#waiting-for-provider-initialization}

Par défaut, le fournisseur s'initialise de manière asynchrone et les évaluations de flags renvoient des valeurs par défaut jusqu'à ce que la première charge utile de Remote Configuration soit reçue. Si votre application nécessite que les flags soient prêts avant de traiter les requêtes, vous pouvez attendre que le fournisseur s'initialise en utilisant des gestionnaires d'événements :

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Constant;

var taskCompletionSource = new TaskCompletionSource<bool>();

// Register event handler
Api.Instance.AddHandler(ProviderEventTypes.ProviderReady, (eventDetails) =>
{
    Console.WriteLine("Provider is ready");
    taskCompletionSource.SetResult(true);
});

Api.Instance.AddHandler(ProviderEventTypes.ProviderError, (eventDetails) =>
{
    Console.WriteLine($"Provider error: {eventDetails.Message}");
    taskCompletionSource.SetResult(false);
});

// Set provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Wait for provider to be ready (with timeout)
var timeout = Task.Delay(TimeSpan.FromSeconds(30));
var completedTask = await Task.WhenAny(taskCompletionSource.Task, timeout);

if (completedTask == timeout)
{
    Console.WriteLine("Provider initialization timed out");
}

// Create client and evaluate flags
var client = Api.Instance.GetClient();
{{< /code-block >}}

## Nettoyage {#cleanup}

Lorsque votre application se ferme, arrêtez l'API OpenFeature pour libérer les ressources :

{{< code-block lang="csharp" >}}
await Api.Instance.ShutdownAsync();
{{< /code-block >}}

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le `InMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des indicateurs dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `InMemoryProvider` est fourni dans le package NuGet `OpenFeature` (espace de noms `OpenFeature.Providers.Memory`), donc aucune dépendance supplémentaire n'est requise au-delà de ce qui est déjà installé pour la production.

`Api.Instance` est un singleton. Utilisez `IAsyncLifetime` de xUnit pour définir le fournisseur par test et le supprimer dans `DisposeAsync`, ce qui évite les tests dépendants de l'ordre. Pour des suites plus rapides qui partagent la configuration, utilisez `InMemoryProvider.UpdateFlagsAsync(...)` pour modifier l'état du flag entre les tests sans réenregistrer le fournisseur.

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Model;
using OpenFeature.Providers.Memory;
using Xunit;

public class CheckoutFlagTests : IAsyncLifetime
{
    private FeatureClient _client = null!;

    public async Task InitializeAsync()
    {
        var flags = new Dictionary<string, Flag>
        {
            ["new-checkout-flow"] = new Flag<bool>(
                variants: new Dictionary<string, bool> { ["on"] = true, ["off"] = false },
                defaultVariant: "on"),
            ["ui-theme"] = new Flag<string>(
                variants: new Dictionary<string, string> { ["dark"] = "dark", ["light"] = "light" },
                defaultVariant: "light",
                contextEvaluator: ctx =>
                    ctx.GetValue("tier")?.AsString == "premium" ? "dark" : "light"),
        };

        await Api.Instance.SetProviderAsync(new InMemoryProvider(flags));
        _client = Api.Instance.GetClient("test");
    }

    public Task DisposeAsync() => Api.Instance.ShutdownAsync();

    [Fact]
    public async Task NewCheckoutEnabledByDefault()
    {
        Assert.True(await _client.GetBooleanValueAsync("new-checkout-flow", false));
    }

    [Fact]
    public async Task PremiumUserGetsDarkTheme()
    {
        var ctx = EvaluationContext.Builder()
            .SetTargetingKey("u1")
            .Set("tier", "premium")
            .Build();
        Assert.Equal("dark", await _client.GetStringValueAsync("ui-theme", "light", ctx));
    }
}
{{< /code-block >}}

Le même modèle s'applique à NUnit (`[SetUp]`/`[TearDown]`) et MSTest (`[TestInitialize]`/`[TestCleanup]`). Pour les tests d'intégration ASP.NET Core, enregistrez le `InMemoryProvider` dans `WebApplicationFactory.ConfigureTestServices` avant le démarrage de l'application.

Pour éviter de coupler les tests aux composants internes du SDK, préférez remplacer par `InMemoryProvider` plutôt que de simuler le fournisseur Datadog avec Moq ou des bibliothèques similaires.

## Dépannage {#troubleshooting}

### Fournisseur non activé {#provider-not-enabled}

Si vous recevez des avertissements indiquant que le fournisseur n'est pas activé, assurez-vous que `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` est défini dans votre environnement ou votre configuration d'application :

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

Pour les applications conteneurisées, ajoutez ceci à votre configuration Docker ou Kubernetes :

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
environment:
  - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
  - DD_SERVICE=my-service
  - DD_ENV=production
{{< /code-block >}}

### Remote Configuration ne fonctionne pas {#remote-configuration-not-working}

Vérifiez les points suivants pour vous assurer que Remote Configuration fonctionne :
- L'agent Datadog est à la [version requise](#prerequisites)
- Remote Configuration est activé sur l'Agent
- `DD_SERVICE` et `DD_ENV` variables d'environnement sont définies
- Le SDK peut communiquer avec l'Agent

### Erreurs d'évaluation asynchrone {#async-evaluation-errors}

Le SDK OpenFeature .NET utilise des méthodes asynchrones pour toutes les évaluations des flags. Assurez-vous d'utiliser `await` ou de gérer correctement le `Task` renvoyé :

{{< code-block lang="csharp" >}}
// Correct: Using await
var enabled = await client.GetBooleanValueAsync("flag-key", false, context);

// Incorrect: Not awaiting (will not work as expected)
var enabled = client.GetBooleanValueAsync("flag-key", false, context);
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /fr/agent/remote_config/
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.FeatureFlags.OpenFeature
[5]: /fr/account_management/api-app-keys/#api-keys
[6]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[7]: /fr/feature_flags/concepts/flag_graphs/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}