---
algolia:
  category: guide
  rank: 80
  subcategory: Fichiers de configuration de l'Agent
  tags:
  - configuration de l'agent
  - configuration de l'agent
  - répertoire de l’agent
aliases:
- /fr/agent/faq/agent-configuration-files
- /fr/agent/guide/agent-configuration-files
title: Fichiers de configuration de l'Agent
---

## Fichier de configuration principal

L'emplacement du fichier de configuration de l'Agent dépend du système d'exploitation.

| Plateforme                             | Commande                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

Consultez le [fichier d'exemple 'config_template.yaml'][1] pour découvrir toutes les options de configuration disponibles.

## Répertoire de configuration de l'Agent

Les fichiers de checks des vérifications de l'Agent et des intégrations sont stockés dans le répertoire 'conf.d'. L'emplacement de ce répertoire varie selon le système d'exploitation.

| Plateforme                             | Commande                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
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

**Remarque** : les fichiers de taille nulle dans ce répertoire sont ignorés par l'Agent. Cela permet de prendre en charge les systèmes de provisioning qui ne permettent pas d'ignorer les fichiers modèles vides.

### Fichiers de configuration des checks

Pour chaque check de l'Agent, un exemple de configuration se trouve dans le fichier `conf.yaml.example` du dossier `<NOM_CHECK>.d/` correspondant. Renommez ce fichier `conf.yaml` pour activer le check associé. **Remarque** : l'Agent charge tous les fichiers YAML valides qui se trouvent dans le dossier `/etc/datadog-agent/conf.d/<NOM_CHECK>.d/`. Cela permet de décomposer les configurations complexes en plusieurs fichiers. Voici un exemple de configuration de `http_check` :

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Les fichiers YAML avec le suffixe `.default` fonctionnent différemment. Ils sont chargés par défaut par l'Agent et aident à définir l'ensemble des checks de base qui sont toujours activés (processeur, mémoire, disponibilité, etc.). Lorsqu'un check comporte une autre configuration, ces fichiers YAML sont ignorés. Vous n'avez donc pas à vous en soucier. Si vous souhaitez désactiver l'un des checks par défaut, supprimez ce fichier YAML. Pour configurer ces checks, les fichiers `conf.yaml.example` doivent être utilisés comme point de départ.

Les fichiers de modèle Autodiscovery sont stockés dans le répertoire de configuration avec le fichier `auto_conf.yaml`. Par exemple, pour le check Redis, la configuration dans `redisdb.d/` est la suivante :

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Pour la collecte de logs, l'Agent n'accepte pas plusieurs fichiers YAML pointant vers la même source de logs, afin d'empêcher l'envoi de logs en double à Datadog. Si plusieurs fichiers YAML pointent vers la même source de logs, l'Agent récupère les fichiers dans l'ordre alphabétique et utilise le premier fichier.

## Fichier de configuration JMX

Les checks de l'Agent JMX ont un fichier `metrics.yaml` supplémentaire dans leur répertoire de configuration. Il s'agit d'une liste de tous les beans recueillis par défaut par l'Agent Datadog. De cette manière, vous n'avez pas besoin d'énumérer manuellement tous les beans lorsque vous configurez un check avec les [étiquettes Docker ou les annotations Kubernetes][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /fr/agent/kubernetes/integrations/#configuration