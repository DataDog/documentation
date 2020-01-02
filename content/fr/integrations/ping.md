---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/ping/README.md'
display_name: Ping
git_integration_title: ping
guid: c3be63cb-678e-4421-b470-79c03b3fe3f1
integration_id: ping
integration_title: Ping
is_public: true
kind: integration
maintainer: jim.stanton@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
name: ping
public_title: Intégration Datadog/Ping
short_description: Surveillez la connectivité vers les hosts à distance.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check utilise la commande [Ping][1] système pour tester l'accessibilité d'un host.
Il peut également mesurer la durée des aller-retour des messages envoyés par le check au
host de destination.

Ping fonctionne en envoyant des paquets de demande d'écho du protocole Internet Control Message Protocol (ICMP)
au host cible. Il attend ensuite une réponse d'écho ICMP.

Ce check utilise la commande Ping système au lieu de générer la demande d'écho du protocole ICMP.
En effet, la création d'un paquet ICMP nécessitant un socket brut, ce qui requiert
des privilèges racine que l'Agent ne détient pas. La commande Ping utilise le
flag d'accès `setuid` pour s'exécuter avec des privilèges élevés afin d'éviter le problème.

## Implémentation

Le check Ping n'est **PAS** inclus avec le paquet de l'[Agent Datadog][2].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Ping sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. Installez le [kit de développement][6].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `ping`, exécutez :

    ```
    ddev -e release build ping
    ```

5. [Téléchargez et lancez l'Agent Datadog][7].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    sudo -u dd-agent datadog-agent integration install -w <PATH_OF_PING_ARTIFACT_>/<PING_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][8].

### Configuration

1. Modifiez le fichier `ping.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ping.
   Consultez le [fichier d'exemple ping.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `ping` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ping" >}}


### Checks de service

**`network.ping.can_connect`** :

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter au host cible ou renvoie `OK` si la connexion au Ping est réussie.

### Événements

Le check Ping n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://en.wikipedia.org/wiki/Ping_(networking_utility)
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/fr/getting_started/integrations
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[13]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}