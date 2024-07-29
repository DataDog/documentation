---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona Application Security Management
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con la seguridad del
    código Datadog
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: Blog
  text: Encontrar vulnerabilidades en tu código con la seguridad del código de Datadog
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: Blog
  text: La seguridad del código de Datadog logra una precisión del 100% en la prueba
    de referencia OWASP utilizando un enfoque IAST
title: Seguridad del código
---

## Información general

La seguridad del código de Datadog identifica las vulnerabilidades a nivel de código en tus servicios y te proporciona información práctica y correcciones recomendadas. 

Para consultar la lista de servicios compatibles, consulta los [requisitos de compatibilidad de la biblioteca][5].

La seguridad del código utiliza un enfoque de Pruebas interactivas de seguridad de aplicaciones (IAST) para encontrar vulnerabilidades en el código de tu aplicación. IAST utiliza la instrumentación incorporada en tu código como Application Performance Monitoring (APM). 

La seguridad del código también monitoriza las interacciones de tu código con otros componentes de tu stack tecnológico, como bibliotecas e infraestructuras. 

IAST permite a Datadog identificar vulnerabilidades utilizando el tráfico legítimo de las aplicaciones, en lugar de depender de tests externos que podrían requerir una configuración o una programación periódica adicionales.

La monitorización de la aplicación en tiempo de ejecución de la seguridad del código proporciona una visión actualizada de tu superficie de ataque, que te permite identificar rápidamente posibles problemas.

## Lista de vulnerabilidades a nivel de código

Las reglas de detección de la seguridad del código son compatibles con los siguientes lenguajes. 

| Gravedad | Regla de detección                        | Java  | .NET  | Node.js |
| -------- | ------------------------------------- | ----- | ----- | ------- |
| Crítica | Inyección NoSQL                       | FALSO | VERDADERO  | VERDADERO    |
| Crítica | Inyección SQL                         | VERDADERO  | VERDADERO  | VERDADERO    |
| Crítica | Falsificación de solicitudes del lado del servidor (SSRF)    | VERDADERO  | VERDADERO  | VERDADERO    |
| Crítica | Inyección de comandos                     | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Inyección LDAP                        | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Secretos codificados                     | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Contraseñas codificadas                   | FALSO | FALSO | VERDADERO    |
| Elevada     | Travesía de la ruta                        | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Violación de los límites de confianza              | VERDADERO  | VERDADERO  | FALSO   |
| Elevada     | Secuencia de comandos en sitios cruzados (XSS)            | VERDADERO  | VERDADERO  | FALSO   |
| Elevada     | Redirección no validada                  | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Inyección XPath                       | VERDADERO  | VERDADERO  | FALSO   |
| Elevada     | Inyección de cabeceras                      | VERDADERO  | VERDADERO  | VERDADERO    |
| Elevada     | Fuga en la lista de directorios                | VERDADERO  | FALSO | FALSO   |
| Elevada     | Escape HTML por defecto no válido           | VERDADERO  | FALSO | FALSO   |
| Elevada     | Manipulación verbal                        | VERDADERO  | FALSO | FALSO   |
| Media   | Cookie no SameSite                    | VERDADERO  | VERDADERO  | VERDADERO    |
| Media   | Cookie insegura                       | VERDADERO  | VERDADERO  | VERDADERO    |
| Media   | Cookie no HttpOnly                    | VERDADERO  | VERDADERO  | VERDADERO    |
| Media   | Hashing débil                          | VERDADERO  | VERDADERO  | VERDADERO    |
| Media   | Cifrado débil                           | VERDADERO  | VERDADERO  | VERDADERO    |
| Media   | Fuga de stacktraces                       | VERDADERO  | VERDADERO  | FALSO   |
| Media   | Inyección de reflexión                  | VERDADERO  | VERDADERO  | FALSO   |
| Media   | Protocolo de autenticación inseguro      | VERDADERO  | VERDADERO  | FALSO   |
| Media   | Clave codificada                         | FALSO | VERDADERO  | FALSO   |
| Media   | Diseño JSP inseguro                   | VERDADERO  | FALSO | FALSO   |
| Baja      | Cabecera HSTS faltante                   | VERDADERO  | VERDADERO  | VERDADERO    |
| Baja      | Cabecera de X-Content-Type-Options faltante | VERDADERO  | VERDADERO  | VERDADERO    |
| Baja      | Aleatoriedad débil                       | VERDADERO  | VERDADERO  | VERDADERO    |
| Baja      | Consola de administración activa                  | VERDADERO  | FALSO | FALSO   |
| Baja      | Tiempo de espera de la sesión                       | VERDADERO  | FALSO | FALSO   |
| Baja      | Reescritura de sesiones                     | VERDADERO  | FALSO | FALSO   |

**Nota:** Python está en fase beta privada. Para solicitar una beta, rellena [este formulario][6].

## Explorar y gestionar las vulnerabilidades del código

El [Explorador de vulnerabilidades][1] utiliza datos sobre amenazas en tiempo real para ayudarte a comprender las vulnerabilidades que ponen en peligro tu sistema. Las vulnerabilidades se ordenan por gravedad.

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Seguridad del código en el Explorador de vulnerabilidades" style="width:100%;" >}}

Para clasificar las vulnerabilidades, cada una de ellas contiene una breve descripción del problema, que incluye: 

- Servicios afectados.
- Tipo de vulnerabilidad.
- Primera detección.
- El archivo exacto y el número de línea donde se ha encontrado la vulnerabilidad.

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Detalles de las vulnerabilidades de seguridad del código" style="width:100%;" >}}

Cada detalle de vulnerabilidad incluye una puntuación de riesgo (consulta la captura de pantalla abajo) y una clasificación de la gravedad: crítica, elevada, media o baja. 

La puntuación del riesgo se adapta al contexto específico del tiempo de ejecución, incluidos factores como dónde se despliega la vulnerabilidad y si el servicio es objetivo de ataques activos. 

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Prioridad de las vulnerabilidades de seguridad del código" style="width:100%;" >}}

## Corrrección

La seguridad del código de Datadog proporciona automáticamente la información que los equipos necesitan para identificar dónde se encuentra una vulnerabilidad en una aplicación, desde el nombre del archivo afectado hasta el método y el número de línea exactos.

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Corrección de las vulnerabilidades de seguridad del código" style="width:100%;" >}}

Cuando la [integración GitHub][7] está habilitada, la seguridad del código muestra la primera versión afectada de un servicio, la confirmación que ha generado la vulnerabilidad y un fragmento del código vulnerable. Esta información permite a los equipos saber dónde y cuándo se ha producido una vulnerabilidad y les ayuda a priorizar su trabajo.

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="Fragmento del código vulnerable" style="width:100%;" >}}

Para cada vulnerabilidad detectada se ofrecen pasos detallados para su corrección.

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="Recomendaciones para la corrección" style="width:100%;" >}}

Las recomendaciones permiten cambiar el estado de una vulnerabilidad, asignarla a un miembro del equipo para su revisión y crear una incidencia en Jira para su seguimiento.

{{< img src="/security/application_security/code_security/vulnerability_jira_ticket.png" alt="Creación de un ticket de Kira a partir de una vulnerabilidad" style="width:100%;" >}}

**Nota:** Para crear incidencias sobre vulnerabilidades en Jira, debes configurar la integración Jira y tener el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación de la [integración Jira][3], así como la documentación [Control del acceso basado en roles][4].

## Habilitar la seguridad del código 

Para habilitar la seguridad del código, puedes utilizar la [instrumentación en un solo paso][8] o configurar la [biblioteca de rastreo de Datadog][9]. Para encontrar instrucciones detalladas para ambos métodos, consulta la sección [**Seguridad > Seguridad de aplicaciones > Parámetros**][10].

Si necesita más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /es/security/application_security/enabling/tracing_libraries/code_security/java/
[3]: /es/integrations/jira/
[4]: /es/account_management/rbac/permissions/#integrations
[5]: /es/security/application_security/enabling/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /es/integrations/github/
[8]: /es/security/application_security/enabling/single_step/code_security/?tab=linuxhostorvm
[9]: /es/security/application_security/enabling/tracing_libraries/code_security/
[10]: https://app.datadoghq.com/security/configuration/asm/setup
[11]: https://www.datadoghq.com/support/