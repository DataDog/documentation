---
aliases:
- /fr/logs/log_configuration/flex_log/
description: Solution rentable permettant d'interroger en direct des logs conservés
  à long terme
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Stockez et analysez efficacement des volumes élevés de logs avec Flex Logs
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Surveiller les logs de DNS pour analyser le réseau et la sécurité
- link: https://www.datadoghq.com/blog/cloud-siem-flex-logs/
  tag: Blog
  text: 'Cloud SIEM et Flex Logs : des informations de sécurité améliorées pour le
    cloud'
- link: /logs/guide/flex_compute
  tag: Documentation
  text: Surveillez l'utilisation de Flex Compute
- link: /logs/log_configuration/indexes
  tag: Documentation
  text: Index de logs
- link: /logs/log_configuration/archives
  tag: Documentation
  text: Archives de logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Documentation
  text: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
    de données
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: blog
  text: Comment optimiser les données de logs à haut volume sans compromettre la visibilité
- link: https://www.datadoghq.com/blog/monitor-flex-compute-usage/
  tag: Blog
  text: Surveillez et optimisez votre utilisation de calcul Flex Logs
- link: https://www.datadoghq.com/blog/flex-logs/
  tag: Blog
  text: Stockez et analysez efficacement des volumes élevés de logs avec Flex Logs
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centre d'apprentissage
  text: Gérer et surveiller les volumes de logs indexés
title: Flex Logs
---
## Présentation {#overview}

À mesure que votre organisation se développe, le volume de logs collectés depuis votre infrastructure et vos applications augmente en conséquence. Les cas d'utilisation de vos logs gagnent également en complexité. Par exemple, vous pouvez collecter des logs depuis votre infrastructure, vos applications, vos outils de sécurité, votre réseau, etc. Tous ces cas d'utilisation ont des besoins variables en matière de rétention et d'interrogation.

Avec Flex Logs, vos équipes peuvent déterminer la capacité d'interrogation dont elles ont besoin pour répondre à leur cas d'utilisation, qu'il s'agisse d'un incident critique, d'une enquête de sécurité ou d'un audit de conformité. En dissociant les coûts de stockage des coûts de calcul, Flex Logs permet une rétention rentable et à long terme de vos logs.

Voici quelques exemples de cas d'utilisation pour le stockage Flex :

- Conservation des logs pour l'audit à long terme.
- Conservation des logs pour des raisons de conformité et juridiques.
- Besoin de tous les logs pour les enquêtes de sécurité.
- Besoin d'interroger des logs pour le reporting et l'analyse de données à haute cardinalité sur de longues périodes.

## Quand utiliser Flex Logs {#when-to-use-flex-logs}

Datadog Log Management propose les solutions suivantes :

- Indexation standard pour les logs qui doivent être interrogés fréquemment et conservés à court terme, comme les logs d'application.
- Flex Logs pour les logs qui doivent être conservés à long terme, mais qui doivent parfois être interrogés en urgence, comme les logs de sécurité, de transaction et de réseau.
- Archivage pour les logs qui sont rarement interrogés et qui doivent être stockés à long terme, comme les logs d'audit et de configuration.

Utilisez le spectre des types de logs illustré dans l'image ci-dessous pour déterminer quand utiliser le niveau Flex Logs. Toutes les sources de logs à volume élevé, à accès peu fréquent ou à conservation à long terme sont de bons candidats. Vous pouvez également conserver les logs dans Standard Indexing en premier, puis les étendre en utilisant Flex Logs ; c'est une solution parfaite pour les logs d'application que vous devez conserver plus longtemps. Voir [Sources potentielles pour l'envoi direct vers le niveau Flex Logs](#potential-sources-for-sending-directly-to-flex-logs) pour plus d'informations.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Graphique du spectre d'indexation des logs et de la fréquence d'accès" style="width:100%;" >}}

**Remarques** :
- Les monitors ne sont pas pris en charge dans Flex Logs.
- Watchdog n'est pas pris en charge dans Flex Logs.
- Les dashboards sont pris en charge dans Flex Logs ; cependant, assurez-vous de prendre en compte ces requêtes de dashboard lorsque vous choisissez votre taille de calcul.

## Tailles de capacité de calcul {#compute-sizes}

Le calcul est la capacité d'interrogation permettant d'exécuter des requêtes pour Flex Logs. Il est utilisé lors de l'interrogation des logs dans le niveau Flex Logs. Il n'est pas utilisé pour l'ingestion ni pour la recherche exclusivement dans Standard Indexing. Les niveaux de calcul disponibles sont :

<div class="alert alert-danger">Les tailles de calcul disponibles pour US3, US5, AP1, AP2, US1-FED et US2-FED sont Starter, XS et S.</div>

- Starter
- Extra small (XS)
- Extra small plus (XS+)
- Small (S)
- Medium (M)
- Grand (L)

Chaque niveau de calcul offre environ 2 fois plus de performances de requête et de capacité que le niveau précédent. La taille de calcul est limitée par le nombre de requêtes simultanées et la limite maximale du nombre de logs pouvant être analysés par requête.

### Déterminez la taille de calcul dont vous avez besoin {#determine-the-compute-size-that-you-need}

Les performances de requête d'un niveau de calcul dépendent de plusieurs facteurs :

- Volume : La quantité de données stockées dans le niveau Flex.
- Fenêtre temporelle : L'espace temporel de la requête, par exemple une fenêtre de 15 minutes par rapport à une fenêtre de logs d'un mois.
- Complexité : Le type de requête que vous exécutez, par exemple, si elle effectue plusieurs niveaux d'agrégation, utilise plusieurs filtres, etc.
- Concurrence : Le nombre d'utilisateurs interrogeant simultanément Flex Logs.

Prenez en compte les facteurs suivants pour choisir un niveau de calcul :

- Votre volume quotidien de logs et le nombre de logs stockés dans le niveau Flex.
- Le nombre d'utilisateurs interrogeant régulièrement les logs du niveau Flex.
- La fréquence et les types de requêtes que vous exécutez. Par exemple, les fenêtres temporelles de requête que vous utilisez généralement pour interroger vos logs.

Le nombre de logs stockés dans le niveau Flex a le plus grand impact sur la taille nécessaire pour interroger les données de manière performante. Datadog recommande les tailles de calcul suivantes en fonction du volume de logs :
| Taille                                      | Volume (événements cumulés stockés)   |
| ----------------------------------------- | ------------------------ |
| Starter                                   | < 10 milliards             |
| Extra Small (XS)                          | 10 - 50 milliards          |
| Extra Small Plus (XS+)                    | 50 - 100 milliards          |
| Small (S)                                 | 100 - 200 milliards         |
| Medium (M)                                | 200 - 500 milliards        |
| Large (L)                                 | 500 milliards - 1 trillion |
| Contactez votre [Customer Success Manager][7]| 1T+                      |

Les niveaux de calcul évolutifs (XS, XS+, S, M, L) sont facturés à un tarif forfaitaire. Flex Logs Starter est facturé à un tarif groupé stockage+calcul. Consultez la [page de tarification][6] pour plus d'informations.

## Activer et désactiver Flex Logs {#enable-and-disable-flex-logs}

Vous pouvez activer ou désactiver Flex Logs au niveau de l'organisation. Vous devez disposer de l'autorisation [`flex_logs_config_write`][8].

Si Flex Logs fait partie de votre contrat, les options de calcul disponibles dans votre contrat sont affichées dans l'interface utilisateur.

Si Flex Logs ne figure pas dans votre contrat, vous pouvez activer Flex Logs Starter via l'option d'intégration en libre-service.

Pour activer Flex Logs :
1. Accédez à la page [Flex Logs Control][5].
1. Sélectionnez {{< ui >}}Compute Type{{< /ui >}}.
    - Datadog recommande la taille de calcul {{< ui >}}Starter{{< /ui >}} pour les organisations ayant moins de 10 milliards de logs stockés.
    - Datadog recommande les options de calcul évolutives (par exemple, XS, XS+, S, M et L) pour les organisations ayant plus de 10 milliards (ou 2 à 3 milliards par mois) de logs stockés.
1. Sélectionnez la taille de calcul souhaitée. Consultez [Déterminer la taille de calcul dont vous avez besoin](#determine-the-compute-size-that-you-need) pour plus d'informations.
1. Cliquez sur {{< ui >}}Enable Flex Logs{{< /ui >}}.

### Désactivez Flex Logs en libre-service {#offboard-from-self-serve-flex-logs}

Pour désactiver Flex Logs :

1. Supprimez Flex Storage de chaque index où Flex Logs est activé.
1. Revenez à la page [Flex Logs Control][5].
1. Cliquez sur l'icône d'engrenage et sélectionnez {{< ui >}}Disable Flex Logs{{< /ui >}}.

## Mettez à niveau et rétrogradez le calcul Flex Logs {#upgrade-and-downgrade-flex-logs-compute}

Si vous sélectionnez l'une des options de calcul évolutives pour Flex Logs (par exemple, XS, XS+, S, M ou L), vous pouvez mettre à niveau ou rétrograder votre taille de calcul sur la page [Flex Logs Control][5].

**Remarques** :
- Seules les options de calcul figurant dans votre contrat sont mises à disposition. La mise à niveau de Flex Starter vers une option de calcul évolutive n'applique pas le changement automatiquement. Pour activer la nouvelle taille, accédez à la page [Flex Logs Controls][5], sélectionnez l'option de calcul souhaitée, puis cliquez sur {{< ui >}}Save{{< /ui >}}.
- Une instance de calcul peut être mise à niveau à tout moment.
- Une instance de calcul peut être rétrogradée une fois tous les 15 jours.

## Configurez les niveaux de stockage {#configure-storage-tiers}

Flex Logs est configuré au sein des configurations d'index de logs. Les [filtres d'index][1] qui s'appliquent à cet index s'appliquent également à Flex Logs. Avec Flex Logs Starter, vous pouvez stocker des logs pendant 3, 6, 12 ou 15 mois. Avec une option de calcul évolutive, vous pouvez stocker des logs pendant 30 à 450 jours. 

Configurez le niveau Flex sur la page [Flex Logs Controls][5] :

1. Cliquez sur [Indexes Configuration][2].
2. Modifiez l'index que vous souhaitez activer avec Flex Logs ou créez un nouvel index.
3. Sélectionnez {{< ui >}}Flex Tier{{< /ui >}} et définissez la durée de conservation sous {{< ui >}}Configure Storage Tier and Retention{{< /ui >}}.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options pour le stockage du niveau Flex dans la configuration de l'index" style="width:100%;" >}}

**Remarque** : Si les deux niveaux sont sélectionnés, les logs sont stockés dans le niveau Standard jusqu'à la fin de la période de conservation configurée, avant d'être stockés dans le niveau Flex. Par exemple, si vous sélectionnez le niveau Standard avec une durée de conservation de 3 jours et le niveau Flex avec une durée de conservation de 90 jours : les logs de cet index sont d'abord stockés dans le niveau Standard pendant 3 jours, puis stockés dans le niveau Flex pour les 87 jours restants.

Le tableau suivant explique l'impact de l'ajout ou de la suppression de différents niveaux de stockage pour un index.

<table>
  <tr align="center">
    <td colspan="2"><strong>Configuration de l'index existant</strong></td>
    <td rowspan="2"><strong>Action</strong></td>
    <td rowspan="2"><strong>Résultat</strong></td>
  </tr>
<tr align="center">
  <td><strong>Niveau Standard</strong></td>
  <td><strong>Niveau Flex</strong></td>
</tr>
<tr>
  <td align="center">Activé</td>
  <td align="center">Désactivé</td>
  <td>Activer le niveau Flex.</td>
  <td>La durée de conservation des logs préexistants et nouveaux est prolongée.</td>
</tr>
<tr>
  <td align="center">Désactivé</td>
  <td align="center">Activé</td>
  <td>Activer le niveau Standard.</td>
  <td>Les logs préexistants dans le niveau Flex ne sont pas modifiés. Les nouveaux logs sont conservés dans les niveaux Standard et Flex.</td>
</tr>
<tr>
  <td align="center">Activé</td>
  <td align="center">Désactivé</td>
  <td>Activer le niveau Flex et supprimer le niveau Standard.</td>
  <td>Les logs ne peuvent plus être interrogés dans les monitors ou dans Watchdog Insights.</td>
</tr>
</table>

## Rechercher le niveau Flex Logs {#search-flex-logs-tier}

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Activez Flex Logging sur la page Log Explorer en activant l'option" style="width:100%;" >}}

Dans le Log Explorer, activez l'option {{< ui >}}Include Flex Logs{{< /ui >}} pour inclure les logs du niveau Flex dans les résultats de votre requête de recherche. Trouvez cette option à côté du sélecteur de temps.

[Rechercher][3] en saisissant des requêtes dans la barre de recherche ou en sélectionnant la facette pertinente dans le panneau des facettes.

Vous pouvez ajouter des requêtes Flex Logs aux dashboards, mais assurez-vous de prendre en compte ces requêtes de dashboards lorsque vous choisissez votre taille de calcul.

**Remarque** : Les requêtes de monitor ne sont pas prises en charge pour Flex Logs.

## Informations supplémentaires {#additional-information}

### Sources potentielles pour un envoi direct vers Flex Logs {#potential-sources-for-sending-directly-to-flex-logs}

La liste suivante est un exemple de sources de logs qui sont de bons candidats pour l'envoi direct de logs vers le niveau Flex, sans être stockés au préalable dans l'indexation standard. Il ne s'agit pas d'une liste exhaustive ; elle est destinée à vous donner une idée des types de logs adaptés à cette configuration. D'autres sources de logs (par exemple, les logs d'application) peuvent toujours être envoyées vers le niveau Flex après être passées par l'indexation standard pour les cas d'utilisation de dépannage en direct, d'alerte et de débogage. Vos cas d'utilisation pour ces sources peuvent varier, ce qui est important à prendre en compte lors de la décision de contourner l'indexation standard.

**Remarque** : Ces exemples sont un échantillon pour chaque catégorie. Il existe bien d'autres catégories, services, outils et technologies que vous pourriez souhaiter envoyer directement vers le niveau Flex.

| Technologie            | Exemples                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| Gestion des artefacts   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Logs d'audit            | Amazon Cloudtrail, logs d'audit Kubernetes, logs d'audit Microsoft 365                              |
| Services CDN          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| Services CI/CD        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| Services DNS          | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Services d'identité     | Cisco ISE, Okta, OneLogin, logs d'activité utilisateur Workday                                      |
| Équilibreurs de charge         | AWS ELB, ALB, NLB (variantes GCP et Azure), F5, NGINX                                       |
| Appareils réseau    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Services réseau      | WAF, logs de flux Amazon VPC, AWS ELB, pfSense, Tailscale                                     |
| Maillages de services        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### Flex Logs pour les comptes multi-organisations {#flex-logs-for-multiple-organization-accounts}

<div class="alert alert-danger">Chaque organisation ne peut utiliser qu'une seule taille de calcul à la fois. Les tailles de calcul ne peuvent pas être partagées entre les organisations, et les tailles de calcul starter et scalable ne peuvent pas être utilisées simultanément au sein d'une même organisation.</div>

Pour chaque organisation où vous souhaitez utiliser Flex Logs, vous devez activer une taille de calcul. Datadog recommande les tailles de calcul scalable Flex Logs (XS, XS+, S, M et L) pour les organisations ayant des volumes de logs importants. Dans une configuration multi-organisation, il existe souvent de nombreuses organisations avec des volumes de logs plus faibles ; pour ces organisations, Datadog recommande donc la taille de calcul Starter pour Flex Logs.

### Lorsque la limite de calcul est atteinte {#when-the-compute-limit-is-reached}

Lorsque votre organisation atteint la limite de calcul en termes de requêtes simultanées, vous pouvez constater un ralentissement des requêtes, car celles-ci continuent de réessayer jusqu'à ce que la capacité soit disponible. Si une requête réessaie plusieurs fois, elle peut échouer. Dans de telles situations, un message d'erreur indique que la capacité de calcul Flex Logs est limitée et que vous devez contacter votre administrateur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/#log-management