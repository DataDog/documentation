---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: Blog
  text: Dirigir logs a sistemas de terceros con el reenvío de logs de Datadog
- link: /logs/log_collection
  tag: Documentación
  text: Empezar con la recopilación de tus logs
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Obtener más información sobre pipelines de logs
- link: /observability_pipelines/
  tag: Documentación
  text: Reenviar logs directamente desde tu entorno con pipelines de observabilidad
- link: https://www.datadoghq.com/blog/microsoft-sentinel-logs/
  tag: Blog
  text: Procesa y gobierna de forma centralizada tus logs en Datadog antes de enviarlos
    a Microsoft Sentinel
title: Reenvío de logs a destinos personalizados
---

## Información general

El reenvío de logs te permite enviar logs desde Datadog a destinos personalizados como como endpoints de Splunk, Elasticsearch y HTTP. Esto significa que puedes utilizar [Pipelines de logs][1] para recopilar, procesar y estandarizar tus logs de forma centralizada en Datadog. A continuación, envía los logs desde Datadog a otras herramientas para admitir workflows (UI) / procesos (generic) individuales de equipos. Puedes optar por reenviar cualquiera de los logs ingeridos, estén o no indexados, a destinos personalizados. En forma predeterminada, los logs se reenvían en formato JSON y se comprimen con GZIP.

**Nota**: Sólo los usuarios de Datadog con el permiso [`logs_write_forwarding_rules`][2] pueden [crear][6], [editar][7] y [eliminar][8] destinos personalizados para el reenvío de logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="Página de reenvío de logs que muestra los destinos personalizados resaltados. La lista de destinos incluye Splunk (filtrado por servicio: logs-processing), endpoint HTTP (filtrado por origen: okta OR source:paloalto) y Elasticsearch (filtrado por equipo: acme env:prod)." >}}

Si falla un intento de reenvío (por ejemplo: si el destino deja de estar disponible temporalmente), Datadog vuelve a intentarlo periódicamente durante 2 horas, utilizando una estrategia de retraso exponencial. El primer intento se realiza luego de un retraso de 1 minuto. En los siguientes reintentos, el retraso aumenta progresivamente hasta un máximo de 8 a 12 minutos (10 minutos con una variación del 20%).

Las siguientes métricas informan sobre los logs que se han reenviado correctamente, incluyendo aquellos que se han enviado correctamente después de algunos reintentos, así como de los logs que se han descartado.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Configurar el reenvío de logs a destinos personalizados

{{< site-region region="gov" >}}
<div class="alert alert-danger">El envío de logs a un destino personalizado queda fuera del entorno de Datadog GovCloud, que está fuera del control de Datadog. Datadog no será responsable de ningún log que haya salido del entorno de Datadog GovCloud, incluidas, entre otras, las obligaciones o requisitos que el usuario pueda tener en relación con FedRAMP, los niveles de impacto del DoD, ITAR, el cumplimiento de las normas de exportación, la residencia de datos o normativas similares aplicables a dichos logs.</div>
{{< /site-region >}}

1. Añade las IP de webhook de {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permitidos.
1. Ve a [Archivo y reenvío de logs][4].
3. Selecciona **Custom Destrinations** (Destinos personalizados).
4. Haz clic en **New Destination** (Nuevo destino).
5. Introduce la consulta para filtrar tus logs para el reenvío. Consulta [Sintaxis de búsqueda][5] para obtener más información.
6. Selecciona el **Destination Type** (Tipo de destino).

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="La page (´página de configuración del destino, en la que se muestran los steps (UI) / pasos (generic) para configurar un nuevo destino." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. Introduce un nombre para el destino.
8. En el campo **Define endpoint** (Definir endpoint), introduce el endpoint al que desees enviar logs. El endpoint debe empezar con `https://`.
    - Por ejemplo, si deseas enviar logs a Sumo Logic, siguie sus [Configurar la source (fuente) de HTTP para documentación de logs y métricas][1] para obtener la dirección URL de la source (fuente) de HTTP para enviar datos a su recopilador. Introduce la dirección URL de la source (fuente) de HTTP en el campo **Define endpoint** (Definir endpoint).
9. (Opcional) Desactiva la compresión de GZIP si tu endpoint de HTTP no admite cargas útiles comprimidas.
10. En la sección **Configure Authentication** (Configurar autenticación), selecciona uno de los siguientes tipos de autenticación y proporciona los detalles pertinentes:
  | Tipo de autenticación | Descripción | Ejemplo
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| **Autenticación básica** | Proporciona el nombre de usuario y la contraseña de la cuenta a la que desees enviar logs.                                        | Nombre de usuario: `myaccount`<br> Contraseña: `mypassword`                       |
| **Encabezado de solicitud** | Proporciona el nombre y el valor del encabezado. Ejemplo para autorización:<br>- Introduce `Authorization` para **Header Name** (Nombre del encabezado).<br>- Utiliza un valor de encabezado con el formato `Basic username:password`, codificado en base64. | Nombre del encabezado: `Authorization`<br>Valor del encabezado: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. Introduce un nombre para el destino.
8. En la sección **Configure Destination** (Configurar destino), introduce el endpoint al que desees enviar los logs. El endpoint debe empezar con `https://`. Por ejemplo, introduce `https://<your_account>.splunkcloud.com:8088`.  
    **Nota: `/services/collector/event` se anexa automáticamente al endpoint.
9. En la sección **Configure Authentication** (Configurar autenticación), introduce el token HEC de Splunk. Consulta [Configurar y utilizar HTTP Event Collector][1] para obtener más información sobre el token HEC de Splunk.  
    **Nota**: El [acuse de recibo del indexador][2] necesita ser desactivado.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. Introduce un nombre para el destino.
8. En la sección **Configure Destination** (Configurar destino), introduce los siguientes detalles:
  | Configuración | Descripción | Ejemplo |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **Endpoint** | Introduce el endpoint al que desees enviar los logs. El endpoint debe empezar con `https://`.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch)
| **Nombre del índice de destino** | Especifica el nombre del índice de destino al que desees enviar los logs.                                   | `your_index_name` |
| **Rotación del índice** | Opcionalmente, selecciona la frecuencia de creación de un nuevo índice: `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month`. El valor predeterminado es `No Rotation`. | `Every Day` |
9. En la sección **Configure Authentication** (Configurar autenticación), introduce el nombre de usuario y la contraseña de tu cuenta de Elasticsearch.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. Introduce un nombre para el destino.
8. La autenticación para el Microsoft Sentinel Forwarder requiere configurar un registro de aplicación a través de la integración de Datadog y Azure.
9. En la sección **Configure Destination** (Configurar destino), introduce los siguientes detalles:
  | Configuración | Descripción | Ejemplo |.
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Endpoint de ingesta de datos** | Introduce el endpoint en el endpoint de recopilación de datos (DCE) donde se envían los lgos. Aparece etiquetado como "Ingesta de logs" en la page (página) de información general del DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com` 
| **ID inmutable** | Especifique el ID inmutable de la regla de recopilación de datos (DCR) donde se definen las rutas de registro, tal y como se encuentra en la page (página) de información general de la DCR como "ID inmutable".  **Nota**: Asegúrate de que el rol de Editor de métricas de monitorización esté asignado en la configuración IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa` |
| **Nombre de la declaración de stream (flujo)**| Proporciona el nombre de la declaración de stream (flujo) de destino que se encuentra en el JSON de recursos de la DCR en `streamDeclarations`.  | `Custom-MyTable` 

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

<div class="alert alert-info">
<b>Vista previa disponible</b>: Puedes enviar logs a Google SecOps (Chronicle) desde Datadog <a href="https://www.datadoghq.com/product-preview/log-forwarding-to-google-chronicle/">Regístrate para la vista previa</a>.
</div>

7. Introduce un nombre para el destino.
8. La autenticación para Google Chronicle Forwarder requiere el uso de una cuenta de servicio de GCP con acceso de escritura a Chronicle.
9. En la sección **Configure Destination** (Configurar el destino), introduce los siguientes datos:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **ID de cliente** | El ID de cliente de Chronicle proporcionado por Google. | `abcd1234` 
| **Endpoint regional** | URL del punto final de la API de ingesta de Chronicle en función de tu región.  **Nota**: Asegúrate de que el rol de Editor de métricas de monitorización esté asignada en la configuración de IAM del DCR. | `https://us.chronicle.googleapis.com` |
| **Espacio de nombres**| El espacio de nombres en el que deben ingerirse tus logs de Chronicle.  | `default` 

10. En la sección **Configure authenticaton settngs** (Configurar los parámetros de autenticación), introduce los siguientes datos:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **ID del project (proyecto)**| El ID del project (proyecto) de GCP asociado con la instancia de Chronicle.  | `my-gcp-chronicle-project (proyecto)` |
| **ID de la clave privada** | El ID de la clave privada de las credenciales de tu cuenta de servicio.  | `0123456789abcdef` |
| **Clave privada**| La clave privada de las credenciales de tu cuenta de servicio.  | `-----BEGIN PRIVATE KEY-----\nMIIE...` |
| **Correo electrónico del cliente**| La dirección de correo electrónico de la cuenta de servicio.  | `chronicle-writer@my-gcp-chronicle-project (proyecto).iam.gserviceaccount.com` |
| **Client ID**| El ID del cliente de las credenciales de tu cuenta de servicio.  | `123456789012345678901` |

{{% /tab %}}

{{< /tabs >}}

10. En la sección **Select Tags to Forward** (Seleccionar tags (etiquetas) para reenviar):
    1. Selecciona si deseas que se incluyan **All tags** (Todas las tags (etiquetas)), **No tags** (Sin tags (etiquetas)) o **Specific tags** (Etiquetas específicas).
    1. Selecciona si deseas **Include** (Incluir) o **Exclude specific tags** (Excluir tags (etiquetas) específicas), y especifica qué etiquetas incluir o excluir.
11. Haz clic en **Save** (Guardar).


En la página [Reenvío de logs][4], sitúate sobre el estado de un destino para ver el porcentaje de logs que coinciden con los criterios de filtrado y que se han reenviado en la última hora.

## Editar un destino
1. Ve a [Log Forwarding (Reenvío de logs)][4].
2. Selecciona **Custom Destinations** (Destinos personalizados) para ver la lista de todos los destinos existentes.
3. Haz clic en el botón **Edit** (Editar) del destino que desees editar.
4. Realiza los cambios en la página de configuración.
5. Haz clic en **Save** (Guardar).

## Eliminar un destino
1. Ve a [Log Forwarding (Reenvío de logs)][4].
2. Selecciona **Custom Destinations** (Destinos personalizados) para ver la lista de todos los destinos existentes.
3. Haz clic en el botón **Delete** (Eliminar) del destino que quieres eliminar y luego en **Confirm** (Confirmar). De este modo, el destino se elimina de la lista de destinos configurados y los logs dejan de reenviarse a ese destino.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /es/logs/explorer/search_syntax/
[6]: /es/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /es/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /es/logs/log_configuration/forwarding_custom_destinations#delete-a-destination