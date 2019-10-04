---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Collaboration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/postfix/README.md'
display_name: Postfix
git_integration_title: postfix
guid: 7f03c5b7-ee54-466e-8854-5896d62c82b4
integration_id: postfix
integration_title: Postfix
is_public: true
kind: integration
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

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Postfix est inclus dans le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs Postfix.

## Configuration
Ce check peut être configuré de façon à le faire utiliser la commande `find`, ce qui nécessite d'accorder un accès sudo à l'utilisateur dd-agent pour obtenir le nombre de messages dans les files d'attente d'e-mails de types `incoming`, `active` et `deferred`.

Vous pouvez également configurer l'agent de façon à le faire utiliser une commande `postqueue -p` intégrée afin d'obtenir le nombre de messages dans les files d'attente d'e-mails de types `active`, `hold` et `deferred`. La commande `postqueue` est exécutée avec les droits de groupe setgid sans que sudo soit nécessaire.

**AVERTISSEMENT** : l'utilisation de la commande `postqueue` pour surveiller les files d'attente d'e-mails ne permet pas d'obtenir le nombre de messages dans la file d'attente `incoming`.

### Utilisation de sudo
Modifiez le fichier `postfix.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple postfix.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles :

```
init_config:
  postfix_user: postfix

instances:
  # ajoutez une instance pour chaque service postfix que vous souhaitez suivre
  - directory: /var/spool/postfix
    queues:
      - incoming
      - active
      - deferred
#   tags :
#     - tag_facultatif1
#     - tag_facultatif2
```

Pour chaque file d'attente d'e-mails dans `queues`, l'Agent effectue un fork() du `find` sur son répertoire.
Comme il utilise `sudo` pour effectuer cette action avec les privilèges de l'utilisateur Postfix, vous devez
ajouter les lignes suivantes à `/etc/sudoers` pour l'utilisateur de l'Agent, `dd-agent`,
en supposant que Postfix s'exécute en tant que `postfix` :
```
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
```

### Utilisation de postqueue
Modifiez le fichier `postfix.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] :

```
init_config:
  postqueue: true

instances:
  # L'option config_directory s'applique uniquement lorsque `postqueue: true`.
  # config_directory correspond à l'emplacement du répertoire de configuration de Postfix
  # où main.cf réside.
  - config_directory: /etc/postfix
#   tags :
#     - tag_facultatif
#     - tag_facultatif0
```
Pour chaque `config_directory` dans `instances`, l'Agent insère `postqueue -c` pour le répertoire de configuration de Postfix.

Postfix offre des contrôles d'accès internes qui limitent les opérations pouvant être effectuées sur la file d'attente d'e-mails. L'option par défaut `anyone` de Postfix permet à tout le monde de consulter la file d'attente. Sur les systèmes de production sur lesquels une installation Postfix peut être configurée avec des contrôles d'accès plus stricts, vous devrez peut-être accorder à l'utilisateur dd-agent un accès en lecture à la file d'attente d'e-mails.

```
postconf -e "authorized_mailq_users = dd-agent"
```
http://www.postfix.org/postqueue.1.html
```
authorized_mailq_users (static:anyone)
```
Liste des utilisateurs autorisés à consulter la file d'attente.

[Redémarrez l'Agent][6] pour commencer à envoyer des métriques Postfix à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Postfix envoie des logs au daemon syslog, qui enregistre alors les logs dans le système de fichiers.

La convention de nommage et les destinations des fichiers log sont configurables :

```
/etc/syslog.conf:
    mail.err                                    /dev/console
    mail.debug                                  /var/log/maillog
```


* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre fichier `datadog.yaml` :

  ```
  logs_enabled: true
  ```

* Ajoutez le bloc de configuration suivant à votre fichier `postfix.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postfix.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

  ```
  logs:
    - type: file
      path: /var/log/mail.log
      source: postfix
      service: myapp
  ```

* [Redémarrez l'Agent][7].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][8].**


### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `postfix` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "postfix" >}}


### Événements
Le check Postfix n'inclut aucun événement.

### Checks de service
Le check Postfix n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

* [Surveiller les performances de files d'attente Postfix][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://www.datadoghq.com/blog/monitor-postfix-queues
[8]: https://docs.datadoghq.com/fr/logs
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[11]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}