---
further_reading:
- link: /monitors/
  tag: Documentación
  text: Crear monitores
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitor
- link: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
  tag: Blog
  text: Prácticas recomendadas para el etiquetado de tus monitores
title: Configuraciones de monitor
---

## Información general

En la página [Configuraciones de monitor][1] puedes acceder a los siguientes temas y controlarlos:

* [Políticas de etiquetas (tags)](#tag-policies)
* [Monitores eliminados](#deleted-monitors)


## Políticas de etiquetas

Las políticas de etiquetas de monitores te permiten aplicar la validación de datos en etiquetas y valores de etiquetas de tus monitores Datadog. Esto garantiza que las alertas se envíen a los sistemas y flujos de trabajo posteriores correctos para su clasificación y procesamiento.

<div class="alert alert-warning">Una vez configuradas, las políticas de etiquetas se aplican a <strong>todos</strong> los monitores Datadog</div>

- Para crear un nuevo monitor, este debe adherir a las políticas de etiquetas de tu organización.
- Los monitores existentes que infringen las políticas de etiquetas de tu organización siguen proporcionando alertas y notificaciones, pero deben actualizarse para que coincidan con las políticas de etiquetas, antes de poder modificar otros parámetros.

### Configurar políticas de etiquetas de monitores

1. Ve a la página [**Configuraciones de monitor**][1].
2. Abre la pestaña "Políticas de etiquetas". Existen tres reglas de validación de datos que se aplican a través de las políticas de etiquetas:
    - Requerir etiquetas con valores obligatorios
    - Requerir únicamente etiquetas
    - Etiquetas opcionales con valores obligatorios
3. Haz clic en la marca de verificación verde para guardar la política.

{{< img src="/monitors/settings/tag_policies.png" alt="Página de las políticas de etiquetas para la configuración de monitores" style="width:100%;" >}}

### Requerir etiquetas con valores obligatorios

Para aplicar la obligatoriedad de las etiquetas, selecciona la casilla de verificación **Required** (Requerido) y luego especifica la clave de etiqueta y los valores. En este ejemplo, se requiere que los monitores tengan la etiqueta `cost_center`. El valor debe ser configurado como `cc1`, `cc2` o `cc3`.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="Página Configuración de monitores que muestra una política de etiquetas para una etiqueta requerida con los valores obligatorios" >}}

### Requerir únicamente etiquetas

Puedes requerir una etiqueta, pero permitir que los usuarios especifiquen sus propios valores. En este ejemplo, se requiere que los monitores tengan la etiqueta `product_id`. El valor puede ser cualquier cosa especificada por el usuario.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="Página Configuración de monitores que muestra una política de etiquetas en la que sólo se requiere la etiqueta" >}}

### Etiqueta opcional con valores obligatorios

Para hacer que una etiqueta sea opcional, pero requerir que los monitores con esa etiqueta utilicen valores específicos, introduce los valores de la etiqueta en el campo **Values** (Valores). En este ejemplo, la etiqueta `env` es opcional. Sin embargo, si un monitor utiliza esta etiqueta, el valor debe configurarse en `dev`, `staging` o `prod`.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="Página Configuración de monitores que muestra una política de etiquetas para una etiqueta opcional con los valores obligatorios" >}}

### Permisos

Para configurar políticas de etiquetas de monitor, debes tener asignado un rol con el permiso `monitor_CONFIG_POLICY_WRITE_PERMISSION`.

Para obtener más información, consulta [Control de acceso basado en roles][2] y [Permisos de los roles][3].


## Monitores eliminados
Los monitores se conservan durante 7 días antes de ser eliminados definitivamente. Para restaurar monitores de Datadog eliminados recientemente:
1. Ve a la página [**Monitors** > **Settings** (Monitores > Configuración)][1].
1. Abre la pestaña **Monitores eliminados**.
1. Selecciona los monitores que quieres restaurar.
1. Haz clic en el botón **Restablecer**, situado en la parte superior de la tabla.

{{< img src="monitors/settings/recently_deleted.png" alt="Restaurar un monitor eliminado" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings
[2]: /es/account_management/rbac/
[3]: /es/account_management/rbac/permissions/