---
aliases:
- /fr/security_platform/cloud_workload_security/workload_security_rules
- /fr/security/cloud_workload_security/workload_security_rules
further_reading:
- link: /security/threats/setup
  tag: Documentation
  text: Configurer CSM Threats
- link: /security/threats/agent_expressions
  tag: Documentation
  text: Expressions d'Agent
- link: security/threats/backend
  tag: Documentation
  text: Événements CSM Threats
- link: /security/notifications/variables/
  tag: Documentation
  text: En savoir plus sur les variables de notification de sécurité
kind: documentation
title: Gérer les règles de détection CSM Threats
---

Lorsque Cloud Security Management Threats (CSM Threats) est activé, l'Agent Datadog surveille activement l'activité du système et procède à son évaluation sur la base d'un ensemble de règles prêtes à l'emploi en vue de détecter tout comportement suspect. CSM Threats se compose de deux éléments distincts : les [règles d'Agent](#regles-d-agent) et les [règles de détection](#regles-de-detection).

## Règles d'Agent

Les règles d'Agent se composent d'[expressions d'Agent](#expressions-d-agent) qui déterminent les activités recueillies par l'Agent. Un ensemble complet de règles d'Agent constitue une stratégie. Datadog fournit plusieurs [règles d'Agent prêtes à l'emploi][6] qui s'appuient sur la stratégie par défaut de l'Agent.

Lorsque la [configuration à distance][7] est activée, vous recevez automatiquement les nouvelles règles d'Agent pour CSM Threats et les mises à jour des règles existantes à mesure qu'elles sont publiées. Ces règles d'Agent fournies par Datadog sont utilisées dans les [règles de détection par défaut][1].

<div class="alert alert-info">La configuration à distance pour CSM Threats est en version bêta. Si vous avez des questions ou des commentaires, contactez l'<a href="/help">assistance Datadog</a>.</div>

### Expressions d'Agent

Les expressions d'Agent utilisent le [langage de sécurité (SECL) de Datadog][2] pour définir un comportement en fonction de l'activité au sein de vos hosts et conteneurs comme illustré dans les exemples suivants :

#### Détecter l'exécution de la commande `passwd`

Quelques attributs sont à prendre en compte pour détecter l'exécution de la commande `passwd`.

Dans la plupart des distributions Linux, l'utilitaire `passwd` est installé dans `/usr/bin/passwd`. Les événements d'exécution comprennent `exec`, `execve`, `fork` et d'autres appels système. Dans l'environnement CSM Threats, tous ces événements sont identifiés par le symbole `exec`.

L'expression de règle correspondant à tous ces attributs est `exec.file.path == "/usr/bin/passwd"`.

La règle de commande `passwd` est déjà présente dans la stratégie par défaut de l'Agent pour CSM Threats. Les expressions d'Agent peuvent toutefois être plus sophistiquées et définir des règles qui ciblent des ancêtres de processus ou contenir des wildcards pour augmenter la portée de la détection.

#### Détecter l'exécution de Bash par un processus PHP ou Nginx

Quelques attributs sont à prendre en compte pour détecter l'exécution de Bash par un processus PHP ou Nginx.

Dans la plupart des distributions Linux, Bash est installé dans `/usr/bin/bash`. Comme dans l'exemple précédent, incluez l'expression `exec.file.path == "/usr/bin/bash"` dans votre règle pour détecter son exécution. Cela permet à la règle de détecter l'exécution de Bash, que ce soit directement ou en tant que processus enfant d'un processus PHP ou Nginx.

Dans CSM Threats, l'attribut de nom de fichier d'un ancêtre de processus est identifié par le symbole `process.ancestors.file.name`. Pour vérifier si l'ancêtre est un processus Nginx, ajoutez `process.ancestors.file.name == "nginx"`. Comme PHP exécute plusieurs processus, utilisez un wildcard pour étendre la règle à tout processus présentant le préfixe PHP. Pour vérifier si l'ancêtre est un processus PHP, ajoutez donc `process.ancestors.file.name =~ "php*"`. 

L'expression de règle correspondant à tous ces attributs est `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`.

## Règles de détection

Les règles de détection sont exécutées dans le backend Datadog une fois les événements envoyés sous forme de logs. Ces derniers sont alors évalués en fonction des patterns d'événements décrits dans les [règles de détection][3]. Si le pattern correspond à une règle de détection, un [signal de sécurité][8] est généré. Datadog développe en permanence de nouvelles règles de détection, qui sont automatiquement importées dans votre compte.

## Créer des règles personnalisées

En plus des règles par défaut, vous pouvez créer des règles d'Agent et de détection personnalisées. Les règles d'Agent personnalisées sont déployées dans l'Agent par le biais d'une stratégie personnalisée distincte de celle par défaut. Cette stratégie personnalisée contient les règles d'Agent personnalisées ainsi que les [règles par défaut qui ont été désactivées](#desactiver-les-regles-d-agent-par-defaut).

### Définir la règle d'Agent

1. Sur la page [**Agent Configuration**][4], cliquez sur **New Rule**.
2. Saisissez un nom et une description pour la règle.
3. Définissez l'expression d'Agent dans le champ **Expression** en utilisant la syntaxe du langage de sécurité (SECL) de Datadog.

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Ajout d'une règle dans le champ Expression" >}}

    Par exemple, pour détecter des clients de conteneur suspects, utilisez l'expression suivante :

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. Cliquez sur **Create Agent Rule**. Vous revenez alors automatiquement à la page **Agent Configuration**.

Une fois que vous avez créé une règle d'Agent personnalisée, la modification est enregistrée avec les autres mises à jour de règle en attente. Pour appliquer la modification à votre environnement, [déployez la stratégie personnalisée mise à jour dans l'Agent](#deployer-la-strategie-dans-votre-environnement).

### Déployer la stratégie dans votre environnement

Vous pouvez utiliser la configuration à distance pour déployer automatiquement la stratégie personnalisée dans les hosts désignés (tous les hosts ou seulement un sous-ensemble de hosts), ou l'envoyer manuellement vers l'Agent sur chaque host.

<div class="alert alert-info">La fonctionnalité de configuration à distance des règles personnalisées est actuellement en bêta privée. Remplissez <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">ce formulaire</a> pour demander à y accéder.</div>

#### Configuration à distance

1. Sur la page **Agent Configuration**, cliquez sur **Deploy Agent Policy**.
2. Sélectionnez **Remote Configuration**.
3. Choisissez **Deploy to All Hosts** ou **Deploy to a Subset of Hosts**. Pour déployer la stratégie dans un sous-ensemble de hosts, spécifiez les hosts en sélectionnant un ou plusieurs tags de service.
4. Cliquez sur **Deploy**.

#### Déploiement manuel

1. Sur la page **Agent Configuration**, cliquez sur **Deploy Agent Policy**.
2. Sélectionnez **Manual**.
3. Cliquez sur **Download Agent Policy**, puis sur **Done**.

Procédez ensuite comme indiqué ci-dessous pour envoyer le fichier de stratégie vers chaque host.

{{< tabs >}}
{{% tab "Host" %}}

Placez le fichier `default.policy` dans le dossier `{$DD_AGENT}/runtime-security.d` du host cible. Le fichier doit au minimum accorder les accès `read` et `write` à l'utilisateur `dd-agent` sur le host. Il peut être nécessaire d'utiliser un utilitaire comme SCP ou FTP.

Pour appliquer les modifications, redémarrez l'[Agent Datadog][1].

[1]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Créez une ConfigMap contenant `default.policy`, par exemple, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Ajoutez la ConfigMap (`jdefaultpol`) au fichier `values.yaml` avec la commande `datadog.securityAgent.runtime.policies.configMap`:

    ```yaml
    securityAgent:
      compliance:
        # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      syscallMonitor:
        # datadog.securityAgent.runtime.syscallMonitor.enabled
        # Set to true to enable Syscall monitoring.
        enabled: false
    ```

3. Mettez à niveau le chart Helm avec la commande `helm upgrade <NOM_VERSION> -f values.yaml --set datadog.apiKey=<CLÉ_API> datadog/datadog`.

    **Remarque :** si vous devez apporter d'autres modifications à `default.policy`, vous pouvez soit utiliser la commande `kubectl edit cm jdefaultpol`, soit remplacer la ConfigMap avec `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

4. Redémarrez l'[Agent Datadog][1].

[1]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

### Configurer la règle de détection

Après avoir envoyé le nouveau fichier de stratégie vers l'Agent, accédez à la page [**Rules**][3].

1. Sur la page [**Detection Rules**][3], cliquez sur **New Rule**.
2. Sélectionnez **Workload Security** sous **Rule types**. Choisissez une méthode de détection, par exemple **Threshold** ou **New Value**.
3. Configurez une nouvelle règle CSM Threats. Une règle peut présenter plusieurs scénarios de règle combinés à l'aide d'une logique booléenne, comme `(||, &&)`. Vous pouvez également définir les paramètres Counter, group by et roll-up over.

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Ajout d'une règle dans le champ de requêtes de recherche" >}}

4. Dans le champ **Only generate a signal if there is a match**, saisissez une requête pour définir les valeurs pour lesquelles un déclencheur sera généré. Vous pouvez également saisir des requêtes de suppression dans le champ **This rule will not generate a signal if there is a match** pour spécifier des valeurs pour lesquelles aucun déclencheur ne sera généré.
5. Définissez la logique à appliquer pour que la règle déclenche un signal de sécurité. Par exemple, `a>0` signifie qu'un signal de sécurité est déclenché dès lors que la condition définie à l'étape 3 est remplie au moins une fois dans la fenêtre temporelle glissante. Sélectionnez une gravité à associer à la règle et choisissez toutes les parties à notifier.

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Définition d'un déclencheur, d'une gravité et de réglages de notification pour une règle" >}}

6. Définissez un déclencheur, une gravité et des réglages de notification pour la règle. Attribuez-lui un nom et ajoutez le message de notification au format Markdown. Utilisez des [variables de notification][5] pour fournir des détails spécifiques concernant le signal en référençant ses tags et ses attributs d'événement. Après le message, ajoutez les tags de votre choix pour préciser le contexte dans lequel les signaux ont été générés par votre règle personnalisée.

    **Remarque **: Datadog recommande d'inclure un runbook de correction automatique dans le corps du message. Comme indiqué dans le modèle, utilisez des variables de substitution pour générer dynamiquement du contenu contextualisé lors de l'exécution.

## Désactiver les règles d'Agent par défaut

Pour désactiver une règle d'Agent par défaut, accédez à la page [**Agent Configuration**][6] et cliquez sur le bouton d'activation ou de désactivation de la règle. Lorsque vous désactivez une règle d'Agent par défaut, la modification est enregistrée avec les autres mises à jour de règle en attente. Pour appliquer la modification à votre environnement, [déployez la stratégie personnalisée mise à jour dans l'Agent](#deployer-la-strategie-dans-votre-environnement).

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/#cat-workload-security
[2]: /fr/security/threats/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /fr/security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /fr/security/threats/setup?tab=kuberneteshelm#enable-remote-configuration
[8]: /fr/security/threats/security_signals