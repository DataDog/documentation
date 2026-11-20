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
description: Configurez des modules cryptographiques conformes à FIPS pour le Datadog
  Agent dans des environnements hautement réglementés comme FedRAMP.
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentation
  text: Configuration du proxy de l'Agent
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Surveillez des charges de travail hautement réglementées avec le Datadog Agent
    compatible FIPS
- link: https://www.datadoghq.com/blog/engineering-the-datadog-agent-for-fedramp-high/
  tag: Blog
  text: Conception du Datadog Agent pour la certification FedRAMP High®
title: Conformité FIPS de Datadog
---
## Présentation {#overview}

L'Agent FIPS est une variante du Datadog Agent qui prend en charge nativement la conformité aux normes FIPS (Federal Information Processing Standards). La conformité de l'Agent FIPS repose sur son utilisation du [module cryptographique - Certificat n° 4282][1] validé FIPS 140-2. Consultez la [politique de sécurité][2] associée pour obtenir des informations sur les environnements d'exploitation validés et les restrictions. 

L'Agent FIPS inclut également une [prise en charge limitée des intégrations][3] qui doivent collecter des données d'observabilité externes au host.

**Il est de votre responsabilité de garantir la conformité de l'environnement d'exploitation avec la politique de sécurité et les directives FIPS plus larges.**

## Plateformes prises en charge et limitations {#supported-platforms-and-limitations}

Plateformes prises en charge :

|      |             |
| ---  | ----------- |
| Serveurs physiques et machines virtuelles | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12<br>Windows Server >= 2016<br>Windows >= 10|
| Cloud et conteneurs| Amazon ECS<br>AWS EKS (Helm)<br>Docker|

Produits pris en charge (Agent 7.65.0 et versions ultérieures) :
- Métriques
- Logs
- Traces APM
- Profils APM
- Processes
- Orchestrator Explorer
- Runtime Security
- Serverless Monitoring
- [Agent's Collector][4] (l'OpenTelemetry Collector qui s'exécute aux côtés de l'Agent en tant que processus distinct)

Le Datadog Agent FIPS **ne prend pas** en charge les éléments suivants :
- Communication entre le Cluster Agent et les Node Agents
- Communication sortante vers toute destination autre que GovCloud


## Directives de conformité {#compliance-guidelines}
<div class="alert alert-danger">
Il ne s'agit pas d'une liste exhaustive. Ces exigences ne constituent qu'une base de référence. Il vous incombe d'évaluer votre environnement et de mettre en œuvre tous les contrôles supplémentaires nécessaires pour atteindre une conformité FIPS complète.
</div>
Les contrôles de base suivants s'appliquent à chaque plateforme. Votre système peut nécessiter des contrôles supplémentaires :

{{< tabs >}}
{{% tab "Linux" %}}
- Un host Linux non conteneurisé.
- Votre système d'exploitation Linux doit être en mode conforme FIPS. Consultez la documentation de votre fournisseur de système d'exploitation pour connaître les étapes requises pour répondre à cette exigence.
- Un stockage conforme FIPS sous-jacent au système de fichiers du host.
{{% /tab %}}

{{% tab "Windows" %}}
- Un host Windows non conteneurisé.
- Windows doit être en [mode conforme FIPS][1].
- Un stockage conforme FIPS sous-jacent au système de fichiers du host.

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
{{% /tab %}}

{{% tab "AWS Lambda" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
{{% /tab %}}

{{% tab "AWS ECS" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
- Configurez les services de calcul AWS (EC2 ou Fargate) en mode FIPS
- Utilisez un stockage conforme à la norme FIPS pour vos tâches ECS
{{% /tab %}}

{{% tab "AWS EKS" %}}
- Utilisez une région conforme FIPS (par exemple, AWS GovCloud)
- Configurez les nœuds worker EKS en mode FIPS
- Utilisez un stockage conforme à la norme FIPS pour vos nœuds worker EKS
{{% /tab %}}

{{< /tabs >}}

En plus des exigences relatives au système d'exploitation (OS) ci-dessus :
- Vous devez avoir accès à un environnement Datadog conforme à la norme FIPS (US1-FED ou US2-FED).
- La version de l'Agent doit être 7.65.0 ou ultérieure pour accéder à l'Agent FIPS

## Installation {#installation}

{{< tabs >}}
{{% tab "Linux" %}}

1. Installez l'Agent avec la prise en charge FIPS.

   **Remarque :** la prise en charge FIPS est uniquement disponible sur les versions 7.65.0 et ultérieures de l'Agent :
   1. Si vous utilisez le script d'installation de l'Agent, spécifiez la variable d'environnement `DD_AGENT_FLAVOR="datadog-fips-agent"` dans votre commande d'installation. Par exemple :

      <pre><code>DD_SITE="{{< region-param key="dd_site" >}}" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" … bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"</code></pre>
   1. Si vous effectuez l'installation à l'aide d'un package, [suivez les instructions][1] pour installer le dernier package `datadog-fips-agent` disponible pour votre plateforme.
   1. Ajoutez `GOFIPS=1` à vos variables d'environnement Datadog, rechargez toutes les unités de service et redémarrez le service Datadog Agent (`datadog-agent.service`). Par exemple, si votre host utilise systemd :

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
1. Exécutez la commande `datadog-agent status` et assurez-vous de voir `FIPS Mode: enabled` dans la sortie du statut.

{{< img src="/agent/fips-linux.png" alt="Sortie de la commande de statut de l'Agent avec le mode FIPS activé - Linux" style="width:100%;" >}}

[1]: /fr/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

1. Suivez les [instructions Windows][1] pour désinstaller tout Datadog Agent déjà présent sur la machine.
1. Exécutez la commande ci-dessous pour installer l'Agent FIPS, en remplaçant `DATADOG_API_KEY` par votre clé d'API :

   **Remarque :** la prise en charge FIPS est uniquement disponible sur les versions 7.65.0 et ultérieures de l'Agent :

   <pre><code>$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-fips-agent-7-latest.amd64.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="&lt;DATADOG_API_KEY&gt;" SITE="{{< region-param key="dd_site" >}}"'
if ($p.ExitCode -ne 0) {
   Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}</code></pre>

3. Exécutez la commande `status` de l'Agent et assurez-vous de voir `FIPS Mode: enabled` dans la sortie du statut.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Sortie de la commande de statut de l'Agent avec le mode FIPS activé - Windows" style="width:100%;" >}}


**Remarque** : le nom du programme de l'Agent FIPS dans {{< ui >}}Add or Remove Programs{{< /ui >}} est « Datadog FIPS Agent ».

[1]: /fr/agent/basic_agent_usage/windows/#uninstall-the-agent

{{% /tab %}}

{{% tab "AWS Lambda" %}}

Pour la conformité AWS Lambda FIPS, suivez les instructions de la documentation [AWS Lambda FIPS Compliance][1].

[1]: /fr/serverless/aws_lambda/fips-compliance/

{{% /tab %}}

{{% tab "AWS ECS" %}}

Lorsque vous suivez les [instructions d'installation ECS][1], assurez-vous d'utiliser ces valeurs de configuration spécifiques à FIPS pour votre Task Definition :
- Définissez `image` dans l'objet `containerDefinitions` sur `public.ecr.aws/datadog/agent:7-fips`  
- Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}}

[1]: /fr/containers/amazon_ecs/
{{% /tab %}}

{{% tab "AWS EKS" %}}

Lorsque vous suivez les instructions d'[installation du Datadog Agent sur Kubernetes][1], assurez-vous d'inclure ces valeurs de configuration spécifiques à FIPS dans le fichier `datadog-agent.yaml` selon la méthode d'installation choisie :

Pour le Datadog Operator :
<pre><code>spec:
   global:
      site: "{{< region-param key="dd_site" >}}"
      useFIPSAgent: true</code></pre>

Pour le chart Helm Datadog :
<pre><code>datadog:
   site: "{{< region-param key="dd_site" >}}"
useFIPSAgent: true</code></pre>

[1]: /fr/containers/kubernetes/installation/
{{% /tab %}}

{{< /tabs >}}

## Sécurité et renforcement {#security-and-hardening}

En tant que client Datadog, vous êtes responsable de la sécurité et du renforcement du **host**.

**Considérations de sécurité :**
- Bien que les images Datadog fournies soient conçues dans un souci de sécurité, elles n'ont pas été évaluées par rapport aux recommandations des benchmarks CIS ou aux normes DISA STIG.
- Si vous reconstruisez, reconfigurez ou modifiez le Datadog FIPS Agent pour répondre à vos besoins de déploiement ou de test, vous pourriez obtenir une configuration techniquement fonctionnelle, mais Datadog ne peut garantir la conformité FIPS si le Datadog FIPS Agent n'est pas utilisé exactement comme expliqué dans la documentation.
- Si vous n'avez pas suivi les étapes d'installation listées ci-dessus exactement comme indiqué dans la documentation, Datadog ne peut garantir la conformité FIPS.
- Certaines distributions Linux avec `urllib3 ≤ 1.26.20` peuvent ne pas parvenir à effectuer un chiffrement FIPS en raison de bibliothèques non conformes. Vérifiez auprès de votre fournisseur Linux pour vous assurer de la prise en charge du chiffrement conforme à FIPS.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /fr/integrations/guide/fips-integrations
[4]: /fr/opentelemetry/setup/agent/#agents-collector