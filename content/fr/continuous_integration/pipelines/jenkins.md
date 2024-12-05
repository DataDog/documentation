---
aliases:
- /fr/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: Gagner en visibilité sur les pipelines en traçant des commandes individuelles
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
title: Configurer le tracing sur un pipeline Jenkins
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est actuellement pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

Versions de Jenkins prises en charge :
* Jenkins 2.346.1+

## Prérequis

Installez l'[Agent Datadog][1] sur l'instance du contrôleur Jenkins.

Si le contrôleur Jenkins et l’Agent Datadog ont été déployés sur un cluster Kubernetes, Datadog recommande d'utiliser le [contrôleur d'admission][2], qui définit automatiquement la variable d'environnement `DD_AGENT_HOST` dans le pod du contrôleur Jenkins de façon à communiquer avec l'Agent Datadog local.

<div class="alert alert-info"><strong>Remarque</strong> : il n'est pas encore possible d'envoyer des traces CI Visibility avec des sockets de domaine Unix.</div>

## Installer le plug-in Jenkins Datadog

Installez et activez le [plug-in Jenkins Datadog][3] v3.3.0 ou une version ultérieure :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Manage Plugins**.
2. Accédez à l'onglet **Available** de l'[Update Center][4] et recherchez `Datadog Plugin`.
3. Cochez la case à côté du plug-in, puis installez-le en utilisant l'un des deux boutons d'installation situés au bas de l'écran.
4. Pour vérifier que le plug-in est installé, recherchez `Datadog Plugin` sur l'onglet **Installed**.

## Activer l'option CI Visibility sur le plug-in

{{< tabs >}}
{{% tab "Depuis l'interface" %}}

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Sélectionnez le mode `Datadog Agent`. Il n'est **pas possible** d'utiliser une URL d'API et une clé d'API Datadog avec CI Visibility.
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
{{< /tabs >}}
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

### Mise en corrélation des métriques d'infrastructure

Si vous utilisez des workers Jenkins, vous pouvez corréler les pipelines avec l'infrastructure qui les exécute. Pour utiliser cette fonctionnalité :

1. Installez l'[Agent Datadog][1] dans chaque worker Jenkins.
2. Définissez et exportez une nouvelle variable d'environnement appelée `DD_CI_HOSTNAME` indiquant le hostname du worker dans chaque worker Jenkins.
  * Ce hostname doit être identique à celui que l'Agent Datadog transmet dans les métriques d'infrastructure pour ce worker.
  * Vous pouvez utiliser soit une valeur fixe, soit une autre variable d'environnement pour définir le hostname.

```bash
# Utilisation d'une valeur fixe
export DD_CI_HOSTNAME=mon-hostname

# Utilisation d'une autre variable d'environnement
export DD_CI_HOSTNAME=$HOSTNAME
```

Si vous gérez vos instances Jenkins à l'aide de Kubernetes, ajoutez la variable d'environnement `DD_CI_HOSTNAME` au [pod qui exécute la tâche Jenkins][9]. La valeur de cette variable d'environnement dépend de ce que vous utilisez dans le daemonset de votre Agent Datadog pour la transmission des métriques d'infrastructure.

Cela ne s'applique qu'aux workers Jenkins. Pour le contrôleur Jenkins, la mise en corrélation des métriques d'infrastructure ne nécessite aucune action supplémentaire.

**Remarque** : la mise en corrélation des métriques d'infrastructure est prise en charge depuis la version 5.0.0 du plug-in Jenkins.

## Activer la collecte des logs de tâches

Cette étape facultative permet d'activer la collecte de logs de tâches. L'opération s'effectue en activant le port de collecte de tâches sur l'Agent Datadog, puis en activant la collecte de tâches sur le plug-in Datadog.

### Agent Datadog

Tout d'abord, activez la collecte des logs de tâches sur l'Agent Datadog en ouvrant un port TCP pour recueillir les logs :

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

Ensuite, activez la collecte des logs de tâches sur le plug-in Datadog :

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
{{< /tabs >}}
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
{{< /tabs >}}
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

## Propager des informations Git dans les pipelines sans Jenkinsfile depuis un outil de gestion du code source

Le plug-in Jenkins a recours à des variables d'environnement pour récupérer les informations Git. Cependant, si vous n'utilisez pas de `Jenkinsfile` dans votre référentiel et que vous avez configuré le pipeline directement dans Jenkins à l'aide de l'étape `checkout`, ces variables d'environnement ne sont pas disponibles.

Dans ce cas, vous pouvez propager les informations Git vers les variables d'environnement de votre build. Pour ce faire, utilisez la fonction `.each {k,v -> env.setProperty(k, v)}` après avoir exécuté les étapes `checkout` ou `git`. Exemple :

{{< tabs >}}
{{% tab "Avec des pipelines déclaratifs" %}}
Si vous configurez votre pipeline à l'aide d'un pipeline déclaratif, propagez les informations Git à l'aide d'un bloc `script` comme indiqué ci-dessous :

Avec l'étape `checkout` :
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
        script {
          checkout(...).each {k,v -> env.setProperty(k,v)}
        }
    }
    ...
  }
}
{{< /code-block >}}

Avec l'étape `git` :
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
      script {
        git(...).each {k,v -> env.setProperty(k,v)}
      }
    }
    ...
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Avec des pipelines scriptés" %}}
Si vous configurez votre pipeline à l'aide d'un pipeline scripté, vous pouvez propager directement les informations Git vers des variables d'environnement :

Avec l'étape `checkout` :
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

Avec l'étape `git` :
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Définir les informations Git manuellement

Le plug-in Jenkins utilise des variables d'environnement pour déterminer les informations Git. Toutefois, il arrive que ces variables d'environnement ne soient pas définies automatiquement en raison de dépendances sur le plug-in Git utilisé dans le pipeline.

Si les informations Git ne sont pas détectées automatiquement, vous pouvez définir les variables d'environnement suivantes manuellement.

**Remarque :** bien que facultatives, ces variables d'environnement ont la priorité sur les informations Git définies par les autres plug-ins Jenkins.

`DD_GIT_REPOSITORY` (facultatif)
: URL du référentiel de votre service.<br/>
**Exemple** : `https://github.com/mon-org/mon-referentiel.git`

`DD_GIT_BRANCH` (facultatif)
: Nom de la branche.<br/>
**Exemple** : `main`

`DD_GIT_TAG` (facultatif)
: Tag du commit (le cas échant).<br/>
**Exemple** : `0.1.0`

`DD_GIT_COMMIT_SHA` (facultatif)
: Commit sous forme de chaîne de 40 caractères hexadécimaux.<br/>
**Exemple** : `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (facultatif)
: Message de commit.<br/>
**Exemple** : `Message de commit initial`

`DD_GIT_COMMIT_AUTHOR_NAME` (facultatif)
: Nom de l'auteur du commit.<br/>
**Exemple** : `David Martin`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (facultatif)
: Adresse e-mail de l'auteur du commit.<br/>
**Exemple** : `david@exemple.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (facultatif)
: Date à laquelle l'auteur a effectué le commit, au format ISO 8601.<br/>
**Exemple** : `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (facultatif)
: Nom du responsable du commit.<br/>
**Exemple** : `Marine Martin`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (facultatif)
: Adresse e-mail du responsable du commit.<br/>
**Exemple** : `marine@exemple.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (facultatif)
: Date à laquelle le responsable du commit a effectué le commit, au format ISO 8601.<br/>
**Exemple** : `2021-08-16T15:41:45.000Z`

Si vous définissez uniquement le référentiel, la branche et le commit, le plugin essaiera d'extraire le reste des informations Git depuis le dossier `.git`.

Exemple d'utilisation :

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/mon-org/mon-referentiel.git', branch:'une/branche-de-fonctionnalite'

          // Définir les informations Git manuellement à l'aide de variables d'environnement.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Exécuter le reste du pipeline.
      }
    }
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

Vous pouvez configurer le plug-in Jenkins de façon à envoyer des tags personnalisés dans toutes les traces de pipeline :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Cliquez sur le bouton `Advanced`.
4. Configurez les `Global Tags`.
5. Configurez les `Global Job Tags`.
6. Enregistrez votre configuration.

**Tags globaux**
: Liste de tags séparés par des virgules à appliquer à l'intégralité des métriques, traces, événements et checks de service. Les tags peuvent inclure des variables d'environnement qui sont définies dans l'instance de contrôleur Jenkins.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Exemple** : `key1:value1,key2:${PREMIERE_VARENV},${AUTRE_VARENV}:value3`

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

Si vous déclenchez un pipeline Jenkins, vous pouvez rechercher le message `Send pipeline traces` dans **Datadog Plugin Logs**. Ce message indique que le plug-in envoie des données liées à **CI Visibility** à l'**Agent Datadog**.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Le plug-in Datadog ne peut pas écrire de charges utiles sur le serveur

Si le message d'erreur suivant s'affiche dans le **log Jenkins**, assurez-vous que la configuration du plug-in est correcte.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

1. Si vous utilisez `localhost` comme hostname, essayez de remplacer cette valeur par le hostname du serveur.
2. Si votre instance Jenkins est derrière un proxy HTTP, accédez à **Manage Jenkins** > **Manage Plugins** > **onglet Advanced** et vérifiez que la configuration du proxy est correcte.

#### HTTP 504

SI un message d'erreur « HTTP 504 » s'affiche, vérifiez que la configuration du proxy Jenkins ne contient aucune erreur.

{{< code-block lang="text" >}}
Failed to send HTTP request: PUT http://localhost:8126/v0.3/traces - Status: HTTP 504
{{< /code-block >}}

1. Si votre instance Jenkins est derrière un proxy HTTP, accédez à **Manage Jenkins** > **Manage Plugins** > **onglet Advanced** et vérifiez que la configuration du proxy est correcte.
  1. Assurez-vous que `localhost` a bien été configuré à la section `No Proxy Hosts`.

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
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template