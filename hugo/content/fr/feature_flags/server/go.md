---
description: Configurez Datadog Feature Flags pour les applications Go.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentation
  text: Traçage Go
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
title: Go Feature Flags
---
## Vue d'ensemble {#overview}

Cette page décrit comment instrumenter votre application Go avec le SDK Datadog Feature Flags. Le SDK Go s'intègre à [OpenFeature][1], un standard ouvert pour la gestion des Feature Flags, et reçoit les mises à jour des flags via Remote Configuration dans le Datadog Go tracer (`dd-trace-go`).

Ce guide explique comment installer et activer le SDK, créer un client OpenFeature et évaluer les Feature Flags dans votre application.

## Prérequis {#prerequisites}

Avant de configurer le SDK Go Feature Flags, assurez-vous de disposer des éléments suivants :

- **Datadog Agent** version 7.55 ou ultérieure avec [Remote Configuration][2] activée
- **Datadog [clé d'API][3]** configurée sur l'Agent
- **Datadog Go SDK** `dd-trace-go` version 2.4.0 ou ultérieure

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

Pour configurer `feature_flag.evaluations`, y compris la version requise du traceur et la configuration OTLP de l'Agent, consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][4]. Pour plus d'informations sur les graphiques disponibles, consultez [Graphiques des Feature Flags][5].

## Installation {#installation}

Installez le package du fournisseur Datadog OpenFeature :

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

Vous avez également besoin de l'OpenFeature Go SDK :

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Démarrez le Datadog Go tracer et enregistrez le fournisseur Datadog OpenFeature. Le Datadog Go tracer doit être démarré en premier, car il active Remote Configuration, qui transmet les configurations de flags à votre application.

### Initialisation bloquante {#blocking-initialization}

Utilisez `SetProviderAndWait` pour bloquer l'évaluation jusqu'à ce que la configuration initiale des flags soit reçue. Cela garantit que les flags sont prêts avant que votre application ne commence à traiter les requêtes.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider and wait for initialization (default 30s timeout)
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
}
{{< /code-block >}}

Pour spécifier un délai d'attente personnalisé, utilisez `SetProviderAndWaitWithContext` :

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### Initialisation non bloquante {#non-blocking-initialization}

Utilisez `SetProvider` pour enregistrer le fournisseur sans attendre. Les évaluations de flags renvoient des valeurs par défaut jusqu'à ce que la configuration soit reçue.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider without waiting
    openfeature.SetProvider(provider)

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
    // Flag evaluations return defaults until configuration is received
}
{{< /code-block >}}

## Créer un client {#create-a-client}

Créez un client OpenFeature pour évaluer les flags. Vous pouvez créer plusieurs clients avec des noms différents pour différentes parties de votre application :

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez un contexte d'évaluation qui identifie l'utilisateur ou l'entité pour le ciblage des Feature Flags. Le contexte d'évaluation inclut des attributs utilisés pour déterminer quelles variations de Feature Flags doivent être renvoyées :

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123", // Targeting key (typically user ID)
    map[string]interface{}{
        "email":   "user@example.com",
        "country": "US",
        "tier":    "premium",
        "age":     25,
    },
)
{{< /code-block >}}

La clé de ciblage est utilisée pour une distribution cohérente du trafic (déploiements progressifs). Des attributs supplémentaires permettent de définir des règles de ciblage, telles que « activer pour les utilisateurs aux États-Unis » ou « activer pour les utilisateurs de niveau premium » dans l'exemple ci-dessus.

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir configuré le fournisseur et créé un client, vous pouvez évaluer les Feature Flags dans toute votre application. L'évaluation des Feature Flags est locale et rapide : le SDK utilise des données de configuration mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée pendant l'évaluation.

Chaque Feature Flag est identifié par une clé (une chaîne unique) et peut être évalué avec une méthode typée qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `BooleanValue` pour les flags qui représentent des conditions activées/désactivées ou vrai/faux :

{{< code-block lang="go" >}}
ctx := context.Background()

enabled, err := client.BooleanValue(ctx, "new-checkout-flow", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

if enabled {
    showNewCheckout()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `StringValue` pour les flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="go" >}}
theme, err := client.StringValue(ctx, "ui-theme", "light", evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

switch theme {
case "dark":
    setDarkTheme()
case "light":
    setLightTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Feature Flags numériques {#numeric-flags}

Pour les numeric flags, utilisez `IntValue` ou `FloatValue`. Ils sont appropriés lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="go" >}}
maxItems, err := client.IntValue(ctx, "cart-max-items", 20, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

discountRate, err := client.FloatValue(ctx, "discount-rate", 0.0, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Pour les données structurées, utilisez `ObjectValue`. Ceci renvoie une valeur qui peut être type-assertée en maps ou d'autres types complexes :

{{< code-block lang="go" >}}
config, err := client.ObjectValue(ctx, "feature-config", map[string]interface{}{
    "maxRetries": 3,
    "timeout":    30,
}, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

// Type assert to access the configuration
if configMap, ok := config.(map[string]interface{}); ok {
    maxRetries := configMap["maxRetries"]
    timeout := configMap["timeout"]
    // Use configuration values
}
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du flag, utilisez les méthodes `*ValueDetails`. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

{{< code-block lang="go" >}}
details, err := client.BooleanValueDetails(ctx, "new-feature", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

fmt.Printf("Value: %v\n", details.Value)
fmt.Printf("Variant: %s\n", details.Variant)
fmt.Printf("Reason: %s\n", details.Reason)
fmt.Printf("Error: %v\n", details.Error())
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le fournisseur en mémoire d'OpenFeature pour contrôler directement les valeurs des flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. Le fournisseur en mémoire est fourni dans le module `go-sdk` en amont sous `github.com/open-feature/go-sdk/openfeature/memprovider`, aucune dépendance supplémentaire n'est donc requise.

Enregistrez le fournisseur en mémoire sous un **client nommé** plutôt que sous le fournisseur global par défaut. Le fournisseur par défaut est global au processus, ce qui interrompt `t.Parallel()` et entraîne des fuites d'état des flags entre les tests. Un client nommé limite le fournisseur à chaque test.

{{< code-block lang="go" >}}
package checkout

import (
    "context"
    "testing"

    "github.com/open-feature/go-sdk/openfeature"
    "github.com/open-feature/go-sdk/openfeature/memprovider"
)

func TestNewCheckoutFlow(t *testing.T) {
    cases := []struct {
        name string
        tier string
        want bool
    }{
        {"premium user sees new flow", "premium", true},
        {"free user sees legacy", "free", false},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            evalByTier := func(flag memprovider.InMemoryFlag, flatCtx openfeature.FlattenedContext) (any, openfeature.ProviderResolutionDetail) {
                if flatCtx["tier"] == "premium" {
                    return flag.Variants["on"], openfeature.ProviderResolutionDetail{Reason: openfeature.TargetingMatchReason, Variant: "on"}
                }
                return flag.Variants[flag.DefaultVariant], openfeature.ProviderResolutionDetail{Reason: openfeature.DefaultReason, Variant: flag.DefaultVariant}
            }

            provider := memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{
                "new-checkout-flow": {
                    State:            memprovider.Enabled,
                    DefaultVariant:   "off",
                    Variants:         map[string]any{"on": true, "off": false},
                    ContextEvaluator: &evalByTier,
                },
            })

            name := "test-" + t.Name()
            if err := openfeature.SetNamedProviderAndWait(name, provider); err != nil {
                t.Fatal(err)
            }
            t.Cleanup(func() {
                _ = openfeature.SetNamedProviderAndWait(name, openfeature.NoopProvider{})
            })

            client := openfeature.NewClient(name)
            got, err := client.BooleanValue(context.Background(), "new-checkout-flow", false, openfeature.NewEvaluationContext("user-1", map[string]any{"tier": tc.tier}))
            if err != nil {
                t.Fatal(err)
            }
            if got != tc.want {
                t.Errorf("got %v, want %v", got, tc.want)
            }
        })
    }
}
{{< /code-block >}}

`ContextEvaluator` est défini comme `*func(...)` — un pointeur vers une fonction. Définissez l'évaluateur dans une variable locale et transmettez son adresse avec `&`, comme indiqué ci-dessus. Omettez `ContextEvaluator` entièrement pour toujours renvoyer `DefaultVariant`.

[1]: https://openfeature.dev/
[2]: /fr/agent/remote_config/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /fr/feature_flags/concepts/flag_graphs/

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}