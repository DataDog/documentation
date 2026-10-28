---
description: Dépanner les artefacts du plan de parallélisation des tests, la sélection
  des nœuds CI, les tests pouvant être ignorés et les commandes personnalisées.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/test_parallelization/configuration/
  tag: Documentation
  text: Configurez la parallélisation des tests
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Dépannage de la parallélisation des tests
---
## Artefacts de plan manquants ou invalides {#missing-or-invalid-plan-artifacts}

Si `ddtest run --ci-node <N>` ne parvient pas à trouver les fichiers de test assignés, confirmez que le répertoire `.testoptimization/` du job de planification est disponible dans le job de test.

Le job de test doit avoir accès à :

- `.testoptimization/manifest.txt`
- `.testoptimization/runner/parallel-runners.txt`
- `.testoptimization/runner/tests-split/runner-N`

Lors de l'utilisation de GitHub Actions, téléchargez `.testoptimization/` avec `include-hidden-files: true` ; sinon, le téléchargement de l'artefact peut omettre le répertoire caché.

## Nombre inattendu de nœuds ou d'exécuteurs CI {#unexpected-ci-node-or-worker-count}

Si `ddtest` sélectionne plus ou moins de nœuds CI que prévu, passez en revue ces paramètres :

- `--min-parallelism` : Nombre minimal de nœuds ou d'exécuteurs CI pris en compte par `ddtest`.
- `--max-parallelism` : Nombre maximal de nœuds ou d'exécuteurs CI pris en compte par `ddtest`.
- `--ci-job-overhead` : Surcharge estimée pour le lancement d'un nœud CI supplémentaire.
- `--target-time` : Temps d'exécution cible pour la répartition sélectionnée.

Augmentez `--ci-job-overhead` pour privilégier un nombre réduit de nœuds CI. Diminuez-la pour privilégier un temps réel plus rapide.

## Aucun test pouvant être ignoré n'est appliqué {#no-skippable-tests-are-applied}

Si Test Impact Analysis ne saute pas les tests avant l'exécution de la parallélisation des tests, vérifiez que :

- Test Impact Analysis est activé pour le service de test.
- L'exécutable `git` est présent et vous exécutez `ddtest` dans un dépôt Git avec un dossier `.git`.
- Le job qui exécute `ddtest plan` et le job qui exécute les tests utilisent la même valeur `DD_SERVICE`.
- `ddtest plan` s'exécute sur le même système d'exploitation et le même environnement d'exécution de langage que vos tests.

Pour plus d'informations, consultez [Dépannage de Test Impact Analysis][1].

## Minitest n'exécute pas les fichiers sélectionnés {#minitest-does-not-run-the-selected-files}

Pour les projets Minitest hors Rails, `ddtest` utilise `bundle exec rake test` et transmet les fichiers sélectionnés dans la variable d'environnement `TEST_FILES`. Votre `Rake::TestTask` doit lire `TEST_FILES` :

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Les commandes personnalisées n'exécutent pas les fichiers attendus {#custom-commands-do-not-run-the-expected-files}

Lors de l'utilisation de `--command`, n'incluez pas les fichiers de test ou le séparateur `--` dans la commande. `ddtest` ajoute lui-même les fichiers de test sélectionnés.

Incorrect :

{{< code-block lang="bash" >}}
bin/ddtest run --command "bundle exec rspec -- spec/models/"
{{< /code-block >}}

Correct :

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec"
{{< /code-block >}}

Pour Cucumber.js, Cypress, Mocha, Playwright et Vitest, la commande doit appeler directement le framework sélectionné. Les wrappers de gestionnaires de paquets sont pris en charge. Exemple :

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework playwright --command "pnpm exec playwright test --project chromium"
{{< /code-block >}}

Si une commande JavaScript personnalisée exécute une sélection inattendue, vérifiez les entrées du framework que `ddtest` remplace :

- Chemins positionnels et fichiers de réexécution Cucumber.js
- Cypress `--spec`
- Entrées configurées Mocha `spec`
- Playwright `--shard` et options d'interface utilisateur interactive

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/test_impact_analysis/troubleshooting/