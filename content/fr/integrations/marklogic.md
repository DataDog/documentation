---
categories:
  - Collecte de logs
description: Recueillez vos logs en provenance de Marklogic et envoyez-les à Datadog.
has_logo: true
integration_title: Marklogic
is_public: true
kind: integration
name: marklogic
public_title: Intégration Datadog/Marklogic
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/marklogic.md'
short_description: Recueillez vos logs en provenance de Marklogic et envoyez-les à Datadog.
---
## Présentation

Recueillez vos logs en provenance de Marklogic et envoyez-les à Datadog.

## Configuration

### Installation

L'intégration Marklogic est incluse avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre host.

### Configuration

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `marklogic.d/conf.yaml` pour commencer à recueillir vos logs MarkLogic :

    ```yaml
    logs:
        - type: file
          path: '<MARKLOGIC_LOG_FILE_PATH>'
          source: marklogic
          sourcecategory: database
          service: '<SERVICE>'
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][2].

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `marklogic` dans la section Checks.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
[3]: /fr/agent/guide/agent-commands/#agent-status-and-information