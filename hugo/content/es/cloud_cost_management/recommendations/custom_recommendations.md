---
description: Aprenda a personalizar y administrar recomendaciones personalizadas para
  adaptarlas a las necesidades de su negocio.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations
  tag: Documentación
  text: Recomendaciones de Cloud Cost
title: Recomendaciones personalizadas
---
## Descripción general {#overview}

{{< img src="cloud_cost/recommendations/customize-recommendations.png" alt="Personalice las recomendaciones desde la página Cloud Cost Optimize." style="width:100%;" >}}

[CCM Recommendations][1] están diseñadas para informar y permitirle tomar medidas desde el principio. Puede personalizar estas recomendaciones para adaptarlas a sus casos de uso y necesidades comerciales específicas. Establezca sus propios umbrales de métricas y marcos de tiempo de evaluación para reducir las alertas innecesarias y centrarse en las recomendaciones que más importan.

Con las recomendaciones personalizadas, usted puede:
- Configurar múltiples reglas para cualquier recomendación predeterminada
- Ver el historial y los cambios realizados en sus configuraciones
- Modificar, restaurar o eliminar reglas establecidas previamente
  
## Personalice una recomendación {#customize-a-recommendation}

<div class="alert alert-danger">Para personalizar una recomendación, debe tener asignado el permiso <strong>Cloud Cost Management - Cloud Cost Management Write</strong>. </div>

<div class="alert alert-info">Las personalizaciones se reflejan en un plazo de 24 horas, cuando se generen las próximas recomendaciones.</div>

Para acceder a las recomendaciones personalizadas, vaya a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Customize{{< /ui >}}][2].

En esta página, puede ver una lista de recomendaciones predeterminadas que se pueden personalizar.

Haga clic en una recomendación y luego haga clic en {{< ui >}}Create New Configuration{{< /ui >}} para comenzar.

### Paso 1: Establezca umbrales de métricas personalizados {#step-1-set-custom-metric-thresholds}

Puede establecer un valor para cada umbral de métrica utilizado para generar recomendaciones de recursos.

Los umbrales de métricas que no se pueden personalizar aparecen atenuados.

### Paso 2: Personalice el marco de tiempo de evaluación {#step-2-customize-the-evaluation-time-frame}

Ajuste el marco de tiempo de evaluación para que coincida con la estacionalidad o los patrones operativos de su negocio. Las opciones incluyen: 1 semana, 2 semanas, 15 días, 3 semanas, 1 mes, 2 meses y 3 meses.

### Paso 3: Aplique esta regla a todos los recursos o agregue un filtro {#step-3-apply-this-rule-to-all-resources-or-add-a-filter}

Puede seleccionar si desea aplicar la regla a {{< ui >}}All Resources{{< /ui >}} o {{< ui >}}Some Resources{{< /ui >}} en su entorno.

Si selecciona {{< ui >}}Some Resources{{< /ui >}}, puede filtrar los recursos por etiqueta (por ejemplo, `team`, `service` o `environment`) para centrarse en áreas específicas de su negocio.

### Paso 4: (opcional) Etiquete y documente la personalización {#step-4-optional-label-and-document-the-customization}

Utilice este paso para agregar un motivo y un nombre único a su configuración para que pueda auditar y consultar esta recomendación más adelante.

- {{< ui >}}Reason{{< /ui >}}: Proporcione un motivo para su personalización para respaldar futuras auditorías y mantener un registro claro de los cambios.
- {{< ui >}}Name{{< /ui >}}: Ingrese un nombre descriptivo para la configuración a fin de identificar y localizar esta recomendación en el futuro.

### Paso 5: Guarde la recomendación {#step-5-save-the-recommendation}

Haga clic en {{< ui >}}Save{{< /ui >}} para guardar su recomendación personalizada. Las recomendaciones que ya se han personalizado **una vez** están etiquetadas como {{< ui >}}Configured{{< /ui >}}.

## Actualización de recomendaciones personalizadas {#updating-custom-recommendations}

Puede actualizar una recomendación personalizada en cualquier momento para reflejar los cambios en sus necesidades comerciales.

Para actualizar una recomendación personalizada:

1. Vaya a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Customize{{< /ui >}}][2].
2. Vaya a la recomendación personalizada.
3. Modifique los parámetros según sea necesario.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.
5. En la ventana emergente de confirmación, haga clic en {{< ui >}}Yes, save custom parameters{{< /ui >}} para aplicar sus cambios.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: https://app.datadoghq.com/cost/optimize/configure-recommendations