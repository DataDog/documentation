---
title: Historial de versiones
---

## Información general

El historial de versiones permite a los usuarios realizar un seguimiento de los cambios en sus diagramas de arquitectura a lo largo del tiempo, lo que les permite revisar y restaurar iteraciones anteriores de los diagramas. Tanto si gestionas complejas arquitecturas en la nube como si colaboras con un equipo, el historial de versiones proporciona una información muy valiosa sobre la evolución de tu diagrama.

Puedes acceder a la función del historial de versiones haciendo clic en el botón **Version history** (Historial de versiones) situado en la esquina superior derecha de la aplicación Cloudcraft.

{{< img src="cloudcraft/getting-started/version-history/cloudcraft-diagram-aws-infrastructure-version-history.png" alt="Diagrama de Cloudcraft que muestra la infraestructura de AWS con una flecha que resalta el botón del historial de versiones" responsive="true" style="width:100%;">}}

## Trabajar con versiones

El historial de versiones no sólo sirve para revisar trabajos pasados, sino que también es una potente herramienta para gestionar tus diagramas actuales y futuros. Aquí hay algunas acciones clave que puedes realizar:

1. **Restauración de versiones anteriores**: Si necesitas volver a un estado anterior de tu diagrama, puedes hacerlo fácilmente. Simplemente haz clic en el botón **Restore this version** (Restaurar esta versión) en la parte superior derecha de tu pantalla cuando estés observando una versión anterior.
2. **Creación de nuevos planos**: El historial de versiones te permite guardar cualquier versión específica de tu diagrama como un nuevo plano. Esta función es especialmente útil para crear plantillas o conservar estados arquitectónicos específicos para futuras consultas. Para crear un nuevo plano a partir de una versión, haz clic en los tres puntos a la derecha del nombre de la versión y elige **Guardar como nuevo plano**.
3. **Comparación de versiones**: Aunque no es explícita, la posibilidad de ver diferentes versiones permite comparar manualmente cómo ha cambiado tu arquitectura a lo largo del tiempo.

**Nota**: La creación o eliminación manual de versiones de tu historial no está disponible.

### Creación

Las versiones se crean automáticamente a medida que trabajas en tus diagramas. Por defecto, cada versión lleva una marca de tiempo y un nombre con la fecha y la hora de su creación. Sin embargo, para facilitar la consulta, tienes la opción de asignar nombres personalizados a determinadas versiones, lo que resulta especialmente útil para marcar hitos o cambios significativos en tu arquitectura.

Para nombrar una versión:

1. Selecciona la versión que quieres nombrar.
2. Haz clic en los tres puntos situados a la derecha del nombre de la versión.
3. Elige **Nombrar esta versión** en el menú desplegable.

{{< img src="cloudcraft/getting-started/version-history/version-history-interface-cloudcraft.png" alt="Interfaz del historial de versiones con opciones para nombrar o guardar versiones en Cloudcraft." responsive="true" style="width:100%;">}}

Cloudcraft crea nuevas versiones de forma inteligente para equilibrar la granularidad con la eficiencia. Si la versión actual tiene más de 5 minutos, cualquier nueva actualización activará la creación de una nueva versión. Para los cambios realizados dentro de los 5 minutos de la última versión, las actualizaciones se añaden a la versión existente. Esta estrategia garantiza que el historial de versiones siga teniendo sentido sin saturarse de cambios menores.

Vale la pena señalar que, si bien no se puede crear manualmente una nueva versión, una se genera automáticamente cuando se cambia de [snapshot a modo Live][1] en tu diagrama.

### Metadatos

Cada versión del historial incluye metadatos como nombres de usuario y marcas de tiempo.

El nombre del usuario que creó la versión aparece a la derecha del nombre de la versión. Si la última vez fue otro usuario quien editó la versión, también se muestra su nombre, lo que permite definir una clara responsabilidad de los cambios.

{{< img src="cloudcraft/getting-started/version-history/cloudcraft-version-history-user-timestamps.png" alt="Interfaz del historial de versiones con información del usuario y marcas de tiempo" responsive="true" style="width:100%;">}}

En los diagramas Live, aparece un icono de un rayo verde a la izquierda del nombre de la versión, que distingue estas versiones dinámicas de las versiones snapshot.

### Búsqueda

Para ayudarte a navegar a través de tu historial de versiones, Cloudcraft proporciona una funcionalidad de búsqueda. Puedes buscar versiones específicas por nombre o fecha, facilitando la localización de puntos concretos en la línea de tiempo de tu diagrama.

Para buscar una versión, introduce tu consulta de búsqueda en la barra de búsqueda situada en la parte superior del panel del historial de versiones.

Para los usuarios que prefieren centrarse en los cambios significativos, existe la opción de filtrar la vista marcando la casilla **Sólo mostrar versiones con nombre** en la barra de búsqueda, lo que permite ocultar las versiones sin nombre, agilizando la vista del historial de versiones.

### Conservación

Las versiones con nombre se conservan indefinidamente, para mantener un registro permanente de los estados significativos del diagrama.

Las versiones sin nombre están sujetas a un periodo de conservación que varía en función de tu plan:
- Usuarios de los planes Free y Pro: Las versiones sin nombre se conservan durante 30 días.
- Usuarios del plan Enterprise: Las versiones sin nombre se conservan durante 90 días.

Este enfoque escalonado garantiza que los usuarios ocasionales mantengan un historial útil, al tiempo que ofrece una conservación extendida para los clientes empresariales con necesidades más complejas.

## Prácticas recomendadas

Para aprovechar al máximo la función del historial de versiones, ten en cuenta las siguientes prácticas recomendadas:

1. **Nombrar las versiones importantes**: Asigna nombres significativos a las versiones importantes de tus diagramas. Esta práctica garantiza que las etapas esenciales de la evolución de tu arquitectura sean fácilmente identificables y se conserven de forma permanente.
2. **Revisar periódicamente**: Revisa periódicamente tu historial de versiones para seguir la progresión de tu arquitectura. Esto puede aportar información valiosa sobre tus decisiones de diseño a lo largo del tiempo.
3. **Aprovechar las búsquedas**: Utiliza la funcionalidad de búsqueda y el filtro **Sólo mostrar versiones con nombre** para navegar eficientemente a través de tu historial de versiones, especialmente para proyectos con numerosas iteraciones.
4. **Planificar la retención de versiones**: Si tienes un plan Free o Pro, ten en cuenta el periodo de conservación de 30 días para las versiones sin nombre. Nombra las versiones que quieras conservar más allá de este periodo.
5. **Documentación colaborativa**: Cuando trabajes en equipo, utiliza la función de nomenclatura de versiones para documentar quién realizó cambios concretos y por qué. Esto puede servir como una valiosa herramienta de comunicación dentro del equipo.
6. **Utilizar versiones para propuestas**: Antes de realizar cambios significativos en tu arquitectura, crea una versión con nombre. Esto te permite realizar una fácil reversión si los cambios propuestos no se aprueban o implementan.

[1]: /es/cloudcraft/getting-started/live-vs-snapshot-diagrams/