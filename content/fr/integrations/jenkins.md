---
integration_title: Jenkins
name: jenkins
kind: integration
git_integration_title: jenkins
newhlevel: true
description:
is_public: true
public_title: Intégration Datadog/Jenkins
short_description: "Surveillez le statut des tâches et consultez les démarrages et interruptions de builds dans votre flux d'événements."
categories:
- configuration & deployment
---

{{< img src="integrations/jenkins/integration-jenkins-overview.png" alt="Plugin Jenkins" >}}

## Présentation

Ce plug-in Jenkins envoie vos événements de build et de déploiement à Datadog. Vous pouvez alors les superposer sur les graphiques de vos autres métriques afin d'identifier les déploiements qui ont un réel impact sur les performances et la fiabilité de votre application, qu'il soit positif ou négatif.

Le plug-in permet également de suivre les durées (en tant que métrique) et les statuts (en tant que check de service) de build, pour être informé de la santé globale de vos builds.

<div class="alert alert-info">
Le check Jenkins de l'Agent Datadog est obsolète. Utilisez le <a href="https://github.com/DataDog/jenkins-datadog-plugin">plug-in Jenkins</a>.
</div>

## Installation

_Ce plug-in nécessite [Jenkins 1.580.1][1] ou une version ultérieure._

Installez [ce plug-in][2] depuis le [Centre de mise à jour][3] (disponible en accédant à **Gérer Jenkins** -> **Gérer les plug-ins**) dans votre installation Jenkins.

1. Accédez à l'interface Web de votre installation Jenkins.

2. Depuis le [Centre de mise à jour][4] (disponible en accédant à Gérer Jenkins -> Gérer les plug-ins), sous l'onglet Disponible, accédez à la section **Plug-in Datadog**.

3. Cochez la case à côté du plug-in et installez-le en cliquant sur l'un des deux boutons en bas de l'écran.

4. Pour configurer le plug-in, accédez à la page **Gérer Jenkins** -> **Configurer le système** et consultez la section *Plug-in Datadog*.

5. Copiez votre clé d'API depuis la page [API Keys][5] de votre compte Datadog et colle-la dans la zone de texte `Clé API` de l'écran de configuration.

6. Avant d'enregistrer votre configuration, testez votre connexion à l'API en cliquant sur le bouton *Tester la clé*, directement sous la zone de texte `API Key`.

7. Redémarrez Jenkins pour activer le plugin.

8. Facultatif : définissez un hostname personnalisé.
Vous pouvez définir un hostname personnalisé pour votre host Jenkins dans la zone de texte Hostname du même écran de configuration. Remarque : le hostname doit respecter le format de la norme [RFC 1123][6].

## Configuration

Aucune étape de configuration n'est requise pour cette intégration.

## Validation

Dès que le plug-in est fonctionnel, des événements Jenkins sont envoyés au flux d'événements.

## Métriques

Les métriques suivantes sont disponibles dans Datadog :

| Nom de la métrique            | Description                                    |
|:-----------------------|:-----------------------------------------------|
| `jenkins.queue.size`   | (Gauge) Taille de votre file d'attente Jenkins             |
| `jenkins.job.waiting`  | (Gauge) Temps d'attente d'une tâche en secondes |
| `jenkins.job.duration` | (Gauge) Durée d'une tâche en secondes           |

## Événements

Les événements suivants sont générés par le plug-in :

* Started build
* Finished build

## Checks de service

* `jenkins.job.status` :  statut du build

[1]: http://updates.jenkins-ci.org/download/war/1.580.1/jenkins.war
[2]: https://github.com/jenkinsci/datadog-plugin
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://wiki.jenkins.io/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://tools.ietf.org/html/rfc1123#section-2
