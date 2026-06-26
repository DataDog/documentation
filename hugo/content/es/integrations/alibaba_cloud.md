---
categories:
- nube
custom_kind: integración
dependencies: []
description: Integra tus servicios de Alibaba Cloud con Datadog.
doc_link: https://docs.datadoghq.com/integrations/alibaba_cloud/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: Blog
  text: Monitorizar Alibaba Cloud con Datadog
git_integration_title: alibaba_cloud
has_logo: true
integration_id: alibaba-cloud
integration_title: Alibaba Cloud
integration_version: ''
is_public: true
manifest_version: '1.0'
name: alibaba_cloud
public_title: Integración de Datadog y Alibaba Cloud
short_description: Integra tus servicios de Alibaba Cloud con Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-danger">La integración de Datadog Alibaba Cloud no es compatible con el sitio de Datadog para el Gobierno.</div>
{{< /site-region >}}

## Información general

Conéctate a Alibaba Cloud para obtener métricas desde tu:

- Equilibrador de carga de servidores de Alibaba Cloud (SLB)
- Instancias de Alibaba Elastic Compute Service
- Instancias de Alibaba Cloud ApsaraDB para RDS
- Instancias de Alibaba Cloud ApsaraDB para Redis
- Instancias de Alibaba Cloud Content Delivery Network (CDN)
- Clústeres de Alibaba Cloud Container Service
- Instancias de Alibaba Cloud Express Connect

## Configuración

### Instalación

Navega hasta [el cuadro de integración de Datadog y Alibaba Cloud][1] y pulsa _add account_(añadir cuenta).

### Configuración

Rellena los siguientes parámetros para integrar Datadog con la API de Alibaba Cloud:

- **`Account Id`**

Para ello, sitúa el cursor sobre el avatar en la parte superior derecha de la consola de Alibaba Cloud y selecciona _Security Settings (Configuración de seguridad)_. El ID de la cuenta se muestra en la parte superior de esa página.

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="ID de cuenta de AC" style="width:30%;">}}

- **`Access Key Id`** y **`Access Key Secret`**

En tu cuenta de Alibaba Cloud:

1. Crea un nuevo usuario en la pestaña _RAM_ con los siguientes parámetros:

    - `Logon Name`: Datadog
    - `display name`: Datadog
    - `description`: usuario de Datadog para la integración de Datadog y Alibaba Cloud

2. Selecciona _Programmatic Access_ (Acceso programático):

    {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Acceso programático" style="width:40%;">}}

3. Después de darle a _OK_, copia y pega `AccessKeyID` y `AccessKeySecret` en [el cuadro de integración de Datadog y Alibaba Cloud][1] y haz clic en _install integration_ (Instalar integración).

    {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="Claves de acceso de AC" style="width:40%;">}}

4. En tu cuenta de Alibaba Cloud, selecciona `Add Permissions` para el usuario que acabas de crear y, a continuación, añade todos los permisos siguientes:

    ```text
    AliyunCloudMonitorReadOnlyAccess
    AliyunECSReadOnlyAccess
    AliyunKvstoreReadOnlyAccess
    AliyunRDSReadOnlyAccess
    AliyunSLBReadOnlyAccess
    AliyunCDNReadOnlyAccess
    AliyunCSReadOnlyAccess
    AliyunExpressConnectReadOnlyAccess
    ```

5. Pulsa _Update_ (Actualizar) y después de unos 15 minutos, las métricas vistas en la pestaña _Metrics_ (Métricas) del cuadro de integración de Datadog y Alibaba Cloud empiezan a aparecer en tu [página del Metric Explorer][2] etiquetado con cualquier etiqueta personalizada que añadas a tus recursos y etiquetas que se encuentran aquí:

    - [kvstore/redis DescribeInstances][3]
    - [ECS DescribeInstances][4]
    - [DescribeDBInstances][5]
    - [DescribeLoadBalancers][6]

6. Opcional: establece `Optionally Limit Metrics Collection` en tu [cuadro de integración de Datadog y Alibaba Cloud][1]. Esta lista separada por comas de etiquetas de Alibaba Cloud (en la forma `<KEY:VALUE>`) define un filtro a utilizar cuando se recopilan métricas de Alibaba Cloud. Se pueden utilizar comodines como `?` (para caracteres únicos) y `*` (para caracteres múltiples). Sólo los hosts que coincidan con una de las etiquetas definidas se importan en Datadog; el resto se ignora. Los hosts que coincidan con una etiqueta determinada también pueden excluirse añadiendo `!` antes de la etiqueta.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "alibaba_cloud" >}}


### Eventos

Eventos de Alibaba Cloud se cobran por servicio de Alibaba Cloud.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/alibaba_cloud
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://www.alibabacloud.com/help/doc-detail/60933.htm
[4]: https://www.alibabacloud.com/help/doc-detail/25506.htm
[5]: https://www.alibabacloud.com/help/doc-detail/26232.htm
[6]: https://www.alibabacloud.com/help/doc-detail/27582.htm
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/alibaba_cloud/alibaba_cloud_metadata.csv
[8]: https://docs.datadoghq.com/es/help/