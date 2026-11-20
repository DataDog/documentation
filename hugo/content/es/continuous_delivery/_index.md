---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
    - deployment visibility
    - deployments
    - deployment executions
disable_sidebar: true
further_reading:
- link: continuous_delivery/deployments
  tag: Documentación
  text: Aprenda a configurar Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda a consultar y visualizar implementaciones
- link: /continuous_delivery/features
  tag: Documentación
  text: Aprenda sobre las características de CD Visibility
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de CI/CD
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación)
title: Continuous Delivery Visibility
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility proporciona observabilidad de sus despliegues. CD Visibility lleva métricas y datos de despliegue a Datadog para que pueda comunicar el estado de sus despliegues y concentrar sus esfuerzos en mejorar la capacidad de su equipo para entregar código de calidad en todo momento.

Con CD Visibility, puede hacer un seguimiento de los despliegues en los entornos de CD al rastrear cada evento de despliegue. Puede comprender los cambios que se están desplegando y cómo afectan a sus servicios.

## Aumente la eficiencia mediante integraciones fluidas {#increase-efficiency-through-seamless-integrations}

Datadog se integra con [proveedores de CI][3] y proveedores de CD como [Argo CD][4] para realizar un seguimiento del rendimiento de la ejecución y los resultados de sus despliegues.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Utilice los datos agregados a lo largo del tiempo para identificar tendencias y mejorar sus estrategias de despliegue para una mayor eficiencia operativa.

## ¿Listo para comenzar? {#ready-to-start}

Consulte [Deployment Visibility][1] para obtener instrucciones sobre cómo configurar CD Visibility con sus proveedores de CD, información sobre los requisitos de compatibilidad y pasos para instrumentar y configurar la recopilación de datos. Consulte [Explore CD Visibility Deployments][2] para comprender cómo consultar y visualizar despliegues.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_delivery/deployments
[2]: /es/continuous_delivery/explorer
[3]: /es/continuous_delivery/deployments/ciproviders
[4]: /es/continuous_delivery/deployments/argocd