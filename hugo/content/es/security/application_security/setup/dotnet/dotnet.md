---
aliases:
- /es/security_platform/application_security/getting_started/dotnet
- /es/security/application_security/getting_started/dotnet
- /es/security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
- /es/security/application_security/threats/setup/threat_detection/dotnet
- /es/security/application_security/threats_detection/dotnet
- /es/security/application_security/setup/aws/fargate/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Adición de información de usuario a las trazas
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente de la biblioteca .NET de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de AAP para .NET
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Puede hacer un seguimiento de la protección de aplicaciones y API para aplicaciones .NET que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas {#enabling-threat-detection}
### Comience {#get-started}

1. **Actualice su [biblioteca .NET de Datadog][1]** al menos a la versión 2.2.0 para la arquitectura de su sistema operativo de destino.

   Para verificar que las versiones del lenguaje y el marco de trabajo de su servicio sean compatibles con las capacidades de AAP, consulte [Compatibilidad][2].

2. **Habilite AAP** configurando la variable de entorno `DD_APPSEC_ENABLED` en `true`. Por ejemplo, en Windows autohospedado, ejecute el siguiente fragmento de PowerShell como parte de su script de inicio de la aplicación:
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **O** uno de los siguientes métodos, dependiendo de dónde se ejecute su aplicación:

   {{< tabs >}}
{{% tab "Windows autohospedado" %}}

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

Ejecute el siguiente comando de PowerShell como administrador para configurar las variables de entorno necesarias en el registro `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` y reinicie IIS.

```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**O**, exclusivamente para servicios de IIS, en WAS y W3SVC con PowerShell como administrador, ejecute:

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

**O**, para evitar editar las claves del registro, edite la configuración de la aplicación en el archivo `web.config` de su aplicación:

```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

Esto también se puede hacer a nivel de grupos de aplicaciones de IIS en el archivo `applicationHost.config`, generalmente en `C:\Windows\System32\inetsrv\config\`:

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

Agregue lo siguiente a la configuración de su aplicación:

```conf
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "CLI de Docker" %}}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualice su archivo de configuración de implementación para APM y agregue la variable de entorno AAP:

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

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

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

Agregue la siguiente línea al Dockerfile de su contenedor:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

3. **Reinicie la aplicación** realizando un ciclo completo de parada e inicio.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra Signals explorer y detalles, y Vulnerabilities explorer y detalles." video="true" >}}

## Uso de AAP sin rastreo de APM {#using-aap-without-apm-tracing}

Si desea utilizar App and API Protection sin la funcionalidad de traza de APM, puede desplegar con la traza deshabilitada:

1. Configure su SDK con la variable de entorno `DD_APM_TRACING_ENABLED=false` además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reducirá la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos App and API Protection.

Para obtener más detalles, consulte [Standalone App and API Protection][standalone_billing_guide].
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

{{% aap/aap_and_api_protection_verify_setup %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/application_security/setup/compatibility/dotnet/
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/application_security/setup/compatibility/