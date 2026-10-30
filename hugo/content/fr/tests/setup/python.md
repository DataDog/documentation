---
aliases:
- /fr/continuous_integration/setup_tests/python
- /fr/continuous_integration/tests/python
- /fr/continuous_integration/tests/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests dans Containers
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests Python
type: multi-code-lang
---
## Compatibilité {#compatibility}

Langages pris en charge :

| Langue | Version |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

Frameworks de test pris en charge :

| Framework de test | Version |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

<div class="alert alert-info">Si vous utilisez Bazel pour exécuter des tests Python, utilisez les <a href="/tests/setup/bazel/python/">règles Bazel Datadog pour les tests Python</a>.</div>

## Configuration de la méthode de rapport {#configuring-reporting-method}

Pour signaler les résultats des tests à Datadog, vous devez configurer la bibliothèque Python Datadog :

{{< tabs >}}
{{% tab "Fournisseur CI avec prise en charge de l'auto-instrumentation" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Autre fournisseur CI Cloud" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Fournisseur CI sur site" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Installation du traceur Python {#installing-the-python-tracer}

Installez le traceur Python en exécutant :

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

Pour plus d'informations, consultez la [documentation d'installation du traceur Python][1].

## Instrumentation de vos tests {#instrumenting-your-tests}

{{< tabs >}}
{{% tab "pytest" %}}

Pour activer l'instrumentation des tests `pytest`, ajoutez l'option `--ddtrace` lors de l'exécution de `pytest` .

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

Si vous souhaitez également activer le reste des intégrations APM pour obtenir plus d'informations dans votre flamegraph, ajoutez l'option `--ddtrace-patch-all` :

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

Pour une configuration supplémentaire, consultez les [Paramètres de configuration][3] .

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests}

Pour ajouter des tags personnalisés à vos tests, déclarez `ddspan` comme argument dans votre test :

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Ajout de tags][1] de la documentation sur l'instrumentation personnalisée Python .

### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests}

Tout comme pour les tags, pour ajouter des mesures personnalisées à vos tests, utilisez le span actif actuel :

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
En savoir plus sur les mesures personnalisées dans le [Guide d'ajout de mesures personnalisées][2] .

[1]: /fr/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /fr/tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

Pour instrumenter vos tests de benchmark avec `pytest-benchmark`, exécutez vos tests de benchmark avec l'option `--ddtrace` lors de l'exécution de `pytest`, et Datadog détecte automatiquement les métriques de `pytest-benchmark` :

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

Pour des configurations supplémentaires, consultez les [Paramètres de configuration][1] .

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

Pour activer l'instrumentation des tests `unittest`, exécutez vos tests en ajoutant `ddtrace-run` au début de votre commande `unittest` .

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
{{< /code-block >}}

Alternativement, si vous souhaitez activer l'instrumentation `unittest` manuellement, utilisez `patch()` pour activer l'intégration :

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

Pour des configurations supplémentaires, consultez les [Paramètres de configuration][1] .

[1]: #configuration-settings
{{% /tab %}}

{{% tab "Instrumentation manuelle (bêta)" %}}

### API de test manuel {#manual-testing-api}

<div class="alert alert-warning">L'API de test manuel de Test Optimization est en <strong>bêta</strong> et susceptible d'être modifiée.</div>

À partir de la version `2.13.0`, le [Datadog Python SDK][1] fournit l'API Test Optimization (`ddtrace.ext.test_visibility`) pour soumettre les résultats d'optimisation de test selon les besoins.

#### Exécution de l'API {#api-execution}

L'API utilise des classes pour fournir des méthodes avec espaces de noms afin de soumettre des événements d'optimisation de test.

L'exécution de test comporte deux phases :
- Découverte : informer l'API des éléments à attendre
- Exécution : soumettre les résultats (en utilisant les appels de début et de fin)

Les phases distinctes de découverte et d'exécution permettent un intervalle entre le processus d'exécution de test collectant les tests et le démarrage des tests.

Les utilisateurs de l'API doivent fournir des identifiants cohérents (décrits ci-dessous) qui sont utilisés comme références pour les éléments de Test Optimization au sein du stockage d'état de l'API.

##### Activer `test_visibility` {#enable-test-visibility}

Vous devez appeler la fonction `ddtrace.ext.test_visibility.api.enable_test_visibility()` avant d'utiliser l'API Test Optimization.

Appelez la fonction `ddtrace.ext.test_visibility.api.disable_test_visibility()` avant l'arrêt du processus pour garantir un vidage correct des données.

#### Modèle de domaine {#domain-model}

L'API repose sur quatre concepts : session de test, module de test, collection de tests et test.

Les modules, les collections et les tests forment une hiérarchie dans l'API Python Test Optimization, représentée par la relation parent de l'identifiant de l'élément.

##### Session de test {#test-session}

Une session de test représente l'exécution de test d'un projet, correspondant généralement à l'exécution d'une commande de test. Une seule session peut être découverte, démarrée et terminée lors de l'exécution du programme Test Optimization.

Appelez `ddtrace.ext.test_visibility.api.TestSession.discover()` pour découvrir la session, en passant la commande de test, un nom de framework donné et la version.

Appelez `ddtrace.ext.test_visibility.api.TestSession.start()` pour démarrer la session.

Une fois les tests terminés, appelez `ddtrace.ext.test_visibility.api.TestSession.finish()`.


##### Module de test {#test-module}

Un module de test représente une unité de travail plus petite au sein de l'exécution des tests d'un projet (un répertoire, par exemple).

Appelez `ddtrace.ext.test_visibility.api.TestModuleId()`, en fournissant le nom du module comme paramètre, pour créer un `TestModuleId`.

Appelez `ddtrace.ext.test_visibility.api.TestModule.discover()`, en passant l'objet `TestModuleId` comme argument, pour découvrir le module.

Appelez `ddtrace.ext.test_visibility.api.TestModule.start()`, en passant l'objet `TestModuleId` comme argument, pour démarrer le module.

Une fois que tous les éléments enfants au sein du module sont terminés, appelez `ddtrace.ext.test_visibility.api.TestModule.finish()`, en passant l'objet `TestModuleId` comme argument.


##### Collection de tests ;{#test-suite}

Une collection de tests représente un sous-ensemble de tests au sein des modules d'un projet (un fichier `.py`, par exemple).

Appelez `ddtrace.ext.test_visibility.api.TestSuiteId()`, en fournissant le `TestModuleId` du module parent et le nom de la collection comme arguments, pour créer un `TestSuiteId`.

Appelez `ddtrace.ext.test_visibility.api.TestSuite.discover()`, en passant l'objet `TestSuiteId` comme argument, pour découvrir la collection.

Appelez `ddtrace.ext.test_visibility.api.TestSuite.start()`, en passant l'objet `TestSuiteId` comme argument, pour démarrer la collection.

Une fois que tous les éléments enfants au sein de la collection sont terminés, appelez `ddtrace.ext.test_visibility.api.TestSuite.finish()`, en passant l'objet `TestSuiteId` comme argument.

##### Test {#test}

Un test représente un cas de test unique qui est exécuté dans le cadre d'une collection de tests.

Appelez `ddtrace.ext.test_visibility.api.TestId()`, en fournissant le `TestSuiteId` de la collection parente et le nom du test comme arguments, pour créer un `TestId`. La méthode `TestId()` accepte une chaîne analysable en JSON comme argument optionnel `parameters`. L'argument `parameters` peut être utilisé pour distinguer les tests paramétrés qui ont le même nom, mais des valeurs de paramètres différentes.

Appelez `ddtrace.ext.test_visibility.api.Test.discover()`, en passant l'objet `TestId` comme argument, pour découvrir le test. La méthode de classe `Test.discover()` accepte une chaîne comme paramètre optionnel `resource`, qui prend par défaut le `name` du `TestId`.

Appelez `ddtrace.ext.test_visibility.api.Test.start()`, en passant l'objet `TestId` comme argument, pour démarrer le test.

Appelez `ddtrace.ext.test_visibility.api.Test.mark_pass()`, en passant l'objet `TestId` comme argument, pour indiquer que le test a réussi.
Appelez `ddtrace.ext.test_visibility.api.Test.mark_fail()`, en passant l'objet `TestId` comme argument, pour indiquer que le test a échoué. `mark_fail()` accepte un objet `TestExcInfo` facultatif comme paramètre `exc_info`.
Appelez `ddtrace.ext.test_visibility.api.Test.mark_skip()`, en passant l'objet `TestId` comme argument, pour indiquer que le test a été ignoré. `mark_skip()` accepte une chaîne facultative comme paramètre `skip_reason`.

###### Informations sur l'exception {#exception-information}

La méthode de classe `ddtrace.ext.test_visibility.api.Test.mark_fail()` contient des informations sur les exceptions rencontrées lors de l'échec d'un test.

La méthode `ddtrace.ext.test_visibility.api.TestExcInfo()` accepte trois paramètres positionnels :
- `exc_type` : le type de l'exception rencontrée
- `exc_value` : l'objet `BaseException` pour l'exception
- `exc_traceback` : l'objet `Traceback` pour l'exception

###### Informations sur le propriétaire du code {#codeowner-information}

La méthode de classe `ddtrace.ext.test_visibility.api.Test.discover()` accepte une liste facultative de chaînes comme paramètre `codeowners`.

###### Informations sur le fichier source du test {#test-source-file-information}

La méthode de classe `ddtrace.ext.test_visibility.api.Test.discover()` accepte un objet `TestSourceFileInfo` facultatif comme paramètre `source_file_info`. Un objet `TestSourceFileInfo` représente le chemin et, éventuellement, les lignes de début et de fin pour un test donné.

La méthode `ddtrace.ext.test_visibility.api.TestSourceFileInfo()` accepte trois paramètres positionnels :
- `path` : un objet `pathlib.Path` (rendu relatif à la racine du dépôt par l'API `Test Optimization`)
- `start_line` : un entier facultatif représentant la ligne de début du test dans le fichier
- `end_line` : un entier optionnel représentant la ligne de fin du test dans le fichier

###### Définition des paramètres après la découverte des tests {#setting-parameters-after-test-discovery}

La méthode de classe `ddtrace.ext.test_visibility.api.Test.set_parameters()` accepte un objet `TestId` comme argument, ainsi qu'une chaîne analysable en JSON, pour définir le `parameters` du test.

**Remarque :** ceci écrase les paramètres associés au test, mais ne modifie pas le champ `TestId` de l'objet `parameters`.

La définition des paramètres après la découverte d'un test nécessite que l'objet `TestId` soit unique même sans que le champ `parameters` ne soit défini.

#### Exemple de code {#code-example}

```python
from ddtrace.ext.test_visibility import api
import pathlib
import sys

if __name__ == "__main__":
    # Enable the Test Optimization service
    api.enable_test_visibility()

    # Discover items
    api.TestSession.discover("manual_test_api_example", "my_manual_framework", "1.0.0")
    test_module_1_id = api.TestModuleId("module_1")
    api.TestModule.discover(test_module_1_id)

    test_suite_1_id = api.TestSuiteId(test_module_1_id, "suite_1")
    api.TestSuite.discover(test_suite_1_id)

    test_1_id = api.TestId(test_suite_1_id, "test_1")
    api.Test.discover(test_1_id)

    # A parameterized test with codeowners and a source file
    test_2_codeowners = ["team_1", "team_2"]
    test_2_source_info = api.TestSourceFileInfo(pathlib.Path("/path/to_my/tests.py"), 16, 35)

    parametrized_test_2_a_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_a"}'
    )
    api.Test.discover(
        parametrized_test_2_a_id,
        codeowners=test_2_codeowners,
        source_file_info=test_2_source_info,
        resource="overriden resource name A",
    )

    parametrized_test_2_b_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_b"}'
    )
    api.Test.discover(
      parametrized_test_2_b_id,
      codeowners=test_2_codeowners,
      source_file_info=test_2_source_info,
      resource="overriden resource name B"
    )

    test_3_id = api.TestId(test_suite_1_id, "test_3")
    api.Test.discover(test_3_id)

    test_4_id = api.TestId(test_suite_1_id, "test_4")
    api.Test.discover(test_4_id)


    # Start and execute items
    api.TestSession.start()

    api.TestModule.start(test_module_1_id)
    api.TestSuite.start(test_suite_1_id)

    # test_1 passes successfully
    api.Test.start(test_1_id)
    api.Test.mark_pass(test_1_id)

    # test_2's first parametrized test succeeds, but the second fails without attaching exception info
    api.Test.start(parametrized_test_2_a_id)
    api.Test.mark_pass(parametrized_test_2_a_id)

    api.Test.start(parametrized_test_2_b_id)
    api.Test.mark_fail(parametrized_test_2_b_id)

    # test_3 is skipped
    api.Test.start(test_3_id)
    api.Test.mark_skip(test_3_id, skip_reason="example skipped test")

    # test_4 fails, and attaches exception info
    api.Test.start(test_4_id)
    try:
      raise(ValueError("this test failed"))
    except:
      api.Test.mark_fail(test_4_id, exc_info=api.TestExcInfo(*sys.exc_info()))

    # Finish suites and modules
    api.TestSuite.finish(test_suite_1_id)
    api.TestModule.finish(test_module_1_id)
    api.TestSession.finish()
```

Pour des configurations supplémentaires, consultez [Configuration Settings][2].

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## Paramètres de configuration {#configuration-settings}

Pour configurer le SDK, définissez les variables d'environnement suivantes avant de démarrer le processus de test. Pour les exécuteurs de tests parallèles, définissez-les sur le processus parent afin que chaque worker en hérite.

`DD_SERVICE` (Optionnel)
: Nom du service ou de la bibliothèque à tester.<br/>
**Par défaut**: Le nom du dépôt. Si indisponible, `test` pour pytest ou `unittest` pour unittest.<br/>
**Exemple**: `my-python-app`

`DD_ENV` (Optionnel)
: Nom de l'environnement où les tests sont exécutés.<br/>
**Par défaut**: `none`<br/>
**Exemples**: `local`, `ci`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requis pour le mode Agentless)
: Activez le mode Agentless pour envoyer les résultats des tests directement à Datadog.<br/>
**Par défaut** : `false`

`DD_API_KEY` (Requis pour le mode Agentless)
: La clé d'API Datadog utilisée pour authentifier les téléchargements des résultats de test. Cette variable n'active pas le mode Agentless.<br/>
**Par défaut** : `(empty)`

`DD_SITE` (Optionnel pour le mode Agentless)
: Le [site Datadog][4] vers lequel télécharger les résultats de test. Définissez cette configuration lorsque vous utilisez un site autre que US1.<br/>
**Par défaut** : `datadoghq.com`

`DD_TRACE_AGENT_URL` (Uniquement lors de l'utilisation du Datadog Agent)
: L'URL du Datadog Agent pour la collecte des traces, sous la forme `http://hostname:port`.<br/>
**Par défaut** : `http://localhost:8126`

`DD_TEST_SESSION_NAME` (Optionnel)
: Identifie un groupe de tests, tel que `unit-tests`, `integration-tests` ou `smoke-tests`.<br/>
**Par défaut**: Le nom du job CI et la commande de test, ou la commande de test si le nom du job CI n'est pas disponible.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

Pour plus d'informations sur les tags réservés `service` et `env`, consultez [Unified Service Tagging][2].

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][3].

## Collecte des métadonnées Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Bonnes pratiques {#best-practices}

### Nom de la session de test `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Utilisez `DD_TEST_SESSION_NAME` pour définir le nom de la session de test et le groupe de tests associé. Voici des exemples de valeurs pour ce tag :

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si `DD_TEST_SESSION_NAME` n'est pas spécifié, la valeur par défaut est le nom du job CI et la commande de test. Si le nom du job CI n'est pas disponible, la commande de test est utilisée.

Le nom de la session de test doit être unique au sein d'un dépôt pour vous aider à distinguer différents groupes de tests.

#### Quand utiliser `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name} :

Il existe un ensemble de paramètres que Datadog vérifie pour établir une correspondance entre les sessions de test. La commande de test utilisée pour exécuter les tests en fait partie. Si la commande de test contient une chaîne qui change à chaque exécution, comme un dossier temporaire, Datadog considère que les sessions ne sont pas liées entre elles. Exemple :

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommande d'utiliser `DD_TEST_SESSION_NAME` si vos commandes de test varient entre les exécutions.

## Limitations connues {#known-limitations}

{{< tabs >}}

{{% tab "pytest" %}}

Les plugins pour `pytest` qui modifient l'exécution des tests peuvent entraîner un comportement inattendu.

### Parallélisation {#parallelization}

Les plugins qui introduisent la parallélisation dans `pytest` (tels que [`pytest-xdist`][1] ou [`pytest-forked`][2]) créent un événement de session pour chaque instance parallélisée.

Il existe plusieurs problèmes lorsque ces plugins sont utilisés avec `ddtrace`, bien qu'ils aient été résolus pour `pytest-xdist` dans les versions récentes de `dd-trace-py` (3.12.6 et ultérieures). Par exemple, une session, un module ou une collection peut réussir même lorsque des tests individuels échouent. De même, tous les tests peuvent réussir et la collection/session/module échouer. Cela se produit parce que ces plugins créent des sous-processus worker, et les spans créés dans le processus parent peuvent ne pas refléter les résultats des processus enfants. Pour cette raison, **l'utilisation de `ddtrace` avec `pytest-forked` n'est pas prise en charge pour le moment, tandis que `pytest-xdist` ne prend en charge que `ddtrace>=3.12.6`.**

Chaque worker signale les résultats des tests à Datadog de manière indépendante, de sorte que les tests d'un même module, exécutés dans des processus différents, génèrent des événements distincts de module ou de collection.

Le nombre total d'événements de test (et leur exactitude) reste inchangé. Les événements individuels de session, de module ou de collection peuvent présenter des résultats incohérents avec d'autres événements au sein de la même `pytest` exécution (avec `pytest-forked`).

### Ordre des tests {#test-ordering}

Les plugins qui modifient l'ordre d'exécution des tests (tels que [`pytest-randomly`][3]) peuvent créer plusieurs événements de module ou de collection. La durée et les résultats des événements de module ou de collection peuvent également être incohérents avec les résultats signalés par `pytest`.

Le nombre total d'événements de test (et leur exactitude) reste inchangé.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

Dans certains cas, si votre `unittest` exécution de test est effectuée de manière parallèle, cela peut interrompre l'instrumentation et affecter l'optimisation des tests.

Datadog vous recommande d'utiliser au maximum un processus à la fois pour éviter d'affecter l'optimisation des tests.

{{% /tab %}}

{{< /tabs >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/dd_libraries/python/
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/tracing/trace_collection/library_config/python/?tab=containers#configuration
[4]: /fr/getting_started/site/