---
aliases:
- /fr/security_platform/application_security/getting_started/dotnet
- /fr/security/application_security/getting_started/dotnet
- /fr/security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
- /fr/security/application_security/threats/setup/threat_detection/dotnet
- /fr/security/application_security/threats_detection/dotnet
- /fr/security/application_security/setup/aws/fargate/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Ajouter des informations utilisateur à des traces
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Code source
  text: Code source de la bibliothèque Datadog .NET
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Activation de l'AAP pour .NET
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Vous pouvez surveiller la protection des applications et des API pour les applications .NET exécutées dans Docker, Kubernetes, Amazon ECS et AWS Fargate.

{{% appsec-getstarted %}}

## Activation de la détection des menaces {#enabling-threat-detection}
### Démarrer {#get-started}

1. **Mettez à jour votre [bibliothèque Datadog .NET][1]** vers au moins la version 2.2.0 pour l'architecture de votre système d'exploitation cible.

   Pour vérifier que les versions du langage et du framework de votre service sont prises en charge pour les fonctionnalités AAP, consultez [Compatibilité][2].

2. **Activez AAP** en définissant la variable d'environnement `DD_APPSEC_ENABLED` sur `true`. Par exemple, sur Windows auto-hébergé, exécutez l'extrait PowerShell suivant dans le cadre de votre script de démarrage d'application :
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **Ou** l'une des méthodes suivantes, selon l'endroit où votre application s'exécute :

   {{< tabs >}}
{{% tab "Windows auto-hébergé" %}}

Dans une console Windows :

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

Exécutez la commande PowerShell suivante en tant qu'administrateur pour configurer les variables d'environnement nécessaires dans le registre `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` et redémarrez IIS.

```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**Ou**, pour les services IIS exclusivement, sur WAS et W3SVC avec PowerShell en tant qu'administrateur, exécutez :

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

**Ou**, pour éviter de modifier les clés de registre, modifiez les paramètres d'application dans le fichier `web.config` de votre application :

```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

Cela peut également être effectué au niveau des pools d'applications IIS dans le fichier `applicationHost.config`, généralement dans `C:\Windows\System32\inetsrv\config\` :

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

```conf
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "Docker CLI" %}}

Mettez à jour votre conteneur de configuration pour l'APM en ajoutant l'argument suivant dans votre commande `docker run` :

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Ajoutez la valeur de variable d'environnement suivante le Dockerfile de votre conteneur :

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Mettez à jour votre fichier de configuration de déploiement pour APM et ajoutez la variable d'environnement AAP :

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

Mettez à jour le fichier JSON de votre définition de tâche ECS en ajoutant la section environnement suivante :

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
{{% tab "AWS Fargate" %}}

Ajoutez la ligne suivante dans le Dockerfile de votre conteneur :

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

3. **Redémarrez l'application** en effectuant un arrêt et un démarrage complets.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant l'explorateur de signaux et ses détails, ainsi que l'explorateur de vulnérabilités et ses détails." video="true" >}}

## Utilisation d'AAP sans traçage APM {#using-aap-without-apm-tracing}

Si vous souhaitez utiliser [App and API Protection] sans la fonctionnalité de traçage APM, vous pouvez déployer avec le traçage désactivé :

1. Configurez votre SDK avec la variable d'environnement `DD_APM_TRACING_ENABLED=false` en plus de la variable d'environnement `DD_APPSEC_ENABLED=true`.
2. Cette configuration réduira la quantité de données APM envoyées à Datadog au minimum requis par les produits App and API Protection.

Pour plus de détails, consultez [Standalone App and API Protection][standalone_billing_guide].
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

{{% aap/aap_and_api_protection_verify_setup %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /fr/security/application_security/setup/compatibility/dotnet/
[3]: /fr/agent/versions/upgrade_between_agent_minor_versions/
[4]: /fr/security/application_security/setup/compatibility/