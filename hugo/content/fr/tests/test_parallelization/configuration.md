---
description: Configurez les variables d'environnement de parallélisation des tests,
  la sélection du parallélisme, les paramètres des workers et les artefacts de plan.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentation
  text: Dépannage de la parallélisation des tests
- link: /tests/test_parallelization/best_practices/
  tag: Documentation
  text: Bonnes pratiques de parallélisation des tests
title: Configurez la parallélisation des tests
---
## Variables d'environnement {#environment-variables}

La plupart des paramètres `ddtest` peuvent être transmis sous forme d'indicateur CLI ou de variable d'environnement. Les indicateurs CLI prévalent sur les variables d'environnement.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: Langage de programmation.<br/>
**Indicateur CLI :** `--platform`<br/>
**Par défaut :** `ruby`<br/>
**Valeurs prises en charge :** `ruby`, `python`, `javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: Framework de test.<br/>
**Indicateur CLI :** `--framework`<br/>
**Par défaut :** `rspec`<br/>
**Valeurs prises en charge :** `rspec`, `minitest`, `pytest`, `jest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: Remplace la commande de test par défaut. `ddtest` ajoute les fichiers de test sélectionnés et les indicateurs spécifiques au framework à la commande. Pris en charge pour Ruby, JavaScript et Python. La prise en charge de Python nécessite ddtest 1.7.0 ou une version ultérieure. Pour les versions de ddtest antérieures à 1.7.0 avec pytest, la commande ne peut pas être modifiée. Passez des indicateurs supplémentaires avec `PYTEST_ADDOPTS`. Pour plus d'informations, consultez [Commandes de test personnalisées](#custom-test-commands).<br/>
**Indicateur CLI :** `--command`<br/>
**Par défaut :** Vide<br/>
**Exemple :** `bundle exec rspec --profile`, `pnpm jest --runInBand`, `pytest`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: Nombre minimal de nœuds ou de workers CI que `ddtest` prend en compte lors de la planification.<br/>
**Indicateur CLI :** `--min-parallelism`<br/>
**Par défaut :** Nombre de processeurs physiques<br/>
**Exemple :** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: Nombre maximal de nœuds ou de workers CI que `ddtest` prend en compte lors de la planification.<br/>
**Indicateur CLI :** `--max-parallelism`<br/>
**Par défaut :** Nombre de processeurs physiques<br/>
**Exemple :** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: Surcharge estimée du lancement d'un nœud CI supplémentaire. Le planificateur `ddtest` ajoute un autre nœud CI uniquement si ce nœud réduit le temps réel d'au moins cette valeur.<br/>Consultez [Sélection du parallélisme](#parallelism-selection) pour en savoir plus.<br/>
**Indicateur CLI :** `--ci-job-overhead`<br/>
**Par défaut :** `25s`<br/>
**Exemple :** `25s`, `45s`, `1m`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_TARGET_TIME`
: Temps d'exécution cible pour le fractionnement sélectionné. `ddtest` considère d'abord les fractionnements à ce temps d'exécution ou en dessous. Si aucun fractionnement ne peut atteindre la cible dans la plage de parallélisme configurée, `ddtest` sélectionne le fractionnement avec le temps d'exécution attendu le plus bas. Consultez [Sélection du parallélisme](#parallelism-selection) pour en savoir plus.<br/>
**Indicateur CLI :** `--target-time`<br/>
**Par défaut :** `0s`<br/>
**Exemple :** `10m`, `300s`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`
: Exécute uniquement les fichiers assignés au nœud CI `N`, où `N` est indexé à partir de zéro.<br/>
**Indicateur CLI :** `--ci-node`<br/>
**Par défaut :** `-1`<br/>
**Exemple :** `0`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS`
: Nombre de workers à lancer sur ce nœud CI. Utilisez un entier positif ou `ncpu` pour utiliser tous les processeurs physiques disponibles.<br/>
**Indicateur CLI :** `--ci-node-workers`<br/>
**Par défaut :** `1`<br/>
**Exemple :** `2`, `ncpu`

`DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV`
: Définit les variables d'environnement pour chaque processus de travail. Utilisez `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables](#worker-environment-variables).<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: Modèle glob utilisé pour découvrir les fichiers de test. Par défaut `spec/**/*_spec.rb` pour RSpec, `test/**/*_test.rb` pour Minitest, la configuration pytest (`testpaths` et `python_files`) ou `**/{test_*,*_test}.py` pour pytest, et la configuration Jest ou la correspondance de test par défaut de Jest.<br/>**Indicateur CLI :**`--tests-location`<br/>**Alias :**`KNAPSACK_PRO_TEST_FILE_PATTERN`<br/>**Par défaut :**Par défaut du framework<br/>**Exemple :**`custom/spec/**/*_spec.rb`, `tests/**/*_test.py`, `packages/**/__tests__/**/*.test.ts`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN`
: Modèle glob utilisé pour exclure les fichiers de test de la découverte.<br/>
**Indicateur CLI :** `--tests-exclude-pattern`<br/>
**Alias :** `KNAPSACK_PRO_TEST_FILE_EXCLUDE_PATTERN`<br/>
**Par défaut :** Vide<br/>
**Exemple :** `spec/system/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE`
: Chemin d'accès à un fichier de cache de découverte de tests restauré. `ddtest` l'importe avant la planification et actualise le cache de découverte interne après une découverte complète réussie.<br/>
**Indicateur CLI :** `--test-discovery-cache`<br/>
**Par défaut :** Vide<br/>
**Exemple :** `.ddtest-cache/tests-discovery.json`

`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`
: Contrôle si l'omission de Test Impact Analysis utilise une granularité au niveau du test ou de la collection pour Ruby. Les valeurs non valides reviennent à `test`.<br/>
**Indicateur CLI :** `--test-skipping-mode`<br/>
**Par défaut:** `test`<br/>
**Supported values:** `test`, `suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: Force la découverte complète des tests lorsque le framework le prend en charge, y compris en mode de saut au niveau de la collection.<br/>
**Indicateur CLI :** `--force-full-test-discovery`<br/>
**Par défaut :** `false`<br/>
**Supported values:** `true`, `false`

`DD_TEST_OPTIMIZATION_RUNNER_STRICT_DISCOVERY`
: Échoue la planification lorsque la découverte complète des tests génère une erreur. Si la découverte complète est annulée (par exemple, par un délai d'attente), `ddtest` revient toujours à la découverte rapide des fichiers de test au lieu d'échouer.<br/>
**Indicateur CLI :** `--strict-discovery`<br/>
**Par défaut :** `false`<br/>
**Exemple :** `true`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: Chaîne JSON qui remplace les tags d'exécution utilisés pour récupérer les tests ignorables. Utilisez ceci lorsque `ddtest` s'exécute en dehors de l'environnement CI utilisé pour calculer les tests ignorables.<br/>
**Indicateur CLI :** `--runtime-tags`<br/>
**Alias:** `DD_TEST_OPTIMIZATION_RUNTIME_TAGS`<br/>
**Par défaut :** Vide<br/>
**Exemple :** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: Contrôle si `ddtest` imprime des rapports lisibles par l'homme après l'exécution de la commande. Ce paramètre est uniquement disponible en tant que variable d'environnement.<br/>
**Indicateur CLI :** Aucun<br/>
**Par défaut :** `true`<br/>
**Exemple :** `false`

## Parallelism selection {#parallelism-selection}

`ddtest plan` estime combien de temps prend chaque fichier de test exécutable, puis évalue chaque valeur de parallélisme entre `--min-parallelism` et `--max-parallelism`.

En mode nœud CI, cette valeur est le nombre de nœuds CI. Sur un seul nœud CI, cette valeur est le nombre de workers.

Les estimations de durée proviennent des timings p50 de la collection de tests Datadog lorsqu'ils sont disponibles et, sinon, se rabattent sur les poids de découverte locaux. Chaque nombre candidat est noté comme le temps estimé du worker le plus lent plus le nombre de nœuds multiplié par `--ci-job-overhead`.

En cas d'égalité des scores, `ddtest` préfère moins de nœuds CI ou de workers, puis un temps réel estimé plus court, puis un déséquilibre moindre entre les workers.

`ddtest` utilise le paramètre `--ci-job-overhead` pour éviter de toujours sélectionner le nombre maximum de nœuds CI. Avec la valeur par défaut de `25s`, `ddtest` n'ajoute un autre nœud CI que lorsque ce nœud est censé économiser au moins 25 secondes de temps réel.

Augmentez `--ci-job-overhead` pour utiliser moins de nœuds CI. Diminuez-la pour privilégier un temps réel plus rapide. Utilisez des valeurs de durée telles que `25s`, `1m` ou `1500ms`. Définissez `0s` pour toujours répartir l'exécution des tests sur `--max-parallelism` nœuds.

Définissez `--target-time` pour que `ddtest` évalue d'abord les fractionnements à ou en dessous de cette cible. Utilisez des valeurs de durée telles que `10m`, `300s` ou `1500ms`. La valeur par défaut, `0s`, désactive la cible.

Si aucun fractionnement ne peut atteindre la cible, `ddtest` enregistre un avertissement. Il sélectionne le split ayant le wall time estimé le plus bas, en ignorant la surcharge du job CI.

## Commandes de test personnalisées {#custom-test-commands}

Pour les frameworks Ruby et Jest, utilisez `--command` pour remplacer la commande de test par défaut :

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

Lors de l'utilisation de `--command`, n'incluez pas les fichiers de test dans la commande. `ddtest` ajoute les fichiers de test et les flags spécifiques au framework à la commande.

N'incluez pas le séparateur `--` dans `--command`. Si la commande contient `--`, `ddtest` émet un avertissement et supprime le séparateur ainsi que tout ce qui suit.

Pour pytest, `ddtest` exécute `python -m pytest <files>` par défaut. Pour les versions 1.7.0 et ultérieures, définissez `--command` pour remplacer la commande de base. Par exemple, `--command pytest` exécute le script de console `pytest` au lieu de `python -m pytest`. `ddtest` exécute `<command> <files>` et n'ajoute pas `-m pytest`. Pour transmettre des flags pytest supplémentaires sans modifier la commande de base, utilisez `PYTEST_ADDOPTS`. `ddtest` ajoute automatiquement `--ddtrace` à `PYTEST_ADDOPTS` afin que le plugin pytest `ddtrace` se charge sans modifier votre configuration pytest.

Pour Jest, `ddtest` ajoute `-r dd-trace/ci/init` au début de `NODE_OPTIONS` pour les processus de travail, à moins qu'il ne soit déjà présent, donc le package `dd-trace` doit être installé dans le projet où `ddtest` s'exécute.

## Découverte de tests Pytest {#pytest-test-discovery}

Pour pytest, `ddtest` découvre les fichiers de test en utilisant cette priorité :

1. `--tests-location` lorsqu'il est défini.
2. Configuration Pytest à partir de `pytest.ini`, `pyproject.toml`, `tox.ini` ou `setup.cfg`, en utilisant `testpaths` et `python_files`.
3. Le modèle intégré `**/{test_*,*_test}.py`.

Pytest n'a pas d'équivalent à l'indicateur de modèle de RSpec, donc `ddtest` résout le modèle en chemins de fichiers explicites avant d'appeler la commande pytest configurée. La valeur par défaut est `python -m pytest`. Pour les versions 1.7.0 et ultérieures, `--command` la remplace.

## Découverte et instrumentation des tests Jest {#jest-test-discovery-and-instrumentation}

Pour Jest, `ddtest` découvre les fichiers de test avec la commande `--listTests` de Jest. Il utilise cette priorité :

1. `--command` lorsqu'il est défini, avec `--listTests` ajouté.
2. L'exécutable local `node_modules/.bin/jest` lorsqu'il est présent.
3. `npx jest`.

Jest utilise sa propre configuration et la correspondance de test par défaut pour `--listTests`. Lorsque `--tests-location` est défini, `ddtest` filtre la liste de fichiers renvoyée par Jest après la découverte. Il ne transmet pas `--tests-location` en tant que `--testMatch` de Jest.

La prise en charge de Jest utilise Test Impact Analysis au niveau de la collection. `ddtest` fonctionne avec des fichiers et des collections de tests, et non avec des tests Jest individuels, et exécute les fichiers sélectionnés avec `--runTestsByPath`.

Pendant l'exécution, `ddtest` ajoute `-r dd-trace/ci/init` à `NODE_OPTIONS` pour les processus de travail, sauf si `NODE_OPTIONS` charge déjà `dd-trace/ci/init`.

## Variables d'environnement des processus de travail {#worker-environment-variables}

Utilisez `--worker-env` pour définir des variables d'environnement pour chaque processus de travail. La valeur prend en charge les espaces réservés `{{nodeIndex}}` and `{{workerIndex}}` espaces réservés.

`{{nodeIndex}}`
: L'index du nœud CI à partir de `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`. In single-node runs, the value is `0`.

`{{workerIndex}}`
: L'index du processus de travail au sein du nœud CI actuel, commençant à `0`.

Le format est `ENV=value`. Séparez les valeurs multiples avec `;`.

Par exemple, attribuez à chaque processus de travail sa propre base de données de test :

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest` définit automatiquement `DD_TEST_SESSION_NAME` pour chaque processus de travail sur `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>` lorsque la variable n'est pas définie. Si vous définissez `DD_TEST_SESSION_NAME`, `ddtest` le conserve et développe les mêmes espaces réservés avant de démarrer chaque processus de travail.

## Stabiliser les tags d'exécution {#stabilize-runtime-tags}

Les tests ignorables de Test Impact Analysis sont limités par des tags d'exécution tels que l'OS, l'architecture et la version de Ruby. Si `ddtest` signale souvent que 0 tests sont ignorés, vérifiez si les tags d'exécution varient selon les exécuteurs CI. Par exemple, les exécuteurs AWS peuvent signaler des valeurs `os.version` différentes selon les jobs.

Pour rendre la correspondance stable, définissez des tags d'exécution fixes dans l'environnement utilisé à la fois par `ddtest` et par les processus de travail :

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
ddtest run
{{< /code-block >}}

`ddtest` accepte également la variable d'environnement `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` spécifique à l'exécuteur et le flag CLI `--runtime-tags`.

## Artefacts de plan {#plan-artifacts}

`ddtest plan` écrit un répertoire `.testoptimization/` dans le répertoire de travail actuel. Copiez ce répertoire depuis le job de planification vers chaque job CI qui exécute `ddtest run` ou consomme des listes de fichiers de plan `ddtest`.

La plupart des intégrations doivent traiter `.testoptimization/` comme un artefact généré. Les fichiers stables pour les consommateurs externes sont :

| Fichier | Description |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | Version de la disposition du plan. |
| `.testoptimization/runner/test-files.txt` | Liste délimitée par des retours à la ligne des fichiers de test à exécuter. Chaque fichier contient au moins un test non ignoré. |
| `.testoptimization/runner/parallel-runners.txt` | Nombre de nœuds CI sélectionnés ou nombre de processus de travail. |
| `.testoptimization/runner/skippable-percentage.txt` | Pourcentage du temps de test ignoré par Test Impact Analysis. |
| `.testoptimization/runner/tests-split/runner-N` | Liste délimitée par des retours à la ligne des fichiers assignés à l'index `N`. |
| `.testoptimization/github/config` | Sortie de la matrice GitHub Actions, écrite lorsque `ddtest` détecte GitHub Actions. |

Les fichiers sous `.testoptimization/runner/cache/`, `.testoptimization/tests-discovery/` et `.testoptimization/cache/http/*.json` sont des détails d'implémentation. Utilisez-les uniquement pour le dépannage.

## Utilisez un plan avec un autre exécuteur de tests {#use-a-plan-with-another-test-runner}

Utilisez un plan `ddtest` lorsque vous souhaitez que `ddtest` sélectionne les fichiers de test exécutables, mais qu'un autre exécuteur les exécute.

Consultez [Artefacts de plan](#plan-artifacts) pour les fichiers `test-files.txt` et les fichiers `tests-split/runner-N` par exécuteur qu'un autre exécuteur peut consommer.

Par exemple, utilisez `.testoptimization/runner/test-files.txt` avec Knapsack Pro :

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

Pour pytest, activez le plugin `ddtrace` avec `PYTEST_ADDOPTS` et transmettez la liste des fichiers à `python -m pytest` :

{{< code-block lang="bash" >}}
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }--ddtrace"
if [ -s .testoptimization/runner/test-files.txt ]; then
  xargs python -m pytest < .testoptimization/runner/test-files.txt
fi
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}