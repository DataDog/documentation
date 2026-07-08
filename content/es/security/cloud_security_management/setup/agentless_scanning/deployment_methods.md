---
aliases:
- /es/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentación
  text: Activación de de Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
title: Despliegue de Agentless Scanning
---

Esta guía te ayuda a elegir la topología de despliegue adecuada para Agentless Scanning en función de tu entorno de nube. Para obtener instrucciones de configuración, consulta [Activación de Agentless Scanning][3].

## Información general

Datadog recomienda las siguientes directrices:
- Utiliza una cuenta de escáner dedicada para entornos multicuenta.
- Despliega un escáner en cada región que contenga más de 150 hosts.
- Si utilizas [Cloud Storage Scanning][1], despliega un escáner en cada región que contenga un almacén de datos (por ejemplo, buckets de S3 o instancias de RDS).

<div class="alert alert-info">Los escáneres solo envían la lista recopilada de paquetes y metadatos de host (nombres de host, identificadores de instancia de EC2/VM/Compute Engine) a Datadog. Todos los datos escaneados permanecen en tu infraestructura.</div>

## Configuración de cuentas y regiones en la nube

La topología de despliegue que utilices dependerá del número de cuentas en la nube (cuentas de AWS, suscripciones de Azure o proyectos GCP) que necesites escanear y de las regiones que cubran.

- **Cuentas en la nube**: si solo necesitas escanear una única cuenta, despliega uno o varios escáneres directamente en esa cuenta. De lo contrario, utiliza una cuenta de escáner dedicada y utiliza roles delegados para concederte acceso para escanear otras cuentas. Esto se denomina **escaneado entre cuentas**.
- **Regiones**: Un único escáner puede escanear hosts en cualquier región, incluyendo regiones distintas a la suya. Sin embargo, el escaneo entre regiones incurre en costes de transferencia de datos. El despliegue de escáneres adicionales depende del número de hosts que tengas en cada región.

Estas pestañas contienen información sobre cómo configurar tu topología de despliegue. Selecciona la pestaña que describa cuántas cuentas necesitas escanear y, a continuación, obtén más información en función del número de regiones que necesites cubrir.

{{< tabs >}}
{{% tab "Single account" %}}

Si solo necesitas escanear una única cuenta, despliega uno o varios escáneres directamente en esa cuenta.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagrama de Agentless Scanning que muestra el Agentless scanner aplicado en una cuenta que cubre varias regiones" width="40%" >}}

### Decidir cuántos escáneres desplegar

Un único escáner puede escanear hosts en cualquier región, incluso en regiones distintas a la suya. El escaneado entre regiones incurre en costes de transferencia de datos, por lo que la decisión de dónde desplegar escáneres adicionales depende del número de hosts que tengas en cada región.

- **Menos de ~150 hosts en total en todas las regiones**: un único escáner en una región es la configuración más rentable. Los costes de transferencia de datos entre regiones para escanear hosts remotos son inferiores al coste fijo de ejecutar un escáner adicional.
- **Más de ~150 hosts en una región específica**: despliega un escáner dedicado en esa región. A partir de este umbral, el ahorro que supone el escaneado local supera el coste de funcionamiento del escáner.
- **Múltiples regiones por encima del umbral**: despliega un escáner en cada región que supere ~150 hosts. Las regiones por debajo del umbral pueden escanearse entre regiones desde el escáner más cercano.

Datadog dirige automáticamente los escaneos al escáner regional adecuado para minimizar los costes entre regiones.

#### Límites de capacidad del escáner

Cada escáner tiene límites de rendimiento regidos por las cuotas de la API del proveedor de la nube:

| Límite | Valor |
|-------|-------|
| Número máximo de escáneres por cuenta y región | 4 (límite máximo; los proveedores de nube como AWS limitan las snapshots simultáneas a 100 por cuenta y región) |
| Intervalo de escaneo | Cada 12 horas |

<div class="alert alert-danger">No aumentes el número deseado de grupos de autoescalado (ASG) más allá de cuatro escáneres por región. Los escáneres adicionales no pueden crear snapshots debido al límite de snapshots simultáneas de los proveedores de nube.</div>

{{% /tab %}}
{{% tab "Multiple accounts" %}}

### Decidir en qué cuentas desplegar los escáneres

Datadog recomienda utilizar una **cuenta de escáner dedicada** para desplegar los escáneres y utilizar **funciones de delegado entre cuentas** para conceder a los escáneres acceso a las cuentas de destino (incluida la cuenta del escáner).

Para AWS Organizations, utiliza un [CloudFormation StackSet][1] para desplegar un rol de delegado en todas las cuentas miembro, automatizando la incorporación para el escaneo entre cuentas.

El siguiente diagrama ilustra el escaneado entre cuentas desde una cuenta central (Cuenta 4):

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagrama de Agentless Scanning que muestra el escáner sin agent desplegado en una cuenta central en la nube" width="90%" >}}

**Si no deseas conceder permisos entre cuentas**, despliega un escáner en cada cuenta. Esto incurre en costes más elevados porque cada escáner realiza escaneos entre regiones dentro de su cuenta.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagrama de Agentless Scanning que muestra el escáner sin agent desplegado en cada cuenta en la nube" width="90%" >}}

### Decidir cuántos escáneres desplegar

Un único escáner puede escanear hosts en cualquier región, incluso en regiones distintas a la suya. El escaneado entre regiones incurre en costes de transferencia de datos, por lo que la decisión de dónde desplegar escáneres adicionales depende del número de hosts que tengas en cada región.

- **Menos de ~150 hosts en total en todas las regiones**: un único escáner en una región es la configuración más rentable. Los costes de transferencia de datos entre regiones para escanear hosts remotos son inferiores al coste fijo de ejecutar un escáner adicional.
- **Más de ~150 hosts en una región específica**: despliega un escáner dedicado en esa región. A partir de este umbral, el ahorro que supone el escaneado local supera el coste de funcionamiento del escáner.
- **Múltiples regiones por encima del umbral**: despliega un escáner en cada región que supere ~150 hosts. Las regiones por debajo del umbral pueden escanearse entre regiones desde el escáner más cercano.

Datadog dirige automáticamente los escaneos al escáner regional adecuado para minimizar los costes entre regiones.

#### Límites de capacidad del escáner

Cada escáner tiene límites de rendimiento regidos por las cuotas de la API del proveedor de la nube:

| Límite | Valor |
|-------|-------|
| Número máximo de escáneres por cuenta y región | 4 (límite máximo; los proveedores de nube como AWS limitan las snapshots simultáneas a 100 por cuenta y región) |
| Intervalo de escaneo | Cada 12 horas |

<div class="alert alert-danger">No aumentes el número deseado de grupos de autoescalado (ASG) más allá de cuatro escáneres por región. Los escáneres adicionales no pueden crear snapshots debido al límite de snapshots simultáneas de los proveedores de nube.</div>

[1]: /es/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## Consideraciones sobre redes empresariales

Por defecto, el escáner crea una nueva VPC durante el despliegue. Si tu organización utiliza Terraform y tiene políticas de control de servicios (SCP) que restringen la creación de VPC, utiliza la opción [**VPC personalizada**][2] durante la configuración para utilizar una VPC existente en lugar de crear una nueva.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /es/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable#setup