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
display_name: Process
git_integration_title: process
guid: 1675eced-b435-464a-8f84-f65e438f838e
integration_id: system
integration_title: Processes
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

Contrairement à de nombreux checks, le check de processus ne surveille aucun processus utile par défaut. Vous devez configurer les processus que vous souhaitez surveiller et la méthode à employer.

1. Bien qu'il n'y ait pas de configuration standard par défaut, voici un exemple de configuration `process.d/conf.yaml` qui permet de surveiller les processus ssh/sshd. Consultez le [fichier d'exemple process.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

    ```yaml
      init_config:

      instances:

          ## @param name - string - required
          ## Used to uniquely identify your metrics
          ## as they are tagged with this name in Datadog.
          #
        - name: ssh

          ## @param search_string - list of strings - required
          ## If one of the elements in the list matches, it return the count of
          ## all the processes that match the string exactly by default.
          ## Change this behavior with the parameter `exact_match: false`.
          #
          search_string: ['ssh', 'sshd']
    ```

    Pour récupérer certaines métriques de processus, le Collector Datadog doit être exécuté avec le même utilisateur que celui du processus surveillé ou disposer des droits d'accès adéquats. Lorsque la première option n'est pas souhaitée et afin d'éviter l'exécution du Collector Datadog en tant que `root`, l'option `try_sudo` permet au check de processus d'utiliser `sudo` pour recueillir cette métrique. Pour l'instant, seule la métrique `open_file_descriptors` sur les plateformes Unix accepte ce paramètre. Remarque : cela ne fonctionne que si les règles sudoers appropriées ont été configurées :

    ```
    dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
    ```

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `process` dans la section Checks.

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

- CRITICAL lorsqu'il y a moins de 1 ou plus de 7 processus worker
- WARNING lorsqu'il y a 1, 2, 6 ou 7 processus worker
- OK lorsqu'il y a 3, 4 ou 5 processus worker

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) surveiller l'utilisation des ressources de processus avec Datadog, lisez notre [série d'articles de blog][12] à ce sujet.


[1]: https://docs.datadoghq.com/fr/monitoring/#process
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/process.py#L117
[5]: https://github.com/DataDog/docker-dd-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/docker_daemon
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/fr/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
[10]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://www.datadoghq.com/blog/process-check-monitoring