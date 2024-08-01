---
aliases:
- /security_platform/application_security/getting_started/dotnet
- /security/application_security/getting_started/dotnet
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


## Habilitación de la seguridad del código

Si tu servicio ejecuta una [versión de biblioteca de rastreo compatible con la detección de vulnerabilidades de la seguridad del código][2], habilita la capacidad configurando la variable de entorno `DD_IAST_ENABLED=true` y reiniciando tu servicio.

Para aprovechar las capacidades de detección de vulnerabilidades a nivel de código para tu servicio:

1. [Actualiza tu Datadog Agent][3] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo al menos a la versión mínima necesaria para activar la seguridad del código. Para obtener más información, consulta [Funciones compatibles de ASM][4].
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación. Por ejemplo, en Windows autoalojado, ejecuta el siguiente fragmento de PowerShell como parte del script de inicio de la aplicación:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

 {{< tabs >}}
{{% tab "Windows autoalojado" %}} 

En una consola de Windows:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```
{{% /tab %}}

{{% tab "IIS" %}} 

Ejecuta el siguiente comando de PowerShell como administrador para configurar las variables de entorno necesarias en el registro `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` y reinicia IIS.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```
{{% /tab %}}


{{% tab "Linux" %}} 

Añade lo siguiente a la configuración de tu aplicación:

```
DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "CLI Docker" %}} 

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando docker run:

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```
{{% /tab %}}

{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```
ENV DD_IAST_ENABLED=true
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
            - name: DD_IAST_ENABLED
              value: "true"
``` 
{{% /tab %}}

{{% tab "AWS ECS" %}}

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```
{{% /tab %}}

{{% tab "AWS Fargate" %}} 

Añade la siguiente línea a tu contenedor Dockerfile:

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
   {{< /tabs >}}


## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/application_security/enabling/compatibility/dotnet
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/application_security/enabling/compatibility/