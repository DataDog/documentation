---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
code_lang: windows
code_lang_weight: 30
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques d'exécution
title: Instrumentation APM en une étape sur Windows
type: multi-code-lang
---
## Présentation {#overview}

Grâce à l'instrumentation en une étape (SSI), vous pouvez activer APM pour vos applications Java et .NET sur des VM Windows à l'aide d'une seule commande d'installation du Datadog Agent.

{{< skill-callout
    title="Configurer APM avec un agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Activer APM sur Windows {#enable-apm-on-windows}

<div class="alert alert-info">Avant de continuer, confirmez que votre environnement est compatible en consultant le <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guide de compatibilité SSI.</a></div>

### Installation d'un nouveau Datadog Agent {#new-agent-installation}

Si vous n'avez pas encore installé le Datadog Agent, suivez ces étapes pour installer l'Agent et activer la SSI simultanément.

Vous pouvez activer APM sur Windows de l'une des manières suivantes :
* Instrumenter uniquement les applications .NET sur IIS
* Instrumenter toutes les applications Java et .NET sur l'ensemble de votre host Windows

{{< tabs >}}
{{% tab "IIS" %}}

Pour instrumenter uniquement les applications .NET exécutées sur IIS :

1. Depuis une session PowerShell administrateur sur votre host Windows, exécutez l'une des commandes suivantes. Remplacez `<YOUR_DD_API_KEY>` par votre [clé d'API Datadog][2].

   Utilisez le programme d'installation PowerShell :

   ```powershell
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $env:DD_API_KEY = '<YOUR_DD_API_KEY>'; $env:DD_SITE = '{{< region-param key="dd_site" >}}'; $env:DD_APM_INSTRUMENTATION_ENABLED = 'iis'; $env:DD_APM_INSTRUMENTATION_LIBRARIES = 'dotnet:3'; (New-Object System.Net.WebClient).DownloadFile('https://install.datadoghq.com/datadog-installer-x86_64.exe', 'C:\\Windows\\SystemTemp\\datadog-installer-x86_64.exe'); C:\\Windows\\SystemTemp\\datadog-installer-x86_64.exe
   ```

   Alternatively, install with the MSI:

   ```powershell
   $p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /norestart /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<YOUR_DD_API_KEY>" SITE="{{< region-param key="dd_site" >}}\" DD_APM_INSTRUMENTATION_ENABLED=\"iis\" DD_APM_INSTRUMENTATION_LIBRARIES=\"dotnet:3\"'
   if ($p.ExitCode -ne 0) { Write-Host \"msiexec failed with exit code $($p.ExitCode) please check the logs at C:\\Windows\\SystemTemp\\install-datadog.log\" -ForegroundColor Red }
   ```

   To install a different .NET version, change `dotnet:3`, or omit `DD_APM_INSTRUMENTATION_LIBRARIES` to install the latest.

   **Note**: The Chocolatey installation method does not preserve the SSI settings and cannot be used to enable SSI.

1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

The Agent then automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

**Generate the command from Datadog**: To get a command pre-filled with your API key and site, go to [Install the Datadog Agent on Windows][1] and, in the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}. To pin the .NET SDK version, select {{< ui >}}Customize Library Versions{{< /ui >}} under {{< ui >}}Instrumentation Configuration{{< /ui >}}. Then copy and run the generated command.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}

{{% tab "À l'échelle du host (aperçu)" %}}

<div class="alert alert-info">
<strong>Rejoignez l'aperçu !</strong><br>
L'instrumentation à l'échelle du host pour Windows est en aperçu et limitée aux participants à l'aperçu. Les options d'installation et de configuration décrites dans cet onglet n'apparaissent dans Datadog qu'une fois votre inscription effectuée. <a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">Demandez l'accès</a> pour rejoindre l'aperçu.
</div>

Pour instrumenter des applications Java et .NET sur l'ensemble de votre host Windows :

1. Dans Datadog, accédez à [Installer le Datadog Agent sur Windows][1].
1. Dans la section {{< ui >}}Customize your observability coverage{{< /ui >}}, activez {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}.
1. (Facultatif) Définissez votre version de SDK :
   
   Par défaut, l'instrumentation en une étape installe la dernière version prise en charge des SDK Datadog .NET et Java. Si vous devez fixer une version spécifique :

   1. Sous {{< ui >}}Instrumentation Configuration{{< /ui >}}, sélectionnez {{< ui >}}Customize Library Versions{{< /ui >}}.
   1. Sous .NET, choisissez la version que vous souhaitez utiliser.

1. Copiez et exécutez la commande d'installation fournie sur votre host Windows. Datadog génère cette commande dans l'application une fois que vous êtes inscrit à l'aperçu.
1. Configurez les règles d'instrumentation.

   Le SSI au niveau du host instrumente automatiquement toutes les applications Java sur le host et toutes les applications .NET exécutées dans IIS. Pour instrumenter les applications .NET exécutées en dehors d'IIS, vous devez [définir une règle d'instrumentation](#define-instrumentation-rules) qui les autorise. Vous pouvez également utiliser des règles d'instrumentation pour un contrôle granulaire sur les applications Java sur le host ou les applications .NET dans IIS qui sont instrumentées.

1. Redémarrez les services que vous souhaitez instrumenter.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Le SSI ajoute un léger délai de démarrage aux applications instrumentées. Si ce surcoût n'est pas acceptable pour votre cas d'utilisation, contactez <a href="/help/">Datadog Support</a>.</div>

### Installation d'un Datadog Agent existant {#existing-agent-installation}

Si vous avez déjà un Datadog Agent installé, utilisez Fleet Automation pour activer le SSI.

1. Dans Datadog, accédez à [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6].
1. Cliquez sur {{< ui >}}Configure Agents{{< /ui >}}.
1. Appliquez des filtres pour sélectionner les agents que vous souhaitez configurer, puis cliquez sur **Suivant**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="L'écran de filtrage des agents dans Fleet Automation, avec des options pour définir le périmètre par environnement, système d'exploitation et nom de host" style="width:100%;" >}}

1. Cliquez sur la tuile {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}, puis cliquez sur {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="L'écran de sélection de produit dans Fleet Automation, affichant la tuile Application Performance Monitoring (APM)" style="width:80%;" >}}

1. Dans l'écran {{< ui >}}Configure SDKs Installation{{< /ui >}}, cliquez sur {{< ui >}}Yes{{< /ui >}} pour installer automatiquement les SDK. Sélectionnez {{< ui >}}Use latest version{{< /ui >}}, ou décochez pour spécifier des versions individuelles du SDK.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="L'écran de configuration de l'installation des SDK dans Fleet Automation, avec des options pour activer l'installation automatique des SDK et sélectionner les versions" style="width:60%;" >}}

1. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Vérifiez votre configuration et cliquez sur {{< ui >}}Deploy Configuration{{< /ui >}}.
1. Configurez les règles d'instrumentation.

   Le SSI au niveau du host instrumente automatiquement toutes les applications Java sur le host et toutes les applications .NET exécutées dans IIS. Pour instrumenter les applications .NET exécutées en dehors d'IIS, vous devez [définir une règle d'instrumentation](#define-instrumentation-rules) qui les autorise. Vous pouvez également utiliser des règles d'instrumentation pour un contrôle granulaire sur les applications Java sur le host ou les applications .NET dans IIS qui sont instrumentées.

## Vérifiez l'installation {#verify-the-installation}

1. Depuis une session PowerShell administrateur, confirmez que l'Agent est sain et que l'Agent APM est en cours d'exécution :

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   Vérifiez la section **APM Agent** de la sortie.

1. Une fois que vos applications instrumentées reçoivent du trafic, confirmez que vos services apparaissent sur la [APM Services page][7]. S'ils n'apparaissent pas en quelques minutes, suivez le [guide de dépannage SSI][4].

## Configurez les tags de service unifiés {#configure-unified-service-tags}

Les Unified Service Tags (USTs) appliquent des tags cohérents aux traces, aux métriques et aux logs, facilitant ainsi la navigation et la corrélation de vos données d'observabilité. Découvrez comment [définir des UST pour les services Windows][2].

## Activer les produits et fonctionnalités dépendants du SDK {#enable-sdk-dependent-products-and-features}

Une fois que SSI a chargé le SDK Datadog dans vos applications et activé le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK :

{{< ssi-products >}}

Pour activer des produits, [définissez des variables d'environnement][3] dans la configuration de votre application.

## Options avancées {#advanced-options}

### Définir des règles d'instrumentation {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les règles d'instrumentation ne sont pas prises en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<div class="alert alert-info">Les règles d'instrumentation (disponibles pour l'Agent v7.73+) s'appliquent uniquement à l'instrumentation à l'échelle du host. Elles ne sont pas prises en charge pour une installation IIS uniquement.</div>
{{< /site-region >}}

Les règles d'instrumentation vous permettent de contrôler quels processus sont automatiquement instrumentés par SSI sur les hosts Windows. Des règles sont requises pour instrumenter les applications .NET s'exécutant en dehors d'IIS. Elles sont également utiles pour un contrôle granulaire des applications Java sur le host ou des applications .NET dans IIS qui sont instrumentées.

Pour configurer les règles d'instrumentation :

1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][5].
1. Cliquez sur {{< ui >}}Add or Edit Rules{{< /ui >}}.
1. Définissez les règles d'instrumentation :
   1. Cliquez sur {{< ui >}}Add New Rule{{< /ui >}}, puis choisissez {{< ui >}}Allow Rule{{< /ui >}} ou {{< ui >}}Block Rule{{< /ui >}} pour spécifier si les processus correspondants doivent être instrumentés.
   1. Nommez votre règle.
   1. Ajoutez une ou plusieurs conditions. Consultez [Définir les conditions de règle](#define-rule-conditions) pour en savoir plus.

     {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="L'interface utilisateur des règles d'instrumentation, affichant les options de configuration pour définir une règle" style="width:100%;" >}}

1. (Facultatif) Faites glisser et déposez les règles pour les réorganiser.

   **Remarque** : Les règles sont évaluées dans l'ordre. Une fois qu'un processus correspond à une règle, les règles suivantes sont ignorées.

1. Définissez le comportement par défaut (autoriser ou bloquer) pour les processus qui ne correspondent à aucune règle.
1. Cliquez sur {{< ui >}}Next{{< /ui >}} pour prévisualiser vos règles.
1. Cliquez sur {{< ui >}}Deploy Rules{{< /ui >}}.

Si Remote Configuration est activé, les règles sont déployées sur chaque host et appliquées sur ceux pour lesquels SSI est activé dans un délai de 50 secondes. Sinon, cliquez sur {{< ui >}}Export{{< /ui >}} pour exporter le fichier de configuration et l'appliquer manuellement à vos hosts.

#### Définir les conditions de règle {#define-rule-conditions}

Chaque règle se compose d'une ou plusieurs conditions. Une condition comprend les éléments suivants :
- {{< ui >}}Attribute{{< /ui >}} : La propriété de processus que la règle évalue.
- {{< ui >}}Operator{{< /ui >}} : La logique de comparaison (`equals`, `not equals`, `prefix` ou `contains`).
- {{< ui >}}Value{{< /ui >}} : Le texte ou le motif à faire correspondre, tel qu'un nom de processus ou un indicateur de ligne de commande.

Les attributs pris en charge incluent :
| Attribut | Description | Exemple |
| --------- | ----------- | ------- |
| Système d'exploitation | OS du host. | `windows` |
| Exécutable | Nom de l'exécutable du processus. | `w3wp.exe` |
| Chemin complet de l'exécutable | Chemin complet de l'exécutable. | `C:\Windows\System32\inetsrv\w3wp.exe` |
| Arguments | Arguments de ligne de commande utilisés pour démarrer le processus. | `--env=production` |
| Répertoire de travail | Répertoire de travail du processus. | `C:\inetpub\wwwroot` |
| Langage | Langage de programmation détecté pour le processus. | `dotnet` |
| Fichier de point d'entrée | Le fichier spécifique utilisé pour lancer l'application. | `MyService.dll`, `app.py` |
| Pool d'applications IIS | Le pool d'applications IIS hébergeant le processus de travail. Comme tous les processus de travail IIS partagent l'exécutable `w3wp.exe`, c'est le moyen le plus fiable de cibler une application .NET spécifique sur IIS. | `DefaultAppPool`, `MyWebApp` |

#### Exemples de cas d'utilisation {#example-use-cases}

Examinez les exemples suivants illustrant comment appliquer des règles d'instrumentation :

{{< collapse-content title="Exemple 1 : Instrumenter tous les processus sauf certains spécifiques" level="h5" >}}

Instrumenter tous les processus par défaut. Ajoutez des règles de blocage pour exclure les services qui ajouteraient du bruit sans valeur ajoutée, tels que les jobs cron d'analyse et les processeurs de lots Java.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Deux règles d'instrumentation de blocage ciblant les conditions Répertoire de travail et Fichier de point d'entrée, avec une autorisation d'instrumentation par défaut" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 2 : Instrumenter uniquement des applications IIS spécifiques" level="h5" >}}

Bloquer toute instrumentation par défaut. Ajoutez des règles d'autorisation pour inclure des applications IIS spécifiques dans APM. Comme tous les processus de travail IIS partagent le <code>w3wp.exe</code> exécutable, utilisez {{< ui >}}IIS Application Pool{{< /ui >}} pour identifier les applications cibles. Cette approche est utile pour les déploiements progressifs.

{{< img src="tracing/trace_collection/instrumentation-rules-example-2.png" alt="Deux règles d'autorisation d'instrumentation ciblent des pools d'applications IIS spécifiques par nom, avec le blocage de l'instrumentation par défaut." style="width:100%;" >}}

{{< /collapse-content >}}

## Supprimez l'instrumentation APM en une étape de votre Datadog Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Pour désactiver SSI pour .NET sur votre host, exécutez :

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de l'activation de APM avec SSI, consultez le [guide de dépannage SSI][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /fr/integrations/windows-service/#tags
[3]: /fr/tracing/trace_collection/library_config/
[4]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
[6]: https://app.datadoghq.com/fleet/agent-management
[7]: https://app.datadoghq.com/apm/services