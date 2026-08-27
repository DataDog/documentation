---
aliases:
- /es/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Escaneo Agentless de Cloud Security
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentación
  text: Habilitación de Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
title: Implementación de Agentless Scanning
---
Esta guía le ayuda a elegir la topología de implementación adecuada para Agentless Scanning según su entorno en la nube. Para obtener instrucciones de configuración, consulte [Habilitación de Agentless Scanning][3].

## Descripción general {#overview}

Datadog recomienda las siguientes pautas:
- Utilice una cuenta de escáner dedicada para entornos de varias cuentas.
- Implemente un escáner en cada región que contenga más de 150 hosts.
- Si utiliza [Cloud Storage Scanning][1], implemente un escáner en cada región que contenga un almacén de datos (por ejemplo, buckets de S3).

<div class="alert alert-info">Los escáneres solo envían a Datadog la lista recopilada de paquetes y metadatos del host (nombres de host, identificadores de instancias de EC2/máquina virtual/Compute Engine). Todos los datos escaneados permanecen en su infraestructura.</div>

## Configuración de cuenta y región en la nube {#cloud-account-and-region-configuration}

La topología de implementación que utilice depende de cuántas cuentas en la nube (cuentas de AWS, suscripciones de Azure o proyectos de GCP) necesite escanear y qué regiones cubran.

- **Cuentas en la nube**: Si solo necesita escanear una única cuenta, implemente uno o más escáneres directamente en esa cuenta. De lo contrario, utilice una cuenta de escáner dedicada y utilice roles delegados para otorgarle acceso para escanear otras cuentas. Esto se denomina **escaneo entre cuentas**.
- **Regiones**: Un solo escáner puede escanear hosts en cualquier región, incluidas regiones distintas a la suya. Sin embargo, el escaneo entre regiones genera costos de transferencia de datos. Si implementa escáneres adicionales depende de cuántos hosts tenga en cada región.

Estas pestañas contienen información sobre cómo configurar su topología de implementación. Seleccione la pestaña que describe cuántas cuentas necesita escanear y, luego, obtenga más información según cuántas regiones necesite cubrir.

{{< tabs >}}
{{% tab "Cuenta única" %}}

Si solo necesita escanear una cuenta única, implemente uno o más escáneres directamente en esa cuenta.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagrama de Agentless Scanning que muestra el Agentless scanner aplicado en una cuenta que cubre varias regiones." width="40%" >}}

### Decida cuántos escáneres implementar {#decide-how-many-scanners-to-deploy}

Un solo escáner puede escanear hosts en cualquier región, incluidas regiones distintas a la suya. El escaneo entre regiones genera costos de transferencia de datos, por lo que la decisión de dónde implementar escáneres adicionales depende de cuántos hosts tenga en cada región.

- **Menos de ~150 hosts en total en todas las regiones**: un solo escáner en una región es la configuración más rentable. Los costos de transferencia de datos entre regiones para escanear hosts remotos son menores que el costo fijo de ejecutar un escáner adicional.
- **Más de ~150 hosts en una región específica**: Implemente un escáner dedicado en esa región. En este umbral, los ahorros de salida por escanear localmente superan el costo de ejecutar el escáner.
- **Varias regiones por encima del umbral**: Implemente un escáner en cada región que supere los ~150 hosts. Las regiones por debajo del umbral pueden ser escaneadas de forma cruzada desde el escáner más cercano.

Datadog enruta automáticamente los escaneos al escáner regional apropiado para minimizar los costos entre regiones.

#### Límites de capacidad del escáner {#scanner-capacity-limits}

Cada escáner tiene límites de rendimiento regidos por las cuotas de API del proveedor de la nube:

| Límite | Valor |
|-------|-------|
| Máximo de escáneres por cuenta por región | 4 (límite estricto; los proveedores de nube como AWS limitan las instantáneas simultáneas a 100 por cuenta por región) |
| Intervalo de escaneo | Cada 12 horas |

<div class="alert alert-danger">No aumente el conteo deseado del Grupo de Autoescalado (ASG) más allá de cuatro escáneres por región. Los escáneres adicionales no pueden crear instantáneas debido al límite de instantáneas simultáneas de los proveedores de nube.</div>

{{% /tab %}}
{{% tab "Cuentas múltiples" %}}

### Decida en qué cuentas implementar los escáneres {#decide-which-accounts-to-deploy-scanners-in}

Datadog recomienda usar una **cuenta de escáner dedicada** para implementar escáneres y usar **roles delegados entre cuentas** para otorgar a los escáneres acceso a las cuentas de destino (incluida la cuenta del escáner).

Para AWS Organizations, utilice un [CloudFormation StackSet][1] para implementar un rol delegado en todas las cuentas miembro, automatizando la incorporación para el escaneo entre cuentas.

El siguiente diagrama ilustra el escaneo entre cuentas desde una cuenta central (Cuenta 4):

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagrama de Agentless Scanning que muestra el Agentless scanner implementado en una cuenta de nube central." width="90%" >}}

**Si no desea otorgar permisos entre cuentas**, implemente un escáner en cada cuenta en su lugar. Esto genera costos más altos porque cada escáner realiza escaneos entre regiones dentro de su cuenta.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagrama de Agentless Scanning que muestra el Agentless scanner implementado en cada cuenta de nube." width="90%" >}}

### Decida cuántos escáneres implementar {#decide-how-many-scanners-to-deploy-1}

Un solo escáner puede escanear hosts en cualquier región, incluidas regiones distintas a la suya. El escaneo entre regiones genera costos de transferencia de datos, por lo que la decisión de dónde implementar escáneres adicionales depende de cuántos hosts tenga en cada región.

- **Menos de ~150 hosts en total en todas las regiones**: un solo escáner en una región es la configuración más rentable. Los costos de transferencia de datos entre regiones para escanear hosts remotos son menores que el costo fijo de ejecutar un escáner adicional.
- **Más de ~150 hosts en una región específica**: Implemente un escáner dedicado en esa región. En este umbral, los ahorros de salida por escanear localmente superan el costo de ejecutar el escáner.
- **Varias regiones por encima del umbral**: Implemente un escáner en cada región que supere ~150 hosts. Las regiones por debajo del umbral pueden ser escaneadas de manera cruzada desde el escáner más cercano.

Datadog enruta automáticamente los escaneos al escáner regional apropiado para minimizar los costos entre regiones.

#### Límites de capacidad del escáner {#scanner-capacity-limits-1}

Cada escáner tiene límites de rendimiento regidos por las cuotas de API del proveedor de la nube:

| Límite | Valor |
|-------|-------|
| Máximo de escáneres por cuenta por región | 4 (límite estricto; los proveedores de nube como AWS limitan las instantáneas simultáneas a 100 por cuenta por región) |
| Intervalo de escaneo | Cada 12 horas |

<div class="alert alert-danger">No aumente el conteo deseado del Grupo de Autoescalado (ASG) más allá de cuatro escáneres por región. Los escáneres adicionales no pueden crear instantáneas debido al límite de instantáneas simultáneas de los proveedores de nube.</div>

[1]: /es/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## Consideraciones de redes empresariales {#enterprise-networking-considerations}

De forma predeterminada, el escáner crea una nueva VPC durante la implementación. Si su organización utiliza Terraform y tiene políticas de control de servicios (SCP) que restringen la creación de VPC, utilice la opción [{{< ui >}}custom VPC{{< /ui >}}][2] durante la configuración para usar una VPC existente en lugar de crear una nueva.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /es/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable#setup