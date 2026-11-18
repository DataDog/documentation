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
  text: Escaneo Agentless de Cloud Security
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentación
  text: Solución de problemas de Agentless Scanning
title: Habilitación de Agentless Scanning
---
Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en su infraestructura en la nube sin instalar el Datadog Agent. Agentless Scanning se ejecuta por completo dentro de su infraestructura, envía una cantidad mínima de datos a Datadog y mantiene sus datos confidenciales en su entorno. Debido a que el escáner se ejecuta en su cuenta de nube, se aplican los [costos del proveedor de nube][20] estándar. Para obtener más información, consulte la [descripción general de Agentless Scanning][12].

La configuración toma aproximadamente 30 minutos por cuenta de nube:

1. Verifique los requisitos previos a continuación.
1. Elija su proveedor de nube y método de implementación.
1. Inicie una plantilla en su cuenta de nube.
1. Verifique los resultados del escaneo en Datadog.

## Requisitos previos {#prerequisites}

Antes de configurar Agentless Scanning, verifique que se cumplan los siguientes requisitos previos:

- **Remote Configuration**: [Remote Configuration][3] debe estar habilitada en su organización de Datadog para enviar instrucciones de escaneo a los escáneres Agentless.
- **[Claves de API y de aplicación][1]**:
  - Se requiere una {{< ui >}}API key{{< /ui >}} con Remote Configuration habilitada para que los escáneres informen los resultados del escaneo a Datadog.
  - Se requiere una {{< ui >}}Application key{{< /ui >}} con permisos de `Integrations Manage` o `Org Management` para que usted pueda habilitar las funciones de escaneo a través de la API de Datadog.
- **Permisos de nube**: La instancia de Agentless Scanning requiere permisos específicos para escanear servidores, imágenes de servidores, registros de contenedores y funciones. Datadog aplica automáticamente estos permisos, enumerados a continuación para mayor transparencia, durante la instalación.<br><br>
  {{< collapse-content title="Permisos de escaneo de AWS" level="h3" >}}
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
    <li><code>ec2:DescribeImages</code></li>
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
  <p>Solo cuando Sensitive Data Scanning (DSPM) está habilitado:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de Azure" level="h3" >}}
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
    <li><code>Microsoft.Compute/galleries/images/versions/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/repositories/content/read</code> (acción de datos)</li>
    <li><code>Microsoft.Web/sites/read</code></li>
    <li><code>Microsoft.Web/sites/publish/Action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de GCP" level="h3" >}}
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

## Configuración {#setup}

Consulte [Implementación de Agentless Scanning][2] para obtener información sobre cómo estructurar su implementación, incluida la cantidad de cuentas y regiones en las que implementa los escáneres.

Seleccione su proveedor de nube para ver los métodos de configuración disponibles. Si está configurando Agentless Scanning en varios proveedores de nube, complete la configuración para cada proveedor de forma independiente.

{{< tabs >}}
{{% tab "AWS" %}}

### Elija su configuración {#choose-your-setup}

- **Nuevo en Datadog**: En la página [Intro to Cloud Security][2], haga clic en {{< ui >}}Get Started with Cloud Security{{< /ui >}} y luego en {{< ui >}}Quick Start{{< /ui >}}. Quick Start es un flujo de configuración guiado que utiliza AWS CloudFormation para implementar Agentless Scanning con todas las funciones de Cloud Security preactivadas. Solo está disponible para organizaciones que aún no han configurado Cloud Security Management.
- **Cuenta única de AWS en Datadog**: Utilice [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup). Se recomienda Terraform para implementaciones en varias regiones.
- **Organización de AWS con varias cuentas**: utilice [CloudFormation StackSet](#aws-cloudformation-stackset-setup) para implementar capacidades de escaneo en todas las cuentas miembro.
- **Varias cuentas sin AWS Organizations**: repita la configuración de [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup) para cada cuenta individualmente.

{{% collapse-content title="CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Utilice CloudFormation si ya tiene una cuenta de AWS integrada con Datadog y desea habilitar Agentless Scanning, o si desea agregar una nueva cuenta de AWS.

#### Nueva cuenta de AWS {#new-aws-account}

1. En la página [Cloud Security Setup][1], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. En la parte inferior de la sección de AWS, haga clic en {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. Se muestra el cuadro de diálogo {{< ui >}}Add New AWS Account(s){{< /ui >}}.
1. Seleccione las opciones {{< ui >}}Add a Single AWS Account{{< /ui >}} y {{< ui >}}CloudFormation{{< /ui >}}.
1. Seleccione la región de AWS donde desea crear la pila de CloudFormation.
1. Seleccione una clave de API que tenga habilitada [Remote Configuration][3].
1. Elija si desea habilitar {{< ui >}}Sensitive Data Scanner{{< /ui >}} para el almacenamiento en la nube. Esto cataloga y clasifica automáticamente los datos confidenciales en los recursos de Amazon S3.
1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Se abre una nueva ventana que muestra la pantalla de AWS CloudFormation. Utilice la plantilla de CloudFormation proporcionada para crear una pila. La plantilla incluye los permisos de IAM necesarios para implementar y administrar escáneres Agentless.

#### Cuenta de AWS existente {#existing-aws-account}

1. En la página [Cloud Security Setup][1], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Haga clic en la cuenta de AWS donde desea implementar el escáner Agentless, lo cual abre el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir el cuadro de diálogo Agentless Scanning Setup.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}CloudFormation{{< /ui >}}.
1. Seleccione la región de AWS que corresponde a la pila de CloudFormation.
1. Seleccione una clave de API que tenga habilitada [Remote Configuration][3].
1. Copie la nueva clave de aplicación que genera Datadog.
1. Elija entre:
   - Utilice un escáner existente y, a continuación, seleccione el escáner que desea utilizar.
   - Implemente un nuevo escáner.
1. Active las funciones que desea habilitar, como {{< ui >}}Agentless Vulnerability Management{{< /ui >}} o {{< ui >}}Sensitive Data Scanning for Cloud Storage{{< /ui >}}.
1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Se abre una nueva ventana que muestra la pantalla de AWS CloudFormation. Utilice la plantilla de CloudFormation proporcionada para crear una pila.
1. Haga clic en {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /es/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (multicuenta)" level="h4" id="aws-cloudformation-stackset-setup" %}}

Para organizaciones de AWS con varias cuentas, utilice un StackSet de CloudFormation para implementar el rol delegado de Agentless Scanning en todas las cuentas miembro. Este enfoque automatiza la incorporación y configura las nuevas cuentas agregadas a su organización de AWS.

Esta configuración implementa el rol de delegado necesario para el [escaneo entre cuentas](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) en toda su organización de AWS o en unidades organizativas (OU) específicas. Primero, configure Agentless Scanning en su cuenta de escaneo central mediante [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup); luego, implemente el StackSet para configurar las cuentas restantes.

#### Requisitos previos {#prerequisites-1}

- Acceso a la cuenta de administración de AWS
- [Trusted Access con AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) debe estar habilitado para los StackSets de CloudFormation
- Agentless Scanning ya configurado en su cuenta de escaneo central ([consulte arriba](#aws-cloudformation-setup))

#### Implemente el StackSet {#deploy-the-stackset}

1. Inicie sesión en su cuenta de administración de AWS y navegue a {{< ui >}}CloudFormation{{< /ui >}} > {{< ui >}}StackSets{{< /ui >}}.
1. Haga clic en {{< ui >}}Create StackSet{{< /ui >}}.
1. Seleccione {{< ui >}}Service-managed permissions{{< /ui >}}.
1. En {{< ui >}}Specify template{{< /ui >}}, seleccione {{< ui >}}Amazon S3 URL{{< /ui >}} e ingrese la siguiente URL:
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.22.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Ingrese un {{< ui >}}StackSet name{{< /ui >}} (por ejemplo, `DatadogAgentlessScanningStackSet`).
1. Configure el parámetro {{< ui >}}ScannerInstanceRoleARN{{< /ui >}}, que es el ARN del rol de IAM adjunto a sus instancias de escáner Agentless.
      <div class="alert alert-danger">El <code>ScannerInstanceRoleARN</code> debe ser el ARN exacto del rol de la instancia del escáner (por ejemplo, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). El uso de un ARN raíz como <code>arn:aws:iam::123456789012:root</code> no funciona.</div>
      <p>El <code>ScannerInstanceRoleARN</code> establece una relación de confianza entre el rol delegado (creado en las cuentas de destino) y sus instancias de escáner (que ya se ejecutan en la cuenta central). Esto permite el escaneo entre cuentas donde:</p>
      <ul>
        <li>El escáner se ejecuta en la Cuenta 4.</li>
        <li>El rol delegado existe en las Cuentas 1, 2, 3 (implementado a través del StackSet).</li>
        <li>El escáner asume los roles delegados para escanear recursos en esas cuentas.</li>
      </ul>
1. Configure {{< ui >}}Deployment targets{{< /ui >}} para implementar en toda su organización de AWS o en unidades organizativas (OU) específicas.
1. Habilite {{< ui >}}Automatic deployment{{< /ui >}} para configurar las nuevas cuentas agregadas a su organización de AWS.
1. Seleccione una sola región para la implementación (el rol de IAM es global y solo necesita implementarse una vez por cuenta).
1. Revise y envíe el StackSet.

Después de que el StackSet se implemente, las cuentas miembro se configuran para permitir el escaneo entre cuentas desde su cuenta de escáner central.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="aws-terraform-setup" %}}

El [módulo Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner Agentless de Datadog. Terraform es el método de implementación recomendado para entornos de varias regiones. Implementa un escáner por región, lo que evita costos de red entre regiones. Para obtener orientación sobre cómo elegir su topología de implementación, consulte [Implementación de Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ver ejemplos de uso que incluyen configuraciones de varias regiones, consulte el [directorio de ejemplos](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

#### Nueva cuenta de AWS {#new-aws-account-1}

1. En la página [Cloud Security Setup][1], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. En la parte inferior de la sección de AWS, haga clic en {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. Se muestra el cuadro de diálogo {{< ui >}}Add New AWS Account(s){{< /ui >}}.
1. Seleccione las opciones {{< ui >}}Add a Single AWS Account{{< /ui >}} y {{< ui >}}Manually{{< /ui >}}.
1. Siga las instrucciones para instalar el [módulo Datadog Agentless Scanner][2].
1. Seleccione la casilla de verificación {{< ui >}}I confirm that the Datadog IAM Role has been added to the AWS Account{{< /ui >}}.
1. Ingrese {{< ui >}}AWS Account ID{{< /ui >}} y {{< ui >}}AWS Role Name{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

#### Cuenta de AWS existente {#existing-aws-account-1}

1. En la página [Cloud Security Setup][1], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Haga clic en la cuenta de AWS donde desea implementar el escáner Agentless para abrir el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir la ventana modal Agentless Scanning Setup.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}Terraform{{< /ui >}}.
1. Siga las instrucciones para instalar el [módulo Datadog Agentless Scanner][2].
1. Seleccione la casilla de verificación {{< ui >}}I confirm the Datadog Agentless Scanner was installed using Terraform{{< /ui >}}.
1. Haga clic en {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifique su configuración](#verify-your-setup).

[2]: https://app.datadoghq.com/security/csm/
[3]: /es/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### Elija su configuración {#choose-your-setup-1}

- **Nuevo cliente de Azure**: Configure primero la [integración de Datadog Azure](https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure) y, luego, habilite Agentless Scanning.
- **Suscripción de Azure integrada existente**: Use [Cloud Shell](#azure-cloud-shell-setup) (recomendado), [Azure Resource Manager](#azure-resource-manager-setup) o [Terraform](#azure-terraform-setup).
- **Suscripciones múltiples**: Use [Cloud Shell](#azure-cloud-shell-setup) para implementaciones repetibles en múltiples suscripciones. [Terraform](#azure-terraform-setup) también está disponible si prefiere administrar su propia infraestructura como código.

<div class="alert alert-info">Si aún no ha conectado su suscripción de Azure a Datadog, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure">configure primero la integración de Azure</a>.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="azure-cloud-shell-setup" %}}
Use Azure Cloud Shell para configurar Agentless Scanning para sus suscripciones de Azure. Este método descarga un [script de configuración](https://github.com/DataDog/integrations-management/tree/main/azure/agentless) que utiliza el [módulo Terraform Datadog Agentless Scanner para Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme), por lo que no necesita administrar Terraform directamente. Puede revisar el script antes de ejecutarlo.

1. Asegúrese de que la identidad que utiliza en Cloud Shell tenga los permisos de Azure requeridos:

   - En la **suscripción del escáner**, la identidad debe tener un rol que otorgue permisos para asignar roles y crear recursos, como **Owner**.
   - En **cada suscripción escaneada**, la identidad debe tener un rol que otorgue el permiso `Microsoft.Authorization/roleAssignments/write`, para que la identidad administrada del escáner pueda recibir los permisos que necesita para crear instantáneas y leer discos, como **User Access Administrator** u **Owner**.

   Antes de ejecutar el comando generado, tenga en cuenta lo que hace el script de configuración en Azure:

   - **Estado de Terraform**: De forma predeterminada, crea una cuenta de almacenamiento de Azure en la suscripción del **escáner**. Para reutilizar una cuenta de almacenamiento existente en el grupo de recursos del escáner, configure `TF_STATE_STORAGE_ACCOUNT` antes de ejecutar el comando; el script no crea una cuenta nueva cuando esa variable está configurada.
   - **Proveedores de recursos**: Cuando es posible, registra estos proveedores de recursos en la suscripción del escáner: `Microsoft.Compute`, `Microsoft.Network`, `Microsoft.ManagedIdentity`, `Microsoft.Storage`, `Microsoft.KeyVault`, `Microsoft.Authorization`.
1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Haga clic en la suscripción de Azure donde desea implementar el escáner Agentless, lo cual abre el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir la ventana de configuración de escaneo Agentless.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}Cloud Shell{{< /ui >}}.
1. Seleccione una {{< ui >}}API key{{< /ui >}} que tenga habilitada la [Remote Configuration](/remote_configuration). Se genera automáticamente una clave de aplicación.
1. Seleccione la {{< ui >}}Azure subscriptions{{< /ui >}} que desea escanear.
1. Configure el escáner:
   - Si ya tiene escáneres implementados, puede elegir {{< ui >}}use an existing scanner{{< /ui >}} (recomendado) o {{< ui >}}deploy a new scanner{{< /ui >}}.
   - Si elige {{< ui >}}deploy a new scanner{{< /ui >}}, seleccione la {{< ui >}}scanner subscription{{< /ui >}} (que debe ser una de las suscripciones seleccionadas) y la {{< ui >}}scanner locations{{< /ui >}} (regiones de Azure, hasta cuatro). Datadog recomienda implementar escáneres en cada región donde tenga más de 150 hosts.
1. Haga clic en {{< ui >}}Copy command{{< /ui >}} para copiar el comando generado y haga clic en {{< ui >}}Open Azure Cloud Shell{{< /ui >}} para abrir [Azure Cloud Shell](https://shell.azure.com). Revise y ejecute el comando. El script aplica el [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) para implementar y configurar el escáner en la suscripción y las ubicaciones que seleccionó.
1. Una vez que se complete el comando, regrese a la página de configuración de Datadog y haga clic en {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}
{{% collapse-content title="Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Utilice la plantilla de Azure Resource Manager para implementar el escáner Agentless. La plantilla incluye las definiciones de roles necesarias para implementar y administrar escáneres Agentless.

#### Nueva suscripción de Azure {#new-azure-subscription}

<div class="alert alert-info">Asegúrese de tener configurada la <a href="/integrations/guide/azure-manual-setup/?tab=azurecli">integración de Datadog con Azure</a>.</div>

{{% csm-agentless-azure-resource-manager %}}

#### Suscripción de Azure existente {#existing-azure-subscription}

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="azure-terraform-setup" %}}

El [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner Agentless de Datadog. Para obtener orientación sobre cómo elegir su topología de implementación, consulte [Implementación del escaneo Agentless](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ver ejemplos de uso, consulte el [directorio examples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Haga clic en la suscripción de Azure donde desea implementar el escáner Agentless; se abrirá el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir el cuadro de diálogo de configuración del escaneo Agentless.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}Terraform{{< /ui >}}.
1. Siga las instrucciones para instalar el [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Haga clic en {{< ui >}}Done{{< /ui >}}.

{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifique su configuración](#verify-your-setup).

{{% /tab %}}

{{% tab "GCP" %}}

### Elija su configuración {#choose-your-setup-2}

- **Nuevo cliente de GCP**: [Configure primero la integración de GCP][25] y luego habilite el escaneo Agentless.
- **Proyecto de GCP integrado existente**: Use [Cloud Shell](#gcp-cloud-shell-setup) (recomendado) o [Terraform](#gcp-terraform-setup).

<div class="alert alert-info">Si aún no ha conectado su proyecto de GCP a Datadog, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">configure la integración de GCP</a> primero.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="gcp-cloud-shell-setup" %}}
Utilice Google Cloud Shell para configurar el escaneo Agentless para sus proyectos de GCP. Este método descarga un [script de configuración](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) que envuelve el [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), por lo que no necesita administrar Terraform directamente. Puede revisar el script antes de ejecutarlo.

1. Asegúrese de tener los permisos de GCP requeridos:

   - En el **proyecto del escáner**, la identidad que utilice en Cloud Shell debe tener el rol **Owner** o uno equivalente.
   - **Storage**: Incluya el permiso para crear almacenamiento de estado de Terraform en el proyecto del escáner, o para usar un bucket existente al que haga referencia con `TF_STATE_BUCKET` (por ejemplo, `roles/storage.admin`, o los permisos `storage.buckets.create`, `storage.buckets.get` y `storage.buckets.update`).

   Antes de ejecutar el comando generado, tenga en cuenta lo que hace el script de configuración en GCP:

   - **Estado de Terraform**: De forma predeterminada, crea un bucket de GCS en el proyecto **del escáner**. Para reutilizar un bucket existente, configure `TF_STATE_BUCKET` antes de ejecutar el comando; el script no crea un bucket cuando esa variable está configurada.
   - Si ve un error 403 en {{< ui >}}Setting up Terraform state storage{{< /ui >}}, consulte [GCP: Error al crear el bucket de estado][26] en la guía de solución de problemas.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Haga clic en el proyecto de GCP donde desea implementar el escáner Agentless, lo cual abre el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir la ventana de configuración de escaneo Agentless.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}Cloud Shell{{< /ui >}}.
1. Seleccione una {{< ui >}}API key{{< /ui >}} que tenga habilitada [Remote Configuration](/remote_configuration). Se genera automáticamente una clave de aplicación.
1. Seleccione el {{< ui >}}GCP projects{{< /ui >}} que desea escanear.
1. Configure el escáner:
   - Si ya tiene escáneres implementados, puede elegir {{< ui >}}use an existing scanner{{< /ui >}} (recomendado) o {{< ui >}}deploy a new scanner{{< /ui >}}.
   - Si elige {{< ui >}}deploy a new scanner{{< /ui >}}, seleccione el {{< ui >}}scanner project{{< /ui >}} (que debe ser uno de los proyectos seleccionados) y la {{< ui >}}scanner regions{{< /ui >}}. Datadog recomienda instalar escáneres en cada región donde tenga más de 150 hosts.
1. Haga clic en {{< ui >}}Copy command{{< /ui >}} para copiar el comando generado y haga clic en {{< ui >}}Open Google Cloud Shell{{< /ui >}} para abrir [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Revise y ejecute el comando. El script aplica el [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) para implementar y configurar el escáner en el proyecto y las regiones seleccionados.
1. Una vez que se complete el comando, regrese a la página de configuración de Datadog y haga clic en {{< ui >}}Done{{< /ui >}}.

[26]: /es/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="gcp-terraform-setup" %}}
El [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner Agentless de Datadog. Para obtener orientación sobre cómo elegir su topología de implementación, consulte [Implementación del escaneo Agentless](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ver ejemplos de uso, consulte el [directorio examples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Haga clic en el proyecto de GCP donde desea implementar el escáner Agentless, lo cual abre el panel lateral.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, haga clic en {{< ui >}}Configure Agentless Scanning{{< /ui >}} o {{< ui >}}Manage{{< /ui >}} para abrir el cuadro de diálogo de configuración del escaneo Agentless.
1. En la sección {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, seleccione {{< ui >}}Terraform{{< /ui >}}.
1. Siga las instrucciones para instalar el [módulo Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Haga clic en {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifique su configuración](#verify-your-setup).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## Verifique su configuración {#verify-your-setup}

Después de completar la configuración, Agentless Scanning tarda un tiempo en producir resultados iniciales. El primer ciclo de escaneo tarda aproximadamente 30 minutos en completarse.

<div class="alert alert-info">Si no aparecen resultados después de dos horas, consulte la <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">guía de solución de problemas de Agentless Scanning</a>.</div>

Vea los resultados del escaneo en las siguientes ubicaciones:

- **Para vulnerabilidades de servidores y contenedores**: [Cloud Security Vulnerabilities Explorer][15]. Para ver solo las vulnerabilidades detectadas por Agentless Scanning, utilice el filtro `origin:"Agentless scanner"` en la barra de búsqueda.
- **Para vulnerabilidades de Lambda**: [Code Security (SCA) Explorer][16].
- **Para hallazgos de datos confidenciales**: [Sensitive Data Scanner][17].

## Excluir recursos de los escaneos {#exclude-resources-from-scans}

Para excluir servidores, contenedores o funciones específicos de los escaneos, consulte [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters).

## Deshabilitar Agentless Scanning {#disable-agentless-scanning}

{{< tabs >}}
{{% tab "AWS" %}}
1. En la página [Cloud Security Setup][10], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Si es necesario, utilice filtros para encontrar la cuenta para la que desea detener Agentless Scanning. Haga clic en la cuenta para abrir el panel lateral que contiene su configuración.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, bajo {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, cambie los interruptores a la posición de apagado.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. En la página [Cloud Security Setup][10], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Expanda el inquilino que contiene la suscripción donde desea deshabilitar Agentless Scanning. Haga clic en la suscripción para abrir el panel lateral que contiene su configuración.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, bajo {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, cambie los interruptores a la posición de apagado.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. En la página [Cloud Security Setup][10], haga clic en {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Expanda la cuenta que contiene el proyecto donde desea deshabilitar Agentless Scanning. Haga clic en el proyecto para abrir el panel lateral que contiene su configuración.
1. En la pestaña {{< ui >}}Features{{< /ui >}}, bajo {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, cambie los interruptores a la posición de apagado.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Desinstalar Agentless Scanning {#uninstall-agentless-scanning}

Seleccione el método de implementación que utilizó para instalar Agentless Scanning:

{{< tabs >}}
{{% tab "Terraform" %}}
Para desinstalar Agentless Scanning, elimine el módulo del escáner de su código de Terraform. Para obtener más información, consulte la documentación del [módulo de Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Para desinstalar Agentless Scanning, inicie sesión en su consola de AWS y elimine la pila de CloudFormation creada para Agentless Scanning (el nombre de la subpila sigue el patrón `DatadogIntegration-DatadogAgentlessScanning-...`).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Para desinstalar Agentless Scanning, ejecute el mismo comando de configuración que utilizó durante la instalación mediante Google Cloud Shell, reemplazando `deploy` con `destroy` al final. Por ejemplo:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

Puede revisar el [código fuente del script de configuración][21] antes de ejecutar el comando.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Cloud Shell" %}}
Para desinstalar Agentless Scanning, ejecute el mismo comando de configuración que utilizó durante la instalación mediante Azure Cloud Shell, reemplazando `deploy` con `destroy` al final. Por ejemplo:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o azure_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_SUBSCRIPTION="<SCANNER_SUBSCRIPTION>" \
python3 azure_agentless_setup.pyz destroy
```

El comando destroy ejecuta `terraform destroy`, desactiva las opciones de escaneo Agentless en Datadog para cada suscripción configurada previamente y solicita confirmación antes de eliminar el Key Vault que contiene la clave de API. El grupo de recursos y la cuenta de almacenamiento de estado de Terraform se conservan de forma predeterminada; el script imprime instrucciones de eliminación manual para ellos.

Puede revisar el [código fuente del script de configuración][22] antes de ejecutar el comando.

[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Para desinstalar Agentless Scanning, inicie sesión en su suscripción de Azure. Si creó un grupo de recursos dedicado para el escáner Agentless, elimine este grupo de recursos junto con las siguientes definiciones de roles de Azure:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

Si no utilizó un grupo de recursos dedicado, debe eliminar manualmente los recursos del escáner, los cuales pueden identificarse mediante las etiquetas `Datadog:true` y `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/
[2]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /es/remote_configuration
[12]: /es/security/cloud_security_management/agentless_scanning
[20]: /es/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage