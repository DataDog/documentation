---
title: Configurer le tracing sur un pipeline Jenkins
kind: documentation
further_reading:
  - link: /continuous_integration/explore_pipelines
    tag: Documentation
    text: Explorer les résultats et les performances de l'exécution du pipeline
  - link: /continuous_integration/setup_pipelines/custom_spans/
    tag: Documentation
    text: Étendre la visibilité du pipeline à l'aide de spans personnalisées
  - link: /continuous_integration/troubleshooting/
    tag: Documentation
    text: Dépannage de l'intégration continue
---
## Compatibilité

Versions de Jenkins prises en charge :
* Jenkins >= 2.164.1

## Prérequis

Installez l'[Agent Datadog][1] sur l'instance de contrôleur Jenkins.

Si le contrôleur Jenkins et l'Agent Datadog ont été déployés sur un cluster Kubernetes, Datadog recommande l'utilisation du [contrôleur d'admission][2], qui définit automatiquement la variable d'environnement `DD_AGENT_HOST` dans le pod du contrôleur Jenkins de façon à communiquer avec l'Agent Datadog local.

## Installer le plug-in Jenkins Datadog

Installez et activez le [plug-in Jenkins Datadog][3] v3.1.0 ou une version ultérieure :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Manage Plugins**.
2. Dans l'[Update Center][4] sur l'onglet **Available**, recherchez `Datadog Plugin`.
3. Cochez la case à côté du plug-in, puis installez-le en utilisant l'un des deux boutons d'installation situés au bas de l'écran.
4. Pour vérifier que le plug-in est installé, recherchez `Datadog Plugin` sur l'onglet **Installed**.

## Activer l'option CI Visibility sur le plug-in

{{< tabs >}}
{{% tab "Depuis l'interface" %}}

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Sélectionnez le mode `Datadog Agent`.
4. Configurez le host `Agent`.
5. Configurez le port `Traces Collection` (valeur par défaut : `8126`).
6. Cochez la case `Enable CI Visibility` pour activer cette option.
7. (Facultatif) Configurez le nom de votre instance CI.
8. Vérifiez la connectivité avec l'Agent Datadog.
9. Enregistrez votre configuration.

{{< img src="ci/ci-jenkins-plugin-config.png" alt="Configuration du plug-in Datadog pour Jenkins" style="width:100%;">}}
{{% /tab %}}
{{% tab "Avec configuration-as-code" %}}
Si votre instance Jenkins utilise le plug-in Jenkins [`configuration-as-code`][1] :

1. Créez ou modifiez le YAML de configuration en ajoutant une entrée pour `datadogGlobalConfiguration` :
    ```yaml
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Datadog Agent` mode.
            reportWith: "DSD"
            # Configure the `Agent` host
            targetHost: "agent-host"
            # Configure the `Traces Collection` port (default `8126`).
            targetTraceCollectionPort: 8126
            # Enable CI Visibility flag
            enableCiVisibility: true
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    ```
2. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configuration as Code**.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton `View Configuration`.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Avec Groovy" %}}

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Script Console**.
2. Exécutez le script de configuration :
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host.
    d.setTargetHost('<agent host>')

    // Configure the Traces Collection port (default 8126)
    d.setTargetTraceCollectionPort(8126)

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    ```
{{% /tab %}}
{{% tab "Avec des variables d'environnement" %}}

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

    # Configure the Traces Collection port (default 8126)
    DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    ```
2. Redémarrez votre instance Jenkins.

{{% /tab %}}
{{< /tabs >}}

Pour vérifier si l'option CI Visibility est activée, accédez à `Jenkins Log` et recherchez ce qui suit :

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

## Activer la collecte de logs de tâches

Cette étape facultative permet d'activer la collecte de logs de tâches. L'opération s'effectue en activant le port de collecte de tâches sur l'Agent Datadog, puis en activant la collecte de tâches sur le plug-in Datadog.

### Agent Datadog

Tout d'abord, activez la collecte de tâches sur l'Agent Datadog en ouvrant un port TCP pour recueillir les logs :

1. Ajoutez `logs_enabled: true` dans le fichier de configuration de votre Agent `datadog.yaml` ou définissez la variable d'environnement `DD_LOGS_ENABLED=true`.

2. Créez un fichier à l'emplacement `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` sur Linux avec le contenu ci-dessous. Assurez-vous que le `service` correspond au nom de l'instance CI fourni précédemment. Pour les autres systèmes d'exploitation, consultez le guide du [répertoire de configuration de l'Agent][5].

{{< code-block lang="yaml" >}}
logs:
  - type: tcp
    port: 10518
    service: mon-instance-jenkins
    source: jenkins
{{< /code-block >}}

3. [Redémarrez l'Agent][6] pour que les modifications soient appliquées.

Avec cette configuration, l'Agent écoute les logs sur le port `10518`.

### Plug-in Datadog

Ensuite, activez la collecte de logs de tâches sur le plug-in Datadog :

{{< tabs >}}
{{% tab "Depuis l'interface" %}}

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Sélectionnez le mode `Datadog Agent`.
4. Configurez le host `Agent`, si vous ne l'avez pas encore fait.
5. Configurez le port `Log Collection`, conformément à la configuration dans l'étape précédente.
6. Cochez la case `Enable Log Collection` pour activer cette option.
7. Vérifiez la connectivité avec l'Agent Datadog.
8. Enregistrez votre configuration.
{{% /tab %}}
{{% tab "Avec configuration-as-code" %}}
Si votre instance Jenkins utilise le plug-in [`configuration-as-code`][1] :

1. Créez ou modifiez le YAML de configuration pour l'entrée `datadogGlobalConfiguration` :
    ```yaml
    unclassified:
    datadogGlobalConfiguration:
        # Select the `Datadog Agent` mode.
        reportWith: "DSD"
        # Configure the `Agent` host
        targetHost: "agent-host"
        # Configure the `Log Collection` port, as configured in the previous step.
        targetLogCollectionPort: 10518
        # Enable Log collection
        collectBuildLogs: true
    ```
2. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configuration as Code**.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton `View Configuration`.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Avec Groovy" %}}

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Script Console**.
2. Exécutez le script de configuration :
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host, if not previously configured.
    d.setTargetHost('<agent host>')

    // Configure the Log Collection port, as configured in the previous step.
    d.setTargetLogCollectionPort(10518)

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    ```
{{% /tab %}}
{{% tab "Avec des variables d'environnement" %}}

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

    # Configure the Log Collection port, as configured in the previous step.
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # Enable log collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
    ```
2. Redémarrez votre instance Jenkins.

{{% /tab %}}
{{< /tabs >}}

## Définir le nom de la branche par défaut

Pour transmettre des résultats de pipeline, ajoutez le nom de la branche par défaut (par exemple, `main`) aux spans de pipeline dans un attribut appelé `git.default_branch`. Cette opération est généralement effectuée automatiquement, mais il arrive que le plug-in ne parvienne pas à extraire ces informations car elles ne sont peut-être pas fournies par Jenkins.

Dans ce cas, définissez manuellement la branche par défaut en utilisant la variable d'environnement `DD_GIT_DEFAULT_BRANCH` dans votre build. Par exemple :

{{< code-block lang="groovy" >}}
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'main'
        ...
    }
    stages {
        ...
    }
}
{{< /code-block >}}

## Personnalisation

### Définir des tags personnalisés pour vos pipelines

Le plug-in Datadog ajoute une étape `datadog` qui permet d'ajouter des tags personnalisés à vos tâches basées sur des pipelines.

Dans les pipelines déclaratifs, ajoutez l'étape dans un bloc d'options de premier niveau :

{{< code-block lang="groovy" >}}
def DD_TYPE = "release"
pipeline {
    agent any
    options {
        datadog(tags: ["team:backend", "type:${DD_TYPE}", "${DD_TYPE}:canary"])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
{{< /code-block >}}

Dans les pipelines scriptés, incorporez la section concernée dans l'étape `datadog` :

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

### Définir des tags personnalisés globaux

Vous pouvez configurer le plug-in Jenkins pour envoyer des tags personnalisés dans toutes les traces de pipeline :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Cliquez sur le bouton `Advanced`.
4. Configurez les `Global Tags`.
5. Configurez les `Global Job Tags`.
6. Enregistrez votre configuration.

**Tags globaux**
: Liste de tags séparés par des virgules à appliquer à l'intégralité des métriques, traces, événements et checks de service. Les tags peuvent inclure des variables d'environnement qui sont définies dans l'instance de contrôleur Jenkins.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Exemple** : `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

**Global job tags**
: Liste d'expressions régulières séparées par des virgules permettant d'identifier une tâche, et liste de tags à appliquer à cette tâche. Les tags peuvent inclure des variables d'environnement définies dans l'instance de contrôleur Jenkins. Les tags peuvent être mis en correspondance avec des groupes dans l'expression régulière à l'aide du caractère `$`.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**Exemple** : `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

### Inclure ou exclure des pipelines

Vous pouvez configurer le plug-in Jenkins pour inclure ou exclure certains pipelines :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Cliquez sur le bouton `Advanced`.
4. Configurez les `Excluded Jobs`.
5. Configurez les `Included Jobs`.
6. Enregistrez votre configuration.

**Tâches exclues**
: Liste de tâches Jenkins qui ne doivent pas être surveillées, séparées par des virgules. L'exclusion s'applique à l'intégralité des métriques, traces, événements et checks de service. Les tâches exclues peuvent utiliser des expressions régulières pour faire référence à plusieurs tâches.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**Exemple** : `susans-job,johns-.*,prod_folder/prod_release`

**Tâches incluses**
: Liste de noms de tâches Jenkins qui ne doivent pas être surveillées, séparées par des virgules. Si la liste de tâches fournie est vide, toutes les tâches qui ne sont pas explicitement exclues sont surveillées. Cette inclusion s'applique à l'intégralité des métriques, traces, événements et checks de service. Les tâches incluses peuvent utiliser des expressions régulières pour faire référence à plusieurs tâches.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**Exemple** : `susans-job,johns-.*,prod_folder/prod_release`

## Visualiser des données de pipeline dans Datadog

Une fois l'intégration correctement configurée, les pages [Pipelines][7] et [Pipeline Executions][8] commencent à afficher des données après l'exécution des pipelines.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Dépannage

### Activer le niveau de log DEBUG pour le plug-in Datadog

Si vous rencontrez des problèmes avec le plug-in Datadog, vous pouvez activer le niveau de logging `DEBUG`. Ce niveau permet de visualiser les détails de la stack trace en cas d'exception.

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > System log**.
2. Cliquez sur le bouton `Add new log recorder`.
3. Saisissez le nom de l'enregistreur de log. Par exemple : **Datadog Plugin Logs**.
4. Ajoutez les loggers suivants à la liste :
    - Logger : `org.datadog.jenkins.plugins.datadog.clients` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.traces` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.logs` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.model` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.listeners` -> Niveau de log `ALL`
5. Enregistrez la configuration.

Vous pouvez également séparer les loggers dans différents enregistreurs de log.

Une fois les enregistreurs de log correctement configurés, vous pouvez consulter les logs `DEBUG` en accédant à l'enregistreur de log souhaité via **Manage Jenkins > System log**.

Si vous déclenchez un pipeline Jenkins, vous pouvez rechercher le message `Send pipeline traces` dans **Datadog Plugin Logs**. Ce message indique que le plug-in envoie des données liées à la **Visibilité CI** à l'**Agent Datadog**.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### La section Datadog Plugin n'apparaît pas dans la configuration Jenkins

Si la section Datadog Plugin n'apparaît pas dans la section de configuration Jenkins, assurez-vous que le plug-in est activé. Pour ce faire :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Manage Plugins**.
2. Recherchez `Datadog Plugin` dans l'onglet **Installed**.
3. Vérifiez que la case `Enabled` est cochée.
4. Si vous activez le plug-in depuis cette page, redémarrez votre instance Jenkins en utilisant le chemin d'URL `/safeRestart`.

### L'option CI Visibility n'apparaît pas dans la section Datadog Plugin.

Si l'option CI Visibility n'apparaît pas dans la section Datadog Plugin, vérifiez que vous avez installé la bonne version et redémarrez l'instance Jenkins. Pour ce faire :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Manage Plugins**.
2. Recherchez `Datadog Plugin` dans l'onglet **Installed**.
3. Vérifiez que vous avez installé la bonne version.
4. Redémarrez votre instance Jenkins en utilisant le chemin d'URL `/safeRestart`.

### Le traceur du plug-in ne parvient pas à s'initialiser car le traceur Java de l'APM est utilisé pour instrumenter Jenkins.

Si ce message d'erreur s'affiche dans le **log Jenkins**, assurez-vous que vous utilisez le plug-in Jenkins v3.1.0+ :

{{< code-block lang="text" >}}
Failed to reinitialize Datadog-Plugin Tracer, Cannot enable traces collection via plugin if the Datadog Java Tracer is being used as javaagent in the Jenkins startup command. This error will not affect your pipelines executions.
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: https://docs.datadoghq.com/fr/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[5]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions