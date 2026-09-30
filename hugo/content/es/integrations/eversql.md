---
app_id: eversql
app_uuid: bc900600-d0cf-4ddf-83b7-cdaba44d1525
assets: {}
author:
  homepage: https://eversql.com
  name: EverSQL
  sales_email: sales@eversql.com
  support_email: support@eversql.com
categories:
- automatización
- almacenes de datos
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eversql/README.md
display_on_public_website: true
draft: false
git_integration_title: eversql
integration_id: eversql
integration_title: 'EverSQL: Ajuste de las bases de datos'
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eversql
public_title: 'EverSQL: Ajuste de las bases de datos'
short_description: Ajuste automático de SQL y de las bases de datos para MySQL, PostgreSQL
  y Aurora
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Category::Data Stores
  - Categoría::Herramientas de desarrollo
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Ajuste automático de SQL y de las bases de datos para MySQL, PostgreSQL
    y Aurora
  media:
  - caption: Optimización de SQL EverSQL
    image_url: images/1.png
    media_type: imagen
  - caption: Diferencia de consultas EverSQL
    image_url: images/2.png
    media_type: imagen
  - caption: Bases de datos compatibles con EverSQL
    image_url: images/3.png
    media_type: imagen
  - caption: Sistemas operativos compatibles con EverSQL
    image_url: images/4.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: 'EverSQL: Ajuste de las bases de datos'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[EverSQL][1] es una forma de acelerar tu base de datos y optimizar las consultas SQL, proporcionando ajuste e indexación SQL automáticos para desarrolladores, DBA e ingenieros DevOps.

EverSQL no es intrusivo y no accede a ninguno de los datos confidenciales de tus bases de datos.

### Utilización

Las consultas SQL lentas encontradas en el dashboard de monitorización de bases de datos de Datadog se pueden optimizar utilizando EverSQL. Copia la consulta SQL lenta de Datadog y pégala directamente en el proceso de [optimización SQL][2] de EverSQL. Obtén más información para solucionar consultas lentas en la guía [Empezando con la monitorización de bases de datos][3].

### Bases de datos compatibles: 
MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona, MariaDB.

## Configuración

### Configuración
Para acelerar las consultas SQL lentas identificadas por Datadog:
1. Ve al dashboard de [monitorización de bases de datos de Datadog][4] y busca la tabla de consultas SQL lentas.
2. Añade un filtro para la base de datos correspondiente y ordena según una métrica de rendimiento relevante, como la Latencia media.
3. Una vez identificada la consulta SQL que quieres acelerar, cópiala de Datadog.
4. Ve a [EverSQL][2] y pega la consulta SQL como parte del proceso de optimización de consultas.
5. A partir del informe de optimización, copia y crea los índices óptimos en tu base de datos.
6. Copia la consulta optimizada reescrita en el código de tu aplicación.

## Datos recopilados

### Métricas

EverSQL no incluye métricas.

### Checks de servicio

EverSQL no incluye checks de servicio.

### Eventos

EverSQL no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de EverSQL][5].

[1]: https://www.eversql.com/
[2]: https://www.eversql.com/sql-query-optimizer/
[3]: https://docs.datadoghq.com/es/getting_started/database_monitoring/#troubleshoot-a-slow-query
[4]: https://app.datadoghq.com/databases/
[5]: https://eversql.freshdesk.com/support/tickets/new