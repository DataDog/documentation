---
aliases:
- /es/agent/faq/network-time-protocol-ntp-offset-issues
title: Problemas con el protocolo de tiempo de la red (NTP)
---

Si has detectado alguno de los siguientes problemas, es posible que se deban al desfase del NTP en los hosts que envían métricas a través del Agent:

* Activación de alertas incorrecta
* Retrasos en las métricas
* Vacíos en los gráficos de métricas

Para comprobar el desfase del NTP en un host, ejecuta el [comando de estado][1] del Agent, sigue las instrucciones que correspondan a tu sistema operativo y busca la sección Clocks:

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

Cualquier desfase significativo puede tener repercusiones no deseadas. Para evitar problemas relacionados con el NTP, haz uso del monitor reservado al desfase del NPT de Datadog para que te avise cuando se produzca algún cambio en un host debido a la [integración del NTP][2].
Si lo prefieres, también puedes utilizar la [página Check Summary][3] (Resumen de checks) de Datadog e inspeccionar el check `ntp.in_sync` para ver la lista de hosts que tienen problemas relacionados con el NTP.

**Nota**: Se debe autorizar el tráfico de UDP saliente a través del puerto `123` para que el Agent pueda confirmar que la hora del servidor local es razonablemente precisa según los servidores NTP de Datadog.

## Leer más

{{< whatsnext desc="La sincronización del reloj del sistema con el NTP varía en función del sistema operativo utilizado:">}}
    {{< nextlink href="https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}Cómo sincronizar Microsoft Windows con un servidor NTP{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}¿Cómo se puede forzar la actualización del reloj mediante el NTP?{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}Sincronización del reloj con el NTP{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/agent/guide/agent-commands/#agent-status-and-information
[2]: /es/integrations/ntp/
[3]: https://app.datadoghq.com/check/summary