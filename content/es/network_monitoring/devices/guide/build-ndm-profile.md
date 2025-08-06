---
aliases:
- /es/network_performance_monitoring/devices/guide/build-ndm-profile
further_reading:
- link: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
  tag: Documentación
  text: Referencia del formato del perfil
- link: https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/
  tag: Documentación
  text: Referencia del formato de los datos de simulación
title: Crear un perfil NDM (Avanzado)
---

Datadog Network Device Monitoring utiliza perfiles para recopilar métricas de dispositivos de red. Estos se definen de forma limitada mediante una MIB o para recopilar métricas de una marca y modelo de dispositivo específico. Este tutorial muestra los pasos para crear un perfil NDM básico que recopile métricas OID de dispositivos HP iLO4.

Los perfiles NDM utilizan conceptos SNMP. Para obtener información básica sobre SNMP, consulta el [glosario][1].

<div class="alert alert-info">
Esta guía está destinada a usuarios avanzados. La mayoría de los dispositivos se pueden configurar mediante la interfaz gráfica de usuario que se incluye en la documentación <a href="/network_monitoring/devices/guide/device_profiles/">Introducción a los perfiles de dispositivos</a> o mediante los <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">perfiles de Datadog</a>.
</div>

## Investigación

El primer paso para crear un perfil NDM es investigar el dispositivo y determinar las métricas a recopilar.

### Información sobre el dispositivo

Consulta el sitio web del fabricante o busca en la web para encontrar la siguiente información:

- Nombre del dispositivo, fabricante e [identificador de objeto del sistema][1].

- Comprende el dispositivo y su caso de uso. Las métricas varían entre enrutadores, conmutadores, puentes, etc. Por ejemplo, según la [página de Wikipedia sobre HP iLO][2], los administradores de sistemas utilizan dispositivos iLO4 para la gestión remota de servidores integrados.

- Versiones disponibles del dispositivo y versiones de destino. Por ejemplo, los dispositivos HP iLO existen en múltiples versiones. Este tutorial está dirigido específicamente a HP iLO4.

- MIB compatibles (ASN1, formato de texto), OID y archivos MIB asociados. Por ejemplo, HP ofrece un paquete MIB para dispositivos iLO [su sitio web][3]. **Nota**: No se requiere el MIB con el perfil para recopilar métricas.

**Nota**: Para obtener más detalles sobre los casos de uso de dispositivos, consulta [Hardware de redes][4].

### Selección de métricas

A continuación, decide las métricas que deseas recopilar. Los dispositivos suelen exponer miles de métricas y OID que pueden abarcar docenas de MIB.

Algunas pautas de ayuda en este proceso:

- Mantén el número de métricas entre 10 y 40.
- Explora los perfiles base para ver cuáles podrían aplicarse al dispositivo.
- Explora los archivos MIB específicos del fabricante en busca de métricas como:
    - Estado general: indicadores de estado
    - Tráfico de red: bytes de entrada/salida, errores de entrada/salida
    - Uso de CPU y memoria
    - Temperatura: sensores de temperatura, estado térmico
    - Alimentación: encendido/apagado o ramal total

## Despliegue

### Añadir un perfil

En primer lugar, añade un perfil creando un archivo `.yaml` con `sysobjectid` y métricas, por ejemplo:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**Nota**: `sysobjectid` puede ser un patrón comodín para coincidir con un subárbol de dispositivos, por ejemplo: `1.3.6.1.131.12.4.*`.

## Probar el perfil

En segundo lugar, prueba el perfil apuntando a una dirección IP de un dispositivo que utilizará el perfil.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/network_monitoring/devices/glossary
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware