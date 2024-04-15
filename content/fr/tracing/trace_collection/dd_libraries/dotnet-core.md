---
aliases:
- /fr/tracing/dotnet-core
- /fr/tracing/languages/dotnet-core
- /fr/tracing/setup/dotnet-core
- /fr/agent/apm/dotnet-core/
- /fr/tracing/setup/dotnet-core
- /fr/tracing/setup_overview/dotnet-core
- /fr/tracing/setup_overview/setup/dotnet-core
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
  tag: GitHub
  text: Optimiser les performances de votre application .NET avec le profileur en
    continu Datadog
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: Exemples d'instrumentation personnalisée
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: Code source

title: Tracer des applications .NET Core
type: multi-code-lang
---

## Exigences de compatibilité

### Runtimes .NET Core pris en charge

Le traceur .NET prend en charge l'instrumentation sur .NET Core 2.1 et 3.1, .NET 5, .NET 6 et .NET 7.

Pour obtenir la liste complète des bibliothèques et architectures de processeur .NET Core de Datadog prises en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux [exigences de compatibilité][1].

## Installation et démarrage

<div class="alert alert-info">
  <div class="alert-info">
    <div><strong>Datadog vous recommande de suivre les <a href="https://app.datadoghq.com/apm/service-setup">instructions de démarrage rapide</a></strong> fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment les sections suivantes :</div>
    <div>- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;</div>
    <div>- Définir les tags <code>service</code>, <code>env</code> et <code>version</code> de façon dynamique ;</div>
    <div>- Activer l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.</div><br/>
    <div>Par ailleurs, pour configurer la solution APM Datadog dans AWS Lambda, consultez la section relative au <strong><a href="/tracing/serverless_functions/">tracing des fonctions sans serveur</a></strong>. Pour la configurer dans Azure App Service, consultez la section relative au <strong><a href="/serverless/azure_app_services/">tracing d'Azure App Service</a></strong>.</div>
  </div>
</div>

<div class="alert alert-warning">
  <strong>Remarque :</strong> l'instrumentation automatique Datadog repose sur l'API CLR Profiling .NET. Celle-ci permet seulement d'ajouter un abonné (par exemple, le traceur .NET Datadog avec le profileur activé). Pour bénéficier d'une visibilité optimisée, exécutez une seule solution APM dans l'environnement de votre application.
</div>

<div class="alert alert-info">
  Pour instrumenter des applications découpées, ajoutez le package NuGet <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> comme référence dans votre projet. La prise en charge des applications découpées est en version bêta.
</div>

### Installation

1. [Configurer l'Agent Datadog pour l'APM](#configurer-l-agent-datadog-pour-l-apm)
2. [Installer le traceur](#installer-le-traceur)
3. [Activer le traceur](#enable-the-tracer-for-your-service)
4. [Visualiser vos données en temps réel](#visualiser-vos-donnees-en-temps-reel)

### Configurer l'Agent Datadog pour l'APM

[Installez et configurez l'Agent Datadog][2] de façon à ce qu'il reçoive les traces provenant de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` avec l'option `enabled: true` sous `apm_config`. Il détecte les données de trace sur `http://localhost:8126`.

Pour les environnements conteneurisés, sans serveur et cloud, référez-vous aux instructions ci-dessous :

{{< tabs >}}

{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Le client de tracing tente d'envoyer des traces aux éléments suivants :

    - Le socket de domaine Unix `/var/run/datadog/apm.socket` par défaut.
    - Si le socket n'existe pas, les traces sont envoyées à `localhost:8126`.
    - Si un autre socket, host ou port est requis, utilisez la variable d'environnement `DD_TRACE_AGENT_URL` : `DD_TRACE_AGENT_URL=http://custom-hostname:1234` ou `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket`
    - L'utilisation des sockets de domaine Unix pour le transport de traces est possible uniquement sur NET Core 3.1 ou une version ultérieure.

Pour en savoir plus sur la configuration de ces paramètres, consultez la section [Configuration](#configuration).

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Pour vous assurer que l'Agent envoie des données au bon site Datadog, définissez le paramètre `DD_SITE` de l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}}.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "Autres environnements" %}}

Le tracing est disponible pour d'autres environnements, tels que [Heroku][1], [Cloud Foundry][2] et [AWS Elastic Beanstalk][3].

Pour tous les autres environnements, consultez la documentation relative aux [intégrations][4] pour l'environnement qui vous intéresse et contactez l'[assistance Datadog][5] si vous rencontrez des problèmes de configuration.


[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/integrations/
[5]: /fr/help/
{{% /tab %}}

{{< /tabs >}}

### Installer le traceur

<div class="alert alert-info">Si vous recueillez des traces à partir d'une application Kubernetes ou d'une application exécutée sur un host ou conteneur Linux, plutôt que de suivre les instructions ci-dessous, vous pouvez injecter la bibliothèque de tracing dans votre application. Consultez la section <a href="/tracing/trace_collection/library_injection_local">Injecter des bibliothèques localement</a> pour obtenir des instructions.</div>

Vous pouvez installer le traceur .NET Datadog à l'échelle d'une machine afin d'instrumenter tous les services sur la machine. Il est également possible d'installer le traceur pour certaines applications, afin que les développeurs puissent gérer l'instrumentation via les dépendances de l'application. Pour obtenir des instructions afin d'installer le traceur à l'échelle d'une machine, cliquez sur l'onglet Windows ou Linux. Pour obtenir des instructions afin d'installer le traceur pour certaines applications, cliquez sur l'onglet NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Pour installer le traceur .NET à l'échelle d'une machine, procédez comme suit :

1. Téléchargez le [programme d'installation MSI pour le traceur .NET][1]. Choisissez le programme d'installation correspondant à l'architecture de votre système (x64 ou x86).

2. Exécutez le programme d'installation MSI pour le traceur .NET avec des privilèges d'administrateur.

Vous pouvez également générer un script pour la configuration MSI en exécutant `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'` dans PowerShell.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Pour installer le traceur .NET à l'échelle d'une machine, procédez comme suit :

1. Téléchargez le dernier [package du traceur .NET][1] compatible avec votre système d'exploitation et votre architecture.

2. Pour installer le package et créer le répertoire de logs `/var/log/datadog/dotnet` du traceur .NET avec les autorisations adéquates, exécutez l'une des commandes suivantes :

   Debian ou Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<VERSION_TRACEUR>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS ou Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<VERSION_TRACEUR>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine ou autre distribution basée sur musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<VERSION_TRACEUR>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Autres distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<VERSION_TRACEUR>-tar.gz && /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Remarque :</strong> cette installation n'instrumente pas les applications s'exécutant dans IIS. Pour ces applications, suivez le processus d'installation Windows à l'échelle d'une machine.
</div>

Pour installer le traceur .NET pour certaines applications, procédez comme suit :

1. Ajoutez le [package NuGet][1] `Datadog.Trace.Bundle` à votre application.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activer le traceur pour votre service

Pour activer le traceur .NET pour votre service, définissez les variables d'environnement requises et redémarrez l'application.

Pour en savoir plus sur les différentes options disponibles pour définir les variables d'environnement, consultez la rubrique [Configurer des variables d'environnement de processus](#configurer-des-variables-d-environnement).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. Le programme d'installation MSI pour le traceur .NET ajoute toutes les variables d'environnement requises. Vous n'avez donc pas besoin de configurer la moindre variable d'environnement.

   <div class="alert alert-warning">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. Pour instrumenter automatiquement des applications hébergées sur ISS, arrêtez complètement IIS, puis démarrez-le en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Services non hébergés sur IIS

<div class="alert alert-info">Depuis la v2.14.0, vous n'avez pas besoin de définir <code>CORECLR_PROFILER</code> si vous avez installé le traceur via le programme d'installation MSI.</div>

1. Définissez les variables d'environnement requises suivantes pour activer l'instrumentation automatique de votre application :

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. Pour les applications autonomes et les services Windows, redémarrez manuellement l'application.

{{% /tab %}}

{{% tab "Linux" %}}

1. Définissez les variables d'environnement requises suivantes pour activer l'instrumentation automatique de votre application :

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. Pour les applications autonomes, redémarrez manuellement l'application, comme vous le feriez en temps normal.

{{% /tab %}}

{{% tab "NuGet" %}}

Suivez les instructions fournies dans le package readme, qui se trouve également dans le [référentiel `dd-trace-dotnet`][1].
Le [référentiel][2] contient également des exemples pour Docker.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Visualiser vos données en temps réel

Après avoir activé le traceur .NET pour votre service, procédez comme suit :

1. Redémarrez votre service.

2. Créez une charge d'application.

3. Dans Datadog, accédez à [**APM** > **APM Traces**][3].

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer les données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section relative à la [configuration de la bibliothèque][4] pour en savoir plus.

## Instrumentation personnalisée

La configuration de l'instrumentation personnalisée varie selon votre instrumentation automatique. Certaines méthodes peuvent également inclure des étapes supplémentaires.

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, vous devez faire en sorte que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Ajoutez le [package NuGet][1] `Datadog.Trace` à votre application.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, vous devez faire en sorte que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :
1. Ajoutez le [package NuGet][1] `Datadog.Trace` à votre application.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

{{% /tab %}}

{{< /tabs >}}

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][5].

## Configurer des variables d'environnement de processus

Pour intégrer une instrumentation automatique à votre service, vous devez définir les variables d'environnement requises avant de démarrer l'application. Consultez la rubrique [Activer le traceur pour votre service](#activer-le-traceur-pour-votre-service) pour déterminer les variables d'environnement que vous devez définir en fonction de la méthode d'installation du traceur .NET. Référez-vous aux exemples ci-dessous afin de définir correctement les variables d'environnement pour l'environnement de votre service instrumenté.

### Windows

#### Services Windows

<div class="alert alert-info">Depuis la v2.14.0, vous n'avez pas besoin de définir <code>CORECLR_PROFILER</code> si vous avez installé le traceur via le programme d'installation MSI.</div>

{{< tabs >}}

{{% tab "Éditeur de registre" %}}

Dans l'éditeur du registre, créez une valeur multi-chaînes `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<NOM_SERVICE>` et définissez les données de la valeur sur :

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour un service Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NOM_SERVICE> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

Une fois le programme d'installation MSI installé, aucune autre configuration n'est requise pour instrumenter automatiquement vos sites IIS. Pour définir d'autres variables d'environnement qui seront transmises à tous les sites IIS, suivez les étapes ci-dessous :

1. Ouvrez l'éditeur de registre, recherchez la valeur multi-chaînes intitulée `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\WAS`, puis ajoutez chaque variable d'environnement sur une ligne distincte. Pour ajouter une injection de logs et des métriques runtime, vous pouvez par exemple ajouter les lignes suivantes aux données de valeur :
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour tous les sites IIS" >}}

#### Applications console

Pour instrumenter automatiquement une application console, définissez les variables d'environnement depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Définir des variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
rem Sauf pour la v2.14.0 ou une version ultérieure si vous avez installé le traceur avec le programme d'installation MSI
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Définir d'autres variables d'environnement Datadog
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Lancer l'application
dotnet.exe example.dll
```

### Linux

#### Script bash

Pour définir les variables d'environnement requises à l'aide d'un fichier bash avant le lancement de votre application :

```bash
# Définir des variables d'environnement
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Définir d'autres variables d'environnement Datadog
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Lancer votre application
dotnet example.dll
```

#### Conteneur Docker Linux

Pour définir les variables d'environnement requises sur un conteneur Docker Linux :

  ```docker
  # Définir des variables d'environnement
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # Définir d'autres variables d'environnement Datadog
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Lancer votre application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (service spécifique)

Lorsque vous utilisez la commande `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez ajouter les variables d'environnement requises qui doivent être chargées pour un service spécifique.

1. Créez un fichier nommé `environment.env` contenant :

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Dans le fichier de configuration du service, ajoutez une référence vers ce fichier en tant que [`EnvironmentFile`][1] dans le bloc Service :

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Relancez le service .NET pour que les variables d'environnement soient appliquées.

#### `systemctl` (tous les services)

<div class="alert alert-warning">
  <strong>Remarque :</strong> lorsque ces variables d'environnement sont définies, le runtime .NET tente de charger un profileur dans <em>tous</em> les processus .NET démarrés. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. <strong>Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profileur par <em>tous</em> les processus .NET sur le host.</strong>
</div>

Lorsque vous utilisez la commande `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez également faire en sorte que les variables d'environnement soient chargées pour tous les services exécutés par `systemctl`.

1. Définissez les variables d'environnement requises en exécutant [`systemctl set-environment`][6] :

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Vérifiez que les variables d'environnement ont bien été définies en exécutant `systemctl show-environment`.

3. Relancez le service .NET pour que les variables d'environnement soient appliquées.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/trace_collection/compatibility/dotnet-core
[2]: /fr/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /fr/tracing/trace_collection/library_config/dotnet-core/
[5]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
