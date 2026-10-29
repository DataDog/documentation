---
description: Agregue detección y bloqueo de amenazas a su puerta de enlace de Azure
  API Management con el servicio de callout de App and API Protection.
further_reading:
- link: /security/application_security/setup/azure/api-management/configuration
  tag: Documentación
  text: Configuración del callout de Azure API Management
- link: /security/application_security/setup/azure/api-management/policies
  tag: Documentación
  text: Directivas de Azure API Management para App and API Protection
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Código fuente
  text: Fuente del callout de App and API Protection para Azure API Management
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de App and API Protection para Azure API Management
---
{{< callout url="#" btn_hidden="true" header="App and API Protection para Azure API Management está en versión preliminar" >}}
Para probar la versión preliminar de App and API Protection para Azure API Management, utilice las siguientes instrucciones de configuración.
{{< /callout >}}

App and API Protection para Azure API Management (APIM) agrega detección y bloqueo de amenazas a su puerta de enlace APIM sin requerir cambios en el código de su backend. APIM es un servicio administrado, por lo que no puede ejecutar un trazador en proceso. En su lugar, Datadog proporciona un servicio de llamada HTTP que la puerta de enlace invoca desde una política de APIM. Para cada solicitud, el servicio ejecuta el Web Application Firewall (WAF) de Datadog y devuelve una decisión: continuar o bloquear.

La protección se aplica en la puerta de enlace, por lo que cubre todas las API detrás de la puerta de enlace, independientemente del lenguaje. Esto incluye API de terceros y heredadas que usted no posee.

## Cómo funciona {#how-it-works}

Azure API Management evalúa las políticas al entrar y al salir. La política de Datadog agrega una llamada [`send-request`][1] al servicio de llamada de Datadog en cada etapa, luego lee la decisión de una variable de política.

El intercambio utiliza cuatro llamadas:

1. **Entrada, encabezados de solicitud.** El servicio devuelve un ID de solicitud, encabezados de propagación de traza de Datadog y, cuando se aplica la inspección del cuerpo, la cantidad de bytes del cuerpo que acepta.
2. **Entrada, cuerpo de solicitud.** Se ejecuta solo cuando la fase anterior solicitó el cuerpo.
3. **Salida, encabezados de respuesta.**
4. **Salida, cuerpo de respuesta.** Se ejecuta solo cuando la fase anterior solicitó el cuerpo.

El ID de solicitud vincula las cuatro fases a un único contexto de evaluación de WAF. Si una fase de entrada devuelve una decisión de bloqueo, APIM devuelve la respuesta de bloqueo al cliente y nunca llama a su backend. Si una fase de salida devuelve una decisión de bloqueo, el backend ya se ha ejecutado y APIM reemplaza su respuesta con la respuesta de bloqueo. Si la decisión es continuar, APIM inyecta encabezados de contexto de traza de Datadog y reenvía la solicitud como de costumbre.

La integración es de tipo fail-open en cada etapa. Cada callout establece `ignore-error="true"`, por lo que si el servicio de callout no está disponible, agota el tiempo de espera o responde con algo distinto a `200`, el tráfico continúa sin modificaciones. Una misconfiguración se muestra como datos de seguridad faltantes en lugar de tráfico interrumpido.

Para conocer los aspectos internos de la política, consulte [Políticas de Azure API Management para App and API Protection][2].

## Requisitos previos {#prerequisites}

- Una suscripción de Azure.
- Una instancia de Azure API Management existente en el nivel **Developer**, **Standard v2** o **Premium**. Esta integración coloca el servicio de callout dentro de una red virtual y requiere la integración de red virtual de APIM, por lo que el nivel **Consumption** no es compatible.
- Una [clave de Datadog API][3].
- Permiso para implementar plantillas ARM o Bicep en el grupo de recursos de destino y para editar políticas de APIM.
- `Microsoft.Authorization/roleAssignments/write` en el recurso de APIM. La plantilla otorga el rol de **Colaborador del Servicio de API Management** a una identidad administrada para que pueda configurar la integración de red virtual. Esta asignación de roles se crea en cada implementación, incluso cuando `deployPolicy` es `false`.
- Opcional: un área de trabajo de Log Analytics existente para recopilar registros de Apps de contenedor.

## Implemente el servicio de callout {#deploy-the-callout-service}

Haga clic en **Implementar en Azure** y complete el formulario en el portal de Azure:

[![Implementar en Azure](https://aka.ms/deploytoazurebutton)][4]

Se requieren dos parámetros:

| Parámetro         | Valor                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `datadogApiKey`   | Su clave de Datadog API. En el portal de Azure, seleccione **Referenciar un secreto de Key Vault** para usar un secreto de Key Vault existente.|
| `apimServiceName` | El nombre de la instancia de APIM existente que se va a proteger.                                                                                          |

La plantilla aprovisiona:

- Una red virtual con subredes separadas para APIM, el servicio de callout y el Datadog Agent. La plantilla también crea grupos de seguridad de red y una puerta de enlace NAT para la salida.
- El servicio de callout en Azure Container Apps con escalado automático HTTP de KEDA. La entrada está en el puerto `8080`, la sonda de estado en el puerto `8081`, y el servicio escala de 1 a 10 réplicas a 20 solicitudes simultáneas por réplica.
- El Datadog Agent en Azure Container Instances en una subred privada. El servicio de callout envía trazas y eventos de seguridad al Agent.
- Una zona DNS privada y un enlace de red virtual para que APIM pueda resolver el nombre de host interno de Apps de contenedor.
- Integración de red virtual en la instancia de APIM existente y, opcionalmente, la propia política de Datadog.

Todos los demás parámetros tienen un valor predeterminado. Los valores predeterminados útiles incluyen:

| Parámetro                     | Valor predeterminado                                              |
|-------------------------------|------------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                            |
| `datadogSite`                 | {{< region-param key="dd_site" code="true" >}}       |
| `deployPolicy`                | `false`                                              |
| `enableHttps`                 | `false`                                              |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest`    |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                        |
| `minReplicas` / `maxReplicas` | `1` / `10`                                           |
| `concurrentRequestsThreshold` | `20`                                                 |
| `targetApiIds`                | Vacío, lo que se aplica a todas las API                     |

Para implementar desde la línea de comandos o desde su propia infraestructura como código, consulte [Configuración del callout de Azure API Management][5].

## Aplique la política de Datadog {#apply-the-datadog-policy}

El servicio de callout solo inspecciona el tráfico que la puerta de enlace le envía, por lo que adjunte la política de Datadog a las API que desea proteger.

Tiene dos opciones:

- Establezca `deployPolicy` en `true` y permita que la implementación inyecte la política. El parámetro `targetApiIds` selecciona qué API reciben la política y, de forma predeterminada, se aplica a todas las API.
- Aplique usted mismo el XML de la política proporcionada en el editor de políticas de APIM. Reemplace cada aparición de la URL de marcador de posición `https://<dd-apim-callout-host>:8080` con la salida `calloutBaseUrl` de la implementación, no solo con el nombre de host. La salida es `http://<ACA-FQDN>` a menos que establezca `enableHttps` en `true`, y no incluye un puerto. Dejar el esquema `https` o el sufijo `:8080` en su lugar hace que la política no detecte el servicio y opere en modo fail-open.

<div class="alert alert-warning">
Configuración <code>deployPolicy</code> a <code>true</code> <strong>reemplaza</strong> la política en cada contexto seleccionado. No se combina con lo que ya existe, por lo que se pierden las reglas existentes en ese contexto. Aplique la política usted mismo cuando las API que está protegiendo ya tengan contenido de política, y combine los fragmentos de entrada y salida de Datadog en sus secciones existentes.
</div>

Para conocer el contenido de las políticas, los ámbitos de asociación y cómo un bloqueo se convierte en una respuesta de cliente, consulte [Directivas de Azure API Management para la protección de aplicaciones y API][2].

## Validar la implementación {#validate-the-deployment}

Envíe una solicitud normal, luego un ataque simulado:

```shell
# Normal request: passes through to your backend
curl -v https://<apim-gateway-host>/<api-path>

# Simulated attack: returns 403
curl -v -A dd-test-scanner-log-block "https://<apim-gateway-host>/<api-path>"
```

Verifique los resultados en Datadog:

1. Abra [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App and API Protection{{< /ui >}}][6] y confirme que el ataque simulado aparece como una señal.
2. Abra el [Inventario de servicios de protección de aplicaciones y API][7] y confirme que el servicio `apim-callout` aparece. Sus spans tienen la etiqueta `component:apim-callout`. Para usar un nombre de servicio diferente, establezca `DD_SERVICE` en el contenedor de callout.

El servicio de callout también expone un punto de conexión de estado de salud en el puerto `8081`. El ingress de Container Apps publica solo el puerto `8080`, por lo que el punto de conexión de salud es accesible únicamente desde dentro del contenedor. Azure Container Apps lo utiliza para sondeos de actividad y preparación. Para verificar su estado, revise el estado de la réplica en Azure Portal.

## Rendimiento {#performance}

Medido en una implementación de Azure Container Apps de 0.5 vCPU y 1 GiB:

| Fase                                                          | Tiempo de procesamiento |
|----------------------------------------------------------------|-----------------|
| Encabezados de solicitud                                                | ~2.4 ms         |
| Encabezados de respuesta                                               | ~2.4 ms         |
| Canalización completa de APIM, incluyendo tanto los callouts como el backend    | ~9.7 ms         |

Las fases de cuerpo solo se ejecutan cuando la inspección de cuerpo está habilitada y la fase anterior solicitó el cuerpo. Para minimizar el tiempo de ida y vuelta de la red, implemente el callout service en la misma región de Azure que su instancia de APIM.

## Compatibilidad {#compatibility}

Para conocer las capacidades que admite esta integración y las versiones en las que se introdujeron, consulte los [requisitos de compatibilidad de App and API Protection][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: /es/security/application_security/setup/azure/api-management/policies
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdd-trace-go%2Fmain%2Fcontrib%2Fazure%2Fapim-callout%2Fdeploy%2Fazure%2Fazuredeploy.json
[5]: /es/security/application_security/setup/azure/api-management/configuration
[6]: https://app.datadoghq.com/security/appsec
[7]: https://app.datadoghq.com/security/appsec/inventory/services
[8]: /es/security/application_security/setup/compatibility/