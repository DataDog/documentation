---
aliases:
- /es/integrations/cisco_secure_web_appliance
app_id: cisco-secure-web-appliance
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre la actividad de filtrado y exploración del proxy
  web y la actividad del monitor (noun) de tráfico de capa 4
integration_version: 1.0.0
media:
- caption: Cisco Secure Web Appliance - Logs de acceso
  image_url: images/cisco_secure_web_appliance_access_logs.png
  media_type: imagen
- caption: Cisco Secure Web Appliance - Logs de L4TM
  image_url: images/cisco_secure_web_appliance_l4tm_logs.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Cisco Secure Web Appliance
---
## Información general

[Cisco Secure Web Appliance](https://www.cisco.com/site/in/en/products/security/secure-web-appliance/index.html) protege a tu organización bloqueando automáticamente los sitios de riesgo y comprobando los sitios desconocidos antes de permitir el acceso a los usuarios. Intercepta y monitoriza el tráfico de Internet y aplica políticas para ayudar a mantener tu red interna segura frente al malware, la pérdida de datos confidenciales, la pérdida de productividad y otras amenazas basadas en Internet.

Esta integración ingiere los siguientes tipos de logs:

- Logs de acceso: Registran toda la actividad de filtrado y escaneo del Proxy Web.
- Logs de L4TM: Registran toda la actividad del monitor (noun) de tráfico de capa 4.

Los dashboards predefinidos te ayudan a visualizar información detallada sobre la actividad de filtrado y análisis del proxy web y la actividad del monitor (noun) de tráfico de capa 4. Además, las reglas de detección predefinidas están disponibles para ayudarte a monitorizar y responder a las posibles amenazas de seguridad con eficacia.

**Exención de responsabilidad**: El uso de esta integración podría recopilar datos, incluida la información personal, está sujeto a tus acuerdos con Datadog. Cisco no se hace responsable de la privacidad, seguridad ni integridad de la información de los usuarios finales, incluidos los datos personales, transmitida a través del uso de la integración.

## Configuración

### Instalación

Para instalar la integración de Cisco Secure Web Appliance, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para la versión 7.58.0 o posterior del Agent.

Comando de Linux

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_web_appliance==1.0.0
```

### Configuración

Los logs de acceso pueden recopilarse ya sea mediante monitización de puertos (cuando el método de recuperación es Syslog Push) o mediante monitorización de archivos (cuando el método de recuperación es SCP en el servidor remoto), en función del método de recuperación seleccionado.

Los logs de L4TM solo se pueden recopilar mediante la monitorización de archivos utilizando SCP en el servidor remoto como método de recuperación.

#### Recopilación de logs

**Archivo tail (seguimiento de logs)(Monitorización de archivos)**

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en datadog.yaml:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración al archivo cisco_secure_web_appliance.d/conf.yaml para empezar a recopilar los logs de Cisco Secure Web Appliance L4TM.

   ```yaml
     logs:
     - type: file
       path: <Path to Directory Where Logs would Get Stored>
       service: l4tm_logs
       source: cisco-secure-web-appliance
   ```

1. Si el método de recuperación seleccionado para los logs de acceso es SCP en el servidor remoto, añade el bloque de configuración para los logs de acceso en la configuración anterior para empezar a recopilar los logs de acceso de Cisco Secure Web Appliance junto con los logs de L4TM. La configuración aparecerá de la siguiente manera en cisco_secure_web_appliance.d/conf.yaml.

   ```yaml
     logs:
     - type: file
       path: <Path to Directory Where L4TM Logs would Get Stored>
       service: l4tm_logs
       source: cisco-secure-web-appliance
     - type: file
       path: <Path to Directory Where Access Logs would Get Stored>
       service: access_logs
       source: cisco-secure-web-appliance
   ```

   **NOTA**: Asegúrate de que el valor `path` sea similar al Directorio configurado en las secciones `Configure SCP on Remote Server for L4TM Logs` y `Configure SCP on Remote Server for Access Logs` respectivamente, reenviando /\*.s

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Syslog**

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en datadog.yaml:

   ```yaml
   logs_enabled: true
   ```

1. Si el método de recuperación seleccionado para los logs de acceso es Syslog Push, añade el bloque de configuración para los logs de acceso en el archivo de configuración para empezar a recopilar los logs de acceso de Cisco Secure Web Appliance junto con los logs de L4TM. La configuración aparecerá de la siguiente manera en cisco_secure_web_appliance.d/conf.yaml.

   Utilizaremos el método UDP para recopilar los logs de acceso de Cisco Secure Web Appliance.
   Consulta el ejemplo [cisco_secure_web_appliance.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cisco_secure_web_appliance/datadog_checks/cisco_secure_web_appliance/data/conf.yaml.example) para ver las opciones de configuración disponibles.

   ```yaml
     logs:
     - type: file
       path: <Path to Directory Where L4TM Logs would Get Stored>
       service: l4tm_logs
       source: cisco-secure-web-appliance
     logs:
     - type: udp
       port: <PORT>
       service: access_logs
       source: cisco-secure-web-appliance
   ```

   **Nota**: Es importante no cambiar los valores de servicio y source (fuente), ya que estos parámetros son esenciales para el funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Configuración en el portal de Cisco Secure Web Appliance

#### Pasos para ajustar la zona horaria a GMT

Datadog espera que todos los logs estén en la zona horaria GMT de forma predeterminada. Asegúrate de que la zona horaria configurada en tu portal de Cisco Secure Web Appliance sea GMT. Estos son los pasos para cambiar la zona horaria:

1. Ve a **System Administration** (Administración del sistema) y, a continuación, a **Time Zone** (Zona horaria).
1. Hz clic en **Edit Settings** (Editar parámetros).
1. Selecciona **GMT Offset** como región.
1. Selecciona **GMT** como país.
1. Selecciona **GMT (GMT)** como zona horaria.
1. Envía y confirma los cambios.

#### Configura las suscripciones de logs 

#### Configura Syslog Push para logs de acceso:

**Requisitos previos**

- El nombre de host del servidor datadog-agent al que deseas enviar los logs.

**Configuration:**

1. Inicia sesión en la interfaz de usuario de Cisco Secure Web Appliance.

1. Ve a  **System Administration** (Administración del sistema) > **Log Subscriptions** (Suscripciones de logs).

1. Para añadir una suscripción de Logs de acceso, haz clic en **Add log Subscription** (Añadir suscripción de logs).

1. Selecciona **Log Type** (Tipo de log) como **Access Logs** (Logs de acceso).

1. Indica un nombre de log.

1. Selecciona la opción **Squid** para **Log Style** (Estilo de log).
   **Nota**: Se admite el estilo de log predeterminado (squid) para los logs de acceso.

1. Selecciona la opción **Syslog Push** como **Retrieval Method** (Método de recuperación).

1. Indica los siguientes datos.

   Nombre de host: \<Datadog-Agent Host Server>

   Puerto: \<Default Provided>

   Protocolo: UDP

   Tamaño máximo del mensaje: \<Valid values for UDP are 1024 to 9216>

   Instalación: \<Default Selected>

1. Haz clic en **Submit** (Enviar).

1. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones de logs).
   **Nota:** Estos cambios no entrarán en vigor hasta que se confirmen.

#### Configura SCP en el servidor remoto para los logs de L4TM

**Requisitos previos**

- Requiere el nombre del host y el nombre del usuario (no es necesario el nombre del usuario de la cuenta de administrador) de la máquina virtual/máquina donde se está instalado el Datadog Agent .

**Configuration:**

1. Ve a **System Administration** (Admnistracón del sistema) > **Log Subscriptions** (Suscripciones de logs) en la interfaz de usuario de Cisco Secure Web Appliance.

1. Para añadir una suscripción de log para los logs de monitor (noun) de tráfico, haz clic en **Add Log Subscription** (Añadir suscripción de logs).

1. Selecciona **Traffic Monitor Logs** (Logs de monitor (noun) de tráfico) como **Log Type** (Tipo de log).

1. Indica el nombre apropiado de log.

1. Para **FileName** (Nombre de archivo), proporciona un nuevo nombre o mantén el nombre predeterminado.

1. Selecciona **SCP on Remote Server** (SCP en el servidor remoto) como **Retrieval Method** (Método de recuperación).

1. Indica la siguiente información.

   Host de SCP: \<SCP Host IP Address>

   Directorio: \<Path to Directory Where Logs would Get Stored>
   **NOTA:** Asegúrate de que el directorio no tenga ningún otro archivo de log.

   Puerto SCP: \<Default Port>

   Nombre de usuario: \<SCP Host Username>

1. Haz clic en **Submit** (Enviar). Tras el envío, se generará(n) la(s) clave(s) SSH. Copia y guarda la(s) clave(s) SSH, ya que solo es visible una vez.

1. Coloca la(s) clave(s) SSH en tu archivo `authorized_keys` en el host remoto para poder cargar los archivos de logs.

1. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones de logs).

   **NOTA:** Estos cambios no entrarán en vigor hasta que no los confirmes.

#### Configura SCP en servidor remoto para los logs de acceso.

**Requisitos previos**

- Requiere el nombre de host y el nombre de usuario (no es necesario el nombre de usuario de la cuenta de administrador) de la máquina virtual/máquina donde está instalado el Datadog Agent .

**Configuration:**

1. En la interfaz de usuario de Cisco Secure Web Appliance, ve a **System Administrator** (Administrador del sistema) > **Log Subscriptions** (Suscripciones de logs).

1. Para añadir una nueva suscripción de logs para Logs de acceso, haz clic en **Add Log Subscription** (Añadir Suscripción de logs) o edita una suscripción existente de logs de acceso.

1. Si estás añadiendo una nueva suscripción, sigue los pasos 4 a 6 mencionados en la sección Configurar Syslog Push para logs de acceso o en este tema.

1. Si estás editando una Suscripción de logs de acceso existente, selecciona **SCP on the Remote Server** (SCP en el servidor remoto) como **Retrieval Method** (Método de recuperación).

1. Indica la siguiente información:

   Host SCP: \<SCP Hostname>

   Puerto SCP: \<Default Provided>

   Directorio: \<Path to store the Log Files>
   **Nota:** Asegúrate de que el directorio no tenga ningún otro archivo de logs.

   Nombre de usuario: \<SCP Server Username>

1. Haz clic en **Submit** (Enviar). Una vez que hagas clic en **Submit**, se generará(n) la(s) clave(s) SSH. Copia la clave SSH y guárdala en algún lugar, ya que solo se muestra una vez.

1. Coloca la(s) clave(s) SSH en tu archivo `authorized_keys` en el host remoto para poder cargar los archivos de logs.

1. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones de logs).
   **Nota:** Estos cambios no entrarán en vigor hasta que no los confirmes.

Para obtener más información sobre la configuración, visita la [documentación oficial de Cisco Secure Web Appliance](https://www.cisco.com/c/en/us/td/docs/security/wsa/wsa-14-5/user-guide/wsa-userguide-14-5/b_WSA_UserGuide_11_7_chapter_010101.html#task_1686002).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cisco_secure_web_appliance` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| syslog | access_logs, l4tm_logs |

### Métricas

Cisco Secure Web Appliance no incluye ninguna métrica.

### Eventos

La integración de Cisco Secure Web Appliance no incluye ningún evento.

### Checks de servicio

La integración de Cisco Secure Web Appliance no incluye ningún check de servicios.

## Solucionar problemas

**Permission denied while port binding** (Permiso denegado en la vinculación de puertos):

Si ves un error de **Permission denied** (Permiso denegado) mientras se vincula al puerto en los logs del Agent, consulta las siguientes instrucciones:

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

**Permission denied while file monitoring:** (Permiso denegado durante la monitorización de archivos)

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de logs, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.

```shell
  sudo chmod g+s Path/to/Directory/Where/Logs/would/Get/Stored/
```

```shell
  sudo chgrp dd-agent Path/to/Directory/Where/Logs/would/Get/Stored/
```

**Data is not being collected** (No se están recopilando datos):

Asegúrate de que se evite el tráfico desde el puerto configurado si el cortafuegos está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port \<PORT-NO> Already in Use** (Puerto ya en uso), consulta las siguientes instrucciones. El ejemplo siguiente es para el PORT-NO = 514:
En los sistemas que utilizan Syslog, si el Agent escucha los logs de access_logs en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.
Este error se produce porque, en forma predeterminada, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los siguientes pasos:
\- Desactivar Syslog
\- Configurar el Agent para escuchar en un puerto diferente, disponible

Si necesitas más ayuda, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).