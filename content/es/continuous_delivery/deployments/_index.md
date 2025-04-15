---
cascade:
  algolia:
    rank: 70
    tags:
    - pipeline cd
    - pipelines cd
further_reading:
- link: /continuous_delivery/search
  tag: Documentación
  text: Aprender a buscar y a gestionar los resultados de tus despliegues
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Más información sobre el Explorador de CD Visibility
title: CD Visibility en Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

[Deployment Visibility][1] proporciona una visión del estado de tu CD desde la perspectiva del despliegue, mostrando resultados y métricas importantes de tus despliegues.

## Configuración

{{< whatsnext desc="Selecciona tu proveedor de despliegues para configurar CD Visibility en Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}Proveedores de CI (GitLab, Jenkins, CircleCI, y más){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">Si utilizas un proveedor que no es compatible, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">rellena este formulario para solicitar soporte</a>.</div>

## Uso de datos de despliegues

Al crear un [dashboard][2] o un [notebook][3], puedes utilizar datos de despliegues en tu consulta de búsqueda, que actualizan las opciones de widgets de visualización. Para obtener más información, consulta la documentación sobre [dashboards][4] y [notebooks][5].

## Compartir datos de despliegues

Puedes exportar tu consulta de búsqueda a una [vista guardada][6] haciendo clic en el botón **Export** (Exportar).

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Los resultados de las ejecuciones de despliegues aparecen en el Explorador de CD Visibility" width="100%" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /es/dashboards
[5]: /es/notebooks
[6]: /es/continuous_delivery/explorer/saved_views