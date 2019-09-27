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

Le protocole SNMP utilise des identifiants appelés OID (Object Identifiers) afin d'identifier de manière unique les appareils. Les OID sont organisés sous forme d'arborescence hiérarchique : la racine ISO est numérotée 1, la branche suivante est ORG et numérotée 3, et ainsi de suite. Chaque branche est séparée par `..`.

Une MIB (Management Information Base) permet de convertir les OID en noms lisibles et d'organiser un sous-ensemble de la hiérarchie. Du fait de la structure de l'arborescence, la plupart des valeurs SNMP commencent par le même ensemble d'objets : 1.3.6.1.1 pour la branche MIB-2, qui correspond aux objets standard contenant les informations système comme la disponibilité, les interfaces, la pile réseau, et 1.3.6.1.4.1, qui contient les informations propres au fournisseur.

## Implémentation
### Installation

Le check SNMP est inclus avec le paquet de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer pour exécuter le check.

### Configuration

Le check SNMP ne collecte pas de données par défaut. Indiquez les métriques à collecter en mettant à jour votre fichier `snmp.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple snmp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Configuration pour SNMP V1 et V2

```
init_config:
  mibs_folder: <CHEMIN_VERS_MIB_SUPPLÉMENTAIRES>

instances:
   - ip_address: localhost
     port: 161
     community_string: public
  #  version_snmp : 2                # Uniquement requis pour SNMP V1 (2 par défaut).
     timeout: 1
     retries: 5
  #  exécution_contraintes_mib : true  # Utiliser False pour ignorer la vérification des valeurs.
  #                                 # renvoyées pour les contraintes MIB (True par défaut).

     metrics:
       - MIB: UDP-MIB
         symbol: udpInDatagrams
       - MIB: TCP-MIB
         symbol: tcpActiveOpens
       - OID: 1.3.6.1.2.1.6.5
         name: tcpPassiveOpens
       - MIB: IF-MIB
         table: ifTable
         symbols:
           - ifInOctets
           - ifOutOctets
         metric_tags:
           - tag: interface
             column: ifDescr
       - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
              index: 1
```

#### Configuration pour SNMP V3

**Remarque** : consultez la [référence de la bibliothèque SNMP][4] (en anglais) pour découvrir toutes les options de configuration disponibles.

```
init_config:
   - mibs_folder: <CHEMIN_VERS_MIB_SUPPLÉMENTAIRES>

instances:
   - ip_address: 192.168.34.10
     port: 161
     user: <NOMDUTILISATEUR>
     authKey: <MOTDEPASSE>
     privKey: <CLÉ_TYPE_CONFIDENTIALITÉ>
     authProtocol: <PROTOCOLE_DAUTHENTIFICATION>
     privProtocol: <TYPE_CONFIDENTIALITÉ>
     timeout: 1 # seconde, par défaut
     retries: 5
     metrics:
       - MIB: UDP-MIB
         symbol: udpInDatagrams
       - MIB: TCP-MIB
         symbol: tcpActiveOpens
```

* Ajoutez chaque appareil SNMP en tant qu'instance distincte.
* Pour chaque instance, spécifiez les counters et gauges SNMP choisis dans l'option `metrics`.

Il existe plusieurs façons de spécifier les métriques à collecter :

#### MIB et symbole

```
metrics:
  - MIB: UDP-MIB
    symbol: udpInDatagrams
```

#### OID et nom

```
metrics:
   - OID: 1.3.6.1.2.1.6.5
     name: tcpActiveOpens # le nom de la métrique (peut être tout ce que vous voulez)
```

#### MIB et tableau

L'exemple ci-dessous collecte des métriques sur toutes les rangées d'un tableau (`symbols`) et indique comment ajouter un tag à chaque métrique (`metric_tags`). L'Agent récupère le nombre d'octets reçus sur chaque interface et ajoute un tag avec le nom de l'interface (cette information se trouve dans la colonne `ifDescr`), ce qui donne un tag de ce type : `interface:eth0`.

```
metrics:
  - MIB: IF-MIB
    table: ifTable
    symbols:
       - ifInOctets      # La valeur de la rangée qui devient la valeur de la métrique.
    metric_tags:
       - tag: interface  # Nom du tag
         column: ifDescr # Le nom de la colonne à partir de laquelle la valeur du tag est obtenue, OU
         #index : 1       # l'index de la colonne à partir duquel la valeur du tag est obtenue
```

Il est également possible de récupérer des tags en fonction des indices de votre rangée. Dans cet exemple, le premier index de rangée contient le type d'IP décrit par la rangée (IPv4 ou IPv6) :

```
metrics:
  - MIB: IP-MIB
    table: ipSystemStatsTable
    symbols:
      - ipSystemStatsInReceives
    metric_tags:
      - tag: ipversion
    index: 1
```

#### Utiliser votre propre MIB

Pour utiliser votre propre MIB avec l'Agent Datadog, convertissez-la au format [PySNMP][5]. Cette conversion peut être effectuée grâce au script `build-pysnmp-mibs` fourni avec PySNMP < 4.3. `mibdump.py` remplace `build-pysnmp-mib`, qui est obsolète depuis la version [4.3+ de PySNMP][6].

Depuis la version 5.14 de l'Agent Datadog, la version 4.3.5 de la dépendance PySNMP est incluse au lieu de la version 4.25 (consultez le [changelog][7]). Cela signifie que `build-pysnmp-mib`, qui est livré avec l'Agent à partir de la version 5.13.x, a également été remplacé par `mibdump.py`.

Dans Linux, trouvez la localisation de `mibdump.py` et exécutez ensuite :

```
$ find /opt/datadog-agent/ -type f -name build-pysnmp-mib.py -o -name mibdump.py
/opt/datadog-agent/embedded/bin/mibdump.py
```

Exemple pour Windows :

```
C:\>dir mibdump.py /s

 Directory of C:\Program Files\Datadog\Datadog Agent\embedded\Scripts
```

Dans Linux, utilisez ce format pour le script :

```
<CHEMIN_VERS_FICHIER>/mibdump.py \
  --mib-source <CHEMIN_VERS_FICHIERS_MIB> \
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ \
  --destination-directory=<CHEMIN_VERS_FICHIERSPY_MIB_CONVERTIS> \
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Exemple pour Windows Powershell :

Versions <= 6.11 de l'Agent :
```
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded\python.exe' '<CHEMIN_VERS_FICHIER>\mibdump.py' `
  --mib-source <CHEMIN_VERS_SOURCE_MIB> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<CHEMIN_VERS_DESTINATION_MIB> `
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Versions >= 6.12 de l'Agent :
```
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe' '<CHEMIN_VERS_FICHIER>\mibdump.py' `
  --mib-source <CHEMIN_VERS_SOURCE_MIB> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<CHEMIN_VERS_DESTINATION_MIB> `
  --destination-format=pysnmp <NOM_FICHIER_MIB>
```

Exemple utilisant le format `CISCO-TCP-MIB.my` :

```
 # /opt/datadog-agent/embedded/bin/mibdump.py --mib-source <CHEMIN_VERS_FICHIER_MIB>  --mib-source http://mibs.snmplabs.com/asn1/@mib@ --destination-directory=/opt/datadog-agent/pysnmp/custom_mibpy/ --destination-format=pysnmp CISCO-TCP-MIB

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

 #ls /opt/datadog-agent/pysnmp/custom_mibpy/
CISCO-SMI.py CISCO-SMI.pyc CISCO-TCP-MIB.py CISCO-TCP-MIB.pyc

```

L'Agent recherche les fichiers Python MIB convertis en indiquant le chemin de destination avec `mibs_folder` dans la [configuration YAML de SNMP][8].

[Redémarrez l'Agent][9] pour commencer à envoyer des métriques SNMP à Datadog.

#### Collecte de métriques
Le check SNMP peut potentiellement générer des [métriques custom][10], qui peuvent avoir une incidence sur votre [facturation][11]. 

### Validation

[Lancez la sous-commande `status` de l'Agent][12] et cherchez `snmp` dans la section Checks.

## Données collectées
### Métriques

Le check SNMP envoie des métriques spécifiques sous l'espace de nommage `snmp.*`.

### Événements

Le check SNMP n'inclut aucun événement.

### Checks de service

**snmp.can_check** :  
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


{{< get-dependencies >}}
