---
dependencies:
  - https://github.com/DataDog/datadog-formula/blob/main/README.md
title: SaltStack
---
La formule SaltStack pour Datadog sert à installer l'Agent Datadog ainsi que les intégrations reposant sur l'Agent (checks). Pour en savoir plus sur les formules SaltStack, consultez les [instructions d'utilisation et d'installation des formules Sallt][1].

## Configuration

### Prérequis

La formule SaltStack pour Datadog prend uniquement en charge les installations sur les systèmes Debian et RedHat.

### Installation

Les instructions suivantes permettent d'ajouter la formule Datadog à l'environnement Salt `base`. Pour l'ajouter à un autre environnement Salt, remplacez la valeur `base` par le nom de votre environnement Salt.

#### Option 1

Installez la [formule Datadog][6] dans l'environnement de base de votre nœud salt-master à l'aide de l'option `gitfs_remotes` dans le fichier de configuration de votre salt-master (`/etc/salt/master` par défaut) :

```text
fileserver_backend:
  - roots # Actif par défaut, nécessaire pour pouvoir utiliser les fichiers Salt locaux définis aux étapes suivantes
  - gitfs # Ajoute gitfs en tant que backend de serveur de fichiers afin de pouvoir utiliser l'option gitfs_remotes

gitfs_remotes:
  - https://github.com/DataDog/datadog-formula.git:
    - saltenv:
      - base:
        - ref: 3.0 # Imposer la version de la formule que vous voulez utiliser
```

Redémarrez ensuite votre service salt-master pour prendre en compte les changements de configuration :

```shell
systemctl restart salt-master
# OU
service salt-master restart
```

#### Option 2

Vous pouvez également cloner la formule Datadog sur votre nœud salt-master : 

```shell
mkdir -p /srv/formulas && cd /srv/formulas
git clone https://github.com/DataDog/datadog-formula.git
```

Ajoutez-la ensuite à votre environnement de base, dans la section `file_roots` du votre fichier de configuration de votre salt-master (`/etc/salt/master` par défaut) :

```text
file_roots:
  base:
    - /srv/salt/
    - /srv/formulas/datadog-formula/
```

### Déploiement

Pour déployer l'Agent Datadog sur vos hosts :

1. Ajoutez la formule Datadog à votre fichier principal (`/srv/salt/top.sls` par défaut) :

    ```text
    base:
      '*':
        - datadog
    ```

2. Créez un fichier `datadog.sls` dans votre répertoire pillar (`/srv/pillar/` par défaut). Ajoutez ensuite ce qui suit, puis mettez à jour votre [clé d'API Datadog][2] :

    ```
    datadog:
      config:
        api_key: <YOUR_DD_API_KEY>
      install_settings:
        agent_version: <AGENT7_VERSION>
    ```

3. Ajoutez le fichier `datadog.sls` au ficher pillar principal (`/srv/pillar/top.sls` par défaut) :

    ```text
    base:
      '*':
        - datadog
    ```

### Configuration

La configuration de la formule doit être écrite dans la clé `datadog` du fichier pillar, qui se compose de trois parties : `config`, `install_settings`, et `checks`.

#### Configuration

Sous `config`, ajoutez les options de configuration à écrire dans le fichier de configuration de l'Agent des minions (`datadog.yaml` pour les Agents v6 et v7, `datadog.conf` pour l'Agent v5).

Selon la version de l'Agent installée, plusieurs options peuvent être définies : 

- Agents v6 et v7 : toutes les options prises en charge par le fichier de configuration de l'Agent sont prises en charge.
- Agent v5 : seule l'option `api_key` est prise en charge.

L'exemple ci-dessous configure votre clé d'API Datadog et définit le site de Datadog sur `datadoghq.eu` (disponible pour les Agents v6 et v7).

```text
  datadog:
    config:
      api_key: <VOTRE_CLÉ_API_DD>
      site: datadoghq.eu
```

#### Paramètres d'installation

Sous `install_settings`, configurez l'option d'installation de l'Agent :

- `agent_version` : la version de l'Agent à installer (par défaut, la version la plus récente, c'est-à-dire l'Agent v7).

L'exemple ci-dessous permet d'installer l'Agent v6.14.1 :

```text
  datadog:
    install_settings:
      agent_version: 6.14.1
```

#### Checks

Pour ajouter une intégration de l'Agent à votre host, utilisez la variable `checks` avec le nom du check comme clé. Chaque check s'accompagne de deux options :

| Option    | Description                                                                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config`  | Ajoutez les options de configuration à écrire dans le fichier de configuration du check :<br>Agents v6 et v7 : `<chemin_confd>/<check>.d/conf.yaml`<br>Agent v5 : `<chemin_confd>/<check>.yaml` |
| `version` | Pour les Agents v6 et v7, la version du check à installer (par défaut, la version fournie avec l'Agent).                                                                |
| `third_party` | Pour les Agents v6 et v7 (v6.21.0/v7.21.0 et versions ultérieures uniquement), valeur booléenne pour indiquer que l'intégration à installer est une intégration tierce. Doit être associée à l'option `version`.                                                                |

L'exemple ci-dessous permet d'utiliser la v1.4.0 de l'intégration [Directory][3] pour surveiller le répertoire `/srv/pillar` :

```text
datadog:
  config:
    api_key: <VOTRE_CLÉ_API_DD>
  install_settings:
    agent_version: <VERSION_AGENT7>
  checks:
    directory:
      config:
        instances:
          - directory: "/srv/pillar"
            name: "pillars"
      version: 1.4.0
```

L'exemple ci-dessous permet d'utiliser la v1.0.0 d'un exemple d'intégration tierce appelée « third-party-integration » :

```
datadog:
  config:
    api_key: <VOTRE_CLÉ_API_DD>
  install_settings:
    agent_version: <VERSION_AGENT7>
  checks:
    third-party-integration:
      config:
        instances:
          - some_config: "some value"
      version: 1.0.0
      third_party: true
```

##### Logs

Pour activer la collecte de logs, définissez `logs_enabled` sur `true` dans la configuration principale :
```text
datadog:
  config:
    logs_enabled: true
```

Pour envoyer vos logs à Datadog, utilisez la clé `logs` dans un check (soit un check existant pour configurer les logs pour une intégration, soit un check custom pour personnaliser la collecte de logs). L'exemple suivant repose sur le check custom `system_logs`.

Le contenu de la clé `config:` de ce check est écrit dans le fichier `/etc/datadog-agent/conf.d/<nom_check>.d/conf.yaml` (ici,  `/etc/datadog-agent/conf.d/system_logs.d/conf.yaml`).

Pour énumérer les logs que vous souhaitez recueillir, remplissez la section `config` de la même manière que vous rempliriez le fichier `conf.yaml` d'un fichier de configuration de collecte de logs personnalisée (voir la section sur la [collecte de logs personnalisée] (https://docs.datadoghq.com/agent/logs/?tab=suivredesfichiers#collecte-de-logs-personnalisée) dans la documentation officielle).

Par exemple, pour recueillir les logs depuis `/var/log/syslog` et `/var/log/auth.log`, utilisez la configuration suivante :

```text
datadog:
[...]
  checks:
    system_logs:
      config:
        logs:
          - type: file
            path: "/var/log/syslog"
            service: "system"
          - type: file
            path: "/var/log/auth.log"
            service: "system"
```


## States

Les formules Salt sont des states Salt pré-écrits. Les states suivants sont disponibles dans la formule Datadog :

| State               | Description                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------|
| `datadog`           | Installe, configure et lance le service de l'Agent Datadog.                                             |
| `datadog.install`   | Configure le référentiel adéquat et installe l'Agent Datadog.                                             |
| `datadog.config`    | Configure l'Agent Datadog et les intégrations à l'aide des données pillar (voir [pillar.example][4]).              |
| `datadog.service`   | Exécute le service de l'Agent Datadog, qui surveille les changements apportés aux fichiers de configuration de l'Agent et des checks. |
| `datadog.uninstall` | Arrête le service et désinstalle l'Agent Datadog.                                                     |

**REMARQUE** : lorsque vous utilisez le state `datadog.config` pour configurer différentes instances de check sur plusieurs machines, l'option [pillar_merge_lists][5] doit être définie sur `True` dans la configuration master de Salt, ou dans la configuration minion de Salt dans le cas d'une exécution sans master.

[1]: http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/fr/integrations/directory/
[4]: https://github.com/DataDog/datadog-formula/blob/master/pillar.example
[5]: https://docs.saltstack.com/en/latest/ref/configuration/master.html#pillar-merge-lists
[6]: https://github.com/DataDog/datadog-formula