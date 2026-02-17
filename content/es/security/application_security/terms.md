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
  text: Acelerar las investigaciones de seguridad con la información sobre amenazas
    de Datadog
title: Términos y conceptos
---

Datadog App and API Protection supervisa las amenazas y ofrece protección contra los ataques a nivel de aplicación que pretenden explotar las vulnerabilidades a nivel de código. Aprovecha el contexto de ejecución del código en tiempo de ejecución, traza y los datos de errores, así como la atribución al usuario.

## Condiciones generales de App and API Protection

Intento de ataque
: Qué regla de seguridad ha sido activada por la traza.

Biblioteca de Datadog
: _también_ rastreador, biblioteca de rastreo
: una biblioteca específica del lenguaje de programación incrustada en aplicaciones web. Datadog App and API Protection utiliza la biblioteca para monitorizar y proteger. APM utiliza la misma biblioteca para instrumentar código para rastrear telemetría.

Regla de detección
: Definición de lógica condicional que se aplica a los datos ingeridos y a las configuraciones de la nube. Cuando coincide al menos un caso definido en una regla durante un periodo de tiempo determinado, Datadog genera una _señal de seguridad_.
: Consulta [Reglas de detección][10].

Lista de permisos (antiguo filtro de exclusión)
: Mecanismo para descartar las trazas de seguridad marcadas por la biblioteca de Datadog App and API Protection y las reglas WAF en la aplicación. La lista de permisos se aplica a medida que las solicitudes se ingieren en Datadog (admisión), y ayuda a gestionar los falsos positivos y los costes de admisión.
: Consulta [Filtros de exclusión][11] en la aplicación.

Reglas WAF en la aplicación (antiguas reglas de eventos)
: Conjunto de reglas que se ejecutan en las bibliotecas de Datadog para detectar las actividades de seguridad. Incluyen patrones del firewall de aplicaciones web (WAF) que monitorizan los intentos de explotar las vulnerabilidades conocidas.
: Consulta [Reglas WAF en la aplicación][12].

Configuración remota
: Mecanismo de la plataforma Datadog que habilita la actualización remota de la configuración del Agent. Es utilizada por Datadog App and API Protection para actualizar las reglas WAF en la aplicación, activar el producto y bloquear a los atacantes.
: Consulta [Cómo funciona la configuración remota][8].

Servicio
: Una única aplicación web, microservicio, API o función. Normalmente sirve a una función empresarial.

Señal
: Detección de un ataque a una aplicación que afecta a los servicios. Las señales identifican amenazas significativas para que se puedan revisar y darles un tratamiento de alta prioridad.
: Consulta [Explorador de señales][13] en la aplicación.

Gravedad
: Indicador de la rapidez con la que se debe clasificar y abordar un intento de ataque. Se basa en una combinación de factores, incluido el impacto potencial y el riesgo del ataque. Los valores son Crítico, Alto, Medio, Bajo, Información.

Traza de seguridad
: Rastreo distribuido cuya actividad de seguridad ha sido marcada por reglas WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

Solicitud sospechosa
: Rastreo distribuido cuya actividad de seguridad ha sido marcada por reglas WAF en la aplicación. La traza subyacente se comparte con APM, lo que permite investigaciones más profundas y rápidas.

Asignación a usuarios
: Mecanismo que asigna las solicitudes sospechosas a usuarios  que son conocidos en tus sistemas.
: Consulta [Rastreo de la actividad del usuario][14].

Vulnerabilidad
: Riesgo pasivo de una aplicación. De [OWASP][1]: "Una vulnerabilidad es un hueco o una debilidad en la aplicación. Puede ser un defecto de diseño o un error de implementación que permite a un atacante causar daño a las partes interesadas de una aplicación. Las partes interesadas incluyen al propietario de la aplicación, a los usuarios de la aplicación y a otras entidades que dependen de la aplicación."

Calificación de trazas
: Proceso mediante el cual Datadog ayuda a comprender el impacto de las trazas, etiquetándolas
como `Harmful Safe or Unknown`.
: Consulta [Calificación de trazas][15].

Información sobre amenazas
: Conjunto de reglas que se ejecutan en las bibliotecas de Datadog para detectar las amenazas. Incluyen patrones del firewall de aplicaciones web (WAF) que monitorizan los intentos de explotar las vulnerabilidades conocidas.
: Consulta [Información sobre amenazas][16].

atacantes sospechosos
: un precursor de las IPs marcadas. Las IPs sospechosas han alcanzado un umbral mínimo de tráfico de ataque para ser clasificadas como sospechosas, pero no el umbral para Flagged (Marcadas). Los umbrales no son configurables por el usuario.
: Consulta [Attackers Explorer][17]

atacantes marcados
: IPs que envían grandes cantidades de tráfico de ataque. Se recomienda revisar y bloquear las IPs marcadas. Los umbrales no son configurables por el usuario.
: Consulta [Attackers Explorer][17]

huella digital del atacante
: identificadores calculados a partir de las características de la solicitud para rastrear a un atacante a través de múltiples solicitudes.
: ver [Huella digital del atacante][18]

clúster atacante
: Conjunto de atributos que identifican a un atacante en un ataque distribuido.
: Ver [Agrupación ern clústeres de atacantes][19]

## Términos de ataques y vulnerabilidades conocidas

Open Web App and API Protection Project (OWASP)
: Una fundación sin ánimo de lucro con varios proyectos para mejorar la seguridad de las aplicaciones web. OWASP es más conocida por el [OWASP Top 10][2], un amplio consenso sobre los riesgos de seguridad más críticos para las aplicaciones web.

Secuencia de comandos en sitios cruzados o Cross-Site Scripting (XSS)
: Tipo de ataque de inyección en el que se inyectan scripts maliciosos en sitios web por lo demás benignos y de confianza.
: Consulta [XSS en OWASP][3].

Inyección de lenguaje de consulta estructurado (SQLi, Inyección SQL)
: Tipo de ataque de inyección en el que se ejecuta una consulta SQL a través de los datos que el cliente ha introducido en la aplicación. Los comandos SQL se inyectan en la entrada del plano de datos para afectar a la ejecución de los comandos SQL predefinidos. Una correcta inyección SQL puede leer datos confidenciales de la base de datos, modificarlos (Insertar/Actualizar/Borrar), ejecutar operaciones de administración (como apagar el DBMS), recuperar el contenido de un archivo dado presente en el sistema de archivos del DBMS y, en algunos casos, enviar comandos al sistema operativo.
: **Relacionado**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - Similar a SQLi pero para Cassandra Query Language y NoSQL.
: Consulta [Inyección SQL en OWASP][4].

Falsificación de solicitudes del lado del servidor (SSRF)
: Vulnerabilidad en la que una aplicación web obtiene acceso a un recurso remoto sin validar la URL proporcionada por el usuario. Permite a un atacante forzar a la aplicación a enviar una solicitud manipulada a un destino inesperado, incluso cuando está protegida por un cortafuegos, VPN u otro tipo de lista de control del acceso (ACL) a la red.
: Consulta [Falsificación de solicitudes del lado del servidor en OWASP][5].

Inclusión local de archivos (LFI)
: Vulnerabilidad que permite a un atacante incluir un archivo localmente presente en el servidor durante el procesamiento de la solicitud. En la mayoría de los casos, esto permite al atacante leer información confidencial almacenada en los archivos del servidor. En los casos más graves, la explotación puede conducir a una secuencia de comandos en sitios cruzados (cross-site scripting) o a una ejecución remota del código.
: Consulta [Tests para LFI en OWASP][6].

Inclusión remota de archivos (RFI)
: Vulnerabilidad similar a la inclusión local de archivos, pero que permite a un atacante incluir un archivo remoto durante el procesamiento de la solicitud. Los archivos utilizados en los ataques de inclusión remota de archivos suelen contener un código malicioso para PHP, JSP o tecnologías similares.

Ejecución remota de código (RCE)
: Vulnerabilidad que permite a un atacante ejecutar un código en una máquina de forma remota.

Inyección de OGNLi (Object-Graph Navigation Language Injection)
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
