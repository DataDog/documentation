---
aliases:
- /fr/continuous_integration/setup_tests/ruby
- /fr/continuous_integration/tests/ruby
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests au sein de conteneurs
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
kind: documentation
title: Tests Ruby
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">L'instrumentation de tests Ruby est disponible en version bêta.
</div>

## Compatibilité

Langages pris en charge :

| Langage | Version |
|---|---|
| DNS | >= 2.1 |
| JRuby | >= 9.2 |

Frameworks de test pris en charge :

| Framework de test | Version |
|---|---|
| RSpec | >= 3.0.0 |
| Minitest | >= 5.0.0 |
| Cucumber | >= 3.0 |

## Configurer la méthode de transmission

Pour transmettre les résultats de test à Datadog, vous devez configurer le gem `ddtrace` :

{{< tabs >}}

{{% tab "Fournisseur de CI sur site (Agent Datadog)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "Fournisseur de CI cloud (sans Agent)" %}}

<div class="alert alert-info">Le mode sans Agent est disponible à partir de la version 1.15.0 du gem `ddtrace`.</div>

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## Installer le traceur Ruby

Pour installer le traceur Ruby, procédez comme suit :

1. Ajoutez le gem `ddtrace` à votre fichier `Gemfile` :

    {{< code-block lang="ruby" filename="Gemfile" >}}
source '<https://rubygems.org>'
gem 'ddtrace', "~> 1.0"
{{< /code-block >}}

2. Installez le gem en exécutant `bundle install`.

Consultez la [documentation relative à l'installation du traceur Ruby][4] pour en savoir plus.

## Instrumenter vos tests

{{< tabs >}}
{{% tab "RSpec" %}}

L'intégration RSpec trace toutes les exécutions d'exemples et de groupes d'exemples lors de l'utilisation du framework de test `rspec`.

Pour activer votre intégration, ajoutez le code suivant à votre fichier `spec_helper.rb` :

```ruby
require 'rspec'
require 'datadog/ci'

Datadog.configure do |c|
  # Activer uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configurer le traceur pour s'assurer de la transmission des résultats
  c.ci.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Activer l'instrumentation RSpec
  c.ci.instrument :rspec
end
```

Exécutez vos tests normalement, en spécifiant l'environnement dans lequel les tests sont exécutés via la variable d'environnement `DD_ENV`.

Vous pouvez utiliser les environnements suivants :

* `local` pour des tests exécutés sur la machine d'un développeur
* `ci` pour des tests exécutés sur un fournisseur de CI

Par exemple :

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

L'intégration Minitest trace toutes les exécutions de tests lors de l'utilisation du framework `minitest`.

Pour activer votre intégration, ajoutez les lignes suivantes à votre fichier `test_helper.rb` :

```ruby
require 'minitest'
require 'datadog/ci'

Datadog.configure do |c|
  # Activer uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configurer le traceur pour s'assurer de la transmission des résultats
  c.ci.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  c.ci.instrument :minitest
end
```

Exécutez vos tests normalement, en spécifiant l'environnement dans lequel les tests sont exécutés via la variable d'environnement `DD_ENV`.

Vous pouvez utiliser les environnements suivants :

* `local` pour des tests exécutés sur la machine d'un développeur
* `ci` pour des tests exécutés sur un fournisseur de CI

Par exemple :

```bash
DD_ENV=ci bundle exec rake test
```

{{% /tab %}}

{{% tab "Cucumber" %}}

L'intégration Cucumber trace les exécutions de scénarios et d'étapes à l'aide du framework `cucumber`.

Pour activer votre intégration, ajoutez le code suivant à votre application :

<!-- TODO: Explicitly setting `c.tracing.enabled` overrides any existing value, including the environment
variable `DD_TRACE_ENABLED`. This prevents production environments from being able to disable the tracer
using `DD_TRACE_ENABLED`.
This snippet should be adapted to work correctly with the production tracer configuration or
instruct clients to only include this code in a CI environment.
This affects all code snippets in this file.
-->
```ruby
require 'cucumber'
require 'datadog/ci'

Datadog.configure do |c|
  # Activer uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configurer le traceur pour s'assurer de la transmission des résultats
  c.ci.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Activer l'instrumentation Cucumber
  c.ci.instrument :cucumber
end
```

Exécutez vos tests normalement, en spécifiant l'environnement dans lequel les tests sont exécutés via la variable d'environnement `DD_ENV`.
Vous pouvez utiliser les environnements suivants :

* `local` pour des tests exécutés sur la machine d'un développeur
* `ci` pour des tests exécutés sur un fournisseur de CI

Par exemple :

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### Ajouter des tags personnalisés à des tests

Vous pouvez ajouter des tags personnalisés à vos tests à l'aide de la span actuellement active :

```ruby
require 'ddtrace'

# Dans votre test
Datadog::Tracing.active_span&.set_tag('test_owner', 'my_team')
# Le test se poursuit normalement
# ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour en savoir plus sur l'ajout de tags, consultez la rubrique [Ajout de tags][5] de la documentation relative à l'instrumentation personnalisée Ruby.

### Ajouter des métriques custom aux tests

Tout comme pour les tags, vous pouvez ajouter des métriques custom à vos tests à l'aide de la span active :

```ruby
require 'ddtrace'

# dans votre test
Datadog::Tracing.active_span&.set_metric('memory_allocations', 16)
# le test se poursuit normalement
# ...
```

Pour en savoir plus sur les métriques custom, consultez le [guide sur l'ajout de métriques custom][7].

## Paramètres de configuration

La liste suivante répertorie les principaux paramètres de configuration pouvant être utilisés avec le traceur, que ce soit avec le bloc de code `Datadog.configure` ou avec des variables d'environnement :

`service`
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : `$PROGRAM_NAME`<br/>
**Exemple** : `my-ruby-app`

`env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

La variable d'environnement suivante peut servir à configurer l'emplacement de l'Agent Datadog :

`DD_TRACE_AGENT_URL`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][6].

## Recueillir les métadonnées Git

{{% ci-git-metadata %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[4]: /fr/tracing/trace_collection/dd_libraries/ruby/#installation
[5]: /fr/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[6]: /fr/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[7]: /fr/continuous_integration/guides/add_custom_metrics/?tab=ruby