---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md'
display_name: Gnatsd_streaming
git_integration_title: gnatsd_streaming
guid: 0a849512-5823-4d9b-b378-aa9d8fb06231
integration_id: gnatsd-streaming
integration_title: Gnatsd_streaming
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd_streaming
public_title: Intégration Datadog/Gnatsd_streaming
short_description: Diffusion de serveur NATS
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service gnatsd_streaming en temps réel pour :

* Visualiser et surveiller les états de gnatsd_streaming
* Être informé des failovers et des événements de gnatsd_streaming

## Implémentation

### Installation

Pour installer le check Gnatsd_streaming sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build gnatsd_streaming` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/dist/gnatsd_streaming/<NOM_ARTEFACT>.whl`.

### Configuration

Modifiez le fichier `gnatsd_streaming.yaml` afin de spécifier votre serveur et votre port. Définissez ensuite les masters à surveiller.

Vous pouvez modifier le nombre de canaux renvoyés dans une requête HTTP unique avec le paramètre `pagination`
dans le fichier conf.yaml.

### Validation

Lorsque vous exécutez `datadog-agent info`, voici ce qui s'affiche :

    Checks
    ======

        gnatsd_streaming
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check gnatsd_streaming est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "gnatsd_streaming" >}}


Des tags basés sur des noms comme « nss-cluster_id » sont appliqués aux métriques de Nats Streaming Server.

### Événements

Si vous exécutez Nats Streaming Server dans un groupe de tolérance de panne, un événement de failover de diffusion Nats sera
transmis lorsque le statut du serveur passera de `FT_STANDBY` à `FT_ACTIVE`.

### Checks de service
Ce check gnatsd_streaming applique les tags suivants à l'ensemble des checks de service recueillis ;

  * `server_name:<nom_serveur_en_yaml>`
  * `url:<host_en_yaml>`

`gnatsd_streaming.can_connect` :
Renvoie `CRITICAL` si l'Agent n'est pas capable de recevoir la valeur 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[2]: http://docs.datadoghq.com/help/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent


{{< get-dependencies >}}