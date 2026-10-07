---
description: Configurez les Feature Flags Datadog pour les applications Ruby.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
  tag: Documentation
  text: Traçage Ruby
- link: /tracing/
  tag: Documentation
  text: Découvrez l'Application Performance Monitoring (APM)
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
title: Ruby Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application Ruby avec le Datadog Feature Flags SDK. Le Ruby SDK s'intègre à [OpenFeature][3], une norme ouverte pour la gestion des Feature Flags, et reçoit les mises à jour des flags via Remote Configuration dans le traceur Datadog pour Ruby (`datadog` gem).

## Prérequis {#prerequisites}

Avant de configurer le Ruby Feature Flags SDK, assurez-vous de disposer des éléments suivants :

- **Datadog Agent** version 7.55 ou ultérieure avec [Remote Configuration][1] activé
- **[Clé d'API][4] Datadog** configurée sur l'Agent
- **Datadog Ruby SDK** `datadog` version 2.24.0 ou ultérieure
- **Ruby runtime** version 3.1 ou ultérieure pour utiliser l'intégration complète Datadog Feature Flags OpenFeature
- **OpenFeature Ruby SDK** `openfeature-sdk` version 0.5.1 ou ultérieure pour la prise en charge des hooks de fournisseur, de la journalisation d'exposition et des métriques d'évaluation des Feature Flags
- **Gems de métriques OpenTelemetry** pour les [métriques d'évaluation des Feature Flags][5] : `opentelemetry-metrics-sdk` version 0.8.0 ou ultérieure, et `opentelemetry-exporter-otlp-metrics` version 0.4.0 ou ultérieure
- **Service et environnement configurés** - Les Feature Flags sont ciblés par service et par environnement
- **Système d'exploitation pris en charge** - La prise en charge en production est limitée aux [systèmes d'exploitation Linux][2]. macOS et Windows ne sont pas des cibles de production prises en charge nativement, mais les environnements Linux conteneurisés avec Docker exécutés sur ces systèmes d'exploitation le sont. Pour le développement local sur macOS, vous pouvez utiliser un artefact natif préconstruit compatible lorsqu'il est disponible.

<div class="alert alert-info">Le traceur Datadog pour Ruby prend en charge des Ruby runtime plus anciens pour APM. Les applications sur des versions Ruby plus anciennes, y compris Ruby 2.5, peuvent continuer à utiliser Datadog APM, mais ne peuvent pas utiliser Datadog Feature Flags via OpenFeature tant qu'elles ne sont pas mises à niveau vers Ruby 3.1 ou une version ultérieure. Les versions de l'OpenFeature Ruby SDK qui exposent la surface des hooks du fournisseur, requise pour une télémétrie complète des Feature Flags, nécessitent Ruby 3.1 ou une version ultérieure.</div>

## Installation et initialisation de {#installing-and-initializing}

Le Feature Flagging est fourni par Application Performance Monitoring (APM). Pour intégrer APM à votre application avec la prise en charge du Feature Flagging, installez les gems requis et configurez [Remote Configuration] avec la prise en charge d'OpenFeature.

```shell
gem install datadog openfeature-sdk
```

Pour émettre des métriques d'évaluation d'indicateurs, ajoutez les gems de métriques OpenTelemetry à votre bundle d'application :

```ruby
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
```

Vous pouvez activer les Feature Flags avec des variables d'environnement :

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
```

<div class="alert alert-info">Le <code>EXPERIMENTAL_</code> Le préfixe est conservé pour la rétrocompatibilité ; le provider lui-même est stable.</div>

Consultez <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configurer les métriques d'évaluation des Feature Flags côté serveur</a> pour activer la métrique <code>feature_flag.evaluations</code> expérimentale. Consultez <a href="/feature_flags/concepts/flag_graphs/">Feature Flag Graphs</a> pour plus d'informations sur les graphiques disponibles.

Ou activez le fournisseur dans le code :

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

INITIALIZATION_TIMEOUT = 30

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.remote.boot_timeout_seconds = INITIALIZATION_TIMEOUT
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider and wait for initialization
OpenFeature::SDK.configure do |config|
  config.set_provider_and_wait(
    Datadog::OpenFeature::Provider.new,
    timeout: INITIALIZATION_TIMEOUT
  )
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

L'utilisation de `set_provider_and_wait` empêche votre application de continuer jusqu'à ce que le fournisseur soit entièrement initialisé ou que le délai d'attente soit atteint. Cela garantit que les flags sont prêts avant que votre application ne commence à traiter les requêtes. Si vous préférez une initialisation non bloquante, utilisez `set_provider` à la place. Si vous le faites, le client renvoie des valeurs par défaut jusqu'à ce que [Remote Configuration] se charge en arrière-plan.

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez un contexte d'évaluation qui identifie l'utilisateur ou l'entité pour le ciblage des Feature Flags. Le contexte d'évaluation inclut des attributs utilisés pour déterminer quelles variations de Feature Flags doivent être renvoyées :

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

La clé de ciblage est utilisée pour une distribution cohérente du trafic (déploiements progressifs). Des attributs supplémentaires permettent de définir des règles de ciblage, telles que « activer pour les utilisateurs aux États-Unis » ou « activer pour les utilisateurs de niveau premium » dans l'exemple ci-dessus.

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir créé le client `OpenFeature`, vous pouvez commencer à lire les valeurs des Feature Flags dans toute votre application. L'évaluation des Feature Flags utilise des données mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée lors de leur évaluation.

Chaque Feature Flag est identifié par une _clé_ unique. Les Feature Flags sont évalués à l'aide de méthodes typées qui renvoient des valeurs correspondant au type attendu. Le SDK renvoie la valeur par défaut si un Feature Flag n'existe pas ou ne peut pas être évalué.

### Feature Flags booléens {#boolean-flags}

Utilisez `fetch_boolean_value()` pour les Feature Flags qui représentent des conditions activé/désactivé ou vrai/faux :

```ruby
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout-flow',
  default_value: false,
  evaluation_context: context
)

if enabled
  show_new_checkout
else
  show_legacy_checkout
end
```

### Feature Flags de chaîne {#string-flags}

Utilisez `fetch_string_value()` pour les Feature Flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

```ruby
theme = client.fetch_string_value(
  flag_key: 'ui-theme',
  default_value: 'light',
  evaluation_context: context
)

case theme
when 'dark'
  set_dark_theme
when 'light'
  set_light_theme
else
  set_light_theme
end
```

### Indicateurs numériques {#number-flags}

Pour les Feature Flags numériques, utilisez `fetch_integer_value()` ou `fetch_float_value()` : Ruby fournit également `fetch_number_value()`, qui renvoie le type approprié en fonction de la valeur par défaut. Ces méthodes sont appropriées lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

```ruby
max_items = client.fetch_integer_value(
  flag_key: 'cart-max-items',
  default_value: 20,
  evaluation_context: context
)

discount_rate = client.fetch_float_value(
  flag_key: 'discount-rate',
  default_value: 0.0,
  evaluation_context: context
)

# Generic number method (type based on default)
batch_size = client.fetch_number_value(
  flag_key: 'batch-size',
  default_value: 100,  # Returns integer
  evaluation_context: context
)
```

### Indicateurs d'objet {#object-flags}

Pour les données structurées, utilisez `fetch_object_value()`. Cette méthode renvoie une table de hachage. Les Object flags sont utiles pour les scénarios de [Remote Configuration] où plusieurs propriétés doivent être fournies ensemble.

```ruby
config = client.fetch_object_value(
  flag_key: 'feature-config',
  default_value: {
    'maxRetries' => 3,
    'timeout' => 30
  },
  evaluation_context: context
)

max_retries = config['maxRetries'] || 3
timeout = config['timeout'] || 30
```

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la valeur d'un Feature Flag, utilisez les méthodes `fetch_<type>_details`. Ces méthodes renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

```ruby
details = client.fetch_boolean_details(
  flag_key: 'new-feature',
  default_value: false,
  evaluation_context: context
)

puts "Value: #{details.value}"
puts "Variant: #{details.variant}"
puts "Reason: #{details.reason}"
puts "Error Code: #{details.error_code}"
puts "Error Message: #{details.error_message}"
```

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Évaluation sans contexte {#evaluation-without-context}

Vous pouvez évaluer des Feature Flags sans fournir de contexte d'évaluation. Ceci est utile pour les Feature Flags globaux qui ne nécessitent pas de ciblage spécifique à l'utilisateur :

```ruby
# Global feature flag - no context needed
maintenance_mode = client.fetch_boolean_value(
  flag_key: 'maintenance-mode',
  default_value: false
)

if maintenance_mode
  halt 503, { error: 'Service temporarily unavailable' }.to_json
end
```

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `Datadog::OpenFeature::Provider` réel, ou le remplacer par le `InMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des Feature Flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `InMemoryProvider` est fourni avec `openfeature-sdk`, aucune gem supplémentaire n'est donc requise.

Le `InMemoryProvider` du SDK Ruby prend un hash simple de clés de Feature Flags associées à des valeurs — les variantes et les règles de ciblage ne sont pas prises en charge. Le fournisseur OpenFeature est défini sur un singleton global au processus. Par conséquent, les tests qui remplacent le fournisseur doivent le restaurer lors du nettoyage pour éviter de divulguer l'état des Feature Flags entre les exemples. Un hook `around` gère proprement la configuration, la restauration et les exceptions dans un seul bloc.

```ruby
# spec/support/feature_flags.rb
require 'open_feature/sdk'
require 'open_feature/sdk/provider/in_memory_provider'

RSpec.configure do |config|
  config.around(:each, :feature_flags) do |example|
    original = OpenFeature::SDK::API.instance.provider
    OpenFeature::SDK.configure do |c|
      c.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(
        'new-checkout-flow' => true,
        'ui-theme' => 'dark',
        'discount-rate' => 0.15
      ))
    end
    example.run
  ensure
    OpenFeature::SDK.configure { |c| c.set_provider(original) } if original
  end
end

# spec/checkout_spec.rb
require 'spec_helper'

RSpec.describe Checkout, :feature_flags do
  let(:client) { OpenFeature::SDK.build_client }

  it 'returns the in-memory flag value' do
    expect(client.fetch_boolean_value(flag_key: 'new-checkout-flow', default_value: false)).to be true
  end

  it 'falls back to the default for unknown flags' do
    expect(client.fetch_boolean_value(flag_key: 'does-not-exist', default_value: false)).to be false
  end
end
```

Pour modifier l'état du Feature Flag pendant un test, appelez `add_flag(flag_key:, value:)` sur l'instance du fournisseur. Le même modèle s'applique à Minitest — remplacez le hook `around` par les méthodes `setup`/`teardown`.

## Dépannage {#troubleshooting}

### Feature flags renvoient toujours des valeurs par défaut {#feature-flags-always-return-default-values}

Si les Feature flags renvoient systématiquement des valeurs par défaut de manière inattendue, vérifiez les points suivants :

- Vérifiez que [Remote Configuration] est activé dans la configuration de votre Datadog Agent
- Assurez-vous que le service et l'environnement sont configurés (soit via les variables d'environnement `DD_SERVICE` et `DD_ENV`, soit via `config.service` et `config.env` en Ruby)
- Vérifiez que `config.remote.enabled = true` et `config.open_feature.enabled = true` sont définis dans la configuration Datadog de votre application Ruby
- Vérifiez que la version de la gem `datadog` inclut la prise en charge d'OpenFeature (2.24.0 ou ultérieure)

### Problèmes de connexion à [Remote Configuration] {#remote-configuration-connection-issues}

Vérifiez les logs du traceur Ruby de Datadog pour connaître le statut de Remote Configuration :

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

Recherchez les messages concernant :
- Démarrage du worker [Remote Configuration]
- Réception de la configuration des Feature flags
- Initialisation du composant OpenFeature

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/remote_config/
[2]: /fr/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /fr/account_management/api-app-keys/#api-keys
[5]: /fr/feature_flags/guide/server_flag_evaluation_metrics/