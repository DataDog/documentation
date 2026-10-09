---
description: Configurez la parallélisation des tests avec ddtest, configurez les fournisseurs
  CI et répartissez l'exécution des tests sur les nœuds CI.
further_reading:
- link: /tests/test_parallelization/configuration/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentation
  text: Dépannage de la parallélisation des tests
- link: /tests/test_parallelization/best_practices/
  tag: Documentation
  text: Bonnes pratiques de parallélisation des tests
- link: /tests/setup/
  tag: Documentation
  text: Configurer Test Optimization
title: Configurer la parallélisation des tests
---
## Prérequis {#prerequisites}

Avant de configurer la parallélisation des tests :

- Configurez [Test Optimization][1].
- Pour Ruby: utilisez la version `datadog-ci` ou ultérieure du gem `1.31.0`.
- Pour Python: utilisez la version `ddtrace` ou ultérieure du package `4.11.0` et `pytest`.
- Pour JavaScript: utilisez la version `dd-trace` ou ultérieure du package `5.111.0` pour `v5` ou `v6.0.0` ou ultérieure pour `v6`, Node.js et une [version de framework prise en charge][8]. Cucumber.js, Cypress, Mocha, Playwright et Vitest nécessitent `ddtest` 1.6.0 ou une version ultérieure.
- Activez [Test Impact Analysis][2] pour le service de test lorsque vous souhaitez que la parallélisation des tests ne divise que les tests affectés par une modification de code.

## Concepts {#concepts}

Runner
: Un programme qui exécute des tests. `ddtest` peut exécuter des tests directement ou écrire des listes de fichiers pour un autre runner.

Nœud CI
: Un environnement d'exécution CI, tel qu'un job GitHub Actions, un conteneur parallèle CircleCI, un pod Kubernetes, une VM ou une machine locale.

Worker
: Un processus démarré par `ddtest` pour exécuter des tests. Un nœud CI peut exécuter un worker ou plusieurs workers.

Planifier
: Le répertoire `.testoptimization/` généré. Il contient les fichiers de test exécutables, le parallélisme sélectionné et les listes de fichiers par nœud utilisées par `ddtest run` ou un autre runner.

Parallélisme sélectionné
: Le nombre de nœuds CI ou le nombre de workers locaux que `ddtest` choisit après avoir estimé la durée des fichiers de test.

## Installez ddtest {#install-ddtest}

Installez l'interface de ligne de commande `ddtest` dans votre job CI. Datadog publie des binaires précompilés dans [GitHub Releases][3].

{{< tabs >}}
{{% tab "GitHub CLI" %}}

{{< code-block lang="yaml" >}}
- name: Download ddtest binary
  run: |
    mkdir -p bin
    gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
    mv bin/ddtest-linux-amd64 bin/ddtest
    chmod +x bin/ddtest
  env:
    GH_TOKEN: ${{ github.token }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "curl" %}}

{{< code-block lang="bash" >}}
mkdir -p bin
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Ces exemples téléchargent le dernier binaire Linux AMD64. Pour un autre système d'exploitation ou une autre architecture, sélectionnez l'élément correspondant dans [GitHub Releases][3].

## Adoptez ddtest dans CI {#adopt-ddtest-in-ci}

Adoptez la parallélisation des tests en quatre étapes. Premièrement, ajoutez la planification sans modifier la façon dont les tests s'exécutent. Après avoir validé le plan, remplacez la commande de test existante par `ddtest`, choisissez un mode d'exécution et mesurez les économies CI.

Effectuez ces changements sur une branche de fonctionnalité. Validez et poussez chaque modification de configuration CI, puis examinez l'exécution CI résultante avant de continuer.

### 1. Ajoutez la planification des tests {#1-add-test-planning}

Après avoir configuré les dépendances et Test Optimization, ajoutez `ddtest plan` avant votre étape de test existante. Conservez la commande de test existante pendant cette étape.

Choisissez le parallélisme minimal et maximal pour votre environnement CI. Par exemple, les valeurs suivantes permettent à `ddtest` de choisir entre 1 et 8 nœuds CI ou workers locaux :

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --min-parallelism 1 \
  --max-parallelism 8
{{< /code-block >}}

`--platform` identifie la plateforme linguistique et `--framework` identifie le framework de test. Pour toutes les valeurs prises en charge et les valeurs par défaut, consultez [Configuration][4].

La planification découvre les tests, récupère la durée de test et les données de Test Impact Analysis, et choisit un niveau de parallélisme. Elle n'exécute pas les tests. Le répertoire `.testoptimization/` généré contient les fichiers de test et les sections sélectionnées pour l'exécution.

### 2. Inspectez le plan {#2-inspect-the-plan}

Les commandes suivantes sont un moyen d'inspecter le nombre de runners proposé et les fichiers de test dans les logs CI :

{{< code-block lang="bash" >}}
# Show the number of runners selected by ddtest.
cat .testoptimization/runner/parallel-runners.txt

# Count the test files selected for execution.
wc -l .testoptimization/runner/test-files.txt

# Preview the first 20 test files to verify test discovery.
sed -n '1,20p' .testoptimization/runner/test-files.txt

# Optional: List the per-runner split files to see how ddtest distributed the tests.
find .testoptimization/runner/tests-split -maxdepth 1 -type f -print
{{< /code-block >}}

Alternativement, téléchargez le répertoire `.testoptimization/` en tant qu'artefact CI et ouvrez les fichiers dans votre éditeur.

Confirmez que `test-files.txt` contient une liste de fichiers à exécuter. Si Test Impact Analysis est activé, les fichiers dont tous les tests sont ignorés sont absents du plan.

### 3. Remplacez la commande de test existante {#3-replace-the-existing-test-command}

Une fois que le plan contient les tests attendus, remplacez la commande de test existante par :

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK>
{{< /code-block >}}

`ddtest run` réutilise le plan généré plus tôt dans le workflow. Choisissez comment exécuter les sections sélectionnées en fonction de votre architecture CI.

#### Exécutez les workers sur un nœud CI {#run-workers-on-one-ci-node}

Sur un seul nœud CI, `ddtest plan` est facultatif. Exécutez `ddtest run` directement, ou exécutez `ddtest plan` et `ddtest run` successivement dans le même job si vous souhaitez inspecter le plan au préalable. Le parallélisme sélectionné est le nombre de processus worker locaux que `ddtest` démarre. La commande ne nécessite pas d'options supplémentaires.

#### Distribuez les tests sur les nœuds CI {#distribute-tests-across-ci-nodes}

Exécutez `ddtest plan` une fois dans un job de planification. Partagez le répertoire `.testoptimization/` complet avec les jobs de test et utilisez le parallélisme sélectionné pour définir la taille de votre matrice CI. Sur chaque nœud, exécutez :

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

En mode nœud CI, `ddtest` utilise un worker local par défaut. Pour démarrer plusieurs workers dans chaque nœud CI, définissez `--ci-node-workers` sur un entier positif ou `ncpu`.

Les exemples CI sur cette page montrent comment transmettre le plan généré et le nombre de runners sélectionnés entre les jobs.

### 4. Mesurer les économies CI {#4-measure-ci-savings}

Après avoir remplacé la commande de test, confirmez dans le [Test Optimization Explorer][6] que les tests attendus sont terminés. Utilisez l'[CI Visibility Explorer][7] pour comparer les durées des jobs de test et le nombre de jobs de test entre les exécutions de pipeline. Si CI Visibility n'est pas activé, utilisez les métriques de job équivalentes de votre fournisseur CI.

Si tous les workers s'exécutent sur un seul nœud CI, l'exécution parallèle raccourcit la phase de test sans modifier le nombre de nœuds CI. Si chaque worker s'exécute sur un nœud CI distinct, utilisez le nombre de runners dans `parallel-runners.txt` pour dimensionner la matrice CI. Comme Test Impact Analysis supprime les tests non affectés avant que `ddtest` ne sélectionne le nombre de runners, des modifications plus petites peuvent entraîner le démarrage d'un nombre réduit de nœuds CI.

Utilisez `--max-parallelism` pour limiter la capacité CI. Le planificateur prend en compte le coût de configuration de chaque runner supplémentaire via `--ci-job-overhead`. Pour plus de détails sur ces paramètres, consultez [Configuration][4].

Ajoutez `.testoptimization/` à `.gitignore`. Générez un nouveau plan pour chaque exécution de workflow CI et partagez-le uniquement entre les jobs correspondant à la même révision source et au même environnement d'exécution. Exécutez la planification et les tests à partir du même répertoire de travail. Pour plus de détails sur les fichiers générés, consultez [Plan artefacts][5].

## Exemples de CI {#ci-examples}

Utilisez les exemples suivants comme points de départ pour GitHub Actions et CircleCI.

{{< collapse-content title="Ruby" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Le job de planification choisit le nombre de nœuds CI et émet une matrice. Le job de test télécharge l'artefact `.testoptimization/` et exécute uniquement les fichiers assignés à son nœud de matrice.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: ruby
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: rspec
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

Le workflow de configuration exécute `ddtest plan`, stocke `.testoptimization/` et se poursuit dans un workflow de test avec le nombre de nœuds CI sélectionné.

Dans `.circleci/config.yml` :

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform ruby --framework rspec
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

Dans `.circleci/test.yml` :

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="ruby-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform ruby --framework rspec --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="Python" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Le job de planification choisit le nombre de nœuds CI et émet une matrice. Le job de test télécharge l'artefact `.testoptimization/` et exécute uniquement les fichiers assignés à son nœud de matrice.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: python
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: pytest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

Le workflow de configuration exécute `ddtest plan`, stocke `.testoptimization/` et se poursuit dans un workflow de test avec le nombre de nœuds CI sélectionné.

Dans `.circleci/config.yml` :

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform python --framework pytest
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

Dans `.circleci/test.yml` :

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="python-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform python --framework pytest --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="JavaScript" level="h3" >}}

Utilisez la même structure de job de planification et de test que pour les exemples Ruby et Python. Définissez `DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK` sur `cucumber`, `cypress`, `jest`, `mocha`, `playwright` ou `vitest`. Les exemples suivants utilisent Jest ; remplacez `jest` par le framework de votre collection de tests.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Définissez ces variables d'environnement au niveau du workflow ou du job :

{{< code-block lang="yaml" >}}
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
{{< /code-block >}}

Remplacez chaque étape de configuration de langage par l'installation des dépendances Node.js :

{{< code-block lang="yaml" >}}
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
- name: Install JavaScript dependencies
  run: npm ci
{{< /code-block >}}

Configurez Datadog Test Optimization pour JavaScript :

{{< code-block lang="yaml" >}}
- name: Configure Datadog Test Optimization
  uses: datadog/test-visibility-github-action@v2
  with:
    languages: js
    api_key: ${{ secrets.DD_API_KEY }}
    site: datadoghq.com
{{< /code-block >}}

Les commandes `ddtest plan` et `ddtest run --ci-node $Les commandes `{{ matrix.ci_node_index }}` restent inchangées lorsque la plateforme et le framework sont fournis via l'environnement.

{{% /tab %}}
{{% tab "CircleCI" %}}

Utilisez une image Node.js et définissez l'environnement d'exécution dans le job `plan` :

{{< code-block lang="yaml" >}}
jobs:
  plan:
    docker:
      - image: cimg/node:22.14
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
    steps:
      - checkout
      - run:
          name: Install JavaScript dependencies
          command: npm ci
      - test-optimization-circleci-orb/autoinstrument:
          languages: js
          site: datadoghq.com
{{< /code-block >}}

Conservez les étapes de téléchargement, de planification, de mise en cache et de continuation `ddtest` du workflow CircleCI. Dans le job de test, installez les dépendances, instrumentez automatiquement JavaScript et transmettez l'index de nœud CircleCI à `ddtest` :

{{< code-block lang="yaml" >}}
- run:
    name: Install JavaScript dependencies
    command: npm ci
- test-optimization-circleci-orb/autoinstrument:
    languages: js
    site: datadoghq.com
- run:
    name: Run tests
    command: |
      NODE_INDEX=${CIRCLE_NODE_INDEX:-0}
      bin/ddtest run --platform javascript --framework jest --ci-node "${NODE_INDEX}"
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

`ddtest` ajoute `NODE_OPTIONS=-r dd-trace/ci/init` au début pour les processus worker JavaScript, donc les dépendances du projet installées avant `ddtest plan` doivent inclure `dd-trace`. Ceci ne remplace pas la [configuration de Test Optimization][8] spécifique au framework. Par exemple, Cypress nécessite une instrumentation manuelle dans son fichier de configuration.

{{< /collapse-content >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/setup/
[2]: /fr/tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /fr/tests/test_parallelization/configuration/
[5]: /fr/tests/test_parallelization/configuration/#plan-artifacts
[6]: /fr/tests/explorer/
[7]: /fr/continuous_integration/explorer/
[8]: /fr/tests/setup/javascript/