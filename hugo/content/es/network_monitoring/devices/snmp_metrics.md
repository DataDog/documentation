---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Knowledge Center
  text: Descripción general de la supervisión SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Hacer un seguimiento de SNMP con Datadog
title: Métricas de SNMP
---
## Instalación {#installation}

Network Device Monitoring depende de la integración SNMP incluida en el paquete del [Datadog Agent][1] y es compatible con las tres versiones de SNMP: `SNMPv1`, `SNMPv2` y `SNMPv3`. Durante la detección, se consulta el puerto SNMP (predeterminado 161). Un dispositivo se considera descubierto si hay una respuesta y un perfil coincidente.

## Requisitos previos {#pre-requisites}

Agent v7.32+

## Cómo funciona {#how-it-works}

El siguiente diagrama ilustra los puertos y protocolos predeterminados entre el Datadog Agent y el dispositivo que se está monitoreando. Para las métricas SNMP, el Datadog Agent consulta los dispositivos con Autodiscovery o según la configuración manual de la IP del dispositivo. El Datadog Agent, configurado con NDM e implementado de forma local o en la nube, consolida todos los datos recopilados de los dispositivos y la red desde su red y los envía a Datadog a través de HTTPS en el puerto `443`. Esto proporciona una observabilidad unificada de pila completa de métricas, logs, trazas, monitores y dashboards.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="Diagrama de NDM que muestra el flujo para la consulta de dispositivos SNMP." style="width:90%;" >}}

## Próximos pasos {#next-steps}

Siga las instrucciones a continuación para configurar Datadog para recopilar métricas SNMP de sus dispositivos de red.

## Configuración {#configuration}

Datadog Network Device Monitoring admite la recopilación de métricas de dispositivos individuales o la detección automática de dispositivos (direcciones IP únicas) en subredes completas.

Elija su estrategia de recopilación según la cantidad de dispositivos presentes en su red y qué tan dinámica sea esta (es decir, la frecuencia con la que se agregan o eliminan dispositivos):

[Monitoreo de dispositivos individuales](#monitoring-individual-devices)
: Para redes pequeñas y mayormente estáticas.

[Autodiscovery](#autodiscovery)
: Para redes más grandes o dinámicas.

Independientemente de la estrategia de recopilación, aproveche los [perfiles de dispositivos asignados por sysObjectID][2] de Datadog para recopilar automáticamente las métricas relevantes de sus dispositivos.

### Monitoreo de dispositivos individuales {#monitoring-individual-devices}

Para monitorear dispositivos individuales:

- Incluya la dirección IP y cualquier metadato adicional de los dispositivos (como etiquetas) en el archivo `snmp.d/conf.yaml` en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][3]. Consulte el [sample snmp.d/conf.yaml][4] para ver todas las opciones de configuración disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Para SNMPv2, configure una instancia especificando la dirección IP y la _community string_ del dispositivo:

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      community_string: 'sample-string'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- Para SNMPv3, configure una instancia especificando la dirección IP y las credenciales SNMPv3 del dispositivo (según corresponda), por ejemplo: `user`, `authProtocol`, `authKey`, `privProtocol` y `privKey`:

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      snmp_version: 3  # optional, if omitted which version of SNMP you are using is auto-detected
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{< /tabs >}}

- [Reinicie el Agent][5].

Después de la configuración, el Agent recopila métricas relevantes haciendo coincidir sus dispositivos con uno de los [perfiles de dispositivo compatibles de Datadog][6].

Para expandir su configuración:

* Agregue más instancias para recopilar métricas de más dispositivos en su red.
* Utilice [Autodiscovery](#autodiscovery) si necesita recopilar métricas de muchos dispositivos en una red dinámica.

### Autodiscovery {#autodiscovery}

Una alternativa a especificar dispositivos individuales es usar Autodiscovery para descubrir automáticamente todos los dispositivos en su red.

Autodiscovery sondea cada IP en la subred configurada y verifica si hay una respuesta del dispositivo. Luego, el Datadog Agent busca el `sysObjectID` del dispositivo descubierto y lo asigna a uno de los [perfiles de dispositivo compatibles de Datadog][6]. Los perfiles contienen listas de métricas predefinidas para recopilar para varios tipos de dispositivos.

Para usar Autodiscovery con Network Device Monitoring:

1. Instale o actualice el Datadog Agent a la versión 7.27+. Para obtener instrucciones específicas de la plataforma, consulte la documentación del [Datadog Agent][7].

2. Edite el archivo de configuración del Datadog Agent [`datadog.yaml`][8] para incluir todas las subredes que Datadog debe escanear. La siguiente configuración de ejemplo proporciona los parámetros requeridos, los valores predeterminados y ejemplos para Autodiscovery.

3. Opcionalmente, habilite la deduplicación de dispositivos durante el Autodiscovery del Datadog Agent. Esta función está deshabilitada de forma predeterminada y requiere la versión 7.67+ del Datadog Agent. Para obtener más detalles, consulte el parámetro `use_deduplication` en el [archivo de configuración de ejemplo del Datadog Agent][11].

   ```yaml
   network_devices:
     autodiscovery:
       use_deduplication: true
   ```

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'  # enclose with single quote
        tags:
          - "key1:val1"
          - "key2:val2"
      - network_address: 10.20.0.0/24
        loader: core
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
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # enclose with single quote
        privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # enclose with single quote
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

**Nota**: El Datadog Agent configura automáticamente la verificación SNMP con cada una de las IP descubiertas. Un dispositivo descubierto es una IP que responde correctamente cuando se consulta mediante SNMP.

**Nota**: Asegúrese de estar en la versión 7.54+ del Datadog Agent para usar esta sintaxis. Para versiones anteriores, consulte el [config_template.yaml anterior][9]

### Anular la velocidad de la interfaz {#override-interface-speed}

De forma predeterminada, la verificación SNMP informa la velocidad de la interfaz tal como se detecta desde el dispositivo. Si la velocidad del puerto físico difiere del ancho de banda real del circuito, por ejemplo, un puerto físico de 1 Gbps aprovisionado para un circuito de 50 Mbps, puede anular la velocidad de entrada y salida para interfaces específicas usando `interface_configs`.

Agregue `interface_configs` a la configuración de su instancia en `snmp.d/conf.yaml`:

```yaml
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    interface_configs:
      - match_field: name      # match by interface name or ifIndex
        match_value: eth0      # case-sensitive
        in_speed: 50000000     # inbound speed in bytes per second (50 Mbps)
        out_speed: 50000000    # outbound speed in bytes per second (50 Mbps)
```

Para ver todas las opciones `interface_configs` disponibles, consulte el [ejemplo snmp.d/conf.yaml][4].

## Validación {#validation}

[Ejecute el subcomando de estado del Datadog Agent][10] y busque `snmp` en la sección de verificaciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /es/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices
[7]: /es/agent
[8]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example