---
description: Glosario de NDM
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centro de conocimiento
  text: Información general de monitorización de SNMP
title: Términos y conceptos de NDM
---

## Información general

Network Device Monitoring te ayuda a obtener información sobre el estado y el rendimiento de tus routers, conmutadores y firewalls locales. 
Para obtener definiciones y descripciones adicionales de términos importantes de NDM, como _capa 2_ y _capa 3_, consulta el [Glosario][1] principal.

## Terminología

Simple network management protocol (SNMP)
: un protocolo de red que se utiliza para recopilar información sobre equipos de red bare metal.

Identificador de objeto (OID)
: ID o dirección única de un dispositivo que, cuando se consulta, devuelve el código de respuesta de ese valor. Por ejemplo, los OIDs son la CPU o la velocidad del ventilador del dispositivo.

Identificador de objeto del sistema (sysOID)
: una dirección específica que define el tipo de dispositivo. Todos los dispositivos tienen un identificador único que lo define. Por ejemplo, el sysOID base de Meraki es `1.3.6.1.4.1.29671`.

Base de información gestionada (MIB)
: una base de datos o lista de todos los OIDs posibles y sus definiciones relacionadas con la MIB. Por ejemplo, la `IF-MIB` (interface MIB) contiene todos los OIDs de información descriptiva sobre la interfaz de un dispositivo.

[Perfiles][2]
: un perfil es una colección de OIDs asociados a un dispositivo. Los perfiles permiten a NDM reutilizar las definiciones de métrica en varios tipos o instancias de dispositivos.

Red de área extensa definida por software (SD-WAN)
: una red de área extensa (WAN) que utiliza redes definidas por software (SDN). SD-WAN se utiliza a menudo para interconectar oficinas remotas y centros de datos a través de diferentes transportes (MPLS, banda ancha, 5G, etc.).

[Espacios de nombres del dispositivo][3]
: espacio de nombres del dispositivo. Los espacios de nombres se pueden utilizar como etiquetas (tags) para diferenciar entre múltiples dispositivos de red que pueden compartir la misma IP privada.

Ping
: una herramienta de red que mide cuánto tarda una señal en viajar de un dispositivo a otro a través de una red y viceversa.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/
[2]: /es/network_monitoring/devices/profiles
[3]: /es/network_monitoring/devices/snmp_traps/?tab=yaml#device-namespaces