---
description: Optimisez la planification de la parallélisation des tests et la découverte
  des tests pour les suites de tests Ruby, Rails, Python et JavaScript.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/configuration/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentation
  text: Dépannage de la parallélisation des tests
title: Bonnes Pratiques de parallélisation des tests
---
## Optimisez l'étape de planification {#optimize-the-planning-step}

La parallélisation des tests ajoute une étape de planification qui découvre les tests avant l'exécution. Par exemple, les projets RSpec utilisent la découverte par exécution à sec (dry-run), les projets pytest utilisent la collecte, et les projets Jest utilisent `--listTests`. Gardez cette étape légère afin que le temps gagné par l'exécution parallèle ne soit pas compensé par la surcharge de planification.

### Préinstallez les dépendances système avec Docker {#preinstall-system-dependencies-with-docker}

Si vos tests nécessitent des paquets du système d'exploitation, incluez-les dans une image de base CI au lieu de les installer à chaque exécution de CI.

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### Mettez en cache les dépendances du projet {#cache-project-dependencies}

Utilisez le cache de dépendances de votre fournisseur CI. Par exemple, GitHub Actions peut mettre en cache les dépendances Bundler avec `ruby/setup-ruby` :

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: 3.3
    bundler-cache: true
{{< /code-block >}}

Pour les projets Python, utilisez `actions/setup-python` avec la mise en cache pip :

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
{{< /code-block >}}

Pour les projets JavaScript, utilisez `actions/setup-node` avec la mise en cache npm :

{{< code-block lang="yaml" >}}
- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
{{< /code-block >}}

### Ignorez la configuration de la base de données pendant la découverte {#skip-database-setup-during-discovery}

La découverte n'exécute pas les tests, donc la configuration de la base de données, les migrations, les seeds et les fixtures sont souvent inutiles pendant l'étape de planification.

Pendant la découverte, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` est défini sur `1`. Utilisez cette variable pour ignorer le code de configuration coûteux pendant la planification.

Par exemple, dans Rails :

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

Après ces changements, la découverte des tests peut s'exécuter plus rapidement et éviter les échecs lorsque la base de données est indisponible pendant la planification.

### Mettez en cache la découverte des tests {#cache-test-discovery}

Si la découverte complète des tests prend trop de temps, mettez en cache le fichier de découverte `ddtest` entre les exécutions CI. Restaurez votre cache CI avant la planification et transmettez le fichier restauré à `ddtest` :

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

Après la planification, enregistrez le fichier de découverte interne actualisé dans votre cache CI :

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest` invalide le cache lorsque n'importe quel fichier de test est modifié. L'ensemble des fichiers de test est déterminé par `--tests-location` et `--tests-exclude-pattern`.

### Utilisez le saut au niveau de la suite pour Ruby {#use-suite-level-skipping-for-ruby}

Si la découverte des tests Ruby reste un goulot d'étranglement après l'application de ces optimisations, configurez Test Impact Analysis pour utiliser le saut au niveau de la suite. Ce mode permet à `ddtest plan` d'utiliser la découverte de fichiers de test au lieu de découvrir chaque test individuellement. Il sacrifie la précision du saut au niveau du test pour une réduction de la surcharge de planification, car Test Impact Analysis ignore ou exécute une suite entière.

Le saut au niveau de la suite nécessite `datadog-ci >= 1.34.0`. Définissez `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite` pour la planification et l'exécution des tests :

{{< code-block lang="bash" >}}
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest plan
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest run
{{< /code-block >}}

Si vous exécutez des tests avec une autre commande, définissez la même variable d'environnement pour cette commande. Dans les workflows CI qui planifient et exécutent les tests dans des tâches distinctes, définissez la variable dans les deux tâches.

## Configurez pytest {#configure-pytest}

`ddtest` exécute pytest en tant que `python -m pytest` par défaut et ajoute les fichiers de test sélectionnés. Pour les versions 1.7.0 et ultérieures, définissez `--command` pour remplacer la commande de base. Par exemple, `--command pytest` exécute le script de console `pytest` au lieu de `python -m pytest`. `ddtest` exécute `<command> <files>` et n'ajoute pas `-m pytest`. Il ajoute `--ddtrace` à `PYTEST_ADDOPTS`, en préservant toute valeur existante, de sorte que le plugin pytest `ddtrace` se charge sans modifier votre configuration pytest. Pour transmettre des indicateurs pytest supplémentaires sans modifier la commande de base, utilisez `PYTEST_ADDOPTS`.

Pour la découverte de tests, `ddtest` lit `testpaths` et `python_files` depuis `pytest.ini`, `pyproject.toml`, `tox.ini` ou `setup.cfg`. Si aucune configuration pytest ne définit ces paramètres, `ddtest` utilise `**/{test_*,*_test}.py`.

Pendant la découverte, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` est défini sur `1`. Utilisez cette variable pour ignorer le code de configuration coûteux pendant la planification, comme pour [ignorer la configuration de la base de données pendant la découverte](#skip-database-setup-during-discovery)

## Configurez Jest {#configure-jest}

`ddtest` exécute Jest via l'exécutable local `node_modules/.bin/jest` lorsqu'il existe, ou via `npx jest` sinon. Utilisez `--command` lorsque votre projet exécute Jest via un gestionnaire de paquets ou un wrapper :

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework jest --command "pnpm jest --runInBand"
{{< /code-block >}}

N'incluez pas de fichiers de test ou de séparateur `--` dans la commande. `ddtest` ajoute la liste des fichiers et les indicateurs Jest lui-même.

`ddtest` ajoute `-r dd-trace/ci/init` au début de `NODE_OPTIONS` pour les processus de travail, sauf s'il est déjà présent. Assurez-vous que `dd-trace` est résolvable depuis le projet où `ddtest` s'exécute.

`ddtest` découvre et divise les fichiers et suites de tests, pas les tests Jest individuels.

## Configurez Minitest dans les projets hors Rails {#configure-minitest-in-non-rails-projects}

Pour les projets Minitest hors Rails, `ddtest` utilise `bundle exec rake test` et transmet les fichiers sélectionnés dans la variable d'environnement `TEST_FILES`. Configurez votre `Rake::TestTask` pour lire `TEST_FILES` :

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}