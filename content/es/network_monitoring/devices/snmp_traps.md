---
description: Activa la escucha de SNMP Traps.
further_reading:
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Monitorizar y diagnosticar problemas de rendimiento de red con SNMP Traps
- link: /network_monitoring/devices/troubleshooting
  tag: Documentación
  text: Solucionar problemas de NDM
title: SNMP Traps
---

## Información general

SNMP Traps son notificaciones enviadas desde un dispositivo habilitado para SNMP a un gestor de SNMP. Cuando un dispositivo de red encuentra una actividad inusual, como un cambio de estado repentino en un equipo, el dispositivo activa un evento de SNMP Traps.

La monitorización de SNMP Traps te ayuda a detectar problemas que, de otro modo, podrían pasar desapercibidos debido a la inestabilidad del dispositivo. Por ejemplo, si una interfaz oscila entre un estado disponible y uno interrumpido cada 15 segundos, basarse en sondeos que se ejecutan cada 60 segundos podría llevarte a juzgar erróneamente el grado de inestabilidad de red. Traps también pueden llenar vacíos de visibilidad para ciertos componentes de hardware, como la batería del dispositivo o el estado del chasis.

Datadog Agent v7.37+ admite la escucha de SNMP Traps, permitiéndote configurar [monitores][1] para eventos de Trap específicos.

## Configuración

1. Para activar la escucha de SNMP Traps, añade lo siguiente a tu archivo `datadog.yaml`:

   ```yaml
   network_devices:
     namespace: <NAMESPACE> # optional, defaults to "default".
     snmp_traps:
       enabled: true
       port: 9162 # on which ports to listen for traps
       community_strings: # which community strings to allow for v2 traps
         - <STRING_1>
         - <STRING_2>
       bind_host: 0.0.0.0
       users: # SNMP v3
       - user: "user"
         authKey: myAuthKey
         authProtocol: "SHA"
         privKey: myPrivKey
         privProtocol: "AES"
       - user: "user"
         authKey: myAuthKey
         authProtocol: "MD5"
         privKey: myPrivKey
         privProtocol: "DES"
       - user: "user2"
         authKey: myAuthKey2
         authProtocol: "SHA" # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
         privKey: myPrivKey2
         privProtocol: "AES" # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
   ```

   **Nota**: Se admiten múltiples usuarios y contraseñas v3 a partir del Datadog Agent `7.51` o posterior.

   **Nota**: Asegúrate de que tus [reglas de firewall][7] permiten el tráfico UDP entrante en el puerto configurado.

2. Una vez configurados, SNMP Traps se reenvían como logs y se pueden encontrar en el [Log Explorer][2] con la siguiente consulta de búsqueda: `source:snmp-traps`.

  {{< img src="network_device_monitoring/snmp/snmp_logs_2.png" alt="Log Explorer muestra `source:snmp-traps` con una línea de log de SNMP Trap seleccionada, que resalta la etiqueta Network Device (Dispositivo de red)" style="width:90%" >}}

**Nota**: Aunque SNMP Traps se _reenvían como logs_, `logs_enabled` no **necesita** estar configurado como `true`.

### Uso del puerto 162 de SNMP Trap por defecto

La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Para vincularte a un número de puerto como el puerto predeterminado 162 de SNMP Trap, haz lo siguiente:

1. Concede acceso al puerto mediante el comando `setcap`:

   ```
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

   **Nota**: Vuelve a ejecutar este comando setcap cada vez que actualices el Agent.

2. Comprueba que la configuración es correcta ejecutando el comando `getcap`:

   ```
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   Deberías ver la siguiente salida:

   ```
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

3. [Reinicia el Agent][6].

## Espacios de nombres de dispositivos

Al igual que en [Network Device Monitoring][3], los espacios de nombres pueden utilizarse como etiquetas (tags) para diferenciar entre múltiples dispositivos de red que pueden compartir la misma IP privada. Por ejemplo, consideremos el caso de dos enrutadores: uno en Nueva York y otro en París, que comparten la misma IP privada. Debería haber un Agent en el centro de datos de Nueva York y otro en el de París. Deberías etiquetar estos con `espacio de nombres: nyc` y `espacio de nombres: paris`, respectivamente.

El espacio de nombres se puede utilizar entonces para pasar de forma única de un SNMP Trap al dispositivo emisor, o del dispositivo emisor a un SNMP Trap.

Es crítico tener coherencia entre las múltiples configuraciones del Agent. Por ejemplo, si tienes dos Agents configurados (por ejemplo, uno para la recolección de tramps y el otro para métricas), debes asegurarte de que los espacios de nombres existan en ambos lugares. Alternativamente, asegúrate de que los espacios de nombres no existen en ninguno.

## Resolución

Cada Trap SNMP tiene un formato específico basado en OID. El Datadog Agent realiza un paso de _resolución_ para convertir los OID en cadenas más legibles.

Un SNMP Trap consiste en:
- Información del emisor (por ejemplo, la IP del dispositivo)
- Un OID que define el tipo de trap
- "Variables", es decir, una lista de pares (`OID:value`) que proporciona un contexto adicional para el trap.

La descodificación se realiza en el lado del Agent, utilizando una asignación almacenada en disco en `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/dd_traps_db.json.gz`. Datadog admite más de 11.000 bases de información de gestión (MIBs) diferentes.

### Formato de asignación

Las asignaciones se almacenan como archivos TrapsDB y pueden ser YAML o JSON.

#### Ejemplos

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### Ampliar el Agent

Para ampliar las capacidades del Agent, crea tus propias asignaciones y colócalas en el directorio `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/`.

Puedes escribir estas asignaciones a mano, o generar asignaciones a partir de una lista de MIBs utilizando el kit de herramientas para desarrolladores de Datadog, [`ddev`][4].

#### Generar un archivo TrapsDB a partir de una lista de MIBs

**Requisitos previos**:
- Python 3
- [`ddev`][4] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][5] (`pip3 install pysmi`)

Pon todos tus MIBs en una carpeta dedicada. A continuación, ejecuta:
`ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...`

Si tus MIBs tienen dependencias, `ddev` las busca en línea si se pueden encontrar.

Si se producen errores debido a la falta de dependencias y tienes acceso a los archivos MIB que faltan, coloca los archivos en una carpeta separada y utiliza el parámetro `--mib-sources <DIR>` para que ddev sepa dónde encontrarlos. Asegúrate de que cada nombre de archivo es el mismo que el nombre de MIB (por ejemplo, `SNMPv2-SMI` y no `snmp_v2_smi.txt`).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/
[2]: https://app.datadoghq.com/logs
[3]: /es/network_monitoring/devices
[4]: /es/developers/integrations/python
[5]: https://pypi.org/project/pysmi/
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /es/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all