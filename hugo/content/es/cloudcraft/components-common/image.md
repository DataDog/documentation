---
title: Componente Imagen
---

## Información general

El componente Imagen es un componente básico pero potente, que está disponible para el diseño de diagramas. Junto con Icono y Bloques, puede utilizarse para representar componentes de nube aún no disponibles, así como para añadir nuevos conjuntos de iconos y stacks tecnológicos de software.

{{< img src="cloudcraft/components-common/image/component-image.png" alt="Captura de pantalla de una representación en 3D del componente Imagen en Cloudcraft" responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Nombre de la imagen**: Nombre de la imagen cargada, con la extensión de archivo. Si haces clic en el nombre de la imagen, podrás cargar una nueva imagen para sustituir la actual.
- **Activar proyección en 3D/2D**: Muestra la imagen en una vista 3D o 2D, cuando el propio diagrama está en la vista en 3D. No está disponible para diagramas en 2D.
- **Activar proyección plana/vertical**: Muestra la imagen plana o vertical en el diagrama. No está disponible cuando la proyección en 2D está activada, o en diagramas en 2D.
- **Escalar**: Aumenta o disminuye el tamaño de una imagen.
- **Girar elemento**: Rota una imagen y cambia su dirección.
- **Elevar**: Eleva el componente de la imagen por encima de otras imágenes.
- **Bajar**: Baja el componente de la imagen por debajo de otras imágenes.

## API

<div class ="alert alert-info">
  <p>Si bien puedes manipular una imagen dentro de un diagrama a través de nuestra API, la imagen en sí debe cargarse a través de la interfaz de usuario de Cloudcraft.</p>
</div>

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Imagen:

```json
{
  "type": "image",
  "id": "53c342f3-3f13-4ba5-bffa-f4e0db874f95",
  "mapPos": [2.25, 9.75],
  "key": "a5a840d9-c1f9-4e19-b67c-6b2bd1bfcdaa/nginx-logo.webp",
  "isometric": true,
  "standing": false,
  "scale": 0.10000000000000014,
  "direction": "down",
  "link": "https://nginx.org/",
  "locked": true
}
```

- **type: image**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **key: string**: Identificador único de la imagen, compuesto por un UUID, un nombre de archivo y una extensión.
- **isometric: boolean**: Si es "true" (verdadero), la imagen se muestra mediante una proyección en 3D, mientras que si es "false" (falso), la imagen se muestra en una proyección en 2D. Por defecto es "true" (verdadero).
- **standing: boolean**: Si es "true" (verdadero), la imagen se muestra en posición vertical, en lugar de plana. Por defecto es "false" (falso).
- **scale: number**: Escala la imagen para aumentar o disminuir su tamaño.
- **direction: string**: Rotación o dirección de la imagen. Acepta `down, up, right, left` como valor, con `down` por defecto.
- **link: uri**: Vincula el componente a otro diagrama en formato `blueprint://ID` o a un sitio web externo en formato `https://LINK`.
- **locked: boolean**: Si es "true" (verdadero), los cambios en el componente realizados a través de la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/