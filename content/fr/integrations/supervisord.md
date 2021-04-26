---
aliases:
  - /integrations/supervisor
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: supervisord
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    supervisord_processes: assets/saved_views/supervisord_processes.json
  service_checks: assets/service_checks.json
categories:
  - os & system
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md'
display_name: Supervisord
draft: false
git_integration_title: supervisord
guid: 2b81259b-723e-47be-8612-87e1f64152e9
integration_id: supervisord
integration_title: Supervisord
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: supervisord.
metric_to_check: supervisord.process.count
name: supervisord
process_signatures:
  - python supervisord
  - supervisord
public_title: Intégration Datadog/Supervisord
short_description: 'Surveillez le statut, la disponibilité et le nombre de processus gérés par Supervisor.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Événement Supervisor][1]

## Présentation

Ce check surveille la disponibilité, le statut et le nombre de processus s'exécutant sous Supervisor.

## Configuration

### Installation

Le check Supervisor est inclus dans le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur les serveurs qui exécutent Supervisor.

### Configuration

#### Préparer supervisord

L'Agent peut recueillir des données à partir de Supervisor via un serveur HTTP ou un socket UNIX. L'Agent recueille les mêmes données quelle que soit la méthode de collecte que vous configurez.

##### Serveur HTTP

Ajoutez un bloc comme celui-ci au fichier de configuration principal de Supervisor (par exemple, `/etc/supervisor.conf`) :

```ini
[inet_http_server]
port=localhost:9001
;username=user  # facultatif
;password=pass  # facultatif
```

##### Socket UNIX

Ajoutez des blocs comme ceux-ci au fichier `/etc/supervisor.conf` (s'ils ne sont pas déjà présents) :

```ini
[supervisorctl]
serverurl=unix:///var/run/supervisor.sock

[unix_http_server]
file=/var/run/supervisor.sock
chmod=777
chown=nobody:nogroup
;username=user  # facultatif
;password=pass  # facultatif
```

Si Supervisor est exécuté en mode root, assurez-vous que `chmod` ou `chown` est défini de façon à ce que les utilisateurs non root (c'est-à-dire, dd-agent) puissent lire le socket.

---

Rechargez `supervisord`.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `supervisord.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple supervisord.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  ## Utilisé pour taguer les checks de service et les métriques, p. ex. supervisor_server:supervisord0
  - name: supervisord0
    host: localhost
    port: 9001
  ## Pour effectuer la collecte à partir du socket
  # - name: supervisord0
  #   socket: unix:///var/run/supervisor.sock
```

Utilisez les options `proc_names` et/ou `proc_regex` pour énumérer les processus pour lesquels vous souhaitez que l'Agent recueille des métriques et crée des checks de service. Si aucune de ces options n'est spécifiée, l'Agent suit _tous_ les processus enfants de Supervisor. Si les deux options sont spécifiées, l'Agent suit les processus présents dans les deux listes (en d'autres termes, les deux options ne sont pas mutuellement exclusives).

Consultez [un exemple de configuration du check][2] pour obtenir les descriptions complètes des autres options du check.

[Redémarrez l'Agent][3] pour commencer à envoyer vos métriques Supervisord à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `supervisord`                                                                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                      |
| `<CONFIG_INSTANCE>`  | `{"name":"<NOM_SERVEUR_SUPERVISORD>", "host":"%%host%%", "port":"9001", "user":"<UTILISATEUR>", "pass":"<MOTDEPASSE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `supervisord.d/conf.yaml` pour commencer à recueillir vos logs Supervisord :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: supervisord
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple supervisord.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `supervisord` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "supervisord" >}}


### Événements

Le check Supervisor n'inclut aucun événement.

### Checks de service

**supervisord.can_connect** :<br>
Renvoie CRITICAL si l'Agent ne parvient pas à se connecter au serveur HTTP ou au socket UNIX que vous avez configuré. Si ce n'est pas le cas, renvoie `OK`.

**supervisord.process.status** :<br>
L'Agent envoie ce check de service pour tous les processus enfants de supervisord (si aucune des options `proc_names` ou `proc_regex` n'est configurée) OU un ensemble de processus enfants (ceux qui sont configurés dans `proc_names` et/ou `proc_regex`), en appliquant le tag `supervisord_process:<nom_processus>` à chaque check de service.

Ce tableau montre le `supervisord.process.status` renvoyé pour chaque statut de supervisord :

| supervisord status | supervisord.process.status |
| ------------------ | -------------------------- |
| STOPPED            | CRITICAL                   |
| STARTING           | UNKNOWN                    |
| RUNNING            | OK                         |
| BACKOFF            | CRITICAL                   |
| STOPPING           | CRITICAL                   |
| EXITED             | CRITICAL                   |
| FATAL              | CRITICAL                   |
| UNKNOWN            | UNKNOWN                    |

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Supervisor surveille vos processus. Datadog surveille Supervisor.][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor