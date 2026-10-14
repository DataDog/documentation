---
aliases:
- /es/security/application_security/policies/inapp_waf_rules/
- /es/security_platform/application_security/event_rules
- /es/security/application_security/event_rules
- /es/security/application_security/threats/inapp_waf_rules
title: Reglas de In-App WAF
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Descripción general {#overview}

Con App and API Protection (AAP) habilitada, el SDK de Datadog hace un seguimiento activo de todos los servicios web y solicitudes de API en busca de actividad de seguridad sospechosa.

Una _regla In-App WAF_ especifica condiciones en la solicitud entrante para definir lo que la biblioteca considera sospechoso. El SDK de Datadog incluye cientos de reglas AAP In-App WAF out-of-the-box, que se utilizan para mostrar trazas de seguridad en el trace explorer y en las reglas de señal predeterminadas.

Puede agregar reglas In-App WAF sin actualizar el SDK.

## Estructura de una regla AAP In-App WAF {#structure-of-an-aap-in-app-waf-rule}

Una regla In-App WAF es un objeto JSON compuesto por una categoría, un nombre, etiquetas y condiciones. Cuando se detecta una traza de seguridad, las etiquetas de las reglas se propagan a la traza de seguridad y pueden utilizarse para crear [reglas de detección][1].

### Condiciones {#conditions}
Las condiciones definen cuándo la regla etiqueta una solicitud entrante. Las condiciones se componen de _entradas_ y _operadores_.

#### Entradas {#inputs}
Una entrada representa a qué parte de la solicitud se aplica el operador. Las siguientes entradas se utilizan en las reglas In-App WAF:

| Nombre | Descripción | Ejemplo |
|------|-------------|---------|
| `server.request.uri.raw` | La URI de solicitud completa recibida por el servicio de la aplicación | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | Los parámetros de ruta analizados (mapa de clave/valor) | `userId => 1234` |
| `server.request.query` | Los parámetros de consulta analizados (mapa de clave/valor) | `clientId => 234` |
| `server.request.headers.no_cookies` | Los encabezados de las solicitudes http entrantes, excluyendo el encabezado de cookie (mapa de clave/valor) | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | El mensaje gRPC analizado (mapa de clave/valor) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | El cuerpo HTTP analizado (mapa de clave/valor) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | El código de estado http | `200` |

#### Operadores {#operators}

| nombre | Descripción |
|------|-------------|
| `match_regex` | Realizar una coincidencia de expresión regular en las entradas |
| `phrase_match` | Realizar una coincidencia rápida de lista de palabras clave |
| `is_xss` | Operador especial para verificar cargas útiles de cross-site scripting (XSS) |
| `is_sqli` | Operador especial para verificar cargas útiles de inyección SQL (SQLI) |

## Reglas personalizadas In-App WAF {#custom-in-app-waf-rules}

Las reglas personalizadas In-App WAF permiten a los usuarios generar un registro o bloquear tipos específicos de solicitudes a sus aplicaciones. Por ejemplo, puede usar reglas personalizadas para hacer un seguimiento del éxito o el fracaso del inicio de sesión. Para comenzar, navegue a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [{{< ui >}}Custom Rules{{< /ui >}}][4].

**Nota:** Las reglas predeterminadas In-App WAF son de solo lectura. Para refinar el comportamiento de su In-App WAF, modifique las reglas In-App WAF. Las reglas predeterminadas In-App WAF no se pueden modificar; sin embargo, puede crear una regla personalizada basada en una de las reglas predeterminadas y modificar las condiciones de coincidencia según sus necesidades. Asegúrese de deshabilitar la regla predeterminada In-App WAF para no tener dos reglas similares evaluando las mismas solicitudes.

## Reglas sugeridas {#suggested-rules}

La función [Suggested Rules][5] de App and API Protection de Datadog analiza automáticamente el tráfico de la aplicación y propone reglas para ayudar a hacer un seguimiento y proteger los flujos de inicio de sesión y API. Las reglas están preconfiguradas en torno a patrones de autenticación comunes como `users.login.success` o `users.login.failure`, que son las señales más críticas para detectar comportamientos de inicio de sesión sospechosos.

Los beneficios de las reglas sugeridas incluyen:

- Reducción de la configuración manual al ofrecer cobertura de referencia para los puntos finales de autenticación. 
- Mejora de la velocidad de implementación de protecciones en servicios y entornos para protegerse contra vectores de ataque comunes como fuerza bruta, relleno de credenciales y abuso de inicio de sesión automatizado.
- Provisión de telemetría de alta fidelidad sobre intentos de inicio de sesión que se pueden correlacionar con patrones anómalos, como ráfagas repentinas de inicios de sesión fallidos, intentos repetidos desde la misma IP o actividad de inicio de sesión desde geografías inusuales. 
- Provisión de visibilidad para [protección contra apropiación de cuentas (ATO)][6], donde la mayoría de las campañas de ATO se detectan primero a través de actividad de autenticación anormal. 
- Detección y respuesta al abuso de credenciales antes de que las cuentas se vean comprometidas.

Los casos de uso de las reglas sugeridas incluyen:

  * Implemente rápidamente protecciones para fuerza bruta, relleno de credenciales y abuso de inicio de sesión impulsado por bots.
  * Utilice Suggested Rules como referencia para la protección contra ATO mediante el seguimiento de los intentos de inicio de sesión exitosos y fallidos y el ajuste de las condiciones (por ejemplo, el método POST más fallas 401/403).
  * Aplique una lógica de detección consistente en todos los servicios para dificultar que los atacantes evadan las defensas en entornos menos monitoreados.
  * Detecte señales de **intentos de apropiación de cuentas** mediante el hacer un seguimiento de la actividad anormal de inicio de sesión (por ejemplo, picos en fallas, tasas inusuales de éxito de inicio de sesión después de fallos repetidos).

Para usar una regla sugerida, realice una de las siguientes acciones:
- Cree una regla personalizada a partir de una regla sugerida:
  1. En [Suggested Rules][5], seleccione una o más reglas y haga clic en {{< ui >}}Create Selected Suggested Rules{{< /ui >}}.
  2. En {{< ui >}}Create suggested custom In-App WAF rules{{< /ui >}}, haga clic en {{< ui >}}Create rules{{< /ui >}}. Esto crea reglas personalizadas In-App WAF para hacer un seguimiento de las actividades de seguridad de las reglas que seleccionó.
- Modifique una regla sugerida para crear una regla personalizada:
  1. En [Suggested Rules][5], identifique una regla que desee usar y haga clic en {{< ui >}}View suggested rule{{< /ui >}}.
  2. En {{< ui >}}Add a new Business Logic{{< /ui >}}, edite la regla según sea necesario.
  3. Haga clic en {{< ui >}}Continue in In-App WAF{{< /ui >}}.
  4. En {{< ui >}}Define your custom rule{{< /ui >}}, realice cualquier cambio adicional.
  5. Haga clic en {{< ui >}}Save Rule{{< /ui >}}.


## Configure una regla AAP In-App WAF {#configure-an-aap-in-app-waf-rule}

El bloqueo en un servicio se define a través de las reglas de política. Se incluyen tres políticas predeterminadas de Datadog en el In-App WAF: *Datadog Recommended*, *Datadog Monitoring-only*, que solo hacen un seguimiento de los ataques, y *Datadog Block Attack tools*, que bloquean herramientas de ataque y hacen un seguimiento de todos los demás ataques.

Los servicios que utilizan una política son visibles directamente en la página de gestión de políticas.

1. En Datadog, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}}][2].

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="Página de configuración de In-App WAF, que muestra dos políticas predeterminadas." style="width:100%;" >}}

2. Haga clic en los tres puntos a la derecha de una de las políticas y seleccione {{< ui >}}Download Configuration of this Policy{{< /ui >}} para descargar el archivo de configuración a su máquina local.
3. Opcionalmente, seleccione {{< ui >}}Apply this Policy to Services{{< /ui >}} para aplicar una política predeterminada a uno o más de sus servicios AAP con protección habilitada.

   **Nota:** Se puede aplicar una política a uno o más servicios, pero un servicio solo puede contener una _política_.

3. Actualice el archivo para incluir la definición JSON de su nueva regla, siguiendo la especificación anterior. Por ejemplo:

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

4. Utilizando una utilidad como SCP o FTP, copie el archivo `appsec-rules.json` a su servidor de aplicaciones, por ejemplo, `/home/asm/appsec-rules.json`.

5. Siguiendo las instrucciones en [Enabling AAP][3] para agregar variables de aplicación en su entorno, agregue la variable de entorno `DD_APPSEC_RULES` a su servicio con la ruta completa al archivo:
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Reinicie su servicio.

## Qué hacer a continuación {#what-to-do-next}

A continuación, [configure reglas de detección para crear alertas de seguridad][1] basadas en esos rastreos de seguridad definidos por las reglas In-App WAF que creó. Puede modificar las reglas de detección AAP out-of-the-box proporcionadas o crear nuevas.

[1]: /es/security/application_security/threat_protection/policies/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /es/security/application_security/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
[5]: https://app.datadoghq.com/security/appsec/policies/in-app-waf?config_by=suggested-rules
[6]: /es/security/application_security/threat_protection/account_takeover_protection/