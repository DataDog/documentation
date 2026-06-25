---
aliases:
- /es/security/application_security/threats/setup/compatibility/
further_reading:
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona la protección de aplicaciones y API en Datadog
title: Requisitos de compatibilidad
type: lenguaje de código múltiple
---

Se admiten las siguientes capacidades de AAP en relación con la biblioteca de rastreo de cada lenguaje:

| Capacidad de la AAP                         | Java    | .NET     | Node.js                                          | Python        | Go              | Ruby          | PHP           |
|----------------------------------------|---------|----------|--------------------------------------------------|---------------|-----------------|---------------|---------------|
| Detección de amenazas                       | 1.8.0   | 2.23.0   | 4.0.0                                            | 1.9.0         | 1.47.0          | 1.9.0         | 0.84.0        |
| Seguridad de la API                           | 1.31.0  | 2.42.0   | 4.30.0 para Node.js v16 o posterior, o 5.6.0 para Node.js v18 o posterior | 2.6.0         | 1.59.0          | 2.4.0        | 0.98.0        |
| Protección frente a amenazas                      | 1.9.0   | 2.26.0   | 4.0.0                                            | 1.10.0        | v1.50.0         | 1.11.0        | 0.86.0        |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.11.0  | 2.27.0   | 4.1.0                                            | 1.19.0        | v1.53.0         | 1.15.0        | 0.86.0        |
| Rastreo automático de los eventos de actividad de los usuarios | 1.38.0  | 2.32.0   | compatibilidad pendiente                                            | 2.11.0        | compatibilidad pendiente   | compatibilidad pendiente        | compatibilidad pendiente        |
| Rastreo automático de la actividad del usuario (modos obsoletos) | 1.20.0  | 2.32.0   | 4.4.0                                            | 1.17.0        | no compatible   | 1.14.0        | 0.89.0        |

Selecciona el lenguaje de tu aplicación para obtener más información sobre la compatibilidad de frameworks y funciones.


{{< card-grid card_width="225px" >}}
  {{< image-card href="java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="dotnet/" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="nginx/" src="integrations_logos/nginx.png" alt="nginx" >}}
  {{< image-card href="envoy/" src="integrations_logos/envoy.png" alt="envoy" >}}
  {{< image-card href="istio/" src="integrations_logos/istio.png" alt="istio" >}}
  {{< image-card href="gcp-service-extensions/" src="integrations_logos/google_cloud_platform.png" alt="GCP Service Extensions" >}}
  {{< image-card href="haproxy/" src="integrations_logos/haproxy.png" alt="HAProxy" >}}
{{< /card-grid >}}

<br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}