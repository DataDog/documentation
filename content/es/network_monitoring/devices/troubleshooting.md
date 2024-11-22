---
aliases:
- /es/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorización de SNMP con Datadog
title: Solucionar problemas de NDM
---

## Información general

Utiliza la siguiente información para solucionar problemas de Network Device Monitoring Datadog. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][1].

## Terminología

SNMP - Protocolo simple de gestión red 
: Protocolo de red que se utiliza para recopilar información sobre equipos bare metal de red.

OID - Identificador de objeto
: ID o dirección única de un dispositivo que, cuando se consulta, devuelve el código de respuesta de ese valor. Por ejemplo, los OID son la velocidad del ventilador de la CPU o del dispositivo.

sysOID - Identificador de objeto del sistema
: Dirección específica que define el tipo de dispositivo. Todos los dispositivos tienen un identificador único que lo define. Por ejemplo, el sysOID base de Meraki es `1.3.6.1.4.1.29671`.

MIB - Base de información gestionada
: Base de datos o lista de todos los OID posibles y sus definiciones relacionadas con la MIB. Por ejemplo, la `IF-MIB` (interfaz MIB) contiene todos los OID de información descriptiva sobre la interfaz de un dispositivo.

## FAQ

#### ¿Con qué versiones de SNMP es compatible Datadog?

Datadog es compatible con las tres versiones de SNMP: SNMPv1, SNMPv2 y SNMPv3.

#### ¿Qué protocolo utiliza Datadog para detectar dispositivos?

Datadog utiliza SNMP para detectar dispositivos. Durante la detección, se sondea el puerto SNMP (por defecto 161). Si hay una respuesta y un perfil que coincida, se considera un dispositivo detectado.

#### ¿Proporciona Datadog la certificación MIB? ¿Tengo que enviarles todas mis MIB? ¿Cómo convierto mis MIB con Python?

El Datadog Agent es MIB-less, lo que significa que no necesitas hacer nada con tus MIB. Todas las métricas recopiladas con perfiles de dispositivo Datadog funcionan automáticamente sin la MIB.

Para añadir métricas o una configuración personalizada, lista el nombre de la MIB, el nombre de la tabla, el OID de la tabla, el símbolo y el OID del símbolo, por ejemplo:

```yaml
- MIB: EXAMPLE-MIB
    table:
      # Identificación de la tabla de la que provienen las métricas.
      OID: 1.3.6.1.4.1.10
      name: exampleTable
    symbols:
      # Lista de símbolos ('columnas') a recuperar.
      # Mismo formato que para un OID único.
      # Cada fila de la tabla emite estas métricas.
      - OID: 1.3.6.1.4.1.10.1.1
        name: exampleColumn1
```

#### ¿Puedo seguir utilizando Network Device Monitoring si mi par dispositivo-modelo no es compatible?

Datadog recopila métricas genéricas de base de todos los dispositivos. Si hay métricas no compatibles de un proveedor MIB, puedes escribir un perfil personalizado o enviar una solicitud de función al [servicio de asistencia de Datadog][1].

Si envías una solicitud de función, el servicio de asistencia de Datadog necesita un `snmpwalk` del dispositivo solicitado. Ejecuta lo siguiente y envía el resultado:

```
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

#### ¿Por qué sólo veo una métrica recopilada de mis redes? ¿El número de dispositivos recopilados es cero?

1. Prueba a volver menos estrictas las reglas de listas de control de acceso(ACL)/firewalls de tus dispositivos.
2. Ejecute `snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6` desde el host en el que se ejecuta tu Agent. Si obtienes un tiempo de espera sin ninguna respuesta, es probable que haya algo que esté bloqueando al Datadog Agent para recopilar métricas de tu dispositivo.

#### ¿Qué hago si Datadog admite un proveedor o tipo de dispositivo pero mi modelo específico no es compatible? 

- Ponte en contacto con el [servicio de asistencia de Datadog][1] para solicitar asistencia para tu modelo específico.
- Amplía tus perfiles para que admitan otros valores `sysobjectid`. 
  Por ejemplo, si quieres monitorizar otro tipo de CSR Cisco, puedes modificar el perfil ISR directamente para listar otro `sysobjectid` de esta manera: 

    ```
        snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
    ```

**Nota**: Si no conoces el `sysobjectid` de tu dispositivo, intenta hacer una búsqueda en Internet o ejecuta un `snmpwalk` en un host que pueda llegar a tu dispositivo. Utiliza el resultado para listar el perfil con el que debe coincidir. 

#### ¿Cómo extraigo información sobre dispositivos e interfaces de mis dispositivos red?

- Utiliza la [red API][2] para extraer la siguiente información sobre tus dispositivos de red:
  * [Obtén la lista de interfaces de tus dispositivos][3].
  - [Obtén la lista de etiquetas (tags) de tus dispositivos][4].
  - [Actualiza la lista de etiquetas de tus dispositivos][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/help
[2]: /es/api/latest/network-device-monitoring/
[3]: /es/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[4]: /es/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[5]: /es/api/latest/network-device-monitoring/#update-the-tags-for-a-device