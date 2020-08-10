---
aliases:
  - /fr/agent/faq/how-to-monitor-snmp-devices/
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp/README.md'
display_name: SNMP
git_integration_title: snmp
guid: 080bb566-d1c8-428c-9d85-71cc2cdf393c
integration_id: snmp
integration_title: SNMP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
name: snmp
public_title: Intégration Datadog/SNMP
short_description: Recueillez des métriques SNMP à partir de vos périphériques réseau.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le protocole SNMP (Simple Network Management Protocol) est une norme de gestion des périphériques connectés au réseau, tels que les routeurs, les switchs, les serveurs et les pare-feu. Ce check recueille des métriques SNMP à partir de vos périphériques réseau.

Le protocole SNMP utilise des identifiants appelés sysObjectID (System Object Identifiers) pour identifier de manière unique les appareils, et des OID (Object Identifiers) pour identifier de manière unique les objets gérés. Les OID sont organisés sous forme d'arborescence hiérarchique : la racine ISO est numérotée 1, la branche suivante est ORG et numérotée 3, et ainsi de suite. Chaque branche est séparée par un `.`.

Une MIB (Management Information Base) permet de convertir les OID en noms lisibles et d'organiser un sous-ensemble de la hiérarchie. Du fait de la structure de l'arborescence, la plupart des valeurs SNMP commencent par le même ensemble d'objets :

* `1.3.6.1.1` (MIB-II) : objets standard contenant des informations système comme la disponibilité, les interfaces ou encore la pile réseau.
* `1.3.6.1.4.1` : objets standard contenant des informations propres au fournisseur.

## Configuration

### Installation

Le check SNMP est inclus avec le paquet de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer.

### Configuration

Modifiez les options de configuration dans le fichier `snmp.d/conf.yaml` du dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple snmp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

Le check SNMP Datadog peut recueillir des métriques à partir de périphériques individuels, ou découvrir automatiquement les périphériques (adresses IP uniques) sur un sous-réseau entier.

La stratégie de collecte à privilégier dépend principalement du nombre de périphériques présents sur votre réseau, et de la dynamique de celui-ci (c'est-à-dire, la fréquence à laquelle des périphériques sont ajoutés ou supprimés) :

- Pour les petits réseaux généralement statiques, consultez la section [Surveiller des périphériques individuels](#surveiller-des-peripheriques-individuels).
- Pour des réseaux plus importants et/ou dynamiques, consultez la section [Autodiscovery](#autodiscovery).

Quelle que soit la stratégie de collecte utilisée, vous pouvez exploiter les [profils de périphériques mappés avec un `sysObjectID`](#profils-de-peripheriques-mappes-avec-un-sysobjectid) de Datadog pour recueillir automatiquement les métriques pertinentes de vos périphériques.

#### Surveiller des périphériques individuels

La façon la plus simple d'utiliser l'intégration SNMP consiste à spécifier l'adresse IP d'un périphérique SNMP.

Pour les appareils SNMPv2 :

1. Configurez une instance spécifiant i) l'adresse IP du périphérique, ii) la chaîne `community` du périphérique :

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        community: "<COMMUNITY>"
    ```

2. [Redémarrez l'Agent][4].

Pour les appareils SNMPv3 :

1. Configurez une instance spécifiant i) l'adresse IP du périphérique, ii) les identifiants SNMPv3 du périphérique, c'est-à-dire `user`, ainsi que `auth_protocol`, `auth_key`, `priv_protocol` et `priv_key` (selon votre périphérique) :

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

2. [Redémarrez l'Agent][4].

L'Agent commencera ensuite à recueillir les métriques pertinentes en faisant correspondre votre périphérique à un des [profils de périphérique par défaut de Datadog](#definition-des-metriques-par-profil).

Une fois les métriques recueillies, plusieurs possibilités s'offrent à vous pour aller plus loin dans la configuration :

* Vous pouvez ajouter d'autres instances pour recueillir les métriques d'un plus grand nombre de périphériques présents sur votre réseau.
* Vous pouvez également utiliser la fonction [Autodiscovery](#autodiscovery) si vous avez besoin de recueillir les métriques d'un très grand nombre de périphériques présents sur un réseau dynamique.

#### Autodiscovery

Au lieu de spécifier des périphériques individuels, vous pouvez vous servir de la fonction Autodiscovery pour découvrir automatiquement tous les périphériques présents sur votre réseau.

Autodiscovery récupérera chaque IP associée au sous-réseau configuré et vérifiera si le périphérique SNMP renvoie une réponse. L'Agent Datadog recherchera ensuite le `sysObjectID` du périphérique détecté et le fera correspondre à un des [profils de périphérique par défaut de Datadog](#definition-des-metriques-par-profil), à savoir des listes prédéfinies de métriques à recueillir en fonction du type de périphérique.

Pour utiliser la fonctionnalité Autodiscovery avec le check SNMP :

1. Installez la version 6.16 ou une version ultérieure de l'Agent, ou effectuez une mise à niveau vers cette version. Pour obtenir des instructions spécifiques selon votre plate-forme, consultez la documentation relative à l'[Agent Datadog][5].

2. Configurez le check SNMP à l'aide du fichier [snmp.d/conf.yaml][3]. Vous pouvez définir les paramètres ci-dessous. Consultez l'[exemple de configuration](#exemple-de-configuration) pour découvrir les paramètres requis, les valeurs par défaut ainsi que des exemples.

| Paramètre                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `profiles`                   | La liste des profils à utiliser. Un profil est un ensemble d'OID à partir desquels l'Agent Datadog recueille des métriques et les tags associés. La liste complète des profils pris en charge par Datadog est disponible sur [Github][6]. Par défaut, tous les profils transmis par l'Agent et dans le répertoire de configuration sont chargés. Pour personnaliser les profils spécifiques à recueillir, spécifiez leur nom de fichier sous `definition_file`, ou incorporez-les à `definition`. Tous les profils Datadog par défaut peuvent être spécifiés en indiquant leur nom. Pour fournir des profils personnalisés supplémentaires, indiquez leur chemin dans la configuration, ou ajoutez-les directement au répertoire de configuration. **Remarque** : le profil générique `generic_router.yaml` fonctionne pour les routeurs, les switchs, etc. |
| `network_address`            | Le sous-réseau et le masque rédigés au format IPv4 sur lesquels l'Agent recherche et découvre les appareils.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `community_string`           | Utilisé pour SNMPv1 et SNMPv2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `snmp_version`               | La version SNMP utilisée.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `port`                       | Le port sur lequel l'Agent Datadog effectue son écoute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `timeout`                    | Le délai d'expiration en secondes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `retries`                    | Le nombre de nouvelles tentatives avant l'échec du processus.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_interval`         | L'intervalle entre chaque recherche.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_allowed_failures` | Le nombre maximal d'échecs de la part d'un host découvert avant que celui-ci ne soit retiré de la liste des périphériques découverts.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `bulk_threshold`             | Le nombre de symboles d'une table nécessaire au déclenchement d'une requête BULK. Ce paramètre ne sert que pour les configurations SNMPv > 1.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tags`                       | La liste des tags globaux à ajouter à l'ensemble des métriques SNMP. Pour en savoir plus, consultez la section relative au [tagging dans Datadog][7].                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

##### Exemple de configuration

```yaml
init_config:

instances:
  -
    ## @param network_address - chaîne, facultatif
    network_address: "<ADRESSE_RÉSEAU>"

    ## @param port - nombre entier, facultatif, valeur par défaut : 161
    port: 161

    ## @param community_string - chaîne, facultatif
    community_string: public

    ## @param snmp_version - nombre entier, facultatif, valeur par défaut : 2
    snmp_version: 2

    ## @param timeout - nombre entier, facultatif, valeur par défaut : 1
    timeout: 1

    ## @param retries - nombre entier, facultatif, valeur par défaut : 5
    retries: 5

    ## @param discovery_interval - nombre entier, facultatif, valeur par défaut : 3600
    discovery_interval: 3600

    ## @param discovery_allowed_failures - nombre entier, facultatif, valeur par défaut : 3
    discovery_allowed_failures: 3

    ## @param enforce_mib_constraints - booléen, facultatif, valeur par défaut : true
    enforce_mib_constraints: true

    ## @param bulk_threshold - nombre entier, facultatif, valeur par défaut : 5
    bulk_threshold: 5

    ## @param tags - liste d'éléments key:value, facultatif
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"
```

##### Profils de périphérique mappés avec un sysObjectID

Grâce aux profils, le check SNMP peut réutiliser des définitions de métriques pour plusieurs instances ou types de périphériques. Les profils définissent les métriques de la même manière que les instances, soit directement dans le fichier de configuration, soit dans des fichiers distincts. Chaque instance ne peut correspondre qu'à un seul profil. Vous pouvez par exemple définir un profil dans la section `init_config` :

```yaml
init_config:
  profiles:
    my-profile:
      definition:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
          index: 1
      sysobjectid: '1.3.6.1.4.1.8072.3.2.10'
```

Désignez-le ensuite de manière explicite par son nom, ou utilisez la détection du sysObjectID :

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile
   - ip_address: 192.168.34.11
     # Vous n'avez rien d'autre à faire à ce stade, le check récupérera le sysObjectID
     # et utilisera le profil s'il correspond.
```

Si besoin, vous pouvez définir d'autres métriques dans les instances. Ces métriques, ainsi que celles définies dans le profil, sont ainsi recueillies.

#### Définition des métriques par profil

Les profils sont interchangeables. Ainsi, les périphériques qui partagent des dépendances MIB peuvent réutiliser les mêmes profils. Par exemple, le profil Cisco c3850 peut être utilisé pour de nombreux switchs Cisco.

* [Generic router][8] _(Profil par défaut si aucun autre profil ne correspond)_
* [Cisco ASA 5525][9]
* [Cisco c3850][10]
* [Cisco Nexus][11]
* [Cisco Meraki][12]
* [Cisco UC Virtual Machine][13]
* [Cisco ICM][14]
* [Cisco ISR 4431][15]
* [Dell iDRAC][16]
* [Dell Poweredge][17]
* [F5 Big IP][18]
* [Fortinet FortiGate][19]
* [HP iLO4][20]
* [HPE Proliant][21]
* [NetApp][22]
* [Palo Alto][23]
* [Pare-feu Checkpoint][24]
* [Isilon][25]
* [APC UPS][26]

### Validation

[Lancez la sous-commande status de l'Agent][27] et cherchez `snmp` dans la section Checks.

## Données collectées

Le check SNMP envoie les métriques spécifiées sous l'espace de nommage `snmp.*`. **Les métriques recueillies dépendent du profil configuré**.

### Métriques
{{< get-metrics-from-git "snmp" >}}


### Événements

Le check SNMP n'inclut aucun événement.

### Checks de service

**snmp.can_check** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir les métriques SNMP. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][29].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Une liste des OID compatibles/couramment utilisés avec Datadog est-elle disponible pour SNMP ?][30]
* [Surveiller des appareils Unifi avec SNMP et Datadog][31]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: https://docs.datadoghq.com/fr/tagging/
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-router.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-asa-5525.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-3850.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-nexus.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/meraki-cloud-controller.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_uc_virtual_machine.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_icm.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_isr_4431.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/idrac.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/dell-poweredge.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/f5-big-ip.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/fortinet-fortigate.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hp-ilo4.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hpe-proliant.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/netapp.yaml
[23]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/palo-alto.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/checkpoint-firewall.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/isilon.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/apc-ups.yaml
[27]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[28]: https://github.com/DataDog/integrations-core/blob/master/snmp/metadata.csv
[29]: https://docs.datadoghq.com/fr/help/
[30]: https://docs.datadoghq.com/fr/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids/
[31]: https://medium.com/server-guides/monitoring-unifi-devices-using-snmp-and-datadog-c8093a7d54ca