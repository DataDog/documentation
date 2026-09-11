---
categories:
- configuration & deployment
dependencies:
- https://github.com/jenkinsci/datadog-plugin/blob/master/README.md
description: Transmettez automatiquement vos métriques, événements et checks de service
  Jenkins à Datadog. to Datadog.
doc_link: https://docs.datadoghq.com/integrations/jenkins/
git_integration_title: jenkins
has_logo: true
integration_title: Jenkins
is_public: true
custom_kind: integration
name: jenkins
public_title: Intégration Datadog/Jenkins
short_description: Transmettez automatiquement vos métriques, événements et checks
  de service Jenkins à Datadog. checks to Datadog.
---
Ce plug-in Jenkins transmet automatiquement des métriques, des événements et des checks de service à un compte Datadog.

![Dashboard Jenkins dans Datadog][16]

**Remarque** : la [page du plug-in d'intégration continue Jenkins][1] (disponible en anglais) reprend les informations de cette page.

## Configuration

### Installation

_Ce plug-in nécessite [Jenkins 2.346.1][2]._

_Pour les anciennes versions de Jenkins (c'est-à-dire 1.632+), vous trouverez la version 1.2.0 du plug-in [ici](https://updates.jenkins.io/download/plugins/datadog/)._

Installez le plug-in depuis l'[Update Center][3] (disponible en accédant à `Manage Jenkins -> Manage Plugins`) dans votre installation Jenkins :

1. Sélectionnez l'onglet `Available`, cherchez `Datadog`, puis cochez la case en regard de l'option `Datadog Plugin`.
2. Installez le plug-in en cliquant sur l'un des deux boutons en bas de l'écran.
3. Pour vérifier que le plug-in est installé, cherchez `Datadog Plugin` dans l'onglet `Installed`.

  Poursuivez votre lecture pour découvrir comment configurer le plug-in.

**Remarque** : si une version inattendue de `Datadog Plugin` s'affiche, accédez à `Manage Jenkins`, puis exécutez la commande `Check Now` depuis l'écran `Manage Plugins`.

### Configuration

Vous pouvez configurer votre plug-in de deux façons différentes pour transmettre des données à Datadog :

* En utilisant un Agent Datadog en tant que redirecteur entre Jenkins et Datadog (méthode recommandée).
  - Si vous utilisez un serveur DogStatsD à la place d'un Agent Datadog complet, seuls les événements et les métriques sont pris en charge.
  - Pour les données envoyées depuis un host externe, l'Agent Datadog exige la configuration suivante : `dogstatsd_non_local_traffic: true` et `apm_non_local_traffic: true`. Ces paramètres peuvent être configurés à l'aide du [fichier de configuration][17] `datadog.yaml`.
* En envoyant directement les données à Datadog via HTTP.
  - L'implémentation du client HTTP utilisée dispose d'un délai d'expiration d'une minute. En cas de problème de connexion avec Datadog, cela peut ralentir votre instance Jenkins.

Cette configuration peut être effectuée depuis [l'interface utilisateur du plug-in](#interface-utilisateur-du-plug-in) avec un [script Groovy](#script-groovy) ou à l'aide de [variables d'environnement](#variables-d-environnement).

#### Interface utilisateur du plug-in

Pour configurer votre plug-in Datadog, accédez à `Manage Jenkins -> Configure System` depuis votre installation Jenkins. Faites ensuite défiler l'écran jusqu'à atteindre la section `Datadog Plugin` :

##### Transmission HTTP

1. Cliquez sur le bouton radio en regard de l'option **Use Datadog API URL and Key to report to Datadog** (sélectionnée par défaut).
2. Collez votre [clé d'API Datadog][4] dans le champ `API Key` de l'écran de configuration de Jenkins. Si vous souhaitez stocker votre clé d'API dans le [gestionnaire d'identifiants][18], créez un identifiant pour la clé d'API et sélectionnez-le dans la liste déroulante `Datadog API Key (Select from Credentials)`.
3. Testez votre clé d'API Datadog à l'aide du bouton `Test Key` situé en dessous, sur ce même écran.
4. (Facultatif) Saisissez le hostname du serveur Jenkins dans l'onglet Advanced afin de l'inclure dans les événements.
5. (Facultatif) Saisissez votre [URL d'admission des logs Datadog][15] et sélectionnez Enable Log Collection dans l'onglet Advanced.
6. (Facultatif) Sélectionnez l'option Enable CI Visibility. Vous avez également la possibilité de définir le nom de votre instance CI.
7. Enregistrez votre configuration.

##### Transmission de données par l'Agent Datadog

1. Cliquez sur le bouton radio correspondant à l'option **Use the Datadog Agent to report to Datadog**.
2. Indiquez le `hostname` et le `port` de votre Agent Datadog.
3. (Facultatif) Saisissez le hostname du serveur Jenkins dans l'onglet Advanced afin de l'inclure dans les événements.
4. (Facultatif) Spécifiez votre port de collecte des logs, configurez la [collecte de logs](#collecte-de-logs-avec-l-Agent) pour l'Agent Datadog, puis sélectionnez Enable Log Collection.
5. (Facultatif) Saisissez votre port de collecte de traces et sélectionnez Enable Ci Visibility. Vous avez également la possibilité de définir le nom de votre instance CI.
6. Enregistrez votre configuration.

#### Script Groovy

Configurez votre plug-in Datadog à l'aide des scripts Groovy ci-dessous pour transmettre des données via HTTP ou à l'aide de DogStatsD. Ce type de configuration s'avère particulièrement utile si vous exécutez votre Master Jenkins dans un conteneur Docker à l'aide de l'[image Docker Jenkins officielle][5] ou de toute autre solution alternative prenant en charge `plugins.txt` et les scripts init Groovy.

##### Transmission HTTP avec Groovy

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

// Si vous souhaitez utiliser l'URL et la clé de l'API Datadog pour transmettre vos données à Datadog
d.setReportWith('HTTP')
d.setTargetApiURL('https://api.datadoghq.com/api/')
d.setTargetApiKey('<CLÉ_API_DATADOG>')

// Personnalisation, voir la section dédiée ci-dessous
d.setExcluded('job1,job2')

// Si vous souhaitez recueillir les logs
d.setLogIntakeUrl('https://http-intake.logs.datadoghq.com/v1/input/')

// Enregistrer la configuration
d.save()
```

##### Transmission de données par l'Agent Datadog avec Groovy

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

d.setReportWith('DSD')
d.setTargetHost('localhost')
d.setTargetPort(8125)

// Pour recueillir des logs
d.setTargetLogCollectionPort(10518)
d.setCollectBuildLogs(true)

// Pour activer CI Visibility
d.setTargetTraceCollectionPort(8126)
d.setEnableCiVisibility(true)
d.setCiInstanceName("jenkins")

// Personnalisation, voir la section dédiée ci-dessous
d.setExcluded('job1,job2')

// Enregistrer la configuration
d.save()
```

#### Variables d'environnement

Configurez votre plug-in Datadog avec des variables d'environnement à l'aide de la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH`, qui indique le processus de transmission à utiliser.

##### Transmission HTTP avec des variables d'environnement

1. Définissez la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` sur `HTTP`.
2. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_URL`, qui indique l'endpoint de l'API Datadog (valeur par défaut : `https://api.datadoghq.com/api/`).
3. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY`, qui indique votre [clé d'API Datadog][4].
4. (Facultatif) Collecte de logs :
  - Définissez la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` sur `true` pour activer la collecte de logs (désactivée par défaut).
  - Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL`, qui indique l'URL d'admission des logs Datadog (valeur par défaut : `https://http-intake.logs.datadoghq.com/v1/input/`).
5. (Facultatif) CI Visibility (collecte de traces) :
  - Définissez la variable `DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY` sur `true` pour activer CI Visibility (désactivé par défaut).
  - Définissez la variable `DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL`, qui spécifie l'URL d'admission du Webhook Datadog (valeur par défaut : `https://webhook-intake.datadoghq.com/api/v2/webhook/`).
  - Définissez la variable `DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME`, qui spécifie le nom de l'instance Jenkins pour CI Visibility (`jenkins` par défaut).

##### Transmission de données par l'Agent Datadog avec des variables d'environnement

1. Définissez la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` sur `DSD`.
2. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_HOST`, qui indique le host du serveur DogStatsD (valeur par défaut : `localhost`).
3. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_PORT`, qui indique le port du serveur DogStatsD (valeur par défaut : `8125`).
4. (Facultatif) Collecte de logs :
   -  Activez la [collecte de log](#collecte-de-logs-avec-l-agent) pour l'Agent Datadog.
   - Définissez la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` sur `true` pour activer la collecte de logs (désactivée par défaut).
   - Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT`, qui indique le port de collecte de logs de l'Agent Datadog.
5. (Facultatif) CI Visibility (collecte de traces) :
   - Définissez la variable `DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY` sur `true` pour activer CI Visibility (désactivé par défaut).
   - Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT`, qui indique le port de collecte de traces de l'Agent Datadog (`8126` par défaut).
   - Définissez la variable `DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME`, qui spécifie le nom de l'instance Jenkins pour CI Visibility (`jenkins` par défaut).

Vous avez également la possibilité d'utiliser les variables d'environnement Datadog standard :
   - Définissez la variable `DD_AGENT_HOST`, qui indique le host de l'Agent Datadog.
   - Définissez la variable `DD_AGENT_PORT`, qui indique le port du serveur DogStatsD.
   - Définissez la variable `DD_TRACE_AGENT_PORT`, qui indique le port de collecte de traces de l'Agent Datadog.
   - Définissez la variable `DD_TRACE_AGENT_URL`, qui indique l'URL de l'Agent Datadog vers laquelle les traces doivent être envoyées. Lorsque cette variable est définie, elle a la priorité sur `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

Les variables d'environnement avec l'espace de nommage `DATADOG_JENKINS_PLUGIN` ont la priorité sur les variables d'environnement Datadog standard.

#### Journalisation

La journalisation repose sur l'utilisation de `java.util.Logger`, un logger qui respecte les [meilleures pratiques en matière de journalisation de Jenkins][6]. Pour obtenir des logs, suivez les instructions de la [documentation sur la journalisation de Jenkins][6] (en anglais). Lorsque vous ajoutez le logger, le préfixe `org.datadog.jenkins.plugins.datadog.` est ajouté au nom de toutes les fonctions du plug-in Datadog. Au moment de la rédaction de cette page, seule la fonction `org.datadog.jenkins.plugins.datadog.listeners.DatadogBuildListener` était disponible.

## Personnalisation

### Personnalisation des pipelines

Le plug-in Datadog ajoute une étape `datadog` qui permet de personnaliser vos tâches basées sur des pipelines.

| Option (type)              | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `collectLogs` (`boolean`)  | Permet d'activer la collecte de logs pour le pipeline lorsqu'elle est désactivée à l'échelle globale. |
| `tags` (`String[]`)        | Liste des tags à associer aux données recueillies concernant le pipeline.      |

Dans les pipelines déclaratifs, ajoutez l'étape dans un bloc `options` de premier niveau, comme suit :

```groovy
pipeline {
    agent any
    options {
        datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"])
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

Dans un pipeline scripté, incorporez la section concernée dans l'étape Datadog comme suit :

```groovy
datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

**Remarque** : les personnalisations de pipeline entrent uniquement en compte après le début d'une tâche. Les tags indiqués dans la personnalisation ne seront pas associés à `jenkins.job.started`.

### Personnalisation globale

Pour personnaliser votre configuration globale, dans Jenkins, accédez à `Manage Jenkins -> Configure System`, puis cliquez sur le bouton **Advanced**. Voici la liste des options disponibles :

| Personnalisation              | Description                                                                                                                                                                                                                                 | Variable d'environnement                          |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Hostname                   | Un hostname à utiliser dans chaque événement envoyé à Datadog.                                                                                                                                                                                           | `DATADOG_JENKINS_PLUGIN_HOSTNAME`             |
| Tâches exclues              | Une liste d'expressions régulières séparées par des virgules servant à exclure certains noms de tâches de la surveillance. Exemple : `susans-job,johns-.*,prod_folder/prod_release`.                                                                                                      | `DATADOG_JENKINS_PLUGIN_EXCLUDED`            |
| Tâches incluses              | Une liste d'expressions régulières séparées par des virgules servant à inclure certains noms de tâches dans la surveillance. Exemple : `susans-job,johns-.*,prod_folder/prod_release`.                                                                                                          | `DATADOG_JENKINS_PLUGIN_INCLUDED`            |
| Global tag file            | Chemin vers un fichier d'espace de travail contenant une liste de tags séparés par des virgules (fonctionnalité non compatible avec les tâches de pipeline).                                                                                                                                   | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAG_FILE`      |
| Global tags                | Liste de tags séparés par des virgules à appliquer à l'ensemble des métriques, événements et checks de service. Les tags peuvent inclure des variables d'environnement définies dans l'instance jenkins master.                                                                                                                                                          | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`          |
| Global job tags            | Liste d'expressions régulières séparées par des virgules permettant d'identifier une tâche, et liste de tags à appliquer à cette tâche. Les tags peuvent inclure des variables d'environnement définies dans l'instance jenkins master. **Remarque** : les tags peuvent faire référence à des groupes de correspondance dans l'expression régulière, à l'aide du caractère `$`. Exemple : `(.*?)_job_(*?)_release, owner:$1, release_env:$2, optional:Tag3`. | `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`      |
| Send security audit events | Envoie le `Security Events Type` (type des événements de sécurité) des événements et métriques (fonctionnalité activée par défaut).                                                                                                                                                                | `DATADOG_JENKINS_PLUGIN_EMIT_SECURITY_EVENTS` |
| Send system events         | Envoie le `System Events Type` (type des événements système) des événements et métriques (fonctionnalité activée par défaut).                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_EMIT_SYSTEM_EVENTS`   |

### Personnalisation des tâches

Depuis la page de configuration d'une tâche spécifique :

| Personnalisation                         | Description                                                                                                                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tags personnalisés                           | Les tags sont définis depuis un `File` (fichier) de l'espace de travail de la tâche (fonctionnalité non compatible avec les tâches de pipeline) ou sous forme de `Properties` (propriétés) texte directement depuis la page de configuration. Lorsque cette fonctionnalité est activée, elle remplace la configuration de la fonctionnalité `Global Job Tags`. |
| Send source control management events | Envoie le `Source Control Management Events Type` (type des événements de gestion des commandes source) des événements et métriques (fonctionnalité activée par défaut).                                                                                                         |

## Données collectées

Ce plug-in recueille les [événements](#evenements), [métriques](#metriques) et [checks de service](#checks-de-service) suivants :

### Events

#### Type d'événement par défaut

| Nom de l'événement      | Déclenché par              | Tags par défaut                                                              | Métrique RATE associée  |
|-----------------|---------------------------|---------------------------------------------------------------------------|-------------------------|
| Build started   | `RunListener#onStarted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.started`   |
| Build aborted   | `RunListener#onDeleted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.aborted`   |
| Build completed | `RunListener#onCompleted` | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `result`, `user_id` | `jenkins.job.completed` |
| SCM checkout    | `SCMListener#onCheckout`  | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.scm.checkout`  |

REMARQUE : `event_type` est toujours défini sur `default` pour les métriques et événements ci-dessus.

#### Type des événements système

| Nom de l'événement                   | Déclenché par                            | Tags par défaut                                                            | Métrique RATE associée                 |
|------------------------------|-----------------------------------------|-------------------------------------------------------------------------|----------------------------------------|
| Computer Online              | `ComputerListener#onOnline`             | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.online`              |
| Computer Offline             | `ComputerListener#onOffline`            | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.offline`             |
| Computer TemporarilyOnline   | `ComputerListener#onTemporarilyOnline`  | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_online`  |
| Computer TemporarilyOffline  | `ComputerListener#onTemporarilyOffline` | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_offline` |
| Computer LaunchFailure       | `ComputerListener#onLaunchFailure`      | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.launch_failure`      |
| Item Created                 | `ItemListener#onCreated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.created`                 |
| Item Deleted                 | `ItemListener#onDeleted`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.deleted`                 |
| Item Updated                 | `ItemListener#onUpdated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.updated`                 |
| Item Copied                  | `ItemListener#onCopied`                 | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.copied`                  |
| Item Location Changed        | `ItemListener#onLocationChanged`        | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.location_changed`        |
| Config Changed               | `SaveableListener#onChange`             | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.config.changed`               |

REMARQUE : `event_type` est toujours défini sur `system` pour les métriques et événements ci-dessus.

#### Type des événements de sécurité

| Nom de l'événement                  | Déclenché par                            | Tags par défaut                                     | Métrique RATE associée       |
|-----------------------------|-----------------------------------------|--------------------------------------------------|------------------------------|
| User Authenticated          | `SecurityListener#authenticated`        | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.authenticated` |
| User failed To Authenticate | `SecurityListener#failedToAuthenticate` | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.access_denied` |
| User loggedOut              | `SecurityListener#loggedOut`            | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.logout`        |

REMARQUE : `event_type` est toujours défini sur `security` pour les métriques et événements ci-dessus.

### Métriques

| Nom de la métrique                            | Description                                                    | Tags par défaut                                                               |
|----------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------|
| `jenkins.computer.launch_failure`      | Taux d'échec des lancements d'ordinateur.                              | `jenkins_url`                                                              |
| `jenkins.computer.offline`             | Taux d'ordinateurs en cours de déconnexion.                                | `jenkins_url`                                                              |
| `jenkins.computer.online`              | Taux d'ordinateurs en cours de connexion.                                 | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_offline` | Taux d'ordinateurs en cours de déconnexion temporaire.                    | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_online`  | Taux d'ordinateurs en cours de connexion temporaire.                     | `jenkins_url`                                                              |
| `jenkins.config.changed`               | Taux de configurations en cours de modification.                                 | `jenkins_url`, `user_id`                                                   |
| `jenkins.executor.count`               | Nombre d'exécuteurs.                                                | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.free`                | Nombre d'exécuteurs non utilisés.                                     | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.in_use`              | Nombre d'exécuteurs inactifs.                                       | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.item.copied`                  | Taux d'éléments en cours de copie.                                    | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.created`                 | Taux d'éléments en cours de création.                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.deleted`                 | Taux d'éléments en cours de suppression.                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.location_changed`        | Taux d'éléments en cours de déplacement.                                     | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.updated`                 | Taux d'éléments en cours de mise à jour.                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.job.aborted`                  | Taux de tâches abandonnées.                                          | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.build_duration`           | Durée du build, pauses non comprises (en secondes).                     | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.completed`                | Taux de tâches terminées.                                        | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.cycletime`                | Durée du cycle de conception.                                              | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.duration`                 | Durée de la conception (en secondes).                                   | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.feedbacktime`             | Durée de retour entre le commit du code et l'échec d'une tâche.                 | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.leadtime`                 | Délai de conception.                                               | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mtbf`                     | MTBF : durée entre la dernière réussite de tâche et l'échec de la tâche actuelle. | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mttr`                     | MTTR : durée entre le dernier échec de tâche et la réussite de tâche actuelle. | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.pause_duration`            | Durée pendant laquelle le build était en pause (en secondes).                     | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.started`                  | Taux de tâches commencées.                                          | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.stage_duration`           | Durée des différentes étapes.                                 | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.stage_pause_duration`     | Durée de la pause des différentes étapes (en millisecondes).         | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.stage_completed`          | Taux d'étapes terminées.                                      | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.waiting`                  | Délai d'attente d'exécution de la tâche (en millisecondes).           | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.node.count`                   | Nombre total de nœuds.                                           | `jenkins_url`                                                              |
| `jenkins.node.offline`                 | Nombre de nœuds hors ligne.                                           | `jenkins_url`                                                              |
| `jenkins.node.online`                  | Nombre de nœuds en ligne.                                            | `jenkins_url`                                                              |
| `jenkins.node_status.count`            | Indique si le nœud est présent ou non.                                       | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.node_status.up`               | Une valeur de 1 indique que le nœud est en ligne. Une valeur de 0 indique qu'il ne l'est pas.              | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.plugin.count`                 | Nombre de plug-ins.                                                 | `jenkins_url`                                                              |
| `jenkins.plugin.active`                | Plug-ins actifs.                                                | `jenkins_url`                                                              |
| `jenkins.plugin.failed`                | Plug-ins ayant échoué.                                                | `jenkins_url`                                                              |
| `jenkins.plugin.inactivate`            | Plug-ins désactivés.                                              | `jenkins_url`                                                              |
| `jenkins.plugin.withUpdate`            | Plug-ins avec une mise à jour.                                           | `jenkins_url`                                                              |
| `jenkins.project.count`                | Nombre de projets.                                                 | `jenkins_url`                                                              |
| `jenkins.queue.size`                   | Taille de la file d'attente.                                                    | `jenkins_url`                                                              |
| `jenkins.queue.buildable`              | Nombre d'éléments pouvant être conçus dans la file d'attente.                             | `jenkins_url`                                                              |
| `jenkins.queue.pending`                | Nombre d'éléments en attente dans la file d'attente.                               | `jenkins_url`                                                              |
| `jenkins.queue.stuck`                  | Nombre d'éléments coincés dans la file d'attente.                                 | `jenkins_url`                                                              |
| `jenkins.queue.blocked`                | Nombre d'éléments bloqués dans la file d'attente.                               | `jenkins_url`                                                              |
| `jenkins.queue.job.in_queue`                   | Nombre de fois qu'une tâche a été mise dans une file d'attente.                                                     | `jenkins_url`, `job_name`                                               |
| `jenkins.queue.job.buildable`              | Nombre de fois qu'une tâche a affiché le statut Buildable dans une file d'attente.                             | `jenkins_url`, `job_name`                                               |
| `jenkins.queue.job.pending`                | Nombre de fois qu'une tâche a affiché le statut Pending dans une file d'attente.                             | `jenkins_url`, `job_name`                                               |
| `jenkins.queue.job.stuck`                  | Nombre de fois qu'une tâche a affiché le statut Stuck dans une file d'attente.                                  | `jenkins_url`, `job_name`                                               |
| `jenkins.queue.job.blocked`                | Nombre de fois qu'une tâche a affiché le statut Blocked dans une file d'attente.                           | `jenkins_url`, `job_name`                                               |
| `jenkins.scm.checkout`                 | Taux de basculements SCM.                                         | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.user.access_denied`           | Taux d'échecs de l'authentification d'utilisateurs.                         | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.authenticated`           | Taux d'utilisateurs en cours d'authentification.                                  | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.logout`                  | Taux d'utilisateurs en cours de déconnexion.                                     | `jenkins_url`, `user_id`                                                   |

#### Collecte de logs avec l'Agent

**Remarque** : cette configuration est uniquement valable si vous utilisez l'[Agent Datadog](#interface-utilisateur-du-plug-in).

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Pour recueillir vos logs Jenkins, créez un [fichier source de collecte de logs personnalisé][13] pour votre Agent. Pour ce faire, créez un fichier `conf.yaml` au sein de `conf.d/jenkins.d` avec le contenu suivant :

    ```yaml
    logs:
      - type: tcp
        port: <PORT>
        service: <SERVICE>
        source: jenkins
    ```

3. Dans Jenkins, transmettez le port défini lors des étapes précédentes en tant que `Log Collection Port`. Vous pouvez définir ce port à l'aide de [variables d'environnement](#variables-d-environnement), d'un [script Groovy](script-groovy) ou de l'[interface Jenkins](#interface-utilisateur-du-plug-in).

4. [Redémarrez l'Agent][14].

### Checks de service

Le statut du build `jenkins.job.status` avec les tags par défaut : `jenkins_url`, `job`, `node` et `user_id`.

## Suivi des problèmes

Le système de suivi des problèmes intégré à GitHub vous permet de surveiller tous les problèmes liés à ce plug-in : [jenkinsci/datadog-plugin/issues][7]. Cependant, compte tenu du processus d'hébergement des plug-ins Jenkins, certains problèmes peuvent également être publiés sur JIRA. Vous pouvez consulter [ce problème Jenkins][8] pour vérifier comment les problèmes sont publiés.

**Remarque** : voici les [bugs non résolus sur JIRA traitant de Datadog][9].

## Changements

Consultez le fichier [CHANGELOG.md][10].

## Comment contribuer au code

Tout d'abord, **merci** de contribuer à ce projet.

Lisez les [règles de contribution][11] (en anglais) avant d'envoyer un problème ou une pull request. Consultez le [document relatif au développement][12] (en anglais) pour obtenir des conseils et faire tourner un environnement de développement local rapide.

[1]: https://plugins.jenkins.io/datadog
[2]: http://updates.jenkins-ci.org/download/war/2.346.1/jenkins.war
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/jenkinsci/docker
[6]: https://wiki.jenkins-ci.org/display/JENKINS/Logging
[7]: https://github.com/jenkinsci/datadog-plugin/issues
[8]: https://issues.jenkins-ci.org/issues/?jql=project%20%3D%20JENKINS%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20component%20%3D%20datadog-plugin%20ORDER%20BY%20updated%20DESC%2C%20priority%20DESC%2C%20created%20ASC
[9]: https://issues.jenkins-ci.org/browse/INFRA-305?jql=status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%2C%20Verified%2C%20Untriaged%2C%20%22Fix%20Prepared%22%29%20AND%20text%20~%20%22datadog%22
[10]: https://github.com/jenkinsci/datadog-plugin/blob/master/CHANGELOG.md
[11]: https://github.com/jenkinsci/datadog-plugin/blob/master/CONTRIBUTING.md
[12]: https://github.com/jenkinsci/datadog-plugin/blob/master/DEVELOPMENT.md
[13]: https://docs.datadoghq.com/fr/agent/logs/?tab=tcpudp#custom-log-collection
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/fr/logs/log_collection/?tab=http
[16]: https://raw.githubusercontent.com/jenkinsci/datadog-plugin/master/images/dashboard.png
[17]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=containeragent#
[18]: https://www.jenkins.io/doc/book/using/using-credentials/