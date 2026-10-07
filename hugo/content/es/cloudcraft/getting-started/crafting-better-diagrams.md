---
title: 'Crear mejores diagramas: diagramación y filtrado en vivo de Cloudcraft'
---

## Información general

Cloudcraft es una potente herramienta para crear diagramas de tu infraestructura en la nube. Con la función Nueva experiencia en vivo puedes crear diagramas precisos y actualizados de tu infraestructura en la nube.

Filtra los recursos por tipo y etiquetas (tags) para crear diagramas específicos que se centren en los componentes concretos que te interesan. Esto no sólo mejora el rendimiento y la legibilidad del diagrama, sino que también te permite crear visualizaciones más significativas de tu infraestructura.

En esta guía, aprenderás a activar la nueva experiencia en vivo y a utilizarla para crear diagramas informativos adaptados a tus necesidades.

## Requisitos previos

Antes de empezar, debes conectar tu cuenta de AWS o Azure a Cloudcraft. Para obtener más información, consulta:

- [Conectar tu cuenta de AWS con Cloudcraft][1]
- [Conectar tu cuenta de Azure con Cloudcraft][2]

## Habilitar una nueva experiencia en vivo

Para activarlo, activa el interruptor **New Live Experience** (Nueva experiencia en vivo) en la parte superior de la pestaña **Live** (En vivo) en Cloudcraft.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/enable-new-experience.png" alt="Captura de pantalla que resalta el conmutador para activar la función beta Nueva experiencia en vivo en la interfaz de Cloudcraft con una flecha roja que apunta al conmutador." responsive="true" style="width:80%;">}}

Si eres un usuario nuevo, es posible que ya tengas activada por defecto la Nueva experiencia en vivo.

## Seleccionar cuenta y región

Haz clic en el menú desplegable bajo la sección **Account** (Cuenta) y selecciona la cuenta que deseas escanear. Si solo has añadido una cuenta de AWS o Azure a Cloudcraft, se seleccionará automáticamente por ti.

En **Region** (Región), selecciona las regiones que deseas escanear. Por defecto, `Global` y tu región predeterminada están seleccionadas, pero puedes hacer clic en el botón **More** (Más) para seleccionar o buscar regiones adicionales.

Una vez realizada la selección, las regiones se escanean automáticamente y el número de recursos encontrados se muestra junto al nombre de la región. Puedes hacer clic en el botón **Synch** (Sincronizar) situado encima de la sección **Region** (Región) para activar un escaneado manual de todas las regiones seleccionadas.

<div class="alert alert-danger">La selección de muchas regiones puede afectar al rendimiento del proceso de escaneo en vivo.</div>

## Filtrar recursos

Puedes filtrar los recursos por tipo y etiqueta.

Las etiquetas se detectan automáticamente desde tu cuenta de AWS y se muestran en las secciones *Custom tags** (Etiquetas personalizadas), **AWS tags** (Etiquetas de AWS), **Terraform tags** (Etiquetas de Terraform) y **Kubernetes tags** (Etiquetas de Kubernetes).

- **Custom tags** (Etiquetas personalizadas) son etiquetas que has añadido a recursos en AWS o Azure.
- **AWS tags** (Etiquetas de AWS) son etiquetas que AWS añade automáticamente a los recursos.
- **Terraform tags** (Etiquetas de Terraform) son etiquetas que Terraform añade automáticamente a los recursos.
- **Kubernetes tags** (Etiquetas de Kubernetes) son etiquetas que Kubernetes añade automáticamente a los recursos.

Para filtrar los recursos por tipo, haz clic en la sección **Resource** (Recursos) y selecciona el tipo de recurso por el que deseas filtrar. Por defecto, se seleccionan todos los tipos de recursos y se muestran por orden de número de recursos encontrados.

Para filtrar recursos por etiquetas. Haz clic en la sección *Custom tags** (Etiquetas personalizadas), **AWS tags** (Etiquetas de AWS), **Terraform tags** (Etiquetas de Terraform) y **Kubernetes tags** (Etiquetas de Kubernetes) y selecciona las etiquetas por las que deseas filtrar. Por defecto, se seleccionan todas las etiquetas y se ordenan por el número de recursos encontrados, con `Untagged` siempre al final.

<div class="alert alert-info">Céntrate en los tipos de recursos más relevantes y en etiquetas para tu caso de uso específico con el fin de garantizar un rendimiento y una legibilidad óptimos de tu diagrama.</div>

## Casos de uso

### Crear un diagrama que muestre sólo las instancias de EC2 y las bases de datos de RDS

1. Haz clic en la sección **Resources** (Recursos).
2. Deselecciona todos los tipos de recursos y selecciona **EC2** y **RDS**.
3. Haz clic en **Apply layout** (Aplicar diseño) para crear un diagrama que muestre sólo los recursos seleccionados.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources.mp4" alt="Un vídeo de 9 segundos que muestra a un usuario de Cloudcraft seleccionando instancias de EC2 y RDS desde la sección de Recursos." video="true">}}

### Crea un diagrama que muestre las instancias de EC2 y las bases de datos de RDS sin la etiqueta `Environment`.

1. Haz clic en la sección **Resources** (Recursos).
2. Deselecciona todos los tipos de recursos y selecciona **EC2** y **RDS**.
3. Haz clic en la sección **Custom tags** (Etiquetas personalizadas).
4. Haz clic en la etiqueta **Environment** (Entorno), y deja seleccionada sólo la opción `Untagged`.
5. Haz clic en **Apply layout** (Aplicar diseño) para crear un diagrama que muestre sólo los recursos seleccionados sin la etiqueta `Environment`.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources-and-tags.mp4" alt="Un vídeo de 15 segundos que muestra a un usuario de Cloudcraft seleccionando instancias de EC2 y RDS y recursos no etiquetados de las secciones Recursos y Etiquetas personalizadas." video="true">}}

## Comentarios

Nueva experiencia en vivo de Cloudcraft es parte de un esfuerzo continuo para mejorar la experiencia del usuario y hacer que la diagramación en la infraestructura en la nube sea más eficiente y efectiva. Cuéntanos cómo utilizas estas nuevas características y [da tu opinión en este formulario][3].

[1]: https://docs.datadoghq.com/es/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: https://docs.datadoghq.com/es/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: https://docs.google.com/forms/d/e/1FAIpQLSemnd5CJgrS9o-5ZCoZSxi99ATqIg9jpgqtcUZpMBzPJO75Wg/viewform