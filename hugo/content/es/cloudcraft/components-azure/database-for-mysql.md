---
title: Componente Database for MySQL
---

## Información general

Puedes utilizar el componente Database for MySQL para representar y visualizar bases de datos MySQL desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/database-for-mysql/component-database-for-mysql-diagram.png" alt="Captura de pantalla de un diagrama de Cloudcraft isométrico, que muestra componentes Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona colores para dar énfasis y rellenar el cuerpo del componente en la vista 3D.
- **Opción de despliegue**: Selecciona el tipo de despliegue para tu base de datos.
- **Nivel**: Selecciona el nivel de rendimiento de tu base de datos.
- **Instancia**: Selecciona el tipo de instancia de tu base de datos. Al cambiar el tipo de instancia se modifican los detalles de hardware que aparecen en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Alta disponibilidad**: Selecciona una opción de alta disponibilidad para tu base de datos. Solo está disponible cuando la **opción de despliegue** está configurada como **servidor flexible**.
- **Almacenamiento (GiB)**: Introduce el volumen total de almacenamiento en gibibytes disponible para tu base de datos.

## API

Utiliza [la API Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Database for MySQL:

### Esquema

```json
{
    "type": "azuremysql",
    "id": "db7da7f6-9d1a-46df-808c-6979e02d5182",
    "region": "northcentralus",
    "mapPos": [5,0],
    "deploymentOption": "Single",
    "tier": "GeneralPurpose",
    "instance": "GP_Gen5_2",
    "storageMB": 20480,
    "haEnabled": false,
    "backupRetention": 7,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/mysql",
    "locked": true
}
```

- **type: string**. El tipo de componente. Debe ser una cadena con el valor `azuremysql` para este componente.
- **id: string, uuid**: El identificador único para el componente. La API utiliza un UUID v4 internamente pero acepta cualquier cadena única.
- **resourceId: string**: El identificador único global para el componente dentro de Azure.
- **region: string**: La región Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **mapPos: array**: La posición del componente en el plano. La API utiliza un único par de coordenadas X e Y para expresar el posicionamiento.
- **deploymentOption: string**: El tipo de despliegue para la base de datos. Por defecto es `Single`.
- **tier: string**: El nivel de rendimiento de la base de datos. Por defecto es `GeneralPurpose`.
- **instance: string**: El tipo de instancia para la base de datos. Por defecto es `GP_Gen5_2`.
- **storageMB: string**: El volumen total de almacenamiento en megabytes disponible para la base de datos. Por defecto es `20480`.
- **haEnabled: boolean**: Si está habilitada la alta disponibilidad. Por defecto es `false.`
- **color: object**: El color de relleno para el cuerpo del componente.
  - **isometric: string**: Un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: Un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: El color para dar énfasis al logotipo del componente.
  - **isometric: string**: Un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: Un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: El URI que vincula el componente con otro diagrama o un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **locked: boolean**: Si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/