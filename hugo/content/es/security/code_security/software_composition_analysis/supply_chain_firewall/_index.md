---
description: Bloquee paquetes de código abierto maliciosos y publicados recientemente
  durante la instalación con Supply Chain Firewall de Datadog.
disable_toc: false
further_reading:
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: Blog
  text: 'Presentamos Supply Chain Firewall de Datadog: Protegiendo a los desarrolladores
    de paquetes de código abierto maliciosos.'
title: Supply Chain Firewall
---
{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="¡Únase a la vista previa!">}}
Supply Chain Firewall está en vista previa.
{{< /callout >}}

Supply Chain Firewall (SCFW) evita que paquetes de código abierto maliciosos entren en sus entornos de desarrollo en el momento de la instalación, antes de que lleguen a los repositorios o a las canalizaciones de CI/CD.

SCFW envuelve los comandos del administrador de paquetes compatibles (`npm`, `pip` y `poetry`). Cuando ejecuta un comando de instalación a través de SCFW, este evalúa el paquete frente a la [fuente de inteligencia de amenazas][1] de Datadog Security Research de paquetes de código abierto conocidos como maliciosos y comprometidos, así como frente a las políticas personalizadas de permitir y bloquear que usted configure para su organización.

Basado en estas verificaciones, SCFW produce uno de tres resultados para el comando:

- **Permitir**: No se encuentran problemas y la instalación continúa normalmente.
- **Advertir**: Informa hallazgos no críticos y le solicita confirmar si desea continuar.
- **Bloquear**: Informa un hallazgo crítico, generalmente indicando que se sabe que un paquete es malicioso, y bloquea la instalación con un mensaje accionable que explica el motivo.

## Instale la CLI {#install-the-cli}

Instale la CLI de SCFW localmente para que los comandos del administrador de paquetes puedan ser inspeccionados antes de que se instalen los paquetes. 

SCFW se distribuye como un único binario de Go sin dependencias de tiempo de ejecución, y se ejecuta en macOS y distribuciones comunes de Linux. Windows no es compatible.

Puede instalar SCFW 4.0.0 y versiones posteriores con Go o con una versión de GitHub. 

Para inspeccionar los comandos del administrador de paquetes en CI en lugar de localmente, consulte la [Acción de GitHub de Supply Chain Firewall][3].

### Instale con Go {#install-with-go}

Use `go install` si tiene Go 1.26 y desea la ruta más rápida hacia una CLI funcional.

```bash
go install github.com/DataDog/supply-chain-firewall/scfw@latest
```

Esto instala el binario `scfw` en `$(go env GOPATH)/bin`. Agregue ese directorio a su `PATH` si aún no está allí.

### Instale con un lanzamiento de GitHub {#install-with-a-github-release}

Instale con una versión de GitHub si no tiene Go instalado, o si desea fijar y verificar una versión específica.

Descargue el binario para su sistema operativo y arquitectura desde el [lanzamiento más reciente de GitHub][2]. Antes de ejecutar estos comandos, reemplace el valor de `scfw_expected_checksum` con la suma de verificación publicada para ese binario en la página del lanzamiento.

```bash
# Replace this placeholder with the checksum from the release page.
scfw_expected_checksum="<expected-sha256-checksum>"

# Detect the operating system used in the release artifact name.
case "$(uname -s)" in
    Darwin) scfw_os=darwin ;;
    Linux)  scfw_os=linux ;;
    *) echo "Unsupported operating system: $(uname -s)" >&2; exit 1 ;;
esac

# Detect the CPU architecture used in the release artifact name.
case "$(uname -m)" in
    x86_64)        scfw_arch=amd64 ;;
    arm64|aarch64) scfw_arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

# Download the binary for the detected platform.
scfw_binary="scfw-${scfw_os}-${scfw_arch}"
curl -fLO "https://github.com/DataDog/supply-chain-firewall/releases/latest/download/${scfw_binary}"

# Calculate the downloaded binary's checksum and compare it against the published value.
scfw_actual_checksum=$(sha256sum "${scfw_binary}" | awk '{print $1}')
if [ "${scfw_actual_checksum}" != "${scfw_expected_checksum}" ]; then
    echo "Checksum verification failed" >&2
    exit 1
fi

# Install the verified binary in a directory on PATH.
chmod +x "${scfw_binary}"
sudo install "${scfw_binary}" /usr/local/bin/scfw
```

## Configure su entorno {#configure-your-environment}

Configure SCFW para almacenar sus credenciales de Datadog y configurar alias de shell para que los comandos del administrador de paquetes compatibles se enruten automáticamente a través de SCFW.

```bash
scfw configure \
    --dd-api-key=<DD_API_KEY> \
    --dd-app-key=<DD_APP_KEY> \
    --dd-site=<DD_SITE> \
    --alias-npm \
    --alias-pip \
    --alias-poetry
```

El comando de configuración realiza varios pasos distintos:

- Almacena sus claves de API y de aplicación de forma segura en el llavero de su sistema.

   <div class="alert alert-tip">Puede proporcionar sus credenciales y sitio de Datadog con las variables de entorno `DD_API_KEY`, `DD_APP_KEY` y `DD_SITE` en lugar de pasarlas como flags. Las variables de entorno tienen prioridad sobre las credenciales almacenadas en el llavero del sistema.</div>

- Agrega la configuración de alias de SCFW a los archivos rc de su shell (cualquiera de `.bashrc`, `.bash_profile`, `.zshrc` y `.zprofile` que ya existan). Reinicie su shell, o aplique el archivo rc correspondiente, para que los alias surtan efecto.

   <div class="alert alert-tip">Las opciones de alias son aditivas: los alias agregados por una ejecución anterior permanecen vigentes a menos que pase la opción `--remove-alias-*` correspondiente. El comando administra un bloque claramente delimitado y gestionado por SCFW en sus archivos rc de shell, y no toca nada más en esos archivos.</div>

- Habilita el reenvío de registro a Datadog. Consulte [Integración de Supply Chain Firewall][4] para obtener más detalles.

El comando de configuración acepta estas opciones:

| Opción | Descripción |
| --- | --- |
| `--dd-api-key` | Clave de Datadog API utilizada para la evaluación y generación de informes de políticas. |
| `--dd-app-key` | Clave de aplicación de Datadog utilizada para la evaluación y generación de informes de políticas. |
| `--dd-site` | Parámetro de sitio de Datadog utilizado para la evaluación y generación de informes de políticas (predeterminado: `datadoghq.com`). |
| `--alias-npm` | Agregue un alias de shell para ejecutar todos los comandos npm a través de SCFW. |
| `--remove-alias-npm` | Elimine el alias de shell npm administrado por SCFW. |
| `--alias-pip` | Agregue alias de shell para ejecutar todos los comandos pip/pip3 a través de SCFW. |
| `--remove-alias-pip` | Elimine los alias de shell pip/pip3 administrados por SCFW. |
| `--alias-poetry` | Agregue un alias de shell para ejecutar todos los comandos poetry a través de SCFW. |
| `--remove-alias-poetry` | Elimine el alias de shell poetry administrado por SCFW. |
| `--scfw-home` | Directorio que SCFW puede usar como caché local. |
| `--remove` | Elimine toda la configuración administrada por SCFW. |

Para verificar si sus credenciales y alias están configurados correctamente, ejecute:

```bash
scfw doctor
```

## Inspeccione un paquete durante la instalación {#inspect-a-package-during-install}

Después de instalar y configurar SCFW, los comandos `npm`, `pip` y `poetry` se enrutan automáticamente a través de SCFW. 

Para inspeccionar un comando manualmente, anteponga `scfw run --`:

```bash
scfw run -- npm install react
scfw run -- pip install -r requirements.txt
```

El comando `scfw run` admite estas opciones:

| Opción | Descripción |
| --- | --- |
| `--executable` | Ejecutable del administrador de paquetes a utilizar para ejecutar comandos (predeterminado: determinado por el entorno). |
| `--error-on-block` | Trata los comandos bloqueados como errores, lo que significa una salida distinta de cero. Útil para scripting y CI. |
| `--allow-on-warning` | Permite de forma no interactiva comandos que solo tienen hallazgos de nivel de advertencia. |
| `--block-on-warning` | Bloquea comandos de forma no interactiva solo con hallazgos de nivel de advertencia. |

La variable de entorno `SCFW_ON_WARNING` (`allow` o `block`) tiene el mismo efecto que `--allow-on-warning` o `--block-on-warning`, y tiene prioridad cuando está configurada. Una variable de entorno es útil para aplicar una política coherente en un entorno de CI sin cambiar cada invocación. En contextos no interactivos sin terminal, SCFW no puede solicitar confirmación, por lo que bloquea los resultados de nivel de advertencia de forma predeterminada a menos que `--allow-on-warning`, `--block-on-warning` o `SCFW_ON_WARNING` estén configurados.

## Compatibilidad {#compatibility}

SCFW admite estas versiones de administrador de paquetes y subcomandos:

| Administrador de paquetes | Versiones admitidas | Subcomandos inspeccionados |
|------------------|--------------------|-------------------------|
| npm | 7.0 y posteriores | `install` (incluidos alias) |
| pip | 22.2 y posteriores | `install` |
| poetry | 1.7 y posteriores | `add`, `install`, `sync`, `update` |

Los subcomandos distintos a los especificados siempre se ejecutan sin inspección.

Si una versión del administrador de paquetes es inferior a su versión mínima admitida, SCFW se niega a ejecutar subcomandos inspeccionados para ella, en lugar de permitir que se ejecuten sin inspección. Este comportamiento de bloqueo en caso de error tiene la intención de impedir instalaciones maliciosas conocidas. Actualice a una versión admitida para inspeccionar comandos normalmente.

## Desinstale SCFW {#uninstall-scfw}

Desinstalar SCFW elimina la CLI y la configuración que administra de su entorno.

Antes de eliminar el binario, ejecute `scfw configure --remove` para eliminar la configuración administrada por SCFW de su entorno:

```bash
scfw configure --remove
```

Luego elimine el binario `scfw`, por ejemplo, borrándolo de `/usr/local/bin`, o de `$(go env GOPATH)/bin` si lo instaló con `go install`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://github.com/DataDog/supply-chain-firewall/releases/latest
[3]: /es/security/code_security/dev_tool_int/scfw_github_action/
[4]: /es/integrations/supply-chain-firewall/