---
aliases:
- /es/integrations/faq/how-to-import-datadog-resources-into-terraform
- /es/agent/guide/how-to-import-datadog-resources-into-terraform
title: Importación de recursos de Datadog a Terraform
---

## Información general

Terraform admite una forma predeterminada de importar recursos existentes a su estado de terraform a través del comando [`terraform import`][1].
Esto se puede hacer a través de `terraform import <resource_type>.<resource_name> <existing_id>`.

Este enfoque es `state only` y requiere tener ya el recurso HCL completamente definido en sus archivos de configuración terraform. Para importar completamente la configuración, puede utilizar una herramienta como Terraformer.

## Terraformer

El [proyecto terraformer][2] permite importar un recurso como estado y como configuración HCL.

Una vez instalado, puede configurar un directorio de terraform con una `main.tf` básica

Utiliza la sintaxis de terraform 0.13+, pero puedes encontrar más configuraciones en la [documentación oficial del proveedor Datadog][3].

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Configure the Datadog provider
provider "datadog" {}
```

A continuación, ejecuta `terraform init` desde este directorio para extraer el proveedor de terraform Datadog.

Ahora puedes utilizar `terraformer` para empezar a importar recursos. Por ejemplo, para importar dashboard `abc-def-ghi` puedes ejecutar

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

Esto genera una carpeta `generated` que contiene tanto un archivo de estado de terraform como archivos de configuración de terraform HCL que representan el recurso importado.

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf`: el archivo de configuración HCL para el nuevo dashboard importado
* `outputs.tf`: HCL que contiene salidas para utilizar potencialmente en otras configuraciones
* `provider.tf`: una inicialización HCL del proveedor, similar a la de nuestro archivo `main.tf` 
* `terraform.tfstate`: el estado de terraform que representa el dashboard importado

## Otros ejemplos de terraformer en ejecución

Todos los comandos de ejemplo requieren indicadores `--api-key`, `--app-key`, and `--api-url`.

* Importar todos los monitores: `terraformer import datadog --resources=monitor`
* Importar monitor con id 1234: `terraformer import datadog --resources=monitor --filter=monitor=1234`
* Importar monitors con id 1234 y 12345: `terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* Importar todos los monitors y dashboards: `terraformer import datadog --resources=monitor,dashboard`
* Importar monitor con id 1234 y dashboard con id abc-def-ghi: `terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Generación de recursos con Terraform v0.13+

A partir de la versión `0.8.10`, Terraformer genera archivos `tf`/`json` y `tfstate` con Terraform `v0.12.29`. Para garantizar la compatibilidad, ejecuta el comando de actualización `terraform 0.13upgrade .` con Terraform `v0.13.x`. Consulta [documentación oficial de Terraform][4] para la actualización.

##### Actualización de los archivos generados para Terraform v0.13+:

1. Importación de recursos mediante terraformer.

2. Con Terraform `v0.13.x`, `cd` en el directorio de recursos generado y ejecuta `terraform 0.13upgrade .`.

3. Ejecuta `terraform init` para volver a ejecutar el instalador del proveedor.

4. Ejecuta `terraform apply` para aplicar actualizaciones a los archivos de estado de Terraform.

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html