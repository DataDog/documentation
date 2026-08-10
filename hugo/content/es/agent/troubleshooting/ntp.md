---
aliases:
- /es/agent/faq/network-time-protocol-ntp-offset-issues
title: Problemas con el protocolo de tiempo de la red (NTP)
---

Si has observado alguno de los siguientes problemas, es posible que estén relacionados con el desplazamiento de NTP en los hosts que informan métricas a través del Agent:

* Activación de alertas incorrecta
* Retraso en el tiempo de respuesta de las métricas
* Vacíos en los gráficos de métricas

A fin de comprobar el desplazamiento de NTP de un host, ejecuta el [comando de estado][1] del Agent, con las instrucciones apropiadas para tu sistema operativo, y busca la sección Clocks (Relojes):

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

Cualquier desplazamiento significativo puede tener efectos no deseados. Para evitar problemas de NTP, aprovecha el monitor de Datadog a fin de que el desplazamiento de NTP te avise cuando haya desviación en un host gracias a la [integración de NTP][2].
De manera alternativa, usa la [página Resumen de checks][3] de Datadog e inspecciona la `ntp.in_sync` del check para ver la lista de hosts que tienen problemas de NTP.

**Nota**: Se debe permitir el tráfico de UDP saliente a través del puerto `123` para que el Agent pueda confirmar que la hora del servidor local es razonablemente precisa según los servidores de NTP de Datadog.

## Referencias adicionales

{{< whatsnext desc="Las instrucciones para sincronizar el reloj del sistema con NTP varían en función del sistema operativo que se use:">}}
    {{< nextlink href="https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}Cómo sincronizar Microsoft Windows con un servidor de NTP{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}¿Cómo se fuerza una actualización del reloj con NTP?{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}Sincronización del reloj con NTP{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/agent/configuration/agent-commands/#agent-status-and-information
[2]: /es/integrations/ntp/
[3]: https://app.datadoghq.com/check/summary