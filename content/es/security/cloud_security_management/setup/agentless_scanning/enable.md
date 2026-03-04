---
aliases:
- /es/security/cloud_security_management/setup/agentless_scanning/quick_start
- /es/security/cloud_security_management/setup/agentless_scanning/cloudformation
- /es/security/cloud_security_management/setup/agentless_scanning/terraform
- /es/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
- /es/security/cloud_security_management/guide/agentless_aws_integration
- /es/security/cloud_security_management/guide/agentless_terraform
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
title: Activación de de Agentless Scanning
---

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen dentro de tu infraestructura en la nube, sin necesidad de instalar el Datadog Agent. Para obtener más información sobre las capacidades y el funcionamiento de Agentless Scanning, consulta la documentación [Agentless Scanning][12].

## Requisitos previos

Antes de configurar Agentless Scanning, asegúrate de que se cumplen los siguientes requisitos previos:

- **Configuración remota**: la [Configuración remota][3] es necesaria para permitir que Datadog envíe información a analizadores sin agente, como qué recursos en la nube analizar.
- **Claves de aplicación y de API**:
  - Se necesita una clave de API con la configuración remota activada para que los analizadores informen de los resultados de los análisis a Datadog.
  - Se necesita una clave de aplicación con permisos **Integrations Manage** (Gestión de integraciones) o **Org Management** (Gestión de organizaciones) para activar las funciones de análisis en la API de Datadog.
- **Permisos en la nube**: la instancia de Agentless Scanning requiere permisos específicos para escanear hosts, imágenes de host, registros de contenedores y funciones. Estos permisos se aplican automáticamente como parte del proceso de instalación y se limitan estrictamente a los permisos mínimos requeridos para realizar los escaneos necesarios, siguiendo el principio de mínimo privilegio.<br><br>
  {{< collapse-content title="Permisos de escaneo de AWS" level="h5" >}}
  <p>Permisos de escaneo:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Solo cuando está activado Sensitive Data Scanning (DSPM):</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de Azure" level="h5" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de GCP" level="h5" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## Instalación

<div class="alert alert-danger">La ejecución de analizadores sin agente conlleva costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los escaneos cada 12 horas, Datadog recomienda configurar <a href="#terraform-setup">Agentless Scanning con Terraform</a> como plantilla predeterminada.</div>

Para activar Agentless Scanning, utiliza uno de los siguientes flujos de trabajo:

### Inicio rápido

Diseñado para nuevos usuarios, el proceso de inicio rápido ofrece un paso de configuración eficiente para Cloud Security, permitiendo la monitorización inmediata de los recursos de AWS. Utiliza AWS CloudFormation para automatizar la configuración.

{{% collapse-content title="Guía de configuración de inicio rápido" level="h4" id="quick-start-setup" %}}
Diseñado para nuevos usuarios, el proceso de inicio rápido ofrece un paso de configuración eficiente para Cloud Security, permitiendo la monitorización inmediata de los recursos de AWS. Utiliza AWS CloudFormation para automatizar la configuración, e incluye las características de Cloud Security: Misconfigurations, Identity Risks (CIEM) y Vulnerability Management.

<div class="alert alert-info">Este artículo proporciona instrucciones para el proceso de inicio rápido para nuevos usuarios que utiliza AWS CloudFormation para configurar Agentless Scanning.
Para los usuarios existentes que deseen agregar una nueva cuenta de AWS o habilitar Agentless Scanning en una cuenta de AWS integrada existente, consulta las instrucciones de
<a href="#terraform-setup">Terraform</a> o <a href="#aws-cloudformation-setup">AWS CloudFormation</a>.</div>

<div class="alert alert-danger">La ejecución de analizadores sin agente conlleva costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los escaneos cada 12 horas, Datadog recomienda configurar <a href="#terraform-setup">Agentless Scanning con Terraform</a> como plantilla predeterminada.</div>

<div class="alert alert-danger">Sensitive Data Scanner para el almacenamiento en la nube tiene Disponibilidad limitada. <a href="https://www.datadoghq.com/private-beta/data-security">Solicita acceso</a> para inscribirte.</div>

##### Instalación

1. En la página de [Introducción a Cloud Security][4], haz clic en **Get Started with Cloud Security** (Iniciar con Cloud Security).
1. Haz clic en **Quick Start** (Inicio rápido). Aparecerá la página **Features** (Características), que muestra las características incluidas en el Inicio rápido de Agentless Scanning.
1. Haz clic en **Start Using Cloud Security** (Iniciar el uso de Cloud Security) para continuar.
1. Selecciona la región de AWS en la que deseas crear el stack tecnológico de CloudFormation.
1. Selecciona una clave de API que ya esté configurada para la Configuración remota. Si la clave de API que seleccionas no tiene habilitada la Configuración remota, ésta se habilitará automáticamente para dicha clave al seleccionarla.
1. Elige si deseas activar **Sensitive Data Scanner** para el almacenamiento en la nube. Esto cataloga y clasifica automáticamente los datos confidenciales en los recursos de Amazon S3.
1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation). Se abrirá una nueva ventana con la pantalla de AWS CloudFormation. Utiliza la plantilla de CloudFormation proporcionada para crear un stack tecnológico. La plantilla incluye los permisos de IAM necesarios para desplegar y gestionar analizadores sin agente.

##### Actualizar el stack tecnológico de CloudFormation

Datadog recomienda actualizar el stack tecnológico de CloudFormation con regularidad para poder acceder a las nuevas funciones y correcciones de errores a medida que se publiquen. Para ello, sigue estos pasos:
1. Inicia sesión en tu consola de AWS y ve a la página de Stacks tecnológicos de CloudFormation.
2. Selecciona el stack tecnológico secundario de CloudFormation **DatadogIntegration-DatadogAgentlessScanning-...**, haz clic en **Update** (Actualizar) y, a continuación, en **Update nested stack** (Actualizar stack tecnológico anidado).
3. Haz clic en **Replace existing template** (Reemplazar plantilla existente).
4. En la siguiente URL de S3: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, sustituye `<VERSION>` por la versión que se encuentra en [aws_quickstart/version.txt][14]. Pega esa URL en el campo **Amazon S3 URL** (URL de Amazon S3).
5. Pulsa **Next** (Siguiente) para avanzar por las siguientes páginas sin modificarlas y, a continuación, envía el formulario.

{{% /collapse-content %}}

<br />

### Terraform

El [módulo del analizador sin agente de Terraform Datadog][6] proporciona una configuración sencilla y reutilizable para instalar el analizador sin agente de Datadog para AWS, Azure y GCP.

{{% collapse-content title="Guía de configuración de Terraform" level="h4" id="terraform-setup" %}}
Si ya has [configurado Cloud Security][10] y quieres añadir una nueva cuenta en la nube o habilitar [Agentless Scanning][1] en una cuenta en la nube integrada existente, puedes utilizar Terraform, [AWS CloudFormation][2] o [Azure Resource Manager][5]. Este artículo proporciona instrucciones detalladas para el enfoque de Terraform.

<div class="alert alert-info">Si estás configurando Cloud Security por primera vez, puedes seguir el <a href="#quick-start-setup">proceso de inicio rápido</a>, que utiliza AWS CloudFormation para habilitar Agentless Scanning.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations > AWS** (Integraciones en la nube > AWS).
1. En la parte inferior de la sección de AWS, haz clic en **Add AWS accounts by following these steps** (Añadir cuentas de AWS siguiendo estos pasos). Aparecerá la pantalla **Add New AWS Account(s)** (Añadir nuevas cuentas de AWS).
1. En **Choose a method for adding your AWS account** (Elige un método para añadir tu cuenta de AWS), selecciona **Manually** (Manualmente).
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Selecciona la casilla **I confirm that the Datadog IAM Role has been added to the AWS Account** (Confirmo que la función de IAM de Datadog se ha añadido a la cuenta de AWS).
1. Introduce el **AWS Account ID** (ID de cuenta de AWS) y el **AWS Role Name** (Nombre del rol de AWS).
1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Cuenta existente AWS " %}}

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations > AWS** (Integraciones en la nube > AWS).
1. Haz clic en el botón **Edit scanning** (Editar escaneo) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) de la cuenta de AWS en la que deseas desplegar el analizador sin agente.
1. La opción **Enable Resource Scanning** (Activar escaneo de recursos) ya debería estar activada. Si no lo está, activa **Enable Resource Scanning** (Activar escaneo de recursos).
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **Terraform**.
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Selecciona la casilla **I confirm the Terraform module is installed** (Confirmo que el módulo de Terraform está instalado).
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing Azure account" %}}

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations > Azure** (Integraciones en la nube > Azure).
1. Expande el inquilino que contiene la suscripción en la que deseas desplegar el analizador sin agente.
1. Haz clic en el botón **Enable** (Habilitar) de la cuenta de Azure en la que deseas desplegar el analizador sin agente.
1. Activa **Vulnerability Scanning** (Escaneo de vulnerabilidades).
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **Terraform**.
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}

{{% tab "Existing GCP project" %}}

1. En la página [Cloud Security Setup][1] (Configuración de seguridad en la nube), haz clic en **Cloud Integrations > GCP** (Integraciones de la nube > GCP).
1. Expande la cuenta que contiene el proyecto en el que deseas desplegar el analizador sin agente.
1. Haz clic en el botón **Enable** (Habilitar) para el proyecto de GCP en el que deseas desplegar el analizador sin agente.
1. Activa **Vulnerability Scanning** (Escaneo de vulnerabilidades).
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme

{{% /tab %}}
{{< /tabs >}}

##### Actualizar la versión de los módulos de Terraform

Actualiza la referencia `source` para los módulos del analizador sin agente a la última versión. Puedes encontrar la última versión en [Versiones de GitHub](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases).

Para ver ejemplos de uso, consulta nuestro [repositorio de Github](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples).

[1]: /es/security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation-setup
[5]: #azure-resource-manager-setup

{{% /collapse-content %}}

<br />

### AWS Cloudformation

Utiliza la plantilla de AWS CloudFormation para crear un stack tecnológico de CloudFormation. La plantilla incluye los permisos de IAM necesarios para desplegar y gestionar analizadores sin agente.

{{% collapse-content title="Guía de configuración de AWS CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Si ya has [configurado Cloud Security][10] y deseas añadir una nueva cuenta en la nube o habilitar [Agentless Scanning][1] en una cuenta integrada existente de AWS, puedes utilizar [Terraform][7] o AWS CloudFormation. Este artículo proporciona instrucciones detalladas para el enfoque de AWS CloudFormation.

<div class="alert alert-info">Si estás configurando Cloud Security por primera vez, puedes seguir el <a href="#quick-start-setup">proceso de inicio rápido</a>, que también utiliza AWS CloudFormation para habilitar Agentless Scanning.</div>

<div class="alert alert-danger">La ejecución de analizadores sin agente conlleva costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los escaneos cada 12 horas, Datadog recomienda configurar <a href="#terraform-setup">Agentless Scanning con Terraform</a> como plantilla predeterminada.</div>

<div class="alert alert-danger">Sensitive Data Scanner para el almacenamiento en la nube tiene Disponibilidad limitada. <a href="https://www.datadoghq.com/private-beta/data-security">Solicita acceso</a> para inscribirte.</div>

##### Configurar AWS CloudFormation

{{< tabs >}}
{{% tab "New AWS account" %}}

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. En la parte inferior de la sección de AWS, haz clic en **Add AWS accounts by following these steps** (Añadir cuentas de AWS siguiendo estos pasos). Aparecerá la pantalla **Add New AWS Account(s)** (Añadir nuevas cuentas de AWS).
1. Selecciona la región de AWS en la que deseas crear el stack tecnológico de CloudFormation.
1. Selecciona una clave de API que ya esté configurada para la Configuración remota. Si la clave de API que seleccionas no tiene habilitada la Configuración remota, ésta se habilitará automáticamente para dicha clave al seleccionarla.
1. Elige si deseas activar **Sensitive Data Scanner** para el almacenamiento en la nube. Esto cataloga y clasifica automáticamente los datos confidenciales en los recursos de Amazon S3.
1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation). Se abrirá una nueva ventana con la pantalla de AWS CloudFormation. Utiliza la plantilla de CloudFormation proporcionada para crear un stack tecnológico. La plantilla incluye los permisos de IAM necesarios para desplegar y gestionar analizadores sin agente.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Cuenta existente AWS " %}}

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. Haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) de la cuenta AWS en la que quieres desplegar el analizador sin agente.
1. Comprueba que **Enable Resource Scanning** (Activar escaneo de recursos) está activado. Si no lo está, activa la casilla **Enable Resource Scanning** (Activar escaneo de recursos) y sigue los pasos 3-7 de [Nueva cuenta de AWS][2].
1. En la sección **Agentless Scanning**, activa **Enable Vulnerability Management (Host, Container and Lambda)** (Activar Vulnerability Management [Host, contenedor y Lambda]).
1. Elige si deseas **Enable Sensitive Data Scanner for Cloud Storage** (Habilitar Sensitive Data Scanner para almacenamiento en la nube). Esto cataloga y clasifica automáticamente los datos confidenciales en los recursos de Amazon S3.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /es/security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### Actualizar el stack tecnológico de CloudFormation

Datadog recomienda actualizar el stack tecnológico de CloudFormation con regularidad para poder acceder a las nuevas funciones y correcciones de errores a medida que se publiquen. Para ello, sigue estos pasos:
1. Inicia sesión en tu consola de AWS y ve a la página de Stacks tecnológicos de CloudFormation.
2. Selecciona el stack tecnológico secundario de CloudFormation **DatadogIntegration-DatadogAgentlessScanning-...**, haz clic en **Update** (Actualizar) y, a continuación, en **Update nested stack** (Actualizar stack tecnológico anidado).
3. Haz clic en **Replace existing template** (Reemplazar plantilla existente).
4. En la siguiente URL de S3: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, sustituye `<VERSION>` por la versión que se encuentra en [aws_quickstart/version.txt][14]. Pega esa URL en el campo **Amazon S3 URL** (URL de Amazon S3).
5. Pulsa **Next** (Siguiente) para avanzar por las siguientes páginas sin modificarlas y, a continuación, envía el formulario.
{{% /collapse-content %}}

<br />

### AWS CloudFormation StackSet (multicuenta)

Para organizaciones AWS con varias cuentas utiliza CloudFormation StackSet para desplegar el rol de delegado del Agentless Scanning en todas las cuentas miembro. Esta estrategia automatiza el proceso de incorporación y garantiza que las nuevas cuentas añadidas a tu organización se configuren automáticamente.

{{% collapse-content title="Guía de configuración de AWS CloudFormation StackSet" level="h4" id="aws-cloudformation-stackset-setup" %}}

Esta configuración despliega el rol de delegado requerido para el [análisis entre cuentas][18] a través de tu organización AWS o de unidades organizativas (OU) específicas.

##### Requisitos previos

1. Accede a la cuenta de gestión AWS.
2. El [Acceso de confianza con organizaciones AWS][19] debe estar activado para CloudFormation StackSets.
3. Agentless Scanning ya debe estar configurado en tu cuenta de análisis central. Consulta la configuración de [AWS CloudFormation](#aws-cloudformation-setup) o de [Terraform](#terraform-setup).

##### Despliegue del StackSet

1. Inicia sesión en tu cuenta de gestión AWS y ve a **CloudFormation > StackSets**.

2. Haz clic en **Create StackSet** (Crear StackSet).
3. Selecciona **Service-managed permissions** (Permisos gestionados por el servicio).
4. En **Specify template** (Especificar plantilla), selecciona **Amazon S3 URL** (URL de Amazon S3) e introduce la siguiente URL:

{{< code-block lang="text" >}}
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
{{< /code-block >}}

5. Introduce un **nombre de StackSet** (por ejemplo, `DatadogAgentlessScanningStackSet`).
6. Configura los parámetros necesarios:
   - **ScannerInstanceRoleARN**: El ARN del rol IAM adjunto a tus instancias de análisis sin agente.

   `ScannerInstanceRoleARN` establece una relación de confianza entre el rol de delegado (creado en las cuentas de destino) y tus instancias del analizador (que ya se ejecutan en la cuenta central). Esto permite el análisis entre cuentas cuando:
   1. El analizador se ejecuta en la cuenta A.
   2. El rol de delegado existe en las cuentas B, C, D (desplegadas a través del StackSet).
   3. El analizador asume los roles de delegado para analizar los recursos de esas cuentas.
7. Define **objetivos de despliegue** para desplegar en toda tu organización o en unidades organizativas específicas.
8. Activa **Automatic deployment** (Despliegue automático) para configurar automáticamente las nuevas cuentas añadidas a tu organización.
9. Selecciona una **región única** para el despliegue (el rol IAM es global y solo necesita desplegarse una vez por cuenta).
10. Revisa y envía el StackSet.

Una vez que el StackSet se haya desplegado correctamente, las cuentas miembro se configuran para permitir el análisis entre cuentas desde la cuenta central de tu analizador.

[18]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[19]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html

{{% /collapse-content %}}

<br />

### Azure Resource Manager

Utiliza la plantilla de Azure Resource Manager para desplegar el analizador sin agente. La plantilla incluye las definiciones de rol necesarias para desplegar y gestionar analizadores sin agente.

{{% collapse-content title="Guía de configuración de Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Si ya has [configurado Cloud Security][10] y deseas agregar una nueva cuenta de Azure o habilitar [Agentless Scanning][1] en una cuenta de Azure integrada existente, puedes utilizar [Terraform][7] o Azure Resource Manager. Este artículo proporciona instrucciones detalladas para el enfoque mediante Azure Resource Manager.

<div class="alert alert-danger">La ejecución de analizadores sin agente conlleva costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los escaneos cada 12 horas, Datadog recomienda configurar <a href="#terraform-setup">Agentless Scanning con Terraform</a> como plantilla predeterminada.</div>

{{< tabs >}}
{{% tab "New Azure account" %}}

###### Configurar la integración Datadog Azure

Sigue las instrucciones para configurar la [integración Datadog Azure][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /es/integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Existing Azure account" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Configuración

### Verificar tu configuración

Una vez finalizada la configuración, puedes verificar que Agentless Scanning funciona correctamente consultando los resultados del escaneo en Datadog. Los resultados suelen aparecer una vez completado el primer ciclo de escaneo.

Visualiza los resultados del escaneo en las siguientes ubicaciones:

- **Para vulnerabilidades de hosts y contenedores**: [CSM Vulnerabilities Explorer][15]. Para ver solo las vulnerabilidades detectadas por Agentless Scanning, utiliza el filtro `origin:"Agentless scanner"` en la barra de búsqueda.
- **Para vulnerabilidades de Lambda**: [Code Security (SCA) Explorer][16]
- **Para hallazgos de datos confidenciales**: [Sensitive Data Scanner][17]

### Excluir recursos de los análisis

{{% csm-agentless-exclude-resources %}}

## Desactivar Agentless scanning

{{< tabs >}}
{{% tab "AWS" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. Si es necesario, utiliza filtros para encontrar la cuenta para la que deseas detener Agentless scanning. Haz clic en la cuenta para abrir el panel lateral que contiene su configuración.
1. En la pestaña **Features** (Características), haz clic en **Configure Agentless Scanning** (Configurar Agentless Scanning) o en **Manage** (Gestionar) para abrir el cuadro de configuración de Agentless Scanning.
1. En **How would you like to set up Agentless scanning?** (¿Cómo deseas configurar Agentless Scanning?), haz clic en **Terraform**.
1. En **Enable Features** (Activar funciones), junto a **Enable Agentless Vulnerability management** (Activar gestión de Agentless Vulnerability), cambia el conmutador a la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **Azure** (Integraciones en la nube > Azure).
1. Localiza el inquilino de tu suscripción, expande la lista de suscripciones e identifica la suscripción en la que quieres desactivar el análisis Agentless.
1. Junto a la etiqueta **Enabled** (Habilitado), haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) para abrir el modal de Vulnerability Scanning.
1. Junto a **Vulnerability Scanning**, coloca el conmutador en la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **GCP** (Integraciones en la nube > GCP).
1. Expande la cuenta que contiene el proyecto en el que deseas desactivar Agentless Scanning.
1. Junto a la etiqueta **Enabled** (Habilitado), haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) para abrir el modal de Vulnerability Scanning.
1. Junto a **Vulnerability Scanning**, coloca el conmutador en la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Desinstalar Agentless Scanning

{{< tabs >}}
{{% tab "Terraform" %}}
Para desinstalar Agentless Scanning, elimina el módulo del analizador de tu código de Terraform. Para obtener más información, consulta la documentación del [módulo de Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Para desinstalar Agentless Scanning, inicia sesión en tu consola de AWS y elimina el stack tecnológico de CloudFormation creado para Agentless Scanning.
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Para desinstalar Agentless Scanning, inicia sesión en tu cuenta de Azure. Si creaste un grupo de recursos dedicado para el analizador sin agente, elimina este grupo de recursos junto con las siguientes definiciones de rol de Azure:
  - Rol del analizador sin agente de Datadog
  - Rol delegado del analizador sin agente de Datadog

Si no has utilizado un grupo de recursos dedicado, deberás eliminar manualmente los recursos del analizador, que pueden identificarse con las etiquetas (tags) `Datadog:true` y `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning
[2]: /es/integrations/amazon_web_services/
[3]: /es/remote_configuration
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform-setup
[8]: mailto:success@datadoghq.com
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation-setup
[12]: /es/security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager-setup
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage