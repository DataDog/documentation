---
aliases:
- /es/security/application_security/code_security/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-security/
  tag: Blog
  text: Protección del ciclo de vida del código y de las bibliotecas de tu aplicación
    con Datadog Code Security
title: Runtime Code Analysis (IAST)
---

## Información general

Datadog Runtime Code Analysis (IAST) identifica vulnerabilidades a nivel de código en tus servicios. Para ello utiliza un enfoque Interactive Application Security Testing (IAST) para encontrar vulnerabilidades dentro del código de tu aplicación, en función de la instrumentación de tu aplicación Datadog.

IAST permite a Datadog identificar vulnerabilidades utilizando tráfico legítimo de aplicaciones en lugar de depender de tests externos que podrían requerir una configuración adicional o una programación periódica. También monitoriza las interacciones de tu código con otros componentes de tu stack tecnológico, como bibliotecas e infraestructura, proporcionando una vista actualizada de tu superficie de ataque.

Para obtener una lista de los servicios compatibles, consulta los [requisitos de compatibilidad de las bibliotecas][5]. Las reglas de detección IAST admiten los siguientes lenguajes:

| Gravedad | Regla de detección                        | Código                        | Java | .NET | Node.js | Python |
|----------|---------------------------------------|-----------------------------|------|------|---------|--------|
| Imprescindible | Inyección NoSQL                       | NOSQL_MONGODB_INJECTION     | FALSO | VERDADERO | VERDADERO | FALSO |
| Imprescindible | Inyección SQL                         | SQL_INJECTION               | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Imprescindible | Falsificación de solicitudes del lado del servidor (SSRF)    | SSRF                        | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Imprescindible | Inyección de código                        | CODE_INJECTION              | FALSO | FALSO | VERDADERO | FALSO |
| Imprescindible | Inserción de comandos                     | COMMAND_INJECTION           | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Alto | Inyección LDAP                        | LDAP_INJECTION              | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Alto | Inyección HTML en correos electrónicos | EMAIL_HTML_INJECTION                            | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Alto | Secretos codificados                     | HARDCODED_SECRET            | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Alto | Contraseñas codificadas                   | HARDCODED_PASSWORD          | FALSO | FALSO | VERDADERO | FALSO |
| Alto | Recorrido de la ruta                        | SENDERO_TRAVERSAL              | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Alto | Violación de los límites de confianza              | TRUST_BOUNDARY_VIOLATION    | VERDADERO | VERDADERO | FALSO | FALSO |
| Alto | Cross-Site Scripting (XSS)            | XSS                         | VERDADERO | VERDADERO | FALSO | FALSO |
| Alto | Deserialización no fiable             | UNTRUSTED_DESERIALIZATION   | VERDADERO | FALSO | FALSO | FALSO |
| Alto | Redirección no validada                  | UNVALIDATED_REDIRECT        | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Alto | Inyección XPath                       | XPATH_INJECTION             | VERDADERO | VERDADERO | FALSO | FALSO |
| Alto | Inyección de cabeceras                      | HEADER_INJECTION            | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Alto | Fuga en la lista de directorios                | DIRECTORY_LISTING_LEAK      | VERDADERO | FALSO | FALSO | FALSO |
| Alto | Escape HTML por defecto no válido           | DEFAULT_HTML_ESCAPE_INVALID | VERDADERO | FALSO | FALSO | FALSO |
| Alto | Verb Tampering                        | VERB_TAMPERING              | VERDADERO | FALSO | FALSO | FALSO |
| Medio | Cookie no SameSite                    | NO_SAMESITE_COOKIE          | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Cookie insegura                       | INSECURE_COOKIE             | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Cookie no HttpOnly                    | NO_HTTPONLY_COOKIE          | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Hashing débil                          | WEAK_HASH                   | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Cifrado débil                           | WEAK_CIPHER                 | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Fuga de stacktraces                       | STACKTRACE_LEAK             | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Inyección de reflexión                  | REFLECTION_INJECTION        | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Protocolo de autenticación inseguro      | INSECURE_AUTH_PROTOCOL      | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Clave codificada                         | HARDCODED_KEY               | FALSO | VERDADERO | FALSO | FALSO |
| Medio | Diseño JSP inseguro                   | INSECURE_JSP_LAYOUT         | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Cabecera HSTS faltante                   | HSTS_HEADER_MISSING         | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Bajo | Cabecera de X-Content-Type-Options faltante | XCONTENTTYPE_HEADER_MISSING | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Bajo | Aleatoriedad débil                       | WEAK_RANDOMNESS             | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Bajo | Consola de administración activa                  | ADMIN_CONSOLE_ACTIVE        | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Tiempo de espera de la sesión                       | SESSION_TIMEOUT             | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Reescritura de sesiones                     | SESSION_REWRITING           | VERDADERO | FALSO | FALSO | FALSO |

## Cómo detecta IAST las vulnerabilidades
Datadog Runtime Code Analysis (IAST) utiliza las mismas bibliotecas de rastreo que Datadog APM, lo que te permite monitorizar el tráfico de aplicaciones en directo y detectar vulnerabilidades a nivel de código en tiempo real. Sigue el siguiente proceso:

- **Seguimiento de las fuentes de datos:** IAST observa los datos que ingresan a tu aplicación desde fuentes externas, como las URL, los cuerpos o las cabeceras de solicitudes. Estas entradas se etiquetan y supervisan durante todo su ciclo de vida.
- **Análisis del flujo de datos**: La librería de rastreo de Datadog realiza un seguimiento de cómo se mueven los datos de entrada a través de la aplicación, incluso si se transforman, dividen o combinan. Esto permite a IAST comprender si la entrada original llega a partes sensibles del código y cómo lo hace.
- **Identificación de puntos vulnerables**: IAST detecta localizaciones de código en las que las entradas controladas por el usuario se utilizan de forma potencialmente insegura, por ejemplo, en consultas SQL, ejecución de código dinámico o renderización de HTML.
- **Confirmación de la vulnerabilidad**: Sólo se informa de una vulnerabilidad cuando IAST puede confirmar que una entrada contaminada llega a un punto vulnerable del código. Este enfoque minimiza los falsos positivos y garantiza que los hallazgos sean procesables.

## Exploración y gestión de las vulnerabilidades del código

El [Explorador de vulnerabilidades][1] utiliza datos sobre amenazas en tiempo real para ayudarte a comprender las vulnerabilidades que ponen en peligro tu sistema. Las vulnerabilidades se ordenan por gravedad.

{{< img src="/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Code Security en el Explorador de vulnerabilidades" style="width:100%;" >}}

Para clasificar las vulnerabilidades, cada una de ellas contiene una breve descripción del problema, que incluye:

- Servicios afectados.
- Tipo de vulnerabilidad.
- Primera detección.
- El archivo exacto y el número de línea donde se ha encontrado la vulnerabilidad.

{{< img src="/code_security/vulnerability-details.png" alt="Información de las vulnerabilidades de Code Security" style="width:100%;" >}}

Cada detalle de vulnerabilidad incluye una puntuación de riesgo (consulta la siguiente captura de pantalla) y una clasificación de gravedad: crítica, alta, media o baja.

La puntuación del riesgo se adapta al contexto específico del tiempo de ejecución, incluidos factores como dónde se despliega la vulnerabilidad y si el servicio es blanco de ataques activos.

{{< img src="/code_security/vulnerability_prioritization.png" alt="Prioridad de las vulnerabilidades en Code Security" style="width:100%;" >}}

## Corregir una vulnerabilidad del código

Datadog Code Security proporciona automáticamente la información que los equipos necesitan para identificar dónde se encuentra una vulnerabilidad en una aplicación, desde el nombre del archivo afectado hasta el método y el número de línea exactos.

{{< img src="/code_security/code_security_remediation.png" alt="Corrección de vulnerabilidades de Code Security" style="width:100%;" >}}

Cuando la [integración GitHub][7] está habilitada, Code Security muestra la primera versión afectada de un servicio, la confirmación que ha generado la vulnerabilidad y un fragmento del código vulnerable. Esta información permite a los equipos saber dónde y cuándo se ha producido una vulnerabilidad y les ayuda a definir prioridades en su trabajo.

{{< img src="/code_security/vulnerability_code_snippet.png" alt="Fragmento de vulnerabilidad del código" style="width:100%;" >}}

Para cada vulnerabilidad detectada se ofrecen pasos detallados para su corrección.

{{< img src="/code_security/remediation_recommendations.png" alt="Recomendaciones para correcciones" style="width:100%;" >}}

Las recomendaciones permiten cambiar el estado de una vulnerabilidad, asignarla a un miembro del equipo para su revisión y crear una incidencia en Jira para su seguimiento.

{{< img src="/code_security/vulnerability_jira_ticket.png" alt="Creación de un ticket de Kira a partir de una vulnerabilidad" style="width:100%;" >}}

**Nota:** Para crear incidencias sobre vulnerabilidades en Jira, debes configurar la integración Jira y tener el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación de la [integración Jira][3] y la documentación [Control del acceso basado en roles][4].

## Activar Runtime Code Analysis (IAST)

Para habilitar IAST, configura la [biblioteca de rastreo de Datadog][9]. Encontrarás instrucciones detalladas para ambos métodos en la sección [**Seguridad > Code Security > Configuración**][10].

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][11].

## Desactivar Code Security
Para obtener información sobre cómo desactivar IAST, consulta [Desactivación de Code Security][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /es/security/code_security/iast/setup/java/
[3]: /es/integrations/jira/
[4]: /es/account_management/rbac/permissions/#integrations
[5]: /es/security/code_security/iast/setup/#using-datadog-tracing-libraries
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /es/integrations/github/
[9]: /es/security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /es/security/code_security/troubleshooting
