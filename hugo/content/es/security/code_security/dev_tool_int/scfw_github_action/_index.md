---
description: Mantenga los paquetes maliciosos fuera de sus ejecutores de CI/CD con
  la GitHub Action de Datadog para Supply Chain Firewall.
disable_toc: false
further_reading:
- link: /security/code_security/#supply-chain-security-preview
  tag: Documentación
  text: Supply Chain Security
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: Blog
  text: 'Presentamos Supply Chain Firewall de Datadog: Protegiendo a los desarrolladores
    de paquetes de código abierto maliciosos.'
- link: https://www.datadoghq.com/blog/supply-chain-firewall-code-security/
  tag: Blog
  text: Bloquee paquetes maliciosos en toda su organización con Supply Chain Firewall
    y Datadog Code Security
is_beta: true
title: GitHub Action de Supply Chain Firewall
---
La GitHub Action de Supply Chain Firewall instala [Supply Chain Firewall][1] (SCFW) de Datadog y lo configura para interceptar los comandos de los administradores de paquetes compatibles en todos los pasos posteriores del flujo de trabajo. Cuando está activo, SCFW inspecciona cada comando de administrador de paquetes compatible antes de permitir su ejecución.

<div class="alert alert-info">Esta acción solo es compatible con ejecutores de Linux y macOS.</div>

## Uso {#usage}

```yaml
steps:
  - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      version: '3.1.0'
      package-managers: npm,pip

  # npm and pip commands are inspected by SCFW before they run.
  # Flagged packages are blocked; other installs proceed normally.
  - run: pip install -r requirements.txt
  - run: npm install
```

### Configure la integración de Supply Chain Security {#configure-the-supply-chain-security-integration}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="¡Únase a la vista previa!">}}
Utilice este formulario para enviar su solicitud para unirse a la vista previa de seguridad de la cadena de suministro.
{{< /callout >}}

```yaml
steps:
  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      dd-codesec-logger: 'true'
      dd-api-key: ${{ secrets.DD_API_KEY }}
      dd-app-key: ${{ secrets.DD_APP_KEY }}
      dd-site: {{< region-param key="dd_site" >}}
```

### Almacene en caché el directorio `SCFW_HOME` {#cache-the-scfw-home-directory}

El almacenamiento en caché de `SCFW_HOME` evita volver a obtener los datos del verificador en cada ejecución:

```yaml
steps:
  - uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
    with:
      path: ~/.scfw
      key: scfw-${{ runner.os }}

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      scfw-home: ~/.scfw
```

## Cómo funciona {#how-it-works}

1. **Instalar**: La CLI de Supply Chain Firewall se instala con `pipx` en un entorno de Python aislado para que no interfiera con las dependencias del proyecto.

2. **Envolver**: Para cada administrador de paquetes solicitado, la acción escribe un script envoltorio ligero en un directorio temporal y antepone ese directorio a `PATH`. Todos los pasos posteriores que invocan a esos administradores de paquetes se enrutan automáticamente a través de Supply Chain Firewall.

   Cada envoltorio resuelve el binario real en el momento de la llamada eliminando su propio directorio de `PATH` antes de buscar el binario, y luego pasa la ruta resuelta a `scfw run --executable`. Esto ayuda a garantizar que Supply Chain Firewall llame al binario real y no vuelva a invocar al envoltorio.

   La activación de un entorno virtual de Python, como con `source .venv/bin/activate`, tiene prioridad sobre los envoltorios de Supply Chain Firewall durante el resto de ese paso. Use `scfw run pip install ...` explícitamente para cualquier comando que se ejecute dentro de entornos virtuales.

3. **Configurar**: Las variables de entorno relevantes, como `DD_API_KEY` y `SCFW_HOME`, se escriben en `GITHUB_ENV` para que estén disponibles para los pasos posteriores.

   Las variables de entorno escritas en `GITHUB_ENV` son accesibles para todos los pasos posteriores en el trabajo, incluidas las acciones de terceros que se ejecuten después de esta. Si proporciona `dd-api-key` o `dd-app-key`, audite las acciones que siguen en su flujo de trabajo en busca de comportamiento sospechoso o signos de compromiso.

## Entradas {#inputs}

| Entrada | Descripción | Predeterminado |
|-------|-------------|---------|
| `version` | La versión de SCFW que se va a instalar. Use `"latest"` o fije una versión específica (por ejemplo, `"3.1.0"`). | `latest` |
| `package-managers` | Lista separada por comas de los administradores de paquetes que se van a interceptar. Admitido: `npm`, `pip`, `poetry`. | `npm,pip,poetry` |
| `error-on-block` | Haga que el paso del flujo de trabajo falle con un código de salida distinto de cero cuando se bloquee una instalación. | `true` |
| `dd-api-key` | Clave de API de Datadog para reenviar eventos de firewall a Datadog API HTTP o Code Security. Utilice `${{ secrets.DD_API_KEY }}`. | — |
| `dd-app-key` | Datadog application key for forwarding firewall events to the Datadog Code Security API. Use `${{ secrets.DD_APP_KEY }}`. | — |
| `dd-api-logger` | When `"true"`, enables SCFW's Datadog HTTP API logger. Requires `dd-api-key`. | `false` |
| `dd-codesec-logger` | When `"true"`, enables SCFW's Datadog Code Security logger. Requires `dd-api-key` and `dd-app-key`. | `false` |
| `dd-site` | Su sitio de Datadog ({{< region-param key="dd_site" code="true" >}}). Utilizado tanto por `dd-api-logger` como por `dd-codesec-logger`. | `datadoghq.com` |
| `dd-log-level` | Controla qué eventos del firewall se reenvían a Datadog. `ALLOW` registra todos los eventos; `BLOCK` registra solo los eventos bloqueados. | `ALLOW` |
| `scfw-home` | Directorio para la caché local de SCFW. Apunte esto a un directorio en caché para acelerar la obtención de datos del verificador entre ejecuciones. | — |
| `on-warning` | Acción que SCFW debe tomar ante hallazgos de nivel de advertencia: `ALLOW` o `BLOCK`. El valor predeterminado es `BLOCK` en entornos no interactivos. | — |
| `package-minimum-age` | Antigüedad mínima, en horas, que debe alcanzar una versión de paquete antes de que se permita la instalación. | `24` |
| `dd-env` | Etiqueta de entorno de Datadog adjunta a todos los eventos de firewall reenviados. | `ci` |
| `dd-log-attributes` | Un objeto JSON de atributos personalizados para adjuntar a todos los eventos de registro de Datadog reenviados (por ejemplo, `'{"team":"security"}'`). | — |

## Resultados {#outputs}

| Resultado | Descripción |
|--------|-------------|
| `scfw-version` | La versión instalada de Supply Chain Firewall. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/supply-chain-firewall