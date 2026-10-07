---
description: Cree, pruebe y refine alertas de seguimiento de forma segura sin activar
  notificaciones mediante los borradores de seguimiento.
further_reading:
- link: monitors/
  tag: Documentación
  text: 'Seguimientos y Alerting: descripción general'
- link: monitors/configuration/?tab=thresholdalert
  tag: Documentación
  text: Configure seguimientos.
- link: monitors/manage/
  tag: Documentación
  text: Administre seguimientos.
title: Borradores de seguimiento
---
## Descripción general {#overview}

Los borradores de seguimiento le permiten crear, refinar y probar alertas de forma segura sin activar notificaciones. 

Ya sea que esté experimentando con umbrales, iterando en consultas complejas o colaborando con compañeros de equipo, los borradores de seguimiento le brindan un espacio limpio y aislado para trabajar, libre del ruido de los seguimientos de prueba o sin terminar. Además, los borradores de seguimiento ayudan a reducir la fatiga por alertas durante el desarrollo y garantizan que solo los seguimientos completamente validados se publiquen. 

Ideales para ingenieros y SRE que gestionan flujos de trabajo de alertas, los borradores de seguimiento brindan claridad entre múltiples equipos y un camino seguro desde la idea hasta una alerta confiable.

## Cree un borrador de seguimiento {#create-a-draft-monitor}

Para crear y almacenar seguimientos en estado de borrador:

1. Navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][1].  
2. [Configure el seguimiento][2] (añada su consulta, especifique las condiciones y, opcionalmente, establezca las notificaciones). Los identificadores de notificación establecidos en un borrador solo se utilizan después de publicar el seguimiento. 
3. Haga clic en {{< ui >}}Save as Draft{{< /ui >}}. No se envían alertas desde este borrador de seguimiento.

{{< img src="/monitors/draft/save_as_draft.png" alt="Botón Guardar como borrador en la interfaz de creación de seguimiento" style="width:100%;" >}}

## Publique un borrador de seguimiento {#publish-a-draft-monitor}

Cuando su seguimiento esté listo:

1. Abra el borrador desde [{{< ui >}}Monitors List{{< /ui >}}][3] usando la faceta de estado de borrador o filtre por `status:draft`.  
2. Revise la configuración.  
3. Haga clic en {{< ui >}}Publish Monitor{{< /ui >}}.  
4. Esto publica su seguimiento y comienza Alerting según sus condiciones.

## Administrar borradores de seguimiento {#manage-draft-monitors}

<!-- TODO Add image of Monitors List filtered to view drafts, and final QA of instructions with UI-->

Encuentre borradores de seguimiento desde [{{< ui >}}Monitors List{{< /ui >}}][3] usando la faceta de estado de borrador o filtre por `draft_status:draft`. Los borradores aparecen con una etiqueta {{< ui >}}Draft{{< /ui >}} en la página de estado del seguimiento y en la lista de seguimientos. Los borradores caducan después de 6 meses sin actualizaciones, pero puede eliminar borradores de seguimiento en cualquier momento.

## Permisos {#permissions}

Cualquier persona con [permisos de edición][4] puede actualizar un borrador de seguimiento. Puede usar eventos para obtener una vista previa de la frecuencia con la que se habría activado el seguimiento sin enviar notificaciones reales.

El permiso **Draft Monitors Write** permite a los usuarios administrar borradores de seguimiento sin el permiso más amplio **Monitors Write**. Otorgue este permiso a los usuarios que necesiten trabajar en borradores sin modificar los seguimientos publicados.

Un usuario que solo tenga el permiso **Draft Monitors Write** puede:

- Crear un seguimiento, siempre y cuando se guarde con `draft_status` establecido en `draft`.
- Editar un borrador de seguimiento existente, siempre y cuando la edición no cambie `draft_status` de `draft`.
- Eliminar un borrador de seguimiento que haya creado, o un borrador de seguimiento de un equipo al que pertenezca.

Un usuario que solo tenga el permiso **Draft Monitors Write** no puede:

- Publicar borradores de seguimiento.
- Editar o eliminar seguimientos publicados.

Estos permisos se aplican tanto en la interfaz de usuario como en la API de Datadog.

## Mejores prácticas {#best-practices}

* **Utilice borradores para revisiones por pares:** Colabore antes de publicar los cambios.  
* **Evite el ruido en producción:** Pruebe las condiciones de alerta de forma segura primero en un borrador.  
* **Haga un seguimiento de su trabajo:** Utilice nombres y etiquetas claros para los borradores de seguimiento durante el desarrollo.  
* **Limite los borradores de seguimiento obsoletos:** Revise y limpie los borradores de seguimiento antiguos para reducir el desorden.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://docs.datadoghq.com/es/monitors/configuration/?tab=thresholdalert
[3]: https://app.datadoghq.com/monitors/manage
[4]: /es/monitors/configuration/?tab=thresholdalert#permissions