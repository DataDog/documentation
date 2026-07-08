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

La surveillance des dispositifs réseau repose sur l'intégration SNMP incluse dans le package [Datadog Agent][1] et prend en charge les trois versions de SNMP : `SNMPv1`, `SNMPv2` et `SNMPv3`. Lors de la découverte, le port SNMP (par défaut 161) est interrogé. Un dispositif est considéré comme découvert s'il y a une réponse et un profil correspondant.

## Pré-requis {#pre-requisites}

Agent v7.32+

## Comment cela fonctionne {#how-it-works}

Le diagramme suivant illustre les ports et protocoles par défaut entre le Datadog Agent et le dispositif surveillé. Pour les métriques SNMP, le Datadog Agent interroge les dispositifs avec l'Autodécouverte ou en fonction de la configuration manuelle de l'adresse IP du dispositif. Le Datadog Agent, configuré avec NDM et déployé sur site ou dans le cloud, consolide toutes les données collectées sur les dispositifs et le réseau de votre infrastructure et les envoie à Datadog via HTTPS sur le port `443`. Cela fournit une observabilité unifiée et complète des métriques, des journaux, des traces, des moniteurs et des tableaux de bord.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="Diagramme NDM montrant le flux pour l'interrogation des dispositifs SNMP." style="width:90%;" >}}

## Prochaines étapes {#next-steps}

Suivez les instructions ci-dessous pour configurer Datadog afin de collecter des métriques SNMP à partir de vos dispositifs réseau.

## Configuration {#configuration}

La fonction Network Device Monitoring de Datadog permet de recueillir des métriques à partir de périphériques individuels, ou de découvrir automatiquement les périphériques (adresses IP uniques) sur un sous-réseau entier.

Choisissez la stratégie de collecte à utiliser en fonction du nombre de périphériques présents sur votre réseau et du degré de dynamisme de celui-ci (c'est-à-dire la fréquence à laquelle des périphériques sont ajoutés ou retirés) :

[Surveillance des dispositifs individuels](#monitoring-individual-devices)
: Pour les petits réseaux, principalement statiques.

[Autodécouverte](#autodiscovery)
: Pour les réseaux plus grands ou dynamiques.

Quelle que soit la stratégie de collecte utilisée, tirez parti des [profils de périphériques mappés avec un sysObjectID](#profils-de-peripheriques-mappes-avec-un-sysobjectid) de Datadog pour recueillir automatiquement les métriques pertinentes à partir de vos périphériques.

### Surveillance des dispositifs individuels {#monitoring-individual-devices}

Pour surveiller des périphériques individuels :

- Incluez l'adresse IP et les métadonnées supplémentaires des dispositifs (sous forme d'étiquettes) dans le fichier `snmp.d/conf.yaml` dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][3]. Consultez le [exemple snmp.d/conf.yaml][4] pour toutes les options de configuration disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Pour SNMPv2, configurez une instance en spécifiant l'adresse IP et la _chaîne de communauté_ du dispositif :

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

- Pour SNMPv3, configurez une instance en spécifiant l'adresse IP et les identifiants SNMPv3 du dispositif (selon le cas), par exemple : `user`, `authProtocol`, `authKey`, `privProtocol` et `privKey` :

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

Après la configuration, le Datadog Agent collecte des métriques pertinentes en associant vos dispositifs à l'un des [profils d'appareils pris en charge par Datadog][6].

Pour élargir votre configuration :

* Ajoutez plus d'instances pour collecter des métriques à partir de plus de dispositifs sur votre réseau.
* Utilisez [l'Autodécouverte](#autodiscovery) si vous devez collecter des métriques à partir de nombreux dispositifs sur un réseau dynamique.

### Autodécouverte {#autodiscovery}

Une alternative à la spécification de dispositifs individuels est d'utiliser l'Autodécouverte pour découvrir automatiquement tous les dispositifs sur votre réseau.

L'Autodécouverte interroge chaque IP du sous-réseau configuré et vérifie la réponse du dispositif. Ensuite, le Datadog Agent recherche le `sysObjectID` du dispositif découvert et le mappe à l'un des [profils d'appareils pris en charge par Datadog][6]. Les profils contiennent des listes de métriques prédéfinies à collecter pour divers types de dispositifs.

Pour utiliser Autodiscovery avec la fonction Network Device Monitoring :

1. Installez ou mettez à niveau l'Agent Datadog vers v7.27+. Pour des instructions spécifiques à la plateforme, consultez la documentation de l'[Agent Datadog][7].

2. Modifiez le fichier de configuration de l'Agent [`datadog.yaml`][8] pour inclure tous les sous-réseaux que Datadog doit analyser. L'exemple de configuration suivant indique les paramètres obligatoires, les valeurs par défaut et des exemples pour Autodiscovery.

3. En option, activez la [dé-duplication][11] des dispositifs lors de l'Autodécouverte de l'Agent. Cette fonctionnalité est désactivée par défaut et nécessite la version de l'Agent `7.67+`.

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

**Remarque** : L'Agent Datadog configure automatiquement la vérification SNMP avec chacune des adresses IP découvertes. Un dispositif découvert est une adresse IP qui répond avec succès lorsqu'elle est interrogée via SNMP.

**Remarque** : Assurez-vous d'utiliser l'Agent 7.54 ou une version ultérieure pour cette syntaxe. Pour les versions précédentes, consultez le [config_template.yaml précédent][9].

### Remplacer la vitesse de l'interface {#override-interface-speed}

Par défaut, la vérification SNMP rapporte la vitesse de l'interface telle que détectée par le dispositif. Si la vitesse du port physique diffère de la bande passante réelle du circuit, par exemple, un port physique de 1 Gbps provisionné pour un circuit de 50 Mbps, vous pouvez remplacer la vitesse entrante et sortante pour des interfaces spécifiques en utilisant `interface_configs`.

Ajoutez `interface_configs` à la configuration de votre instance dans `snmp.d/conf.yaml` :

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

Pour toutes les options disponibles `interface_configs`, consultez le [exemple snmp.d/conf.yaml][4].

## Validation {#validation}

[Exécutez la sous-commande d'état de l'Agent][10] et recherchez `snmp` dans la section Vérifications.

## Lectures complémentaires {#further-reading}

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
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L4036