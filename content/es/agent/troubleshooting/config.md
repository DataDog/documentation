---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Solucionar problemas del Agent
  text: Modo de depuración del Agent
title: Gestión de la configuración del tiempo de ejecución del Agent
---

Si se ejecuta el Agent 6.19/7.19 y posteriores, se pueden cambiar dinámicamente algunos parámetros durante el tiempo de ejecución sin necesidad de reiniciar el Agent para que los cambios en la configuración se apliquen.

**Nota**: Los cambios realizados de forma dinámica no son permanentes. Se pierden en cuanto se reinicia el Agent.

Utiliza el comando `config list-runtime` para ver una lista de los parámetros de configuración que pueden modificarse durante el tiempo de ejecución. En la tabla de abajo, te mostramos el comando completo en función de cada plataforma.

| Plataforma   | Comando                                                |
|------------|--------------------------------------------------------|
| Docker     | `docker exec datadog-agent agent config list-runtime`  |
| macOS      | `datadog-agent config list-runtime`                    |
| CentOS     | `sudo datadog-agent config list-runtime`               |
| Debian     | `sudo datadog-agent config list-runtime`               |
| Kubernetes | `kubectl exec <POD_NAME> agent config list-runtime`    |
| Fedora     | `sudo datadog-agent config list-runtime`               |
| RedHat     | `sudo datadog-agent config list-runtime`               |
| Suse       | `sudo datadog-agent config list-runtime`               |
| Origen     | `sudo datadog-agent config list-runtime`               |
| Windows    | Consulta la [documentación específica sobre Windows][1].       |

Uno de los parámetros que se puede cambiar durante el tiempo de ejecución es el nivel de los logs. Esta opción es útil para depurar en un entorno contenedorizado, donde la configuración del Agent no puede modificarse sin destruir y volver a crear el contenedor que ejecuta el Agent. Para establecer de forma dinámica el nivel de los logs para depurar en un despliegue de Kubernetes, invoca el siguiente comando:

```text
kubectl exec <POD_NAME> agent config set log_level debug
```

Puedes obtener el valor actual de los parámetros editables durante el tiempo de ejecución mediante `config get <SETTING>`. Por ejemplo, para obtener el nivel actual de los logs en un sistema de Linux, utiliza:

```text
sudo datadog-agent config get log_level
```

También se puede mostrar la configuración completa durante el tiempo de ejecución mediante el comando `config`.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/windows/#agent-v6