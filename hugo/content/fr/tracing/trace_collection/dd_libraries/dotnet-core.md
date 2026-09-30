---
algolia:
  tags:
  - C#
  - APM
aliases:
- /fr/tracing/dotnet-core
- /fr/tracing/languages/dotnet-core
- /fr/tracing/setup/dotnet-core
- /fr/agent/apm/dotnet-core/
- /fr/tracing/setup/dotnet-core
- /fr/tracing/setup_overview/dotnet-core
- /fr/tracing/setup_overview/setup/dotnet-core
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
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
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Déployer des applications ASP.NET Core sur Azure App Service
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
title: Tracer des applications .NET Core
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

### Runtimes .NET Core pris en charge {#supported-net-core-runtimes}

Le traceur .NET prend en charge l'instrumentation sur .NET Core 3.1, .NET 5, .NET 6, .NET 7, .NET 8, .NET 9 et .NET 10.

Pour obtenir la liste complète des bibliothèques et architectures de processeur .NET Core de Datadog prises en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux [exigences de compatibilité][1].

## Installation et prise en main {#installation-and-getting-started}

<div class="alert alert-info">
    Pour configurer Datadog APM dans des environnements sans serveur, tels qu'AWS Lambda ou Azure Functions, voir <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Remarque :</strong> L'instrumentation automatique de Datadog repose sur l'API de profilage .NET CLR. Cette API permet uniquement un abonné (par exemple, Datadog APM). Pour garantir une visibilité maximale, exécutez uniquement une solution APM dans votre environnement d'application. 
</div>

<div class="alert alert-info">
  Pour instrumenter des applications réduites, référencez le package NuGet <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> dans votre projet.
</div>

### Installation {#installation}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][12].

1. [Installez le SDK.](#install-the-sdk)
2. [Activez le SDK pour votre service.](#enable-the-sdk-for-your-service)
3. [Consultez vos données en direct.](#view-your-live-data)

### Installez le SDK {#install-the-sdk}

Après avoir installé et configuré votre agent Datadog, l'étape suivante consiste à ajouter le SDK directement dans l'application pour l'instrumenter. Pour en savoir plus, consultez [les informations de compatibilité][1].

Vous pouvez installer le traceur .NET Datadog à l'échelle de la machine afin que tous les services sur la machine soient instrumentés, ou vous pouvez l'installer sur une base par application pour permettre aux développeurs de gérer l'instrumentation via les dépendances de l'application. Pour voir les instructions d'installation à l'échelle de la machine, cliquez sur l'onglet Windows ou Linux. Pour voir les instructions d'installation par application, cliquez sur l'onglet NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Pour installer le traceur .NET à l'échelle de la machine, procédez comme suit :

1. Téléchargez le [.NET Tracer MSI installer][1]. Utilisez l'installateur MSI x64 si vous exécutez Windows 64 bits ; cela peut instrumenter à la fois des applications 64 bits et 32 bits. Choisissez uniquement l'installateur x86 si vous exécutez Windows 32 bits. À partir de la version 3.0.0, seul l'installateur x64 est fourni, car nous ne supportons pas les systèmes d'exploitation 32 bits.

2. Exécutez l'installateur MSI .NET Tracer avec des privilèges d'administrateur.

Vous pouvez également automatiser la configuration MSI en exécutant ce qui suit dans PowerShell : `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Pour installer le traceur .NET à l'échelle de la machine, procédez comme suit :

1. Téléchargez le dernier [.NET Tracer package][1] qui prend en charge votre système d'exploitation et votre architecture.

2. Exécutez l'une des commandes suivantes pour installer le package et créer le répertoire de journaux .NET Tracer `/var/log/datadog/dotnet` avec les autorisations appropriées :

   Debian ou Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS ou Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine ou autre distribution basée sur musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Autres distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Conteneurs ciselés {#chiseled-containers}

Pour installer le .NET Tracer dans des images Docker ciselées ou distroless (sans shell), utilisez les commandes Dockerfile suivantes :

- Utilisez `ADD` pour placer les fichiers SDK dans le conteneur.
- Utilisez `COPY --chown=$APP_UID` avec un dossier vide comme source pour créer le chemin des journaux.

Par exemple, dans votre Dockerfile :

```dockerfile
ADD datadog-dotnet-apm-<TRACER_VERSION>.tar.gz /opt/datadog/
COPY --chown=$APP_UID --from=<OTHER_STAGE> /empty/ /var/log/datadog/dotnet/
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Cette installation n'instrumente pas les applications s'exécutant dans IIS. Pour les applications s'exécutant dans IIS, suivez le processus d'installation à l'échelle de la machine Windows.
</div>

Pour installer le traceur .NET pour certaines applications, procédez comme suit :

1. Ajoutez le `Datadog.Trace.Bundle` [package NuGet][1] à votre application.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activez le SDK pour votre service {#enable-the-sdk-for-your-service}

Pour activer le traceur .NET pour votre service, définissez les variables d'environnement requises et redémarrez l'application.

Pour des informations sur les différentes méthodes de configuration des variables d'environnement, consultez [Configuration des variables d'environnement du processus](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. L'installateur MSI .NET Tracer ajoute toutes les variables d'environnement requises. Il n'y a pas de variables d'environnement que vous devez configurer.

   <div class="alert alert-danger">
     <strong>Remarque :</strong> Vous devez définir la <strong>version .NET CLR</strong> pour le pool d'applications sur <strong>Aucun code géré</strong> comme recommandé par <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. Pour instrumenter automatiquement les applications hébergées dans IIS, arrêtez complètement et redémarrez IIS en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Remarque :</strong> Utilisez toujours les commandes ci-dessus pour arrêter complètement et redémarrer IIS afin d'activer le SDK. Évitez d'utiliser l'application GUI du Gestionnaire IIS ou <code>iisreset.exe</code>.
   </div>


#### Services non dans IIS {#services-not-in-iis}

1. Définissez les variables d'environnement requises suivantes pour que l'instrumentation automatique s'attache à votre application :

   ```
   CORECLR_ENABLE_PROFILING=1
   ```
2. Pour les applications autonomes et les services Windows, redémarrez manuellement l'application.

{{% /tab %}}

{{% tab "Linux" %}}

1. Définissez les variables d'environnement requises suivantes pour que l'instrumentation automatique s'attache à votre application :

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. Pour les applications autonomes, redémarrez manuellement l'application comme vous le feriez normalement.

{{% /tab %}}

{{% tab "NuGet" %}}

Suivez les instructions dans le fichier readme du package, également disponible dans [`dd-trace-dotnet` dépôt][1].
Des exemples Docker sont également disponibles dans le [dépôt][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Affichez vos données en direct {#view-your-live-data}

Après avoir activé le traceur .NET pour votre service, procédez comme suit :

1. Redémarrez votre service.

2. Générez une charge sur votre application.

3. Dans Datadog, accédez à [**APM** > **APM Traces**][3].

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie de performance de l'application comme vous le souhaitez, y compris la configuration du Tagging de Service Unifié. Consultez [Configuration de la Bibliothèque][4] pour plus de détails.

## Instrumentation personnalisée {#custom-instrumentation}

L'instrumentation personnalisée dépend de votre instrumentation automatique et inclut des étapes supplémentaires selon la méthode :

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>Remarque :</strong> À partir de la version 3.0.0, l'instrumentation personnalisée nécessite également que vous utilisiez l'instrumentation automatique. Vous devez viser à maintenir les versions des packages d'instrumentation automatique et personnalisée (par exemple : MSI et NuGet) synchronisées, et vous assurer de ne pas mélanger les versions majeures des packages.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Instrumentez votre application en utilisant l'instrumentation automatique.
2. Ajoutez le `Datadog.Trace` [package NuGet][1] à votre application.
3. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouveaux spans.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>Remarque:</strong> À partir de la version 3.0.0, l'instrumentation personnalisée nécessite également que vous utilisiez l'instrumentation automatique. Vous devez viser à maintenir les versions des packages d'instrumentation automatique et personnalisée (par exemple : MSI et NuGet) synchronisées, et vous assurer de ne pas mélanger les versions majeures des packages.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :
1. Instrumentez votre application en utilisant l'instrumentation automatique.
2. Ajoutez le `Datadog.Trace` [package NuGet][1] à votre application.
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

Pour attacher l'instrumentation automatique à votre service, vous devez définir les variables d'environnement requises avant de démarrer l'application. Voir la section [Activer le SDK pour votre service](#enable-the-sdk-for-your-service) pour identifier quelles variables d'environnement définir en fonction de votre méthode d'installation du Traceur .NET et suivez les exemples ci-dessous pour définir correctement les variables d'environnement en fonction de l'environnement de votre service instrumenté.

### Windows {#windows}

<div class="alert alert-danger">
  <strong>Remarque:</strong> Le runtime .NET essaie de charger la bibliothèque .NET dans <em>tout</em> processus .NET qui est démarré avec ces variables d'environnement définies. Vous devez limiter l'instrumentation uniquement aux applications qui doivent être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement car cela entraîne que <em>tous</em> les processus .NET sur l'hôte soient instrumentés.</strong>
</div>

#### Services Windows {#windows-services}

{{< tabs >}}

{{% tab "Éditeur de Registre" %}}

Dans l'Éditeur de registre, créez une valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` et définissez les données de valeur sur :

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Utiliser l'Éditeur de registre pour créer des variables d'environnement pour un service Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Après l'installation du MSI, aucune configuration supplémentaire n'est nécessaire pour instrumenter automatiquement vos sites IIS. Pour définir des variables d'environnement supplémentaires qui sont héritées par tous les sites IIS, effectuez les étapes suivantes :

1. Ouvrez l'Éditeur de registre, trouvez la valeur multi-chaîne appelée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\WAS`, et ajoutez les variables d'environnement, une par ligne. Par exemple, pour ajouter l'injection de journaux et les métriques d'exécution, ajoutez les lignes suivantes aux données de valeur :
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Utiliser l'Éditeur de registre pour créer des variables d'environnement pour tous les sites IIS" >}}

#### Applications console {#console-applications}

Pour instrumenter automatiquement une application console, définissez les variables d'environnement depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Set required environment variables
SET CORECLR_ENABLE_PROFILING=1

rem (Optional) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

### Linux {#linux}

#### Script Bash {#bash-script}

Pour définir les variables d'environnement requises à l'aide d'un fichier bash avant le lancement de votre application :

```bash
# Set required environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# (Optional) Set additional Datadog environment variables, for example:
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Start your application
dotnet example.dll
```

<div class="alert alert-info"> Si vous utilisez Alpine Linux, définissez le <code>CORECLR_PROFILER_PATH</code> variable d'environnement vers un chemin pour les distributions basées sur musl : <code>linux-musl-x64/</code>.</div>

#### Conteneur Docker Linux {#linux-docker-container}

Pour définir les variables d'environnement requises sur un conteneur Docker Linux :

  ```docker
  # Set required environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # (Optional) Set additional Datadog environment variables, for example:
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (par service) {#systemctl-per-service}

Lors de l'utilisation de `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez ajouter les variables d'environnement requises à charger pour un service spécifique.

1. Créez un fichier appelé `environment.env` contenant :

    ```ini
    # Set required environment variables
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Dans le fichier de configuration du service, référencez ceci comme un [`EnvironmentFile`][1] dans le bloc de service :

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Redémarrez le service .NET pour que les paramètres de la variable d'environnement prennent effet.

#### `systemctl` (tous les services) {#systemctl-all-services}

<div class="alert alert-danger">
  <strong>Remarque :</strong> Le runtime .NET essaie de charger la bibliothèque .NET dans <em>tout</em> processus .NET qui est démarré avec ces variables d'environnement définies. Vous devez limiter l'instrumentation uniquement aux applications qui doivent être instrumentées. <strong>Ne définissez pas ces variables d'environnement globalement, car cela entraîne l'instrumentation de tous les processus .NET sur l'hôte.</strong>
</div>

Lorsque vous utilisez `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez également définir des variables d'environnement à charger pour tous les services exécutés par `systemctl`.

1. Définissez les variables d'environnement requises en exécutant [`systemctl set-environment`][6] :

    ```bash
    # Set required environment variables
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Vérifiez que les variables d'environnement ont été définies en exécutant `systemctl show-environment`.

3. Redémarrez le service .NET pour que les variables d'environnement prennent effet.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/trace_collection/compatibility/dotnet-core
[2]: /fr/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /fr/tracing/trace_collection/library_config/dotnet-core/
[5]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /fr/tracing/trace_collection/library_injection_local/
[12]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent