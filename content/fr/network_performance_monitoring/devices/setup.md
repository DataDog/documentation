---
title: Configuration du Network Device Monitoring
kind: documentation
further_reading:
  - link: /network_performance_monitoring/devices/profiles
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

- Modifiez le sous-réseau et la version SNMP dans le fichier `snmp.d/conf.yaml` du dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple snmp.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Pour SNMPv2, configurez une instance en spécifiant l'adresse IP et la _chaîne community_ du périphérique :

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        community_string: "<COMMUNITY_STRING>"
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- Pour SNMPv3, configurez une instance en spécifiant l'adresse IP et les identifiants SNMPv3 appropriés du périphérique, par exemple : `user`, `auth_protocol`, `auth_key`, `priv_protocol` et `priv_key` :

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        user: "<USER>"
        ## Configure these as appropriate
        # authProtocol: SHA
        # authKey: "<AUTH_KEY>"
        # privProtocol: AES
        # privKey: "<PRIV_KEY>"
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

1. Installez la version 6.16 ou une version ultérieure de l'Agent, ou effectuez une mise à niveau vers cette version. Pour obtenir des instructions spécifiques à votre plateforme, consultez la documentation dédiée à l'[Agent Datadog][7].

2. Modifiez le fichier [snmp.d/conf.yaml][4] dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].

#### Configuration minimale

```yaml
instances:
  - network_address: "<ADRESSE_RÉSEAU>"
    community_string: "<CHAÎNE_COMMUNITY>"
```

#### Configuration étendue

L'exemple de configuration suivant indique les paramètres obligatoires, les valeurs par défaut et des exemples pour Autodiscovery.

{{< code-block lang="yaml" filename="snmp.d/conf.yaml" disable_copy="true" >}}

init_config:
instances:
    ## @param network_address - chaîne - facultatif
  - network_address: "<ADRESSE_RÉSEAU>"
    ## @param port - entier - facultatif - valeur par défaut : 161
    port: 161
    ## @param community_string - chaîne - facultatif
    community_string: public
    ## @param snmp_version - entier - facultatif - valeur par défaut : 2
    snmp_version: 2
    ## @param timeout - entier - facultatif - valeur par défaut : 1
    timeout: 1
    ## @param retries - entier - facultatif - valeur par défaut : 5
    retries: 5
    ## @param discovery_interval - entier - facultatif - valeur par défaut : 3600
    discovery_interval: 3600
    ## @param discovery_allowed_failures
    ## entier - facultatif - valeur par défaut : 3
    discovery_allowed_failures: 3
    ## @param enforce_mib_constraints
    ## booléen - facultatif - valeur par défaut : true
    enforce_mib_constraints: true
    ## @param bulk_threshold - entier - facultatif - valeur par défaut : 5
    bulk_threshold: 5
    ## @param tags - liste de paires key:value - facultatif
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"

{{< /code-block >}}

## Validation

[Lancez la sous-commande status de l'Agent][8]et cherchez `snmp` dans la section Checks.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/network_performance_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /fr/agent
[8]: /fr/agent/guide/agent-commands/#agent-status-and-information