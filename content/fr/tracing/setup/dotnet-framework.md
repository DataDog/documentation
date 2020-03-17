---
title: Tracer des applications .NET Framework
kind: documentation
aliases:
  - /fr/tracing/dotnet
  - /fr/tracing/languages/dotnet
  - /fr/tracing/setup/dotnet
  - /fr/agent/apm/dotnet/
  - /fr/tracing/dotnet-framework
  - /fr/tracing/languages/dotnet-framework
  - /fr/tracing/setup/dotnet-framework
  - /fr/agent/apm/dotnet-framework/
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
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Prise en main

<div class="alert alert-info">Si vous avez déjà un compte Datadog, vous trouverez des instructions détaillées dans nos guides intégrés à l'application pour les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=net" target="_blank">basées sur un host</a> et les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=net" target="_blank">basées sur un conteneur</a>.</div>

Pour commencer le tracing d'applications écrites dans n'importe quel langage, [installez et configurez tout d'abord l'Agent Datadog][1]. Le traceur .NET instrumente vos applications et envoie leurs traces à l'Agent en s'exécutant au sein du processus.

**Remarque** : le traceur .NET prend en charge tous les langages basés sur .NET (C#, F#, Visual Basic, etc).

## Instrumentation automatique

Avec l'instrumentation automatique, vous pouvez recueillir des données de performance sur votre application sans avoir à modifier son code. Il vous suffit juste de configurer quelques options. Le traceur .NET est prêt à l'emploi : il instrumente automatiquement toutes les [bibliothèques prises en charge](#integrations).

L'instrumentation automatique capture :

- Les durées d'exécution des appels instrumentés
- Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
- Les exceptions non traitées, y compris les traces de pile le cas échéant
- Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

Le traceur .NET prend en charge l'instrumentation automatique sur .NET Framework 4.5 et ultérieur, ainsi que sur [.NET Core][2].

### Installation

Pour appliquer l'instrumentation automatique sur Windows, installez le traceur .NET sur le host à l'aide du [programme d'installation MSI pour Windows][3]. Choisissez le programme d'installation correspondant à l'architecture de votre système d'exploitation (x64 ou x86).

Une fois le traceur .NET installé, redémarrez les applications de sorte qu'elles puissent lire les nouvelles variables d'environnement. Pour redémarrer IIS, exécutez les commandes suivantes en tant qu'administrateur :

```cmd
net stop /y was
net start w3svc
```

### Variables d'environnement requises

Si votre application fonctionne dans IIS, passez directement à la section suivante.

Pour les applications Windows ne fonctionnant **pas** dans IIS, définissez les deux variables d'environnement suivantes avant de démarrer votre application pour activer l'instrumentation automatique :

Nom                   | Valeur
-----------------------|------
`COR_ENABLE_PROFILING` | `1`
`COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

Par exemple, pour définir les variables d'environnement à partir d'un fichier de commandes avant de démarrer votre application :

```bat
rem Définir des variables d'environment
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
example.exe
```

Pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

**Remarque** : le runtime .NET tente de charger un profileur dans _n'importe quel_ processus .NET démarré lorsque ces variables d'environnement sont définies. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. **Nous vous conseillons de ne pas définir ces variables d'environnement globalement, au risque d'activer le chargement du profileur par _tous_ les processus .NET sur le host.**

### Intégrations

Le traceur .NET peut instrumenter automatiquement les bibliothèques suivantes :

| Framework ou bibliothèque           | Package NuGet                  | Nom de l'intégration     |
|--------------------------------|--------------------------------|----------------------|
| ASP.NET (y compris Web Forms) | Intégré                       | `AspNet`             |
| ASP.NET MVC                    | `Microsoft.AspNet.Mvc` 4.0+    | `AspNetMvc`          |
| ASP.NET Web API 2              | `Microsoft.AspNet.WebApi` 5.1+ | `AspNetWebApi2`      |
| WCF (serveur)                   | Intégré                       | `Wcf`                |
| ADO.NET                        | Intégré                       | `AdoNet`             |
| HttpClient / HttpClientHandler | Intégré                       | `HttpMessageHandler` |
| WebClient / WebRequest         | Intégré                       | `WebRequest`         |
| Redis (client StackExchange)   | `StackExchange.Redis` 1.0.187+ | `StackExchangeRedis` |
| Redis (client ServiceStack)    | `ServiceStack.Redis` 4.0.48+   | `ServiceStackRedis`  |
| Elasticsearch                  | `Elasticsearch.Net` 5.3.0+    | `ElasticsearchNet`   |
| MongoDB                        | `MongoDB.Driver.Core` 2.1.0+   | `MongoDb`            |

**Mise à jour :** depuis la version `1.12.0` du traceur .NET, l'intégration ASP.NET est activée automatiquement. Les packages NuGet `Datadog.Trace.AspNet` et `Datadog.Trace.ClrProfiler.Managed` ne sont donc plus requis. Supprimez-les de votre application lorsque vous mettez à jour le traceur .NET.

**Remarque :** l'intégration ADO.NET instrumente les appels effectués via la classe abstraite `DbCommand` ou l'interface `IDbCommand`, sans tenir compte de l'implémentation sous-jacente. Elle instrumente également les appels directs de `SqlCommand`.

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][4] pour obtenir de l'aide.

## Instrumentation manuelle

Pour instrumenter manuellement votre code, ajoutez le [paquet NuGet][5] `Datadog.Trace` à votre application. Dans votre code, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation manuelle et l'application de tags personnalisés, consultez la [documentation relative à l'instrumentation manuelle][6].

L'instrumentation manuelle est prise en charge pour .NET Framework 4.5 et ultérieur sur Windows, ainsi que pour .NET Core 2.1, 3.0 et 3.1 sur Windows et Linux.

## Configuration

Il existe plusieurs façons de configurer le traceur .NET :

* en code .NET ;
* en définissant des variables d'environnement ;
* en modifiant le fichier `app.config`/`web.config` de l'application (.NET Framework uniquement) ;
* en créant un fichier `datadog.json`.

{{< tabs >}}
{{% tab "Code" %}}

Pour configurer le traceur dans le code de l'application, créez un `TracerSettings` à partir des sources de configuration par défaut. Définissez les propriétés de cette instance `TracerSettings` avant de la transmettre à un constructeur `Tracer`. Par exemple :

```csharp
using Datadog.Trace;

// lire les sources de configuration par défaut (variables d'environnement, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// modifier certains paramètres
settings.ServiceName = "MyService";
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

Par exemple :

```cmd
rem Définir des variables d'environnement
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_SERVICE_NAME=MyService
SET DD_ADONET_ENABLED=false

rem Démarrer l'application
example.exe
```

**Remarque** : pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows.

{{% /tab %}}

{{% tab "web.config" %}}

Pour configurer le traceur à l'aide d'un fichier `app.config` ou `web.config`, utilisez la section `<appSettings>`. Par exemple :

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_SERVICE_NAME" value="MyService"/>
    <add key="DD_ADONET_ENABLED" value="false"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "Fichier JSON" %}}

Pour configurer le traceur à l'aide d'un fichier JSON, créez `datadog.json` dans le répertoire de l'application instrumentée. L'objet JSON racine doit être un hash avec une paire key/value pour chaque paramètre. Par exemple :

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_SERVICE_NAME": "MyService",
  "DD_ADONET_ENABLED": "false"
}
```

{{% /tab %}}

{{< /tabs >}}

### Variables de configuration

Le tableau suivant énumère les variables de configuration prises en charge. Utilisez le premier nom (p. ex., `DD_TRACE_AGENT_URL`) pour les variables d'environnement ou les fichiers de configuration. Lorsqu'il est précisé, le deuxième nom (p. ex., `AgentUri`) correspond au nom de la propriété de `TracerSettings` à utiliser lors du changement des paramètres dans le code.

Le premier tableau ci-dessous énumère les variables de configuration disponibles à la fois pour une instrumentation automatique ou manuelle.

| Nom du paramètre                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. La valeur par défaut est `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Définit le port sur lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `8126`.                                                     |
| `DD_ENV`<br/><br/>`Environment`                     | Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. Consultez la documentation relative à la [configuration de l'Agent][7] pour en savoir plus sur le tag `env`.                                                              |
| `DD_SERVICE_NAME`<br/><br/>`ServiceName`            | Lorsqu'il est spécifié, ce paramètre définit le nom du service par défaut. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (p. ex. nom de l'application IIS, exécutable du processus ou nom du processus). |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Active ou désactive l'injection automatique d'identificateurs de corrélation dans les logs de l'application.                                                                                                                         |
| `DD_TRACE_GLOBAL_FLAGS`<br/><br/>`GlobalTags`       | Lorsqu'il est défini, ce paramètre ajoute tous les tags spécifiés à l'ensemble des spans générées.                                                                                                                                              |

Le tableau suivant énumère les variables de configuration qui sont disponibles uniquement lors de l'utilisation de l'instrumentation automatique.

| Nom du paramètre                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` (par défaut) ou `false`. |
| `DD_TRACE_DEBUG`                                               | Active ou désactive les logs de debugging dans le traceur. Valeurs autorisées : `true` ou `false` (valeur par défaut). En définissant ce paramètre en tant que variable d'environnement, vous activez également les logs de debugging dans le profileur CLR.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Définit le chemin du fichier de log du profileur CLR.<br/><br/>Valeur par défaut : `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`                                                                                                                                                            |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides correspondent aux noms d'intégration énumérés dans la section [Intégrations] (#integrations) ci-dessus.           |
| `DD_TRACE_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`       | Raccourci qui active les paramètres App Analytics par défaut pour les intégrations de framework Web. Valeurs acceptées : `true` ou `false` (par défaut).                                                                                                                                                     |

Le tableau suivant énumère les variables de configuration qui sont uniquement disponibles en utilisant l'instrumentation automatique, et qui peuvent être définies pour chaque intégration. Utilisez le premier nom (p. ex., `DD_<INTEGRATION>_ENABLED`) pour les variables d'environnement et les fichiers de configuration. Le deuxième nom (p. ex., `Enabled`) correspond au nom de la propriété `IntegrationSettings` à utiliser lors du changement des paramètres dans le code. Accédez à ces propriétés à l'aide de l'indexeur `TracerSettings.Integrations[]`. Les noms d'intégrations sont énumérés dans la section [Intégrations](#integrations) ci-dessus.

| Nom du paramètre                                                            | Description                                                                                                           |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Active ou désactive une intégration spécifique. Valeurs acceptées : `true` (par défaut) ou `false`.                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`        | Active ou désactive l'analyse d'app pour une intégration spécifique. Valeurs acceptées : `true` ou `false` (par défaut).           |
| `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`<br/><br/>`AnalyticsSampleRate` | Définit le taux d'échantillonnage pour l'analyse d'app pour une intégration spécifique. Doit être un nombre flottant entre `0.0` et `1.0` (par défaut). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces
[2]: /fr/tracing/setup/dotnet-core
[3]: https://github.com/DataDog/dd-trace-dotnet/releases
[4]: /fr/help
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /fr/tracing/manual_instrumentation/dotnet
[7]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment