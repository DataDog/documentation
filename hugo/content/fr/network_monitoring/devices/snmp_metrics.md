---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentation
  text: Utiliser des profils avec le Network Device Monitoring
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centre de connaissances
  text: Présentation de la surveillance SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
title: Métriques SNMP
---
## Installation {#installation}

Network Device Monitoring repose sur l'intégration SNMP incluse dans le package [Datadog Agent][1] et prend en charge les trois versions de SNMP : `SNMPv1`, `SNMPv2` et `SNMPv3`. Lors de la découverte, le port SNMP (161 par défaut) est interrogé. Un périphérique est considéré comme découvert s'il y a une réponse et un profil correspondant.

## Prérequis {#pre-requisites}

Agent v7.32+

## Fonctionnement {#how-it-works}

Le diagramme suivant illustre les ports et protocoles par défaut entre le Datadog Agent et le périphérique surveillé. Pour les métriques SNMP, le Datadog Agent interroge les périphériques avec l'Autodiscovery, ou en fonction d'une configuration manuelle de l'adresse IP du périphérique. Le Datadog Agent, configuré avec NDM et déployé sur site ou dans le cloud, consolide toutes les données collectées sur les appareils et le réseau depuis votre réseau et les envoie à Datadog via HTTPS sur le port `443`. Cela permet une observabilité unifiée et complète des métriques, des logs, des traces, des monitors et des dashboards.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="Diagramme NDM montrant le flux pour l'interrogation des périphériques SNMP." style="width:90%;" >}}

## Étapes suivantes {#next-steps}

Suivez les instructions ci-dessous pour configurer Datadog afin de collecter les métriques SNMP de vos périphériques réseau.

## Configuration {#configuration}

La fonction Network Device Monitoring de Datadog permet de recueillir des métriques à partir de périphériques individuels, ou de découvrir automatiquement les périphériques (adresses IP uniques) sur un sous-réseau entier.

Choisissez la stratégie de collecte à utiliser en fonction du nombre de périphériques présents sur votre réseau et du degré de dynamisme de celui-ci (c'est-à-dire la fréquence à laquelle des périphériques sont ajoutés ou retirés) :

[Surveillance de périphériques individuels](#monitoring-individual-devices)
: Pour les réseaux de petite taille et principalement statiques.

[Autodiscovery](#autodiscovery)
: Pour les réseaux plus vastes ou dynamiques.

Quelle que soit la stratégie de collecte utilisée, tirez parti des [profils de périphériques mappés avec un sysObjectID][2] de Datadog pour recueillir automatiquement les métriques pertinentes à partir de vos périphériques.

### Surveillance de périphériques individuels {#monitoring-individual-devices}

Pour surveiller des périphériques individuels :

- Incluez l'adresse IP et toutes les métadonnées supplémentaires des périphériques (sous forme de tags) dans le fichier `snmp.d/conf.yaml` situé dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][3]. Consultez l'[exemple snmp.d/conf.yaml][4] pour connaître toutes les options de configuration disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Pour SNMPv2, configurez une instance en spécifiant l'adresse IP et la _chaîne de communauté_ du périphérique :

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      community_string: 'sample-string'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- Pour SNMPv3, configurez une instance en spécifiant l'adresse IP et les identifiants SNMPv3 du périphérique (le cas échéant), par exemple : `user`, `authProtocol`, `authKey`, `privProtocol` et `privKey` :

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      snmp_version: 3  # optional, if omitted which version of SNMP you are using is auto-detected
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{< /tabs >}}

- [Redémarrez l'Agent][5].

Après la configuration, l'Agent collecte les métriques pertinentes en faisant correspondre vos périphériques à l'un des [profils d'appareils pris en charge par Datadog][6].

Pour élargir votre configuration :

* Ajoutez d'autres instances pour collecter des métriques à partir d'un plus grand nombre de périphériques sur votre réseau.
* Utilisez [Autodiscovery](#autodiscovery) si vous devez collecter des métriques à partir d'un grand nombre de périphériques sur un réseau dynamique.

### Autodiscovery {#autodiscovery}

Une alternative à la spécification de périphériques individuels consiste à utiliser Autodiscovery pour découvrir automatiquement tous les périphériques de votre réseau.

Autodiscovery interroge chaque adresse IP sur le sous-réseau configuré et vérifie si le périphérique répond. Ensuite, le Datadog Agent recherche le `sysObjectID` du périphérique découvert et le fait correspondre à l'un des [profils d'appareils pris en charge par Datadog][6]. Les profils contiennent des listes de métriques prédéfinies à collecter pour différents types de périphériques.

Pour utiliser Autodiscovery avec la fonction Network Device Monitoring :

1. Installez ou mettez à niveau le Datadog Agent vers la version 7.27+. Pour obtenir des instructions spécifiques à votre plateforme, consultez la documentation du [Datadog Agent][7].

2. Modifiez le fichier de configuration de l'Agent [`datadog.yaml`][8] pour inclure tous les sous-réseaux que Datadog doit analyser. L'exemple de configuration suivant indique les paramètres obligatoires, les valeurs par défaut et des exemples pour Autodiscovery.

3. Vous pouvez éventuellement activer la déduplication des périphériques lors de l'Autodiscovery de l'Agent. Cette fonctionnalité est désactivée par défaut et nécessite l'Agent version 7.67+. Pour plus de détails, consultez le paramètre `use_deduplication` dans l'[exemple de fichier de configuration de l'Agent][11].

   ```yaml
   network_devices:
     autodiscovery:
       use_deduplication: true
   ```

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'  # enclose with single quote
        tags:
          - "key1:val1"
          - "key2:val2"
      - network_address: 10.20.0.0/24
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'
        tags:
          - "key1:val1"
          - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # enclose with single quote
        privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # enclose with single quote
        tags:
          - 'key1:val1'
          - 'key2:val2'
      - network_address: 10.20.0.0/24
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'
        authKey: 'fakeKey'
        privProtocol: 'AES256'
        privKey: 'fakePrivKey'
        tags:
          - 'key1:val1'
          - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : le Datadog Agent configure automatiquement la vérification SNMP avec chacune des adresses IP découvertes. Un périphérique découvert est une adresse IP qui répond correctement lorsqu'elle est interrogée via SNMP.

**Remarque** : Assurez-vous d'utiliser l'Agent 7.54+ pour cette syntaxe. Pour les versions précédentes, consultez le [config_template.yaml précédent][9].

### Remplacer la vitesse de l'interface {#override-interface-speed}

Par défaut, la vérification SNMP signale la vitesse de l'interface telle qu'elle est détectée depuis le périphérique. Si la vitesse du port physique diffère de la bande passante réelle du circuit, par exemple un port physique de 1 Gbit/s provisionné pour un circuit de 50 Mbit/s, vous pouvez remplacer la vitesse entrante et sortante pour des interfaces spécifiques en utilisant `interface_configs`.

Ajoutez `interface_configs` à la configuration de votre instance dans `snmp.d/conf.yaml` :

```yaml
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    interface_configs:
      - match_field: name      # match by interface name or ifIndex
        match_value: eth0      # case-sensitive
        in_speed: 50000000     # inbound speed in bytes per second (50 Mbps)
        out_speed: 50000000    # outbound speed in bytes per second (50 Mbps)
```

Pour toutes les options `interface_configs` disponibles, consultez le [sample snmp.d/conf.yaml][4].

## Validation {#validation}

[Exécutez la sous-commande de statut de l'Agent][10] et recherchez `snmp` dans la section Checks.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/network_monitoring/devices/supported_devices
[7]: /fr/agent
[8]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855
[10]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example