---
categories:
- configuration & deployment
dependencies: https://github.com/jenkinsci/datadog-plugin/blob/master/README.md
description: Transmettez automatiquement vos métriques, événements et checks de service Jenkins à Datadog.
  to Datadog.
doc_link: https://docs.datadoghq.com/integrations/jenkins/
git_integration_title: jenkins
has_logo: true
integration_title: Jenkins
is_public: true
kind: integration
name: jenkins
public_title: Intégration Datadog/Jenkins
short_description: Transmettez automatiquement vos métriques, événements et checks de service Jenkins à Datadog.
  checks to Datadog.
---


Ce plug-in Jenkins transmet automatiquement des métriques, des événements et des checks de service à un compte Datadog.

**Remarque** : la [page du plug-in d'intégration continue Jenkins][1] (disponible en anglais) reprend les informations de cette page.

## Configuration

### Installation

_Ce plug-in nécessite [Jenkins 1.580.1][2] ou une version ultérieure._

Installez le plug-in depuis l'[Update Center][3] (disponible en accédant à `Manage Jenkins -> Manage Plugins`) dans votre installation Jenkins :

1. Sélectionnez l'onglet `Available`, cherchez `Datadog`, puis cochez la case en regard de l'option `Datadog Plugin`.
2. Installez le plug-in en cliquant sur l'un des deux boutons en bas de l'écran.
3. Pour vérifier que le plug-in est installé, cherchez `Datadog Plugin` dans l'onglet `Installed`. Si c'est bien le cas, passez à la section Configuration ci-dessous.

**Remarque** : si une version inattendue de `Datadog Plugin` s'affiche, accédez à `Manage Jenkins`, puis exécutez la commande `Check Now` depuis l'écran `Manage Plugins`.

### Configuration

Vous pouvez configurer votre plug-in de deux façons différentes pour transmettre des données à Datadog :

* En envoyant directement les données à Datadog, via HTTP
* En utilisant un serveur DogStatsD en tant que redirecteur entre Jenkins et Datadog

Cette configuration peut être effectuée depuis [l'interface utilisateur du plug-in](#interface-utilisateur-du-plug-in) avec un [script Groovy](#script-groovy) ou à l'aide de [variables d'environnement](#variables-d-environnement).

#### Interface utilisateur du plug-in

Pour configurer votre plug-in Datadog, accédez à `Manage Jenkins -> Configure System` depuis votre installation Jenkins. Faites ensuite défiler l'écran jusqu'à atteindre la section `Datadog Plugin` :

##### Transmission via HTTP {plug-in-transmission-http}

1. Cliquez sur le bouton radio en regard de l'option **Use Datadog API URL and Key to report to Datadog** (sélectionnée par défaut).
2. Indiquez votre [clé d'API Datadog][4] dans la zone de texte `API Key`, sur l'écran de configuration de Jenkins.
3. Testez votre clé d'API Datadog à l'aide du bouton `Test Key` situé en dessous, sur ce même écran.
4. Enregistrez votre configuration.

##### Transmission avec DogStatsD {#plug-in-transmission-dogstatsd}

1. Cliquez sur le bouton radio en regard de l'option **Use a DogStatsD Server to report to Datadog**.
2. Indiquez le `hostname` et le `port` de votre serveur DogStatsD.
3. Enregistrez votre configuration.

#### Script Groovy

Configurez votre plug-in Datadog à l'aide des scripts Groovy ci-dessous pour transmettre des données via HTTP ou à l'aide de DogStatsD. Ce type de configuration s'avère particulièrement utile si vous exécutez votre Master Jenkins dans un conteneur Docker à l'aide de l'[image Docker Jenkins officielle][5] ou de toute autre solution alternative prenant en charge `plugins.txt` et les scripts init Groovy.

##### Transmission via HTTP {#script-groovy-transmission-http}

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

//Si vous souhaitez utiliser l'URL et la clé de l'API Datadog pour transmettre vos données à Datadog
d.setReportWith('HTTP')
d.setTargetApiURL('https://api.datadoghq.com/api/')
d.setTargetApiKey('<CLÉ_API_DATADOG>')

// Personnalisation, voir la section ci-dessous à ce sujet
d.setBlacklist('job1,job2')

// Enregistrer la configuration
d.save()
```

##### Transmission avec DogStatsD {#script-groovy-transmission-dogstatsd}

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

d.setReportWith('DSD')
d.setTargetHost('localhost')
d.setTargetPort(8125)

// Personnalisation, voir la section ci-dessous à ce sujet
d.setBlacklist('job1,job2')

// Enregistrer la configuration
d.save()
```

#### Variables d'environnement

Configurez votre plug-in Datadog avec des variables d'environnement à l'aide de la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH`, qui indique le processus de transmission à utiliser.

##### Transmission via HTTP {variable-environnement-transmission-http}

1. Définissez la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` sur `HTTP`.
2. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_URL`, qui indique l'endpoint de l'API Datadog (valeur par défaut : `https://api.datadoghq.com/api/`).
3. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY`, qui indique votre [clé d'API Datadog][4].

##### Transmission avec DogStatsD {variable-environnement-transmission-dogstatsd}

1. Définissez la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` sur `DSD`.
2. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_HOST`, qui indique le host du serveur DogStatsD (valeur par défaut : `localhost`).
3. Définissez la variable `DATADOG_JENKINS_PLUGIN_TARGET_PORT`, qui indique le port du serveur DogStatsD (valeur par défaut : `8125`).

#### Journalisation

La journalisation repose sur l'utilisation de `java.util.Logger`, un logger qui respecte les [meilleures pratiques en matière de journalisation de Jenkins][6]. Pour obtenir des logs, suivez les instructions de la [documentation sur la journalisation de Jenkins][6] (en anglais). Lorsque vous ajoutez le logger, le préfixe `org.datadog.jenkins.plugins.datadog.` est ajouté au nom de toutes les fonctions du plug-in Datadog. Au moment de la rédaction de cette page, seule la fonction `org.datadog.jenkins.plugins.datadog.listeners.DatadogBuildListener` était disponible.

## Personnalisation

### Personnalisation globale

Depuis la page de configuration globale, accédez à `Manage Jenkins -> Configure System` pour personnaliser votre configuration avec les éléments suivants :

| Personnalisation              | Description                                                                                                                                                                                                                                 | Variable d'environnement                          |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Blacklisted jobs           | Une liste d'expressions régulières séparées par des virgules servant à exclure certains noms de tâches de la surveillance. Exemple : `susans-job,johns-.*,prod_folder/prod_release`.                                                                                                      | `DATADOG_JENKINS_PLUGIN_BLACKLIST`            |
| Whitelisted jobs           | Une liste d'expressions régulières séparées par des virgules servant à inclure certains noms de tâches dans la surveillance. Exemple : `susans-job,johns-.*,prod_folder/prod_release`.                                                                                                          | `DATADOG_JENKINS_PLUGIN_WHITELIST`            |
| Global tag file            | Chemin vers un fichier d'espace de travail contenant une liste de tags séparés par des virgules (fonctionnalité non compatible avec les tâches de pipeline).                                                                                                                                   | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAG_FILE`      |
| Global tags                | Une liste de tags séparés par des virgules à appliquer à l'ensemble des métriques, événements et checks de service.                                                                                                                                                         | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`          |
| Global job tags            | Une liste d'expressions régulières séparées par des virgules permettant d'identifier une tâche, et une liste de tags à appliquer à cette tâche. **Remarque** : les tags peuvent faire référence à des groupes de correspondance dans l'expression régulière, à l'aide du caractère `$`. Exemple : `(.*?)_job_(*?)_release, owner:$1, release_env:$2, optional:Tag3`. | `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`      |
| Send security audit events | Envoie le `Security Events Type` (type des événements de sécurité) des événements et métriques (fonctionnalité activée par défaut).                                                                                                                                                                | `DATADOG_JENKINS_PLUGIN_EMIT_SECURITY_EVENTS` |
| Send system events         | Envoie le `System Events Type` (type des événements système) des événements et métriques (fonctionnalité activée par défaut).                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_EMIT_SYSTEM_EVENTS`   |

### Personnalisation des tâches

Depuis la page de configuration d'une tâche spécifique :

| Personnalisation                         | Description                                                                                                                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Custom tags                           | Les tags sont définis depuis un `File` (fichier) de l'espace de travail de la tâche (fonctionnalité non compatible avec les tâches de pipeline) ou sous forme de `Properties` (propriétés) texte directement depuis la page de configuration. Lorsque cette fonctionnalité est activée, elle remplace la configuration de la fonctionnalité `Global Job Tags`. |
| Send source control management events | Envoie le `Source Control Management Events Type` (type des événements de gestion des commandes source) des événements et métriques (fonctionnalité activée par défaut).                                                                                                         |

## Données collectées

Ce plug-in recueille les [événements](#evenements), [métriques](#metriques) et [checks de service](#checks-de-service) suivants :

### Événements

#### Type d'événement par défaut

| Nom de l'événement      | Déclenché par              | Tags par défaut                                                               | Métrique RATE associée  |
|-----------------|---------------------------|----------------------------------------------------------------------------|-------------------------|
| Build started   | `RunListener#onStarted`   | `job`, `node`, `branch`                                                    | `jenkins.job.started`   |
| Build aborted   | `RunListener#onDeleted`   | `job`, `node`, `branch`                                                    | `jenkins.job.aborted`   |
| Build completed | `RunListener#onCompleted` | `job`, `node`, `branch`, `result` (branche Git, révision SVN ou branche CVS) | `jenkins.job.completed` |

#### Type des événements de gestion des commandes source

| Nom de l'événement   | Déclenché par             | Tags par défaut            | Métrique RATE associée |
|--------------|--------------------------|-------------------------|------------------------|
| SCM checkout | `SCMListener#onCheckout` | `job`, `node`, `branch` | `jenkins.scm.checkout` |

#### Type des événements système

| Nom de l'événement                   | Déclenché par                            | Métrique RATE associée                 |
|------------------------------|-----------------------------------------|----------------------------------------|
| Computer Online              | `ComputerListener#onOnline`             | `jenkins.computer.online`              |
| Computer Offline             | `ComputerListener#onOffline`            | `jenkins.computer.online`              |
| Computer TemporarilyOnline   | `ComputerListener#onTemporarilyOnline`  | `jenkins.computer.temporarily_online`  |
| Computer TemporarilyOffline  | `ComputerListener#onTemporarilyOffline` | `jenkins.computer.temporarily_offline` |
| Computer LaunchFailure       | `ComputerListener#onLaunchFailure`      | `jenkins.computer.launch_failure`      |
| Item Created                 | `ItemListener#onCreated`                | `jenkins.item.created`                 |
| Item Deleted                 | `ItemListener#onDeleted`                | `jenkins.item.deleted`                 |
| Item Updated                 | `ItemListener#onUpdated`                | `jenkins.item.updated`                 |
| Item Copied                  | `ItemListener#onCopied`                 | `jenkins.item.copied`                  |
| ItemListener LocationChanged | `ItemListener#onLocationChanged`        | `jenkins.item.location_changed`        |
| Config Changed               | `SaveableListener#onChange`             | `jenkins.config.changed`               |

#### Type des événements de sécurité

| Nom de l'événement                  | Déclenché par                            | Métrique RATE associée       |
|-----------------------------|-----------------------------------------|------------------------------|
| User Authenticated          | `SecurityListener#authenticated`        | `jenkins.user.authenticated` |
| User failed To Authenticate | `SecurityListener#failedToAuthenticate` | `jenkins.user.access_denied` |
| User loggedOut              | `SecurityListener#loggedOut`            | `jenkins.user.logout`        |

### Métriques

| Nom de la métrique                            | Description                                                    | Tags par défaut                               |
|----------------------------------------|----------------------------------------------------------------|--------------------------------------------|
| `jenkins.computer.launch_failure`      | Taux d'échec des lancements d'ordinateur.                              |                                            |
| `jenkins.computer.offline`             | Taux d'ordinateurs en cours de déconnexion.                                |                                            |
| `jenkins.computer.online`              | Taux d'ordinateurs en cours de connexion.                                 |                                            |
| `jenkins.computer.temporarily_offline` | Taux d'ordinateurs en cours de déconnexion temporaire.                    |                                            |
| `jenkins.computer.temporarily_online`  | Taux d'ordinateurs en cours de connexion temporaire.                     |                                            |
| `jenkins.config.changed`               | Taux de configurations en cours de modification.                                 |                                            |
| `jenkins.executor.count`               | Nombre d'exécuteurs.                                                | `node_hostname`, `node_name`, `node_label` |
| `jenkins.executor.free`                | Nombre d'exécuteurs non utilisés.                                     | `node_hostname`, `node_name`, `node_label` |
| `jenkins.executor.in_use`              | Nombre d'exécuteurs inactifs.                                       | `node_hostname`, `node_name`, `node_label` |
| `jenkins.item.copied`                  | Taux d'éléments en cours de copie.                                    |                                            |
| `jenkins.item.created`                 | Taux d'éléments en cours de création.                                   |                                            |
| `jenkins.item.deleted`                 | Taux d'éléments en cours de suppression.                                   |                                            |
| `jenkins.item.location_changed`        | Taux d'éléments en cours de déplacement.                                     |                                            |
| `jenkins.item.updated`                 | Taux d'éléments en cours de mise à jour.                                   |                                            |
| `jenkins.job.aborted`                  | Taux de tâches abandonnées.                                          | `branch`, `job`, `node`                    |
| `jenkins.job.completed`                | Taux de tâches terminées.                                        | `branch`, `job`, `node`, `result`          |
| `jenkins.job.cycletime`                | Durée du cycle de conception.                                              | `branch`, `job`, `node`, `result`          |
| `jenkins.job.duration`                 | Durée de la conception (en secondes).                                   | `branch`, `job`, `node`, `result`          |
| `jenkins.job.feedbacktime`             | Durée de retour entre le commit du code et l'échec d'une tâche.                 | `branch`, `job`, `node`, `result`          |
| `jenkins.job.leadtime`                 | Délai de conception.                                               | `branch`, `job`, `node`, `result`          |
| `jenkins.job.mtbf`                     | MTBF : durée entre la dernière réussite de tâche et l'échec de la tâche actuelle. | `branch`, `job`, `node`, `result`          |
| `jenkins.job.mttr`                     | MTTR : durée entre le dernier échec de tâche et la réussite de tâche actuelle. | `branch`, `job`, `node`, `result`          |
| `jenkins.job.started`                  | Taux de tâches commencées.                                          | `branch`, `job`, `node`                    |
| `jenkins.job.waiting`                  | Délai d'attente d'exécution de la tâche (en millisecondes).           | `branch`, `job`, `node`                    |
| `jenkins.node.count`                   | Nombre total de nœuds.                                           |                                            |
| `jenkins.node.offline`                 | Nombre de nœuds hors ligne.                                           |                                            |
| `jenkins.node.online`                  | Nombre de nœuds en ligne.                                            |                                            |
| `jenkins.plugin.count`                 | Nombre de plug-ins.                                                 |                                            |
| `jenkins.project.count`                | Nombre de projets.                                                 |                                            |
| `jenkins.queue.size`                   | Taille de la file d'attente.                                                    |                                            |
| `jenkins.queue.buildable`              | Nombre d'éléments pouvant être conçus dans la file d'attente.                             |                                            |
| `jenkins.queue.pending`                | Nombre d'éléments en attente dans la file d'attente.                               |                                            |
| `jenkins.queue.stuck`                  | Nombre d'éléments coincés dans la file d'attente.                                 |                                            |
| `jenkins.queue.blocked`                | Nombre d'éléments bloqués dans la file d'attente.                               |                                            |
| `jenkins.scm.checkout`                 | Taux de basculements SCM.                                         | `branch`, `job`, `node`                    |
| `jenkins.user.access_denied`           | Taux d'échecs de l'authentification d'utilisateurs.                         |                                            |
| `jenkins.user.authenticated`           | Taux d'utilisateurs en cours d'authentification.                                  |                                            |
| `jenkins.user.logout`                  | Taux d'utilisateurs en cours de déconnexion.                                     |                                            |

### Checks de service

Le statut de conception `jenkins.job.status` dispose des tags par défaut `job`, `node`, `branch` et `result` (branche Git, révision SVN ou branche CVS).

**Remarque** : vous pouvez utiliser le tag `branch` Git à l'aide du [plug-in Git][7].

## Process de publication de versions

### Présentation

Le référentiel [jenkinsci/datadog-plugin][8] prend en charge la plupart des derniers changements apportés au plug-in Datadog, ainsi que les tickets d'incident connexes.
Les versions sont ajoutées au [référentiel Git Jenkins-CI pour le plug-in Datadog][9]. Elles représentent la source utilisée pour les versions du plug-in figurant dans l'[Update Center][3] de votre installation Jenkins.

Chaque commit dans le référentiel déclenche la pipeline d'intégration continue organisationnelle Jenkins définie dans le fichier `Jenkinsfile`, dans le dossier racine du code source.

La liste des versions disponibles figuret sur GitHub : [jenkinsci/datadog-plugin/releases][10]. 

### Comment publier une version

Pour publier une nouvelle version du plug-in Datadog :

1. Remplacez la version du projet `x.x.x-SNAPSHOT` dans le fichier [pom.xml][11] par le nouveau numéro de version de votre choix.
2. Ajoutez une entrée pour le nouveau numéro de version dans le fichier [CHANGELOG.md][12]. Veillez également à vous assurer que tous les changements sont correctement répertoriés.
3. Dupliquez le référentiel et basculez sur la branche `master`.
4. Pour les administrateurs de référentiel uniquement : déclenchez la version en exécutant la commande `mvn -DlocalCheckout=true release:prepare release:perform`.
Si la commande fonctionne, le plug-in mis à jour sera disponible sur l'[Update Center][3] de Jenkins dans un délai de 4 heures (sans oublier le délai de propagation sur les serveurs).

## Suivi des problèmes

Le système de suivi des problèmes intégré à GitHub vous permet de surveiller tous les problèmes liés à ce plug-in : [jenkinsci/datadog-plugin/issues][13].
Cependant, compte tenu du processus d'hébergement des plug-ins Jenkins, certains problèmes peuvent également être publiés sur JIRA. Vous pouvez consulter [ce problème Jenkins][14] pour vérifier comment les problèmes sont publiés.

**Remarque** : voici les [bugs non résolus sur JIRA traitant de Datadog][15].

## Changements

Consultez le fichier [CHANGELOG.md][12].

## Comment contribuer au code

Tout d'abord, **merci** de contribuer à ce projet.

Si vous souhaitez envoyer du code, dupliquez ce référentiel et envoyez vos pulls requests pour proposer une modification de la branche `master`. Pour en savoir plus, consultez les [directives de contribution][16] (en anglais) pour l'Agent Datadog.

Lisez le [document relatif au développement][17] (en anglais) pour obtenir des conseils et faire tourner un environnement de développement local rapide.

## Tests manuels

Pour surveiller les procédures de test et vous assurer que le plug-in Datadog fonctionne correctement sur Jenkins, vous disposez d'un [document de testing][17].

[1]: https://plugins.jenkins.io/datadog
[2]: http://updates.jenkins-ci.org/download/war/1.580.1/jenkins.war
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/jenkinsci/docker
[6]: https://wiki.jenkins-ci.org/display/JENKINS/Logging
[7]: https://wiki.jenkins.io/display/JENKINS/Git+Plugin
[8]: https://github.com/jenkinsci/datadog-plugin
[9]: https://github.com/jenkinsci/datadog-plugin
[10]: https://github.com/jenkinsci/datadog-plugin/releases
[11]: https://github.com/jenkinsci/datadog-plugin/blob/master/pom.xml
[12]: https://github.com/jenkinsci/datadog-plugin/blob/master/CHANGELOG.md
[13]: https://github.com/jenkinsci/datadog-plugin/issues
[14]: https://issues.jenkins-ci.org/issues/?jql=project%20%3D%20JENKINS%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20component%20%3D%20datadog-plugin%20ORDER%20BY%20updated%20DESC%2C%20priority%20DESC%2C%20created%20ASC
[15]: https://issues.jenkins-ci.org/browse/INFRA-305?jql=status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%2C%20Verified%2C%20Untriaged%2C%20%22Fix%20Prepared%22%29%20AND%20text%20~%20%22datadog%22
[16]: https://github.com/DataDog/datadog-agent/blob/master/CONTRIBUTING.md
[17]: https://github.com/jenkinsci/datadog-plugin/blob/master/CONTRIBUTING.md
