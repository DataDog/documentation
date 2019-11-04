---
title: Tracer des applications .NET
kind: documentation
aliases:
  - /fr/tracing/dotnet
  - /fr/tracing/languages/dotnet
  - /fr/agent/apm/dotnet/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: Code source
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: Blog
    text: Surveillance .NET avec l'APM et le tracing distribué de Datadog
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/advanced/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Débuter

<div class="alert alert-info">Si vous avez déjà un compte Datadog, vous trouverez des instructions détaillées dans nos guides intégrés à l'application pour les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=node" target=_blank> basées sur un host</a> et <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=node" target=_blank>basées sur un conteneur</a>.</div>

Pour commencer le tracing d'applications écrites dans n'importe quel langage, commencez par [installer et configurer l'Agent Datadog][1]. Le traceur .NET instrumente vos applications et envoie les traces à l'Agent en s'exécutant au sein du processus.

**Remarque** : le traceur .NET prend en charge tous les langages basés sur .NET (C#, VB.NET, etc.).

## Instrumentation automatique

L'instrumentation automatique utilise l'API de profilage fournie par le Framework .NET ou le Core .NET pour modifier les instructions IL à l'exécution et injecter le code d'instrumentation dans votre application. Le traceur .NET est prêt à l'emploi : rapide à configurer, il instrumente automatiquement toutes les bibliothèques prises en charge sans qu'aucune modification du code ne soit nécessaire.

L'instrumentation automatique capture :

- Le temps d'exécution des bibliothèques instrumentées
- Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
- Les exceptions non traitées, y compris les traces de pile si disponibles
- Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

### Installation

Trois composants sont nécessaires pour activer l'instrumentation automatique.

- La bibliothèque COM native qui implémente l'API de profilage (un fichier `.dll` sous Windows ou `.so` sous Linux) pour intercepter les appels de méthode
- Les bibliothèques gérées (`Datadog.Trace.dll` et `Datadog.Trace.ClrProfiler.Managed.dll`) qui interagissent avec votre application pour mesurer le temps d'exécution des méthodes et extraire les données des arguments de la méthode
- Plusieurs variables d'environnement qui activent l'API de profilage et configurent le traceur .NET

La manière dont ces composants sont installés sur le host dépendent de l'environnement d'exécution :

{{< tabs >}}

{{% tab "Framework .NET sur Windows" %}}

Installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][1]. Choisissez la plateforme correspondant à l'infrastructure de votre système d'exploitation.

- Bibliothèque native : déployée dans `Program Files` par défaut et enregistrée par le programme d'installation MSI comme bibliothèque COM dans le registre Windows.
- Bibliothèques gérées : déployées dans le Global Assembly Cache (GAC) par le programme d'installation MSI, auquel n'importe quelle application .NET peut accéder.
- Variables d'environnement : ajoutées par le programme d'installation MSI pour IIS uniquement. Les applications qui ne s'exécutent pas dans IIS requièrent une [configuration supplémentaire][2] pour définir ces variables d'environnement.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: ?tab=netframeworkonwindows#required-environment-variables
{{% /tab %}}

{{% tab "Core .NET sur Windows" %}}

Installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][1]. Choisissez la plateforme correspondant à l'infrastructure de votre système d'exploitation.

Ajoutez le [paquet NuGet][2] `Datadog.Trace.ClrProfiler.Managed` à votre application, en vérifiant que la version du paquet correspond à celle du programme d'installation MSI ci-dessus. Consultez la [documentation NuGet][3] pour découvrir comment ajouter un paquet NuGet à votre application.

- Bibliothèque native : déployée dans `Program Files` par défaut et enregistrée par le programme d'installation MSI comme bibliothèque COM dans le registre Windows.
- Bibliothèques gérées : déployées en même temps que votre application lors de sa publication (via le paquet NuGet).
- Variables d'environnement : ajoutées par le programme d'installation MSI pour IIS uniquement, Les applications qui ne s'exécutent pas dans IIS requièrent une [configuration supplémentaire][4] pour définir ces variables d'environnement.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[3]: https://docs.microsoft.com/en-us/nuget/consume-packages/ways-to-install-a-package
[4]: ?tab=netcoreonwindows#required-environment-variables
{{% /tab %}}

{{% tab "Core .NET sur Linux" %}}

Ajoutez le [paquet NuGet][1] `Datadog.Trace.ClrProfiler.Managed` à votre application, en vérifiant que la version du paquet correspond à celle du paquet ci-dessous. Consultez la [documentation NuGet][2] pour découvrir comment ajouter un paquet NuGet à votre application.

Installez le traceur .NET sur le host à l'aide d'un des paquets disponibles sur la [page des versions][3] de `dd-trace-dotnet`.

Pour Debian ou Ubuntu, téléchargez et installez le paquet Debian :

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<VERSION_TRACEUR>/datadog-dotnet-apm_<VERSION_TRACEUR>_amd64.deb
sudo dpkg -i ./datadog-dotnet-apm_<VERSION_TRACEUR>_amd64.deb
```

Pour CentOS ou Fedora, téléchargez et installez le paquet RPM :

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<VERSION_TRACEUR>/datadog-dotnet-apm-<VERSION_TRACEUR>-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-<VERSION_TRACEUR>-1.x86_64.rpm
```

Une archive tar est disponible pour les autres distributions :

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<VERSION_TRACEUR>/datadog-dotnet-apm-<VERSION_TRACEUR>.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

Pour Alpine Linux, vous devez également installer `libc6-compat`

```bash
apk add libc6-compat
```

- Bibliothèque native : déployée par défaut dans `/opt/datadog/` ou manuellement si vous utilisez le paquet `tar`.
- Bibliothèques gérées : déployées en même temps que votre application lors de sa publication (via le paquet NuGet).
- Variables d'environnement : [configuration supplémentaire][4] requise.

[1]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[2]: https://docs.microsoft.com/en-us/nuget/consume-packages/ways-to-install-a-package
[3]: https://github.com/DataDog/dd-trace-dotnet/releases
[4]: ?tab=netcoreonlinux#required-environment-variables
{{% /tab %}}

{{< /tabs >}}

### Variables d'environnement requises

**Remarque** : si votre application s'exécute sur IIS et que vous utilisez le programme d'installation MSI, vous n'avez pas à configurer manuellement les variables d'environnement et vous pouvez ignorer cette section.

**Remarque** : le runtime .NET tente de charger un profileur dans _n'importe quel_ processus .NET démarré alors que ces variables d'environnement sont définies. Assurez-vous de limiter le profilage aux applications devant être tracées. **Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profilage par _tous_ les processus .NET sur le host.**

{{< tabs >}}

{{% tab "Framework .NET sur Windows" %}}

Si vous avez utilisé le programme d'installation MSI sur Windows, les variables d'environnement requises sont déjà définies pour IIS. Après le redémarrage d'IIS, le traceur .NET est activé. Si votre application s'exécute sur IIS et que vous avez utilisé le programme d'installation MSI, vous pouvez ignorer le reste de cette section.

Pour les applications ne fonctionnant pas dans IIS, définissez ces deux variables d'environnement avant de démarrer votre application pour activer l'instrumentation automatique :

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`COR_PROFILER_PATH` n'est pas requise, car le programme d'installation MSI enregistre le chemin de la bibliothèque COM native dans le registre Windows, et les variables d'environnement `DD_INTEGRATIONS` et `DD_DOTNET_TRACER_HOME` sont définies globalement pour tous les processus.

Si vous n'avez pas utilisé le programme d'installation MSI, définissez les cinq variables d'environnement :

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
COR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer
```

Par exemple, pour définir les variables d'environnement à partir d'un fichier de commandes avant de démarrer votre application :

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET COR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
set DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer

rem Start application
example.exe
```

**Remarque** : Pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

{{% /tab %}}

{{% tab "Core .NET sur Windows" %}}

Si vous avez utilisé le programme d'installation MSI sur Windows, les variables d'environnement requises sont déjà définies pour IIS. Après le redémarrage d'IIS, le traceur .NET est activé. Si votre application s'exécute sur IIS et que vous avez utilisé le programme d'installation MSI, vous pouvez ignorer le reste de cette section.

Pour les applications ne fonctionnant pas dans IIS, définissez ces deux variables d'environnement avant de démarrer votre application pour activer l'instrumentation automatique :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`CORECLR_PROFILER_PATH` n'est pas requise, car le programme d'installation MSI enregistre le chemin de la bibliothèque COM native dans le registre Windows, et les variables d'environnement `DD_INTEGRATIONS` et `DD_DOTNET_TRACER_HOME` sont définies globalement pour tous les processus.

Si vous n'avez pas utilisé le programme d'installation MSI, définissez les cinq variables d'environnement :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer
```

Par exemple, pour les définir à partir d'un fichier Batch avant de démarrer votre application :

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET CORECLR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
SET DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer

rem Start application
dotnet.exe example.dll
```

**Remarque** : Pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

{{% /tab %}}

{{% tab "Core .NET sur Linux" %}}

Sous Linux, les variables d'environnement suivantes sont requises pour activer l'instrumentation automatique :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
DD_DOTNET_TRACER_HOME=/opt/datadog
```

Par exemple, pour les définir à partir d'un fichier Batch avant de démarrer votre application :

```bash
# Définir les variables d'environnement
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Démarrer votre application
dotnet example.dll
```

Pour définir les variables d'environnement pour un service `systemd`, utilisez `Environment=` :

```ini
[Unit]
Description=exemple

[Service]
ExecStart=/usr/bin/dotnet /app/example.dll
Restart=always
Environment=CORECLR_ENABLE_PROFILING=1
Environment=CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
Environment=CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
Environment=DD_INTEGRATIONS=/opt/datadog/integrations.json
Environment=DD_DOTNET_TRACER_HOME=/opt/datadog

[Install]
WantedBy=multi-user.target
```

Pour définir les variables d'environnement sur un conteneur Linux, utilisez `ENV` :

```
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog
```

{{% /tab %}}

{{< /tabs >}}

### Runtimes compatibles

Le traceur .NET prend en charge l'instrumentation automatique sur les runtimes suivants :

| Runtime                | Versions | Système d'exploitation              |
| ---------------------- | -------- | --------------- |
| Framework .NET         | 4.5+     | Windows         |
| Core .NET <sup>1</sup> | 2.0+     | Windows, Linux  |

<sup>1</sup> Les versions 2.1.0, 2.1.1, et 2.1.2 de .NET Core souffrent d'un problème qui peut empêcher les profileurs de fonctionner correctement. Ce problème est résolu dans .NET Core 2.1.3. Consultez [ce ticket GitHub][2] pour en savoir plus.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][3] pour obtenir de l'aide.

### Intégrations

Le traceur .NET peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Nom du paquet NuGet                       | Versions du paquet     | Nom de l'intégration     |
| ------------------------------- | ---------------------------------------- | -------------------- | -------------------- |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc`                   | 5.1.0+ et 4.0.40804 | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi.Core`           | 5.2+                 | `AspNetWebApi2`      |
| Core ASP.NET MVC                | `Microsoft.AspNetCore.Mvc.Core`          | 2.0+                 | `AspNetCoreMvc2`     |
| ASP.NET Web Forms <sup>1</sup>  | Intégré                                 |                      | `AspNet`             |
| WCF                             | Intégré                                 |                      | `Wcf`                |
| ADO.NET <sup>2</sup>            | Intégré                                 |                      | `AdoNet`             |
| WebClient / WebRequest          | Intégré                                 |                      | `WebRequest`         |
| HttpClient / HttpClientHandler  | Intégré ou `System.Net.Http`            | 4.0+                 | `HttpMessageHandler` |
| Redis (client StackExchange)    | `StackExchange.Redis`                    | 1.0.187+             | `StackExchangeRedis` |
| Redis (client ServiceStack)     | `ServiceStack.Redis`                     | 4.0.48+              | `ServiceStackRedis`  |
| Elasticsearch                   | `NEST` / `Elasticsearch.Net`             | 5.3.0+               | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver` / `MongoDB.Driver.Core` | 2.1.0+               | `MongoDb`            |

Remarques :

<sup>1</sup> L'intégration `AspNet` permet l'instrumentation de n'importe quelle application ASP.NET basée sur `System.Web.HttpApplication`, notamment des applications développées avec Web Forms, MVC, Web API et d'autres frameworks Web. Pour activer l'intégration `AspNet`, vous devez ajouter le paquet NuGet [`Datadog.Trace.ClrProfiler.Managed`][4] à votre application.

<sup>2</sup> L'intégration ADO.NET tente d'instrumenter **tous** les fournisseurs ADO.NET. Nous avons testé SQL Server (`System.Data.SqlClient`) et PostgreSQL (`Npgsql`). Les autres fournisseurs (MySQL, SQLite, Oracle) n'ont pas été testés mais devraient fonctionner.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][3] pour obtenir de l'aide.

## Instrumentation manuelle

Pour instrumenter manuellement votre code, ajoutez le [paquet NuGet][5] `Datadog.Trace` à votre application. Dans votre code, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation manuelle et l'utilisation de tags personnalisés, consultez la [documentation relative à l'instrumentation manuelle][6].

### Runtimes compatibles

L'instrumentation manuelle est prise en charge sur le Framework .NET 4.5+ pour Windows et sur n'importe quelle plateforme où .NET Standard 2.0 (ou une version supérieure) est implémenté.

| Runtime        | Versions | Système d'exploitation                    |
| -------------- | -------- | --------------------- |
| Framework .NET | 4.5+     | Windows               |
| Core .NET      | 2.0+     | Windows, Linux, macOS |
| Mono           | 5.4+     | Windows, Linux, macOS |

Pour en savoir plus sur les plateformes prises en charge, consultez la [documentation relative à .NET Standard][7].

## Configuration

Il existe plusieurs façons de configurer le traceur .NET :

- en code .NET ;
- en définissant des variables d'environnement ;
- en modifiant le fichier `app.config`/`web.config` de l'application (Framework .NET uniquement) ;
- en créant un fichier `datadog.json`.

{{< tabs >}}
{{% tab "Code" %}}

Pour configurer le traceur dans le code de l'application, créez un `TracerSettings` à partir des sources de configuration par défaut. Définissez les propriétés de cette instance `TracerSettings` avant de passer à un constructeur `Tracer`. Par exemple :

```csharp
using Datadog.Trace;

// lire les sources de configuration par défaut (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// modifier certains paramètres
settings.ServiceName = "MonService";
settings.AgentUri = new Uri("http://localhost:8126/");

// désactiver l'intégration AdoNet
settings.Integrations["AdoNet"].Enabled = false;

// créer un nouveau traceur à l'aide de ces paramètres
var tracer = new Tracer(settings);

// définir le traceur global
Tracer.Instance = tracer;
```

**Remarque** : les paramètres de `TracerSettings` doivent être définis _avant_ la création du `Tracer`. Toute modification apportée aux propriétés de `TracerSettings` après la création du `Tracer` sera ignorée.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

Pour configurer le traceur à l'aide de variables d'environnement, définissez-les avant le lancement de l'application instrumentée.

Par exemple, sous Windows :
```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_SERVICE_NAME=MonService
SET DD_ADONET_ENABLED=false

rem Launch application
MonApplication.exe
```

**Remarque** : Pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

Sur Linux :
```bash
# Définir les variables d'environnement
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_SERVICE_NAME=MonService
export DD_ADONET_ENABLED=false

# Démarrer l'application
dotnet MonApplication.dll
```
{{% /tab %}}

{{% tab "web.config" %}}

_Cette section s'applique uniquement aux applications basées sur .NET Framework._

Pour configurer le traceur à l'aide d'un fichier `app.config` ou `web.config`, utilisez la section `<appSettings>`. Par exemple :
```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_SERVICE_NAME" value="MonService"/>
    <add key="DD_ADONET_ENABLED" value="false"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "Fichier JSON" %}}

Pour configurer le traceur à l'aide d'un fichier JSON, créez `datadog.json` dans le répertoire de l'application instrumentée. L'objet JSON racine doit être un hash avec une paire clé/valeur pour chaque paramètre. Par exemple :
```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_SERVICE_NAME": "MonService",
  "DD_ADONET_ENABLED": "false"
}
```

{{% /tab %}}

{{< /tabs >}}

### Variables de configuration

Les tableaux suivants énumèrent les variables de configuration prises en charge. Dans chaque tableau, la première colonne, _Nom du paramètre_, indique le nom de variable utilisé dans les variables d'environnement ou les fichiers de configuration. La deuxième colonne, _Nom de la propriété_, indique le nom de la propriété équivalente dans la classe `TracerSettings` lors du changement des paramètres dans le code.

Le premier tableau ci-dessous énumère les variables de configuration disponibles à la fois pour une instrumentation automatique ou manuelle.

Nom du paramètre          | Nom de la propriété          | Description                                                                                                                                                                                                       |
--------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
`DD_TRACE_AGENT_URL`  | `AgentUri`             | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. La valeur par défaut est `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
`DD_AGENT_HOST`       | S. O.                    | Définit le host où les traces sont envoyées (le host qui exécute l'Agent). Peut être un hostname ou une adresse IP. Ignoré si `DD_TRACE_AGENT_URL` est défini. La valeur par défaut est `localhost`.                                       |
`DD_TRACE_AGENT_PORT` | S. O.                    | Définit le port où les traces sont envoyées (le port où l'Agent écoute les connexions). Ignoré si `DD_TRACE_AGENT_URL` est défini. La valeur par défaut est `8126`.                                                     |
`DD_ENV`              | `Environment`          | Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. Consultez la documentation relative à la [configuration de l'Agent][8] pour en savoir plus sur le tag `env`.                                                              |
`DD_SERVICE_NAME`     | `ServiceName`          | Lorsqu'il est spécifié, ce paramètre définit le nom du service par défaut. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (p. ex. nom de l'application IIS, exécutable du processus ou nom du processus). |
`DD_LOGS_INJECTION`   | `LogsInjectionEnabled` | Active ou désactive l'injection automatique d'identificateurs de corrélation dans les logs de l'application.                                                                                                                         |

Le tableau suivant énumère les variables de configuration qui sont disponibles uniquement lors de l'utilisation de l'instrumentation automatique.

Nom du paramètre                 | Nom de la propriété              | Description                                                                                                                                                                                                                                                                                  |
-----------------------------| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
`DD_TRACE_ENABLED`           | `TraceEnabled`             | Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` (par défaut) ou `false`.     |
`DD_TRACE_DEBUG`             | S. O.                        | Active ou désactive le mode debugging du profileur CLR. Valeurs acceptées : `true` (par défaut) ou `false`                                                                                                                                                                                            |
`DD_TRACE_LOG_PATH`          | S. O.                        | Définit le chemin du fichier de log du profileur CLR.<br/><br/>Valeur par défaut pour Windows : `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Valeur par défaut pour Linux : `/var/log/datadog/dotnet-profiler.log`                                                                                         |
`DD_DISABLED_INTEGRATIONS`   | `DisabledIntegrationNames` | Définit une liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si cette propriété n'est pas définie, toutes les intégrations sont activées. Accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides sont les noms d'intégration énumérés dans la section [Intégrations][9] ci-dessus.                           |
`DD_TRACE_ANALYTICS_ENABLED` | `AnalyticsEnabled`         | Raccourci qui active les paramètres d'analyse et de recherche de trace par défaut pour les intégrations de framework Web. Valeurs acceptées : `true` ou `false` (par défaut)                                                                                                                                            |

Le tableau suivant énumère les variables de configuration qui sont uniquement disponibles en utilisant l'instrumentation automatique, et qui peuvent être définies pour chaque intégration. La première colonne, _Nom du paramètre_, indique le nom de variable utilisé dans les variables d'environnement ou les fichiers de configuration. La deuxième colonne, _Nom de la propriété_, indique le nom de la propriété équivalente dans la classe `IntegrationSettings` lors de la modification des paramètres du code. Accédez à ces propriétés à l'aide de l'indexeur `TracerSettings.Integrations[string integrationName]`. Les noms d'intégration sont énumérés dans la section [Intégrations][9] ci-dessus.

Nom du paramètre                             | Nom de la propriété              | Description                                                                                                                        |
---------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
`DD_<INTÉGRATION>_ENABLED`               | `Enabled`                  | Active ou désactive une intégration spécifique. Valeurs acceptées : `true` (par défaut) ou `false`.                                         |
`DD_<INTÉGRATION>_ANALYTICS_ENABLED`     | `AnalyticsEnabled`         | Active ou désactive l'analyse et la recherche de trace pour une intégration spécifique. Valeurs acceptées : `true` ou `false` (par défaut).           |
`DD_<INTÉGRATION>_ANALYTICS_SAMPLE_RATE` | `AnalyticsSampleRate`      | Définit le taux d'échantillonnage pour l'analyse et la recherche de trace pour une intégration spécifique. Doit être un nombre flottant entre `0.0` et `1.0` (par défaut). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/apm
[2]: https://github.com/dotnet/coreclr/issues/18448
[3]: /fr/help
[4]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /fr/tracing/advanced/manual_instrumentation/?tab=net
[7]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
[8]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[9]: #integrations