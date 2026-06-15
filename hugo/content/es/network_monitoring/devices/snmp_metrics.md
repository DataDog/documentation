---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centro de conocimiento
  text: Información general de la monitorización de SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorización de SNMP con Datadog
title: Métricas de SNMP
---

## Instalación

Network Device Monitoring se basa en la integración de SNMP incluida en el paquete del [Datadog Agent][1] y admite las tres versiones de SNMP: `SNMPv1`, `SNMPv2` y `SNMPv3`. Durante la detección, se sondea el puerto SNMP (por defecto 161). Un dispositivo se considera detectado si hay una respuesta y un perfil coincidente.

## Requisitos previos

Agent v7.32+

## Cómo funciona

El siguiente diagrama ilustra los puertos y protocolos por defecto entre el Datadog Agent y el dispositivo que se está monitorizado. Para métricas de SNMP, el Datadog Agent sondea los dispositivos con Autodiscovery, o basándose en la configuración de la IP del dispositivo manual. El Datadog Agent, configurado con NDM e implementado en las instalaciones o en la nube, consolida todos los datos de dispositivos y red recopilados de tu red y los envía a Datadog a través de HTTPS en el puerto `443`. Esto proporciona una capacidad de observación unificada y completa de métricas, logs, trazas, monitores y dashboards.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="Diagrama de NDM Diagram que muestra el flujo de sondeo de dispositivos de SNMP." style="width:90%;" >}}

## Siguientes pasos

Sigue las instrucciones a continuación para configurar Datadog para recopilar métricas de SNMP de tus dispositivos de red.

## Configuración

Datadog Network Device Monitoring permite recopilar métricas de dispositivos individuales, o autodetectar dispositivos (direcciones IP únicas) en subredes enteras.

Elige tu estrategia de recopilación en función del número de dispositivos presentes en tu red y de lo dinámica que sea tu red (es decir, la frecuencia con la que se añaden o eliminan dispositivos):

[Monitorización de dispositivos individuales](#monitoring-individual-devices)
: para redes pequeñas y mayoritariamente estáticas.

[Autodiscovery](#Autodiscovery)
: para redes mayores o dinámicas.

Independientemente de la estrategia de recopilación, aprovecha los [perfiles de dispositivos asignados de sysObjectID][2] de Datadog para recopilar automáticamente métricas pertinente de tus dispositivos.

### Monitorización de dispositivos individuales

Para monitorizar dispositivos individuales:

- Incluye la dirección de IP y cualquier metadato de dispositivos (como etiquetas) en el archivo `snmp.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][3]. Para conocer todas las opciones de configuración disponibles, consulta el [snmp.d/conf.yaml de ejemplo][4].

{{< tabs >}}
{{% tab "SNMPv2" %}}

- Para SNMPv2, configura una instancia especificando la dirección IP y la _cadena de comunidad_ del dispositivo:

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

- Para SNMPv3, configura una instancia que especifique la dirección IP y las credenciales SNMPv3 del dispositivo (según corresponda), por ejemplo: `user`, `authProtocol`, `authKey`, `privProtocol` y `privKey`:

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

- [Reinicia el Agent][5].

Tras la configuración, el Agent recopila las métricas pertinentes haciendo coincidir tus dispositivos con uno de los [perfiles de dispositivos compatibles de Datadog][6].

Para ampliar tu configuración:

* Añade más instancias para recopilar métricas de más dispositivos en tu red.
* Utiliza [Autodiscovery](#autodiscovery) si necesitas recopilar métricas de muchos dispositivos a través de una red dinámica.

### Autodiscovery

Una alternativa a la especificación de dispositivos individuales es utilizar Autodiscovery para detectar automáticamente todos los dispositivos en tu red.

Autodiscovery sondea cada IP de la subred configurada y espera una respuesta del dispositivo. A continuación, el Datadog Agent busca el `sysObjectID` del dispositivo detectado y lo asigna a uno de los [perfiles de dispositivos compatibles de Datadog][6]. Los perfiles contienen listas de métricas predefinidas para recopilar varios tipos de dispositivos.

Para utilizar Autodiscovery con Network Device Monitoring:

1. Instala o actualiza el Datadog Agent a v7.27+. Para obtener instrucciones específicas de la plataforma, consulta la documentación del [Datadog Agent][7].

2. Edita el archivo de configuración [`datadog.yaml`][8] del Agent para incluir todas las subredes que Datadog debe escanear. El siguiente ejemplo de configuración proporciona los parámetros requeridos, los valores predeterminados y ejemplos para Autodiscovery.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
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

**Nota**: El Datadog Agent configura automáticamente el check de SNMP con cada una de las IPs que se detectan. Un dispositivo detectado es una IP que responde satisfactoriamente cuando es sondeada usando SNMP.

**Nota**: Asegúrate de que estás en el Agent 7.54+ para esta sintaxis. Para versiones anteriores, consulta el [config_template.yaml anterior][9].

## Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `snmp` en la sección Checks.

## Referencias adicionales

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