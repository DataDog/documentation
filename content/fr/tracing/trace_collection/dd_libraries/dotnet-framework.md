---
algolia:
  tags:
  - C#
  - APM
aliases:
- /fr/tracing/dotnet
- /fr/tracing/languages/dotnet
- /fr/tracing/setup/dotnet
- /fr/tracing/setup_overview/dotnet
- /fr/agent/apm/dotnet/
- /fr/tracing/dotnet-framework
- /fr/tracing/languages/dotnet-framework
- /fr/tracing/setup/dotnet-framework
- /fr/agent/apm/dotnet-framework/
- /fr/tracing/setup_overview/dotnet-framework
- /fr/tracing/setup_overview/setup/dotnet
- /fr/tracing/setup_overview/setup/dotnet-framework
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentation
  text: Associer vos logs d'application .NET à vos traces
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentation
  text: Métriques runtime
- link: /serverless/azure_app_services/
  tag: Documentation
  text: Extension Microsoft Azure App Service
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: Surveillance .NET avec l'APM et le tracing distribué de Datadog
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Surveiller des applications ASP.NET Core conteneurisées
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Surveiller des applications ASP.NET Core conteneurisées sur AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimiser les performances de votre application .NET avec le profileur en
    continu Datadog
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Code source
  text: Exemples d'instrumentation personnalisée
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Code source
  text: Code source
title: Tracer des applications .NET Framework
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

### Frameworks .NET pris en charge {#supported-net-framework-runtimes}

Le traceur .NET prend en charge l'instrumentation sur .NET Framework 4.6.1 et ultérieur.

Pour obtenir la liste complète des bibliothèques et architectures de processeur .NET Framework de Datadog prises en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux [exigences de compatibilité][1].

## Installation et démarrage {#installation-and-getting-started}

<div class="alert alert-info">
  Pour configurer Datadog APM dans des environnements sans serveur, tels qu'AWS Lambda ou Azure Functions, voir <a href="/serverless">Sans serveur</a>.
</div>

<div class="alert alert-danger">
  <strong>Remarque :</strong> L'instrumentation automatique de Datadog repose sur l'API de profilage .NET CLR. Cette API ne permet qu'un seul abonné (par exemple, Datadog APM). Pour garantir une visibilité maximale, exécutez uniquement une solution APM dans votre environnement d'application.
</div>

### Installation {#installation}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][12].

1. [Installez le SDK.](#install-the-sdk)
3. [Activez le SDK pour votre service.](#enable-the-sdk-for-your-service)
4. [Consultez vos données en direct.](#view-your-live-data)

### Installez le SDK {#install-the-sdk}

Après avoir installé et configuré votre agent Datadog, l'étape suivante consiste à ajouter le SDK directement dans l'application pour l'instrumenter. En savoir plus sur [les informations de compatibilité][1].

Installez le traceur .NET de Datadog à l'échelle de la machine afin que tous les services sur la machine soient instrumentés ou sur une base par application, afin que les développeurs puissent gérer l'instrumentation via les dépendances de l'application. Pour voir les instructions d'installation à l'échelle de la machine, cliquez sur l'onglet Windows. Pour voir les instructions d'installation par application, cliquez sur l'onglet NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Pour installer le traceur .NET à l'échelle de la machine, procédez comme suit :

1. Téléchargez le [.NET Tracer MSI installer][1]. Utilisez l'installateur MSI x64 si vous exécutez Windows 64 bits ; cela peut instrumenter à la fois des applications 64 bits et 32 bits. Choisissez uniquement l'installateur x86 si vous exécutez Windows 32 bits. À partir de la version 3.0.0, seul l'installateur x64 est fourni, car nous ne supportons pas les systèmes d'exploitation 32 bits.

2. Exécutez l'installateur MSI de .NET Tracer avec des privilèges d'administrateur.

Vous pouvez également automatiser l'installation MSI en exécutant ce qui suit dans PowerShell : `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Cette installation n'instrumente pas les applications exécutées dans IIS. Pour les applications exécutées dans IIS, suivez le processus d'installation à l'échelle de la machine Windows.
</div>

Pour installer le traceur .NET pour certaines applications, procédez comme suit :

1. Ajoutez le `Datadog.Trace.Bundle` [NuGet package][1] à votre application.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activez le SDK pour votre service {#enable-the-sdk-for-your-service}

Pour activer le traceur .NET pour votre service, définissez les variables d'environnement requises et redémarrez l'application.

Pour des informations sur les différentes méthodes de définition des variables d'environnement, consultez [Configuration des variables d'environnement du processus](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Services Internet (IIS) {#internet-information-services-iis}

1. L'installateur MSI de .NET Tracer ajoute toutes les variables d'environnement requises. Il n'y a pas de variables d'environnement que vous devez configurer.

2. Pour instrumenter automatiquement les applications hébergées dans IIS, arrêtez complètement et redémarrez IIS en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Remarque :</strong> Utilisez toujours les commandes ci-dessus pour arrêter complètement et redémarrer IIS afin d'activer le SDK. Évitez d'utiliser l'application du Gestionnaire IIS avec l'interface graphique ou <code>iisreset.exe</code>.
   </div>


#### Services en dehors d'IIS {#services-outside-iis}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Le runtime .NET essaie de charger la bibliothèque .NET dans <em>tout</em> processus .NET qui est démarré avec ces variables d'environnement définies. Vous devez limiter l'instrumentation uniquement aux applications qui doivent être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement car cela entraîne que <em>tous</em> les processus .NET sur l'hôte soient instrumentés.</strong>
</div>

1. Définissez les variables d'environnement requises suivantes pour que l'instrumentation automatique soit attachée à votre application :

   ```
   COR_ENABLE_PROFILING=1
   ```
2. Pour les applications autonomes et les services Windows, redémarrez manuellement l'application.

{{% /tab %}}

{{% tab "NuGet" %}}

Suivez les instructions dans le fichier readme du package, également disponibles dans [`dd-trace-dotnet` le dépôt][1].
Des exemples Docker sont également disponibles dans le [dépôt][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### Consultez vos données en direct {#view-your-live-data}

Après avoir activé le traceur .NET pour votre service, procédez comme suit :

1. Redémarrez votre service.

2. Créez une charge d'application.

3. Dans Datadog, accédez à [**APM** > **APM Traces**][3].

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer des données de télémétrie de performance d'application, y compris la configuration du Tagging de Service Unifié. Lisez [Configuration de la bibliothèque][4] pour plus de détails.

## Instrumentation personnalisée {#custom-instrumentation}

L'instrumentation personnalisée dépend de votre instrumentation automatique et inclut des étapes supplémentaires selon la méthode :

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>Remarque :</strong> À partir de la version 3.0.0, l'instrumentation personnalisée nécessite également l'utilisation de l'instrumentation automatique. Vous devez viser à maintenir les versions des packages d'instrumentation automatique et personnalisée (par exemple : MSI et NuGet) synchronisées, et vous assurer de ne pas mélanger les versions majeures des packages.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Instrumentez votre application en utilisant l'instrumentation automatique.
2. Ajoutez le `Datadog.Trace` [NuGet package][1] à votre application.
3. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

{{% /tab %}}

{{< /tabs >}}

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][5].

## Configuration des variables d'environnement du processus {#configuring-process-environment-variables}

Pour attacher l'instrumentation automatique à votre service, définissez les variables d'environnement requises avant de démarrer l'application. Voir la section [Activer le SDK pour votre service](#enable-the-sdk-for-your-service) afin d'identifier les variables d'environnement à définir en fonction de votre méthode d'installation du Tracer .NET et suivez les exemples ci-dessous pour définir correctement les variables d'environnement en fonction de l'environnement de votre service instrumenté.

<div class="alert alert-danger">
  <strong>Remarque :</strong> Le runtime .NET essaie de charger la bibliothèque .NET dans <em>tout</em> processus .NET qui est démarré avec ces variables d'environnement définies. Vous devez limiter l'instrumentation uniquement aux applications qui doivent être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement car cela entraîne que <em>tous</em> les processus .NET sur l'hôte soient instrumentés.</strong>
</div>

#### Services Windows {#windows-services}

{{< tabs >}}

{{% tab "Éditeur du Registre" %}}

Dans l'Éditeur du Registre, créez une valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` et définissez les données de valeur sur :

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Utilisation de l'Éditeur du Registre pour créer des variables d'environnement pour un service Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Après l'installation du MSI, aucune configuration supplémentaire n'est nécessaire pour instrumenter automatiquement vos sites IIS. Pour définir des variables d'environnement supplémentaires qui sont héritées par tous les sites IIS, effectuez les étapes suivantes :

1. Ouvrez l'Éditeur du Registre, trouvez la valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\WAS` et ajoutez les variables d'environnement, une par ligne. Par exemple, pour ajouter l'injection de journaux et les métriques d'exécution, ajoutez les lignes suivantes aux données de valeur :
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Exécutez les commandes suivantes pour redémarrer IIS :
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Utilisation de l'Éditeur du Registre pour créer des variables d'environnement pour tous les sites IIS" >}}

#### Applications console {#console-applications}

Pour instrumenter automatiquement une application console, définissez les variables d'environnement depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Set required environment variables
SET COR_ENABLE_PROFILING=1

rem (Optionally) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/compatibility_requirements/dotnet-framework
[2]: /fr/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /fr/tracing/trace_collection/library_config/dotnet-framework/
[5]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /fr/tracing/trace_collection/library_injection_local/
[12]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent