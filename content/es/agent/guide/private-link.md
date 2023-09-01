---
kind: guía
title: Conectarse a Datadog a través de AWS PrivateLink
---

{{% site-region region="us3,us5,eu,gov,ap1" %}}
<div class="alert alert-warning">PrivateLink de Datadog no es compatible con el sitio de Datadog seleccionado.</div>
{{< /site-region >}}

{{% site-region region="us" %}}
En esta guía, te explicaremos cómo configurar [AWS PrivateLink][1] para utilizarlo con Datadog.

## Información general

En general, el proceso consiste en configurar un endpoint interno en tu nube virtual privada (VPC, por siglas en inglés) al que puedan enviar datos los Datadog Agent locales. Después, el endpoint de tu VPC se conecta con el endpoint de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Esquema del diagrama de la VPC" >}}

## Configuración

Datadog expone los endpoints de AWS PrivateLink en **us-east-1**.

Sin embargo, para dirigir el tráfico al PrivateLink de Datadog disponible en `us-east-1` desde otras regiones, utiliza la [interconexión interregional de la VPC de Amazon][2]. La interconexión interregional de la VPC permite establecer conexiones entre VPC de diferentes regiones de AWS. Esto permite la comunicación entre recursos de VPC de distintas regiones mediante direcciones IP privadas. Para obtener más información, consulta [¿Qué es una interconexión de VPC?][2].

{{< tabs >}}
{{% tab "us-east-1" %}}

1. Conecta la consola de AWS a la región **us-east-1** y crea un endpoint de VPC.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear endpoint de VPC" style="width:60%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Rellena el campo de texto _Service Name_ (Nombre del servicio) de acuerdo con el servicio para el que deseas configurar AWS PrivateLink:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:70%;" >}}

| Datadog                   | Nombre del servicio de PrivateLink                                  | Nombre del DNS privado                                   |
|---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
| Logs (entrada HTTP del Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
| Logs (entrada HTTP del usuario)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
| Métricas                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
| Contenedores                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |
| Proceso                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
| Elaboración de perfiles                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
| Trazas (traces)                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |

4. Haz clic en **Verify** (Verificar). Si esta acción no devuelve el mensaje _Service name found_ (Nombre de servicio encontrado), contacta con el [equipo de asistencia de Datadog][1].
5. Selecciona la VPC y las subredes que deben conectarse con el endpoint del servicio de la VPC de Datadog.
6. En **Enable DNS name** (Habilitar el nombre del DNS), asegúrate de que está marcada la opción _Enable for this endpoint_ (Habilitar para este endpoint):

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Selecciona el grupo de seguridad que prefieras para establecer qué puede enviar tráfico a este endpoint de la VPC.

   **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

8. Haz clic en **Create endpoint** (Crear endpoint), en la parte inferior de la pantalla. Si el proceso finaliza correctamente, aparecerá lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de la VPC creado" style="width:60%;" >}}

9. Haz clic en el ID del endpoint de la VPC para comprobar su estado.
10. Espera a que el estado pase de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tardar hasta 10 minutos. Cuando indique _Available_, ya podrás utilizar AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:60%;" >}}

11. Si estás recopilando datos de logs, asegúrate de que tu Agent está configurado para enviar logs a través de HTTPS. Si los datos no están ya ahí, añade lo siguiente en el [archivo de configuración `datadog.yaml` del Agent][2]:

    ```yaml
    logs_config:
        use_http: true
    ```

    Si estás utilizando el Agent del contenedor, define la siguiente variable de entorno:

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    Esta configuración es obligatoria cuando se envían logs a Datadog con AWS PrivateLink y el Datadog Agent, pero no es necesaria para la extensión Lambda. Para obtener más información, consulta la sección sobre la [recopilación de logs del Agent][3].

12. Si tu extensión Lambda carga la clave de API de Datadog desde AWS Secrets Manager usando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, tendrás que [crear un endpoint de VPC para Secrets Manager][4].

13. [Reinicia tu Agent][5] para enviar datos a Datadog mediante AWS PrivateLink.



[1]: /es/help/
[2]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /es/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Interconexión de la VPC" %}}

### Cómo interconectar la VPC de Amazon

1. Conecta la consola de AWS a la región **us-east-1** y crea un endpoint de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear endpoint de VPC" style="width:80%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Rellena el campo de texto _Service Name_ (Nombre del servicio) de acuerdo con el servicio para el que deseas configurar AWS PrivateLink:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:90%;" >}}

| Datadog                   | Nombre del servicio de PrivateLink                                  |
|---------------------------| --------------------------------------------------------- |
| Métricas                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| Logs (entrada HTTP del Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| Logs (entrada HTTP del usuario)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |
| Proceso                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| Elaboración de perfiles                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| Trazas (traces)                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |
| Contenedores                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

4. Haz clic en **Verify** (Verificar). Si esta acción no devuelve el mensaje _Service name found_ (Nombre de servicio encontrado), contacta con el [equipo de asistencia de Datadog][1].

5. A continuación, selecciona la VPC y las subredes que deben conectarse con el endpoint del servicio de la VPC de Datadog. No selecciones **Enable DNS name** (Habilitar el nombre del DNS), ya que la interconexión de la VPC requiere que el DNS se configure de forma manual.

6. Selecciona el grupo de seguridad que prefieras para establecer qué puede enviar tráfico a este endpoint de la VPC.

   **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

7. Haz clic en **Create endpoint** (Crear endpoint), en la parte inferior de la pantalla. Si el proceso finaliza correctamente, aparecerá lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de la VPC creado" style="width:80%;" >}}

8. Haz clic en el ID del endpoint de la VPC para comprobar su estado.
9. Espera a que el estado pase de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tardar hasta 10 minutos.
10. Después de crear el endpoint, aprovecha la interconexión de la VPC para permitir que el endpoint de PrivateLink esté disponible en otra región y enviar telemetría a Datadog a través de PrivateLink. Para obtener más información, consulta [Trabaje con interconexiones de VPC][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:80%;" >}}

### Amazon Route53

1. Crea una [zona alojada privada de Route53][3] para cada servicio para el que hayas creado un endpoint de AWS PrivateLink. Añade la zona alojada privada a la VPC en `us-east-1`.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Crear una zona alojada privada de Route53" style="width:80%;" >}}

Utiliza la siguiente lista para asignar el servicio y el nombre del DNS a diferentes partes de Datadog:

  | Datadog                   | Nombre del servicio de PrivateLink                                  | Nombre del DNS privado                                   |
  |---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
  | Métricas                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
  | Logs (entrada HTTP del Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
  | Logs (entrada HTTP del usuario)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
  | API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
  | Proceso                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
  | Elaboración de perfiles                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
  | Trazas (traces)                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |
  | Contenedores                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |

  También puedes encontrar esta información si realizas una consulta a la API de AWS, `DescribeVpcEndpointServices`, o si utilizas el siguiente comando de la CLI: `aws ec2 describe-vpc-endpoint-services --service-names <service-name>`.

  Por ejemplo, en el caso del endpoint de métricas de Datadog:

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8 | jq '.ServiceDetails[0].PrivateDnsName'
  ```

Esto devuelve `metrics.agent.datadoghq.com`, que es el nombre de la zona alojada privada que necesitas para asociarla con la VPC en la que se origina el tráfico del Agent. Al anular este registro, se obtienen todos los nombres de host de entrada relacionados con las métricas.

2. En cada una de las nuevas zonas alojadas privadas de Route53, crea un registro A con el mismo nombre. Activa la opción **Alias**; luego, en **Route traffic to** (Dirigir tráfico hacia), elige **Alias to VPC endpoint** (Alias al endpoint de la VPC), **us-east-1**, e introduce el nombre del DNS del endpoint de la VPC asociado con el nombre del DNS.

   **Notas**:
      - Para obtener el nombre de tu DNS, consulta la [documentación dedicada a la configuración del nombre de DNS privado de los servicios de endpoint][4].
      - El Agent envía telemetría a endpoints con versión, como`<version>-app.agent.datadoghq.com`, que cambia el nombre a `metrics.agent.datadoghq.com` mediante un alias CNAME. Por lo tanto, solo es necesario configurar una zona alojada privada para `metrics.agent.datadoghq.com`.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Crear un registro A" style="width:90%;" >}}

3. Configura la interconexión y el enrutamiento de la VPC de `us-east-1` que contiene los endpoints del PrivateLink de Datadog y la VPC en la región donde se ejecutan los Datadog Agents.

4. Si las VPC se encuentran en diferentes cuentas de AWS, la VPC que contiene el Datadog Agent debe estar autorizada para asociarse con las zonas alojadas privadas de Route53 antes de continuar. Crea una [autorización de asociación para la VPC][5] en cada zona alojada privada de Route53 utilizando la región y el ID de la VPC donde se ejecuta el Datadog Agent. Esta opción no está disponible en la consola de AWS y debe configurarse con la CLI, SDK o API de AWS.

5. Edita la zona alojada de Route53 para añadir la VPC de non-us-east-1.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Editar una zona alojada privada de Route53" style="width:80%;" >}}

6. Las VPC que tienen una zona alojada privada (o PHZ, por sus siglas en inglés) adjunta necesitan tener ciertas configuraciones específicas activadas; concretamente, las opciones `enableDnsHostnames` y `enableDnsSupport` de las VPC a las que está asociada la PHZ. Consulta [Consideraciones sobre el uso de una zona alojada privada][5].

7. [Reinicia el Agent][7] para enviar datos a Datadog mediante AWS PrivateLink.

#### Solucionar problemas de resolución y conectividad del DNS

Los nombres del DNS deberían resolverse en direcciones P contenidas dentro del bloque CIDR de la VPC en `us-east-1`. Además, las conexiones con `port 443` deberían funcionar correctamente.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La conexión con el puerto 443 debería funcionar correctamente" style="width:80%;" >}}

Si el DNS se resuelve en direcciones IP públicas, significa que la zona de Route53 **no** se ha asociado con la VPC en la región alternativa o que el registro A no existe.

Si el DNS se cambia correctamente, pero las conexiones con `port 443` fallan, significa que la interconexión o el enrutamiento de la VPC pueden estar mal configurados o que el puerto 443 quizás no tenga permiso de salida hacia el bloque CIDR de la VPC en `us-east-1`.

Las VPC que tienen asociada una zona alojada privada (o PHZ, por sus siglas en inglés) necesitan tener activados un par de parámetros; concretamente, `enableDnsHostnames` y `enableDnsSupport` deben estar activados en las VPC a las que está asociada la PHZ. Consulta [Consideraciones sobre el uso de una zona alojada privada][6].

### Datadog Agent

1. Si estás recopilando datos de logs, asegúrate de que tu Agent está configurado para enviar logs a través de HTTPS. Si los datos no están ya ahí, añade lo siguiente en el [archivo de configuración `datadog.yaml` del Agent][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si estás utilizando el Agent del contenedor, define la siguiente variable de entorno:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Esta configuración es obligatoria cuando se envían logs a Datadog con AWS PrivateLink y el Datadog Agent, pero no es necesaria para la extensión Lambda. Para obtener más información, consulta la sección sobre la [recopilación de logs del Agent][9].

2. Si tu extensión Lambda carga la clave de API de Datadog desde AWS Secrets Manager usando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, tendrás que [crear un endpoint de VPC para Secrets Manager][10].

3. [Reinicia el Agent][7].


[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


## Leer más

Más enlaces, artículos y documentación útiles:

- [Habilitar la recopilación de logs con el Agent][3]
- [Recopilar logs desde tus servicios de AWS][4]

{{< /site-region >}}
[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[3]: /es/agent/logs
[4]: /es/integrations/amazon_web_services/#log-collection