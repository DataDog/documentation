---
aliases:
- /fr/continuous_integration/setup_tests/ruby
- /fr/continuous_integration/tests/ruby
- /fr/continuous_integration/tests/setup/ruby
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests dans Containers
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/test_parallelization/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests Ruby
type: multi-code-lang
---
## Compatibilité {#compatibility}

Langages pris en charge :

| Langue | Version |
| -------- | ------- |
| Ruby     | >= 2.7  |

Frameworks de test pris en charge :

| Framework de test | Version  |
| -------------- | -------- |
| RSpec          | >= 3.0.0 |
| Minitest       | >= 5.0.0 |
| Cucumber       | >= 3.0   |

Exécuteurs de test pris en charge :

| Exécuteur de test    | Version   |
| -------------- | --------- |
| Knapsack Pro   | >= 7.2.0  |
| parallel_tests | >= 4.0.0  |
| ci-queue       | >= 0.53.0 |

## Configuration de la méthode de rapport {#configuring-reporting-method}

Pour signaler les résultats des tests à Datadog, vous devez configurer la gem `datadog-ci` :

{{< tabs >}}
{{% tab "Fournisseur CI avec prise en charge de l'auto-instrumentation" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Fournisseur CI cloud (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Fournisseur CI sur site (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle {#manual-instrumentation}

<div class="alert alert-info">
Cette section est <strong>uniquement requise</strong> si votre fournisseur CI ne prend pas en charge l'auto-instrumentation. Si vous avez sélectionné <strong>Fournisseur CI avec prise en charge de l'auto-instrumentation</strong> dans la section <a href="#configuring-reporting-method">Configuration de la méthode de rapport</a> ci-dessus, ignorez cette section et passez aux <a href="#configuration-settings">Paramètres de configuration</a>.
</div>

Si votre fournisseur CI ne prend pas en charge l'auto-instrumentation (par exemple, si vous avez sélectionné {{< ui >}}Cloud CI provider (Agentless){{< /ui >}} ou {{< ui >}}On-Premises CI Provider (Datadog Agent){{< /ui >}}), suivez ces étapes pour installer la bibliothèque et instrumenter vos tests manuellement.

1. Ajoutez la [gem d'optimisation de test Ruby][10] à votre Gemfile :

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. [Configurer la méthode de rapport](#configuring-reporting-method)

3. Définissez la variable d'environnement `RUBYOPT` sur la commande qui exécute vos tests :

   ```bash
   RUBYOPT="-rbundler/setup -rdatadog/ci/auto_instrument" bundle exec rake test
   ```

   **Remarque** : Si vous préférez ne pas définir la variable d'environnement `RUBYOPT`, ajoutez `bundle exec ddcirb exec` au début de votre commande de test :

   ```bash
   bundle exec ddcirb exec rake test
   ```

## Paramètres de configuration {#configuration-settings}

Pour configurer la bibliothèque Test Optimization, définissez les variables d'environnement suivantes avant de lancer le processus de test. Pour les exécuteurs de tests parallèles, définissez-les sur le processus parent afin que chaque worker en hérite.

`DD_CIVISIBILITY_ENABLED=true` (Requis)
: Active Test Optimization.<br/>
**Par défaut**: `false`

`DD_ENV` (Optionnel)
: Nom de l'environnement où les tests sont exécutés.<br/>
**Par défaut**: `(empty)`<br/>
**Exemples**: `local`, `ci`

`DD_SERVICE` (Optionnel)
: Nom du service ou de la bibliothèque à tester.<br/>
**Par défaut**: Le nom du dépôt<br/>
**Exemple**: `my-ruby-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requis pour le mode Agentless)
: Active le mode Agentless pour envoyer les résultats des tests directement à Datadog.<br/>
**Par défaut** : `false`

`DD_API_KEY` (Requis pour le mode Agentless)
: La clé d'API Datadog utilisée pour authentifier les téléchargements des résultats de test. Cette variable n'active pas le mode Agentless.<br/>
**Par défaut** : `(empty)`

`DD_SITE` (Optionnel pour le mode Agentless)
: Le [site Datadog][11] vers lequel télécharger les résultats de test. Définissez cette configuration lorsque vous utilisez un site autre que US1.<br/>
**Par défaut** : `datadoghq.com`

`DD_TRACE_AGENT_URL` (Uniquement lors de l'utilisation du Datadog Agent)
: L'URL du Datadog Agent pour la collecte des traces, sous la forme `http://hostname:port`.<br/>
**Par défaut** : `http://127.0.0.1:8126`

`DD_TEST_SESSION_NAME` (Optionnel)
: Identifie un groupe de tests, tel que `unit-tests`, `integration-tests` ou `smoke-tests`.<br/>
**Par défaut**: Le nom du job CI et la commande de test, ou la commande de test si le nom du job CI n'est pas disponible.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][5].

Les fonctionnalités supplémentaires de Test Optimization possèdent leurs propres options de configuration documentées sur leurs pages respectives.

## Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests}

Vous pouvez ajouter des tags personnalisés à vos tests en utilisant le test actif actuel :

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Ajout de tags][2] de la documentation sur l'instrumentation personnalisée Ruby.

## Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests}

Comme pour les tags, vous pouvez ajouter des mesures personnalisées à vos tests en utilisant le test actif actuel :

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

Pour plus d'informations sur les mesures personnalisées, consultez le [Guide d'ajout de mesures personnalisées][3].

## Utilisation d'une instrumentation supplémentaire {#using-additional-instrumentation}

Il peut être utile de disposer d'informations de tracing enrichies sur vos tests, incluant le temps passé à effectuer des opérations de base de données ou d'autres appels externes, comme illustré dans le flame graph suivant :

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Test de trace avec Redis instrumenté" >}}

Vous pouvez activer l'instrumentation APM automatique en ajoutant la ligne suivante dans votre `test_helper/spec_helper` :

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Remarque** : En mode CI, ces traces sont soumises à Test Optimization et elles **n'apparaissent pas** dans Datadog APM.

Pour la liste complète des méthodes d'instrumentation disponibles, consultez la [documentation sur le tracing][6]

## Collecte des métadonnées Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Utilisation de l'API publique de la bibliothèque pour les frameworks de test non pris en charge {#using-librarys-public-api-for-unsupported-test-frameworks}

Si vous utilisez RSpec, Minitest ou Cucumber, **n'utilisez pas l'API de test manuel**, car Test Optimization les instrumente automatiquement et envoie les résultats des tests à Datadog. L'API de test manuel est **incompatible** avec les frameworks de test déjà pris en charge.

Utilisez l'API de test manuel uniquement si vous utilisez un framework de test non pris en charge ou si vous disposez d'un mécanisme de test différent.
La documentation complète de l'API publique est disponible sur le [site YARD][8].

### Modèle de domaine {#domain-model}

L'API repose sur quatre concepts : session de test, module de test, collection de tests et test.

#### Session de test {#test-session}

Une session de test représente l'exécution d'une commande de test.

Pour démarrer une session de test, appelez `Datadog::CI.start_test_session` et transmettez le service Datadog ainsi que les tags (tels que le framework de test
que vous utilisez).

Une fois tous vos tests terminés, appelez `Datadog::CI::TestSession#finish`, ce qui ferme la session et envoie la trace de la session
au backend.

#### Module de test {#test-module}

Un module de test représente une unité de travail plus petite au sein d'une session.
Pour les frameworks de test pris en charge, le module de test est toujours identique à la session de test.
Pour votre cas d'utilisation, il peut s'agir d'un package dans votre application composantisée.

Pour démarrer un module de test, appelez `Datadog::CI.start_test_module` et transmettez le nom du module.

Une fois l'exécution du module terminée, appelez `Datadog::CI::TestModule#finish`.

#### Collection de tests {#test-suite}

Une collection de tests comprend un ensemble de tests qui vérifient une fonctionnalité similaire.
Une suite correspond généralement à un fichier unique où les tests sont définis.

Créez des collections de tests en appelant `Datadog::CI#start_test_suite` et en transmettant le nom de la collection de tests.

Appelez `Datadog::CI::TestSuite#finish` lorsque tous les tests associés dans la suite ont terminé leur exécution.

#### Test {#test}

Un test représente un cas de test unique qui est exécuté dans le cadre d'une collection de tests.
Il correspond généralement à une méthode qui contient la logique de test.

Créez des tests dans une suite en appelant `Datadog::CI#start_test` ou `Datadog::CI.trace_test` et en transmettant le nom du test et le nom de la collection de tests. Le nom de la collection de tests doit être identique au nom de la collection de tests démarrée à l'étape précédente.

Appelez `Datadog::CI::Test#finish` lorsqu'un test a terminé son exécution.

### Exemple de code {#code-example}

Le code suivant représente un exemple d'utilisation de l'API :

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## Bonnes pratiques {#best-practices}

### Nom de la session de test `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Utilisez `DD_TEST_SESSION_NAME` pour définir le nom de la session de test et le groupe de tests associé. Voici des exemples de valeurs pour ce tag :

-   `unit-tests`
-   `integration-tests`
-   `smoke-tests`
-   `flaky-tests`
-   `ui-tests`
-   `backend-tests`

Si `DD_TEST_SESSION_NAME` n'est pas spécifié, la valeur par défaut est le nom du job CI et la commande de test. Si le nom du job CI n'est pas disponible, la commande de test est utilisée.

Le nom de la session de test doit être unique au sein d'un dépôt pour vous aider à distinguer différents groupes de tests.

#### Quand utiliser `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name} :

Il existe un ensemble de paramètres que Datadog vérifie pour établir une correspondance entre les sessions de test. La commande de test utilisée pour exécuter les tests en fait partie. Si la commande de test contient une chaîne qui change à chaque exécution, comme une liste de fichiers à exécuter, Datadog considère que les sessions ne sont pas liées entre elles. Exemple :

-   `bundle exec rspec my_spec.rb my_other_spec.rb`

Datadog recommande d'utiliser `DD_TEST_SESSION_NAME` si vos commandes de test varient entre les exécutions.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /fr/tests/guides/add_custom_measures/?tab=ruby
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /fr/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
[10]: https://github.com/DataDog/datadog-ci-rb
[11]: /fr/getting_started/site/