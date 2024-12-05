---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización de flujos de trabajo
aliases:
- /es/workflows/generic_actions
- /es/service_management/workflows/actions_catalog/generic_actions/
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
title: Acciones
type: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog proporciona un conjunto de acciones de flujos de trabajo que no están asociadas a una herramienta o una integración específicas. Estas acciones te brindan más control sobre tus flujos de trabajo, ya que te permiten hacer cosas como:
- Añadir una lógica para controlar la ruta de ejecución de tu flujo de trabajo.
- Transformar los datos recopilados por una acción.
- Realizar solicitudes HTTP personalizadas.

{{< whatsnext desc="Obtener más información sobre acciones genéricas:" >}}
 {{< nextlink href="/service_management/workflows/actions/flow_control" >}}Utiliza acciones lógicas para añadir un intervalo de espera, una ramificación en una condición, utilizar la iteración y mucho más.{{< /nextlink >}}
 {{< nextlink href="/service_management/workflows/actions/data_transformation" >}}Realiza transformaciones de datos personalizadas dentro de tus flujos de trabajo utilizando JavaScript.{{< /nextlink >}}
 {{< nextlink href="/service_management/workflows/actions/http" >}}Utiliza la acción HTTP para realizar una solicitud a un endpoint personalizado.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/saved_actions" >}}Utiliza la función <i>Saved Actions</i> (Acciones guardadas) para almacenar y reutilizar una acción y sus parámetros.{{< /nextlink >}}
{{< /whatsnext >}}

Si tu caso de uso no está cubierto por una integración o acción genérica de Datadog, puedes [solicitar una nueva acción o una integración completa][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://forms.gle/JzPazvxXox7fvA2R8