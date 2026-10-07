---
title: Uso de filtros para crear mejores diagramas
---

El número de componentes representados a la vez en diagramas de entornos de gran tamaño puede introducir problemas de rendimiento y legibilidad, lo que hace que la experiencia sea deficiente.

Para evitar estos problemas, Cloudcraft recomienda utilizar la función **Diseño filtrado** para aplicar filtros o excluir servicios al colocar componentes Live.

Construir diagramas más pequeños facilita mucho su gestión. Además, los usuarios tienen más control sobre la forma en que ingieren la información.

<div class="alert alert-info">Si estás utilizando New Live Experience de Cloudcraft, consulta la siguiente documentación: <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crear mejores diagramas: Diagramación y filtrado Live de Cloudcraft</a>.</div>

## Patrones de búsqueda

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Patrones de búsqueda utilizados en Cloudcraft." responsive="true" style="width:100%;">}}

La casilla de búsqueda en la pestaña **Live** te permite introducir patrones que afectan al resultado de tu análisis.

Entre los patrones que admite la aplicación se incluyen:

- Nombre o ID del componente coincidente. Por ejemplo, `i-052g93wu49qed3hxw`.
- Tipo del componente coincidente. Por ejemplo, `type=ec2`.
- Dirección IP del componente coincidente. Por ejemplo, `172.31.42.142`.
- Componentes etiquetados coincidentes. Por ejemplo, `environment=prod` o `environment`.
- Componentes coincidentes dentro de una VPC, un grupo de seguridad o una subred. Por ejemplo, `vpc-088c40abeb9ce0c1d`.

También puedes utilizar operadores:

- AND (`type=ec2 AND env=prod`).
- OR (`type=ec2 OR type=rds`)
- NOT (`NOT platform=linux`)
- (...) (`type=rds AND (env=staging OR env=prod)`).

Combina estas dos funciones y así podrás crear potentes filtros que te permitirán delimitar tu diagrama a una o varias aplicaciones.

## Exclusión de servicios

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="Servicios siendo excluidos de un diagrama de Cloudcraft." responsive="true" style="width:100%;">}}

Los patrones de búsqueda pueden ser excesivos, si sólo quieres excluir unos pocos servicios. Es por ello que Cloudcraft ofrece una forma más sencilla de llevar a cabo esta tarea.

Después de analizar tu cuenta de AWS, haz clic en **Auto Layout** (Diseño automático) en la pestaña **Live** para ver una lista de dos columnas con los servicios de tu entorno AWS.

Puedes trasladar servicios de la columna **Servicios incluidos** a la columna **Servicios excluidos** —o viceversa— haciendo clic en ellos.

## Uso de patrones de búsqueda y aplicación de filtros

Pongamos en práctica algunos de estos conceptos.

Imagina que estás creando un diagrama de arquitectura, pero sólo quieres mostrar instancias EC2 y volúmenes EBS etiquetados con `service=wirecraft`. También quieres ignorar cualquier instancia EC2 en estado "Detenido".

Ya analizaste tu entorno AWS y Cloudcraft muestra una lista de componentes de tu cuenta en tu inventario. ¿Ahora qué?

1. En la pestaña **Live**, escribe el patrón de búsqueda que corresponda a tu consulta en la casilla de búsqueda. En este ejemplo, el patrón es `service=wirecraft AND (type=ec2 running OR type=ebs)`. Observa que el botón **Auto Layout** (Diseño automático) ahora dice **Filtered Layout** (Diseño filtrado).
2.  Haz clic en **Filtered Layout** (Diseño filtrado).
3. Haz clic en **Layout** (Diseño). Los componentes del diagrama coinciden ahora con el patrón del paso 1.

Otras alternativas son:

- Ejecutar la misma consulta en otra región de AWS. Antes de hacer clic en **Layout** (Diseño), selecciona **Include existing components** (Incluir componentes existentes) en el menú desplegable **Opciones**. Al hacerlo, se realizará un diseño filtrado de todos los componentes de la región secundaria que se encuentren actualmente en tu inventario y de todos los componentes que ya estén en el diagrama.
- Combinar el **Diseño filtrado** con la función **Enlace de planos** para dividir grandes entornos en varios diagramas que se vinculan entre sí. También puedes disponer de un diagrama general que ofrezca una visión rápida de toda tu arquitectura de nube sin penalizaciones de rendimiento.

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="Vídeo de 53 segundos que muestra a un usuario de Cloudcraft creando un diagrama filtrado." video="true">}}

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support