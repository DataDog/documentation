---
title: Tracer des applications .NET Core
kind: documentation
aliases:
  - /fr/tracing/dotnet-core
  - /fr/tracing/languages/dotnet-core
  - /fr/tracing/setup/dotnet-core
  - /fr/agent/apm/dotnet-core/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: Code source
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: Blog
    text: Surveillance .NET avec l'APM et le tracing distribué de Datadog
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: /tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Débuter

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][1] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Sinon, pour commencer le tracing d'applications écrites dans n'importe quel langage, [installez et configurez tout d'abord l'Agent Datadog][2]. Le traceur .NET instrumente vos applications et envoie leurs traces à l'Agent en s'exécutant au sein du processus.

**Remarque** : le traceur .NET prend en charge tous les langages basés sur .NET (C#, F#, Visual Basic, etc.).

## Instrumentation automatique

Avec l'instrumentation automatique, vous pouvez recueillir des données de performance sur votre application sans avoir à modifier son code. Il vous suffit juste de configurer quelques options. Le traceur .NET est prêt à l'emploi : il instrumente automatiquement toutes les [bibliothèques prises en charge](#integrations).

L'instrumentation automatique capture :

- Les temps d'exécution des appels instrumentés
- Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
- Les exceptions non traitées, y compris les traces de pile si disponibles
- Le nombre total de traces (p. ex. les requêtes Web) qui transitent par le système

Le traceur .NET prend en charge l'instrumentation automatique sur .NET Core 2.1, 3.0 et 3.1, ainsi que sur [.NET Framework][3].

**Remarque :** le traceur .NET fonctionne sur .NET Core 2.0, 2.2 et 3.0, mais ces versions ont atteint la fin de leur cycle de vie et ne sont plus prises en charge par Microsoft. Consultez la section [Politique de prise en charge de Microsoft][4] pour en savoir plus. Nous vous conseillons d'utiliser la dernière version patchée de .NET Core 2.1 ou 3.1.

**Remarque :** les anciennes versions de .NET Core sous Linux/x64 présentent des bugs au niveau du compilateur JIT qui peuvent entraîner des exceptions dans les applications lors de l'utilisation de l'instrumentation automatique. Si votre application est basée sur .NET Core 2.0, 2.1.0-2.1.11 ou 2.2.0-2.2.5, nous vous conseillons vivement de mettre à jour votre runtime .NET Core. Si vous ne pouvez pas le mettre à jour, vous devrez peut-être définir la variable d'environnement `DD_CLR_DISABLE_OPTIMIZATIONS=true` pour contourner le problème. Consultez [DataDog/dd-trace-dotnet/issues/302][5] pour en savoir plus.

### Installation

{{< tabs >}}

{{% tab "Windows" %}}

Pour appliquer l'instrumentation automatique sur Windows, installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][1]. Choisissez le programme d'installation correspondant à l'architecture de votre système d'exploitation (x64 ou x86).

Une fois le traceur .NET installé, redémarrez les applications de sorte qu'elles puissent lire les nouvelles variables d'environnement. Pour redémarrer IIS, exécutez les commandes suivantes en tant qu'administrateur :

```cmd
net stop /y was
net start w3svc
```

**Mise à jour :** depuis la version `1.8.0` du traceur .NET, le package NuGet `Datadog.Trace.ClrProfiler.Managed` n'est plus requis pour l'instrumentation automatique dans .NET Core. Supprimez-le de votre application lorsque vous mettez à jour le traceur .NET.


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Pour utiliser l'instrumentation automatique sous Linux, suivez les trois étapes ci-dessous :

1. Installez le traceur .NET dans l'environnement sur lequel votre application s'exécute à l'aide d'un des paquets disponibles sur la [page des versions][1] de `dd-trace-dotnet`.

2. Créez les variables d'environnement requises. Consultez la section [Variables d'environnement requises](#variables-d-environnement-requises) ci-dessous pour en savoir plus.

3. Exécutez le script `/opt/datadog/createLogPath.sh` afin de créer un répertoire pour les fichiers de log et de définir les autorisations de répertoire appropriées. Le répertoire par défaut pour les fichiers de log est `/var/log/datadog/dotnet`.

**Mise à jour :** depuis la version `1.8.0` du traceur .NET, le package NuGet `Datadog.Trace.ClrProfiler.Managed` n'est plus requis pour l'instrumentation automatique dans .NET Core et n'est donc plus pris en charge. Supprimez-le de votre application lorsque vous mettez à jour le traceur .NET et ajoutez la nouvelle variable d'environnement, `DD_DOTNET_TRACER_HOME`. Consultez la section [Variables d'environnement requises](#variables-d-environnement-requises) ci-dessous pour en savoir plus.

**Mise à jour :** depuis la version `1.13.0` du traceur .NET, Alpine et d'autres [distributions basées sur Musl][2] sont désormais prises en charge.

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

Pour Alpine ou une autre [distribution basée sur Musl][2], téléchargez l'archive .tar avec le binaire lié à musl :

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<VERSION_TRACEUR>/datadog-dotnet-apm-<VERSION_TRACEUR>-musl.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

Si vous utilisez une autre distribution, téléchargez l'archive .tar avec le binaire lié à glibc :

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<VERSION_TRACEUR>/datadog-dotnet-apm-<VERSION_TRACEUR>.tar.gz \
| sudo tar xzf - -C /opt/datadog
```


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://en.wikipedia.org/wiki/Musl
{{% /tab %}}

{{< /tabs >}}

### Variables d'environnement requises

{{< tabs >}}

{{% tab "Windows" %}}

Si votre application fonctionne dans IIS, passez directement à la section suivante.

Pour les applications Windows ne fonctionnant **pas** dans IIS, définissez les deux variables d'environnement suivantes avant de démarrer votre application pour activer l'instrumentation automatique :

Nom                       | Valeur
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

Par exemple, pour définir les variables d'environnement à partir d'un fichier de commandes avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
dotnet.exe example.dll
```

Pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

{{% /tab %}}

{{% tab "Linux" %}}

Sous Linux, les variables d'environnement suivantes sont requises pour activer l'instrumentation automatique :

Nom                       | Valeur
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
`CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
`DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
`DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

**Remarque :** vous devrez modifier les chemins ci-dessous si vous installez le traceur .NET à un emplacement différent de celui par défaut.

Par exemple, pour définir les variables d'environnement à partir d'un fichier batch avant de démarrer votre application :

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

Pour définir les variables d'environnement sur un conteneur Docker Linux, utilisez [`ENV`][1] :

```docker
# Définir les variables d'environnement
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog

# Démarrer votre application
CMD ["dotnet", "example.dll"]
```

[1]: https://docs.docker.com/engine/reference/builder/#env
{{% /tab %}}

{{< /tabs >}}

**Remarque** : le runtime .NET tente de charger un profileur dans _n'importe quel_ processus .NET démarré lorsque ces variables d'environnement sont définies. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. **Nous vous conseillons de ne pas définir ces variables d'environnement globalement, au risque d'activer le chargement du profileur par _tous_ les processus .NET sur le host.**

### Intégrations

Le traceur .NET peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque            | Package NuGet                                                           | Nom de l'intégration     |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ et 3.0+ | `AspNetCore`         |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (client StackExchange)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (client ServiceStack)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

**Remarque :** l'intégration ADO.NET instrumente les appels effectués via la classe abstraite `DbCommand` ou l'interface `IDbCommand`, sans tenir compte de l'implémentation sous-jacente. Elle instrumente également les appels directs de `SqlCommand`.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][6] pour obtenir de l'aide. Vous pouvez également consulter les [instructions d'instrumentation personnalisée][7].

## Configuration

Il existe plusieurs façons de configurer le traceur .NET :

* en définissant des variables d'environnement ;
* en code .NET ;
* en créant un fichier `datadog.json`.

{{< tabs >}}

{{% tab "Variables d'environnement" %}}

Pour configurer le traceur à l'aide de variables d'environnement, définissez-les avant le lancement de l'application instrumentée.

Par exemple, sous Windows :

```cmd
rem Définir les variables d'environnement
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Lancer l'application
example.exe
```

**Remarque** : pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

Sur Linux :

```bash
# Définir les variables d'environnement
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_ENV=prod
export DD_SERVICE=MyService
export DD_VERSION=abc123

# Lancer l'application
dotnet example.dll
```

{{% /tab %}}

{{% tab "Code" %}}

Pour configurer le traceur dans le code de l'application, créez un `TracerSettings` à partir des sources de configuration par défaut. Définissez les propriétés de cette instance `TracerSettings` avant de la transmettre à un constructeur `Tracer`. Par exemple :

```csharp
using Datadog.Trace;

// lire les sources de configuration par défaut (variables d'environnement, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// modifier certains paramètres
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
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

{{% tab "Fichier JSON" %}}

Pour configurer le traceur à l'aide d'un fichier JSON, créez `datadog.json` dans le répertoire de l'application instrumentée. L'objet JSON racine doit être un hash avec une paire key/value pour chaque paramètre. Par exemple :

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### Variables de configuration

Le tableau suivant énumère les variables de configuration prises en charge. Utilisez le premier nom (p. ex., `DD_TRACE_AGENT_URL`) pour les variables d'environnement ou les fichiers de configuration. Lorsqu'il est précisé, le deuxième nom (p. ex., `AgentUri`) correspond au nom de la propriété de `TracerSettings` à utiliser lors du changement des paramètres dans le code.

#### Tagging

| Nom du paramètre                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. Consultez la documentation relative à la [configuration de l'Agent][8] pour en savoir plus sur le tag `env`.                                                              |
| `DD_SERVICE`<br/><br/>`ServiceName`            | Lorsqu'il est spécifié, ce paramètre définit le nom du service. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (p. ex. nom de l'application IIS, exécutable du processus ou nom du processus). |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | Lorsqu'il est spécifié, ce paramètre définit la version du service.
| `DD_TAGS`<br/><br/>`GlobalTags`       | Lorsqu'il est défini, ce paramètre ajoute tous les tags spécifiés à l'ensemble des spans générées (p. ex. `layer:api,team:intake`).                                                                                                                                              |

Nous vous conseillons fortement d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services.
Consultez la documentation sur le [Tagging de service unifié][9] pour en savoir plus sur la configuration de ces variables d'environnement.

#### Instrumentation

Le tableau suivant énumère les variables de configuration disponibles aussi bien pour les instrumentations automatiques que manuelles.

| Nom du paramètre                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. La valeur par défaut est `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Définit le port sur lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Active ou désactive l'injection automatique des paramètres `env`, `service` et `version` ainsi que des ID de trace et de span dans les logs de l'application.                                                                                                                         |
| `DD_TRACE_DEBUG`                                    | Active ou désactive les logs de debugging. Valeurs acceptées : `true` ou `false` (par défaut).                                                                                                                                 |

Le tableau suivant énumère les variables de configuration disponibles uniquement pour les instrumentations automatiques.

| Nom du paramètre                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` (par défaut) ou `false`. |
| `DD_TRACE_DEBUG`                                               | Active ou désactive les logs de debugging dans le traceur. Valeurs autorisées : `true` ou `false` (valeur par défaut). En définissant ce paramètre en tant que variable d'environnement, vous activez également les logs de debugging dans le profileur CLR.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Définit le chemin du fichier de log du profileur CLR.<br/><br/>Valeur par défaut pour Windows : `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Valeur par défaut pour Linux : `/var/log/datadog/dotnet/dotnet-profiler.log`                                                                                     |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides correspondent aux noms d'intégration énumérés dans la section [Intégrations] (#integrations) ci-dessus.           |
| `DD_TRACE_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`       | Raccourci qui active les paramètres App Analytics par défaut pour les intégrations de framework Web. Valeurs acceptées : `true` ou `false` (par défaut).                                                                                                                                                     |

Le tableau suivant énumère les variables de configuration qui sont uniquement disponibles en utilisant l'instrumentation automatique, et qui peuvent être définies pour chaque intégration. Utilisez le premier nom (p. ex., `DD_<INTÉGRATION>_ENABLED`) pour les variables d'environnement et les fichiers de configuration. Le deuxième nom (p. ex., `Enabled`) correspond au nom de la propriété `IntegrationSettings` à utiliser lors du changement des paramètres dans le code. Accédez à ces propriétés à l'aide de l'indexeur `TracerSettings.Integrations[]`. Les noms d'intégrations sont énumérés dans la section [Intégrations](#integrations) ci-dessus. **Remarque :** sous Linux, les noms des variables d'environnement sont sensibles à la casse.

| Nom du paramètre                                                            | Description                                                                                                           |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_<INTÉGRATION>_ENABLED`<br/><br/>`Enabled`                           | Active ou désactive une intégration spécifique. Valeurs acceptées : `true` (par défaut) ou `false`.                            |
| `DD_<INTÉGRATION>_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`        | Active ou désactive App Analytics pour une intégration spécifique. Valeurs acceptées : `true` ou `false` (par défaut).           |
| `DD_<INTÉGRATION>_ANALYTICS_SAMPLE_RATE`<br/><br/>`AnalyticsSampleRate` | Définit le taux d'échantillonnage App Analytics pour une intégration spécifique. Doit être un nombre flottant entre `0.0` et `1.0` (par défaut). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /fr/tracing/send_traces/
[3]: /fr/tracing/setup/dotnet-framework/
[4]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[5]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[6]: /fr/help/
[7]: /fr/tracing/manual_instrumentation/dotnet
[8]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
[9]: /fr/getting_started/tagging/unified_service_tagging