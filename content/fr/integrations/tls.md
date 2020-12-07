---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - web
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tls/README.md'
display_name: TLS
draft: false
git_integration_title: tls
guid: 4e27a211-a034-42dd-9939-9ef967b1da50
integration_id: tls
integration_title: TLS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tls.
metric_to_check: tls.seconds_left
name: tls
public_title: Intégration Datadog/TLS
short_description: 'Surveillez les versions du protocole TLS, l''expiration et la validité des certificats, etc.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les versions du protocole [TLS][1], l'expiration et la validité des certificats, etc.

**Remarques** :

1. Seul le protocole TCP est pris en charge.
2. Seuls les certificats utilisateur finaux/feuille sont vérifiés (et pas les certificats racine et intermédiaires).

## Configuration

### Installation

Le check TLS est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `tls.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données TLS. Consultez le [fichier d'exemple tls.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `tls`                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"server": "%%host%%", "port":"443"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `tls` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tls" >}}


### Événements

TLS n'inclut aucun événement.

### Checks de service

Consultez le fichier [service_checks.json][4] pour afficher la liste des checks de service fournis par cette intégration :

**tls.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

**tls.version** :<br>
Renvoie `CRITICAL` si une connexion à une version non autorisée du protocole est établie. Si ce n'est pas le cas, renvoie `OK`.

**tls.cert_validation** :<br>
Renvoie `CRITICAL` si le certificat est incorrect ou ne correspond pas au hostname du serveur. Si ce n'est pas le cas, renvoie `OK`.

**tls.cert_expiration** :<br>
Renvoie `CRITICAL` si le certificat a expiré ou expire dans moins de `days_critical`/`seconds_critical`, renvoie `WARNING` s'il expire dans moins de `days_warning`/`seconds_warning`, ou renvoie `OK` pour les autres cas.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/tls/assets/service_checks.json
[5]: https://docs.datadoghq.com/fr/help/