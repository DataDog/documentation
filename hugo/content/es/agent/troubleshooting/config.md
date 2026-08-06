---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
title: Gestión de la configuración del tiempo de ejecución del Agent
---

Si estás ejecutando el Agent v6.19+/7.19 o posterior, puedes cambiar dinámicamente algunos parámetros en tiempo de ejecución, sin necesidad de reiniciar el Agent para que el cambio de configuración tenga efecto.

**Nota**: Los cambios realizados de forma dinámica no son permanentes. Se pierden en cuanto se reinicia el Agent.

Utiliza el comando `config list-runtime` para ver los parámetros de configuración que se pueden cambiar en tiempo de ejecución. Consulta la siguiente tabla para ver el comando completo en diferentes plataformas.

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
| Source     | `sudo datadog-agent config list-runtime`               |
| Windows    | Consulta la [documentación de Windows][1] específica.       |

Un parámetro que se puede cambiar en tiempo de ejecución es el nivel de log. Esto es conveniente para fines de depuración en entornos contenedorizados, donde la configuración del Agent no se puede cambiar sin destruir y luego volver a crear el contenedor que ejecuta el Agent. Para configurar dinámicamente el nivel de log para depurar en un despliegue Kubernetes, invoca el siguiente comando:

```text
kubectl exec <POD_NAME> agent config set log_level debug
```

Es posible obtener el valor actual de los parámetros editables en tiempo de ejecución utilizando `config get <SETTING>`. Por ejemplo, para obtener el nivel actual de log en un sistema Linux, utiliza:

```text
sudo datadog-agent config get log_level
```

También se puede mostrar la configuración completa durante el tiempo de ejecución mediante el comando `config`.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/windows/#agent-v6