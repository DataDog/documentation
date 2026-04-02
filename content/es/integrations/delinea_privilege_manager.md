---
app_id: delinea-privilege-manager
app_uuid: 9b65ff08-afbc-4ad2-aaf1-9e06d959e309
assets:
  dashboards:
    Delinea Privilege Manager - Application Control Events: assets/dashboards/delinea_privilege_manager_application_control_events.json
    Delinea Privilege Manager - Local Security Events: assets/dashboards/delinea_privilege_manager_local_security_events.json
    Delinea Privilege Manager - Overview: assets/dashboards/delinea_privilege_manager_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33204336
    source_type_name: Delinea Privilege Manager
  logs:
    source: delinea-privilege-manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/delinea_privilege_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: delinea_privilege_manager
integration_id: delinea-privilege-manager
integration_title: Delinea Privilege Manager
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: delinea_privilege_manager
public_title: Delinea Privilege Manager
short_description: Obtén información sobre los eventos de Delinea Privilege Manager.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los eventos de Delinea Privilege Manager.
  media:
  - caption: 'Delinea Privilege Manager: información general'
    image_url: images/delinea_privilege_manager_overview.png
    media_type: imagen
  - caption: 'Delinea Privilege Manager: eventos de control de aplicaciones'
    image_url: images/delinea_privilege_manager_application_control_events.png
    media_type: imagen
  - caption: 'Delinea Privilege Manager: eventos de seguridad local'
    image_url: images/delinea_privilege_manager_local_security_events.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Delinea Privilege Manager
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Delinea Privilege Manager][1] es una solución de control de aplicaciones y privilegios mínimos para Windows y macOS, capaz de respaldar a empresas y organizaciones de rápido crecimiento a escala. La seguridad local y el control de aplicaciones son los dos componentes principales de Delinea Privilege Manager.

Esta integración admite los siguientes tipos de logs:
- **Eventos de acción de la aplicación**: los eventos de acción de la aplicación contiene información genérica sobre la aplicación que se ejecutó, la política que se activó, la fecha y la hora, el ordenador y el usuario.
- **Eventos de justificación de la aplicación**: los eventos de justificación de la aplicación se generan cuando una aplicación que requiere un proceso de justificación es ejecutada por un usuario.
- **Eventos de acción de la aplicación mal clasificada**: los eventos de acción de la aplicación mal clasificada se generan cuando se instala o ejecuta una aplicación con una calificación de seguridad deficiente.
- **Eventos de divulgación de contraseñas**: los eventos de divulgación de contraseñas contienen cualquier tipo de actividad de divulgación de contraseñas.
- **Eventos de archivos recién detectados**: los eventos de archivos recién detectados contienen información sobre archivos recién detectados en el sistema.
- **Eventos del historial de cambios**: los eventos del historial de cambios contienen información sobre cualquier cambio realizado en Delinea Privilege Manager.

Obtén información detallada sobre estos logs utilizando los dashboards predefinidos. La integración también incluye reglas de detección de Cloud SIEM listas para usar para mejorar la monitorización y la seguridad.

## Configuración

### Instalación

Para instalar la integración de Delinea Privilege Manager, ejecuta el siguiente comando de instalación del Agent seguido de los pasos siguientes. Para más información, consulta la documentación de [Gestión de integraciones][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.63.0.

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
2. Añade el siguiente bloque de configuración a tu archivo `delinea_privilege_manager.d/conf.yaml` para empezar a recopilar tus logs.

    Ve el ejemplo [delinea_privilege_manager.d/conf.yaml][3] para las opciones disponibles de configuración. El protocolo apropiado (ya sea TCP o UDP) debe ser elegido basado en la configuración de reenvío de syslog de Delinea Privilege Manager.

    - **TCP**: si se utiliza el protocolo TCP para el reenvío de syslog, configura `type` en `tcp`.
    - **UDP**: si se utiliza el protocolo UDP para el reenvío de syslog, configura `type` en `udp`.

    ```yaml
      logs:
      - type: <tcp/udp>
        port: <PORT>
        source: delinea-privilege-manager
        service: delinea-privilege-manager
    ```
    **Notas**: 
      - `PORT`: el puerto debe ser el mismo que el proporcionado en la sección **Configurar reenvío de mensajes syslog desde Delinea Privilege Manager**.
      - Es recomendado mantener los valores servicio y fuente sin cambios, ya que estos parámetros son parte integral de la operación del pipeline.

3. [Reinicia el Agent][4].

#### Configurar reenvío de mensajes syslog desde Delinea Privilege Manager

  - Creación de una configuración del servidor Syslog
    1. Ve a **Admin** > **Configuration** (Administrador > Configuración) y selecciona la pestaña **Foreign Systems** (Sistemas extranjeros).
    2. Haz clic en **Syslog** para abrir la página de configuraciones de syslog y, a continuación, haz clic en el botón **Create** (Crear).
    3. Indica un nombre de configuración y la dirección del servidor syslog (TCP o UDP)
        - Para TCP, la configuración debe tener el siguiente formato: tcp://[host]:port
        - Para UDP, la configuración debe tener el siguiente formato: udp://[host]:port

        **host**: la dirección IP donde se ejecuta tu datadog-agent.

        **Puerto**: número de puerto para enviar mensajes syslog.
    4. Haz clic en el botón **Create** (Crear). Confirma los datos añadidos y vuelve al menú Admin (Administrador).
  - Configuración de tareas del servidor Syslog:
    1. Tras añadir una nueva conexión Syslog, ve a **Admin** > **Tasks** (Administrador > Tareas) para enviar logs a tu servidor Syslog.
    2. Expande las carpetas **Server Tasks** > **Foreign Systems** (Tareas del servidor > Sistemas externos), selecciona **SysLog** y haz clic en **Create** (Crear).
    3. En el menú desplegable **Template** (Plantilla), selecciona la plantilla **Send Application Action Events to Syslog** (Enviar eventos de acción de la aplicación a Syslog).
    4. Añade un **Name** (Nombre) para esta tarea (establecido en **Application Action Events** (Eventos de acción de la aplicación)) y **Event Name** (Nombre de evento) (configurado como **Application Action Events** (Eventos de acción de la aplicación)), y especifica **Event Severity** (Seguridad de evento) (0: mínimo, 10: máximo), o manténla como está.

    5. En el menú desplegable **SysLog System** (Sistema SysLog), selecciona tu sistema externo de servidor SysLog (configurado anteriormente).
    6. Proporciona un valor para **Security Ratings Provider** (Proveedor de calificaciones de seguridad) si es necesario, o déjalo como está.
    7. Haz clic en **Create** (Crear).

        **Nota**: No modifiques **Data source** (Fuente de datos) y asegúrate de que el conmutador **Replace spaces** (Reemplazar espacios) está desactivado, ya que cualquier cambio en estos parámetros afectará directamente a la funcionalidad de la integración de Delinea Privilege Manager.

    8. Una vez creado, desplázate hasta la sección Schedule (Horario) y haz clic en el botón **New Schedule** (Nuevo horario). Proporciona los siguientes datos:
        1. Detalles del horario: 
            -  Proporciona un **Schedule Name** (Nombre del horario).
        2. Horario:
            1. Para **Schedule Type** (Tipo de horario), selecciona **Shared Schedule** (Horario compartido) en el menú desplegable.
            2. En **Shared Schedule** (Horario compartido), selecciona **Quarter-Hour** (Cuarto de hora) en el menú desplegado.
    9. Pulsa el botón **Save changes** (Guardar cambios) disponible en la esquina superior derecha de la página.

Este proceso configura la tarea de reenvío de Syslog para **Application Action Events** (Eventos de acción de la aplicación). Para otros tipos de eventos mencionados en la tabla siguiente, crea nuevas tareas para cada evento con la plantilla y el nombre de evento respectivos, y sigue todos los pasos anteriores.

  **Nota**: En el paso 4, asegúrate de establecer el **Name** (Nombre) para la tarea y el **Event Name** (Nombre de evento) de acuerdo con la plantilla seleccionada, tal y como se especifica en la siguiente tabla. El **Nombre de evento** es esencial para la funcionalidad del pipeline de Delinea Privilege Manager y debe ser proporcionado exactamente como se especifica.

| Plantilla     | Nombre de evento    | Nombre |
| ---------  | -------------- |--------------
| Enviar eventos de acción de la aplicación a Syslog | Eventos de acción de la aplicación | Eventos de acción de la aplicación |
| Enviar eventos de justificación de la aplicación a Syslog | Eventos de justificación de la aplicación | Eventos de justificación de la aplicación |
| Enviar eventos del historial de cambios a Syslog | No aplicable | Eventos del historial de cambios |
| Enviar eventos de archivo recién detectado a Syslog | Eventos de archivo recién detectado | Eventos de archivo recién detectado |
| Enviar eventos de divulgación de contraseñas a Syslog | Eventos de divulgación de contraseñas | Eventos de divulgación de contraseñas |
| Enviar eventos de acción de aplicaciones mal calificadas a Syslog | Eventos de acción de aplicaciones mal calificadas | Eventos de acción de aplicaciones mal calificadas |

### Validación

[Ejecuta el comando de estado del Agent][5] y busca `Delinea Privilege Manager` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de eventos    |
| ---------  | -------------- |
| CEF | Eventos de acción de la aplicación, Eventos de acción de aplicaciones mal calificadas, Eventos de justificación de la aplicación, Eventos de divulgación de contraseñas, Eventos de archivo recién detectado, Eventos de historial de cambios |

### Métricas

La integración de Delinea Privilege Manager no incluye ninguna métrica.

### Eventos

La integración de Delinea Privilege Manager no incluye ningún evento.

### Checks de servicio

La integración de Delinea Privilege Manager no incluye ningún check de servicio.

## Solucionar problemas

**Permiso denegado mientras se vincula el puerto:**

Si aparece un error de **Permission denied** (Permiso denegado) al vincular puertos en los logs del Agent:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:
    ```shell
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

2. Comprueba que la configuración es correcta mediante la ejecución del comando `getcap`:

    ```shell
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    Con el resultado esperado:

    ```shell
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **Nota**: Debes ejecutar el comando `setcap` cada vez que actualices el Agent.

3. [Reinicia el Agent][4].


**No se están recopilando datos:**

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

**Puerto ya en uso:**

Si aparece el error **Port <PORT_NUMBER> Already in Use** (El puerto está en uso), consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
    - Desactiva Syslog.
    - Configura el Agent para escuchar en un puerto diferente disponible.


Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][6].

[1]: https://delinea.com/products/privilege-manager
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/delinea_privilege_manager/datadog_checks/delinea_privilege_manager/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/