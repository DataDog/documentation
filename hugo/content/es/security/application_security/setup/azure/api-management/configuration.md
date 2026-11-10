---
description: Implemente el servicio de callout de App and API Protection con la CLI
  de Azure, Bicep o Docker, y configure sus variables de entorno.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: Documentación
  text: Habilitación de App and API Protection para Azure API Management
- link: /security/application_security/setup/azure/api-management/policies
  tag: Documentación
  text: Directivas de Azure API Management para App and API Protection
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Código fuente
  text: Fuente del callout de App and API Protection para Azure API Management
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Configuración del callout de Azure API Management
---
{{< callout url="#" btn_hidden="true" header="App and API Protection para Azure API Management está en versión preliminar" >}}
Para probar la versión preliminar de App and API Protection para Azure API Management, utilice las siguientes instrucciones de configuración.
{{< /callout >}}

Esta página describe cómo implementar y configurar el servicio de callout de App and API Protection para Azure API Management (APIM) sin usar la plantilla de un solo clic. Si aún no ha implementado la integración, comience con [Habilitación de App and API Protection para Azure API Management][1].

El servicio de callout se distribuye como la imagen de contenedor `ghcr.io/datadog/dd-trace-go/apim-callout:latest`. Escucha en dos puertos:

- `8080` sirve el punto de conexión de callout, `POST /`, que maneja todas las fases de solicitud y respuesta.
- `8081` sirve el punto de conexión de salud, `GET /`.

## Opciones de implementación {#deployment-options}

{{< tabs >}}
{{% tab "CLI de Azure" %}}

El script `deploy/azure/deploy.sh` envuelve a `az deployment group create`.

Primero verifica que la CLI de Azure esté instalada y autenticada, que Bicep esté disponible, que el grupo de recursos exista y que el nivel de APIM no sea Consumption. Luego ejecuta `az deployment group what-if` para que pueda obtener una vista previa de los cambios antes de aplicarlos.

```shell
DD_API_KEY=<your-datadog-api-key> \
  ./deploy/azure/deploy.sh \
  --resource-group <rg-name> \
  --apim-name <apim-service-name>
```

Si tiene éxito, el script imprime la URL de callout, el nombre de host de Container Apps, la dirección IP del Datadog Agent, y si la política se implementó.

Este ejemplo omite tanto `--deploy-policy` como `--no-deploy-policy`, lo que hace que el script elija por usted. Lee la política existente en el contexto de destino y luego:

- Implementa la política cuando el contexto no tiene ninguna política, o solo tiene la estructura predeterminada.
- Omite la implementación cuando encuentra el callout de Datadog ya instalado, o cualquier contenido de política personalizado.

Esto difiere del módulo de Bicep, donde `deployPolicy` tiene como valor predeterminado `false`. Por lo tanto, el comando anterior puede escribir una política de APIM. Para garantizar que no se escriba ninguna política, pase `--no-deploy-policy`.

Flags disponibles:

| Flag                            | Descripción                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `--resource-group`, `-g`        | Grupo de recursos para la implementación.                                          |
| `--apim-name`                   | Nombre de la instancia de APIM que se va a proteger.                           |
| `--apim-resource-group`         | Grupo de recursos que contiene la instancia de APIM, si es diferente del grupo de recursos de implementación. También necesita permiso para crear recursos en ese grupo de recursos. La implementación crea una identidad administrada, una asignación de roles y un script de implementación allí. |
| `--api-ids`                     | Restrinja la política a IDs de API específicos.                        |
| `--deploy-policy`               | Inyecte la política de Datadog.                                      |
| `--no-deploy-policy`            | Omita la inyección de política.                                          |
| `--what-if`                     | Obtenga una vista previa de la implementación sin aplicarla.                     |
| `--name-prefix`                 | Prefijo para los nombres de los recursos creados.                              |
| `--container-image`             | Anule la imagen del contenedor de callout.                           |
| `--dd-site`                     | Sitio de Datadog.                                                   |
| `--log-analytics-workspace-id`  | ID de un área de trabajo de Log Analytics existente para los registros.                      |
| `--vnet-address-prefix`         | Espacio de direcciones para la red virtual creada. Los prefijos de subred son fijos, por lo que este valor debe contenerlos. Consulte [Rangos de direcciones](#address-ranges). |
| `--existing-vnet-id`            | ID de una red virtual existente que se utilizará. Consulte [Uso de una red virtual existente](#using-an-existing-virtual-network) para conocer las subredes requeridas y sus requisitos previos. |
| `--existing-aca-subnet-id`      | ID de una subred existente para el servicio de callout. Requerido con `--existing-vnet-id`. |
| `--existing-aci-subnet-id`      | ID de una subred existente para el Datadog Agent. Requerido con `--existing-vnet-id`. |
| `--enable-https`                | Servir el punto de conexión de callout a través de HTTPS.                          |
| `--no-locks`                    | Omitir bloqueos de recursos.                                            |
| `--min-replicas`                | Número mínimo de réplicas de callout.                                       |
| `--max-replicas`                | Número máximo de réplicas de callout.                                       |
| `--concurrent-requests`         | Solicitudes simultáneas por réplica antes de escalar horizontalmente.             |

El script lee `DD_API_KEY` y `DD_SITE` del entorno.

{{% /tab %}}

{{% tab "Módulo de Bicep" %}}

Haga referencia al módulo de Bicep directamente desde su propia infraestructura como código:

```bicep
module apimCallout 'path/to/contrib/azure/apim-callout/deploy/azure/main.bicep' = {
  name: 'dd-apim-callout'
  params: {
    datadogApiKey: keyVault.getSecret('dd-api-key')
    apimServiceName: 'my-apim'
    logAnalyticsWorkspaceId: logAnalytics.id
    // every other parameter has a default
  }
}
```

`datadogApiKey` y `apimServiceName` son obligatorios. Los parámetros restantes son opcionales: `apimResourceGroup`, `targetApiIds`, `logAnalyticsWorkspaceId`, `namePrefix`, `location`, `datadogSite`, `deployPolicy`, `enableHttps`, `containerImage`, `vnetAddressPrefix`, `existingVnetId`, `existingAcaSubnetId`, `existingAciSubnetId`, `enableLocks`, `minReplicas`, `maxReplicas`, `concurrentRequestsThreshold` y `customTags`.

Establecer `existingVnetId` hace que `existingAcaSubnetId` y `existingAciSubnetId` sean obligatorios, y agrega requisitos previos en esas subredes. Establecer `vnetAddressPrefix` no mueve las subredes. Para ambos, consulte [Redes](#networking).

Valores predeterminados:

| Parámetro                     | Predeterminado                                           |
|-------------------------------|---------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                         |
| `datadogSite`                 | `datadoghq.com`                                   |
| `deployPolicy`                | `false`                                           |
| `enableHttps`                 | `false`                                           |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest` |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                     |
| `minReplicas` / `maxReplicas` | `1` / `10`                                        |
| `concurrentRequestsThreshold` | `20`                                              |
| `targetApiIds`                | vacío, lo cual aplica a todas las API                  |

Los valores `datadogSite` aceptados son `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, `ap2.datadoghq.com` y `ddog-gov.com`. Su sitio es {{< region-param key="dd_site" code="true" >}}.

{{% /tab %}}

{{% tab "Docker" %}}

Para pruebas locales o para alojamiento fuera de Azure, ejecute la imagen directamente:

```shell
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -e DD_AGENT_HOST=datadog-agent \
  ghcr.io/datadog/dd-trace-go/apim-callout:latest
```

Confirme que el servicio se esté ejecutando:

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

Un contenedor alojado de esta manera aún necesita alcance de red desde la puerta de enlace de APIM y un Datadog Agent para recibir trazas y eventos de seguridad.

{{% /tab %}}
{{< /tabs >}}

## Redes {#networking}

### Rangos de direcciones {#address-ranges}

`vnetAddressPrefix` y `--vnet-address-prefix` establecen el espacio de direcciones de la red virtual, pero los prefijos de subred dentro de ella son fijos:

| Subred             | Prefijo         |
|--------------------|----------------|
| Servicio de callout    | `10.0.1.0/27`  |
| Datadog Agent      | `10.0.2.0/24`  |
| APIM               | `10.0.3.0/27`  |

Debido a que la implementación no deriva las subredes del espacio de direcciones, cualquier valor que establezca debe contener estos tres prefijos. El valor predeterminado `10.0.0.0/16` sí lo hace. Un valor como `10.1.0.0/16` deja las subredes fuera de la red virtual y la implementación falla.

Para colocar el servicio de callout en un rango de direcciones diferente, proporcione su propia red con `existingVnetId` en su lugar.

### Uso de una red virtual existente {#using-an-existing-virtual-network}

Establecer `existingVnetId` hace que la implementación omita la red virtual, las subredes, los grupos de seguridad de red y la puerta de enlace NAT. Usted los proporciona en su lugar, por lo que `existingAcaSubnetId` y `existingAciSubnetId` se vuelven obligatorios, y cada subred debe cumplir con los requisitos que la implementación habría configurado de otro modo:

- La subred de callout necesita una delegación `Microsoft.App/environments` y suficientes direcciones para el entorno de Container Apps.
- La subred del Datadog Agent necesita una delegación `Microsoft.ContainerInstance/containerGroups` y conectividad de salida para que el Datadog Agent pueda comunicarse con Datadog.
- El servicio de callout debe comunicarse con el Datadog Agent en el puerto `8126`.

La implementación tampoco crea ninguna subred de APIM en este modo, por lo que la instancia de APIM ya debe estar integrada con la misma red virtual. De lo contrario, el paso de configuración de APIM puede fallar o APIM no podrá resolver el servicio de callout.

## Configuración {#configuration}

El servicio de callout habilita el Web Application Firewall (WAF) de Datadog por sí mismo al iniciarse, por lo que no necesita establecer `DD_APPSEC_ENABLED`.

El servicio admite las siguientes configuraciones:

| Variable de entorno               | Valor predeterminado | Descripción                                                                                                                         |
|------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APIM_CALLOUT_HOST`             | `0.0.0.0`     | Dirección en la que escucha el servicio de callout.                                                                                            |
| `DD_APIM_CALLOUT_PORT`             | `8080`        | Puerto para el punto de conexión de callout (`POST /`).                                                                                           |
| `DD_APIM_CALLOUT_HEALTHCHECK_PORT` | `8081`        | Puerto para el punto de conexión de salud (`GET /`).                                                                                             |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`| `10485760`    | Número máximo de bytes del cuerpo analizados, en bytes (10 MB). Establezca en `0` para omitir el análisis del cuerpo, lo que reduce el intercambio a dos llamadas.  |
| `DD_APIM_CALLOUT_REQUEST_TIMEOUT`  | `30s`         | Tiempo de vida para el estado almacenado en caché por solicitud. El estado huérfano se libera después de esta duración.                                           |
| `DD_APIM_CALLOUT_TLS`              | `false`       | Servir HTTPS en lugar de HTTP.                                                                                                        |
| `DD_APIM_CALLOUT_TLS_CERT_FILE`    | (vacío)       | Ruta al certificado TLS. Requerido cuando TLS está habilitado.                                                                          |
| `DD_APIM_CALLOUT_TLS_KEY_FILE`     | (vacío)       | Ruta a la clave privada TLS. Requerido cuando TLS está habilitado.                                                                          |

## Valores predeterminados automáticos {#automatic-defaults}

Si las siguientes variables no están definidas, el servicio las asigna al inicio:

| Variable de entorno          | Valor     | Descripción                                                    |
|-------------------------------|-----------|----------------------------------------------------------------|
| `DD_APM_TRACING_ENABLED`      | `false`   | Si se deben enviar trazas de APM para el propio servicio de callout.                |
| `DD_APPSEC_WAF_TIMEOUT`       | `10ms`    | Presupuesto de evaluación de WAF por solicitud.                             |
| `DD_TRACE_PROPAGATION_STYLE`  | `datadog` | Formato de los encabezados de traza inyectados en las solicitudes.    |

Si una evaluación de WAF individual excede su presupuesto, se permite la solicitud en lugar de retrasarla.

## Conexión del Datadog Agent {#datadog-agent-connection}

El servicio de callout no envía datos directamente a Datadog. Envía trazas y eventos de seguridad a un Datadog Agent, el cual los reenvía a Datadog. El servicio de callout y el Agent se ejecutan en contenedores separados, y cada uno tiene sus propias variables de entorno.

En el **contenedor de callout**:

| Variable de entorno | Valor predeterminado | Descripción                           |
|----------------------|---------------|---------------------------------------|
| `DD_AGENT_HOST`      | `localhost`   | Nombre de host o IP de su Datadog Agent. |

En el **contenedor del Datadog Agent**:

| Variable de entorno      | Valor predeterminado   | Descripción                                                                                       |
|---------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `DD_API_KEY`              | (obligatorio)      | Su clave de Datadog API.                                                                             |
| `DD_SITE`                 | `datadoghq.com` | Su sitio de Datadog.                                                                                |
| `DD_APM_ENABLED`          | `false`         | Establezca `true`. De lo contrario, el Agent no acepta trazas.                                        |
| `DD_APM_NON_LOCAL_TRAFFIC`| `false`         | Establezca `true`. El callout se ejecuta en un contenedor separado, por lo que su tráfico no es local para el Agent. |
| `DD_APM_RECEIVER_PORT`    | `8126`          | Puerto en el que el Agent acepta trazas. El callout debe poder alcanzarlo.                           |

Debido a que el callout se ejecuta en su propio contenedor, `DD_APM_ENABLED` y `DD_APM_NON_LOCAL_TRAFFIC` son necesarios. Sin ellos, el Agent descarta los spans y eventos de seguridad que produce esta integración. La implementación con un solo clic configura todo esto en el contenedor del Agent por usted.

No configure `DD_API_KEY` en el contenedor de callout. La implementación con un solo clic configura `DD_AGENT_HOST` en el contenedor de callout y asigna `datadogApiKey` y `datadogSite` a `DD_API_KEY` y `DD_SITE` en el contenedor del Agent.

Su sitio es {{< region-param key="dd_site" code="true" >}}.

## Cifrado del punto de conexión de callout {#encrypting-the-callout-endpoint}

Para servir el punto de conexión de callout a través de HTTPS, configure `DD_APIM_CALLOUT_TLS` en `true` y proporcione tanto `DD_APIM_CALLOUT_TLS_CERT_FILE` como `DD_APIM_CALLOUT_TLS_KEY_FILE`. Si TLS está habilitado y falta alguno de los archivos, el servicio no se inicia. La versión mínima de TLS aceptada es 1.2.

Cuando TLS está habilitado, la política de APIM debe llamar al servicio a través de `https://`.

## Verificación de estado {#health-check}

Verifique el punto de conexión de estado en el puerto `8081`:

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

Una respuesta `200` indica que el servicio se está ejecutando, pero no indica el estado del WAF. Para confirmar que los datos de seguridad están llegando, utilice las verificaciones de la interfaz de usuario de Datadog descritas en [Enabling App and API Protection for Azure API Management][1].

## Dimensionamiento y rendimiento {#sizing-and-performance}

En una implementación de Azure Container Apps de 0.5 vCPU y 1 GiB, las fases de request-headers y response-headers tardan aproximadamente 2.4 ms cada una. La canalización completa de APIM, incluidos los callouts y el backend, tarda aproximadamente 9.7 ms.

Las fases de cuerpo se ejecutan solo cuando la inspección de cuerpo está habilitada y la fase anterior solicitó el cuerpo. La puerta de enlace mantiene un grupo de conexión al servicio de callout, lo que puede reducir la latencia en producción.

Para minimizar el tiempo de ida y vuelta de la red, implemente el servicio de callout en la misma región de Azure que su instancia de APIM y mantenga APIM cerca de sus consumidores de API. De forma predeterminada, el servicio escala de 1 a 10 réplicas y se escala horizontalmente a 20 solicitudes simultáneas por réplica.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/azure/api-management