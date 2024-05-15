---
disable_toc: false
further_reading:
- link: /service_management/workflows/actions_catalog/
  tag: Documentación
  text: Catálogo de acciones
kind: documentación
title: Aplicaciones integradas
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/Datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
App Builder de Datadog está en fase beta privada. Rellena el formulario para solicitar acceso.
{{< /callout >}}

Cuando tienes aplicaciones App Builder Datadog integradas en tus dashboards, puedes realizar acciones directas en tus recursos, y todos los datos y el contexto relevantes están disponibles inmediatamente. Vincula tu aplicación con el marco temporal del dashboard y las variables de plantilla para establecer dinámicamente el alcance de las acciones de la aplicación, lo que te permite llevar a cabo acciones en tu entorno en cualquier momento contexto necesario.

## Añadir aplicaciones a un dashboard

Añade una aplicación previamente publicada a tu dashboard arrastrando el tipo de widget **App** de la bandeja de widgets del dashboard:

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="Bandeja de widgets del dashboard con el tipo de widget App resaltado" style="width:80%;">}}

Aparece el modal del editor de aplicaciones que te permite seleccionar una aplicación y ponerle un título:

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="Modal del editor de aplicaciones con una aplicación seleccionada y un título de widget" style="width:80%;">}}

## Sincronizar una aplicación con variables de plantilla de dashboard

Puedes vincular tu aplicación a variables de plantilla en cualquier lugar que admita expresiones de plantilla en tus consultas o elementos de aplicación. Utiliza el siguiente fragmento de código como ejemplo, sustituyendo `<TEMPLATE_VARIABLE_NAME>` y `<DEFAULT_VALUE>` por el nombre de la variable de plantilla y el valor predeterminado, respectivamente. Pega el fragmento en tu expresión de plantilla.

**Nota**: Si quieres dejar en blanco un elemento (como un campo de búsqueda) por defecto, puedes establecer el valor por defecto en una cadena vacía (`""`) o `undefined`.

{{< code-block lang="json" disable_copy="false" collapsible="false" >}}
${self.options?.find(o => o.includes(global.dashboard.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value)) || '<DEFAULT_VALUE>'}
{{< /code-block >}}

### Contextualizar una aplicación de forma dinámica

Los elementos de la aplicación vinculados a variables de plantilla de dashboard se actualizan al mismo tiempo que los valores de variables de plantilla en el dashboard. Por ejemplo, al seleccionar un valor concreto de `instance_id` a través de la variable de plantilla desplegable o directamente a partir de un gráfico, el valor de `instance_id` se añade también al filtro de la aplicación, de modo que puedas realizar las acciones necesarias en esa instancia:

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="Seleccionar un valor de variable de plantilla de un gráfico" vídeo="true">}}

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}