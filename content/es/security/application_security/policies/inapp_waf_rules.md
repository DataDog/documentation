---
aliases:
- /es/security_platform/application_security/event_rules
- /es/security/application_security/event_rules
- /es/security/application_security/threats/inapp_waf_rules
title: Reglas de WAF en la aplicación
---

## Información general

Con la protección de aplicaciones y API (AAP) activada, la biblioteca de rastreo de Datadog monitoriza activamente todos los servicios web y las solicitudes de API en busca de actividades de seguridad sospechosas.

Una _regla WAF en la aplicación_ especifica condiciones en la solicitud entrante para definir lo que la biblioteca considera sospechoso. La biblioteca de rastreo de Datadog incluye cientos de reglas WAF en la aplicación predefinidas de AAP, que se utilizan para mostrar trazas (traces) de seguridad en el Explorador de trazas y en las reglas de señalización predeterminadas.

Puedes añadir reglas WAF en la aplicación sin actualizar la biblioteca de rastreo.

## Estructura de una regla WAF de AAP en la aplicación

Una regla WAF en la aplicación es un objeto JSON compuesto por una categoría, un nombre, etiquetas (tags) y condiciones. Cuando se detecta una traza de seguridad, las etiquetas de las reglas se propagan a la traza de seguridad y pueden utilizarse para crear [reglas de detección][1].

### Condiciones
Las condiciones definen cuándo la regla etiqueta una solicitud entrante. Las condiciones se componen de _entradas_ y _operadores_.

#### Entradas
Una entrada representa a qué parte de la solicitud se aplica el operador. Las siguientes entradas se utilizan en las reglas WAF en la aplicación:

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

## Reglas WAF personalizadas en la aplicación

Las reglas personalizadas WAF en la aplicación permiten a los usuarios registrar o bloquear tipos específicos de solicitudes en tus aplicaciones. Por ejemplo, puedes utilizar reglas personalizadas para monitorizar inicios de sesión exitosos o fallidos. Para empezar, ve a **Security** -> **App and API Protection** -> **Policies** -> **In-App WAF** -> [**Custom Rules** (Seguridad > App and API Protection > Políticas > WAF en la aplicación)][4].

**Nota:** Las reglas WAF en la aplicación predeterminadas son de solo lectura. Para refinar el comportamiento de WAF en la aplicación, modifica las reglas WAF en la aplicación. Las reglas predeterminadas no pueden modificarse, pero puedes crear una regla personalizada basada en una de las reglas predeterminadas y modificar las condiciones de coincidencia según tus necesidades. Asegúrate de desactivar la regla predeterminada para no tener dos reglas similares evaluando las mismas solicitudes.

## Reglas sugeridas

La función de [reglas sugeridas][5] de App and API Protection en Datadog analiza automáticamente el tráfico de las aplicaciones y propone reglas para ayudar a monitorizar y proteger flujos de inicio de sesión y de API. Las reglas están preconfiguradas en torno a patrones de autenticación habituales como `users.login.success` o `users.login.failure`, que son las señales más críticas para detectar comportamientos de inicio de sesión sospechosos.

Entre los beneficios de las reglas sugeridas se incluyen:

- Reducir la configuración manual al ofrecer cobertura básica endpoints de autenticación. 
- Mejorar la velocidad de despliegue de protecciones en servicios y entornos para protegerte de vectores de ataque habituales como la fuerza bruta, el relleno de credenciales y el abuso de inicios de sesión automatizados.
- Proporcionar telemetría de alta fidelidad sobre los intentos de inicio de sesión que puedan correlacionarse con patrones anómalos, como ráfagas repentinas de inicios de sesión fallidos, intentos repetidos desde la misma IP o actividades de inicio de sesión desde geografías inusuales. 
- Proporcionar visibilidad para la [protección contra la toma de control de cuentas (ATO)][6], donde la mayoría de las campañas contra la ATO salen a la luz en primer lugar a través de actividades de autenticación anómalas.
- Detectar y responder al abuso de credenciales antes de que las cuentas se vean comprometidas.

Entre los casos de uso de las reglas sugeridas se incluyen:

  * Implementar rápidamente protecciones contra la fuerza bruta, el relleno de credenciales y el abuso de inicio de sesión impulsado por bots.
  * Utilizar reglas sugeridas como líneas de base para la protección contra la ATO mediante el seguimiento de los intentos de inicio de sesión exitosos y fallidos, y las condiciones de ajuste (por ejemplo, el método POST más los fallos 401/403).
  * Aplicar una lógica de detección coherente en todos los servicios para dificultar que los atacantes eludan las defensas en entornos menos monitorizados.
  * Detectar indicios de **intentos de apropiación de cuenta** monitorizando la actividad de inicio de sesión anormal (por ejemplo, picos de fallos, tasas exitosas de inicio de sesión inusuales tras fallos repetidos).

Para utilizar una regla sugerida, realiza una de las siguientes acciones:
- Crea una regla personalizada a partir de una regla sugerida:
  1. En [Reglas sugeridas][5], selecciona una o varias reglas y haz clic en **Create Selected Suggested Rules** (Crear reglas sugeridas seleccionadas).
  2. En **Create suggested custom In-App WAF rules** (Crear reglas WAF en la aplicación personalizadas sugeridas), haz clic en **Create rules** (Crear reglas). Esto crea reglas personalizadas WAF en la aplicación para monitorizar las actividades de seguridad de las reglas que has seleccionado.
- Modifica una regla sugerida para crear una regla personalizada:
  1. En [Reglas sugeridas][5], identifica una regla que quieras utilizar y haz clic en **View suggested rule** (Ver regla sugerida).
  2. En **Add a new Business Logic** (Añadir una nueva lógica empresarial), edita la regla según sea necesario.
  3. Haz clic en **Continue in In-App WAF** (Continuar en WAF en la aplicación).
  4. En **Define your custom rule** (Defina tu regla personalizada), realiza cualquier otro cambio.
  5. Haz clic en **Save Rule** (Guardar regla).


## Configurar una regla WAF en la aplicación de AAP

El bloqueo de un servicio se define a través de las reglas de políticas. Tres políticas de Datadog predeterminadas se incluyen en WAF en la aplicación: *Recomendado por Datadog*, *Sólo monitorización de Datadog*, que sólo monitoriza ataques, y *Bloqueo de herramientas de ataque de Datadog*, que bloquea las herramientas de ataque y monitoriza todos los demás ataques.

Los servicios que utilizan una política son visibles directamente en la página de gestión de política.

1. En Datadog, ve a [Security > App and API Protection > Policies > In-App WAF (Seguridad > App and API Protection > Políticas > WAF en la aplicación)][2].

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="La página de configuración de WAF en la aplicación, que muestra dos políticas predeterminadas." style="width:100%;" >}}

2. Haz clic en los tres puntos a la derecha de una de las políticas y selecciona **Download Configuration of this Policy** (Descargar la configuración de esta política) para descargar el archivo de configuración a tu máquina local.
3. Opcionalmente, selecciona **Aplicar esta política a servicios** para aplicar una política predeterminada a uno o más de tus servicios de protección AAP habilitados.

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

5. Siguiendo las instrucciones de [Activación de AAP][3] para añadir variables de aplicación en tu entorno, añade la variable de entorno `DD_APPSEC_RULES` a tu servicio con la ruta completa al archivo:
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Reinicia tu servicio.

## ¿Qué hacer a continuación?

A continuación, [configura reglas de detección para crear señales de seguridad][1] basadas en esas trazas de seguridad definidas por las reglas de WAF en la aplicación que has creado. Puedes modificar las reglas de detección de AAP predefinidas o crear otras nuevas.

[1]: /es/security/application_security/policies/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /es/security/application_security/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
[5]: https://app.datadoghq.com/security/appsec/policies/in-app-waf?config_by=suggested-rules
[6]: /es/security/account_takeover_protection