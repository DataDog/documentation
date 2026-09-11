---
aliases:
- /es/security/application_security/guide/automate_risk_reduction_sca/
disable_toc: false
title: Automatizar la reducción de riesgos de código abierto con Datadog SCA
---

Datadog Software Composition Analysis (SCA) te permite identificar, priorizar y resolver fácilmente vulnerabilidades y otros riesgos en las bibliotecas de software de código abierto (OSS) de terceros utilizadas en tus repositorios y servicios de aplicación.

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

- **Integración a lo largo del ciclo de vida del desarrollo:** analiza los componentes de código abierto y de terceros, desde el desarrollo hasta la producción, proporcionando un inventario detallado de librerías.
- **Evaluación continua:** ofrece visibilidad en tiempo real de servicios desplegados, mejorando la postura de seguridad al permitir la priorización de vulnerabilidades en entornos confidenciales.
- **Colaboración:** rompe silos e involucra a más equipos en seguridad (DevOps, Operaciones, SREs), fomentando una cultura de colaboración.


## Consulta las bibliotecas utilizadas en tus servicios

El inventario de librerías muestra los bibliotecas y las versiones utilizadas en tus servicios y repositorios.

El inventario muestra todos los detalles de librería utilizando varias fuentes de datos públicas (como GuardDog, NIST, osv.dev, puntuaciones OpenSSF, etc.) y privadas (incluido el grupo de Investigación de seguridad de Datadog).

Para utilizar el inventario de librerías, consulta [Bibliotecas][1] o selecciona **Security > Code Security** (Seguridad > Seguridad del código) y elige **Bibliotecas**.

En **Bibliotecas**, puedes:

- Ver todas las bibliotecas utilizadas en cada uno de tus servicios.
- Utilizar la faceta **Gravedad en Datadog** para filtrar bibliotecas según el grado de vulnerabilidad.
- Consulta el repositorio de fuentes de cada biblioteca.
- Consulta los detalles de librería, como la versión actual utilizada en un servicio y la última versión disponible.
- Consulta la [planilla OpenSSF][2] de la librería.


## Ver vulnerabilidades y riesgos en bibliotecas

En el explorador de **Vulnerabilidades**, puedes ver las vulnerabilidades de las bibliotecas que estás utilizando.

### Vulnerabilidades de librería

Una vulnerabilidad de librería es un fallo de seguridad en una biblioteca.

Para ver las vulnerabilidades de tu biblioteca, consulta [Vulnerabilidades de librerías][3] o ve a **Security > Code Security > Vulnerabilities > Libraries** (Seguridad > Seguridad del código > Vulnerabilidades).

En **Bibliotecas**, puedes:

- Utilizar **bibliotecas** para ver los diferentes tipos de vulnerabilidades.
  - Por ejemplo, cada vulnerabilidad tiene un ID de CVE asociado, que se muestra en el explorador y en cada detalle de librería. Puedes utilizar la faceta Vulnerabilidad para ordenar por ID de CVE.
- Ver detalles de vulnerabilidad como:
  - Explicación
  - Servicio y entorno
  - Primera y última detección
  - Ventana de exposición
  - Desglose por gravedad
  - Pasos de correcció

<!-- ### Riesgos de las bibliotecas

Los riesgos de una biblioteca son un grupo de vulnerabilidades que no están directamente ligadas a la seguridad. Por ejemplo, la librería está obsoleta, la licencia del proyecto es demasiado restrictiva o el equipo sigue prácticas recomendadas muy básicas

Para ver los riesgos de tu biblioteca, consulta [Riesgos de librerías][4] o ve a **Security > Inventory  > Libraries** (Seguridad > Inventario > Bibliotecas).

En **Bibliotecas**, puedes:
- En **Vista**, seleccionar **Tiempo de ejecución**, para ver los riesgos detectados en tiempo de ejecución.
- - En **Vista**, seleccionar **Static**, para ver los riesgos detectados en tus repositorios de código fuente.
- Visualizar detalles de riesgos como:
  - Explicación
  - Servicio y entorno
  - Primera y última detección
  - Lapso de exposición
  - Desglose de la gravedad -->


## Buenas prácticas para mitigar los riesgos

Para mitigar los riesgos, sigue estas prácticas recomendadas:

   - **Diligencia debida:** evalúa a fondo los proyectos de código abierto antes de utilizarlos.
   - **Mantente al día:** actualiza regularmente los componentes y suscríbete a los avisos de seguridad.
   - **Gestión de vulnerabilidades:** establece procesos para clasificar y corregir vulnerabilidades.
   - **Medición:** realiza un seguimiento de métricas para comprender y mejorar la postura de seguridad a lo largo del tiempo.

[1]: https://app.datadoghq.com/security/appsec/vm/summary/sca?query=source%3Alibrary
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library?query=status%3A%28Open%20OR%20%22In%20progress%22%29&group=library
[4]: https://app.datadoghq.com/security/appsec/inventory/libraries?column=uniqueVulnerabilitySeverityScore&detection=runtime&group=library-version&order=desc&page=1
