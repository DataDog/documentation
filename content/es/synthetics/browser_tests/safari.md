---
description: Utiliza tests de monitorización Synthetic en tu navegador Safari.
private: true
site_support_id: synthetics_safari
title: Tests del navegador Safari
---

{{< callout url="https://www.datadoghq.com/product-preview/safari-browser-testing/" >}}
Los tests del navegador Safari están actualmente en Vista previa, ¡pero puedes solicitar acceso fácilmente! Utiliza este formulario para enviar tu solicitud hoy mismo. 
{{< /callout >}} 

## Información general

Datadog permite ejecutar tests de monitorización Synthetic en el navegador Safari, además de Chrome, Edge y Firefox.

## Configuración de los tests del navegador Safari

Para ejecutar tests de Safari, crea un nuevo test del navegador de monitorización Synthetic que **sólo** esté programado para ejecutarse en dispositivos Safari.

Utiliza una de las tres opciones siguientes:

* **[Crear un nuevo test del navegador de monitorización Synthetic](#create-a-new-synthetic-monitoring-browser-test)**: Para grabar un nuevo recorrido de usuario desde cero.
* **[Clonar un test del navegador de monitorización Synthetic existente](#clone-an-existing-synthetic-monitoring-browser-test)**: Para iniciar el recorrido del usuario desde un test de navegador existente.
* **[Crear un nuevo test del navegador de monitorización Synthetic, utilizando un test existente como subtest (recomendado)](#create-a-new-synthetic-monitoring-browser-test-using-an-existing-test-as-a-subtest)**: Para basar tu test en el recorrido del usuario de un test existente sin conservar dos recorridos de usuario separados.

## **Crear un nuevo test del navegador de monitorización Synthetic**

1. Crea un **nuevo** [test de navegador][1].
2. En la sección **Configurar la información de tu test** > **Navegadores y dispositivos**, **desmarca TODOS** los navegadores y dispositivos excepto los dispositivos Safari elegidos.

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Captura de pantalla de la creación de un test de navegador, con los dispositivos Safari seleccionados" width="80%" >}}

3. En la sección **Seleccionar localizaciones > Localizaciones Safari privadas**, selecciona la localización llamada **macos-pl Safari Private Beta** creada para ti.

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Captura de pantalla de la creación de un test de navegador, que muestra un menú desplegable con las localizaciones privadas" width="70%" >}}

4. Puedes seguir configurando el test como lo harías con un test de navegador habitual.

## Clonar un test del navegador de monitorización Synthetic existente

1. Crea un **nuevo** test de navegador clonando el test existente elegido.

   {{< img src="synthetics/browser_tests/safari/safari_clone.png" alt="Captura de pantalla de la clonación de un test de navegador existente" width="70%" >}}

2. En la sección **Configurar la información de tu test** > **Navegadores y dispositivos**, **desmarca TODOS** los navegadores y dispositivos excepto los dispositivos Safari elegidos.

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Captura de pantalla de la creación de un test de navegador, con los dispositivos Safari seleccionados" width="80%" >}}

3. En la sección **Seleccionar localizaciones > Localizaciones Safari privadas**, selecciona la localización llamada **macos-pl Safari Private Beta** creada para ti.

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Captura de pantalla de la creación de un test de navegador, que muestra un menú desplegable con las localizaciones privadas" width="70%" >}}

4. Puedes continuar guardando y ejecutando tu nuevo test.

   **Nota** Dado que estás clonando tests, cualquier cambio realizado en el recorrido del usuario del test original no se aplica automáticamente a tu nuevo test de Safari.


## Crea un nuevo test del navegador de monitorización Synthetic utilizando un test existente como subtest.

1. Crea un **nuevo** [test de navegador][1].

2. En la sección **Configurar la información de tu test** > **Navegadores y dispositivos**, **desmarca TODOS** los navegadores y dispositivos excepto los dispositivos Safari elegidos.

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Captura de pantalla de la creación de un test de navegador, con los dispositivos Safari seleccionados" width="80%" >}}

3. En la sección **Seleccionar localizaciones > Localizaciones Safari privadas**, selecciona la localización llamada **macos-pl Safari Private Beta** creada para ti.

  {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Captura de pantalla de la creación de un test de navegador, que muestra un menú desplegable con las localizaciones privadas" width="70%" >}}

4. Haz clic en **Save & Edit Recording** (Guardar y editar grabación), añade el test que hayas elegido como subtest _que se reproduce en la ventana principal_:

   {{< img src="synthetics/browser_tests/safari/safari_subtest.png" alt="Captura de pantalla que muestra cómo se agrega un subtest existente" width="70%" >}} 

   **Nota**: Esto hace referencia al test existente, por lo que cualquier modificación realizada en el recorrido del usuario del test existente se aplica automáticamente a tu nuevo test de Safari.

## FAQ

### ¿Puedo ejecutar un test tanto en navegadores Safari como en navegadores que no son Safari?

**No**. Por el momento, los test de navegadores de monitorización Synthetic sólo pueden ejecutarse en dispositivos Safari **O** en dispositivos que no son Safari.

### ¿Puedo ejecutar tests de Safari desde localizaciones gestionadas?

**No**. Los tests del navegador Safari están limitados a una localización Safari privada exclusiva en tu cuenta. Consulta la [lista de localizaciones de monitorización Synthetic privadas][2].

**Nota**: Una clave de API etiquetada `MANAGED` y llamada `API Key managed by synthetics-platform` ha sido creada y añadida a tu organización para configurar esta localización Safari privada exclusiva. **No revoques esta clave**, ya que es necesaria para habilitar los tests de Safari.

En el contexto de esta Vista Previa, se **espera** que se activen algunos monitores para esta localización privada. Los monitores pueden resolverse ignorando la etiqueta (tag)`synthetics-safari-private-beta:true`.

**No cambies el nombre de esta localización privada** ya que se requiere un nombre específico para habilitar los tests de Safari. Puedes restringir su uso o añadirle etiquetas según sea necesario.

### ¿Existen limitaciones para los tests de Safari?

**Sí**. Las limitaciones específicas del navegador Safari pueden afectar a algunas de las funciones habituales del test del navegador de monitorización Synthetic: 

1. **Localizaciones gestionadas:** Los tests de Safari sólo pueden ejecutarse en una localización privada exclusiva de tu cuenta Datadog.
2. **Ejecutar subtests en una nueva ventana:** Sólo es posible ejecutar subtests en la ventana principal.
3. **Errores y advertencias:** Debido a las limitaciones de Safari, no es posible ver los detalles de los errores en la pestaña **Errores y advertencias**.
4. **Recursos de página:** Es posible que la información `type` de algunos de los recursos de los recursos de página no se muestre correctamente. 
5. **Máxima Concurrencia/Paralelización:** Para la Vista previa, puedes ejecutar hasta dos tests en paralelo mientras otros tests pendientes se ponen en cola.
6. **Archivo de descarga:** Esta función aún no está disponible en la Vista previa de Safari.


[1]: https://app.datadoghq.com/synthetics/browser/create
[2]: https://app.datadoghq.com/synthetics/settings/private-locations?query=macos-pl