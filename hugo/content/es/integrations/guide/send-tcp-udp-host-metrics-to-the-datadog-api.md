---
aliases:
- /es/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
title: Envío de métricas de host TCP/UDP a la API de Datadog
---

Para obtener información sobre tus conexiones TCP/UDP, puedes recopilar estadísticas a través de una entrada Crontab y reenviarlas a tu plataforma de Datadog.

Para ello, utiliza sockstats de Linux, ubicado en: /proc/net/sockstat.

Aquí tienes un fragmento de código de ejemplo para empezar:

https://gist.github.com/sage-oli-wood/70e0931f037ea0aac132

Esto envía tus datos a Datadog a través de un HTTP POST.

Una forma más adecuada de hacerlo sería enviar métricas y eventos mediante DogStatsD. Puedes adaptar tu cron job para reenviar tus datos localmente en UDP a tu Agent, encuentra más información aquí.

Se recupera desde:

* TCP: 

||||
|:---|:---|:---|
|en uso|  total de conexiones establecidas |  entero (número)|
|Huérfano|  Conexiones tcp huérfanas |
(no se adjunta a ningún identificador de archivo de usuario) | entero (número)|
|TW | Conexiones TIME_WAIT | entero (milisegundo)|
|Alloc| Sockets TCP asignados | (Todos los tipos, por ejemplo, ESTABLISH, CLOSE_WAIT, TIME_WAIT, etc)|
|mem| Memoria total para el socket TCP | entero (KiloBytes)|

* UDP: 

||||
|:---|:---|:---|
|en uso|   total de conexiones establecidas  | entero|
|mem |memoria total para el socket UDP | entero (KB)|