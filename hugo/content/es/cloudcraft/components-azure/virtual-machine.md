---
title: Componente Máquina virtual
---

## Información general

Puedes utilizar el componente Máquina Virtual para representar y visualizar máquinas virtuales desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/virtual-machine/component-virtual-machine-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Máquina virtual de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona los colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Plataform** (Plataforma): selecciona la plataforma para tu máquina virtual. Las opciones compatibles son Windows y Linux.
- **Tier** (Nivel): selecciona el nivel de servicio para tu máquina virtual.
- **Series** (Serie): selecciona la serie de tu máquina virtual. Esta opción afecta a los tipos de instancia disponibles.
- **Instance** (Instancia): selecciona un tipo de instancia para tu máquina virtual. Al cambiar el tipo de instancia también cambian los detalles de hardware que se muestran en la barra de herramientas para reflejar lo que utiliza el hipervisor.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Máquina virtual:

### Esquema

```json
{
    "type": "azurevm",
    "id": "c46c4a24-e3b5-4830-9217-0276e92ac927",
    "resourceId": "/subscriptions/451da5fc-e712-4a34-b236-3c6992a1c2c0/resourceGroups/VMGROUP1/providers/Microsoft.Compute/virtualMachines/hello",
    "region": "eastus",
    "mapPos": [4.5, 7.5],
    "platform": "linux",
    "tier": "Standard",
    "instance": "B1ms",
    "reservationTerm": "OnDemand",
    "color": {
        "isometric": "#ececed",
        "2d": null
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/virtual-machines/",
    "locked": true
}

```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azurevm` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global para el componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **platform: string*: la plataforma para la máquina virtual. Acepta uno de dos valores, `windows` o `linux`. Por defecto es `linux`.
- **tier: string**: el nivel de servicio para la máquina virtual. Acepta uno de tres valores, `Low Priority`, `Standard` o `Basic`. Por defecto es `Standard`.
- **instance: string**: el tipo de instancia para la máquina virtual. [Consulta Microsoft Learn para obtener más información][2]. Por defecto es `A1 v2`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286c5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes