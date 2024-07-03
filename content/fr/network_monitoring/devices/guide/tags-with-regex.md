---
title: Tags NDM avec des expressions régulières
aliases:
  - /fr/network_performance_monitoring/devices/guide/tags-with-regex/
further_reading:
  - link: /network_monitoring/devices/setup
    tag: Documentation
    text: Configuration de Network Device Monitoring
  - link: /getting_started/tagging
    tag: Documentation
    text: Débuter avec les tags
---
La solution Network Device Monitoring (NDM) Datadog prend en charge les expressions régulières, afin de créer des tags de métrique au format `<KEY>:<VALUE>`.

## Configuration

### Installation

Suivez les [instructions de configuration][1] pour installer la solution NDM de Datadog.

### Configuration

Dans le fichier [SNMP conf.yaml][2], vous pouvez spécifier des `metric_tags` à partir d'un OID. Pour créer plusieurs tags pour des appareils, utilisez des expressions régulières afin de séparer le résultat obtenu en plusieurs tags. Il est également possible d'utiliser le [moteur Python][3] standard pour récupérer une sous-chaîne.

#### OID

Dans l'exemple ci-dessous, deux tags sont créés à l'aide d'expressions régulières correspondant à la valeur de l'OID. Ainsi, si la valeur de l'OID est `41ba948911b9`, les tags `host_prefix:41` et `host:ba948911b9` sont ajoutés aux métriques correspondantes.

```yaml
    metric_tags:
     - # À partir d'un OID :
       symbol:
          OID: 1.3.6.1.2.1.1.5.0
          name: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

Dans l'exemple ci-dessous, des tags sont créés pour un tableau à l'aide d'une expression régulière :

```yaml
metrics:
  - MIB: IF-MIB
    table:
      OID: 1.3.6.1.2.1.2.2
      name: ifTable
    symbols:
      - OID: 1.3.6.1.2.1.2.2.1.10
        name: ifInOctets
    metric_tags:
      - column':
          OID: 1.3.6.1.2.1.2.2.1.2
          name: ifDescr
        match: '(\w)(\w+)'
        tags:
         - prefix: '\1' 
         - suffix: '\2'
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/network_monitoring/devices/setup
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html