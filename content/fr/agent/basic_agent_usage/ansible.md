---
dependencies:
  - 'https://github.com/DataDog/ansible-datadog/blob/master/README.md'
kind: documentation
title: Ansible
---
Le rôle Ansible pour Datadog permet d'installer et de configurer l'Agent et les intégrations Datadog. La version `4` du rôle installe l'Agent Datadog v7 par défaut.

## Configuration

### Prérequis

- La version 2.6 ou une version ultérieure d'Ansible est requise.
- Prend en charge la plupart des distributions Linux basées sur Debian et RHEL, ainsi que Windows.

### Installation

Installez le [rôle Datadog][1] depuis Ansible Galaxy sur votre serveur Ansible :

```shell
ansible-galaxy install datadog.datadog
```

Pour déployer l'Agent Datadog sur des hosts, ajoutez le rôle Datadog et votre clé d'API à votre playbook :

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<VOTRE_CLÉ_API_DD>"
```

#### Variables de rôle

| Variable                                   | Description                                                                                                                                                                                                                                                                                               |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                          | Votre clé d'API Datadog.                                                                                                                                                                                                                                                                                     |
| `datadog_site`                             | Le site de Datadog vers lequel envoyer les données de l'Agent. Par défaut, cette variable est définie sur `datadoghq.com` ; définissez-la sur `datadoghq.eu` pour envoyer les données vers le site européen. Cette option n'est disponible qu'à partir de la version 6.6.0 de l'Agent.                                                                                                          |
| `datadog_agent_version`                    | La version imposée de l'Agent à installer (facultatif, mais conseillé). Exemple : `7.16.0`. Il n'est pas nécessaire de définir `datadog_agent_major_version` si `datadog_agent_version` est utilisé. **Remarque** : les passages à une version antérieure ne sont pas pris en charge sur les plateformes Windows.                                                       |
| `datadog_agent_major_version`              | La version majeure de l'Agent à installer. Les valeurs possibles sont 5, 6, ou 7 (par défaut). Si la variable `datadog_agent_version` est définie, celle-ci est appliquée en priorité. Sinon, la dernière version de la version majeure indiquée est installée. Il n'est pas nécessaire de définir `datadog_agent_major_version` si `datadog_agent_version` est utilisé. |
| `datadog_checks`                           | Emplacement de la configuration YAML pour les checks de l'Agent : <br> - `/etc/datadog-agent/conf.d/<nom_check>.d/conf.yaml` pour les Agents v6 et v7, <br> - `/etc/dd-agent/conf.d` pour l'Agent v5.                                                                                                                            |
| `datadog_config`                           | Paramètres du fichier de configuration principal de l'Agent : <br> - `/etc/datadog-agent/datadog.yaml` pour les Agents v6 et v7,<br> - `/etc/dd-agent/datadog.conf` pour l'Agent v5 (section `[Main]`).                                                                                                               |
| `datadog_config_ex`                        | (Facultatif) Sections INI supplémentaires à ajouter dans `/etc/dd-agent/datadog.conf` (Agent v5 uniquement).                                                                                                                                                                                                                      |
| `datadog_apt_repo`                         | Remplace le référentiel `apt` de Datadog par défaut.                                                                                                                                                                                                                                                            |
| `datadog_apt_cache_valid_time`             | Remplace le délai d'expiration du cache apt par défaut (valeur par défaut : 1 heure).                                                                                                                                                                                                                                      |
| `datadog_apt_key_url_new`                  | Remplace l'URL par défaut vers la clé `apt` de Datadog (ID de clé `382E94DE` ; la variable obsolète `datadog_apt_key_url` correspond à une clé expirée qui a été supprimée du rôle).                                                                                                                             |
| `datadog_yum_repo`                         | Remplace le référentiel `yum` par défaut de Datadog.                                                                                                                                                                                                                                                            |
| `datadog_yum_gpgkey`                       | Remplace l'URL par défaut vers la clé `yum` de Datadog utilisée pour vérifier les packages des Agents v5 et v6 (jusqu'à la version 6.13) (ID de clé `4172A230`).                                                                                                                                                                               |
| `datadog_yum_gpgkey_e09422b3`              | Remplace l'URL par défaut vers la clé `yum` de Datadog utilisée pour vérifier les packages de l'Agent v6.14+ (ID de clé `E09422B3`).                                                                                                                                                                                               |
| `datadog_yum_gpgkey_e09422b3_sha256sum`    | Remplace le checksum par défaut de la clé `datadog_yum_gpgkey_e09422b3`.                                                                                                                                                                                                                                   |
| `datadog_zypper_repo`                      | Remplace le référentiel `zypper` par défaut de Datadog.                                                                                                                                                                                                                                                         |
| `datadog_zypper_gpgkey`                    | Remplace l'URL par défaut vers la clé `zypper` de Datadog utilisée pour vérifier les packages des Agents v5 et v6 (jusqu'à la version 6.13) (ID de clé `4172A230`).                                                                                                                                                                            |
| `datadog_zypper_gpgkey_sha256sum`          | Remplace le checksum par défaut de la clé `datadog_zypper_gpgkey`.                                                                                                                                                                                                                                         |
| `datadog_zypper_gpgkey_e09422b3`           | Remplace l'URL par défaut vers la clé `zypper` de Datadog utilisée pour vérifier les packages de l'Agent v6.14+ (ID de clé `E09422B3`).                                                                                                                                                                                            |
| `datadog_zypper_gpgkey_e09422b3_sha256sum` | Remplace le checksum par défaut de la clé `datadog_zypper_gpgkey_e09422b3`.                                                                                                                                                                                                                                |
| `datadog_agent_allow_downgrade`            | Définir sur `yes` pour permettre les passages à une version antérieure de l'Agent sur les plateformes basées sur apt (à utiliser prudemment, voir `defaults/main.yml` pour en savoir plus). **Remarque** : sous CentOS, cette variable ne fonctionne qu'avec Ansible 2.4+.                                                                                                                             |
| `use_apt_backup_keyserver`                 | Définir sur `true` pour utiliser le serveur de clés de secours au lieu du serveur par défaut.                                                                                                                                                                                                                                     |
| `datadog_enabled`                          | Définir sur `false` pour empêcher le service `datadog-agent` de démarrer (valeur par défaut : `true`).                                                                                                                                                                                                                     |
| `datadog_additional_groups`                | Liste ou chaîne contenant une liste de groupes supplémentaires séparés par des virgules pour `datadog_user` (Linux uniquement).                                                                                                                                                                                    |
| `datadog_windows_ddagentuser_name`         | Le nom de l'utilisateur Windows à créer/utiliser, au format `<domaine>\<utilisateur>` (Windows uniquement).                                                                                                                                                                                                                   |
| `datadog_windows_ddagentuser_password`     | Le mot de passe utilisé pour créer l'utilisateur et/ou enregistrer le service (Windows uniquement).                                                                                                                                                                                                                          |

### Intégrations

Pour configurer une intégration Datadog (un check), ajoutez une entrée dans la section `datadog_checks`. La clé de premier niveau est le nom du check, et la valeur est la charge utile YAML pour écrire le fichier de configuration. Des exemples sont fournis ci-dessous.

#### Check de processus

Afin de définir deux instances pour le check `process`, utilisez la configuration ci-dessous. Les fichiers de configuration correspondants sont alors créés :

* Agents v6 et v7 : `/etc/datadog-agent/conf.d/process.d/conf.yaml`
* Agent v5 : `/etc/dd-agent/conf.d/process.yaml`

```yml
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

#### Check custom

Pour configurer un check custom, utilisez la configuration ci-dessous. Les fichiers de configuration correspondants sont alors créés :

- Agents v6 et v7 : `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- Agent v5 : `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

#### Autodiscovery

Lorsque vous utilisez Autodiscovery, aucun pré-processing ou post-processing n'est effectué sur le fichier YAML. Cela signifie que chaque section du fichier YAML est ajoutée au fichier de configuration final, y compris `autodiscovery identifiers`.

L'exemple ci-dessous permet de configurer le check PostgreSQL via **Autodiscovery** :

```yml
    datadog_checks:
      postgres:
        ad_identifiers:
          - db-master
          - db-slave
        init_config:
        instances:
          - host: %%host%%
            port: %%port%%
            username: nomutilisateur
            password: motdepasse
```

En savoir plus sur [Autodiscovery dans la documentation Datadog][3].

### Tracing

Pour activer la collecte de traces avec l'Agent v6 ou v7, utilisez la configuration suivante :

```yaml
datadog_config:
  apm_config:
    enabled: true
```

Pour activer la collecte de traces avec l'Agent v5, utilisez la configuration suivante :

```yaml
datadog_config:
  apm_enabled: "true" # doit être une chaîne
```

### Live Processes

Pour activer la collecte de [live processes][6] avec l'Agent v6 ou v7, utilisez la configuration suivante :

```yml
datadog_config:
  process_config:
    enabled: "true" # type: chaîne
```

Les valeurs possibles pour `enabled` sont : `"true"`, `"false"` (collecte des conteneurs uniquement) ou `"disabled"` (désactivation totale des live processes).

#### Variables

Voici la liste des variables disponibles pour les live processes :

* `scrub_args` : active le nettoyage des arguments sensibles dans les lignes de commande d'un processus (valeur par défaut :`true`).
* `custom_sensitive_words` : permet d'élargir la liste des mots sensibles par défaut utilisés pour le nettoyage des lignes de commande.

#### System Probe

Le system probe [Surveillance des performances réseau][7] (NPM) est configuré sous la variable `system_probe_config`. Toutes les variables de niveau inférieur imbriquées sont enregistrées dans le fichier `system-probe.yaml`.

**Remarque** : le system probe ne fonctionne que sous Linux avec l'Agent v6+.

#### Exemple de configuration

```yml
datadog_config:
  process_config:
    enabled: "true" # type : chaîne
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  enabled: true
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
```

Une fois la modification terminée, suivez les étapes ci-dessous :

1. Démarrez le system-probe : `sudo service datadog-agent-sysprobe start`. **Remarque** : si le wrapper de service n'est pas disponible sur votre système, exécutez plutôt la commande suivante : `sudo initctl start datadog-agent-sysprobe`.
2. [Redémarrez l'Agent][8] : `sudo service datadog-agent restart`.
3. Configurez le system-probe afin qu'il se lance au démarrage : `sudo service enable datadog-agent-sysprobe`.

Pour la configuration manuelle, reportez-vous à la documentation relative à la [Surveillance des performances réseau][9].

#### Agent v5

Pour activer la collecte de [live processes][6] avec l'Agent v5, utilisez la configuration suivante :

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<PREMIER_MOT>,<DEUXIÈME_MOT>"
```

### Tâches supplémentaires

Les dossiers `pre_tasks` et `post_tasks` peuvent être utilisés pour exécuter des tâches définies par l'utilisateur. Les tâches `pre_tasks` sont exécutées avant les tâches du rôle Ansible pour Datadog, tandis que les tâches `post_tasks` sont exécutées après les tâches du rôle.

Les tâches d'installation sur les plateformes prises en charge enregistrent la variable `datadog_agent_install`, qui peut être utilisée dans `post_tasks` pour vérifier le résultat de la tâche d'installation. La variable `datadog_agent_install.changed` est définie sur `true` si la tâche d'installation s'est bien déroulée avec succès, et sur `false` dans le cas contraire (par exemple, si la version demandée était déjà installée).

## Versions

Par défaut, la version majeure actuelle du rôle Ansible pour Datadog installe l'Agent v7. Les variables `datadog_agent_version` et `datadog_agent_major_version` sont disponibles pour contrôler la version de l'Agent installée.

Dans les versions 4+ de ce rôle, lorsque `datadog_agent_version` est utilisée pour imposer une version spécifique de l'Agent, le rôle attribue un nom de version spécifique à chaque système d'exploitation pour se conformer aux formats appliqués par les systèmes d'exploitation pris en charge. Par exemple :

- `1:7.16.0-1` pour Debian et SUSE
- `7.16.0-1` pour Redhat
- `7.16.0` pour Windows

Il est ainsi possible de cibler des hosts fonctionnant sous différents systèmes d'exploitation dans la même exécution Ansible, par exemple :

| Version spécifiée                            | Installe     | Système                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian et SUSE |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | Redhat          |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian et SUSE |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | Redhat          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**Remarque** : si aucune version n'est spécifiée, le rôle utilise `1` comme epoch et `1` comme numéro de version.

**Agent v5 (ancienne version)** :

Le rôle Ansible pour Datadog prend en charge l'Agent v5 de Datadog sous Linux uniquement. Pour installer l'Agent v5, utilisez `datadog_agent_major_version: 5` pour installer la dernière version de l'Agent v5 ou définissez `datadog_agent_version` sur une version spécifique de l'Agent v5. **Remarque** : la variable `datadog_agent5` est obsolète et a été supprimée.

### Référentiels

#### Linux

Lorsque les variables `datadog_apt_repo`, `datadog_yum_repo` et `datadog_zypper_repo` ne sont pas définies, les référentiels officiels de Datadog pour la version majeure définie dans `datadog_agent_major_version` sont utilisés :

| # | Référentiel apt par défaut                    | Référentiel yum par défaut             | Référentiel zypper par défaut               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

Pour remplacer le comportement par défaut, définissez ces variables sur autre chose qu'une chaîne vide.

Si vous avez déjà utilisé les variables de l'Agent v5, utilisez les **nouvelles** variables ci-dessous avec `datadog_agent_major_version` définie sur `5` ou `datadog_agent_version` définie sur une version spécifique de l'Agent v5.

| Ancienne                          | Nouvelle                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

#### Windows

Lorsque la variable `datadog_windows_download_url` n'est pas définie, le package MSI officiel pour Windows correspondant à `datadog_agent_major_version` est utilisé :

| Version | URL par défaut du package MSI Windows                                                  |
|---|----------------------------------------------------------------------------------|
| 6 | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7 | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

Pour remplacer le comportement par défaut, définissez cette variable sur autre chose qu'une chaîne vide.

### Passer à une version supérieure

Pour passer de l'Agent v6 à l'Agent v7, utilisez `datadog_agent_major_version: 7` pour installer la dernière version ou définissez `datadog_agent_version` sur une version spécifique de l'Agent v7. Utilisez la même logique pour passer de l'Agent v5 à l'Agent v6.

#### Intégrations

**Disponible pour l'Agent v6.8+**

Utilisez la ressource `datadog_integration` pour installer une version spécifique d'une intégration Datadog. Gardez à l'esprit que toutes les intégrations sont déjà installées dans l'Agent. Cette commande est utile pour mettre à jour une intégration spécifique sans mettre à jour l'Agent entier. Pour en savoir plus, consultez [Gestion des intégrations][4].

Actions disponibles :

- `install` : installe une version spécifique de l'intégration.
- `remove` : supprime une intégration.

##### Syntaxe

```yml
  datadog_integration:
    <NOM_INTÉGRATION>:
      action: <ACTION>
      version: <VERSION_À_INSTALLER>
```

Pour installer des intégrations tierces, définissez le paramètre `third_party` sur `true` :

```yml
  datadog_integration:
    <NOM_INTÉGRATION>:
      action: <ACTION>
      version: <VERSION_À_INSTALLER>
      third_party: true
```

##### Exemple

Cet exemple installe la version `1.11.0` de l'intégration ElasticSearch et supprime l'intégration `postgres`.

```yml
 datadog_integration:
   datadog-elastic:
     action: install
     version: 1.11.0
   datadog-postgres:
     action: remove
```

Pour obtenir la liste des versions disponibles pour une intégration Datadog, consultez son fichier `CHANGELOG.md` dans le [référentiel integrations-core][5].

### Passer à une version antérieure

Pour passer à une version antérieure de l'Agent :

1. Définissez `datadog_agent_version` sur une version spécifique, par exemple : `5.32.5`.
2. Définissez `datadog_agent_allow_downgrade` sur `yes`.

**Remarques :**

- Les passages à une version antérieure ne sont pas pris en charge sur les plateformes Windows.

## Playbooks

Vous trouverez ci-dessous quelques exemples de playbooks afin de vous aider à utiliser le rôle Ansible pour Datadog.

L'exemple suivant envoie des données au site américain de Datadog (par défaut), active les logs et configure quelques checks.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<VOTRE_CLÉ_API_DD>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # disponible avec l'Agent v6 et v7
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd' ]
          - name: syslog
            search_string: ['rsyslog' ]
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
      ssh_check:
        init_config:
        instances:
          - host: localhost
            port: 22
            username: root
            password: <VOTRE_MOTDEPASSE>
            sftp_check: True
            private_key_file:
            add_missing_keys: True
      nginx:
        init_config:
        instances:
          - nginx_status_url: http://example.com/nginx_status/
            tags:
              - "source:nginx"
              - "instance:foo"
          - nginx_status_url: http://example2.com:1234/nginx_status/
            tags:
              - "source:nginx"
              - "<KEY>:<VALUE>"

        #La collecte de logs est disponible dans l'Agent v6 et v7
        logs:
          - type: file
            path: /var/log/access.log
            service: myapp
            source: nginx
            sourcecategory: http_web_access
          - type: file
            path: /var/log/error.log
            service: nginx
            source: nginx
            sourcecategory: http_web_access
    # datadog_integration est disponible dans l'Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    system_probe_config:
      enabled: true
```

### Agent v6

Cet exemple installe la dernière version de l'Agent v6 :

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<VOTRE_CLÉ_API_DD>"
```

### Configuration du site

Si vous utilisez un site autre que le site par défaut `datadoghq.com`, définissez la variable `datadog_site` sur l'URL appropriée (par exemple : `datadoghq.eu`, `us3.datadoghq.com`).

Cet exemple envoie les données au site européen :

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<VOTRE_CLÉ_API_DD>"
```

### Windows

Sous Windows, l'option `become: yes` doit être supprimée car elle fera échouer le rôle. Vous trouverez ci-dessous deux méthodes pour faire fonctionner les exemples de playbooks sur les hosts Windows :

#### Fichier d'inventaire

L'utilisation du fichier d'inventaire est la méthode conseillée. Définissez l'option `ansible_become` sur `no` dans le fichier d'inventaire pour chaque host Windows :

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

Pour éviter de devoir définir cette option pour chaque host Windows, regroupez les hosts et définissez la variable au niveau du groupe :

```ini
[linux]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2

[windows]
windows1 ansible_host=127.0.0.3
windows2 ansible_host=127.0.0.4

[windows:vars]
ansible_become=no
```

#### Fichier playbook

Si votre playbook **est uniquement exécuté des hosts Windows**, utilisez ce qui suit dans le fichier playbook :

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**Remarque** : cette configuration ne fonctionne pas sur les hosts Linux. Utilisez-la uniquement si le playbook est spécifique aux hosts Windows. Sinon, utilisez la [méthode du fichier d'inventaire] (#fichier-d-inventaire).

## Dépannage

### Debian Stretch

Sous Debian Stretch, le module `apt_key` utilisé par le rôle nécessite une dépendance système supplémentaire pour fonctionner correctement. Cette dépendance (`dirmngr`) n'est pas fournie par le module. Ajoutez la configuration suivante à vos playbooks pour utiliser le rôle présent :

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch nécessite le package dirmngr pour utiliser apt_key
      become: yes
      apt:
        name: dirmngr
        state: present

  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<VOTRE_CLÉ_API_DD>"
```

### Windows

En raison d'un bug critique dans les versions `6.14.0` et `6.14.1` de l'Agent pour Windows, l'installation de ces versions est désormais bloquée (à partir de la version `3.3.0` de ce rôle).

**REMARQUE :** Ansible ne fonctionnera pas sous Windows si `datadog_agent_version` est définie sur `6.14.0` ou `6.14.1`. Utilisez `6.14.2` ou une version ultérieure.

Si vous effectuez une mise à jour à partir de la version **6.14.0 ou 6.14.1 sous Windows**, suivez les étapes ci-dessous :

1. Mettez à jour le rôle Ansible `datadog.datadog` actuel vers la dernière version (`>=3.3.0`).
2. Définissez la variable `datadog_agent_version` sur `6.14.2` ou une version ultérieure (la dernière version est utilisée par défaut).

Pour en savoir plus, consultez la page [Bug critique lors de la désinstallation des versions 6.14.0 et 6.14.1 de l'Agent sous Windows][10].

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery
[4]: https://docs.datadoghq.com/fr/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/fr/infrastructure/process/
[7]: https://docs.datadoghq.com/fr/network_performance_monitoring/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[9]: https://docs.datadoghq.com/fr/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://app.datadoghq.com/help/agent_fix
