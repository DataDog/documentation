---
aliases:
- /fr/security/workload_protection/workload_security_rules/custom_rules
- /fr/security/threats/workload_security_rules/custom_rules
description: Créez, déployez et délimitez les politiques Workload Protection, et rédigez
  des règles d'Agent personnalisées pour votre infrastructure.
disable_toc: false
title: Gestion des politiques
---
Les règles d'Agent sont **organisées en politiques**. Une politique est un ensemble de règles d'Agent que vous déployez ensemble et **que vous assignez à une infrastructure spécifique** (hosts, clusters, etc.).

En plus des [règles d'Agent par défaut][7] (OOTB), vous pouvez rédiger des **règles d'Agent personnalisées** pour détecter des événements que Datadog ne met pas en évidence avec les règles standard OOTB seules.

## Politiques {#policies}

### Créez une politique {#create-a-policy}

1. Accédez à [Policies][3].
2. Cliquez sur {{< ui >}}New Policy{{< /ui >}}. Vous pouvez également ouvrir une politique existante, cliquer sur {{< ui >}}Actions{{< /ui >}} et la cloner.
3. Saisissez un nom pour la politique et cliquez sur {{< ui >}}Create{{< /ui >}}.
   La nouvelle politique est créée, mais elle n'est ni activée ni déployée.
4. Cliquez sur la politique pour l'ouvrir.
5. Dans {{< ui >}}New Rule{{< /ui >}}, ajoutez des règles d'Agent personnalisées à la politique. Pour créer une règle d'Agent, consultez [Créer une règle d'Agent personnalisée][14].
6. Cliquez sur {{< ui >}}Edit{{< /ui >}} à côté de {{< ui >}}Deployed on 0 agents{{< /ui >}}.
7. Ajoutez des [tags][17] à la politique pour cibler une infrastructure spécifique.
8. Pour déployer la politique, activez le commutateur à côté de {{< ui >}}Policy is disabled{{< /ui >}} et confirmez. Cela utilise [Remote Configuration](#remote-configuration), comme détaillé ci-dessous sur cette page.

### Épinglez une politique gérée par Datadog à sa version actuelle {#pin-a-datadog-managed-policy-to-its-current-version}

<div class="alert alert-info">Le verrouillage de politique est pris en charge dans la version 7.71.0 de l'Agent et les versions ultérieures. Les Agents précédents continuent de recevoir automatiquement les dernières mises à jour de politique.</div>

Lorsque les politiques gérées par Datadog sont mises à jour par Datadog, elles sont automatiquement déployées sur votre infrastructure.

Pour contrôler le moment où une nouvelle version de politique est déployée sur votre infrastructure, vous pouvez verrouiller la politique sur sa version actuelle. Le verrouillage d'une version de politique empêche le déploiement automatique des mises à jour de politique lorsque Datadog publie une nouvelle version de politique.

Pour verrouiller une politique, procédez comme suit :

1. Accédez à [Policies][3].
2. Cliquez sur une politique gérée par Datadog.
3. Dans {{< ui >}}Version{{< /ui >}}, cliquez sur l'option de verrouillage.
   Si votre infrastructure exécute des Agents dans une version antérieure à la 7.71.0, un avertissement concernant les agents obsolètes s'affiche. Consultez et mettez à niveau votre version de l'Agent dans [Fleet Automation][18].
4. Cliquez sur {{< ui >}}Pin{{< /ui >}}. Pour déverrouiller la version de la politique, cliquez à nouveau sur l'option de verrouillage.

### Règles en conflit {#conflicting-rules}

Lorsque deux politiques déployées sur le même host contiennent la même règle avec un statut différent (active et inactive), la règle sera considérée comme active.

### Appliquez des tags {#apply-tags}

Les tags définissent où une politique s'applique, comme les environnements, les clusters ou les hosts. Ajoutez des tags à une politique pour limiter ses règles à une partie de votre infrastructure.

1. Accédez à [Agent Configuration][6].
2. Ouvrez une politique et cliquez sur {{< ui >}}Edit{{< /ui >}}.
3. Saisissez les tags et cliquez sur {{< ui >}}Apply{{< /ui >}}. Si la politique est activée, elle est appliquée aux cibles des tags.

Lorsque vous ajoutez des tags, Datadog affiche le nombre d'agents ciblés par les tags ainsi que l'infrastructure sur laquelle chaque agent s'exécute. Par exemple, `Tags match 144 agents`.

## Créez une règle d'Agent personnalisée {#create-a-custom-agent-rule}

Vous pouvez créer une règle d'Agent personnalisée et la déployer dans le cadre d'une politique personnalisée. Plus tard, lors de la définition d'une [règle de détection][19] personnalisée, vous faites référence à la règle d'Agent personnalisée et ajoutez des paramètres d'expression.
Les règles d'Agent personnalisées sont déployées sur l'Agent dans une politique personnalisée distincte des politiques par défaut. La politique personnalisée contient uniquement des règles d'Agent personnalisées.

1. Accédez à [Agent Configuration][6].
2. Créez une politique ou ouvrez-en une existante.
3. Une fois la politique ouverte, dans {{< ui >}}Actions{{< /ui >}}, sélectionnez {{< ui >}}Manual rule creator{{< /ui >}} pour ouvrir l'éditeur de règles d'Agent. Le même éditeur est également disponible depuis la page [Règles d'Agent][21] dans Datadog. Pour utiliser plutôt l'assistant {{< ui >}}Assisted rule creator{{< /ui >}}—qui vous guide à travers la règle d'Agent et la règle de détection des menaces—consultez [Créer ensemble la règle d'Agent personnalisée et la règle de détection][20].
4. Saisissez un {{< ui >}}Name{{< /ui >}} et une {{< ui >}}Description{{< /ui >}} pour la règle.
5. Dans {{< ui >}}Expression{{< /ui >}}, définissez la correspondance à l'aide du [langage Datadog Security (SECL)][15].
6. (Facultatif) Ajoutez des variables ou des actions qui s'exécutent lorsque la règle correspond à un événement. Consultez [Variables et actions][22].
7. Cliquez sur {{< ui >}}Create Agent Rule{{< /ui >}}. Vous êtes redirigé vers la politique.

Une fois que vous avez créé une règle d'Agent personnalisée, la modification est enregistrée avec les autres mises à jour de règles en attente. Pour appliquer la modification à votre environnement, déployez la politique personnalisée mise à jour sur l'Agent.

## Activez et déployez des politiques {#enable-and-deploy-policies}

Les politiques activées appliquent leurs règles aux cibles d'infrastructure identifiées par leurs tags. Activer une politique revient au même que la déployer.

Vous pouvez utiliser **Remote Configuration** dans l'interface utilisateur Datadog pour déployer automatiquement la politique personnalisée sur les hosts désignés par les tags de politique (tous les hosts ou un sous-ensemble défini de hosts), ou vous pouvez **déployer manuellement** la politique sur l'Agent de chaque host.

### Remote Configuration {#remote-configuration}

**Remote Configuration** est la méthode utilisée par Datadog pour transmettre automatiquement les politiques à vos agents. Elle utilise un mécanisme sécurisé pour garantir que seules les politiques signées et authentifiées sont transmises à vos agents. Pour déployer une politique à l'aide de Remote Configuration, suivez les étapes détaillées dans Créer une politique.

#### Stratégies de déploiement {#deployment-strategies}

Pour déployer une modification des règles ou des politiques de l'Agent avec Remote Configuration, vous pouvez choisir entre deux stratégies : déployer la modification instantanément sur tous vos hosts, ou échelonner le déploiement par étapes à l'aide d'un déploiement géré. Surveillez les déploiements depuis la [page Déploiements][23].

##### Déploiement instantané {#deploy-instantly}

Le déploiement instantané envoie la politique mise à jour à tous les hosts du périmètre en même temps, sans validation par phases. Cela prend généralement quelques minutes et est idéal lorsque vous souhaitez que la modification soit appliquée partout immédiatement.

Sélectionnez {{< ui >}}Deploy instantly{{< /ui >}}, puis cliquez sur {{< ui >}}Update Policy{{< /ui >}}. Suivez la progression depuis la [page Déploiements][23].

##### Déploiement géré {#managed-deployment}

Un déploiement géré déploie votre modification en plusieurs phases afin que vous puissiez la valider sur un sous-ensemble de hosts avant qu'elle n'atteigne l'ensemble de votre infrastructure.

1. Lors de la modification d'une politique ou d'une règle, sélectionnez {{< ui >}}Start a managed deployment{{< /ui >}}. Si la politique ou la règle a déjà été déployée avec un déploiement géré, sélectionnez {{< ui >}}Start from your last deployment{{< /ui >}} pour réutiliser les paramètres du dernier déploiement. Pour une modification de règle, les paramètres réutilisés sont ceux du dernier déploiement de la politique contenant la règle.
2. Sous {{< ui >}}Customize deployment roll-out plan{{< /ui >}}, définissez le périmètre du déploiement, puis configurez jusqu'à 10 phases pour déployer la modification progressivement. Définissez chaque phase {{< ui >}}By percentage of hosts in scope{{< /ui >}} ou {{< ui >}}By host tags{{< /ui >}}.
3. Sous {{< ui >}}Set up monitoring and delay time{{< /ui >}}, sélectionnez un ou plusieurs monitors à vérifier pendant le déploiement. Si un monitor envoie une alerte pendant que le déploiement est en cours, le déploiement se met en pause. Définissez ensuite le délai d'attente avant de passer à la phase suivante.
4. Sous {{< ui >}}Set deployment window{{< /ui >}}, définissez les jours, les heures et le fuseau horaire pendant lesquels le déploiement peut s'exécuter. Si le déploiement se poursuit au-delà d'une fenêtre, il se met en pause et reprend lors de la suivante.
5. (Facultatif) Sous {{< ui >}}Add a description{{< /ui >}}, ajoutez une description pour le déploiement.
6. Cliquez sur {{< ui >}}Update Policy{{< /ui >}} pour démarrer le déploiement. Suivez la progression depuis la [page Déploiements][23].

### Déploiement manuel {#manual-deployment}

Pour le **déploiement manuel**, vous installez vous-même un fichier de politique sur chaque Agent. Vous pouvez créer la politique et ses règles dans l'interface utilisateur Datadog et **télécharger** le fichier généré. Si vous connaissez déjà la syntaxe de la politique, rédigez un fichier `.policy` manuellement. Ensuite, téléchargez ou synchronisez ce fichier sur chaque Agent où la politique doit s'exécuter, comme décrit ci-dessous.

1. Sur la page {{< ui >}}Agent Configuration{{< /ui >}}, ouvrez une politique.
2. Dans Actions, sélectionnez {{< ui >}}Download Policy{{< /ui >}}.

Ensuite, utilisez les instructions suivantes pour téléverser le fichier de politique sur chaque host.

{{< tabs >}}
{{% tab "Host" %}}

Copiez le fichier `default.policy` sur le host cible dans le dossier `/etc/datadog-agent/runtime-security.d` (qui contiendra tous vos fichiers `.policy`). Le fichier doit disposer d'un accès `read` et `write` pour l'utilisateur `root` sur le host.

Pour appliquer les modifications, effectuez **l'une** des opérations suivantes :

-   Recharger les politiques d'exécution (sans redémarrage complet de l'Agent) :

    ```bash
    sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
    ```

-   Ou redémarrez le [Datadog Agent][27].

[27]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Créez une ConfigMap contenant `default.policy`, par exemple, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Ajoutez la ConfigMap (`jdefaultpol`) à `values.yaml` avec `datadog.securityAgent.runtime.policies.configMap` :

    ```yaml
    securityAgent:
        # [...]
        runtime:
            # datadog.securityAgent.runtime.enabled
            # Set to true to enable Security Runtime Module
            enabled: true
            policies:
                # datadog.securityAgent.runtime.policies.configMap
                # Place custom policies here
                configMap: jdefaultpol
        # [...]
    ```

3. Mettez à jour le chart Helm avec `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Remarque&nbsp;:** Si vous devez apporter d'autres modifications à `default.policy`, vous pouvez soit utiliser `kubectl edit cm jdefaultpol`, soit remplacer la ConfigMap par `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

{{% /tab %}}
{{< /tabs >}}

## Désactivez les règles par défaut de l'Agent {#disable-default-agent-rules}

1. Pour désactiver une règle de l'Agent, accédez à la page [{{< ui >}}Agent Configuration{{< /ui >}}][6] et sélectionnez la politique utilisant la règle.
2. Dans la politique, ouvrez la règle.
3. Définissez le statut sur {{< ui >}}Inactive{{< /ui >}}.
4. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

La suppression d'une règle de [Configuration des règles][21] la retire de **toutes les politiques** qui incluaient cette règle.

## RBAC pour la gestion des règles personnalisées {#rbac-for-custom-rule-management}

Voici quelques [rôles et autorisations][11] importants à utiliser pour le RBAC pour les règles personnalisées :

-   L'autorisation `security_monitoring_cws_agent_rules_actions` peut être utilisée pour activer et configurer la fonctionnalité [Réponse automatisée][12] utilisée pour activer le mode de blocage dans les règles.
    -   Pour utiliser l'autorisation `security_monitoring_cws_agent_rules_actions`, un utilisateur disposant du rôle Datadog Admin doit créer un rôle contenant l'autorisation `security_monitoring_cws_agent_rules_actions`, puis ajouter à ce rôle uniquement les utilisateurs qui gèrent la Réponse automatisée.
-   Le rôle {{< ui >}}Datadog Standard{{< /ui >}} permet aux utilisateurs de créer/mettre à jour une règle personnalisée par défaut, tant que l'opération ne modifie pas les paramètres de **protection** de la règle.

[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /fr/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /fr/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
[8]: /fr/security/workload_protection/
[9]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /fr/account_management/rbac/permissions/
[12]: /fr/security/workload_protection/respond_and_report/#automated-response
[13]: #disable-default-agent-rules
[14]: #create-a-custom-agent-rule
[15]: /fr/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/
[16]: #prioritize-policies
[17]: #apply-tags
[18]: https://app.datadoghq.com/fleet
[19]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[20]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[21]: https://app.datadoghq.com/security/workload-protection/agent-rules
[22]: /fr/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[23]: https://app.datadoghq.com/security/workload-protection/deployments