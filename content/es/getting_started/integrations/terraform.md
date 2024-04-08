---
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: Blog
  text: Gestión de Datadog con Terraform
kind: documentación
title: Empezando con Terraform
---

## Información general

Puede utilizar el [Datadog Terraform provider][2] para crear y gestionar mediante programación los recursos de Datadog. Esta guía proporciona una visión general de Empezando con Terraform, con enlaces a recursos de Terraform y tutoriales que abordan casos de uso específicos.

## Configuración

1. Si aún no lo has hecho, instala [Terraform][1].
2. Si aún no tienes un archivo Terraform Configuración, lee la [Configuración section][3] de la documentación principal de Terraform para crear un directorio y un archivo Configuración.
3. Desde el directorio que contiene su Datadog Proveedor Configuración, ejecute `terraform init`.

## Recursos

### Integraciones con soluciones en la nube

El [AWS integración recurso][9], [Azure integración recurso][10], y [Google Cloud Project integración recurso][11] puede establecer las conexiones para obtener rápidamente los datos que fluyen en su Datadog cuenta de su [AWS][12], [Azure][13], y [Google Cloud][14] servicios, respectivamente. Si utilizas AWS integración , consulta la guía [AWS integración con Terraform][27] para ver un ejemplo de configuración de integración junto con su rol y permisos IAM asociados.

### logs y métricas

Consulte la [Guía de gestión de logs y métricas con Terraform][20] para obtener instrucciones sobre la gestión de logs y métricas con Terraform.

### Monitors

Con los datos fluyendo en su cuenta Datadog, implemente [Alertar con Datadog monitors][8] para ser notificado sobre cualquier cambio inesperado o comportamiento anómalo. Utilice el [monitor resource][4] para crear y gestionar sus monitors, o utilice el [monitor JSON resource][5] para utilizar definiciones JSON para sus monitors. Consulte la sección [create a monitor][6] de la documentación principal de Terraform para ver un archivo `monitor.tf` de ejemplo que crea un [Live proceso monitor][7].

### Gestión de cuentas

Consulte la [Guía de gestión de Datadog con Terraform][19] para obtener instrucciones sobre la gestión de su cuenta de Datadog con Terraform.

### Dashboards

Para analizar o mostrar sus datos a un público más amplio, cree [Datadog <txprotected>dashboards</txprotected>][18]. Terraform proporciona el [dashboard resource][15] para esto, o puedes usar el [dashboard JSON resource][16] para crear <txprotected>dashboards</txprotected> con definiciones JSON. También puedes [restringir la edición de un dashboard][17] configurando roles restringidos.

### Tests Synthetic

   - Para las pruebas de API, consulte la [sección Terraform][21] de la página **Crear una prueba de API con la API**.
   - Para pruebas de Navegador, vea la [sección Terraform][22] de la página **Gestione sus Pruebas de Navegador Programáticamente**.

### Webhooks

Puede enviar solicitudes de API personalizadas y cargas útiles a su propio servicios en respuesta a los datos de su cuenta Datadog con [Webhooks][29]. Esto le permite alertar a su servicio o iniciar acciones automatizadas en su infraestructura. Utiliza el [Webhook resource][30] de Terraform para crear y gestionar tus webhooks con Terraform.

## Vaya más lejos con Terraform

Siga el tutorial [Terraform Datadog Provider][28] para un recorrido detallado de la implementación y gestión de Datadog con Terraform, incluyendo el despliegue de una aplicación de ejemplo Kubernetes con Datadog Agent y la creación de [Sintético tests][31].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /es/integrations/terraform/#configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor_json
[6]: /es/integrations/terraform/#create-a-monitor
[7]: /es/monitors/types/process/
[8]: /es/monitors/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[12]: /es/integrations/amazon_web_services/
[13]: /es/integrations/azure/
[14]: /es/integrations/google_cloud_platform/
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json
[17]: /es/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[18]: /es/dashboards/
[19]: /es/account_management/guide/manage-datadog-with-terraform/
[20]: /es/logs/guide/manage_logs_and_metrics_with_terraform/
[21]: /es/synthetics/guide/create-api-test-with-the-api/#terraform
[22]: /es/synthetics/guide/manage-browser-tests-through-the-api/#manage-your-browser-tests-with-terraform
[27]: /es/integrations/guide/aws-terraform-setup
[28]: https://developer.hashicorp.com/terraform/tutorials/use-case/datadog-provider
[29]: /es/integrations/webhooks/
[30]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
[31]: /es/synthetics/