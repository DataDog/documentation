---
app_id: delinea-secret-server
app_uuid: 69a8e7df-7ed3-451c-948b-43303a5219e3
assets:
  dashboards:
    Delinea Secret Server - Overview: assets/dashboards/delinea_secret_server_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 41132309
    source_type_name: Delinea Secret Server
  logs:
    source: delinea-secret-server
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
- https://github.com/DataDog/integrations-core/blob/master/delinea_secret_server/README.md
display_on_public_website: true
draft: false
git_integration_title: delinea_secret_server
integration_id: delinea-secret-server
integration_title: Delinea Secret Server
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: delinea_secret_server
public_title: Delinea Secret Server
short_description: Obtén información sobre los logs de Delinea Secret Server.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre los logs de Delinea Secret Server.
  media:
  - caption: 'Delinea Secret Server: información general 1'
    image_url: images/delinea_secret_server_overview_1.png
    media_type: imagen
  - caption: 'Delinea Secret Server: información general 2'
    image_url: images/delinea_secret_server_overview_2.png
    media_type: imagen
  - caption: 'Delinea Secret Server: información general 3'
    image_url: images/delinea_secret_server_overview_3.png
    media_type: imagen
  - caption: 'Delinea Secret Server: información general 4'
    image_url: images/delinea_secret_server_overview_4.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Delinea Secret Server
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

[Delinea Secret Server][1] es una solución de gestión de contraseñas de nivel empresarial diseñada para ayudar a las organizaciones a almacenar, gestionar y controlar de forma segura el acceso a credenciales privilegiadas. Su objetivo es mejorar la seguridad de los datos confidenciales, reducir el riesgo de violación de datos y agilizar el proceso de gestión de contraseñas.

Esta integración enriquece e ingiere los siguientes logs:

- **Logs de Secret Server**: representa un evento en el que un usuario realiza una acción (como ver, añadir o modificar) en un secreto almacenado, carpeta, grupo o usuario. Proporciona detalles que incluyen la identidad del usuario, la fuente de la acción y el elemento en el que se realizó la acción.

Después de recopilar los logs, Delinea Secret Server los canaliza en Datadog para su análisis. Usando el pipeline de logs integrados, estos logs se analizan y se enriquecen, permitiendo la búsqueda y el análisis sin esfuerzo. La integración proporciona información en los logs de Secret Server a través de dashboards predefinidos e incluye reglas de detección de Cloud SIEM predefinidas para la monitorización y la seguridad mejoradas.

## Configuración

### Instalación

Para instalar la integración de Delinea Secret Server, ejecuta el siguiente comando de instalación del Agent y los siguientes pasos. Para más información, consulta la documentación de [Gestión de la integración][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.65.0.

Comando Linux:

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-delinea-secret-server==1.0.0
  ```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `delinea_secret_server.d/conf.yaml` para empezar a recopilar tus logs de Delinea Secret Server.

   ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         source: delinea-secret-server
         service: delinea-secret-server
      ```

      Para las opciones de configuración disponibles, ve el [delinea_secret_server.d/conf.yaml de ejemplo][3]. Elige el protocolo apropiado (TCP o UDP) basado en tu configuración de reenvío de syslogs de Delinea Secret Server.

      **Nota**: No modifiques los valores de servicio y fuente, ya que estos parámetros forman parte integrante del funcionamiento del pipeline.

3. [Reinicia el Agent][4].

#### Configurar el reenvío de mensajes de syslog desde Delinea Secret Server

1. Inicia sesión en la plataforma **Delinea Secret Server**.
2. Ve a **Settings** > **All Settings** (Configuración > Todos los ajustes).
3. Ve a **Configuration** > **General** > **Application** (Configuración > General > Aplicación).
4. Haz clic en **Edit** (Editar).
5. Marca **Enable Syslog/CEF Log Output** (Activar la salida de logs Syslog/CEF).
6. Rellena los siguientes datos:

    - **Servidor Syslog/CEF**: introduce la dirección del servidor Syslog/CEF.
    - **Puerto de Syslog/CEF**: ingresa el puerto del servidor Syslog/CEF.
    - **Protocolo Syslog/CEF Protocol**: selecciona TCP o UDP.
    - **Franja horaria de Syslog/CEF**: selecciona la franja UTC.
    - **Formato fecha/hora Syslog/CEF**: selecciona ISO 8601.
    - **Sitio de Syslog/CEF**: selecciona el sitio en el que se ejecutará CEF/Syslogs.

7. Haz clic en **Save** (Guardar).

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `delinea_secret_server` en la sección Checks.

## Datos recopilados

### Logs

La integración de Delinea Secret Server recopila los logs de Secret Server.

### Métricas

La integración de Delinea Secret Server no incluye ninguna métrica.

### Eventos

La integración de Delinea Secret Server no incluye ningún evento.

### Checks de servicio

La integración de Delinea Secret Server no incluye ningún check de servicio.

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

   2. [Reinicia el Agent][4].

### No se recopilan datos

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

### Puerto ya utilizado

Si aparece el error **Port <PORT-NO\> Ya está en uso**, consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de Delinea Secret Server en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:

- Desactiva Syslog.
- Configura el Agent para escuchar en un puerto diferente, disponible.

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][6].

[1]: https://delinea.com/products/secret-server
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/delinea_secret_server/datadog_checks/delinea_secret_server/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/