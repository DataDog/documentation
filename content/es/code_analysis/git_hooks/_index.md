---
description: Evitar la fusión de código con errores
further_reading:
- link: /code_analysis/
  tag: Documentación
  text: Más información sobre el Análisis de código
- link: /code_analysis/static_analysis/
  tag: Documentación
  text: Más información sobre el Análisis estático.
- link: /code_analysis/software_composition_analysis/
  tag: Documentación
  text: Más información sobre Software Composition Analysis
title: Hooks Git
---

## Información general

Un [hook Git](https://git-scm.com/docs/githooks) es un programa que se ejecuta antes de que un usuario envíe código a un repositorio
o a una localización remota. Un hook Git se utiliza generalmente para ejecutar verificaciones
y hacer cumplir requisitos del código antes de que se envíe a la rama remota.

Datadog Code Analysis proporciona un hook Git para comprobar infracciones o secretos
del análisis estático antes de que el código sea enviado o confirmado. El hook Git de análisis de código Datadog 
comprueba el código de la última confirmación y la rama por defecto, y muestra
cualquier error que detecte.

El hook Git de Datadog advierte a los desarrolladores antes de que envíen cualquier código
que contenga errores de codificación, vulnerabilidades o secretos. Cuando confirmas código con un error,
en el terminal del usuario aparece un mensaje como el siguiente:

{{< img src="code_analysis/git_hooks/git_hook.png" alt="Hook Git de Datadog analizando vulnerabilidades" style="width:100%;">}}

## Configuración

1. Descarga el programa `datadog-git-hook` desde la página de la versión o de las versiones del [analizador estático
de Datadog](https://github.com/DataDog/datadog-static-analyzer/releases).
2. Instala el programa en tu ordenador.
3. Añade un archivo `.git/hooks/pre-push` en el repositorio con el script de abajo. **Nota:** El script asume que el binario `datadog-static-analyzer-git-hook` está en `/usr/local/bin/datadog-static-analyzer-git-hook`.

```bash
#!/bin/sh

# Obtener la ruta raíz del repositorio
repo_path=$(git rev-parse --show-toplevel)

# Asegurarse de que el cliente proporcione alguna información
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
 - `--static-analysis`: Activa el análisis estático.
 - `--secrets`: Activa la detección de secretos (beta privada).
 - `--output <file>`: Exporta los resultados de la confirmación a un archivo SARIF.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}