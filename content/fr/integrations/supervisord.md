---
aliases:
  - /integrations/supervisor
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md'
display_name: Supervisord
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
short_description: 'Surveillez l''état, la disponibilité et le nombre de processus gérés par supervisor.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Événement Supervisor][1]

## Présentation

Ce check surveille la disponibilité, l'état et le nombre de processus s'exécutant sous supervisord.

## Implémentation
### Installation

Le check Supervisor est inclus dans le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur les serveurs qui exécutent Supervisor.

### Configuration

#### Préparer supervisord

L'Agent peut recueillir des données à partir de Supervisor via un serveur HTTP ou un socket UNIX. L'Agent recueille les mêmes données quelle que soit la méthode de collecte que vous configurez.

##### Serveur HTTP

Ajoutez un bloc comme celui-ci au principal fichier de configuration de supervisor (par exemple, `/etc/supervisor.conf`) :

```
[inet_http_server]
port=localhost:9001
username=user  # facultatif
password=pass  # facultatif
```

##### Socket UNIX

Ajoutez des blocs comme ceux-ci au fichier `/etc/supervisor.conf` (s'ils ne sont pas déjà présents) :

```
[supervisorctl]
serverurl=unix:///var/run//supervisor.sock

[unix_http_server]
file=/var/run/supervisor.sock
chmod=777
```

Si supervisor est exécuté en mode root, assurez-vous que `chmod` est défini de façon à ce que les utilisateurs non root (c'est-à-dire, dd-agent) puissent lire le socket.

---

Rechargez supervisord.

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

Modifiez le fichier `supervisord.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de [configuration de votre Agent][3]. Consultez le [fichier d'exemple supervisord.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - name: supervisord0 # utilisé pour taguer les checks de service et les métriques, p. ex. supervisor_server:supervisord0
    host: localhost
    port: 9001

 # Pour effectuer la collecte à partir du socket
 #- name: supervisord0
 #  host: http://127.0.0.1
 #  socket: unix:///var/run//supervisor.sock
```

Utilisez les options `proc_names` et/ou `proc_regex` pour énumérer les processus pour lesquels vous souhaitez que l'Agent recueille des métriques et crée des checks de service. Si aucune de ces options n'est spécifiée, l'Agent suit _tous_ les processus enfants de supervisord. Si les deux options sont spécifiées, l'Agent suit les processus présents dans les deux listes (en d'autres termes, les deux options ne sont pas mutuellement exclusives).

Options de configuration

* `name` (obligatoire) : nom arbitraire permettant d'identifier le serveur supervisord.
* `host` (facultatif) : localhost par défaut. Le host sur lequel le serveur supervisord s'exécute.
* `port` (facultatif) : 9001 par défaut. Le numéro de port.
* `user` (facultatif) : nom d'utilisateur.
* `pass` (facultatif) : mot de passe.
* `proc_names` (facultatif) : annuaire des noms de processus à surveiller.
* `server_check` (facultatif) : true par défaut. Check de service pour la connexion au serveur supervisord.
* `socket` (facultatif) : en cas d'utilisation de supervisorctl pour communiquer avec supervisor, un socket est requis.

Consultez [un exemple de check de configuration][4] pour obtenir les descriptions complètes des autres options de check.

[Redémarrez l'Agent][5] pour commencer à envoyer des métriques Supervisord à Datadog.

#### Environnement conteneurisé
Consultez la [documentation relative aux modèles d'intégration Autodiscovery][10] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                          |
|----------------------|--------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `supervisord`                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                  |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":"9001", "user":"<NOMUTILISATEUR>", "pass":"<MOTDEPASSE>"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `supervisord` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "supervisord" >}}


### Événements
Le check Supervisord n'inclut aucun événement.

### Checks de service

**supervisord.can_connect** :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter au serveur HTTP ou au socket UNIX que vous avez configuré. Si ce n'est pas le cas, renvoie OK.

**supervisord.process.status** :

L'Agent envoie ce check de service pour tous les processus enfants de supervisord (si aucune des options `proc_names` ou `proc_regex` n'est configurée) OU un ensemble de processus enfants (ceux qui sont configurés dans `proc_names` et/ou `proc_regex`), en appliquant le tag `supervisord_process:<nom_processus>` à chaque check de service.

Ce tableau montre le `supervisord.process.status` renvoyé pour chaque statut de supervisord :

| supervisord status | supervisord.process.status |
|--------------------|----------------------------|
| STOPPED            | CRITICAL                   |
| STARTING           | UNKNOWN                    |
| RUNNING            | OK                         |
| BACKOFF            | CRITICAL                   |
| STOPPING           | CRITICAL                   |
| EXITED             | CRITICAL                   |
| FATAL              | CRITICAL                   |
| UNKNOWN            | UNKNOWN                    |

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

* [Supervisor surveille vos processus. Datadog surveille Supervisor.][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/supervisord/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor
[10]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}