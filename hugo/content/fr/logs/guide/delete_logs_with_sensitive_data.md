---
disable_toc: false
further_reading:
- link: logs/guide/manage-sensitive-logs-data-access/
  tag: Documentation
  text: Gérer l'accès aux données de logs sensibles
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
- link: /account_management/delete_data/
  tag: Documentation
  text: Supprimer des données
title: Supprimer les logs contenant des données sensibles
---
## Présentation {#overview}

La suppression des logs contenant des données sensibles réduit le risque d'exposition de ces données. Ce guide fournit des informations sur la façon de :

- Vérifier si les logs contenant des données sensibles doivent être supprimés car ils se trouvent dans la période de rétention.
- Rendre les logs contenant des données sensibles non interrogeables.
- Masquer les données sensibles avec le Sensitive Data Scanner.
- Supprimer les logs avec Logs Data Deletion.

## Vérifiez votre période de rétention des logs {#check-your-log-retention-period}

Datadog supprime automatiquement les logs qui dépassent la période de rétention la plus longue pour votre organisation.

Pour vérifier ou modifier votre période de rétention des logs :

1. Accédez à la page [Log Indexes][1].
1. Consultez la période de rétention des logs pour chaque index dans la colonne {{< ui >}}Retention{{< /ui >}}.
1. Si vous souhaitez que les logs expirent plus rapidement, cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} située sur le côté droit de l'index.
1. Mettez à jour le menu déroulant **Set Index Retention** avec une nouvelle période de rétention.

## Rendre les logs contenant des données sensibles non interrogeables {#make-logs-with-sensitive-data-un-queryable}

Si les logs au sein de la période de rétention contiennent des données sensibles, vous pouvez les rendre non interrogeables jusqu'à ce qu'ils expirent. Les logs non interrogeables n'apparaissent pas dans le Log Explorer, les Dashboards ou le Live Tail. Suivez ces [instructions][2] pour rendre les logs contenant des données sensibles non interrogeables dans Datadog.

## Supprimer un index entier {#delete-an-entire-index}

Pour supprimer un index entier :

1. Accédez à la page [Log Indexes][1].
1. Cliquez sur l'icône {{< ui >}}Delete{{< /ui >}} située à droite de l'index que vous souhaitez supprimer.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}} pour supprimer l'index.

## Masquer les données sensibles avec Sensitive Data Scanner {#redact-sensitive-data-with-sensitive-data-scanner}

Utilisez [Sensitive Data Scanner][5] pour limiter le risque de stockage de données sensibles dans Datadog. Sensitive Data Scanner est un service de correspondance de modèles basé sur les flux, utilisé pour identifier, taguer et éventuellement masquer ou hacher des données sensibles. Les équipes de sécurité et de conformité peuvent implémenter Sensitive Data Scanner pour prévenir les fuites de données sensibles et limiter les risques de non-conformité.

## Supprimer des logs de votre organisation {#delete-logs-from-your-organization}

Pour supprimer définitivement les logs indexés contenant des données sensibles, utilisez [Logs Data Deletion][3]. Logs Data Deletion vous permet d'interroger des logs sur une période donnée et de les supprimer de votre organisation sans contacter le support Datadog.

Avant de supprimer des logs, confirmez les points suivants :

- Vous avez arrêté d'envoyer à Datadog les logs contenant des données sensibles.
- Logs Data Deletion est [activé pour votre organisation][6]. Seul un administrateur d'organisation peut l'activer.
- Vous disposez d'un rôle avec l'autorisation {{< ui >}}Logs Delete Data{{< /ui >}}.

<div class="alert alert-danger">Les suppressions sont définitives après 10 jours. Examinez chaque demande de suppression avant de la confirmer.</div>

**Remarque** : Logs Data Deletion ne supprime pas les données dérivées des logs supprimés, telles que les métriques générées.

Pour la procédure complète, y compris comment annuler et auditer les suppressions, consultez [Delete Data][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /fr/logs/guide/manage-sensitive-logs-data-access/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /fr/account_management/delete_data/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
[6]: /fr/account_management/delete_data/#enable-deletion-feature