---
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
kind: Documentación
title: Seguridad de los datos de Kubernetes
---

<div class="alert alert-info">En esta página, hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

Esta guía explica cómo navegar por los permisos y la seguridad en Kubernetes cuando se despliega y configura el Datadog Agent, de modo que puedas conservar tanto la seguridad de tu entorno Kubernetes como la funcionalidad necesaria de tus sistemas de monitorización.

### Comparación entre permisos y necesidades operativas
En el contexto de la seguridad de Kubernetes, el equilibrio entre el principio del menor privilegio y el funcionamiento fluido de componentes vitales como el Datadog Agent es esencial. Mientras que los estándares de seguridad del pod de Kubernetes y los puntos de referencia del CIS frecuentemente enfatizan la necesidad de minimizar los permisos para evitar violaciones de acceso elevadas, es necesario reconocer que las herramientas de monitorización, como el Datadog Agent, pueden demandar ciertos permisos para ofrecer un rendimiento óptimo.

## Violaciones habituales de las normas de seguridad

### Nivel de seguridad restringido en la admisión de seguridad de pod de Kubernetes
El estándar de seguridad de pod restringido es el nivel de seguridad más estricto aplicado por el controlador de admisión integrado. Su objetivo es aplicar las prácticas recomendadas de seguridad del pod a costa de la compatibilidad y la funcionalidad. Los casos de uso previstos incluyen aplicaciones que procesan información financiera sensible e informaciones de identificación personal. 

Ejecutar el Datadog Agent con los estándares de pod restringidos impediría al Agent acceder a datos útiles y necesarios, lo que no es recomendado.

### Pod en ejecución con hostPID
Un contenedor que se ejecuta en el espacio de nombres del ID de proceso (PID) puede inspeccionar procesos que se ejecutan fuera del contenedor. Si el contenedor también tiene acceso a las capacidades `ptrace`, esto se puede utilizar para escalar privilegios fuera del contenedor.

DogStatsD puede configurarse para recibir métricas a través de un puerto UDP o un socket de dominio Unix. El uso del socket de dominio Unix ofrece algunas ventajas, incluyendo un mejor rendimiento, el manejo de errores y la detección del origen. Cuando se ejecuta dentro de un contenedor, DogStatsD necesita ejecutarse en el espacio de nombres del PID del host para que la detección del origen funcione de forma fiable. Es posible desactivar la detección del origen, pero [esto hace que las métricas recopiladas por DogStatsD ya no tengan el etiquetado a nivel de contenedor][1].

### Volúmenes hostPath
Utilizar volúmenes hostPath en Kubernetes puede introducir vulnerabilidades de seguridad potenciales, incluyendo la exposición involuntaria de credenciales del sistema y el acceso no autorizado a las API privilegiadas. Sin embargo, el Datadog Agent se apoya en el acceso directo al host para monitorizar de forma efectiva los recursos a nivel de host.

Mientras que los volúmenes hostPath pueden constituir una preocupación de seguridad, la necesidad del Datadog Agent de una monitorización a nivel de host requiere estos montajes. Es importante tener en cuenta que los volúmenes hostPath requeridos por el Datadog Agent se limitan cuidadosamente a rutas esenciales y se montan en modo de sólo lectura siempre que sea posible.

Al habilitar los siguientes montajes hostPath dentro de límites bien definidos, las organizaciones pueden lograr un equilibrio entre proporcionar el acceso necesario con propósitos de monitorización y mantener la seguridad de tu entorno Kubernetes.

| Montaje            | Descripción |
| ---------------- | ----------- |
| `procdir`          | Montaje de sólo lectura. Se utiliza para checks del sistema. |
| `cgroups`          | Montaje de sólo lectura. Se utiliza para la recopilación de metadatos de contenedor. |
| `os-release-file`  | Montaje de sólo lectura. Se utiliza para la detección del sistema operativo.
| `dsdsocket`        | Montaje de lectura-escritura. [socket DogStatsD, opcionalmente configurado con un puerto.][1] |
| `apmsocket`        | Montaje de lectura-escritura. [socket APM, opcionalmente configurado con un puerto.][2] |
| `passwd`           | Montaje de sólo lectura. Utilizado por el Agent de proceso para asociar procesos con usuarios. |
| `runtimesocketdir` | Montaje de sólo lectura. Se utiliza para la recopilación de métricas de contenedor. |

### Ejecutar un contenedor como usuario raíz
En un entorno Kubernetes, los contenedores tienen la flexibilidad de ejecutarse como cualquier usuario de Linux. Aunque las características de seguridad del tiempo de ejecución de contenedores proporcionan algunas restricciones, ejecutar contenedores como usuario raíz puede suponer un mayor riesgo de fuga fuera de los contenedores. Por lo tanto, se recomienda la adhesión a las prácticas recomendadas y la ejecución de contenedores, especialmente aquellos para cargas de trabajo normales, como usuarios no-UID 0.

La configuración por defecto del Datadog Agent está diseñada para ser altamente compatible con configuraciones estándar de socket y kubelet, y se ejecuta como usuario raíz dentro del contenedor. Esta configuración por defecto se elige para maximizar la compatibilidad. Aunque es posible configurar el Agent para que se ejecute como usuario no raíz, existen consideraciones especiales y actualizaciones de la configuración subyacente del host que pueden ser necesarias para que algunas integraciones funcionen correctamente. Entre ellas se incluyen las siguientes:

* Datadog recomienda utilizar el usuario `dd-agent` (UID: 100). Este usuario se crea en la imagen del contenedor.
  * **Nota**: En las versiones `7.47.0` e inferiores del Agent, utiliza el usuario UID: 101.
* El socket del tiempo de ejecución del contenedor debe configurarse para permitir el acceso del usuario del Agent.
* Para la recopilación, los logs generados por el kubelet deben ser accesibles por el usuario del Agent.
* Algunas integraciones pueden fallar debido a la falta de acceso a comandos o archivos en el host.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/dogstatsd/unix_socket/?tab=host 
[2]: /es/containers/kubernetes/apm/ 
[3]: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted