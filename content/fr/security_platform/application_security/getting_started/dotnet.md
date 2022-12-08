---
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security_platform/application_security/add-user-info/
  tag: Documentation
  text: Ajouter des informations utilisateur à des traces
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: Code source de la bibliothèque Datadog .NET
- link: /security_platform/default_rules/#cat-application-security
  tag: Documentation
  text: Règles Application Security Management prêtes à l'emploi
- link: /security_platform/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'Application Security Management
kind: documentation
title: '.NET : Débuter avec ASM'
type: multi-code-lang
---

Vous pouvez surveiller la sécurité de vos applications .NET exécutées dans Docker, Kubernetes, AWS ECS et AWS Fargate. 

{{% appsec-getstarted %}}

## Prise en main

1. **Mettez à jour votre [bibliothèque Datadog .NET][1]** en installant au minimum la version 2.2.0 adaptée à l'architecture de votre système d'exploitation.

   Pour en savoir plus sur les langages et les versions du framework prises en charge par la bibliothèque, consultez [Compatibilité][2].

2. **Activez la solution ASM** en définissant la variable d'environnement `DD_APPSEC_ENABLED` sur `true`. Par exemple, si vous utilisez un système Windows auto-hébergé, exécutez le code PowerShell suivant au sein du script de démarrage de votre application :
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **Ou** utilisez l'une des méthodes suivantes, selon l'environnement depuis lequel votre application est exécutée :

   {{< tabs >}}
{{% tab "Windows auto-hébergé" %}}

Dans une console Windows : 

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

Exécutez la commande PowerShell suivante pour configurer les variables d'environnement requises dans le registre `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`, puis redémarrez IIS.
```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**Ou**, pour les services IIS uniquement, sur WAS et W3SVC avec Powershell en tant qu'administrateur, exécutez :

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

**Ou**, pour éviter d'avoir à modifier les clés de registre, modifiez les paramètres de l'application dans le fichier `web.config` de votre application : 
```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

Cette même méthode peut être utilisée au niveau des pools d'applications IIS, dans le fichier `applicationHost.config`, généralement situé dans `C:\Windows\System32\inetsrv\config\` : 
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

Ajoutez la ligne suivante à la configuration de votre application :
```shell
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "Docker CLI" %}}

Mettez à jour votre conteneur de configuration pour APM en ajoutant l'argument suivant dans votre commande `docker run` : 

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```
{{% /tab %}}
{{% tab "Dockerfile" %}}

Ajoutez la valeur de variable d'environnement suivante dans le Dockerfile de votre conteneur :

```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Mettez à jour le fichier de configuration de déploiement pour APM, et ajoutez la variable d'environnement ASM :

```yaml
spec:
  template:
    spec:
      containers:
        - name: <NOM_CONTENEUR>
          image: <IMAGE_CONTENEUR>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Mettez à jour le fichier JSON de votre définition de tâche ECS en ajoutant la section environment suivante :

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

Ajoutez la ligne suivante dans le Dockerfile de votre conteneur :
```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

3. **Redémarrez l'application** en l'arrêtant totalement et en la relançant.

{{% appsec-getstarted-2-canary %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Page des détails d'un signal de sécurité avec des tags, des métriques, des recommandations de mesures et les adresses IP de la personne malveillante associée à la menace" style="width:100%;" >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /fr/security_platform/application_security/setup_and_configure/?code-lang=dotnet#compatibility