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

Pour commencer le tracing d'applications écrites dans n'importe quel langage, commencez par [installer et configurer l'Agent Datadog][1]. Le traceur .NET instrumente vos applications et envoie les traces à l'Agent en s'exécutant au sein du processus.

**Remarque** : le traceur .NET prend en charge tous les langages basés sur .NET (C#, VB.NET, etc.).

### Configuration

Il existe plusieurs façons de configurer le traceur .NET :

- dans le code, en utilisant les propriétés de la classe `TracerSettings`
- avec des variables d'environnement
- dans la section `<appSettings>` du fichier `app.config`/`web.config` (Framework .NET uniquement)

Le tableau suivant énumère les variables de configuration prises en charge. La première colonne indique le nom utilisé dans les variables d'environnement ou les fichiers de configuration. La deuxième colonne indique le nom de la propriété dans la classe `TracerSettings`. Vous pouvez accéder à ces propriétés dans le code à l'aide de `Tracer.Instance.Settings`.

Nom du paramètre          | Nom de la propriété          | Description                                                                                                                                                                                                                                                      |
--------------------- | ---------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
`DD_TRACE_ENABLED`    | `TraceEnabled`         | Active ou désactive le profileur. Valeurs valides : `true` (par défaut) ou `false`                                                                                                                                                                                  |
`DD_TRACE_LOG_PATH`   | S. O.                    | Définit le chemin du fichier de log du profileur.<br/><br/>Valeur par défaut pour Windows : `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Valeur par défaut pour Linux : `/var/log/datadog/dotnet-profiler.log`                                                                 |
`DD_TRACE_AGENT_URL`  | `AgentUri`             | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. La valeur par défaut est `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                                                                        |
`DD_AGENT_HOST`       | S. O.                    | Définit le host où les traces sont envoyées (le host qui exécute l'Agent). Peut être un hostname ou une adresse IP. Ignoré si `DD_TRACE_AGENT_URL` est défini. La valeur par défaut est `localhost`.                                                                                      |
`DD_TRACE_AGENT_PORT` | S. O.                    | Définit le port où les traces sont envoyées (le port où l'Agent écoute les connexions). Ignoré si `DD_TRACE_AGENT_URL` est défini. La valeur par défaut est `8126`.                                                                                                    |
`DD_ENV`              | `Environment`          | Ajoute le tag `env` avec la valeur spécifiée aux spans générées. Consultez la documentation relative à la [configuration de l'Agent][2] pour en savoir plus sur le tag `env`. La valeur par défaut est _vide_ (pas de tag `env`).                                                                                            |
`DD_SERVICE_NAME`     | `ServiceName`          | Définit le nom du service par défaut. S'il n'est pas défini, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (p. ex. nom de l'application IIS, assembly d'entrée du processus ou nom du processus). Par défaut, le nom du service est déterminé automatiquement. |
`DD_LOGS_INJECTION`   | `LogsInjectionEnabled` | Active ou désactive l'injection automatique d'identificateurs de corrélation dans les logs de l'application.                                                                                                                                                                        |

## Instrumentation automatique

L'instrumentation automatique utilise l'API de profilage fournie par le Framework .NET ou le Core .NET pour modifier les instructions IL à l'exécution et injecter le code d'instrumentation dans votre application. Le traceur .NET est prêt à l'emploi : rapide à configurer, il instrumente automatiquement toutes les bibliothèques prises en charge sans qu'aucune modification du code ne soit nécessaire.

L'instrumentation automatique capture :

- Le temps d'exécution de la méthode
- Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
- Les exceptions non traitées, y compris les traces de pile si disponibles
- Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

### Installation

Trois composants sont nécessaires pour activer l'instrumentation automatique.

- La bibliothèque COM native qui implémente l'API de profilage (un fichier `.dll` sur Windows ou `.so` sur Linux) pour intercepter les appels de méthode
- Les bibliothèques gérées (`Datadog.Trace.dll` et `Datadog.Trace.ClrProfiler.Managed.dll`) qui interagissent avec votre application pour mesurer le temps d'exécution des méthodes et extraire les données des arguments de la méthode
- Plusieurs variables d'environnement qui activent l'API de profilage et configurent le traceur .NET

La manière dont ces composants sont installés sur le host dépendent de l'environnement d'exécution :

{{< tabs >}}

{{% tab "Framework .NET sur Windows" %}}

Installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][1]. Choisissez la plateforme correspondant à votre application : x64 pour 64 bits ou x86 pour 32 bits. Vous pouvez installer les deux en parallèle si nécessaire.

- Bibliothèque native : déployée dans `Program Files` par défaut et enregistrée par le programme d'installation MSI comme bibliothèque COM dans le registre Windows.
- Bibliothèques gérées : déployées dans le Global Assembly Cache (GAC) par le programme d'installation MSI, auquel n'importe quelle application .NET peut accéder.
- Variables d'environnement : ajoutées par le programme d'installation MSI pour IIS uniquement. Les applications qui ne s'exécutent pas dans IIS requièrent une [configuration supplémentaire][2] pour définir ces variables d'environnement.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: ?tab=netframeworkonwindows#required-environment-variables
{{% /tab %}}

{{% tab "Core .NET sur Windows" %}}

Installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][1]. Choisissez la plateforme correspondant à votre application : x64 pour 64 bits ou x86 pour 32 bits. Vous pouvez installer les deux en parallèle si nécessaire.

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

**Remarque** : le runtime .NET tente de charger un profileur dans _n'importe quel_ processus .NET démarré alors que ces variables d'environnement sont définies. Assurez-vous de limiter le profilage aux applications devant être tracées. **Ne définissez pas ces variables d'environnement globalement, au risque d'activer le profilage de _tous_ les processus .NET sur le host.**

{{< tabs >}}

{{% tab "Framework .NET sur Windows" %}}

Si vous avez utilisé le programme d'installation MSI sur Windows, les variables d'environnement requises sont déjà définies pour IIS. Après le redémarrage d'IIS, le traceur .NET est activé. Si votre application s'exécute sur IIS et que vous avez utilisé le programme d'installation MSI, vous pouvez ignorer le reste de cette section.

Pour les applications ne fonctionnant pas dans IIS, définissez ces deux variables d'environnement avant de démarrer votre application pour activer l'instrumentation automatique :

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`COR_PROFILER_PATH` n'est pas requise, car le programme d'installation MSI enregistre le chemin de la bibliothèque COM native dans le registre Windows, et `DD_INTEGRATIONS` est définie globalement pour tous les processus.

Si vous n'avez pas utilisé le programme d'installation MSI, définissez ces quatre variables d'environnement :

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
COR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json
```

Par exemple, pour les définir à partir d'un fichier batch avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET COR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json

rem Démarrer l'application
exemple.exe
```

Pour les services Windows, vous pouvez définir les variables d'environnement dans la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment`.

{{% /tab %}}

{{% tab "Core .NET sur Windows" %}}

Si vous avez utilisé le programme d'installation MSI sur Windows, les variables d'environnement requises sont déjà définies pour IIS. Après le redémarrage d'IIS, le traceur .NET est activé. Si votre application s'exécute sur IIS et que vous avez utilisé le programme d'installation MSI, vous pouvez ignorer le reste de cette section.

Pour les applications ne fonctionnant pas dans IIS, définissez ces deux variables d'environnement avant de démarrer votre application pour activer l'instrumentation automatique :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`CORECLR_PROFILER_PATH` n'est pas requise, car le programme d'installation MSI enregistre le chemin de la bibliothèque COM native dans le registre Windows, et `DD_INTEGRATIONS` est définie globalement pour tous les processus.

Si vous n'avez pas utilisé le programme d'installation MSI, définissez ces quatre variables d'environnement :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json
```

Par exemple, pour les définir à partir d'un fichier batch avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET CORECLR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json

rem Démarrer l'application
dotnet.exe exemple.dll
```

Pour les services Windows, vous pouvez définir les variables d'environnement dans la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment`.

{{% /tab %}}

{{% tab "Core .NET sur Linux" %}}

Sur Linux, ces quatre variables d'environnement sont requises pour activer l'instrumentation automatique :

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
```

Par exemple, pour les définir à partir d'un fichier bash avant de démarrer votre application :

```bash
# Définir les variables d'environnement
EXPORT CORECLR_ENABLE_PROFILING=1
EXPORT CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
EXPORT CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
EXPORT DD_INTEGRATIONS=/opt/datadog/integrations.json

# Démarrer votre application
dotnet exemple.dll
```

Pour définir les variables d'environnement pour un service `systemd`, utilisez `Environment=` :

```ini
[Unit]
Description=exemple

[Service]
ExecStart=/usr/bin/dotnet /app/exemple.dll
Restart=always
Environment=CORECLR_ENABLE_PROFILING=1
Environment=CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
Environment=CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
Environment=DD_INTEGRATIONS=/opt/datadog/integrations.json

[Install]
WantedBy=multi-user.target
```

Pour définir les variables d'environnement sur un conteneur Linux, utilisez `ENV` :

```
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
```

{{% /tab %}}

{{< /tabs >}}

### Configuration

En plus des paramètres énumérés dans [Débuter][3], les tableaux suivants présentent les variables de configuration spécifiques à l'instrumentation automatique. La première colonne indique le nom utilisé dans les variables d'environnement ou les fichiers de configuration. La deuxième colonne indique le nom de la propriété dans la classe `TracerSettings`. Vous pouvez accéder à ces propriétés dans le code à l'aide de `Tracer.Instance.Settings`.

Nom du paramètre                 | Nom de la propriété              | Description                                                                                                                                                                                                                                                        |
-----------------------------| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
`DD_DISABLED_INTEGRATIONS`   | `DisabledIntegrationNames` | Définit une liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si cette propriété n'est pas définie, toutes les intégrations sont activées. Accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides sont les noms d'intégration énumérés dans la section [Intégrations][4] ci-dessous. |
`DD_TRACE_ANALYTICS_ENABLED` | `AnalyticsEnabled`         | Raccourci qui active les paramètres d'analyse et de recherche de trace par défaut pour les intégrations de framework Web. Valeurs acceptées : `true` ou `false` (par défaut)                                                                                                                  |

Le tableau suivant énumère les paramètres pouvant être utilisés sur une intégration spécifique. La première colonne indique le nom utilisé dans les variables d'environnement ou les fichiers de configuration. La deuxième colonne indique le nom de la propriété dans la classe `IntegrationSettings`. Vous pouvez accéder à ces propriétés dans le code à l'aide de `Tracer.Instance.Settings.Integrations["<INTÉGRATION>"]`. Les noms d'intégration sont énumérés dans la section [Intégrations][4] ci-dessous.

Nom du paramètre                             | Nom de la propriété              | Description                                                                                                                        |
---------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
`DD_<INTÉGRATION>_ENABLED`               | `Enabled`                  | Active ou désactive une intégration spécifique. Valeurs acceptées : `true` (par défaut) ou `false`.                                         |
`DD_<INTÉGRATION>_ANALYTICS_ENABLED`     | `AnalyticsEnabled`         | Active ou désactive l'analyse et la recherche de trace pour une intégration spécifique. Valeurs acceptées : `true` ou `false` (par défaut).           |
`DD_<INTÉGRATION>_ANALYTICS_SAMPLE_RATE` | `AnalyticsSampleRate`      | Définit le taux d'échantillonnage pour l'analyse et la recherche de trace pour une intégration spécifique. Doit être un nombre flottant entre `0.0` et `1.0` (par défaut). |

### Runtimes compatibles

Le traceur .NET prend en charge l'instrumentation automatique sur les runtimes suivants :

| Runtime                | Versions | Système d'exploitation              |
| ---------------------- | -------- | --------------- |
| Framework .NET         | 4.5+     | Windows         |
| Core .NET <sup>1</sup> | 2.0+     | Windows, Linux  |

<sup>1</sup> Les versions 2.1.0, 2.1.1, et 2.1.2 de Core .NET souffrent d'un problème qui peut empêcher les profileurs de fonctionner correctement. Ce problème est résolu dans Core .NET 2.1.3. Consultez [ce problème GitHub][5] pour en savoir plus.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][6] pour obtenir de l'aide.

### Intégrations

Le traceur .NET peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Nom du paquet NuGet                       | Versions du paquet     | Nom de l'intégration     |
| ------------------------------- | ---------------------------------------- | -------------------- | -------------------- |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc`                   | 5.1.0+ et 4.0.40804 | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi.Core`           | 5.2+                 | `AspNetWebApi2`      |
| Core ASP.NET MVC                | `Microsoft.AspNetCore.Mvc.Core`          | 2.0+                 | `AspNetCoreMvc2`     |
| ASP.NET Web Forms <sup>1</sup>  | intégré                                 |                      | `AspNet`             |
| WCF                             | Intégré                                 |                      | `Wcf`                |
| ADO.NET <sup>2</sup>            | Intégré                                 |                      | `AdoNet`             |
| WebClient / WebRequest          | Intégré                                 |                      | `WebRequest`         |
| HttpClient / HttpClientHandler  | Intégré ou `System.Net.Http`            | 4.0+                 | `HttpMessageHandler` |
| Redis (client StackExchange)    | `StackExchange.Redis`                    | 1.0.187+             | `StackExchangeRedis` |
| Redis (client ServiceStack)     | `ServiceStack.Redis`                     | 4.0.48+              | `ServiceStackRedis`  |
| Elasticsearch                   | `NEST` / `Elasticsearch.Net`             | 5.3.0+               | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver` / `MongoDB.Driver.Core` | 2.1.0+               | `MongoDb`            |

Remarques :

<sup>1</sup> L'intégration `AspNet` permet l'instrumentation de n'importe quelle application ASP.NET basée sur `System.Web.HttpApplication`, notamment les applications développées avec Web Forms, MVC, API Web et d'autres frameworks Web. Pour activer l'intégration `AspNet`, vous devez ajouter le paquet NuGet [`Datadog.Trace.ClrProfiler.Managed`][7] à votre application.

<sup>2</sup> L'intégration ADO.NET tente d'instrumenter **tous** les fournisseurs ADO.NET. Datadog a testé SQL Server (`System.Data.SqlClient`) et PostgreSQL (`Npgsql`). Les autres fournisseurs (MySQL, SQLite, Oracle) n'ont pas été testés mais devraient fonctionner.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][6] pour obtenir de l'aide.

## Instrumentation manuelle

Pour instrumenter manuellement votre code, ajoutez le [paquet NuGet][8] `Datadog.Trace` à votre application. Dans votre code, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation manuelle et l'utilisation de tags personnalisé, consultez la [documentation relative à l'instrumentation manuelle][9].

### Runtimes compatibles

L'instrumentation manuelle est prise en charge sur le Framework .NET 4.5+ pour Windows et sur n'importe quelle plateforme où .NET Standard 2.0 (ou une version supérieure) est implémenté.

| Runtime        | Versions | Système d'exploitation                    |
| -------------- | -------- | --------------------- |
| Framework .NET | 4.5+     | Windows               |
| Core .NET      | 2.0+     | Windows, Linux, macOS |
| Mono           | 5.4+     | Windows, Linux, macOS |

Pour en savoir plus sur les plateformes prises en charge, consultez la [documentation relative à .NET Standard][10].

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :


Le traceur .NET lit automatiquement les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` afin de définir l'endpoint de l'Agent. L'endpoint de l'Agent peut également être défini lors de la création d'une nouvelle instance `Tracer` :

```csharp
using Datadog.Trace;

var uri = new Uri("http://localhost:8126/");
var tracer = Tracer.Create(agentEndpoint: uri);

// facultatif : définir le nouveau traceur comme traceur par défaut/traceur global
Tracer.Instance = tracer;
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/apm
[2]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[3]: #getting-started
[4]: #integrations
[5]: https://github.com/dotnet/coreclr/issues/18448
[6]: /fr/help
[7]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[8]: https://www.nuget.org/packages/Datadog.Trace
[9]: /fr/tracing/advanced/manual_instrumentation/?tab=net
[10]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support