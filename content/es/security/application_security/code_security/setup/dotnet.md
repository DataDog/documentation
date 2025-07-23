---
aliases:
- /es/security_platform/application_security/getting_started/dotnet
- /es/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: Documentación
  text: Lista de vulnerabilidades a nivel de código compatibles
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con Datadog Code Security
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: Blog
  text: Encontrar vulnerabilidades en tu código con Datadog Code Security
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: Blog
  text: Datadog Code Security logra una precisión del 100% en la prueba de referencia
    OWASP mediante el uso de un enfoque IAST
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Solucionar problemas de Application Security
title: Activación de Code Security para .NET
type: lenguaje de código múltiple
---

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones .NET que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Sigue estos pasos para activar Code Security en tu servicio:

1. [Actualiza tu Datadog Agent][3] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Code Security. Para ver más detalles, consulta la página [Compatibilidad de bibliotecas][4].
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

Para ver Code Security en acción, navega por tu servicio y las vulnerabilidades a nivel de código aparecerán en el [Explorador de vulnerabilidades][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Vídeo que muestra vulnerabilidades del código" video="true" >}}

Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/application_security/code_security/setup/compatibility/dotnet/
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/application_security/code_security/setup/compatibility/