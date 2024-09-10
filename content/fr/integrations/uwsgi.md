---
title: uWSGI
name: uwsgi
custom_kind: integration
description: Recueillez les logs uWSGI pour suivre les requêtes par seconde, les octets traités, le statut des requêtes et plus encore.
short_description: Recueillez des logs pour suivre les requêtes par seconde, les octets traités, le statut des requêtes et plus encore.
categories:
  - log collection
  - web
doc_link: /integrations/uwsgi/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/uwsgi.md
has_logo: true
integration_title: uWSGI
is_public: true
public_title: Intégration Datadog/uWSGI
ddtype: check
git_integration_title: uwsgi
supported_os:
  - linux
  - mac_os
  - windows
integration_id: uwsgi
---
## Présentation

Recueillez les logs uWSGI pour suivre les requêtes par seconde, les octets traités, le statut des requêtes (2xx, 3xx, 4xx, 5xx), la disponibilité des services, la lenteur et plus encore.

## Configuration

### Installation

[Installez l'Agent][1] sur l'instance qui exécute le serveur uWSGI.

### Configuration

Par défaut, le serveur uWSGI envoie les logs vers stdout. Exécutez la commande suivante pour activer l'enregistrement des logs dans un fichier ou suivez les [instructions uWSGI pour loguer vers un fichier][2] :

```text
uwsgi --socket :3031 --logger file:logfile=/var/log/uwsgi/uwsgi.log,maxsize=2000000
```

Créez le fichier `uwsgi.d/conf.yaml` à la racine du répertoire de configuration de votre Agent.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

```yaml
logs_enabled: true
```

Ajoutez ensuite ce bloc de configuration à votre fichier `uwsgi.d/conf.yaml` pour commencer à recueillir vos logs :

```yaml
logs:
    - type: file
      path: /var/log/uwsgi/uwsgi.log
      service: '<MON_APPLICATION>'
      source: uwsgi
```

Pour terminer, [redémarrez l'Agent][3].

Par défaut, l'intégration Datadog/uWSGI prend en charge le [format de log uWSGI par défaut][4] et le [format de journalisation combiné Apache][5].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://uwsgi-docs.readthedocs.io/en/latest/Logging.html#logging-to-files
[3]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#uwsgi-default-logging
[5]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#apache-style-combined-request-logging
[6]: /fr/help/