---
cascade:
  algolia:
    rank: 70
    tags:
    - cd pipeline
    - cd pipelines
further_reading:
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda a consultar y visualizar implementaciones
- link: /continuous_delivery/features
  tag: Documentación
  text: Aprenda sobre las características de CD Visibility
title: CD Visibility en Datadog
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

CD Visibility proporciona una vista del estado de su CD centrada en las implementaciones, mostrando métricas y resultados importantes de sus implementaciones.

## Configuración {#setup}

{{< whatsnext desc="Seleccione su proveedor de implementaciones para configurar CD Visibility en Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}Proveedores de CI (GitLab, Jenkins, CircleCI y más){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">Si está utilizando un proveedor que no es compatible, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">complete este formulario para solicitar soporte</a>.</div>

## Use datos de implementación {#use-deployment-data}

Al crear un [dashboard][1] o un [notebook][2], puede usar datos de implementación en su consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulte los [Dashboards][3] y la [documentación de Notebooks][4].

## Comparta datos de implementación {#share-deployment-data}

Puede exportar su consulta de búsqueda a una [vista guardada][5] haciendo clic en el botón {{< ui >}}Export{{< /ui >}}.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Resultados de ejecución de despliegue que aparecen en el Explorador de CD Visibility" width="100%" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /es/dashboards
[4]: /es/notebooks
[5]: /es/continuous_delivery/explorer/saved_views