---
aliases:
- /security_platform/application_security/getting_started/dotnet
- /security/application_security/getting_started/dotnet
- /security/application_security/enabling/dotnet/
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente de la biblioteca .NET de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para .NET
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones .NET que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Para empezar

1. **Actualiza la [biblioteca .NET de Datadog][1]** al menos a la versión 2.2.0 (o a la versión 2.16.0 para las funciones de detección del análisis de composición de software) para la arquitectura del sistema operativo de destino.

   Para verificar que las versiones del lenguaje y del marco del servicio son compatibles con las funciones de ASM, consulta [Compatibilidad][2].

2. **Habilita ASM** estableciendo la variable de entorno `DD_APPSEC_ENABLED` en `true`. Por ejemplo, en Windows autoalojado, ejecuta el siguiente fragmento de PowerShell como parte del script de inicio de la aplicación:
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **O** uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   {{< tabs >}}
{{% tab "Windows autoalojado" %}}

En una consola de Windows:

```
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_APPSEC_ENABLED=true

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}
{{% tab "IIS" %}}

Ejecuta el siguiente comando de PowerShell como administrador para configurar las variables de entorno necesarias en el registro `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` y reinicia IIS.
```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**O**, para servicios de IIS exclusivamente, en WAS y W3SVC con PowerShell como administrador, ejecuta:

```
$appsecPart = "DD_APPSEC_ENABLED=true"
[string[]] $defaultvariable = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}", $appsecPart)

function Add-AppSec {

    param (
        $path
    )
    $v = (Get-ItemProperty -Path $path).Environment
    If ($v -eq $null) {
        Set-ItemProperty -Path $path -Name "Environment" -Value $defaultvariable
    }
    ElseIf (-not ($v -match $appsecPart)) {
        $v += " " + $appsecPart;
        Set-ItemProperty -Path $path -Name "Environment" -Value $v
    }
}
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\WAS\"
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\W3SVC\"

net stop was /y
net start w3svc
```

**O**, para evitar la edición de las claves de registro, edita la configuración de la aplicación en el archivo `web.config` de tu aplicación:
```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

Esto también puede hacerse a nivel de grupo de aplicaciones de IIS en el archivo `applicationHost.config`, normalmente en `C:\Windows\System32\inetsrv\config\`:
```xml
<system.applicationHost>

    <applicationPools>
        <add name="DefaultAppPool">
            <environmentVariables>
                <add name="DD_APPSEC_ENABLED" value="true" />
            </environmentVariables>
            (...)
```

{{% /tab %}}
{{% tab "Linux" %}}

Añade lo siguiente a la configuración de tu aplicación:
```conf
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "CLI Docker" %}}

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza tu archivo de configuración de despliegue para APM y añade la variable de entorno de ASM:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Añade la siguiente línea a tu contenedor Dockerfile:
```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

3. **Reinicia la aplicación** deteniéndola por completo y volviéndola a iniciar.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/application_security/enabling/compatibility/dotnet
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/application_security/enabling/compatibility/