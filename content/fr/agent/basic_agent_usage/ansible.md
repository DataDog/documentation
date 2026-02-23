---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## Rôle

La collection Ansible de Datadog, `datadog.dd`, est la collection officielle des contenus Datadog liés à Ansible. Elle contient le [rôle Ansible Datadog](https://github.com/DataDog/ansible-datadog/), accessible sous le nom `datadog.dd.agent`, qui permet d'installer et de configurer l'Agent Datadog et ses intégrations. La version 7 de l'Agent est installée par défaut.

## Prérequis

- Ansible v2.10+.
- Cette collection est compatible avec la plupart des distributions Linux basées sur Debian, RHEL et SUSE, ainsi qu'avec macOS et Windows.
- Pour gérer des hosts Windows, installez la collection `ansible.windows` :

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- Lorsque vous gérez des hosts openSUSE/SLES, installez la collection `community.general` :

  ```shell
  ansible-galaxy collection install community.general
  ```

## Installation

Avant d'utiliser cette collection, installez-la avec l'outil en ligne de commande Ansible Galaxy :

```
ansible-galaxy collection install datadog.dd
```

Vous pouvez également inclure cette collection dans un fichier `requirements.yml` et l’installer avec `ansible-galaxy collection install -r requirements.yml`. Ajoutez ce qui suit dans `requirements.yml` :


```yaml
collections :
  - name : datadog.dd
```

**Remarque** : si vous installez la collection depuis Ansible Galaxy, elle ne sera pas mise à jour automatiquement lors de la mise à jour du package Ansible.
Pour mettre à jour la collection vers la dernière version disponible, exécutez la commande suivante :

```
ansible-galaxy collection install datadog.dd --upgrade
```

Vous pouvez installer une version spécifique de la collection, par exemple si vous devez revenir à une version précédente en cas de problème avec la dernière version (pensez à signaler l'incident dans ce référentiel). La syntaxe suivante montre comment installer la version 5.0.0 :

```
ansible-galaxy collection install datadog.dd:==5.0.0
```

Consultez la [documentation sur l'utilisation des collections Ansible](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html) pour plus de détails.

La collection Ansible de Datadog est également disponible via le [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), où elle est officiellement certifiée par Red Hat.

## Cas d'utilisation

Pour déployer l'Agent Datadog sur des hosts, ajoutez le rôle Datadog et votre clé d'API à votre playbook :

``yaml
- hosts : serveurs
  tasks :
    - name : Import the Datadog Agent depuis la collection Datadog 
      import_role :
        name : datadog.dd.agent
  vars :
    datadog_api_key : "<YOUR_DD_API_KEY>"
```

**Remarque** : si vous installez la collection via Ansible Automation Hub, la compatibilité avec openSUSE/SLES dépend de la collection communautaire `community.general`. Le support Red Hat ne couvre pas les problèmes liés au contenu communautaire. Adressez toutes les demandes de support concernant openSUSE/SLES à [l'assistance Datadog][1].


## Effectuer des tests

La collection Datadog est testée sur CentOS, Debian, Rocky Linux, openSUSE, Windows et macOS. Les tests sont effectués avec la dernière version de `ansible-lint`, et les vérifications de compatibilité sont réalisées avec Python 3.9 à Python 3.12.

## Assistance

Si vous avez besoin d'aide, vous pouvez créer un ticket dans le dépôt GitHub `ansible-collections`, ou contacter l'[assistance Datadog][1].

## Notes de version

Vous pouvez suivre les modifications dans le fichier [CHANGELOG][2].

## Pour aller plus loin

- [Automatiser l'installation de l'Agent avec la collection Ansible de Datadog][6]
- Rôle de la collection : `datadog.dd.agent` : installation et configuration de l'Agent Datadog.
  - Consultez la [documentation officielle du rôle][3].
  - Consultez le [référentiel du rôle autonome][4].

## Informations sur la licence

La collection Ansible de Datadog est publiée sous la [licence Apache 2.0][5].

[1]: https://docs.datadoghq.com/fr/help/
[2]: https://github.com/ansible-collections/Datadog/blob/main/CHANGELOG.rst
[3]: https://docs.datadoghq.com/fr/agent/guide/ansible_standalone_role/#setup
[4]: https://github.com/DataDog/ansible-datadog#readme
[5]: https://github.com/ansible-collections/Datadog/blob/main/LICENSE
[6]: https://www.datadoghq.com/blog/datadog-ansible-collection/