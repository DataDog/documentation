---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Prise en main du profileur
- link: tracing/profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: tracing/profiler/profiler_troubleshooting
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
kind: Documentation
title: Activer le profileur .NET
type: multi-code-lang
---

<div class="alert alert-warning">
Le profileur .NET Datadog est actuellement disponible en bêta publique. Datadog vous conseille de tester le profileur dans un environnement auxiliaire avant de le déployer en production.
</div>

<br>

## Prérequis

**Systèmes d'exploitation pris en charge :**

- Windows 10
- Windows Server (version 2012 et ultérieur)

Le profileur en continu n'est pas pris en charge sur les plateformes sans serveur, comme AWS Lambda.

**Runtimes .NET pris en charge :**

Applications 64 bits exécutées sur :
- .NET Framework 4.6.1+
- .NET Core 2.1 et 3.1
- .NET 5
- .NET 6

**Langages pris en charge :**

Tous les langages ciblant le runtime .NET, notamment C#, F# et Visual Basic.

## Installation

<div class="alert alert-warning">
  <strong>Remarque :</strong> le traceur et le profileur .NET Datadog reposent sur l'API CLR Profling .NET. Celle-ci permet seulement d'ajouter un abonné (par exemple, l'APM). Pour bénéficier d'une visibilité optimisée, exécutez une seule solution APM dans l'environnement de votre application.
</div>

1. Si vous utilisez déjà Datadog, mettez votre Agent à niveau vers la version [7.20.2][1] ou [6.20.2][2]+.

2. Le profileur est fourni avec le traceur. Si besoin, installez la dernière version bêta (ou effectuez une mise à niveau vers celle-ci) à l'aide du [programme d'installation MSI pour la surveillance .NET][3]. Le profileur en continu prend en charge Windows 64 bits. Vous avez donc besoin du fichier `datadog-dotnet-apm-2.1.1-x64-profiler-beta.msi` ou d'un fichier semblable.

   Exécutez le programme d'installation en tant qu'administrateur.

{{< tabs >}}

{{% tab "Internet Information Services (IIS)" %}}
1. Définissez les variables d'environnement requises pour configurer et activer le profileur. Pour activer le profileur pour des applications IIS, vous devez définir les variables d'environnement `DD_PROFILING_ENABLED`, `DD_ENV`, `DD_SERVICE` et `DD_VERSION` dans le registre des nœuds <code>HKLM\System\CurrentControlSet\Services\WAS</code> et <code>HKLM\System\CurrentControlSet\Services\W3SVC</code>. 

   **Avec l'éditeur de registre :**

   Dans l'éditeur de registre, modifiez une valeur multi-chaînes `Environment` dans les nœuds `HKLM\System\CurrentControlSet\Services\WAS` et `HKLM\System\CurrentControlSet\Services\W3SVC`, puis définissez les données de valeur comme indiqué ci-dessous :

   Pour .NET Core et .NET 5+ :
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCoreIIS.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour une application .NET Core dans IIS" style="width:90%" >}}

   Pour .NET Framework :
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFrameworkIIS.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour une application .NET Framework dans IIS" style="width:90%" >}}

   <strong>Remarque</strong> : les variables d'environnement sont appliquées à <em>toutes</em> les applications IIS. Depuis la version 10 d'IIS, vous pouvez définir des variables d'environnement pour chaque application IIS dans le fichier <a href="https://docs.microsoft.com/fr-fr/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code></a>. Consultez la <a href="https://docs.microsoft.com/fr-fr/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentation Microsoft</a> (en anglais) pour en savoir plus.

2. Arrêtez complètement puis redémarrez IIS en exécutant les commandes suivantes en tant qu'administrateur :

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

3. Une ou deux minutes après le lancement de votre application, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiler][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Services Windows" %}}
1. Définissez les variables d'environnement requises pour configurer et activer le profileur. Pour activer le profileur pour votre service, vous devez définir les variables d'environnement `DD_PROFILING_ENABLED`, `DD_ENV`, `DD_SERVICE` et `DD_VERSION` dans la clé de registre associée au service.

   **Avec l'éditeur de registre :**

   Dans l'éditeur de registre, créez une valeur multi-chaînes `Environment` dans la clé `HKLM\System\CurrentControlSet\Services\MyService` et définissez les données de valeur comme indiqué ci-dessous :

   Pour .NET Core et .NET 5+ :
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour un service Windows" style="width:90%" >}}

   Pour .NET Framework :
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Utiliser l'éditeur de registre pour créer des variables d'environnement pour un service Windows" style="width:90%" >}}

   **Avec un script PowerShell :**

   Pour .NET Core et .NET 5+ :
   ```powershell
   [string[]] $v = @(
       "CORECLR_ENABLE_PROFILING=1",
       "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

   Pour .NET Framework :
   ```powershell
   [string[]] $v = @(
       "COR_ENABLE_PROFILING=1",
       "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

2. Une ou deux minutes après le lancement de votre application, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiler][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Applications autonomes" %}}
1. Définissez les variables d'environnement requises pour configurer et activer le profileur pour une application non liée à un service, comme la console, ASP.NET (Core), Windows Forms ou WPF. Pour activer le profileur pour des applications autonomes, vous devez définir les variables d'environnement `DD_PROFILING_ENABLED`, `DD_ENV`, `DD_SERVICE` et `DD_VERSION`. Il est conseillé de créer un fichier batch qui définit ces variables d'environnement et lance l'application, puis d'exécuter votre application à l'aide du fichier batch.

   Pour .NET Core et .NET 5+ :
   ```cmd
   SET CORECLR_ENABLE_PROFILING=1
   SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

   Pour .NET Framework :
   ```cmd
   SET COR_ENABLE_PROFILING=1
   SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

2. Une ou deux minutes après le lancement de votre application, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiler][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}
{{< /tabs >}}

<br>

## Configuration

Vous pouvez configurer le profileur à l'aide des variables d'environnement suivantes. Veuillez noter que la plupart de ces paramètres peuvent également être définis au niveau de la configuration du traceur. Si vous avez modifié l'un de ces paramètres, vous devez redémarrer l'application.

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | Chaîne        | Le nom de l'[environnement][4], par exemple `production`. Si vous ne définissez pas cette variable, la valeur `unspecified-environment` est utilisée. |
| `DD_SERVICE`               | Chaîne        | Le nom de [service][4], par exemple `web-backend`. Si vous ne définissez pas cette variable, le profileur .NET essaie de déterminer automatiquement le nom du service à partir du nom de l'application (assembly d'entrée du processus ou nom du processus).    |
| `DD_VERSION`               | Chaîne        | La [version][4] de votre service. Si cette variable n'est pas définie, la valeur `unspecified-version` est utilisée. |
| `DD_TAGS`                  | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api,team:intake`.   |
| `DD_AGENT_HOST`            | Chaîne        | Définit le host vers lequel les profils sont envoyés (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Cette variable est ignorée si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `localhost`.  |
| `DD_TRACE_AGENT_PORT`      | Chaîne        | Définit le port sur lequel les profils sont envoyés (le port où l'Agent écoute les connexions). Cette variable est ignorée si `DD_TRACE_AGENT_URL` est défini. Valeur par défaut : `8126`.  |
| `DD_TRACE_AGENT_URL`       | Chaîne        | Définit l'URL d'endpoint où les profils sont envoyés. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. Valeur par défaut : `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.  |
| `DD_TRACE_DEBUG`           | Booléen        | Active ou désactive la journalisation de debugging (utile pour l'analyse de problèmes). Valeurs autorisées : `true` ou `false`. Valeur par défaut : `false`.  |
| `DD_PROFILING_LOG_DIR`     | Chaîne        | Définir le répertoire pour les logs du profileur .NET. Valeur par défaut : `%ProgramData%\Datadog-APM\logs\`.  |
| `DD_PROFILING_ENABLED`     | Booléen        | Si cette variable est définie sur `true`, le profileur .NET est activé. Valeur par défaut : `false`.  |

<div class="alert alert-warning">
<strong>Remarque</strong> : pour les applications IIS, vous devez définir les variables d'environnement dans le registre (dans les nœuds <code>HKLM\System\CurrentControlSet\Services\WAS</code> et <code>HKLM\System\CurrentControlSet\Services\W3SVC</code>), tel qu'indiqué dans l'onglet <a href="?tab=serviceswindows#installation">Services Windows</a> ci-dessus. Les variables d'environnement sont appliquées à <em>toutes</em> les applications IIS.
Depuis la version 10 d'IIS, vous pouvez définir des variables d'environnement pour chaque application IIS dans le fichier <a href="https://docs.microsoft.com/fr-fr/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code></a>. Consultez la <a href="https://docs.microsoft.com/fr-fr/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentation Microsoft</a> (en anglais) pour en savoir plus.
</div>

<br>

## Pour aller plus loin

Le guide [Premier pas avec le profileur en continu][5] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.1.1-profiler-beta1
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/getting_started/profiler/