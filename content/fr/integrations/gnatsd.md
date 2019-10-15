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

Recueillez des métriques du service Gnatsd en temps réel pour :

* Visualiser et surveiller les états de Gnatsd
* Être informé des failovers et des événements de Gnatsd

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Gnatsd sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. Installez le [kit de développement][4].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `gnatsd`, exécutez :

    ```
    ddev -e release build gnatsd
    ```

5. [Téléchargez et lancez l'Agent Datadog][5].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_GNATSD_ARTIFACT_>/<GNATSD_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `gnatsd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) Gnatsd.
   Consultez le [fichier d'exemple gnatsd.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `gnatsd` dans la section Checks.

## Compatibilité

Le check gnatsd est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "gnatsd" >}}


**Remarque** : si vous utilisez des noms de cluster Nats personnalisés, vos métriques présentent le format suivant :
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
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[12]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}