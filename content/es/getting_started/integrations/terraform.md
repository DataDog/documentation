---
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: Blog
  text: Gestión de Datadog con Terraform
title: Empezando con Terraform
---

## Información general

Puedes utilizar el [proveedor de Datadog Terraform][2] para crear y gestionar mediante programación los recursos de Datadog. Esta guía brinda información general para empezar a utilizar Terraform, con enlaces a recursos de Terraform y tutoriales que abordan casos de uso específicos.

## Configuración

1. Si aún no lo has hecho, instala [Terraform][1].
2. Si aún no tienes un archivo de configuración de Terraform, lee la [sección de configuración][3] de la documentación principal de Terraform para crear un directorio y un archivo de configuración.
3. Desde el directorio que contiene tu configuración de proveedor de Datadog, ejecuta `terraform init`.

## Recursos

### Integraciones con soluciones en la nube

El [recurso de integración con AWS][9], el [recurso de integración con Azure][10] y el [recurso de integración con Google Cloud Project][11] pueden establecer las conexiones para obtener rápidamente los datos que fluyen en tu cuenta de Datadog desde los servicios de [AWS][12], [Azure][13] y [Google Cloud][14], respectivamente. Si utilizas la integración con AWS, consulta la guía de [Integración de AWS con Terraform][27] para ver un ejemplo de configuración de integración junto con su rol y permisos IAM asociados.

### Logs y métricas

Consulta la [Guía de gestión de logs y métricas con Terraform][20] para obtener instrucciones sobre la gestión de logs y métricas con Terraform.

### Monitores

Con los datos que ingresan a tu cuenta de Datadog, implementa [Alertar con monitores de Datadog][8] para ser notificado sobre cualquier cambio inesperado o comportamiento anómalo. Utiliza el [recurso de monitor][4] para crear y gestionar tus monitores, o utiliza el [recurso de monitor de JSON][5] para utilizar definiciones JSON para tus monitores. Consulta la sección [Crear un monitor][6] de la documentación principal de Terraform para ver un archivo `monitor.tf` de ejemplo que crea un [monitor de Live Processes][7].

### Gestión de cuentas

Consulta la [Guía de gestión de Datadog con Terraform][19] para obtener instrucciones sobre la gestión de tu cuenta de Datadog con Terraform.

### Dashboards

Para analizar o mostrar tus datos a un público más amplio, crea [Dashboards de Datadog][18]. Terraform brinda el [recurso de dashboard][15] para esto, o puedes usar el [recurso de dashboard de JSON][16] para crear dashboards con definiciones JSON. También puedes [restringir la edición de un dashboard][17] al configurar roles restringidos.

### Tests Synthetic

   - Para las pruebas de API, consulte la [sección Terraform][21] de la página **Crear una prueba de API con la API**.
   - Para pruebas de Navegador, vea la [sección Terraform][22] de la página **Gestione sus Pruebas de Navegador Programáticamente**.

### Webhooks

Puedes enviar solicitudes de API personalizadas y cargas útiles a tus propios servicios en respuesta a los datos de tu cuenta de Datadog con [Webhooks][29]. Esto permite alertar a tus servicios o iniciar acciones automatizadas en tu infraestructura. Utiliza el [recurso de Webhook][30] de Terraform para crear y gestionar tus webhooks con Terraform.

## Ve más lejos con Terraform

Sigue el tutorial de [proveedor de Terraform Datadog][28] para comprender en detalle la implementación y gestión de Datadog con Terraform, incluyendo el despliegue de una aplicación de ejemplo de Kubernetes con Datadog Agent y la creación de [tests Synthetic][31].

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