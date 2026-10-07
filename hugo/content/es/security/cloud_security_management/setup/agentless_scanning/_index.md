---
aliases:
- /es/security/agentless_scanning
- /es/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentación
  text: Lea más sobre Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configure Sensitive Data Scanner para el almacenamiento en la nube
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentación
  text: Solución de problemas de Agentless Scanning
title: Cloud Security Agentless Scanning
---
## Descripción general {#overview}

El escaneo Agentless proporciona visibilidad de las vulnerabilidades que existen dentro de su infraestructura en la nube de AWS, Azure y GCP, sin requerir que instale el Datadog Agent. Datadog recomienda habilitar el escaneo Agentless como primer paso para obtener una visibilidad completa de sus recursos en la nube, y luego instalar el Datadog Agent en sus core assets con el tiempo para obtener un contexto de seguridad y observabilidad más profundo.

<div class="alert alert-info">El escaneo Agentless excluye los recursos que tienen instalado el Datadog Agent.</div>

## Cómo funciona {#how-it-works}

El siguiente diagrama ilustra cómo funciona el escaneo Agentless:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra cómo funciona el escaneo Agentless" width="90%" >}}

1. Datadog programa escaneos automatizados en intervalos de 12 horas y envía los recursos a escanear a través de Remote Configuration [2].
   - Si tiene configurados [Cloud Security Evaluation Filters][15], el escaneo Agentless respeta estos filtros y solo escanea los recursos que coinciden con los criterios configurados.
2. Para las funciones sin servidor (como AWS Lambda), los escáneres obtienen el código de la función.
3. El escáner crea instantáneas de los volúmenes utilizados en las instancias de máquina virtual en ejecución. Utilizando las instantáneas o el código de la función, el escáner genera un SBOM (una lista de paquetes y dependencias).
4. El SBOM y los metadatos del host se transmiten a Datadog. Todos los demás datos, incluidas las instantáneas, el contenido del disco y las imágenes de contenedor, permanecen en su infraestructura. Las instantáneas se eliminan.
5. Datadog utiliza el SBOM para identificar vulnerabilidades conocidas en sus recursos.

Esta arquitectura proporciona:
- **Privacidad de datos**: El contenido de su disco, las imágenes de contenedor y los datos confidenciales permanecen dentro de su cuenta en la nube. Solo los metadatos del paquete (el SBOM) se transmiten a Datadog.
- **Residencia de datos**: Ningún dato cruza el límite de la cuenta hacia la infraestructura de Datadog, lo que simplifica el cumplimiento de los requisitos de soberanía de datos.
- **Compliance**: Los auditores pueden verificar que los datos escaneados permanezcan dentro de su perímetro.

Para obtener más información sobre la privacidad de los datos, consulte [Qué datos se envían a Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>El escáner funciona como una máquina virtual independiente dentro de su infraestructura, lo que garantiza un impacto mínimo en los sistemas y recursos existentes.</li>
    <li>Para AWS, las instancias del escáner se escalan automáticamente según la carga de trabajo. Cuando no hay recursos para escanear, los escáneres se reducen a cero para minimizar los costos del proveedor de la nube.</li>
    <li>El escáner recopila de forma segura una lista de paquetes de sus hosts sin transmitir ninguna información personal confidencial o privada fuera de su infraestructura.</li>
    <li>El escáner limita su uso de la API del proveedor de la nube para evitar alcanzar cualquier límite de velocidad y utiliza un retroceso exponencial si es necesario.</li>
    <li>Las instancias del escáner se rotan automáticamente cada 24 horas, lo que garantiza que ejecuten las imágenes más recientes.</li>
  </ul>
</div>

## Qué datos se envían a Datadog {#what-data-is-sent-to-datadog}

En lugar de copiar instantáneas de disco fuera de su entorno para su análisis, para mantener sus datos privados, Datadog implementa una infraestructura de escaneo ligera **dentro de su cuenta en la nube**. El escaneo Agentless crea instantáneas de sus recursos y los analiza localmente, eliminando las instantáneas una vez que los análisis se completan. Solo envía a Datadog la lista de materiales de software (SBOM) resultante, la cual contiene una lista de paquetes y dependencias. Sus datos sin procesar, contenidos de disco e imágenes de contenedor nunca salen de su entorno.

El escáner Agentless utiliza el formato OWASP [cycloneDX][3] para transmitir una lista de paquetes a Datadog. Nunca se transmite información confidencial o personal privada fuera de su infraestructura.

Datadog **no** envía:
- Configuraciones de sistema y paquetes
- Claves de cifrado y certificados
- Registros y Audit Trail
- Datos comerciales confidenciales

## Costos del proveedor de servicios en la nube {#cloud-service-provider-cost}

Debido a que el escaneo Agentless se ejecuta dentro de su cuenta en la nube, los costos de cómputo y red aparecen en la factura de su proveedor de nube. Mientras que los proveedores que escanean en su propia infraestructura incluyen los costos de cómputo en sus tarifas de SaaS, mantener los datos en su entorno significa que usted ve el costo de la infraestructura directamente.

Para reducir costos:
- Implemente un escáner en cada región donde tenga más de 150 hosts. Un escáner regional evita la transferencia de datos entre regiones, lo cual es más rentable que escanear esos hosts desde una región remota.
- Utilice la [configuración recomendada][13] con Terraform para implementar un escáner por región.
- Para implementaciones grandes en varias regiones, consulte [Implementación del escaneo Agentless][16] para obtener orientación sobre cómo elegir una topología de implementación.

## Restrinja el acceso del escáner {#restrict-scanner-access}

Las instancias del escáner requieren [permisos][4] para crear y copiar instantáneas y describir volúmenes. Datadog recomienda seguir las siguientes pautas para mantener sus escáneres seguros:

- Restrinja el acceso a las instancias del escáner a los usuarios administrativos.
- Establezca los permisos del escáner para seguir el principio de menor privilegio, limitado al mínimo requerido para el escaneo.
- Cifre toda la transmisión de datos entre el escáner y Datadog con HTTPS.
- Habilite las actualizaciones de seguridad automáticas y rote las instancias automáticamente cada 24 horas.
- No permita el acceso entrante a las instancias del escáner (grupo de seguridad restringido).

## Escaneo de almacenamiento en la nube {#cloud-storage-scanning}

Puede habilitar [Sensitive Data Scanner][8] para sus recursos de Agentless Scanning durante la implementación o después de la configuración. Sensitive Data Scanner cataloga y clasifica datos sensibles en su almacenamiento en la nube (como los buckets de Amazon S3). Solo lee los almacenes de datos y sus archivos en su entorno, sin enviar ningún dato sensible a Datadog.

## Escaneo bajo demanda {#on-demand-scanning}

De forma predeterminada, Agentless Scanning escanea automáticamente sus recursos cada 12 horas. Para AWS, también puede activar un escaneo inmediato de un recurso específico (host, container, función Lambda o bucket de S3) mediante la On-Demand Scanning API. Para obtener más información, consulte la documentación de la On-Demand Scanning API [14].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /es/remote_configuration
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /es/security/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/remote_configuration
[11]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /es/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /es/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods