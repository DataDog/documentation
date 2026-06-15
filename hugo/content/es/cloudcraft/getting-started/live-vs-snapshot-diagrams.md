---
title: Diagramas en vivo frente a snapshot
---

## Información general

Cloudcraft ofrece dos tipos de diagramas para visualizar tu infraestructura en la nube: en vivo y snapshot. Este documento explica las diferencias clave entre estos tipos de diagramas y cómo utilizarlos eficazmente.

## Diagramas en vivo

Los diagramas en vivo proporcionan una representación en tiempo real de tu infraestructura de AWS o Azure. Entre sus principales características se incluyen:

- **Actualizaciones automáticas**: el diagrama refleja los cambios en tu infraestructura cuando accedes a él.
- **Precisión en tiempo real**: garantiza que tu diagrama represente siempre el estado actual de tu infraestructura en la nube.
- **Filtrado en directo**: permite centrarse en componentes específicos o en servicios aplicando filtros.

## Diagramas de snapshot

Los diagramas de snapshot ofrecen una vista estática de tu infraestructura que puedes modificar para adaptarla a tus necesidades visuales. Entre las características importantes se incluyen:

- **Diseño editable**: permite mover componentes y ajustar el diseño del diagrama.
- **Adiciones personalizadas**: puedes añadir componentes desde la pestaña de diseño.
- **Representación estática**: el diagrama no se actualiza automáticamente para reflejar los cambios de infraestructura.

## Principales diferencias

### Mecanismo de actualización

- **Diagramas en vivo**: se actualizan automáticamente cuando se accede a ellos, reflejando cualquier cambio en tu infraestructura de AWS o Azure.
- **Diagramas de snapshot**: permanecen estáticos y no se actualizan automáticamente.

### Funciones de edición

- **Diagramas en vivo**: opciones de edición limitadas, como filtrar y agrupar componentes.
- **Diagramas de snapshot**: permitir la edición completa de la disposición y el diseño.

### Transición entre tipos de diagramas

- **De en vivo a snapshot**: cualquier modificación de un diagrama en vivo (por ejemplo, mover un componente o añadir uno nuevo) lo cambia automáticamente al modo snapshot.
- **De snapshot a en vivo**: volver al modo en vivo descarta todos los cambios realizados en el modo snapshot.

## Utilización de los diagramas en vivo y snapshot

1. Comienza con un diagrama en vivo para obtener una visión precisa y actual de tu infraestructura. Consulta [Crear mejores diagramas: diagramas en vivo y filtrado de Cloudcraft][1] para obtener más información.
2. Realiza cambios en la disposición, el diseño o los componentes, lo que cambia automáticamente el diagrama al modo snapshot.
3. En el modo snapshot, ajusta libremente la disposición y el diseño según tus necesidades.
4. Para actualizar el diagrama con los últimos cambios de infraestructura, vuelve al modo en vivo seleccionando el desplegable de modo situado en la esquina superior derecha del diagrama. Sin embargo, ten en cuenta que esta acción elimina todas las modificaciones realizadas en el modo snapshot.
5. Cada vez que cambias de snapshot a modo en vivo, Cloudcraft crea una nueva versión en el sistema de control de versiones, permitiéndote volver a versiones anteriores si es necesario.

{{< img src="cloudcraft/getting-started/live-vs-snapshot-diagrams/mode-dropdown.png" alt="Captura de pantalla del menú desplegable Selección de modo de diagrama de Cloudcraft que muestra los modos en vivo y snapshot." responsive="true" style="width:100%;">}}

Si conoces las diferencias entre los diagramas en vivo y snapshot, podrás visualizar y gestionar eficazmente tu infraestructura en la nube en Cloudcraft.

[1]: /es/cloudcraft/getting-started/crafting-better-diagrams/