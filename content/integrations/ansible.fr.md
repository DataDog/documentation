---
categories:
- provisioning
- orchestration
- configuration & deployment
ddtype: crawler
description: Effectuer le suivi des tâches ayant échoué et consulter les exécutions de playbook dans votre flux d'événements.
doc_link: https://docs.datadoghq.com/integrations/ansible/
git_integration_title: ansible
has_logo: true
integration_title: Ansible
is_public: true
kind: integration
manifest_version: '1.0'
name: ansible
public_title: Intégration Datadog-Ansible
short_description: Effectuer le suivi des tâches ayant échoué et consulter les exécutions de playbook dans votre flux d'événements.
version: '1.0'
---

{{< img src="integrations/ansible/ansibledashboard.png" alt="ansible dashbaord" responsive="true" >}}

## Aperçu

Installez l'intégration de callback Datadog-Ansible pour:

* Obtenir des rapports en temps réel sur les exécutions du Ansible
* Suivre les métriques clés de performance Ansible sur tous vos serveurs
* Identifier et discuter rapidement des échecs d'Ansible avec votre équipe

Pour encore plus d'informations sur l'utilisation de notre intégration avec Ansible, lisez [ce post sur notre blog][1].

## Implémentation
### Installation

1.  Assurez-vous que les bibliothèques python pré-requises sont installées sur le serveur :

    * datadogpy
    * pyyaml (install with pip install pyyaml)

1.  Cloner le [référentiel Git ansible-datadog-callback][2].
1.  Copiez datadog_callback.py dans votre répertoire « playbook callback » (callback_plugins/ dans le répertoire de base par défaut). Créez le répertoire s'il n'existe pas.
1.  Créez un fichier datadog_callback.yml à côté de datadog_callback.py et peuplez les contenus avec votre clé API, comme le suivant :

        api_key: <your-api-key>

1.  Vous devriez commencer à voir les évènements et les statistiques Ansible apparaître dans Datadog lorsque votre playbook est exécuté.

Afin d'installer l'Agent Datadog en utilisant Ansible, consultez la [documentation d'installation][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "ansible" >}}


### Evénements
L'intégration Ansible n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration Ansible n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][5].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog dans [notre blog][6]


[1]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[2]: https://github.com/datadog/ansible-datadog-callback
[3]: https://app.datadoghq.com/account/settings#agent/ansible
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/ansible/ansible_metadata.csv
[5]: http://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/

