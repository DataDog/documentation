---
title: Instrumentación de Cloud Run Jobs
type: multi-code-lang
---

{{< callout url="https://forms.gle/DNbZDFb3mDTt2vxb7"
 btn_hidden="false" header="Únete a la vista previa.">}}
Serverless Monitoring para Google Cloud Run Jobs está en vista previa. Utiliza este formulario para enviar tu solicitud hoy mismo.
{{< /callout >}}

En primer lugar, configura la integración de [Datadog y Google Cloud Platform][1] para recopilar métricas y logs de los servicios de Google Cloud. Recuerda añadir el rol `cloud asset viewer` a tu cuenta de servicio y habilitar la API Cloud Asset Inventory en Google Cloud.

A continuación, selecciona tu tiempo de ejecución para obtener instrucciones sobre cómo instrumentar tu aplicación:

{{% container-languages path="google_cloud_run/jobs" jobs="true" %}}

[1]: /es/integrations/google-cloud-platform/