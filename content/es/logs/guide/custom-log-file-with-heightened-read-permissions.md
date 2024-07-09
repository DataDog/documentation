---
aliases:
- /es/logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions
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
title: Enviar logs desde un archivo de log personalizado con permisos de lectura ampliados
---

A menudo, los archivos de log, en especial los logs de sistema como *syslog* o *journald*, tienen permisos de lectura ampliados que bloquean la recopilación de logs del Datadog Agent, ya que no tiene acceso *sudo* o *admin*.

Hay tres posibles soluciones para evitar esto:

* (No recomendado) Proporciona acceso root (raíz) al Agent para que pueda seguir esos archivos. Datadog recomienda encarecidamente no elegir esta opción.
* Cambia el permiso del archivo para que el Agent pueda acceder a él. El Agent necesita permisos de ejecución y lectura en los directorios y también permiso de lectura en el archivo. Ejecuta los siguientes comandos para proporcionar esos permisos (para cualquier usuario, no solo el Agent):
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* Configura un cargador de log de código abierto (como Rsyslog, NXLog, etc.) que tenga acceso root (raíz) para enviar esos logs directamente a tu plataforma de Datadog o localmente a un Datadog Agent en ejecución. Para obtener instrucciones, lee la documentación dedicada a [Rsyslog][1], [Syslog-ng][2], [NXLog][3], [FluentD][4], o [Logstash][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/rsyslog/
[2]: /es/integrations/syslog_ng/
[3]: /es/integrations/nxlog/
[4]: /es/integrations/fluentd/#log-collection
[5]: /es/integrations/logstash/#log-collection