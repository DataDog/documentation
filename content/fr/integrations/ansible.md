---
categories:
  - provisioning
  - orchestration
  - configuration & deployment
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez les tâches ayant échoué et consultez les exécutions de playbook dans votre flux d'événements.
doc_link: https://docs.datadoghq.com/integrations/ansible/
draft: false
git_integration_title: ansible
has_logo: true
integration_id: ansible
integration_title: Ansible
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: ansible
public_title: Intégration Datadog/Ansible
short_description: Surveillez les tâches ayant échoué et consultez les exécutions de playbook dans votre flux d'événements.
version: '1.0'
---
{{< img src="integrations/ansible/ansibledashboard.png" alt="Dashboard Ansible" popup="true">}}

## Présentation

Installez l'intégration de rappel Datadog/Ansible pour :

- Obtenir des rapports en temps réel sur les exécutions de serveur Ansible
- Surveiller des métriques clés de performance d'Ansible sur tous vos serveurs
- Identifier rapidement les exécutions Ansible ayant échoué et en discuter avec votre équipe

Pour obtenir davantage d'informations sur l'utilisation des intégrations Datadog avec Ansible, lisez l'article de blog [Ansible et Datadog : surveillez votre automatisation et automatisez votre surveillance][1] (en anglais).

## Configuration

### Installation

1. Assurez-vous que les bibliothèques Python pré-requises sont installées sur le serveur :

    - datadogpy
    - pyyaml (installer avec `pip install pyyaml`)
    - Pour les utilisateurs Mac OS X : si vous utilisez la version 2.7.10 ou une version antérieure de Python installée sur l'OS, installez une version plus récente d'OpenSSL avec `pip install pyopenssl idna`.

2. Dupliquez le [référentiel GitHub ansible-datadog-callback][2].
3. Copiez `datadog_callback.py` dans votre répertoire de rappel de playbook (par défaut, callback_plugins/ dans le répertoire racine de votre playbook). Créez ce répertoire s'il n'existe pas.
4. Créez un fichier `datadog_callback.yml` dans le même répertoire que `datadog_callback.py` et définissez son contenu avec votre clé d'API tel que suit :


        api_key: <VOTRE_CLÉ_API_DATADOG>


5. Les événements et les métriques Ansible apparaissent dans Datadog après l'exécution de votre playbook.

Pour installer l'Agent Datadog en utilisant Ansible, consultez les [instructions d'installation de l'Agent][3].

### Collecte de logs

Consultez l'[exemple de playbook][4] pour découvrir comment installer l'Agent Datadog en activant la collecte de logs via Ansible.

## Données collectées

### Métriques
{{< get-metrics-from-git "ansible" >}}


### Événements

L'intégration [ansible-datadog-callback][2] capture les événements Ansible issus des exécutions de votre playbook.

### Checks de service

L'intégration Ansible n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring
[2]: https://github.com/datadog/ansible-datadog-callback
[3]: https://app.datadoghq.com/account/settings#agent/ansible
[4]: https://github.com/DataDog/ansible-datadog#example-playbooks
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/ansible/ansible_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/