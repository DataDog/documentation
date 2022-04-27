---
further_reading:
- link: /continuous_integration/explore_tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Tests Ruby
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">L'instrumentation de tests Ruby est disponible en version bêta. Pendant cette période, elle n'engendre aucun coût supplémentaire.
</div>

## Compatibilité

Interpréteurs Ruby pris en charge :
* Ruby 2.1+
* JRuby 9.2+

Frameworks de test pris en charge :
* Cucumber 3.0+
* RSpec 3.0.0+

## Prérequis

[Installez l'Agent Datadog pour recueillir des données de test][1].

## Installer le traceur Ruby

Pour installer le traceur Ruby, procédez comme suit :

1. Ajoutez le gem `ddtrace` à votre fichier `Gemfile` :

    {{< code-block lang="ruby" filename="Gemfile" >}}
source 'https://rubygems.org'
gem 'ddtrace', ">=0.53.0"
{{< /code-block >}}

2. Installez le gem en exécutant `bundle install`.

Consultez la [documentation relative à l'installation du traceur Ruby][2] pour en savoir plus.

## Instrumenter vos tests

{{< tabs >}}
{{% tab "Cucumber" %}}

L'intégration Cucumber trace les exécutions de scénarios et d'étapes à l'aide du framework `cucumber`.

Pour activer votre intégration, ajoutez le code suivant à votre application :

```ruby
require 'cucumber'
require 'datadog/ci'

Datadog.configure do |c|
  # Active uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracer.enabled = (ENV["DD_ENV"] == "ci")

  # Configure le traceur pour s'assurer de la diffusion des résultats
  c.ci_mode.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Active l'instrumentation Cucumber
  c.use :cucumber
end
```

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{% tab "RSpec" %}}

L'intégration RSpec trace toutes les exécutions d'exemples et de groupes d'exemples lors de l'utilisation du framework de test `rspec`.

Pour activer votre intégration, ajoutez le code suivant à votre fichier `spec_helper.rb` :

```ruby
require 'rspec'
require 'datadog/ci'

Datadog.configure do |c|
  # Active uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracer.enabled = (ENV["DD_ENV"] == "ci")

  # Configure le traceur pour s'assurer de la diffusion des résultats
  c.ci_mode.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Active l'instrumentation RSpec
  c.use :rspec
end
```

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}
{{< /tabs >}}

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

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][3].

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies par l'instrumentation de test, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant.

Si vous exécutez des tests dans des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche Git testée. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag Git testé (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
**Exemple** : `1.0.1`

`DD_GIT_COMMIT_SHA`
: Hash entier du commit.<br/>
**Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Message du commit.<br/>
**Exemple** : `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Nom de l'auteur du commit.<br/>
**Exemple** : `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: E-mail de l'auteur du commit.<br/>
**Exemple** : `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/setup_tests/agent/
[2]: /fr/tracing/setup_overview/setup/ruby/#installation
[3]: /fr/tracing/setup_overview/setup/ruby/?tab=containers#configuration