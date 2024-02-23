---
aliases:
- /fr/continuous_integration/guides/code_coverage/
- /fr/continuous_integration/integrate_tests/code_coverage/
- /fr/continuous_integration/tests/code_coverage/
description: Découvrez comment transmettre et utiliser la couverture du code dans
  Datadog.
further_reading:
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Visibility
- link: /monitors/types/ci
  tag: Documentation
  text: En savoir plus sur les monitors CI
kind: documentation
title: Couverture du code dans Datadog
---

## Présentation

La couverture du code désigne la mesure du pourcentage de couverture total du code couverte par un module ou une session.

Assurez-vous que [Test Visibility][1] est déjà configuré pour votre langage.

## Transmettre la couverture du code

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibilité

* `dd-trace>=3.20.0`
* `jest>=24.8.0`, uniquement pour une exécution avec `jest-circus`
* `mocha>=5.2.0`
* `cucumber-js>=7.0.0`
* Seule la couverture du code [`Istanbul`][1] est prise en charge.


Lorsque vos tests sont instrumentés avec [Istanbul][1], le traceur Datadog transmet automatiquement la couverture du code sous le tag `test.code_coverage.lines_pct` pour vos sessions de test. Vous pouvez utiliser [`nyc`][2] pour instrumenter des tests avec Istanbul :

Pour transmettre la couverture totale du code de vos sessions de test, procédez comme suit :

1. Installez `nyc` :
```
npm install --save-dev nyc
```

2. Incorporez votre commande de test avec `nyc` :
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

<div class="alert alert-warning">
  <strong>Remarque</strong> : Jest inclut par défaut Istanbul. Vous n'avez donc pas besoin d'installer <code>nyc</code>. Passez simplement <code>--coverage</code>.
</div>

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

3. Exécutez votre test avec la nouvelle commande `coverage` :
```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilité
* `dd-trace>=2.31.0`

Lorsque la couverture du code est disponible, le traceur Datadog (v2.31.0+) la transmet sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Si vous utilisez [Coverlet][101] pour calculer la couverture de votre code, indiquez le chemin vers le fichier du rapport dans la variable d'environnement `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` lors de l'exécution de `dd-trace`. Le fichier de rapport doit être au format OpenCover ou Cobertura. Sinon, vous pouvez activer le calcul de la couverture de code intégré au traceur Datadog avec la variable d'environnement `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

### Options avancées

La couverture de code intégrée au traceur Datadog prend en charge les options `Coverlet` et `VS Code Coverage` par le biais du fichier `.runsettings`.

#### Structure de fichier
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Paramètres de couverture du code Datadog -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Options Coverlet

| Option                   | Rôle                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | Exclut de la couverture du code les méthodes, classes ou assemblages dotés d'attributs.                                                                                                                |
| ExcludeByFile            | Exclut de la couverture du code des fichiers source spécifiques.                                                                                                                |
| Exclude                  | Exclue des éléments de l'analyse de la couverture du code à l'aide d'expressions de filtre.                                                                                                  |

##### NodeJS

Vous pouvez exclure une méthode, une classe entière ou un assemblage de la couverture du code en créant et en appliquant l'attribut `ExcludeFromCodeCoverage` au sein de l'espace de nommage `System.Diagnostics.CodeAnalysis`.

Excluez d'autres attributs avec la propriété `ExcludeByAttribute` ainsi que le nom raccourci de l'attribut (le nom du type sans l'espace de nommage).

##### Fichiers source

Excluez des fichiers source spécifiques de la couverture du code à l'aide de la propriété `ExcludeByFile`.

* Utilisez un ou plusieurs chemins séparés par des virgules.
* Utilisez un wildcard (`*`) pour spécifier un chemin vers un fichier ou un répertoire. Exemple : `dir1/*.cs`.

##### Filtres

Les filtres permettent de choisir avec précision les éléments à exclure à l'aide d'**expressions de filtre**. Vous devez respecter la syntaxe suivante :

`[<FILTRE_ASSEMBLAGE>]<FILTRE_TYPE>`

Les **wildcards** sont pris en charge :

* `*` correspond à zéro ou plusieurs caractères.
* `?` signifie que le caractère préfixe est facultatif.

**Exemples** :

* `[*]*` exclut tous les types de tous les assemblages (aucun élément n'est instrumenté).
* `[coverlet.*]Coverlet.Core.Coverage` exclut la classe `Coverage` dans l'espace de nommage `Coverlet.Core` appartenant aux assemblages qui correspondent à `coverlet.*` (`coverlet.core`, par exemple).
* `[*]Coverlet.Core.Instrumentation.*` exclut tous les types appartenant à l'espace de nommage `Coverlet.Core.Instrumentation` dans n'importe quel assemblage.
* `[coverlet.*.tests?]*` exclut tous les types dans tout les assemblages commençant par `coverlet.` et se terminant par `.test` ou `.tests` (le symbole `?` rend le caractère `s` facultatif).
* `[coverlet.*]*,[*]Coverlet.Core*\` exclut les assemblages correspondant à `coverlet.*` et exclut tous les types appartenant à l'espace de nommage `Coverlet.Core` dans n'importe quel assemblage.

#### Options de couverture du code Visual Studio


Consultez la rubrique [Personnaliser l’analyse de la couverture du code][102] de la documentation Microsoft pour en savoir plus.

| Option                   | Rôle                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Exclut de la couverture du code les méthodes, classes ou assemblages dotés d'attributs.                                                                                                                |
| Sources\Exclude          | Exclut de la couverture du code des fichiers source spécifiques.                                                                                                                |

#### Exemple runsettings
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Configuration Coverlet -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- Configuration de la couverture du code Visual Studio -->
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

[101]: https://github.com/coverlet-coverage/coverlet
[102]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### Compatibilité
* `dd-trace-java >= 1.24.2`

Lorsque la couverture du code est disponible, le traceur Datadog la transmet sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

La bibliothèque de couverture de code [Jacoco][101] est prise en charge.

Si Jacoco est déjà configuré pour votre projet, le traceur Datadog l'instrumente et transmet automatiquement les données sur la couverture à Datadog.

Sinon, vous pouvez configurer le traceur afin d'ajouter Jacoco à vos exécutions de test lors du runtime.
Utilisez la variable d'environnement `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` pour spécifier la [version de Jacoco][102] à injecter (par exemple, `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).

[101]: https://www.eclemma.org/jacoco/
[102]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent

{{% /tab %}}
{{% tab "Importations de rapports JUnit" %}}

### Compatibilité
* `datadog-ci>=2.17.2`

Vous ne pouvez pas importer une valeur de pourcentage de couverture de code si vous utilisez l'importation de rapports JUnit :

```shell
datadog-ci junit upload --service <nom_service> --report-metrics=test.code_coverage.lines_pct:85 <chemin>
```

Dans cet exemple, `85` correspond au pourcentage de lignes couvertes par vos tests. Cette valeur doit être générée avec un autre outil.

Le rapport de couverture du code doit être généré avec un processus distinct. Autrement, les importations de rapports JUnit ne généreront pas de rapports de couverture du code. Le nom de la métrique transmise doit correspondre à `test.code_coverage.lines_pct`.

{{% /tab %}}

{{% tab "Python" %}}

### Compatibilité

* `dd-trace>=2.5.0`
* `Python>=3.7`
* `coverage>=4.4.2`
* `pytest>=3.0.0`
* `pytest-cov>=2.7.0`
* `unittest>=3.8`
* Seule la couverture du code [`coverage.py`][1] et [`pytest-cov`][2] est prise en charge.


Lorsque vos tests sont instrumentés avec [`coverage.py`][1] ou [`pytest-cov`][2], le traceur Datadog transmet automatiquement la couverture du code sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Pour transmettre la couverture totale du code de vos sessions de test avec [`coverage.py`][1], procédez comme suit :

1. Installez `coverage` :
```
python3 -m pip install coverage
```

2. Exécutez votre test avec la nouvelle commande `coverage` :
```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

Sinon, pour transmettre la couverture totale du code de vos sessions de test avec [`pytest-cov`][2], procédez comme suit :

1. Installez `pytest` :
```
python3 -m pip install pytest
```

2. Installez `pytest-cov` :
```
python3 -m pip install pytest-cov
```

3. Pour exécuter votre test, ajoutez le flag `--cov` à votre commande `pytest` :
```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}

{{< /tabs >}}

## Représenter la couverture du code dans un graphique

La couverture du code est transmise via `@test.code_coverage.lines_pct`. Elle représente le pourcentage dans la facette. Cette valeur peut être représentée comme n'importe quelle autre mesure dans le CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Représenter la couverture du code dans un graphique" style="width:100%" >}}

## Onglet de couverture des sessions de test

La couverture du code transmise est également affichée dans l'onglet **Coverage** de la page des détails d'une session de test :

{{< img src="/continuous_integration/code_coverage_tab.png" text="Onglet de la couverture du code des sessions de test" style="width:100%" >}}


## Exporter votre graphique

Vous pouvez exporter votre graphique au sein d'un [dashboard][2] ou d'un [notebook][3]. Pour créer un [monitor][4] basé sur ce graphique, cliquez sur le bouton **Export** :

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Exporter la couverture du code" style="width:60%" >}}


## Ajouter un monitor

Pour recevoir une alerte lorsque la couverture du code de votre service passe sous un seuil défini, créez un [monitor de test CI][5] :

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Monitor de couverture du code" style="width:100%" >}}

## Afficher l'évolution de la couverture de code d'une branche

Vous pouvez également visualiser l'évolution de la couverture de code sur la [page Branch Overview][6], afin de vérifier si la couverture augmente ou diminue :

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Couverture du code de la vue Branch" style="width:100%" >}}


## Afficher l'évolution de la couverture de code d'une pull request

Le [commentaire de synthèse de test][8] d'une pull request compare la couverture de code d'une pull request GitHub à celle de la branche par défaut et indique son évolution.

## Intelligent Test Runner et couverture totale du code

Bien que la fonctionnalité [Intelligent Test Runner][7] nécessite la couverture du code _par test_, elle ne fournit **pas** automatiquement des mesures de la couverture totale du code.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tests/
[2]: /fr/dashboards
[3]: /fr/notebooks
[4]: /fr/monitors
[5]: /fr/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /fr/continuous_integration/tests/developer_workflows#branch-overview
[7]: /fr/continuous_integration/intelligent_test_runner/
[8]: /fr/tests/developer_workflows/#test-summaries-in-github-pull-requests