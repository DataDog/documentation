---
aliases:
- /fr/logs/log_configuration/flex_log/
description: Solution économique permettant d'interroger en direct des logs conservés
  à long terme
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Stocker et analyser efficacement des logs volumineux grâce à Flex Logs
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Surveiller les logs de DNS pour analyser le réseau et la sécurité
- link: https://www.datadoghq.com/blog/cloud-siem-flex-logs/
  tag: Blog
  text: 'Cloud SIEM et Flex Logs : visibilité renforcée sur la sécurité dans le cloud
    (en anglais)'
- link: /logs/guide/flex_compute
  tag: Documentation
  text: Surveiller l'utilisation de Flex Compute
- link: /logs/log_configuration/indexes
  tag: Documentation
  text: Index de logs
- link: /logs/log_configuration/archives
  tag: Documentation
  text: Archives de logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Documentation
  text: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
    de données (en anglais)
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: blog
  text: Comment optimiser les données de logs à fort volume sans compromettre la visibilité
    (en anglais)
- link: https://www.datadoghq.com/blog/monitor-flex-compute-usage/
  tag: Blog
  text: Surveillez et optimisez l'utilisation de calcul de vos Flex Logs (en anglais)
- link: https://www.datadoghq.com/blog/flex-logs/
  tag: Blog
  text: Stockez et analysez efficacement des logs à fort volume avec Flex Logs (en
    anglais)
title: Logs Flex
---

## Section Overview

À mesure que votre organisation se développe, le volume de logs collectés depuis votre infrastructure et vos applications augmente également. Les cas d'utilisation de vos logs deviennent eux aussi plus complexes. Par exemple, vous pouvez collecter des logs provenant de votre infrastructure, de vos applications, de vos outils de sécurité, de votre réseau, etc. Tous ces cas d'utilisation ont des besoins différents en matière de rétention et d'interrogation.

Avec Flex Logs, vos équipes peuvent définir la capacité d'interrogation dont elles ont besoin en fonction de leur cas d'utilisation, qu'il s'agisse d'un incident critique, d'une enquête de sécurité ou d'un audit de conformité. En dissociant les coûts de stockage et de calcul, Flex Logs permet une rétention longue durée de vos logs à moindre coût.

Voici quelques exemples de cas d'utilisation du stockage Flex :

- Conserver des logs pour des audits à long terme.
- Conserver des logs pour des raisons de conformité et d'obligations légales.
- Conserver tous les logs pour les enquêtes de sécurité.
- Interroger des logs à des fins de reporting et d'analyse sur des données à forte cardinalité sur de longues périodes.

## Quand utiliser Flex Logs

La solution Log Management de Datadog propose les solutions suivantes :

- L'indexation standard pour les logs devant être interrogés fréquemment et conservés à court terme, comme les logs d'application.
- Flex Logs pour les logs devant être conservés à long terme, mais qui peuvent nécessiter des interrogations urgentes, comme les logs de sécurité, de transactions ou de réseau.
- L'archivage pour les logs rarement interrogés mais devant être stockés à long terme, comme les logs d'audit ou de configuration.

Servez-vous du spectre des types de logs présenté ci-dessous pour décider quand utiliser la couche Flex Logs. Les sources générant un fort volume de logs, à accès peu fréquent ou nécessitant une conservation longue durée sont de bons candidats. Vous pouvez aussi commencer par stocker vos logs dans l'indexation standard, puis les prolonger avec Flex Logs, une solution idéale pour les logs d'application à conserver plus longtemps. Consultez la section [Sources potentielles à envoyer directement vers la couche Flex Logs](#sources-potentielles-a-envoyer-directement-vers-la-couche-flex-logs) pour plus d'informations.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Graphique du spectre d'indexation et de fréquence d'accès des logs" style="width:100%;" >}}

**Remarques** :
- Les monitors ne sont pas pris en charge dans Flex Logs.
- Watchdog n'est pas pris en charge dans Flex Logs.
- Les dashboards sont compatibles avec Flex Logs. Toutefois, veillez à prendre en compte ces requêtes de dashboard lors du choix de votre taille de calcul.

## Tailles de calcul

Le calcul correspond à la capacité d'interrogation utilisée pour exécuter des requêtes pour Flex Logs. Il est utilisé uniquement lors de l'interrogation des logs dans la couche Flex Logs. Il n'est pas utilisé pour l'ingestion ni pour les recherches sur les logs en indexation standard. Les niveaux de calcul disponibles sont les suivants :

<div class="alert alert-danger">Les tailles de calcul disponibles pour US3, US5, AP1, AP2 et US1-FED sont Starter, XS et S.</div>

- Starter
- Extra small (XS)
- Small (S)
- Medium (M)
- Large (L)

Chaque niveau de calcul offre environ deux fois plus de performance et de capacité d'interrogation que le niveau précédent. La taille de calcul est limitée par le nombre de requêtes simultanées et par le volume maximal de logs pouvant être analysés par requête.

### Déterminer la taille de calcul dont vous avez besoin

Les performances d'interrogation d'un niveau de calcul dépendent de plusieurs facteurs :

- Volume : la quantité de données stockées dans la couche Flex.
- Fenêtre temporelle : la période couverte par la requête, par exemple une fenêtre de 15 minutes comparée à une fenêtre d'un mois de logs.
- Complexité : le type de requête exécutée, par exemple si elle effectue plusieurs niveaux d'agrégation, utilise plusieurs filtres, etc.
- Concurrence : le nombre d'utilisateurs interrogeant Flex Logs simultanément.

Prenez en compte les facteurs suivants pour choisir un niveau de calcul :

- Votre volume quotidien de logs et le nombre de logs stockés dans la couche Flex.
- Le nombre d'utilisateurs interrogeant régulièrement les logs de la couche Flex.
- La fréquence et le type de requêtes que vous exécutez. Par exemple, les fenêtres temporelles que vous utilisez généralement pour interroger vos logs.

Le nombre de logs stockés dans la couche Flex a l'impact le plus important sur la taille nécessaire pour interroger les données efficacement. Datadog recommande les tailles de calcul suivantes en fonction du volume de logs :
| Taille | Volume (événements stockés) |
| ---------------------------------------- | ------------------------------ |
| Starter | < 10 milliards |
| Extra Small (XS) | 10 à 50 milliards |
| Small (S) | 50 à 200 milliards |
| Medium (M) | 200 à 500 milliards |
| Large (L) | 500 milliards à 1 billion |
| Contactez votre [Customer Success Manager][7] | > 1 billion |

Les niveaux de calcul évolutifs (XS, S, M, L) sont facturés à un tarif fixe. Flex Logs Starter est facturé à un tarif groupé stockage + calcul. Consultez la [page de tarification][6] pour plus d'informations.

## Activer et désactiver Flex Logs

Vous pouvez activer ou désactiver Flex Logs au niveau de l'organisation. Vous devez disposer de l'autorisation `flex_logs_config_write` pour cela.

Si Flex Logs fait partie de votre contrat, les options de calcul incluses dans votre contrat s'affichent dans l'interface.

Si Flex Logs ne fait pas partie de votre contrat, vous pouvez activer Flex Logs Starter via l'option d'intégration en libre-service.

Pour activer Flex Logs :
1. Accédez à la page [de contrôle de Flex Logs][5].
1. Sélectionnez **Compute Type**.
    - Datadog recommande la taille de calcul **Starter** pour les organisations stockant moins de 10 milliards de logs.
    - Datadog recommande les options de calcul évolutives (par exemple XS, S, M et L) pour les organisations stockant plus de 10 milliards de logs (ou 2 à 3 milliards par mois).
1. Sélectionnez la taille de calcul souhaitée. Consultez la section [Déterminer la taille de calcul dont vous avez besoin](#determiner-la-taille-de-calcul-dont-vous-avez-besoin) pour plus d'informations.
1. Cliquez sur **Enable Flex Logs**.

### Se désinscrire de Flex Logs en libre-service

Pour désactiver Flex Logs :

1. Supprimez le stockage Flex de chaque index où Flex Logs est activé.
1. Revenez à la page de [contrôle de Flex Logs][5].
1. Cliquez sur l'icône d'engrenage et sélectionnez **Disable Flex Logs**.

## Mettre à niveau ou rétrograder la taille de calcul de Flex Logs

Si vous sélectionnez l'une des options de calcul évolutives pour Flex Logs (par exemple XS, S, M ou L), vous pouvez mettre à niveau ou rétrograder votre taille de calcul depuis la page [de contrôle de Flex Logs][5].

**Remarques** :
- Seules les options de calcul incluses dans votre contrat sont disponibles. Passer de Flex Starter à une option de calcul évolutive n'applique pas automatiquement le changement. Pour activer la nouvelle taille, accédez à la page [de contrôle de Flex Logs][5], sélectionnez l'option de calcul souhaitée, puis cliquez sur **Save**.
- Une instance de calcul peut être mise à niveau à tout moment.
- Une instance de calcul peut être rétrogradée une fois tous les 15 jours.

## Configurer les niveaux de stockage

Flex Logs est configuré dans les configurations d'index de logs. Les [filtres d'index][1] appliqués à cet index s'appliquent également à Flex Logs. Avec Flex Logs Starter, vous pouvez conserver les logs pendant 3, 6, 12 ou 15 mois. Avec une option de calcul évolutive, vous pouvez conserver les logs pendant 30 à 450 jours.

Configurez la couche Flex dans la page [de configuration des index de logs][2] :

1. Accédez à la page des [index][2].
2. Modifiez l'index que vous souhaitez activer avec Flex Logs ou créez un nouvel index.
3. Sélectionnez **Flex Tier** et définissez la rétention sous *Configure Storage Tier and Retention*.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options de stockage pour la couche Flex dans la configuration d'index" style="width:100%;" >}}

**Remarque** : si les deux couches sont sélectionnées, les logs sont stockés dans la couche Standard jusqu'à la fin de la période de rétention configurée, avant d'être stockés dans la couche Flex. Par exemple, si vous sélectionnez la couche Standard avec une rétention de 3 jours et la couche Flex avec une rétention de 90 jours : les logs de cet index sont d'abord stockés dans la couche Standard pendant 3 jours, puis dans la couche Flex pendant les 87 jours restants.

Le tableau suivant explique l'impact de l'ajout ou de la suppression des différents niveaux de stockage dans un index.

<table>
  <tr align="center">
    <td colspan="2"><strong>Configuration d'index existante</strong></td>
    <td rowspan="2"><strong>Action</strong></td>
    <td rowspan="2"><strong>Résultat</strong></td>
  </tr>
<tr align="center">
  <td><strong>Couche Standard</strong></td>
  <td><strong>Couche Flex</strong></td>
</tr>
<tr>
  <td align="center">Activée</td>
  <td align="center">Désactivée</td>
  <td>Activer la couche Flex.</td>
  <td>La rétention des logs existants et des nouveaux logs est prolongée.</td>
</tr>
<tr>
  <td align="center">Désactivée</td>
  <td align="center">Activée</td>
  <td>Activer la couche Standard.</td>
  <td>Les logs existants dans la couche Flex ne sont pas modifiés. Les nouveaux logs sont conservés dans les couches Standard et Flex.</td>
</tr>
<tr>
  <td align="center">Activée</td>
  <td align="center">Désactivée</td>
  <td>Activer la couche Flex et supprimer la couche Standard.</td>
  <td>Les logs ne sont plus interrogeables dans les monitors ni dans Watchdog Insights.</td>
</tr>
</table>

## Rechercher dans la couche Flex Logs

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Activer Flex Logs dans la page Log Explorer en activant l'option" style="width:100%;" >}}

Dans le Log Explorer, activez l'option **Include Flex Logs** pour inclure les logs de la couche Flex dans les résultats de vos requêtes. Cette option se trouve à côté du sélecteur temporel.

Pour effectuer une [recherche][3], saisissez des requêtes dans la barre de recherche, ou sélectionnez la facette de votre choix dans le volet des facettes.

Vous pouvez ajouter des requêtes Flex Logs à vos dashboards, mais veillez à prendre en compte ces requêtes lors du choix de votre taille de calcul.

**Remarque** : les requêtes de monitor ne sont pas prises en charge pour Flex Logs.

## Informations supplémentaires

### Sources potentielles à envoyer directement vers la couche Flex Logs

La liste suivante donne des exemples de sources de logs qui constituent de bons candidats pour être envoyés directement vers la couche Flex, sans passer par l'indexation standard au préalable. Il ne s'agit pas d'une liste exhaustive et elle a pour but de vous donner une idée des types de logs adaptés à cette configuration. D'autres sources de logs (par exemple les logs d'application) peuvent toujours être envoyées vers la couche Flex après avoir été indexées dans l'indexation standard pour des cas d'utilisation liés au dépannage en temps réel, aux alertes ou au débogage. Vos cas d'utilisation pour ces sources peuvent varier, ce qui est important à prendre en compte lors de la décision de contourner l'indexation standard.

**Remarque** : ces exemples représentent un échantillon pour chaque catégorie. Il existe de nombreuses autres catégories, services, outils et technologies que vous pourriez vouloir envoyer directement vers la couche Flex.

| Technologies            | Exemples                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| Gestion des artefacts   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Logs d'audit            | Amazon CloudTrail, logs d'audit Kubernetes, audit Microsoft 365                              |
| Services CDN          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| Services CI/CD        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| Services DNS          | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Services d'identité     | Cisco ISE, Okta, OneLogin, logs d'activité utilisateur Workday                                      |
| Loadbalancers         | AWS ELB, ALB, NLB (versions GCP et Azure), F5, NGINX                                       |
| Équipements réseau    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Services réseau      | WAF, Amazon VPC Flow Logs, AWS ELB, pfSense, Tailscale                                     |
| Maillages de services        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### Flex Logs pour les comptes multi-organisation

Pour chaque organisation dans laquelle vous souhaitez activer Flex Logs, vous devez définir une taille de calcul par organisation. Une seule taille de calcul peut être utilisée par organisation, et les tailles de calcul ne peuvent pas être partagées entre les organisations. Les options Starter et évolutives ne peuvent pas être utilisées simultanément dans une organisation.

Datadog recommande généralement les tailles de calcul évolutives (XS, S, M et L) pour Flex Logs dans les organisations ayant de gros volumes de logs. Dans une configuration multi-organisation, de nombreuses organisations présentent souvent des volumes de logs plus faibles ; pour ces organisations, Datadog recommande la taille de calcul Starter pour Flex Logs.

### Lorsque la limite de calcul est atteinte

Lorsque votre organisation atteint la limite de calcul en termes de requêtes simultanées, vous pouvez constater un ralentissement des requêtes, car celles-ci continuent de réessayer jusqu'à ce que de la capacité soit disponible. Si une requête réessaie plusieurs fois, elle peut échouer. Dans ce cas, un message d'erreur indique que la capacité de calcul Flex Logs est limitée et que vous devez contacter votre administrateur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com