---
algolia:
  category: guide
  rank: 80
  subcategory: Agent Configuration Files
  tags:
  - agent config
  - agent configuration
  - agent directory
aliases:
- /fr/agent/faq/agent-configuration-files
- /fr/agent/guide/agent-configuration-files
description: Guide des emplacements et de la structure du fichier de configuration
  du Datadog Agent, ainsi que de la manière de configurer les checks et les intégrations.
title: Fichiers de configuration de l'Agent
---
## Fichier de configuration principal {#main-configuration-file}

L'emplacement du fichier de configuration de l'Agent dépend du système d'exploitation.

| Plateforme | Commande                               | Exemple de configuration                            |
|:---------|:--------------------------------------|:------------------------------------------|
| AIX      | `/etc/datadog-agent/datadog.yaml`     | [`datadog.yaml.example`][3]               |
| Linux    | `/etc/datadog-agent/datadog.yaml`     | [`datadog-agent_linux.yaml.example`][4]   |
| macOS    | `/opt/datadog-agent/etc/datadog.yaml` | [`datadog-agent_darwin.yaml.example`][5]  |
| Windows  | `%ProgramData%\Datadog\datadog.yaml`  | [`datadog-agent_windows.yaml.example`][6] |

## Répertoire de configuration de l'Agent {#agent-configuration-directory}

Les fichiers de configuration pour les checks et les intégrations de l'Agent sont stockés dans le répertoire `conf.d`. L'emplacement du répertoire diffère selon le système d'exploitation.

| Plateforme                             | Commande                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `/opt/datadog-agent/etc/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**Remarque** : Les fichiers de ce répertoire de taille nulle sont ignorés par l'Agent. Cela permet de provisionner des systèmes qui ne prennent pas en charge l'omission des sorties de modèles vides.

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

## Fichier de configuration JMX {#jmx-configuration-file}

Les checks de l'Agent JMX disposent d'un fichier `metrics.yaml` supplémentaire dans leur dossier de configuration. Il s'agit d'une liste de tous les beans que le Datadog Agent collecte par défaut. Ainsi, vous n'avez pas besoin de lister manuellement tous les beans lorsque vous configurez un check via [des étiquettes Docker ou des annotations k8s][2].

[2]: /fr/agent/kubernetes/integrations/#configuration
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/docs/datadog.yaml.example
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example