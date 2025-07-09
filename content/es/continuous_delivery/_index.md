---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - entrega continua
    - visibilidad del despliegue
    - despliegues
    - ejecuciones de despliegues
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Consultar las últimas versiones de Software Delivery. (Es necesario iniciar
    sesión en la aplicación)
- link: continuous_delivery/deployments
  tag: Documentación
  text: Aprender a configurar Deployment Visibility
- link: continuous_delivery/search
  tag: Documentación
  text: Aprender a buscar y a gestionar los resultados de tus despliegues
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Más información sobre el Explorador de CD Visibility
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de CI/CD
title: Continuous Delivery Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility te proporciona una capacidad de observación de tus despliegues. CD Visibility lleva las métricas y los datos de los despliegues a Datadog para que puedas comunicar el estado de tus despliegues y centrar tus esfuerzos en mejorar la capacidad de tu equipo para entregar código de calidad en todo momento.

## Mejorar la frecuencia de despliegue

Deployment Visibility te ayuda a monitorizar despliegues en entornos CD mediante el seguimiento de cada evento de despliegue. Puedes identificar los cuellos de botella, comprender los fallos y medir las métricas de éxito del despliegue. Con CD Visibility, tu equipo puede optimizar los procesos, aumentar la frecuencia de despliegue de forma segura y garantizar un rendimiento de entrega constante.

## Aumentar la eficiencia mediante integraciones sencillas

Datadog se integra con [proveedores de CI][4] y proveedores de CD como [Argo CD][5] para recopilar métricas y realizar un seguimiento del rendimiento de la ejecución y de los resultados de tus despliegues.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Utiliza los datos agregados a lo largo del tiempo para identificar tendencias y mejorar tus estrategias de despliegue para una mayor eficacia operativa.

## ¿Estás listo para comenzar?

Consulta [Deployment Visibility][1] para ver instrucciones sobre cómo configurar CD Visibility con tus proveedores de CD, información sobre los requisitos de compatibilidad y pasos para instrumentar y configurar la recopilación de datos. A continuación, podrás empezar a explorar los detalles de tus ejecuciones de despliegues en el [Explorador de CD Visibility][2] y exportar tu consulta de búsqueda a una [vista guardada][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_delivery/deployments
[2]: /es/continuous_delivery/explorer
[3]: /es/continuous_delivery/explorer/saved_views
[4]: /es/continuous_delivery/deployments/ciproviders
[5]: /es/continuous_delivery/deployments/argocd