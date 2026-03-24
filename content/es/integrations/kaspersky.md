---
app_id: kaspersky
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtener información sobre eventos Kaspersky
integration_version: 1.0.0
media:
- caption: Kaspersky - Información general
  image_url: images/kaspersky_overview.png
  media_type: imagen
- caption: Kaspersky - Seguridad de redes y sitios web
  image_url: images/kaspersky_network_and_web_security.png
  media_type: imagen
- caption: Kaspersky - Detección y respuesta ante amenazas
  image_url: images/kaspersky_threat_detection_and_response.png
  media_type: imagen
- caption: Kaspersky - Auditoría del sistema
  image_url: images/kaspersky_system_audit.png
  media_type: imagen
supported_os:
- linux
- windows
- macOS
title: Kaspersky
---
## Información general

[Kaspersky](https://www.kaspersky.com/next-edr-optimum) es una solución de ciberseguridad que detecta, analiza y responde a amenazas avanzadas en varios endpoints, bloqueando ataques, extrayendo patrones de amenazas y previniendo futuros incidentes.

Esta integración analiza los siguientes tipos de logs:

- **Eventos de aplicaciones de seguridad de endpoints**: Eventos generados por varias aplicaciones de seguridad de endpoints de Kaspersky.
- **Eventos del centro de seguridad**: Eventos generados por el centro de seguridad de Kaspersky.

Visualiza información detallada sobre estos logs a través de los dashboards predefinidos. Además, dispones de reglas de detección de Cloud SIEM predefinidas para monitorizar y responder a posibles amenazas de seguridad con eficacia.

## Configuración

### Instalación

El check de Kaspersky está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

- #### Configuración Syslog del centro de seguridad de Kaspersky

  - Configura la integración del sistema SIEM para la exportación Syslog mediante el servidor de administración o la consola web del centro de seguridad. Consulta los siguientes enlaces para obtener instrucciones detalladas de cada método.

    - Configuración de la exportación de eventos al sistema SIEM mediante la **Consola de administración**: [Configuración de la exportación de eventos a sistemas SIEM](https://support.kaspersky.com/ksc/15.1/89277)
    - Configuración de la exportación de eventos al sistema SIEM mediante la **Consola web del centro de seguridad**: [Configuración de la exportación de eventos a sistemas SIEM](https://support.kaspersky.com/ksc/15.1/216090)

- #### Marcado de eventos para su exportación a SIEM mediante Syslog en la consola web del centro de seguridad

  **Requisito previo**: Asegúrate de que los complementos web para aplicaciones de seguridad de endpoints están instalados.

  1. En la consola, en el menú de la izquierda, haz clic en **Assets (Devices) > Policies & profiles** (Recursos (dispositivos) > Políticas y perfiles).
  1. Para cada política **Seguridad de endpoints de Kaspersky para X** (donde X representa varios sistemas operativos), haz clic en la política.
  1. En la política, selecciona la pestaña **Event configuration** (Configuración de eventos).
  1. En el panel izquierdo, selecciona la sección **Critical** (Crítico). Selecciona todos los tipos de eventos y haz clic en **Mark for export to SIEM system by using Syslog** (Marcar para exportar al sistema SIEM utilizando Syslog).
  1. Sigue el mismo paso (paso 4) para las secciones **Warning**, **Functional failure**, **Info** (Advertencia, Fallo de funcionamiento, Información).

  Esto garantiza que todos los eventos relevantes de las aplicaciones de seguridad de endpoints de Kaspersky se exporten correctamente al sistema SIEM a través de Syslog.

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kaspersky` en la sección Checks.

## Datos recopilados

### Métricas

Kaspersky no incluye métricas.

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

   ```yaml
     logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `kaspersky.d/conf.yaml` para empezar a recopilar tus logs de Kaspersky. Consulta el [ejemplo kaspersky.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kaspersky/datadog_checks/kaspersky/data/conf.yaml.example) para conocer las opciones de configuración disponibles.

   ```yaml
     logs:
       - type: tcp
         port: <PORT>
         source: kaspersky
         service: kaspersky
   ```

   **Nota**:

   - `PORT`: El puerto debe ser similar al puerto proporcionado en la sección **Syslog configuration over Kaspersky Security Center** (Configuración Syslog en el centro de seguridad de Kaspersky).
   - Se recomienda no modificar los valores de servicio y fuente, ya que estos parámetros forman parte integrante del funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Eventos

La integración Kaspersky no incluye eventos.

### Checks de servicio

La integración Kaspersky no incluye checks de servicio.

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

   **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Data is not being collected** (No se están recopilando datos):

Asegúrate de que se omite el tráfico del puerto configurado si el cortafuegos está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port \<PORT_NUMBER> Already in Use**, consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
  - Desactiva Syslog.
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).