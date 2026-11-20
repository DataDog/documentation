---
description: Configure Azure Private Link para enviar telemetría a Datadog de forma
  segura sin utilizar la red pública de internet, incluyendo la configuración del
  punto de conexión y la configuración de DNS.
title: Conéctese a Datadog a través de Azure Private Link
---
[Azure Private Link][1] le permite enviar telemetría a Datadog sin utilizar la red pública de internet.

Datadog expone algunos de sus servicios de ingesta de datos como [servicios de Azure Private Link][2].

Puede configurar Azure Private Link para exponer una dirección IP privada para cada servicio de ingesta de Datadog; esta dirección IP enruta el tráfico al backend de Datadog. Luego, puede configurar una [Zona DNS privada][3] de Azure para anular los nombres DNS correspondientes a los productos para cada punto de conexión que se consume.

## Configuración {#setup}

### Conecte un punto de conexión {#connect-an-endpoint}

1. En el portal de Azure, vaya a {{< ui >}}Private Link{{< /ui >}}.
2. En el menú de navegación izquierdo, seleccione {{< ui >}}Private endpoints{{< /ui >}}.
3. Seleccione {{< ui >}}Create{{< /ui >}}.
4. En la página {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Basics{{< /ui >}}, configure lo siguiente:
   - En {{< ui >}}Project details{{< /ui >}}, seleccione la {{< ui >}}Subscription{{< /ui >}} y la {{< ui >}}Resource group{{< /ui >}} desde las cuales los recursos de producción deben acceder a Private Link.
   - En {{< ui >}}Instance details{{< /ui >}}, ingrese un {{< ui >}}Name{{< /ui >}} (por ejemplo, `datadog-api-private-link`) y seleccione su {{< ui >}}Region{{< /ui >}}.

   Seleccione {{< ui >}}Next: Resource{{< /ui >}} para continuar.
5. En la página {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Resource{{< /ui >}}, configure lo siguiente:
   - Para {{< ui >}}Connection method{{< /ui >}}, seleccione {{< ui >}}Connect to an Azure resource by resource ID or alias{{< /ui >}}.
   - Para {{< ui >}}Resource ID or alias{{< /ui >}}, ingrese el nombre del servicio de Private Link que corresponde al servicio de ingesta de Datadog que desea utilizar. Puede encontrar este nombre de servicio en la [tabla de servicios publicados](#published-services).
   - Opcionalmente, para {{< ui >}}Request message{{< /ui >}}, puede ingresar su dirección de correo electrónico (asociada con una cuenta de Datadog). Esto ayuda a Datadog a identificar su solicitud y comunicarse con usted si es necesario.

   Seleccione {{< ui >}}Next: Virtual Network{{< /ui >}} para continuar.
6. En la página {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Virtual Network{{< /ui >}}, configure lo siguiente:
   - En {{< ui >}}Networking{{< /ui >}}, seleccione {{< ui >}}Virtual network{{< /ui >}} y {{< ui >}}Subnet{{< /ui >}} donde debe residir el punto de conexión. Por lo general, esto se encuentra en la misma red que los recursos de cómputo que necesitan acceder al punto de conexión privado.
   - En {{< ui >}}Private DNS integration{{< /ui >}}, seleccione {{< ui >}}No{{< /ui >}}.

   Seleccione {{< ui >}}Next: Tags{{< /ui >}} para continuar.
7. En la página {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Tags{{< /ui >}}, puede configurar etiquetas opcionalmente. Seleccione {{< ui >}}Next{{< /ui >}}.
8. En la página {{< ui >}}Review + create{{< /ui >}}, revise sus ajustes de configuración. Luego, seleccione {{< ui >}}Create{{< /ui >}}.
9. Una vez creado su punto de conexión privado, búsquelo en la lista. Tome nota del {{< ui >}}Private IP{{< /ui >}} de este punto de conexión, ya que se utiliza en la siguiente sección. El campo Estado de conexión debe ser Pendiente.
10. A continuación, la aprobación de Datadog es necesaria y manual. Comuníquese con el soporte técnico de Datadog y solicite la aprobación de su punto de conexión privado; incluya el nombre de su punto de conexión.
11. Después de que el soporte técnico de Datadog confirme que el punto de conexión se ha creado, confirme que funciona correctamente. En el portal de Azure, navegue a {{< ui >}}Home{{< /ui >}} > {{< ui >}}Private Endpoints{{< /ui >}}. Haga clic en el nombre del punto de conexión y confirme que el Estado de conexión muestra {{< ui >}}Approved{{< /ui >}}. 
12. Navegue a {{< ui >}}Monitoring{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}. Confirme que las métricas `Bytes In` y `Bytes Out` no sean cero. Estas métricas también deben ser capturadas por la integración de Datadog Azure como `azure.network_privateendpoints.pe_bytes_[in/out]`.

### Cree una zona DNS privada {#create-a-private-dns-zone}
1. En el portal de Azure, vaya a {{< ui >}}Private DNS zones{{< /ui >}}.
2. Seleccione {{< ui >}}Create{{< /ui >}}.
3. En la página {{< ui >}}Create Private DNS zone{{< /ui >}} > {{< ui >}}Basics{{< /ui >}}, configure lo siguiente:
   - En {{< ui >}}Project details{{< /ui >}}, seleccione la {{< ui >}}Subscription{{< /ui >}} y {{< ui >}}Resource group{{< /ui >}} desde las cuales los recursos de producción deben acceder al punto de conexión privado.
   - En {{< ui >}}Instance details{{< /ui >}}, para {{< ui >}}Name{{< /ui >}}, ingrese el _nombre DNS privado_ que corresponde al servicio de ingesta de Datadog que desea utilizar. Puede encontrar este nombre de servicio en la [tabla de servicios publicados](#published-services).

   Seleccione {{< ui >}}Review create{{< /ui >}}.
4. Revise sus ajustes de configuración. Luego, seleccione {{< ui >}}Create{{< /ui >}}.
5. Una vez creada la zona DNS privada, selecciónela de la lista.
6. En el panel que se abre, seleccione {{< ui >}}\+ Record set{{< /ui >}}.
7. En el panel {{< ui >}}Add record set{{< /ui >}}, configure lo siguiente:
   - Para {{< ui >}}Name{{< /ui >}}, ingrese `@`.
   - Para {{< ui >}}Type{{< /ui >}}, seleccione {{< ui >}}A - Address record{{< /ui >}}.
   - Para {{< ui >}}IP address{{< /ui >}}, ingrese la dirección IP que anotó al final de la sección anterior.

   Seleccione {{< ui >}}OK{{< /ui >}} para finalizar.
### Pasos adicionales requeridos para métricas y trazas {#additional-required-steps-for-metrics-and-traces}
Dos servicios de ingesta de Datadog son subdominios del `agent.`{{< region-param key="dd_site" code="true" >}} dominio. Debido a esto, la zona DNS privada es ligeramente diferente de otras ingestas.

Cree una zona DNS privada para `agent.`{{< region-param key="dd_site" code="true" >}}, como se describe en la sección anterior. Luego, agregue los tres registros a continuación.

| Nombre de DNS | Tipo de registro de recurso | Dirección IPv4 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | Dirección IP para su punto de conexión de métricas |
| `*`      | A                    | Dirección IP para su punto de conexión de métricas |
| `trace`  | A                    | Dirección IP para su punto de conexión de trazas |

**Nota**: Esta zona requiere un registro comodín (`*`) que apunte a la dirección IP de su punto de conexión de métricas. Esto se debe a que los agentes de Datadog envían telemetría utilizando un punto de conexión con versión en la forma (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).


## Servicios publicados {#published-services}

| Servicio de ingesta de Datadog | Nombre del servicio de Private Link | Nombre de DNS privado |
| --- | --- | --- |
| Registros (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Registros (OTel Collector con Datadog Exporter) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| Registros (HTTP Intake de usuario) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Métricas | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Process | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profiling | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Trazas | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone