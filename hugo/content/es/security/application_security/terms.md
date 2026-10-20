---
disable_toc: false
further_reading:
- link: /security/application_security/how-it-works
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/application_security
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: Blog
  text: Acelere las investigaciones de seguridad con Datadog Threat Intelligence
title: Términos y conceptos
---
Datadog App and API Protection monitorea amenazas y brinda protección contra ataques a nivel de aplicación que buscan explotar vulnerabilidades a nivel de código. Aprovecha el contexto de ejecución de código en tiempo de ejecución, los datos de traza y de error, y la atribución de usuario.

## Términos generales de App and API Protection {#general-app-and-api-protection-terms}

intento de ataque
: ¿Qué regla de seguridad fue activada por la traza?

biblioteca de Datadog
: _también_ tracer, SDK
: Una biblioteca específica de lenguaje de programación integrada en aplicaciones web. Datadog App and API Protection utiliza la biblioteca para monitorear y proteger. APM utiliza la misma biblioteca para instrumentar código para telemetría de rastreo.

regla de detección
: Una definición de lógica condicional que se aplica a los datos ingeridos y a las configuraciones en la nube. Cuando al menos una incidencia definida en una regla coincide durante un período de tiempo determinado, Datadog genera una _señal de seguridad_.
: Consulte [Reglas de detección][10].

lista de permitidos (anteriormente filtro de exclusión)
: Un mecanismo para descartar trazas de seguridad marcadas a través de la biblioteca de Datadog App and API Protection y las reglas de In-App WAF. La lista de permitidos se aplica a medida que las solicitudes se ingieren en Datadog (ingesta). La lista de permitidos ayuda a gestionar los falsos positivos y los costos de ingesta.
: Consulte [Filtros de exclusión][11] en la aplicación.

Reglas de In-App WAF (anteriormente reglas de eventos)
: Un conjunto de reglas ejecutadas en las bibliotecas de Datadog para detectar actividad de seguridad. Estas incluyen patrones de Web Application Firewall (WAF) que monitorean intentos de explotar vulnerabilidades conocidas.
: Consulte [Reglas de In-App WAF][12].

Remote Configuration
: Un mecanismo de la plataforma Datadog que permite actualizar la configuración del Agent de forma remota. Utilizado por Datadog App and API Protection para actualizar las reglas de In-App WAF, activar el producto y bloquear a los atacantes.
: Consulte [Cómo funciona Remote Configuration][8].

servicio
: Una sola aplicación web, microservicio, API o función. Por lo general, cumple una función empresarial.

señal
: Una detección de un ataque a una aplicación que afecta a sus servicios. Las señales identifican amenazas significativas para que usted las revise y deben ser clasificadas con alta prioridad.
: Consulte [Explorador de señales][13] en la aplicación.

gravedad
: Un indicador de la rapidez con la que se debe clasificar y abordar un intento de ataque. Se basa en una combinación de factores, incluido el impacto y el riesgo potencial del ataque. Los valores son Crítico, Alto, Medio, Bajo, Información.

traza de seguridad
: Una traza distribuida para la cual la actividad de seguridad ha sido marcada por reglas de WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

solicitud sospechosa
: Una traza distribuida para la cual la actividad de seguridad ha sido marcada por reglas de WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

atribución de usuario
: Un mecanismo que asigna solicitudes sospechosas a usuarios conocidos en sus sistemas.
: Consulte [Seguimiento de la actividad del usuario][14].

vulnerabilidad
: Riesgo pasivo dentro de una aplicación. De [OWASP][1]: \"Una vulnerabilidad es un agujero o una debilidad en la aplicación, que puede ser un defecto de diseño o un error de implementación, que permite a un atacante causar daño a las partes interesadas de una aplicación." Las partes interesadas incluyen al propietario de la aplicación, los usuarios de la aplicación y otras entidades que dependen de la aplicación."

calificación de seguimiento
: El proceso mediante el cual Datadog ayuda a comprender el impacto de las trazas, etiquetándolas
como `Harmful Safe or Unknown`.
: Consulte [Calificación de seguimiento][15].

Inteligencia de amenazas
: Un conjunto de reglas ejecutadas en las bibliotecas de Datadog para detectar amenazas. Estas incluyen patrones de Web Application Firewall (WAF) que monitorean intentos de explotar vulnerabilidades conocidas.
: Consulte [Inteligencia de amenazas][16]

atacantes sospechosos
: Un precursor de las IP marcadas. Las IP sospechosas han alcanzado un umbral mínimo de tráfico de ataque para ser clasificadas como sospechosas, pero no el umbral para ser marcadas. Los umbrales no son configurables por el usuario.
: Consulte [Explorador de atacantes][17]

atacantes marcados
: Las IPs que envían grandes cantidades de tráfico de ataque. Recomendamos revisar y bloquear las IPs marcadas. Los umbrales no son configurables por el usuario.
: Consulte [Explorador de atacantes][17]

huella digital del atacante
: Identificadores calculados a partir de las características de la solicitud para rastrear a un atacante a través de múltiples solicitudes.
: Consulte [Huella digital del atacante][18]

clúster de atacantes
: Un conjunto de atributos que identifica a un atacante a través de un ataque distribuido.
: Consulte [Clustering de atacantes][19]

## Términos de ataques y vulnerabilidades conocidas {#attacks-and-known-vulnerabilities-terms}

Open Web Application Security Project (OWASP)
: Una fundación sin fines de lucro con varios proyectos para mejorar la seguridad de las aplicaciones web. OWASP es más conocida por el [OWASP Top 10][2], un amplio consenso sobre los riesgos de seguridad más críticos para las aplicaciones web.

Cross-Site Scripting (XSS)
: Un tipo de ataque de inyección en el que se inyectan scripts maliciosos en sitios web que, de otro modo, serían benignos y confiables.
: Consulte [XSS en OWASP][3].

Inyección de lenguaje de consulta estructurado (SQLi, inyección SQL)
: Un tipo de ataque de inyección en el que se ejecuta una consulta SQL a través de los datos de entrada del cliente a la aplicación. Los comandos SQL se inyectan en la entrada del plano de datos para afectar la ejecución de comandos SQL predefinidos. Una explotación exitosa de inyección SQL puede leer datos confidenciales de la base de datos, modificar datos de la base de datos (Insertar/Actualizar/Eliminar), ejecutar operaciones de administración en la base de datos (como apagar el DBMS), recuperar el contenido de un archivo determinado presente en el sistema de archivos del DBMS y, en algunos casos, emitir comandos al sistema operativo.
: **Relacionado**: Inyección de lenguaje de consulta Cassandra (CQLi), inyección NoSQL (NoSQLi) - Similar a SQLi pero para el lenguaje de consulta Cassandra y NoSQL.
: Ver [Inyección SQL en OWASP][4].

Falsificación de solicitud del lado del servidor (SSRF)
: Una vulnerabilidad donde una aplicación web obtiene un recurso remoto sin validar la URL proporcionada por el usuario. Permite a un atacante obligar a la aplicación a enviar una solicitud manipulada a un destino inesperado, incluso cuando está protegida por un firewall, VPN u otro tipo de lista de control de acceso (ACL) de red.
: Ver [Falsificación de solicitud del lado del servidor en OWASP][5].

Inclusión de archivos locales (LFI)
: Una vulnerabilidad que permite a un atacante incluir un archivo presente localmente en el servidor durante el procesamiento de la solicitud. En la mayoría de los casos, esto permite al atacante leer información confidencial almacenada en archivos en el servidor. En casos más graves, la explotación puede conducir a secuencias de comandos en sitios cruzados o a la ejecución remota de código.
: Consulte [pruebas de LFI en OWASP][6].

Inclusión de archivos remotos (RFI)
: Una vulnerabilidad similar a la inclusión de archivos locales, pero que permite a un atacante incluir un archivo remoto durante el procesamiento de la solicitud. Los archivos utilizados en los ataques de inclusión de archivos remotos con mayor frecuencia contienen código malicioso para PHP, JSP o tecnologías similares.

Ejecución remota de código (RCE)
: Una vulnerabilidad que permite a un atacante ejecutar código de forma remota en una máquina.

Inyección de lenguaje de navegación de grafos de objetos (OGNLi)
: Una vulnerabilidad que permite a un atacante ejecutar su propia expresión OGNL en una aplicación Java, lo que comúnmente conduce a la ejecución remota de código.
: Ver [OGNLi en OWASP Top 10][7].



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /es/remote_configuration
[10]: /es/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /es/security/application_security/policies/inapp_waf_rules/
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /es/security/application_security/how-it-works/add-user-info/
[15]: /es/security/application_security/how-it-works/trace_qualification/
[16]: /es/security/application_security/how-it-works/threat-intelligence/
[17]: /es/security/application_security/security_signals/attacker-explorer/
[18]: /es/security/application_security/security_signals/attacker_fingerprint/
[19]: /es/security/application_security/security_signals/attacker_clustering/