---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: Blog
  text: Mitigar las vulnerabilidades de las bibliotecas de terceros con Datadog Software
    Composition Analysis
title: Automatizar la reducción de riesgos de código abierto con Datadog SCA
---

Datadog Software Composition Analysis (SCA) te permite identificar, priorizar y resolver fácilmente vulnerabilidades y otros riesgos en las bibliotecas de software de código abierto (OSS) de terceros utilizadas en tus servicios de aplicación.

Este tema describe cómo utilizar SCA para ver y resolver vulnerabilidades y riesgos en tus bibliotecas de código abierto.

## Beneficios de SCA

SCA aborda los siguientes riesgos asociados a las bibliotecas de código abierto:

- **Vulnerabilidades de seguridad:** vulnerabilidades conocidas, en particular las que tienen CVE (vulnerabilidades y exposiciones comunes).
- **Malware:** actores maliciosos que utilizan técnicas como el typosquatting y el hijacking para distribuir programas maliciosos.
- **Problemas de licencias:** el incumplimiento de diversas licencias de código abierto puede acarrear problemas legales.
- **Bibliotecas obsoletas:** el uso de componentes obsoletos puede introducir vulnerabilidades sin parche y problemas de compatibilidad.
- **Bibliotecas sin mantenimiento:** la falta de desarrollo activo puede dar lugar a errores no resueltos y fallos de seguridad.
- **Limpieza de seguridad escasa:** algunos proyectos carecen de prácticas recomendadas en materia de seguridad, como la revisión adecuada del código.

Datadog SCA ayuda a automatizar los procesos de reducción de riesgos, mejorando la productividad de las siguientes maneras:

- **Integración a lo largo del ciclo de vida del desarrollo:** analiza los componentes de código abierto y de terceros, proporcionando un catálogo detallado de bibliotecas.
- **Evaluación continua:** ofrece visibilidad en tiempo real de servicios desplegados, mejorando la postura de seguridad al permitir la priorización de vulnerabilidades en entornos confidenciales.
- **Colaboración:** rompe silos e involucra a más equipos en seguridad (DevOps, Operaciones, SREs), fomentando una cultura de colaboración.


## Consulta las bibliotecas utilizadas en tus servicios

El Catálogo de bibliotecas muestra las bibliotecas y las versiones utilizadas en tus servicios. 

El catálogo muestra todos los detalles de biblioteca utilizando varias fuentes de datos públicas (GuardDog, NIST, osv.dev, puntuaciones OpenSSF, etc.) y privadas (incluido el grupo de Investigación de seguridad de Datadog). 

Para utilizar el catálogo de bibliotecas, consulta [bibliotecas][1] o selecciona **Security > Application Security > Catalogs > Libraries** (Seguridad > Seguridad de aplicaciones > Catálogos > Bibliotecas).

{{< img src="/security/application_security/software_composition_analysis/libraries_catalog.png" alt="Dashboard del Catálogo de bibliotecas" style="width:100%;" >}}


En el catálogo de bibliotecas, puedes:

- Ver todas las bibliotecas utilizadas en cada uno de tus servicios.
- En **View** (Vista), selecciona **Runtime** (Tiempo de ejecución) para ver bibliotecas detectadas en tiempo de ejecución.
- En **View** (Vista), selecciona **Static** (Estático) para ver bibliotecas detectadas en tus repositorios de código fuente.
- Utiliza la faceta **Vulnerability Severity** (Gravedad de la vulnerabilidad) para filtrar bibliotecas según el grado de vulnerabilidad.
- Consulta el repositorio de fuentes de cada biblioteca.
- Consulta los detalles de biblioteca, como la versión actual utilizada en un servicio y la última versión disponible.
- Consulta la [planilla OpenSSF][2] de la biblioteca.


## Ver vulnerabilidades y riesgos en bibliotecas

En el explorador de **Vulnerabilities** (Vulnerabilidades), puedes ver las vulnerabilidades y riesgos de las bibliotecas que estás utilizando.

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities.png" alt="Dashboard de vulnerabilidades de bibliotecas" style="width:100%;" >}}

### Vulnerabilidades de biblioteca

Una vulnerabilidad de biblioteca es un fallo de seguridad en una biblioteca. 

Para ver tus vulnerabilidades de biblioteca, consulta [Vulnerabilidades de biblioteca][3] o navega hasta **Security > Vulnerabilities > Library Vulnerabilities** (Seguridad > Vulnerabilidades > Vulnerabilidades de biblioteca).

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_detail.png" alt="Ejemplo de vulnerabilidad de biblioteca ampliada en un dashboard" style="width:100%;" >}}

En **Library Vulnerabilities** (Vulnerabilidades de biblioteca), puedes:

- Utilizar la faceta **Vulnerability** (Vulnerabilidad) para ver los distintos tipos de vulnerabilidad.
  - Por ejemplo, cada vulnerabilidad tiene un ID de CVE asociado, que se muestra en el explorador y en cada detalle de biblioteca. Puedes utilizar la faceta Vulnerabilidad para ordenar por ID de CVE. 
- Ver detalles de vulnerabilidad como:
  - Explicación
  - Servicio y entorno
  - Primera y última detección
  - Ventana de exposición
  - Desglose por gravedad
  - Pasos de correcció

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_remediation_steps.png" alt="Pasos de corrección de vulnerabilidad de bibliotecas" style="width:100%;" >}}

### Riesgos de biblioteca

Los riesgos de biblioteca son un grupo de debilidades que no están directamente relacionadas con la seguridad. Por ejemplo, la biblioteca está obsoleto, la licencia del proyecto es demasiado restrictiva o el equipo sigue malas prácticas de seguridad.

Para ver tus riesgos en biblioteca, consulta [Riesgos de biblioteca][4] o selecciona **Security > Vulnerabilities > Library Risks** (Seguridad > Vulnerabilidades > Riesgos de biblioteca)

{{< img src="/security/application_security/software_composition_analysis/library_risks.png" alt="Ejemplo de riesgos de biblioteca" style="width:100%;" >}}

En Riesgos de biblioteca, puedes:
- En **View** (Vista), selecciona **Runtime** (Tiempo de ejecución) para ver riesgos detectados en tiempo de ejecución.
- En **View** (Vista), selecciona **Static** (Estático) para ver riesgos detectados en tus repositorios de código fuente.
- Ver detalles de riesgo como:
  - Explicación
  - Servicio y entorno
  - Primera y última detección
  - Ventana de exposición
  - Desglose por gravedad


## Buenas prácticas para mitigar los riesgos

Para mitigar los riesgos, sigue estas prácticas recomendadas:

   - **Diligencia debida:** evalúa a fondo los proyectos de código abierto antes de utilizarlos.
   - **Mantente al día:** actualiza regularmente los componentes y suscríbete a los avisos de seguridad.
   - **Gestión de vulnerabilidades:** establece procesos para clasificar y corregir vulnerabilidades.
   - **Medición:** realiza un seguimiento de métricas para comprender y mejorar la postura de seguridad a lo largo del tiempo.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/libraries
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library
[4]: https://app.datadoghq.com/security/appsec/vm/library-risk