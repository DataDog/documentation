---
description: Attachez automatiquement les données d'évaluation des feature flags aux
  traces APM afin que vous puissiez inspecter et filtrer les traces par flag variant.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /tracing/trace_explorer/
  tag: Documentation
  text: Trace Explorer
title: Configurer l'enrichissement des traces APM pour les Feature Flags
---
## Présentation {#overview}

L'enrichissement des traces APM joint automatiquement les données d'évaluation des feature flags à vos traces APM. Lorsqu'un feature flag est évalué au cours d'une requête tracée, le SDK enregistre quels feature flags ont été évalués et quelles variants ont été retournées. Ces données sont écrites dans le span racine et traitées côté serveur afin que vous puissiez :

- **Filtrer les traces par flag variant** dans [Trace Explorer][1] à l'aide de facettes `@feature_flags.<flag_key>:<variant>`.
- **Déboguer les problèmes liés aux feature flags** en visualisant quels feature flags étaient actifs lorsqu'une erreur s'est produite.

<div class="alert alert-warning">L'enrichissement des traces APM est expérimental et pourrait changer dans une version ultérieure.</div>

L'enrichissement des traces APM est disponible dans les SDK suivants :

| Langage | Version minimale |
| -------- | --------------- |
| Go       | 2.8.0           |
| Java     | 1.64.1          |
| Node.js  | 5.105.0         |

## Prérequis {#prerequisites}

Avant de configurer l'enrichissement des traces APM, confirmez les points suivants :

- Les feature flags côté serveur sont déjà configurés et les feature flags sont évalués dans votre application.
- [APM tracing][3] est activé et les traces sont transmises à Datadog.

## Fonctionnement de l'enrichissement des traces APM {#how-apm-trace-enrichment-works}

Lorsque l'enrichissement des traces APM est activé, le fournisseur OpenFeature de Datadog s'intègre au cycle de vie de l'évaluation :

1. Chaque fois qu'un feature flag est évalué, le SDK capture les métadonnées d'évaluation (flag serial ID, targeting key et default fallback value).
2. Les métadonnées sont accumulées sur le span racine de la trace actuelle.
3. Lorsque le span racine se termine, le SDK écrit les données accumulées sous forme de span tags compacts (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`).
4. Le backend Datadog décode ces tags et écrit des facettes `@feature_flags.<flag_key>` lisibles par l'homme dans le span, ce qui les rend consultables dans Trace Explorer.

Les tags côté SDK sont uniquement destinés au transport et sont supprimés côté serveur. Les tags visibles dans Trace Explorer sont les facettes `@feature_flags.<flag_key>` décodées.

## Activer l'enrichissement des traces APM {#enable-apm-trace-enrichment}

Définissez la variable d'environnement suivante pour activer l'enrichissement des spans :

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

La variable d'environnement d'enrichissement est prise en charge par tous les SDK côté serveur compatibles. Aucune modification de code n'est requise. L'activation de la variable active automatiquement le hook d'enrichissement lors de l'initialisation du fournisseur Datadog OpenFeature. Node.js prend également en charge la configuration au niveau du code, comme indiqué dans les onglets de langage ci-dessous.

### Configuration spécifique au langage {#language-specific-configuration}

{{< tabs >}}
{{% tab "Go" %}}

Aucune configuration de code supplémentaire n'est nécessaire. La variable d'environnement `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` active l'enrichissement des spans lors de l'initialisation de `DatadogProvider`.

{{< code-block lang="go" filename="main.go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Aucune configuration de code supplémentaire n'est nécessaire. La variable d'environnement `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` active l'enrichissement des spans. Java prend également en charge la propriété système `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true` comme alternative.

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

Vous pouvez également activer l'enrichissement des spans dans le code :

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
      spanEnrichment: {
        enabled: true,
      },
    },
  },
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Vérifier l'enrichissement des traces APM {#verify-apm-trace-enrichment}

Après le déploiement avec l'enrichissement des spans activé :

1. Déclenchez des requêtes dans votre application qui évaluent les feature flags.
2. Accédez à [Trace Explorer][1] et recherchez une trace récente de votre service.
3. Ouvrez une trace et recherchez les attributs `@feature_flags.<flag_key>` sur le span racine.

Le SDK écrit des tags encodés compacts (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`) sur le span racine. Le backend Datadog les décode et produit des facettes `@feature_flags.<flag_key>` lisibles par l'homme. Ce traitement prend quelques secondes après l'ingestion du span.

Après le traitement backend, le span racine contient des attributs tels que les exemples suivants :

| Exemple d'attribut | Exemple de valeur |
| --------- | ------------- |
| `@feature_flags.checkout-flow` | `treatment` |
| `@feature_flags.dark-mode` | `control` |

Chaque clé d'attribut est `@feature_flags.<flag_key>` et la valeur est la variante renvoyée par l'évaluation.

### Dépannage {#troubleshooting}

Si les attributs `@feature_flags.<flag_key>` n'apparaissent pas sur vos traces :

- Confirmez que l'enrichissement des spans est activé (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true`).
- Vérifiez que votre application évalue les feature flags pendant les requêtes tracées. L'enrichissement ne se produit que lorsqu'un feature flag est évalué alors qu'une trace est active.
- Attendez quelques secondes après l'ingestion du span. Les facettes `@feature_flags.<flag_key>` sont dérivées par le traitement backend et n'apparaissent pas dans les métadonnées brutes du span.
- Pour le débogage, inspectez les métadonnées brutes du span pour le tag `ffe_flags_enc`. Si ce tag est présent, le SDK émet des données d'enrichissement. Soit le backend ne l'a pas encore traité, soit le feature flag gate n'est pas activé pour votre organisation.
- Si les feature flags ne sont pas évalués du tout, consultez [Server-Side Feature Flags][2] pour la configuration et le dépannage spécifique au langage.

## Recherchez et filtrez par flag variant {#search-and-filter-by-flag-variant}

Ces exemples utilisent les facettes `@feature_flags.<flag_key>` pour filtrer les traces dans Trace Explorer:

| Cas d'utilisation | Exemple de requête |
| -------- | ------------- |
| Traces pour un flag variant spécifique | `@feature_flags.checkout-flow:treatment` |
| Erreurs sous un flag variant | `@feature_flags.checkout-flow:treatment status:error` |
| Toute trace où un feature flag a été évalué | `@feature_flags.checkout-flow:*` |
| Plusieurs feature flags sur la même requête | `@feature_flags.checkout-flow:treatment @feature_flags.new-search:enabled` |
| Limité au service et à l'environnement | `env:production service:api-gateway @feature_flags.rate-limit-v2:enabled` |

## Utilisez des traces enrichies dans Datadog {#use-enriched-traces-across-datadog}

Les attributs des feature flags sur les traces sont disponibles dans Datadog :

- **Monitors** : Alertez lorsque le nombre d'erreurs pour un flag variant spécifique dépasse un seuil afin de détecter les régressions spécifiques à ce flag variant.
- **Dashboards** : Ajoutez un widget de série temporelle comparant la latence p99 entre les flag variants en utilisant `@feature_flags.<flag_key>` comme dimension de regroupement.
- **Notebooks** : Créez un notebook d'investigation comparant les performances entre les variantes de flag de fonctionnalité.
- **Visualizations** : Utilisez la vue Top List dans Trace Explorer pour vérifier que la distribution du trafic de déploiement correspond à vos règles de ciblage.

## Limites {#limits}

Le SDK applique les limites suivantes par span pour limiter la taille de la charge utile :

| Limite | Valeur |
| ----- | ----- |
| Flag serial IDs per span | 128 à 200 (varie selon le SDK) |
| Subjects per span | 10 à 25 (varie selon le SDK) |
| Runtime default keys per span | 5 |
| Runtime default value length | 64 caractères (tronqué) |

Les évaluations dépassant ces limites sont supprimées pour ce span.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer/
[2]: /fr/feature_flags/server/
[3]: /fr/tracing/