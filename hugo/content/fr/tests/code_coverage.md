---
aliases:
- /fr/continuous_integration/guides/code_coverage/
- /fr/continuous_integration/integrate_tests/code_coverage/
- /fr/continuous_integration/tests/code_coverage/
description: Découvrez comment transmettre et utiliser les données de Code Coverage
  dans Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration GitLab Source Code
    dans Datadog
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
- link: /monitors/types/ci
  tag: Documentation
  text: En savoir plus sur les moniteurs CI
title: Code Coverage dans Datadog
---
<div class="alert alert-warning">
Cette fonctionnalité de Test Optimization est ancienne. Utilisez plutôt le nouveau produit dédié <a href="https://docs.datadoghq.com/code_coverage/">Code Coverage</a>.
</div>

## Présentation {#overview}

Code Coverage mesure le pourcentage total de code couvert par les tests exécutés dans un module ou une session.

Assurez-vous que [Test Optimization][1] est déjà configuré pour votre langage.

## Transmettre les données de Code Coverage {#report-code-coverage}

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibilité {#compatibility}

* `dd-trace>=4.45.0` et `dd-trace>=5.21.0`.
* `jest>=24.8.0`, uniquement lorsqu'il est exécuté avec `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.
* `vitest>=2.0.0`.

<div class="alert alert-danger">
  <strong>Remarque</strong> : Datadog Tracer ne génère pas de données de Code Coverage. Si vos tests sont exécutés avec la couverture de code activée, <code>dd-trace</code> il l'indique automatiquement sous le <code>test.code_coverage.lines_pct</code> tag de vos sessions de test.
</div>

#### Mocha/Cucumber-js {#mochacucumber-js}

Seul le format de Code Coverage [`Istanbul`][1] est pris en charge pour `mocha` et `cucumber-js`.

Pour transmettre les données de Code Coverage globales de vos sessions de test `mocha` et `cucumber-js`, installez [`nyc`][2] et utilisez cet outil pour encapsuler vos commandes de test :

1. Installez `nyc` :

```
npm install --save-dev nyc
```

2. Utilisez `nyc` pour encapsuler vos commandes de test :

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest {#jest}
Jest inclut Istanbul par défaut, vous n'avez donc pas besoin d'installer `nyc`. Passez simplement `--coverage` :

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

Le seul [`coverageProvider`][3] pris en charge est `babel`, qui est la valeur par défaut.

#### Vitest {#vitest}
Vitest nécessite des dépendances supplémentaires pour exécuter les tests avec la couverture de code activée. Consultez la [documentation de Vitest][4] pour plus d'informations. Une fois les dépendances installées, passez `--coverage` à votre commande de test :

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

Après avoir modifié vos commandes de test, exécutez vos tests avec la nouvelle commande `coverage` :

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilité {#compatibility-1}
* `dd-trace>=2.31.0`.

Lorsque la couverture de code est disponible, le Datadog Tracer (v2.31.0 ou ultérieure) la rapporte sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Si vous utilisez [Coverlet][1] pour calculer votre couverture de code, indiquez le chemin du fichier de rapport dans la variable d'environnement `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` lors de l'exécution de `dd-trace`. Le fichier de rapport doit être au format OpenCover ou Cobertura. Alternativement, vous pouvez activer le calcul de couverture de code intégré du Datadog Tracer avec la variable d'environnement `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Remarque** : `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` n'est utilisé que lorsque la commande instrumentée par `dd-trace ci run` est `dotnet test`, `dotnet vstest` ou `vstest.console`. Par exemple, les résultats dans la variable sont ignorés lors de l'exécution de `dd-trace ci run -- coverlet TestAssembly.dll --target dotnet --targetargs "test TestAssembly.dll"`.

### Options avancées {#advanced-options}

La couverture de code intégrée à Datadog Tracer prend en charge les options `Coverlet` et `VS Code Coverage` via le fichier `.runsettings`.

#### Structure de fichier {#file-structure}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog Code Coverage settings -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Options Coverlet {#coverlet-options}

| Option                   | Résumé                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | Exclut de la couverture de code les méthodes, classes ou assemblages dotés d'attributs.                                                                                                                |
| ExcludeByFile            | Exclut des fichiers sources spécifiques de la couverture de code.                                                                                                                |
| Exclude                  | Exclut de l'analyse de couverture de code à l'aide d'expressions de filtre.                                                                                                  |

##### Attributs {#attributes}

Vous pouvez exclure une méthode, une classe entière ou un assemblage de la couverture de code en créant et en appliquant l'attribut `ExcludeFromCodeCoverage` présent dans l'espace de noms `System.Diagnostics.CodeAnalysis`.

Excluez des attributs supplémentaires avec la propriété `ExcludeByAttribute` et le nom court de l'attribut (le nom du type sans l'espace de noms).

##### Fichiers sources {#source-files}

Excluez des fichiers sources spécifiques de la couverture de code avec la propriété `ExcludeByFile`.

* Utilisez un ou plusieurs chemins, séparés par une virgule.
* Utilisez le chemin du fichier ou le chemin du répertoire avec un caractère générique (`*`), par exemple : `dir1/*.cs`.

##### Filtres {#filters}

Les filtres offrent un contrôle précis sur ce qui est exclu à l'aide d'**expressions de filtre** avec la syntaxe suivante :

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**Les caractères génériques** sont pris en charge :

* `*` => correspond à zéro ou plusieurs caractères
* `?` => le caractère préfixé est facultatif

**Exemples** :

* `[*]*` => Exclut tous les types de tous les assemblages (rien n'est instrumenté)
* `[coverlet.*]Coverlet.Core.Coverage` => Exclut la classe `Coverage` dans l'espace de noms `Coverlet.Core` appartenant à tout assemblage correspondant à `coverlet.*` (par exemple, `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => Exclut tous les types appartenant à l'espace de noms `Coverlet.Core.Instrumentation` dans tous les assemblages
* `[coverlet.*.tests?]*` => Exclut tous les types des assemblages dont le nom commence par `coverlet.` et se termine par `.test` ou `.tests` (le `?` rend le `s` facultatif)
* `[coverlet.*]*,[*]Coverlet.Core*\` => Exclut les assemblages correspondant à `coverlet.*` et tous les types appartenant à l'espace de noms `Coverlet.Core` dans tous les assemblages

#### Options de couverture de code de VS {#vs-code-coverage-options}


Consultez [Personnaliser l'analyse de la couverture de code][2] dans la documentation Microsoft pour plus d'informations.

| Option                   | Résumé                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Exclut de la couverture de code les méthodes, les classes ou les assemblages auxquels des attributs sont appliqués.                                                                                                                |
| Sources\Exclude          | Exclut des fichiers sources spécifiques de la couverture de code.                                                                                                                |

#### Exemple de fichier runsettings {#runsettings-example}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet configuration -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS Code Coverage configuration -->
                    <CodeCoverage>
                        <Attributes>
                            <Exclude>
                                <Attribute>^System\.ObsoleteAttribute$</Attribute>
                            </Exclude>
                        </Attributes>
                        <Sources>
                            <Exclude>
                                <Source>^MyFile\.cs$</Source>
                            </Exclude>
                        </Sources>
                    </CodeCoverage>
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

[1]: https://github.com/coverlet-coverage/coverlet
[2]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### Compatibilité {#compatibility-2}
* `dd-trace-java >= 1.24.2`.

Lorsque la couverture de code est disponible, Datadog Tracer la transmet sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

[Jacoco][1] est pris en charge en tant que bibliothèque de couverture de code.

Si Jacoco est déjà configuré dans votre projet, Datadog Tracer l'instrumente et transmet automatiquement les données de couverture à Datadog.

Sinon, vous pouvez configurer le SDK pour ajouter Jacoco à vos exécutions de test au moment de l'exécution.
Utilisez la variable d'environnement `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` pour spécifier quelle [version de Jacoco][2] vous souhaitez faire injecter (par exemple : `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### Compatibilité {#compatibility-3}

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* Seules les couvertures de code [`coverage.py`][1] et [`pytest-cov`][2] sont prises en charge.


Lorsque les tests sont instrumentés avec [`coverage.py`][1] ou [`pytest-cov`][2], Datadog Tracer transmet automatiquement la couverture de code sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Pour transmettre la couverture de code totale de vos sessions de test avec [`coverage.py`][1], suivez ces étapes :

1. Installez `coverage` :

```
python3 -m pip install coverage
```

2. Exécutez votre test avec la nouvelle commande `coverage` :

```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

Autre possibilité pour transmettre la couverture de code totale de vos sessions de test avec [`pytest-cov`][2] : suivez ces étapes :

1. Installez `pytest` :

```
python3 -m pip install pytest
```

2. Installez `pytest-cov` :

```
python3 -m pip install pytest-cov
```

3. Exécutez votre test en ajoutant l'indicateur `--cov` à votre commande `pytest` :

```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### Compatibilité {#compatibility-4}

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`.

<div class="alert alert-danger">
  <strong>Remarque</strong> : La bibliothèque Datadog ne génère pas la couverture de code totale. Si vos tests sont exécutés avec la couverture de code activée, <code>datadog-ci-rb</code> la signale automatiquement sous le <code>test.code_coverage.lines_pct</code> tag de vos sessions de test.
</div>

Si [simplecov][1] est configuré dans votre projet, la bibliothèque datadog-ci-rb l'instrumente et transmet automatiquement les données de couverture à Datadog sous le tag `test.code_coverage.lines_pct` de vos sessions de test.

Cette fonctionnalité est activée par défaut. Utilisez la variable d'environnement `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` pour désactiver cette fonctionnalité (par exemple : `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`).

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### Compatibilité {#compatibility-5}

* `go test -cover`

<div class="alert alert-danger">
  <strong>Remarque</strong> : La bibliothèque Datadog ne génère pas la couverture de code totale. Si vos tests sont exécutés avec la couverture de code activée, <code>ddtest instrument</code> la signale automatiquement sous le <code>test.code_coverage.lines_pct</code> tag de vos sessions de test.
</div>

Si vos tests sont exécutés avec l'indicateur `-cover`, `ddtest instrument` rapporte automatiquement les données de couverture à Datadog sous le tag `test.code_coverage.lines_pct` pour vos sessions de test. Lorsque `go test` exécute plusieurs paquets, définissez également `-coverprofile`, car le total de la session provient de ce profil.

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilité {#compatibility-6}
* `dd-sdk-swift-testing>=2.5.3`.
* `Xcode>=14.3`.

Lorsque la couverture de code est activée, Datadog Tracer la rapporte sous le tag `test.code_coverage.lines_pct` de vos sessions de test.

Pour activer la couverture de code pour les projets Xcode, vous pouvez suivre ce guide d'Apple : [Activer la couverture de code dans votre plan de test][1].

Pour les tests SPM, ajoutez le paramètre `--enable-code-coverage` à votre invocation `swift test`.

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "Importation de rapports JUnit" %}}

### Compatibilité {#compatibility-7}
* `datadog-ci>=2.17.2`.

Vous pouvez importer une valeur de pourcentage de couverture de code lors de l'importation de rapports JUnit :

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

Dans cet exemple, `85` est le pourcentage de lignes couvertes par vos tests et doit être généré avec un outil différent.

Le rapport de couverture de code doit être généré dans un processus différent, sinon l'importation des rapports JUnit ne générera pas de rapports de couverture de code. Le nom de la métrique rapportée doit être `test.code_coverage.lines_pct`.

{{% /tab %}}
{{< /tabs >}}

## Représentez la couverture de code sous forme de graphique {#graph-code-coverage}

La couverture de code est rapportée sous le nom `@test.code_coverage.lines_pct`, qui représente le pourcentage total dans la facette et peut être tracée comme toute autre facette de mesure dans CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## Onglet de couverture de la session de test {#test-session-coverage-tab}

La couverture de code rapportée apparaît également dans l'onglet {{< ui >}}Coverage{{< /ui >}} sur la page des détails d'une session de test :

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## Exportez votre graphique {#export-your-graph}

Vous pouvez exporter votre graphique vers un [dashboard][2] ou un [notebook][3], et créer un [monitor][4] basé sur celui-ci en cliquant sur le bouton {{< ui >}}Export{{< /ui >}} :

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## Ajoutez un monitor {#add-a-monitor}

Recevez une alerte chaque fois que la couverture de code de votre service passe sous un certain seuil en créant un [CI Test Monitor][5] :

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## Consultez l'évolution de la couverture de code de votre branche {#see-your-branchs-code-coverage-evolution}

Vous pouvez également consulter l'évolution de la couverture de code sur la [page Branch Overview][6] et vérifier si elle s'améliore ou se détériore :

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## Affichez l'évolution de la couverture de code d'une pull request {#show-code-coverage-change-of-a-pull-request}

Le [commentaire de résumé des tests][7] de la pull request affiche l'évolution de la couverture de code d'une pull request GitHub par rapport à la branche par défaut.

## Test Impact Analysis et couverture de code totale {#test-impact-analysis-and-total-code-coverage}

[Test Impact Analysis][8] ne fournit **pas** automatiquement de mesures de couverture de code totale, bien que cette fonctionnalité nécessite une couverture de code _par test_ pour fonctionner.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tests/
[2]: /fr/dashboards
[3]: /fr/notebooks
[4]: /fr/monitors
[5]: /fr/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /fr/continuous_integration/tests/developer_workflows#branch-overview
[7]: /fr/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /fr/tests/test_impact_analysis