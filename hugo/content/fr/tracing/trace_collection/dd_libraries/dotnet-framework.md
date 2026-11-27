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
  text: Connectez les logs d'application .NET aux traces
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
  text: Surveillance .NET avec Datadog APM et le tracing distribué
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Surveillez les applications ASP.NET Core conteneurisées
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Surveillez les applications ASP.NET Core conteneurisées sur AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimisez les performances de votre application .NET avec Datadog Continuous
    Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Code source
  text: Exemples d'instrumentation personnalisée
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Code source
  text: Code source
title: Tracing d'applications .NET Framework
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

### Runtimes .NET Framework pris en charge {#supported-net-framework-runtimes}

Le .NET Tracer prend en charge l'instrumentation sur .NET Framework >= 4.6.1.

Pour obtenir une liste complète de la prise en charge des bibliothèques et de l'architecture de processeur .NET Framework par Datadog (y compris les versions héritées et de maintenance), consultez les [Exigences de compatibilité][1].

## Installation et prise en main {#installation-and-getting-started}

<div class="alert alert-tip">Datadog recommande <a href="/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> (SSI), qui installe le SDK .NET et gère sa version depuis la configuration de votre Datadog Agent, sans modifier le code de votre application. Utilisez la configuration manuelle sur cette page si <a href="/tracing/trace_collection/single-step-apm/compatibility/">SSI ne prend pas en charge votre environnement</a> ou si vous devez gérer le SDK dans le code de votre application.</div>

<div class="alert alert-info">
  Pour configurer Datadog APM dans des environnements Serverless, tels qu'AWS Lambda ou Azure Functions, consultez <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Remarque :</strong> L'instrumentation automatique de Datadog repose sur la .NET CLR Profiling API. Cette API n'autorise qu'un seul abonné (par exemple, Datadog APM). Pour garantir une visibilité maximale, exécutez une seule solution APM au sein de votre environnement d'application.
</div>

### Installation {#installation}

Avant de commencer, vérifiez que vous avez bien [installé et configuré le Datadog Agent][12].

1. [Installez le SDK.](#install-the-sdk)
3. [Activez le SDK pour votre service.](#enable-the-sdk-for-your-service)
4. [Affichez vos données en temps réel.](#view-your-live-data)

### Installez le SDK {#install-the-sdk}

Une fois que vous avez installé et configuré votre Datadog Agent, l'étape suivante consiste à ajouter le SDK directement dans l'application pour l'instrumenter. En savoir plus sur les [informations de compatibilité][1].

Installez le .NET Tracer à l'échelle de la machine afin que tous les services de celle-ci soient instrumentés, ou par application afin que les développeurs puissent gérer l'instrumentation au moyen des dépendances de l'application. Pour voir les instructions d'installation à l'échelle de la machine, cliquez sur l'onglet Windows. Pour voir les instructions d'installation par application, cliquez sur l'onglet NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Pour installer le .NET Tracer à l'échelle de la machine :

1. Téléchargez le [programme d'installation MSI du .NET Tracer][1]. Utilisez le programme d'installation MSI x64 si vous exécutez Windows 64 bits ; cela peut instrumenter les applications 64 bits et 32 bits. Choisissez uniquement le programme d'installation x86 si vous exécutez Windows 32 bits. À partir de la v3.0.0, seul le programme d'installation x64 est fourni, car nous ne prenons pas en charge les systèmes d'exploitation 32 bits.

2. Exécutez le programme d'installation MSI du .NET Tracer avec des privilèges d'administrateur.

Vous pouvez également automatiser l'installation MSI à l'aide d'un script en exécutant la commande suivante dans PowerShell : `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Cette installation n'instrumente pas les applications s'exécutant dans IIS. Pour les applications s'exécutant dans IIS, suivez la procédure d'installation à l'échelle de la machine sous Windows.
</div>

Pour installer le .NET Tracer par application :

1. Ajoutez le `Datadog.Trace.Bundle` [paquet NuGet][1] à votre application.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activez le SDK pour votre service {#enable-the-sdk-for-your-service}

Pour activer le .NET Tracer pour votre service, définissez les variables d'environnement requises et redémarrez l'application.

Pour plus d'informations sur les différentes méthodes de définition des variables d'environnement, consultez [Configuration des variables d'environnement de processus](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. Le programme d'installation MSI du .NET Tracer ajoute toutes les variables d'environnement requises. Il n'y a aucune variable d'environnement à configurer.

2. Pour instrumenter automatiquement les applications hébergées dans IIS, arrêtez et redémarrez complètement IIS en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Remarque :</strong> Utilisez toujours les commandes ci-dessus pour arrêter et redémarrer complètement IIS afin d'activer le SDK. Évitez d'utiliser l'interface graphique du Gestionnaire des services IIS ou <code>iisreset.exe</code>.
   </div>


#### Services en dehors d'IIS {#services-outside-iis}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Le runtime .NET tente de charger la bibliothèque .NET dans <em>tout</em> processus .NET démarré avec ces variables d'environnement définies. Vous devez limiter l'instrumentation aux seules applications qui ont besoin d'être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement, car cela entraîne l'instrumentation de <em>tous</em> les processus .NET sur le host.</strong>
</div>

1. Définissez les variables d'environnement requises suivantes pour que l'instrumentation automatique s'attache à votre application :

   ```
   COR_ENABLE_PROFILING=1
   ```
2. Pour les applications autonomes et les services Windows, redémarrez manuellement l'application.

{{% /tab %}}

{{% tab "NuGet" %}}

Suivez les instructions du fichier readme du package, également disponibles dans le [`dd-trace-dotnet` référentiel][1].
Des exemples Docker sont également disponibles dans le [référentiel][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### Affichez vos données en temps réel {#view-your-live-data}

Après avoir activé le .NET Tracer pour votre service :

1. Redémarrez votre service.

2. Générez de la charge applicative.

3. Dans Datadog, accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}APM Traces{{< /ui >}}][3].

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie relatives aux performances de l'application, notamment en configurant Unified Service Tagging. Consultez [Configuration de la bibliothèque][4] pour plus de détails.

## Instrumentation personnalisée {#custom-instrumentation}

L'instrumentation personnalisée dépend de votre instrumentation automatique et inclut des étapes supplémentaires selon la méthode :

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>Remarque :</strong> À partir de la version 3.0.0, l'instrumentation personnalisée nécessite également l'utilisation de l'instrumentation automatique. Vous devez veiller à maintenir les versions des packages d'instrumentation automatique et personnalisée (par exemple : MSI et NuGet) synchronisées, et vous assurer de ne pas mélanger les versions majeures des packages.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Instrumentez votre application à l'aide de l'instrumentation automatique.
2. Ajoutez le `Datadog.Trace` [package NuGet][1] à votre application.
3. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

{{% /tab %}}

{{< /tabs >}}

Pour plus d'informations sur l'ajout de spans et de tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][5].

## Configuration des variables d'environnement de processus {#configuring-process-environment-variables}

Pour attacher l'instrumentation automatique à votre service, définissez les variables d'environnement requises avant de démarrer l'application. Consultez la section [Activez le SDK pour votre service](#enable-the-sdk-for-your-service) pour déterminer les variables d'environnement à définir selon la méthode d'installation du .NET Tracer, puis suivez les exemples ci-dessous pour les définir correctement selon l'environnement de votre service instrumenté.

<div class="alert alert-danger">
  <strong>Remarque :</strong> Le runtime .NET tente de charger la bibliothèque .NET dans <em>tous</em> les processus .NET démarrés avec ces variables d'environnement définies. Vous devez limiter l'instrumentation aux seules applications qui ont besoin d'être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement, car cela entraîne l'instrumentation de <em>tous</em> les processus .NET sur le host.</strong>
</div>

#### Services Windows {#windows-services}

{{< tabs >}}

{{% tab "Registry Editor" %}}

Dans l’application Registry Editor, créez une valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` et définissez les données de la valeur sur :

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Utilisation de Registry Editor pour créer des variables d’environnement pour un service Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Après l'installation du MSI, aucune configuration supplémentaire n'est nécessaire pour instrumenter automatiquement vos sites IIS. Pour définir des variables d'environnement supplémentaires héritées par tous les sites IIS, effectuez les étapes suivantes :

1. Ouvrez Registry Editor, recherchez la valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\WAS` et ajoutez les variables d’environnement, une par ligne. Par exemple, pour ajouter l'injection de logs et les métriques d'exécution, ajoutez les lignes suivantes aux données de la valeur :
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Exécutez les commandes suivantes pour redémarrer IIS :
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Utilisation de Registry Editor pour créer des variables d’environnement pour tous les sites IIS" >}}

#### Applications console {#console-applications}

Pour instrumenter automatiquement une application console, définissez les variables d'environnement à partir d'un fichier batch avant de démarrer votre application :

```bat
rem Set required environment variables
SET COR_ENABLE_PROFILING=1

rem (Optionally) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/compatibility_requirements/dotnet-framework
[2]: /fr/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /fr/tracing/trace_collection/library_config/dotnet-framework/
[5]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /fr/tracing/trace_collection/library_injection_local/
[12]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent