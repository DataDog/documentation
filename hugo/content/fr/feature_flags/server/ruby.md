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
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration des SDK côté serveur
title: Ruby Feature Flags
---
## Présentation {#overview}

Le SDK Ruby de Datadog reçoit par défaut la configuration des flags directement depuis Datadog et évalue les flags localement. Il s'intègre à [OpenFeature][3], un standard ouvert pour la gestion des feature flags.

## Mise en route {#getting-started}

Utilisez Ruby 3.1 ou une version ultérieure avec `datadog` 2.49.0 ou une version ultérieure et `openfeature-sdk` 0.5.1 ou une version ultérieure. La gem `datadog` inclut l'extension native requise pour l'évaluation des flags. Le support en production est limité aux [systèmes d'exploitation Linux pris en charge][2]. Pour JRuby, utilisez le [SDK Java](#use-the-java-sdk-on-jruby).

1. Ajoutez ces dépendances à votre `Gemfile`, puis exécutez `bundle install` :

   ```ruby
   gem 'datadog', '~> 2.49'
   gem 'openfeature-sdk', '>= 0.5.1'
   ```

2. Définissez votre [clé d'API][4] Datadog et votre environnement de flag dans le processus de l'application :

   ```bash
   export DD_API_KEY='<DATADOG_API_KEY>'
   export DD_ENV='<YOUR_ENVIRONMENT>'
   ```

   Si votre organisation utilise un site autre que `datadoghq.com`, définissez `DD_SITE` :

   ```bash
   export DD_SITE={{< region-param key="dd_site" code="true" >}}
   ```

3. Enable a Boolean flag named `my-flag` for your environment with the **Server** distribution channel. Register the provider and evaluate the flag:

   ```ruby
   require 'datadog'
   require 'open_feature/sdk'
   require 'datadog/open_feature/provider'

   OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
   client = OpenFeature::SDK.build_client
   enabled = client.fetch_boolean_value(flag_key: 'my-flag', default_value: false)
   ```

Aucun Datadog Agent, instrumentation APM, paramètre d'activation ou paramètre de source n'est requis. L'enregistrement du fournisseur lance la distribution de la configuration. L'installation de la gem ou la simple construction du fournisseur ne lance pas l'interrogation.

Pour les installations existantes qui utilisent la distribution par Agent, suivez [Migrer une configuration existante](#migrate-an-existing-setup) avant d'utiliser ces instructions.

## Initialiser le fournisseur {#initialize-the-provider}

`set_provider_and_wait` attend la première configuration valide. Le délai d'initialisation par défaut est de 30 secondes. Si l'initialisation échoue, la méthode lève `OpenFeature::SDK::ProviderInitializationError`.

Gérez cette exception si l'application doit démarrer avec des valeurs par défaut fournies par l'appelant. L'interrogation se poursuit après un échec temporaire de distribution, et le fournisseur peut se rétablir lorsqu'une configuration valide arrive. Pour une initialisation non bloquante, utilisez `OpenFeature::SDK.set_provider`. Les évaluations renvoient des valeurs par défaut tant que la configuration n'est pas disponible.

Pour modifier le délai d'expiration de l'initialisation, utilisez `config.feature_flags.initialization_timeout_ms` ou `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`. La méthode OpenFeature n'accepte pas d'argument `timeout:`.

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

## Contrôler la télémétrie d'évaluation des flags et la participation aux expériences {#control-flag-evaluation-telemetry-and-experiment-participation}

La désactivation de la télémétrie nécessite `datadog` en version `2.47.0` ou ultérieure. La désactivation d'Experimentation nécessite `datadog` en version `2.49.0` ou ultérieure. L'exemple combiné nécessite `2.49.0` ou une version ultérieure. Les deux contrôles sont indépendants et désactivés par défaut. Consultez [Désactivation de l'évaluation des flags et d'Experimentation][15] pour connaître le comportement commun.

Définissez ces variables avant de construire le fournisseur :

```bash
export DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
export DD_FEATURE_FLAGS_EXPERIMENTATION_OPT_OUT_MODE=immediate
```

Initialisez le fournisseur au démarrage. Transmettez les préférences du sujet à chaque évaluation :

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
client = OpenFeature::SDK.build_client

context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  dd_evaluation_telemetry_opt_out: true,
  dd_experimentation_opt_out_at: '2026-10-30T12:00:00Z'
)
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout',
  default_value: false,
  evaluation_context: context
)
```

Remplacez l'horodatage de l'exemple par la préférence enregistrée du sujet.

Les options de fournisseur équivalentes sont `enable_evaluation_telemetry_opt_out_parameter: true` et `experimentation_opt_out_mode: :immediate`. Les options de fournisseur explicites remplacent les paramètres de déploiement. Utilisez `:disabled` pour remplacer une politique de déploiement activée, ou omettez l'option pour utiliser les paramètres de déploiement.

Utilisez `future_experiments_only` ou `experimentation_opt_out_mode: :future_experiments_only` pour conserver les allocations activées strictement avant l'horodatage. Les deux modes activés rejettent les horodatages du sujet mal formés avec `INVALID_CONTEXT` et renvoient la valeur par défaut de l'application. Le mode « Future-experiments-only » vérifie l'activation de l'allocation, et non l'inscription préalable.

La désactivation de la télémétrie supprime chacun des éléments suivants activés par l'application : les nouveaux événements d'évaluation, les métriques d'évaluation et les annotations automatiques des spans de flags. Les expositions restent activées pour les allocations éligibles. Fournissez un contexte distinct pour chaque requête. Pour reprendre la télémétrie, fournissez le booléen `false` ou supprimez l'attribut. Pour autoriser à nouveau l'expérimentation, supprimez l'horodatage. Consultez [Configurer les SDK serveur][16] pour savoir comment les valeurs de contexte héritées s'appliquent.

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir créé le client `OpenFeature`, vous pouvez commencer à lire les valeurs des Feature Flags dans toute votre application. L'évaluation des Feature Flags utilise des données mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée lors de leur évaluation.

Chaque Feature Flag est identifié par une _clé_ unique. Les Feature Flags sont évalués à l'aide de méthodes typées qui renvoient des valeurs correspondant au type attendu. Le SDK renvoie la valeur par défaut si un Feature Flag n'existe pas ou ne peut pas être évalué.

### Feature Flags booléens {#boolean-flags}

Utilisez `fetch_boolean_value()` pour les Feature Flags qui représentent des conditions activé/désactivé ou vrai/faux :

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

Utilisez `fetch_string_value()` pour les Feature Flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

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

Pour les Feature Flags numériques, utilisez `fetch_integer_value()` ou `fetch_float_value()` : Ruby fournit également `fetch_number_value()`, qui renvoie le type approprié en fonction de la valeur par défaut. Ces méthodes sont appropriées lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

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

Pour les données structurées, utilisez `fetch_object_value()`. Cette méthode renvoie une table de hachage. Utilisez des flags d'objet lorsque plusieurs propriétés de configuration vont ensemble.

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

Lorsque vous avez besoin de plus que la valeur d'un Feature Flag, utilisez les méthodes `fetch_<type>_details`. Ces méthodes renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

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

## Enregistrez les expositions dans votre propre magasin de données {#record-exposures-in-your-own-data-store}

Utilisez `Datadog::OpenFeature::ExposureHook` pour enregistrer les expositions dans vos propres logs, entrepôt de données ou pipeline d'analyse. Il appelle votre code après chaque évaluation de flag avec la même décision d'exposition que celle utilisée par le fournisseur pour Datadog. Pour arrêter d'envoyer des expositions à Datadog, définissez `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. Consultez [Enregistrer les expositions aux Feature Flags dans votre propre magasin de données][13] pour connaître les exigences minimales du SDK et obtenir d'autres détails.

## Configuration avancée {#advanced-configuration}

`DD_SERVICE` et `DD_VERSION` ajoutent des informations sur la version du service et de l'application. Ils sont facultatifs pour recevoir la configuration des flags. L'environnement sélectionne la configuration des flags.

Le SDK effectue une interrogation toutes les 30 secondes et utilise un délai d'expiration de requête de 5 secondes par défaut. Après avoir reçu une configuration valide, il conserve cette configuration en cas d'erreurs temporaires de distribution. Consultez [Sources de configuration][6] pour les paramètres d'interrogation et d'endpoint personnalisé.

### Envoyer les expositions et les événements d'évaluation {#send-exposures-and-evaluation-events}

Avec la distribution sans agent, Ruby privilégie un relais Event Platform Proxy (EVP) local compatible pour les expositions d'expériences et les événements d'évaluation de flag agrégés. Si aucun relais compatible n'est disponible, il envoie les deux types d'événements directement à Datadog. La distribution directe utilise les paramètres `DD_API_KEY` et `DD_SITE` de l'application.

Pour les options de télémétrie serverless, consultez [Envoyer la télémétrie des feature flags][12]. Les métriques d'évaluation de flag utilisent un chemin d'exportation OpenTelemetry distinct.

### Distribution par l'Agent {#agent-delivery}

Pour recevoir la configuration des flags via un Agent, sélectionnez explicitement Remote Configuration :

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
export DD_REMOTE_CONFIGURATION_ENABLED=true
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Utilisez Datadog Agent version 7.55 ou ultérieure avec [Remote Configuration][1] activée. Configurez la clé d'API sur l'Agent. Enregistrez le fournisseur avec le même code d'application que celui de [Getting started](#getting-started).

La sélection de `remote_config` active l'abonnement aux Feature Flags au démarrage du SDK Datadog, même avant l'enregistrement du fournisseur. Cette source utilise l'Agent pour la configuration et l'envoi des événements.

### Migrer une configuration existante {#migrate-an-existing-setup}

La valeur héritée `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` ou `config.open_feature.enabled = true` conserve Remote Configuration lorsqu'aucune source n'est explicitement sélectionnée. Une valeur héritée de `false` désactive les Feature Flags.

Pour migrer vers une distribution sans agent :

1. Mettez à niveau vers `datadog` 2.49.0 ou une version ultérieure.
2. Définissez `DD_API_KEY` dans le processus de l'application et conservez l'environnement de flag dans `DD_ENV`.
3. Si votre organisation utilise un site autre que `datadoghq.com`, définissez `DD_SITE`.
4. Définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`.
5. Supprimez `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` et toute affectation `config.open_feature.enabled`.
6. Redémarrez l'application et vérifiez un flag connu après l'initialisation du fournisseur.

Pour conserver la distribution par l'Agent, définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` avant de supprimer les paramètres hérités. Pour désactiver les Feature Flags, utilisez `DD_FEATURE_FLAGS_ENABLED=false`.

Consultez [Migrer une configuration Remote Configuration existante][7] pour les étapes de vérification et de restauration.

### Métriques d'évaluation des flags {#flag-evaluation-metrics}

Les métriques d'évaluation des flags utilisent un pipeline OpenTelemetry distinct. Ajoutez les gems de métriques au bundle de l'application :

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

Définissez `DD_METRICS_OTEL_ENABLED=true` et configurez l'exportateur comme décrit dans [Configurer les métriques d'évaluation des flags côté serveur][5]. L'activation de la distribution sans agent ne configure pas l'exportation des métriques.

## Événements d'évaluation et confidentialité {#evaluation-events-and-privacy}

Utilisez `datadog` 2.46.0 ou une version ultérieure pour le hachage de la clé de ciblage et la collecte de contexte contrôlée par l'environnement dans les événements d'évaluation de flag EVP. Ces événements sont activés par défaut. Définissez `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` pour désactiver uniquement ce chemin d'événement. Consultez [Événements d'évaluation côté serveur et confidentialité][14] pour connaître les données collectées, le périmètre de la désactivation et les exigences de distribution.

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

## Utilisez le SDK Java sur JRuby {#use-the-java-sdk-on-jruby}

Le SDK Ruby ne prend pas en charge Feature Flags sur JRuby. Sur JRuby, le SDK Ruby écrit un avertissement dans le log et n'active pas Feature Flags. Utilisez plutôt le [SDK Java][8]. JRuby appelle le SDK Java via son intégration Java.

Utilisez `dd-openfeature` 1.69.0 ou une version ultérieure et les dépendances répertoriées dans [Exigences de compatibilité du SDK Java][9]. La livraison Agentless autonome ne nécessite pas `dd-java-agent`.

1. Obtenez le fichier `dd-openfeature`JAR  et ses dépendances. Par exemple, utilisez Maven pour les copier dans un répertoire.
2. Définissez les variables d'environnement pour la clé d'API et les flags avant de démarrer JRuby. Si votre organisation utilise un site autre que `datadoghq.com`, définissez `DD_SITE`.
3. Chargez les fichiers JAR dans votre application avec `require` et enregistrez le fournisseur.

```shell
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'

jruby app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'com.datadog.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

Pour la livraison par l'Agent, définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` et chargez un `dd-java-agent` compatible avec l'option JVM `-javaagent`. Par exemple, exécutez `jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb`. Consultez la page [Configuration du SDK Java][8] pour connaître les prérequis de l'Agent.

Pour les événements du fournisseur, la gestion des erreurs et les méthodes d'évaluation, consultez la page [SDK Java][8]. JRuby utilise les mêmes classes et méthodes.

## Dépannage {#troubleshooting}

Si l'application s'exécute sur JRuby, utilisez le SDK Java. Consultez [Utilisez le SDK Java sur JRuby][10].

### La livraison Agentless ne fonctionne pas {#agentless-delivery-not-working}

- Vérifiez que `datadog` 2.49.0 ou une version ultérieure est installé et que l'application enregistre le fournisseur OpenFeature Datadog.
- Vérifiez `DD_API_KEY` et `DD_ENV` dans le processus de l'application. Si votre organisation utilise un site autre que `datadoghq.com`, vérifiez `DD_SITE`.
- Confirmez que `DD_FEATURE_FLAGS_ENABLED` n'est pas `false`.
- Laissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` non défini pour une nouvelle configuration, ou définissez-le sur `agentless`. Supprimez les anciens paramètres d'activation lors de la migration.
- Autorisez le trafic HTTPS sortant vers `ufc-server.ff-cdn.<DD_SITE>`.
- Activez `DD_TRACE_DEBUG=true` et vérifiez les logs du traceur pour détecter les erreurs d'authentification, de délai d'attente ou de configuration.

Avant la première configuration valide, les évaluations renvoient les valeurs par défaut fournies par l'appelant. Après une initialisation réussie, les erreurs de livraison temporaires conservent la dernière configuration valide.

### Problèmes de connexion à Remote Configuration {#remote-configuration-connection-issues}

- Confirmez que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` est défini sur `remote_config`.
- Vérifiez que Remote Configuration est activée dans l'Agent et le traceur Ruby.
- Vérifiez que le Datadog Agent était disponible au démarrage de l'application. Si les problèmes persistent après que l'Agent est devenu disponible, redémarrez l'application. Consultez [Disponibilité de l'Agent][11].
- Vérifiez la clé d'API sur l'Agent et `DD_ENV` dans l'application.
- Confirmez que l'application peut atteindre l'Agent. Activez `DD_TRACE_DEBUG=true` et vérifiez les logs du traceur pour détecter les erreurs de Remote Configuration.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/remote_config/
[2]: /fr/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /fr/account_management/api-app-keys/#api-keys
[5]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[6]: /fr/feature_flags/concepts/configuration_sources/
[7]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /fr/feature_flags/server/java/
[9]: /fr/feature_flags/server/java/#getting-started
[10]: #use-the-java-sdk-on-jruby
[11]: /fr/feature_flags/concepts/configuration_sources/#agent-availability
[12]: /fr/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
[13]: /fr/feature_flags/guide/record_exposures_in_your_own_data_store/
[14]: /fr/feature_flags/guide/server_evaluation_events/
[15]: /fr/feature_flags/concepts/opt_out/
[16]: /fr/feature_flags/concepts/opt_out/#configure-server-sdks