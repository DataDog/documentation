---
description: Configura el Datadog Agent para enviar los eventos de OpenLineage a Datadog
  Data Observability.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Más información sobre Data Observability
title: Configura el Datadog Agent para OpenLineage Proxy
---

## Información general

Puedes configurar el Datadog Agent para que actúe como proxy para [eventos de OpenLineage][1], reenviándolos a Datadog. Esto es útil para centralizar la configuración y evitar la necesidad de distribuir claves de API a cada aplicación.

Sustituye el nombre de host de los ejemplos con el [sitio de Datadog][2] correspondiente a tu organización. Para encontrar tu sitio de Datadog, consulta [Acceder al sitio de Datadog ][3]. Este ejemplo utiliza `datadoghq.com`.

## Requisitos previos

Asegúrate de tener el Datadog Agent instalado y ejecutándose en tu host. Si no es así, sigue las [instrucciones oficiales de instalación del Datadog Agent ][4] para tu sistema operativo.

Tras la instalación, localiza el archivo de configuración `datadog.yaml`. Este archivo se halla normalmente en:

- **Linux**: `/etc/datadog-agent/datadog.yaml`
- **macOS**: `/opt/datadog-agent/etc/datadog.yaml`

## Activar el proxy de OpenLineage

Para activar el proxy de OpenLineage:

1. Añade la siguiente configuración a tu archivo `datadog.yaml`:

   ```yaml
   ol_proxy_config:
     enabled: true
     ddurl: datadoghq.com  # optional - defaults to regular Agent DD_SITE
     api_key: ***  # optional - defaults to regular Agent DD_API_KEY
   ```

2. Después de modificar `datadog.yaml`, reinicia el Datadog Agent para que los cambios surtan efecto:

   ```bash
   sudo systemctl restart datadog-agent
   # Or
   sudo service datadog-agent restart
   ```

Puedes comprobar que el Agent se esté ejecutando y que el proxy esté activo mediante el check de los logs del Datadog Agent.

## Configura tu aplicación para utilizar el proxy

Una vez configurado el Datadog Agent como proxy de OpenLineage, indica a tus aplicaciones que envíen los eventos de OpenLineage al puerto de escucha del Agent en lugar de hacerlo directamente al recopilador de OpenLineage.

### Configura las variables de entorno de OpenLineage

Cambia la variable de entorno `OPENLINEAGE_URL` en el entorno de tu aplicación para que apunte a la dirección proxy del Datadog Agent. Suponiendo que el Datadog Agent se esté ejecutando en el mismo host que tu aplicación y que el Agent esté escuchando en el puerto predeterminado `8126`:

```bash
export OPENLINEAGE_URL="http://localhost:8126"
export OPENLINEAGE_ENDPOINT="openlineage/api/v1/lineage"
```

Si tu Datadog Agent está en un host diferente, sustituye `localhost` con la dirección IP o el nombre de host del Agent.

### Asegúrate de que el cliente de OpenLineage esté configurado correctamente

Tu aplicación debe utilizar una biblioteca cliente de OpenLineage (por ejemplo, `openlineage-python` o `openlineage-dbt`). La biblioteca cliente recoge la variable de entorno `OPENLINEAGE_URL`. No es necesario especificar `OPENLINEAGE_API_KEY`, ya que el Agent utiliza la suya propia.

### Ejecuta tu aplicación

Ejecuta tu aplicación o job (generic) de datos que genera eventos de OpenLineage. Estos eventos se envían al Datadog Agent, que a su vez los reenvía a Datadog.

Ejemplo para dbt Core:

```bash
dbt-ol run --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[2]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[3]: /es/getting_started/site/#access-the-datadog-site
[4]: /es/getting_started/agent/