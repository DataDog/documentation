---
aliases:
- /es/security_platform/cloud_workload_security/guide/tuning-rules/
- /es/security_platform/cloud_security_management/guide/tuning-rules/
title: Ajuste de las señales de seguridad de CSM Threats
---

## Información general

Cloud Security Management Threats (CSM Threats) monitoriza las actividades sospechosas que se producen a nivel de carga de trabajo. Sin embargo, en algunos casos, las actividades benignas se marcan como maliciosas debido a parámetros particulares en el entorno del usuario. Cuando una actividad benigna esperada activa una señal, puedes suprimir el activador de la actividad para limitar el ruido. 

Esta guía ofrece consideraciones sobre las prácticas recomendadas y los pasos para ajustar la supresión de señales.

## Estrategia de supresión

Antes de suprimir los patrones benignos, identifica las características comunes en las señales en función del tipo de actividad de detección. Cuanto más específicas sean las combinaciones de atributos, más precisa será la supresión.

Desde el punto de vista de la gestión de riesgos, la supresión basada en un menor número de atributos aumenta la posibilidad de dejar fuera actividades maliciosas reales. Para afinar eficazmente y sin perder la cobertura de cualquier comportamiento malicioso, considera la siguiente lista de atributos clave comunes, categorizados por tipos de actividad:

### Actividad del proceso

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

Para determinar si un proceso es legítimo, revisa su proceso principal en el árbol de procesos. El árbol de la ascendencia del proceso rastrea un proceso de vuelta a su origen, proporcionando contexto para su flujo de ejecución. Esto ayuda a comprender la secuencia de eventos que conducen al proceso actual.

Normalmente, basta con suprimir en función del proceso principal y de los atributos del proceso no deseados.

Ejemplo de combinación:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

Si quieres suprimir utilizando un marco temporal amplio, evita utilizar procesos que contengan argumentos con valores temporales, ya que la supresión deja de ser efectiva cuando cambia el valor.

Por ejemplo, ciertos programas al reiniciarse o ejecutarse utilizan archivos temporales (`/tmp`). Crear supresiones basadas en estos valores no será efectivo en el caso en que se detecte una actividad similar.

Supongamos que quieres suprimir completamente el ruido de todas las señales de una actividad particular en un contenedor. Eliges el comando completo dentro del árbol de procesos que inicia el proceso para acelerar el contenedor. Mientras se ejecuta, el proceso accede a archivos que existen mientras existe el contenedor. Si el comportamiento que quieres controlar está ligado a tu lógica de carga de trabajo, la definición de supresión basada en instancias efímeras de proceso se vuelve ineficaz para afinar actividades similares en otros contenedores.

### Actividad de archivos

Refina la supresión relacionada con la actividad de tu archivo en función de atributos que reflejen información identificativa sobre tus cargas de trabajo, el archivo en cuestión y el proceso que está accediendo al archivo.

Claves comunes:
- Etiquetas (tags) de carga de trabajo:
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

Para determinar una actividad maliciosa real al inspeccionar una señal, confirma si el contexto en el que el proceso está accediendo al archivo y modificándolo es el esperado. Para evitar la supresión de comportamientos previstos en archivos en toda tu infraestructura, siempre debes tener una combinación que reúna toda la información de contexto relevante de las claves comunes presentadas anteriormente.

Ejemplo de combinación: 
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### Actividad de red basada en DNS

Network Activity Monitoring monitoriza el tráfico DNS y tiene como objetivo detectar comportamientos sospechosos que puedan comprometer tu red de servidores. Mientras busca consultas realizadas a tu servidor DNS por ciertas direcciones IP, puede activar el acceso benigno desde un conjunto conocido de direcciones IP, como IP de redes privadas red o IP de redes en la nube.

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

Siempre que una aplicación local realiza conexiones para resolver un nombre DNS, las primeras características que debes buscar son las listas de las direcciones IP que instigaron la búsqueda, así como la consulta DNS.

Ejemplo de combinación:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Actividad del kernel

Con las señales relacionadas con el kernel, el ruido suele proceder de la lógica de tu carga de trabajo o de vulnerabilidades asociadas a una determinada versión del kernel. Considera los siguientes atributos antes de decidir qué suprimir:

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

La definición de una combinación para este tipo de actividad es similar a las actividades de archivos o procesos, con alguna especificidad adicional asociada a la llamada al sistema utilizada para el ataque. 

Por ejemplo, la explotación de Dirty Pipe es una vulnerabilidad de escalada de privilegios. Dado que esto se vuelve crítico si los usuarios locales escalan sus privilegios en el sistema aprovechando este ataque, tiene sentido suprimir el ruido creado por usuarios raíz que ejecutan procesos esperados. 
- `@process.executable.user`
- `@process.executable.uid`

Además, podrías notar que se crean señales, incluso cuando algunas de tus máquinas están ejecutando versiones del kernel parcheadas (por ejemplo, las versiones de Linux 5.16.11, 5.15.25 y 5.10 que están parcheadas para la vulnerabilidad Dirty Pipe). En este caso, añade una etiqueta de nivel de carga de trabajo como `host`, `kube_container_name` o `kube_service` a la combinación. Sin embargo, cuando utilices un atributo o una etiqueta de nivel de carga de trabajo, ten en cuenta que se aplicará a una amplia gama de candidatos, lo que disminuye tu superficie de detección y cobertura. Para evitar que esto ocurra, combina siempre una etiqueta de nivel de carga de trabajo con procesos o atributos basados en archivos para definir un criterio de supresión más específico.

## Añadir una supresión a partir de la señal

Cuando estés investigando una amenaza potencial notificada por las reglas de detección de CSM Threats, puedes encontrarte con algunas señales que alertan sobre comportamientos benignos conocidos que son específicos de tu entorno.  

Considera una explotación de la utilidad del proceso Java. Un atacante apunta intencionalmente a vulnerabilidades en el código de tu aplicación que ejecuta procesos Java. Este tipo de ataque implica un acceso persistente a tu aplicación mediante la generación de su propia utilidad de shell Java. 

En algunos casos, las reglas de CSM Threats también pueden detectar actividades esperadas, por ejemplo de tu equipo de seguridad ejecutando una sesión de pentest para evaluar la solidez de tus aplicaciones. En este caso, puedes evaluar la precisión de las alertas notificadas y suprimir el ruido.

Abre el panel lateral de detalles de la señal y ve de una pestaña a otra para obtener contexto, incluidos metadatos de procesos clave como argumentos de línea de comandos y claves de variables de entorno. En el caso de las cargas de trabajo contenedorizadas, la información incluye la imagen, el pod, el clúster de Kubernetes y mucho más.

{{< img src="/security/cws/guide/cws-tuning-rules.png" alt="Panel lateral de detalles que muestra eventos, logs y otros datos asociados a una señal." width="75%">}}

Para definir los criterios de supresión, haz clic en cualquier valor de atributo y selecciona **Never trigger signals for** (Nunca activar señales para).

En este ejemplo, evalúa si el uso de estas variables de entorno ha estado realmente precedido por acciones que han escalado privilegios dentro del árbol de la ascendencia del proceso. Las etiquetas pueden indicar en qué parte de tu infraestructura ha ocurrido la acción y ayudar a reducir su gravedad. Con toda esta información, puedes decidir dejar de lado la regla en cualquier proceso que haya heredado estas variables de entorno.

Si decides afinar una regla, la combinación de ciertos atributos en tus señales mejora la precisión de la supresión. Suele ser mejor utilizar las siguientes claves comunes, que aumentan la eficacia de la supresión:

- `@process.parent.comm`: El contexto en el que se ha llamado al proceso responsable de la señal. Esta clave te ayuda a evaluar si su ejecución ha sido la esperada. Por lo general, el proceso principal contextualiza la ejecución y, por lo tanto, es un buen candidato para dejar de lado comportamientos benignos similares.
- `@process.parent.path`: Del mismo modo, al añadir la ruta del binario correspondiente del proceso principal se complementa la supresión especificando su localización.
- `host`: Si el host en cuestión no se ejecuta en un entorno vulnerable, por ejemplo, un entorno de staging, podría suprimir la activación de señales generadas por eventos que proceden de él.
- `container.id`: La supresión resulta más eficaz si los atributos relacionados con tus cargas de trabajo también están en la combinación. Si sabes que un contenedor se utiliza exclusivamente para una actividad benigna, añade su nombre o ID para disminuir significativamente el ruido.
- `@user.id`: Si has identificado a un usuario como miembro conocido de tu equipo, puedes suprimir la actividad relacionada con ese usuario.

Para mayor especificidad, los siguientes atributos proporcionan información sobre procesos pasados al reensamblar la cadena de ejecución. Se encuentran bajo el prefijo `@process.ancestors.*`:
- `file.name`
- `args`
- `file.path`

## Añadir una supresión a partir del editor de reglas

Las señales muestran contexto relevante dentro de las alertas de seguridad. Aunque los datos de eventos pueden aprovecharse para los filtros de supresión, los datos de observabilidad en los que se basa la regla de detección pueden ofrecer un mejor candidato para el ajuste.

En CSM Threats, los logs del Agent en tiempo de ejecución se generan a partir de eventos de kernel recopilados. Puedes previsualizar los logs desde el panel lateral de señales sin cambiar de contexto. 

1. Ve al panel lateral de detalles de la señal elegida y haz clic en la pestaña Events (Eventos). 
2. Haz clic en **View in Log Explorer* (Ver en el Explorador de logs) para ir a Log Management, que muestra la lista completo de logs que instigan esta señal.
   Dado que puede haber muchos logs, el panel lateral de señales combina estos logs y sus atributos compartidos en una estructura JSON.
3. Vuelve a la pestaña Events (Eventos) y desplázate hasta el final del panel. Expande el menú desplegable JSON para acceder a todos los atributos de logs contenidos en eventos del Agent en tiempo de ejecución.
4. Identifica los pares clave-valor para suprimir las señales mediante claves comunes, como `@process.args`, `@process.group`, `@process.ancestors.comm` o `@process.ancestors.args`.
5. Abre la regla en el Editor de reglas y en **Exclude benign activity with suppression queries** (Excluir actividad benigna con consultas de supresión), añade la lista de pares clave-valor que has identificado como útiles.

Por ejemplo, supón que tienes una regla `Java process spawned shell/utility` que quieres suprimir para la siguiente combinación de atributos:
- `@process.args:+x`
- `@process.executable.group:exec`
- `@process.ancestors.executable.comm:root`
- `@process.ancestors.executable.args:init`

Introduce estos valores clave en **This rule will not generate a signal if there is a match** (Esta regla no generará una señal si hay una coincidencia) para suprimir las señales no deseadas.

Si, por el contrario, quieres activar señales en condiciones específicas identificando el conjunto adecuado de atributos, especifica la combinación **Only generate a signal if there is a match** (Sólo generar una señal si hay una coincidencia).