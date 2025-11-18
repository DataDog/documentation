---
aliases:
- /es/integrations/active_directory
app_id: active-directory
categories:
- windows
custom_kind: integración
description: Recopilación y creación de gráficos de métricas de Microsoft Active Directory
integration_version: 4.2.0
media: []
supported_os:
- windows
title: Active Directory
---
## Información general

Obtén métricas de Microsoft Active Directory para visualizar y monitorizar su rendimiento.

## Configuración

### Instalación

El check de Active Directory del Agent está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

Si instalas el Datadog Agent en un entorno de dominio, consulta [los requisitos de instalación del Agent](https://docs.datadoghq.com/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment)

### Configuración

#### Recopilación de métricas

1. Edita el archivo `active_directory.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de Active Directory. La configuración por defecto ya debería recopilar métricas para el host local. Consulta el [active_directory.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

**Nota**: Las versiones 1.13.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `active_directory` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **active_directory.dra.inbound.bytes.after_compression** <br>(gauge) | El tamaño comprimido (en bytes) de los datos de replicación comprimidos entrantes desde los agentes del sistema de directorio (DSAs) en otros sitios (por segundo).<br>_Se muestra como byte_ |
| **active_directory.dra.inbound.bytes.before_compression** <br>(gauge) | El tamaño sin comprimir (en bytes) de los datos de replicación comprimidos entrantes desde DSAs en otros sitios (por segundo).<br>_Se muestra como byte_ |
| **active_directory.dra.inbound.bytes.not_compressed** <br>(gauge) | El tamaño sin comprimir (en bytes) de los datos de replicación que no se comprimieron en la fuente, es decir, datos entrantes de otros DSA en el mismo sitio (por segundo).<br>_Se muestra como byte_ |
| **active_directory.dra.inbound.bytes.total** <br>(gauge) | El número total de bytes (por segundo) recibidos a través de la replicación. Es la suma del número de bytes de datos sin comprimir (nunca comprimidos) y de datos comprimidos (después de la compresión).<br>_Se muestra como byte_ |
| **active_directory.dra.inbound.objects.applied_persec** <br>(gauge) | Número de objetos recibidos (por segundo) de los socios de replicación y aplicados por el servicio de directorio local. Este contador excluye los cambios que se reciben pero no se aplican (por ejemplo, cuando la actualización ya se ha realizado). Este contador indica cuántas actualizaciones de replicación se están produciendo en el servidor como resultado de cambios generados en otros servidores.<br>_Se muestra como objeto_ |
| **active_directory.dra.inbound.objects.filtered_persec** <br>(gauge) | Número de objetos recibidos (por segundo) de los socios de replicación que no contenían actualizaciones que debían aplicarse.<br>_Se muestra como objeto_ |
| **active_directory.dra.inbound.objects.persec** <br>(gauge) | Número de objetos recibidos (por segundo) a través de la replicación entrante desde los socios de replicación.<br>_Se muestra como objeto_ |
| **active_directory.dra.inbound.objects.remaining** <br>(gauge) | El número de objetos restantes hasta que finalice todo el proceso de sincronización.<br>_Se muestra como objeto_ |
| **active_directory.dra.inbound.objects.remaining_in_packet** <br>(gauge) | El número de actualizaciones de objetos recibidas en el paquete de actualización de replicación de directorios actual que aún no se han aplicado al servidor local. Este contador te indica si el servidor supervisado está recibiendo cambios, pero está tardando mucho en aplicarlos a la base de datos.<br>_Se muestra como objeto_ |
| **active_directory.dra.inbound.properties.applied_persec** <br>(gauge) | El número de cambios (por segundo) en las propiedades de los objetos que se aplican a través de la replicación entrante como resultado de la lógica de reconciliación.|
| **active_directory.dra.inbound.properties.filtered_persec** <br>(gauge) | El número de cambios (por segundo) en las propiedades de los objetos recibidos durante la replicación que ya se han realizado.|
| **active_directory.dra.inbound.properties.total_persec** <br>(gauge) | Número total de cambios (por segundo) en las propiedades de los objetos recibidos de los socios de replicación.|
| **active_directory.dra.inbound.values.dns_persec** <br>(gauge) | El número de valores de propiedades de objetos recibidos (por segundo) de los socios de replicación en los que los valores son para propiedades de objetos que pertenecen a nombres distinguidos. Este número incluye objetos que hacen referencia a otros objetos. Un número alto de este contador podría explicar por qué los cambios entrantes tardan en aplicarse a la base de datos.|
| **active_directory.dra.inbound.values.total_persec** <br>(gauge) | El número total de valores de propiedades de objetos recibidos (por segundo) de los socios de replicación. Cada objeto entrante tiene una o más propiedades, y cada propiedad tiene cero o más valores. Un valor de cero indica que la propiedad debe eliminarse.|
| **active_directory.dra.outbound.bytes.after_compression** <br>(gauge) | El tamaño comprimido (en bytes) de los datos de replicación comprimidos que se envían a los DSAs de otros sitios (por segundo).<br>_Se muestra como byte_ |
| **active_directory.dra.outbound.bytes.before_compression** <br>(gauge) | El tamaño sin comprimir (en bytes) de los datos de replicación comprimidos que salen hacia los DSAs de otros sitios (por segundo).<br>_Se muestra como byte_ |
| **active_directory.dra.outbound.bytes.not_compressed** <br>(gauge) | El tamaño sin comprimir (en bytes) de los datos de replicación salientes que no se comprimieron, es decir, salientes a DSAs en el mismo sitio, por segundo.<br>_Se muestra como byte_ |
| **active_directory.dra.outbound.bytes.total** <br>(gauge) | El número total de bytes enviados por segundo. Es la suma del número de bytes de datos sin comprimir (nunca comprimidos) y de datos comprimidos (después de la compresión).<br>_Se muestra como byte_ |
| **active_directory.dra.outbound.objects.filtered_persec** <br>(gauge) | Número de objetos (por segundo) reconocidos por los socios de replicación salientes que no requieren actualizaciones. Este contador incluye los objetos que el interlocutor saliente aún no tenía.<br>_Se muestra como objeto_ |
| **active_directory.dra.outbound.objects.persec** <br>(gauge) | Número de objetos enviados (por segundo) a través de la replicación saliente a los socios de replicación.<br>_Se muestra como objeto_ |
| **active_directory.dra.outbound.properties.persec** <br>(gauge) | El número de propiedades enviadas por segundo. Este contador te indica si un servidor fuente está devolviendo objetos o no. A veces, el servidor puede dejar de funcionar correctamente y no devolver objetos rápidamente o en absoluto.|
| **active_directory.dra.outbound.values.dns_persec** <br>(gauge) | El número de valores de propiedades de objetos enviados (por segundo), a los socios de replicación en los que los valores son para propiedades de objetos que pertenecen a nombres distinguidos.|
| **active_directory.dra.outbound.values.total_persec** <br>(gauge) | El número total de valores de propiedades de objetos enviados (por segundo), a los socios de replicación.|
| **active_directory.dra.replication.pending_synchronizations** <br>(gauge) | El número de sincronizaciones de directorio que están en cola para este servidor y que aún no se han procesado. Este contador ayuda a determinar el retraso en la replicación: cuanto mayor sea el número, mayor será el retraso.|
| **active_directory.dra.sync_requests_made** <br>(gauge) | El número de solicitudes de sincronización realizadas a los socios de replicación desde que el ordenador se reinició por última vez.<br>_Se muestra como solicitud_ |
| **active_directory.ds.threads_in_use** <br>(gauge) | El número actual de subprocesos en uso por el servicio de directorio (diferente del número de subprocesos en el proceso del servicio de directorio). Este contador representa el número de subprocesos que atienden actualmente las llamadas a la API realizadas por los clientes, y se puede utilizar para determinar si sería útil disponer de más CPUs.<br>_Se muestra como subproceso_ |
| **active_directory.ldap.bind_time** <br>(gauge) | El tiempo (en milisegundos) necesario para que se complete la última vinculación LDAP correcta.<br>_Se muestra como milisegundo_ |
| **active_directory.ldap.client_sessions** <br>(gauge) | El número de sesiones de clientes LDAP conectados.<br>_Se muestra como sesión_ |
| **active_directory.ldap.searches_persec** <br>(gauge) | Número de operaciones de búsqueda por segundo realizadas por clientes LDAP.|
| **active_directory.ldap.successful_binds_persec** <br>(gauge) | Número de enlaces LDAP (por segundo) que se han producido correctamente.|

### Eventos

El check de Active Directory no incluye ningún evento.

### Checks de servicio

El check de Active Directory no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).