---
aliases:
- /es/synthetics/faq/clone-test/
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Más información sobre Synthetic Monitorig
title: Clonar tests de Synthetics
---

## Información general

Para clonar un test de Synthetics, utiliza la interfaz de usuario o los endpoints de API.

## En la interfaz de usuario

1. En un test de Synthetics, haz clic en el icono de la rueda dentada situado a la derecha.  
2. Haz clic en la opción **Clone** (Clonar) del menú desplegable.

{{< img src="synthetics/faq/clone-test.mp4" alt="Clonación de tests de Synthetics" video="true" width="90%" >}}

## En la API

1. Recupera la configuración del test con el endpoint correspondiente. Consulta los artículos sobre cómo [obtener un test de API][1] o un [test de navegador][2].
2. Haz los cambios necesarios (por ejemplo, modificar la URL o las etiquetas).
3. Envía la nueva configuración del test con el endpoint pertinente. Consulta los artículos sobre cómo [crear un test de API][3] o un [test de navegador][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/synthetics/#get-an-api-test
[2]: /es/api/latest/synthetics/#get-a-browser-test
[3]: /es/api/latest/synthetics/#create-an-api-test
[4]: /es/api/latest/synthetics/#create-a-browser-test