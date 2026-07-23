---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de Perfiles con NDM
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centro de Conocimiento
  text: Descripción General del Monitoreo SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorear SNMP con Datadog
title: Métricas SNMP
---
## Instalación {#installation}

El NDM se basa en la Integración SNMP incluida en el paquete del [Datadog Agent][1], y soporta las tres versiones de SNMP: `SNMPv1`, `SNMPv2` y `SNMPv3`. Durante el descubrimiento, se sondea el puerto SNMP (predeterminado 161). Un dispositivo se considera descubierto si hay una respuesta y un perfil coincidente.

## Requisitos previos {#pre-requisites}

Agente v7.32+

## Cómo funciona {#how-it-works}

El siguiente diagrama ilustra los puertos y protocolos predeterminados entre el Agente de Datadog y el dispositivo que se está monitoreando. Para las métricas SNMP, el Agente de Datadog sondea los dispositivos con Autodiscovery, o basado en la configuración manual de la IP del dispositivo. El Agente de Datadog, configurado con NDM y desplegado en las instalaciones o en la nube, consolida todos los datos de dispositivos y redes recolectados de su red y los envía a Datadog a través de HTTPS en el puerto `443`. Esto proporciona una observabilidad unificada de pila completa de metrics, logs, traces, monitors y dashboards.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="Diagrama de NDM que muestra el flujo para el sondeo de dispositivos SNMP." style="width:90%;" >}}

## Próximos pasos {#next-steps}

Siga las instrucciones a continuación para configurar Datadog para recopilar métricas SNMP de sus dispositivos de red.

## Configuración {#configuration}

NDM de Datadog admite la recopilación de métricas de dispositivos individuales o el Autodiscovery de dispositivos (direcciones IP únicas) en subredes completas.

Elija su estrategia de recopilación según el número de dispositivos presentes en su red y cuán dinámica es su red (lo que significa la frecuencia de agregar o eliminar dispositivos):

[Monitoreo de dispositivos individuales](#monitoring-individual-devices)
: Para redes pequeñas y mayormente estáticas.

[Autodiscovery](#autodiscovery)
: Para redes más grandes o dinámicas.

Independientemente de la estrategia de recopilación, aproveche los [perfiles de dispositivo mapeados por sysObjectID de Datadog][2] para recopilar automáticamente métricas relevantes de sus dispositivos.

### NDM de dispositivos individuales {#monitoring-individual-devices}

Para monitorear dispositivos individuales:

- Incluya la dirección IP y cualquier metadato adicional de los dispositivos (como etiquetas) en el archivo `snmp.d/conf.yaml` en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agente][3]. Consulte el archivo de ejemplo snmp.d/conf.yaml[4] para todas las opciones de configuración disponibles.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Para SNMPv2, configure una instancia especificando la dirección IP y la _cadena de comunidad_ del dispositivo:

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

- Para SNMPv3, configure una instancia especificando la dirección IP y las credenciales de SNMPv3 del dispositivo (según corresponda), por ejemplo: `user`, `authProtocol`, `authKey`, `privProtocol` y `privKey`:

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

- [Reinicie el Agente][5].

Después de la configuración, el Agente recopila métricas relevantes al emparejar sus dispositivos con uno de los [perfiles de dispositivo compatibles de Datadog][6].

Para expandir su configuración:

* Agregue más instancias para recopilar métricas de más dispositivos en su red.
* Utilice [Autodiscovery](#autodiscovery) si necesita recopilar métricas de muchos dispositivos en una red dinámica.

### Autodiscovery {#autodiscovery}

Una alternativa a especificar dispositivos individuales es usar Autodiscovery para descubrir automáticamente todos los dispositivos en su red.

Autodiscovery sondea cada IP en la subred configurada y verifica si hay una respuesta del dispositivo. Luego, el Agente de Datadog busca el `sysObjectID` del dispositivo descubierto y lo mapea a uno de los [perfiles de dispositivo compatibles de Datadog][6]. Los perfiles contienen listas de métricas predefinidas para recopilar de varios tipos de dispositivos.

Para usar Autodiscovery con NDM:

1. Instale o actualice el Agente de Datadog a la versión v7.27+. Para instrucciones específicas de la plataforma, consulte la documentación del [Datadog Agent][7].

2. Edite el archivo de configuración del Agente [`datadog.yaml`][8] para incluir todas las subredes que Datadog debe escanear. La siguiente configuración de muestra proporciona parámetros requeridos, valores predeterminados y ejemplos para Autodiscovery.

3. Opcionalmente, habilite la [desduplicación][11] de dispositivos durante el Autodiscovery del Agente. Esta función está deshabilitada por defecto y requiere la versión `7.67+` del Agente.

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

**Nota**: El Agente de Datadog configura automáticamente la verificación SNMP con cada una de las IPs que se descubren. Un dispositivo descubierto es una IP que responde exitosamente cuando se sondea usando SNMP.

**Nota**: Asegúrese de estar en la versión 7.54+ de Agent para esta sintaxis. Para versiones anteriores, consulte el [config_template.yaml anterior][9]

### Sobrescribir la velocidad de la interfaz {#override-interface-speed}

Por defecto, la verificación SNMP informa la velocidad de la interfaz según lo detectado desde el dispositivo. Si la velocidad del puerto físico difiere del ancho de banda real del circuito, por ejemplo, un puerto físico de 1 Gbps provisionado para un circuito de 50 Mbps, puede sobrescribir la velocidad de entrada y salida para interfaces específicas utilizando `interface_configs`.

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

Para todas las opciones disponibles de `interface_configs`, consulte el [archivo de ejemplo snmp.d/conf.yaml][4].

## Validación {#validation}

[Ejecute el subcomando de estado de Agent][10] y busque `snmp` en la sección de Verificaciones.

## Lectura adicional {#further-reading}

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
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L4036