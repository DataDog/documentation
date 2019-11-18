---
title: Facturation
kind: documentation
---
## Présentation

Le cycle de facturation commence le premier jour du mois, quelle que soit votre date d'inscription. Votre premier mois est calculé au prorata en fonction de votre date d'inscription.

Datadog mesure le nombre total de hosts, de conteneurs et de métriques custom toutes les heures. La quantité de hosts et de conteneurs facturable est calculée à la fin du mois en prenant la limite inférieure du 99e centile d'utilisation durant ces heures. Le dernier centile est exclu afin de réduire l'impact des pics d'utilisation sur votre facture. La quantité de métriques custom facturable est basée sur le nombre moyen de métriques custom par heure pour le mois. Consultez votre page [Usage][1] dans Datadog.

### Hosts

Les hosts correspondent aux instances sur lesquelles l'Agent Datadog est installé, ainsi qu'aux EC2 AWS et aux machines virtuelles GCP, Azure ou vSphere surveillées avec nos intégrations. Les instances EC2 ou les machines virtuelles sur lesquelles l'Agent est installé comptent comme une seule instance (pas de double facturation).

Les hosts qui n'envoient pas de données (statut `???` dans votre [liste d'infrastructures][2]) ne sont pas pris en compte dans la facturation. Jusqu'à 2 heures peuvent être nécessaires pour que ces hosts disparaissent de la [liste d'infrastructures][2]. Datadog conserve les données historiques pour ces hosts (comptes abonnés à une offre). Les métriques peuvent être représentées graphiquement sur un dashboard en spécifiant le hostname spécifique ou les tags.

### Conteneurs

Il est conseillé de surveiller les conteneurs avec un seul Agent conteneurisé par host. Cet Agent recueille les métriques de conteneur et de host. Si vous choisissez d'installer l'Agent directement dans chaque conteneur, chaque conteneur est compté comme un host lors de la facturation. Pour en savoir plus, consultez la documentation relative à l'[installation de l'Agent][3].

### Environnement sans serveur

La facturation de Datadog repose sur le nombre moyen de fonctions par heure sur un mois pour l'ensemble de vos comptes. Les offres Pro et Enterprise prévoient jusqu'à 40 métriques custom par fonction facturée. Chaque heure, Datadog enregistre le nombre de fonctions exécutées une ou plusieurs fois et surveillées par votre compte Datadog. À la fin du mois, Datadog détermine le montant à facturer en calculant la moyenne horaire du nombre de fonctions enregistrées. Pour en savoir plus, consultez la [page Facturation des fonctions sans serveur][4] ainsi que la [page de tarification de Datadog][5].

## Factures

Si vous payez par carte bancaire, les reçus des mois précédents sont disponibles pour les [Administrateurs][6] dans [l'historique de facturation][7].

Si vous payez par chèque ou virement, les factures sont envoyées aux adresses e-mail de facturation à leur échéance. Si vous souhaitez recevoir un exemplaire supplémentaire, envoyez un e-mail à [l'équipe Facturation de Datadog][8].

### E-mails de facturation

Vous pouvez définir des adresses e-mail spécifiques afin de recevoir des factures dans la section **Manage Billing Emails** de la page [Plan][9] :

{{< img src="account_management/billing/billing01.png" alt="Gérer les e-mails de facturation" responsive="true">}}

**Remarque** : l'adresse e-mail ne doit pas nécessairement correspondre à un membre de l'équipe dans Datadog. Par exemple, vous pouvez utiliser `factures@votresociete.com`.

## Pour aller plus loin

{{< whatsnext desc="Rubriques concernant la facturation :">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Tarification{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}Détails d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Carte bancaire{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Métriques custom{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Conteneurs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log Management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_distributed_tracing/" >}}APM et tracing distribué{{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Informatique sans serveur{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}Intégration AWS{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Intégration Azure{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Intégration Google Cloud{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}Intégration vSphere{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /fr/graphing/infrastructure
[3]: /fr/agent
[4]: https://docs.datadoghq.com/fr/account_management/billing/serverless
[5]: https://www.datadoghq.com/pricing/#included_serverless_functions-d
[6]: /fr/account_management/team/#datadog-user-roles
[7]: https://app.datadoghq.com/account/billing_history
[8]: mailto:billing@datadoghq.com
[9]: https://app.datadoghq.com/account/billing