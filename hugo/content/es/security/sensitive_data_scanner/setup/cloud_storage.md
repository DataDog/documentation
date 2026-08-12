---
aliases:
- /es/sensitive_data_scanner/setup/cloud_storage
disable_toc: false
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentación
  text: Más información sobre las reglas de biblioteca predefinidas
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Más información sobre la creación de reglas personalizadas
title: Almacenamiento en la nube
---

{{< site-region region="gov" >}}

<div class="alert alert-danger">La exploración del almacenamiento en la nube no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

## Información general

{{< callout url="https://www.datadoghq.com/product-preview/data-security/" header="Join the Preview Program!"  >}}
La compatibilidad de exploración para buckets Amazon S3 e instancias de RDS está en la vista previa. Para inscribirte, haz clic en Solicitar acceso.
{{< /callout >}}

Despliega escáneres sin el Agente de Datadog en tu entorno para buscar información confidencial en tus recursos de almacenamiento en la nube. Los escáneres sin el Agente son instancias de EC2 que tú controlas y ejecutas en tu entorno. Los escáneres utilizan [Configuración remota][1] para recuperar una lista de buckets S3, así como sus dependencias. Escanean muchos tipos de archivos de texto, como CSV y JSON en tus buckets S3.

Cuando un escáner sin el Agent encuentra una coincidencia con cualquiera de las [reglas de la biblioteca de SDS][2], la instancia de análisis envía el tipo de regla y la ubicación de la coincidencia a Datadog. **Nota**: Los recursos de almacenamiento en la nube y sus archivos solo se leen en tu entorno: ningún dato confidencial que se haya analizado se envía de vuelta a Datadog.

En la [page (página) Resultados][3] del Sensitive Data Scanner, puedes ver qué recursos de almacenamiento en la nube se han analizado y las coincidencias encontradas, incluidas las reglas que las hicieron coincidir.

En este documento se explica lo siguiente:
- [Activación de la configuración remota](#enable-remote-configuration) para utilizar el Sensitive Data Scanner para el almacenamiento en la nube
- [Consideraciones de seguridad](#security-considerations) a tener en cuenta al utilizar el Sensitive Data Scanner para el almacenamiento en la nube
- Despliegue de escáneres en tu entorno con [CloudFormation](#automatically-deploy-scanners-using-cloudformation) o [Terraform](#manually-deploy-scanners-using-terraform)

## Activación de la configuración remota {#enable-remote-configuration}

La configuración remota permite a Datadog enviar datos de configuración (como qué recursos de almacenamiento en la nube analizar) a tus escáneres desplegados. Para utilizar el Sensitive Data Scanner en tus entornos de AWS, debes asegurarte de lo siguiente:
- La configuración remota está activada para tu organización de Datadog.
- Estás utilizando claves de la API de Datadog activadas con configuración remota para cuentas de AWS con escáneres desplegados en ellas.

La configuración remota está activada en forma predeterminada en la mayoría de las organizaciones. Para verificarlo, ve a la page (página) de los parámetros de [Configuración remota][4]. Si no está activada:
1. Asegúrate de que tus permisos de RBAC incluyan [`org_management`][7].
1. Desde la [page (página) de configuración][5] Configuración remota, haz clic en **Anable for your Organization** >  **Next Step** (Activar para tu organización > Siguiente step (UI) / paso (generic)).
1. Busca y selecciona las claves de la API que desees utilizar con configuración remota y haz clic en **Enable Keys** (Activar claves). 
1. Haz clic en **Next Step** > **Done** (Siguiente step (UI) / paso (generic) > Hecho). No es necesario configurar componentes de Datadog como el Agent o rastreadores.

**Notas**:
- Solo las cuentas de AWS que tienen escáneres desplegados en ellas necesitan claves de API de Datadog activadas con configuración remota.
- Solo los administradores con permisos de `org_management` pueden activar la configuración remota para tu organización. Una vez activada la configuración remota, solo los usuarios con permiso de `api_keys_write` pueden activar la configuración remota para claves de API individuales.

## Consideraciones de seguridad {#security-considerations}

Dado que las instancias de escáner pueden tener acceso a datos confidenciales, Datadog recomienda restringir el acceso a estas instancias únicamente a los usuarios administrativos.

Para reducir aún más este riesgo, Datadog aplica las siguientes medidas de seguridad:

- El escáner de Datadog funciona dentro de tu infraestructura, lo que garantiza que todos los datos, incluidos los resultados de datos confidenciales, permanezcan aislados y seguros.
- Toda la transmisión de datos entre el analizador y Datadog se cifra mediante protocolos estándar del sector (como HTTPS) para garantizar la confidencialidad e integridad de los datos.
- Datadog revisa y limita cuidadosamente los permisos que necesita el escáner para garantizar que pueda realizar exploraciones sin accesos innecesarios. Esto significa que el escáner opera según el principio de mínimo privilegio y se le conceden solo los permisos mínimos necesarios para desempeñarse eficazmente.
- Las actualizaciones de seguridad no supervisadas están habilitadas en las instancias del analizador de Datadog. Esta función automatiza el proceso de instalación de parches y actualizaciones de seguridad críticos sin necesidad de una intervención manual.
- Las instancias de escáner de Datadog se rotan automáticamente cada 24 horas. Esta rotación garantiza que las instancias de escáner se actualicen continuamente con las últimas imágenes de Ubuntu.
- El acceso a las instancias del escáner está estrictamente controlado mediante el uso de grupos de seguridad. No se permite el acceso entrante al escáner, lo que reduce aún más el riesgo de comprometer la instancia.

Para analizar buckets S3 de Amazon, se requieren los siguientes permisos:

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## Despliegue de escáneres

Los escáneres sin el Agent son instancias de EC2 que se ejecutan en tu entorno. Analizan los buckets S3 en busca de información confidencial.

Existen dos métodos para desplegar escáneres en tu entorno:
- [Despliegue automático mediante CloudFormation](#automatically-deploy-scanners-using-cloudformation)
- [Despliegue manual mediante Terraform](#manually-deploy-scanners-using-terraform)

### Despliegue automático de escáneres mediante CloudFormation {#automatically-deploy-scanners-using-cloudformation}

Al desplegar escáneres sin el Agent mediante CloudFormation, se crea un único escáner por cuenta que analizar todas las regiones de la cuenta. Configuras la región en la que se despliega el escáner.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagrama en que se muestra un escáner en cada cuenta que analiza todas las regiones dentro de la cuenta" style="width:100%;" >}}

Puedes añadir un escáner a una cuenta nueva de AWS o a una cuenta existente de AWS.

{{< tabs >}}
{{% tab "Cuenta nueva de AWS" %}}

1. Ve a la page (página) de parámetros de [Sensitive Data Scanner][1].
1. En la pestaña **Storage** (Almacenamiento), en la sección **Cloud Settings** Parámetros de la nube), haz clic en **Add AWS accounts by following these steps** (Añadir cuentas de AWS siguiendo estos pasos).
1. Deja activado **Automatically using CloudFormation** (Utilizar automáticamente CloudFormation).
1. Selecciona la región de AWS en el menú desplegable.
1. Selecciona una clave de API que ya esté configurada para la configuración remota. Si la clave de API que seleccionas no tiene activada la configuración remota, esta se activará automáticamente para dicha clave al seleccionarla. **Nota**: Solo los usuarios con permisos de `api_keys_write` pueden activar la configuración remota para claves de API individuales.
1. Si deseas enviar logs de AWS a Datadog, deja seleccionado **Yes** (Sí).
1. Selecciona **Yes** (Sí) si deseas utilizar Cloud Security de Datadog.
1. **Activar Sensitive Data Scanner** se selecciona automáticamente de forma predeterminada. Esto le indica a CloudFormation que añada la política AWS Managed SecurityAudit a tu rol de integración de Datadog y AWS y active Agentless Scanning para comenzar a analizar tus almacenes de datos en la nube.
1. Haz clic en **Launch CloudFormation Template** (Lanzar la plantilla de CloudFormation).

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "Cuenta existente de AWS " %}}

1. Ve a la page (página) de parámetros de [Sensitive Data Scanner][1].
1. En la pestaña **Storage** (Almacenamiento), en la sección **AWS**:
    - Si ya tienes activado el análisis sin el Agent en una cuenta:
      1. Haz clic en el icono del lápiz de la cuenta.
      1. Activa **Enable Sensitive Data Scanning** (Activar análisis de datos confidenciales) para añadir el escáner a la cuenta.
      1. Haz clic en **Save** (Guardar).
    - Si no tienes activado el análisis sin el Agent en una cuenta:
      1. Haz clic en el icono más de la cuenta para la que deseas activar el análisis de datos confidenciales.
      1. Selecciona que deseas añadir el escáner con CloudFormation.
      1. Selecciona la región de AWS en el menú desplegable.
      1. Selecciona una clave de API que ya esté configurada para la Configuración remota. Si la clave de API que seleccionas no tiene habilitada la Configuración remota, ésta se habilitará automáticamente para dicha clave al seleccionarla.
      1. Activa **Enable Sensitive Data Scanning** (Activar análisis de datos confidenciales) para añadir el escáner a la cuenta.
      1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation).

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Despliegue manual de escáneres con Terraform {#manually-deploy-scanners-using-terraform}

Puedes desplegar escáneres sin el Agent con el [Módulo de Terraform Escáner sin el Agent de Datadog][7]. Datadog recomienda que seleccione una de estas dos opciones de configuración si despliegas escáneres manualmente:

- Crea una cuenta de AWS dedicada a los escáneres sin el Agent. Despliega un escáner para cada región que tenga recursos en la nube que desees analizar.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagrama en que se muestra un escáner central para una región y el escáner analiza todas las cuentas diferentes" style="width:100%;" >}}

- Despliega un escáner para cada región que tenga recursos en la nube que desees analizar.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="Diagrama en que se muestra un escáner en cada región que analiza cuentas dentro de esa región" style="width:100%;" >}}

## Grupos de análisis

En la page (página) de parámetros de [Almacenamiento en la nube][6], la sección **Grupos de Análisis** (Análisis de grupos) es de solo lectura. Todas las [reglas de la biblioteca][2] se aplican dentro del grupo de análisis.

## Coste del proveedor de servicio en la nube

Cuando se utiliza el anáisis sin el Agent, existen costos adicionales para ejecutar escáneres en tus entornos de la nube.

Para establecer estimaciones sobre los costos del escáner, ponte en contacto con tu [Customer Success Manager de Datadog][8].

## Desactivar Agentless scanning

1. Ve a la page (página) [Sensitive Data Scanner][6].
1. Haz clic en el icono del lápiz situado junto a la cuenta para la que deseas desactivar el análisis sin el Agent.
1. Desactiva **Enable Sensitive Data Scanning** (Activar análisis de datos confidenciales).

## Desinstalar Agentless Scanning

Para desinstalar Agentless Scanning, inicia sesión en tu consola de AWS y elimina el stack tecnológico de CloudFormation creado para Agentless Scanning.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration
[2]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/data-security
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: https://app.datadoghq.com/organization-settings/remote-config/setup
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security
[7]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[8]: mailto:success@datadoghq.com
[9]: /es/account_management/rbac/permissions#access-management