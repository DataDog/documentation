---
aliases:
- /fr/security_platform/cloud_workload_security/getting_started
- /fr/security/cloud_workload_security/getting_started
- /fr/security/cloud_workload_security/setup
- /fr/security/threats/setup
- /fr/security_platform/cspm/getting_started
- /fr/security/cspm/getting_started
- /fr/security/cspm/setup
- /fr/security/misconfigurations/setup
further_reading:
- link: /getting_started/cloud_security_management
  tag: Documentation
  text: Débuter avec Cloud Security Management
- link: security/default_rules
  tag: Documentation
  text: Explorer les règles de conformité de configuration cloud par défaut
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: Blog
  text: En savoir plus sur la solution Cloud Runtime Security de Datadog
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: Blog
  text: Comment détecter les menaces de sécurité à l'encontre des processus Linux
    de vos systèmes
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: Blog
  text: Présentation de la vulnérabilité PwnKit, méthodes de détection et remédiation
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: Blog
  text: Présentation de la vulnérabilité Dirty Pipe, méthodes de détection et remédiation
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: Blog
  text: Utiliser la vulnérabilité Dirty Pipe pour sortir de conteneurs
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: Blog
  text: Intercepter les attaques au niveau de la couche réseau grâce à la détection
    des menaces basées sur le DNS
title: Configurer Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management n'est pas disponible pour le site Datadog que vous avez sélectionné <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Cloud Security Management est désormais disponible sous trois formules différentes : CSM Enterprise, CSM Pro et CSM Workload Security. Pour en savoir plus, consultez la section <a href="https://www.datadoghq.com/blog/cloud-security-management-changes/">Évolution de Datadog Cloud Security Management</a>.</div>

La solution Cloud Security Management (CSM) détecte les menaces en temps réel et effectue des audits de configuration en continu sur toute votre infrastructure cloud. Les résultats sont ensuite affichés dans une vue unifiée pour faciliter la collaboration et accélérer les mesures de remédiation.

CSM est disponible en trois formules : [CSM Enterprise][1], [CSM Pro][2] et [CSM Workload Security][3]. Chaque formule offre un accès à certaines fonctionnalités, comme le montre le tableau suivant :

<table>
    <tr>
        <th>Formule</th>
        <th>Fonctionnalités</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (comptes cloud et Agent)</a></li><li style="font-size:16px"><a href="/security/identity_risks">Identity Risks</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">Vulnerabilities (images de conteneur et hosts)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (comptes cloud)</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">Vulnerabilities (images de conteneur)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li></ul></td>
    </tr>
</table>

**Remarques** : 

- Vous pouvez à tout moment activer des fonctionnalités non comprises dans votre formule en suivant les instructions sur la [page Configuration de CSM][4].
- Les produits CSM Identity Risks et CSM Vulnerabilities sont en version bêta. Pour les configurer, consultez les sections [Cloud Security Management Identity Risks][5] et [Configurer Cloud Security Management Vulnerabilities][6].

## Prérequis

{{< tabs >}}
{{% tab "CSM Enterprise" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{% tab "CSM Pro" %}}

Pour [activer CSM Pro][1], vous devez d'abord configurer les intégrations de compte cloud Datadog pour AWS, Azure et Google Cloud Platform.

[1]: /fr/security/cloud_security_management/setup/csm_pro

{{% /tab %}}

{{% tab "CSM Workload Security" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{< /tabs >}}

## Étapes suivantes

Pour commencer à implémenter CSM, accédez à la section [**Security** > **Setup**][3] dans Datadog. Vous y trouverez des instructions détaillées pour configurer et activer CSM. Vous pouvez également consulter les sections [CSM Enterprise][1], [CSM Pro][2] et [CSM Workload Security][3] pour plus de détails.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup/csm_enterprise
[2]: /fr/security/cloud_security_management/setup/csm_pro
[3]: /fr/security/cloud_security_management/setup/csm_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /fr/security/identity_risks/#setup
[6]: /fr/security/infrastructure_vulnerabilities/setup