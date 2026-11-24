---
description: Diagnostiquez les plans manquants, les sélections de tests inattendues,
  les erreurs de traceur et les défaillances des workers parallèles.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/configuration/
  tag: Documentation
  text: Référence des paramètres de parallélisation des tests
- link: /tests/troubleshooting/
  tag: Documentation
  text: Résolvez les problèmes de Test Optimization
title: Dépannage de la parallélisation des tests
---
`ddtest` signale des erreurs fatales sous forme de `[error_code] message` ; lisez le message et la sortie du framework dans vos journaux CI pour connaître la cause spécifique.

## Artefacts de plan manquants ou invalides {#missing-or-invalid-plan-artifacts}

Pour des erreurs telles que `run_plan_load_failed` ou `run_ci_node_test_files_missing` :

1. Générez un nouveau plan dans le job de planification.
2. Transférez le répertoire **complet** `.testoptimization/` vers chaque job de test, y compris les fichiers cachés et les caches.
3. Exécutez depuis le même répertoire de projet que la planification. Confirmez que `manifest.txt` se trouve directement dans `.testoptimization/`, et non dans un autre répertoire imbriqué.
4. Transmettez un `--ci-node` indexé à partir de zéro et correspondant à une affectation dans `runner/tests-split/`.

Sur GitHub Actions, utilisez `include-hidden-files: true` lors de l'envoi. Les chemins d'artefacts sont relatifs à l'espace de travail, même si les étapes shell définissent un répertoire de travail différent.

Sur CircleCI, utilisez la même clé spécifique au pipeline pour enregistrer et restaurer le cache, sans clés de repli fondées sur un préfixe. Une clé fondée uniquement sur la révision peut restaurer le plan d'une autre exécution. Ne générez pas de plan de remplacement indépendamment dans chaque worker.

## La planification est lente pour Ruby ou Python {#planning-is-slow-for-ruby-or-python}

Si la découverte de tests ralentit la planification, envisagez l'omission au niveau de la suite. Définissez `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE` sur `suite` dans l'environnement CI pour les jobs de planification et de test.

Cela réduit le travail de découverte en trouvant des fichiers de test au lieu de tests individuels. Pour pytest, cela évite la collecte et l'importation de modules de test et `conftest.py`. Le compromis est une omission moins précise : Test Impact Analysis ignore ou exécute des suites entières, si bien que davantage de tests peuvent être exécutés.

Consultez [l'omission au niveau de la suite pour Ruby et Python](/tests/test_parallelization/best_practices/#use-suite-level-skipping-for-ruby) et [le mode suite pytest](/tests/test_parallelization/configuration/#pytest-suite-mode) pour plus de détails.

## Nombre inattendu de nœuds ou d'exécuteurs CI {#unexpected-ci-node-or-worker-count}

Vérifiez ces paramètres dans le **job de planification** :

- `--min-parallelism` et `--max-parallelism` limitent le nombre. Les deux utilisent par défaut le nombre de processeurs physiques disponibles.
- `--ci-job-overhead` favorise un nombre réduit de runners à mesure qu'il augmente. La valeur par défaut est `25s` ; `0s` supprime la pénalité sans forcer le parallélisme maximal.
- `--target-time` définit une durée cible. Si aucune division ne l'atteint, le planificateur sélectionne la division prévue la plus rapide dans les limites.

En mode nœud CI, le nombre de plans désigne les nœuds CI, et `--ci-node-workers` contrôle les processus par nœud. Sur un nœud sans `--ci-node`, le nombre de plans désigne les processus locaux. Un plan sélectionnant un nœud est valide. Consultez [le réglage du parallélisme](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget).

## Aucun test pouvant être ignoré n'est appliqué {#no-skippable-tests-are-applied}

WebdriverIO prend en charge l'équilibrage, mais ne prend pas en charge l'omission des tests par Test Impact Analysis.

Vérifiez que :

- Test Impact Analysis est activé pour le service de test.
- Git est installé et `ddtest` s'exécute dans le checkout Git prévu.
- La planification et l'exécution utilisent le même `DD_SERVICE`, la même suite, la même révision source, le même système d'exploitation et le même environnement d'exécution du langage.
- Les tags d'exécution correspondent à l'environnement utilisé pour calculer les tests pouvant être ignorés.

Ruby et Python peuvent revenir à la découverte de fichiers lorsque la découverte complète échoue ou qu'un SDK Datadog est absent. Vérifiez les journaux de découverte avant de supposer qu'un plan réussi a appliqué l'omission au niveau du test. `--strict-discovery` rend les échecs de découverte complète fatals ; une découverte complète annulée utilise néanmoins la solution de repli.

Consultez [les tags d'exécution](/tests/test_parallelization/configuration/#stabilize-runtime-tags) et [le dépannage de Test Impact Analysis](/tests/test_impact_analysis/troubleshooting/).

## Pytest signale une incompatibilité de fichier d'importation ou des tests manquants {#pytest-reports-an-import-file-mismatch-or-missing-tests}

Les fichiers de test Python ayant le même nom de base peuvent entrer en conflit avec le mode d'importation par défaut de pytest. `ddtest` les sépare lorsque le nombre de runners sélectionnés est suffisant. Lors de la distribution des fichiers, il conserve tous les fichiers autrement exécutables et avertit si des noms de base en double doivent partager un runner, y compris avec un seul runner.

Pour résoudre les conflits, effectuez l'une des opérations suivantes :

- Ajoutez des fichiers `__init__.py` afin que les tests aient des noms de modules complets distincts.
- Renommez les fichiers en conflit.
- Configurez pytest avec `--import-mode=importlib`.

Des avertissements sur les noms de base peuvent encore apparaître après avoir corrigé les importations. Le fractionnement n'empêche pas les collisions lors de la découverte complète, qui collecte les tests avant la distribution. Si un avertissement liste des fichiers manquants dans les résultats de la découverte complète, examinez-les : ces fichiers ne sont pas planifiés.

En [mode suite pytest](/tests/test_parallelization/configuration/#pytest-suite-mode), la planification normale basée uniquement sur les fichiers n'applique pas les sélecteurs tels que `-k` et `-m` ; pytest les applique lors de l'exécution. La découverte complète forcée les applique également lors de la planification. `ddtest` traite le code de sortie 5 d'un worker pytest en mode suite comme un succès, de sorte qu'une exécution entièrement désélectionnée peut réussir. Vérifiez les sélecteurs et les fichiers planifiés lorsqu'aucun test ne s'exécute. Le mode test préserve les échecs liés au code de sortie 5 des workers pytest, mais un plan vide peut toujours réussir sans démarrer pytest.

## La planification fonctionne mais l'exécution ne peut pas charger le traceur {#planning-works-but-execution-cannot-load-the-tracer}

La planification ne nécessite pas de SDK Datadog ; l'exécution, si. Conservez la [configuration Test Optimization](/tests/setup/) dans chaque job de test.

Pour Python, vérifiez l'environnement utilisé par le lanceur configuré. Pour JavaScript, vérifiez le require Datadog CI existant dans `NODE_OPTIONS`, puis `DD_TRACE_PACKAGE`, puis le package `dd-trace` local au projet. Un préchargement explicite non valide provoque une erreur au lieu de revenir à une autre installation.

Conservez les chargeurs de projet et les chemins de traceur fournis par l'action. Ne remplacez pas `NODE_OPTIONS` et n'ajoutez pas de second traceur pour contourner une erreur de résolution. Consultez [l'instrumentation JavaScript](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation).

## Minitest n'exécute pas les fichiers sélectionnés {#minitest-does-not-run-the-selected-files}

Dans une application Rails détectée, `ddtest` transmet les fichiers en tant qu'arguments positionnels. Utilisez sa configuration Rails par défaut ou une substitution `bin/rails test` ou `bundle exec rails test` compatible. Une substitution `rake test` ne modifie pas le mode de transfert de fichiers. Préservez la configuration Rake personnalisée avant de changer de commande.

Pour les projets non-Rails, `ddtest` transmet les fichiers assignés via `TEST_FILES`. Mettez à jour le `Rake::TestTask` existant après sa configuration normale :

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## Les commandes personnalisées n'exécutent pas les fichiers attendus {#custom-commands-do-not-run-the-expected-files}

Comparez la commande, la configuration et l'environnement d'origine avec les étapes de planification et d'exécution. Préservez les filtres, les seeds, les reporters, la configuration partagée et les limites de suite.

`--command` doit appeler le framework sélectionné via un lanceur pris en charge. Les chaînes de shell et les scripts qui exécutent plusieurs frameworks ne sont pas pris en charge. Vitest rejette toutes les substitutions de commande.

Vérifications spécifiques au framework :

| Framework | Éléments à vérifier |
| --- | --- |
| pytest | `--tests-location` doit correspondre aux fichiers. Préservez `PYTEST_ADDOPTS` et l'environnement utilisé par le lanceur. Pour plusieurs racines, utilisez un glob entre accolades tel que `'{tests/unit,tests/integration}/**/test_*.py'`. |
| Jest | Conservez la configuration et les indicateurs de sélection, y compris un `--runInBand` existant. |
| Mocha | Conservez tous les chemins de suite et la configuration `--file` ou `--require` partagée. `ddtest` remplace les entrées `spec` configurées pendant l'exécution. |
| Cucumber.js | Les chemins et les fichiers de réexécution sélectionnent les fonctionnalités lors de la découverte, mais l'exécution lance les fichiers de fonctionnalités assignés. Utilisez des filtres de tag ou de nom pour préserver le périmètre du scénario. |
| Cypress | `ddtest` possède `--spec`. Placez un sous-ensemble dans `--tests-location` ou dans la configuration Cypress. |
| Playwright | Conservez le répertoire du package, la configuration et les projets sélectionnés. Supprimez les `--shard` natifs lorsque vous utilisez les répartitions `ddtest`. |
| Vitest | Supprimez `--command` et `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`. Utilisez la même `--vitest-config` dans les deux phases et déplacez les options de commande dans cette configuration. |
| WebdriverIO | Conservez la configuration et les sélections de capacités. Les specs groupées ne peuvent pas être distribuées sous forme de fichiers indépendants, et les grilles cloud distantes ne sont pas prises en charge. Consultez [Configuration de WebdriverIO](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio). |

Un séparateur de gestionnaire de paquets avant l'exécutable du framework est conservé. Le `--` propre à un framework met fin à ses options ; `ddtest` insère des indicateurs de découverte avant celui-ci et remplace la sélection de fichiers après celui-ci pendant l'exécution. Consultez [Commandes de test personnalisées](/tests/test_parallelization/configuration/#custom-test-commands).

## Les tests réussissent, mais la couverture ou les rapports sont absents {#tests-pass-but-coverage-or-reports-are-missing}

Vérifiez la sélection de la suite et du projet attendus, et pas seulement le code de sortie. Conservez les reporters, les chemins de sortie, le fournisseur de couverture, les seuils et les étapes de téléchargement d'origine. Attribuez aux workers exécutés en parallèle des chemins de sortie ou des noms d'artefacts distincts.

L'API Node.js de Vitest n'exécute ni les tâches de préparation définies dans les scripts du package ni les commandes du cycle de vie npm. Déplacez ces étapes avant `ddtest` et conservez les options de rapport et de couverture dans la configuration sélectionnée. Consultez [Configurer Vitest](/tests/test_parallelization/best_practices/#vitest).

## Les tests échouent uniquement en parallèle {#tests-fail-only-in-parallel}

Recherchez les bases de données partagées, les ports, les fichiers temporaires, les écrans utilisés par les navigateurs et les chemins de rapport. Conservez les vérifications de démarrage et de disponibilité de l'application dans chaque job d'exécution. Utilisez [l'isolation des workers](/tests/test_parallelization/best_practices/#isolate-workers) et réduisez le parallélisme pendant l'investigation.

Ne combinez pas les affectations `ddtest` avec un autre outil de répartition de la suite complète. Vérifiez que chaque worker exécute son affectation et que la commande de suite complète d'origine ne s'exécute plus en parallèle.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}