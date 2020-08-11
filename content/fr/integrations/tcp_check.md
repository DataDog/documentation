---
aliases:
  - /fr/guides/network_checks
  - /fr/integrations/tcpcheck
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tcp_check/README.md'
display_name: TCP
git_integration_title: tcp_check
guid: c514029e-0ed8-4c9f-abe5-2fd4096726ba
integration_id: system
integration_title: Check TCP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.tcp.can_connect
name: tcp_check
public_title: Intégration Datadog/Check TCP
short_description: Surveillez la connectivité TCP vers les hosts à distance.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique réseau][1]

## Présentation

Surveillez la connectivité TCP et le délai de réponse pour n'importe quel host ou port.

## Configuration

### Installation

Le check TCP est inclus avec le package de [l'Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur les hosts à partir desquels vous souhaitez sonder vos ports TCP. Bien qu'il soit généralement préférable d'exécuter les checks axés sur des métriques sur le même host que celui du service surveillé, ce check axé sur des statuts peut être lancé sur des hosts qui n'exécutent pas les services TCP surveillés (pour tester la connectivité à distance, par exemple).

### Configuration

#### Host

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

Modifiez le fichier `tcp_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple tcp_check.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - name: SSH check
    host: jumphost.example.com # ou une adresse IPv4/IPv6 address
    port: 22
    collect_response_time: true # pour recueiilir network.tcp.response_time. Défini sur false par défaut.
```

Options de configuration :

- `name` (obligatoire) : le nom du service. Il sera inclus sous forme de tag : `instance:<nom>`. Remarque : les espaces et les tirets dans le nom du tag seront convertis en underscores.
- `host` (obligatoire) : le host à vérifier. Il sera inclus sous forme de tag : `url:<host>:<port>`.
- `port` (obligatoire) : le port à vérifier. Il sera inclus sous forme de tag : `url:<host>:<port>`.
- `timeout` (facultatif) : le délai d'expiration du check. Valeur par défaut : 10 secondes.
- `collect_response_time` (facultatif) : valeur par défaut : false. Si cette option n'est pas définie sur true, aucune métrique de délai de réponse ne sera recueillie. Si elle est définie sur true, la métrique renvoyée sera `network.tcp.response_time`.
- `tags` (facultatif) : les tags à attribuer à la métrique.

[Redémarrez l'Agent][5] pour commencer à envoyer vos checks de service et délais de réponse TCP à Datadog.

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `tcp_check`                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                 |
| `<CONFIG_INSTANCE>`  | `{"name": "<NOM_INSTANCE_CHECK_TCP>", "host":"%%host%%", "port":"%%port%%"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `tcp_check` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tcp_check" >}}


### Événements

Le check TCP n'inclut aucun événement.

### Checks de service

**`tcp.can_connect`** :

Renvoie DOWN si l'Agent ne parvient pas à se connecter au `host` et au `port` configurés. Si ce n'est pas le cas, renvoie UP.

Pour créer des conditions d'alerte sur ce check de service dans Datadog, sélectionnez **Network** sur la page [Create Monitor][9], et non **Integration**.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tcp_check/images/netgraphs.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/datadog_checks/tcp_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/metadata.csv
[9]: https://app.datadoghq.com/monitors#/create
[10]: https://docs.datadoghq.com/fr/help/