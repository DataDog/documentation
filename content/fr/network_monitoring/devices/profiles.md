---
title: Profils NDM
aliases:
  - /fr/network_performance_monitoring/devices/profiles/
further_reading:
  - link: /network_monitoring/devices/data
    tag: Documentation
    text: Données collectées avec la fonctionnalité Network Device Monitoring
  - link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
    tag: Blog
    text: Surveiller des périphériques SNMP avec Datadog
---
## Présentation

La fonctionnalité Network Device Monitoring utilise des profils pour indiquer à l'Agent Datadog les métriques et les tags associés à recueillir. Un profil correspond à une collection d'OID associés à un appareil.

## Configuration

Par défaut, tous les profils dans le répertoire de configuration sont chargés. Pour personnaliser les profils spécifiques à recueillir, spécifiez leur nom de fichier sous `definition_file`, ou incorporez-les sous forme de liste à `definition`. Tous les profils Datadog peuvent être spécifiés en indiquant leur nom. Pour fournir des profils personnalisés supplémentaires, indiquez leur chemin dans la configuration, ou ajoutez-les au répertoire de configuration.

**Remarque **: le profil générique est [generic-device.yaml][1], qui prend en charge les routeurs, les switchs, etc.

### Appareils mappés avec un sysOID

Grâce aux profils, la fonctionnalité Network Device Monitoring peut réutiliser des définitions de métriques sur plusieurs instances ou types de périphériques différents. Les profils définissent les métriques de la même manière que les instances, soit directement dans le fichier de configuration, soit dans des fichiers distincts. Chaque instance ne peut correspondre qu'à un seul profil. Vous pouvez par exemple définir un profil dans la section `init_config` :

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

### Définition des métriques par profil

Les profils sont interchangeables. Ainsi, les périphériques qui partagent des dépendances MIB peuvent réutiliser les mêmes profils. Par exemple, le [profil Cisco c3850][2] peut être utilisé pour de nombreux switchs Cisco.

Pour en savoir plus sur les profils fournis par Datadog, consultez le [référentiel GitHub][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-device.yaml
[2]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
