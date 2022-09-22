---
further_reading:
- link: /continuous_integration/setup_tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests au sein de conteneurs
- link: /continuous_integration/explore_tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Tests Ruby
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">L'instrumentation de tests Ruby est disponible en version bêta.
</div>

## Compatibilité

Interpréteurs Ruby pris en charge :
* Ruby 2.1+
* JRuby 9.2+

Frameworks de test pris en charge :
* Cucumber 3.0+
* RSpec 3.0.0+

## Installer l'Agent Datadog

Pour transmettre des résultats de test à Datadog, vous devez installer l'Agent Datadog.

### Utiliser un fournisseur de CI sur site

SI vous exécutez des tests pour un fournisseur de CI sur site, tel que Jenkins ou GitLab CI autogéré, installez l'Agent Datadog sur chaque nœud de worker en suivant les [instructions d'installation de l'Agent][1].

Si le fournisseur de CI utilise un exécuteur basé sur des conteneurs, définissez la variable d'environnement `DD_AGENT_HOST` pour tous les builds (par défaut, `http://localhost:8126`) sur un endpoint accessible depuis les conteneurs des builds. En effet, la valeur `localhost` utilisée à l'intérieur d'un build désigne le conteneur, et non le nœud de worker sous-jacent sur lequel l'Agent Datadog s'exécute.

Si vous utilisez un exécuteur Kubernetes, Datadog vous recommande d'utiliser le [contrôleur d'admission Datadog][2], qui définit automatiquement la variable d'environnement `DD_AGENT_HOST` dans les pods de build de façon à communiquer avec l'Agent Datadog local.

### Utiliser un fournisseur de CI dans le cloud

Si vous utilisez un fournisseur de CI dans le cloud sans accès aux nœuds de worker sous-jacents, tel que GitHub Actions ou CircleCI, exécutez l'Agent Datadog dans un conteneur en tant que service de build. Si vous n'avez pas la possibilité d'installer l'Agent Datadog sur chaque nœud de worker, cette méthode fonctionne également pour un fournisseur de CI sur site qui utilise un exécuteur basé sur des conteneurs.

Pour exécuter l'Agent Datadog en tant que conteneur dans le but de transmettre les résultats, utilisez l'image Docker `gcr.io/datadoghq/agent:latest` et les variables d'environnement suivantes :

`DD_API_KEY` (requis)
: La [clé d'API Datadog][3] utilisée pour importer les résultats de test.<br/>
**Valeur par défaut** : (aucune)

`DD_INSIDE_CI` (requis)
: Désactive la surveillance du conteneur de l'Agent Datadog, puisque le host sous-jacent n'est plus accessible.<br/>
**Valeur par défaut** : `false`<br/>
**Valeur requise** : `true`

`DD_HOSTNAME` (requis)
: Désactive la transmission des hostnames associés aux tests, puisque le host sous-jacent ne peut pas être surveillé.<br/>
**Valeur par défaut** : (détectée automatiquement)<br/>
**Valeur requise** : `none`

{{< site-region region="us3,us5,eu" >}}
En outre, configurez le site Datadog sur le site sélectionné ({{< region-param key="dd_site_name" >}}) :

`DD_SITE`
: Le site Datadog vers lequel télécharger les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

#### Exemples de configuration pour plusieurs fournisseurs de CI

Les instructions des sections suivantes sont spécifiques à certains fournisseurs de CI. Elles permettent d'exécuter et de configurer l'Agent, afin qu'ils transmettent les données des tests.

{{< tabs >}}
{{< tab "Azure Pipelines" >}}

Pour exécuter l'Agent Datadog dans Azure Pipelines, définissez un nouveau conteneur dans la [section relative aux ressources][1] et associez-le à la tâche le déclarant comme [conteneur de service][2].

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}
Remplacez `<SITE_DD>` par le site sélectionné : {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"
        DD_SITE: "<SITE_DD>"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}

Ajoutez votre [clé d'API Datadog][3] aux [variables d'environnement de votre projet][4] avec la clé `DD_API_KEY`.

[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{< /tab >}}
{{< tab "GitLab CI" >}}

Pour exécuter l'Agent dans GitLab, définissez le conteneur de l'Agent dans [services][1].

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}

Remplacez `<SITE_DD>` par le site sélectionné : {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"
  DD_SITE: "<SITE_DD>"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}

Ajoutez votre [clé d'API Datadog][2] aux [variables d'environnement de votre projet][3] avec la clé `DD_API_KEY`.

[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{< /tab >}}
{{< tab "GitHub Actions" >}}

Pour exécuter l'Agent dans GitHub Actions, utilisez l'[action GitHub de l'Agent Datadog][1] `datadog/agent-github-action`.

{{< site-region region="us" >}}
{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
      - run: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}

Remplacez `<site_datadog>` par le site sélectionné : {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
          datadog_site: <site_datadog>
      - run: make test
{{< /code-block >}}
{{< /site-region >}}

Ajoutez votre [clé d'API Datadog][2] aux [secrets de votre projet][3] avec la clé `DD_API_KEY`.

[1]: https://github.com/marketplace/actions/datadog-agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{< /tab >}}
{{< tab "CircleCI" >}}

Pour exécuter l'Agent dans CircleCI, lancez le conteneur de l'Agent avant d'exécuter les tests, à l'aide de l'[orbe CircleCI datadog/agent][1], puis arrêtez-le pour garantir l'envoi des résultats à Datadog.

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}

Remplacez `<SITE_DD>` par le site sélectionné : {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<langage>:<version_tag>
    environment:
      DD_SITE: "<SITE_DD>"
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}

Ajoutez votre [clé d'API Datadog][2] aux [variables d'environnement de votre projet][3] avec la clé `DD_API_KEY`.

[1]: https://circleci.com/developer/orbs/orb/datadog/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://circleci.com/docs/2.0/env-vars/
{{< /tab >}}
{{< /tabs >}}

## Installer le traceur Ruby

Pour installer le traceur Ruby, procédez comme suit :

1. Ajoutez le gem `ddtrace` à votre fichier `Gemfile` :

    {{< code-block lang="ruby" filename="Gemfile" >}}
source 'https://rubygems.org'
gem 'ddtrace', "~> 1.0"
{{< /code-block >}}

2. Installez le gem en exécutant `bundle install`.

Consultez la [documentation relative à l'installation du traceur Ruby][4] pour en savoir plus.

## Instrumenter vos tests

{{< tabs >}}
{{< tab "Cucumber" >}}

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

  # Configurer le traceur pour s'assurer de la diffusion des résultats
  c.ci.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Activer l'instrumentation Cucumber
  c.ci.instrument :cucumber
end
```

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{< /tab >}}
{{< tab "RSpec" >}}

L'intégration RSpec trace toutes les exécutions d'exemples et de groupes d'exemples lors de l'utilisation du framework de test `rspec`.

Pour activer votre intégration, ajoutez le code suivant à votre fichier `spec_helper.rb` :

```ruby
require 'rspec'
require 'datadog/ci'

Datadog.configure do |c|
  # Activer uniquement l'instrumentation de tests sur l'environnement de CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configurer le traceur pour s'assurer de la diffusion des résultats
  c.ci.enabled = true

  # Le nom du service ou de la bibliothèque testé(e)
  c.service = 'my-ruby-app'

  # Activer l'instrumentation RSpec
  c.ci.instrument :rspec
end
```

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci bundle exec rake spec
```

{{< /tab >}}
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

[1]: /fr/agent/
[2]: https://docs.datadoghq.com/fr/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/tracing/trace_collection/dd_libraries/ruby/#installation
[5]: /fr/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[6]: /fr/tracing/trace_collection/library_config/ruby/?tab=containers#configuration