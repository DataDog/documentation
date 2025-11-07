---
further_reading:
- link: monitors/
  tag: Documentación
  text: Información general de monitores y alertas
- link: monitors/configuration/?tab=thresholdalert
  tag: Documentación
  text: Configurar monitors
- link: monitors/manage/
  tag: Documentación
  text: Gestionar monitores
title: Draft Monitors
---

{{< callout url="#" btn_hidden="true" >}}
Draft Monitors está en vista previa.
{{< /callout >}}

## Información general

Draft Monitors te permite crear, perfeccionar y test alertas de forma segura sin activar notificaciones. 

Tanto si estás experimentando con umbrales, iterando sobre consultas complejas o colaborando con compañeros de equipo, los borradores te ofrecen un espacio limpio y aislado para trabajar, sin el ruido de los monitores inacabados o de test. Además, Draft Monitors ayuda a reducir el cansancio de las alertas durante el desarrollo y garantiza que sólo se publiquen los monitores totalmente aprobados. 

Ideales para ingenieros y SRE que gestionan workflows (UI) / procesos (generic) de alertas, los monitores de borradores proporcionan claridad a todos los múltiples equipos y un camino seguro desde la idea hasta la alerta fiable.

## Crear un monitor (noun) de borrador

Para crear y almacenar monitores en estado borrador:

1. Ve a [**Monitores > Nuevo monitor (noun)**][1].  
2. [Configura el monitor (noun)][2] (añade tu consulta, especifica condiciones y, opcionalmente, configura notificaciones). Las gestiones de notificación configuradas en un borrador sólo se utilizan una vez que se publica el monitor (noun). 
3. Haz clic en **Guardar como borrador**. No se envían alertas desde este monitor (noun) de borrador.

{{< img src="/monitors/draft/save_as_draft.png" alt="El botón Guardar como borrador en la interfaz de creación de un monitor (noun)" style="width:100%;" >}}

## Publicar un monitor (noun) de borrador

Cuando tu monitor (noun) esté listo:

1. Abre el borrador desde [**Lista de Monitores**][3] utilizando la faceta de estado de borrador o filtra por `status:draft`. 
2. Revisa la configuración.  
3. Haz clic en **Publicar monitor (noun).**  
4. Esto publica tu monitor (noun) y comienza a alertar en función de tus condiciones.

## Gestionar monitores de borrador

<!-- TODO Añadir imagen de la Lista de monitores filtrada para ver borradores y el QA final de instrucciones con la interfaz de usuario-->

Busca monitores de borradores en la [**Lista de Monitores**][3] utilizando la faceta de estado de borrador o filtra por `draft_status:draft`. Los borradores aparecen con la etiqueta **Borrador** en la page (página) del estado del monitor (noun) y en la lista de monitores (noun). Los borradores caducan a los 6 meses sin actualizaciones, pero puedes eliminar monitores de borrador en cualquier momento.

## Permisos

Cualquier persona con [permisos de edición][4] puede actualizar un monitor (noun) de borrador. Puedes utilizar eventos para previsualizar la frecuencia con la que se habría activado el monitor (noun) sin enviar notificaciones reales.

## Prácticas recomendadas

* **Utiliza borradores para revisiones por pares:** Colabora antes de publicar los cambios.  
* **Evita el ruido en la producción:** Test las condiciones de alerta de forma segura en un borrador primero.  
* **Rastrea tu trabajo:** Utiliza nombres y tags (etiquetas) claros para los borradores durante el desarrollo.  
* **Limita los borradores antiguos:** Revisa y limpia los borradores antiguos para reducir el desorden.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://docs.datadoghq.com/es/monitors/configuration/?tab=thresholdalert
[3]: https://app.datadoghq.com/monitors/manage
[4]: /es/monitors/configuration/?tab=thresholdalert#permissions