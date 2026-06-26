---
title: Crear tu primer diagrama de nube en vivo
---

Cloudcraft te permite importar tus entornos en la nube de AWS y Azure como *diagramas en vivo*. Mediante ingeniería inversa de la arquitectura en tu cuenta en la nube, Cloudcraft puede generar automáticamente nuevos diagramas o mejorar los existentes, ahorrándote horas o incluso días de trabajo.

<div class="alert alert-info">Si estás utilizando la nueva experiencia en vivo de Cloudcraft, consulta <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crear mejores diagramas: diagramas y filtrado en vivo en Cloudcraft</a>.</div>

## Requisitos previos

Antes de empezar, conecta tu cuenta en la nube a Cloudcraft.

- Para las cuentas de AWS, consulta [Conectar tu cuenta de AWS con Cloudcraft][1].
- Para cuentas de Azure, consulta [Conectar tu cuenta de Azure con Cloudcraft][2].

## Tu primer diagrama en directo

Para escanear y visualizar tu arquitectura en la nube, crea un nuevo proyecto. Un proyecto contiene tu diagrama, un presupuesto y toda la documentación que adjuntas a los componentes individuales.

1. En Cloudcraft, selecciona la pestaña **AWS** o **Azure**, luego la pestaña **Live** (En vivo). En esta guía, nos centraremos principalmente en las cuentas de AWS. Si tienes una cuenta de Azure, el proceso es similar.

En la pestaña **Live** (En vivo) podrás seleccionar tu cuenta, escanear regiones, generar diseños y ver todos los recursos de tu cuenta.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Un diagrama de infraestructura en vivo en Cloudcraft con las pestañas AWS y en vivo resaltadas." responsive="true" style="width:100%;">}}

Si sólo has añadido una cuenta de AWS a Cloudcraft, se seleccionará automáticamente. En caso contrario, elige una cuenta en el menú desplegable.

2. Selecciona la región en la que deseas realizar el escaneo. Aunque es posible escanear e incorporar varias regiones en un único diagrama, es recomendado empezar con una región.

Debajo del botón **Scan now** (Escanear ahora) hay un conmutador que indica **Live** (En vivo) o **Snapshot**, que indica a la aplicación qué tipo de diagrama quieres crear. Si seleccionas **Live** (En vivo), el diagrama se actualiza continuamente con la información de tu cuenta. Si seleccionas **Snapshot**, se crea una imagen puntual, lo que significa que el diagrama nunca se actualizará automáticamente.

Este ejemplo utiliza la opción **Live** (En vivo). Activa la opción **Live** (En vivo). El icono de engranaje situado a la derecha de la opción ofrece ajustes de personalización adicionales para actualizar tu diagrama. Para los propósitos de esta guía, es recomendado dejarlo en el estado por defecto.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Interfaz interactiva de Cloudcraft con el conmutador establecido en En vivo para el diagrama de recursos en vivo." responsive="true" style="width:100%;">}}

3. Haz clic en **Scan now** (Escanear ahora) para escanear tu cuenta en busca de [componentes compatibles con AWS][3] en tu cuenta. Aparecerá un mensaje de **Scan complete** (Escaneo completo) una vez que el escaneo haya finalizado.

Una vez finalizado el escaneo, debería aparecer el botón **Auto layout** (Diseño automático) y todos los componentes compatibles de tu cuenta de AWS. Puedes empezar a añadirlos manualmente inmediatamente, sin embargo, es recomendado dejar que la aplicación arme el diseño por ti automáticamente.

Puedes lograr esto de dos maneras:

- Mediante la función **Auto layout** (Disposición automática).
- Mediante la función **Filtered layout** (Diseño filtrado).

La función **Auto layout** (Disposición automática) es la más sencilla, ya que añade todos los componentes al diagrama e ilustra sus conexiones y relaciones. Por ejemplo, puedes configurar **Auto layout** (Diseño automático) para mostrar sólo las instancias de EC2 y excluir todos los demás componentes.

El tipo de diagrama para esta documentación es **Live** (En vivo), lo que significa que, si eliminas una instancia de EC2 de tu cuenta de AWS, el cambio se reflejará en tu diagrama.

La función **Filtered Layout** (Disposición filtrada) es una forma más avanzada y potente de diagramar tu arquitectura de nube, ya que te permite crear diagramas que coincidan con un patrón. Por ejemplo, si tienes muchos recursos etiquetados con `environment=production` y `environment=staging`, pero solo quieres que se añadan al diagrama los componentes en producción, puedes filtrar por `environment=production` y solo se incluirán los componentes etiquetados con esta combinación exacta de valor y clave.

El poder de los filtros está disponible incluso si no etiquetas tus recursos en tu proveedor de nube. Por ejemplo, para crear un diagrama con solo instancias de EC2 apagadas, puedes utilizar el filtro `ec2 !running`.

El siguiente vídeo muestra el poder de **Filtered layout** (Diseño filtrado). En AWS, nuestro equipo de ventas etiqueta varios recursos relacionados con una demostración de Cloudcraft con la clave `Environment` y el valor `Demo`. Para ver lo que quieren demostrar y cómo cada componente se conecta entre sí, pueden utilizar el filtro `Environment=demo` en la barra de búsqueda justo debajo de la pestaña **Live** (En vivo).

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example-video.mp4" alt="Un vídeo de 11 segundos que muestra a un usuario creando un diagrama filtrado en Cloudcraft." video="true">}}

Los componentes etiquetados con `Environment=demo` se muestran dentro de sus correspondientes VPCs, subredes y grupos de seguridad, a pesar de que estos recursos no están etiquetados como tales en AWS. El WAF, a pesar de tener etiquetas (tags) idénticas, se posiciona fuera de la VPC porque la API de AWS no indica ningún vínculo entre el WAF y el resto de los componentes.

La forma en que los componentes se conectan entre sí depende de servicio. Cloudcraft utiliza todas las API de nube disponibles para descubrir relaciones siempre que sea posible.

4. Para seguir configurando la función **Auto layout** (Disposición automática), selecciona **Auto layout** (Disposición automática) en la opción **Live/Snapshot** (En directo/Snapshot).

Un nuevo cuadro de diálogo te permite decidir qué componentes de AWS incluir en tu diagrama. El cuadro de diálogo también incluye un menú desplegable **Options** (Opciones) en el que puedes elegir una de las tres opciones posibles:

- Sustituir los componentes existentes.
- Incluir los componentes existentes.
- Dejar los componentes existentes.

Estas opciones indican a la aplicación qué hacer si estás utilizando **Auto layout** (Diseño automático) en un diagrama que ya tiene componentes.

- Si seleccionas **Replace existing components** (Reemplazar componentes existentes), todo lo que ya está en el diagrama será reemplazado por nuevos componentes.
- Si seleccionas **Include existing components** (Incluir componentes existentes), la aplicación realizará un diseño automático de todos los componentes de tu inventario, así como de todos los componentes del diagrama.
- Si seleccionas **Leave existing components** (Dejar componentes existentes), los componentes del diagrama no se modificarán, pero la aplicación realizará un diseño automático para los nuevos componentes.

Como estamos creando un nuevo diagrama, selecciona **Replace existing components** (Reemplazar componentes existentes) en el menú. Selecciona **Layout** (Diseño) para añadir automáticamente todos los componentes de tu inventario al diagrama junto con sus conexiones.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Diagrama interactivo de infraestructura de AWS creado con Cloudcraft que incluye un diseño automático de componentes con conexiones visibles en un fondo de tablero." responsive="true" style="width:100%;">}}

El diagrama es personalizable, lo que te permite mejorar su aspecto utilizando elementos de la pestaña **Layout** (Diseño), todo ello mientras observa datos en tiempo real relativos a cada componente.

Si seleccionas un componente, en la esquina inferior izquierda de la pantalla aparecerá el cuadro de diálogo **Live feed** (Feed en directo), que muestra información en directo sobre el componente seleccionado.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="Diagrama interactivo de infraestructura en la nube con la instancia de EC2 resaltada y el cuadro de diálogo de información del feed en vivo que muestra detalles y el estado de la instancia." responsive="true" style="width:100%;">}}

## Nueva experiencia en vivo

Cloudcraft ha introducido una experiencia en vivo renovada como parte de nuestro compromiso continuo para mejorar la experiencia del usuario y agilizar la proceso de diagramas de la infraestructura en la nube. Esta experiencia actualizada es accesible a todos los usuarios y se ha establecido como la experiencia estándar para los nuevos usuarios.

Consulta [Crear mejores diagramas: diagramas y filtrado en vivo de Cloudcraft][4] para obtener más información.

[1]: /es/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /es/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: /es/cloudcraft/faq/supported-aws-components/
[4]: /es/cloudcraft/getting-started/crafting-better-diagrams/