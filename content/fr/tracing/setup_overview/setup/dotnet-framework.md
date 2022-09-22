---
title: Tracer des applications .NET Framework
kind: documentation
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
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: /tracing/connect_logs_and_traces/dotnet/
    tag: Documentation
    text: Associer vos logs d'application .NET à vos traces
  - link: /tracing/runtime_metrics/dotnet/
    tag: Documentation
    text: Métriques runtime
  - link: /serverless/azure_app_services/
    tag: Documentation
    text: Extension Microsoft Azure App Service
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: Blog
    text: Surveillance .NET avec l'APM et le tracing distribué de Datadog
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
    tag: GitHub
    text: Exemples d'instrumentation personnalisée
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: Code source
---
## Exigences de compatibilité

Le traceur .NET prend en charge l'instrumentation automatique sur .NET Framework 4.5 et ultérieur. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Instrumentation automatique

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Suivez les instructions suivantes pour commencer à tracer des applications .NET :

#### Applications hébergées dans IIS

Pour commencer à tracer une application hébergée dans IIS :

1. Installez et configurez l'[Agent Datadog pour Windows][2].

2. Téléchargez le [programme d'installation MSI][3] pour le traceur .NET. Choisissez le programme d'installation correspondant à l'architecture de votre système (x64 ou x86).

3. Exécutez le programme d'installation MSI pour le traceur .NET avec des privilèges d'administrateur.

4. Arrêtez puis redémarrez IIS à l'aide des commandes suivantes en tant qu'administrateur : 

    <div class="alert alert-warning"> 
      <strong>Note:</strong> You must use a stop and start command. This is not the same as a reset or restart command.
    </div>

    ```text
    net stop /y was
    net start w3svc
    ```
5. Créez une charge d'application.

6. Consultez la page [APM Live Traces][4].

#### Applications non hébergées dans IIS

Pour activer l'instrumentation automatique sur des applications Windows qui ne sont pas hébergées dans IIS, vous devez définir deux variables d'environnement avant de démarrer votre application :

| Nom                   | Valeur                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> lorsque ces variables d'environnement sont définies, le runtime .NET tente de charger un profileur dans n'importe quel processus .NET démarré. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profileur par tous les processus .NET sur le host.
</div>

##### Services Windows
Pour instrumenter automatiquement un service Windows, définissez les variables d'environnement `COR_ENABLE_PROFILING` et `COR_PROFILER` :

1. Dans l'éditeur du registre Windows, créez une valeur multi-chaînes `Environment` dans `HKLM\System\CurrentControlSet\Services\<NOM_SERVICE>`.
2. Définissez les données de valeur sur :

   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
     {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Éditeur du registre"  >}}

Sinon, vous pouvez définir les variables d'environnement à l'aide de l'extrait PowerShell suivant :

   {{< code-block lang="powershell" filename="add-env-var.ps1" >}}
   [String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
   {{< /code-block >}}

##### Applications console

Pour instrumenter automatiquement une application console, définissez les variables d'environnement `COR_ENABLE_PROFILING` et `COR_PROFILER` depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Définir des variables d'environment
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
example.exe
```
### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de sorte à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_enabled: true` et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les [instructions de démarrage rapide][2] dans l'application pour activer la collecte de traces au sein de l'Agent Datadog.
{{< site-region region="us3,eu,gov" >}} 

Veillez à définir `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

## Instrumentation personnalisée

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :

1. Ajoutez le [package NuGet][5] `Datadog.Trace` à votre application.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation et le tagging personnalisés, consultez la [documentation relative à l'instrumentation personnalisée .NET][6].

## Configuration

{{< img src="tracing/dotnet/diagram_docs_net.png" alt="Priorité des paramètres de configuration du traceur .NET"  >}}

Vous pouvez modifier les paramètres de configuration du traceur .NET de différentes façons :

{{< tabs >}}

{{% tab "Variables d'environnement" %}}

Pour configurer le traceur à l'aide de variables d'environnement, définissez-les avant le lancement de l'application instrumentée.

Par exemple :

```cmd
rem Définir les variables d'environnement
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Lancer l'application
example.exe
```

<div class="alert alert-warning"> 
<strong>Remarque :</strong> pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes <code>HKLM\System\CurrentControlSet\Services\{nom du service}\Environment</code> dans le registre Windows, tel que précédemment décrit.
</div>

{{% /tab %}}

{{% tab "Code" %}}

Pour configurer le traceur dans le code de l'application, créez une instance `TracerSettings` à partir des sources de configuration par défaut. Définissez les propriétés de cette instance `TracerSettings` avant de la transmettre à un constructeur `Tracer`. Par exemple :

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> les paramètres doivent être définis sur <code>TracerSettings</code> <em>avant</em> la création de <code>Tracer</code>. Toute modification apportée aux propriétés <code>TracerSettings</code> après la création de <code>Tracer</code> sera ignorée.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// lire les sources de configuration par défaut (variables d'environnement, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// modifier certains paramètres
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// créer un nouveau traceur à l'aide de ces paramètres
var tracer = new Tracer(settings);

// définir le traceur global
Tracer.Instance = tracer;
```

{{% /tab %}}

{{% tab "web.config" %}}

Pour configurer le traceur à l'aide d'un fichier `app.config` ou `web.config`, utilisez la section `<appSettings>`. Par exemple :

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

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

## Paramètres de configuration

À l'aide des instructions ci-dessus, personnalisez votre configuration de tracing avec les variables suivantes. Utilisez le nom de la variable d'environnement (par exemple, `DD_TRACE_AGENT_URL`) pour définir des variables d'environnement ou des fichiers de configuration. Utilisez la propriété TracerSettings (par exemple, `AgentUri`) pour modifier des paramètres dans le code.

### Tagging de service unifié

Pour utiliser le [tagging de service unifié][7], configurez les paramètres suivants pour vos services.


`DD_ENV`
: **Propriété TracerSettings** : `Environment`<br>
Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. Ajouté avec la version 1.17.0

`DD_SERVICE`
: **Propriété TracerSettings** : `ServiceName`<br>
Lorsqu'il est spécifié, ce paramètre définit le nom du service. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (nom de l'application IIS, assembly d'entrée du processus ou nom du processus). Ajouté avec la version 1.17.0

`DD_VERSION`
: **Propriété TracerSettings** : `ServiceVersion`<br>
Lorsqu'il est spécifié, ce paramètre définit la version du service. Ajouté avec la version 1.17.0

### Configuration supplémentaire facultative

Les variables de configuration sont disponibles aussi bien pour l'instrumentation automatique que pour l'instrumentation personnalisée :

`DD_TRACE_AGENT_URL`
: **Propriété TracerSettings** : `AgentUri`<br>
Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. <br>
**Valeur par défaut** : `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.

`DD_AGENT_HOST`
: Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. <br>
**Valeur par défaut** : `localhost`.

`DD_TRACE_AGENT_PORT`
: Définit le port sur lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. <br>
**Valeur par défaut** : `8126`.

`DD_LOGS_INJECTION`
: **Propriété TracerSettings** : `LogsInjectionEnabled` <br>
Active ou désactive l'injection automatique d'identificateurs de corrélation dans les logs de l'application.

`DD_TRACE_SAMPLE_RATE`
: **Propriété TracerSettings** : `GlobalSamplingRate` <br>
Active ou désactive [Tracing without limits][4].

`DD_TRACE_DEBUG`
: **Propriété TracerSettings** : `DebugEnabled` <br>
Active ou désactive les logs de debugging. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `false`

`DD_TRACE_HEADER_TAGS`
: **Propriété TracerSettings** :`HeaderTags` <br>
Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête correspondantes en tant que tags sur les spans racine. Accepte également les entrées sans nom de tag. <br>
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Ajouté avec la version 1.18.3. Prise en charge des en-têtes des réponses et des entrées sans nom de tag ajoutée avec la version 1.26.0.

`DD_TAGS`
: **Propriété TracerSettings** : `GlobalTags`<br>
Lorsqu'il est défini, ce paramètre ajoute tous les tags spécifiés à l'ensemble des spans générées. Ajouté avec la version 1.17.0.<br>
**Exemple** : `layer:api,team:intake`

`DD_TRACE_LOGGING_RATE`
: Définit la limite de débit pour les messages des logs. Si ce paramètre est défini, les lignes de log uniques sont écrites une fois toutes les `x` secondes. Par exemple, pour enregistrer un message donné une fois toutes les 60 secondes, définissez la valeur de ce paramètre sur `60`. La valeur `0` désactive la limite de débit des logs. Ajouté avec la version 1.24.0. Désactivé par défaut.

`DD_TRACE_SERVICE_MAPPING`
: Renomme des services à l'aide d'une configuration. Accepte une map composée des clés de nom de service à renommer et des nouveaux noms, au format `[from-key]:[to-name]`. <br>
**Exemple** : `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
La valeur `from-key` dépend du type d'intégration et ne doit pas comprendre le préfixe du nom de l'application. Par exemple, pour remplacer le nom `my-application-sql-server` par `main-db`, utilisez `sql-server:main-db`. Ajouté avec la version 1.23.0

### Configuration facultative de l'instrumentation automatique

Les variables de configuration sont disponibles **uniquement** lors de l'utilisation de l'instrumentation automatique :

`DD_TRACE_ENABLED`
: **Propriété TracerSettings** : `TraceEnabled`<br>
Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `true`.

`DD_TRACE_LOG_DIRECTORY`
: Définit le répertoire pour les logs du traceur .NET.<br>
**Valeur par défaut** : `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOG_PATH`
: Définit le chemin pour le fichier de log de l'instrumentation automatique et détermine le répertoire de tous les autres fichiers de log du traceur .NET. Ce paramètre est ignoré si `DD_TRACE_LOG_DIRECTORY` est défini.

`DD_DISABLED_INTEGRATIONS`
: **Propriété TracerSettings** : `DisabledIntegrationNames` <br>
Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides correspondent aux noms d'intégration énumérés dans la section [Intégrations][8].

`DD_HTTP_CLIENT_ERROR_STATUSES`
: Définit les plages de codes de statut pour lesquelles les spans client HTTP sont identifiées comme des erreurs.<br>
**Valeur par défaut** : `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: Définit les plages de codes de statut pour lesquelles les spans serveur HTTP sont identifiées comme des erreurs. <br>
**Valeur par défaut** : `500-599`.

`DD_RUNTIME_METRICS_ENABLED`
: Active les métriques runtime .NET. Valeurs acceptées : `true` ou `false`. Ajouté avec la version 1.23.0.<br>
**Valeur par défaut** : `false`

`DD_TRACE_ADONET_EXCLUDED_TYPES`
: **Propriété TracerSettings** : `AdoNetExcludedTypes` <br>
Définit une liste de types `AdoNet` (par exemple, `System.Data.SqlClient.SqlCommand`) qui seront exclus de l'instrumentation automatique.


### Configuration de la désactivation d'intégrations

Le tableau suivant énumère les variables de configuration disponibles **uniquement** pour l'instrumentation automatique. Elles peuvent être définies pour chaque intégration.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Propriété TracerSettings** : `Integrations[<INTEGRATION_NAME>].Enabled` <br>
Active ou désactive une intégration spécifique. Valeurs acceptées : `true` ou `false`. Les noms d'intégration sont énumérés dans la section [Intégrations][8].<br>
**Valeur par défaut** : `true`

#### Fonctionnalités expérimentales

Les variables de configuration peuvent être utilisées pour des fonctionnalités actuellement disponibles, mais dont le fonctionnement peut être amené à évoluer dans de futures versions.

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: Si cette variable est définie sur `true`, elle active l'amélioration des noms de ressource pour les spans Web. Utilise les informations du modèle de routage (le cas échéant), ajoute une span supplémentaire pour les intégrations ASP.NET Core et active des tags supplémentaires. Ajouté avec la version 1.26.0.<br>
**Valeur par défaut** : `false`.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Active la transmission incrémentielle des traces volumineuses à l'Agent Datadog, afin de réduire les risques de rejet par l'Agent. Utilisez uniquement cette variable lorsque vous avez des traces de longue durée, ou des traces avec de nombreuses spans. Valeurs acceptées : `true` ou `false`. Ajouté avec la version 1.26.0, uniquement compatible avec l'Agent Datadog v7.26.0+.<br>
**Valeur par défaut** : `false`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/dotnet-framework
[2]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/?tab=gui
[3]: https://github.com/datadog/dd-trace-dotnet/releases/latest
[4]: https://app.datadoghq.com/apm/traces
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /fr/tracing/custom_instrumentation/dotnet/
[7]: /fr/getting_started/tagging/unified_service_tagging/
[8]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-framework/#integrations