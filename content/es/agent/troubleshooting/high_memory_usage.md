---
disable_toc: false
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentación
  text: Consultar el estado de un check del Agent
title: Consumo elevado de memoria o CPU
---

Existen diversos factores que pueden causar un consumo elevado de memoria o CPU del Agent. Si sigues los pasos que se detallan a continuación y los problemas persisten, [ponte en contacto con el equipo de asistencia de Datadog para obtener más ayuda](#reach-out-to-datadog-support).

### Causas más frecuentes de un consumo elevado de memoria o CPU

- Una integración devuelve miles de métricas o ejecuta un gran número de instancias de checks. Para obtener un resumen de las instancias de checks en ejecución, así como del número de métricas recopiladas, ejecuta [el comando CLI `status`][2] y consulta la sección **Collector**.
- El tiempo de ejecución de Python o Go del Agent provoca un gran consumo de recursos. Habilita la [monitorización de Live Processes][3] para comprobar si el proceso del Agent está consumiendo una cantidad imprevista de memoria o CPU. Si lo prefieres, puedes utilizar el gestor de actividades de tu sistema operativo para consultar el consumo de recursos del proceso del Agent.
- El Agent monitoriza una gran cantidad de procesos. Para configurarlo, accede al [archivo de configuración del check del proceso][4].
- El comportamiento del Agent activa herramientas antimalware o antivirus de Windows, lo que provoca un uso elevado de la CPU.
- El Agent reenvía un gran número de líneas de logs o métricas de DogStatsD.

### Ajustes para reducir el uso de recursos

Los siguientes son algunos ajustes que puedes hacer en la configuración de tu Agent para reducir el uso de recursos:

- En el caso de integraciones que tienen muchas instancias de checks o que recopilan un gran número de métricas, modifica el `min_collection_interval` en el archivo `conf.yaml` de la integración. En general, el Agent ejecuta cada instancia de check con una frecuencia de entre 10 y 15 segundos. Si se establece el `min_collection_interval` en 60 segundos o más, se puede reducir el consumo de recursos. Para obtener más información sobre el intervalo de recopilación de checks, consulta la [documentación sobre los checks personalizados del Agent][5].
- Comprueba si una integración está configurada para utilizar Autodiscovery o si una integración está utilizando un comodín (`*`) que podría tener un contexto más específico. Para obtener más información sobre Autodiscovery, consulta la página [Autodiscovery básico del Agent][6].

## Ponerse en contacto con el equipo de asistencia de Datadog

Si ninguna de las soluciones anteriores resulta apropiada para tu situación, [ponte en contacto con el equipo de asistencia de Datadog][1]. Recuerda activar la [monitorización de Live Processes]][3] para confirmar si el proceso del Agent está consumiendo una cantidad imprevista de memoria o CPU.

Al abrir un ticket, no olvides proporcionar información sobre los pasos que has seguido para verificar el problema y las medidas que has tomado hasta el momento. En función de si puedes o no aislar el problema en una única integración, incluye información de una de las siguientes secciones.

### Consumo elevado aislado en una sola integración

Si una sola integración consume grandes cantidades de memoria, envía un flare de nivel de depuración junto con la salida del perfil de memoria de Python:
1. Para activar el modo de depuración, [sigue la documentación sobre el modo de depuración][7].
1. Para enviar un perfil, añade el marcador `--profile 30` al comando del flare:
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   El comando tarda aproximadamente 30 segundos en ejecutarse, mientras recopila la información del perfil.

1. Para obtener el perfil de memoria de Python, captura la salida de este comando:
   {{< code-block lang="shell">}}sudo -u dd-agent -- datadog-agent check <check name> -m -t 10{{< /code-block >}}

### Consumo elevado no asociado a una única integración

Si el elevado consumo de memoria no está asociado a una única integración, envía un flare de nivel de depuración con un perfil que se haya recopilado durante un periodo en el que el Agent haya utilizado más memoria o CPU de lo esperado:
1. Para activar el modo de depuración, [sigue la documentación sobre el modo de depuración][7].
1. Para enviar un perfil, añade el marcador `--profile 30` al comando flare:
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   El comando tarda aproximadamente 30 segundos en ejecutarse mientras recopila la información del perfil.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/agent/basic_agent_usage/#cli
[3]: /es/infrastructure/process/
[4]: /es/integrations/process/#configuration
[5]: /es/developers/write_agent_check/#collection-interval
[6]: /es/getting_started/containers/#enable-autodiscovery
[7]: /es/agent/troubleshooting/debug_mode/