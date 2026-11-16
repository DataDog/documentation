---
aliases:
- /fr/continuous_integration/setup_tests/dotnet
- /fr/continuous_integration/tests/dotnet
- /fr/continuous_integration/tests/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests dans Containers
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/test_impact_analysis/dotnet
  tag: Documentation
  text: Accélérez vos jobs de test avec Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests .NET
type: multi-code-lang
---
## Compatibilité {#compatibility}

Pour obtenir une liste des runtimes et plateformes pris en charge, consultez [Compatibilité .NET Framework][18] et [Compatibilité .NET/.NET Core][19].

Frameworks de test pris en charge :

| Framework de test | Version |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## Configuration de la méthode de rapport {#configuring-reporting-method}

Pour signaler les résultats des tests à Datadog, vous devez configurer la bibliothèque .NET de Datadog :

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

## Installation de l'interface de ligne de commande du traceur .NET {#installing-the-net-tracer-cli}

Installez ou mettez à jour la commande `dd-trace` en utilisant l'une des méthodes suivantes :

- En utilisant le SDK .NET en exécutant la commande :
   ```
   dotnet tool update -g dd-trace
   ```
- En téléchargeant la version appropriée :
    * Win-x64 : [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64 : [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine) : [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- Ou en téléchargeant [depuis la page des versions GitHub][5].

## Instrumentation des tests {#instrumenting-tests}

<div class="alert alert-warning">Pour BenchmarkDotNet, suivez <a href="#instrumenting-benchmarkdotnet-tests">ces instructions</a>.</div>

Pour instrumenter votre collection de tests, faites précéder votre commande de test par `dd-trace ci run`. Vous pouvez utiliser `--dd-service` pour définir le service ou la bibliothèque en cours de test et `--dd-env` pour définir l'environnement dans lequel les tests sont exécutés. Exemple :

{{< tabs >}}

{{% tab "dotnet test" %}}

En utilisant <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a> :

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

En utilisant <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a> :

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Tous les tests sont automatiquement instrumentés.

### Compatibilité avec le package nuget Microsoft.CodeCoverage {#compatibility-with-microsoftcodecoverage-nuget-package}

Depuis la version `Microsoft.CodeCoverage` `17.2.0`, Microsoft a introduit [l'instrumentation dynamique utilisant `.NET CLR Profiling API`][16] activée par défaut uniquement sur Windows. L'instrumentation automatique de Datadog repose sur `.NET CLR Profiling API`. Cette API n'autorise qu'un seul abonné (par exemple, `dd-trace`). L'utilisation de l'instrumentation dynamique de CodeCoverage interrompt l'instrumentation automatique des tests.

La solution consiste à passer de l'instrumentation dynamique à [l'instrumentation statique][17]. Modifiez votre fichier `.runsettings` avec les paramètres de configuration suivants :

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="Code Coverage">
              <Configuration>
                <CodeCoverage>
                  <!-- Switching to static instrumentation (dynamic instrumentation collides with dd-trace instrumentation) -->
                  <EnableStaticManagedInstrumentation>True</EnableStaticManagedInstrumentation>
                  <EnableDynamicManagedInstrumentation>False</EnableDynamicManagedInstrumentation>
                  <UseVerifiableInstrumentation>False</UseVerifiableInstrumentation>
                  <EnableStaticNativeInstrumentation>True</EnableStaticNativeInstrumentation>
                  <EnableDynamicNativeInstrumentation>False</EnableDynamicNativeInstrumentation>
                  ...
                </CodeCoverage>
              </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

## Paramètres de configuration {#configuration-settings}

Vous pouvez modifier la configuration par défaut de l'interface de ligne de commande en utilisant des arguments de ligne de commande ou des variables d'environnement. Pour obtenir une liste complète des paramètres de configuration, exécutez :

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

La liste suivante indique les valeurs par défaut des paramètres de configuration clé :

`--dd-service` (Facultatif)
: Nom du service ou de la bibliothèque à tester.<br/>
**Variable d'environnement**: `DD_SERVICE`<br/>
**Par défaut**: Le nom du dépôt<br/>
**Exemple**: `my-dotnet-app`

`--dd-env` (Facultatif)
: Nom de l'environnement où les tests sont exécutés.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`--agent-url` (Uniquement lors de l'utilisation du Datadog Agent)
: L'URL du Datadog Agent pour la collecte des traces, sous la forme `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Par défaut** : `http://localhost:8126`

`test_session.name` (Disponible uniquement en tant que variable d'environnement)
: Identifie un groupe de tests, tel que `unit-tests`, `integration-tests` ou `smoke-tests`.<br/>
**Variable d'environnement** : `DD_TEST_SESSION_NAME`<br/>
**Par défaut**: Le nom du job CI et la commande de test, ou la commande de test si le nom du job CI n'est pas disponible.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

Pour plus d'informations sur les tags réservés `service` et `env`, consultez [Unified Service Tagging][6]. Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][7].

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests}

Pour ajouter des tags personnalisés aux tests, configurez d'abord [l'instrumentation personnalisée](#custom-instrumentation).

Vous pouvez ajouter des tags personnalisés à vos tests en utilisant la span actuellement active :

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Ajout de tags][8] de la documentation sur l'instrumentation personnalisée .NET.

### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests}

Pour ajouter des mesures personnalisées aux tests, configurez d'abord [l'instrumentation personnalisée](#custom-instrumentation).

Tout comme pour les tags, vous pouvez ajouter des mesures personnalisées à vos tests en utilisant le span actif :

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

Pour créer des filtres ou des visualisations pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Ajout de tags][8] de la documentation sur l'instrumentation personnalisée .NET.

En savoir plus sur les mesures personnalisées dans le [Guide d'ajout de mesures personnalisées][9].

### Rapporter la couverture de code {#reporting-code-coverage}

Lorsque la couverture de code est disponible, le Datadog Tracer (v2.31.0 ou ultérieure) la rapporte sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Si vous utilisez [Coverlet][10] pour calculer votre couverture de code, indiquez le chemin vers le fichier de rapport dans la variable d'environnement `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` lors de l'exécution de `dd-trace`. Le fichier de rapport doit être au format OpenCover ou Cobertura. Alternativement, vous pouvez activer le calcul de couverture de code intégré du Datadog Tracer avec la variable d'environnement `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Remarque** : Lorsque vous utilisez Test Impact Analysis, la couverture de code intégrée du SDK est activée par défaut.

Vous pouvez voir l'évolution de la couverture des tests dans l'onglet {{< ui >}}Coverage{{< /ui >}} d'une session de test.

Pour plus d'informations sur les options d'exclusion, consultez [Code Coverage][11].

### Instrumentation des tests BenchmarkDotNet {#instrumenting-benchmarkdotnet-tests}

Pour instrumenter vos tests BenchmarkDotNet, vous devez :

1. Ajoutez le [`Datadog.Trace.BenchmarkDotNet` package NuGet][12] à votre projet (par exemple, en utilisant `dotnet add package Datadog.Trace.BenchmarkDotNet`).
2. Configurez votre projet pour utiliser l'exportateur `Datadog.Trace.BenchmarkDotNet` en utilisant l'attribut `DatadogDiagnoser` ou la méthode d'extension `WithDatadog()`. Exemple :

{{< tabs >}}

{{% tab "Utilisation de l'attribut [DatadogDiagnoser]" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Attributes;
using Datadog.Trace.BenchmarkDotNet;

[DatadogDiagnoser]
[MemoryDiagnoser]
public class OperationBenchmark
{
    [Benchmark]
    public void Operation()
    {
        // ...
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Utilisation de la configuration" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;
using Datadog.Trace.BenchmarkDotNet;

var config = DefaultConfig.Instance
              .WithDatadog();

BenchmarkRunner.Run<OperationBenchmark>(config);
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. [Configurez la méthode de rapport][13].
4. Exécutez le projet BenchmarkDotNet comme vous le faites habituellement, tous les tests BenchmarkDotNet seront automatiquement instrumentés.

{{% ci-git-metadata %}}

## Instrumentation personnalisée {#custom-instrumentation}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Votre configuration d'instrumentation personnalisée dépend de la <code>dd-trace</code> version. Pour utiliser l'instrumentation personnalisée, vous devez maintenir synchronisées les versions des packages NuGet. <code>dd-trace</code> et <code>Datadog.Trace</code> Les packages NuGet doivent être synchronisés.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET, procédez comme suit :

1. Exécutez `dd-trace --version` pour obtenir la version de l'outil.
2. Ajoutez le `Datadog.Trace` [package NuGet][14] avec la même version à votre application.
3. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][15].

## API de test manuel {#manual-testing-api}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Pour utiliser l'API de test manuel, vous devez ajouter le <code>Datadog.Trace</code> package NuGet dans le projet .NET cible.
</div>

Si vous utilisez XUnit, NUnit ou MSTest avec vos projets .NET, Test Optimization les instrumente automatiquement et envoie les résultats des tests à Datadog. Si vous utilisez un framework de test non pris en charge ou si vous disposez d'un mécanisme de test différent, vous pouvez utiliser l'API pour signaler les résultats des tests à Datadog.

L'API repose sur trois concepts, à savoir le module de test, les collections de tests et les tests.

### Module de test {#test-module}

Un module de test représente l'assemblage .NET qui comprend les tests.

Pour démarrer un module de test, appelez `TestModule.Create()` et transmettez le nom du module ou le nom de l'assembly .NET où se trouvent les tests.

Lorsque tous vos tests sont terminés, appelez `module.Close()` ou `module.CloseAsync()`, ce qui force la bibliothèque à envoyer tous les résultats de test restants au backend.

### Collections de tests {#test-suites}

Une collection de tests comprend un ensemble de tests. Ils peuvent avoir des méthodes d'initialisation et de nettoyage communes et partager certaines variables. Dans .NET, ils sont généralement implémentés sous forme de classe de test ou de fixture contenant plusieurs méthodes de test. Une collection de tests peut éventuellement comporter des informations supplémentaires comme des attributs ou des informations d'erreur.

Créez des collections de tests dans le module de test en appelant `module.GetOrCreateSuite()` et en transmettant le nom de la collection de tests.

Appelez `suite.Close()` lorsque tous les tests associés dans la suite ont terminé leur exécution.

### Tests {#tests}

Chaque test s'exécute au sein d'une suite et doit se terminer par l'un de ces trois statuts : `TestStatus.Pass`, `TestStatus.Fail` ou `TestStatus.Skip`.

Un test peut éventuellement comporter des informations supplémentaires telles que :

- Paramètres
- Attributs
- Informations d'erreur
- Traits de test
- Données de benchmark

Créez des tests dans une suite en appelant `suite.CreateTest()` et en transmettant le nom du test. Lorsqu'un test se termine, appelez `test.Close()` avec l'un des statuts prédéfinis.

### Exemple de code {#code-example}

Le code suivant permet d'utiliser les fonctionnalités de base de l'API :

{{< code-block lang="csharp" >}}
using System.Reflection;
using Datadog.Trace.Ci;

var module = TestModule.Create(Assembly.GetExecutingAssembly().GetName().Name ?? "(dyn_module)");
module.SetTag("ModuleTag", "Value");

var suite = module.GetOrCreateSuite("MySuite");
suite.SetTag("SuiteTag", 42);

var test = suite.CreateTest("Test01");
test.SetTag("TestTag", "Value");
test.SetParameters(new TestParameters
{
    Arguments = new Dictionary<string, object>
    {
        ["a"] = 42,
        ["b"] = 0,
    }
});
test.SetTraits(new Dictionary<string, List<string>>
{
    ["Category"] = new () { "UnitTest" }
});

try
{
    var a = 42;
    var b = 0;
    var c = a / b;
}
catch (Exception ex)
{
    test.SetErrorInfo(ex);
}

test.Close(TestStatus.Fail);
suite.Close();
await module.CloseAsync();
{{< /code-block >}}

Appelez toujours `module.Close()` ou `module.CloseAsync()` à la fin afin que toutes les données de test soient transmises à Datadog.

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

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommande d'utiliser `DD_TEST_SESSION_NAME` si vos commandes de test varient entre les exécutions.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/continuous_integration/tests/setup/dotnet/?tab=onpremisesciproviderdatadogagent#instrumenting-benchmarkdotnet-tests
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /fr/getting_started/tagging/unified_service_tagging
[7]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /fr/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /fr/tests/guides/add_custom_measures/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /fr/continuous_integration/tests/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /fr/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[16]: https://github.com/microsoft/codecoverage/blob/main/docs/instrumentation.md
[17]: https://github.com/microsoft/codecoverage/blob/main/samples/Calculator/scenarios/scenario07/README.md
[18]: /fr/tracing/trace_collection/compatibility/dotnet-framework/
[19]: /fr/tracing/trace_collection/compatibility/dotnet-core/