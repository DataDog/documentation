---
aliases:
- /es/getting_started/tracing/distributed-tracing
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Selecciona el idioma de tu aplicación
- link: /tracing/glossary/
  tag: Documentación
  text: Utilizar la interfaz de usuario APM
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centro de aprendizaje
  text: Introducción a Application Performance Monitoring
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para mejorar tu comprensión de APM
title: Empezando con el rastreo
---

## Información general

La monitorización del rendimiento de aplicaciones Datadog (APM o rastreo) se utiliza para recopilar [trazas (traces)][1] del código de tu aplicación backend. Esta guía para principiantes te muestra cómo obtener tu primera traza en Datadog.

**Nota**: APM de Datadog está disponible en muchos idiomas y marcos de trabajo. Consulta la documentación sobre la [instrumentación de tu aplicación][2].

## Cuenta Datadog

Si aún no lo has hecho, crea una [cuenta de Datadog][3].

## Datadog Agent

Antes de instalar el Datadog Agent , configura una [máquina virtual Vagrant Ubuntu 22.04][4] utilizando los siguientes comandos. Para obtener más información sobre Vagrant, consulta su página [Empezando][5].

```text
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

Para instalar el Datadog Agent en un host, utiliza el [comando de instalación de una línea][6] actualizado con tu [clave API Datadog][7]:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

### Validación

Comprueba que el Agent está funcionando con el [comando de estado][8]:

```shell
sudo datadog-agent status
```

Luego de unos minutos, comprueba que el Agent está conectado a tu cuenta, consultando la [lista de infraestructuras][9] en Datadog.

## APM de Datadog

### Sigue la documentación disponible en la app (recomendado)

Para los pasos restantes, sigue las [Instrucciones de inicio rápido][10] del sitio Datadog para obtener la mejor experiencia, incluyendo:

- Instrucciones paso a paso adaptadas a tu configuración de despliegue (en este caso, se trata de un despliegue basada en host).
- Define de forma dinámica las etiquetas `service`, `env` y `version`.
- Activa Continuous Profiler, que ingiere el 100 % de las trazas (traces), y la inyección del ID de rastreo en los logs durante la configuración.


### Activar APM

En las últimas versiones de Agent v6 y v7, APM está activado por defecto. Puedes verlo en el [archivo de configuración `datadog.yaml`][11] del Agent:

```yaml
# apm_config:
##   Si se debe ejecutar o no el Agent de APM
#   enabled: true
```

Y en `trace-agent.log`:

```bash
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-jammy
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Nombre del entorno

Para una mejor experiencia, se recomienda utilizar la variable de entorno `DD_ENV` para configurar `env` a través de tu rastreador de servicios.

Además, si su rastreador tiene habilitada la introducción de logs, entonces `env` es constante a través de las trazas y los logs. Para obtener más información, consulta [Etiquetado de servicios unificado][12].

Alternativamente, nombra tu entorno actualizando `datadog.yaml` para establecer `env` en `apm_config`. Para obtener más información sobre cómo configurar `env` para APM, consulta la [guía de configuración de etiquetas (tags) primarias en contexto][13].

## Aplicación APM

### Instalación

Antes de configurar la aplicación, instala `pip` y, a continuación, `flask` y `ddtrace` en tu máquina virtual Ubuntu:

```shell
sudo apt-get install python-pip
pip install flask
pip install ddtrace
```

### Crear

En la máquina virtual Ubuntu, crea la aplicación `hello.py` con el siguiente contenido:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
```

### Ejecutar

Ejecuta `hello.py` con `ddtrace`, lo que automáticamente instrumenta tu aplicación en Datadog:

```shell
export DD_SERVICE=hello
ddtrace-run python hello.py
```

Deberías ver una salida similar a:

```bash
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### Probar

Prueba tu aplicación y envía tus trazas a Datadog utilizando `curl`. Tu aplicación debería estar ejecutándose (como se muestra arriba). En otra ventana de comandos, ejecuta:

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

Estas salidas:

```text
hello world
```

Al cabo de unos minutos, tu rastreo aparece en Datadog bajo el servicio `hello`. Consulta el [catálogo de servicios][14] o la [lista de trazas][15].

{{< img src="getting_started/tracing-services-list.png" alt="Lista de servicios de rastreo" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/#terminology
[2]: https://docs.datadoghq.com/es/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[5]: https://www.vagrantup.com/intro/getting-started
[6]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /es/agent/configuration/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: https://app.datadoghq.com/apm/service-setup
[11]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[12]: /es/getting_started/tagging/unified_service_tagging
[13]: /es/tracing/guide/setting_primary_tags_to_scope/
[14]: https://app.datadoghq.com/services
[15]: https://app.datadoghq.com/apm/traces