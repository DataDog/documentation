---
app_id: weblogic
app_uuid: 80a8d9e2-48dd-4242-be78-0d929ea1a492
assets:
  dashboards:
    metrics: assets/dashboards/metrics.json
    overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: weblogic.jvm_runtime.heap_size
      metadata_path: metadata.csv
      prefix: weblogic.
    process_signatures:
    - java weblogic.Server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10245
    source_type_name: WebLogic
  monitors:
    Number of active thread is high: assets/monitors/active_threads.json
    Number of stuck thread is high: assets/monitors/stuck_threads.json
  saved_views:
    weblogic_error_logs: assets/saved_views/error_logs.json
    weblogic_overview: assets/saved_views/weblogic_overview.json
    weblogic_patterns: assets/saved_views/weblogic_patterns.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- oracle
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weblogic/README.md
display_on_public_website: true
draft: false
git_integration_title: weblogic
integration_id: weblogic
integration_title: WebLogic
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: weblogic
public_title: WebLogic
short_description: Monitoriza el estado y el rendimiento de los servidores WebLogic.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Oracle
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de los servidores WebLogic.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: WebLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Oracle WebLogic es una plataforma para el desarrollo, la ejecución y el despliegue de aplicaciones empresariales Java, tanto on-premises como en la nube. Centraliza servicios de aplicaciones que incluyen funcionalidad del servidor web, componentes empresariales como mensajería y acceso a sistemas empresariales backend como bases de datos. 

La monitorización de Oracle WebLogic con Datadog te permite:
- Conocer el aumento del tamaño de heap en tu máquina virtual Java (JVM)
- Realizar un seguimiento del tiempo de respuesta del servidor
- Monitorizar los detalles de sesión de aplicaciones web
- Realizar un seguimiento de grupos de subprocesos y servicios de mensajería
- Realizar un seguimiento de grupos de conexiones a bases de datos

## Configuración

### Instalación

El check de WebLogic está incluido en el paquete del [Datadog Agent][1].
No es necesaria ninguna instalación adicional en tu servidor.

1. Este check está basado en JMX y recopila métricas del Platform MBean Server exportado por la máquina virtual Java (JVM), por lo que tus servidores WebLogic deben tener habilitada la monitorización JMX remota. Para ver las instrucciones de instalación, consulta [Monitorización y gestión remotas][2].

2. Define la propiedad del sistema `-Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder` para habilitar estas métricas en el Platform MBean Server. Deben habilitarse tanto en la consola de administración del servidor WebLogic como en los scripts de inicio del servidor. **Nota**: Esta acción puede y debe hacerse más de una vez.


_**Activar en la consola de administración**_

   ```
   Dominio => Configuración => General => Avanzado => Platform MBean Server habilitado
   ```

_**Activar en los scripts de inicio del servidor**_

   ```yaml
   -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder
   ```

Para obtener más información, consulta la [documentación de WebLogic][3].


3. Comprueba que el valor del atributo [`PlatformMBeanServerUsed`][4] está configurado como `true` en la consola de administración del servidor WebLogic. En las versiones 10.3.3.0 y posteriores del servidor WebLogic, el valor predeterminado es `true`. Esta configuración puede encontrarse en la consola de administración del servidor WebLogic o configurarse mediante la WebLogic Scripting Tool (WSLT). 

   _**Activar en la consola de administración**_

   ```
   Domain (<WEBLOGIC_SERVER>) => Configuration => General => (Advanced) => Platform MBeanServer Enabled
   ```

   _**Activar en WLST**_

   Inicia una sesión de edición. Ve al directorio JMX del dominio y utiliza `cmo.setPlatformMBeanServerUsed(true)` para activar el atributo si está configurado como `false`.

   Por ejemplo:
   ```
   # > java weblogic.WLST
   (wlst) > connect('weblogic','weblogic')
   (wlst) > edit()
   (wlst) > startEdit()
   (wlst) > cd('JMX/<DOMAIN_NAME>')
   (wlst) > set('EditMBeanServerEnabled','true')
   (wlst) > activate()
   (wlst) > exit()
   ```

   Activa los cambios y reinicia el servidor WebLogic.

### Configuración

1. Edita el archivo `weblogic.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de WebLogic.
   Para conocer todas las opciones de configuración disponibles, consulta el [weblogic.d/conf.yaml de ejemplo][5].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado][6] del Datadog Agent.
   Puedes especificar las métricas que te interesan editando la [configuración][5].

   Para saber cómo personalizar las métricas que se van a recopilar,, consulta la [documentación de checks de JMX][7] para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][8].

2. [Reinicia el Agent][9].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `weblogic` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "weblogic" >}}


### Recopilación de logs

1. Los servicios de generación de logs de WebLogic utiliza por defecto un despliegue basada en las API de generación de logs Java. Clona y edita el [pipeline de la integración][11] si tienes un formato diferente.

2. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:
   ```yaml
   logs_enabled: true
   ```

3. Descomenta y edita el bloque de configuración de logs en tu archivo `weblogic.d/conf.yaml`. Cambia los valores de los parámetros de ruta y servicio en función de tu entorno. Consulta el [weblogic.d/conf.yaml de ejemplo][5] para conocer todas las opciones de configuración disponibles.
   ```yaml
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<ADMIN_SERVER_NAME>.log
      source: weblogic
      service: admin-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<DOMAIN_NAME>.log
      source: weblogic
      service: domain
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<SERVER_NAME>/logs/<SERVER_NAME>.log
      source: weblogic
      service: managed-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/*/logs/access.log 
      source: weblogic
      service: http-access
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: .*\[\d{2}\/(\w{3}|\w{4})\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4}\]
   ```
4. [Reinicia el Agent][9].

### En contenedores
Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][12].

### Eventos

La integración WebLogic no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "weblogic" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html#gdenl
[3]: https://support.oracle.com/cloud/faces/DocumentDisplay?_afrLoop=308314682308664&_afrWindowMode=0&id=1465052.1&_adf.ctrl-state=10ue97j4er_4
[4]: https://docs.oracle.com/en/middleware/standalone/weblogic-server/14.1.1.0/jmxcu/understandwls.html#GUID-1D2E290E-F762-44A8-99C2-EB857EB12387
[5]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/integrations/java/
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/weblogic/metadata.csv
[11]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines
[12]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[13]: https://github.com/DataDog/integrations-core/blob/master/weblogic/assets/service_checks.json