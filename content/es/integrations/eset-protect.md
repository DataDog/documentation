---
aliases:
- /es/integrations/eset_protect
app_id: eset-protect
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre los eventos de ESET Protect.
integration_version: 1.0.0
media:
- caption: 'ESET Protect: descripción general'
  image_url: images/eset_protect_overview.png
  media_type: imagen
- caption: 'ESET Protect: eventos de sitios web filtrados'
  image_url: images/eset_protect_filtered_websites_events.png
  media_type: imagen
- caption: 'ESET Protect: eventos de amenazas'
  image_url: images/eset_protect_threat_events.png
  media_type: imagen
- caption: 'ESET Protect: eventos del firewall'
  image_url: images/eset_protect_firewall_events.png
  media_type: imagen
- caption: 'ESET Protect: eventos de auditoría'
  image_url: images/eset_protect_audit_events.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: ESET Protect
---
## Información general

[ESET Protect](https://identity.eset.com/login/pwd?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DERA%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520eset_id%2520eca%26ui_locales%3Den-US%26redirect_uri%3Dhttps%253A%252F%252Fprotect.eset.com) es una plataforma de gestión central para las soluciones de seguridad de ESET, que permite a los usuarios gestionar la seguridad en varios dispositivos y plataformas desde una única consola. A través de la consola web de ESET Protect, puedes desplegar soluciones ESET, gestionar tareas, aplicar políticas de seguridad, monitorizar el estado del sistema y responder rápidamente a problemas o detecciones en equipos remotos.

Esta integración enriquece e ingiere los siguientes logs:

- **Threat_Event**: registra las detecciones que implican amenazas de seguridad identificadas como malware, virus y comportamientos sospechosos. Incluye información sobre el tipo de amenaza, su ubicación y la respuesta o acción realizada.
- **FirewallAggregated_Event**: registra el tráfico de red filtrado por el firewall, incluidas las conexiones bloqueadas o permitidas. Registra protocolos, direcciones IP, puertos y el estado de las conexiones de red.
- **FilteredWebsites_Event**: registra los intentos de acceso a sitios web bloqueados por la función de filtrado web según las reglas de seguridad o políticas. Incluye detalles sobre la categoría del sitio web y la acción realizada (permitido o bloqueado).
- **Audit_Event***: registra acciones del usuario o del sistema dentro de la consola de gestión para auditoría y responsabilidad, como cambios de configuración, inicios de sesión o ejecuciones de tareas.

Después de recopilar los logs, ESET Protect los canaliza a Datadog para su análisis. Utilizando el pipeline de logs integrado, estos logs se analizan y enriquecen, lo que permite realizar búsquedas y análisis sin esfuerzo. La integración proporciona información sobre los logs de ESET Protect a través de dashboards predefinidos e incluye reglas de detección de Cloud SIEM listas para usar para mejorar la monitorización y la seguridad.

## Configuración

### Instalación

Para instalar la integración de ESET Protect, ejecuta el siguiente comando de instalación del Agent. Después, sigue los pasos de la sección de [configuración](#configuration) para configurar la recopilación de logs. Para obtener más información, consulta la documentación [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para el Agent versión >= 7.68.0.

Comando Linux:

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-eset-protect==1.0.0
```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `eset_protect.d/conf.yaml` para empezar a recopilar tus logs de ESET Protect.

   ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         source: eset-protect
   ```

   Para conocer las opciones de configuración disponibles, consulta el [eset_protect.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/eset_protect/datadog_checks/eset_protect/data/conf.yaml.example). Elige el protocolo adecuado (TCP o UDP) en función de la configuración de reenvío de syslog de ESET Protect.

   **Nota**: No modifiques los valores fuente, ya que este parámetro forma parte integrante del funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes syslog desde ESET Protect

1. Inicia sesión en la consola web de ESET Protect.
1. Navega a **More** > **Settings** > **Advanced Settings** > **Syslog Server** (Más > Configuración > Configuración avanzada > Servidor syslog) y haz clic en el conmutador al lado de **Use Syslog server** (Usar el servidor syslog).
1. Especifica los siguientes ajustes obligatorios:
   - **Host**: proporciona la dirección IP o el nombre de host del destino de los mensajes Syslog.
   - **Puerto**: proporciona el número de puerto.
   - **Formato**: selecciona Syslog.
   - **Transporte**: selecciona el protocolo de envío de mensajes a Syslog (TCP o UDP).
1. Desplázate hacia abajo hasta **Logging** (Registro) y activa el conmutador **Export logs to Syslog** (Exportar logs a Syslog).
1. Selecciona **JSON** en el desplegable **Exported logs format** (Formato de exportación de logs).
1. Haz clic en **Save** (Guardar).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `eset_protect` en la sección Checks.

## Datos recopilados

### Logs

La integración de ESET Protect recopila logs `Threat_Event`, `FirewallAggregated_Event`, `FilteredWebsites_Event` y `Audit_Event`.

### Métricas

La integración de ESET Protect no incluye ninguna métrica.

### Eventos

La integración de ESET Protect no incluye ningún evento.

## Solucionar problemas

### Permiso denegado durante la vinculación de puertos

Si ves un error de **Permiso denegado** mientras se vincula al puerto en los logs del Agent, consulta las siguientes instrucciones:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

   - Concede acceso al puerto mediante el comando `setcap`:

     ```shell
     sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
     ```

   - Comprueba que la configuración es correcta ejecutando el comando `getcap`:

     ```shell
     sudo getcap /opt/datadog-agent/bin/agent/agent
     ```

     Con el resultado esperado:

     ```shell
     /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
     ```

     **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### No se recopilan datos

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

### Puerto ya utilizado

Si aparece el error **Port \<PORT-NO> Already in Use**, consulta las siguientes instrucciones. El ejemplo siguiente es para un valor de PORT-NO de 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de ESET Protect en el puerto 514, puede aparecer el siguiente error en los logs del Agent:
`Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:

- Desactiva Syslog.
- Configura el Agent para escuchar en un puerto diferente, disponible.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).