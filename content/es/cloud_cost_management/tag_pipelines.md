---
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /integrations/guide/reference-tables
  tag: Documentación
  text: Más información sobre las tablas de referencia
title: Pipelines de etiquetas
---

## Información general

Para monitorizar eficazmente los costes de la nube, se necesita una comprensión exhaustiva de cómo los distintos servicios, equipos y productos contribuyen al gasto global. Los pipelines de etiquetas imponen el uso de etiquetas estandarizadas en todos los recursos de la nube y garantizan una asignación de costes coherente y precisa en toda la organización.

Con los [pipelines de etiquetas][1], puedes crear reglas de etiquetado para solucionar los errores u omisiones de etiquetas en tus facturas de la nube. También puedes crear nuevas etiquetas inferidas que se alineen con la lógica empresarial específica para mejorar la precisión de tu seguimiento de costes.

Los pipelines de etiquetas se aplican a las métricas de costes de nube de todos los proveedores. Los pipelines de etiquetas no se aplican a las recomendaciones de costes de nube.

## Crear un conjunto de reglas

<div class="alert alert-warning">Puedes crear hasta 100 reglas. No se admiten tablas de referencia basadas en API.</div>

Antes de crear reglas individuales, crea un conjunto de reglas (una carpeta para tus reglas) haciendo clic en **+ New Ruleset** (+ Nuevo conjunto de reglas).

Dentro de cada conjunto de reglas, haz clic en **+ Add New Rule** (+ Añadir nueva regla) y selecciona un tipo de regla: **Añadir etiqueta**, **Claves de etiquetas de alias**, o **Asignar varias etiquetas**. Estas reglas se ejecutan en un orden secuencial y determinista de arriba a abajo.

{{< img src="cloud_cost/tags_order.png" alt="Lista de reglas de etiquetado en la página de pipelines de etiquetas, que muestra varias categorías como equipo, cuenta, servicio, departamento, unidad de negocio y más" style="width:80%;" >}}

Puedes organizar reglas y conjuntos de reglas para asegurarte de que el orden de ejecución coincide con tu lógica empresarial.

### Añadir etiqueta

Añade una nueva etiqueta (clave + valor) basada en la presencia de etiquetas existentes en tus datos de costes de nube.

Por ejemplo, puedes crear una regla para etiquetar todos los recursos con su unidad de negocio en función de los servicios de los que esos recursos forman parte.

{{< img src="cloud_cost/tags_addnew.png" alt="Añade una nueva etiqueta de unidad de negocio con service:processing, service:creditcard o service:payment-notification." style="width:60%;" >}}

Para asegurarte de que la regla sólo se aplica si la etiqueta `business_unit` no existe, haz clic en el conmutador de la sección **Opciones adicionales**.

### Claves de etiquetas de alias

Asigna los valores de etiqueta existentes a una etiqueta más normalizada.

Por ejemplo, si tu organización quiere utilizar la clave de etiqueta estándar `application`, pero varios equipos tienen una variante de esa etiqueta (como `app`, `webapp` o `apps`), puedes aplicar el alias `apps` para `application`. Cada regla de etiqueta de alias te permite aplicar alias para un máximo de 25 claves de etiqueta con una nueva etiqueta.

{{< img src="cloud_cost/tags_alias.png" alt="Añade la etiqueta application (aplicación) a recursos con las etiquetas app, webapp o apps." style="width:60%;" >}}

Añade la etiqueta application (aplicación) a los recursos con las etiquetas `app`, `webapp` o `apps`. La regla deja de ejecutarse para cada recurso después de encontrar una primera coincidencia. Por ejemplo, si un recurso ya tiene una etiqueta `app`, entonces la regla ya no intenta identificar una etiqueta `webapp` o `apps`.

Para asegurarte de que la regla sólo se aplica si la etiqueta `application` no existe, haz clic en el conmutador de la sección **Opciones adicionales**.

### Asignar varias etiquetas

Utiliza [tablas de referencia][2] para añadir varias etiquetas a los datos de costes sin crear varias reglas. Esto asignará los valores de la columna de clave principal de tu tabla de referencia a los valores de etiquetas de costes. Si se encuentran, los pipelines añaden las columnas de la tabla de referencia seleccionada como etiquetas a los datos de costes.

Por ejemplo, si quieres añadir información sobre a qué vicepresidentes, organizaciones y unidades de negocio pertenecen las distintas cuentas de AWS y Azure, puedes crear una tabla y asignar las etiquetas.

{{< img src="cloud_cost/tags_mapmultiple.png" alt="Añadir metadatos de cuenta como vicepresidente, organización y unidad de negocio utilizando tablas de referencia para pipelines de etiquetas" style="width:60%;" >}}

De forma similar a las [claves de etiquetas de alias](#alias-tag-keys), la regla deja de ejecutarse para cada recurso después de encontrar una primera coincidencia. Por ejemplo, si se encuentra un `aws_member_account_id`, la regla ya no intentará encontrar un `subscriptionid`.

## Etiquetas reservadas

Algunas etiquetas como `env` y `host` son [etiquetas reservadas][4] y forman parte del [Etiquetado unificado de servicios][3]. La etiqueta `host` no puede añadirse en pipelines de etiquetas.

El uso de etiquetas te ayuda a correlacionar tus métricas, trazas (traces), procesos y logs. Las etiquetas reservadas como `host` te proporcionan una visibilidad y una monitorización eficaz de tu infraestructura. Para una correlación óptima e información práctica, utiliza estas etiquetas reservadas como parte de tu estrategia de etiquetado en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /es/integrations/guide/reference-tables/?tab=manualupload
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/getting_started/tagging/