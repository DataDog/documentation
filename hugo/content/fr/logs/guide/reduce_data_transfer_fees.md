---
algolia:
  tags:
  - data transfer
  - data egress
  - private link
  - PrivateLink
  - Private Service Connect
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Architecture Center
  text: Utilisation d'AWS PrivateLink inter-région pour envoyer des données de télémétrie
    à Datadog
- link: https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/
  tag: Étude de cas AWS
  text: TextNow économise 93 % sur les frais de transfert de données grâce à AWS PrivateLink
- link: /logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs
  tag: Documentation
  text: Sources potentielles pour l'envoi direct vers Flex Logs
title: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
  de données
---
## Présentation {#overview}

À mesure que votre organisation se développe, la quantité de données que vous transférez entre les fournisseurs cloud vers Datadog peut également augmenter. Les fournisseurs cloud facturent des frais de *transfert de données* ou des frais de *sortie de données* pour déplacer ces données du stockage cloud via des adresses IP publiques. Cela peut facilement devenir l'un des postes de dépenses les plus importants de la facture cloud de votre organisation. 

Envoyez des données via un réseau privé pour éviter l'internet public et réduire vos frais de transfert de données. À titre d'exemple de la façon dont les liaisons privées réduisent vos coûts, dans les régions AWS US East, le transfert de 1 Go coûte 0,09 $, mais avec AWS PrivateLink, le coût du transfert de données descend à 0,01 $ par Go.

## Fournisseurs cloud pris en charge {#supported-cloud-providers}

<div class="alert alert-danger">Assurez-vous que le site Datadog sélectionné {{< region-param key="dd_site_name" code="true" >}} est correct. Les liaisons privées spécifiques au cloud ne sont pas disponibles pour tous les sites Datadog.</div>

{{< whatsnext desc="Connectez-vous à Datadog via :" >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap2" >}}AP2 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=uk1" >}}UK1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/?site=eu" >}}EU1 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## Outils supplémentaires {#additional-tools}

Une fois que vous êtes passé aux liens privés, vous pouvez utiliser les éléments suivants pour surveiller votre utilisation et mieux contrôler vos coûts de données :
- [Cloud Network Monitoring][1] de Datadog identifie les applications de votre organisation ayant le débit le plus élevé.
- Les outils de [Cloud Cost Management][2] peuvent vérifier et surveiller la réduction de vos coûts cloud.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/cloud_network_monitoring/
[2]: /fr/cloud_cost_management/
[3]: /fr/agent/guide/private-link/
[4]: /fr/agent/guide/azure-private-link/
[5]: /fr/agent/guide/gcp-private-service-connect/