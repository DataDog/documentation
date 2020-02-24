---
aliases:
  - /fr/agent/faq/how-to-monitor-snmp-devices/
assets:
  dashboards: {}
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

Le protocole SNMP (Simple Network Management Protocol) est une norme de gestion des périphériques connectés au réseau, tels que les routeurs, les commutateurs, les serveurs et les pare-feu. Ce check recueille des métriques SNMP à partir de vos périphériques réseau.

Le protocole SNMP utilise des identifiants sysOID (System Object Identifiers) et OID (Object Identifiers) afin d'identifier de manière unique des appareils gérés. Les OID sont organisés sous forme d'arborescence hiérarchique : la racine ISO est numérotée 1, la branche suivante est ORG et numérotée 3, et ainsi de suite. Chaque branche est séparée par un `.`.

Une MIB (Management Information Base) permet de convertir les OID en noms lisibles et d'organiser un sous-ensemble de la hiérarchie. Du fait de la structure de l'arborescence, la plupart des valeurs SNMP commencent par le même ensemble d'objets :

* `1.3.6.1.1` (MIB-II) : objets standard contenant des informations système comme la disponibilité, les interfaces ou encore la pile réseau.
* `1.3.6.1.4.1` : objets standard contenant des informations propres au fournisseur.

## Configuration

### Installation

Le check SNMP est inclus avec le paquet de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer.

### Configuration

Le check SNMP Datadog découvre automatiquement les périphériques réseau d'un sous-réseau donné et recueille des métriques à l'aide des profils de périphériques mappés avec un sysOID de Datadog.

Modifiez le sous-réseau, la version SNMP et les profils dans le fichier `snmp.d/conf.yaml` du dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple snmp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Autodiscovery

Pour utiliser la fonctionnalité Autodiscovery avec le check SNMP :

1. Installez la version 6.16 ou une version ultérieure de l'Agent Datadog, ou effectuez une mise à niveau vers cette version. Pour obtenir des instructions spécifiques selon votre plate-forme, consultez la documentation relative à l'[Agent Datadog][4].

2. Configurez le check SNMP à l'aide du fichier [snmp.d/conf.yaml][3]. Vous pouvez définir les paramètres ci-dessous. Consultez l'[exemple de configuration](#exemple-de-configuration) pour découvrir les paramètres requis, les valeurs par défaut ainsi que des exemples.

| Paramètre                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `profiles`                   | La liste des profils à utiliser. Un profil est un ensemble d'OID à partir desquels l'Agent Datadog recueille des métriques et les tags associés. La liste complète des profils pris en charge par Datadog est disponible sur [Github][5]. Vous pouvez spécifier des profils en indiquant leur fichier, sous `definition_file`, ou en les incorporant à `definition`. Tous les profils Datadog OOTB peuvent être répertoriés en indiquant leur nom. Pour indiquer des profils personnalisés supplémentaires, indiquez le chemin de leur fichier. **Remarque** : le profil générique `generic_router.yaml` fonctionne pour les routeurs, les commutateurs, etc. |
| `network_address`            | Le sous-réseau et le masque rédigés au format IPv4 sur lesquels l'Agent recherche et découvre les appareils.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `community_string`           | Utilisé pour SNMPv1 et SNMPv2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `snmp_version`               | La version SNMP utilisée.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `port`                       | Le port sur lequel l'Agent Datadog effectue son écoute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `timeout`                    | Le délai d'expiration en secondes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `retries`                    | Le nombre de nouvelles tentatives avant l'échec du processus.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_interval`         | L'intervalle entre chaque recherche.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_allowed_failures` | Le nombre maximal d'échecs de la part d'un host découvert avant que celui-ci ne soit retiré de la liste des périphériques découverts.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `bulk_threshold`             | Le nombre de symboles d'une table nécessaire au déclenchement d'une requête BULK. Ce paramètre ne sert que pour les configurations SNMPV > 1.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tags`                       | La liste des tags globaux à ajouter à l'ensemble des métriques SNMP. Pour en savoir plus, consultez la section relative au [tagging dans Datadog][6].                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

##### Exemple de configuration

```yaml
init_config:
  profiles:
    f5-big-ip:
      definition_file: f5-big-ip.yaml
    router:
      definition_file: generic-router.yaml

instances:
  -
    ## @paramètre network_address - chaîne, facultatif
    network_address: "<ADRESSE_RÉSEAU>"

    ## @@@paramètre port - nombre entier, facultatif, valeur par défaut : 161
    port: 161

    ## @@paramètre community_string - chaîne, facultatif
    community_string: public

    ## @paramètre snmp_version - nombre entier, facultatif, valeur par défaut : 2
    snmp_version: 2

    ## @paramètre timeout - nombre entier, facultatif, valeur par défaut : 1
    timeout: 1

    ## @paramètre retries - nombre entier, facultatif, valeur par défaut : 5
    retries: 5

    ## @paramètre discovery_interval - nombre entier, facultatif, valeur par défaut : 3600
    discovery_interval: 3600

    ## @paramètre discovery_allowed_failures - nombre entier, facultatif, valeur par défaut : 3
    discovery_allowed_failures: 3

    ## @paramètre enforce_mib_constraints - booléen, facultatif, valeur par défaut : true
    enforce_mib_constraints: true

    ## @paramètre bulk_threshold - nombre entier, facultatif, valeur par défaut : 5
    bulk_threshold: 5

    ## @paramètre tags - liste d'éléments key:value, facultatif
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"
```

##### Profils de périphériques mappés avec un sysOID

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

Les profils sont interchangeables. Ainsi, les périphériques qui partagent des dépendances MIB peuvent réutiliser les mêmes profils. Par exemple, le profil Cisco c3850 peut être utilisé pour de nombreux commutateurs Cisco.

* [Generic router][7]
* [F5 Big IP][8]
* [Dell iDRAC][9]
* [Cisco Nexus][10]
* [Cisco c3850][11]
* [Cisco Meraki][12]

### Validation

[Lancez la sous-commande status de l'Agent][13] et cherchez `snmp` dans la section Checks.

## Données collectées

Le check SNMP envoie des métriques spécifiques sous l'espace de nommage `snmp.*`. **Les métriques recueillies dépendent de l'intégration qui est configurée avec le profil correspondant**.

### Métriques
{{< get-metrics-from-git "snmp" >}}


### Événements

Le check SNMP n'inclut aucun événement.

### Checks de service

**snmp.can_check** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir les métriques SNMP. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Une liste des OID compatibles/couramment utilisés avec Datadog est-elle disponible pour SNMP ?][16]
* [Surveiller des appareils Unifi avec SNMP et Datadog][17]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent
[5]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[6]: https://docs.datadoghq.com/fr/tagging/
[7]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-router.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/f5-big-ip.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/idrac.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-nexus.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-3850.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/meraki-cloud-controller.yaml
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/metadata.csv
[15]: https://docs.datadoghq.com/fr/help
[16]: https://docs.datadoghq.com/fr/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[17]: https://medium.com/server-guides/monitoring-unifi-devices-using-snmp-and-datadog-c8093a7d54ca