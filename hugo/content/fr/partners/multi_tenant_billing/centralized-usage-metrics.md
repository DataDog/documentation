---
description: Surveillez les métriques d'utilisation sur toutes les organisations clientes
  connectées depuis un Admin Org.
title: Métriques d'utilisation centralisées
---
## Présentation {#overview}

Les métriques d'utilisation centralisées permettent à la Partner Admin Organization (Admin Org) de superviser les métriques d'utilisation et les métriques d'utilisation estimées de chaque organisation cliente connectée. Les métriques sont regroupées dans l'Admin Org, taguées par client, afin que les partenaires puissent filtrer et attribuer l'utilisation sur l'ensemble de leur portefeuille d'activités à partir d'un seul ensemble de dashboards, monitors et alertes.

Datadog produit deux types de métriques d'utilisation :

- **Métriques d'utilisation estimées** dans l'espace de nom `datadog.estimated_usage.*`. Ces métriques sont mises à jour en quelques minutes et offrent une vue quasi en temps réel de l'utilisation. Les métriques d'utilisation estimées peuvent différer de l'utilisation facturable d'environ 10 à 20 % en moyenne, avec une variance plus importante pour les organisations à faible utilisation. Consultez [Métriques d'utilisation estimées][1] pour obtenir la référence complète des métriques.
- **Métriques d'utilisation** dans la source de requête {{< ui >}}Usage{{< /ui >}}. Ces métriques proviennent du même pipeline de mesure et de facturation que celui qui génère la facture, elles suivent donc de près le Plan & Usage. Les métriques d'utilisation sont moins immédiates que les métriques d'utilisation estimées, mais suffisamment précises pour les discussions liées à la facturation.

Utilisez les métriques d'utilisation estimées pour détecter rapidement les pics d'utilisation, et les métriques d'utilisation pour rapporter des chiffres qui correspondent à la facture.

## Tags d'attribution {#attribution-tags}

Les métriques regroupées comportent deux tags :

- `account_name` : Le nom de l'organisation parente (Admin Org).
- `child_org_name` : Le nom de l'organisation enfant (l'organisation cliente), par rapport au parent.

## Interroger les métriques d'utilisation {#query-usage-metrics}

Lors de la création d'un widget de dashboard ou d'un monitor :

- Pour les métriques d'utilisation estimées, sélectionnez {{< ui >}}Metrics{{< /ui >}} comme source et utilisez une métrique `datadog.estimated_usage.*`.
- Pour les métriques d'utilisation, sélectionnez {{< ui >}}Usage{{< /ui >}} comme source et choisissez un type d'utilisation, par exemple {{< ui >}}Infra Hosts{{< /ui >}}.

Pour les métriques d'utilisation estimées, utilisez le tag `child_org_name` pour filtrer ou regrouper la requête. Par exemple, interrogez l'utilisation estimée des hosts d'infrastructure pour chaque client :

```
sum:datadog.estimated_usage.hosts{*} by {child_org_name}
```

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Source de métriques affichant les métriques d'utilisation estimées et le tag child_org_name." style="width:100%;" >}}

Pour les métriques d'utilisation, filtrez par `child_org_name` pour limiter la requête à un seul client, ou regroupez par `child_org_name` pour comparer les clients.

{{< img src="partners/multi_tenant_billing/usage_source_infra_hosts.png" alt="Source de requête d'utilisation avec Infra Hosts sélectionné." style="width:100%;" >}}

Pour correspondre aux totaux de Plan & Usage, utilisez un cumul d'une heure pour les produits de type host et un graphique en UTC, car les rapports Plan & Usage sont en UTC.

## Documentation associée {#related-docs}

- [Visibilité des coûts et de l'utilisation][2] : données sur les coûts et l'utilisation facturable pour l'ensemble des organisations clientes connectées.

[1]: /fr/account_management/billing/usage_metrics/
[2]: /fr/partners/multi_tenant_billing/cost-and-usage-visibility/