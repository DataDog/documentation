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

Le protocole SNMP (Simple Network Management Protocol) est une norme de gestion des appareils connectés au réseau, tels que les routeurs, les switches, les serveurs et les pare-feux. Ce check recueille des métriques SNMP à partir de vos périphériques réseau.

Le protocole SNMP utilise des identifiants appelés OID (Object Identifiers) afin d'identifier de manière unique les appareils. Les OID sont organisés sous forme d'arborescence hiérarchique : la racine ISO est numérotée 1, la branche suivante est ORG et numérotée 3, et ainsi de suite. Chaque branche est séparée par un `.`.

Une MIB (Management Information Base) permet de convertir les OID en noms lisibles et d'organiser un sous-ensemble de la hiérarchie. Du fait de la structure de l'arborescence, la plupart des valeurs SNMP commencent par le même ensemble d'objets : 1.3.6.1.1 pour la branche MIB-2, qui correspond aux objets standards contenant les informations système comme la disponibilité, les interfaces, la pile réseau, et 1.3.6.1.4.1, qui contient les informations propres au fournisseur.

## Implémentation
### Installation

Le check SNMP est inclus avec le paquet de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Conteneurisé](#conteneurisé) pour en savoir plus sur les environnements conteneurisés.

Le check SNMP ne collecte pas de données par défaut. Indiquez les métriques à collecter en modifiant votre fichier `snmp.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple snmp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

##### Configuration pour SNMP V1 et V2

```yaml
init_config:
  ## @param mibs_folder - chaîne - obligatoire
  # mibs_folder: <CHEMIN_VERS_MIB_SUPPLÉMENTAIRES>

  ## @param global_metrics - liste d'éléments - (obligatoire si aucune au niveau de l'instance)
  # global_metrics:
  ## - MIB: <NOM_MIB>
  ##   symbol: <SYMBOLE>

instances:
    ## @param ip_address - chaîne - obligatoire
  - ip_address: localhost

    ## @param port - nombre entier - obligatoire
    ## Port SNMP par défaut.
    #
    port: 161

    ## @param community_string - chaîne - facultatif
    # community_string: public

    ## @param snmp_version - nombre entier - facultatif - défaut : 2
    # snmp_version: 2

    ## @param metrics - liste d'éléments - (obligatoire si aucune au niveau init_config)
    metrics:
    - MIB: <NOM_MIB>
      symbol: <SYMBOLE>
    - OID: <OID>
      name: <NOM_OID>
      metric_tags:
        - <TAG>
```

##### Configuration pour SNMP V3

**Remarque** : consultez la [référence de la bibliothèque SNMP][4] (en anglais) pour découvrir toutes les options de configuration disponibles.

```yaml
init_config:
  ## @param mibs_folder - chaîne - obligatoire
  # mibs_folder: <CHEMIN_VERS_MIB_SUPPLÉMENTAIRES>

  ## @param global_metrics - liste d'éléments - (obligatoire si aucune au niveau de l'instance)
  # global_metrics:
  ## - MIB: <NOM_MIB>
  ##   symbol: <SYMBOLE>

instances:
    ## @param ip_address - chaîne - obligatoire
  - ip_address: localhost

    ## @param port - nombre entier - obligatoire
    port: 161

    ## @param snmp_version - nombre entier - facultatif- défaut : 2
    snmp_version: 3

    ## @param user - chaîne - obligatoire
    user: <NOMUTILISATEUR>

    ## @param authProtocol - chaîne - obligatoire
    authProtocol: <PROTOCOLE_AUTHENTIFICATION>

    ## @param authKey - chaîne - obligatoire
    authKey: <CLÉ_TYPE_AUTHENTIFICATION>

    ## @param privProtocol - chaîne - obligatoire
    privProtocol: <TYPE_CONFIDENTIALITÉ>

    ## @param privKey - chaîne - obligatoire
    privKey: <CLÉ_TYPE_CONFIDENTIALITÉ>

    ## @param metrics - liste d'éléments - (obligatoire si aucune au niveau init_config)
    metrics:
    - MIB: <NOM_MIB>
      symbol: <SYMBOLE>
    - OID: <OID>
      name: <NOM_OID>
      metric_tags:
        - <TAG>
```

* Ajoutez chaque appareil SNMP en tant qu'instance distincte.
* Pour chaque instance, spécifiez les counters et gauges SNMP choisis sous `metrics`.

Il existe plusieurs façons de spécifier les métriques à collecter. Consultez le [fichier d'exemple snmp.d/conf.yaml][3] pour des exemples.

* MIB et symbole
* OID et nom
* MIB et tableau

##### Utiliser votre propre MIB

À partir de l'Agent v6.15, les MIB hébergées sur http://mibs.snmplabs.com/asn1 sont automatiquement récupérées lorsque le check
détecte une référence dans la configuration pour la première fois.

Pour utiliser votre propre MIB avec l'Agent Datadog, convertissez-la au format [PySNMP][5]. Cette conversion peut être effectuée grâce au script `mibdump.py` fourni avec PySNMP. `mibdump.py` remplace `build-pysnmp-mib`, qui est obsolète depuis la version [4.3+ de PySNMP][6].

Depuis la version 5.14 de l'Agent Datadog, la version 4.3.5 de la dépendance PySNMP est incluse au lieu de la version 4.25 (consultez le [changelog][7]). Cela signifie que `build-pysnmp-mib`, qui est livré avec l'Agent à partir de la version 5.13.x, a également été remplacé par `mibdump.py`.

Dans Linux, trouvez l'emplacement de `mibdump.py` et exécutez ensuite :

```shell
$ find /opt/datadog-agent/ -type f -name build-pysnmp-mib.py -o -name mibdump.py
/opt/datadog-agent/embedded/bin/mibdump.py
```

Exemple pour Windows :

```powershell
C:\>dir mibdump.py /s

Directory of C:\Program Files\Datadog\Datadog Agent\embedded\Scripts
```

Dans Linux, utilisez ce format pour le script :

```shell
<CHEMIN_VERS_FICHIER>/mibdump.py \
  --mib-source <CHEMIN_VERS_FICHIERS_MIB> \
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ \
  --destination-directory=<CHEMIN_VERS_FICHIERSPY_MIB_CONVERTIS> \
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Exemple pour Windows Powershell :

Versions <= 6.11 de l'Agent :

```powershell
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded\python.exe' '<CHEMIN_VERS_FICHIER>\mibdump.py' `
  --mib-source <CHEMIN_VERS_SOURCE_MIB> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<CHEMIN_VERS_DESTINATION_MIB> `
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Versions >= 6.12 de l'Agent :

```powershell
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded<VERSION_PYTHON_MAJEURE>\python.exe' '<CHEMIN_VERS_FICHIER>\mibdump.py' `
  --mib-source <CHEMIN_VERS_SOURCE_MIB> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<CHEMIN_VERS_DESTINATION_MIB> `
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Exemple utilisant le format `CISCO-TCP-MIB.my` :

```
 # /opt/datadog-agent/embedded/bin/mibdump.py --mib-source <PATH_TO_MIB_FILE>  --mib-source http://mibs.snmplabs.com/asn1/@mib@ --destination-directory=/opt/datadog-agent/pysnmp/custom_mibpy/ --destination-format=pysnmp CISCO-TCP-MIB

 Source MIB repositories: <CHEMIN_VERS_FICHIER_MIB>, http://mibs.snmplabs.com/asn1/@mib@
 Borrow missing/failed MIBs from: http://mibs.snmplabs.com/pysnmp/notexts/@mib@
 Existing/compiled MIB locations: pysnmp.smi.mibs, pysnmp_mibs
 Compiled MIBs destination directory: /opt/datadog-agent/pysnmp/custom_mibpy/
 MIBs excluded from code generation: INET-ADDRESS-MIB, PYSNMP-USM-MIB, RFC-1212, RFC-1215, RFC1065-SMI, RFC1155-SMI, RFC1158-MIB, RFC1213-MIB, SNMP-FRAMEWORK-MIB, SNMP-TARGET-MIB, SNMPv2-CONF, SNMPv2-SMI, SNMPv2-TC, SNMPv2-TM, TRANSPORT-ADDRESS-MIB
 MIBs to compile: CISCO-TCP
 Destination format: pysnmp
 Parser grammar cache directory: not used
 Also compile all relevant MIBs: yes
 Rebuild MIBs regardless of age: no
 Dry run mode: no Create/update MIBs: yes
 Byte-compile Python modules: yes (optimization level no)
 Ignore compilation errors: no
 Generate OID->MIB index: no
 Generate texts in MIBs: no
 Keep original texts layout: no
 Try various file names while searching for MIB module: yes
 Created/updated MIBs: CISCO-SMI, CISCO-TCP-MIB (CISCO-TCP)
 Pre-compiled MIBs borrowed:
 Up to date MIBs: INET-ADDRESS-MIB, SNMPv2-CONF, SNMPv2-SMI, SNMPv2-TC, TCP-MIB
 Missing source MIBs:
 Ignored MIBs:
 Failed MIBs:

 # ls /opt/datadog-agent/pysnmp/custom_mibpy/
CISCO-SMI.py CISCO-SMI.pyc CISCO-TCP-MIB.py CISCO-TCP-MIB.pyc

```

L'Agent recherche les fichiers Python MIB convertis en indiquant le chemin de destination avec `mibs_folder` dans la [configuration YAML de SNMP][8].

[Redémarrez l'Agent][9] pour commencer à envoyer des métriques SNMP à Datadog.

##### Profils

Le check vous permet de définir des profils afin de regrouper des configurations et ainsi appliquer des définitions de métriques à plusieurs instances. Les profils définissent les métriques de la même manière que les instances, soit directement dans le fichier de configuration, soit dans des fichiers distincts. Chaque instance ne peut correspondre qu'à un seul profil. Vous pouvez par exemple définir un profil dans la section `init_config` :

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
     # Vous n'avez rien d'autre à faire à ce stade, le check récupèrera le sysObjectID
     # et utilisera le profil s'il correspond.
```

Si besoin, vous pouvez définir d'autres métriques dans les instances. Ces métriques sont recueillies avec celles définies dans le profil.

#### Agent conteneurisé
Consultez la [documentation relative aux modèles d'intégration Autodiscovery][16] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### SNMP v1

| Paramètre              | Valeur                                                                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------                                                        |
| `<NOM_INTÉGRATION>`   | `snmp`                                                                                                                                                                                             |
| `<CONFIG_INIT>`        | `{"mibs_folder":"<CHEMIN_VERS_MIBS_SUPPLÉMENTAIRES>"}`                                                                                                                                                      |
| `<CONFIG_INSTANCE>`    | ```{"ip_address":"%%host%%", "port":"161", "community_string":"<NOM_COMMUNAUTÉ>", "snmp_version":"1", "metrics":[{"MIB":"<NOM_MIB>","symbol":"<SYMBOLE>"},{"OID":"<OID>","name":"<NOM_OID>"}]}``` |

##### SNMP v2

| Paramètre              | Valeur                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------                                                                               |
| `<NOM_INTÉGRATION>`   | `snmp`                                                                                                                                                                         |
| `<CONFIG_INIT>`        | `{"mibs_folder":"<CHEMIN_VERS_MIBS_SUPPLÉMENTAIRES>"}`                                                                                                                                  |
| `<CONFIG_INSTANCE>`    | ```{"ip_address":"%%host%%", "port":"161", "community_string":"<NOM_COMMUNAUTÉ>", "metrics":[{"MIB":"<NOM_MIB>","symbol":"<SYMBOLE>"},{"OID":"<OID>","name":"<NOM_OID>"}]}``` |

##### SNMP v3

**Remarque** : consultez la [documentation de référence de la bibliothèque SNMP][4] (en anglais) pour découvrir toutes les options de configuration disponibles.

| Paramètre              | Valeur                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      |
| `<NOM_INTÉGRATION>`   | `snmp`                                                                                                                                                                                                                                                                                                                 |
| `<CONFIG_INIT>`        | `{"mibs_folder":"<CHEMIN_VERS_MIBS_SUPPLÉMENTAIRES>"}`                                                                                                                                                                                                                                                                          |
| `<CONFIG_INSTANCE>`    | ```{"ip_address":"%%host%%", "port":"161", "snmp_version":"3", "user":"<NOM_UTILISATEUR>", "authKey":"<MOTDEPASSE>", "privKey":"<CLÉ_TYPE_CONFIDENTIALITÉ>", "authProtocol":"<PROTOCOLE_AUTHENTIFICATION>", "privProtocol":"<TYPE_CONFIDENTIALITÉ>", "metrics":[{"MIB":"<NOM_MIB>","symbol":"<SYMBOLE>"},{"OID":"<OID>","name":"<NOM_OID>"}]}``` |


### Métriques custom
Les métriques recueillies par l'intégration SNMP sont considérées comme des [métriques custom][10], ce qui peut avoir une incidence sur votre [facture][11].

### Validation

[Lancez la sous-commande `status` de l'Agent][12] et cherchez `snmp` dans la section Checks.

## Données collectées
### Métriques

Le check SNMP envoie des métriques spécifiques sous l'espace de nommage `snmp.*`.

### Événements

Le check SNMP n'inclut aucun événement.

### Checks de service

**snmp.can_check** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir les métriques SNMP. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Pour SNMP, une liste des OID compatibles/couramment utilisés avec Datadog est-elle disponible ?][14]
* [Surveiller des appareils Unifi avec SNMP et Datadog][15]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: http://snmplabs.com/pysnmp/docs/api-reference.html#user-based
[5]: http://snmplabs.com/pysnmp/index.html
[6]: https://stackoverflow.com/questions/35204995/build-pysnmp-mib-convert-cisco-mib-files-to-a-python-fails-on-ubuntu-14-04
[7]: https://github.com/DataDog/dd-agent/blob/master/CHANGELOG.md#dependency-changes-3
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example#L3
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[11]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[13]: https://docs.datadoghq.com/fr/help
[14]: https://docs.datadoghq.com/fr/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[15]: https://medium.com/server-guides/monitoring-unifi-devices-using-snmp-and-datadog-c8093a7d54ca
[16]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}