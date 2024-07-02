---
aliases:
- /es/logs/faq/log-collection-is-the-datadog-agent-losing-logs
further_reading:
- link: /logs/log_collection/
  tag: Documentación
  text: Aprende a recopilar tus logs
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: guía
title: Mecanismos para asegurar que no se pierdan logs
---

**El Datadog Agent dispone de varios mecanismos para asegurar que no se pierda ningún log**.

## Rotación de log

Cuando se rota un archivo, el Agent sigue [supervisando][1] el archivo antiguo mientras empieza a seguir el archivo recién creado en paralelo.
Aunque el Agent continúa supervisando el archivo antiguo, se establece un tiempo de espera de 60 segundos después de la rotación del log para garantizar que el Agent utiliza sus recursos para suoervisar los archivos más recientes.

## Problemas de red

### Supervisión de archivos

El Agent almacena un puntero para cada archivo supervisado. Si se produce un problema de conexión de red, el Agent deja de enviar logs hasta que se restablezca la conexión y retoma automáticamente el proceso donde se detuvo para garantizar que no se pierda ningún log.

### Escucha de puertos

Si el Agent está escuchando un puerto TCP o UDP y se enfrenta a un problema de red, los logs se almacenan en un buffer local hasta que la red vuelva a estar disponible.
Sin embargo, existen algunos límites para este buffer con el fin de evitar problemas de memoria. Los nuevos logs se descartan cuando el buffer está lleno.

### Logs del contenedor

En cuanto a los archivos, Datadog almacena un puntero por cada contenedor supervisado. Por lo tanto, en el caso de problemas de red, es posible que el Agent sepa qué logs no se han enviado todavía.
Sin embargo, si el contenedor supervisado se elimina antes de que la red vuelva a estar disponible, los logs ya no son accesibles.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#tail