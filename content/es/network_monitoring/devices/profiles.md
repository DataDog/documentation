---
aliases:
- /es/network_performance_monitoring/devices/profiles/
further_reading:
- link: /network_monitoring/devices/data
  tag: Documentación
  text: Datos recopilados a través de la monitorización de dispositivos de red
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorización de SNMP con Datadog
title: Perfiles NDM
---

## Información general

Network Device Monitoring utiliza perfiles para indicar al Datadog Agent las métricas y las etiquetas (tags) asociadas que debe recopilar. Un perfil es una colección de {{< tooltip text="OID (Identificadores de objetos)" tooltip="ID o dirección única de un dispositivo, que cuando se sondea devuelve el código de respuesta de ese valor." >}} asociados a un dispositivo.

## Configuración

Puedes activar perfiles de dispositivos en Datadog utilizando el flujo de trabajo recomendado basado en la GUI (Gestor de perfiles SNMP) o a través de una configuración avanzada:

**[Gestor de perfiles SNMP][9] (recomendado)**
- Interfaz de usuario guiada para personalizar las métricas recopiladas de dispositivos de red, directamente desde la página de configuración de [Network Device Monitoring][8].
- Elimina la necesidad de buscar identificadores de objetos (OID) en la documentación de los proveedores, recomendando automáticamente una lista de métricas relevantes y legibles por humanos.
- No requiere configuración manual con archivos `.yaml`.
- Aplica los cambios a escala a todos los Agents en un solo clic con la [configuración remota][11].

**[Configuración avanzada][10]** 
- Crea y activa perfiles personalizados manualmente con archivos `.yaml`, especificando las métricas y las etiquetas (tags) del dispositivo.
- Ideal para entornos grandes o dinámicos.

Por defecto, se cargan todos los perfiles del directorio de configuración del Agent. Para personalizar los perfiles específicos de la colección, haz referencia explícita a ellos por nombre de archivo en `definition_file` o proporciona una lista en línea en `definition`. Se puede hacer referencia a cualquiera de los perfiles de Datadog por su nombre. Se puede hacer referencia a perfiles personalizados adicionales por la ruta del archivo en la configuración o colocarlos en el directorio de configuración.

**Nota**: El perfil genérico es [generic-device.yaml][1], que admite enrutadores, conmutadores y otros dispositivos.

## Términos y conceptos

### Dispositivos sysOID asignados

Los perfiles permiten a la monitorización de dispositivos de red reutilizar las definiciones de métricas en varios tipos o instancias de dispositivos. Los perfiles definen qué métricas recopilar y cómo transformarlas en métricas de Datadog. Se espera que cada perfil monitorice una clase de dispositivos similares del mismo proveedor. El Datadog Agent los utiliza automáticamente comparando los sysObjectId del dispositivo de red con aquellos definidos en el archivo del perfil.

El Datadog Agent proporciona perfiles listos predefinidos en el directorio `conf.d/snmp.d/default_profiles`. Este directorio se vacía y restablece cuando se actualiza el Agent, por lo que no debes guardar nada en él. Puedes escribir tus propios perfiles personalizados y ampliar los existentes colocando archivos en el directorio `conf.d/snmp.d/profiles`.

El siguiente perfil de ejemplo se utiliza en cualquier dispositivo red cuyo `sysobjectid` es `1.3.6.1.4.1.232.9.4.10` o comienza con `1.3.6.1.4.1.232.9.4.2.`:

```yaml
sysobjectid:
 - 1.3.6.1.4.1.232.9.4.10
 - 1.3.6.1.4.1.232.9.4.2.*

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

Si necesitas diferentes métricas para dispositivos de red que comparten el mismo `sysobjectid`, puedes escribir perfiles sin ningún `sysobjectid` y configurar la opción `profile` en la configuración del SNMP.

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile1
   - ip_address: 192.168.34.11
     profile: my-profile2
   - ip_address: 192.168.34.13
     # For this device, the Agent will fetch the sysObjectID of the device and use the closest match
```

### Definición de métricas por perfil

Los perfiles pueden utilizarse indistintamente, lo que significa que los dispositivos que comparten dependencias MIB pueden reutilizar los mismos perfiles. Por ejemplo, el [perfil Cisco c3850][2] puede utilizarse en muchos conmutadores Cisco.

Para ver más perfiles proporcionados por Datadog, consulta el [repositorio de GitHub][3].

### Definición de metadatos por perfil

En la sección de metadatos de los perfiles, puedes definir dónde y cómo se recopilan los metadatos. Los valores pueden ser estáticos o proceder de un valor de identificador de objeto (OID).
Para ver los campos admitidos, consulta la sección de [metadatos de dispositivos][4].

En la versión 7.52 y posteriores del Datadog Agent, existe un campo `device_type` para metadatos de dispositivos. Puede configurarse manualmente en el perfil y utilizarse para filtrar tipos específicos de dispositivos. Los valores aceptados son:

- punto_de_acceso
- cortafuegos
- equilibrador_de_carga
- pdu
- impresora
- enrutador
- sd-wan
- sensor
- servidor
- almacenamiento
- conmutador
- ups
- wlc

Para obtener más información sobre los formatos de los perfiles, consulta [Referencia de formatos de perfiles][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml
[3]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/default_profiles
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkdevice/metadata/payload.go#L51-L76
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[6]: https://app.datadoghq.com/devices/
[7]: /es/network_monitoring/devices/guide/device_profiles/
[8]: https://app.datadoghq.com/devices/profiles
[9]: /es/network_monitoring/devices/guide/device_profiles/
[10]: /es/network_monitoring/devices/guide/build-ndm-profile/
[11]: /es/agent/remote_config/