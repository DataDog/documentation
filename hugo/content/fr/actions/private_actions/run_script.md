---
description: Utilisez l'exécuteur d'actions privé pour exécuter des scripts prédéfinis
  dans votre réseau privé, y compris la configuration requise pour les exécuteurs
  sans propriétaire autorisés par une stratégie d'exécution.
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: Documentation
  text: Mettez en place un exécuteur d'actions privé dans le Datadog Agent
- link: actions/private_actions/execution_policies
  tag: Documentation
  text: Politiques d'exécution
- link: actions/private_actions/reference
  tag: Documentation
  text: Références
title: Exécuter un script avec l'exécuteur d'actions privé
---
## Présentation {#overview}

L'exécuteur d'actions privé peut exécuter des **scripts prédéfinis**, qui sont des commandes shell, des outils de ligne de commande et des scripts que vous déclarez à l'avance dans un fichier de configuration de script. Seul ce que vous prédéfinissez peut être exécuté, de sorte que l'exécuteur n'exécute jamais de commandes en ligne arbitraires provenant d'un workflow ou d'une application.

<div class="alert alert-warning">Vous décidez quelles commandes et quels binaires l'exécuteur est autorisé à exécuter. Examinez chaque commande que vous ajoutez à la configuration du script, en particulier celles qui acceptent des paramètres, n'accordez à l'exécuteur que les privilèges dont il a besoin, et examinez attentivement les autorisations que vous partagez via les connexions. Voir <a href="/actions/connections/#connection-security-considerations">les considérations de sécurité des connexions</a>.</div>

## Cas d'utilisation {#use-cases}

| Cas d'utilisation | Basé sur l'Agent | Autonome | Notes |
|---|:---:|:---:|---|
| Exécution de binaires Linux (`ls`, `rm`, `find`, `curl`) | {{< X >}} | {{< X >}} | Pour les exécuteurs autonomes, les fichiers pertinents doivent être accessibles au conteneur. |
| Exécution d'interfaces de ligne de commande (`aws`, `terraform`, `kubectl`) | {{< X >}} | {{< X >}} | Pour les exécuteurs autonomes, l'interface de ligne de commande et les identifiants doivent être disponibles dans l'image. Pour les exécuteurs basés sur l'Agent, les outils doivent être installés sur le host. |
| Exécution de scripts bash | {{< X >}} | {{< X >}} | Pour les exécuteurs autonomes, les scripts peuvent être montés à l'intérieur du conteneur. Utilisez la [grande image](#large-image) pour un interpréteur Python. |
| Exécution de scripts PowerShell | {{< X >}} | | Pris en charge uniquement sur les exécuteurs Windows basés sur l'Agent. |
| Exécution de commandes privilégiées (`systemctl restart`) | {{< X >}} | | Pour les exécuteurs basés sur l'Agent, accordez des autorisations à l'utilisateur de l'exécuteur. Le sandboxing de conteneur empêche les exécuteurs autonomes d'accéder au host avec des privilèges. |

## Prérequis {#prerequisites}

**Pour les exécuteurs basés sur l'Agent :**
- Datadog Agent 7.81.0 ou version ultérieure. Consultez [Configurer un exécuteur d'actions privé dans le Datadog Agent][1].
- Ajoutez `com.datadoghq.script.runPredefinedScript` (Linux) ou `com.datadoghq.script.runPredefinedPowershellScript` (Windows) à la liste d'autorisation des actions de l'exécuteur.

**Pour les exécuteurs autonomes :**
- Un exécuteur autonome. Consultez [Configurer un exécuteur d'actions privé autonome][2].
- Pour les outils CLI non inclus dans l'image de base ou dans la [grande image](#large-image), une image Docker personnalisée. Consultez [Images personnalisées](#custom-images).

## Basé sur l'Agent {#agent-based}

### Configurer les scripts {#configure-scripts}

{{< tabs >}}
{{% tab "Linux" %}}

Modifiez le fichier `/etc/datadog-agent/private-action-runner/script-config.yaml` :

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

{{% /tab %}}
{{% tab "Windows" %}}

Modifiez le fichier `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` :

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello world!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

{{% /tab %}}
{{< /tabs >}}

Dans un workflow ou une application, référencez un script par le nom que vous avez défini (par exemple, `echo`). Utilisez `runPredefinedScript` sur les exécuteurs Linux et `runPredefinedPowershellScript` sur les exécuteurs Windows.

### Accorder des autorisations {#grant-permissions}

{{< tabs >}}
{{% tab "Linux" %}}

L'exécuteur exécute les scripts en tant qu'utilisateur `dd-agent`. Si vos scripts nécessitent des autorisations élevées, accordez-les à l'utilisateur `dd-agent` :

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

L'exécuteur exécute les scripts en tant que `ddagentuser`. Si vos scripts nécessitent l'accès à certaines ressources, accordez à l'utilisateur `ddagentuser` des autorisations élevées pour y accéder :

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### Exécuteur sans propriétaire (autorisé par la politique d'exécution) {#ownerless-runner-execution-policy-authorized}

Lorsqu'un exécuteur est inscrit en mode sans propriétaire et autorisé par [Politiques d'exécution][3], deux éléments supplémentaires sont requis en plus des étapes ci-dessus :

- L'intégration **Script** doit être autorisée pour l'exécuteur via une politique d'exécution, en plus de ce que l'action predefined-script figure dans la liste d'autorisation des actions de l'exécuteur.
- L'exécuteur lit ses scripts prédéfinis à partir d'un **chemin fixe**, le même chemin utilisé dans [Configurer les scripts](#configure-scripts) ci-dessus :

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

#### Livraison de la configuration sur Kubernetes {#delivering-the-config-on-kubernetes}

Sur Kubernetes, fournissez le fichier de configuration de script à l'exécuteur dans le Datadog Agent sous forme de ConfigMap. Montez-le dans le conteneur de l'exécuteur au chemin fixe. L'exécuteur du Cluster Agent utilise le chemin Linux ci-dessus.

Tout d'abord, créez une ConfigMap contenant votre configuration de script :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: par-script-config
  namespace: datadog
data:
  script-config.yaml: |
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world!"]
```

Ensuite, sur la ressource `DatadogAgent`, autorisez l'action predefined-script et montez la ConfigMap dans le conteneur de l'exécuteur au chemin fixe :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.remoteaction.*"
spec:
  override:
    nodeAgent:
      volumes:
        - name: par-script-config
          configMap:
            name: par-script-config
      containers:
        private-action-runner:
          volumeMounts:
            - name: par-script-config
              mountPath: /etc/datadog-agent/private-action-runner/script-config.yaml
              subPath: script-config.yaml
              readOnly: true
```

Enfin, appliquez le manifeste :

```bash
kubectl apply -f datadog-agent.yaml
```

### Exécuteur détenu (basé sur une connexion) {#owned-runner-connection-based}

{{< tabs >}}
{{% tab "Linux" %}}

#### Configurer la connexion {#configure-the-connection}

Si vous avez sélectionné `com.datadoghq.script.runPredefinedScript` dans la liste d'autorisation des actions de l'exécuteur, vous devriez déjà avoir une connexion **Script** liée à votre exécuteur. Sinon, créez une connexion et spécifiez `/etc/datadog-agent/private-action-runner/script-config.yaml` comme **chemin vers le fichier**. Pour plus d'informations, consultez [Gestion des identifiants d'action privés][4].

{{% /tab %}}
{{% tab "Windows" %}}

#### Configurer la connexion {#configure-the-connection-1}

Si vous avez sélectionné `com.datadoghq.script.runPredefinedPowershellScript` dans la liste d'autorisation des actions de l'exécuteur, vous devriez déjà avoir une connexion **Script** liée à votre exécuteur. Sinon, créez une connexion et spécifiez `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` comme **chemin vers le fichier**. Pour plus d'informations, consultez [Gestion des identifiants d'action privés][4].

{{% /tab %}}
{{< /tabs >}}

## Autonome {#standalone}

Un exécuteur autonome est toujours détenu et autorisé avec des [Connexions][5].

{{< tabs >}}
{{% tab "Docker" %}}

1. Après avoir [configuré un exécuteur][2], accédez à **Connections**.
1. Cliquez sur **New Connection** et sélectionnez **Script**.
1. Saisissez un nom de connexion et, dans la liste déroulante **Private Action Runner**, sélectionnez votre exécuteur.
1. Copiez le modèle de fichier d'identification dans le répertoire de configuration de votre exécuteur avec les commandes que vous souhaitez exécuter.
1. Dans **Path to file**, confirmez que le chemin d'accès au fichier correspond au chemin sur le système de fichiers de votre exécuteur (la valeur par défaut suffit dans la plupart des cas).
1. Cliquez sur **Next, Confirm Access**, configurez les autorisations, puis cliquez sur **Create**.
1. Sélectionnez cette connexion lors de l'utilisation de l'action de script dans vos workflows ou applications.

Configurez les actions de script via le fichier `config.yaml` de votre exécuteur et la connexion de script
(`credentials/script.yaml` par défaut) :

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
    parameterSchema:
      properties:
        echoValue:
          type: string
      required:
        - echoValue
```

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Lors du déploiement de l'exécuteur avec Helm, configurez les scripts via votre fichier `values.yaml` :

```yaml
common:
  actionsAllowlist:
    - com.datadoghq.script.runPredefinedScript

credentials:
  script:
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
        parameterSchema:
          properties:
            echoValue:
              type: string
          required:
            - echoValue
```

Déployez ou mettez à niveau l'exécuteur :

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Options d'image de l'exécuteur {#runner-image-options}

Les options suivantes sont disponibles uniquement pour les exécuteurs autonomes.

#### Grande image {#large-image}

Si vous souhaitez utiliser des outils tels que Python, SSH, l'AWS CLI, Terraform ou la gcloud CLI, utilisez l'image `gcr.io/datadoghq/private-action-runner:v`{{< private-action-runner-version "private-action-runner" >}}-large au lieu de l'image par défaut.

#### Images personnalisées {#custom-images}

Pour les binaires non disponibles dans les images fournies par Datadog, créez une image personnalisée :

```dockerfile
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change the line below to install the tool of your choice
RUN apt update && apt install -y python3
USER dog
```

Vous pouvez monter des scripts complexes à l'intérieur de l'exécuteur :

```yaml
# docker-compose example
services:
  runner:
    build: . # if you are using a local Dockerfile
    volumes:
      - "./config:/etc/dd-action-runner/config" # contains credentials for actions
      - "./scripts:/etc/dd-action-runner-script/scripts" # contains dependencies for script actions
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: ["bash", "/etc/dd-action-runner-script/scripts/script.sh"]
```

## Utilisation des scripts configurés {#using-the-configured-scripts}

Dans votre workflow ou application, configurez l'action pour utiliser le nom de script que vous avez défini (par exemple, `echo` ou `echo-parametrized`). Pour les exécuteurs Linux, utilisez `runPredefinedScript`. Pour les exécuteurs Windows, utilisez `runPredefinedPowershellScript`.

Il existe deux niveaux de résolution de variable : un au niveau du workflow et un au niveau de l'action
à l'intérieur de l'exécuteur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/set_up_agent_based/
[2]: /fr/actions/private_actions/set_up_standalone/
[3]: /fr/actions/private_actions/execution_policies/
[4]: /fr/actions/connections/private_action_credentials/
[5]: /fr/actions/connections/