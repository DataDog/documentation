---
aliases:
- /es/graphing/infrastructure/hostmap/
- /es/infrastructure/containermap/
- /es/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: Documentación
  text: Obtén visibilidad en tiempo real de todos los contenedores de tu entorno
- link: /infrastructure/process/
  tag: Documentación
  text: Comprender lo que sucede en cualquier nivel del sistema
kind: documentación
title: Mapas de hosts y contenedores
---

## Información general

Los mapas de infraestructuras ([mapas de hosts][4] y [mapas de contenedores][5]) te ayudan a visualizar hosts y contenedores en una pantalla, con métricas que se destacan a través de distintos colores y formas.

{{< img src="infrastructure/containermap/containermap.png" alt="Un mapa de contenedores que muestra los contenedores como rectángulos agrupados por zona de disponibilidad de AWS." style="width:80%;">}}

Utiliza el selector desplegable de la parte superior izquierda para cambiar entre hosts y contenedores.

## Instalación

Después de desplegar el [Agent][6], no se necesita ninguna otra configuración. Para recopilar información del contenedor de Docker en la instalación estándar en lugar de con el [Docker Agent][7], el usuario `dd-agent` debe contar con permisos para acceder a `docker.sock`. El permiso se puede otorgar al añadir `dd-agent` al grupo `docker`.

## Uso

### Filtro

Utiliza la casilla de entrada **Filter** (Filtro) para limitar un mapa de infraestructuras a un subconjunto específico de una infraestructura. La barra de entrada de filtro de la parte superior izquierda permite filtrar el mapa de infraestructuras por etiquetas (tags), así como por los atributos que proporciona Datadog.

Si la barra de entrada de filtro está vacía, el mapa muestra todos los hosts/contenedores que informan la métrica seleccionada a Datadog.

Por ejemplo, si etiquetas tus hosts por el entorno en el que se encuentran, puedes filtrar por «producción» para eliminar del mapa los hosts de tu entorno de prueba y otros entornos. Si deseas eliminar todos los roles de host excepto uno en producción, también añade ese rol al filtro; los filtros se combinan con `AND`.

**Nota**: Existe una distinción entre filtrar por `tag:value` y `"tag:value"`. El filtrado por `tag:value` coincide estrictamente con la etiqueta, mientras que el filtrado por `"tag:value"` realiza una búsqueda en ese texto.

### Grupo

Utiliza la casilla de entrada **Group** (Grupo) para organizar de manera espacial tus hosts/contenedores en grupos. Cualquier host/contenedor en un grupo comparte la etiqueta, o etiquetas, por el que se agrupa.  

Por ejemplo, puedes agrupar tus hosts por zona de disponibilidad de AWS. Si añades una segunda etiqueta de agrupación, como tipo de instancia, los hosts se subdividen en grupos: primero por zona de disponibilidad y luego por tipo de instancia, como se muestra a continuación.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Un mapa de hosts donde los hosts (representados por hexágonos) se dividen en dos grupos, por zona de disponibilidad. Dentro de cada grupo de zonas de disponibilidad, los hosts se subdividen por tipo de instancia." >}}

### Relleno y tamaño

De manera predeterminada, el color de cada host se establece para representar el porcentaje de uso de la CPU en ese host/contenedor, donde el color va del verde (0 % utilizado) al naranja (100 % utilizado). Puedes seleccionar diferentes métricas desde el selector **Fill** (Relleno).  

Los mapas de infraestructuras también pueden comunicar una métrica opcional adicional con el tamaño del hexágono o rectángulo. Puedes seleccionar esta métrica en el selector **Size** (Tamaño). 

**Nota**: La métrica de utilización de la CPU utiliza la medida más confiable y actualizada de utilización de la CPU, ya sea que la informe el Datadog Agent o directamente AWS o vSphere.

### Etiquetas (tags)

Puedes aplicar [etiquetas][1] de forma manual o utilizar [integraciones][2] para aplicarlas de manera automática. Luego, puedes utilizar estas etiquetas para filtrar tus hosts o contenedores.

Por ejemplo, si algunos de tus hosts se ejecutan en AWS, se encontrarán disponibles las siguientes etiquetas específicas de AWS:

* `availability-zone`
* `region`
* `image`
* `instance-type`
* `security-group`
* cualquier etiqueta de EC2 que puedas utilizar, como `name`

El Datadog Agent también recopila metadatos del host e información de la aplicación, algunos de los cuales se pueden utilizar como filtro o para agrupar términos. Esos campos incluyen:

- `field:metadata_agent_version`
- `field:metadata_platform`
- `field:metadata_processor`
- `field:metadata_machine`
- `field:apps`

### Ampliar

Cuando hayas identificado un host o contenedor que desees investigar, haz clic en él para obtener más detalles. Se ampliará y mostrará hasta seis integraciones que informan métricas de ese host. Si hay más de seis integraciones, se enumerarán bajo el encabezado **Apps** (Aplicaciones) en el panel de detalles del host, como se muestra en la siguiente captura de pantalla.

Haz clic en el nombre de una integración a fin de obtener un dashboard condensado de métricas para esa integración. En la siguiente captura de pantalla, se hizo clic en «system» (sistema) para obtener métricas del sistema, como el uso de la CPU, el uso de la memoria, la latencia del disco, etc.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Una vista de lo que se muestra cuando un usuario hace clic en un host en particular. Se muestra un panel de información en la parte inferior y se enumeran varias aplicaciones, así como secciones para métricas y checks de estado." style="width:75%;" >}}

### Visualizar hosts en el mapa de hosts que no tienen un Agent instalado

De forma predeterminada, el mapa de hosts solo muestra los hosts que informan la métrica seleccionada, que luego se puede utilizar a fin de establecer un color o tamaño para el hexágono individual dentro de la cuadrícula.

### Actualización y significado de los datos

Los datos del mapa de hosts se actualizan aproximadamente una vez por minuto, a menos que interactúes de manera continua con el mapa. La parte inferior izquierda de la pantalla indica cuándo se actualizaron los datos por última vez.

## Casos de uso

### Optimización de recursos

Si eres usuario de AWS, es posible que utilices varios tipos de instancias. Algunas instancias se encuentran optimizadas para la memoria, otras para la computación, algunas son pequeñas y otras son grandes.

Si deseas reducir tu gasto en AWS, puedes empezar por averiguar para qué se utilizan las costosas instancias. Primero, agrupa por `instance-type` y, a continuación, por `role` o `name`. Echa un vistazo a tus costosos tipos de instancias, como **c3.8xlarge**. ¿Hay roles de host cuya CPU esté infrautilizada? Si es así, amplía los hosts individuales y observa si se ha necesitado toda esa potencia computacional en los últimos meses, o si este grupo de hosts es un candidato para migrar a un tipo de instancia más barato.  

A continuación se muestra un subconjunto de la infraestructura de Datadog. Como puedes ver, las instancias **c3.2xlarge** se encuentran muy cargadas.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="La vista de una cantidad de hosts, representados por hexágonos, que se han agrupado por tipo de instancia: m3.large, c3.2xlarge y m1.xlarge. La mayoría de los hosts en m3.large y m1.xlarge son de color verde para indicar una baja utilización de la CPU, pero los hosts en c3.2xlarge son de color naranja, lo que significa una alta utilización de la CPU." style="width:80%;">}}

Si haces clic en el grupo c3.2xlarge y luego en el subgrupo por rol (como se muestra a continuación), verás que solo algunos de los roles se encuentran cargados, mientras que otros están casi inactivos. Si cambiaras estos siete nodos verdes a un c3.xlarge, ahorrarías casi 13.000 $ al año. (0,21 $ ahorrados por hora por host x 24 horas/día * 365 días/año * 7 hosts = 12.877,20 $/año)

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="El grupo c3.2xlarge que se mostró anteriormente, ahora un subgrupo por rol. Algunos grupos son naranja uniformemente, pero otros son todos verdes." style="width:80%;">}}

### Ubicación de las zonas de disponibilidad

Los mapas de hosts te permiten ver las distribuciones de máquinas en cada una de tus zonas de disponibilidad (AZ). Filtra los hosts que te interesen, agrúpalos por AZ y podrás ver de inmediato si es necesario reequilibrar los recursos.

En el ejemplo que se muestra a continuación, hay una distribución desigual de hosts con `role:daniels` en las zonas de disponibilidad. (Daniels es el nombre de una aplicación interna).

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="Mapa de hosts filtrado por role:daniels y agrupado por zona de disponibilidad. Se muestran tres grupos de hosts." style="width:80%;" >}}

### Investigación del problema

Imagina que tienes un problema en la producción. Es posible que las CPUs de algunos de tus hosts se encuentren vinculadas, lo que genera tiempos de respuesta prolongados. Los mapas de hosts pueden ayudarte a ver rápidamente si hay algo diferente entre los hosts cargados y no cargados. Puedes agrupar de manera rápida por dimensiones que te gustaría investigar y determinar de forma visual si los servidores problemáticos pertenecen a un grupo determinado.  
Por ejemplo, puedes agrupar por AZ, región, tipo de instancia, imagen o cualquier etiqueta que utilices en el sistema. 

En la siguiente captura de pantalla, algunos hosts tienen mucha menos memoria utilizable que otros, a pesar de ser parte del mismo clúster. La agrupación por imagen de máquina revela que había dos imágenes diferentes en uso y una de ellas está sobrecargada.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Mapas de hosts de Datadog con dos bandas de uso de memoria" style="width:80%;" >}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Mapas de hosts de Datadog con dos grupos de imágenes" style="width:80%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/
[2]: /es/integrations/
[3]: /es/infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /es/agent/
[7]: /es/agent/docker/