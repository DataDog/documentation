---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Vault - Overview: assets/dashboards/vault_overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - configuration & deployment
  - aws
  - google cloud
  - azure
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vault/README.md'
display_name: Vault
git_integration_title: vault
guid: d65af827-c818-44ce-9ec3-cd7ead3ac4ce
integration_id: vault
integration_title: Vault
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vault.
metric_to_check: vault.is_leader
name: vault
public_title: Intégration Datadog/Vault
short_description: Vault est un service de gestion de secrets
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille la santé du cluster [Vault][1] et les changements de leader.

## Configuration
### Installation

Le check Vault est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `vault.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de performance Vault. Consultez le [fichier d'exemple vault.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

#### Environnement conteneurisé
Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                    |
|----------------------|------------------------------------------|
| `<NOM_INTÉGRATION>` | `vault`                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                            |
| `<CONFIG_INSTANCE>`  | `{"api_url": "http://%%host%%:8200/v1"}` |

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

```
logs_enabled: true
```

2. Configurez Vault de façon à activer les logs d'audit et serveur.
    * Les logs d'audit doivent être activés par un utilisateur disposant des privilèges et des politiques nécessaires. Consultez la documentation [Activer des audit devices][11] (en anglais) pour en savoir plus.
        ```
        $ vault audit enable file file_path=/vault/vault-audit.log
        ```
    *  Assurez-vous que les [logs serveur][12] sont écrits dans un fichier. Vous pouvez configurer les logs serveur statiques dans le [script de lancement systemd de Vault][13].
        Le script suivant permet d'écrire les logs dans `/var/log/vault.log`.
        ```
        ...
        [Service]
        ...
        ExecStart=/bin/sh -c '/home/vagrant/bin/vault server -config=/home/vagrant/vault_nano/config/vault -log-level="trace" > /var/log/vault.log
        ...
        ```

3. Ajoutez ce bloc de configuration à votre fichier `vault.d/conf.yaml` pour commencer à recueillir vos logs Vault :
    ````yaml
    logs:
    - type: file
      path: /vault/vault-audit.log
      source: vault
      service: <SERVICE_NAME>
    - type: file
      path: /var/log/vault.log
      source: vault
      service: <SERVICE_NAME>
    ```

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `vault` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "vault" >}}


### Événements

`vault.leader_change` :
Cet événement se déclenche en cas de changement de leader du cluster.

### Checks de service

`vault.can_connect` :
Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à Vault. Si ce n'est pas le cas, renvoie OK.

`vault.unsealed` :
Renvoie CRITICAL si Vault est scellé. Si ce n'est pas le cas, renvoie OK.

`vault.initialized` :
Renvoie CRITICAL si Vault n'est pas encore initialisé. Si ce n'est pas le cas, renvoie OK.

`vault.prometheus.health`:
Renvoie CRITICAL si le check ne parvient pas à se connecter à l'endpoint de métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Surveiller HashiCorp Vault avec Datadog][10]

[1]: https://www.vaultproject.io
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/vault/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog
[11]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#enabling-audit-devices
[12]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#vault-server-logs
[13]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#not-finding-the-server-logs

