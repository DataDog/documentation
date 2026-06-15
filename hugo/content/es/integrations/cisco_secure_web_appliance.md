---
app_id: cisco-secure-web-appliance
app_uuid: 0973c912-7ad3-4cf3-ad50-d43660e031dd
assets:
  dashboards:
    'Cisco Secure Web Appliance: Access Logs': assets/dashboards/cisco_secure_web_appliance_access_logs.json
    'Cisco Secure Web Appliance: L4TM Logs': assets/dashboards/cisco_secure_web_appliance_l4tm_logs.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27607355
    source_type_name: Cisco Secure Web Appliance
  logs:
    source: cisco-secure-web-appliance
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
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_web_appliance/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_web_appliance
integration_id: cisco-secure-web-appliance
integration_title: Cisco Secure Web Appliance
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cisco_secure_web_appliance
public_title: Cisco Secure Web Appliance
short_description: 'Obtén información sobre la actividad de filtrado y escaneado de
  la web proxy y la actividad de monitorización de tráfico de capa 4 '
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
  description: Obtén información sobre la actividad de filtrado y escaneado de la
    web proxy y la actividad de monitorización de tráfico de capa 4
  media:
  - caption: Cisco Secure Web Appliance - Logs de acceso
    image_url: images/cisco_secure_web_appliance_access_logs.png
    media_type: imagen
  - caption: Cisco Secure Web Appliance - Logs de L4TM
    image_url: images/cisco_secure_web_appliance_l4tm_logs.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Web Appliance
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Cisco Secure Web Appliance][1] protege a tu organización bloqueando automáticamente los sitios de riesgo y probando los sitios desconocidos antes de permitir el acceso a los usuarios. Intercepta y monitoriza el tráfico de Internet y aplica políticas para ayudar a mantener tu red interna segura frente al malware, la pérdida de datos confidenciales, la pérdida de productividad y otras amenazas basadas en Internet.


Esta integración ingiere los siguientes tipos de logs:
- Logs de acceso: Registra toda la actividad de filtrado y escaneo de la web proxy.
- Logs de L4TM: Registra toda la actividad de monitorización de tráfico de capa 4.

Los dashboards predefinidos te ayudan a visualizar información detallada sobre la actividad de filtrado y escaneo de la web proxy y la actividad de monitorización de tráfico de capa 4. Además, las reglas predefinidas de detección están disponibles para ayudarte a monitorizar y responder a las posibles amenazas de seguridad con eficacia.

**Exención de responsabilidad**: El uso de esta integración podría recopilar datos que incluyen información personal, está sujeto a tus acuerdos con Datadog. Cisco no se hace responsable de la privacidad, seguridad o integridad de la información de los usuarios finales, incluidos los datos personales, transmitida a través de integración.

## Configuración

### Instalación

Para instalar la integración de Cisco Secure Web Appliance, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación [Gestión de la integración][2].

**Nota**: Este paso no es necesario para la versión 7.58.0 o posterior del Agent.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_web_appliance==1.0.0
  ```

### Configuración
Los logs de acceso pueden recopilarse mediante la monitorización de puertos (cuando el método de recuperación es Syslog Push) o la monitorización de archivos (cuando el método de recuperación es SCP en un servidor remoto), según cuál sea el método de recuperación elegido.

Los logs de L4TM solo pueden recopilarse mediante la monitorización de archivos utilizando SCP en un servidor remoto como método de recuperación.
#### Recopilación de logs
**Archivo de cola(monitorización de archivos)**

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en datadog.yaml:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo cisco_secure_web_appliance.d/conf.yaml para empezar a recopilar tus logs de Cisco Secure Web Appliance L4TM.

    ```yaml
      logs:
      - type: file
        path: <Path to Directory Where Logs would Get Stored>
        service: l4tm_logs
        source: cisco-secure-web-appliance
    ```

3. Si el método de recuperación elegido para los logs de acceso es SCP en el servidor remoto, añade el bloque de configuración para logs de acceso en la configuración anterior para empezar a recopilar tus logs de acceso de Cisco Secure Web Appliance junto con los logs de L4TM. La configuración aparecerá de la siguiente manera en cisco_secure_web_appliance.d/conf.yaml.

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
    **NOTA**: Asegúrate de que el valor `path` sea similar al directorio configurado en las secciones`Configure SCP on Remote Server for L4TM Logs` y `Configure SCP on Remote Server for Access Logs` respectivamente, reenviando /*.s

4. [Reinicia el Agent][3].

**Syslog**

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en datadog.yaml:

    ```yaml
    logs_enabled: true
    ```
2. Si el método de recuperación elegido para logs de acceso es Syslog Push, añade el bloque de configuración para logs de acceso en el archivo de configuración para empezar a recopilar tus logs de Cisco Secure Web Appliance junto con los logs de L4TM. La configuración aparecerá de la siguiente manera en cisco_secure_web_appliance.d/conf.yaml.

    Utilizaremos el método UDP para recopilar los logs de acceso a Cisco Secure Web Appliance.
    Consulta el ejemplo [cisco_secure_web_appliance.d/conf.yaml][4] para ver las opciones disponibles de configuración.

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
    **Nota**: Es importante no cambiar los valores de servicio y source (fuente), ya que estos parámetros son parte integral del funcionamiento del pipeline.

3. [Reinicia el Agent][3].

### Configuración en el portal de Cisco Secure Web Appliance

#### Steps (UI) / Pasos para ajustar la zona horaria a GMT
Datadog espera que todos los logs estén en la zona horaria GMT en forma predeterminada. Asegúrate de que la zona horaria configurada en tu portal de Cisco Secure Web Appliance sea GMT. Estos son los steps (UI) / pasos para cambiar la zona horaria:
1. Ve a **System Administration** (Administración del sistema) y, a continuación, a **Time Zone** (Zona horaria).
2. Haz clic en **Edit Settings** (Editar configuración).
3. Selecciona **GMT Offset** como región.
4. Selecciona **GMT** como país.
5. Selecciona **GMT (GMT)** como zona horaria.
6. Envía y confirma los cambios.

#### Configura suscripciones a logs

#### Configura Syslog Push para los logs de acceso:

**Prerequisites:** (Requisitos previos)
- El nombre de host del servidor datadog-agent donde deseas insertar los logs.

**Configuration:** (Configuración)

1. Inicia sesión en la interfaz de usuario de Cisco Secure Web Appliance.
2. Ve a  **System Administration** > **Log Subscriptions** (Administración del sistema > Suscripciones a logs).
3. Para añadir una suscripción a logs de acceso, haz clic en **Add Log Subscription** (Añadir suscripción a logs).
4. Selecciona **Log Type** (Tipo de log) como **Access logs** (Logs de acceso).
5. Proporciona un nombre de log.
6. Selecciona la opción **Squid** para **Log Style** (Estilo de Log).
    **Nota**: Se admite el estilo de log en forma predeterminada (squid) para los logs de acceso. 
7. Selecciona la opción **Syslog Push** como **Retrieval Method** (Método de recuperación).
8. Brinda los siguientes datos.

    Nombre de host: \<Datadog-Agent Host Server>

    Puerto: \<Default Provided>

    Protocolo: UDP

    Tamaño máximo del mensaje: \<Valid values for UDP are 1024 to 9216>

    Instalación: \<Default Selected>
9. Haz clic en **Submit** (Enviar). 
10. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones a logs).
    **Nota:** Estos cambios no entrarán en vigor hasta que no se confirmen.

#### Configura SCP en el servidor remoto para los logs de L4TM

**Prerequisites:** (Requisitos previos)
- Requiere el nombre de host y el nombre de usuario (el nombre de usuario de la cuenta de administrador no es necesario) de la máquina virtual/máquina donde está instalado el Agent.

**Configuration:** (Configuración)
1. Ve a **System Administration** > **Log Subscriptions** (Administración del sistema > Suscripciones a logs) en la interfaz de usuario de Cisco Secure Web Appliance.
2. Para añadir una suscripción a logs para logs de monitorización de tráfico, haz clic en **Add Log Subscription** (Añadir suscripción a logs).  
3. Selecciona **Traffic Monitor Logs** (Logs de monitorización de tráfico) como **Log Type** (Tipo de logs).
4. Indica el nombre del log apropiado.
5. Para **FileName** (Nombre de archivo), proporciona un nuevo nombre o mantén el nombre predeterminado.
6. Selecciona **SCP on Remote Server** (SCP en servidor remoto) como **Retrieval Method** (Método de recuperación).
7. Brinda la siguiente información.

    Host de SCP: \<SCP Host IP Address>

    Directorio: \<Path to Directory Where Logs would Get Stored>
    **NOTA:** Asegúrate de que el directorio no tenga ningún otro archivo de log.

    Puerto SCP: \<Default Port>

    Nombre de usuario: \<SCP Host Username>
8. Haz clic en **Submit** (Enviar). Tras el envío, se generará(n) la(s) clave(s) SSH. Copia y guarda la(s) clave(s) SSH, ya que solo son visibles una vez.
9. Coloca la(s) clave(s) SSH en tu archivo `authorized_keys` en el host remoto de modo que se puedan cargar los archivos de logs.
10. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones de logs).

    **NOTA:** Estos cambios no entrarán en vigor hasta que no los confirmes.

#### Configura SCP en el servidor remoto para los logs de acceso.

**Prerequisites:** (Requisitos previos)
- Requiere el nombre del host y el nombre de usuario (el nombre de usuario de la cuenta de administrador no es necesario) de la máquina virtual/máquina donde está instalado el Agent.

**Configuration:** (Configuración)
1. En la interfaz de usuario de Cisco Secure Web Appliance, ve a **System Administration** > **Log Subscriptions** (Administración de sistema > Suscripciones a logs).
2. Para añadir una nueva suscripción a logs para logs de acceso, haz clic en **Add Log Subscription** (Añadir suscripción a logs) o edita una suscripción a logs de acceso existente.
3. Si estás añadiendo una nueva suscripción, sigue los steps (IU) / pasos 4 a 6 mencionados en la sección Configurar Syslog Push para logs de acceso o en este tema.
4. Si estás editando una suscripción a logs de acceso existente, selecciona **SCP on Remote Server** (SCP en servidor remoto) como **Retrieval Method** (Método de recuperación).
5. Brinda la siguiente información:

    Host de SCP: \<SCP Hostname>

    Puerto SCP: \<Default Provided>

    Directorio: \<Path to store the Log Files>
    **Nota:** Asegúrate de que el directorio no tenga ningún otro archivo de logs.

    Nombre de usuario: \<SCP Server Username>
6. Haz clic en **Submit** (Enviar). Una vez que hagas clic en **Submit**, se generará(n) la(s) clave(s) SSH. Copia la clave SSH y guárdala en algún lugar, ya que solo se muestra una vez. 
7. Coloca la(s) clave(s) SSH en tu archivo `authorized_keys` en el host del sitio remoto para poder cargar los archivos de logs.
8. Haz clic en **Commit Changes** (Confirmar cambios) en la parte superior derecha de la page (página) **Log Subscriptions** (Suscripciones a logs).
    **Nota:** Estos cambios no entrarán en vigor hasta que no los confirmes.


Para obtener más información sobre la configuración, visita la [documentación oficial de Cisco Secure Web Appliance][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `cisco_secure_web_appliance` en la sección Checks.

## Datos recopilados

### Log 

| Formato     | Tipos de eventos    |
| ---------  | -------------- |
| syslog | access_logs, l4tm_logs |

### Métricas

Cisco Secure Web Appliance no incluye ninguna métrica.

### Eventos

La integración de Cisco Secure Web Appliance no incluye ningún evento.

### Checks de servicio

La integración de Cisco Secure Web Appliance no incluye ningún check de servicio.

## Solucionar problemas

**Permiso denegado mientras se vincula el puerto:**

Si ves un error de **Permission denied** (Permiso denegado) mientras vinculas puertos en logs del Agent, consulta las siguientes instrucciones:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:
    ```shell
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

2. Comprueba que la configuración sea correcta mediante la ejecución del comando `getcap`:

    ```shell
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    Con el resultado esperado:

    ```shell
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.
3. [Reinicia el Agent][3].


**Permiso denegado mientras se monitoriza el archivo:**

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.
  ```shell
    sudo chmod g+s Path/to/Directory/Where/Logs/would/Get/Stored/
  ```
  ```shell
    sudo chgrp dd-agent Path/to/Directory/Where/Logs/would/Get/Stored/
  ```


**No se están recopilando datos:**

Asegúrate de que se evite el tráfico del puerto configurado si el cortafuegos está activado.

**Puerto ya en uso:**

Si aparece el error **Port \<PORT-NO> Already in Use** (Puerto \ Ya en uso), consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:
En los sistemas que utilizan Syslog, si el Agent escucha logs access_logs en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.
Este error se produce porque, en forma predeterminada, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los siguientes steps (IU) / pasos: 
    - Desactivar Syslog 
    - Configurar el Agent para escuchar en un puerto diferente, disponible


Si necesitas más ayuda, ponte en contacto con [asistencia técnica de Datadog][7].

[1]: https://www.cisco.com/site/in/en/products/security/secure-web-appliance/index.html
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cisco_secure_web_appliance/datadog_checks/cisco_secure_web_appliance/data/conf.yaml.example
[5]: https://www.cisco.com/c/en/us/td/docs/security/wsa/wsa-14-5/user-guide/wsa-userguide-14-5/b_WSA_UserGuide_11_7_chapter_010101.html#task_1686002
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/