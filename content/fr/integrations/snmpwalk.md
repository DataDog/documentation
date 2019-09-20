---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md'
display_name: Snmpwalk
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
integration_id: snmpwalk
integration_title: "SNMP\_walk"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: snmpwalk
public_title: "Intégration Datadog/SNMP\_walk"
short_description: snmpwalk description.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service SNMP walk en temps réel pour :

* Visualiser et surveiller les états de SNMP walk
* Être informé des failovers et des événements de SNMP walk


## Implémentation

Le check SNMP walk n'est **PAS** inclus dans le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check SNMP walk sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `snmpwalk`, exécutez :

    ```
    ddev -e release build snmpwalk
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_SNMPWALK_ARTIFACT_>/<SNMPWALK_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `snmpwalk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metrics) SNMP walk.
  Consultez le [fichier d'exemple snmpwalk.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `snmpwalk` dans la section Checks.

## Données collectées
### Métriques
Le check SNMP walk n'inclut aucune métrique.

### Événements
Le check SNMP walk n'inclut aucun événement.

### Checks de service
**`snmpwalk.can_check`**

Le check renvoie :

* `OK` si le check est capable de recueillir des métriques à partir de `snmpwalk`.
* `CRITICAL` si le check rencontre une erreur lors de la tentative de collecte de métriques à partir de `snmpwalk`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}