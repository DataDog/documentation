---
title: Agrupar por y preajustes
---

Las funciones **Agrupar por** y **Preajustes** de Cloudcraft permiten a los usuarios crear diagramas personalizados y útiles adaptados a casos de uso específicos, como infraestructura, red o la seguridad. Estas herramientas agilizan la visualización de la arquitectura de la nube, facilitando el análisis y la gestión de los recursos.

Ya sea para solucionar problemas, realizar auditorías de seguridad o evaluar el rendimiento de red, estas funciones mejoran la eficacia del flujo de trabajo al permitir a los usuarios generar diagramas precisos y específicos con facilidad.

## Agrupar por

Con **Agrupar por**, Cloudcraft divide tu diagrama en distintas secciones basadas en diferentes tipos de grupos. Esta característica proporciona una visión clara y organizada de tus recursos, lo que es particularmente útil para visualizar entornos en la nube complejos.

### Opciones de agrupación de AWS

En AWS, puedes agrupar los recursos por:
- Región
- VPC
- Grupo de seguridad
- Subred
- ACL de red

### Opciones de agrupación de Azure

En Azure, puedes agrupar los recursos por:
- Grupo de recursos
- Región
- VNet
- Subred

## Preajustes

Los **Preajustes** ofrecen una forma cómoda de aplicar conjuntos predefinidos de agrupaciones y filtros, lo que te permite ver rápidamente tus recursos desde diferentes perspectivas. Esta función simplifica el proceso de aplicación de agrupaciones y filtros a tus diagramas, para que puedas centrarte en aspectos específicos de tu arquitectura.

**Cloudcraft proporciona tres preajustes integrados:** infraestructura, red y seguridad. Estos preajustes están diseñados para abordar diferentes necesidades operativas.

{{< img src="cloudcraft/getting-started/group-by-presets/diagram-presets.png" alt="La interfaz de Cloudcraft muestra opciones de preajustes con el preajuste de diagrama de infraestructura seleccionado." responsive="true" style="width:100%;">}}

Para aplicar un preajuste a tu diagrama:

1. Cambia a la pestaña **Live** (En vivo) dentro de Cloudcraft.
2. Selecciona el preajuste deseado en el menú situado en la parte superior de la vista de diagrama.
3. El diagrama se actualiza automáticamente para reflejar el preajuste elegido.

### Diagrama de infraestructura

{{< img src="cloudcraft/getting-started/group-by-presets/infrastructure-diagram.png" alt="Diagrama de infraestructura que muestra servidores, bases de datos, componentes de seguridad y la relación entre ellos." responsive="true" style="width:100%;">}}

El preajuste de infraestructura proporciona una visión general, agrupando los recursos por Región y VPC en AWS, y por Región y VNet en Azure. Este preajuste es ideal para generar rápidamente diagramas de arquitectura para solucionar problemas o una revisión general.

- En AWS, excluye componentes como EBS, NAT Gateway y Transit Gateway, entre otros, para ofrecerte un diagrama claro, que te muestre las partes más importantes de tu arquitectura.
- En Azure, no se muestran componentes como Azure VNGW y Azure Disk.

### Diagrama de seguridad

{{< img src="cloudcraft/getting-started/group-by-presets/security-diagram.png" alt="Diagrama de seguridad que muestra servidores, bases de datos, componentes de seguridad y la relación entre ellos." responsive="true" style="width:100%;">}}

El preajuste de seguridad se centra en las posibles exposiciones de seguridad, agrupando los recursos por región, VPC y grupo de seguridad en AWS. Esta vista es esencial para identificar riesgos de seguridad y comprender las reglas que rigen las comunicaciones entrantes y salientes de servicio, y es perfecta para mapear superficies de ataque durante pruebas de penetración o auditorías de seguridad.

- Este preajuste no es compatible actualmente con las configuraciones de Azure.
- En AWS, de forma similar a la infraestructura, se excluyen EBS, NAT Gateway y otros componentes que podrían desordenar la vista de seguridad. Además, un componente puede aparecer varias veces si pertenece a varias subredes.

### Diagrama de red

{{< img src="cloudcraft/getting-started/group-by-presets/network-diagram.png" alt="Diagrama de red que muestra servidores, bases de datos, componentes de seguridad y la relación entre ellos." responsive="true" style="width:100%;">}}

El preajuste red añade detalles al introducir la agrupación por subredes, lo que lo hace especialmente útil para los equipos de red que buscan identificar fuentes de latencia y patrones de tráfico.

- En AWS, excluye componentes como EBS, S3 y SNS.
- En Azure, excluye Azure Disk y los componentes de grupo de seguridad de red.

## Preajustes personalizados

Para los casos de uso que requieren una vista a medida, Cloudcraft te permite personalizar agrupaciones y filtros para crear preajustes personalizados.

1. Ajusta la configuración de filtro y agrupación según tus necesidades.
2. Guarda tu configuración personalizada como un nuevo preajuste haciendo clic en el botón **Save as preset** (Guardar como preajuste).

Una vez guardados, estos preajustes personalizados pueden ser reutilizados por cualquiera que tenga acceso al proyecto.