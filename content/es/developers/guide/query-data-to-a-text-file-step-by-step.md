---
aliases:
- /es/developers/faq/query-data-to-a-text-file-step-by-step
kind: guía
title: Consulta de datos a un archivo de texto, paso a paso
---

Este artículo explica cómo configurar un entorno para sacar el máximo partido de la API de Datadog e incluye cómo extraer o enviar eventos, métricas y monitores desde [API pública de Datadog][1] a un archivo local.

Requisito: Python y `pip` instalados en tu host local. Los usuarios de Windows pueden consultar [Instalación de Python 2 en Windows][2].

1. Abre un terminal.
2. Verifica el directorio: `pwd` en macOS, `dir` en Windows.
3. Crea una nueva carpeta: `mkdir <NAME_OF_THE_FOLDER>`.
4. Introduce la carpeta: `cd <NAME_OF_THE_FOLDER>`.
5. Descarga el script [api_query_data.py][3] en la carpeta creada en el paso 3 y edítalo:

    a. Sustituye `<YOUR_DD_API_KEY>` y `<YOUR_DD_APP_KEY>` por tus [claves de API de Datadog y claves de aplicación][4].

    b. Sustituye `system.cpu.idle` por una métrica que desees recuperar. Una lista de tus métricas aparece en el [resumen de métrica de Datadog][5].

    c. Opcionalmente, sustituye `*` por un host para filtrar los datos. Una lista de tus hosts aparece en la [lista de infraestructura de Datadog][6].

    d. Opcionalmente, cambia el periodo para recopilar los datos. El ajuste actual es 3600 segundos (una hora). **Nota**: Si ejecutas esto de forma demasiado agresiva, puedes alcanzar los [límites de la API de Datadog][7].

    e. Guarda tu archivo y confirma tu localización.

Una vez completado lo anterior:

1. Es una práctica recomendada para crear un entorno virtual en el que instalar los paquetes de Python. Un gestor virtual de entorno es [virtualenv][8].
2. Crea un nuevo entorno virtual en el directorio que creaste anteriormente ejecutando `virtualenv venv`.
3. Activa el entorno al ejecutar `source venv/bin/activate` (Mac/Linux) o `> \path\to\env\Scripts\activate` (Windows).
4. Ejecuta `pip install datadog` para instalar el [paquete de API de Datadog][9]. Esto permite que el archivo de Python interactúe con la API de Datadog.
5. En el terminal, ejecuta el script: `python api_query_data.py`.

Si tienes éxito, tus datos se muestran en el terminal y se crea un archivo en tu carpeta llamado `out.txt`.

Consulta ejemplos adicionales en la [documentación de la API de Datadog][1].

[1]: /es/api/
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /resources/python/api_query_data.py
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: /es/api/latest/rate-limits/
[8]: https://virtualenv.pypa.io/en/stable
[9]: https://pypi.org/project/datadog