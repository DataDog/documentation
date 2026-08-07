---
algolia:
  rank: 80
  tags:
  - fips
  - fips proxy
  - compliance
  - fedramp
  - govcloud
  - fips agent
aliases:
- /fr/agent/guide/agent-fips-proxy
- /fr/agent/guide/fips-agent
- /fr/configuration/agent-fips-proxy
description: Configurez les modules cryptographiques conformes FIPS pour l'Agent Datadog
  dans les environnements hautement réglementés comme FedRAMP.
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentation
  text: Configuration de l'Agent pour un proxy
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Surveiller des workloads hautement régulés avec l'Agent FIPS de Datadog
title: Conformité FIPS Datadog
---

## Présentation

L'Agent FIPS est une version de l'Agent Datadog qui prend en charge nativement la conformité aux Federal Information Processing Standards (FIPS). La conformité de l'Agent FIPS repose sur son utilisation du [module cryptographique - Certificat #4282][1] validé FIPS 140-2. Consultez la [politique de sécurité][2] associée pour obtenir des informations sur les environnements d'exploitation validés et les restrictions.

L'Agent FIPS inclut également une [prise en charge limitée des intégrations][3] qui doivent collecter des données d'observabilité externes au host.

**Il vous incombe de garantir la conformité de l'environnement d'exploitation avec la politique de sécurité et les directives FIPS plus larges.**

## Plateformes prises en charge et limitations

Plateformes prises en charge :

|      |             |
| ---  | ----------- |
| Bare metal et VM | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12<br>Windows Server >= 2016<br>Windows >= 10|
| Cloud et conteneurs| Amazon ECS<br>AWS EKS (Helm)<br>Docker|

Produits pris en charge (Agent 7.65.0 et versions ultérieures) :
- Métriques
- Logs
- Les traces APM
- Profils APM
- Processus
- Orchestrator Explorer
- Runtime Security
- Surveillance sans serveur

L'Agent FIPS Datadog ne prend **pas** en charge les éléments suivants :
- Communication entre l'Agent de cluster et les Agents de nœuds
- Communication sortante vers autre chose que GovCloud
- [Collecteur DDOT][4] Datadog


## Directives de conformité
<div class="alert alert-danger">
Cette liste n'est pas exhaustive. Ces exigences constituent uniquement une base de référence. Il vous incombe d'évaluer votre environnement et de mettre en œuvre tous les contrôles supplémentaires nécessaires pour atteindre la pleine conformité FIPS. 
</div>
Les contrôles de base suivants s'appliquent à chaque plateforme. Votre système peut nécessiter des contrôles supplémentaires :

{{< tabs >}}
{{% tab "Linux" %}}
- Un host Linux non conteneurisé.
- Votre OS Linux doit être en mode conforme FIPS. Consultez la documentation de votre fournisseur d'OS pour connaître les étapes requises pour satisfaire cette exigence.
- Stockage conforme FIPS supportant le système de fichiers du host.
{{% /tab %}}

{{% tab "Windows" %}}
- Un host Windows non conteneurisé.
- Windows doit être en [mode conforme FIPS][1].
- Stockage conforme FIPS supportant le système de fichiers du host.

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
{{% /tab %}}

{{% tab "AWS Lambda" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
{{% /tab %}}

{{% tab "AWS ECS" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
- Configurez les services de calcul AWS (EC2 ou Fargate) en mode FIPS
- Utilisez un stockage conforme FIPS pour vos tâches ECS
{{% /tab %}}

{{% tab "AWS EKS" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
- Configurez les nœuds worker EKS en mode FIPS
- Utilisez un stockage conforme FIPS pour vos nœuds worker EKS
{{% /tab %}}

{{< /tabs >}}

En plus des exigences du système d'exploitation (OS) ci-dessus :
- Vous devez avoir accès à un environnement Datadog conforme FIPS (US1-FED).
- La version de l'Agent doit être 7.65.0 et versions ultérieures pour accéder à l'Agent FIPS

## Installation

{{< tabs >}}
{{% tab "Linux" %}}

1. Installez l'Agent avec la prise en charge FIPS.

   **Remarque :** la prise en charge FIPS n'est disponible que sur les versions 7.65.0 et ultérieures de l'Agent :
   1. Si vous utilisez le script d'installation de l'Agent, spécifiez la variable d'environnement `DD_AGENT_FLAVOR="datadog-fips-agent"` dans votre commande d'installation. Par exemple :

      ```sh
      DD_SITE="ddog-gov.com" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" ... bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
      ```
   1. Si vous installez avec un package, [suivez les instructions][1] pour installer le dernier package `datadog-fips-agent` disponible pour votre plateforme.
   1. Ajoutez `GOFIPS=1` à vos variables d'environnement Datadog, rechargez toutes les unités de service et redémarrez le service de l'Agent Datadog (`datadog-agent.service`). Par exemple, si votre host utilise systemd :

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
1. Exécutez la commande `datadog-agent status` et assurez-vous de voir `FIPS Mode: enabled` dans la sortie du statut.

{{< img src="/agent/fips-linux.png" alt="Sortie de la commande de statut de l'Agent avec FIPS Mode activé - Linux" style="width:100%;" >}}

[1]: /fr/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

1. Suivez les [instructions Windows][1] pour désinstaller tout Agent Datadog existant sur la machine.
1. Exécutez la commande ci-dessous pour installer l'Agent FIPS, en remplaçant `DATADOG_API_KEY` par votre clé API :

   **Remarque :** la prise en charge FIPS n'est disponible que sur les versions 7.65.0 et ultérieures de l'Agent :

   {{< code-block lang="powershell" >}}
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-fips-agent-7-latest.amd64.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="ddog-gov.com"'
if ($p.ExitCode -ne 0) {
   Write-Host "msiexec a échoué avec le code de sortie $($p.ExitCode) veuillez vérifier les logs à C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
{{< /code-block >}}

3. Exécutez la commande `datadog-agent status` et assurez-vous de voir `FIPS Mode: enabled` dans la sortie du statut.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-linux.png" alt="Sortie de la commande de statut de l'Agent avec FIPS Mode activé - Linux" style="width:100%;" >}}


**Remarque** : le nom du programme pour l'Agent FIPS dans **Ajout/Suppression de programmes** est « Datadog FIPS Agent ».

[1]: /fr/agent/basic_agent_usage/windows/#uninstall-the-agent

{{% /tab %}}

{{% tab "AWS Lambda" %}}

Pour la conformité FIPS AWS Lambda, suivez les instructions de la documentation [Conformité FIPS AWS Lambda][1].

[1]: /fr/serverless/aws_lambda/fips-compliance/

{{% /tab %}}

{{% tab "AWS ECS" %}}

Lorsque vous suivez les [instructions d'installation ECS][1], assurez-vous d'utiliser ces valeurs de configuration spécifiques à FIPS pour votre définition de tâche :
- Définissez `image` dans l'objet `containerDefinitions` sur `public.ecr.aws/datadog/agent:7-fips`  
- Définissez la variable d'environnement `DD_SITE` sur `ddog-gov.com`

[1]: /fr/containers/amazon_ecs/
{{% /tab %}}

{{% tab "AWS EKS" %}}

Lorsque vous suivez les instructions d'[installation de l'Agent Datadog sur Kubernetes][1], assurez-vous d'inclure ces valeurs de configuration spécifiques à FIPS dans le fichier `datadog-agent.yaml` en fonction de votre méthode d'installation choisie :

Pour l'opérateur Datadog :
```yaml
spec:
   global:
      site: "ddog-gov.com"
      useFIPSAgent: true
```

Pour la chart Helm Datadog :
```yaml
datadog:
   site: "ddog-gov.com"
useFIPSAgent: true
```

[1]: /fr/containers/kubernetes/installation/
{{% /tab %}}

{{< /tabs >}}

## Sécurité et durcissement

Vous, le client Datadog, êtes responsable de la sécurité et du durcissement du **host**.

**Considérations de sécurité :**
- Bien que les images Datadog fournies soient construites en tenant compte de la sécurité, elles n'ont pas été évaluées par rapport aux recommandations du benchmark CIS ou aux normes DISA STIG.
- Si vous reconstruisez, reconfigurez ou modifiez l'Agent FIPS Datadog pour l'adapter à vos besoins de déploiement ou de test, vous pourriez vous retrouver avec une configuration techniquement fonctionnelle, mais Datadog ne peut pas garantir la conformité FIPS si l'Agent FIPS Datadog n'est pas utilisé exactement comme expliqué dans la documentation.
- Si vous n'avez pas suivi les étapes d'installation répertoriées ci-dessus exactement comme documenté, Datadog ne peut pas garantir la conformité FIPS.
- Certaines distributions Linux avec `urllib3 ≤ 1.26.20` peuvent échouer au chiffrement FIPS en raison de bibliothèques non conformes. Vérifiez auprès de votre fournisseur Linux pour garantir la prise en charge du chiffrement conforme FIPS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /fr/integrations/guide/fips-integrations
[4]: /fr/opentelemetry/setup/ddot_collector