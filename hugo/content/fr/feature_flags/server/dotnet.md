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

Cette page décrit comment instrumenter votre application .NET avec le Datadog Feature Flags SDK. Le SDK .NET s'intègre à [OpenFeature][1], une norme ouverte pour la gestion des feature flags, et utilise le Datadog .NET tracer (`dd-trace-dotnet`) pour recevoir les mises à jour des feature flags depuis le CDN géré ou Agent Remote Configuration.

À partir de la version 3.54.0 du traceur, les nouvelles configurations chargent par défaut la configuration des feature flags depuis le CDN géré par Datadog. Ce guide explique comment installer le SDK, créer un client OpenFeature et évaluer les feature flags dans votre application.

<div class="alert alert-warning">Dans la version 3.54.0, le mode sans agent modifie uniquement la configuration des feature flags. Les événements d'exposition des expérimentations nécessitent toujours un Agent local compatible ou un relais de télémétrie ; le recours direct au proxy de la plateforme d'événements (EVP) n'est pas pris en charge. Les métriques d'évaluation nécessitent un chemin d'exportation OpenTelemetry configuré séparément. Sans chemin de télémétrie, seuls la distribution de la configuration et l'évaluation locale des feature flags fonctionnent.</div>

## Prérequis {#prerequisites}

Pour une distribution de configuration sans agent, installez le traceur .NET Datadog version **3.54.0 ou ultérieure** et `Datadog.FeatureFlags.OpenFeature` version **2.3.1 ou ultérieure**. Le traceur doit être chargé avec l'[instrumentation automatique][8] ; l'installation du fournisseur OpenFeature seul ne suffit pas. Un Datadog Agent distinct n'est pas requis pour récupérer la configuration des feature flags.

Définissez ces variables d'environnement dans le processus de l'application avant le démarrage :

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Utilisez une [clé d'API][5] Datadog et le site qui héberge votre organisation, tel que `datadoghq.com`. Aucune activation des Feature Flags ni aucun paramètre de source n'est requis pour une nouvelle configuration. Initialisez le fournisseur OpenFeature Datadog dans votre application pour commencer l'interrogation ; l'installation ou l'initialisation du traceur seul ne lance pas l'interrogation du CDN. Les évaluations utilisent une configuration mise en cache localement et n'effectuent pas de requêtes réseau.

Les métriques d'évaluation des feature flags utilisent un pipeline OpenTelemetry configuré séparément ; l'activation de la distribution par CDN ne configure pas l'exportation des métriques. Consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][6] et [Graphiques des Feature Flags][7].

### Utilisez Agent Remote Configuration {#use-agent-remote-configuration}

Pour une distribution basée sur l'Agent, utilisez Datadog Agent 7.55 ou une version ultérieure avec [Remote Configuration][2] activé et une clé d'API configurée sur l'Agent. Les versions minimales du traceur sont 3.36.0 pour .NET 6+ et 3.38.0 pour .NET Framework 4.6.2+.

Avec le traceur 3.54.0 ou une version ultérieure, sélectionnez explicitement la source :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Les versions antérieures du traceur utilisent `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`. Dans la version 3.54.0, ce paramètre obsolète préserve Remote Configuration lorsque ni le nouveau paramètre d'activation ni une source explicite ne sont fournis. Pour migrer, supprimez le paramètre hérité, configurez les informations d'identification de l'application ci-dessus et définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` si vous sélectionnez déjà une source explicitement. `DD_FEATURE_FLAGS_ENABLED=false` désactive les Feature Flags, quelle que soit la source sélectionnée.

Consultez [Configuration Sources][9] pour les paramètres d'interrogation, de délai d'attente de requête, d'endpoint personnalisé et de migration. L'intervalle d'interrogation sans agent par défaut est de 30 secondes, le délai d'attente de la requête est de 5 secondes et l'initialisation du fournisseur attend jusqu'à 30 secondes pour la première configuration.

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

Enregistrez le provider Datadog OpenFeature auprès de l'API OpenFeature. Le fournisseur active la source de configuration sélectionnée dans le traceur .NET de Datadog.

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

Par défaut, le fournisseur s'initialise de manière asynchrone et les évaluations des feature flags renvoient des valeurs par défaut jusqu'à ce que la première configuration de feature flags soit reçue. Si votre application nécessite que les flags soient prêts avant de traiter les requêtes, vous pouvez attendre que le fournisseur s'initialise en utilisant des gestionnaires d'événements :

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

### La configuration Agentless ne fonctionne pas {#agentless-configuration-not-working}

- Vérifiez que le traceur 3.54.0 ou une version ultérieure est chargé et que le fournisseur OpenFeature est initialisé.
- Vérifiez `DD_API_KEY`, `DD_SITE` et `DD_ENV` dans le processus de l'application.
- Confirmez que `DD_FEATURE_FLAGS_ENABLED` n'est pas `false`. Laissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` non défini pour une nouvelle configuration, ou définissez-le explicitement sur `agentless`. Supprimez le paramètre hérité `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` lors de la migration.
- Autorisez le trafic HTTPS sortant vers `ufc-server.ff-cdn.<DD_SITE>`.
- Activez `DD_TRACE_DEBUG=true` et vérifiez les logs du traceur pour détecter les erreurs d'authentification, de délai d'attente ou de configuration incorrecte.

Avant la première configuration valide, les évaluations renvoient les valeurs par défaut de l'appelant. Après une initialisation réussie, les échecs de livraison transitoires conservent la dernière configuration valide.

### Remote Configuration ne fonctionne pas {#remote-configuration-not-working}

Vérifiez les points suivants pour vous assurer que Remote Configuration fonctionne :
- Le Datadog Agent est à la [version requise](#prerequisites)
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
[8]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[9]: /fr/feature_flags/concepts/configuration_sources/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}