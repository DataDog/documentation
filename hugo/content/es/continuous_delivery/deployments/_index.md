---
cascade:
  algolia:
    rank: 70
    tags:
    - pipeline cd
    - pipelines cd
further_reading:
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar los despliegues
- link: /continuous_delivery/features
  tag: Documentación
  text: Más información sobre las funciones de CD Visibility
title: CD Visibility en Datadog
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

CD Visibility proporciona una visión del estado de tu CD desde el punto de vista del despliegue, mostrando métricas y resultados importantes de tus despliegues.

## Configurar

{{< whatsnext desc="Selecciona tu proveedor de despliegues para configurar CD Visibility en Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}Proveedores de CI (GitLab, Jenkins, CircleCI y más){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">Si utilizas un proveedor que no es compatible, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">rellena este formulario para solicitar asistencia</a>.</div>

## Uso de datos de despliegues

Al crear un [dashboard][1] o un [notebook][2], puedes utilizar datos de despliegue en tu consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulta la [documentación sobre dashboards][3] y [documentación sobre notebooks][4].

## Compartir datos de despliegues

Puedes exportar tu consulta de búsqueda a una [vista guardada][5] haciendo clic en el botón **Export** (Exportar).

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Los resultados de las ejecuciones de despliegues aparecen en el Explorador de CD Visibility" width="100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /es/dashboards
[4]: /es/notebooks
[5]: /es/continuous_delivery/explorer/saved_views