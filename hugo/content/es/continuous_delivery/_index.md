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
- link: continuous_delivery/deployments
  tag: Documentación
  text: Aprender a configurar Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar los despliegues
- link: /continuous_delivery/features
  tag: Documentación
  text: Más información sobre las funciones de CD Visibility
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de CI/CD
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Consulta las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
title: Continuous Delivery Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility te proporciona una capacidad de observación de tus despliegues. CD Visibility lleva las métricas y los datos de los despliegues a Datadog para que puedas comunicar el estado de tus despliegues y centrar tus esfuerzos en mejorar la capacidad de tu equipo para entregar código de calidad en todo momento.

Con CD Visibility, puedes monitorizar despliegues en entornos de CD mediante el seguimiento de cada evento de despliegue. Podrás comprender los cambios que se están desplegando y cómo afectan a tus servicios.

## Aumentar la eficiencia mediante integraciones sencillas

Datadog se integra con [proveedores de CI][3] y proveedores de CD como [Argo CD][4] para realizar un seguimiento del rendimiento de la ejecución y los resultados de tus despliegues.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Utiliza los datos agregados a lo largo del tiempo para identificar tendencias y mejorar tus estrategias de despliegue para una mayor eficacia operativa.

## ¿Estás listo para comenzar?

Consulta [Deployment Visibility][1] para obtener instrucciones sobre cómo configurar CD Visibility con tus proveedores de CD, información sobre los requisitos de compatibilidad y pasos para instrumentar y configurar la recopilación de datos. Consulta [Explorar despliegues de CD Visibility][2] para comprender cómo consultar y visualizar los despliegues.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_delivery/deployments
[2]: /es/continuous_delivery/explorer
[3]: /es/continuous_delivery/deployments/ciproviders
[4]: /es/continuous_delivery/deployments/argocd