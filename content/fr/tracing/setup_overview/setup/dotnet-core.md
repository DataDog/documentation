---
title: Tracer des applications .NET Core
kind: documentation
aliases:
  - /fr/tracing/dotnet-core
  - /fr/tracing/languages/dotnet-core
  - /fr/tracing/setup/dotnet-core
  - /fr/agent/apm/dotnet-core/
  - /fr/tracing/setup/dotnet-core
  - /fr/tracing/setup_overview/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 60
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
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
    tag: GitHub
    text: Exemples d'instrumentation personnalisée
  - link: /tracing/connect_logs_and_traces/dotnet/
    tag: Documentation
    text: Associer vos logs d'application .NET à vos traces
  - link: /serverless/azure_app_services/
    tag: Documentation
    text: Extension Microsoft Azure App Service
---
## Exigences de compatibilité

Le traceur .NET prend en charge l'instrumentation sur :
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1

Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Instrumentation automatique

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

### Installation

{{< tabs >}}

{{% tab "Windows" %}}

1. [Installez et configurez l'Agent Datadog pour Windows][1].

2. Téléchargez le [programme d'installation MSI pour le traceur .NET][2]. Choisissez le programme d'installation correspondant à l'architecture de votre système (x64 ou x86).

3. Exécutez le programme d'installation MSI pour le traceur .NET avec des privilèges d'administrateur.

4. Redémarrez IIS en exécutant les commandes suivantes en tant qu'administrateur :
    ```cmd
    net stop /y was
    net start w3svc
    ```

5. Créez une charge d'application.

6. Consultez la page [APM Live Traces][3].



[1]: /fr/agent/basic_agent_usage/windows/?tab=gui
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "Linux" %}}

1. [Installez et configurez un Agent Datadog pour Linux][1].
2. Téléchargez et installez le traceur .NET dans l'environnement de l'application :
    - **Debian ou Ubuntu** – Téléchargez et installez le package Debian :
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      ```
    - **CentOS ou Fedora** – Téléchargez et installez le package RPM :
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      ```
    - **Alpine ou toute autre [distribution basée sur Musl][2]** – Téléchargez l'archive .tar avec le binaire lié à musl :
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
    - **Autres distributions** – Téléchargez l'archive .tar avec le binaire lié à glibc :
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
3. Ajoutez les [variables d'environnement requises](#variables-d-environnement-requises).

4. Exécutez le script `/opt/datadog/createLogPath.sh` afin de créer un répertoire pour les fichiers de log et de définir les autorisations de répertoire appropriées. Le répertoire par défaut pour les fichiers de log est `/var/log/datadog/dotnet`.

5. Créez une charge d'application.

6. Consultez la page [APM Live Traces][3].


[1]: /fr/agent/basic_agent_usage/
[2]: https://en.wikipedia.org/wiki/Musl
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{< /tabs >}}


### Variables d'environnement requises

{{< tabs >}}

{{% tab "Windows" %}}

#### Applications non hébergées dans IIS

Pour activer l'instrumentation automatique sur des applications Windows qui ne sont pas hébergées dans IIS, vous devez définir deux variables d'environnement avant de démarrer votre application :

Nom                       | Valeur
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> lorsque ces variables d'environnement sont définies, le runtime .NET tente de charger un profileur dans n'importe quel processus .NET démarré. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profileur par tous les processus .NET sur le host.
</div>

##### Services Windows

Pour instrumenter automatiquement un service Windows, définissez les variables d'environnement `CORECLR_ENABLE_PROFILING` et `CORECLR_PROFILER` :

1. Dans l'éditeur du registre Windows, créez une valeur multi-chaînes `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<NOM_SERVICE>`.
2. Définissez les données de la valeur sur :
    ```text
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ```
    {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Créer les variables d'environnement pour instrumenter un service dans l'éditeur du registre" >}}

Sinon, vous pouvez définir les variables d'environnement à l'aide de l'extrait PowerShell suivant :

```powershell
[String[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NOM> -Name Environment -Value $v
```

##### Applications console

Pour instrumenter automatiquement une application console, définissez les variables d'environnement `CORECLR_ENABLE_PROFILING` et `CORECLR_PROFILER` depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
dotnet.exe example.dll
```

{{% /tab %}}

{{% tab "Linux" %}}

1. Si l'Agent est exécuté sur un autre host ou conteneur, définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Lorsqu'il instrumente votre application, le client de tracing envoie les traces à `localhost:8126` par défaut. Si vous souhaitez modifier le host et le port, faites-le en définissant les variables d'environnement suivantes :

    - `DD_AGENT_HOST`
    - `DD_TRACE_AGENT_PORT`

4. Les variables d'environnement suivantes sont requises pour activer l'instrumentation automatique sous Linux :

    <div class="alert alert-info"> 
      <strong>Note:</strong> If the .NET Tracer is installed into a path other than the default <code>/opt/datadog</code> path, ensure the paths are changed to match.
    </div>

    Nom                       | Valeur
    ---------------------------|------
    `CORECLR_ENABLE_PROFILING` | `1`
    `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
    `CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
    `DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
    `DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

#### Définir les variables d'environnement via un script bash

Pour définir les variables d'environnement requises à l'aide d'un fichier bash avant le lancement de votre application :

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

#### Conteneur Docker Linux

Pour définir les variables d'environnement requises sur un conteneur Docker Linux :

    ```docker
    # Définir les variables d'environnement
    ENV CORECLR_ENABLE_PROFILING=1
    ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
    ENV DD_DOTNET_TRACER_HOME=/opt/datadog

    # Lancer votre application
    CMD ["dotnet", "example.dll"]
    ```

#### SystemCTL (service spécifique)

Lorsque vous utilisez la commande `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez ajouter les variables d'environnement requises qui doivent être chargées pour un service spécifique.

1. Créez un fichier nommé `environment.env` contenant :

    ```bat
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_INTEGRATIONS=/opt/datadog/integrations.json
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
    ```
2. Dans le fichier de configuration du service, ajoutez une référence vers ce fichier en tant que [`EnvironmentFile`][2] dans le bloc Service :

    ```bat
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Relancez le service .NET pour que les variables d'environnement soient appliquées.

#### SystemCTL (tous les services)

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> lorsque ces variables d'environnement sont définies, le runtime .NET tente de charger un profileur dans <em>tous</em> les processus .NET démarrés. Assurez-vous de limiter l'instrumentation aux applications devant être tracées. <strong>Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profileur par <em>tous</em> les processus .NET sur le host.</strong>
</div>

Lorsque vous utilisez la commande `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez également faire en sorte que les variables d'environnement soient chargées pour tous les services exécutés par `systemctl`.

1. Définissez les variables d'environnement en exécutant [`systemctl set-environment`][2] :

    ```bat
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. Vérifiez que les variables d'environnement ont bien été définies en exécutant `systemctl show-environment`.

3. Relancez le service .NET pour que les variables d'environnement soient appliquées.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
{{% /tab %}}

{{< /tabs >}}

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les [instructions de démarrage rapide][2] dans l'application pour activer la collecte de traces au sein de l'Agent Datadog.

## Instrumentation personnalisée

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :
1. Ajoutez le [package NuGet][2] `Datadog.Trace` à votre application.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation et le tagging personnalisés, consultez la [documentation relative à l'instrumentation personnalisée .NET][3].

## Configurer le traceur .NET

Vous pouvez modifier les paramètres de configuration du traceur .NET de différentes façons :

* Avec des variables d'environnement
* Dans le code de l'application .NET
* Avec un fichier `datadog.json`

{{< tabs >}}

{{% tab "Variables d'environnement" %}}

Pour configurer le traceur à l'aide de variables d'environnement, définissez-les avant le lancement de l'application instrumentée.

#### Windows

**Remarque** : pour définir les variables d'environnement pour un service Windows, utilisez la clé multi-chaînes `HKLM\System\CurrentControlSet\Services\{nom du service}\Environment` dans le registre Windows, comme décrit ci-dessus.

```cmd
rem Définir les variables d'environnement
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Lancer l'application
example.exe
```

#### Linux

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

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> les paramètres doivent être définis sur <code>TracerSettings</code> <em>avant</em> la création de <code>Tracer</code>. Toute modification apportée aux propriétés <code>TracerSettings</code> après la création de <code>Tracer</code> sera ignorée.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// lire les sources de configuration par défaut (variables d'environnement, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// modifier certains réglages
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

{{% /tab %}}

{{% tab "Fichier JSON" %}}

Pour configurer le traceur à l'aide d'un fichier JSON, créez `datadog.json` dans le répertoire de l'application instrumentée. L'objet JSON racine doit être un objet avec une paire key/value pour chaque paramètre. Par exemple :

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

### Paramètres de configuration

<div class="alert alert-info"> 
  <strong>Remarque :</strong> sous Linux, les noms des variables d'environnement sont sensibles à la casse.
</div>

À l'aide des instructions ci-dessus, personnalisez votre configuration de tracing avec les variables des tableaux suivants. Utilisez le premier nom (par exemple, DD_TRACE_AGENT_URL`) pour définir des variables d'environnement ou des fichiers de configuration. Le deuxième nom (par exemple, `AgentUri`) correspond au nom de la propriété `TracerSettings` à utiliser lors du changement des paramètres dans le code.

#### Tagging de service unifié

Pour utiliser le [tagging de service unifié][4], configurez les paramètres suivants pour vos services :

| Nom du paramètre                                        | Rôle                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. Ajouté avec la version 1.17.0.                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`            | Lorsqu'il est spécifié, ce paramètre définit le nom du service. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (nom de l'application IIS, assembly d'entrée du processus ou nom du processus). Ajouté avec la version 1.17.0.  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | Lorsqu'il est spécifié, ce paramètre définit la version du service. Ajouté avec la version 1.17.0. |


#### Configuration supplémentaire facultative

Le tableau suivant énumère les variables de configuration disponibles aussi bien pour l'instrumentation automatique que pour l'instrumentation personnalisée.

| Nom du paramètre                                        | Rôle                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. La valeur par défaut est `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.       |
| `DD_AGENT_HOST`                                     | Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `localhost`.                 |
| `DD_TRACE_AGENT_PORT`                               | Définit le port sur lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `8126`.                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Active ou désactive l'injection automatique des identifiants de corrélation dans les logs de l'application.                                                                                               |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | Lorsqu'il est défini, ce paramètre ajoute tous les tags spécifiés à l'ensemble des spans générées.                                                                                                                                              |
| `DD_TRACE_DEBUG` <br/><br/>`DebugEnabled`           | Active ou désactive les logs de debugging. Valeurs acceptées : `true` ou `false` (par défaut).                                                                          |
| `DD_TRACE_HEADER_TAGS`                              | Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête correspondantes en tant que tags sur les spans racine. Exemple : `CASE-insensitive-Header:my-tag-name,User-ID:userId`. Ajouté avec la version 1.18.3.  |
| `DD_TRACE_LOG_DIRECTORY`                            | Définit le répertoire pour les logs du traceur .NET.<br/><br/>Valeur par défaut : `%ProgramData%\Datadog .NET Tracer\logs\`.      |
| `DD_TRACE_LOG_PATH`                                 | Définit le chemin pour le fichier de log de l'instrumentation automatique et détermine le répertoire de tous les autres fichiers de log du traceur .NET. Ce paramètre est ignoré si `DD_TRACE_LOG_DIRECTORY` est défini.             |
| `DD_TRACE_SERVICE_MAPPING`                          | Renomme des services à l'aide d'une configuration. Accepte une map composée des clés de nom de service à renommer et des nouveaux noms, au format `[clé-origine]:[nouveau-nom]`. Exemple : `mysql:main-mysql-db, mongodb:offsite-mongodb-service`. L'élément `[clé-origine]` dépend du type d'intégration. Il ne doit pas comprendre le préfixe du nom de l'application. Par exemple, pour remplacer le nom de `my-application-sql-server` par `main-db`, utilisez `sql-server:main-db`. Fonctionnalité ajoutée avec la version 1.23.0. |
| `DD_TAGS`<br/><br/>`GlobalTags`       | Lorsqu'il est défini, ce paramètre ajoute tous les tags spécifiés à l'ensemble des spans générées. Exemple : `layer:api,team:intake`. Ajouté avec la version 1.17.0.                                                           |

#### Configuration facultative de l'instrumentation automatique

Le tableau suivant énumère les variables de configuration disponibles **uniquement** pour l'instrumentation automatique.

| Nom du paramètre                                                   | Rôle                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` (par défaut) ou `false`. |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides correspondent aux noms d'intégration énumérés dans la section [Intégrations][5].           |
| `DD_HTTP_CLIENT_ERROR_STATUSES`                                 | Définit les plages de codes de statut pour lesquelles les spans client HTTP sont identifiées comme des erreurs. Valeur par défaut : `400-499`. |
| `DD_HTTP_SERVER_ERROR_STATUSES`                                 | Définit les plages de codes de statut pour lesquelles les spans serveur HTTP sont identifiées comme des erreurs. Valeur par défaut : `500-599`. |
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | Définit une liste de types `AdoNet` (par exemple, `System.Data.SqlClient.SqlCommand`) qui seront exclus de l'instrumentation automatique. |


#### Configuration de la désactivation d'intégrations

Le tableau suivant énumère les variables de configuration disponibles **uniquement** pour l'instrumentation automatique. Elles peuvent être définies pour chaque intégration.

| Nom du paramètre                                                                  | Rôle                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<NOM_INTÉGRATION>_ENABLED`<br/><br/>`Integrations[<NOM_INTÉGRATION>].Enabled`            | Active ou désactive une intégration spécifique. Valeurs acceptées : `true` (par défaut) ou `false`. Les noms d'intégration sont énumérés dans la section [Intégrations][5].                          |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: https://www.nuget.org/packages/Datadog.Trace
[3]: /fr/tracing/setup_overview/custom_instrumentation/dotnet/
[4]: /fr/getting_started/tagging/unified_service_tagging/
[5]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core#integrations