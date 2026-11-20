---
disable_toc: false
private: true
title: Fichiers de configuration de l'Agent 6
---
## Fichier de configuration principal de l'Agent {#agent-main-configuration-file}

Les fichiers de configuration pour les checks et les intégrations de l'Agent sont stockés dans le répertoire `conf.d`.

Le fichier de configuration de l'Agent v6 utilise **YAML** pour mieux prendre en charge les configurations complexes et pour offrir une expérience de configuration cohérente, car les Checks utilisent également des fichiers de configuration YAML. Par conséquent, `datadog.conf` (v5) est abandonné au profit de `datadog.yaml` (v6).

L'emplacement du répertoire `conf.d` diffère selon le système d'exploitation.

| Plateforme                             | Commande                              |
|:-------------------------------------|:-------------------------------------|
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

## Répertoire de configuration de l'Agent {#agent-configuration-directory}

Les versions précédentes du Datadog Agent stockaient les fichiers de configuration dans `/dd-agent/conf.d/`. À partir de la version 6.0, les fichiers de configuration sont stockés dans le répertoire `conf.d`. L'emplacement du répertoire diffère selon le système d'exploitation.

| Plateforme                             | Commande                        |
|:-------------------------------------|:-------------------------------|
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

### Vérifier les fichiers de configuration {#check-configuration-files}

Un exemple pour chaque fichier de configuration de check de l'Agent se trouve dans le fichier `conf.yaml.example` dans le dossier `<CHECK_NAME>.d/` correspondant. Renommez ce fichier en `conf.yaml` pour activer le check associé. **L'Agent charge les fichiers YAML valides contenus dans le dossier**: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Cela permet de diviser les configurations complexes en plusieurs fichiers. Par exemple, une configuration pour le `http_check` pourrait ressembler à ceci :

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Un cas particulier concerne les fichiers YAML avec le suffixe `.default`. Ces fichiers sont chargés par l'Agent par défaut et aident à définir l'ensemble principal de checks qui sont toujours activés (CPU, mémoire, temps de disponibilité...). Ils sont ignorés si d'autres configurations sont trouvées pour ce check ; vous pouvez donc les ignorer en toute sécurité. Si vous souhaitez désactiver l'un des checks par défaut, supprimez ce fichier. Pour configurer ces checks, `conf.yaml.example` doit être utilisé comme base.

Les fichiers de modèle d'Autodiscovery sont stockés dans le dossier de configuration avec le fichier `auto_conf.yaml`. Par exemple, pour le check Redis, voici la configuration dans `redisdb.d/` :

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Pour la collecte de logs, l'Agent n'accepte pas plusieurs fichiers YAML pointant vers la même source de log afin d'éviter que des logs en double ne soient envoyés à Datadog. Dans le cas où plusieurs fichiers YAML pointent vers la même source de log, l'Agent examine les fichiers par ordre alphabétique et utilise le premier.

Pour préserver la rétrocompatibilité, l'Agent récupère toujours les fichiers de configuration sous la forme `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml`, mais il est fortement recommandé de migrer vers la nouvelle structure.

## Fichier de configuration JMX {#jmx-configuration-file}

Les checks de l'Agent JMX disposent d'un fichier `metrics.yaml` supplémentaire dans leur dossier de configuration. Il s'agit d'une liste de tous les beans que le Datadog Agent collecte par défaut. Ainsi, vous n'avez pas besoin de lister manuellement tous les beans lorsque vous configurez un check via [des étiquettes Docker ou des annotations k8s][2].

[2]: /fr/agent/kubernetes/integrations/#configuration