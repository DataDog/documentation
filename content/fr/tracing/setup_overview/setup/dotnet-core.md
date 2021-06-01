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
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
    tag: GitHub
    text: Exemples d'instrumentation personnalisée
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: Code source
---
## Exigences de compatibilité

Le traceur .NET prend en charge l'instrumentation sur :
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1

Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer d'autres paramètres de configuration.

Sinon, pour commencer à tracer vos applications :

## Instrumentation automatique

### Installer le traceur

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

{{< tabs >}}

{{% tab "Windows" %}}

1. Téléchargez le [programme d'installation MSI pour le traceur .NET][1]. Choisissez le programme d'installation correspondant à l'architecture de votre système (x64 ou x86).

2. Exécutez le programme d'installation MSI pour le traceur .NET avec des privilèges d'administrateur.

3. Activez l'instrumentation dans votre service en configurant les variables d'environnement requises. Pour en savoir plus, consultez la rubrique *Instrumenter votre service* ci-dessous.

4. Créez une charge d'application.

5. Consultez la page [APM Live Traces][2].


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "Linux" %}}

1. Téléchargez et installez le traceur .NET dans l'environnement de l'application :
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
    - **Alpine ou toute autre [distribution basée sur musl][1]** – Téléchargez l'archive .tar avec le binaire lié à musl :
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

2. Exécutez le script `/opt/datadog/createLogPath.sh` afin de créer un répertoire pour les fichiers de log et de définir les autorisations de répertoire appropriées. Le répertoire par défaut pour les fichiers de log est `/var/log/datadog/dotnet`.

3. Activez l'instrumentation dans votre service en configurant les variables d'environnement requises. Pour en savoir plus, consultez la rubrique *Instrumenter votre service* ci-dessous.

4. Créez une charge d'application.

5. Consultez la page [APM Live Traces][2].


[1]: https://en.wikipedia.org/wiki/Musl
[2]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{< /tabs >}}

### Instrumenter votre service

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

Pour instrumenter automatiquement des applications hébergées sur ISS, arrêtez complètement IIS, puis démarrez-le en exécutant les commandes suivantes en tant qu'administrateur :

<div class="alert alert-warning">
  <strong>Remarque :</strong> vous devez utiliser une commande stop/start. Les commandes reset ou restart ne fonctionnent pas toujours.
</div>

```cmd
net stop /y was
net start w3svc
```

#### Services Windows

Pour instrumenter automatiquement un service Windows, définissez les variables d'environnement `CORECLR_ENABLE_PROFILING` et `CORECLR_PROFILER` pour le service dans le registre Windows.

Avec l'éditeur du registre :

Dans l'éditeur du registre, créez une valeur multi-chaînes `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\<NOM_SERVICE>` et définissez les données de la valeur sur :
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour un service Windows" >}}

Avec PowerShell :

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NOM_SERVICE> -Name Environment -Value $v
```

#### Applications console

Pour instrumenter automatiquement une application console, définissez les variables d'environnement `CORECLR_ENABLE_PROFILING` et `CORECLR_PROFILER` depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
dotnet.exe example.dll
```

#### Autres applications

Pour activer l'instrumentation automatique, vous devez définir deux variables d'environnement avant de démarrer votre application :

Nom                       | Valeur
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>Remarque :</strong> lorsque ces variables d'environnement sont définies, le runtime .NET tente de charger un profileur dans n'importe quel processus .NET démarré. Assurez-vous de limiter l'instrumentation aux applications devant être instrumentées. Ne définissez pas ces variables d'environnement globalement, au risque d'activer le chargement du profileur par tous les processus .NET sur le host.
</div>

{{% /tab %}}

{{% tab "Linux" %}}

Les variables d'environnement suivantes sont requises pour activer l'instrumentation automatique :

  <div class="alert alert-info">
      <strong>Remarque :</strong> si le traceur .NET est installé à un emplacement autre que l'emplacement <code>/opt/datadog</code> par défaut, veillez à modifier les chemins en conséquence.
  </div>

  Nom                       | Valeur
  ---------------------------|------
  `CORECLR_ENABLE_PROFILING` | `1`
  `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
  `CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
  `DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
  `DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

#### Script bash

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

  # Démarrer votre application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (service spécifique)

Lorsque vous utilisez la commande `systemctl` pour exécuter des applications .NET en tant que service, vous pouvez ajouter les variables d'environnement requises qui doivent être chargées pour un service spécifique.

1. Créez un fichier nommé `environment.env` contenant :

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_INTEGRATIONS=/opt/datadog/integrations.json
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
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

1. Définissez les variables d'environnement requises en exécutant [`systemctl set-environment`][1] :

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. Vérifiez que les variables d'environnement ont bien été définies en exécutant `systemctl show-environment`.

3. Relancez le service .NET pour que les variables d'environnement soient appliquées.


[1]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
{{% /tab %}}

{{< /tabs >}}

## Instrumentation personnalisée

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez à la fois l'instrumentation automatique et l'instrumentation personnalisée, il est essentiel que les versions des packages (par exemple, MSI et NuGet) soient synchronisées.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET :
1. Ajoutez le [package NuGet][3] `Datadog.Trace` à votre application.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour en savoir plus sur l'instrumentation et le tagging personnalisés, consultez la [documentation relative à l'instrumentation personnalisée .NET][4].

## Installer et configurer l'Agent pour l'APM

[Installez l'Agent Datadog][5] et configurez-le de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}

{{% tab "Conteneurs" %}}

1. Si l'Agent est exécuté sur un autre host ou conteneur, définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Lorsqu'il instrumente votre application, le client de tracing envoie les traces à `localhost:8126` par défaut. Si vous souhaitez modifier le host et le port, faites-le en définissant les variables d'environnement suivantes :

    - `DD_AGENT_HOST`
    - `DD_TRACE_AGENT_PORT`

{{< site-region region="us3,eu,gov" >}} 

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].



[1]: /fr/tracing/serverless_functions/
{{% /tab %}}

{{% tab "Extension Azure App Service" %}}

Pour configurer l'APM Datadog dans Azure App Service, consultez la documentation dédiée au [tracing de l'extension Azure App Service][1].


[1]: /fr/serverless/azure_app_services/
{{% /tab %}}

{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2] et [AWS Elastic Beanstalk][3].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][4] pour l'environnement qui vous intéresse. [Contactez l'assistance][5] si vous rencontrez des problèmes de configuration.


[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/integrations/
[5]: /fr/help/
{{% /tab %}}

{{< /tabs >}}

## Configurer le traceur

{{< img src="tracing/dotnet/diagram_docs_net.png" alt="Priorité des paramètres pour la configuration du traceur .NET"  >}}

Vous pouvez modifier les paramètres de configuration du traceur .NET de différentes façons :

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

À l'aide des instructions ci-dessus, personnalisez votre configuration de tracing avec les variables suivantes. Utilisez le nom de la variable d'environnement (par exemple, `DD_TRACE_AGENT_URL`) pour définir des variables d'environnement ou des fichiers de configuration. Utilisez la propriété TracerSettings (par exemple, `AgentUri`) pour modifier des paramètres dans le code.

#### Tagging de service unifié

Pour utiliser le [tagging de service unifié][6], configurez les paramètres suivants pour vos services :

`DD_ENV`
: **Propriété TracerSettings** : `Environment`<br>
Lorsqu'il est spécifié, ce paramètre ajoute le tag `env` avec la valeur définie à toutes les spans générées. Ajouté avec la version 1.17.0.

`DD_SERVICE`
: **Propriété TracerSettings** : `ServiceName`<br>
Lorsqu'il est spécifié, ce paramètre définit le nom du service. Sinon, le traceur .NET tente de déterminer automatiquement le nom du service à partir du nom de l'application (nom de l'application IIS, assembly d'entrée du processus ou nom du processus). Ajouté avec la version 1.17.0.

`DD_VERSION`
: **Propriété TracerSettings** : `ServiceVersion`<br>
Lorsqu'il est spécifié, ce paramètre définit la version du service. Ajouté avec la version 1.17.0.


#### Configuration facultative

Le tableau suivant énumère les variables de configuration disponibles aussi bien pour l'instrumentation automatique que pour l'instrumentation personnalisée.


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

`DD_TRACE_GLOBAL_TAGS`
: **Propriété TracerSettings** : `GlobalTags`<br>
Lorsqu'il est spécifié, ce paramètre ajoute tous les tags définis à l'ensemble des spans générées.

`DD_TRACE_DEBUG` 
: **Propriété TracerSettings** : `DebugEnabled`<br>
Active ou désactive les logs de debugging. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `false`.

`DD_TRACE_HEADER_TAGS`
: Accepte une map composée des clés d'en-tête (insensibles à la casse) et des noms de tag, et applique automatiquement les valeurs d'en-tête correspondantes en tant que tags sur les spans racines. Accepte également les entrées sans nom de tag. <br>
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Ajouté avec la version 1.18.3. Prise en charge des en-têtes des réponses et des entrées sans nom de tag ajoutée avec la version 1.26.0.

`DD_TRACE_LOG_DIRECTORY`
: Définit le répertoire pour les logs du traceur .NET. <br>
**Valeur par défaut** : `%ProgramData%\Datadog .NET Tracer\logs\`.

`DD_TRACE_LOG_PATH`
: Définit le chemin pour le fichier de log de l'instrumentation automatique et détermine le répertoire de tous les autres fichiers de log du traceur .NET. Ce paramètre est ignoré si `DD_TRACE_LOG_DIRECTORY` est défini.

`DD_TRACE_LOGGING_RATE`
: Définit la limite de débit pour les messages des logs. Si ce paramètre est défini, les lignes de log uniques sont écrites une fois toutes les `x` secondes. Par exemple, pour enregistrer un message donné une fois toutes les 60 secondes, définissez la valeur de ce paramètre sur `60`. La valeur `0` désactive la limite de débit des logs. Ajouté avec la version 1.24.0. Désactivé par défaut.

`DD_TRACE_SERVICE_MAPPING`
: Renomme des services à l'aide d'une configuration. Accepte une map composée des clés de nom de service à renommer et des nouveaux noms, au format `[clé-origine]:[nouveau-nom]`. <br>
**Exemple :** `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
L'élément `[clé-origine]` dépend du type d'intégration. Il ne doit pas comprendre le préfixe du nom de l'application. Par exemple, pour remplacer le nom de `my-application-sql-server` par `main-db`, utilisez `sql-server:main-db`. Ajouté avec la version 1.23.0.

`DD_TAGS`
: **Propriété TracerSettings** : `GlobalTags`<br>
Lorsqu'il est spécifié, ce paramètre ajoute tous les tags définis à l'ensemble des spans générées. <br>
**Exemple** : `layer:api,team:intake`. <br>
Ajouté avec la version 1.17.0.


#### Instrumentation automatique

Les variables de configuration suivantes sont **uniquement** disponibles pour l'instrumentation automatique.


`DD_TRACE_ENABLED`
: **Propriété TracerSettings** : `TraceEnabled`<br>
Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `true`.

`DD_DISABLED_INTEGRATIONS`
: **Propriété TracerSettings** : `DisabledIntegrationNames`<br>
Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs acceptées correspondent aux noms d'intégration énumérés dans la section [Intégrations][7].

`DD_HTTP_CLIENT_ERROR_STATUSES`
: Définit les plages de codes de statut pour lesquelles les spans client HTTP sont identifiées comme des erreurs. <br>
**Valeur par défaut** : `400-499`.

`DD_HTTP_SERVER_ERROR_STATUSES`
: Définit les plages de codes de statut pour lesquelles les spans serveur HTTP sont identifiées comme des erreurs. <br>
**Valeur par défaut** : `500-599`.

`DD_RUNTIME_METRICS_ENABLED`
: Active les métriques runtime .NET. Valeurs acceptées : `true` ou `false`. <br>
**Valeur par défaut** : `false`.<br>
Ajouté avec la version 1.23.0.

`DD_TRACE_ADONET_EXCLUDED_TYPES`
: **Propriété TracerSettings** : `AdoNetExcludedTypes` <br>
Définit une liste de types `AdoNet` (par exemple, `System.Data.SqlClient.SqlCommand`) qui seront exclus de l'instrumentation automatique.

`DD_TRACE_<NOM_INTÉGRATION>_ENABLED`
: **Propriété TracerSettings** : `Integrations[<NOM_INTÉGRATION>].Enabled`<br>
Active ou désactive une intégration spécifique. Valeurs acceptées : `true` ou `false`. Les noms d'intégration sont énumérés dans la section [Integrations][7] section.<br>
**Valeur par défaut** : `true`.

#### Fonctionnalités expérimentales

Les variables de configuration suivantes peuvent être utilisées pour des fonctionnalités actuellement disponibles, mais dont le fonctionnement peut être amené à évoluer dans de futures versions.


`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: Si cette variable est définie sur `true`, elle active l'amélioration des noms de ressource pour les spans Web. Utilise les informations du modèle de routage (le cas échéant), ajoute une span supplémentaire pour les intégrations ASP.NET Core et active des tags supplémentaires. Ajouté avec la version 1.26.0.<br>
**Valeur par défaut** : `false`.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Active la transmission incrémentielle des traces volumineuses à l'Agent Datadog, afin de réduire les risques de rejet par l'Agent. Utilisez uniquement cette variable lorsque vous avez des traces de longue durée, ou des traces avec de nombreuses spans. Valeurs acceptées : `true` ou `false`. Ajouté avec la version 1.26.0, uniquement compatible avec l'Agent Datadog v7.26.0+.<br>
**Valeur par défaut** : `false`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: https://app.datadoghq.com/apm/docs
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /fr/tracing/setup_overview/custom_instrumentation/dotnet/
[5]: /fr/agent/basic_agent_usage/
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core#integrations