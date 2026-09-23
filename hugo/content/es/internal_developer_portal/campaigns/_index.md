---
description: Coordine iniciativas de ingeniería con límite de tiempo agrupando reglas
  de Scorecard bajo un objetivo compartido y realizando un seguimiento de la adopción
  en todas las entidades y equipos.
further_reading:
- link: /internal_developer_portal/scorecards/
  tag: Documentación
  text: Documentación de Scorecards
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: Blog
  text: Coordine iniciativas de ingeniería a gran escala con las Campañas de IDP
site_support_id: idp
title: Campañas
---
{{< img src="/tracing/software_catalog/campaign-manage.png" alt="Lista de campañas en Internal Developer Portal" style="width:90%;" >}}

## Descripción general {#overview}

Las campañas le permiten coordinar iniciativas de ingeniería a corto plazo agrupando reglas de [Scorecard][1] bajo un objetivo compartido y realizando un seguimiento de la adopción en todas las entidades y equipos. 

Mientras que los Scorecards definen las mejores prácticas a largo plazo, las campañas le ayudan a concentrar los esfuerzos en iniciativas con límite de tiempo, como migraciones en tiempo de ejecución, correcciones de seguridad u optimización de costos. Puede establecer una fecha límite, seleccionar reglas para realizar un seguimiento y hacer un seguimiento de la finalización en todos los equipos.

Utilice la [**pestaña Campaigns** en la página de Scorecards][2] para: 
- Visualizar campañas activas y pasadas
- Realice un seguimiento del progreso por regla, equipo o estado
- Dar seguimiento a los equipos directamente desde la interfaz 

Si su servicio es parte de una campaña, las reglas y fechas límite relacionadas aparecen en la pestaña **Scorecards** de la entidad en el Service Catalog, y en la página de la entidad en la sección **Scorecards**. Esta visibilidad permite a los equipos actuar sobre los objetivos de la campaña sin depender de recordatorios manuales o documentación externa.

## Creación de una campaña {#creating-a-campaign}

Cree y administre campañas desde la pestaña [**Campaigns** en Scorecards][2]. 

**Nota:** La creación de una campaña requiere los permisos de Service Catalog Write y Work Management Write. 

{{< img src="/tracing/software_catalog/campaign-creation.png" alt="Página de creación de campañas con campos completados" style="width:90%;" >}}

### 1. Defina los metadatos de la campaña {#1-define-campaign-metadata}

Proporcione la siguiente información:
- **Nombre**: Un título breve y descriptivo (por ejemplo, "Migrar a GitHub Actions")
- **Clave**: Un identificador único para la campaña (generado automáticamente de forma predeterminada)
- **Descripción**: Un breve resumen del objetivo de la campaña
- **Propietario**: El equipo responsable de impulsar la campaña
- **Fecha de inicio y finalización**: El cronograma de la campaña (la fecha de finalización es opcional)
- **Contexto**: Entidades a las que se aplica la campaña (por ejemplo, `kind:service AND tier:1`)

### 2. Seleccione las reglas de Scorecard {#2-select-scorecard-rules}

Agregue una o más [reglas de Scorecard existentes][3] que se alineen con el objetivo de su campaña.

### 3. Defina la guía {#3-define-guidance}

Para cada regla, incluya opcionalmente: 
- Documentación vinculada
- Flujos de trabajo a través de [Workflow Automation][4] para corregir automáticamente las reglas que no se cumplen
- Pasos que los equipos deben seguir para cumplir con la normativa

## Seguimiento del progreso de la campaña {#tracking-campaign-progress}

Después de crear una campaña, utilice la página de la campaña para hacer un seguimiento de la adopción y dar seguimiento según sea necesario.

{{< img src="/tracing/software_catalog/campaign-details.png" alt="Página de la campaña que destaca los detalles, el progreso y los próximos pasos de la campaña" style="width:90%;" >}}

Desde la página de la campaña, usted puede: 
- Visualice la finalización y el progreso general por equipo o regla
- Filtrar para encontrar entidades, equipos o reglas que aún no cumplen con los requisitos
- Comparar las tasas de adopción entre equipos
- Visualice tendencias de progreso a lo largo del tiempo
- Envíe actualizaciones o cree tickets de seguimiento directamente desde la página

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/scorecards/
[2]: https://app.datadoghq.com/software/scorecards?activeTab=campaigns
[3]: /es/internal_developer_portal/scorecards/custom_rules#create-custom-rules
[4]: /es/actions/workflows/