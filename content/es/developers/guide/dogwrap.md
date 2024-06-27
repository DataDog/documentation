---
aliases:
- /es/developers/faq/can-i-call-scripts-and-generate-events-from-their-results
- /es/dashboards/faq/how-do-i-track-cron-jobs
description: Llama a comandos y genera eventos a partir de tus resultados con Dogwrap
kind: guía
title: Dogwrap
---

La herramienta de línea de comandos de Dogwrap permite invocar comandos y generar eventos a partir de sus resultados. Para utilizar Dogwrap, instala la [biblioteca de Datadog Python][1]:

Para instalar desde pip:

```text
pip install datadog
```

Para instalar desde la fuente:

1. Clona el repositorio de [Datadog/datadogpy][1].
2. Dentro de la carpeta raíz, ejecuta `python setup.py install`.

El comando `dogwrap` mínimo válido tiene la siguiente disposición:

{{< site-region region="us,gov,ap1" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us3 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us5 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s eu "<COMMAND>"
```
{{< /site-region >}}

**Nota**: El comando `dogwrap` envía datos al sitio de Datadog de US por defecto. Si necesitas enviar datos a otro sitio, debes incluir `-s` option specifying a target site, such as `eu`, `us3`, `us5`, etc.

Con los siguientes parámetros:

* `<EVENT_TITLE>`: título del evento que se mostrará en Datadog.
* `<Datadog_API_KEY>`: [la clave de API de Datadog asociada a tu organización][2].
* `<COMMAND>`: comando para contener y generar eventos. Encierra tu comando llamado entre comillas para evitar que Python piense que los argumentos de la línea de comandos pertenecen al comando de Python en lugar del comando contenido.

**Nota**: Utiliza el comando de ayuda de Dogwrap `dogwrap --help` para descubrir todas las opciones disponibles.

Para ver un ejemplo de `dogwrap` en acción, consulta `cron`. Si tienes un script cron para vaciar una tabla de Postgres cada día:

```bash
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Los procesos de vacío consumen muchos recursos, por lo que es posible que desees eventos de Datadog cada vez que se ejecuten para correlacionar métricas y otros eventos con los procesos de vacío:

```bash
dogwrap -n "Vacuuming mytable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"
```

Esto llama al comando al final del script y, si se obtiene un código de salida distinto de cero (como un error), envía eventos de Datadog. Usando `--submit_mode all` envía eventos en cada ejecución de este comando.

[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/organization-settings/api-keys