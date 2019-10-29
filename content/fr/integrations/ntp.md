---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ntp/README.md'
display_name: NTP
git_integration_title: ntp
guid: 9d105f8c-7fd3-48d7-a5d1-1cc386ec0367
integration_id: ntp
integration_title: NTP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ntp.
metric_to_check: ntp.offset
name: ntp
public_title: Intégration Datadog/NTP
short_description: Recevez des alertes lorsque vos hosts se désynchronisent du serveur NTP de votre choix. server.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration Network Time Protocol (NTP) est activée par défaut et signale les décalages temporels avec un serveur NTP toutes les 15 minutes. Lorsque l'Agent local est décalé de plus de 15 secondes par rapport au service Datadog et aux autres hosts surveillés, vous risquez de rencontrer les problèmes suivants :

* Déclencheurs d'alertes non valides
* Retards de métriques
* Intervalles vides dans les graphiques de métriques

Serveurs NTP atteints par défaut :

* `0.datadog.pool.ntp.org`
* `1.datadog.pool.ntp.org`
* `2.datadog.pool.ntp.org`
* `3.datadog.pool.ntp.org`

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check NTP est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

L'Agent active le check NTP par défaut. Si toutefois vous souhaitez le configurer vous-même, modifiez le fichier `ntp.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple ntp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - offset_threshold : 60 # Nombre de secondes de décalage entre l'horloge locale et le serveur NTP à partir duquel le check de service ntp.in_sync doit envoyer un statut CRITICAL. Valeur par défaut ‭: 60.
#   host: pool.ntp.org # Définir cette option pour utiliser le serveur NTP de votre choix.
#   port: 1234         # Définir en même temps que le host.
#   version: 3         # Pour utiliser une version spécifique de NTP.
#   timeout: 5         # Délai d'attente d'une réponse du serveur NTP en secondes. Valeur par défaut : 1.
#   use_local_defined_servers: false # Utiliser les serveurs NTP définis dans le localhost. Valeur par défaut : false.
```

Options de configuration :

* `host` (facultatif) : hostname du serveur NTP alternatif, par exemple `pool.ntp.org`.
* `port` (facultatif) : le port à utiliser.
* `version` (facultatif) : version de NTP.
* `timeout` (facultatif) : délai de réponse.
* `use_local_defined_servers` (facultatif) : définir sur True pour utiliser les serveurs NTP définis dans le localhost. Pour les systèmes Unix, les serveurs définis dans /etc/ntp.conf et etc/xntp.conf sont utilisés. Pour les systèmes Windows, les serveurs définis dans la clé de registre HKLM\SYSTEM\CurrentControlSet\Services\W32Time\Parameters\NtpServer sont utilisés. **Attention** : si vous activez cette option, le check NTP ne sera pas en mesure de détecter les problèmes en cas de dérèglement de l'horloge du serveur NTP cible du système.

[Redémarrez l'Agent][4] pour prendre en compte le changement de configuration.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ntp` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "ntp" >}}


### Événements
Le check NTP n'inclut aucun événement.

### Checks de service

`ntp.in_sync` :

Renvoie CRITICAL si le décalage avec NTP est supérieur au seuil indiqué dans `ntp.yaml`. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}