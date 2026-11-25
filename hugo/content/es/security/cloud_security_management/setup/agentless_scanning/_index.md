---
aliases:
- /es/security/agentless_scanning
- /es/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentación
  text: Obtenga más información sobre Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configure Sensitive Data Scanner para Almacenamiento en la Nube
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentación
  text: Solución de problemas de Agentless Scanning
title: Escaneo Agentless de Cloud Security
---
## Descripción general {#overview}

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en su infraestructura de AWS, Azure y Google Cloud, sin requerir que instale el Datadog Agent. Datadog recomienda habilitar el escaneo Agentless como primer paso para obtener una visibilidad completa de sus recursos en la nube, y luego instalar el Datadog Agent en sus core assets con el tiempo para obtener un contexto de seguridad y observabilidad más profundo.

Puede ejecutar escáneres Agentless de una de estas dos maneras:

- **Alojado por Datadog (SaaS)**: Datadog ejecuta los escáneres y usted le otorga a Datadog permisos para escanear su cuenta. Compatible solo con AWS.
- **Autohospedado**: Los escáneres se ejecutan en su propia cuenta en la nube.

Ambos modos utilizan el mismo motor de escaneo y producen los mismos hallazgos.

<div class="alert alert-info">Agentless Scanning omite los hosts donde el Datadog Agent se ejecuta con Cloud Security Vulnerabilities y Misconfigurations habilitados. Para otros hosts con el Agent, Agentless Scanning solo cubre las funciones que el Agent no cubre. Consulte <a href="/security/cloud_security_management/troubleshooting/agentless_scanning#hosts-with-the-datadog-agent-are-not-scanned">Solución de problemas</a>.</div>

## Elija dónde se ejecutan los escáneres {#choose-where-scanners-run}

{{< callout url="https://www.datadoghq.com/product-preview/agentless-saas-mode/" header="Agentless Scanning alojado por Datadog (SaaS) está en Preview" respect-site-support="false" >}}
El escaneo alojado por Datadog solo es compatible con cuentas de AWS.
{{< /callout >}}

| | Alojado por Datadog (SaaS) | Autohospedado |
|---|---|---|
| Dónde se ejecuta el escáner | En la infraestructura de Datadog | En su cuenta en la nube |
| Qué implementa | Una política de IAM administrada y la política administrada de AWS `SecurityAudit`, adjuntas a su rol de integración de Datadog existente. La pila de CloudFormation también crea una función Lambda que llama a la Datadog API durante la implementación de la pila. | Instancias de escáner y sus redes; para AWS, esto incluye instancias EC2 en un grupo de escalado automático, una VPC y una puerta de enlace NAT |
| Dónde se lee el contenido del disco | En un entorno de escaneo de Datadog, en la región de su sitio de Datadog (consulte [Residencia de datos del escaneo alojado por Datadog](#datadog-hosted-data-residency)) | En su cuenta en la nube |
| Proveedores de nube compatibles | AWS | AWS, Azure, Google Cloud |
| Actualizaciones del escáner | Datadog actualiza el escáner automáticamente | Usted actualiza el escáner |
| Costo de infraestructura del proveedor de nube | Ninguno | Los costos de cómputo y red aparecen en la factura de su proveedor de nube |
| Motor de escaneo y hallazgos | Igual en ambos modos | Igual en ambos modos |
| Frecuencia de escaneo | Cada 12 horas | Cada 12 horas |
| Cobertura de recursos de AWS | Igual en ambos modos | Igual en ambos modos |
| Sensitive Data Scanner para Amazon S3 | Compatible | Compatible |
| Escaneo bajo demanda | No compatible | Compatible para AWS |
| Facturación de Datadog | Igual en ambos modos | Igual en ambos modos |

### Cuándo usar Agentless Scanning alojado en Datadog (SaaS) {#when-to-use-datadog-hosted-saas-agentless-scanning}

Use el escaneo alojado en Datadog si se aplica alguna de las siguientes condiciones:

- Desea comenzar a escanear sin implementar recursos de cómputo o red en su cuenta.
- No desea mantener, actualizar ni monitorear las instancias del escáner.
- Desea evitar el costo de infraestructura de ejecutar escáneres en cada región.
- Desea que los nuevos tipos de recursos sean compatibles automáticamente, sin actualizar un escáner.

### Cuándo usar Agentless Scanning autohospedado {#when-to-use-self-hosted-agentless-scanning}

Use el escaneo autohospedado si se aplica alguna de las siguientes condiciones:

- Necesita escanear recursos de Azure o Google Cloud.
- Sus políticas requieren que el contenido del disco permanezca en su propia cuenta de nube.
- Sus políticas restringen qué región o proveedor de nube puede procesar sus datos. El escaneo alojado por Datadog procesa los datos en la región de su sitio de Datadog, la cual puede diferir de la región y el proveedor de nube de sus recursos.
- Usted desea un control directo sobre las versiones del escáner o la programación del escaneo.

### Utilice ambos modos {#use-both-modes}

Puede elegir un modo para cada cuenta de AWS en lugar de un modo para toda su organización. Por ejemplo, puede utilizar el escaneo alojado por Datadog en la mayoría de las cuentas y escáneres autohospedados donde el contenido del disco debe permanecer en su cuenta de nube.

Para cambiar una cuenta que ya utiliza un escáner autohospedado, consulte [Mover una cuenta de Agentless Scanning autohospedado a Agentless Scanning alojado por Datadog (SaaS)][17].

## Agentless Scanning alojado por Datadog (SaaS) {#datadog-hosted-scanning}

Datadog ejecuta los escáneres en su propia infraestructura. Este modo está en Preview y solo es compatible con AWS. Para obtener instrucciones de configuración, consulte [Habilitación de Agentless Scanning][19].

### Cómo funciona el escaneo alojado por Datadog {#datadog-hosted-how-it-works}

1. Datadog descubre sus recursos a través de las API del proveedor de nube. Este paso solo lee metadatos.
2. En su cuenta de AWS, Datadog crea una instantánea de cada volumen para escanear. La instantánea permanece en su cuenta. Datadog nunca comparte la instantánea con una cuenta de AWS de Datadog ni la copia en ella.
3. Datadog lee los bloques de la instantánea a través de HTTPS utilizando las API directas de Amazon EBS.
4. Datadog presenta los bloques a un entorno aislado de escaneo como un dispositivo de bloques, y el entorno aislado monta las particiones en modo de solo lectura.
5. Los escáneres analizan los sistemas de archivos montados y envían los hallazgos y las SBOMs a Datadog.
6. Datadog elimina la instantánea y destruye el entorno aislado.

Cada escaneo se ejecuta en una nueva microVM aislada por hardware con su propio kernel, la cual Datadog destruye cuando finaliza el escaneo. Datadog nunca ejecuta código en sus instancias.

### Qué envía el escaneo alojado por Datadog a Datadog {#datadog-hosted-what-data-is-sent-to-datadog}

Datadog lee el contenido de sus discos en su entorno de escaneo bajo demanda y **no** conserva ninguna copia de ese contenido. Solo los hallazgos y las SBOMs persisten en Datadog.

### Residencia de datos del escaneo alojado por Datadog {#datadog-hosted-data-residency}

Los escaneos se ejecutan en la región del sitio de Datadog que utiliza su organización, no en la región donde se encuentran sus recursos. Por ejemplo, si su organización utiliza el sitio EU1, Datadog escanea sus recursos en la UE, independientemente de en qué región de AWS se encuentren sus recursos.

Si sus recursos se encuentran en una región diferente a la de su sitio de Datadog, el escaneo puede implicar una transferencia de datos transfronteriza. Revise sus requisitos de privacidad antes de habilitar el escaneo para estas cuentas. Si sus datos deben procesarse en su propia cuenta o región de la nube, utilice el escaneo autohospedado.

### Costo del proveedor de la nube para el escaneo hospedado por Datadog {#datadog-hosted-cost}

No hay costo de infraestructura de escáner en su factura del proveedor de la nube ni costo adicional de Datadog.

### Escaneo hospedado por Datadog del almacenamiento en la nube {#datadog-hosted-cloud-storage-scanning}

Puede habilitar [Sensitive Data Scanner][8] para buckets de Amazon S3 durante la configuración. Sensitive Data Scanner cataloga y clasifica los datos confidenciales en su almacenamiento en la nube.

Con el escaneo hospedado por Datadog, Datadog lee el contenido de sus buckets de S3 en su entorno de escaneo, de la misma manera que el contenido del disco. Datadog **no** conserva el contenido de sus objetos ni los datos coincidentes. Para cada coincidencia, Datadog almacena solo la ubicación: el bucket, la ruta del objeto, la regla de coincidencia y la posición en el objeto. Debido a que los buckets a menudo contienen datos más confidenciales que los discos, revise sus requisitos de manejo de datos antes de habilitar Sensitive Data Scanner.

Sensitive Data Scanner es opcional. Puede desactivarlo y seguir utilizando el escaneo hospedado por Datadog para detectar vulnerabilidades. Para desactivarlo después de la configuración:

- **CloudFormation**: Desactive Sensitive Data Scanner en Datadog. Para obtener instrucciones, consulte [Configurar Sensitive Data Scanner][20].
- **Terraform**: En el recurso `datadog_agentless_scanning_aws_scan_options`, establezca `sensitive_data` en `false` y luego aplique la configuración.

### Escaneo bajo demanda hospedado por Datadog {#datadog-hosted-on-demand-scanning}

La [On-Demand Scanning API][14] no está disponible para el escaneo hospedado por Datadog. Datadog escanea sus recursos automáticamente cada 12 horas.

## Agentless Scanning autohospedado {#self-hosted-scanning}

Los escáneres se ejecutan en su propia cuenta de nube. Para obtener instrucciones de configuración, consulte [Habilitación de Agentless Scanning][18].

### Cómo funciona el escaneo autohospedado {#how-it-works}

El siguiente diagrama ilustra cómo funciona Agentless Scanning autohospedado:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra cómo funciona Agentless Scanning autohospedado" width="90%" >}}

<!-- TODO(DOCS-16346): Replace with side-by-side diagram of both modes when available. -->

1. Datadog programa escaneos automatizados en intervalos de 12 horas y envía los recursos a escanear a través de [Remote Configuration][2].
   - Si tiene configurados [Cloud Security Evaluation Filters][15], el escaneo Agentless respeta estos filtros y solo escanea los recursos que coinciden con los criterios configurados.
2. Para funciones serverless (como AWS Lambda), los escáneres obtienen el código de la función.
3. El escáner crea instantáneas de los volúmenes utilizados en las instancias de VM en ejecución. Utilizando las instantáneas o el código de la función, el escáner genera un SBOM (una lista de paquetes y dependencias).
4. El SBOM y los metadatos del servidor se transmiten a Datadog. Todos los demás datos (incluidas las instantáneas, el contenido de los discos y las imágenes de contenedores) permanecen en su infraestructura. Las instantáneas se eliminan.
5. Datadog utiliza el SBOM para identificar vulnerabilidades conocidas en sus recursos.

Esta arquitectura proporciona:
- **Privacidad de datos**: Sus contenidos de disco, imágenes de contenedor y datos confidenciales permanecen dentro de su cuenta en la nube. Solo los metadatos de los paquetes (el SBOM) y los metadatos del servidor se transmiten a Datadog.
- **Residencia de datos**: Las instantáneas y los contenidos de disco nunca salen de su cuenta en la nube, lo que simplifica el cumplimiento de los requisitos de soberanía de datos.
- **Compliance**: Los auditores pueden verificar que los datos escaneados permanezcan dentro de su perímetro.

Para obtener más información sobre la privacidad de los datos, consulte [Qué envía el escaneo autohospedado a Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>El escáner opera como una VM independiente dentro de su infraestructura, lo que minimiza el impacto en los sistemas y recursos existentes.</li>
    <li>Para AWS, las instancias del escáner se escalan automáticamente según la carga de trabajo. Cuando no hay recursos para escanear, los escáneres se reducen a cero para minimizar los costos del proveedor de la nube.</li>
    <li>El escáner recopila de forma segura una lista de paquetes de sus servidores sin transmitir ninguna información confidencial o personal privada fuera de su infraestructura.</li>
    <li>El escáner limita su uso de la API del proveedor de la nube para evitar alcanzar los límites de solicitudes y utiliza espera exponencial si es necesario.</li>
    <li>Las instancias del escáner se rotan automáticamente cada 24 horas, asegurando que ejecuten las imágenes más recientes.</li>
  </ul>
</div>

### Qué envía el escaneo autohospedado a Datadog {#what-data-is-sent-to-datadog}

Para mantener la privacidad de sus datos, Datadog implementa una infraestructura de escaneo ligera **dentro de su cuenta en la nube**, en lugar de copiar las instantáneas de disco fuera de su entorno para analizarlas. El escaneo Agentless crea instantáneas de sus recursos y los analiza localmente, eliminando las instantáneas una vez que los análisis se completan. Solo envía a Datadog los metadatos del servidor y la lista de materiales de software (SBOM) resultante, la cual enumera los paquetes y las dependencias. Sus datos sin procesar, el contenido de los discos y las imágenes de contenedor nunca abandonan su entorno.

El escáner Agentless utiliza el formato OWASP [cycloneDX][3] para transmitir una lista de paquetes a Datadog. Nunca se transmite información confidencial o información personal privada fuera de su infraestructura.

El escáner **no** envía:
- Configuraciones del sistema y de los paquetes
- Claves de cifrado y certificados
- Registros y rastros de auditoría
- Datos comerciales confidenciales

### Costo del proveedor de nube para el escaneo autohospedado {#cloud-service-provider-cost}

Los escáneres autohospedados se ejecutan dentro de su cuenta en la nube, por lo que los costos de cómputo y red aparecen en la factura de su proveedor de nube.

Para reducir costos:
- Implemente un escáner en cada región donde tenga más de 150 servidores. Un escáner regional evita la transferencia de datos entre regiones, lo cual es más rentable que escanear esos servidores desde una región remota.
- Utilice la [configuración recomendada][13] con Terraform para implementar un escáner por región.
- Para implementaciones grandes en varias regiones, consulte [Implementación del escaneo Agentless][16] para obtener orientación sobre cómo elegir una topología de implementación.

### Restrinja el acceso al escáner {#restrict-scanner-access}

Las instancias de escáner requieren [permisos][4] para crear y copiar instantáneas y describir volúmenes. Datadog recomienda seguir las siguientes pautas para mantener sus escáneres seguros:

- Restrinja el acceso a las instancias de escáner a los usuarios administrativos.
- Establezca los permisos del escáner para seguir el principio de menor privilegio, limitados al mínimo requerido para el escaneo.
- Cifre toda la transmisión de datos entre el escáner y Datadog con HTTPS.
- Habilite las actualizaciones de seguridad sin intervención y rote las instancias automáticamente cada 24 horas.
- No permita el acceso entrante a las instancias del escáner (grupo de seguridad restringido).

### Escaneo de almacenamiento en la nube autohospedado {#cloud-storage-scanning}

Puede habilitar [Sensitive Data Scanner][8] para sus recursos de Agentless Scanning durante la implementación o después de la configuración. Sensitive Data Scanner cataloga y clasifica los datos confidenciales en su almacenamiento en la nube (como buckets de Amazon S3). Solo lee los almacenes de datos y sus archivos en su entorno, sin enviar ningún dato confidencial a Datadog.

### Escaneo bajo demanda autohospedado {#on-demand-scanning}

De forma predeterminada, Agentless Scanning escanea automáticamente sus recursos cada 12 horas. Para AWS, también puede activar un escaneo inmediato de un recurso específico (servidor, contenedor, función Lambda o bucket de S3) mediante la On-Demand Scanning API. Para obtener más información, consulte la documentación de la [On-Demand Scanning API][14].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /es/remote_configuration
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /es/security/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/remote_configuration
[11]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[14]: /es/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /es/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[17]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=datadog_hosted#move-an-account-from-self-hosted-to-datadog-hosted-scanning
[18]: /es/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted
[19]: /es/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=datadog_hosted
[20]: /es/security/sensitive_data_scanner/setup/