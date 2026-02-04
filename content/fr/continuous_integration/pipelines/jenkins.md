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
  text: Dépannage de CI Visibility
title: Configuration de Jenkins pour CI Visibility
---

## Section Overview

[Jenkins][19] est un serveur d'automatisation doté de fonctionnalités d'intégration et de livraison continues. Grâce à son architecture de plugins, Jenkins peut être personnalisé pour répondre à tous les besoins CI/CD et automatise tous les aspects du développement, des tests et du déploiement de projets.

Configurez CI Visibility pour Jenkins afin de collecter des données sur les différentes étapes de l'exécution de vos pipelines, identifier les goulots d'étranglement en matière de performances, résoudre les problèmes opérationnels et améliorer vos processus de déploiement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [Étapes manuelles][20] | Étapes manuelles | Consultez les pipelines déclenchés manuellement.                                                                       |
| [Durée de mise en file d'attente][21] | Temps de mise en file d'attente | Afficher le temps pendant lequel les tâches de pipeline restent dans la file d'attente avant le traitement.                                |
| Corrélation de logs | Corrélation de logs | Mettre en corrélation les spans de pipeline avec les logs et activer la [collecte de logs de tâches][12].                                   |
| Mise en corrélation des métriques d'infrastructure | Mise en corrélation des métriques d'infrastructure | Mettre en corrélation les tâches aux [métriques d'host d'infrastructure][11] pour les workers Jenkins.                                 |
| [Spans personnalisées][26] | Spans personnalisées | Configurer des spans personnalisées pour vos pipelines.                                                               |
| Tags prédéfinis personnalisés | Tags prédéfinis personnalisés | Définir des [tags personnalisés][12] sur tous les spans de pipeline, stages et tâches générés.                                  |
| [Tags personnalisés][22] [et mesures au runtime][23] | Tags personnalisés et mesures au runtime | Configurer les [tags personnalisés et les mesures][12] au runtime.                                                     |
| [Paramètres][24] | Paramètres | Définissez des paramètres personnalisés (tels que le nom de la branche par défaut ou les informations Git) lorsqu'un pipeline est déclenché. |
| [Raisons des échecs de pipeline][25] | Raisons de la défaillance d'un pipeline | Identifiez les raisons de la défaillance dʼun pipeline en vous basant sur les messages d'erreur.                                                   |
| [Pipelines en cours d'exécution][32] | Pipelines en cours d'exécution | Visualisez les exécutions de pipeline en cours. Nécessite la version >= 8.0.0 du plugin Jenkins.                      |
| [Filtrer les tâches CI sur le chemin critique][33] | Filtrer les tâches CI sur le chemin critique | Filtrez par tâches sur le chemin critique. |
| [Temps d'exécution][34] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |

Les versions suivantes de Jenkins sont prises en charge :

- Jenkins >= 2.346.1

Cette intégration prend en charge l'installation sans Agent et avec Agent.
L'installation de l'Agent est requise pour la corrélation des métriques d'infrastructure.

### Termes

Ce tableau présente le mappage des concepts entre Datadog CI Visibility et Jenkins :

| Datadog  | Jenkins  |
|----------|----------|
| Pipeline | Pipeline |
| Stage    | Stage    |
| Job      | Step     |

## Installer l'Agent Datadog

Ignorez cette étape si vous n'avez pas besoin de la corrélation des métriques d'infrastructure.

Installez l'Agent Datadog sur votre nœud contrôleur Jenkins et sur vos nœuds workers en suivant les [instructions d'installation de l'Agent][14].

Si le contrôleur Jenkins et l'Agent Datadog ont été déployés sur un cluster Kubernetes, Datadog recommande l'utilisation du [contrôleur d'admission][2], qui définit automatiquement la variable d'environnement `DD_AGENT_HOST` dans le pod du contrôleur Jenkins de façon à communiquer avec l'Agent Datadog local.

Si vous souhaitez transmettre les logs de vos tâches Jenkins à Datadog, assurez-vous que la collecte de logs personnalisés via TCP est [activée et configurée][29] dans l'Agent.

Si votre Agent s'exécute dans un conteneur, ajoutez-lui la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` et assurez-vous que les ports suivants sont accessibles par le contrôleur Jenkins :
- Port [DogStadsD][30], par défaut `8125/udp`
- [Port de traces APM][31], par défaut `8126/tcp`
- [Port de collecte de logs][29], par défaut `10518/tcp`

<div class="alert alert-info">L'envoi de traces CI Visibility via des sockets de domaine UNIX n'est pas pris en charge.</div>

## Installer le plug-in Jenkins Datadog

<div class="alert alert-info">Que vous choisissiez d'utiliser le mode sans Agent ou le mode avec Agent pour transmettre vos données à Datadog, vous <strong>devez</strong> utiliser le plugin.</div>

Installez et activez le [plugin Datadog pour Jenkins][3] v3.1.0 ou version ultérieure :

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Manage Plugins**.
2. Accédez à l'onglet **Available** de l'[Update Center][4] et recherchez `Datadog Plugin`.
3. Cochez la case à côté du plug-in, puis installez-le en utilisant l'un des deux boutons d'installation situés au bas de l'écran.
4. Pour vérifier que le plug-in est installé, recherchez `Datadog Plugin` sur l'onglet **Installed**.

## Configurer le plugin Datadog pour Jenkins

Il existe plusieurs façons de configurer le plugin Datadog pour Jenkins.

### Configurer avec l'interface de configuration de Jenkins

#### Transmettre via l'Agent Datadog (recommandé)

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Sélectionnez le mode `Use the Datadog Agent to report to Datadog`.
4. Configurez le host `Agent`.
5. Configurez CI Visibility :
   1. Configurez le `Traces Collection Port` si vous n'utilisez pas le port par défaut `8126`.
   2. Cliquez sur le bouton `Test traces connection` pour vérifier que votre configuration est valide.
   3. Cochez la case `Enable CI Visibility`.
   4. (Facultatif) Configurez le nom de votre instance CI.
6. (Facultatif) Configurez la collecte de logs :
   1. Configurez le port `Log Collection` comme configuré dans l'Agent Datadog.
   2. Cliquez sur le bouton `Test logs connection` pour vérifier que votre configuration est valide.
   3. Cochez la case `Enable Log Collection`.
7. (Facultatif) Saisissez le nom de l'host que vous utilisez pour accéder à l'interface Datadog (par exemple, `app.datadoghq.com`) dans le champ `Datadog App hostname`.
8. Enregistrez votre configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Configuration du plugin Datadog pour Jenkins" style="width:100%;">}}

#### Sans Agent (avec une clé d'API)

Utilisez cette option pour que le plugin Jenkins transmette les données directement à Datadog sans utiliser l'Agent Datadog. Cela nécessite une clé d'API.

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configure System**.
2. Accédez à la section `Datadog Plugin` en faisant dérouler l'écran de configuration vers le bas.
3. Sélectionnez le mode `Use Datadog site and API key to report to Datadog`.
4. Sélectionnez votre [site Datadog][1] dans le menu déroulant `Pick a site`.
5. Saisissez une `Datadog API Key` valide (ou utilisez l'option `Select from credentials`).
6. Cliquez sur le bouton `Test Key` pour vérifier que votre clé d'API est valide.
7. Configurez CI Visibility :
   1. Cochez la case `Enable CI Visibility`.
   2. (Facultatif) Configurez le nom de votre instance CI.
8. (Facultatif) Configurez la collecte de logs :
   1. Cochez la case `Enable Log Collection`.
9. (Facultatif) Saisissez le nom de l'host que vous utilisez pour accéder à l'interface Datadog (par exemple, `app.datadoghq.com`) dans le champ `Datadog App hostname`.
10. Enregistrez votre configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Configuration du plugin Datadog pour Jenkins" style="width:100%;">}}

[1]: /fr/getting_started/site/#access-the-datadog-site

### Utiliser Configuration-as-Code

#### Transmettre via l'Agent Datadog (recommandé)

Si votre instance Jenkins utilise le plug-in [`configuration-as-code`][1] :

1. Créez ou modifiez le YAML de configuration en ajoutant une entrée pour `datadogGlobalConfiguration` :

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Datadog Agent` mode
      datadogAgentConfiguration:
        # Configure Datadog Agent host
        agentHost: '<your-agent-host>'
        # Configure Datadog Agent port
        agentPort: 8125
        # (Optional) Configure logs collection port as configured in your Datadog Agent
        agentLogCollectionPort: 10518
        # Configure traces collection port
        agentTraceCollectionPort: 8126
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
```

2. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configuration as Code**.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton `View Configuration`.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

#### Sans Agent (avec une clé d'API)

Si votre instance Jenkins utilise le plug-in [`configuration-as-code`][1] :

1. Créez ou modifiez le YAML de configuration en ajoutant une entrée pour `datadogGlobalConfiguration` :

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: '{{< region-param key=jenkins_site_name >}}'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: '{{< region-param key=dd_full_site >}}'
    # (Optional) Enable logs collection
    collectBuildLogs: true
```

2. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Configuration as Code**.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton `View Configuration`.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

### Configurer avec Groovy

#### Transmettre via l'Agent Datadog (recommandé)

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Script Console**.
2. Exécutez le script de configuration :

```groovy
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configure your Datadog Agent host
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Optional) Configure logs collection port as configured in your Datadog Agent
def agentTraceCollectionPort = 8126 // Configure traces collection port
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

#### Sans Agent (avec une clé d'API)

1. Dans l'interface Web de votre instance Jenkins, accédez à **Manage Jenkins > Script Console**.
2. Exécutez le script de configuration :

```groovy
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.{{< region-param key=jenkins_site_name >}}) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = '{{< region-param key=dd_full_site >}}' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

### Utiliser des variables d'environnement

#### Transmettre via l'Agent Datadog (recommandé)

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

# Configure the Agent host
DATADOG_JENKINS_PLUGIN_TARGET_HOST=your-agent-host

# Configure the Traces Collection port (default 8126)
DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Configure Log Collection port as configured in your Datadog Agent
DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

# (Optional) Enable logs collection
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
```

2. Redémarrez votre instance Jenkins.

#### Sans Agent (avec une clé d'API)

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

# Configure your Datadog site
DATADOG_JENKINS_PLUGIN_DATADOG_SITE={{< region-param key=jenkins_site_name >}}

# Configure your API key
DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Enable logs collection
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME={{< region-param key=dd_full_site >}}
```

2. Redémarrez votre instance Jenkins.

## Collecter les logs de tâches

La collecte de logs de tâches peut être activée en option lors de la configuration du plugin Jenkins (consultez la section précédente).
Les options sans Agent et avec Agent sont toutes deux prises en charge.

Les logs sont facturés séparément de CI Visibility.

La rétention, l'exclusion et les index de logs sont configurés dans [Log Management][27]. Les logs des tâches Jenkins peuvent être identifiés par le tag `source:jenkins`.

## Corréler les métriques d'infrastructure

Si vous utilisez des workers Jenkins, vous pouvez corréler les pipelines avec l'infrastructure qui les exécute. Pour utiliser cette fonctionnalité :

1. Installez l'[Agent Datadog][1] dans chaque worker Jenkins.
2. Définissez et exportez une nouvelle variable d'environnement appelée `DD_CI_HOSTNAME` indiquant le hostname du worker dans chaque worker Jenkins.
  * Ce hostname doit être identique à celui que l'Agent Datadog transmet dans les métriques d'infrastructure pour ce worker.
  * Vous pouvez utiliser soit une valeur fixe, soit une autre variable d'environnement pour définir le hostname.

```bash
export DD_CI_HOSTNAME=my-hostname
```

Si vous gérez vos instances Jenkins à l'aide de Kubernetes, ajoutez la variable d'environnement `DD_CI_HOSTNAME` au [pod qui exécute la tâche Jenkins][9]. La valeur de cette variable d'environnement dépend de ce que vous utilisez dans le daemonset de votre Agent Datadog pour la transmission des métriques d'infrastructure.

Cela ne s'applique qu'aux workers Jenkins. Pour le contrôleur Jenkins, la mise en corrélation des métriques d'infrastructure ne nécessite aucune action supplémentaire.

**Remarque** : la corrélation des métriques d'infrastructure est prise en charge depuis le plugin Jenkins v5.0.0 ou version ultérieure.

## Activer Test Optimization

Il s'agit d'une étape facultative qui permet la collecte de données de tests à l'aide de [Test Optimization][16].

Consultez la [documentation Test Optimization][17] pour votre langage afin de vous assurer que le framework de test que vous utilisez est pris en charge.

Il existe différentes façons d'activer Test Optimization dans une tâche ou un pipeline Jenkins :
1. En utilisant l'interface de configuration de Jenkins.
2. En ajoutant l'étape `datadog` dans le script de pipeline.
3. En configurant le traceur manuellement.

Pour les pipelines qui lancent un conteneur Docker pour exécuter des tests, vous ne pouvez configurer le traceur que manuellement.

### Activer avec l'interface de configuration de Jenkins

La configuration de Test Optimization via l'interface est disponible dans le plugin Datadog pour Jenkins v5.6.0 ou version ultérieure.

Cette option ne convient pas aux pipelines qui sont entièrement configurés dans un `Jenkinsfile` (par exemple, les pipelines Multibranch ou les pipelines d'un dossier d'organisation).
Pour ces pipelines, utilisez la configuration déclarative avec l'étape `datadog` (décrite dans la section suivante).

Pour activer Test Optimization via l'interface, procédez comme suit :
1. Dans l'interface web de votre instance Jenkins, accédez à la tâche ou au pipeline que vous souhaitez instrumenter et sélectionnez l'option **Configure**.
2. Dans la section de configuration **General**, cochez la case **Enable Datadog Test Optimization**.
3. Saisissez le nom du service ou de la bibliothèque testés dans le champ **Service Name**. Vous pouvez choisir toute valeur qui vous semble pertinente.
4. Choisissez les langages pour lesquels vous souhaitez activer l'instrumentation des tests. Certains langages ne prennent pas en charge la configuration via l'interface. Pour configurer Test Optimization pour ces langages, suivez les [instructions de configuration][18] manuelles.
5. Fournissez éventuellement des [paramètres de configuration supplémentaires][18].
6. Cliquez sur **Save**.

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Configuration de Test Optimization Datadog pour Jenkins" style="width:100%;">}}

### Activer avec l'étape de pipeline `datadog`

Cette option de configuration est disponible dans le plugin Datadog pour Jenkins v5.6.2 ou version ultérieure.

Dans les pipelines déclaratifs, ajoutez l'étape dans un bloc `options` de premier niveau, comme suit :

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY")
            additionalVariables: ["my-var": "value"]  // additional tracer configuration settings (optional)
        ])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
```

Dans un pipeline scripté, enveloppez la section concernée avec l'étape `datadog` comme suit :

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Les autres paramètres `datadog`, tels que `collectLogs` ou `tags`, peuvent être ajoutés à côté du bloc `testOptimization`.

### Activer avec une configuration manuelle du traceur

Suivez les [instructions de configuration][17] manuelles de Test Optimization spécifiques à votre langage.

## Propager les informations Git

Certaines fonctionnalités du plugin Datadog pour Jenkins nécessitent des informations Git associées aux builds Jenkins pour fonctionner correctement.

Les informations Git minimales requises pour un build sont l'URL du référentiel, la branche, le SHA du commit et l'e-mail de l'auteur du commit.
Ces informations peuvent être déterminées automatiquement par le plugin, propagées depuis le SCM, fournies manuellement via des variables d'environnement, ou obtenues en combinant ces approches.

**Remarque** : si un pipeline extrait plusieurs référentiels, les informations Git des référentiels extraits plus tard dans le pipeline ont une priorité plus élevée.

### Propager les informations Git depuis le SCM

Le plugin Jenkins est capable de détecter automatiquement les informations Git associées à un build ou à un pipeline.
Cependant, selon la version de Jenkins et les détails du pipeline, il peut y avoir des cas où la détection automatique des données Git n'est pas possible.

Dans ce cas, vous pouvez rendre les informations Git disponibles pour le plugin en utilisant la fonction `.each {k,v -> env.setProperty(k, v)}` après l'exécution des étapes `checkout` ou `git`. Par exemple :

#### Avec des pipelines déclaratifs

Si vous utilisez un pipeline déclaratif pour configurer votre pipeline, propagez les informations Git à l'aide d'un bloc `script` comme suit :

Avec l'étape `checkout` :

```groovy
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
```

Avec l'étape `git` :

```groovy
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
```

#### Avec des pipelines scriptés

Si vous utilisez un pipeline scripté pour configurer votre pipeline, vous pouvez propager les informations git aux variables d'environnement directement.

Avec l'étape `checkout` :

```groovy
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```

Avec l'étape `git` :

```groovy
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```


### Définir les informations Git manuellement

Si le plugin ne peut pas détecter automatiquement les informations Git et que la propagation des données Git via le SCM n'est pas une option,
les informations Git nécessaires peuvent être définies manuellement.

Pour ce faire, définissez les variables d'environnement suivantes.

**Remarque :** bien que facultatives, ces variables d'environnement ont la priorité sur les informations Git définies par les autres plug-ins Jenkins.

`DD_GIT_REPOSITORY_URL` (Optional)
: L'URL du référentiel de votre service.<br/>
**Exemple** : `https://github.com/my-org/my-repo.git`

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
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

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

## Inclure ou exclure des pipelines

Vous pouvez configurer le plugin Jenkins pour inclure ou exclure des pipelines spécifiques :

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

Les listes de tâches incluses et exclues peuvent contenir des expressions régulières, mais pas des motifs glob. Pour inclure une tâche avec un préfixe spécifique, utilisez `prefix-.*` et non `prefix-*`.

## Configuration avancée

### Définir le nom de la branche par défaut

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

#### Intégrer avec Datadog Teams
Pour afficher et filtrer les équipes associées à vos pipelines, ajoutez `team:<your-team>` comme tag personnalisé. Le nom du tag personnalisé doit correspondre exactement au handle d'équipe de vos [Datadog Teams][15].

### Définir des tags personnalisés globaux

Vous pouvez configurer le plugin Jenkins pour envoyer des tags personnalisés (comme des tags globaux et des tags de tâche globaux) dans toutes les traces de pipeline :

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

## Visualiser les données de pipeline dans Datadog

Une fois l'intégration configurée avec succès, les pages [**CI Pipeline List**][7] et [**Executions**][8] se remplissent de données une fois les pipelines terminés.

La page **CI Pipeline List** affiche uniquement les données de la branche par défaut de chaque référentiel. Pour en savoir plus, consultez la section [Rechercher et gérer les pipelines CI][28].

## Dépannage

### Générer un flare de diagnostic

Lorsque vous signalez un problème à l'équipe d'assistance Datadog, générez un flare de diagnostic du plugin et fournissez-le avec la description du problème.

Pour générer le flare, procédez comme suit :

1. Dans l'interface web de votre instance Jenkins, accédez à **Manage Jenkins > Troubleshooting > Datadog**.
2. Dans le formulaire Diagnostic Flare, sélectionnez les informations que vous souhaitez inclure dans le flare. La sélection par défaut est recommandée. Plus vous fournissez d'informations, plus il est facile de diagnostiquer votre problème.
3. Cliquez sur **Download** pour générer et télécharger l'archive du flare.

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

### Les données d'exécution de pipeline ne sont pas disponibles dans Datadog

#### Vérification de la connectivité HTTP

Si votre instance Jenkins est derrière un proxy HTTP, accédez à **Manage Jenkins** > **Manage Plugins** > **onglet Advanced** et vérifiez que la configuration du proxy est correcte.
- Si le plugin Datadog est configuré pour envoyer des données à un Agent Datadog, vérifiez que l'host de l'Agent a été ajouté à la section `No Proxy Hosts`.
- Si le plugin Datadog est configuré pour envoyer des données directement à Datadog (mode sans Agent), vérifiez que l'host Datadog a été ajouté à la section `No Proxy Hosts`. Le tableau ci-dessous présente les sites Datadog pris en charge et leurs valeurs d'host correspondantes :

| Site Datadog | Valeur de l'host |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |

#### Le plug-in Datadog ne peut pas écrire de charges utiles sur le serveur

Si le message d'erreur suivant s'affiche dans le **log Jenkins**, assurez-vous que la configuration du plug-in est correcte.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

Si vous utilisez `localhost` comme nom d'host, remplacez-le par le nom d'host du serveur.

### Les logs Jenkins ne sont pas disponibles dans Datadog

Si le plugin Datadog est configuré pour envoyer des données à un Agent Datadog, procédez comme suit :
- Assurez-vous que la collecte de logs personnalisés via TCP est [activée et configurée][29] dans l'Agent.
- Accédez à l'interface de configuration du plugin et cliquez sur **Test logs connection** pour vérifier la connectivité des logs.

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

### Les métriques d'infrastructure ne sont pas corrélées aux pipelines Jenkins

Assurez-vous d'avoir suivi les étapes pour [corréler les métriques d'infrastructure aux pipelines Jenkins][11].

Si, même après avoir suivi ces étapes, les métriques d'infrastructure ne sont toujours pas corrélées aux pipelines Jenkins,
essayez de redémarrer l'instance Jenkins.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /fr/continuous_integration/pipelines/jenkins/?tab=linux#enable-job-log-collection
[11]: /fr/continuous_integration/pipelines/jenkins/?tab=agentlessusinganapikey#correlate-infrastructure-metrics
[12]: /fr/continuous_integration/pipelines/custom_tags_and_measures/
[14]: /fr/agent/
[15]: /fr/account_management/teams/
[16]: /fr/continuous_integration/tests/
[17]: /fr/continuous_integration/tests/setup/
[18]: /fr/tracing/trace_collection/library_config/
[19]: https://www.jenkins.io/
[20]: /fr/glossary/#manual-step
[21]: /fr/glossary/#queue-time
[22]: /fr/glossary/#custom-tag
[23]: /fr/glossary/#custom-measure
[24]: /fr/glossary/#parameter
[25]: /fr/glossary/#pipeline-failure
[26]: /fr/glossary/#custom-span
[27]: /fr/logs/guide/best-practices-for-log-management/
[28]: /fr/continuous_integration/search/#search-for-pipelines
[29]: /fr/agent/logs/?tab=tcpudp#custom-log-collection
[30]: /fr/developers/dogstatsd/
[31]: /fr/containers/docker/apm/#tracing-from-the-host
[32]: /fr/glossary/#running-pipeline
[33]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /fr/glossary/#pipeline-execution-time