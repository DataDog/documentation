---
further_reading:
- link: /serverless/guide/disable_serverless
  tag: Documentation
  text: Désactiver Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#azure-functions
  tag: Documentation
  text: Envoyez les traces Azure Functions vers Datadog avec OTLP
- link: http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Créez des applications serverless Azure sécurisées et évolutives avec le Well-Architected
    Framework
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Surveillez les Azure Functions sur tous les plans d'hébergement avec Datadog
title: Installez Serverless Monitoring pour Azure Functions
---
## Présentation {#overview}
Cette page explique comment collecter des traces, des métriques de trace, des métriques d'exécution, des métriques améliorées et des métriques personnalisées à partir d'Azure Functions. Les [métriques améliorées][11] se distinguent par l'espace de noms `azure.functions.enhanced.*`. Pour collecter des métriques supplémentaires, installez l'[intégration Datadog Azure][5].

Voici la liste des runtimes, systèmes d'exploitation (OS) et plans d'hébergement pris en charge pour le monitoring d'Azure Functions :
- **Runtimes** : .NET, Node.js, Python, Java
- **Systèmes d'exploitation (OS)** : Windows, Linux
- **Plans d'hébergement** : Dedicated (App Service) Plan, Premium Plan, Consumption Plan, Flex Consumption Plan

La méthode d'installation recommandée dépend de la configuration de votre fonction Azure :
- Pour les fonctions Azure .NET sous Windows exécutées sur des plans dédiés/App Service ou Premium : utilisez l'[extension APM .NET Datadog][9].
- Pour toutes les autres configurations (y compris les différents runtimes, systèmes d'exploitation ou plans d'hébergement) : suivez les instructions ci-dessous pour installer la couche de compatibilité serverless.

## Configuration {#setup}

Si ce n'est pas déjà fait, installez l'[intégration Datadog-Azure][5] pour collecter les métriques et les logs. Ensuite, instrumentez votre application en suivant les étapes ci-dessous :

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **Installez les dépendances**. Exécutez les commandes suivantes :
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recommande de fixer les versions des packages et de mettre régulièrement à jour vers les dernières versions de `@datadog/serverless-compat` et `dd-trace` pour vous assurer d'avoir accès aux améliorations et aux corrections de bugs.

2. **Démarrez la couche de compatibilité serverless de Datadog et initialisez le SDK Node.js Datadog**.
   
   Utilisez l'option `--require` pour charger et initialiser la couche de compatibilité Serverless et le SDK Node.js Datadog en une seule étape. Les options Node dans Azure Functions peuvent être configurées avec la variable d'environnement `languageWorkers__node__arguments`.

   ```
   languageWorkers__node__arguments='--require @datadog/serverless-compat/init --require dd-trace/init'
   ```

3. **Configurer le SDK Node.js de Datadog**

   [Configuration du SDK Node.js][1]

[1]:/fr/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Installez les dépendances**. Exécutez les commandes suivantes :
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recommande d'utiliser les dernières versions de `datadog-serverless-compat` et `ddtrace` pour vous assurer d'avoir accès aux améliorations et aux corrections de bugs.

2. **Démarrez la couche de compatibilité serverless de Datadog et initialisez le SDK Python de Datadog**. Ajoutez les lignes suivantes à votre fichier de point d'entrée d'application principal :

   ```python
   from datadog_serverless_compat import start
   start()

   import ddtrace.auto # noqa: E402, F401
   ```

3. **Configurer le SDK Python de Datadog**

   [Configuration du SDK Python][1]

[1]:/fr/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Installez les dépendances**. Téléchargez les JAR Datadog et déployez-les avec votre fonction :
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Consultez le [dépôt Maven][1] de Datadog pour toute version spécifique de la couche de compatibilité Serverless de Datadog.

   Datadog recommande de mettre régulièrement à niveau vers les dernières versions de `dd-serverless-compat-java-agent` et `dd-java-agent` pour vous assurer d'avoir accès aux améliorations et aux corrections de bugs.

2. **Démarrez la couche de compatibilité Serverless de Datadog et initialisez le SDK Java de Datadog**. Ajoutez les arguments `-javaagent` suivants aux options de la JVM :

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Remarque** : la variable d'environnement pour définir les options de la JVM dépend du plan d'hébergement (par exemple, Consumption, Elastic Premium, Dedicated). Consultez le [guide du développeur Java pour Azure Functions][2] pour plus de détails sur la variable d'environnement appropriée pour votre plan d'hébergement.

3. **Configurer le SDK Java de Datadog**

   [Configuration du SDK Java][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /fr/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **Installez les dépendances**. Exécutez les commandes suivantes :
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog recommande de mettre régulièrement à niveau vers la dernière version de `Datadog.AzureFunctions` pour vous assurer d'avoir accès aux améliorations et aux corrections de bugs.

2. **Démarrez la couche de compatibilité Serverless de Datadog**.

   Si votre application Azure Function utilise le modèle Isolated Worker, ajoutez les lignes suivantes au fichier de point d'entrée principal de votre application :
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Si votre application Azure Function utilise le [modèle in-process hérité][3], ajoutez une référence de package NuGet à `Microsoft.Azure.Functions.Extensions` :
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   Et ajoutez le fichier `.cs` suivant à votre application :
   ```csharp
   using Datadog.Serverless;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;

   [assembly: FunctionsStartup(typeof(MyFunctionApp.Startup))]

   namespace MyFunctionApp
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
               Datadog.Serverless.CompatibilityLayer.Start();
         }
      }
   }
   ```

3. **Configurez l'instrumentation automatique**

   Si votre application Azure Function s'exécute sur Windows, ajoutez les variables d'environnement suivantes à votre application Function :
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Si votre application Azure Function s'exécute sur Linux, ajoutez les variables d'environnement suivantes à votre application Function :
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Configurez le SDK .NET Datadog**

   - [Configuration du SDK .NET Core Datadog][1]
   - [Configuration du SDK .NET Framework Datadog][2]

[1]: /fr/tracing/trace_collection/library_config/dotnet-core
[2]: /fr/tracing/trace_collection/library_config/dotnet-framework
[3]: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Déployez votre fonction**.

6. **Configurez l'ingestion Datadog**. Ajoutez les variables d'environnement suivantes aux paramètres d'application de votre fonction :

   | Nom | Valeur |
   | ---- | ----- |
   | `DD_API_KEY` | Votre [clé Datadog API][1]. |
   | `DD_SITE` | Votre [site Datadog][2]. Par exemple, {{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Votre groupe de ressources Azure. Uniquement requis pour Azure Functions sur le [plan Flex Consumption][8]. |

   {{% svl-tracing-env %}}

7. **Configurez le Unified Service Tagging**. Vous pouvez collecter des métriques à partir de vos Azure Functions en installant l'[intégration Datadog Azure][5]. Pour corréler ces métriques avec vos traces, définissez d'abord les tags `env`, `service` et `version` sur votre ressource dans Azure. Ensuite, configurez les variables d'environnement suivantes.

   | Nom | Valeur |
   | ---- | ----- |
   | `DD_ENV` | Comment vous souhaitez marquer votre environnement pour le [Unified Service Tagging][7]. Par exemple, `prod`. |
   | `DD_SERVICE` | Comment vous souhaitez marquer votre service pour le [Unified Service Tagging][7].  |
   | `DD_VERSION` | Comment vous souhaitez marquer votre version pour le [Unified Service Tagging][7]. |

## Quelle est la prochaine étape ? {#whats-next}

- Vous pouvez consulter vos traces Azure Functions dans [{{< ui >}}Trace Explorer{{< /ui >}}][3]. Recherchez le nom de service que vous avez défini dans la variable d'environnement `DD_SERVICE` pour voir vos traces.
- Vous pouvez utiliser la page [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure Functions{{< /ui >}}][4] pour voir vos traces enrichies par la télémétrie collectée par l'[intégration Datadog Azure][5].

## Profiling {#profiling}

<div class="alert alert-info">
Continuous Profiler de Datadog est disponible en préversion pour Python et Node.js sur Azure Functions.
</div>

Pour activer le [Continuous Profiler][10], définissez la variable d'environnement `DD_PROFILING_ENABLED=true`.

## Dépannage {#troubleshooting}

### Activer les journaux de débogage {#enable-debug-logs}

Vous pouvez collecter des [journaux de débogage][6] pour le dépannage. Pour configurer les journaux de débogage, utilisez les variables d'environnement suivantes :

`DD_TRACE_DEBUG`
: Active (`true`) ou désactive (`false`) la journalisation de débogage pour le SDK Datadog. Par défaut : `false`.

  **Valeurs**: `true`, `false`

`DD_LOG_LEVEL`
: Définit le niveau de journalisation pour la couche de compatibilité serverless de Datadog. La valeur par défaut est `info`.

  **Valeurs** : `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /fr/getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /fr/integrations/azure/
[6]: /fr/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /fr/getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
[9]: /fr/serverless/azure_functions/dotnet_extension/
[10]: /fr/profiler/
[11]: /fr/integrations/azure-functions/#metrics