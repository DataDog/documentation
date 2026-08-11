---
aliases:
- /es/sensitive_data_scanner/setup/cloud_storage
description: Implemente los escáneres Agentless de Datadog para analizar los buckets
  de Amazon S3 en busca de datos confidenciales con Sensitive Data Scanner. Cubre
  la configuración de Remote Configuration y la implementación mediante CloudFormation
  o Terraform.
disable_toc: false
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Escaneo Agentless de Cloud Security
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentación
  text: Obtenga más información sobre las reglas de biblioteca predefinidas
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Obtenga más información sobre la creación de reglas personalizadas
title: Configuración de Sensitive Data Scanner para Cloud Storage
---
{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">El escaneo de Cloud Storage no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

## Descripción general {#overview}

Implemente los escáneres Agentless de Datadog en su entorno para buscar información confidencial en sus recursos de almacenamiento en la nube. Los escáneres Agentless son instancias de EC2 que usted controla y ejecuta dentro de su entorno. Los escáneres utilizan [Remote Configuration][1] para recuperar una lista de buckets de S3, así como sus dependencias. Analizan muchos tipos de archivos de texto, como CSV y JSON, en sus buckets de S3.

Cuando un escáner Agentless encuentra una coincidencia con cualquiera de las [reglas de la biblioteca de SDS][2], la instancia de escaneo envía el tipo de regla y la ubicación de la coincidencia a Datadog. **Nota**: Los recursos de almacenamiento en la nube y sus archivos solo se leen en su entorno; no se envían a Datadog datos confidenciales que hayan sido analizados.

En la [página de hallazgos][3] de Sensitive Data Scanner, puede ver qué recursos de almacenamiento en la nube se han analizado y las coincidencias encontradas, incluidas las reglas que coincidieron con ellos.

Este documento lo guía a través de:
- [Habilitación de Remote Configuration](#enable-remote-configuration) para usar Sensitive Data Scanner para Cloud Storage
- [Consideraciones de seguridad](#security-considerations) a tener en cuenta al usar Sensitive Data Scanner para Cloud Storage
- Implementación de escáneres en su entorno mediante [CloudFormation](#automatically-deploy-scanners-using-cloudformation) o [Terraform](#manually-deploy-scanners-using-terraform)

## Habilitar Remote Configuration {#enable-remote-configuration}

Remote Configuration permite que Datadog envíe datos de configuración (como qué recursos de almacenamiento en la nube escanear) a sus escáneres implementados. Para usar Sensitive Data Scanner en sus entornos de AWS, debe asegurarse de que:
- Remote Configuration esté habilitado para su organización de Datadog.
- Esté usando claves de API de Datadog habilitadas para Remote Configuration para las cuentas de AWS que tienen escáneres implementados.

Remote Configuration está habilitado de forma predeterminada en la mayoría de las organizaciones. Para verificar esto, navegue a la página de configuración de [Remote Configuration][4]. Si no está habilitado:
1. Asegúrese de que sus permisos de RBAC incluyan [`org_management`][7].
1. Desde la [página de configuración][5] de Remote Configuration, haga clic en {{< ui >}}Enable for your Organization{{< /ui >}} > {{< ui >}}Next Step{{< /ui >}}.
1. Busque y seleccione las claves de API que desea usar con Remote Configuration y haga clic en {{< ui >}}Enable Keys{{< /ui >}}. 
1. Haga clic en {{< ui >}}Next Step{{< /ui >}} > {{< ui >}}Done{{< /ui >}}. No necesita configurar componentes de Datadog como el Agent o los tracers.

**Notas**:
- Solo las cuentas de AWS que tienen escáneres implementados necesitan claves de API de Datadog habilitadas para Remote Configuration.
- Solo los administradores con permisos de `org_management` pueden habilitar Remote Configuration para su organización. Después de habilitar Remote Configuration, solo los usuarios con permiso de `api_keys_write` pueden habilitar Remote Configuration para claves de API individuales.

## Consideraciones de seguridad {#security-considerations}

Debido a que las instancias de escáner tienen acceso potencial a datos confidenciales, Datadog recomienda restringir el acceso a estas instancias únicamente a usuarios administrativos.

Para mitigar aún más este riesgo, Datadog implementa las siguientes medidas de seguridad:

- El escáner de Datadog opera dentro de su infraestructura, asegurando que todos los datos, incluidos los resultados de datos confidenciales, permanezcan aislados y seguros.
- Toda transmisión de datos entre el escáner y Datadog se cifra utilizando protocolos estándar de la industria (como HTTPS) para garantizar la confidencialidad e integridad de los datos.
- Datadog revisa y limita cuidadosamente los permisos necesarios para que el escáner pueda realizar escaneos sin acceso innecesario. Esto significa que el escáner opera bajo el principio de menor privilegio y solo se le otorgan los permisos mínimos necesarios para funcionar de manera efectiva.
- Las actualizaciones de seguridad desatendidas están habilitadas en las instancias del escáner de Datadog. Esta función automatiza el proceso de instalación de parches y actualizaciones de seguridad críticos sin requerir intervención manual.
- Las instancias del escáner de Datadog se rotan automáticamente cada 24 horas. Esta rotación asegura que las instancias del escáner se actualicen continuamente con las imágenes de Ubuntu más recientes.
- El acceso a las instancias del escáner está estrictamente controlado mediante el uso de grupos de seguridad. No se permite el acceso entrante al escáner, lo que reduce aún más el riesgo de comprometer la instancia.

Para escanear buckets de Amazon S3, se requieren estos permisos:

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## Implementar escáneres {#deploy-scanners}

Los escáneres Agentless son instancias de EC2 que se ejecutan en su entorno. Estos escanean sus buckets de S3 en busca de información confidencial.

Existen dos métodos para implementar escáneres en su entorno:
- [Implementar automáticamente usando CloudFormation](#automatically-deploy-scanners-using-cloudformation)
- [Implementar manualmente usando Terraform](#manually-deploy-scanners-using-terraform)

### Implementar escáneres automáticamente usando CloudFormation {#automatically-deploy-scanners-using-cloudformation}

Cuando implementa escáneres Agentless usando CloudFormation, se crea un único escáner por cuenta y escanea todas las regiones de la cuenta. Usted establece la región en la que se implementa el escáner.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagrama que muestra un escáner en cada cuenta escaneando a través de las regiones dentro de esa cuenta" style="width:100%;" >}}

Puede agregar un escáner a una cuenta de AWS nueva o a una cuenta de AWS existente.

{{< tabs >}}
{{% tab "Nueva cuenta de AWS" %}}

1. Navegue a la página de configuración de [Sensitive Data Scanner][1].
1. En la pestaña {{< ui >}}Storage{{< /ui >}}, en la sección {{< ui >}}Cloud Settings{{< /ui >}}, haga clic en {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}.
1. Deje {{< ui >}}Automatically using CloudFormation{{< /ui >}} habilitado.
1. Seleccione la región de AWS en el menú desplegable.
1. Seleccione una clave de API que ya esté configurada para Remote Configuration. Si la clave de API que selecciona no tiene habilitada Remote Configuration, esta se habilitará automáticamente para esa clave al seleccionarla. **Nota**: Solo los usuarios con permisos de `api_keys_write` pueden habilitar Remote Configuration para claves de API individuales.
1. Si desea enviar registros de AWS a Datadog, deje {{< ui >}}Yes{{< /ui >}} seleccionado.
1. Seleccione {{< ui >}}Yes{{< /ui >}} si desea utilizar Datadog Cloud Security.
1. {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}} se selecciona automáticamente de forma predeterminada. Esto le indica a CloudFormation que agregue la política AWS Managed SecurityAudit a su rol de integración de Datadog AWS y habilite el escaneo Agentless para comenzar a escanear sus almacenes de datos en la nube.
1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "Cuenta de AWS existente" %}}

1. Navegue a la página de configuración de [Sensitive Data Scanner][1].
1. En la pestaña {{< ui >}}Storage{{< /ui >}}, en la sección {{< ui >}}AWS{{< /ui >}}:
    - Si ya tiene habilitado el Agentless scanning en una cuenta:
      1. Haga clic en el icono de lápiz de la cuenta.
      1. Active {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} para agregar el escáner a la cuenta.
      1. Haga clic en {{< ui >}}Save{{< /ui >}}.
    - Si no tiene habilitado el Agentless scanning en una cuenta:
      1. Haga clic en el icono de más para la cuenta en la que desea habilitar el escaneo de datos confidenciales.
      1. Seleccione que desea agregar el escáner mediante CloudFormation.
      1. Seleccione la región de AWS en el menú desplegable.
      1. Seleccione una clave de API que ya esté configurada para Remote Configuration. Si la clave de API que selecciona no tiene habilitada Remote Configuration, esta se habilitará automáticamente para esa clave al seleccionarla.
      1. Active {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} para agregar el escáner a la cuenta.
      1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Implemente escáneres manualmente usando Terraform {#manually-deploy-scanners-using-terraform}

Puede implementar escáneres Agentless usando el [Terraform Module Datadog Agentless Scanner][7]. Datadog recomienda que elija una de estas dos opciones de configuración si implementa escáneres manualmente:

- Cree una cuenta de AWS dedicada a los escáneres Agentless. Implemente un escáner para cada región que tenga recursos en la nube que desee escanear.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagrama que muestra un escáner central para una región y el escáner escaneando a través de diferentes cuentas" style="width:100%;" >}}

- Implemente un escáner para cada región que tenga recursos en la nube que desee escanear.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="Diagrama que muestra un escáner en cada región que escanea cuentas dentro de esa región" style="width:100%;" >}}

## Grupos de escaneo {#scanning-groups}

En la página de configuración de [Cloud Storage][6], la sección {{< ui >}}Scanning Groups{{< /ui >}} es de solo lectura. Todas las [reglas de biblioteca][2] se aplican dentro del grupo de escaneo.

## Costo del proveedor de servicios en la nube {#cloud-service-provider-cost}

Al utilizar Agentless Scanning, existen costos adicionales por ejecutar escáneres en sus entornos de nube.

Para establecer estimaciones sobre los costos del escáner, comuníquese con su [Datadog Customer Success Manager][8].

## Deshabilitar Agentless Scanning {#disable-agentless-scanning}

1. Navegue a la página de configuración de [Sensitive Data Scanner][6].
1. Haga clic en el icono de lápiz junto a la cuenta para la que desea deshabilitar Agentless Scanning.
1. Cambie {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} a desactivado.

## Desinstalar Agentless Scanning {#uninstall-agentless-scanning}

Para desinstalar Agentless Scanning, inicie sesión en su consola de AWS y elimine la pila de CloudFormation creada para Agentless Scanning.

## Lecturas adicionales {#further-reading}

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