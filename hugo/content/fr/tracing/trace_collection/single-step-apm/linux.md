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
    title="Configurer APM avec un agent"
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

Si vous avez déjà un Datadog Agent installé, activez SSI à distance depuis Datadog. Vous n'avez pas besoin d'exécuter des commandes sur chaque host.

1. Dans Datadog, accédez à [**APM > Instrument a Service**][21].

1. Sous {{< ui >}}How do you want to instrument these hosts?{{< /ui >}}, sélectionnez {{< ui >}}Deploy on existing hosts{{< /ui >}} pour instrumenter vos services à distance via le Datadog Agent.

1. Sous {{< ui >}}Which hosts should we instrument?{{< /ui >}}, utilisez les filtres de périmètre ({{< ui >}}Environments{{< /ui >}}, {{< ui >}}Hostname{{< /ui >}}, {{< ui >}}APM enabled{{< /ui >}}) pour affiner la liste des hosts. Sélectionnez ensuite les Agents que vous souhaitez instrumenter dans l'onglet {{< ui >}}Eligible for deployment{{< /ui >}}. Les hosts qui ne peuvent pas être instrumentés apparaissent dans l'onglet {{< ui >}}Excluded from deployment{{< /ui >}}.

1. Dans {{< ui >}}Configure SDKs installation{{< /ui >}}, cliquez sur {{< ui >}}Yes{{< /ui >}} pour que Datadog installe automatiquement les SDK de tracing. Pour épingler des versions de SDK spécifiques au lieu de la dernière version, développez {{< ui >}}Customize library versions{{< /ui >}}.

1. Dans {{< ui >}}Configure rollout strategy{{< /ui >}}, choisissez le pourcentage d'Agents sur lesquels effectuer le déploiement à la fois. Datadog affiche les étapes résultantes et une durée estimée. Les déploiements sont automatiquement mis en pause si trois Agents consécutifs échouent ou si les échecs atteignent 10 % du total. Vous pouvez relancer le déploiement plus tard.

1. Dans {{< ui >}}Review and apply APM instrumentation{{< /ui >}}, cochez {{< ui >}}Configuration Summary{{< /ui >}} (basculez entre {{< ui >}}Summary{{< /ui >}} et {{< ui >}}YAML{{< /ui >}}), puis cliquez sur {{< ui >}}Apply Instrumentation{{< /ui >}}.

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

Les règles d'instrumentation vous permettent de contrôler quels processus SSI instrumente automatiquement sur les hosts Linux. Chaque règle vérifie les attributs des processus, puis autorise ou bloque l'instrumentation des processus correspondants. Vous pouvez déployer une règle sur tous les hosts éligibles, ou la limiter à un ou plusieurs [groupes de hosts](#create-host-groups) pour restreindre son application.

Pour afficher et gérer les règles d'instrumentation, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][20].

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="La page APM Instrumentation Rules avec Hosts sélectionné, affichant les cartes Default Behavior, Hosts in Scope et Deployment Status au-dessus d'une liste de règles d'instrumentation" style="width:100%;" >}}

#### Prérequis pour les règles d'instrumentation {#prerequisites-for-instrumentation-rules}

- **Agent** : v7.73 ou version ultérieure sur chaque host, avec SSI et [Remote Configuration][24] activés. Les hosts qui répondent à ces exigences sont éligibles aux règles d'instrumentation.
- **Autorisations** : L'[autorisation][25] **APM Workload Selection Write**, qui est requise pour créer et gérer les règles d'instrumentation et les groupes de hosts.

#### Définir le comportement par défaut {#set-the-default-behavior}

Le comportement par défaut s'applique aux processus sur les hosts éligibles qui ne correspondent à aucune règle d'instrumentation. Il s'applique également lorsque vous n'avez créé aucune règle.

1. Sur la page [Instrumentation Rules][20], accédez à la carte {{< ui >}}Default Behavior{{< /ui >}} et cliquez sur {{< ui >}}Edit{{< /ui >}}.
1. Choisissez l'une des options suivantes :
   - {{< ui >}}Allow everything else{{< /ui >}} : Les applications prises en charge sont instrumentées, sauf si une règle les bloque.
   - {{< ui >}}Block everything else{{< /ui >}} : Les applications ne sont pas instrumentées, sauf si une règle les autorise.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Créer des groupes de hosts {#create-host-groups}

Les groupes de hosts sont des ensembles réutilisables de hosts que vous pouvez cibler avec des règles d'instrumentation.

Pour créer un groupe de hosts :

1. Sur la page [Instrumentation Rules][20], accédez à la carte {{< ui >}}Hosts in Scope{{< /ui >}} et cliquez sur {{< ui >}}Manage host groups{{< /ui >}}.
1. Cliquez sur {{< ui >}}New Host Group{{< /ui >}} et saisissez un nom pour le groupe.
1. Cliquez sur {{< ui >}}Add Hosts{{< /ui >}}, puis recherchez et sélectionnez les hosts à ajouter. Vous pouvez effectuer une recherche par nom de host, facettes ou tags de host.

   <div class="alert alert-info">Les groupes de hosts sont dynamiques, de sorte que les nouveaux hosts correspondant à votre recherche sont ajoutés automatiquement au groupe. Un host peut appartenir à plusieurs groupes, mais tous les hosts d'un groupe doivent fonctionner sur la même plateforme, telle que Linux ou Windows.</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="Le formulaire de création d'un groupe de hosts, avec deux des trois hosts sélectionnés dans la liste Add Hosts" style="width:80%;" >}}

1. Cliquez sur {{< ui >}}Save Group{{< /ui >}}.

Datadog gère automatiquement un groupe {{< ui >}}All hosts{{< /ui >}}. Il répertorie les hosts éligibles qui n'appartiennent à aucun autre groupe, afin que vous puissiez voir quels hosts restent à regrouper. Vous ne pouvez pas modifier sa liste de hosts.

Si vous supprimez un groupe de hosts, Datadog supprime les règles du groupe et l'Agent cesse de les appliquer lors de sa prochaine interrogation de Remote Configuration.

Pour modifier l'ordre des groupes de hosts, faites glisser un groupe par sa poignée dans la liste des groupes. L'ordre des groupes affecte [la manière dont les règles d'instrumentation sont évaluées](#how-instrumentation-rules-are-evaluated).

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="La page Host Groups, affichant le groupe Canary placé au-dessus du groupe All hosts, avec la liste des hosts du groupe Canary" style="width:100%;" >}}

#### Créer des règles d'instrumentation {#create-instrumentation-rules}

**Remarque** : Vous pouvez utiliser Bits AI pour créer des règles d'instrumentation en langage naturel. Dans la fenêtre Create instrumentation rule, cliquez sur {{< ui >}}Generate with Bits{{< /ui >}} et décrivez les processus à instrumenter. Bits AI génère la règle correspondante.

Pour créer une règle d'instrumentation :

1. Sur la page [Instrumentation Rules][20], cliquez sur {{< ui >}}New Rule{{< /ui >}}. Vous pouvez également, sur la page Host Groups, sélectionner un groupe, ouvrir son onglet {{< ui >}}Rules{{< /ui >}} et cliquer sur {{< ui >}}Create a new rule{{< /ui >}}.
1. Définissez une ou plusieurs conditions, puis sélectionnez {{< ui >}}Block Instrumentation{{< /ui >}} ou {{< ui >}}Allow Instrumentation{{< /ui >}}. Consultez la section [Définir les conditions de règle](#define-rule-conditions).

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="La fenêtre Create instrumentation rule, avec une condition Language égale à Python, l'action Allow Instrumentation et le panneau Rule Impact Preview" style="width:100%;" >}}

1. Sous {{< ui >}}Set host targeting{{< /ui >}}, sélectionnez {{< ui >}}All eligible hosts{{< /ui >}} ou {{< ui >}}Select host groups{{< /ui >}}.

   Si vous sélectionnez plusieurs groupes, les groupes partagent une règle unique, et sa modification ultérieure met à jour tous les groupes sélectionnés.

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="L'étape Set host targeting, avec l'option Select host groups choisie et un groupe de hosts nommé Test sélectionné" style="width:80%;" >}}

1. Nommez la règle, puis cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Examinez la règle. Datadog ajoute les nouvelles règles à la fin de la liste de règles de chaque groupe ciblé. Optionnellement, sous {{< ui >}}Set evaluation order{{< /ui >}}, faites glisser les règles pour modifier leur ordre dans chaque groupe. Consultez la section [Comment les règles d'instrumentation sont évaluées](#how-instrumentation-rules-are-evaluated).

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="L'étape d'examen de la règle, montrant son résumé et l'ordre d'évaluation des règles dans le groupe de hosts Test" style="width:100%;" >}}

1. Cliquez sur {{< ui >}}Create Rule{{< /ui >}}.

Datadog déploie les règles sur les hosts éligibles via Remote Configuration dans un délai de 50 secondes. Une fois les règles déployées, redémarrez les services concernés pour que les modifications prennent effet. La carte {{< ui >}}Deployment Status{{< /ui >}} sur la page [Instrumentation Rules][20] indique combien de hosts éligibles ont reçu les règles actuelles.

Pour appliquer les règles manuellement, par exemple sur des hosts pour lesquels Remote Configuration n'est pas activée, cliquez sur {{< ui >}}Export{{< /ui >}} au-dessus de la liste des règles pour exporter le fichier de configuration, puis appliquez-le à vos hosts.

#### Comment les règles d'instrumentation sont évaluées {#how-instrumentation-rules-are-evaluated}

Pour chaque processus, Datadog évalue les règles d'instrumentation dans l'ordre suivant et applique la première règle qui correspond :

1. Règles des groupes auxquels appartient le host du processus, dans l'ordre des groupes de haut en bas. Au sein de chaque groupe, les règles sont évaluées dans l'ordre défini sous {{< ui >}}Set evaluation order{{< /ui >}}.
1. Règles ciblant {{< ui >}}All eligible hosts{{< /ui >}}. Ces règles s'appliquent à chaque host éligible, y compris aux hosts appartenant à des groupes de hosts.

Si aucune règle ne correspond, le [comportement par défaut](#set-the-default-behavior) s'applique.

#### Définir les conditions de règle {#define-rule-conditions}

Chaque règle se compose d'une ou plusieurs conditions. Un processus doit correspondre à toutes les conditions d'une règle pour que celle-ci s'applique. Une condition comprend les éléments suivants :
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
| Entry Point File | Le fichier spécifique utilisé pour lancer l'application. | `app.py`, `server.js` |

#### Exemples de cas d'utilisation {#example-use-cases}

Examinez les exemples suivants illustrant comment appliquer des règles d'instrumentation :

{{% collapse-content title="Exemple 1 : Instrumenter tous les processus sauf certains spécifiques" level="h5" %}}

Instrumenter tous les processus par défaut. Ajoutez des règles de blocage pour exclure les services qui ajouteraient du bruit sans valeur ajoutée, tels que les jobs cron d'analyse et les processeurs de lots Java.

1. Définissez le comportement par défaut sur {{< ui >}}Allow everything else{{< /ui >}}.
1. Créez les règles suivantes, ciblant chacune {{< ui >}}All eligible hosts{{< /ui >}} :

   | Nom de la règle | Condition | Action |
   | --------- | --------- | ------ |
   | Exclure le job cron d'analyse | <code>Working Directory</code> <code>contains</code> <code>analytics-service</code> | Block Instrumentation |
   | Exclure les services de traitement par lots | <code>Entry Point File</code> <code>contains</code> <code>batch-processor.jar</code> | Block Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Exemple 2 : Instrumenter uniquement des processus spécifiques" level="h5" %}}

Bloquer toute instrumentation par défaut. Ajoutez des règles d'autorisation pour inclure des processus spécifiques dans APM.

Par exemple, pour instrumenter uniquement un service de paiement et un portail client :

1. Définissez le comportement par défaut sur {{< ui >}}Block everything else{{< /ui >}}.
1. Créez les règles suivantes, ciblant chacune {{< ui >}}All eligible hosts{{< /ui >}} :

   | Nom de la règle | Condition | Action |
   | --------- | --------- | ------ |
   | Service de paiement | <code>Working Directory</code> <code>equals</code> <code>/srv/checkout</code> | Allow Instrumentation |
   | Portail client | <code>Working Directory</code> <code>equals</code> <code>/srv/customer-portal</code> | Allow Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Exemple 3 : Déployer l'instrumentation progressivement avec un groupe de hosts" level="h5" %}}

Bloquez toute instrumentation par défaut et autorisez-la uniquement sur un petit groupe de hosts canaris. Une fois les résultats validés, ajoutez d'autres hosts au groupe ou modifiez la règle pour cibler tous les hosts éligibles.

1. Définissez le comportement par défaut sur {{< ui >}}Block everything else{{< /ui >}}.
1. Créez un groupe de hosts nommé <code>canary</code> et ajoutez les hosts à instrumenter en premier.
1. Créez une règle avec les paramètres suivants :

   | Paramètre | Valeur |
   | ------- | ----- |
   | Condition | <code>Language</code> <code>equals</code> <code>python</code> |
   | Action | Allow Instrumentation |
   | Ciblage des hosts | Select host groups: <code>canary</code> |

Seules les applications Python sur les hosts du groupe <code>canary</code> sont instrumentées. Aucune autre application n'est instrumentée.

{{% /collapse-content %}}

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
[21]: https://app.datadoghq.com/apm/instrumentation
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
[24]: /fr/remote_configuration/
[25]: /fr/account_management/rbac/permissions/