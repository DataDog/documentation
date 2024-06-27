---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    postfix: assets/dashboards/postfix_dashboard.json
  logs:
    source: postfix
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    postfix_processes: assets/saved_views/postfix_processes.json
  service_checks: assets/service_checks.json
categories:
- Collaboration
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/postfix/README.md
display_name: Postfix
draft: false
git_integration_title: postfix
guid: 7f03c5b7-ee54-466e-8854-5896d62c82b4
integration_id: postfix
integration_title: Postfix
integration_version: 1.12.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postfix.
metric_to_check: postfix.queue.size
name: postfix
process_signatures:
- postfix start
- sendmail -bd
public_title: Intégration Datadog/Postfix
short_description: Surveillez la taille de toutes vos files d'attente Postfix.
support: core
supported_os:
- linux
- mac_os
---



![Graphique Postfix][1]

## Présentation

Ce check surveille la taille de toutes les files d'attente Postfix.

## Configuration

### Installation

Le check Postfix est inclus dans le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Postfix.

### Configuration

Ce check peut être configuré de façon à le faire utiliser la commande `find`, ce qui nécessite d'accorder un accès `sudo` à l'utilisateur `dd-agent` pour qu'il puisse obtenir le nombre de messages dans les files d'attente d'e-mails de types `incoming`, `active` et `deferred`.

Vous pouvez également configurer l'agent de façon à le faire utiliser une commande `postqueue -p` intégrée afin d'obtenir le nombre de messages dans les files d'attente d'e-mails de types `active`, `hold` et `deferred`. La commande `postqueue` est exécutée avec les droits de groupe setgid sans que `sudo` soit nécessaire.

**AVERTISSEMENT** : l'utilisation de la commande `postqueue` pour surveiller les files d'attente d'e-mails ne permet pas d'obtenir le nombre de messages dans la file d'attente `incoming`.

#### Collecte de métriques

##### Utilisation de sudo

1. Modifiez le fichier `postfix.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple postfix.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:
     ## @param postfix_user - string - required
     ## The user running dd-agent must have passwordless sudo access for the find
     ## command to run the postfix check.  Here's an example:
     ## example /etc/sudoers entry:
     ##   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
     ##
     ## Redhat/CentOS/Amazon Linux flavours need to add:
     ##          Defaults:dd-agent !requiretty
     #
     postfix_user: postfix

   instances:
     ## @param directory - string - optional - default: /var/spool/postfix
     ## Path to the postfix directory. The directory option is required if `postqueue: false` is set. For more 
     ## information see https://docs.datadoghq.com/integrations/postfix/#using-sudo.
     #
     - directory: /var/spool/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. Pour chaque file d'attente d'e-mails dans `queues`, l'Agent effectue un fork() du `find` sur son répertoire. Comme il utilise `sudo` pour effectuer cette action avec les privilèges de l'utilisateur Postfix, vous devez ajouter les lignes suivantes à `/etc/sudoers` pour l'utilisateur de l'Agent, `dd-agent`, en supposant que Postfix s'exécute en tant que `postfix` :

   ```text
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
   ```

3. [Redémarrez l'Agent][5].

##### Utilisation de postqueue

1. Modifiez le fichier `postfix.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] :

   ```yaml
   init_config:
     ## @param postqueue - boolean - optional - default: false
     ## Set `postqueue: true` to gather mail queue counts using `postqueue -p`
     ## without the use of sudo. Postqueue binary is ran with set-group ID privileges,
     ## so that it can connect to Postfix daemon processes.
     ## Only `tags` keys are used from `instances` definition.
     ## Postfix has internal access controls that limit activities on the mail queue.
     ## By default, Postfix allows `anyone` to view the queue. On production systems
     ## where the Postfix installation may be configured with stricter access controls,
     ## you may need to grant the dd-agent user access to view the mail queue.
     ##
     ## postconf -e "authorized_mailq_users = dd-agent"
     ##
     ## http://www.postfix.org/postqueue.1.html
     ##
     ## authorized_mailq_users (static:anyone)
     ## List of users who are authorized to view the queue.
     #
     postqueue: true

   instances:
     ## @param config_directory - string - optional
     ## The config_directory option only applies when `postqueue: true`.
     ## The config_directory is the location of the Postfix configuration directory
     ## where main.cf lives.
     #
     - config_directory: /etc/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. Pour chaque `config_directory` dans `instances`, l'Agent effectue un fork de `postqueue -c` pour le répertoire de configuration de Postfix. Postfix offre des contrôles d'accès internes qui limitent les opérations pouvant être effectuées sur la file d'attente d'e-mails. L'option par défaut `anyone` de Postfix permet à tout le monde de consulter la file d'attente. Sur les systèmes de production sur lesquels une installation Postfix peut être configurée avec des contrôles d'accès plus stricts, vous devrez peut-être accorder à l'utilisateur `dd-agent` un accès en lecture à la file d'attente d'e-mails. Consultez la [documentation Postfix sur la commande postqueue][6] (en anglais) pour en savoir plus.

   ```shell
   postconf -e "authorized_mailq_users = dd-agent"
   ```

   Liste des utilisateurs autorisés à consulter la file d'attente :

   ```shell
   authorized_mailq_users (static:anyone)
   ```

3. [Redémarrez l'Agent][5].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Postfix envoie des logs au daemon syslog, qui enregistre alors les logs dans le système de fichiers. La convention de nommage et les destinations des fichiers log sont configurables :

```text
/etc/syslog.conf:
    mail.err                                    /dev/console
    mail.debug                                  /var/log/mail.log
```

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez le bloc de configuration suivant à votre fichier `postfix.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postfix.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/mail.log
       source: postfix
       service: myapp
   ```

3. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `postfix` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "postfix" >}}


### Événements

Le check Postfix n'inclut aucun événement.

### Checks de service

Le check Postfix n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les performances de files d'attente Postfix][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: http://www.postfix.org/postqueue.1.html
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://www.datadoghq.com/blog/monitor-postfix-queues