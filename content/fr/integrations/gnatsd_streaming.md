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

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check gnatsd_streaming sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec [une version antérieure à 6.8][2] ou avec l'[Agent Docker][3] :

1. Installez le [kit de développement][4].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `gnatsd_streaming`, exécutez :

    ```
    ddev -e release build gnatsd_streaming
    ```

5. [Téléchargez et lancez l'Agent Datadog][5].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_GNATSD_STREAMING_ARTIFACT_>/<GNATSD_STREAMING_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `gnatsd_streaming.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) GnatsD Streaming.
  Consultez le [fichier d'exemple gnatsd_streaming.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `gnatsd_streaming` dans la section Checks.

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
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}