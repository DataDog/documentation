---
aliases:
- /es/integrations/delinea_secret_server
app_id: delinea-secret-server
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre los logs de Delinea Secret Server.
integration_version: 1.0.0
media:
- caption: 'Delinea Secret Server: información general 1'
  image_url: images/delinea_secret_server_overview_1.png
  media_type: imagen
- caption: Delinea Secret Server - Información general 2
  image_url: images/delinea_secret_server_overview_2.png
  media_type: imagen
- caption: 'Delinea Secret Server: información general 3'
  image_url: images/delinea_secret_server_overview_3.png
  media_type: imagen
- caption: 'Delinea Secret Server: información general 4'
  image_url: images/delinea_secret_server_overview_4.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Delinea Secret Server
---
## Información general

[Delinea Secret Server](https://delinea.com/products/secret-server) es una solución de gestión de contraseñas de nivel empresarial diseñada para ayudar a las organizaciones a almacenar, gestionar y controlar de forma segura el acceso a credenciales privilegiadas. Su objetivo es mejorar la seguridad de los datos confidenciales, reducir el riesgo de violación de datos y agilizar el proceso de gestión de contraseñas.

Esta integración enriquece e ingiere los siguientes logs:

- **Secret Server Logs** (Logs de Secret Server): Representa un evento en el que un usuario realiza un acción (como ver, añadir o modificar) en un secreto almacenado, carpeta, grupo o usuario. Proporciona detalles que incluyen la identidad del usuario, el origen de la acción y el elemento en el que se realizó la acción.

Después de recopilar los logs, Delinea Secret Server los envía a Datadog para su análisis. Utilizando el pipeline de logs integrado, estos logs se analizan y se enriquecen, lo que permite una búsqueda y un análisis sin esfuerzo. La integración proporciona información sobre logs de Secret Server mediante través de dashboards predefinidos e incluye reglas de detección de Cloud SIEM predefinidas para una monitorización y una seguridad mejoradas.

## Configuración

### Instalación

Para instalar la integración de Delinea Secret Server, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para las versiones >= 7.65.0 del Agent.

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

1. Añade este bloque de configuración a tu archivo `delinea_secret_server.d/conf.yaml` para empezar a recopilar tus logs de Delinea Secret Server.

   ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         source: delinea-secret-server
         service: delinea-secret-server
   ```

   Para conocer las opciones de configuración disponibles, consulta el [ejemplo delinea_secret_server.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/delinea_secret_server/datadog_checks/delinea_secret_server/data/conf.yaml.example). Elige el protocolo apropiado (TCP o UDP) basado en tu configuración de reenvío de syslog del Delinea Secret Server.

   **Nota**: No modifiques los valores de servicio y fuente, ya que estos parámetros forman parte integrante del funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes de syslog desde Delinea Secret Server

1. Inicia sesión en la plataforma **Delinea Secret Server**.

1. Ve a **Settings** > **All Settings** (Configuración > Todos los parámetros).

1. Ve a **Configuration** > **General** > **Application** (Configuración > General > Aplicación).

1. Haz clic en **Edit** (Editar).

1. Selecciona **Enable Syslog/CEF Log Output** (Activar la salida de logs Syslog/CEF).

1. Rellena los siguientes datos:

   - **Syslog/CEF Server** (Servidor Syslog/CEF): Introduce la dirección del servidor Syslog/CEF.
   - **Syslog/CEF Port** (Puerto Syslog/CEF): Introduce el puerto del servidor Syslog/CEF.
   - **Syslog/CEF Protocol** (Protocolo Syslog/CEF): Selecciona TCP o UDP.
   - **Syslog/CEF Time Zone** (Zona Syslog/CEF): Selecciona la hora UTC.
   - **Syslog/CEF DateTime Format** (Formato de fecha y hora Syslog/CEF): Selecciona ISO 8601.
   - **Syslog/CEF Site** (Sitio Syslog/CEF): Selecciona el sitio en el que se ejecutará CEF/Syslogs.

1. Haz clic en **Save** (Guardar).

### Validación

[Ejecuta el subcomando de estado del Agent (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `delinea_secret_server` en la sección Checks.

## Datos recopilados

### Logs

La integración del Delinea Secret Server recopila logs de Secret Server.

### Métricas

La integración de Delinea Secret Server no incluye métricas.

### Eventos

La integración de Delinea Secret Server no incluye eventos.

### Checks de servicio

La integración de Delinea Secret Server no incluye checks de servicio.

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

Si aparece el error **Port \<PORT-NO> Already in Use**, consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan syslog, si el Agent escucha logs de Delinea Secret Server en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:

- Desactiva Syslog.
- Configura el Agent para escuchar en un puerto diferente, disponible.

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).