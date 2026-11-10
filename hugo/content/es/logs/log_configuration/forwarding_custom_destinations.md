---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: Blog
  text: Envíe registros a sistemas de terceros con el reenvío de registros de Datadog
- link: /logs/log_collection
  tag: Documentación
  text: Comience a recopilar sus registros
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Obtenga información sobre las canalizaciones de registros
- link: /observability_pipelines/
  tag: Documentación
  text: Reenvíe registros directamente desde su entorno con Observability Pipelines
- link: https://www.datadoghq.com/blog/microsoft-sentinel-logs/
  tag: Blog
  text: Procese y gestione centralmente sus registros en Datadog antes de enviarlos
    a Microsoft Sentinel
- link: /security/events_forwarding
  tag: Documentación
  text: Reenvíe señales de seguridad, spans y otros tipos de eventos a destinos personalizados
title: Reenvío de registros a destinos personalizados
---
## Descripción general {#overview}

El reenvío de registros le permite enviar registros desde Datadog a destinos personalizados como Splunk, Elasticsearch y puntos de conexión HTTP. Esto significa que puede usar [Log Pipelines][1] para recopilar, procesar y estandarizar centralmente sus registros en Datadog. Luego, envíe los registros desde Datadog a otras herramientas para respaldar los flujos de trabajo de los equipos individuales. Puede elegir reenviar cualquiera de los registros ingeridos, independientemente de si están indexados o no, a destinos personalizados. Los registros se reenvían en formato JSON y se comprimen con GZIP de forma predeterminada.

**Nota**: Solo los usuarios de Datadog con el permiso [`logs_write_forwarding_rules`][2] pueden [crear][6], [editar][7] y [eliminar][8] destinos personalizados para el reenvío de registros.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="La página de reenvío de registros, que muestra los destinos personalizados resaltados. La lista de destinos incluye Splunk (filtrado por service:logs-processing), punto de conexión HTTP (filtrado por source:okta OR source:paloalto) y Elasticsearch (filtrado por team:acme env:prod)." >}}

Si un intento de reenvío falla (por ejemplo: si su destino deja de estar disponible temporalmente), Datadog vuelve a intentarlo periódicamente durante 2 horas utilizando una estrategia de retroceso exponencial. El primer intento se realiza después de un retraso de 1 minuto. Para los reintentos posteriores, el retraso aumenta progresivamente hasta un máximo de 8-12 minutos (10 minutos con un 20% de varianza).

Las siguientes métricas informan sobre los registros que se han reenviado correctamente, incluidos los registros que se enviaron correctamente después de los reintentos, así como los registros que se descartaron.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Configure el reenvío de registros a destinos personalizados {#set-up-log-forwarding-to-custom-destinations}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El envío de registros a un destino personalizado se realiza fuera del entorno Datadog GovCloud, el cual está fuera del control de Datadog. Datadog no será responsable de ningún registro que haya salido del entorno Datadog GovCloud, incluyendo, sin limitación, cualquier obligación o requisito que el usuario pueda tener relacionado con FedRAMP, niveles de impacto del DoD, ITAR, cumplimiento de exportaciones, residencia de datos o regulaciones similares aplicables a dichos registros.
<br><br>
Debido a los protocolos de seguridad para el {{< region-param key="dd_datacenter" >}} sitio, solo los puertos 443 y 8088 están abiertos para el reenvío de registros. Para usar un puerto diferente, comuníquese con <a href="https://www.datadoghq.com/support/">Soporte de Datadog</a>.</div>
{{< /site-region >}}

1. Agregue las IP de webhook del {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.
1. Vaya a [Log Archiving & Forwarding][4].
3. Seleccione {{< ui >}}Custom Destinations{{< /ui >}}.
4. Haga clic en {{< ui >}}New Destination{{< /ui >}}.
5. Ingrese la consulta para filtrar sus registros para el reenvío. Consulte [Sintaxis de búsqueda][5] para obtener más información.
6. Seleccione {{< ui >}}Destination Type{{< /ui >}}.

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="La página de configuración de destino, que muestra los pasos para configurar un nuevo destino." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. Ingrese un nombre para el destino.
8. En el campo {{< ui >}}Define endpoint{{< /ui >}}, ingrese el punto de conexión al que desea enviar los registros. El punto de conexión debe comenzar con `https://`.
    - Por ejemplo, si desea enviar registros a Sumo Logic, siga su [documentación sobre cómo configurar una fuente HTTP para registros y métricas][1] para obtener la URL de la dirección de la fuente HTTP a la cual enviar datos a su recopilador. Ingrese la URL de la dirección de la fuente HTTP en el campo {{< ui >}}Define endpoint{{< /ui >}}.
9. (Opcional) Deshabilite la compresión GZIP si su punto de conexión HTTP no admite cargas útiles comprimidas.
10. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, seleccione uno de los siguientes tipos de autenticación y proporcione los detalles pertinentes:
  | Tipo de autenticación      | Descripción                                                                                                              | Ejemplo                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| {{< ui >}}Basic Authentication{{< /ui >}} | Proporcione el nombre de usuario y la contraseña de la cuenta a la que desea enviar los registros.                                        | Nombre de usuario: `myaccount`<br>Contraseña: `mypassword`                       |
| {{< ui >}}Request Header{{< /ui >}}       | Proporcione el nombre y el valor del encabezado. Ejemplo para Authorization:<br>- Ingrese `Authorization` para {{< ui >}}Header Name{{< /ui >}}.<br>- Use un valor de encabezado con el formato `Basic username:password`, codificado en base64. | Nombre del encabezado: `Authorization`<br>Valor del encabezado: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. Ingrese un nombre para el destino.
8. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese el punto de conexión al cual desea enviar los registros. El punto de conexión debe comenzar con `https://`. Por ejemplo, ingrese `https://<your_account>.splunkcloud.com:8088`.  
    **Nota**: `/services/collector/event` se añade automáticamente al punto de conexión.
9. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, ingrese el token HEC de Splunk. Consulte [Configurar y usar el recopilador de eventos HTTP][1] para obtener más información sobre el token HEC de Splunk.  
    **Nota**: El [reconocimiento del indexador][2] debe estar deshabilitado.
10. (Opcional) En la sección {{< ui >}}Configure Sourcetype{{< /ui >}}, especifique el tipo de fuente de Splunk que se asignará a los eventos reenviados. Consulte [Por qué es importante el tipo de fuente][3] para obtener más información sobre el tipo de fuente de Splunk. Si no se establece, se utiliza el sourcetype predeterminado `_json`. Para enviar eventos sin ningún sourcetype, seleccione **Enviar sin sourcetype**.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
[3]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.4/configure-source-types/why-source-types-matter
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. Ingrese un nombre para el destino.
8. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese los siguientes detalles:
  | Configuración                        | Descripción                                                                                                  | Ejemplo                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| {{< ui >}}Endpoint{{< /ui >}}                   | Ingrese el punto de conexión al que desea enviar los registros. El punto de conexión debe comenzar con `https://`.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| {{< ui >}}Destination Index Name{{< /ui >}}     | Especifique el nombre del índice de destino donde desea enviar los registros.                                   | `your_index_name`                        |
| {{< ui >}}Index Rotation{{< /ui >}}             | Opcionalmente, seleccione la frecuencia con la que se debe crear un nuevo índice: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month`. El valor predeterminado es `No Rotation`. | `Every Day`                              |
9. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, ingrese el nombre de usuario y la contraseña de su cuenta de Elasticsearch.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. Ingrese un nombre para el destino.
8. La autenticación para Microsoft Sentinel Forwarder requiere un registro de aplicación configurado a través de la integración de Datadog Azure. Si ya tiene un registro de aplicación para la integración de Azure, puede reutilizarlo en lugar de crear uno nuevo.
9. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese los siguientes detalles:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | Ingrese el punto de conexión en el Data Collection Endpoint (DCE) donde se envían los registros. Esto está etiquetado como \"Logs Ingestion\" en la página de descripción general del DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | Especifique el ID inmutable de la Regla de recopilación de datos (DCR) donde se definen las rutas de registro, tal como se encuentra en la página de descripción general de la DCR como \"Immutable Id\".  **Nota**: Asegúrese de que el rol de Publicador de métricas de supervisión esté asignado en la configuración de IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| Proporcione el nombre de la Declaración de flujo de destino que se encuentra en el JSON de recursos de la DCR en `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

7. Ingrese un nombre para el destino.
8. La autenticación para Google Chronicle Forwarder requiere el uso de una cuenta de servicio de GCP con acceso de escritura a Chronicle.
9. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese los siguientes detalles:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Customer ID{{< /ui >}} | El ID de cliente de Chronicle proporcionado por Google. | `abcd1234`   |
| {{< ui >}}Regional Endpoint{{< /ui >}}           | La URL del punto de conexión de la API de ingesta de Chronicle según su región.  **Nota**: Asegúrese de que el rol de Publicador de métricas de supervisión esté asignado en la configuración de IAM de la DCR. | `https://us.chronicle.googleapis.com`              |
| {{< ui >}}Namespace{{< /ui >}}| El espacio de nombres en el que se deben ingerir sus registros de Chronicle.  | `default`                                          |

10. En la sección {{< ui >}}Configure authentication settings{{< /ui >}}, ingrese los siguientes detalles:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Project ID{{< /ui >}}| El ID del proyecto de GCP asociado con la instancia de Chronicle.  | `my-gcp-chronicle-project`                                          |
| {{< ui >}}Private Key ID{{< /ui >}}| El ID de la clave privada de las credenciales de su cuenta de servicio.  | `0123456789abcdef`                                          |
| {{< ui >}}Private Key{{< /ui >}}| La clave privada de las credenciales de su cuenta de servicio.  | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| {{< ui >}}Client Email{{< /ui >}}| La dirección de correo electrónico de la cuenta de servicio.  | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| {{< ui >}}Client ID{{< /ui >}}| El ID de cliente de las credenciales de su cuenta de servicio.  | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. En la sección {{< ui >}}Select Tags to Forward{{< /ui >}}:
    1. Seleccione si desea que se incluyan {{< ui >}}All tags{{< /ui >}}, {{< ui >}}No tags{{< /ui >}} o {{< ui >}}Specific Tags{{< /ui >}}.
    1. Seleccione si desea {{< ui >}}Include{{< /ui >}} o {{< ui >}}Exclude specific tags{{< /ui >}}, y especifique qué etiquetas incluir o excluir.
11. Haga clic en {{< ui >}}Save{{< /ui >}}.


En la página [Log Forwarding][4], coloque el cursor sobre el estado de un destino para ver el porcentaje de registros que coincidieron con los criterios de filtro y que se han reenviado en la última hora.

## Editar un destino {#edit-a-destination}
1. Vaya a [Log Forwarding][4].
2. Seleccione {{< ui >}}Custom Destinations{{< /ui >}} para ver una lista de todos los destinos existentes.
3. Haga clic en el botón {{< ui >}}Edit{{< /ui >}} para el destino que desea editar.
4. Realice los cambios en la página de configuración.
5. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Eliminar un destino {#delete-a-destination}
1. Vaya a [Log Forwarding][4].
2. Seleccione {{< ui >}}Custom Destinations{{< /ui >}} para ver una lista de todos los destinos existentes.
3. Haga clic en el botón {{< ui >}}Delete{{< /ui >}} para el destino que desea eliminar y haga clic en {{< ui >}}Confirm{{< /ui >}}. Esto elimina el destino de la lista configurada de destinos y los registros ya no se reenvían a él.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /es/logs/explorer/search_syntax/
[6]: /es/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /es/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /es/logs/log_configuration/forwarding_custom_destinations#delete-a-destination
[9]: /es/security/events_forwarding/