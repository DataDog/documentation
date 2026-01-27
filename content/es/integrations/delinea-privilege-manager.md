---
aliases:
- /es/integrations/delinea_privilege_manager
app_id: delinea-privilege-manager
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre eventos de Delinea Privilege Manager.
integration_version: 1.0.0
media:
- caption: Delinea Privilege Manager - Información General
  image_url: images/delinea_privilege_manager_overview.png
  media_type: imagen
- caption: Delinea Privilege Manager - Eventos de control de aplicaciones
  image_url: images/delinea_privilege_manager_application_control_events.png
  media_type: imagen
- caption: Delinea Privilege Manager - Eventos de seguridad local
  image_url: images/delinea_privilege_manager_local_security_events.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Delinea Privilege Manager
---
## Información general

[Delinea Privilege Manager](https://delinea.com/products/privilege-manager) es una solución de control de aplicaciones y privilegios mínimos para Windows y macOS, capaz de respaldar a empresas y organizaciones de rápido crecimiento a escala. Local Security y Application Control son los dos componentes principales de Delinea Privilege Manager.

Esta integración admite los siguientes tipos de logs:

- **Application Action Events** (Eventos de acción de la aplicación): Los eventos de acción de la aplicación contienen información genérica sobre la aplicación que se ejecutó, la política que se activó, la fecha y la hora, el equipo y el usuario.
- **Application Justification Events** (Eventos de justificación de la aplicación): Los eventos de justificación de la aplicación se generan cuando un usuario ejecuta una aplicación que requiere un flujo de trabajo de justificación.
- **Bad Rated Application Action Events** (Eventos de acción de la aplicación con mala puntuación): Los eventos de acción de la aplicación con mala puntuación se generan cuando se instala o se ejecuta una aplicación con una mala puntuación de seguridad.
- **Password Disclosure Events** (Eventos de divulgación de contraseñas): Los eventos de divulgación de contraseñas contienen todos los tipos de actividad de divulgación de contraseñas.
- **Newly Discovered File Events** (Eventos de archivos recientemente detectados): Los eventos de archivos recientemente detectados contienen información sobre archivos recientemente detectados en el sistema.
- **Change History Events** (Eventos del historial de cambios): Los eventos del historial de cambios contienen información sobre todos los cambios realizados en Delinea Privilege Manager.

Visualiza información detallada sobre estos logs utilizando los dashboards predefinidos. La integración también incluye reglas de detección de Cloud SIEM listas para utilizar para mejorar la monitorización y la seguridad.

## Configuración

### Instalación

Para instalar la integración Delinea Privilege Manager, ejecuta el siguiente comando de instalación del Agent seguido de los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de integraciones](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para las versiones >= 7.63.0 del Agent.

Comando de Linux

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-delinea-privilege-manager==1.0.0
```

### Configuración

#### Recopilación de logs

1. Por defecto, la recopilación de logs está desactivada en el Datadog Agent. Para activarla, modifica el archivo `datadog.yaml`::

   ```yaml
     logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `delinea_privilege_manager.d/conf.yaml` para empezar a recopilar tus logs.

   Consulta el ejemplo [delinea_privilege_manager.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/delinea_privilege_manager/datadog_checks/delinea_privilege_manager/data/conf.yaml.example) para conocer las opciones de configuración disponibles. El protocolo apropiado (ya sea TCP o UDP) debería ser elegido basado en la configuración de reenvío de syslog de Delinea Privilege Manager.

   - **TCP**: Si se utiliza el protocolo TCP para el reenvío de syslog, configura `type` como `tcp`.
   - **UDP**: Si se utiliza el protocolo UDP para el reenvío syslog, configura `type` como `udp`.

   ```yaml
     logs:
     - type: <tcp/udp>
       port: <PORT>
       source: delinea-privilege-manager
       service: delinea-privilege-manager
   ```

   **Notas**:

   - `PORT`: El puerto debe ser el mismo que el proporcionado en la sección **Configurar el reenvío de mensajes syslog desde Delinea Privilege Manager**.
   - Se recomienda no modificar los valores de servicio y fuente, ya que estos parámetros son esenciales para el funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes syslog desde Delinea Privilege Manager

- Creación de la configuración del servidor syslog
  1. Ve a **Admin** > **Configuration** (Administrador > Configuración) y selecciona la pestaña **Foreign Systems** (Sistemas externos).

  1. Haz clic en **Syslog** para abrir la página de configuraciones de syslog y, a continuación, haz clic en el botón **Create** (Crear).

  1. Indica un nombre de configuración y la dirección del servidor syslog (TCP o UDP)

     - Para TCP, la configuración debe tener el siguiente formato: tcp://\[host\]:port
     - Para UDP, la configuración debe tener el siguiente formato: udp://\[host\]:port

     **Host**: Dirección IP donde se ejecuta tu datadog-agent.

     **Puerto**: Número de puerto para enviar mensajes syslog.

  1. Haz clic en el botón **Create** (Crear). Confirma los datos añadidos y vuelve al menú Admin (Administrador).
- Configuración de tareas del servidor syslog:
  1. Tras añadir una nueva conexión syslog, ve a **Admin** > **Tasks** (Administrador > Tareas) para enviar logs a tu servidor syslog.

  1. Expande las carpetas **Server Tasks** > **Foreign Systems** (Tareas del servidor > Sistemas externos), selecciona **SysLog** y haz clic en **Create** (Crear).

  1. En el menú desplegable **Template** (Plantilla), selecciona la plantilla **Send Application Action Events to Syslog** (Enviar eventos de acción de la aplicación a Syslog).

  1. Añade un **Name** (Nombre) para esta tarea (configurado como **Application Action Events** (Eventos de acción de la aplicación)) y un **Event Name** (Nombre de evento) **Application Action Events** (Eventos de acción de la aplicación)), y especifica la **Gravedad del evento** (0: mínima, 10: máxima), o mantenla como está.

  1. En el menú desplegable **SysLog System** (Sistema SysLog), selecciona tu sistema externo de servidor SysLog (configurado anteriormente).

  1. Proporciona un valor para el **Security Ratings Provider** (Proveedor de puntuaciones de seguridad) si es necesario, o déjalo como está.

  1. Haz clic en **Create** (Crear).

     **Nota**: No modifiques **Data source** (Fuente de datos) y asegúrate de que el conmutador **Replace spaces** (Reemplazar espacios) está desactivado, ya que cualquier cambio en estos parámetros afectará directamente a la funcionalidad de la integración de Delinea Privilege Manager.

  1. Una vez creado, desplázate hasta la sección Schedule (Cronograma) y haz clic en el botón **New Schedule** (Nuevo cronograma). Proporciona los siguientes datos:

     1. Detalles del cronograma:
        - Proporciona un **Schedule Name** (Nombre de cronograma).
     1. Cronograma:
        1. Para **Schedule Type** (Tipo de cronograma), selecciona **Shared schedule** (Cronograma compartido) en el menú desplegable.
        1. Para **Shared schedule** (Cronograma compartido), selecciona **Quarter-Hour** (Cuarto de hora) en el menú desplegable.

  1. Haz clic en el botón **Save changes** (Guardar cambios) disponible en la esquina superior derecha de la página.

Este proceso configura la tarea de reenvío de Syslog para **Application Action Events** (Eventos de acción de la aplicación). Para otros tipos de eventos mencionados en la tabla siguiente, crea nuevas tareas para cada evento con la plantilla y el nombre de evento respectivos, y sigue todos los pasos anteriores.

**Nota**: En el paso 4, asegúrate de definir el **Name** (Nombre) para la tarea y el **Event Name** (Nombre de evento) de acuerdo con la plantilla seleccionada, tal y como se especifica en la siguiente tabla. El **Nombre de evento** es esencial para la funcionalidad del pipeline de Delinea Privilege Manager y debe proporcionarse exactamente como se especifica.

| Plantilla     | Nombre de evento    | Nombre |
| ---------  | -------------- |--------------
| Enviar eventos de acción de la aplicación a Syslog | Eventos de acción de la aplicación | Eventos de acción de la aplicación |
| Enviar eventos de justificación de la aplicación a Syslog | Eventos de justificación de la aplicación | Eventos de justificación de la aplicación |
| Enviar eventos del historial de cambios a Syslog | No corresponde | Eventos del historial de cambios |
| Enviar eventos de archivos recientemente detectados a Syslog | Eventos de archivos recientemente detectados | Eventos de archivos recientemente detectados |
| Enviar eventos de divulgación de contraseñas a Syslog | Eventos de divulgación de contraseñas | Eventos de divulgación de contraseñas |
| Enviar eventos de acción de la aplicación con mala puntuación a Syslog | Eventos de acción de la aplicación con mala puntuación | Eventos de acción de la aplicación con mala puntuación |

### Validación

[Ejecuta el subcomando de estado del Agent (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `Delinea Privilege Manager` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| CEF | Eventos de acción de la aplicación, Eventos de acción de la aplicación con mala puntuación, Eventos de justificación de la aplicación, Eventos de divulgación de contraseñas, Eventos de archivos recientemente detectados, Eventos del historial de cambios |

### Métricas

La integración de Delinea Privilege Manager no incluye métricas.

### Eventos

La integración de Delinea Privilege Manager no incluye eventos.

### Checks de servicio

La integración de Delinea Privilege Manager no incluye checks de servicio.

## Solucionar problemas

**Permission denied while port binding** (Permiso denegado en la vinculación de puertos):

Si aparece un error de **Permission denied** (Permiso denegado) al vincular puertos en los logs del Agent:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

   ```shell
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

1. Comprueba que la configuración es correcta ejecutando el comando `getcap`:

   ```shell
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   Con el resultado esperado:

   ```shell
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **Nota**: Debes ejecutar el comando `setcap` cada vez que actualices el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Data is not being collected** (No se están recopilando datos):

Asegúrese de que el tráfico se desvía del puerto configurado si el cortafuegos está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port \<PORT_NUMBER> Already in Use**, consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
  - Desactiva Syslog.
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).