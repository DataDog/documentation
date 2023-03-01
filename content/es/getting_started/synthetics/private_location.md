---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Monitoriza tus localizaciones privadas Synthetic con Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Crea tu primer test de API
- link: /getting_started/synthetics/browser_test
  tag: Documentación
  text: Crea tu primer test de navegador
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
kind: documentación
title: Empezando con las localizaciones privadas
---

<div class="alert alert-info">
Si quieres unirte a la versión beta de la localización privada de Windows, ponte en contacto con el <a href="https://docs.datadoghq.com/help/">equipo de asistencia de Datadog</a>.
</div>

## Información general

Las localizaciones privadas te permiten **monitorizar aplicaciones internas** o direcciones URL privadas que no son accesibles a través de la red pública de Internet.

{{< img src="getting_started/synthetics/pl-list.png" alt="Lista de localizaciones privadas en tu página de configuración" style="width:100%;">}}

También puedes utilizar las localizaciones privadas para:

- **Crear localizaciones personalizadas** en áreas consideradas críticas para el desarrollo de tu negocio.
- **Verificar el rendimiento de la aplicación en tu entorno de testeo interno** antes de lanzar nuevas funciones a la fase de producción con [tests Synthetic en tus pipelines de integración/distribución continuas (CI/CD)][1].
- **Comparar el rendimiento de la aplicación** desde dentro y fuera de tu red interna.

Las localizaciones privadas son contenedores Docker que puedes instalar en cualquier parte dentro tu red privada. Puedes acceder a la [imagen del worker de la localización privada][2] desde Container Registry de Google.

Una vez que hayas creado e instalado tu localización privada, puedes asignar [tests Synthetic][3] a tu localización privada igual que harías con una localización gestionada.

Los resultados de los tests de las localizaciones privadas se muestran de forma idéntica a los resultados de los tests de la localización gestionada.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asignar un test Synthetic a localizaciones privadas" style="width:100%;">}}

## Crea tu localización privada

1. Instala [Docker][4] en una máquina con un sistema que funcione como Unix o utiliza otra herramienta de gestión de contenedores como, por ejemplo, [Podman][10].

   Para empezar cuanto antes, puedes instalar Docker en una máquina virtual, como puede ser [Vagrant en Ubuntu 22.04][11].

2. En el sitio de Datadog, pasa el cursor sobre **[UX Monitoring][5]** (Monitorizar la experiencia de uso) y selecciona *Settings** > **Private Locations** (Configuración > Localizaciones privadas).
3. Haz clic en **Add Private Location** (Añadir localización privada).
4. Rellena los datos de tu localización privada. Solo los campos `Name` y `API key` son obligatorios. Si estás configurando una localización privada para Windows, selecciona **This is a Windows Private Location** (Esta es una localización privada de Windows).
5. Haz clic en **Save Location and Generate Configuration File** (Guardar localización y generar archivo de configuración) para crear el archivo de configuración asociado a la localización privada en tu worker.
6. Dependiendo de dónde hayas instalado tu localización privada, es posible que tengas que introducir parámetros adicionales en el archivo de configuración:
    - Si utilizas un proxy, introduce la URL del siguiente modo: `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.
    - Si quieres bloquear direcciones IP reservadas, activa **Block reserved IPs** (Bloquear IP reservadas) e introduce los rangos de IP.

   Para obtener más información, consulta las [opciones de configuración de las localizaciones privadas][6] y cómo [realizar tests Synthetic desde localizaciones privadas][7].
7. Copia y pega el archivo de configuración de tu localización privada en tu directorio de trabajo.

    **Nota**: El archivo de configuración contiene secretos para autenticar la localización privada, descifrar la configuración del test y cifrar sus resultados. Datadog no almacena estos secretos, así que guárdalos en una unidad local antes de salir del formulario de creación de **localizaciones privadas**. **Para poder añadir más workers a tu localización privada, es necesario que puedas volver a consultar estos secretos**.
8. Cuando lo tengas todo listo, haz clic en **View Installation Instructions** (Ver instrucciones de instalación).
9. Sigue las instrucciones de instalación en función del entorno en el que quieras ejecutar el worker de la localización privada.
10. Si utilizas Docker, por ejemplo, activa tu worker como un contenedor independiente utilizando el comando `run` de Docker y tu archivo de configuración:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    Este comando inicia un contenedor Docker y prepara tu localización privada para realizar tests. Datadog recomienda ejecutar el contenedor en modo separado con la política de reinicio adecuada.

    <div class="alert alert-info">Puedes utilizar otra herramienta de gestión de contenedores, como Podman. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">documentación acerca de las localizaciones privadas</a>.</div>

11. Si tu localización privada envía información correctamente a Datadog, aparecerá un `OK` en **Private Location Status** (Estado de la localización privada) y en la lista de **Private Locations** (Localizaciones privadas) de la página **Settings** (Configuración):

    {{< img src="synthetics/private_locations/pl_health.png" alt="Estado de localización privada" style="width:100%;">}}

    Además, puedes ver los logs de una localización privada en tu terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
12. Una vez que hayas terminado con todos los tests de tu endpoint interno, haz clic en **OK**.
## Ejecuta tests Synthetic con tu localización privada

Utiliza tu nueva localización privada como si fuese una localización gestionada en tus test de Synthetic.

1. Crea un [test de API][2], un [test de API multipaso][8] o un [test de navegador][9] en cualquier endpoint interno o aplicación que quieras monitorizar.
2. En la sección **Private Locations**, selecciona tu nueva localización privada:

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Asignar un test Synthetic a una localización privada" style="width:100%;">}}

3. ¡Continúa rellenando el test!

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /es/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /es/synthetics/private_locations/configuration/#configuration-options
[7]: /es/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /es/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /es/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64