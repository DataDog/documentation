---
description: Utilisez le modèle Multi-Provider d'OpenFeature avec un fournisseur en
  mémoire pour surcharger localement les variantes de drapeaux à des fins de test.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /feature_flags/client/javascript/
  tag: Documentation
  text: Feature Flags JavaScript
- link: /feature_flags/browser_developer_extension/
  tag: Documentation
  text: Extension de développement pour navigateur
- link: https://openfeature.dev/specification/appendix-a/#multi-provider
  tag: OpenFeature
  text: Spécification Multi-Provider
- link: https://openfeature.dev/blog/openfeature-multi-provider-release/
  tag: OpenFeature
  text: Version Multi-Provider d'OpenFeature
title: Surcharges locales de feature flags avec le modèle multi-fournisseur
---
## Présentation {#overview}

Lorsque vous testez ou présentez une intégration de feature flag, vous devez souvent forcer une variante spécifique sans modifier la configuration de la feature flag dans Datadog. Le modèle [OpenFeature Multi-Provider][1] combine un `InMemoryProvider` avec votre fournisseur Datadog afin que les remplacements locaux aient la priorité, tandis que tous les autres feature flags continuent d'être résolus depuis Datadog.

Les cas d'utilisation typiques incluent :

- Assurance qualité et tests manuels de variantes spécifiques de feature flags
- Développement local sans modification de la configuration de feature flags dans l'interface utilisateur
- Démonstrations et flux de travail de support où un collègue a besoin d'une variante prévisible à la demande

<div class="alert alert-warning">Utilisez les remplacements locaux uniquement dans les environnements hors production. Restreignez ou désactivez ce modèle dans les builds de production afin que les utilisateurs finaux ne puissent pas modifier le comportement des feature flags via la configuration locale.</div>

Si votre application s'exécute dans le navigateur, l'onglet **Feature Flags** de l'[extension développeur du SDK Datadog Browser][3] offre le même comportement de remplacement local via un panneau Chrome DevTools, sans la composition de fournisseur décrite sur cette page.

## Fonctionnement des remplacements locaux des feature flags {#how-local-flag-overrides-work}

Le Multi-Provider d'OpenFeature encapsule plusieurs fournisseurs derrière un seul client. Par défaut, il utilise la stratégie _First Match_ :

1. Si le premier fournisseur renvoie une valeur pour le feature flag, cette valeur est utilisée et les fournisseurs suivants sont ignorés.
2. Si le premier fournisseur renvoie `FLAG_NOT_FOUND`, l'évaluation se poursuit avec le fournisseur suivant.
3. Datadog sert de secours pour tout feature flag absent de l'ensemble de remplacement en mémoire.

Les fournisseurs sont évalués dans l'ordre dans lequel vous les enregistrez. Placez le `InMemoryProvider` _en premier_ dans la liste des fournisseurs afin que les remplacements prévalent sur Datadog.

Pour plus de détails sur les stratégies d'évaluation, consultez la [stratégie First Match][2] dans la spécification OpenFeature.

## Exemples de remplacements côté client {#client-override-examples}

<div class="alert alert-info">Le modèle de remplacement multi-fournisseur est pris en charge sur <a href="/feature_flags/client/javascript/">JavaScript</a>, <a href="/feature_flags/client/react/">React</a>, <a href="/feature_flags/client/angular/">Angular</a>, <a href="/feature_flags/client/reactnative/">React Native</a>, <a href="/feature_flags/client/ios/">iOS</a> et <a href="/feature_flags/client/android/">Android</a>. Sur les SDK iOS et Android, <code>MultiProvider</code> est disponible, mais les SDK OpenFeature ne fournissent pas de fournisseur en mémoire intégré. Implémentez un petit fournisseur personnalisé <code>FeatureProvider</code> à la place, comme indiqué dans la documentation de test <a href="/feature_flags/client/ios/#testing">iOS</a> et <a href="/feature_flags/client/android/#testing">Android</a>.</div>

Les exemples suivants utilisent JavaScript dans le navigateur et montrent deux méthodes courantes pour renseigner les remplacements. Adaptez la fonction `loadOverrides` pour qu'elle corresponde à la manière dont votre équipe préfère définir les remplacements, ou au mécanisme de stockage disponible sur votre plateforme (par exemple, <code>UserDefaults</code> sur iOS ou <code>SharedPreferences</code> sur Android).

### Paramètres de requête d'URL {#url-query-parameters}

Lire les remplacements à partir de l'URL de la page au démarrage. Cette approche est utile lorsque l'assurance qualité ou le support doit partager un lien qui force des variantes spécifiques :

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_QUERY_PREFIX = 'ff.';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};
  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params.entries()) {
    if (!key.startsWith(OVERRIDE_QUERY_PREFIX)) continue;
    const flagKey = key.slice(OVERRIDE_QUERY_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

Un testeur pourrait ajouter `?ff.checkout_new=true&ff.ui_theme=dark` à l'URL de la page pour forcer ces variantes.

### localStorage {#localstorage}

Conserver les remplacements lors des rechargements de page en lisant à partir de `localStorage`. Cette approche est utile lorsqu'un développeur active des feature flags à partir d'un panneau de débogage local :

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_STORAGE_KEY = 'ff_overrides';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

Définissez les remplacements à partir d'un panneau de débogage ou de la console du navigateur, puis rechargez la page :

{{< code-block lang="javascript" >}}
localStorage.setItem('ff_overrides', JSON.stringify({
  checkout_new: true,
  ui_theme: 'dark',
}));
{{< /code-block >}}

## Exemples de remplacements côté serveur {#server-override-examples}

Sur le serveur, remplissez le fournisseur en mémoire au démarrage du processus à partir de toute source locale. Les variables d'environnement et les cartes de configuration statiques sont deux approches courantes.

<div class="alert alert-info">L'utilitaire Multi-Provider est disponible dans les SDK OpenFeature <a href="/feature_flags/server/nodejs/">Node.js</a>, <a href="/feature_flags/server/go/">Go</a>, <a href="/feature_flags/server/java/">Java</a>, <a href="/feature_flags/server/php/">PHP</a> et <a href="/feature_flags/server/dotnet/">.NET</a>.</div>

### Variables d'environnement {#environment-variables}

Lisez les remplacements à partir des variables d'environnement au démarrage. Cette approche est utile pour les exécutions locales ponctuelles ou les tâches CI qui nécessitent une variante spécifique :

{{< tabs >}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { MultiProvider, OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';
import tracer from 'dd-trace';

const OVERRIDE_ENV_PREFIX = 'FF_';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith(OVERRIDE_ENV_PREFIX) || value === undefined) continue;
    const flagKey = key.slice(OVERRIDE_ENV_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags() {
  tracer.init();

  const overrideProvider = new TypedInMemoryProvider(
    buildInMemoryFlags(loadOverrides()),
  );

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: overrideProvider },
      { provider: tracer.openfeature },
    ]),
  );
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Go" %}}

<div class="alert alert-info">Le package Go Multi-Provider est expérimental et peut changer dans les futures versions.</div>

{{< code-block lang="go" >}}
const overrideEnvPrefix = "FF_"

func loadOverrides() map[string]any {
    overrides := make(map[string]any)

    for _, entry := range os.Environ() {
        parts := strings.SplitN(entry, "=", 2)
        if len(parts) != 2 || !strings.HasPrefix(parts[0], overrideEnvPrefix) {
            continue
        }
        flagKey := strings.TrimPrefix(parts[0], overrideEnvPrefix)
        if flagKey != "" {
            overrides[flagKey] = parts[1]
        }
    }

    return overrides
}

func buildInMemoryFlags(overrides map[string]any) map[string]memprovider.InMemoryFlag {
    flags := make(map[string]memprovider.InMemoryFlag, len(overrides))

    for flagKey, value := range overrides {
        flags[flagKey] = memprovider.InMemoryFlag{
            State:          memprovider.Enabled,
            DefaultVariant: "forced",
            Variants:       map[string]any{"forced": value},
        }
    }

    return flags
}

func initializeFeatureFlags() error {
    tracer.Start()
    defer tracer.Stop()

    datadogProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        return err
    }
    defer datadogProvider.Shutdown()

    overrideProvider := memprovider.NewInMemoryProvider(buildInMemoryFlags(loadOverrides()))

    multiProvider, err := multi.NewProvider(
        multi.StrategyFirstMatch,
        multi.WithProvider("overrides", overrideProvider),
        multi.WithProvider("datadog", datadogProvider),
    )
    if err != nil {
        return err
    }

    return openfeature.SetProviderAndWait(multiProvider)
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">L'API Java Multi-Provider est expérimentale et peut changer dans les futures versions.</div>

{{< code-block lang="java" >}}
private static final String OVERRIDE_ENV_PREFIX = "FF_";

private static Map<String, Object> loadOverrides() {
    Map<String, Object> overrides = new HashMap<>();

    for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
        String key = entry.getKey();
        if (!key.startsWith(OVERRIDE_ENV_PREFIX)) {
            continue;
        }
        String flagKey = key.substring(OVERRIDE_ENV_PREFIX.length());
        if (!flagKey.isEmpty()) {
            overrides.put(flagKey, entry.getValue());
        }
    }

    return overrides;
}

private static Map<String, Flag<?>> buildInMemoryFlags(Map<String, Object> overrides) {
    Map<String, Flag<?>> flags = new HashMap<>();

    for (Map.Entry<String, Object> entry : overrides.entrySet()) {
        Object value = entry.getValue();
        Flag.Builder<?> builder = Flag.builder().defaultVariant("forced");

        if (value instanceof Boolean boolValue) {
            builder.variant("forced", boolValue);
        } else if (value instanceof Number numberValue) {
            builder.variant("forced", numberValue.doubleValue());
        } else {
            builder.variant("forced", value.toString());
        }

        flags.put(entry.getKey(), builder.build());
    }

    return flags;
}

public static void initializeFeatureFlags() throws Exception {
    InMemoryProvider overrideProvider = new InMemoryProvider(buildInMemoryFlags(loadOverrides()));
    Provider datadogProvider = new Provider();

    MultiProvider multiProvider = new MultiProvider(
        List.of(overrideProvider, datadogProvider)
    );

    OpenFeatureAPI api = OpenFeatureAPI.getInstance();
    api.setProviderAndWait(multiProvider);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Définissez `FF_checkout_new=true` et `FF_ui_theme=dark` dans l'environnement avant de démarrer le processus pour forcer ces variantes.

## Évaluer les Feature Flags {#evaluate-flags}

Après l'initialisation, évaluez les feature flags via le client OpenFeature comme d'habitude. Les feature flags surchargés renvoient la valeur forcée ; tous les autres feature flags sont résolus à partir de Datadog.

{{< tabs >}}
{{% tab "Browser" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Serveur" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = await client.getBooleanValue('checkout_new', false, {
  targetingKey: req.session?.userID ?? 'unknown',
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/appendix-a/#multi-provider
[2]: https://openfeature.dev/specification/appendix-a/#first-match-strategy
[3]: /fr/feature_flags/browser_developer_extension/