---
app_id: cisco-secure-firewall
app_uuid: 15c8217d-1a43-4efb-a338-053fca68169d
assets:
  dashboards:
    Cisco Secure Firewall - Application and Identity-based Firewall: assets/dashboards/cisco_secure_firewall_application_and_identity_firewall.json
    Cisco Secure Firewall - Command Interface: assets/dashboards/cisco_secure_firewall_command_interface.json
    Cisco Secure Firewall - Failover: assets/dashboards/cisco_secure_firewall_failover.json
    Cisco Secure Firewall - IP Stack: assets/dashboards/cisco_secure_firewall_ip_stack.json
    Cisco Secure Firewall - Intrusion Protection System: assets/dashboards/cisco_secure_firewall_intrusion_protection_system.json
    Cisco Secure Firewall - OSPF and RIP Routing: assets/dashboards/cisco_secure_firewall_ospf_and_rip_routing.json
    Cisco Secure Firewall - Overview: assets/dashboards/cisco_secure_firewall_overview.json
    Cisco Secure Firewall - Resource Manager: assets/dashboards/cisco_secure_firewall_resource_manager.json
    Cisco Secure Firewall - SNMP: assets/dashboards/cisco_secure_firewall_snmp.json
    Cisco Secure Firewall - Security Events: assets/dashboards/cisco_secure_firewall_security_events.json
    Cisco Secure Firewall - Threat Detection: assets/dashboards/cisco_secure_firewall_threat_detection.json
    Cisco Secure Firewall - Transparent Firewall: assets/dashboards/cisco_secure_firewall_transparent_firewall.json
    Cisco Secure Firewall - User Authentication: assets/dashboards/cisco_secure_firewall_user_authentication.json
    Cisco Secure Firewall - VPN Failover: assets/dashboards/cisco_secure_firewall_vpn_failover.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6690422
    source_type_name: cisco-secure-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- red
- seguridad
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_firewall
integration_id: cisco-secure-firewall
integration_title: Cisco Secure Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cisco_secure_firewall
public_title: Cisco Secure Firewall
short_description: Obtén información sobre logs de Cisco Secure Firewall
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
  - Category::Network
  - Category::Security
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre logs de Cisco Secure Firewall
  media:
  - caption: Cisco Secure Firewall - SNMP
    image_url: images/cisco_secure_firewall_snmp.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Firewall basado en aplicaciones e identidades
    image_url: images/cisco_secure_firewall_application_and_identity_based_firewall.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Conmutación por error
    image_url: images/cisco_secure_firewall_failover.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Sistema de protección contra intrusiones
    image_url: images/cisco_secure_firewall_intrusion_protection_system.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Stack tecnológico IP
    image_url: images/cisco_secure_firewall_ip_stack.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Detección de amenazas
    image_url: images/cisco_secure_firewall_threat_detection.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Firewall transparente
    image_url: images/cisco_secure_firewall_transparent_firewall.png
    media_type: imagen
  - caption: Cisco Secure Firewall - Autenticación de usuarios
    image_url: images/cisco_secure_firewall_user_authentication.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Firewall
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

[Cisco Secure Firewall Threat Defense (FTD)][1] es un firewall de nueva generación (NGFW) centrado en las amenazas y con administración unificada. El [Cisco Secure Firewall Management Center (FMC)][2] es el administrador centralizado de eventos y políticas para Cisco Secure Firewall Threat Defense (FTD), tanto local como virtual.

Esta integración enriquece e ingiere los siguientes logs desde Cisco Secure FTD mediante Cisco Secure FMC:
- Logs de autenticación de usuarios
- Logs de SNMP
- Logs de conmutación por error
- Logs de firewall transparente
- Logs de detección de amenazas
- Eventos de seguridad
- Logs de stack tecnológico IP
- Logs de firewall de aplicaciones
- Logs de firewall basado en identidades
- Logs de interfaz de comando
- Logs de enrutamiento de OSPF
- Logs de enrutamiento de RIP
- Logs de administrador de recursos
- Logs de conmutación por error de VPN
- Logs de sistema de protección contra intrusiones
- Políticas de acceso dinámico
- Asignación de direcciones IP

Visualiza información detallada sobre las solicitudes de SNMP, los logs del firewall basado en identidades, el análisis de amenazas en tiempo real, la detección y observación de la seguridad y la monitorización del cumplimiento de normativas con los dashboards predefinidos.

## Configuración

### Instalación

Para instalar la integración de Cisco Secure Firewall, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la [Documentación de administración de integraciones][3].

**Nota**: Este paso no es necesario para el Agent versión >= 7.52.0.

Comando Linux:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_firewall==1.0.0
  ```

### Configuración

#### Cisco Secure Firewall

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en `datadog.yaml`:
    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `cisco_secure_firewall.d/conf.yaml` para empezar a recopilar tus logs de Cisco Secure Firewall.

    Consulta [ejemplo de cisco_secure_firewall.d/conf.yaml][3] para ver las opciones disponibles de configuración.

      ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         service: cisco-secure-firewall
         source: cisco-secure-firewall
      ```

3. [Reinicia el Agent][4].

4. Configura Reenvío de mensajes de Syslog desde el Centro de gestión de Cisco Secure Firewall:

    1. Selecciona **Dispositivos > Configuración de plataforma** y crea o edita una política de FTD.
    2. Selecciona **Syslog > Configuración de registro**.
       - **Activar registro**: Activa el registro del sistema del plano de datos para el dispositivo Firepower Threat Defense.
       - **Activar registro en la unidad en espera de conmutación por error**: Activa el registro en la unidad en espera para el dispositivo Firepower Threat Defense, si está disponible.
       - Haz clic en **Guardar**.
    3. Seleccioa **Syslog > Configuración de Syslog**.
       - Selecciona **LOCAL7(20)** en el menú desplegable.
       - Check la casilla de verificación llamada **Activar marca de tiempo en los mensajes de Syslog** para incluir la fecha y la hora en que se generó un mensaje en el mensaje de syslog.
       - Selecciona **RFC 5424 (aaaa-MM-ddTHH:mm:ssZ)** en el menú desplegable de Formato de marca de tiempo.
       - Si deseas añadir un identificador de dispositivo a los mensajes de syslog (que se coloca al principio del mensaje), check la casilla de verificación Activar identificador de dispositivo de syslog y, a continuación, selecciona el tipo de identificador.
          - **Interfaz**: Para utilizar la dirección IP de la interfaz seleccionada, independientemente de la interfaz a través de la cual el dispositivo envía el mensaje. Selecciona la zona de seguridad que identifica la interfaz. La zona debe asignarse a una única interfaz.
          - **ID definido por el usuario**: Para utilizar una cadena de texto (hasta 16 caracteres) de tu elección.
          - **Nombre del host**: Para utilizar el nombre del host del dispositivo.
       - Haz clic en **Guardar**.
    4. Selecciona **Syslog > Servidor de Syslog**.
       - Check la casilla de verificación **Permitir el paso del tráfico de usuario cuando el servidor de syslog de TCP esté caído**, para permitir el tráfico si cualquier servidor de syslog que utilice el protocolo TCP está caído.
       - Haz clic en **Añadir** para añadir un nuevo servidor de syslog.
          - En el menú desplegable **Dirección IP**, selecciona un objeto de host de red que contenga la dirección IP del servidor de syslog.
          - Elige el protocolo (TCP o UDP) e introduce el número de puerto para las comunicaciones entre el dispositivo Firepower Threat Defense y el servidor de syslog.
          - Selecciona la interfaz de administración de dispositivos o zonas de seguridad o interfaces con nombre para comunicarte con el servidor de syslog.
            - Zonas de seguridad o interfaces con nombre: Selecciona las interfaces de la lista de zonas disponibles y haz clic en Añadir.
          - Haz clic en **OK**.
       - Haz clic en **Guardar**.
    5. Ve a **Desplegar > Despliegue** y despliega la política en los dispositivos asignados. Los cambios no estarán activos hasta que no los despliegues.


### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `cisco_secure_firewall` en la sección checks sección.

## Datos recopilados

### Logs

La integración de Cisco Secure Firewall recopila los logs de autenticación de usuario, de SNMP, de conmutación por error, de firewall transparente, de stack tecnológico IP, de firewall de aplicaciones, de firewall basado en identidades, de detección de amenazas, de interfaz de comandos, de eventos de seguridad, de enrutamiento de OSPF, de enrutamiento de RIP, de administrador de recursos, de conmutación por error de VPN y de sistema de protección contra intrusiones.

### Métricas

La integración de Cisco Secure Firewall no incluye ninguna métrica.

### Eventos

La integración de Cisco Secure Firewall no incluye ningún evento.

### Checks de servicios

La integración de Cisco Secure Firewall no incluye ningún check de servicios.

## Solucionar problemas

### Cisco Secure Firewall

**Permiso denegado mientras se vincula al puerto:**

Si ves un error de **Permiso denegado** mientras se vincula al puerto en los logs del Agent, consulta las siguientes instrucciones:

   1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

      - Concede acceso al puerto mediante el comando `setcap`:

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - Comprueba que la configuración sea correcta ejecutando el comando `getcap`:

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         Con el resultado esperado:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

   2. [Reinicia el Agent][4].

**No se están recopilando datos:**

Asegúrate de que se evite el tráfico del puerto configurado si el firewall está activado.

**Puerto ya en uso:**

Si aparece el error **Port <PORT-NO\> Ya está en uso**, consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de Cisco Secure Firewall en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Este error se produce porque, en forma predeterminada, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
- Desactiva Syslog.
- Configura el Agent para escuchar en un puerto diferente, disponible.

Si necesitas más ayuda, ponte en contacto con [soporte técnico de Datadog][6].

[1]: https://www.cisco.com/c/en/us/support/security/firepower-ngfw/series.html
[2]: https://www.cisco.com/c/en/us/products/collateral/security/firesight-management-center/datasheet-c78-736775.html
[3]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/