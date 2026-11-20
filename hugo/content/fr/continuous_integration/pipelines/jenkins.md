---
aliases:
- /fr/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: Étendre Pipeline Visibility en traçant des commandes individuelles
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Configuration de Jenkins pour CI Visibility
---
## Présentation {#overview}

[Jenkins][19] est un serveur d'automatisation doté de fonctionnalités d'intégration et de livraison continues. Grâce à son architecture de plugins, Jenkins peut être personnalisé pour répondre à tout besoin CI/CD et automatise tous les aspects du développement de projet, des tests et du déploiement.

Configurez CI Visibility pour Jenkins afin de collecter des données à travers diverses phases de vos exécutions de pipeline, d'identifier les goulots d'étranglement de performance, de résoudre les défis opérationnels et d'affiner vos processus de déploiement.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [Étapes manuelles][20] | Étapes manuelles | Affichez les pipelines déclenchés manuellement.                                                                       |
| [Temps de file d'attente][21] | Temps de file d'attente | Affichez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités.                                |
| Corrélation des logs | Corrélation des logs | Corréler les spans de pipeline aux logs. Nécessite [Logs Storage][10].                                   |
| Corrélation des métriques d'infrastructure | Corrélation des métriques d'infrastructure | Corrélez les jobs aux [métriques de host d'infrastructure][11] pour les workers Jenkins.                                 |
| [Spans personnalisés][26] | Spans personnalisés | Configurez des spans personnalisés pour vos pipelines.                                                               |
| Tags prédéfinis personnalisés | Tags prédéfinis personnalisés | Définissez des [tags personnalisés][12] pour tous les spans de pipeline, de phases et de jobs générés.                                  |
| [Tags personnalisés][22] [et mesures à l'exécution][23] | Tags personnalisés et mesures à l'exécution | Configurez des [tags et mesures personnalisés][12] à l'exécution.                                                     |
| [Paramètres][24] | Paramètres | Définissez des paramètres personnalisés (tels que le nom de la branche par défaut ou les informations Git) lorsqu'un pipeline est déclenché. |
| [Raisons d'échec de pipeline][25] | Raisons d'échec de pipeline | Identifiez les raisons d'échec de pipeline à partir des messages d'erreur.                                                   |
| [Pipelines en cours d'exécution][32] | Pipelines en cours d'exécution | Affichez les exécutions de pipeline en cours. Nécessite la version du plugin Jenkins >= 8.0.0                      |
| [Filtrer les jobs CI sur le chemin critique][33] | Filtrer les jobs CI sur le chemin critique | Filtrez par les jobs sur le chemin critique. |
| [Temps d'exécution][34] | Temps d'exécution  | Affichez le temps pendant lequel les pipelines exécutent des jobs. |

Les versions de Jenkins suivantes sont prises en charge :

- Jenkins >= 2.346.1

Cette intégration prend en charge les installations Agentless et avec Agent.
L'installation de l'Agent est requise pour les corrélations de métriques d'infrastructure.

### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et Jenkins :

| Datadog  | Jenkins  |
|----------|----------|
| Pipeline | Pipeline |
| Phase    | Stage    |
| Job      | Step     |

## Installez le Datadog Agent {#install-the-datadog-agent}

Ignorez cette étape si vous n'avez pas besoin de corrélations de métriques d'infrastructure.

Installez le Datadog Agent sur votre nœud contrôleur Jenkins et sur vos nœuds de travail en suivant les [instructions d'installation de l'Agent][14].

Si le contrôleur Jenkins et le Datadog Agent ont été déployés sur un cluster Kubernetes, Datadog recommande d'utiliser l'[Admission Controller][2], qui définit automatiquement la variable d'environnement `DD_AGENT_HOST` dans le pod du contrôleur Jenkins pour communiquer avec le Datadog Agent local.

Si vous souhaitez envoyer les logs de vos jobs Jenkins à Datadog, assurez-vous que la collecte de logs personnalisés via TCP est [activée et configurée][29] dans l'Agent.

Si votre Agent s'exécute dans un conteneur, ajoutez-y la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` et assurez-vous que les ports suivants sont accessibles par le contrôleur Jenkins :
- [DogStatsD][30] port, par défaut `8125/udp`
- [Port des traces APM][31], par défaut `8126/tcp`
- [Port de collecte des logs][29], par défaut `10518/tcp`

<div class="alert alert-info">L'envoi de traces CI Visibility via des sockets de domaine UNIX n'est pas pris en charge.</div>

## Installez le plugin Datadog Jenkins {#install-the-datadog-jenkins-plugin}

<div class="alert alert-info">Que vous choisissiez d'utiliser le mode Agentless ou le mode avec Agent pour envoyer vos données à Datadog, vous êtes <strong>tenu</strong> d'utiliser le plugin.</div>

Installez et activez le [plugin Datadog Jenkins][3] v3.1.0 ou version ultérieure :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. Dans le [Centre de mise à jour][4] sous l'onglet {{< ui >}}Available{{< /ui >}}, recherchez {{< ui >}}Datadog Plugin{{< /ui >}}.
3. Cochez la case à côté du plugin et installez-le à l'aide de l'un des deux boutons d'installation en bas de l'écran.
4. Pour vérifier que le plugin est installé, recherchez {{< ui >}}Datadog Plugin{{< /ui >}} sous l'onglet {{< ui >}}Installed{{< /ui >}}.

## Configurez le plugin Datadog Jenkins {#configure-the-datadog-jenkins-plugin}

Il existe plusieurs façons de configurer le plugin Datadog Jenkins.

### Configuration via l'interface utilisateur de Jenkins {#configure-with-the-jenkins-configuration-ui}

#### Rapportez via le Datadog Agent (recommandé) {#report-through-the-datadog-agent-recommended}

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Accédez à la section {{< ui >}}Datadog Plugin{{< /ui >}} en faisant défiler l'écran de configuration vers le bas.
3. Sélectionnez le mode {{< ui >}}Use the Datadog Agent to report to Datadog{{< /ui >}}.
4. Configurez le host {{< ui >}}Agent{{< /ui >}}.
5. Configurez CI Visibility :
   1. Configurez le {{< ui >}}Traces Collection Port{{< /ui >}} si vous n'utilisez pas le port par défaut `8126`.
   2. Cliquez sur le bouton {{< ui >}}Test traces connection{{< /ui >}} pour vérifier que votre configuration est valide.
   3. Cochez la case {{< ui >}}Enable CI Visibility{{< /ui >}}.
   4. (Facultatif) Configurez le nom de votre instance CI.
6. (Facultatif) Configurez la collecte des logs :
   1. Configurez le port {{< ui >}}Log Collection{{< /ui >}} tel qu'il est configuré dans le Datadog Agent.
   2. Cliquez sur le bouton {{< ui >}}Test logs connection{{< /ui >}} pour vérifier que votre configuration est valide.
   3. Cochez la case {{< ui >}}Enable Log Collection{{< /ui >}}.
7. (Facultatif) Saisissez le nom du host que vous utilisez pour accéder à l'interface utilisateur Datadog (par exemple, `app.datadoghq.com`) dans le champ {{< ui >}}Datadog App hostname{{< /ui >}}.
8. Enregistrez votre configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Configuration du plugin Datadog pour Jenkins" style="width:100%;">}}

#### Agentless (à l'aide d'une clé d'API) {#agentless-using-an-api-key}

Utilisez cette option pour que le plugin Jenkins envoie les données directement à Datadog sans utiliser le Datadog Agent. Il nécessite une clé d'API.

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Accédez à la section {{< ui >}}Datadog Plugin{{< /ui >}} en faisant défiler l'écran de configuration vers le bas.
3. Sélectionnez le mode {{< ui >}}Use Datadog site and API key to report to Datadog{{< /ui >}}.
4. Sélectionnez votre [site Datadog][1] dans la liste déroulante {{< ui >}}Pick a site{{< /ui >}}.
5. Saisissez une {{< ui >}}Datadog API Key{{< /ui >}} valide (ou utilisez l'option {{< ui >}}Select from credentials{{< /ui >}}).
6. Cliquez sur le bouton {{< ui >}}Test Key{{< /ui >}} pour vérifier que votre clé d'API est valide.
7. Configurez CI Visibility :
   1. Cochez la case {{< ui >}}Enable CI Visibility{{< /ui >}}.
   2. (Facultatif) Configurez le nom de votre instance CI.
8. (Facultatif) Configurez la collecte des logs :
   1. Cochez la case {{< ui >}}Enable Log Collection{{< /ui >}}.
9. (Facultatif) Saisissez le nom du host que vous utilisez pour accéder à l'interface utilisateur Datadog (par exemple, `app.datadoghq.com`) dans le champ {{< ui >}}Datadog App hostname{{< /ui >}}.
10. Enregistrez votre configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Configuration du plugin Datadog pour Jenkins" style="width:100%;">}}

[1]: /fr/getting_started/site/#access-the-datadog-site

### Utilisez la configuration en tant que code {#use-configuration-as-code}

#### Rapportez via le Datadog Agent (recommandé) {#report-through-the-datadog-agent-recommended-1}

Si votre instance Jenkins utilise le plugin Jenkins [`configuration-as-code`][1] :

1. Créez ou modifiez le fichier YAML de configuration en ajoutant une entrée pour `datadogGlobalConfiguration` :

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
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton {{< ui >}}View Configuration{{< /ui >}}.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

#### Agentless (à l'aide d'une clé d'API) {#agentless-using-an-api-key-1}

Si votre instance Jenkins utilise le plugin Jenkins [`configuration-as-code`][1] :

1. Créez ou modifiez le fichier YAML de configuration en ajoutant une entrée pour `datadogGlobalConfiguration` :

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
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}.
3. Appliquez ou rechargez la configuration.
4. Vérifiez la configuration à l'aide du bouton {{< ui >}}View Configuration{{< /ui >}}.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

### Configurer avec Groovy {#configure-with-groovy}

#### Rapportez via le Datadog Agent (recommandé) {#report-through-the-datadog-agent-recommended-2}

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}.
2. Exécutez le script de configuration :

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
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

#### Agentless (à l'aide d'une clé d'API) {#agentless-using-an-api-key-2}

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}.
2. Exécutez le script de configuration :

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
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

### Utilisez des variables d'environnement {#use-environment-variables}

#### Rapportez via le Datadog Agent (recommandé) {#report-through-the-datadog-agent-recommended-3}

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :

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

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
```

2. Redémarrez votre instance Jenkins.

#### Agentless (à l'aide d'une clé d'API) {#agentless-using-an-api-key-3}

1. Définissez les variables d'environnement suivantes sur la machine de votre instance Jenkins :

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

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME={{< region-param key=dd_full_site >}}
```

2. Redémarrez votre instance Jenkins.

## Stockage des logs {#logs-storage}

Le stockage des logs peut être activé en option lors de la configuration du plugin Jenkins (voir `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` dans la section précédente).
Les options Agentless et avec Agent sont toutes deux prises en charge.

Logs Storage est facturé séparément de CI Visibility.

La rétention, l'exclusion et les index des logs sont configurés dans [Log Management][27]. Les logs des jobs Jenkins peuvent être identifiés par le tag `source:jenkins`.

## Corréler les métriques d'infrastructure {#correlate-infrastructure-metrics}

Si vous utilisez des workers Jenkins, vous pouvez corréler les pipelines avec l'infrastructure qui les exécute. Pour que cette fonctionnalité fonctionne :

1. Installez le [Datadog Agent][1] sur chaque worker Jenkins.
2. Définissez et exportez une nouvelle variable d'environnement appelée `DD_CI_HOSTNAME` sur chaque worker Jenkins avec le nom de host du worker.
  * Il doit s'agir du même nom de host que celui que le Datadog Agent rapporte dans les métriques d'infrastructure pour ce worker.
  * Vous pouvez utiliser des valeurs fixes ou d'autres variables d'environnement comme valeurs valides.

```bash
export DD_CI_HOSTNAME=my-hostname
```

Si vous utilisez Kubernetes pour gérer vos instances Jenkins, ajoutez la variable d'environnement `DD_CI_HOSTNAME` au [pod qui exécute le job Jenkins][9]. La valeur de cette variable d'environnement dépend de ce que vous utilisez dans votre daemonset Datadog Agent lors du rapport des métriques d'infrastructure.

Ceci est uniquement requis pour les workers Jenkins. Pour le contrôleur Jenkins, la corrélation des métriques d'infrastructure ne nécessite aucune action supplémentaire.

**Remarque** : La corrélation des métriques d'infrastructure est prise en charge depuis le plugin Jenkins v5.0.0 ou version ultérieure.

## Activer Test Optimization {#enable-test-optimization}

Il s'agit d'une étape facultative qui permet la collecte de données de tests à l'aide de [Test Optimization][16].

Consultez la [documentation sur Test Optimization][17] pour votre langage afin de vous assurer que le framework de test que vous utilisez est pris en charge.

Il existe différentes manières d'activer Test Optimization dans un job ou un pipeline Jenkins :
1. Utilisation de l'interface utilisateur de configuration Jenkins.
2. Ajout de l'étape `datadog` dans le script de pipeline.
3. Configuration manuelle du SDK.

Pour les pipelines qui lancent un conteneur Docker pour exécuter des tests, vous ne pouvez configurer le SDK que manuellement.

### Activez avec l'interface utilisateur de configuration Jenkins {#enable-with-the-jenkins-configuration-ui}

La configuration de Test Optimization via l'interface utilisateur est disponible dans le plugin Datadog Jenkins v5.6.0 ou version ultérieure.

Cette option ne convient pas aux pipelines configurés entièrement dans `Jenkinsfile` (par exemple, les pipelines Multibranch ou les pipelines issus d'un dossier d'organisation).
Pour ces pipelines, utilisez la configuration déclarative avec l'étape `datadog` (décrite dans la section suivante).

Pour activer Test Optimization via l'interface utilisateur, procédez comme suit :
1. Dans l'interface Web de votre instance Jenkins, accédez au job ou au pipeline que vous souhaitez instrumenter et choisissez l'option {{< ui >}}Configure{{< /ui >}}.
2. Dans la section de configuration {{< ui >}}General{{< /ui >}}, cochez la case {{< ui >}}Enable Datadog Test Optimization{{< /ui >}}.
3. Saisissez le nom du service ou de la bibliothèque testé(e) dans le champ {{< ui >}}Service Name{{< /ui >}}. Vous pouvez choisir toute valeur qui vous semble pertinente.
4. Choisissez les langages pour lesquels vous souhaitez activer l'instrumentation des tests. Certains langages ne prennent pas en charge la configuration via l'interface utilisateur. Pour configurer Test Optimization pour ces langages, suivez les [instructions de configuration][18] manuelles.
5. Optionnellement, fournissez des [paramètres de configuration supplémentaires][18].
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Configuration de Datadog Test Optimization pour Jenkins" style="width:100%;">}}

### Activer avec l'étape de pipeline `datadog` {#enable-with-the-datadog-pipeline-step}

Cette option de configuration est disponible dans le plugin Jenkins Datadog v5.6.2 ou version ultérieure.

Dans les pipelines déclaratifs, ajoutez l'étape à un bloc `options` de haut niveau comme suit :

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

Dans un pipeline scripté, enveloppez la section pertinente avec l'étape `datadog` comme suit :

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Les autres paramètres `datadog`, tels que `collectLogs` ou `tags`, peuvent être ajoutés aux côtés du bloc `testOptimization`.

### Activer avec une configuration manuelle du traceur {#enable-with-manual-tracer-configuration}

Suivez les [instructions de configuration][17] manuelles de Test Optimization spécifiques à votre langage.

## Propager les informations Git {#propagate-git-information}

Certaines fonctionnalités du plugin Jenkins Datadog nécessitent que les informations Git associées aux builds Jenkins soient présentes pour fonctionner correctement.

Les informations Git minimales requises pour un build sont l'URL du dépôt, la branche, le SHA du commit et l'adresse e-mail de l'auteur du commit.
Ces informations peuvent être déterminées automatiquement par le plugin, propagées depuis le SCM, fournies manuellement via des variables d'environnement ou obtenues en combinant ces approches.

**Remarque :** Si un pipeline extrait plusieurs dépôts, les informations Git des dépôts extraits plus tard dans le pipeline ont une priorité plus élevée.

### Propager les informations Git depuis le SCM {#propagate-git-information-from-scm}

Le plugin Jenkins est capable de détecter automatiquement les informations Git associées à un build ou à un pipeline.
Cependant, selon la version de Jenkins et les détails du pipeline, il peut arriver que la détection automatique des données Git ne soit pas possible.

Dans ce cas, vous pouvez rendre les informations Git disponibles pour le plugin en utilisant la fonction `.each {k,v -> env.setProperty(k, v)}` après l'exécution des étapes `checkout` ou `git`. Par exemple :

#### Utilisation des pipelines déclaratifs {#using-declarative-pipelines}

Si vous utilisez un pipeline déclaratif pour configurer votre pipeline, propagez les informations Git en utilisant un bloc `script` comme suit :

En utilisant l'étape `checkout` :

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

En utilisant l'étape `git` :

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

#### Utilisation de pipelines scriptés {#using-scripted-pipelines}

Si vous utilisez un pipeline scripté pour configurer votre pipeline, vous pouvez propager les informations Git directement vers des variables d'environnement.

En utilisant l'étape `checkout` :

```groovy
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```

En utilisant l'étape `git` :

```groovy
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```


### Définir manuellement les informations Git {#set-git-information-manually}

Dans le cas où le plugin ne peut pas détecter automatiquement les informations Git et que la propagation des données Git via SCM n'est pas une option,
les informations Git nécessaires peuvent être définies manuellement.

Pour ce faire, définissez les variables d'environnement suivantes.

**Remarque :** Ces variables sont facultatives, mais si elles sont définies, elles prennent le pas sur les informations Git définies par d'autres plugins Jenkins.

`DD_GIT_REPOSITORY_URL` (Optionnel)
: L'URL du dépôt de votre service.<br/>
**Exemple**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (Facultatif)
: Le nom de la branche.<br/>
**Exemple**: `main`

`DD_GIT_TAG` (Facultatif)
: Le tag du commit (le cas échéant).<br/>
**Exemple**: `0.1.0`

`DD_GIT_COMMIT_SHA` (Facultatif)
: Le commit exprimé sous la forme hexadécimale de 40 caractères.<br/>
**Exemple**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (Facultatif)
: Le message du commit.<br/>
**Exemple**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (Facultatif)
: Le nom de l'auteur du commit.<br/>
**Exemple**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (Facultatif)
: L'adresse électronique de l'auteur du commit.<br/>
**Exemple**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (Facultatif)
: La date à laquelle l'auteur a soumis le commit, exprimée au format ISO 8601.<br/>
**Exemple** : `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (Facultatif)
: Le nom du committer du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (Facultatif)
: L'adresse électronique du committer du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (Facultatif)
: La date à laquelle le committer a soumis le commit, exprimée au format ISO 8601.<br/>
**Exemple** : `2021-08-16T15:41:45.000Z`

Si vous définissez uniquement le dépôt, la branche et le commit, le plugin tentera d'extraire le reste des informations Git du dossier `.git`.

Exemple d'utilisation :

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Setting Git information manually via environment variables.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Execute the rest of the pipeline.
      }
    }
  }
}
{{< /code-block >}}

## Inclure ou exclure des pipelines {#include-or-exclude-pipelines}

Vous pouvez configurer le plugin Jenkins pour inclure ou exclure des pipelines spécifiques :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Accédez à la section {{< ui >}}Datadog Plugin{{< /ui >}} en faisant défiler l'écran de configuration vers le bas.
3. Cliquez sur le bouton {{< ui >}}Advanced{{< /ui >}}.
4. Configurez le {{< ui >}}Excluded Jobs{{< /ui >}}.
5. Configurez le {{< ui >}}Included Jobs{{< /ui >}}.
6. Enregistrez votre configuration.

{{< ui >}}Excluded jobs{{< /ui >}}
: Une liste séparée par des virgules des jobs Jenkins qui ne doivent pas être surveillés. L'exclusion s'applique à toutes les métriques, traces, événements et checks de service. Les jobs exclus peuvent utiliser des expressions régulières pour référencer plusieurs jobs.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**Exemple** : `susans-job,johns-.*,prod_folder/prod_release`

{{< ui >}}Included jobs{{< /ui >}}
: Une liste séparée par des virgules des noms de jobs Jenkins qui doivent être surveillés. Si la liste des jobs inclus est vide, tous les jobs qui ne sont pas explicitement exclus sont surveillés. L'inclusion s'applique à toutes les métriques, traces, événements et checks de service. Les jobs inclus peuvent utiliser des expressions régulières pour référencer plusieurs jobs.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**Exemple** : `susans-job,johns-.*,prod_folder/prod_release`

Les listes de jobs inclus et exclus peuvent contenir des expressions régulières, mais pas de motifs glob. Pour inclure un job avec un préfixe spécifique, utilisez `prefix-.*`—pas `prefix-*`.

## Configuration avancée {#advanced-configuration}

### Définissez le nom de la branche par défaut {#set-the-default-branch-name}

Pour signaler les résultats de pipeline, attachez le nom de la branche par défaut (par exemple, `main`) aux spans de pipeline dans un attribut appelé `git.default_branch`. Cela est généralement effectué automatiquement, mais dans certains cas, le plugin ne peut pas extraire ces informations car elles pourraient ne pas être fournies par Jenkins.

Si cela se produit, définissez manuellement la branche par défaut en utilisant la variable d'environnement `DD_GIT_DEFAULT_BRANCH` dans votre build. Par exemple :

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


### Définissez des tags personnalisés pour vos pipelines {#set-custom-tags-for-your-pipelines}

Le plugin Datadog ajoute une étape `datadog` qui permet d'ajouter des tags personnalisés à vos jobs basés sur des pipelines.

Dans les pipelines déclaratifs, ajoutez l'étape à un bloc d'options de premier niveau :

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

Dans les pipelines scriptés, encapsulez la section pertinente avec l'étape `datadog` :

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Intégration avec Datadog Teams {#integrate-with-datadog-teams}
Pour afficher et filtrer les équipes associées à vos pipelines, ajoutez `team:<your-team>` comme tag personnalisé. Le nom du tag personnalisé doit correspondre exactement à votre identifiant d'équipe [Datadog Teams][15].

### Définissez des tags personnalisés globaux {#set-global-custom-tags}

Vous pouvez configurer le plugin Jenkins pour envoyer des tags personnalisés (comme des tags globaux et des tags de job globaux) dans toutes les traces de pipeline :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Accédez à la section {{< ui >}}Datadog Plugin{{< /ui >}} en faisant défiler l'écran de configuration vers le bas.
3. Cliquez sur le bouton {{< ui >}}Advanced{{< /ui >}}.
4. Configurez le {{< ui >}}Global Tags{{< /ui >}}.
5. Configurez le {{< ui >}}Global Job Tags{{< /ui >}}.
6. Enregistrez votre configuration.

{{< ui >}}Global tags{{< /ui >}}
: Une liste séparée par des virgules de tags à appliquer à toutes les métriques, traces, événements et checks de service. Les tags peuvent inclure des variables d'environnement définies dans l'instance du contrôleur Jenkins.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Exemple** : `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

{{< ui >}}Global job tags{{< /ui >}}
: Une liste séparée par des virgules d'expressions régulières pour faire correspondre un job et une liste de tags à appliquer à ce job. Les tags peuvent inclure des variables d'environnement définies dans l'instance du contrôleur Jenkins. Les tags peuvent faire référence à des groupes de correspondance dans l'expression régulière en utilisant le symbole `$`.<br/>
**Variable d'environnement** : `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**Exemple** : `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Une fois l'intégration configurée avec succès, les pages [**CI Pipeline List**][7] et [**Executions**][8] sont alimentées en données une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Rechercher et gérer les pipelines CI][28].

## Dépannage {#troubleshooting}

### Générer un flare de diagnostic {#generate-diagnostic-flare}

Lorsque vous signalez un problème à l'équipe de support Datadog, générez un flare de diagnostic du plugin et fournissez-le avec la description du problème.

Pour générer le flare, procédez comme suit :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Troubleshooting{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Dans le formulaire Diagnostic Flare, cochez les informations que vous souhaitez inclure dans le flare. La sélection par défaut fonctionne le mieux. Plus vous fournissez d'informations, plus il est facile de diagnostiquer votre problème.
3. Cliquez sur {{< ui >}}Download{{< /ui >}} pour générer et télécharger l'archive flare.

### Activez le niveau de log DEBUG pour le plugin Datadog {#enable-debug-log-level-for-the-datadog-plugin}

Si vous rencontrez des problèmes avec le plugin Datadog, vous pouvez définir les logs du plugin au niveau `DEBUG`. En utilisant ce niveau, vous pouvez voir les détails de la trace de pile si une exception est levée.

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}.
2. Cliquez sur le bouton {{< ui >}}Add new log recorder{{< /ui >}}.
3. Saisissez le nom de l'enregistreur de logs. Par ex. : **Datadog Plugin Logs**.
4. Ajoutez les loggers suivants à la liste :
    - Logger : `org.datadog.jenkins.plugins.datadog.clients` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.traces` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.logs` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.model` -> Niveau de log `ALL`
    - Logger : `org.datadog.jenkins.plugins.datadog.listeners` -> Niveau de log `ALL`
5. Enregistrez la configuration.

Vous pouvez également séparer les loggers dans différents enregistreurs de log.

Une fois les enregistreurs de logs configurés avec succès, vous pouvez vérifier les logs en mode `DEBUG` en accédant à l'enregistreur de logs souhaité via {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}.

Si vous déclenchez un pipeline Jenkins, vous pouvez rechercher le message `Send pipeline traces` dans le {{< ui >}}Datadog Plugin Logs{{< /ui >}}. Ce message indique que le plugin envoie des données de CI Visibility au Datadog Agent.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Les données d'exécution de pipeline ne sont pas disponibles dans Datadog {#pipeline-executions-data-is-not-available-in-datadog}

#### Check de la connectivité HTTP {#http-connectivity-check}

Si votre instance Jenkins se trouve derrière un proxy HTTP, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}} > {{< ui >}}Advanced tab{{< /ui >}} et assurez-vous que la configuration du proxy est correcte :
- Si le plugin Datadog est configuré pour envoyer des données à un Datadog Agent, vérifiez que le host de l'agent a été ajouté à la section {{< ui >}}No Proxy Hosts{{< /ui >}}.
- Si le plugin Datadog est configuré pour envoyer des données directement à Datadog (mode Agentless), vérifiez que le host Datadog a été ajouté à la section {{< ui >}}No Proxy Hosts{{< /ui >}}. Le tableau ci-dessous présente les sites Datadog pris en charge et leurs valeurs de host correspondantes :

| Site Datadog | Valeur de host |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |
| UK1          | uk1.datadoghq.com       |

#### Le plugin Datadog ne peut pas écrire de charges utiles sur le serveur {#the-datadog-plugin-cannot-write-payloads-to-the-server}

Si le message d'erreur suivant apparaît dans le {{< ui >}}Jenkins Log{{< /ui >}}, assurez-vous que la configuration du plugin est correcte.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

Si vous utilisez `localhost` comme nom de host, remplacez-le par le nom de host du serveur.

### Les logs Jenkins ne sont pas disponibles dans Datadog {#jenkins-logs-are-not-available-in-datadog}

Si le plugin Datadog est configuré pour envoyer des données à un Datadog Agent, effectuez les opérations suivantes :
- Assurez-vous que la collecte de logs personnalisés via TCP est [activée et configurée][29] dans l'Agent.
- Accédez à l'interface utilisateur de configuration du plugin et cliquez sur {{< ui >}}Test logs connection{{< /ui >}} pour vérifier la connectivité des logs.

### La section Datadog Plugin n'apparaît pas dans la configuration de Jenkins {#the-datadog-plugin-section-does-not-appear-in-the-jenkins-configuration}

Si la section Datadog Plugin n'apparaît pas dans la section de configuration de Jenkins, assurez-vous que le plugin est activé. Pour ce faire :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. Recherchez {{< ui >}}Datadog Plugin{{< /ui >}} dans l'onglet {{< ui >}}Installed{{< /ui >}}.
3. Vérifiez que la case {{< ui >}}Enabled{{< /ui >}} est cochée.
4. Si vous activez le plugin ici, redémarrez votre instance Jenkins en utilisant le chemin d'URL `/safeRestart`.

### L'option CI Visibility n'apparaît pas dans la section Datadog Plugin. {#the-ci-visibility-option-does-not-appear-in-the-datadog-plugin-section}

Si l'option CI Visibility n'apparaît pas dans la section Datadog Plugin, assurez-vous que la version correcte est installée et redémarrez l'instance Jenkins. Pour ce faire :

1. Dans l'interface Web de votre instance Jenkins, accédez à {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. Recherchez {{< ui >}}Datadog Plugin{{< /ui >}} dans l'onglet {{< ui >}}Installed{{< /ui >}}.
3. Vérifiez que la version installée est correcte.
4. Redémarrez votre instance Jenkins en utilisant le chemin d'URL `/safeRestart`.

### Les métriques d'infrastructure ne sont pas corrélées avec les pipelines Jenkins {#infrastructure-metrics-do-not-get-correlated-with-jenkins-pipelines}

Assurez-vous d'avoir suivi les étapes pour [corréler les métriques d'infrastructure avec les pipelines Jenkins][11].

Si, même après avoir suivi les étapes, les métriques d'infrastructure ne sont toujours pas corrélées avec les pipelines Jenkins,
essayez de redémarrer l'instance Jenkins.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /fr/continuous_integration/pipelines/jenkins/?tab=linux#logs-storage
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
[30]: /fr/extend/dogstatsd/
[31]: /fr/containers/docker/apm/#tracing-from-the-host
[32]: /fr/glossary/#running-pipeline
[33]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /fr/glossary/#pipeline-execution-time