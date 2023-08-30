---
aliases:
- /fr/continuous_integration/setup_tests/dotnet
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests au sein de conteneurs
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/intelligent_test_runner/dotnet
  tag: Documentation
  text: Accélérer l'exécution de vos tests avec Intelligent Test Runner
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Tests .NET
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

Versions de .NET prises en charge :
* .NET Framework 4.6.1+
* .NET Core 2.1, 3.1, .NET 5 et .NET 6

Frameworks de test pris en charge :
* xUnit 2.2+
* NUnit 3.0+
* MsTestV2 14+
* [BenchmarkDotNet 0.13.2][11] et versions ultérieures

### Compatibilité de la visibilité au niveau des collections de tests
La [visibilité au niveau des collections de tests][1] est prise en charge à partir de `dd-trace-dotnet>=2.16.0`.

## Configurer la méthode de transmission

Pour transmettre les résultats de test à Datadog, vous devez configurer la bibliothèque .NET Datadog :

{{< tabs >}}
{{% tab "Fournisseur de CI sur site (Agent Datadog)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{% tab "Fournisseur de CI cloud (sans Agent)" %}}

<div class="alert alert-info">Le mode sans agent est disponible à partir de la version 2.5.1 de la bibliothèque .NET Datadog.</div>

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## Installer l'interface de ligne de commande du traceur .NET

Installez ou mettez à jour la commande `dd-trace` de l'une des façons suivantes :

- En utilisant le SDK .NET via la commande :
   ```
   dotnet tool update -g dd-trace
   ```
- En téléchargeant la version appropriée :
    * Win-x64 : [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64 : [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine) : [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- Ou en téléchargeant le fichier [depuis la page Releases Github][5].

## Instrumenter les tests

<div class="alert alert-warning"><strong>Remarque</strong> : pour BenchmarkDotNet, suivez <a href="#instrumenter-des-tests-benchmarkdotnet">ces instructions</a>.</div>

Pour instrumenter votre collection de tests, ajoutez `dd-trace ci run` devant votre commande de test. Spécifiez également le nom du service ou de la bibliothèque testée avec le paramètre `--dd-service`, ainsi que l'environnement dans lequel les tests sont exécutés (par exemple, `local` pour des tests exécutés sur la machine d'un développeur ou `ci` pour des tests exécutés avec un fournisseur de CI) avec le paramètre `--dd-env`. Exemples :

{{< tabs >}}

{{% tab "dotnet test" %}}

Avec l'outil <a href="https://docs.microsoft.com/fr-fr/dotnet/core/tools/dotnet-test">test dotnet</a>

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

Avec <a href="https://docs.microsoft.com/fr-fr/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Tous les tests sont automatiquement instrumentés.

## Paramètres de configuration

Pour modifier la configuration par défaut de l'interface de ligne de commande, utilisez des arguments de ligne de commande ou des variables d'environnement. Pour consulter la liste complète des paramètres de configuration, exécutez ce qui suit :

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

La liste suivante décrit les valeurs par défaut des principaux paramètres de configuration :

`--dd-service`
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : Le nom du répertoire<br/>
**Exemple** : `my-dotnet-app`

`--dd-env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`--agent-url`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][6].

### Ajouter des tags personnalisés à des tests

Vous pouvez ajouter des tags personnalisés à vos tests à l'aide de la span active :

```csharp
// dans votre test
var scope = Tracer.Instance.ActiveScope; // à partir de Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// le test se poursuit normalement
// ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour en savoir plus sur l'ajout de tags, consultez la [rubrique dédiée][7] de la documentation relative à l'instrumentation personnalisée .NET.

### Transmission de la couverture du code

Lorsque la couverture du code est disponible, le traceur Datadog (v2.31.0+) la transmet via le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Si vous utilisez [Coverlet][14] pour calculer la couverture du code, spécifiez le chemin vers le fichier du rapport dans la variable d'environnement `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` lors de l'exécution de `dd-trace`. Le fichier du rapport doit être au format OpenCover ou Cobertura. Il est également possible d'activer la fonction de calcul de la couverture de code du traceur Datadog. Pour ce faire, définissez la variable d'environnement `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Remarque** : si vous utilisez Intelligent Test Runner, la fonction de calcul de la couverture de code du traceur est activée par défaut.

Vous pouvez consulter l'évolution de la couverture du code dans l'onglet **Coverage** d'une session de test.

### Instrumenter des tests BenchmarkDotNet

Pour instrumenter vos tests benchmarks, procédez comme suit :

1. Ajoutez le [package NuGet `Datadog.Trace.BenchmarkDotNet`][12] à votre projet (par exemple, avec `dotnet add package Datadog.Trace.BenchmarkDotNet`).
2. Configurez votre projet de façon à utiliser l'exportateur `Datadog.Trace.BenchmarkDotNet` à l'aide de l'attribut `DatadogDiagnoser` ou de la méthode d'extension `WithDatadog()`. Exemples :

{{< tabs >}}

{{% tab "Avec l'attribut [DatadogDiagnoser]" %}}
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

{{% tab "Avec la configuration" %}}
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

3. [Configurez la méthode de transmission][13].
4. Exécutez le projet benchmark comme vous le faites habituellement. Tous les tests benchmark seront automatiquement instrumentés.

{{% ci-git-metadata %}}

## Instrumentation personnalisée

<div class="alert alert-warning">
  <strong>Remarque :</strong> votre configuration d'instrumentation personnalisée varie selon la version de <code>dd-trace</code>. Pour tirer profit de l'instrumentation personnalisée, vous devez synchroniser les versions des packages NuGet <code>dd-trace</code> et <code>Datadog.Trace</code>.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET, procédez comme suit :

1. Exécutez `dd-trace --version` pour obtenir la version de l'outil.
2. Ajoutez le [package NuGet][8] `Datadog.Trace` à votre application, en prenant soin de bien choisir la version appropriée.
3. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][9].

## API de test manuel

<div class="alert alert-warning">
  <strong>Remarque :</strong> pour utiliser l'API de test manuel, vous devez ajouter le package NuGet <code>Datadog.Trace</code> dans le projet .NET cible.
</div>

SI vous utilisez XUnit, NUnit ou MSTest avec vos projets .NET, la solution CI Visibility procède automatiquement à leur instrumentation ainsi qu'à l'envoi des résultats des tests à Datadog. SI vous utilisez un framework de test non pris en charge, ou si vous avez recours à un autre mécanisme de test, vous pouvez alors utiliser l'API pour transmettre les résultats des tests à Datadog. 

L'API repose sur trois composantes, à savoir le module de test, les collections de tests et les tests.

### Module de test

Un module de test représente l'assemblage .NET comprenant les tests.

Pour lancer un module de test, appelez `TestModule.Create()` et passez le nom du module ou de l'assemblage .NET où se trouvent les tests.

Une fois tous vos tests terminés, appelez `module.Close()` ou `module.CloseAsync()` afin de forcer la bibliothèque à envoyer tous les résultats de test restants au backend.

### Collections de tests

Une collection de tests correspond à un ensemble de tests. Ces tests peuvent partager les mêmes méthodes d'initialisation et de nettoyage, ainsi que certaines variables. En .NET, les tests sont généralement implémentés sous la forme d'une classe Test ou d'une fixture contenant plusieurs méthodes de test. Une collection de tests peut également inclure des informations supplémentaires, comme des attributs ou des données sur les erreurs.

Pour créer des collections de tests dans le module de test, appelez `module.GetOrCreateSuite()` et passez le nom de la collection de tests.

Appelez `suite.Close()` lorsque l'exécution de tous les tests connexes d'une collection est terminée.

### Tests

Chaque test s'exécute au sein d'une collection. À la fin de son exécution, il doit posséder l'un des trois statuts suivants : `TestStatus.Pass`, `TestStatus.Fail` ou `TestStatus.Skip`.

Un test peut également inclure les informations supplémentaires suivantes :

- Des paramètres
- Des attributs
- Des informations sur les erreurs
- Les traits des tests
- Des données sur les benchmarks

Pour créer des tests dans une collection, appelez `suite.CreateTest()` et passez le nom du test. Lorsqu'un test se termine, appelez `test.Close()` avec l'un des statuts prédéfinis.

### Interface de l'API

{{< code-block lang="csharp" >}}
namespace Datadog.Trace.Ci
{
    /// <summary>
    /// Module de test de CI Visibility
    /// </summary>
    public sealed class TestModule
    {
        /// <summary>
        /// Récupère le framework de test
        /// </summary>
        public string? Framework { get; }
        /// <summary>
        /// Récupère le nom du module
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Récupère la date de début du module
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Ferme le module de test
        /// </summary>
        /// <remarks>Utilisez la version CloseAsync() dès que possible.</remarks>
        public void Close() { }
        /// <summary>
        /// Ferme le module de test
        /// </summary>
        /// <remarks>Utilisez la version CloseAsync() dès que possible.</remarks>
        /// <param name="duration">Durée du module de test</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Ferme le module de test
        /// </summary>
        /// <returns>Instance de la tâche </returns>
        public System.Threading.Tasks.Task CloseAsync() { }
        /// <summary>
        /// Ferme le module de test
        /// </summary>
        /// <param name="duration">Durée du module de test</param>
        /// <returns>Instance de la tâche </returns>
        public System.Threading.Tasks.Task CloseAsync(System.TimeSpan? duration) { }
        /// <summary>
        /// Crée une collection de tests pour cette session
        /// </summary>
        /// <param name="name">Nom de la collection de tests</param>
        /// <returns>Instance de la collection de tests</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name) { }
        /// <summary>
        /// Crée une collection de tests pour cette session
        /// </summary>
        /// <param name="name">Nom de la collection de tests</param>
        /// <param name="startDate">Date de début de la collection de tests</param>
        /// <returns>Instance de la collection de tests</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name, System.DateTimeOffset? startDate) { }
        /// <summary>
        /// Définit les informations sur l'erreur en fonction de l'exception
        /// </summary>
        /// <param name="exception">Instance de l'exception</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Définit les informations sur l'erreur
        /// </summary>
        /// <param name="type">Type d'erreur</param>
        /// <param name="message">Message d'erreur</param>
        /// <param name="callStack">Callstack de l'erreur</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Définit un tag de nombre pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Définit un tag de chaîne pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Crée un module de test
        /// </summary>
        /// <param name="name">Nom du module de test</param>
        /// <returns>Nouvelle instance du module de test</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name) { }
        /// <summary>
        /// Crée un module de test
        /// </summary>
        /// <param name="name">Nom du module de test</param>
        /// <param name="framework">Nom du framework de test</param>
        /// <param name="frameworkVersion">Version du framework de test</param>
        /// <returns>Nouvelle instance de module de test</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion) { }
        /// <summary>
        /// Crée un module de test
        /// </summary>
        /// <param name="name">Nom du module de test</param>
        /// <param name="framework">Nom du framework de test</param>
        /// <param name="frameworkVersion">Version du framework de test</param>
        /// <param name="startDate">Date de début de la session de test</param>
        /// <returns>Nouvelle instance du module de test</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion, System.DateTimeOffset startDate) { }
    }

    /// <summary>
    /// Collection de tests CI Visibility
    /// </summary>
    public sealed class TestSuite
    {
        /// <summary>
        /// Récupère le module de test de cette collection
        /// </summary>
        public Datadog.Trace.Ci.TestModule Module { get; }
        /// <summary>
        /// Récupère le nom de la collection de tests
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Récupère la date de début de la collection de tests
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Ferme la collection de tests
        /// </summary>
        public void Close() { }
        /// <summary>
        /// Ferme la collection de tests
        /// </summary>
        /// <param name="duration">Durée de la collection de tests</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Créer un test pour cette collection
        /// </summary>
        /// <param name="name">Nom du test</param>
        /// <returns>Instance du test</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name) { }
        /// <summary>
        /// Crée un test pour cette collection de tests
        /// </summary>
        /// <param name="name">Nom du test</param>
        /// <param name="startDate">Date de début du test</param>
        /// <returns>Instance du test</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name, System.DateTimeOffset startDate) { }
        /// <summary>
        /// Définit les informations sur l'erreur à partir de l'exception
        /// </summary>
        /// <param name="exception">Instance de l'exception</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Définit les informations sur l'erreur
        /// </summary>
        /// <param name="type">Type d'erreur</param>
        /// <param name="message">Message d'erreur</param>
        /// <param name="callStack">Callstack de l'erreur</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Définit un tag de nombre pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Définit un tag de chaîne pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, string? value) { }
    }

    /// <summary>
    /// Test CI Visibility
    /// </summary>
    public sealed class Test
    {
        /// <summary>
        /// Récupère le nom du test
        /// </summary>
        public string? Name { get; }
        /// <summary>
        /// Récupère la date de début du test
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Récupère la collection de ce test
        /// </summary>
        public Datadog.Trace.Ci.TestSuite Suite { get; }
        /// <summary>
        /// Ajoute des données de benchmark
        /// </summary>
        /// <param name="measureType">Type de mesure</param>
        /// <param name="info">Informations sur la mesure </param>
        /// <param name="statistics">Valeurs des statistiques</param>
        public void AddBenchmarkData(Datadog.Trace.Ci.BenchmarkMeasureType measureType, string info, in Datadog.Trace.Ci.BenchmarkDiscreteStats statistics) { }
        /// <summary>
        /// Ferme le test
        /// </summary>
        /// <param name="status">Statut du test</param>
        public void Close(Datadog.Trace.Ci.TestStatus status) { }
        /// <summary>
        /// Ferme le test
        /// </summary>
        /// <param name="status">Statut du test</param>
        /// <param name="duration">Durée de la collection de tests</param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration) { }
        /// <summary>
        /// Ferme le test
        /// </summary>
        /// <param name="status">Statut du test</param>
        /// <param name="duration">Durée de la collection de tests</param>
        /// <param name="skipReason">Si besoin</param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration, string? skipReason) { }
        /// <summary>
        /// Définit les métadonnées de benchmark
        /// </summary>
        /// <param name="hostInfo">Informations sur le host</param>
        /// <param name="jobInfo">Informations sur la tâche</param>
        public void SetBenchmarkMetadata(in Datadog.Trace.Ci.BenchmarkHostInfo hostInfo, in Datadog.Trace.Ci.BenchmarkJobInfo jobInfo) { }
        /// <summary>
        /// Définit les informations sur l'erreur à partir de l'exception
        /// </summary>
        /// <param name="exception">Instance de l'exception</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Définit les informations sur l'erreur
        /// </summary>
        /// <param name="type">Type d'erreur</param>
        /// <param name="message">Message d'erreur</param>
        /// <param name="callStack">Callstack de l'erreur</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Définit les paramètres du test
        /// </summary>
        /// <param name="parameters">Instance TestParameters</param>
        public void SetParameters(Datadog.Trace.Ci.TestParameters parameters) { }
        /// <summary>
        /// Définit un tag de nombre pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Définit un tag de chaîne pour le test
        /// </summary>
        /// <param name="key">Clé du tag</param>
        /// <param name="value">Valeur du tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Définit les informations sur la méthode du test
        /// </summary>
        /// <param name="methodInfo">Instance MethodInfo du test</param>
        public void SetTestMethodInfo(System.Reflection.MethodInfo methodInfo) { }
        /// <summary>
        /// Définit les traits du test
        /// </summary>
        /// <param name="traits">Dictionnaire des traits</param>
        public void SetTraits(System.Collections.Generic.Dictionary<string, System.Collections.Generic.List<string>> traits) { }
    }

    /// <summary>
    /// Statut du test
    /// </summary>
    public enum TestStatus
    {
        /// <summary>
        /// Statut d'un test réussi
        /// </summary>
        Pass = 0,
        /// <summary>
        /// Statut d'un test échoué
        /// </summary>
        Fail = 1,
        /// <summary>
        /// Statut d'un test ignoré
        /// </summary>
        Skip = 2,
    }

    /// <summary>
    /// Paramètres du test
    /// </summary>
    public class TestParameters
    {
        /// <summary>
        /// Récupère ou définit les arguments du test
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Arguments { get; set; }
        /// <summary>
        /// Récupère ou définit les métadonnées des paramètres du test
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Metadata { get; set; }
    }

    /// <summary>
    /// Statistiques discrètes de la mesure benchmark
    /// </summary>
    public readonly struct BenchmarkDiscreteStats
    {
        /// <summary>
        /// Valeur du kurtosis
        /// </summary>
        public readonly double Kurtosis;
        /// <summary>
        /// Valeur maximale
        /// </summary>
        public readonly double Max;
        /// <summary>
        /// Valeur moyenne
        /// </summary>
        public readonly double Mean;
        /// <summary>
        /// Valeur médiane
        /// </summary>
        public readonly double Median;
        /// <summary>
        /// Valeur minimale
        /// </summary>
        public readonly double Min;
        /// <summary>
        /// Nombre d'échantillons
        /// </summary>
        public readonly int N;
        /// <summary>
        /// Valeur du 90e centile
        /// </summary>
        public readonly double P90;
        /// <summary>
        /// Valeur du 95e centile
        /// </summary>
        public readonly double P95;
        /// <summary>
        /// Valeur du 99e centile
        /// </summary>
        public readonly double P99;
        /// <summary>
        /// Valeur du coefficient d'assymétrie
        /// </summary>
        public readonly double Skewness;
        /// <summary>
        /// Valeur de l'écart type
        /// </summary>
        public readonly double StandardDeviation;
        /// <summary>
        /// Valeur d'erreur standard
        /// </summary>
        public readonly double StandardError;
        /// <summary>
        /// Initialise une nouvelle instance de la structure <see cref="BenchmarkDiscreteStats"/> struct.
        /// </summary>
        /// <param name="n">Nombre d'échantillons</param>
        /// <param name="max">Valeur maximale</param>
        /// <param name="min">Valeur minimale</param>
        /// <param name="mean">Valeur moyenne</param>
        /// <param name="median">Valeur médiane</param>
        /// <param name="standardDeviation">Valeur de l'écart type</param>
        /// <param name="standardError">Valeur d'erreur standard</param>
        /// <param name="kurtosis">Valeur du kurtosis</param>
        /// <param name="skewness">Valeur du coefficient d'assymétrie</param>
        /// <param name="p99">Valeur du 99e centile</param>
        /// <param name="p95">Valeur du 95e centile</param>
        /// <param name="p90">Valeur du 90e centile</param>
        public BenchmarkDiscreteStats(int n, double max, double min, double mean, double median, double standardDeviation, double standardError, double kurtosis, double skewness, double p99, double p95, double p90) { }
        /// <summary>
        /// Récupère les statistiques discrètes de benchmark à partir d'un tableau de doubles
        /// </summary>
        /// <param name="values">Tableau de doubles</param>
        /// <returns>Instance des statistiques discrètes de benchmark</returns>
        public static Datadog.Trace.Ci.BenchmarkDiscreteStats GetFrom(double[] values) { }
    }

    /// <summary>
    /// Informations sur le host de benchmark
    /// </summary>
    public struct BenchmarkHostInfo
    {
        /// <summary>
        /// Fréquence du chronomètre
        /// </summary>
        public double? ChronometerFrequencyHertz;
        /// <summary>
        /// Résolution du chronomètre
        /// </summary>
        public double? ChronometerResolution;
        /// <summary>
        ///  Compte de cœurs logiques
        /// </summary>
        public int? LogicalCoreCount;
        /// <summary>
        /// Version du système d'exploitation
        /// </summary>
        public string? OsVersion;
        /// <summary>
        /// Compte de cœurs physiques
        /// </summary>
        public int? PhysicalCoreCount;
        /// <summary>
        /// Compte de processeurs physiques
        /// </summary>
        public int? ProcessorCount;
        /// <summary>
        /// Fréquence maximale du processeur en Hertz
        /// </summary>
        public double? ProcessorMaxFrequencyHertz;
        /// <summary>
        /// Nom du processeur
        /// </summary>
        public string? ProcessorName;
        /// <summary>
        /// Version du runtime
        /// </summary>
        public string? RuntimeVersion;
    }

    /// <summary>
    /// Informations sur la tâche de benchmark
    /// </summary>
    public struct BenchmarkJobInfo
    {
        /// <summary>
        /// Description de la tâche
        /// </summary>
        public string? Description;
        /// <summary>
        /// Plateforme de la tâche
        /// </summary>
        public string? Platform;
        /// <summary>
        /// Surnom du runtime de la tâche
        /// </summary>
        public string? RuntimeMoniker;
        /// <summary>
        /// Nom du runtime de la tâche
        /// </summary>
        public string? RuntimeName;
    }

    /// <summary>
    /// Type de mesure benchmark
    /// </summary>
    public enum BenchmarkMeasureType
    {
        /// <summary>
        /// Durée en nanosecondes
        /// </summary>
        Duration = 0,
        /// <summary>
        /// Durée d'exécution en nanosecondes
        /// </summary>
        RunTime = 1,
        /// <summary>
        /// Allocations moyennes dans le tas en octets
        /// </summary>
        MeanHeapAllocations = 2,
        /// <summary>
        /// Allocations totales dans le tas en octets
        /// </summary>
        TotalHeapAllocations = 3,
        /// <summary>
        /// Durée de lancement de l'application en nanosecondes
        /// </summary>
        ApplicationLaunch = 4,
        /// <summary>
        /// Compte gen0 du garbage collector
        /// </summary>
        GarbageCollectorGen0 = 5,
        /// <summary>
        /// Compte gen1 du garbage collector
        /// </summary>
        GarbageCollectorGen1 = 6,
        /// <summary>
        /// Compte gen2 du garbage collector
        /// </summary>
        GarbageCollectorGen2 = 7,
        /// <summary>
        /// Total d'opérations en mémoire
        /// </summary>
        MemoryTotalOperations = 8,
    }
}
{{< /code-block >}}

### Exemple de code

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

Appelez toujours `module.Close()` ou `module.CloseAsync()` à la fin de votre code, afin que toutes les données sur les tests soient transmises à Datadog.

{{% ci-information-collected %}}

De plus, si [Intelligent Test Runner][10] est activé, les données supplémentaires suivantes sont recueillies à partir de votre projet :

* Informations sur la couverture du code, y compris le nom des fichiers et les numéros des lignes analysés par chaque test

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/continuous_integration/tests/#test-suite-level-visibility
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[7]: /fr/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[8]: https://www.nuget.org/packages/Datadog.Trace
[9]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[10]: /fr/continuous_integration/intelligent_test_runner/
[11]: /fr/continuous_integration/tests/dotnet/#instrumenting-benchmarkdotnet-tests
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /fr/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://github.com/coverlet-coverage/coverlet