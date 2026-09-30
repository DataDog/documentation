---
aliases:
- /es/code_analysis/git_hooks/
description: Evitar la fusión de código con errores
title: Hooks Git
---

## Información general

Un [hook Git](https://git-scm.com/docs/githooks) es un programa que se ejecuta antes de que un usuario envíe código a un repositorio
o a una localización remota. Un hook Git se utiliza generalmente para ejecutar verificaciones
y hacer cumplir requisitos del código antes de que se envíe a la rama remota.

Datadog Code Security proporciona un hook Git para comprobar infracciones o secretos
de Static Code Analysis (SAST) antes de que el código sea enviado o confirmado. El hook Git de Code Security 
comprueba el código del último commit y la rama por defecto, y marca
cualquier error que detecte.

El hook Git de Datadog advierte a los desarrolladores antes de que envíen cualquier código
que contenga errores de codificación, vulnerabilidades o secretos. Cuando confirmas código con un error,
en el terminal del usuario aparece un mensaje como el siguiente:

{{< img src="code_security/git_hooks/git_hook.png" alt="Hook Git de Datadog detectando vulnerabilidades" style="width:100%;">}}

## Configuración

1. Descarga el programa `datadog-git-hook` desde la página de la versión o de las versiones del [analizador estático de Datadog].
de Datadog](https://github.com/DataDog/datadog-static-analyzer/releases).
2. Instala el programa en tu ordenador.
3. Añade un archivo `.git/hooks/pre-push` en el repositorio con el script de abajo. **Nota:** El script asume que el binario `datadog-static-analyzer-git-hook` está en `/usr/local/bin/datadog-static-analyzer-git-hook`.

```bash
#!/bin/sh

# Get the repo root path
repo_path=$(git rev-parse --show-toplevel)

# Make sure the user can provide some input
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --static-analysis --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

El programa acepta los siguientes parámetros:

 - `--confirmation`: Pide confirmación al usuario para anular el check del hook Git.
 - `--default-branch`: Especifica el nombre de la rama por defecto.
 - `--static-analysis`: Activa Static Code Analysis.
 - `--secrets`: Activa la detección de secretos (en vista previa, ponte en contacto con el [servicio de asistencia de Datadog][1]).
 - `--output <file>`: Exporta los resultados de la confirmación a un archivo SARIF.

[1]: https://www.datadoghq.com/support/