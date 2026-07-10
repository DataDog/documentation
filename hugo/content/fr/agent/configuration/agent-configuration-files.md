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
description: Guide sur les emplacements du fichier de configuration de l'Agent Datadog,
  sa structure et la manière de configurer les vérifications et les intégrations.
title: Fichiers de configuration de l'Agent
---
## Fichier de configuration principal {#main-configuration-file}

L'emplacement du fichier de configuration de l'Agent dépend du système d'exploitation.

| Plateforme                             | Commande                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

Consultez le [fichier d'exemple `config_template.yaml`][1] pour toutes les options de configuration disponibles.

## Répertoire de configuration de l'Agent {#agent-configuration-directory}

Les fichiers de configuration pour les vérifications et les intégrations de l'Agent sont stockés dans le répertoire `conf.d`. L'emplacement du répertoire varie en fonction du système d'exploitation.

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

**Remarque** : Les fichiers de ce répertoire ayant une longueur nulle sont ignorés par l'agent. Cela permet de provisionner des systèmes qui ne prennent pas en charge le passage outre des sorties de template vides.

### Fichiers de configuration des vérifications {#check-configuration-files}

Un exemple pour chaque fichier de configuration de vérification de l'Agent se trouve dans le fichier `conf.yaml.example` dans le dossier correspondant `<CHECK_NAME>.d/`. Renommez ce fichier en `conf.yaml` pour activer la vérification associée. **Remarque** : L'Agent charge les fichiers YAML valides contenus dans le dossier : `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Cela permet de décomposer des configurations complexes en plusieurs fichiers. Par exemple, une configuration pour le `http_check` pourrait ressembler à ceci :

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Un cas particulier concerne les fichiers YAML avec le suffixe `.default`. Ces fichiers sont chargés par défaut par l'Agent et aident à définir l'ensemble de vérifications de base qui sont toujours activées (CPU, mémoire, uptime). Ils sont ignorés si d'autres configurations sont trouvées pour cette vérification, vous pouvez donc les ignorer en toute sécurité. Si vous souhaitez désactiver l'une des vérifications par défaut, supprimez ce fichier. Pour configurer ces vérifications, `conf.yaml.example` doit être utilisé comme base.

Les fichiers de modèle de découverte automatique sont stockés dans le dossier de configuration avec le fichier `auto_conf.yaml`. Par exemple, pour la vérification Redis, voici la configuration dans `redisdb.d/` :

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Pour la collecte de journaux, l'Agent n'accepte pas plusieurs fichiers YAML pointant vers la même source de journal pour éviter l'envoi de journaux en double à Datadog. Dans le cas où il y a plus d'un fichier YAML pointant vers la même source de journal, l'Agent considère les fichiers par ordre alphabétique et utilise le premier fichier.

## Fichier de configuration JMX {#jmx-configuration-file}

Les vérifications de l'Agent JMX ont un fichier supplémentaire `metrics.yaml` dans leur dossier de configuration. C'est une liste de tous les beans que l'Agent Datadog collecte par défaut. De cette manière, vous n'avez pas besoin de lister tous les beans manuellement lorsque vous configurez une vérification à l'aide des étiquettes Docker ou des annotations k8s [2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /fr/agent/kubernetes/integrations/#configuration