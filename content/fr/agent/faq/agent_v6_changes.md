---
title: "Nouveautés de l'Agent\_v6"
kind: faq
aliases:
  - /fr/agent/faq/agent-v6-changes
further_reading:
  - link: /agent/versions/upgrade_to_agent_v6/
    tag: Documentation
    text: "Upgrade vers l'Agent\_v6 de Datadog"
  - link: /agent/faq/how-datadog-agent-determines-the-hostname/
    tag: Documentation
    text: "Comment le hostname de l'Agent est-il déterminé par Datadog\_?"
---
## Présentation

L'Agent v6 de Datadog contient de nombreuses nouveautés par rapport aux versions précédentes. Les changements et fonctionnalités dépréciées sont détaillés dans les sections ci-dessous.

## Fonctionnalités

Les fonctionnalités de l'Agent v5 suivantes **ne sont pas disponibles** dans l'Agent v6 :

* [Utiliser l'Agent comme proxy][1]
* [Émetteurs personnalisés][2]
* [Dogstream][3]
* [go-metro][4]
* Prise en charge de Graphite

## Configuration

Dans les anciennes versions de l'Agent, les fichiers de configuration sont stockés dans `/etc/dd-agent`. À partir de l'Agent v6.0+, les fichiers sont stockés dans `/etc/datadog-agent`.

{{< tabs >}}
{{% tab "Agent" %}}

Le [fichier de configuration principal de l'Agent][1] est désormais au format **YAML** et non au format **INI**, ceci afin de prendre en charge les configurations complexes tout en harmonisant l'expérience de configuration de l'Agent et des checks.

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

Pour appliquer le nouveau format et les nouveaux chemins de configuration de l'Agent, utilisez la commande suivante :
```bash
sudo -u dd-agent -- datadog-agent import
```

Cette commande analyse le fichier `datadog.conf` existant et convertit les paramètres pris en charge au nouveau format dans `datadog.yaml`. Elle copie également les fichiers de configuration des checks actuellement activés. Pour en savoir plus, consultez [Upgrade l'Agent v6 de Datadog][2].

#### Options

Les options de configuration de l'Agent suivantes ont été modifiées ou supprimées dans l'Agent v6. Les options de configuration supprimées ont été remplacées par d'autres options ou concernent des fonctionnalités qui fonctionnent différemment par rapport aux versions précédentes.

##### Options modifiées

| Nom précédent               | Nouveau nom                 | Remarques                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | Les paramètres de proxy sont désormais spécifiés en tant que liste d'URI. Consultez la documentation dédiée au [proxy][3] pour en savoir plus. |
| `collect_instance_metadata` | `enable_metadata_collection` | Active la connecte de métadonnées.                                                                      |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | La configuration de Syslog est désormais exprimée sous forme d'URI.                                               |
|                             | `syslog_pem`                 | Certificat client Syslog configuré pour la validation du client TLS.                                |
|                             | `syslog_key`                 | Clé privée client Syslog configurée pour la validation du client TLS.                                |

##### Options supprimées

| Nom                         | Remarques                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | Remplacée par `proxy`. Consultez la documentation dédiée au [proxy][3] pour en savoir plus.                                                  |
| `proxy_user`                 | Remplacée par `proxy`. Consultez la documentation dédiée au [proxy][3] pour en savoir plus.                                                  |
| `proxy_password`             | Remplacée par `proxy`. Consultez la documentation dédiée au [proxy][3] pour en savoir plus.                                                  |
| `proxy_forbid_method_switch` | Obsolète                                                                                                              |
| `use_mount`                  | Désormais associée au [check Disk][4] au lieu de l'Agent.                                                       |
| `device_blacklist_re`        | Désormais associée au [check Disk][4] sous le nom de `device_blacklist` au lieu de l'Agent.                                 |
| `use_curl_http_client`       | Obsolète                                                                                                              |
| `exclude_process_args`       | Fonctionnalité obsolète                                                                                                    |
| `check_timings`              | Remplacée par les statistiques internes                                                                                          |
| `non_local_traffic`          | Remplacée par `dogstatsd_non_local_traffic` pour Dogstatsd et par `apm_config.apm_non_local_traffic` pour l'Agent de trace. |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | Fonctionnalité obsolète. Utilisez l'[Agent de logs][5] à la place.                                                                  |
| `custom_emitters`            |                                                                                                                       |
| `forwarder_log_file`         | Remplacée par `log_file`                                                                                              |
| `dogstatsd_log_file`         | Remplacée par `log_file`                                                                                              |
| `jmxfetch_log_file`          | Remplacée par `log_file`                                                                                              |
| `syslog_port`                | Remplacée par `syslog_uri`                                                                                            |
| `check_freq`                 |                                                                                                                       |
| `collect_orchestrator_tags`  | Implémentée dans les collecteurs de métadonnées                                                                                    |
| `utf8_decoding`              |                                                                                                                       |
| `developer_mode`             |                                                                                                                       |
| `use_forwarder`              |                                                                                                                       |
| `autorestart`                |                                                                                                                       |
| `dogstream_log`              | Fonctionnalité obsolète. Utilisez l'[Agent de logs][5] à la place.                                                                  |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | Fonctionnalité obsolète. Désormais disponible avec l'[intégration AWS][6].                                                         |

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/upgrade-to-agent-v6/
[3]: /fr/agent/proxy/
[4]: /fr/integrations/disk/
[5]: /fr/logs/
[6]: /fr/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Checks" %}}

L'Agent v6 charge tous les fichiers YAML valides présents dans `<RÉPERTOIRE_AGENT>/conf.d/<NOM_CHECK>.d/`. Vous avez ainsi la possibilité de créer des configurations complexes décomposées en plusieurs fichiers.

Par exemple, les fichiers de configuration pour le `http_check` peuvent être :
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

L'Agent ne charge pas les fichiers de configuration présents dans les sous-répertoires du dossier `<NOM_CHECK>.d`. Par exemple, le fichier suivant ne sera **pas** chargé :
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

Les fichiers de modèle [Autodiscovery][1] (`auto_conf.yaml`) sont également stockés dans le répertoire de configuration. Voici un exemple de dossier de configuration pour le check `redisdb` :
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Le nom des fichiers YAML dans un dossier `<NOM_CHECK>.d` n'a aucune importance : les fichiers doivent simplement avoir pour extension `.yaml` ou `.yml`. Le nom standard est `conf.yaml`.

Pour préserver la compatibilité avec les versions précédentes, l'Agent récupère toujours les fichiers de configuration au format `<RÉPERTOIRE_AGENT>/conf.d/<NOM_CHECK>.yaml`. Toutefois, la migration vers le nouveau format est fortement conseillée.

#### Options de configuration

L'Agent v6 prend en charge les options suivantes dans la section `instance` d'un check :

| Option                    | Description                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | Définir un intervalle d'exécution différent (en secondes) pour les checks qui doivent être exécutés moins souvent que toutes les 15 secondes (l'intervalle par défaut). |
| `empty_default_hostname`  | Lorsque définie sur `true`, permet d'envoyer des métriques, événements et checks de service sans hostname.                                           |
| `tags`                    | Envoyer des tags personnalisés en plus des tags envoyés par le check.                                                               |


[1]: /fr/getting_started/agent/autodiscovery/
{{% /tab %}}
{{% tab "Variables d'environnement" %}}

La plupart des variables d'environnement utilisées dans l'Agent v6 sont **différentes** de celles des versions précédentes. Consultez la liste des [variables d'environnement pour l'Agent v6][1].

**Remarque** : `DD_TAGS` utilise les mêmes tags, mais ces derniers sont séparés par des espaces dans l'Agent v6. Dans les versions précédentes, ils étaient séparés par des virgules. Exemple pour l'Agent v6 : `DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`

#### Proxies

À partir de la v6.4.0+, les paramètres de proxy de l'Agent peuvent être remplacés via les variables d'environnement suivantes :

| Variable d'environnement        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | L'URL à utiliser comme proxy pour les requêtes `http`.                    |
| `DD_PROXY_HTTPS`    | L'URL à utiliser comme proxy pour les requêtes `https`.                   |
| `DD_PROXY_NO_PROXY` | Une liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé. |

Les variables d'environnement standard (`HTTP_PROXY`, `HTTPS_PROXY` et `NO_PROXY`) sont prises en charge dans l'Agent v6, mais nous vous conseillons d'utiliser les variables `DD_PROXY_*`. Les variables `DD_PROXY_*` sont appliquées en priorité sur les autres.

Dans l'Agent v6, l'ordre de priorité des options de proxy est différent par rapport aux versions précédentes :

* L'Agent v6 applique les variables d'environnement en premier, puis le fichier de configuration.
* L'Agent v6 remplace les valeurs du fichier de configuration par celles de l'environnement. Par exemple, si les options `proxy.http` et `proxy.https` sont définies dans le fichier de configuration mais que seule la variable `DD_PROXY_HTTPS` est définie dans l'environnement, l'Agent applique la valeur `https` de l'environnement et la valeur `http` du fichier de configuration.

[1]: /fr/agent/docker/#environment-variables
{{% /tab %}}
{{% tab "Hostname" %}}

Des différences existent au niveau de la résolution du hostname entre l'Agent v5 et l'Agent v6. Pour en savoir plus, consultez la [documentation dédiée][1].

[1]: /fr/agent/faq/how-datadog-agent-determines-the-hostname/#agent-versions
{{% /tab %}}
{{< /tabs >}}

## Logs

Les [fichiers de logs de l'Agent][5] se situent toujours dans `/var/log/datadog/` (Linux) et `C:\ProgramData\Datadog\logs` (Windows).

Dans les anciennes versions, les logs étaient écrits dans différents fichiers (`collector.log`, `forwarder.log`, `dogstatsd.log`, etc). Les logs de l'Agent v6 sont écrits dans un seul fichier : `agent.log`.

## Interface

L'interface de ligne de commande pour l'Agent v6 est basée sur un système de sous-commandes. Pour consulter la liste des sous-commandes disponibles, exécutez ce qui suit : 
```shell
<BINAIRE_AGENT> --help
```

Pour exécuter une sous-commande, vous devez appeler le binaire de l'Agent :
```shell
<BINAIRE_AGENT> <SOUS_COMMANDE> <OPTIONS>
```

Certaines options disposent de flags et d'options détaillées que vous pouvez consulter avec `--help`. Par exemple, pour afficher les informations d'aide de la sous-commande `check` :
```shell
<BINAIRE_AGENT> check --help
```

Pour obtenir la liste de toutes les commandes disponibles, consultez [Commandes de l'Agent][6].

### Changements propres au système d'exploitation

{{< tabs >}}
{{% tab "Linux" %}}

Sous Linux, les changements majeurs dans l'Agent v6 sont les suivants :

* Seules les commandes de _cycle de vie_ (`start`/`stop`/`restart`/`status`) doivent être exécutées avec `sudo service`/`sudo initctl`/`sudo systemctl`.
* Toutes les autres commandes doivent être invoquées avec le binaire de l'Agent, situé dans le `PATH` (`/usr/bin`) en tant que `datadog-agent` par défaut. La commande `dd-agent` n'est plus disponible.
* La sous-commande `info` a été renommée `status`.
* L'Agent v6 n'intègre pas de script SysV-init (anciennement situé à l'emplacement `/etc/init.d/datadog-agent`).

#### Commandes de cycle de vie du service

Les commandes de cycle de vie restent les mêmes si la commande du wrapper `service` est disponible sur votre système.
Par exemple, sous Ubuntu, les commandes de _cycle de vie_ sont les suivantes :

| Commande                              | Description                            |
|--------------------------------------|----------------------------------------|
| `sudo service datadog-agent start`   | Démarrer l'Agent en tant que service.          |
| `sudo service datadog-agent stop`    | Arrêter le service de l'Agent.                |
| `sudo service datadog-agent restart` | Redémarrer le service de l'Agent.             |
| `sudo service datadog-agent status`  | Afficher le statut du service de l'Agent. |

Si la commande du wrapper `service` n'est pas disponible sur votre système, utilisez :

* Sur les systèmes basés sur `upstart` : `sudo start/stop/restart/status datadog-agent`
* Sur les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart/status datadog-agent`

Si vous ne savez pas quel système init votre distribution utilise par défaut, référez-vous au tableau ci-dessous :

| distribution \ système init      | upstart                   | systemd                   | sysvinit                                  | Remarques                         |
|---------------------------------|---------------------------|---------------------------|-------------------------------------------|-------------------------------|
| Amazon Linux (<= 2017.09)       | <i class="icon-tick"></i> |                           |                                           |                               |
| Amazon Linux 2 (>= 2017.12)     |                           | <i class="icon-tick"></i> |                                           |                               |
| CentOS/RHEL 6                   | <i class="icon-tick"></i> |                           |                                           |                               |
| CentOS/RHEL 7                   |                           | <i class="icon-tick"></i> |                                           |                               |
| Debian 7 (wheezy)               |                           |                           | <i class="icon-tick"></i> (Agent v6.6.0+) |                               |
| Debian 8 (jessie) et 9 (stretch) |                           | <i class="icon-tick"></i> |                                           |                               |
| SUSE 11                         |                           |                           |                                           | Non pris en charge sans `systemd` |
| SUSE 12                         |                           | <i class="icon-tick"></i> |                                           |                               |
| Ubuntu < 15.04                  | <i class="icon-tick"></i> |                           |                                           |                               |
| Ubuntu >= 15.04                 |                           | <i class="icon-tick"></i> |                                           |                               |

#### Commandes de l'Agent

Avec l'Agent v6+, certaines fonctionnalités sont fournies par le binaire de l'Agent lui-même en tant que sous-commandes et ne doivent pas être invoquées avec `service`/`systemctl`/`initctl`. Voici quelques exemples :

| Commande dans l'Agent v5                                  | Commande dans l'Agent v6                                       | Remarques                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Page de statut de l'Agent lorsqu'il est en cours d'exécution |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Envoyer un flare                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Afficher l'utilisation de l'Agent            |
| `sudo -u dd-agent -- dd-agent check <NOM_CHECK>` | `sudo -u dd-agent -- datadog-agent check <NOM_CHECK>` | Exécuter un check                    |

{{% /tab %}}
{{% tab "Windows" %}}

Sous Windows, les changements majeurs dans l'Agent v6 sont les suivants :

* L'interface graphique de Datadog Agent Manager pour Windows utilisée par l'Agent v5 a été remplacée par une interface de gestion cross-platform qui s'utilise depuis un navigateur. Pour en savoir plus, consultez la section [Datadog Agent Manager pour Windows][1].
* Le nom du fichier exécutable principal est `agent.exe` (contre `ddagent.exe` précédemment).
* Les commandes doivent être exécutées en utilisant la syntaxe `"%PROGRAMFILES%\datadog\datadog agent\embedded\agent.exe" <COMMANDE>` depuis une invite de commande avec droits **Administrateur** :
* Le type de démarrage du service Windows est désormais défini sur « Automatique (début différé) ». Le service est démarré au lancement de Windows, mais après tous les autres services. Cela signifie que l'envoi des métriques est légèrement retardé après un redémarrage.
* L'interface Windows et l'icône de la barre d'état système sont désormais implémentées séparément. Pour en savoir plus, consultez la section [Datadog Agent Manager pour Windows][1].

[1]: /fr/agent/guide/datadog-agent-manager-windows/
{{% /tab %}}
{{% tab "macOS" %}}

Sous macOS, les changements majeurs dans l'Agent v6 sont les suivants :

* Les commandes de _cycle de vie_ (auparavant `datadog-agent start`/`stop`/`restart`/`status`) sont remplacées par les commandes `launchctl` sur le service `com.datadoghq.agent` et doivent être exécutées depuis le compte utilisateur connecté. Vous pouvez également exécuter ces commandes depuis la barre des menus de l'Agent Datadog.
* Toutes les autres commandes peuvent toujours être exécutées avec le binaire `datadog-agent` situé dans le `PATH` (`/usr/local/bin/`) par défaut.
* La commande `info` a été renommée `status`.
* L'interface de configuration graphique est désormais une application basée sur un navigateur. Pour y accéder, exécutez la commande `datadog-agent launch-gui` ou utilisez la barre des menus.

**Exemples de changements** :

| Commande dans l'Agent v5                   | Commande dans l'Agent v6                                     | Description                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` ou barre des menus | Démarrer l'Agent en tant que service   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` ou barre des menus  | Arrêter le service de l'Agent         |
| `datadog-agent restart`            | _exécuter `stop` puis `start`_ ou barre des menus             | Redémarrer le service de l'Agent      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` ou barre des menus  | Afficher le statut du service de l'Agent |
| `datadog-agent info`               | `datadog-agent status` ou interface graphique Web                    | Page de statut de l'Agent lorsqu'il est en cours d'exécution |
| `datadog-agent flare`              | `datadog-agent flare` ou interface graphique Web                     | Envoyer un flare                     |
| _pas implémenté_                  | `datadog-agent --help`                               | Afficher l'utilisation des commandes          |
| `datadog-agent check <NOM_CHECK>` | `datadog-agent check <NOM_CHECK>`                   | Exécuter un check (pas de changement)        |

{{% /tab %}}
{{< /tabs >}}

## Agents de collecte

{{< tabs >}}
{{% tab "Agent APM" %}}

L'Agent APM est intégré au package de l'Agent v6 sous Linux, macOS et Windows.

L'Agent APM est activé par défaut sous Linux. Pour l'activer sur une autre plateforme ou le désactiver sous Linux, modifiez la clé `apm_config` dans votre `datadog.yaml` :
```yaml
apm_config:
  enabled: true
```

Si vous utilisez l'image Docker, l'Agent APM est désactivé par défaut. Activez-le en définissant `DD_APM_ENABLED` sur `true`. L'Agent écoute toutes les interfaces par défaut. Si vous souhaitez écouter le trafic non local sur une autre plateforme, définissez `DD_APM_NON_LOCAL_TRAFFIC` sur `true`. Pour en savoir plus, consultez [Tracer des applications Docker][1].

[1]: /fr/agent/docker/apm/
{{% /tab %}}
{{% tab "Agent de processus" %}}

L'Agent de processus est intégré au package de l'Agent v6 sous Linux uniquement.

L'Agent de processus n'est pas activé par défaut. Pour l'activer, modifiez votre `datadog.yaml` comme suit :
```yaml
process_config:
  enabled: "true"
```

La valeur `enabled` est une chaîne avec les options suivantes :

* `"true"` : activer la collecte des processus et des conteneurs par l'Agent de processus.
* `"false"` (par défaut) : recueillir les conteneurs uniquement (lorsque cela est possible).
* `"disabled"` : ne pas exécuter l'Agent de processus.

{{% /tab %}}
{{< /tabs >}}

## Checks

{{< tabs >}}
{{% tab "Docker" %}}

L'Agent v6 prend en charge les versions 1.12 et supérieures de Docker.

Le check Docker a été réécrit en Go pour tirer parti de l'architecture interne de l'Agent. La version Python (`docker_daemon`) est donc désormais obsolète.

Le nouveau check est nommé `docker`. La [commande import de l'Agent](?tab=agent#configuration) permet d'importer les paramètres de l'ancienne configuration `docker_daemon.yaml`. Toutes les fonctionnalités ont été portées, à l'exception des suivantes :

* `url`, `api_version` et `tags*` sont obsolètes. Nous vous conseillons d'utiliser les [variables d'environnement Docker standard][1].
* `ecs_tags`, `performance_tags` et `container_tags` sont obsolètes. Tous ces tags sont désormais recueillis par défaut.
* Il n'est plus possible d'utiliser `collect_container_count` pour activer la métrique `docker.container.count`. Vous devez utiliser `docker.containers.running` et `.stopped`.

Certaines options ont été déplacées du fichier `docker_daemon.yaml` vers le fichier `datadog.yaml` principal :

* `collect_labels_as_tags` a été renommé `docker_labels_as_tags` et prend désormais en charge les tags dotés d'une cardinalité élevée. Consultez la section [Appliquer et extraire des tags][2] pour en savoir plus.
* Les listes `exclude` et `include` ont été renommées `ac_include` et `ac_exclude`. Afin d'obtenir un filtrage cohérent entre tous les composants de l'Agent, le filtrage des tags arbitraires a été abandonné. Les seuls tags de filtrage pris en charge sont `image` (nom de l'image) et `name` (nom du conteneur). Le filtrage à l'aide d'expressions régulières est toujours disponible. Consultez [Gestion de la découverte de conteneurs][3] pour en savoir plus.
* L'option `docker_root` a été divisée en deux options : `container_cgroup_root` et `container_proc_root`.
* `exclude_pause_container` a été ajouté afin d'exclure les conteneurs en pause sur Kubernetes et Openshift (valeur par défaut : `true`).

[1]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[2]: /fr/agent/docker/tag/
[3]: /fr/agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Kubernetes" %}}

L'Agent v6 prend en charge les versions 1.3 et supérieures de Kubernetes.

L'intégration Kubernetes fournit des informations pertinentes en combinant :

* Les métriques du check [Kubelet][1] recueillies à partir du kubelet
* Les événements du check [kubernetes_apiserver][2] et les checks de service recueillis à partir du serveur d'API

La [commande import de l'Agent](?tab=agent#configuration) (v6.2+) permet d'importer les paramètres de l'ancienne configuration `kubernetes.yaml`. Les options suivantes sont désormais obsolètes :

* Informations d'authentification au serveur d'API (`api_server_url`, `apiserver_client_crt`, `apiserver_client_key`, `apiserver_ca_cert`) : désormais, vous devez spécifier un fichier `kubeconfig` à l'Agent avec `kubernetes_kubeconfig_path`.
* `use_histogram` : contactez l'[assistance Datadog][3] pour déterminer l'alternative la plus adaptée à vos besoins.
* `namespaces` et `namespace_name_regexp` : l'Agent v6 recueille les métriques à partir de tous les espaces de nommage disponibles.

La nouvelle logique permet de rendre la collecte de métriques Prometheus compatible avec les versions 1.7.6+ de Kubernetes. Si vous utilisez une version plus ancienne ou que vous souhaitez rétablir la logique de collecte de cadvisor, définissez `cadvisor_port` sur `4194` (le port sur lequel votre kubelet expose cadvisor).

Le check [kubernetes_state][4] fonctionne avec l'Agent v5 ou l'Agent v6.

#### Tagging

Si l'Agent v5 recueillait automatiquement toutes les étiquettes de pod en tant que tags, l'Agent v6 utilise une liste blanche. Pour modifier cette liste, utilisez l'option `kubernetes_pod_labels_as_tags` dans `datadog.yaml`. Consultez [Appliquer et extraire des tags][5] pour en savoir plus.

Les options et tags suivants sont désormais obsolètes :

* `label_to_tag_prefix` a été remplacée par `kubernetes_pod_labels_as_tags`.
* Les tags `container_alias` ne sont plus recueillis.
* `kube_replicate_controller` est uniquement ajouté si le pod a été créé par un replication controller. Utilisez plutôt le tag creator pertinent  (`kube_deployment`, `kube_daemon_set`, etc.).

[1]: /fr/integrations/kubelet/
[2]: /fr/integrations/kube_apiserver_metrics/
[3]: /fr/help/
[4]: /fr/agent/kubernetes/
[5]: /fr/agent/kubernetes/tag/#extract-node-labels-as-tags
{{% /tab %}}
{{% tab "JMX" %}}

L'Agent v6 intègre JMXFetch. Les changements sont les suivants :

#### Jmxterm

L'Agent v6 n'intègre pas le JAR `jmxterm`. Pour télécharger et utiliser `jmxterm`, référez-vous au [projet upstream][1].

#### Commandes de dépannage

La syntaxe des commandes de dépannage a été modifiée. Ces commandes sont valables pour les versions v6.2.0+ ; pour les versions plus anciennes, consultez la section [Dépannage de JMX][2] :

| Commande                                                | Description                                                                                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | Énumérer les attributs qui correspondent à au moins l'une de vos configurations d'instance.                                                                                        |
| `sudo -u dd-agent datadog-agent jmx list limited`      | Énumérer les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | Énumérer les attributs recueillis par vos configurations d'instance actuelles.                                                                                     |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | Énumérer les attributs qui ne correspondent à aucune de vos configurations d'instance.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx list everything`   | Énumérer l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx collect`           | Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console.                                                            |

**Remarque** : par défaut, ces commandes sont exécutées sur tous les checks JMX configurés. Pour spécifier un check, utilisez le flag `--checks`. Exemple :
`sudo datadog-agent jmx list collected --checks tomcat`

[1]: https://github.com/jiaqi/jmxterm
[2]: /fr/integrations/faq/troubleshooting-jmx-integrations/#agent-troubleshooting
{{% /tab %}}
{{% tab "Système" %}}

_Affecte uniquement les Agents Windows_

Avec l'Agent v5 sous Windows, les métriques `system.mem.pagefile.*` affichent des unités incohérentes (erronées de 10^6).

Ce problème est résolu dans l'Agent v6 pour Windows, mais l'erreur reste présente dans l'Agent v5 pour des raisons de rétrocompatibilité. Par conséquent, les valeurs envoyées (et les moniteurs associés) seront différents après un passage à l'Agent v6.

{{% /tab %}}
{{< /tabs >}}

## Autodiscovery

Le système [Autodiscovery][7] a été repensé dans l'Agent v6. De plus, les runtimes et les orchestrateurs de conteneur ont été découplés pour plus de flexibilité. Ce changement se traduit notamment par le passage de `docker_images` à `ad_identifiers` dans les modèles.

{{< tabs >}}
{{% tab "Kubernetes" %}}

Lorsque vous utilisez Kubernetes, Autodiscovery extrait les informations du kubelet au lieu du daemon Docker. Autodiscovery peut ainsi fonctionner sans accéder au socket Docker. De plus, par défaut, les modèles Autodiscovery sont récupérés à partir des annotations des pods. Vous pouvez activer le config-provider `docker` pour utiliser les étiquettes de conteneurs, et remplacer l'écouteur `kubelet` par l'écouteur Docker si vous avez besoin d'utiliser Autodiscovery sur des conteneurs à court de pods.

Lorsque vous spécifiez des [modèles Autodiscovery][1] dans des annotations des pods, le préfixe du nom de l'annotation est `ad.datadoghq.com/`. Le préfixe d'annotation précédent (`service-discovery.datadoghq.com/`) est toujours pris en charge dans l'Agent v6, mais cette compatibilité sera supprimée dans une version future.

[1]: /fr/agent/kubernetes/integrations/
{{% /tab %}}
{{% tab "Docker" %}}

Les [modèles Autodiscovery][1] dans les étiquettes Docker fonctionnent avec le même préfixe de nom, `com.datadoghq.ad.*`.

L'étiquette utilisée pour remplacer l'identificateur est désormais nommée `com.datadoghq.ad.check.id` au lieu de `com.datadoghq.sd.check.id` pour plus de cohérence. L'ancien nom est toujours pris en charge dans l'Agent v6, mais cette compatibilité sera supprimée dans une version future.

[1]: /fr/agent/docker/integrations/
{{% /tab %}}
{{< /tabs >}}

## Modules Python

Avec l'Agent v6, l'ensemble du code Python lié aux checks est importé depuis l'[espace de nommage][8] `datadog_checks`. La plupart des bibliothèques Python présentes dans l'Agent v5 sont intégrées à l'Agent v6. Il existe toutefois quelques différences :

* `util.py` et ses fonctionnalités associées ont été supprimées de l'Agent v6.
* `util.headers(...)` est toujours intégré à l'Agent v6, mais il est implémenté en C et Go et passé au check.

**Remarque** : toutes les intégrations officielles ont été mises à jour pour supprimer les modules obsolètes. Ces changements n'affectent que les checks custom.

Une grande partie du répertoire `utils` a été supprimée dans l'Agent v6, mais la majorité du contenu supprimé n'était pas directement lié aux checks. Le module flare, par exemple, a été supprimé et réimplémenté en Go, mais il est peu probable qu'il ait déjà été utilisé dans un check custom. Pour en savoir plus, consultez [documentation dédiée au développement de checks][9].

{{< tabs >}}
{{% tab "Intégrations" %}}

Bien que l'Agent v6 prenne entièrement en charge les checks Python, certaines intégrations officielles de l'Agent v5 ont été supprimées ou remplacées :

* agent_metrics : supprimée
* docker_daemon : remplacée par le [check Docker](?tab=docker#checks)
* kubernetes : remplacée par les [checks Kubernetes](?tab=kubernetes#checks)

{{% /tab %}}
{{% tab "API des checks" %}}

La classe principale pour les checks Python (`AgentCheck`) est désormais importée depuis `datadog_checks.base.checks`. Plusieurs fonctions ont été supprimées ou modifiées dans l'API de la classe. De plus, chaque instance de check est désormais sa propre instance de la classe. Il n'est plus possible de partager un statut entre plusieurs instances.

Les méthodes suivantes de la classe `AgentCheck` ne sont pas implémentées :

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

La signature de fonction des émetteurs de métriques a été modifiée :

```python
# Anciennes versions
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)

# Agent v6
gauge(self, name, value, tags=None, hostname=None, device_name=None)
```

Les méthodes suivantes ont été définitivement supprimées de la classe `AgentCheck` :

* `_roll_up_instance_metadata`
* `instance_count`
* `is_check_enabled`
* `read_config`
* `set_check_version`
* `set_manifest_path`
* `_get_statistic_name_from_method`
* `_collect_internal_stats`
* `_get_internal_profiling_stats`
* `_set_internal_profiling_stats`
* `get_library_versions`
* `get_library_info`
* `from_yaml`
* `get_service_checks`
* `has_warnings`
* `get_metrics`
* `has_events`
* `get_events`

**Remarque** : toutes les intégrations officielles ont été mises à jour pour supprimer les méthodes obsolètes. Ces changements n'affectent que les checks custom.

{{% /tab %}}
{{% tab "Checks custom" %}}

#### Priorité

Avec l'Agent v6, les [checks officiels][1] ont la priorité sur les checks custom (situés dans `<RÉPERTOIRE_AGENT>/checks.d`). Les checks custom portant le même nom qu'un check officiel sont ignorés.

Pour corriger la configuration de vos checks avec l'Agent v6, donnez un nouveau nom unique aux checks custom affectés, puis renommez les fichiers de configuration `.yaml` associés.

#### Dépendances

Si vous utilisez des checks custom, il est possible que votre code fasse appel à du code Python qui n'est plus intégré à l'Agent v6. Les packages suivants ne sont plus inclus dans l'Agent :

- backports.ssl-match-hostname
- datadog
- decorator
- future
- futures
- google-apputils
- pycurl
- pyOpenSSL
- python-consul
- python-dateutil
- python-etcd
- python-gflags
- pytz
- PyYAML
- rancher-metadata
- tornado
- uptime
- websocket-client

Si votre code fait appel à l'un de ces packages, installez le package manquant en exécutant :

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <NOM_PACKAGE>
```

De la même manière, vous avez peut-être ajouté un package PIP pour répondre à une exigence d'un check custom lorsque vous utilisiez l'Agent v5. Si le package PIP ajouté avait des dépendances internes avec des packages intégrés à l'Agent v5 (voir la liste ci-dessus), ces dépendances seront perdues après un passage à l'Agent v6. Installez les dépendances manquantes comme décrit ci-dessus.

[1]: https://github.com/DataDog/integrations-core
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /fr/agent/guide/dogstream/
[4]: /fr/integrations/go-metro/
[5]: /fr/agent/guide/agent-log-files/
[6]: /fr/agent/guide/agent-commands/
[7]: /fr/getting_started/agent/autodiscovery/
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[9]: https://github.com/DataDog/datadog-agent/tree/master/docs/dev/checks