---
aliases:
- /es/logs/security/
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Establecer una organización de Datadog que cumpla la normativa PCI
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: Blog
  text: Datadog presenta los servicios de Log Management y APM compatibles con PCI
kind: Documentación
title: Seguridad de los datos en Log Management
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

El producto Log Management es compatible con múltiples [entornos y formatos][1], lo que te permite enviar a Datadog casi cualquier dato. En este artículo se describen las principales garantías de seguridad y los controles de filtrado disponibles al enviar logs a Datadog.

**Nota**: Es posible ver logs en varios productos de Datadog. Todos los logs que se ven en la interfaz de usuario de Datadog, incluidos los que se ven en las páginas de trazas de APM, forman parte del producto Log Management.

## Seguridad de la información

El Datadog Agent envía logs a Datadog a través de HTTPS o a través de una conexión TCP con cifrado TLS en el puerto 10516, lo que requiere una comunicación saliente (consulta [Transporte de logs del Agent][2]).

Datadog utiliza un cifrado simétrico en reposo (AES-256) para los logs indexados. Los logs indexados se eliminan de la plataforma Datadog una vez que su periodo de conservación expira, según lo que hayas definido.

## Filtrar logs

En la versión 6 o posterior, el Agent puede configurarse para filtrar logs enviados por el Agent a la aplicación de Datadog. Para evitar el envío de logs específicos, utiliza el [parámetro][3] `log_processing_rules`, con el `type` **exclude_at_match** o **include_at_match**. Este parámetro permite crear una lista con una o más expresiones regulares, que indican al Agent que filtre logs basándose en las reglas de inclusión o exclusión proporcionadas.

## Enmascarar logs

A partir de la versión 6, el Agent puede configurarse para enmascarar patrones específicos en los logs enviados por el Agent a la aplicación de Datadog. Para enmascarar secuencias confidenciales en tus logs, utiliza el [parámetro][4] `log_processing_rules`, con el `type` **mask_sequences**. Este parámetro permite crear una lista que contenga una o más expresiones regulares, que indican al Agent que redacte los datos confidenciales de tus logs.

## Clientes habilitados por la HIPAA

{{% hipaa-customers %}}

## Cumplimiento de PCI DSS para Log Management

{{< site-region region="us" >}}

<div class="alert alert-warning">
El cumplimiento de PCI DSS para Log Management sólo está disponible para organizaciones Datadog en el <a href="/getting_started/site/">sitio US1</a>.
</div>

Datadog permite a los clientes enviar logs a organizaciones de Datadog que cumplen con PCI DSS, si así lo solicitan. Para configurar una organización de Datadog que cumpla con PCI, sigue estos pasos:

{{% pci-logs %}}

Consulta [Cumplimiento de PCI DSS][1] para obtener más información. Para activar el cumplimiento de PCI para APM, consulte [Cumplimiento de PCI DSS para APM][1].

[1]: /es/data_security/pci_compliance/
[2]: /es/data_security/pci_compliance/?tab=apm

{{< /site-region >}}

{{< site-region region="us3,us5,eu,gov,ap1" >}}

El cumplimiento de PCI DSS para Log Management no está disponible para el sitio {{< region-param key="dd_site_name" >}}.

{{< /site-region >}}

## Cifrado de endpoints

Todos los endpoints de envío de logs están cifrados. Los siguientes endpoints heredados siguen siendo compatibles:

* `tcp-encrypted-intake.logs.datadoghq.com`
* `lambda-tcp-encrypted-intake.logs.datadoghq.com`
* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/
[2]: /es/agent/logs/log_transport
[3]: /es/agent/logs/advanced_log_collection/#filter-logs
[4]: /es/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /es/logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/