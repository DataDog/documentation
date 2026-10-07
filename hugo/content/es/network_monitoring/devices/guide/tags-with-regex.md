---
aliases:
- /es/network_performance_monitoring/devices/guide/tags-with-regex/
further_reading:
- link: /network_monitoring/devices/snmp_metrics
  tag: Documentación
  text: Métricas SNMP de Network Device Monitoring
- link: /getting_started/tagging
  tag: Documentación
  text: Empezando con las etiquetas
title: Etiquetas de NDM con expresiones regulares
---

Datadog Network Device Monitoring (NDM) admite expresiones regulares para crear etiquetas (tags) de métrica en el formato `<KEY>:<VALUE>`.

## Ajustes

### Instalación

Sigue las [instrucciones de instalación][1] para instalar Datadog Network Device Monitoring y empezar a recopilar métricas SNMP y Traps.

### Configuración

En el [SNMP conf.yaml][2], puedes especificar `metric_tags` a partir de un OID. Para crear múltiples etiquetas para dispositivos, utiliza expresiones regulares para separar el valor resultante en múltiples etiquetas, u obtén una subcadena utilizando el motor regular de [Python][3].

#### OID

El siguiente ejemplo crea dos etiquetas utilizando una combinación de expresión regular en el valor del OID. Así, si el valor del OID es `41ba948911b9`, las etiquetas `host_prefix:41` y `host:ba948911b9` se añaden a las métricas correspondientes.

```yaml
    metric_tags:
     - # De un OID:
       symbol:
          OID: 1.3.6.1.2.1.1.5.0
          name: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

El siguiente ejemplo crea etiquetas utilizando una expresión regular para una tabla:

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

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/network_monitoring/devices/snmp_metrics
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html