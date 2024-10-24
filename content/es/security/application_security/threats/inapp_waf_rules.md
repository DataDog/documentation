---
aliases:
- /es/security_platform/application_security/event_rules
- /es/security/application_security/event_rules
- /es/security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protección contra las amenazas con Datadog Application Security Management
- link: /security/application_security/custom_rules/
  tag: Documentación
  text: Escribir reglas de detección personalizadas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas habituales de Application Security Management (ASM) de
    Datadog
title: Reglas de WAF dentro de la aplicación
---

## Información general

Con Application Security Management (ASM) activada, la biblioteca de rastreo de Datadog monitoriza activamente todas las solicitudes de API y servicios web en busca de actividades de seguridad sospechosas.

Una _regla WAF dentro de la aplicación_ especifica condiciones en la solicitud entrante para definir lo que biblioteca considera sospechoso. La biblioteca de rastreo de Datadog incluye cientos de reglas WAF dentro de la aplicación de ASM predefinido, que se utilizan para mostrar las trazas de seguridad en el Trace Explorer y en las reglas de señalización predeterminadas.

Puedes añadir reglas WAF dentro de la aplicación sin actualizar la biblioteca de rastreo.

## Estructura de una regla WAF dentro de la aplicación de ASM

Una regla WAF dentro de la aplicación es un objeto JSON compuesto por una categoría, un nombre, etiquetas (tags) y condiciones. Cuando se detecta una traza de seguridad, las etiquetas de las reglas se propagan a la traza de seguridad y pueden utilizarse para crear [reglas de detección][1].

### Condiciones
Las condiciones definen cuándo la regla etiqueta una solicitud entrante. Las condiciones se componen de _entradas_ y _operadores_.

#### Entradas
Una entrada representa a qué parte de la solicitud se aplica el operador. Las siguientes entradas se utilizan en las reglas WAF dentro de la aplicación:

| Nombre | Descripción | Ejemplo |
|------|-------------|---------|
| `server.request.uri.raw` | La URI completa de la solicitud recibida por el servicio de aplicación | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | Los parámetros de ruta analizados (mapa clave/valor) | `userId => 1234` |
| `server.request.query` | Los parámetros de consulta analizados (mapa clave/valor) | `clientId => 234` |
| `server.request.headers.no_cookies` | Los encabezados de solicitudes http entrantes, excluyendo el encabezado de cookies (mapa clave/valor) | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | El mensaje gRPC analizado (mapa clave/valor) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | El cuerpo HTTP analizado (mapa clave/valor) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | El código de estado http | `200` |

#### Operadores 

| nombre | Descripción |
|------|-------------|
| `match_regex` | Realizar una coincidencia de expresión regular en las entradas |
| `phrase_match` | Realizar una concordancia rápida de la lista de palabras clave |
| `is_xss` | Operador especial para comprobar cargas útiles de script de comandos entre sitios (XSS) |
| `is_sqli` | Operador especial para comprobar cargas útiles de inyección SQL (SQLI) |

## Reglas WAF dentro de la aplicación personalizadas

Las reglas WAF dentro de la aplicación personalizadas permiten a los usuarios loguear o bloquear tipos específicos de solicitudes a sus aplicaciones. Por ejemplo, puedes utilizar reglas personalizadas para monitorizar si el inicio de sesión es correcto o incorrecto. Para empezar, ve a **Security** -> **Application Security** -> **Protection** -> **In-App WAF** -> [**Custom Rules**][4]  (Seguridad -> Seguridad de la aplicación -> Protección -> WAF dentro de la aplicación -> Reglas personalizadas).

**Nota:** Las reglas por defecto en la aplicación WAF son de sólo lectura. Para refinar el comportamiento de su WAF dentro de la aplicación, modifica las reglas del WAF dentro de la aplicación. Las reglas predeterminadas no pueden modificarse, sin embargo, puedes crear una regla personalizada basada en una de las reglas predeterminadas y modificar las condiciones de coincidencia según tus necesidades. Asegúrate de desactivar la regla predeterminada para no tener dos reglas similares evaluando las mismas solicitudes.

## Configura una regla WAF dentro de la aplicación de ASM

El bloqueo en un servicio se define a través de las reglas de política. Tres políticas predeterminadas de Datadog se incluyen en el WAF dentro de la aplicación: *Recomendado por Datadog*, *Solo monitorización de Datadog*, que monitoriza ataques solamente, y *Bloqueo de herramientas de ataque de Datadog*, que bloquea las herramientas de ataque y monitoriza todos los demás ataques.

Los servicios que utilizan una política son visibles directamente en la página de gestión de política.

1. En Datadog, navega hasta [Security > Application Security > Protection > In-App WAF][2] (Seguridad > Seguridad de la aplicación > Protección > WAF dentro de la aplicación).

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="La página de configuración de WAF dentro de la aplicación, que muestra dos políticas predeterminadas." style="width:100%;" >}}

2. Haz clic en los tres puntos a la derecha de una de las políticas y selecciona **Download Configuration of this Policy** (Descargar la configuración de esta política) para descargar el archivo de configuración a tu máquina local.
3. Opcionalmente, selecciona **Apply this Policy to Services** (Aplicar este política a servicios) para aplicar una política predeterminada a uno o más de tus servicios de ASM habilitados para protección.

   **Nota:** Una política puede aplicarse a uno o varios servicios, pero un servicio solo puede contener una _política_.

3. Actualiza el archivo para incluir la definición JSON de tu nueva regla, siguiendo la especificación anterior. Por ejemplo:

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My In-App WAF rule",
        "tags": {
            "category": "attack_attempt",
            "crs_id": "920260",
            "type": "http_protocol_violation"
        },
        "conditions": [
            {
                "operator": "match_regex",
                "parameters": {
                    "inputs": [
                        {
                            "address": "server.request.uri.raw"
                        }
                    ],
                    "options": {
                        "case_sensitive": true,
                        "min_length": 6
                    },
                    "regex": "\\%u[fF]{2}[0-9a-fA-F]{2}"
                }
            }
        ],
        "transformers": []
    },
   {{< /code-block >}}

4. Mediante una utilidad como SCP o FTP, copia el archivo `appsec-rules.json` en tu servidor de aplicaciones, por ejemplo, `/home/asm/appsec-rules.json`.

5. Siguiendo las instrucciones de [Activación de ASM][3] para añadir variables de aplicación en tu entorno, añade la variable de entorno `DD_APPSEC_RULES` a tu servicio con la ruta completa al archivo:
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Reinicia tu servicio.

## ¿Qué hacer a continuación?

A continuación, [configura reglas de detección para crear señales de seguridad][1] basadas en esas trazas de seguridad definidas por las reglas WAF dentro de la aplicación que has creado. Puedes modificar las reglas de detección de ASM predefinidas o crear otras nuevas. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /es/security/application_security/threats/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

