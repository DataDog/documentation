---
description: Aprende a personalizar y gestionar las recomendaciones personalizadas
  para adaptarlas a las necesidades de tu empresa.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations
  tag: Documentación
  text: Recomendaciones de costes en la nube
title: Recomendaciones personalizadas
---

## Información general

{{< img src="cloud_cost/recommendations/custom-recommendations-without-history.png" alt="Configura recomendaciones personalizadas de la page (página) Parámetros de costos de la nube." style="width:100%;" >}}

Las [Recomendaciones de CCM][1] están diseñadas para ser informativas y prácticas desde el principio. Puedes personalizar estas recomendaciones para adaptarlas a los casos de uso y necesidades específicas de tu empresa. Configura tus propios umbrales de métricas y plazos de evaluación para reducir las alertas innecesarias y centrarte en las recomendaciones más importantes.

Con las recomendaciones personalizadas, puedes:
- Configurar varias reglas para cualquier recomendación personalizada
- Consultar el historial y los cambios realizados en tus configuraciones
- Modificar, restaurar o eliminar reglas establecidas previamente

## Personalizar una recomendación

<div class="alert alert-danger">Para personalizar una recomendación, debes tener asignado el permiso **Cloud Cost Management - Cloud Cost Management Write**. </div>

<div class="alert alert-info">Las personalizaciones se reflejan en 24 horas, cuando se generan las siguientes recomendaciones.</div>

Para acceder a las recomendaciones personalizadas, ve a [**Cloud Cost > Settings > Configure Recommendations**][2] (Costos de la nube > Parámetros > Configurar recomendaciones).

En esta page (página), puedes ver una lista de recomendaciones predefinidas que pueden personalizarse.

Haz clic en una recomendación y, a continuación, en **Create New Configuration** (Crear nueva configuración) para empezar.

### Step (UI) / paso (generic) 1: Configurar umbrales de métricas personalizados

Puedes configurar un valor para cada umbral de métrica utilizado para generar recomendaciones de recursos.

Los umbrales de métricas que no se pueden personalizar aparecen en gris.

### Step (UI) / paso (generic) 2: Personalizar el plazo de evaluación

Ajusta el periodo de evaluación a la estacionalidad o los patrones operativos de tu empresa. Las opciones son: 1 semana, 2 semanas, 15 días, 3 semanas, 1 mes, 2 meses y 3 meses.

### Step (UI) / paso (generic) 3: Aplicar esta regla a todos los recursos o añadir un filtro

Puedes seleccionar si deseas aplicar la regla a **All Resources** (Todos los recursos) o a **Some Resources** (Algunos recursos) de tu entorno.

Si seleccionas **Some Resources** (algunos recursos), puedes filtrar los recursos por tag (etiqueta) (por ejemplo, `team`, `service` o `environment`) para dirigirte a partes específicas de tu empresa.

### Step (UI) / paso (generic) 4: (opcional) Etiquetar y documentar la personalización

Utiliza este step (UI) / paso (generic) para añadir un motivo y un nombre único a tu configuración para que puedas auditar y hacer referencia a esta recomendación más tarde.

- **Motivo:** Proporciona un motivo para tu personalización para admitir futuras auditorías y mantener un registro claro de los cambios.
- **Nombre:** Introduce un nombre descriptivo para la configuración para identificar y localizar esta recomendación en el futuro.

### Step (UI) / paso (generic) 5: Guardar la recomendación

Haz clic en **Save** (Guardar) para guardar tu recomendación personalizada. Las recomendaciones que ya se han personalizado **una vez** se etiquetan como **Configured** (Configuradas).

## Actualización de las recomendaciones personalizadas

Puedes actualizar una recomendación personalizada en cualquier momento para reflejar los cambios en las necesidades de tu empresa.

Para actualizar una recomendación personalizada:

1. Ve a [**Cloud Cost > Settings > Configure recommendations**][2] (Costo de la nube > Parámetros > Configurar recomendaciones).
2. Ve a la recomendación personalizada.
3. Modifica los parámetros según sea necesario.
4. Haz clic en **Save** (Guardar).
5. En la ventana emergente de confirmación, haz clic en **Yes, save custom parameters** (Sí, guardar parámetros personalizados) para aplicar los cambios.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: https://app.datadoghq.com/cost/settings/configure-recommendations