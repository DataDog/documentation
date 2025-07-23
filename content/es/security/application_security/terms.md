---
disable_toc: false
further_reading:
- link: /security/application_security/how-appsec-works
  tag: Documentación
  text: Cómo funciona Application Security
- link: /security/application_security/threats/
  tag: Documentación
  text: Gestión de amenazas
- link: /security/application_security/software_composition_analysis/
  tag: Documentación
  text: Análisis de la composición del software
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: Blog
  text: Acelerar las investigaciones de seguridad con la información sobre amenazas
    de Datadog
title: Términos y conceptos
---

Datadog Application Security monitoriza las amenazas y ofrece protección contra los ataques a nivel de aplicación que pretenden explotar vulnerabilidades a nivel de código. Aprovecha el contexto de ejecución del código en tiempo de ejecución, los datos de trazas y de errores, así como la atribución al usuario.

## Términos generales de seguridad de las aplicaciones

Intento de ataque
: Qué regla de seguridad ha sido activada por la traza (trace).

Biblioteca Datadog
: También biblioteca de rastreo
: Lenguaje de programación específico de la biblioteca incorporado en aplicaciones web. Datadog Application Security utiliza la biblioteca para la monitorización y la protección. APM utiliza la misma biblioteca para la instrumentación del código para el rastreo de telemetría.

Regla de detección
: Definición de lógica condicional que se aplica a los datos ingeridos y a las configuraciones de la nube. Cuando al menos un caso definido en una regla coincide durante un periodo de tiempo determinado, Datadog genera una señal de seguridad.
: Consulta [Reglas de detección][10].

Lista de permisos (antiguo filtro de exclusión)
: Mecanismo para descartar trazas de seguridad marcadas por la biblioteca Datadog Application Security y las reglas WAF en la aplicación. Passlist se aplica a medida que las solicitudes se ingieren en Datadog (admisión). La lista de permisos ayuda a gestionar los falsos positivos y los costes de admisión.
: Consulta [Filtros de exclusión][11] en la aplicación.

Reglas WAF en la aplicación (antiguas reglas de eventos)
: Conjunto de reglas que se ejecutan en bibliotecas Datadog para detectar actividades de seguridad. Incluyen patrones de Web Application Firewall (WAF) que monitorizan los intentos de explotar vulnerabilidades conocidas.
: Consulta [Reglas WAF en la aplicación][12].

Tests interactivos de seguridad de las aplicaciones (IAST)
: Método de tests de seguridad de aplicaciones que detecta proactivamente vulnerabilidades mientras la aplicación es ejecutada por un test automatizado, un testeador humano o cualquier actividad que interactúe con la funcionalidad de la aplicación.

Configuración remota
: Mecanismo de la plataforma Datadog que habilita la actualización remota de la configuración del Agent. Utilizada por Datadog Application Security para actualizar las reglas WAF en la aplicación, activar el producto y bloquear a los atacantes.
: Consulta [Cómo funciona la configuración remota][8].

Servicio
: Una única aplicación web, microservicio, API o función. Normalmente sirve a una función empresarial.

Señal
: Detección de un ataque a una aplicación que afecta a tus servicios. Las señales identifican amenazas significativas para que las revises y les des un tratamiento de alta prioridad.
: Consulta [Explorador de señales][13] en la aplicación.

Análisis de la composición del software (SCA)
: Comparación de las bibliotecas de código abierto cargadas por tus servicios en bases de datos con vulnerabilidades conocidas. El SCA te ayuda a identificar dependencias vulnerables, bibliotecas obsoletas y problemas de licencia en bibliotecas de código abierto cargadas por tus servicios web.

Gravedad
: Indicador de la rapidez con la que se debe clasificar y abordar un intento de ataque. Se basa en una combinación de factores, incluyendo el impacto potencial y el riesgo del ataque. Los valores son Crítico, Alto, Medio, Bajo, Información.

Rastreo de seguridad
: Rastreo distribuido cuya actividad de seguridad ha sido marcada por reglas WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

Solicitud sospechosa
: Rastreo distribuido cuya actividad de seguridad ha sido marcada por reglas WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

Asignación a usuarios
: Mecanismo que asigna las solicitudes sospechosas a usuarios conocidos en tus sistemas.
: Consulta [Seguimiento de la actividad del usuario][14].

Vulnerabilidad
: Riesgo pasivo de una aplicación. De [OWASP][1]: "Una vulnerabilidad es un hueco o una debilidad en la aplicación. Puede ser un defecto de diseño o un error de implementación, que permite a un atacante causar daño a las partes interesadas de una aplicación. Las partes interesadas incluyen el propietario de la aplicación, los usuarios de la aplicación y otras entidades que dependen de la aplicación."

Calificación de trazas
: Proceso mediante el cual Datadog ayuda a comprender el impacto de las trazas, etiquetándolas
como `Harmful Safe or Unknown`.
: Consulta [Calificación de trazas][15].

Información sobre amenazas
: Conjunto de reglas que se ejecutan en bibliotecas Datadog para detectar amenazas. Incluyen patrones de Web Application Firewall (WAF) que monitorizan los intentos de explotar vulnerabilidades conocidas.
: Consulta [Información sobre amenazas][16].

Atacantes sospechosos
: Precursor de las IP marcadas. Para ser clasificadas como sospechosas, las IP deben haber alcanzado un umbral mínimo de tráfico de ataque, pero no el umbral para ser marcadas. Los umbrales no son configurables por el usuario.
: Consulta [Explorador de atacantes][17]

Atacantes marcados
: Las IP que envían grandes cantidades de tráfico de ataque. Se recomienda revisar y bloquear las IP marcadas. Los umbrales no son configurables por el usuario.
: Consulta [Explorador de atacantes][17]

## Términos de ataques y vulnerabilidades conocidas

Proyecto abierto de seguridad de las aplicaciones web (OWASP)
: Fundación sin ánimo de lucro que dispone de varios proyectos para mejorar la seguridad de las aplicaciones web. OWASP es más conocido por el [OWASP Top 10][2], un amplio consenso sobre los riesgos de seguridad más críticos para las aplicaciones web.

Secuencias de comandos en sitios cruzados (XSS)
: Tipo de ataque de inyección en el que se inyectan scripts maliciosos en sitios web por lo demás benignos y de confianza.
: Consulta [XSS en OWASP][3].

Inyección de lenguaje de consulta estructurado (SQLi, Inyección SQL)
: Tipo de ataque de inyección en el que se ejecuta una consulta SQL a través de los datos introducidos en la aplicación por el cliente. Los comandos SQL se inyectan en la entrada del plano de datos para afectar a la ejecución de comandos SQL predefinidos. Una inyección SQL exitosa puede leer datos confidenciales de la base de datos, modificar datos de la base de datos (Insertar/Actualizar/Borrar), ejecutar operaciones de administración en la base de datos (como apagar el DBMS), recuperar el contenido de un archivo dado presente en el sistema de archivos del DBMS y, en algunos casos, enviar comandos al sistema operativo.
: **Relacionado**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - Similar a SQLi pero para Cassandra Query Language y NoSQL.
: Consulta [Inyección SQL en OWASP][4].

Falsificación de solicitudes del lado del servidor (SSRF)
: Vulnerabilidad en la que una aplicación web obtiene acceso a un recurso remoto sin validar la URL proporcionada por el usuario. Permite a un atacante forzar a la aplicación a enviar una solicitud manipulada a un destino inesperado, incluso cuando está protegida por un cortafuegos, VPN u otro tipo de lista de control del acceso (ACL) a la red.
: Consulta [Falsificación de solicitudes del lado del servidor en OWASP][5].

Inclusión local de archivos (LFI)
: Vulnerabilidad que permite a un atacante incluir un archivo localmente presente en el servidor durante el procesamiento de la solicitud. En la mayoría de los casos, esto permite al atacante leer información confidencial almacenada en archivos del servidor. En casos más graves, la explotación puede conducir a una secuencia de comandos en sitios cruzados o una ejecución remota del código.
: Ver [Testing for LFI en OWASP][6].

Inclusión remota de archivos (RFI)
: Vulnerabilidad similar a la inclusión local de archivos, pero que permite a un atacante incluir un archivo remoto durante el procesamiento de la solicitud. Los archivos utilizados en los ataques de inclusión remota de archivos suelen contener código malicioso para PHP, JSP o tecnologías similares.

Ejecución remota de código (RCE)
: Vulnerabilidad que permite a un atacante ejecutar código en una máquina de forma remota.

Object-Graph Navigation Language Injection (OGNLi)
: Vulnerabilidad que permite a un atacante ejecutar su propia expresión OGNL en una aplicación Java, lo que suele conducir a la ejecución remota del código.
: Consulta [OGNLi en OWASP Top 10][7].



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /es/agent/remote_config/
[10]: /es/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /es/security/application_security/threats/inapp_waf_rules
[13]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&product=appsec&view=signal
[14]: /es/security/application_security/threats/add-user-info/
[15]: /es/security/application_security/threats/trace_qualification/
[16]: /es/security/application_security/threats/threat-intelligence/
[17]: /es/security/application_security/threats/attacker-explorer/