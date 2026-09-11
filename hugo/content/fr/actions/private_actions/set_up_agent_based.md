---
aliases:
- /fr/service_management/workflows/private_actions/use_private_actions
- /fr/service_management/app_builder/private_actions/use_private_actions
- /fr/actions/private_actions/use_private_actions/
- /fr/actions/private_actions/update_private_action_runner/
description: Installez, enrôlez, gérez et mettez à jour un private action runner qui
  s'exécute au sein du Datadog Agent.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentation
  text: Private Actions
- link: actions/private_actions/enroll_runner
  tag: Documentation
  text: Inscription et propriété
- link: actions/private_actions/execution_policies
  tag: Documentation
  text: Politiques d'exécution
- link: actions/private_actions/set_up_standalone
  tag: Documentation
  text: Configurez un private action runner autonome.
title: Configurez un private action runner dans le Datadog Agent.
---
## Présentation {#overview}

L'exécution du private action runner dans le Datadog Agent est la méthode recommandée pour les nouveaux déploiements. Si vous exécutez déjà le Datadog Agent, activez le runner avec un seul configuration flag et gérez-le via le cycle de vie de l'Agent.

La configuration du runner se fait en trois étapes :

1. [**Installez**](#install-the-runner) le runner, en utilisant l'option de déploiement adaptée à votre environnement.
1. [**Enrôlez**](#enroll-the-runner) le runner, ce qui définit sa propriété et le modèle d'autorisation qu'il utilise.
1. [**Mettez à jour**](#update-the-runner) le runner dans le cadre de vos mises à niveau de l'Agent.

Pour déployer le runner en tant que binaire séparé à la place, consultez [Configurez un private action runner autonome][1].

## Prérequis {#prerequisites}

- Un host Linux ou Windows avec **Datadog Agent 7.81.0 ou version ultérieure**, ou un cluster Kubernetes avec **Datadog Operator v1.28.0 ou version ultérieure** ou le **Datadog Helm chart 3.231.6 ou version ultérieure**.
- [Remote Configuration][2] activée pour votre organisation.
- Accès réseau à Datadog sur `https://{{< region-param key=dd_site >}}`.

## Installez le runner {#install-the-runner}

Le runner dans le Datadog Agent offre trois options de déploiement, selon l'endroit où il doit agir :

| Option de déploiement | Mode d'exécution | Déployer avec | Idéal pour |
|---|---|---|---|
| **Host** | Un processus séparé à côté du Datadog Agent sur un host Linux ou Windows. | Installation sur le host | Actions ciblant un host spécifique. |
| **Agent de nœud Kubernetes** | Un conteneur dans l'Agent de nœud, utilisant le même binaire de runner que le processus du host. | Helm, Operator | Actions locales au nœud dans un cluster Kubernetes. |
| **Kubernetes Cluster Agent** | Exécuté in-process à l'intérieur du Cluster Agent, sans binaire séparé. Un runner dessert l'ensemble du cluster. | Helm, Opérateur | Actions Kubernetes à l'échelle du cluster. |

Vous avez la possibilité d'installer avec **Fleet Automation**, un flux piloté par l'interface utilisateur qui enrôle le runner comme détenu, ou **Installation manuelle**, où vous choisissez vous-même le type d'enrôlement.

### Utilisation de Fleet Automation (recommandé) {#using-fleet-automation-recommended}

Le flux d'installation de Fleet Automation est le même sur toutes les plateformes.

1. Accédez à la [page d'installation de Fleet Automation][3] et sélectionnez votre plateforme. Pour Kubernetes, sélectionnez également **Helm Chart** ou **Datadog Operator** comme méthode d'installation, afin de correspondre à l'onglet [Installation manuelle](#manual-installation) que vous prévoyez de suivre.
1. Dans **Personnalisez votre couverture d'Agent**, accédez à la section **Optimisation et remédiation** et activez **Autoriser l'Agent à effectuer des actions**. Cela crée une clé d'application avec le périmètre `on_prem_runner_write` et enrôle le runner comme **détenu**, autorisé avec [Connections][4]. Pour inscrire plutôt un runner sans propriétaire, autorisé avec [Politiques d'exécution][5], utilisez [Installation manuelle](#manual-installation).
1. Suivez les instructions restantes dans le panneau d'installation pour ajouter une clé d'API et terminer l'installation.
1. Après l'installation, accédez à [Private Action Runners][6] pour vérifier que votre runner apparaît dans la liste.

### Installation manuelle {#manual-installation}

{{< tabs >}}
{{% tab "Linux" %}}
Définissez les variables d'environnement suivantes lors de l'installation ou de l'exécution de l'Agent. Sur le host, les paramètres du runner utilisent le préfixe `DD_PRIVATE_ACTION_RUNNER_*` :

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="{{< region-param key=dd_site >}}" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.kubernetes.*,com.datadoghq.remoteaction.* \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_APP_KEY` enrôle le runner comme détenu, tout comme Fleet Automation. La clé d'application nécessite le périmètre `on_prem_runner_write`. `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` accepte une liste séparée par des virgules. Utilisez des caractères génériques de bundle pour autoriser les actions qu'un runner dans le Datadog Agent peut exécuter : `com.datadoghq.kubernetes.*` et `com.datadoghq.remoteaction.*`. Pour utiliser plutôt les actions par défaut intégrées du runner (actions Remote Action en lecture seule, ainsi qu'un ensemble d'actions Kubernetes en lecture seule sur le Cluster Agent), laissez la liste d'autorisation non définie.

Après l'installation, accédez à [Private Action Runners][1] pour vérifier que votre runner apparaît dans la liste.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Windows" %}}

Installez ou mettez à niveau vers le Datadog Agent 7.81.0 ou une version ultérieure, puis modifiez `C:\ProgramData\Datadog\datadog.yaml` :

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  self_enroll: true
  actions_allowlist:
    - "com.datadoghq.kubernetes.*"
    - "com.datadoghq.remoteaction.*"
```

`app_key` enrôle le runner comme détenu, de la même manière que Fleet Automation ci-dessus ; la clé d'application nécessite le périmètre `on_prem_runner_write`.

Redémarrez l'Agent pour appliquer la configuration :

```powershell
Restart-Service -Force datadogagent
```

Une fois l'Agent redémarré, accédez à [Private Action Runners][1] pour vérifier que votre runner apparaît dans la liste.

Le processus du host exécute le runner **node Agent**. Pour exécuter un runner dans le Cluster Agent, utilisez l'onglet Kubernetes (Helm) ou Kubernetes (Operator).

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Le Datadog Helm chart peut activer le runner à deux endroits :

- Le runner **node Agent**, en tant que conteneur sidecar. Le runner node Agent est **uniquement disponible sur Linux**.
- Le runner **Cluster Agent**, en cours d'exécution. Le runner Cluster Agent est disponible uniquement via Helm ou l'Operator (il n'existe pas de binaire autonome), et il nécessite une élection de leader afin que l'identité soit coordonnée entre les réplicas du Cluster Agent.

Créez une clé d'API avec la fonctionnalité Private Action Runner dans [Organization Settings][1], puis stockez-la dans un secret Kubernetes que le chart lit via `apiKeyExistingSecret` :

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Cet exemple enrôle le runner comme **sans propriétaire** (`apiKeyOnlyEnrollment: true`, en utilisant uniquement la clé d'API), ce qui l'autorise avec des [politiques d'exécution][5]. Pour d'autres options d'enrôlement et pour savoir comment fonctionne la propriété, consultez [Enrollment and ownership][2].

Les paramètres Helm utilisent la clé `privateActionRunner.*` en camelCase. Créez un `values.yaml` :

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  site: {{< region-param key=dd_site >}}
  clusterName: <YOUR_CLUSTER_NAME>
  remoteConfiguration:
    enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.remoteaction.*"
      - "com.datadoghq.script.*"
clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.kubernetes.*"
      - "com.datadoghq.script.*"
```

Pour toutes les options de configuration disponibles du runner, consultez [`datadog.privateActionRunner`][3] et [`clusterAgent.privateActionRunner`][4] dans le Datadog Helm chart. Installez le chart :

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-agent datadog/datadog -f values.yaml
```

Après l'installation, accédez à [Private Action Runners][5] pour vérifier que votre runner apparaît dans la liste.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/actions/private_actions/enroll_runner/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L523
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1842
[5]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Le Datadog Operator active le runner via des annotations sur la ressource `DatadogAgent`. La configuration du runner dans l'annotation `-configdata` utilise la clé `private_action_runner.*` en snake_case. L'Operator peut activer à la fois le node Agent runner et le Cluster Agent runner.

Créez une clé d'API avec la fonctionnalité Private Action Runner dans [Organization Settings][1], puis stockez-la dans un secret Kubernetes que la ressource `DatadogAgent` lit via son `credentials` :

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Cet exemple enrôle le runner comme **sans propriétaire** (`api_key_only_enrollment: true`, en utilisant uniquement la clé d'API), ce qui l'autorise avec des [politiques d'exécution][5]. Pour d'autres options d'enrôlement et pour savoir comment fonctionne la propriété, consultez [Enrollment and ownership][2].

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
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

Appliquez le manifeste :

```bash
kubectl apply -f datadog-agent.yaml
```

Comme pour Helm, le Cluster Agent runner nécessite une élection de leader, et le node Agent runner est réservé à Linux. Après avoir appliqué le manifeste, accédez à [Private Action Runners][3] pour vérifier que votre runner apparaît dans la liste.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/actions/private_actions/enroll_runner/
[3]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{< /tabs >}}

### Noms des champs de configuration {#configuration-field-names}

Les paramètres du runner suivent les conventions de configuration standard du Datadog Agent pour chaque méthode d'installation :
- Variables d'environnement sur un host.
- Clés CamelCase sous `privateActionRunner` dans Helm.
- Clés snake_case sous `private_action_runner` dans l'Operator.

Pour le tableau de correspondance des noms de champs pour les trois méthodes d'installation et la liste complète des clés de configuration et des valeurs par défaut, consultez la [Référence du Private Action Runner][7].

## Enregistrez le runner {#enroll-the-runner}

L'enrôlement enregistre le runner auprès de votre organisation Datadog et définit sa **propriété**, ce qui détermine le modèle d'autorisation. Un runner sans propriétaire, enrôlé avec une clé d'API disposant de la fonctionnalité Private Action Runner, utilise des [politiques d'exécution][5]. Un runner possédé, enrôlé avec une clé d'application, utilise [Connections][4]. Comme le modèle est fixé lors de l'enrôlement, décidez lequel vous souhaitez avant de déployer.

Pour plus d'informations sur le processus, consultez [Inscription et propriété][8].

## Gérer le runner {#manage-the-runner}

### Modifier la liste d'autorisation {#change-the-allowlist}

Pour modifier la liste d'autorisation d'un runner dans le Datadog Agent :

{{< tabs >}}
{{% tab "Linux" %}}
1. Modifiez la section `private_action_runner.actions_allowlist` dans `/etc/datadog-agent/datadog.yaml`.
1. Redémarrez l'Agent : `sudo systemctl restart datadog-agent`.
{{% /tab %}}
{{% tab "Windows" %}}
1. Modifiez la section `private_action_runner.actions_allowlist` dans `C:\ProgramData\Datadog\datadog.yaml`.
1. Redémarrez l'Agent : `Restart-Service -Force datadogagent`.
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}
1. Mettez à jour `actions_allowlist` dans les deux annotations du manifeste `DatadogAgent` : `agent.datadoghq.com/private-action-runner-configdata` et `cluster-agent.datadoghq.com/private-action-runner-configdata`.
1. Appliquez le manifeste mis à jour : `kubectl apply -f datadog-agent.yaml`.
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}
1. Mettez à jour `privateActionRunner.actionsAllowlist` (node Agent) ou `clusterAgent.privateActionRunner.actionsAllowlist` (Cluster Agent) dans `values.yaml`.
1. Appliquez le chart mis à jour : `helm upgrade datadog-agent datadog/datadog -f values.yaml`.
{{% /tab %}}
{{< /tabs >}}

### Suppression automatique des runners inactifs {#automatic-deletion-of-inactive-runners}

Pour libérer des ressources inutilisées, Datadog supprime automatiquement les private action runners basés sur le node Agent qui utilisent une configuration à clé d'API uniquement (sans propriétaire) après 35 jours d'inactivité. Ce nettoyage automatique ne s'applique pas aux runners avec propriétaire ni au Cluster Agent runner.

Si votre runner est supprimé en raison d'une inactivité, le redémarrer entraîne une erreur. Vous devez réinscrire le runner en répétant les étapes d'installation.

## Débogage avec les logs {#debugging-with-logs}

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}
{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## Mettez à jour le runner {#update-the-runner}

Mettez à jour le runner dans le Datadog Agent pour rester à jour avec toutes les mises à niveau de l'Agent.

{{< tabs >}}
{{% tab "Linux" %}}

Mettez à niveau le Datadog Agent vers la dernière version. Le runner est fourni avec l'Agent.

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

Ou pour RHEL/CentOS :

```bash
sudo yum update datadog-agent
```

Redémarrez l'Agent après la mise à niveau :

```bash
sudo systemctl restart datadog-agent
```

Pour des instructions de mise à niveau détaillées, consultez [Mise à niveau vers l'Agent v7][1].

[1]: /fr/agent/versions/upgrade_to_agent_v7/

{{% /tab %}}
{{% tab "Windows" %}}

Téléchargez le dernier programme d'installation MSI de l'Agent depuis la [page de téléchargement du Datadog Agent][1] et exécutez-le, ou utilisez PowerShell :

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

Redémarrez l'Agent après la mise à niveau :

```powershell
Restart-Service -Force datadogagent
```

[1]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Mettez à jour les versions de l'image du Datadog Operator et de l'Agent dans votre manifeste `DatadogAgent`.

1. Mettez à jour le Datadog Operator :

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=registry.datadoghq.com/operator \
       --set image.tag=latest
   ```

   Vous pouvez fixer une version spécifique. Pour parcourir les tags disponibles, utilisez [Docker Hub][1].

1. Mettez à jour les versions de l'image de l'Agent dans votre manifeste `datadog-agent.yaml` :

   ```yaml
   override:
     nodeAgent:
       image:
         name: registry.datadoghq.com/agent:<NEW_AGENT_VERSION>
     clusterAgent:
       image:
         name: registry.datadoghq.com/cluster-agent:<NEW_AGENT_VERSION>
   ```

1. Appliquez le manifeste mis à jour : `kubectl apply -f datadog-agent.yaml`.
1. Vérifiez la mise à jour :

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

Le Cluster Agent runner conserve son identité lors de la mise à jour, car il la stocke dans un secret Kubernetes partagé. Le node Agent runner stocke son identité dans un fichier : si ce chemin n'est pas supporté par un volume persistant, une mise à jour peut effacer l'identité et forcer le runner à se réinscrire. Consultez [Stockage de l'identité sur Kubernetes][2].

[1]: https://hub.docker.com/r/datadog/operator/tags
[2]: /fr/actions/private_actions/enroll_runner/#identity-storage-on-kubernetes

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

La mise à jour du runner fait partie du processus standard de mise à niveau du Datadog Agent Helm chart.

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

Pour des instructions de mise à niveau détaillées, consultez [Mise à niveau de Datadog Helm][1].

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}
{{% tab "Terraform (Operator)" %}}

Mettez à jour les variables de version dans votre configuration Terraform :

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

Appliquez les changements :

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/set_up_standalone/
[2]: /fr/remote_configuration
[3]: https://app.datadoghq.com/fleet/install-agent/latest
[4]: /fr/actions/connections/
[5]: /fr/actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: /fr/actions/private_actions/reference/
[8]: /fr/actions/private_actions/enroll_runner/