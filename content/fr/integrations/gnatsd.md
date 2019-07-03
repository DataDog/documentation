---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - messaging
  - notification
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md'
display_name: Gnatsd
git_integration_title: gnatsd
guid: 7edcf450-d9cf-44aa-9053-ece04ac7c21d
integration_id: gnatsd
integration_title: Gnatsd
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd
public_title: Intégration Datadog/Gnatsd
short_description: Surveillez le cluster gnatsd avec Datadog.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service gnatsd en temps réel pour :

* Visualiser et surveiller les états de gnatsd
* Être informé des failovers et des événements de gnatsd

## Implémentation

### Installation

Pour installer le check Gnatsd sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build gnatsd` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/dist/gnatsd/<NOM_ARTEFACT>.whl`.

### Configuration

Modifiez le fichier `gnatsd.yaml` afin de spécifier votre serveur et votre port. Définissez ensuite les masters à surveiller.

* host : permet de définir le host gnatsd à surveiller.
* port : permet de définir le port de _surveillance_ utilisé par gnatsd.
* tags : permet d'ajouter ces tags aux métriques enregistrées.
* server_name : permet de définir le contenu à afficher dans Datadog.

### Validation

Lorsque vous exécutez `datadog-agent info`, voici ce qui s'affiche :

    Checks
    ======

        gnatsd
        -----------
          - instance #0 [OK]
          - Collected 23 metrics, 0 events & 1 service checks

## Compatibilité

Le check gnatsd est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "gnatsd" >}}


**Remarque** : si vous utilisez des noms de cluster Nats personnalisés, vos métriques possèdent le format suivant :  
`gnatsd.connz.connections.nom_cluster.in_msgs`

### Événements
Le check gnatsd n'inclut aucun événement.

### Checks de service
Ce check gnatsd applique les tags suivants à l'ensemble des checks de service recueillis ;

* `server_name:<nom_serveur_en_yaml>`
* `url:<host_en_yaml>`

`gnatsd.can_connect` :
Renvoie `CRITICAL` si l'Agent n'est pas capable de recevoir la valeur 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[2]: http://docs.datadoghq.com/help/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent


{{< get-dependencies >}}