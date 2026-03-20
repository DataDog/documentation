---
aliases:
- /es/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
title: Despliegue de Agentless Scanning
---

Hay dos maneras recomendadas maneras de desplegar escáneres sin Agent en tu entorno, ya sea usando escaneo entre cuentas, o escaneo en la misma cuenta.

{{< tabs >}}
{{% tab "Escaneo entre cuentas" %}}

Con el escaneo entre cuentas, los escáneres sin Agent se despliegan en varias regiones de una única cuenta en la nube. Los escáneres sin Agent desplegados tienen visibilidad en varias cuentas sin necesidad de realizar escaneos entre regiones, que en la práctica resultan costosos.

Para grandes cuentas con 250 o más hosts, esta es la opción más rentable, ya que evita los escaneos entre regiones y reduce la fricción para gestionar tus escáneres sin Agent. Puedes crear una cuenta dedicada para tus escáneres sin Agent o elegir una ya existente. También se puede escanear la cuenta en la que se encuentran los escáneres sin Agen.

El siguiente diagrama ilustra cómo funciona Agentless Scanning cuando se despliega en una cuenta central en la nube:

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagrama de Agentless scanning que muestra el escáner sin agent desplegado en una cuenta central en la nube" width="90%" >}}

{{% /tab %}}
{{% tab "Escaneo en la misma cuenta" %}}

Con el análisis en la misma cuenta, se despliega un único escáner sin Agent por cuenta. Aunque esto puede suponer más costes, ya que requiere que cada escáner sin Agent realice escaneos entre regiones por cuenta, Datadog recomienda esta opción si no deseas conceder permisos entre cuentas.

El siguiente diagrama ilustra cómo funciona Agentless Scanning cuando se despliega dentro de cada cuenta en la nube:

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagrama de Agentless scanning que muestra el escáner sin agent desplegado en cada cuenta en la nube" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /es/remote_configuration

{{% /tab %}}
{{< /tabs >}}

## Configuración recomendada
Agentless Scanning genera [costes adicionales del proveedor de servicios en la nube][2] por ejecutar escáneres en tus entornos en la nube. Para gestionar los costes a la vez que se garantizan escaneos fiables cada 12 horas, Datadog recomienda configurar Agentless Scanning con Terraform como plantilla predeterminada. Terraform permite desplegar un escáner por región, lo que evita la creación de redes entre regiones.
Para mejorar la eficacia del escáner, asegúrate de que tu configuración sigue estas directrices:

- Despliegue de escáneres en una sola cuenta de AWS 
- Despliegue de un escáner en cada región que tenga más de 250 hosts
- Despliegue de un escáner en cualquier región que contenga un almacén de datos si utiliza [Cloud Storage Scanning][1].

Datadog programa automáticamente los escaneos en la región adecuada para minimizar los costes entre regiones.

**Nota**: Los datos escaneados reales permanecen en tu infraestructura, y solo la lista de paquetes recopilados, así como la información relacionada con hosts recopilados (nombres de host/instancias de EC2), se reportan de nuevo a Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: /es/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost