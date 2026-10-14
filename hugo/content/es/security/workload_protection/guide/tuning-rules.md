---
aliases:
- /es/security_platform/cloud_workload_security/guide/tuning-rules/
- /es/security_platform/cloud_security_management/guide/
- /es/security/cloud_security_management/guide/tuning-rules
description: Prácticas recomendadas para crear supresiones de señales que reduzcan
  el ruido de Workload Protection sin perder la cobertura de detección.
title: Mejores prácticas para ajustar las señales de seguridad de Workload Protection
---
Workload Protection monitorea la actividad sospechosa que ocurre a nivel de carga de trabajo. Sin embargo, en algunos casos, las actividades benignas se marcan como maliciosas debido a configuraciones particulares en el entorno del usuario. Cuando una actividad benigna esperada activa una señal, puede suprimir el disparador de la actividad para limitar el ruido.

Esta guía proporciona consideraciones sobre las prácticas recomendadas y los pasos para refinar la supresión de señales.

## Estrategia de supresión{#suppression-strategy}

Antes de suprimir patrones benignos, identifique las características comunes en las señales según el tipo de actividad de detección. Cuanto más específicas sean las combinaciones de atributos, más precisa será la supresión.

Desde una perspectiva de gestión de riesgos, suprimir basándose en menos atributos aumenta la posibilidad de ignorar actividades maliciosas reales. Para refinar las supresiones de manera efectiva y sin perder la cobertura de ningún comportamiento malicioso, considere la siguiente lista de atributos clave comunes, categorizados por tipos de actividad:

### Actividad de proceso{#process-activity}

Claves comunes:
- `@process.args`
- `@process.executable.name`
- `@process.group`
- `@process.args`
- `@process.envs`
- `@process.parent.comm`
- `@process.parent.args`
- `@process.parent.executable.path`
- `@process.executable.user`
- `@process.ancestors.executable.user`
- `@process.ancestors.executable.path`
- `@process.ancestors.executable.envs`

Para determinar si un proceso es legítimo, revise su proceso padre en el árbol de procesos. El árbol de ascendencia de procesos rastrea un proceso hasta su origen, proporcionando contexto para su flujo de ejecución. Esto ayuda a comprender la secuencia de eventos que conducen al proceso actual.

Por lo general, es suficiente suprimir basándose tanto en el proceso padre como en atributos de proceso no deseados.

Ejemplo de combinación:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

Al suprimir durante un marco de tiempo amplio, evite los procesos que tengan argumentos con valores temporales, porque la supresión deja de ser efectiva cuando el valor cambia.

Por ejemplo, ciertos programas al reiniciar o ejecutar utilizan archivos temporales (`/tmp`). Crear supresiones basadas en estos valores no es efectivo en caso de que se detecte una actividad similar.

Suponga que desea suprimir completamente el ruido de todas las señales de una actividad particular en un contenedor. Usted elige el comando completo dentro del árbol de procesos que inicia el proceso para poner en marcha el contenedor. Mientras se ejecuta, el proceso accede a archivos que existen mientras exista el contenedor. Si el comportamiento que intenta abordar está, en cambio, vinculado a la lógica de su carga de trabajo, la definición de supresión basada en instancias de procesos efímeros resulta ineficaz para filtrar actividades similares en otros contenedores.

### Actividad de archivos {#file-activity}

Refine su supresión relacionada con la actividad de archivos basándose en atributos que reflejen información de identificación sobre sus cargas de trabajo, el archivo en cuestión y el proceso que accede al archivo.

Claves comunes:
- Etiquetas de carga de trabajo:
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- Proceso:
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- Archivo:
  - `@file.path`
  - `@file.inode`
  - `@file.mode`

Para determinar una actividad maliciosa real mientras inspecciona una señal, valide si el contexto en el que el proceso accede y modifica el archivo es el esperado. Para evitar suprimir comportamientos previstos en archivos en toda su infraestructura, siempre debe tener una combinación que recopile toda la información de contexto relevante de las claves comunes enumeradas anteriormente.

Ejemplo de combinación:
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### Actividad basada en DNS de red {#network-dns-based-activity}

El monitoreo de actividad de red verifica el tráfico DNS y tiene como objetivo detectar comportamientos sospechosos que pueden comprometer su red de servidores. Al verificar las consultas realizadas a su servidor DNS por ciertas IPs, puede activarse ante accesos benignos de un conjunto conocido de direcciones IP, como las IPs de red privada o las IPs de red en la nube.

Claves comunes:
- Proceso:
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Relacionado con red/DNS:
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

Siempre que una aplicación local realiza conexiones para resolver un nombre DNS, las primeras características que busca verificar son la lista de IPs que iniciaron la búsqueda, así como la consulta DNS.

Ejemplo de combinación:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Actividad del kernel {#kernel-activity}

Con las señales relacionadas con el kernel, el ruido generalmente proviene de la lógica de su carga de trabajo o de vulnerabilidades asociadas con una versión específica del kernel. Considere los siguientes atributos antes de decidir qué suprimir:

Claves comunes:
- Proceso
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Archivo
  - `@file.path `
  - `@file.inode`
  - `@file.mode`

Definir una combinación para este tipo de actividad es similar a las actividades de archivos o procesos, con cierta especificidad adicional vinculada a la llamada al sistema utilizada para el ataque.

Por ejemplo, la explotación de Dirty Pipe es una vulnerabilidad de escalada de privilegios. Dado que se vuelve crítico si los usuarios locales escalan sus privilegios en el sistema utilizando este ataque, tiene sentido suprimir el ruido creado por los usuarios root que ejecutan procesos esperados.
- `@process.executable.user`
- `@process.executable.uid`

Además, es posible que note que se crean señales incluso cuando algunas de sus máquinas ejecutan versiones de kernel parcheadas (por ejemplo, las versiones de Linux 5.16.11, 5.15.25 y 5.10 que están parcheadas para la vulnerabilidad Dirty Pipe). En este caso, agregue una etiqueta de nivel de carga de trabajo como `host`, `kube_container_name` o `kube_service` a la combinación. Sin embargo, cuando utilice un atributo o etiqueta de nivel de carga de trabajo, tenga en cuenta que se aplica a una amplia gama de candidatos, lo que disminuye su superficie de detección y cobertura. Para evitar que eso suceda, combine siempre una etiqueta de nivel de carga de trabajo con atributos basados en procesos o archivos para definir criterios de supresión más granulares.