---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona Application Security Management
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con Datadog Code Security
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: Blog
  text: Encontrar vulnerabilidades en tu código con Datadog Code Security
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: Blog
  text: Datadog Code Security logra una precisión del 100% en la prueba de referencia
    OWASP mediante el uso de un enfoque IAST
title: Code Security
---

## Información general

Datadog Code Security identifica las vulnerabilidades a nivel de código en tus servicios y proporciona información práctica y correcciones recomendadas.

Para consultar la lista de servicios compatibles, consulta los [requisitos de compatibilidad de la biblioteca][5].

Code Security utiliza el enfoque de Pruebas interactivas de seguridad de aplicaciones (IAST) para encontrar vulnerabilidades en el código de tu aplicación. IAST utiliza la instrumentación incorporada en tu código como la monitorización del rendimiento de las aplicaciones (APM).

Code Security también monitoriza las interacciones de tu código con otros componentes de tu stack tecnológico, como bibliotecas e infraestructuras.

IAST permite a Datadog identificar vulnerabilidades utilizando tráfico legítimo de aplicaciones, en lugar de depender de tests externos que podrían requerir una configuración adicional o una programación periódica.

La monitorización de la aplicación en tiempo de ejecución de Code Security proporciona una vista actualizada de tu superficie de ataque, lo que te permite identificar rápidamente posibles problemas.

## Lista de vulnerabilidades a nivel de código

Las reglas de detección de Code Security admiten los siguientes lenguajes.

| Gravedad | Regla de detección                        | Java  | .NET  | Node.js | Python |
| -------- | ------------------------------------- | ----- | ----- | ------- |--------|
| Crítica | Inyección NoSQL                       | FALSO | VERDADERO  | VERDADERO    | FALSO  |
| Crítica | Inyección SQL                         | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Crítica | Falsificación de solicitudes del lado del servidor (SSRF)    | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Crítica | Inyección de comandos                     | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Elevada     | Inyección LDAP                        | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Elevada     | Secretos codificados                     | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Elevada     | Contraseñas codificadas                   | FALSO | FALSO | VERDADERO    | FALSO  |
| Elevada     | Recorrido de la ruta                        | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Elevada     | Violación de los límites de confianza              | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Elevada     | Cross-Site Scripting (XSS)            | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Elevada     | Redirección no validada                  | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Elevada     | Inyección XPath                       | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Elevada     | Inyección de cabeceras                      | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Elevada     | Fuga en la lista de directorios                | VERDADERO  | FALSO | FALSO   | FALSO  |
| Elevada     | Escape HTML por defecto no válido           | VERDADERO  | FALSO | FALSO   | FALSO  |
| Elevada     | Verb Tampering                        | VERDADERO  | FALSO | FALSO   | FALSO  |
| Media   | Cookie no SameSite                    | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Media   | Cookie insegura                       | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Media   | Cookie no HttpOnly                    | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Media   | Hashing débil                          | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Media   | Cifrado débil                           | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Media   | Fuga de stacktraces                       | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Media   | Inyección de reflexión                  | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Media   | Protocolo de autenticación inseguro      | VERDADERO  | VERDADERO  | FALSO   | FALSO  |
| Media   | Clave codificada                         | FALSO | VERDADERO  | FALSO   | FALSO  |
| Media   | Diseño JSP inseguro                   | VERDADERO  | FALSO | FALSO   | FALSO  |
| Baja      | Cabecera HSTS faltante                   | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Baja      | Cabecera de X-Content-Type-Options faltante | VERDADERO  | VERDADERO  | VERDADERO    | FALSO  |
| Baja      | Aleatoriedad débil                       | VERDADERO  | VERDADERO  | VERDADERO    | VERDADERO   |
| Baja      | Consola de administración activa                  | VERDADERO  | FALSO | FALSO   | FALSO  |
| Baja      | Tiempo de espera de la sesión                       | VERDADERO  | FALSO | FALSO   | FALSO  |
| Baja      | Reescritura de sesiones                     | VERDADERO  | FALSO | FALSO   | FALSO  |

## Exploración y gestión de las vulnerabilidades del código

El [Explorador de vulnerabilidades][1] utiliza datos sobre amenazas en tiempo real para ayudarte a comprender las vulnerabilidades que ponen en peligro tu sistema. Las vulnerabilidades se ordenan por gravedad.

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Code Security en el Explorador de vulnerabilidades" style="width:100%;" >}}

Para clasificar las vulnerabilidades, cada una de ellas contiene una breve descripción del problema, que incluye:

- Servicios afectados.
- Tipo de vulnerabilidad.
- Primera detección.
- El archivo exacto y el número de línea donde se ha encontrado la vulnerabilidad.

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Detalles de las vulnerabilidades en Code Security" style="width:100%;" >}}

Cada detalle de vulnerabilidad incluye una puntuación de riesgo (consulta la siguiente captura de pantalla) y una clasificación de gravedad: crítica, alta, media o baja.

La puntuación del riesgo se adapta al contexto específico del tiempo de ejecución, incluidos factores como dónde se despliega la vulnerabilidad y si el servicio es blanco de ataques activos.

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Prioridad de las vulnerabilidades en Code Security" style="width:100%;" >}}

## Corrrección

Datadog Code Security proporciona automáticamente la información que los equipos necesitan para identificar dónde se encuentra una vulnerabilidad en una aplicación, desde el nombre del archivo afectado hasta el método y el número de línea exactos.

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Corrección de las vulnerabilidades en Code Security" style="width:100%;" >}}

Cuando la [integración GitHub][7] está habilitada, la seguridad del código muestra la primera versión afectada de un servicio, la confirmación que ha generado la vulnerabilidad y un fragmento del código vulnerable. Esta información permite a los equipos saber dónde y cuándo se ha producido una vulnerabilidad y les ayuda a definir prioridades en su trabajo.

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="Fragmento del código vulnerable" style="width:100%;" >}}

Para cada vulnerabilidad detectada se ofrecen pasos detallados para su corrección.

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="Recomendaciones para la corrección" style="width:100%;" >}}

Las recomendaciones permiten cambiar el estado de una vulnerabilidad, asignarla a un miembro del equipo para su revisión y crear una incidencia en Jira para su seguimiento.

{{< img src="/security/application_security/code_security/vulnerability_jira_ticket.png" alt="Crear un ticket de Jira a partir de una vulnerabilidad" style="width:100%;" >}}

**Nota:** Para crear incidencias sobre vulnerabilidades en Jira, debes configurar la integración Jira y tener el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación de la [integración Jira][3] y la documentación [Control del acceso basado en roles][4].

## Para habilitar Code Security

Para habilitar Code Security, puedes utilizar la [instrumentación en un solo paso][8] o configurar la [biblioteca de rastreo de Datadog][9]. Para encontrar instrucciones detalladas para ambos métodos, consulta la sección [**Seguridad > Seguridad de aplicaciones > Parámetros**][10].

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /es/security/application_security/code_security/setup/java/
[3]: /es/integrations/jira/
[4]: /es/account_management/rbac/permissions/#integrations
[5]: /es/security/application_security/code_security/setup/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /es/integrations/github/
[8]: /es/security/application_security/code_security/setup/
[9]: /es/security/application_security/code_security/setup/
[10]: https://app.datadoghq.com/security/configuration/asm/setup
[11]: https://www.datadoghq.com/support/