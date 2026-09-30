---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
code_lang: linux
code_lang_weight: 0
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques d'exécution
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: Blog
  text: Gérer le traçage des services entre les hosts avec les règles d'instrumentation
    en une seule étape
title: Instrumentation APM en une seule étape sur Linux
type: multi-code-lang
---
## Présentation {#overview}

Sur un host Linux ou une VM, utilisez l'instrumentation en une seule étape (SSI) pour APM afin d'installer le Datadog Agent et d'[instrumenter][14] vos applications en une seule étape, sans configuration supplémentaire requise. 

{{< skill-callout
    title="Configurez APM avec un agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Activez APM sur vos applications {#enable-apm-on-your-applications}

<div class="alert alert-info">Avant de continuer, confirmez que votre environnement est compatible en consultant le <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guide de compatibilité SSI.</a></div>

### Installation d'un nouveau Datadog Agent {#new-agent-installation}

Si vous n'avez pas encore installé le Datadog Agent, installez-le et activez SSI en une seule étape.

1. Exécutez la commande suivante sur votre host Linux ou votre VM :

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}\" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c \"$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)\"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="La section « Personnaliser la couverture de votre Agent » des instructions intégrées pour l'installation du Datadog Agent sur Linux." style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Pour sélectionner les versions du SDK dans les menus déroulants, cliquez sur {{< ui >}}Customize Library Versions{{< /ui >}}.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="Le menu déroulant « Personnaliser les versions de bibliothèque » dans les instructions pour l'installation du Datadog Agent sur Linux." style="width:100%;" >}}
{{< /site-region >}}

Copiez ensuite la commande générée et exécutez-la.

### Installation d'un Datadog Agent existant {#existing-agent-installation}

Si vous avez déjà installé le Datadog Agent, réexécutez la commande d'installation du Datadog Agent depuis [Installation d'un nouveau Datadog Agent](#new-agent-installation) sur le host. La commande met à jour le Datadog Agent existant et active SSI.

Sinon, utilisez Fleet Automation pour activer SSI depuis Datadog :

1. Dans Datadog, accédez à [**Fleet Automation > Configuration**][21].
1. Cliquez sur {{< ui >}}Configure Agents{{< /ui >}}.
1. Appliquez des filtres pour sélectionner les agents que vous souhaitez configurer, puis cliquez sur **Suivant**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="L'écran de filtrage des agents dans Fleet Automation, avec des options pour définir le périmètre par environnement, système d'exploitation et nom de host" style="width:100%;" >}}

1. Cliquez sur la tuile {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}, puis cliquez sur {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="L'écran de sélection de produit dans Fleet Automation, affichant la tuile Application Performance Monitoring (APM)" style="width:80%;" >}}

1. Dans l'écran {{< ui >}}Configure SDKs Installation{{< /ui >}}, cliquez sur {{< ui >}}Yes{{< /ui >}} pour installer automatiquement les SDK. Sélectionnez {{< ui >}}Use latest version{{< /ui >}}, ou décochez pour spécifier des versions individuelles du SDK.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="L'écran de configuration de l'installation des SDK dans Fleet Automation, avec des options pour activer l'installation automatique des SDK et sélectionner les versions" style="width:60%;" >}}

1. Cliquez sur **Next**.
1. Vérifiez votre configuration et cliquez sur {{< ui >}}Deploy Configuration{{< /ui >}}.

## Vérifiez l'installation {#verify-the-installation}

1. Confirmez que le Datadog Agent est en cours d'exécution :

   ```shell
   sudo datadog-agent status
   ```

1. Confirmez que l'injection SSI est armée sur le host :

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   La sortie liste la bibliothèque de l'injecteur APM dans `/etc/ld.so.preload` et un ou plusieurs paquets `datadog-apm-*`.

1. Une fois que vos applications reçoivent du trafic, confirmez que vos services apparaissent sur la [page des services APM][23]. S'ils n'apparaissent pas en quelques minutes, suivez le [guide de dépannage SSI][19].

## Configurez les tags de service unifiés {#configure-unified-service-tags}

Les Unified Service Tags (USTs) appliquent des tags cohérents aux traces, aux métriques et aux logs, facilitant ainsi la navigation et la corrélation de vos données d'observabilité. Apprenez à [configurer les USTs pour les services Linux][16].

## Activer les produits et fonctionnalités dépendants du SDK {#enable-sdk-dependent-products-and-features}

Une fois que SSI a chargé le SDK Datadog dans vos applications et activé le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK :

{{< ssi-products >}}

Utilisez l'une des méthodes de configuration suivantes :

- **[Configurer dans `application_monitoring.yaml`][18]** :

  Configurez des produits et des fonctionnalités sur tous les services d'un host sans modifier les lignes de commande des applications.

- **[Définir des variables d'environnement][17]** :

  Activez des produits en définissant des variables d'environnement directement dans la configuration de votre application. 

## Options avancées {#advanced-options}

### Mettre à jour la version du SDK {#update-sdk-version}

La version du SDK est fixée lorsque vous exécutez la commande d'installation du Datadog Agent.

Pour mettre à jour les versions du SDK :

1. Réexécutez la commande d'installation du Datadog Agent. Cette commande met également à jour le Datadog Agent vers la dernière version.
1. Redémarrez vos applications.

### Définir des règles d'instrumentation {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les règles d'instrumentation ne sont pas prises en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Les règles d'instrumentation (disponibles pour le Datadog Agent v7.73+) vous permettent de contrôler quels processus sont automatiquement instrumentés par SSI sur les hosts Linux.

Pour configurer les règles d'instrumentation :

1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][20].
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
| Système d'exploitation | OS du host. | `linux` |
| Exécutable | Nom de l'exécutable du processus. | `python3.11` |
| Chemin complet de l'exécutable | Chemin complet de l'exécutable. | `/usr/bin/python3.11` |
| Arguments | Arguments de ligne de commande utilisés pour démarrer le processus. | `--env=production` |
| Répertoire de travail | Répertoire de travail du processus. | `/app` |
| Langage | Langage de programmation détecté pour le processus. | `python` |
| Fichier de point d'entrée | Le fichier spécifique utilisé pour lancer l'application. | `app.py`, `server.js` |

#### Exemples de cas d'utilisation {#example-use-cases}

Examinez les exemples suivants illustrant comment appliquer des règles d'instrumentation :

{{< collapse-content title="Exemple 1 : Instrumenter tous les processus sauf certains spécifiques" level="h5" >}}

Instrumenter tous les processus par défaut. Ajoutez des règles de blocage pour exclure les services qui ajouteraient du bruit sans valeur ajoutée, tels que les tâches cron d'analyse et les processeurs de lots Java.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Deux règles d'instrumentation de blocage ciblant les conditions Répertoire de travail et Fichier de point d'entrée, avec une autorisation d'instrumentation par défaut" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 2 : Instrumenter uniquement des processus spécifiques" level="h5" >}}

Bloquer toute instrumentation par défaut. Ajoutez des règles d'autorisation pour inclure des processus spécifiques dans APM. Cette approche vous donne un contrôle précis et fonctionne bien pour les déploiements progressifs.

Par exemple, pour instrumenter uniquement un service de paiement et un portail client, créez des règles d'autorisation en utilisant {{< ui >}}Working Directory{{< /ui >}}, puis définissez le comportement par défaut sur {{< ui >}}Block Instrumentation{{< /ui >}}.

{{< img src="tracing/trace_collection/instrumentation-rules-linux-example-2.png" alt="Deux règles d'autorisation d'instrumentation ciblant des services dans des répertoires de travail spécifiques, avec un blocage de l'instrumentation par défaut." style="width:100%;" >}}

{{< /collapse-content >}}

## Supprimez l'instrumentation APM en une étape de votre Datadog Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Pour arrêter de produire des traces pour tous les services de votre infrastructure :

1. Exécutez :
   ```shell
   dd-host-install --uninstall
   ```
2. Redémarrez les services sur le host ou la VM.

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de l'activation d'APM avec SSI, consultez le [guide de dépannage SSI][19].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /fr/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /fr/tracing/trace_collection/library_config/
[18]: /fr/tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/fleet/agent-management
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services