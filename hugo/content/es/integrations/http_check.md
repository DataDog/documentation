---
app_id: network
categories:
- network
custom_kind: integración
description: Monitoriza cualquier HTTP servicio para ver respuestas erróneas, certificados
  SSL a punto de caducar, etc.
integration_version: 12.0.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Check HTTP
---
## Información general

Monitoriza el estado activado o desactivado de los endpoints HTTP locales o remotos. El check HTTP puede detectar códigos de respuesta con errores (como 404), identificar certificados SSL a punto de vencer, buscar respuestas para texto específico y mucho más. El check también envía los tiempos de respuesta HTTP en forma de métrica.

## Configuración

### Instalación

El check HTTP está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, por lo que no necesitas instalar nada más en tu servidor. Aunque muchos checks orientados a métricas se ejecutan mejor en el mismo host como el servicio monitorizado, es posible que quieras ejecutar este check orientado al estado a partir de los hosts que no ejecutan los sitios monitorizados.

### Configuración

Edita el archivo `http_check.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de http_check.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

```yaml
init_config:

instances:
  - name: Example website
    url: https://example.com/

  - name: Example website (staging)
    url: http://staging.example.com/
```

El check HTTP tiene más opciones de configuración que otros checks. La mayoría de las opciones son opcionales, por ejemplo: el Agent no controla la validación SSL a menos que se configuren las opciones correspondientes. En concreto, el Agent controla los certificados SSL a punto de vencer de manera predeterminada.

Este check se ejecuta en cada ejecución del recopilador del Agent, que es cada 15 segundos de forma predeterminada. Si quieres definir una frecuencia de ejecución personalizada para este check, consulta la sección sobre [intervalos de recopilación](https://docs.datadoghq.com/developers/write_agent_check/#collection-interval) en la documentación del check personalizado.

Consulta el [ejemplo de http_check.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

| Parámetro                          | Descripción                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                           | El nombre de la instancia del check HTTP. Este se presenta como una etiqueta (tag) en los checks de servicios.                                                                                                                                                              |
| `url`                            | La URL que vas a testear.                                                                                                                                                                                                                                 |
| `timeout`                        | El tiempo en segundos para permitir una respuesta. El valor predeterminado es `10`.                                                                                                                                                                               |
| `method`                         | El método HTTP que vas a utilizar para el check.                                                                                                                                                                                                            |
| `data`                           | Utiliza este parámetro para especificar un cuerpo para una solicitud con un método POST, PUT, DELETE o PATCH. Las solicitudes SOAP son compatibles si utilizas el método POST y especificas una cadena XML como parámetro de datos.                                             |
| `headers`                        | Este parámetro te permite enviar cabeceras adicionales con la solicitud. Consulte el [archivo YAML de ejemplo](https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example) para obtener información adicional y advertencias.                                                                                                    |
| `content_match`                  | Una cadena o expresión regular Python. El check HTTP busca este valor en la respuesta y lo informa como DOWN si no encuentra la cadena o expresión.                                                                                      |
| `reverse_content_match`          | Cuando se define como `true`, invierte el comportamiento de la opción `content_match`, es decir, el check HTTP informa el valor como DOWN si SÍ encuentra la cadena o expresión de `content_match` (de manera predeterminada, es `false`).                                                              |
| `username` y `password`          | Si tu servicio utiliza una autenticación básica, puedes especificar aquí el nombre de usuario y la contraseña.                                                                                                                                                       |
| `http_response_status_code`      | Una cadena o expresión regular Python para un código de estado HTTP. Este check informa un valor como DOWN para cualquier código de estado que no coincida. La forma predeterminada de este valor es como códigos de estado HTTP 1xx, 2xx y 3xx. Por ejemplo: `401` o `4\d\d`.                              |
| `include_content`                | Cuando se define como `true`, el check incluye los primeros 500 caracteres del cuerpo de la respuesta HTTP en notificaciones. El valor predeterminado es `false`.                                                                                                        |
| `collect_response_time`          | De manera predeterminada, el check recopila el tiempo de respuesta (en segundos) como la métrica `network.http.response_time`. Para deshabilitarlo, define este valor como `false`.                                                                                                 |
| `tls_verify`                     | Indica al check que valide el certificado TLS de los servicios cuando llegue a `url`.                                                                                                                                                          |
| `tls_ignore_warning`             | Si `tls_verify` está definido como `true`, deshabilita cualquier advertencia de seguridad de la conexión SSL.                                                                                                                                                     |
| `tls_ca_cert`                    | Este parámetro te permite anular la ruta predeterminada del certificado especificada en `init_config`.                                                                                                                                                   |
| `check_certificate_expiration`   | Cuando `check_certificate_expiration` está habilitado, el servicio de checks comprueba la fecha de vencimiento del certificado SSL. **Nota**: Esto hace que se valide el certificado SSL, independientemente del valor del parámetro `tls_verify`. |
| `tls_retrieve_non_validated_cert`| Si `tls_verify` está definido como `false` y `check_certificate_expiration` como `true`, configurar este parámetro como `true` permite examinar el certificado en busca de una fecha de vencimiento.                                                                          |
| `days_warning` y `days_critical` | Si `check_certificate_expiration` está habilitado, estos parámetros emiten una advertencia o una alerta crítica cuando el certificado SSL se encuentra dentro del número de días especificado para su vencimiento.                                                                |
| `ssl_server_name`                | Cuando `check_certificate_expiration` está habilitado, este parámetro especifica el nombre del host del servicio al que debe conectarse y también anula el host con el que debe coincidir si check_hostname está habilitado.                                                      |
| `check_hostname`                 | Si se define como `true`, el check genera una advertencia si el nombre del host de `url` es diferente del nombre del host del certificado SSL.                                                                                                                           |
| `skip_proxy`                     | Si se define, el check omite la configuración del proxy e intenta acceder directamente a la URL del check. La configuración predeterminada en este caso es `false`. Si no se define, la configuración predeterminada del proxy de esta integración es la configuración del proxy definida en el archivo de configuración `datadog.yaml`. |
| `allow_redirects`                | Este parámetro permite que el check de servicios siga las redirecciones HTTP. De manera predeterminada, es `true`.                                                                                                                                                           |
| `tags`                           | Una lista de etiquetas arbitrarias asociadas al check. Para obtener más información sobre las etiquetas, consulta la [guía de etiquetado](https://docs.datadoghq.com/getting_started/tagging/) y la entrada del blog, [El poder de las métricas etiquetadas](https://www.datadoghq.com/blog/the-power-of-tagged-metrics).                                                                  |

Cuando hayas terminado de configurar `http_check.d/conf.yaml`, [reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para empezar a enviar checks de servicio HTTP y tiempos de respuesta a Datadog.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `http_check` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **network.http.response_time** <br>(gauge) | Tiempo de respuesta de una solicitud HTTP a una url determinada, etiquetada por url, por ejemplo 'url:http://example.com'.<br>_Se muestra como segundo_ |
| **network.http.can_connect** <br>(gauge) | Si el check puede conectarse, 1 si es cierto, 0 en caso contrario. Etiquetado por url, por ejemplo 'url:http://example.com'.|
| **network.http.cant_connect** <br>(gauge) | Si el check no se pudo conectar, 1 si es cierto, 0 en caso contrario. Etiquetado por url, por ejemplo 'url:http://example.com'.|
| **http.ssl.days_left** <br>(gauge) | Días hasta la caducidad del certificado SSL<br>_Se muestra como día_ |
| **http.ssl.seconds_left** <br>(gauge) | Segundos hasta la caducidad del certificado SSL<br>_Se muestra como segundo_ |

### Eventos

El check HTTP no incluye eventos.

### Checks de servicio

**http.can_connect**

Devuelve CRITICAL si el Agent no puede establecer una conexión HTTP con la URL. Devuelve OK si la conexión se realiza con éxito.

_Estados: ok, crítico_

**http.ssl_cert**

Devuelve CRITICAL si el certificado SSL ha caducado. Devuelve WARNING si el certificado SSL caducará en menos del umbral configurado. En caso contrario, devuelve OK.

_Estados: ok, advertencia, crítico, desconocido_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).