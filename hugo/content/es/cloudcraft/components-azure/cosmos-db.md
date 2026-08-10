---
title: Componente Cosmos DB
---

## Información general

Puedes utilizar el componente Cosmos DB para representar y visualizar bases de datos serverless desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/cosmos-db/component-cosmos-db-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona los colores de realce y de relleno para el cuerpo del componente en la vista 3D.
- **API**: Selecciona la API de tu base de datos.
- **Modo de capacidad**: Selecciona el modo de capacidad para las operaciones de tu base de datos. No está disponible para PostgreSQL.
- **Modo de replicación**: Selecciona el modo de replicación de tu base de datos. No está disponible para PostgreSQL.
- **Unidades de solicitud**: Introduce el número de unidades de solicitudes por segundo. No está disponible para PostgreSQL.
- **Almacenamiento (GiB)**: Introduce el volumen total de almacenamiento transaccional para tu base de datos en gibibytes. No está disponible para PostgreSQL.
- **Número de nodos**: Selecciona el número de nodos de workers disponibles para tu carga de trabajo. Solo está disponible para PostgreSQL.
- **vCores de nodo**: Selecciona el número de núcleos virtuales disponibles para cada nodo. Sólo está disponible para PostgreSQL.
- **Almacenamiento de nodo**: Selecciona la cantidad de almacenamiento disponible para cada nodo. Sólo está disponible para PostgreSQL.
- **HA**: Elige si la base de datos se ejecuta en modo de alta disponibilidad. Sólo está disponible para PostgreSQL.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Cosmos DB:

### Esquema

```json
{
    "type": "azurecosmosdb",
    "id": "c7fcbf73-87b1-48fd-886b-1ccdd38e0076",
    "region": "centralus",
    "mapPos": [-5,11],
    "api": "sql",
    "capacityMode": "provisioned",
    "replicationMode": "standard",
    "requestUnits": 400,
    "storageGb": 1,
    "postgresqlNodes": 1,
    "postgresqlCoordinatorCores": 4,
    "postgresqlCoordinatorStorage": 512,
    "postgresqlWorkerCores": 2,
    "postgresqlWorkerStorage": 128,
    "postgresqlHighAvailability": false,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cosmos-db/",
    "locked": true
}

```

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `azurecosmosdb` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: Identificador único global para el componente dentro de Azure.
- **region: string**. Región Azure del componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: Posición del componente en el plano. La API utiliza un par de coordenadas X e Y único para expresar la posición.
- **api: string**: API de la base de datos. [Para obtener más información, consulta la documentación de Cosmos DB de Azure][2]. Por defecto es `sql`.
- **capacityMode: string**: Modo de capacidad de las operaciones de bases de datos. Acepta uno de los siguientes valores, `provisioned` o `serverless`. Por defecto es `provisioned`.
- **replicationMode: string**: Modo de replicación de la base de datos. Acepta uno de tres valores, `standard`, `with-zones` y `multi-master`. Por defecto es `standard`.
- **requestUnits: number**: Número de unidades de solicitudes por segundo. Por defecto es `400`.
- **storageGb: string**: Volumen total de almacenamiento transaccional para la base de datos en gibibytes. Por defecto es `1`.
- **postgresqlNodes: number**: Número de nodos de worker disponibles para la carga de trabajo. Por defecto es `1`.
- **postgresqlCoordinatorCores: number**: Número de núcleos virtuales disponibles para el coordinador. Por defecto es `4`.
- **postgresqlCoordinatorStorage: number**: Cantidad de almacenamiento disponible para el coordinador. Por defecto es `512`.
- **postgreesqlWorkerCores: number**: Número de núcleos virtuales disponibles para cada nodo. Por defecto es `2`.
- **postgreesqlWorkerStorage: number**: Cantidad de almacenamiento disponible para cada nodo. Por defecto es `128`.
- **postgresqlHighAvailability: boolean**: Si la base de datos se ejecuta o no en modo de alta disponibilidad. Por defecto es `false`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/azure/cosmos-db/