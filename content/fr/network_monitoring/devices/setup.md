---
title: Configuration de Network Device Monitoring
kind: documentation
aliases:
  - /fr/network_performance_monitoring/devices/setup/
further_reading:
  - link: /network_monitoring/devices/profiles
    tag: Documentation
    text: Utiliser des profils avec le Network Device Monitoring
  - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
    tag: Blog
    text: Surveiller des périphériques SNMP avec Datadog
---
## Installation

La fonction Network Device Monitoring utilise le protocole SNMP inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer.

## Configuration

La fonction Network Device Monitoring de Datadog permet de recueillir des métriques à partir de périphériques individuels, ou de découvrir automatiquement les périphériques (adresses IP uniques) sur un sous-réseau entier.

Choisissez la stratégie de collecte à utiliser en fonction du nombre de périphériques présents sur votre réseau et du degré de dynamisme de celui-ci (c'est-à-dire la fréquence à laquelle des périphériques sont ajoutés ou retirés) :

- Pour les petits réseaux généralement statiques, consultez la section [Surveiller des périphériques individuels](#surveiller-des-peripheriques-individuels).
- Pour des réseaux plus importants ou dynamiques, consultez la section [Autodiscovery](#autodiscovery).

Quelle que soit la stratégie de collecte utilisée, tirez parti des [profils de périphériques mappés avec un sysObjectID][2] de Datadog pour recueillir automatiquement les métriques pertinentes à partir de vos périphériques.

### Surveiller des périphériques individuels

Pour surveiller des périphériques individuels :

- Ajoutez l'adresse IP et les métadonnées de périphériques supplémentaires (en tant que tags) dans le fichier `snmp.d/conf.yaml` du dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple snmp.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Pour SNMPv2, configurez une instance en spécifiant l'adresse IP et la _chaîne community_ du périphérique :

    ```yaml
    init_config:
      loader: core
    instances:
    - ip_address: "1.2.3.4"
      community_string: “sample-string”
      tags:
        - "key1:val1"
        - "key2:val2"
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- Pour SNMPv3, configurez une instance en spécifiant l'adresse IP et les identifiants SNMPv3 appropriés du périphérique, par exemple : `user`, `authProtocol`, `authKey`, `privProtocol` et `privKey`.

    ```yaml
    init_config:
      loader: core
    instances:
    - ip_address: "1.2.3.4"
      snmp_version: 3           # optional, if omitted we will autodetect which version of SNMP you are using
      user: "user"
      authProtocol: "fakeAuth"
      authKey: "fakeKey"
      privProtocol: "fakeProtocol"
      privKey: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
    ```

{{% /tab %}}
{{< /tabs >}}

- [Redémarrez l'Agent][5].

Une fois la configuration terminée, l'Agent recueille les métriques pertinentes en associant votre périphérique à l'un des [profils de périphériques de Datadog][6].

Pour élargir votre configuration :

* Ajoutez d'autres instances pour recueillir les métriques d'un plus grand nombre de périphériques présents sur votre réseau.
* Vous pouvez également utiliser la fonction [Autodiscovery](#autodiscovery) si vous avez besoin de recueillir les métriques d'un très grand nombre de périphériques présents sur un réseau dynamique.

### Autodiscovery

Au lieu de spécifier des périphériques individuels, vous pouvez vous servir de la fonction Autodiscovery pour découvrir automatiquement tous les périphériques présents sur votre réseau.

Autodiscovery récupère chaque IP présente sur le sous-réseau configuré et vérifie si le périphérique renvoie une réponse. L'Agent Datadog récupère ensuite le `sysObjectID` du périphérique détecté et recherche une correspondance dans les [profils de périphérique de Datadog][6]. Ces profils contiennent des listes prédéfinies de métriques à recueillir en fonction du type de périphérique.

Pour utiliser Autodiscovery avec la fonction Network Device Monitoring :

1. Installez la version 7.27 ou une version ultérieure de l'Agent Datadog, ou effectuez une mise à niveau vers cette version. Pour obtenir des instructions spécifiques à votre plate-forme, consultez la documentation dédiée à l'[Agent Datadog][7].

2. Modifiez le fichier de configuration [`datadog.yaml`][8] de l'Agent afin d'inclure tous les sous-réseaux à analyser par Datadog. L'exemple de configuration suivant fournit les paramètres requis, les valeurs par défaut ainsi que des exemples pour Autodiscovery.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100 # nombre de workers utilisés pour découvrir simultanément des appareils
  discovery_interval: 3600 # intervalle entre chaque processus Autodiscovery en secondes
  configs:
    - network: 1.2.3.4/24 # notation CIDR, nous vous conseillons de ne pas indiquer plus de /24 blocs
      version: 2
      port: 161
      community: ***
      tags:
      - "key1:val1"
      - "key2:val2"
      loader: core # utiliser l'implémentation de corecheck SNMP
    - network: 2.3.4.5/24
      version: 2
      port: 161
      community: ***
      tags:
      - "key1:val1"
      - "key2:val2"
      loader: core
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100 # nombre de workers utilisés pour découvrir simultanément des appareils
  discovery_interval: 3600 # intervalle entre chaque processus Autodiscovery en secondes
  configs:
    - network: 1.2.3.4/24 # notation CIDR, nous vous conseillons den e pas indiquer plus de /24 blocs
      version: 3
      user: "user"
      authentication_protocol: "fakeAuth"
      authentication_key: "fakeKey"
      privacy_protocol: "fakeProtocol"
      privacy_key: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
      loader: core
    - network: 2.3.4.5/24
      version: 3
      snmp_version: 3
      user: "user"
      authentication_protocol: "fakeAuth"
      authentication_key: "fakeKey"
      privacy_protocol: "fakeProtocol"
      privacy_key: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
      loader: core
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : l'Agent Datadog configure automatiquement le check SNMP avec les adresses IP qui ont été découvertes. Un périphérique découvert correspond à une adresse IP qui parvient à être récupérée lors du processus de récupération via SNMP.

## Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `snmp` dans la section Checks.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /fr/agent
[8]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: /fr/agent/guide/agent-commands/#agent-status-and-information