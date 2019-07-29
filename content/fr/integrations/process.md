---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/process/README.md'
display_name: Processus
git_integration_title: process
guid: 1675eced-b435-464a-8f84-f65e438f838e
integration_id: system
integration_title: Processus
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.processes.cpu.pct
name: process
public_title: Intégration Datadog/Processus
short_description: Recueillez des métriques et surveillez le statut des processus en cours d'exécution.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le check de processus de l'Agent vous permet de :

* Recueillir des métriques d'utilisation des ressources pour des processus en cours d'exécution spécifiques sur n'importe quel host : processeur, mémoire, E/S, nombre de threads, etc.
* Tirer parti des [monitors de processus][1] : configurez des seuils pour le nombre d'instances d'un processus spécifique à exécuter et recevez des alertes lorsque les seuils ne sont pas atteints (voir la section **Checks de service** ci-dessous).

## Implémentation
### Installation

Le check de processus est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Contrairement à de nombreux checks, le check de processus ne surveille aucun processus utile par défaut. Vous devez lui indiquer les processus à surveiller et la méthode à employer.

Bien qu'il n'y ait pas de configuration standard par défaut, voici un exemple de configuration `process.d/conf.yaml` qui permet de surveiller les processus ssh/sshd. Consultez le [fichier d'exemple process.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - name: ssh
    search_string: ['ssh', 'sshd']

# Pour rechercher des processus sshd grâce à une ligne de commande exacte
# - name: ssh
#   search_string: ['/usr/sbin/sshd -D']
#   exact_match: True
```

Notre check de processus utilise le paquet Python psutil afin de [vérifier les processus sur votre machine][3]. Par défaut, ce check de processus recherche des correspondances exactes et analyse les noms des processus uniquement. Si vous définissez `exact_match` sur **False** dans votre fichier yaml, l'Agent examinera la commande utilisée pour lancer votre processus et reconnaîtra tous les processus qui contiennent vos mots clés.

Vous pouvez également configurer le check de façon à rechercher les processus correspondants à un PID (`pid`) ou à un pidfile (`pid_file`) précis. Si vous spécifiez plusieurs `search_string`, `pid` et `pid_file`, le check utilise la première option qu'il trouve dans cet ordre (par ex., il utilise `search_string` avant `pid_file` si elles sont toutes les deux configurées).

**Remarque** : pour la version v6.11+ de l'Agent Windows, l'Agent s'exécute en tant que `ddagentuser` sans privilèges et n'a pas accès à la ligne de commande complète des processus qui s'exécutent sous un autre utilisateur. L'option `exact_match: false` ne peut donc pas être utilisée dans ce cas de figure. Il en va de même pour l'option `user`, qui vous permet de sélectionner seulement les processus qui appartiennent à un utilisateur spécifique.

Pour que le check recherche des processus dans un autre chemin que `/proc`, définissez `procfs_path: <votre_chemin_proc>` dans `datadog.conf`, et NON PAS dans `process.yaml` (ce chemin est obsolète). Définissez-le sur `/host/proc` si vous exécutez l'Agent à partir d'un conteneur Docker (par ex., [docker-dd-agent][4]) et que vous souhaitez surveiller les processus en cours d'exécution sur le serveur hébergeant vos conteneurs. Vous n'avez PAS besoin de le configurer de façon à surveiller les processus en cours d'exécution _dans_ vos conteneurs, car le [check Docker][5] les surveille déjà.

Pour récupérer certaines métriques de processus, le collecteur Datadog doit être exécuté avec le même utilisateur que celui du processus surveillé ou disposer des droits d'accès adéquats.
Lorsque la première option n'est pas souhaitée et afin d'éviter l'exécution du collecteur Datadog en tant que `root`, l'option `try_sudo` permet au check de processus d'utiliser `sudo` pour recueillir cette métrique.
Pour l'instant, seule la métrique `open_file_descriptors` sur les plates-formes Unix accepte ce paramètre.
Remarque : cela ne fonctionne que si les règles sudoers appropriées ont été configurées.
```
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

Consultez l'[exemple de configuration][2] pour en savoir plus sur les options de configuration disponibles.

[Redémarrez l'Agent][6] pour commencer à envoyer vos métriques de processus et vos checks de service à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `process` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "processus" >}}


Toutes les métriques sont envoyées pour chaque `instance` configurée dans process.yaml et reçoivent le tag `nom_processus:<nom_instance>`.

### Événements
Le check de processus n'inclut aucun événement.

### Checks de service
**process.up** :

L'Agent envoie un check de service pour chaque instance dans `process.yaml`, et leur attribue le tag : `process:<nom>`.

Lorsqu'aucune valeur `thresholds` n'est spécifiée pour une instance, le check de service renvoie le statut CRITICAL (aucun processus n'est en cours d'exécution) ou OK (au moins un processus est en cours d'exécution).

Voici un exemple pour une instance avec une valeur `thresholds` spécifiée :

```
instances:
  - name: my_worker_process
    search_string: ['/usr/local/bin/worker']
    thresholds:
      critical: [1, 7]
      warning: [3, 5]
```

L'Agent envoie un `process.up` avec le tag `process:my_worker_process` dont le statut est :

- CRITICAL lorsqu'il y a moins de 1 ou plus de 7 processus de travail
- WARNING lorsqu'il y a 1, 2, 6 ou 7 processus de travail
- OK lorsqu'il y a 3, 4 ou 5 processus de travail

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) surveiller l'utilisation des ressources de processus avec Datadog, lisez nos [articles de blog][11] à ce sujet.


[1]: https://docs.datadoghq.com/fr/monitoring/#process
[2]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/process.py#L117
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/integrations-core/tree/master/docker_daemon
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
[9]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/process-check-monitoring


{{< get-dependencies >}}