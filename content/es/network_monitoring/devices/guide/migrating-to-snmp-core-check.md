---
further_reading:
- link: network_monitoring/devices/setup
  tag: Documentación
  text: Más información sobre la configuración de NDM
title: Migración al check del núcleo SNMP (en Go) desde un check basado en Python
---

## Información general

El Datadog Agent v7.27.0 introduce una nueva versión del check del protocolo SNMP en Go que presenta mejoras tanto de memoria como de rendimiento para el Agent cuando se monitorizan dispositivos utilizando el protocolo SNMP. El propósito de esta guía es ayudarte con la migración al nuevo check del núcleo.

### Cambios en el Agent v7.27.0

- Autodiscovery es ahora un proceso de núcleo del Agent y debe cargarse en el check principal de la integración del SNMP, con `loader:core` en la `init_config`, y configurarse en el `datadog.yaml` principal del Datadog Agent.

- Ya no se admiten referencias directas a las MIB sólo por sus nombres legibles por humanos. En su lugar, todas las referencias a los OID deben hacerse por su dirección numérica y su nombre legible por humanos. Se han actualizado todos los perfiles enviados a Datadog, pero será necesario actualizar los perfiles personalizados. A continuación se ofrecen ejemplos de migración.

- El check del núcleo no admite la compilación manual de MIB para ser utilizadas como perfil, por lo tanto los siguientes parámetros ya no son compatibles:
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` - Eliminado en favor de otras funciones `GET`

## Instrucciones

1. Actualiza al Datadog Agent versión 7.27 o posterior para tu plataforma del Agent correspondiente.

2. Actualiza el `init_config` en el check del SNMP para hacer referencia al nuevo check del núcleo en `snmp.d/conf.yaml`.

``` yaml
  init_config:
      loader: core
```
3. El siguiente paso sólo es aplicable si utilizas la exploración Autodiscovery/subred: Desplaza la configuración de cada instancia (subred) de configuración del check del SNMP al `datadog.yaml` principal del Datadog Agent.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # cantidad de workers utilizados para detectar dispositivos simultáneamente
    discovery_interval: 3600  # intervalo en segundos entre cada detección automática
    loader: core  # se recomienda utilizar la implementación del check del núcleo de la integración SNMP
    use_device_id_as_hostname: true  # recomendado
    configs:
      - network_address: 10.10.0.0/24  # subred CIDR
        snmp_version: 2
        port: 161
        community_string: '***'  # encerrar entre comillas simples
        tags:
        - "key1:val1"
        - "key2:val2"
      - network_address: 10.20.0.0/24
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
    workers: 100  # cantidad de workers utilizados para detectar dispositivos simultáneamente
    discovery_interval: 3600  # intervalo en segundos entre cada detección automática
    loader: core  # se recomienda utilizar la implementación del check del núcleo de la integración SNMP
    use_device_id_as_hostname: true  # recomendado
    configs:
      - network_address: 10.10.0.0/24  # subred CIDR
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # opciones: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # encerrar entre comillas simples
        privProtocol: 'AES256'  # opciones: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # encerrar entre comillas simples
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

**Nota**: Asegúrate de que estás en el Agent v7.53 o posterior para esta sintaxis. Para ver versiones anteriores, consulta el [config_template.yaml anterior][1].

### Migración de perfiles personalizados (independiente del despliegue)

El SNMP ya no permite listar sólo los OID por sus nombres legibles por humanos. Se puede hacer referencia a ellos por dirección (nombre de tabla e índice) o por dirección de entrada de MIB. Si has escrito algún perfil tú mismo o has modificado algún perfil existente, migralo al nuevo formato. A continuación se muestran ejemplos de migración.

#### Símbolos escalares

**Antes del Agent v7.27.0:**

{{< code-block lang="yaml" filename="scalar_symbols.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    símbolo: hrSystemUptime
{{< /code-block >}}

**Con el Agent v7.27.0:**

{{< code-block lang="yaml" filename="scalar_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    símbolo:
    OID: 1.3.6.1.2.1.25.1.1.0
    nombre: hrSystemUptime
{{< /code-block >}}

#### Símbolos de la tabla

**Antes del Agent v7.27.0:**

{{< code-block lang="yaml" filename="table_symbols.yaml" >}}

métricas:
  - MIB: HOST-RESOURCES-MIB
    tabla: hrStorageTable
    símbolos:
      - hrStorageAllocationUnits
      - hrStoageSize
    metrics_tags:
      - etiqueta (tag): storagedec
        columna: hrStorageDescr

{{< /code-block >}}


**Con el Agent v7.27.0:**

{{< code-block lang="yaml" filename="table_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    tabla:
    OID: 1.3.6.1.2.1.25.2.3
    nombre: hrStorageTable
    símbolos:
      - OID: 1.3.6.1.2.1.25.2.3.1.4
        nombre: hrStorageAllocationUnits
      - OID: 1.3.6.1.2.1.25.2.3.1.5
        nombre: hrStorageSize
    metrics_tags:
      - etiqueta: storagedec
        columna:
        OID: 1.3.6.1.2.1.25.2.3.1.3
        nombre: hrStorageDescr
{{< /code-block >}}


#### Etiquetas de métricas

**Antes del Agent v7.27.0:**

{{< code-block lang="yaml" filename="metrics_tags.yaml" >}}
metrics_tags:
  - símbolo: sysName
    etiqueta: snmp_host
{{< /code-block >}}

**Con el Agent v7.27.0:**

{{< code-block lang="yaml" filename="metrics_tags_7_27.yaml" >}}
metrics_tags:
  - OID: 1.3.6.1.2.1.1.5.0
    símbolo: sysName
    etiqueta: snmp_host
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855