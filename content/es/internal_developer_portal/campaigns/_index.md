---
further_reading:
- link: /internal_developer_portal/scorecards/
  tag: Documentación
  text: Documentación de Scorecards
title: Campañas
---

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Únete a la vista previa de Campañas" >}}
{{< /callout >}}

{{< img src="/tracing/software_catalog/campaign-manage.png" alt="Lista de campañas en el portal de desarrollo interno" style="width:90%;" >}}

## Información general

Las campañas te permiten coordinar iniciativas de ingeniería a corto plazo agrupando reglas de [scorecard][1] bajo un objetivo compartido y realizando un seguimiento de la adopción entre entidades y equipos.

Mientras que los Scorecards definen las mejores prácticas a largo plazo, las campañas te ayudan a centrar tus esfuerzos en iniciativas con plazos concretos, como migraciones en tiempo de ejecución, correcciones de seguridad u optimización de costes. Puedes fijar una fecha límite, seleccionar reglas de seguimiento y monitorizar la finalización entre equipos.

Utiliza la [pestaña **Campañas** de la página Scorecards][2] para: 
- Ver campañas activas y pasadas
- Seguir el progreso por norma, equipo o estado
- Seguir directamente a los equipos desde la interfaz 

Si tu servicio forma parte de una campaña, las normas y plazos relacionados aparecen en la pestaña **Scorecards** de la entidad en Software Catalog, y en la página de la entidad en la sección **Scorecards**. Esta visibilidad permite a los equipos actuar sobre los objetivos de la campaña sin depender de recordatorios manuales o documentación externa.

## Crear una campaña

Crea y gestiona campañas desde la pestaña [**Campaings** (Campañas) de Scorecards][2]. 

{{< img src="/tracing/software_catalog/campaign-creation.png" alt="Página de creación de campañas con los campos rellenados" style="width:90%;" >}}

### 1. Definir los metadatos de la campaña

Brinda la siguiente información:
- **Nombre**: un título corto y descriptivo (por ejemplo, "Migrar a las acciones de GitHub").
- **Clave**: un identificador único para la campaña (autogenerado por defecto).
- **Descripción**: un breve resumen del objetivo de la campaña
- **Propietario**: el equipo responsable de impulsar la campaña
- **Fecha de inicio y de finalización**: el calendario de la campaña (la fecha de finalización es opcional)
- **Ámbito**: entidades a las que se aplica la campaña (por ejemplo, `kind:service AND tier:1`)

### 2. Seleccionar reglas de Scorecard

Añade una o varias [reglas existentes en scorecard][3] que se ajusten al objetivo de tu campaña.

### 3. Definir la orientación

Para cada regla, incluye opcionalmente: 
- Documentación vinculada
- Flujos de trabajo a través de [Workflow Automation][4] para corregir automáticamente las reglas que fallan
- Pasos que debe seguir los equipos para cumplir la normativa

## Seguimiento del progreso de la campaña

Después de crear una campaña, utiliza la página de la campaña para monitorizar la adopción y el seguimiento según sea necesario.

{{< img src="/tracing/software_catalog/campaign-details.png" alt="Página de la campaña que resalta los detalles de campaña, el progreso y los próximos pasos" style="width:90%;" >}}

Desde la página de la campaña, puedes:
- Ver la finalización global y el progreso por equipo o regla
- Filtro para encontrar entidades, equipos, o reglas que siguen fallando
- Comparación de los índices de adopción entre equipos
- Ver las tendencias de progreso a lo largo del tiempo
- Envía actualizaciones o crea tiques de seguimiento directamente desde la página

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/scorecards/
[2]: https://app.datadoghq.com/software/scorecards?activeTab=campaigns
[3]: /es/internal_developer_portal/scorecards/custom_rules#create-custom-rules
[4]: /es/actions/workflows/