---
further_reading:
- link: /dashboards/widgets/powerpack
  tag: Documentación
  text: Widget de Powerpack
- link: https://docs.datadoghq.com/getting_started/dashboards/#add-widgets-and-refine-what-they-show
  tag: Documentación
  text: Añadir widgets y redefinir su contenido
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: Blog
  text: Guardar widgets de dashboards en grupos reutilizables con Powerpacks
- link: https://docs.datadoghq.com/dashboards/guide/maintain-relevant-dashboards/
  tag: Guía
  text: Prácticas recomendadas para conservar dashboards relevantes
kind: guía
title: Escalar los conocimientos sobre la creación de gráficos con Powerpacks
---

## Información general

Los Powerpacks son grupos de plantillas de widgets que ayudan a escalar los conocimientos sobre la creación de gráficos en forma de bloques de construcción de dashboards reutilizables. Proporcionan una forma escalable de obtener información sobre el dominio o los estándares específicos de la organización y compartirlos con toda la organización. Gracias a los Powerpacks, los creadores de dashboards pueden incorporar conocimientos sobre todas las áreas tecnológicas a sus sistemas existentes, sin necesidad de formación adicional.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="Página de configuración de un Powerpack en la aplicación Datadog que muestra una sección para configurar valores mediante etiquetas (tags) y atributos, varios gráficos de un ejemplo de Powerpack y un menú a la derecha para buscar otros packs" style="width:100%;" >}}

Los Powerpacks pueden ser preconfigurados (creados por Datadog) o personalizados (creados por un usuario).

- Los Powerpacks preconfigurados proporcionan vistas de patrones comunes de monitorización listas para utilizar, como las métricas de rendimiento o el uso de funciones. A menudo están vinculados a un producto específico o integración (como `RUM Page Views`) y son mantenidos por Datadog.
- Cualquier persona con permisos de escritura en dashboards puede crear Powerpacks personalizados para ayudar a los usuarios a compartir y estandarizar las prácticas recomendadas internas. Las actualizaciones de los Powerpacks personalizados se sincronizan con todas las instancias de Powerpacks, por lo que no es necesario que realices actualizaciones individuales en varios dashboards.

Esta guía aborda las prácticas recomendadas para crear y compartir Powerpacks personalizados.

## ¿En qué casos son útiles los Powerpacks?

A medida que una organización crece, los conocimientos y la propiedad se distribuyen fácilmente entre varios equipos. Los Powerpacks funcionan mejor en organizaciones con:

- Equipos que cuentan con una tecnología específica (por ejemplo, Postgres, Kafka, Node.js) o intereses (como el cumplimiento o la seguridad) en toda la organización.
- Equipos individuales encargados de incorporar estas tecnologías o estos intereses a vistas de pila completa, orientadas al negocio.

Este modelo de propiedad incentiva la estandarización entre tus equipos y proporciona una forma escalable de promover las prácticas recomendadas de la organización para la monitorización de componentes claves de un negocio. Tanto para las métricas operativas, como para los indicadores claves del rendimiento (KPI), la distribución de la propiedad a lo largo de líneas tecnológicas y líneas de equipos garantiza que las partes interesadas claves, como los ingenieros de guardia, los ingenieros de fiabilidad del sitio (SRE) y los ejecutivos, puedan acceder e interpretar vistas relevantes de dashboards en toda la empresa.

## Prácticas recomendadas para crear un Powerpack

Un Powerpack correctamente creado puede acelerar la adopción por parte de una organización de nuevos patrones de monitorización, como la incorporación de la observabilidad de la seguridad a todos los dashboards de los equipos de aplicaciones existentes. Crea un Powerpack claro y autónomo para garantizar que los propietarios de dashboards puedan sacar el máximo partido de tu contenido y para minimizar los problemas o las preguntas. 

### Crear contenidos autoexplicativos

El contenido de un Powerpack debe ser autoexplicativo. Al crear un Powerpack, incluye el contexto que necesitará una persona que visualiza un dashboard para interpretar y entender el paquete, incluso en el contexto de otros grupos del dashboard. Algunas herramientas para lograrlo incluyen:

- Títulos claros y breves para describir lo que muestra un gráfico.
- Widgets con notas con contexto adicional.
- Marcadores horizontales para indicar los umbrales previstos e imprevistos.

Un widget con nota puede ofrecer un contexto útil sobre cómo interpretar un gráfico. Por ejemplo, el Powerpack `RUM Page Views` describe cómo comparar las vistas de páginas de la semana actual con las de la semana anterior. Las notas también pueden enviar a recursos externos, como en el pack `System Resource Utilization`.

{{< img src="dashboards/guide/powerpacks_best_practices/note_widget_example.png" alt="Ejemplo de un Powerpack denominado /checkout Page Views (Vistas de la página de confirmación) que muestra varios gráficos con datos reales de monitorización de usuarios. En la parte superior derecha hay un widget de notas con un mensaje que proporciona información sobre uno de los gráficos" style="width:100%;" >}}

Los marcadores en gráficos, como los marcadores horizontales y las funciones de predicción, pueden proporcionar contexto sobre el significado de un valor. Por ejemplo, el paquete `Hosts Overview` muestra las compensaciones NTP del Agent, donde estas aparecen en un gráfico. Los marcadores horizontales reducen el seguimiento visual por parte del observador al definir claramente los umbrales aceptables en un gráfico.

{{< img src="dashboards/guide/powerpacks_best_practices/horizontal_marker_example.png" alt="Ejemplo de un powerpack denominado hosts overview (Información general sobre hosts) que muestra un gráfico de líneas denominado Current Agent NTP offset (Compensación NTP actual del Agent). El gráfico está coloreado en verde entre los valores -1 y 1. Estos umbrales están marcados como offset -1s (compensación -1s) y offset +1s (compensación +1s), respectivamente. El gráfico está coloreado en amarillo entre los valores 1 y 3, y también entre los valores -1 y -3. Estos umbrales están marcados como -3s (compensación -3s) y offset +3s (compensación +3s), respectivamente. El gráfico está coloreado en rojo más allá de los valores +3 y -3." style="width:100%;" >}}

### Volver más visibles los Powerpacks

Los Powerpacks aparecen en la bandeja de widgets del dashboard y puedes encontrarlos mediante búsquedas por palabra clave o etiqueta. El título, la descripción y las etiquetas del Powerpack son campos que se pueden buscar y además ayudan al usuario a encontrar tu Powerpack más fácilmente.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_keyword_search.png" alt="Ejemplo de una búsqueda en el menú Add Widgets (Añadir widgets) de un dashboard, utilizando una palabra clave como recurso para la búsqueda" style="width:60%;" >}}

Para asegurarte de que sólo los usuarios adecuados encuentren tu Powerpack, incluye palabras clave que tus usuarios pueden buscar (como "rendimiento") en el título o la descripción y etiqueta las tecnologías clave.

Las descripciones están limitadas a 80 caracteres. Una buena descripción proporciona un breve resumen sobre los usos de un paquete y cómo puede utilizarse. Por ejemplo, la sección "View usage patterns for a UI action on a specific app page" (Ver patrones de uso para una acción de interfaz de usuario en una página de aplicación específica) para `RUM Feature Usage` describe qué rastrea el Powerpack y qué espera como entrada (una página de aplicación específica), e incluye palabras clave como "usage" (uso), "UI" (interfaz de usuario) y "app" (aplicación).

#### Etiquetado de Powerpacks

Utiliza etiquetas para especificar tecnologías clave o buscar frases en un paquete específico (por ejemplo, `aws`, `k8s`, `app`). Utiliza cadenas simples para describir el contenido de los paquetes y evita introducir directamente pares `key:value` en el campo de etiquetado. Las etiquetas tienen un límite de 80 caracteres.

Para buscar Powerpacks mediante etiquetas en la bandeja de widgets, utiliza la sintaxis `tag:search_string`.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_tag_search.png" alt="Ejemplo de una búsqueda en el menú Add widgets (Añadir widgets) de un dashboard con tag:security (etiqueta:seguridad)" style="width:60%;" >}}

### Volver más personalizables los Powerpacks

Los Powerpacks son más útiles cuando cada equipo puede personalizados según su contexto relevante. Configura las variables de configuración para permitirlo.

El modal de creación de Powerpacks te sugiere variables para añadir a tu pack, basándose en filtros comunes que aparecen en las consultas. Pasa el cursor sobre cualquier variable sugerida para ver a qué gráficos afecta. Para añadir una variable no sugerida, modifica tus gráficos directamente en el dashboard, para utilizar la variable deseada como filtro o como variable de plantilla.

Modifica los nombres de las variables para aclarar cómo deben utilizarlas las demás personas. En el ejemplo siguiente, `@appsec.type` pasa a llamarse `AttackType` para aclarar la entrada esperada. 

{{< img src="dashboards/guide/powerpacks_best_practices/create_powerpack.png" alt="Página Create Powerpack (Crear un Powerpack). A la izquierda, se muestran el Powerpack Title (Título del Powerpack) y el Group Title (Título del grupo), ambos introducidos como Application Security Overview (Información general de seguridad de la aplicación), la sección Add Tags (Añadir etiquetas), configurada con la seguridad y la aplicación, y diferentes variables configuradas en la sección Add Variables (Añadir variables), incluyendo el atributo @appsec.type, que muestra AttackType como su nombre. Debajo, se encuentra la sección Add Common Filters as Variables (Añadir filtros comunes como variables), que muestra diferentes variables, y el filtro @appsec.category:attack_attempt resaltado. A la derecha hay varios gráficos y tres de ellos están resaltados con el mismo color que el filtro @appsec.category:attack_attempt, a la izquierda" style="width:100%;" >}}

Las variables de configuración sirven para dos propósitos. Pueden:
1. Ayudar a un equipo a adaptar un Powerpack a su contexto una sola vez, antes de que el pack se añada a su dashboard (por ejemplo, seleccionando un `service` para asegurarse de que un Powerpack de seguridad es relevante para el servicio correcto).
2. Permitir a los usuarios filtrar un Powerpack después de añadirlo a un dashboard (por ejemplo, visualizando señales de seguridad de un Powerpack en entornos de  `prod` y también de`staging`).

Cada usuario de Powerpack decide si desea guardar una variable en su dashboard para permitir el filtrado dinámico. En el siguiente ejemplo, el usuario puede cambiar el valor de `$Environment` en su dashboard, a través de una variable de plantilla, pero `$Service` siempre se configura en `agent`.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_variables.png" alt="Pantalla que muestra la opción para configurar valores mediante etiquetas o variables de atributos, con una columna para Tag or Attribute (Etiqueta o Atributo), Name (Nombre), Value (Valor) y Use as Template Variable (Utilizar como variable de plantilla), que muestra una casilla de verificación que ofrece la opción para añadirlos al dashboard. Esta casilla de verificación está seleccionada para $Environment, pero no lo está para $Service." style="width:100%;" >}}

### Actualización de un Powerpack

Los cambios realizados en un Powerpack personalizado existente se reflejan en todas las instancias del mismo Powerpack. Esto puede simplificar el proceso de actualización del contenido duplicado en varios dashboards. Haz clic en **Edit Powerpack Layout** (Editar el diseño del Powerpack) para editar instancias sincronizadas del Powerpack.

### Permisos
Por defecto, los permisos de edición de Powerpacks están restringidos al autor. El permiso de edición puede modificarse en cualquier momento a través del menú de los tres puntos verticales en la bandeja de widgets o en el encabezado de una instancia de Powerpack.

### Correr la voz

Una vez que hayas creado tu Powerpack, comunícaselo a tu organización. La comunicación sobre el paquete sirve tanto para darlo a conocer, como para proporcionar un canal para cualquier pregunta. Comparte el nombre de tu Powerpack con tu organización, a través de canales de comunicación como el correo electrónico o las plataformas de mensajería, aclara a quién va dirigido y describe dónde esperas que aparezca. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}