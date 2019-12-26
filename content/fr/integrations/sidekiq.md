---
categories:
  - Collecte de logs
description: Recueillez vos logs issus de Sidekiq et envoyez-les à Datadog.
has_logo: true
integration_title: Sidekiq
is_public: true
kind: integration
name: sidekiq
public_title: Intégration Datadog/Sidekiq
short_description: Recueillez vos logs issus de Sidekiq et envoyez-les à Datadog.
---
## Présentation

Connectez les logs Sidekiq à Datadog afin de suivre le nombre de requêtes par seconde et le volume d'octets traités, de dépanner les erreurs et de surveiller les mises à jour de document.

Cette intégration prend en charge aussi bien les logs d'accès que les logs d'erreur.

## Implémentation
### Installation


L'intégration Sidekiq est incluse avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos hosts.

### Configuration
#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `sidekiq.d/conf.yaml` pour commencer à recueillir vos logs Sidekiq :

    ```
      logs:
          - type: file
            path: <SIDEKIQ_LOG_FILE_PATH>
            source: sidekiq
            sourcecategory: jobrunner
            service: <SERVICE>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Si vous ne parvenez pas à trouver vos logs, [vous pouvez consulter la documentation relative à sidekiq pour découvrir comment modifier vos paramètres de journalisation][2].

3. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `sidekiq` dans la section Checks.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/agent/guide/agent-commands/#agent-status-and-information