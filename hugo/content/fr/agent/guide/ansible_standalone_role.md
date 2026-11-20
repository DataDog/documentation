---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
title: Configurer Ansible avec un rôle Datadog autonome
---
Le rôle Datadog Agent Ansible installe et configure Datadog Agent et les intégrations.

## Rôle Ansible ou collection Ansible

Le rôle Ansible de l'Agent Datadog est disponible via 2 canaux différents :

* Dans le cadre de la collection Datadog, accessible sous le nom [datadog.dd](https://galaxy.ansible.com/ui/repo/published/datadog/dd/) sur Ansible Galaxy (recommandé).
* En tant que rôle autonome, accessible sous le nom [datadog.datadog](https://galaxy.ansible.com/ui/standalone/roles/DataDog/datadog/) sur Ansible Galaxy (version héritée).

La version `4` du rôle et la version `5` de la collection installent l'Agent Datadog v7 par défaut.

La version `5` du rôle et la version `6` de la collection ne prennent plus en charge Python 2, l'Agent 5 ou les versions d'Ansible antérieures à la version 2.10. Elles ne prennent également plus en charge les anciennes versions d'Amazon Linux 2 et de CentOS. 

## Configuration

Notez que les instructions d'installation de ce document décrivent l'installation du rôle Datadog autonome. Pour obtenir les instructions d'installation de la collection Datadog, consultez le [fichier README de la collection](https://github.com/ansible-collections/Datadog/blob/main/README.md). Les variables de configuration sont les mêmes pour le rôle autonome et pour le rôle accessible via la collection.

### Prérequis

- Nécessite Ansible v2.10+.
- Prend en charge la plupart des distributions Linux basées sur Debian et RHEL, macOS, ainsi que Windows.
- Nécessite l'installation de la collection `ansible.windows` :

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
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
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

La clé d'API est obligatoire et son absence entraîne l'échec du rôle. Si vous souhaitez la fournir autrement, en dehors du contrôle d'Ansible, spécifiez une clé générique et remplacez-la ultérieurement.

## Variables de rôle

Ces variables fournissent une configuration supplémentaire lors de l'installation de l'Agent Datadog. Elles doivent être spécifiées dans la section `vars` de votre playbook.

| Variable                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                           | Votre clé d'API Datadog. **Cette variable est obligatoire à partir de la version 4.21**.|
| `datadog_site`                              | Le site de Datadog vers lequel envoyer les données de l'Agent. Par défaut, cette variable est définie sur `datadoghq.com` ; définissez-la sur `datadoghq.eu` pour envoyer les données vers le site européen. Cette option n'est disponible qu'à partir de la version 6.6.0 de l'Agent.|
| `datadog_agent_flavor`                      | Remplacez le package Debian/RedHat par défaut pour les installations IOT sur RPI. Valeur par défaut : datadog-agent. Utilisez datadog-iot-agent pour RPI.|
| `datadog_agent_version`                     | Version épinglée de l'Agent à installer (facultatif, mais recommandé), par exemple : `7.16.0`. Il n'est pas nécessaire de définir `datadog_agent_major_version` si `datadog_agent_version` est utilisé.|
| `datadog_agent_major_version`               | La version majeure de l'Agent à installer. Les valeurs possibles sont 6 ou 7 (par défaut). Si la variable `datadog_agent_version` est définie, celle-ci est appliquée en priorité. Sinon, la dernière version de la version majeure indiquée est installée. Il n'est pas nécessaire de définir `datadog_agent_major_version` si `datadog_agent_version` est utilisé.|
| `datadog_checks`                            | Configuration YAML des checks de l'Agent à déposer dans : <br> - `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` pour l'Agent v6 et v7.|
| `datadog_disable_untracked_checks`          | Définissez cette variable sur `true` pour supprimer tous les checks qui ne se trouvent pas dans `datadog_checks` et `datadog_additional_checks`.|
| `datadog_additional_checks`                 | La liste des checks supplémentaires qui ne sont pas supprimés si `datadog_disable_untracked_checks` est défini sur `true`.|
| `datadog_disable_default_checks`            | Définissez cette variable sur `true` pour supprimer tous les checks par défaut.|
| `datadog_config`                            | Définissez la configuration de l'Agent Datadog. Le rôle crée la configuration dans [la localisation exacte en fonction du système d'exploitation](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file). Pour connaître toutes les options de configuration, consultez [le fichier modèle `datadog.yaml` dans le référentiel GitHub datadog-agent](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml).|
| `datadog_config_ex`                         | (Facultatif) Sections INI supplémentaires à ajouter dans `/etc/dd-agent/datadog.conf` (Agent v5 uniquement).|
| `datadog_apt_repo`                          | Remplace le référentiel `apt` par défaut de Datadog. Veillez à utiliser l'option `signed-by` si les métadonnées du référentiel sont signées à l'aide des clés de signature de Datadog : `deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`.|
| `datadog_apt_cache_valid_time`              | Remplace le délai d'expiration du cache apt par défaut (valeur par défaut : 1 heure).|
| `datadog_apt_key_url_new`                   | Remplace l'emplacement à partir duquel la clé `apt` Datadog est récupérée (la variable `datadog_apt_key_url` obsolète fait référence à une clé expirée qui a été supprimée de ce rôle). L'URL doit être un porte-clés GPG contenant les clés `382E94DE`, `F14F620E` et `C0962C7D`.|
| `datadog_yum_repo_config_enabled`           | La valeur `false` empêche la configuration d'un référentiel Datadog `yum` (la valeur par défaut est `true`). ATTENTION : cela désactive la mise à jour automatique des clés GPG.|
| `datadog_yum_repo`                          | Remplace le référentiel `yum` par défaut de Datadog.|
| `datadog_yum_repo_proxy`                    | Définit une URL de proxy à utiliser dans la configuration du référentiel `yum` Datadog.|
| `datadog_yum_repo_proxy_username`           | Définit un nom d'utilisateur de proxy à utiliser dans la configuration du référentiel `yum` Datadog.|
| `datadog_yum_repo_proxy_password`           | Définit un mot de passe de proxy à utiliser dans la configuration du référentiel `yum` Datadog.|
| `datadog_yum_repo_gpgcheck`                 | Remplace la valeur par défaut de `repo_gpgcheck` (vide). Si elle est vide, la valeur est dynamiquement fixée à `yes` lorsque la valeur personnalisée `datadog_yum_repo` n'est pas utilisée et si le système n'est pas RHEL/CentOS 8.1 (en raison d'un [bogue](https://bugzilla.redhat.com/show_bug.cgi?id=1792506) dans dnf), sinon elle est définie sur `no`. |
| `datadog_yum_gpgcheck`                      | Remplace la valeur par défaut de `gpgcheck` (`yes`). Utilisez `no` pour désactiver la vérification de la signature GPG des packages.|
| `datadog_yum_gpgkey`                        | **Supprimé dans la version 4.18.0** Remplace l'URL par défaut de la clé `yum` Datadog utilisée pour vérifier les packages de l'Agent v6 (jusqu'à la version 6.13) (ID de clé `4172A230`).|
| `datadog_yum_gpgkey_e09422b3`               | Remplace l'URL par défaut vers la clé `yum` de Datadog utilisée pour vérifier les packages de l'Agent v6.14+ (ID de clé `E09422B3`).|
| `datadog_yum_gpgkey_e09422b3_sha256sum`     | Remplace le checksum par défaut de la clé `datadog_yum_gpgkey_e09422b3`.|
| `datadog_zypper_repo`                       | Remplace le référentiel `zypper` par défaut de Datadog.|
| `datadog_zypper_repo_gpgcheck`              | Remplace la valeur par défaut de `repo_gpgcheck` (vide). Si elle est vide, la valeur est dynamiquement définie sur `yes` lorsque la valeur personnalisée `datadog_zypper_repo` n'est pas utilisée, sinon elle est définie sur `no`. |
| `datadog_zypper_gpgcheck`                   | Remplace la valeur par défaut de `gpgcheck` (`yes`). Utilisez `no` pour désactiver la vérification de la signature GPG des packages.|
| `datadog_zypper_gpgkey`                     | **Supprimé dans la version 4.18.0** Remplace l'URL par défaut de la clé `zypper` Datadog utilisée pour vérifier les packages de l'Agent v6 (jusqu'à la version 6.13) (ID de clé `4172A230`).|
| `datadog_zypper_gpgkey_sha256sum`           | **Supprimé dans la version 4.18.0** Remplace le checksum par défaut de la clé `datadog_zypper_gpgkey`.|
| `datadog_zypper_gpgkey_e09422b3`            | Remplace l'URL par défaut vers la clé `zypper` de Datadog utilisée pour vérifier les packages de l'Agent v6.14+ (ID de clé `E09422B3`).|
| `datadog_zypper_gpgkey_e09422b3_sha256sum`  | Remplace le checksum par défaut de la clé `datadog_zypper_gpgkey_e09422b3`.|
| `datadog_agent_allow_downgrade`             | Définir sur `yes` pour autoriser le downgrade de l'Agent (à utiliser avec précaution, consultez `defaults/main.yml` pour plus de détails). **Remarque** : les downgrades ne sont pas pris en charge sur les plateformes Windows.|
| `datadog_enabled`                           | Définir sur `false` pour empêcher le service `datadog-agent` de démarrer (valeur par défaut : `true`).|
| `datadog_additional_groups`                 | Liste ou chaîne contenant une liste de groupes supplémentaires séparés par des virgules pour `datadog_user` (Linux uniquement).|
| `datadog_windows_ddagentuser_name`          | Le nom de l'utilisateur Windows à créer/utiliser, au format `<domain>\<user>` (Windows uniquement).|
| `datadog_windows_ddagentuser_password`      | Le mot de passe utilisé pour créer l'utilisateur et/ou enregistrer le service (Windows uniquement).|
| `datadog_apply_windows_614_fix`             | Permet de télécharger et d'appliquer le fichier spécifié via `datadog_windows_614_fix_script_url` (Windows uniquement). Consultez https://dtdg.co/win-614-fix pour en savoir plus. Vous pouvez définir ce paramètre sur `false` tant que vos hosts n'exécutent pas une version 6.14.\* de l'Agent Datadog.|
| `datadog_macos_user`                        | Le nom de l'utilisateur sous lequel exécuter l'agent. L'utilisateur doit être présent et ne sera pas créé automatiquement. La valeur est définie par défaut sur `ansible_user` (sur macOS uniquement).|
| `datadog_macos_download_url`                | Remplacez l'URL à partir de laquelle télécharger le programme d'installation DMG (sur macOS uniquement).|
| `datadog_apm_instrumentation_enabled`       | Configurer l'instrumentation APM. Les valeurs possibles sont : <br/> - `host` : l'Agent et vos services s'exécutent sur un host. <br/> - `docker` : l'Agent et vos services s'exécutent dans des conteneurs Docker distincts sur le même host.<br/>- `all` : prend en charge tous les scénarios précédents pour `host` et `docker` en même temps.|
| `datadog_apm_instrumentation_libraries`     | Liste des bibliothèques APM à installer si l'injection `host` ou `docker` est activée (valeur par défaut : `["java", "js", "dotnet", "python", "ruby"]`). Vous trouverez les valeurs disponibles dans la section [Injecter les bibliothèques localement][21].|
| `datadog_remote_updates`                    | Activer l'installation et les mises à jour à distance via datadog-installer.|
| `datadog_infrastructure_mode`               | Remplacer la valeur par défaut de `infrastructure_mode`.|

### Intégrations

Pour configurer une intégration Datadog (un check), ajoutez une entrée dans la section `datadog_checks`. La clé de premier niveau est le nom du check, et la valeur est la charge utile YAML pour écrire le fichier de configuration. Des exemples sont fournis ci-dessous.

Pour installer ou supprimer une intégration, consultez le [paragraphe](#integration-installation) `datadog_integration`

#### Check de processus

Afin de définir deux instances pour le check `process`, utilisez la configuration ci-dessous. Les fichiers de configuration correspondants sont alors créés :

* Agents v6 et v7 : `/etc/datadog-agent/conf.d/process.d/conf.yaml`

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

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

##### Checks Python custom

Pour passer un check Python au playbook, utilisez la configuration ci-dessous.

Cette configuration nécessite que [le Play et le Role][12] Datadog fassent partie du playbook plus large, où la valeur passée correspond au chemin de fichier relatif vers la tâche réelle pour [Linux][13] ou [Windows][14].

La clé doit correspondre au nom du fichier créé dans le répertoire du check, `checks.d/{{ item }}.py` :

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
    datadog_custom_checks:
      my_custom_check: '../../../custom_checks/my_custom_check.py'
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

Consultez la documentation Datadog pour en savoir plus sur [Autodiscovery][3].

### Tracing

Pour activer la collecte de traces avec l'Agent v6 ou v7, utilisez la configuration suivante :

```yaml
datadog_config:
  apm_config:
    enabled: true
```

### Live processes

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

#### System probe

Le system probe est configuré sous la variable `system_probe_config`. Toutes les variables de niveau inférieur imbriquées sont enregistrées dans le fichier `system-probe.yaml`, dans la section `system_probe_config`.

La solution [Network Performance Monitoring][7] (NPM) est configurée sous la variable `network_config`. Toutes les variables de niveau inférieur imbriquées sont enregistrées dans le fichier `system-probe.yaml`, dans la section `network_config`.

La solution [Cloud Workload Security][8] est configurée sous la variable `runtime_security_config`. Toutes les variables de niveau inférieur imbriquées sont enregistrées dans les fichiers `system-probe.yaml` et `security-agent.yaml`, dans la section `runtime_security_config`.

[Universal Service Monitoring][17] (USM) est configuré sous la variable `service_monitoring_config`. Toutes les variables imbriquées en dessous sont écrites dans `system-probe.yaml`, dans la section `service_monitoring_config`.

[Compliance][18] est configuré sous la variable `compliance_config`. Toutes les variables imbriquées en dessous sont écrites dans `security-agent.yaml`, dans la section `compliance_config`.

Toute autre configuration pour la sonde système qui ne se trouve sous aucune des clés ci-dessus doit être configurée sous la variable `system_probe_other_config`. Toutes les variables imbriquées en dessous sont écrites au niveau supérieur de `system-probe.yaml`.

**Remarque pour les utilisateurs Windows** : la solution NPM fonctionne sous Windows avec les versions 6.27+ et 7.27+ de l'Agent. Elle est fournie en tant que composant facultatif. Celui-ci est uniquement installé lorsque `network_config.enabled` est défini sur true durant l'installation ou la mise à niveau de l'Agent. Ainsi, pour installer le composant NPM, vous devrez probablement désinstaller et réinstaller l'Agent, sauf si vous en profitez pour mettre à niveau l'Agent.

#### Exemple de configuration

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
network_config:
  enabled: true
service_monitoring_config:
  enabled: true
runtime_security_config:
  enabled: true
system_probe_other_config:
  traceroute:
    enabled: true
```

**Remarque** : cette configuration fonctionne avec les versions 6.24.1+ et 7.24.1+ de l'Agent. Si vous utilisez une version plus ancienne, consultez la documentation dédiée à la solution [Network Performance Monitoring][9] afin de découvrir comment activer le system-probe.

Sous Linux, une fois la modification terminée, suivez les étapes ci-dessous si vous avez installé une version de l'Agent antérieure à la 6.18.0 ou 7.18.0 :

1. Démarrez le system-probe : `sudo service datadog-agent-sysprobe start`. **Remarque** : si le wrapper de service n'est pas disponible sur votre système, exécutez plutôt la commande suivante : `sudo initctl start datadog-agent-sysprobe`.
2. [Redémarrez l'Agent][10] : `sudo service datadog-agent restart`.
3. Configurez le system-probe afin qu'il se lance au démarrage : `sudo service enable datadog-agent-sysprobe`.

Pour la configuration manuelle, reportez-vous à la documentation relative à la [solution NPM][9].

## Versions

Par défaut, la version majeure actuelle du rôle Ansible pour Datadog installe l'Agent v7. Les variables `datadog_agent_version` et `datadog_agent_major_version` sont disponibles pour contrôler la version de l'Agent installée.

Dans les versions 4+ de ce rôle, lorsque `datadog_agent_version` est utilisée pour imposer une version spécifique de l'Agent, le rôle attribue un nom de version spécifique à chaque système d'exploitation pour se conformer aux formats appliqués par les systèmes d'exploitation pris en charge. Par exemple :

- `1:7.16.0-1` pour Debian et SUSE
- `7.16.0-1` pour RedHat
- `7.16.0-1` pour macOS
- `7.16.0` pour Windows

Il est ainsi possible de cibler des hosts fonctionnant sous différents systèmes d'exploitation dans la même exécution Ansible, par exemple :

| Version spécifiée                            | Installe     | Système                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian et SUSE |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | RedHat          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian et SUSE |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | RedHat          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**Remarque** : si aucune version n'est spécifiée, le rôle utilise `1` comme epoch et `1` comme numéro de version.

### Référentiels

#### Linux

Lorsque les variables `datadog_apt_repo`, `datadog_yum_repo` et `datadog_zypper_repo` ne sont pas définies, les référentiels officiels de Datadog pour la version majeure définie dans `datadog_agent_major_version` sont utilisés :

| # | Référentiel apt par défaut                    | Référentiel yum par défaut             | Référentiel zypper par défaut               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

Pour remplacer le comportement par défaut, définissez ces variables sur autre chose qu'une chaîne vide.

Depuis la version 4.9.0, la variable `use_apt_backup_keyserver` a été supprimée, puisque les clés APT sont récupérées depuis le site https://keys.datadoghq.com.

#### Windows

Lorsque la variable `datadog_windows_download_url` n'est pas définie, le package MSI officiel pour Windows correspondant à `datadog_agent_major_version` est utilisé :

| Version de l'Agent | URL par défaut du package MSI Windows                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

Pour remplacer le comportement par défaut, définissez cette variable sur autre chose qu'une chaîne vide.

#### macOS

Lorsque la variable `datadog_macos_download_url` n'est pas définie, le package DMG officiel pour macOS correspondant à `datadog_agent_major_version` est utilisé :

| Version de l'Agent | URL par défaut du package DMG pour macOS                                                         |
|---------------|---------------------------------------------------------------------------------------|
| 6             | https://install.datadoghq.com/datadog-agent-6-latest.dmg                              |
| 7             | https://install.datadoghq.com/datadog-agent-7-latest.dmg (7.69-)                      |
|               | https://install.datadoghq.com/datadog-agent-7-latest.x86_64.dmg (7.70+, Intel Mac)    |
|               | https://install.datadoghq.com/datadog-agent-7-latest.arm64.dmg (7.70+, Apple Silicon) |

Pour remplacer le comportement par défaut, définissez cette variable sur autre chose qu'une chaîne vide.

### Mise à jour

Pour passer de l'Agent v6 à l'Agent v7, utilisez `datadog_agent_major_version: 7` pour installer la dernière version ou définissez `datadog_agent_version` sur une version spécifique de l'Agent v7. Utilisez la même logique pour passer de l'Agent v5 à l'Agent v6.

#### Installation d'intégration

**Disponible pour l'Agent v6.8+**

Utilisez la ressource `datadog_integration` pour installer une version spécifique d'une intégration Datadog. Gardez à l'esprit que l'Agent est fourni avec les [intégrations principales][19] déjà installées. Cette commande est utile pour mettre à niveau une intégration spécifique sans mettre à niveau l'Agent entier. Pour plus de détails, consultez la section [Gestion des intégrations][4].

Si vous souhaitez configurer une intégration, consultez le [paragraphe](#integrations) `datadog_checks`

Actions disponibles :

- `install` : installe une version spécifique de l'intégration.
- `remove` : supprime une intégration.

##### Intégrations tierces

Les intégrations de la [communauté Datadog][20] et du [Datadog Marketplace][15] peuvent être installées avec la ressource `datadog_integration`. **Remarque** : ces intégrations sont considérées comme « tierces » et nécessitent donc la définition de `third_party: true`. Consultez l'exemple ci-dessous.

##### Syntaxe

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
```

Pour installer des intégrations tierces, définissez le paramètre `third_party` sur `true` :

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
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

L'exemple suivant envoie des données au site américain de Datadog (par défaut), active les logs et NPM, et configure quelques checks.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # available with Agent v6 and v7
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
            password: <YOUR_PASSWORD>
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

        #Log collection is available on Agent 6 and 7
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
    # datadog_integration is available on Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    network_config:
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
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Configuration du site

Si vous utilisez un site autre que le site par défaut `datadoghq.com`, définissez la variable `datadog_site` sur l'URL appropriée (par exemple : `datadoghq.eu`, `us3.datadoghq.com`).

Cet exemple permet d'envoyer les données au site européen :

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Windows

Sous Windows, supprimez l'option `become: yes` pour empêcher l'échec du rôle. Vous trouverez ci-dessous deux méthodes pour faire fonctionner les exemples de playbooks sur les hosts Windows :

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

### Désinstallation

Sous Windows, il est possible de désinstaller l'Agent en ajoutant le code suivant dans votre rôle Ansible :

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
  register: agent_installed_result
- name: Set Datadog Agent installed fact
  set_fact:
    agent_installed: "{{ agent_installed_result.stdout | trim }}"
- name: Uninstall the Datadog Agent
  win_package:
    product_id: "{{ agent_installed }}"
    state: absent
  when: agent_installed != ""
```

## Dépannage

### Debian Stretch

**Remarque** : ces informations s'appliquent aux versions < 4.9.0 du rôle. Depuis la v4.9.0, le module `apt_key` n'est plus utilisé par le rôle.

Sous Debian Stretch, le module `apt_key` utilisé par le rôle nécessite une dépendance système supplémentaire pour fonctionner correctement. Cette dépendance (`dirmngr`) n'est pas fournie par le module. Ajoutez la configuration suivante à vos playbooks pour utiliser le rôle présent :

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch requires the dirmngr package to use apt_key
      become: yes
      apt:
        name: dirmngr
        state: present
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### CentOS 6/7 avec interpréteur Python 3 et Ansible 2.10.x ou une version inférieure

**OBSOLÈTE : cette section s'applique uniquement aux versions 4 ou antérieures du rôle Ansible. À partir de la version 5, ce rôle ne prend plus en charge CentOS 6/7 et nécessite Ansible Core 2.10 ou une version ultérieure.** 

Le module Python `yum`, qui est ici utilisé pour installer l'Agent sur les hosts fonctionnant sous CentOS, est uniquement disponible avec Python 2 sur les versions 2.10.x ou plus anciennes d'Ansible. Sinon, le gestionnaire de packages `dnf` doit être utilisé à la place.

Toutefois, `dnf` et le module Python `dnf` ne sont pas installés par défaut sur les hosts fonctionnant sous CentOS avant la version 8. Dans ce cas, il n'est pas possible d'installer l'Agent lorsqu'un interpréteur Python 3 est utilisé.

Ce rôle génère très vite une erreur lorsque cette situation est détectée afin d'indiquer qu'Ansible 2.11+ ou un interpréteur Python 2 est requis lorsque l'Agent est installé sur une version < 8 de CentOS/RHEL.

Pour passer outre cette vérification (par exemple, si `dnf` et le package `python3-dnf` sont disponibles sur votre host), définissez la variable `datadog_ignore_old_centos_python3_error` sur `true`.

### Windows

En raison d'un bug critique dans les versions `6.14.0` et `6.14.1` de l'Agent pour Windows, l'installation de ces versions est bloquée (à partir de la version `3.3.0` de ce rôle).

**REMARQUE :** Ansible ne fonctionnera pas sous Windows si `datadog_agent_version` est définie sur `6.14.0` ou `6.14.1`. Utilisez `6.14.2` ou une version ultérieure.

Si vous effectuez une mise à jour à partir de la version **6.14.0 ou 6.14.1 sous Windows**, suivez les étapes ci-dessous :

1. Mettez à jour le rôle Ansible `datadog.datadog` actuel vers la dernière version (`>=3.3.0`).
2. Définissez la variable `datadog_agent_version` sur `6.14.2` ou une version ultérieure (la dernière version est utilisée par défaut).

Pour en savoir plus, consultez la page [Bug critique lors de la désinstallation des versions 6.14.0 et 6.14.1 de l'Agent sous Windows][11].

### Ubuntu 20.04 réparti par service_facts

L'erreur suivante s'est produite en raison de l'exécution du module `service_facts` sur Ubuntu 20.04 :

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Découverte d'une sortie incorrecte dans systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

Pour corriger ce problème, [mettez à jour Ansible vers la version `v2.9.8` ou ultérieure][16].

### Clé d'API manquante

À partir du rôle `4.21`, la clé d'API est obligatoire pour que le rôle puisse fonctionner.

Si vous devez installer l'Agent via Ansible mais ne souhaitez pas spécifier de clé d'API (si vous l'intégrez dans une image de conteneur/VM par exemple), vous pouvez :
* Spécifier une clé d'API factice et la remplacer par la suite
* Désactiver managed_config (`datadog_manage_config: false`)

[1]: https://galaxy.ansible.com/ui/standalone/roles/DataDog/datadog/
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery
[4]: https://docs.datadoghq.com/fr/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/fr/infrastructure/process/
[7]: https://docs.datadoghq.com/fr/network_performance_monitoring/
[8]: https://docs.datadoghq.com/fr/security_platform/cloud_workload_security/getting_started/
[9]: https://docs.datadoghq.com/fr/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/help/agent_fix
[12]: https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords
[13]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-linux.yml
[14]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-win.yml
[15]: https://www.datadoghq.com/blog/datadog-marketplace/
[16]: https://github.com/ansible/ansible/blob/stable-2.9/changelogs/CHANGELOG-v2.9.rst#id61
[17]: https://docs.datadoghq.com/fr/tracing/universal_service_monitoring/?tab=configurationfiles#enabling-universal-service-monitoring
[18]: https://docs.datadoghq.com/fr/security/cspm/setup/?tab=docker
[19]: https://github.com/DataDog/integrations-core
[20]: https://github.com/DataDog/integrations-extras
[21]: https://docs.datadog.com/tracing/trace_collection/library_injection_local