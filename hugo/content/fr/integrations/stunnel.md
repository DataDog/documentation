---
categories:
  - log collection
description: Recueillez les logs issus de votre proxy Stunnel et envoyez-les à Datadog.
has_logo: true
integration_title: Stunnel
is_public: true
custom_kind: integration
name: Stunnel
public_title: Intégration Datadog/Stunnel
short_description: Recueillez les logs issus de votre proxy Stunnel et envoyez-les à Datadog.
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/stunnel.md
integration_id: stunnel
---
## Présentation

Stunnel est un proxy conçu pour ajouter la fonctionnalité de chiffrement TLS aux clients et serveurs existants sans modifier le code du programme.

Utilisez l'intégration Datadog/proxy Stunnel pour surveiller les potentiels problèmes de réseau ou attaques DDoS.

## Configuration

### Installation

Vous devez [installer l'Agent Datadog][1] sur le serveur qui exécute Stunnel.

### Configuration

Créez un fichier `stunnel.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos logs de proxy Stunnel.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `stunnel.d/conf.yaml` pour commencer à recueillir vos logs Stunnel :

    ```yaml
    logs:
        - type: file
          path: /var/log/stunnel.log
          source: stunnel
          service: '<MY_SERVICE>'
          sourcecategory: proxy
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `stunnel` dans la section Checks.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /fr/agent/guide/agent-commands/#agent-status-and-information