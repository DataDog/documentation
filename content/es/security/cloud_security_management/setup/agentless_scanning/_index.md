---
title: Configuración de Agentless Scanning para Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning para Cloud Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen dentro de tus hosts de AWS, contenedores en ejecución, funciones de Lambda y Amazon Machine Images (AMIs), sin necesidad de instalar el Datadog Agent.


{{% csm-agentless-prereqs %}}

## Métodos de despliegue

Hay dos maneras recomendadas maneras de desplegar escáneres sin Agent en tu entorno, ya sea usando escaneo entre cuentas, o escaneo en la misma cuenta.

**Nota**: Cuando se utiliza Agentless Scanning, hay costos adicionales para ejecutar escáneres en tus entornos en la nube. Para optimizar los costes y, al mismo tiempo, poder escanear de forma fiable cada 12 horas, Datadog recomienda configurar Agentless Scanning con Terraform como plantilla predeterminada, ya que así también se evitan las redes entre regiones.

Para establecer estimaciones sobre los costes del escáner, ponte en contacto con tu [gerente de Éxito del cliente de Datadog.][8]

{{< tabs >}}
{{% tab "Escaneo entre cuentas" %}}

Con el escaneo entre cuentas, los escáneres sin Agent se despliegan en varias regiones de una única cuenta en la nube. Los escáneres sin Agent desplegados tienen visibilidad en varias cuentas sin necesidad de realizar escaneos entre regiones, que en la práctica resultan costosos.

Para grandes cuentas con 250 o más hosts, esta es la opción más rentable, ya que evita los escaneos entre regiones y reduce la fricción para gestionar tus escáneres sin Agent. Puedes crear una cuenta dedicada para tus escáneres sin Agent o elegir una ya existente. También se puede escanear la cuenta en la que se encuentran los escáneres sin Agen.

El siguiente diagrama ilustra cómo funciona Agentless Scanning cuando se despliega en una cuenta central en la nube:


{{< img src="/security/agentless_scanning/agentless_advanced_2.png" alt="Diagrama de Agentless Scanning que muestra el escáner sin Agent desplegado en una cuenta central en la nube" width="90%" >}}

{{% /tab %}}
{{% tab "Escaneo en la misma cuenta" %}}

Con el análisis en la misma cuenta, se despliega un único escáner sin Agent por cuenta. Aunque esto puede suponer más costes, ya que requiere que cada escáner sin Agent realice escaneos entre regiones por cuenta, Datadog recomienda esta opción si no deseas conceder permisos entre cuentas.

El siguiente diagrama ilustra cómo funciona Agentless Scanning cuando se despliega dentro de cada cuenta en la nube:

{{< img src="/security/agentless_scanning/agentless_quickstart_2.png" alt="Diagrama de Agentless Scanning que muestra el escáner sin Agent desplegado en cada cuenta en la nube" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /es/agent/remote_config/?tab=configurationyamlfile#setup

{{% /tab %}}
{{< /tabs >}}


**Nota**: Los datos reales que se analizan permanecen dentro de tu infraestructura, y solo la lista recopilada de paquetes, así como la información relacionada con hosts recopilados (nombres de host/instancias EC2) se informan de nuevo a Datadog.

## Instalación

Hay dos maneras de instalar y configurar Agent Scanning para tus entornos en la nube: manualmente con Terraform, o con la plantilla de CloudFormation con la integración de AWS.

### Terraform

{{< tabs >}}
{{% tab "Agentless Scanning (nueva cuenta de AWS)" %}}

1. Sigue las instrucciones de configuración para añadir [cuentas en la nube de AWS][3] a Cloud Security Management.
1. En la página [Cloud Security Management Setup][1] (Configuración de Cloud Security Management), haz clic en **Cloud accounts > AWS** (Cuentas en la nube > AWS).
1. Haz clic en el botón **Edit scanning** (Editar escaneado) de la cuenta de AWS en la que deseas desplegar el escáner sin Agent.
1. **Enable Resource Scanning** (Habilitar escaneo de recursos) ya debería estar habilitado. Habilita el escaneo para los recursos en la nube que desees monitorizar en la sección **Agentless Scanning**.
1. Sigue las instrucciones para la configuración de [Terraform][4].
1. Asegúrate de que la plantilla se ejecuta correctamente y, a continuación, haz clic en **Done** (Hecho) para iniciar el escaneo.

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Página de configuración de Agentless que muestra las opciones del conmutador para el escaneo de recursos" width="90%" >}}


[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /es/security/cloud_security_management/setup/csm_enterprise/cloud_accounts/?tab=aws
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Agentless scanning (cuenta de AWS existente)" %}}

1. En la página [Cloud Security Management Setup][1] (Configuración de Cloud Security Management), haz clic en **Cloud accounts > AWS** (Cuentas en la nube > AWS).
1. Haz clic en el botón **Edit scanning** (Editar escaneado) de la cuenta de AWS en la que deseas desplegar el escáner sin Agent.
1. **Enable Resource Scanning** (Habilitar escaneo de recursos) ya debería estar habilitado. Habilita el escaneo para los recursos en la nube que desees monitorizar en la sección **Agentless Scanning**.
1. Sigue las instrucciones para la configuración de [Terraform][4].
1. Asegúrate de que la plantilla se ejecuta correctamente y, a continuación, haz clic en **Done** (Hecho) para iniciar el escaneo.

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Página de configuración de Agentless que muestra las opciones del conmutador para el escaneo de recursos" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md


{{% /tab %}}
{{< /tabs >}} </br>

### Integración de AWS

{{< tabs >}}
{{% tab "Agentless Scanning (nueva cuenta de AWS)" %}}

1. Configura la integración de [Amazon Web Services][1]. También debes añadir los [permisos][2] necesarios para la recopilación de recursos.

    Al añadir una nueva cuenta AWS, aparece la siguiente pantalla:

{{< img src="/security/agentless_scanning/agentless_scanning_aws_2.png" alt="Página de configuración de Agentless Scanning para añadir una cuenta de AWS nueva con la opción Añadir una cuenta de AWS única seleccionada" width="90%">}}
</br>

1. Haz clic en **Yes** (Si) en **Enable Cloud Security Management** (Activar Cloud Security Management) y activa el escaneo para los recursos en la nube que desees monitorizar en la sección **Agentless Scanning**.
1. Selecciona una clave de API que ya esté configurada para la Configuración remota. Si introduces una clave de API que no tenga activada la opción Configuración remota, se activará automáticamente al seleccionarla.
1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation). La plantilla incluye todos los [permisos][3] necesarios para desplegar y gestionar los escáneres sin Agent. La plantilla debe ejecutarse correctamente para recibir escaneos.

[1]: /es/integrations/amazon_web_services/
[2]: /es/integrations/amazon_web_services/?tab=roledelegation#resource-collection
[3]: /es/security/cloud_security_management/setup/agentless_scanning/?tab=agentlessscanningnewawsaccount#permissions

{{% /tab %}}

{{% tab "Agentless Scanning (cuenta de AWS existente)" %}}

1. En la página [Cloud Security Management Setup][1] (Configuración de Cloud Security Management), haz clic en **Cloud accounts > AWS** (Cuentas en la nube > AWS).
1. Haz clic en el botón **Edit scanning** (Editar escaneado) de la cuenta de AWS en la que deseas desplegar el escáner sin Agent.
1. **Enable Resource Scanning** (Habilitar escaneo de recursos) ya debería estar habilitado. Habilita el escaneo para los recursos en la nube que desees monitorizar en la sección **Agentless Scanning**.
1. Ve a tu consola de AWS, crea una nueva CloudFormation Stack usando [esta plantilla][2], y ejecútala.
1. Asegúrate de que la plantilla se ejecuta correctamente y, a continuación, haz clic en **Done** (Hecho) para iniciar el escaneo.

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="Página de configuración de Agentless que muestra las opciones del conmutador para el escaneo de recursos" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/cloudformation/main.yaml

{{% /tab %}}
{{< /tabs >}}

## Exclusión de recursos

Establece la etiqueta `DatadogAgentlessScanner:false` en hosts de AWS, contenedores y funciones de Lambda (si procede), para que se excluyan de los escaneos. Para añadir esta etiqueta a tus recursos, sigue la [documentación de AWS][3].

## Desactivación de Agentless Scanning

Para desactivar Agentless Scanning en una cuenta de AWS, desactiva el escaneo para cada recurso en la nube:
1. En la página [Cloud Security Management Setup][10] (Configuración de Cloud Security Management), haz clic en **Cloud accounts > AWS** (Cuentas en la nube > AWS).
1. Haz clic en el botón **Edit scanning** (Editar escaneado) de la cuenta de AWS en la que desplegaste el escáner sin Agent.
1. En la sección **Agentless Scanning**, desactiva el escaneo para los recursos en la nube que deseas dejar de monitorizar.
1. Haz clic en **Done** (Listo).

### Desinstalación con CloudFormation

Ve a tu consola de AWS y elimina la CloudFormation stack que se creó para Agentless Scanning.

### Desinstalación con Terraform

Sigue las instrucciones para la desinstalación de [Terraform][9].

[1]: /es/security/vulnerabilities
[3]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[4]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup