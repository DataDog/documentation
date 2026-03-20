---
disable_toc: false
private: true
title: Puertos del Agent 5
---

Esta página aborda los puertos utilizados por el Agent 5. Para obtener información sobre la última versión del Agent, consulta [Tráfico de red][1].

<div class="alert alert-danger">
Todo el tráfico saliente se envía a través de SSL por TCP o UDP.
<br><br>
Utiliza una regla de cortafuegos, o una restricción de red similar, para asegurarte de que el Agent solo es accesible para tus aplicaciones o fuentes de red de confianza. Si se accede a él desde una fuente no fiable, los agentes maliciosos pueden realizar diversas acciones invasivas, entre las que se incluyen escribir trazas y métricas en tu cuenta de Datadog u obtener información sobre tu configuración y servicios.
</div>

Abre los siguientes puertos para beneficiarte de todas las funcionalidades del **Agent**:

#### Salida

443/tcp
: puerto para la mayoría de los datos del Agent (métricas, APM, Live Processes y contenedores).

123/udp
: puerto para NTP ([más detalles sobre la importancia de NTP][2]).<br>
Ver los [destinos de NTP por defecto][3].

#### Entrada

6062/tcp
: Puerto para los endpoints de depuración del Process Agent.

6162/tcp
: Puerto para configurar los parámetros de tiempo de ejecución del Process Agent.

8125/udp
: Puerto para DogStatsD a menos que `dogstatsd_non_local_traffic` esté configurado como true. Este puerto se encuentra disponible en localhost: `127.0.0.1`, `::1` y `fe80::1`.

8126/tcp
: puerto para el [receptor de APM][4].

17123/tcp
: Forwarder del Agent, utilizado para almacenar tráfico en el buffer en caso de que se produzcan desconexiones de red entre el Agent y Datadog.

17124/tcp
: adaptador de grafito opcional.

[1]: /es/agent/network
[2]: /es/agent/faq/network-time-protocol-ntp-offset-issues/
[3]: /es/integrations/ntp/#overview
[4]: /es/tracing/