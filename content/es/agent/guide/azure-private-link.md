---
title: Conéctate a Datadog a través de Azure Private Link
---

{{% site-region region="us,us5,eu,gov,ap1" %}}
<div class="alert alert-warning">Esta función no es compatible con el sitio de Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us3" %}}
[Azure Private Link][1] te permite enviar telemetría a Datadog sin utilizar la Internet pública.

Datadog expone parte de sus servicios de consumo de datos como [servicios de Azure Private Link][2].

Puedes configurar Azure Private Link para exponer una dirección IP privada por cada servicio de consumo de Datadog; esta dirección IP enruta el tráfico al backend de Datadog. A continuación, puedes configurar una [zona DNS privada][3] de Azure para anular los nombres DNS correspondientes a los productos de cada endpoint consumido.

## Python

### Conectar un endpoint

1. En el portal de Azure, ve a **Private Link**.
2. En el menú de navegación de la izquierda, selecciona **Private endpoints** (Endpoints privados).
3. Selecciona **Create** (Crear).
4. En la página **Create a private endpoint** > **Basics** (Crear un endpoint privado > Aspectos básicos), configura:
   - En **Project details** (Detalles del proyecto), selecciona la **Subscription** (Suscripción) y el **Resource group** (Grupo de recursos) desde los que los recursos de producción deben acceder a Private Link.
   - En **Instance details** (Detalles de la instancia), ingresa un **Name** (Nombre) (por ejemplo, `datadog-api-private-link`) y selecciona tu **Region** (Región).

   Selecciona **Next: Resource** (Siguiente: Recurso) para continuar.
5. En la página **Create a private endpoint** > **Resource** (Crear un endpoint privado > Recurso), configura lo siguiente:
   - Para **Connection method** (Método de conexión), selecciona **Connect to an Azure resource by resource ID or alias** (Conectarse a un recurso Azure por ID de recurso o alias).
   - En **Resource ID or alias** (Recurso ID o alias), introduce el nombre del servicio de Private Link que corresponda al servicio de consumo de Datadog que quieres utilizar. Puedes encontrar este nombre de servicio en la [tabla de servicios publicados](#published-servicios).
   - Opcionalmente, en **Request message** (Mensaje de solicitud), puedes introducir tu dirección de correo electrónico (asociada a una cuenta de Datadog). Esto ayuda a Datadog a identificar tu solicitud y a ponerse en contacto contigo, si es necesario.

   Selecciona **Next: Virtual Network** (Siguiente: Virtual red) para continuar.
6. En la página **Create a private endpoint** > **Virtual Network** (Crear un endpoint privado > Red virtual), configura lo siguiente:
   - En **Networking** (Redes), selecciona la **Virtual network** (Red virtual) y la **Subnet** (Subred) donde debe estar alojado el endpoint. Normalmente, se encuentra en la misma red que los recursos informáticos que necesitan acceder al endpoint privado.
   - En **Private DNS integration** (Integración de DNS privado), selecciona **No**.

   Selecciona **Next: Tags** (Siguiente: Etiquetas (tags) para continuar.
7. En la página **Create a private endpoint** > **Tags** (Crear un endpoint privado > Etiquetas (tags), puedes configurar opcionalmente etiquetas. Selecciona **Next** (Siguiente).
8. En la página **Review + create** (Revisar + crear), revisa tus configuraciones. A continuación, selecciona **Create** (Crear).
9. Una vez creado tu endpoint privado, búscalo en lista. Toma nota de la **IP privada** de este endpoint, ya que se utilizará en la siguiente sección.

### Crear una zona DNS privada
1. En el portal Azure, ve a **Private DNS zones** (Zonas DNS privadas).
2. Selecciona **Create** (Crear).
3. En la página **Create Private DNS zone** > **Basics** (Crear zona DNS privada > Aspectos básicos), configura:
   - En **Project details** (Detalles del proyecto), selecciona la **Subscription** (Suscripción) y el **Resource group** (Grupo de recursos) desde los que los recursos de producción deben acceder al endpoint privado.
   - En **Instance details** (Detalles de la instancia), en **Name** (Nombre), introduce el nombre de DNS privado que corresponde al servicio de consumo de Datadog que quieres utilizar. Puedes encontrar este nombre servicio en la [tabla de servicios publicados](#published-servicios).

   Selecciona **Review + create** (Revisar + crear).
4. Revisa tus configuraciones. A continuación, selecciona **Create** (Crear).
5. Una vez creada la zona DNS privada, selecciónala en lista.
6. En el panel que se abre, selecciona **+ Record set** (+ Conjunto de registros).
7. En el panel **Add record set** (Añadir conjunto de registros), configura lo siguiente:
   - En **Name** (Nombre), introduce `*`.
   - En **Type** (Tipo), selecciona **A - Address record** (A - Registro de direcciones).
   - En **IP address** (Dirección IP), introduce la dirección IP que anotaste al final de la sección anterior.

   Selecciona **OK** (Aceptar) para finalizar.

## Servicios publicados

| Servicio de consumo de Datadog | Nombre de servicio de Private LInk | Nombre de DNS privado |
| --- | --- | --- |
| Logs (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Logs (Consumo HTTP del usuario) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| Python | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Facturación | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `metrics.agent.us3.datadoghq.com` |
| Ver una lista con todos los equipos de incidencias  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Proceso | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Elaboración de perfiles | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Trazas (traces) | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `trace.agent.us3.datadoghq.com` |
| Solucionar problemas | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Conectar logs y trazas | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone
{{% /site-region %}}