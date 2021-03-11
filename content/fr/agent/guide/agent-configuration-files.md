---
title: Fichiers de configuration de l'Agent
kind: guide
aliases:
  - /fr/agent/faq/agent-configuration-files
---
## Fichier de configuration principal de l'Agent

Le fichier de configuration de l'Agent v6 utilise le format **YAML** pour mieux prendre en charge les configurations complexes et offrir une expérience de configuration cohérente (les Checks utilisent également des fichiers de configuration YAML). Par conséquent. `datadog.conf` (v5) est désormais obsolète et remplacé par `datadog.yaml` (v6).

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme                             | Commandes                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| CentOS                               | `/etc/datadog-agent/datadog.yaml`    |
| Debian                               | `/etc/datadog-agent/datadog.yaml`    |
| Fedora                               | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| RedHat                               | `/etc/datadog-agent/datadog.yaml`    |
| Source                               | `/etc/datadog-agent/datadog.yaml`    |
| Suse                                 | `/etc/datadog-agent/datadog.yaml`    |
| Ubuntu                               | `/etc/datadog-agent/datadog.yaml`    |
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\datadog.yaml` |
| Windows Server 2003, XP ou versions antérieures     | *Plateforme non prise en charge*               |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme                             | Commandes                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| CentOS                               | `/etc/dd-agent/datadog.conf`                                               |
| Debian                               | `/etc/dd-agent/datadog.conf`                                               |
| Fedora                               | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |
| RedHat                               | `/etc/dd-agent/datadog.conf`                                               |
| Source                               | `/etc/dd-agent/datadog.conf`                                               |
| Suse                                 | `/etc/dd-agent/datadog.conf`                                               |
| Ubuntu                               | `/etc/dd-agent/datadog.conf`                                               |
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP ou versions antérieures     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

Remarque : [un exemple complet de fichier `datadog.yaml` est disponible dans le référentiel Github `datadog-agent`][1].

## Répertoire de configuration de l'Agent

Les anciennes versions de l'Agent Datadog stockaient les fichiers de configuration dans `/dd-agent/conf.d/`. Depuis la version 6.0, les fichiers de configuration sont stockés dans `/etc/datadog-agent/conf.d/<NOM_CHECK>.d/`.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme                             | Commandes                        |
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
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\conf.d` |
| Windows Server 2003, XP ou versions antérieures     | *Plateforme non prise en charge*         |

### Fichiers de configuration des checks pour l'Agent 6

Pour chaque check de l'Agent, un exemple de configuration se trouve dans le fichier `conf.yaml.example` du dossier `<NOM_CHECK>.d/` correspondant. Renommez ce fichier `conf.yaml` pour activer le check associé. Notez que l'Agent charge tous les fichiers YAML valides qui se trouvent dans le répertoire `/etc/datadog-agent/conf.d/<NOM_CHECK>.d/`. Cela permet de décomposer les configurations complexes en plusieurs fichiers. Voici un exemple de configuration de `http_check` :

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Les fichiers YAML avec le suffixe `.default` fonctionnent différemment. Ils sont chargés par défaut par l'Agent et aident à définir l'ensemble des checks de base qui sont toujours activés (processeur, mémoire, disponibilité, etc.). Lorsqu'un check comporte une autre configuration, ces fichiers YAML sont ignorés. Vous n'avez donc pas à vous en soucier. Si vous souhaitez désactiver l'un des checks par défaut, il vous suffit de supprimer ce fichier YAML. Pour configurer ces checks, les fichiers `conf.yaml.example` doivent être utilisés comme point de départ.

Les fichiers de modèle Autodiscovery sont stockés dans le répertoire de configuration avec le fichier `auto_conf.yaml`. Par exemple, pour le check Redis, la configuration dans `redisdb.d/` est la suivante :

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

**Remarque** : pour la collecte de logs, l'Agent n'accepte pas plusieurs fichiers YAML pointant vers la même source de log afin d'empêcher l'envoi de logs en double à Datadog. Si plusieurs fichiers YAML pointent vers la même source de log, l'Agent récupère les fichiers dans l'ordre alphabétique et utilise le premier fichier.

Pour préserver la compatibilité avec les versions précédentes, l'Agent récupère toujours les fichiers de configuration au format `/etc/datadog-agent/conf.d/<NOM_CHECK>.yaml`. Toutefois, la migration vers le nouveau format est fortement conseillée.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme                             | Commande                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP ou versions antérieures     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## Fichier de configuration JMX

Les checks de l'Agent JMX ont un fichier `metrics.yaml` supplémentaire dans leur répertoire de configuration. Il s'agit d'une liste de tous les beans recueillis par défaut par l'Agent Datadog. De cette manière, vous n'avez pas besoin d'énumérer manuellement tous les beans lorsque vous configurez un check avec les [étiquettes Docker ou les annotations Kubernetes][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /fr/agent/kubernetes/integrations/#configuration