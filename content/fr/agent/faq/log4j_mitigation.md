---
further_reading:
- link: /integrations/guide/jmx_integrations/
  tag: Documentation
  text: Quelles intégrations utilisent Jmxfetch ?

title: Réduire les risques d'exécution de code à distance via la faille de sécurité
  Log4Shell
---

Si vous utilisez une version de l'Agent Datadog comprise entre la v7.17.0/v6.17.0 et la v7.32.2/v6.32.2, vous êtes peut-être affecté par la vulnérabilité Log4Shell (CVE-2021-44228 et CVE-2021-45046). Si vous utilisez une version de l'Agent antérieure à la v7.17.0/v6.17.0, vous n'êtes normalement pas concerné par la vulnérabilité, sauf si vous avez configuré log4j de façon à ce qu'il utilise l'appender JMS (cette option n'est pas pris en charge par l'Agent, mais assurez-vous de désactiver l'appender si vous êtes dans ce cas de figure).

**Le moyen le plus efficace d'éliminer la vulnérabilité est de passer à la v7.32.3 (v6.32.3) ou une version ultérieure de l'Agent Datadog.**

Si vous ne savez pas quelle version de l'Agent vous utilisez, consultez la section [Vérifier si votre version de l'Agent est vulnérable](#verifier-si-votre-version-de-l-agent-est-vulnerable).

## Mise à jour de l'Agent

Pour mettre à jour les composants principaux de l'Agent Datadog depuis et vers une version mineure sur un host ou un conteneur donné, exécutez la [commande d'installation correspondant à votre plateforme][1].

## Si vous ne pouvez pas mettre à jour votre Agent

Si vous ne pouvez pas mettre à jour votre Agent pour le moment, suivez ces instructions pour [supprimer la classe JndiLookup.class](#supprimer-la-classe-jndilookupclass) ou [implémenter une variable d'environnement](#definir-la-variable-d-environnement-log4j_format_msg_no_lookups) (`LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` sur le processus JMXFetch ou le processus de l'Agent) pour corriger partiellement la vulnérabilité.

# Supprimer la classe JndiLookup.class

**Le moyen le plus efficace d'éliminer la vulnérabilité est de passer à la v7.32.3 (v6.32.3) ou une version ultérieure de l'Agent Datadog.**

Suppression de la classe JndiLookup.class [élimine entièrement les vulnérabilités CVE-2021-44228 et CVE-2021-45046][2].

**Remarque** : cette mitigation n'est pas nécessaire si vous utilisez la version 7.32.3 ou 6.32.3 de l'Agent. Dans ces versions, JMXFetch utilise log4j v2.12.2, qui n'est pas affecté par la vulnérabilité CVE-2021-45046 ou CVE-2021-44228.

### Linux et macOS

Enregistrez le code suivant sous forme de script bash nommé `jndi_cleanup.sh`, puis exécutez le script pour patcher le fichier jmxfetch.jar spécifié.

```bash
#!/bin/bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)

TARGET="/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar"
JNDI_CLASS="org/apache/logging/log4j/core/lookup/JndiLookup.class"

set -e

VALIDATE=0
if [ $# -eq 1 ]; then
    case "$1" in
        -c)
            VALIDATE=1 ;;
        *)
            echo "$1 is not a supported option"
            exit 1 ;;
    esac
fi

if ! command -v zip &> /dev/null
then

    if [[ ! -z $YUM_CMD ]]; then
        yum install zip
    elif [[ ! -z $APT_GET_CMD ]]; then
        apt-get update
        apt-get -y install zip
    fi
fi

if [ $VALIDATE -eq 0 ]; then
    zip -q -d $TARGET $JNDI_CLASS
else
    if [ -z $(zip -sf /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar  | grep -i jndilookup.class) ]; then
        echo "The $TARGET JAR is now safe to run.";
    else
        echo "The $TARGET JAR is not safe to run as it still contains $JNDI_CLASS!";
        exit 1;
    fi
fi

exit 0;

```

Rendez le script exécutable :
```bash
chmod +x ./jndi_cleanup.sh
```

Supprimez la classe JndiLogger.class du fichier jmxfetch.jar en exécutant :

```bash
sudo ./jndi_cleanup.sh
```

Vérifiez que JndiLogger.class a bien été supprimée en exécutant :

```bash
.\jndi_cleanup.sh -c
```

Si l'opération s'est déroulée correctement, vous devriez voir le résultat suivant :

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

Enfin, redémarrez le service de l'Agent Datadog en exécutant `sudo systemctl restart datadog-agent` (systèmes Linux basés sur systemd), `sudo restart datadog-agent` (systèmes Linux basés sur upstart) ou depuis l'application Agent Datadog dans la barre des menus (macOS).

### Windows

Enregistrez le code PowerShell suivant dans un fichier nommé `jndi_cleanup.ps1`.

```powershell
Param(
    [Parameter(Mandatory=$false)]
    [Switch]$Validate

)

[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression')

$zipfile = "C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar"
$files   = "JndiLookup.class"

$stream = New-Object IO.FileStream($zipfile, [IO.FileMode]::Open)
$update_mode   = [IO.Compression.ZipArchiveMode]::Update
$read_mode   = [IO.Compression.ZipArchiveMode]::Read

if ($Validate -eq $true) {
    $mode = $read_mode
} else {
    $mode = $update_mode
}

$zip    = New-Object IO.Compression.ZipArchive($stream, $mode)

if ($Validate -eq $true) {
    $found = New-Object System.Collections.Generic.List[System.Object]
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $found.Add($_.Name) }

    if ($found.Count -eq 0) {
        Write-Output "The $zipfile is now safe to run."
    } else {
        Write-Output "Dangerous file still present, something failed during the JNDI cleanup."
    }
} else {
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $_.Delete() }
}

$zip.Dispose()
$stream.Close()
$stream.Dispose()
```

À partir d’une invite PowerShell avec **élévation des privilèges** (en tant qu'administrateur), arrêtez le service de l'Agent Datadog avant d'appliquer le patch suivant :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" stopservice
```

Appliquez le patch pour supprimer la classe JndiLogger.class du fichier jmxfetch.jar :

```powershell
.\jndi_cleanup.ps1
```

Vérifiez que JndiLogger.class a bien été supprimée en exécutant :

```powershell
.\jndi_cleanup.ps1 -Validate
```

Si l'opération s'est déroulée correctement, vous devriez voir le résultat suivant :

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

Enfin, relancez le service de l'Agent Datadog pour appliquer les modifications.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" start-service
```

### AIX

Le fichier `jmxfetch.jar` est inclus dans le bundle d'installation de l'Agent AIX, mais le code `jmxfetch` n'est jamais exécuté par l'Agent. Si vous ne lancez pas manuellement le processus `jmxfetch`, le fichier `jmxfetch.jar` n'est pas utilisé et peut être supprimé de `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

### Écosystèmes conteneurisés

Si vous exécutez l'Agent Datadog en tant que conteneur (par exemple dans Kubernetes, Nomad ou Docker vanilla) et que vous utilisez la version JMX (nom d'image se terminant en `-jmx`), vous devrez créer une image personnalisée de l'Agent Datadog pour supprimer la classe  JndiLookup.class.

Utilisez le Dockerfile suivant pour créer l'image personnalisée :

```
ARG AGENT_VERSION=7.32.2

FROM gcr.io/datadoghq/agent:$AGENT_VERSION-jmx

RUN apt update && apt install zip -y

RUN zip -q -d /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar org/apache/logging/log4j/core/lookup/JndiLookup.class

RUN apt purge zip -y
```

Ensuite, à partir de l'emplacement du Dockerfile, créez l'image personnalisée, taguez-la et envoyez-la vers votre registre de conteneurs.
Par exemple, si vous utilisez la version `7.21.1` :

```
docker build -t <votre_registre_de_conteneurs>/agent:7.21.1-jmx-patched --build-arg AGENT_VERSION=7.21.1 .
docker push <votre_registre_de_conteneurs>/agent:7.21.1-jmx-patched
```

Vous pourrez alors utiliser cette image patchée dans vos clusters.

Remarque : cette méthode fonctionne uniquement sous Linux et utilise l'architecture de la machine sur laquelle l'image est créée. Si vous avez besoin d'une compatibilité avec plusieurs architectures différentes, utilisez des machines ou des outils dédiés tels que `Docker buildx`.


# Définir la variable d'environnement LOG4J_FORMAT_MSG_NO_LOOKUPS

**Le moyen le plus efficace d'éliminer la vulnérabilité est de passer à la v7.32.3 (v6.32.3) ou une version ultérieure de l'Agent Datadog.**

**Remarque** : si vous utilisez la version 7.32.2 ou 6.32.2 de l'Agent, ces étapes ne sont pas indispensables. L'Agent v7.32.2 (et v6.32.2) [lance jmxfetch avec une propriété][3] qui permet d'obtenir le même résultat. Nous vous conseillons malgré tout de passer à la version 7.32.3 (6.32.3) de l'Agent ou une version ultérieure.

**Remarque** : le fait de définir la variable d'environnement `LOG4J_FORMAT_MSG_NO_LOOKUPS` sur `true` permet de réduire les risques d'exécution de code à distance, mais cette méthode n'élimine pas totalement la vulnérabilité.

## Installations sur un host

Sous Linux, les instructions dépendent du système init et de la distribution :

### Systèmes basés sur Systemd :

#### RedHat/CentOS 7 et 8 ; Amazon Linux 2 ; SUSE 12+ ; Ubuntu 16.04+/Debian 8+

1. Créez un fichier de remplacement avec le contenu suivant à l'emplacement `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf` :
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. Rechargez les définitions de service systemd : `sudo systemctl daemon-reload`
3. Relancez le service datadog-agent : `sudo systemctl restart datadog-agent`


### Systèmes basés sur Upstart :

Les instructions sont différentes en fonction de la distribution Linux utilisée :

#### Ubuntu 14.04

1. Créez un fichier de remplacement avec le contenu suivant à l'emplacement `/etc/init/datadog-agent.override` :
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Arrêtez et relancez le service datadog-agent : `sudo stop datadog-agent && sudo start datadog-agent`

**Remarque** : assurez-vous d'utiliser les commandes `start` et `stop`, car `restart` ne prend pas en compte les modifications apportées à la configuration du service.

#### RedHat/Centos 6 ; Amazon Linux 1 :

1. Ajoutez la ligne suivante à la fin du fichier `/etc/init/datadog-agent.conf` existant :
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Arrêtez et relancez le service datadog-agent : `sudo stop datadog-agent && sudo start datadog-agent`

**Remarque** : assurez-vous d'utiliser les commandes `start` et `stop`, car `restart` ne prend pas en compte les modifications apportées à la configuration du service.

**Remarque** : le fichier `/etc/init/datadog-agent.conf` sera remplacé si vous réinstallez l'Agent, que vous le mettez à jour ou que vous passez à une version plus ancienne. Vous devrez recommencer ces étapes après chacune de ces opérations tant que vous ne serez pas passé à la v7.32.3/v6.32.3 de l'Agent ou une version ultérieure.

### Windows

1. Ouvrez une invite PowerShell en tant qu'administrateur sur la machine.
2. Exécutez le code suivant :
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Relancez le service de l'Agent Datadog pour appliquer les modifications.

**Remarque** : la variable est appliquée à tous les JVM exécutés sur le host.

### AIX

Le fichier `jmxfetch.jar` est inclus dans le bundle d'installation de l'Agent AIX, mais le code `jmxfetch` n'est jamais exécuté par l'Agent. Si vous ne lancez pas manuellement le processus `jmxfetch`, le fichier `jmxfetch.jar` n'est pas utilisé et peut être supprimé de `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

Si vous exécutez manuellement le fichier `jmxfetch.jar`, passez le flag suivant au processus Java : `‐Dlog4j2.formatMsgNoLookups=True`


## Agent conteneurisé

**Remarque** : le fait de définir la variable d'environnement `LOG4J_FORMAT_MSG_NO_LOOKUPS` sur `true` permet de réduire les risques d'exécution de code à distance, mais cette méthode n'élimine pas totalement la vulnérabilité.

### Docker (Linux et Windows)

Spécifiez la variable d'environnement suivante à l'exécution du conteneur datadog-agent en l'ajoutant à la commande `docker run` : `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### Kubernetes

Définissez la variable d'environnement `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` sur le conteneur `agent` ou sur l'ensemble des conteneurs Datadog. Utilisez le chart Helm Datadog officiel pour ajouter la variable d'environnement à la liste sous la valeur `datadog.env`. Par exemple :

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```

## Vérifier si votre version de l'Agent est vulnérable

### Avec un dashboard

Pour vérifier si votre version de l'Agent Datadog (>= 6.17.0 - <= 6.32.2 ou >= 7.17.0 - <= 7.32.2) correspond à la version recommandée (6.32.3/7.32.3 ou une version ultérieure) et que celle-ci n'est pas vulnérable à Log4j, [importez][4] le modèle de dashboard suivant dans votre compte Datadog :

[**Modèle de dashboard de vérification de la version de l'Agent Datadog**][5]
</br>
</br>
{{< img src="agent/faq/dashboard.png" alt="Dashboard de vérification de la version de l'Agent Datadog affichant des Agents vulnérables" >}}

Si vous avez besoin de créer plusieurs versions de ce dashboard pour plusieurs comptes ou hosts Datadog, vous pouvez automatiser le processus de création avec l'API Dashboards. Exécutez la commande suivante dans le répertoire où se trouve le fichier JSON :

```curl
curl -X POST "https://api.datadoghq.com/api/v1/dashboard" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @DatadogAgentVersionCheck.json
```

**Remarque** : le dashboard de vérification de la version de l'Agent Datadog n'affiche pas les versions plus anciennes de l'Agent (v5), car ces dernières ne sont pas vulnérables.

### Avec l'interface de ligne de commande

Vous pouvez également vérifier les détails de la version de l'Agent avec la sous-commande `version` de l'interface de ligne de commande de l'Agent. Pour en savoir plus, consultez la [documentation dédiée à l'interface de ligne de commande de l'Agent][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://logging.apache.org/log4j/2.x/security.html
[3]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst#7322--6322
[4]: /fr/dashboards/#copy-import-or-export-dashboard-json
[5]: /resources/json/agent-version-dashboard.json
[6]: /fr/agent/guide/agent-commands/?tab=agentv6v7#other-commands
