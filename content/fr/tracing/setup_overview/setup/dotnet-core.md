---
aliases:
- /fr/tracing/dotnet-core
- /fr/tracing/languages/dotnet-core
- /fr/tracing/setup/dotnet-core
- /fr/agent/apm/dotnet-core/
- /fr/tracing/setup/dotnet-core
- /fr/tracing/setup_overview/dotnet-core
code_lang: dotnet-core
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
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: Surveillance .NET avec l'APM et le tracing distribué de Datadog
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: Exemples d'instrumentation personnalisée
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: Code source
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Déployer des applications ASP.NET Core sur Azure App Service
kind: documentation
title: Tracer des applications .NET Core
type: multi-code-lang
---

## Exigences de compatibilité

### Runtimes .NET Core pris en charge

Le traceur .NET prend en charge l'instrumentation sur .NET Core 2.1 et 3.1, .NET 5 ainsi que .NET 6.

Pour obtenir la liste complète des bibliothèques et des architectures de processeur prises en charge, consultez la section relative aux [exigences de compatibilité][1].

## Installation et démarrage

<div class="alert alert-warning">
  <strong>Remarque :</strong> l'instrumentation automatique Datadog repose sur l'API CLR Profiling .NET. Celle-ci permet seulement d'ajouter un abonné (par exemple, l'APM). Pour bénéficier d'une visibilité optimisée, exécutez une seule solution APM dans l'environnement de votre application.
</div>

### Installation

1. [Installer le traceur](#installer-le-traceur)
2. [Activer le traceur pour votre service](#activer-le-traceur-pour-votre-service)
3. [Configurer l'Agent Datadog pour l'APM](#configurer-l-agent-datadog-pour-l-apm)
4. [Visualiser vos données en temps réel](visualiser-vos-donnees-en-temps-reel)

### Installer le traceur

Vous pouvez installer le traceur .NET Datadog à l'échelle d'une machine afin d'instrumenter tous les services sur la machine. Il est également possible d'installer le traceur pour certaines applications, afin que les développeurs puissent gérer l'instrumentation via les dépendances de l'application. Pour obtenir des instructions afin d'installer le traceur à l'échelle d'une machine, cliquez sur l'onglet Windows ou Linux. Pour obtenir des instructions afin d'installer le traceur pour certaines applications, cliquez sur l'onglet NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Pour installer le traceur .NET à l'échelle d'une machine, procédez comme suit :

1. Téléchargez le [programme d'installation MSI pour le traceur .NET][1]. Choisissez le programme d'installation correspondant à l'architecture de votre système (x64 ou x86).

2. Exécutez le programme d'installation MSI pour le traceur .NET avec des privilèges d'administrateur.


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
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<VERSION_TRACEUR>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Autres distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<VERSION_TRACEUR>-tar.gz && /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Remarque :</strong> cette installation n'instrumente pas les applications s'exécutant dans IIS. Pour ces applications, suivez le processus d'installation Windows à l'échelle d'une machine.
</div>

Pour installer le traceur .NET pour certaines applications, procédez comme suit :

1. Ajoutez le [package NuGet][1] `Datadog.Monitoring.Distribution` à votre application.

[1]: https://www.nuget.org/packages/Datadog.Monitoring.Distribution
{{% /tab %}}

{{< /tabs >}}

### Activer le traceur pour votre service

Pour activer le traceur .NET pour votre service, définissez les variables d'environnement requises et redémarrez l'application.

Pour en savoir plus sur les différentes options disponibles pour définir les variables d'environnement, consultez la rubrique [Configurer des variables d'environnement de processus](#configurer-des-variables-d-environnement).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. Le programme d'installation MSI pour le traceur .NET ajoute toutes les variables d'environnement requises. Vous n'avez donc pas besoin de configurer la moindre variable d'environnement.

2. Pour instrumenter automatiquement des applications hébergées sur ISS, arrêtez complètement IIS, puis démarrez-le en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Services non hébergés sur IIS

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

1. Définissez les variables d'environnement requises suivantes pour activer l'instrumentation automatique de votre application :

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=<System-dependent path>
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   Le paramètre fictif `<APP_DIRECTORY>` doit être remplacé par le chemin du répertoire contenant les fichiers `.dll` de l'application. La valeur de la variable d'environnement `CORECLR_PROFILER_PATH` varie selon le système dans lequel l'application s'exécute :

   Système d'exploitation et architecture des processus | Valeur de CORECLR_PROFILER_PATH
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<RÉPERTOIRE_APPLICATION>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<RÉPERTOIRE_APPLICATION>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<RÉPERTOIRE_APPLICATION>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<RÉPERTOIRE_APPLICATION>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<RÉPERTOIRE_APPLICATION>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

2. Pour les images Docker exécutées sous LInux, configurez l'image de façon à exécuter le script `createLogPath.sh` :

   ```
   RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
   ```

   Des exemples sont disponibles dans le [référentiel `dd-trace-dotnet`][1] pour Docker.

3. Pour les applications autonomes, redémarrez manuellement l'application.


[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Configurer l'Agent Datadog pour l'APM

[Installez et configurez l'Agent Datadog][2] de façon à ce qu'il reçoive les traces provenant de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` avec l'option `enabled: true` sous `apm_config`. Il écoute le trafic des traces sur `localhost:8126`.

Pour les environnements conteneurisés, sans serveur et cloud, référez-vous aux instructions ci-dessous :

{{< tabs >}}

{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Une fois votre application instrumentée, le client de tracing envoie par défaut les traces sur `localhost:8126`. S'il ne s'agit pas du bon host et du bon port, modifiez-les à l'aide des variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Pour en savoir plus sur la définition de ces variables, consultez la rubrique [Configuration](#configuration).

{{< site-region region="us3,us5,eu,gov" >}}

4. Pour vous assurer que l'Agent envoie des données au bon site Datadog, définissez le paramètre `DD_SITE` de l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}}.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la section relative au [tracing des fonctions sans serveur][1].

[1]: /fr/tracing/serverless_functions/
{{% /tab %}}

{{% tab "Azure App Service" %}}

Pour configurer l'APM Datadog dans Azure App Service, consultez la section relative au [tracing de l'extension Azure App Service][1].

[1]: /fr/serverless/azure_app_services/
{{% /tab %}}

{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2] et [AWS Elastic Beanstalk][3].

Pour tous les autres environnements, consultez la documentation relative aux [intégrations][4] pour l'environnement qui vous intéresse et contactez l'[assistance Datadog][5] si vous rencontrez des problèmes de configuration.


[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/integrations/
[5]: /fr/help/
{{% /tab %}}

{{< /tabs >}}

### Visualiser vos données en temps réel

Après avoir activé le traceur .NET pour votre service, procédez comme suit :

1. Redémarrez votre service.

2. Créez une charge d'application.

3. Dans Datadog, accédez à [**APM** > **APM Traces**][3].

## Configuration

{{< img src="tracing/dotnet/diagram_docs_net.png" alt="Priorité des paramètres de configuration du traceur .NET"  >}}


Pour définir les paramètres de configuration du traceur .NET, vous pouvez adopter différentes approches.

{{< tabs >}}

{{% tab "Variables d'environnement" %}}

Pour configurer le traceur à l'aide de variables d'environnement, définissez les variables avant de lancer l'application instrumentée. Pour découvrir comment définir les variables d'environnement dans différents environnements, consultez la rubrique [Configurer des variables d'environnement de processus](#configurer-des-variables-d-environnement).


{{% /tab %}}

{{% tab "Code" %}}

Pour configurer le traceur dans le code de l'application, créez une instance `TracerSettings` à partir des sources de configuration par défaut. Définissez les propriétés de cette instance `TracerSettings` avant d'appeler `Tracer.Configure()`. Exemple :

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
settings.Exporter.AgentUri = new Uri("http://localhost:8126/");

// configurer les paramètres globaux du traceur
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "Fichier JSON" %}}

Pour configurer le traceur à l'aide d'un fichier JSON, créez le fichier `datadog.json` dans le répertoire de l'application instrumentée. L'objet JSON racine doit être un objet avec une paire key/value pour chaque paramètre. Exemple :

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

<div class="alert alert-warning">
  <strong>Remarque :</strong> sous Linux, les noms des variables d'environnement sont sensibles à la casse.
</div>

À l'aide des instructions ci-dessus, personnalisez votre configuration de tracing avec les variables suivantes. Utilisez le nom de la variable d'environnement (par exemple, `DD_TRACE_AGENT_URL`) pour définir des variables d'environnement ou des fichiers de configuration. Utilisez la propriété TracerSettings (par exemple, `Exporter.AgentUri`) pour modifier des paramètres dans le code.

#### Tagging de service unifié

Pour utiliser le [tagging de service unifié][4], configurez les paramètres suivants pour vos services :

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

Les variables de configuration suivantes sont disponibles aussi bien pour l'instrumentation automatique que pour l'instrumentation personnalisée :

`DD_TRACE_AGENT_URL`
: **Propriété TracerSettings** : `Exporter.AgentUri`<br>
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
Active ou désactive l'injection automatique des identifiants de corrélation dans les logs de l'application. <br>
Votre logger doit posséder une `source` qui définit correctement le mappage du `trace_id`. C'est le cas de la source par défaut des applications .NET, à savoir `csharp`. Pour en savoir plus, consultez la documentation relative aux [logs corrélés dans le volet de l'ID de trace][5].

`DD_TRACE_SAMPLE_RATE`
: **Propriété TracerSettings** : `GlobalSamplingRate` <br>
Active le contrôle du taux d'ingestion.

`DD_TRACE_RATE_LIMIT`
: **Propriété TracerSettings** : `MaxTracesSubmittedPerSecond` <br>
Nombre de traces pouvant être transmises par seconde (remplace `DD_MAX_TRACES_PER_SECOND`, qui est désormais obsolète). <br>
**Valeur par défaut** : `100` lorsque `DD_TRACE_SAMPLE_RATE` est défini. Si ce n'est pas le cas, l'Agent Datadog détermine le taux d'ingestion maximal. <br>

`DD_TRACE_GLOBAL_TAGS`
: **Propriété TracerSettings** : `GlobalTags`<br>
Lorsqu'il est spécifié, ce paramètre ajoute tous les tags définis à l'ensemble des spans générées.

`DD_TRACE_DEBUG`
Active ou désactive les logs de debugging. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `false`.

`DD_TRACE_HEADER_TAGS`
: **Propriété TracerSettings** :`HeaderTags` <br>
Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête correspondantes en tant que tags sur les spans racine. Accepte également les entrées sans nom de tag. <br>
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Ajouté avec la version 1.18.3. Prise en charge des en-têtes des réponses et des entrées sans nom de tag ajoutée avec la version 1.26.0.

`DD_TAGS`
: **Propriété TracerSettings** : `GlobalTags`<br>
Lorsqu'il est spécifié, ce paramètre ajoute tous les tags définis à l'ensemble des spans générées. <br>
**Exemple** : `layer:api, team:intake` <br>
Ajouté avec la version 1.17.0. <br>
Veuillez noter que les tags sont délimités par une virgule et une espace : `, `.

`DD_TRACE_LOG_DIRECTORY`
: Définit le répertoire pour les logs du traceur .NET. <br>
**Valeur par défaut** : `%ProgramData%\Datadog .NET Tracer\logs\` sous Windows, `/var/log/datadog/dotnet` sous Linux.

`DD_TRACE_LOGGING_RATE`
: Définit la limite de débit pour les messages des logs. Si ce paramètre est défini, les lignes de log uniques sont écrites une fois toutes les `x` secondes. Par exemple, pour enregistrer un message donné une fois toutes les 60 secondes, définissez la valeur de ce paramètre sur `60`. La valeur `0` désactive la limite de débit des logs. Ajouté avec la version 1.24.0. Désactivé par défaut.

`DD_TRACE_SERVICE_MAPPING`
: Renomme des services à l'aide d'une configuration. Accepte une map composée des clés de nom de service à renommer et des nouveaux noms, au format `[from-key]:[to-name]`. <br>
**Exemple** : `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
La valeur `from-key` dépend du type d'intégration et ne doit pas comprendre le préfixe du nom de l'application. Par exemple, pour remplacer le nom `my-application-sql-server` par `main-db`, utilisez `sql-server:main-db`. Ajouté avec la version 1.23.0

#### Configuration facultative de l'instrumentation automatique

Les variables de configuration suivantes sont **uniquement** disponibles pour l'instrumentation automatique :

`DD_TRACE_ENABLED`
: **Propriété TracerSettings** : `TraceEnabled`<br>
Active ou désactive toute instrumentation automatique. Lorsque la variable d'environnement est définie sur `false`, le profileur CLR est entièrement désactivé. Pour les autres méthodes de configuration, le profileur CLR est quand même chargé, mais aucune trace n'est générée. Valeurs acceptées : `true` ou `false`.<br>
**Valeur par défaut** : `true`.

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

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: Enrichit tous les paramètres de routage de l'application pour ASP.NET/ASP.NET Core (à l'exception des paramètres d'ID).<br>
Cette variable se révèle particulièrement utile si vous utilisez des noms de paramètre pour distinguer les différentes valeurs de formulaire, ou un slug, comme pour GraphQL.
**Valeur par défaut** : `false`.
Ajouté avec la version 2.5.1.

`DD_TRACE_METHODS`
: Liste des méthodes à tracer. Accepte une liste de valeurs séparées par des points-virgules (`;`), où chaque entrée respecte le format `NomType[NomsMéthodes]` et où `NomsMéthodes` correspond soit à une liste de noms de méthode séparés par des virgules (`,`), soit au wildcard `*`. Pour les types génériques, remplacez les crochets et les noms des paramètres de type par un backtick (`` ` ``) suivi du nombre de paramètres de types génériques. Par exemple, pour `Dictionary<TKey, TValue>`, indiquez `` Dictionary`2 ``. Pour les méthodes génériques, seul le nom de la méthode doit être indiqué. <br>
**Exemple** : ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**Remarque** : le wildcard (`[*]`) permet de sélectionner toutes les méthodes d'un type, à l'exception des constructors, getters et setters de propriétés, et des méthodes `Equals`, `Finalize`, `GetHashCode` et `ToString`. <br>
Ajouté avec la version 2.6.0.
Prise en charge du wildcard `[*]` ajoutée avec la version 2.7.0.

#### Configuration de l'intégration d'instrumentation automatique

Le tableau suivant énumère les variables de configuration disponibles **uniquement** pour l'instrumentation automatique. Elles peuvent être définies pour chaque intégration.

`DD_DISABLED_INTEGRATIONS`
: **Propriété TracerSettings** : `DisabledIntegrationNames` <br>
Définit la liste des intégrations à désactiver. Toutes les autres intégrations restent activées. Si ce paramètre n'est pas défini, toutes les intégrations sont activées. Ce paramètre accepte plusieurs valeurs séparées par des points-virgules. Les valeurs valides correspondent aux noms d'intégration énumérés dans la rubrique [Intégrations][6].

`DD_TRACE_<NOM_INTÉGRATION>_ENABLED`
: **Propriété TracerSettings** : `Integrations[<NOM_INTÉGRATION>].Enabled` <br>
Active ou désactive une intégration spécifique. Valeurs acceptées : `true` ou `false`. Les noms d'intégration sont énumérés dans la rubrique [Intégrations][6].<br>
**Valeur par défaut** : `true`.

#### Fonctionnalités expérimentales

Les variables de configuration suivantes peuvent être utilisées pour des fonctionnalités actuellement disponibles, mais dont le fonctionnement peut être amené à évoluer dans de futures versions.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Active la transmission incrémentielle des traces volumineuses à l'Agent Datadog, afin de réduire les risques de rejet par l'Agent. Utilisez uniquement cette variable lorsque vous avez des traces de longue durée, ou des traces avec de nombreuses spans. Valeurs acceptées : `true` ou `false`. Ajouté avec la version 1.26.0, uniquement compatible avec l'Agent Datadog v7.26.0+.<br>
**Valeur par défaut** : `false`.

#### Paramètres obsolètes

`DD_TRACE_LOG_PATH`
: Définit le chemin pour le fichier de log de l'instrumentation automatique et détermine le répertoire de tous les autres fichiers de log du traceur .NET. Ce paramètre est ignoré si `DD_TRACE_LOG_DIRECTORY` est défini.

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: Si cette variable est définie sur `true`, elle active l'amélioration des noms de ressource pour les spans Web. Utilise les informations du modèle de routage (le cas échéant), ajoute une span supplémentaire pour les intégrations ASP.NET Core et active des tags supplémentaires. Ajouté avec la version 1.26.0. Activé par défaut avec la version 2.0.0.<br>
**Valeur par défaut** : `true`.

### Extraction et injection d'en-têtes

Le traceur de l'APM Datadog prend en charge l'extraction et l'injection d'en-têtes [B3][9] et [W3C (TraceParent)][10] pour le tracing distribué.

Vous pouvez configurer des styles d'injection et d'extraction pour les en-têtes distribués.

Le traceur .NET prend en charge les styles suivants :

- Datadog : `Datadog`
- B3 : `B3`
- W3C : `W3C`
- En-tête B3 unique : `B3SingleHeader` ou `B3 single header`

Vous pouvez utiliser les variables d'environnement suivantes pour configurer des styles d'extraction et d'injection :

- `DD_PROPAGATION_STYLE_INJECT=Datadog, B3, W3C`
- `DD_PROPAGATION_STYLE_EXTRACT=Datadog, B3, W3C`

Ces variables d'environnement prennent comme valeur une liste des styles d'en-tête activés pour l'injection ou l'extraction, séparés par des virgules. Par défaut, seul le style d'injection `Datadog` est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre de configuration des styles. La première valeur extraite avec succès est utilisée.

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

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][7].

## Configurer des variables d'environnement de processus

Pour intégrer une instrumentation automatique à votre service, vous devez définir les variables d'environnement requises avant de démarrer l'application. Consultez la rubrique [Activer le traceur pour votre service](activer-le-traceur-pour-votre-service) pour déterminer les variables d'environnement que vous devez définir en fonction de la méthode d'installation du traceur .NET. Référez-vous aux exemples ci-dessous afin de définir correctement les variables d'environnement pour l'environnement de votre service instrumenté.

### Windows

#### Services Windows

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

#### Applications console

Pour instrumenter automatiquement une application console, définissez les variables d'environnement depuis un fichier de commandes avant de démarrer votre application :

```bat
rem Définir les variables d'environnement
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Démarrer l'application
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

# Démarrer votre application
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

1. Définissez les variables d'environnement requises en exécutant [`systemctl set-environment`][8] :

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. Vérifiez que les variables d'environnement ont bien été définies en exécutant `systemctl show-environment`.

3. Relancez le service .NET pour que les variables d'environnement soient appliquées.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: /fr/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /fr/getting_started/tagging/unified_service_tagging/
[5]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /fr/tracing/setup_overview/compatibility_requirements/dotnet-core#integrations
[7]: /fr/tracing/setup_overview/custom_instrumentation/dotnet/
[8]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header