---
description: Comprenez les cycles de facturation, les méthodes de paiement, les calculs
  d'utilisation et le comptage des hosts grâce à des informations tarifaires détaillées
  sur les produits Datadog.
title: Facturation
---
## Présentation {#overview}

Le cycle de facturation commence le premier jour du mois (UTC), quelle que soit la date de votre inscription. Votre premier mois est calculé au prorata en fonction de votre date d'inscription réelle.

Datadog mesure le nombre de hosts et de Custom Metrics toutes les heures. Le nombre facturable de hosts est calculé à la fin du mois en utilisant le nombre maximal (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture. Le nombre de Custom Metrics facturables est basé sur le nombre moyen d'heures de Custom Metrics pour le mois. Consultez votre [Usage][1] dans Datadog. Les pages de facturation ne sont accessibles qu'aux utilisateurs disposant du rôle Datadog Admin.

### Hôtes {#hosts}

Un host est toute instance de système d'exploitation physique ou virtuelle que vous surveillez avec Datadog. Il peut s'agir d'un serveur, d'une VM, d'un nœud (dans le cas de Kubernetes), d'une instance de plan de service d'application (dans le cas d'Azure App Service) ou d'un dyno Heroku (dans le cas de la plateforme Heroku). Les hosts peuvent être des instances sur lesquelles le Datadog Agent est installé, ainsi que des instances Amazon EC2, Google Cloud, Azure ou des VM vSphere surveillées via les intégrations Datadog. Toute instance EC2 ou VM sur laquelle l'Agent est installé compte comme une seule instance (pas de double facturation).

Les hosts qui ne transmettent pas de données (statut `INACTIVE` dans votre [Infrastructure list][2]) ne sont pas pris en compte dans la facturation. Il peut s'écouler jusqu'à 2 heures avant que ces hosts ne disparaissent de l'[Infrastructure List][2]. Datadog conserve les données historiques de ces hosts (comptes payants). Les métriques peuvent être représentées graphiquement sur un tableau de bord en connaissant le nom spécifique du host ou ses tags.

### Containers {#containers}

Il est recommandé de surveiller les conteneurs avec un seul Agent conteneurisé par host. Cet Agent collecte à la fois les métriques des conteneurs et celles du host. Si vous choisissez d'installer l'Agent directement dans chaque conteneur, chaque conteneur est compté comme un host du point de vue de la facturation. Plus de détails sont disponibles dans la documentation sur l'[installation de l'Agent][3].

### Serverless {#serverless}

Datadog facture en fonction du nombre moyen de fonctions par heure sur le mois pour vos comptes. Chaque heure, Datadog enregistre le nombre de fonctions qui ont été exécutées une ou plusieurs fois et surveillées par votre compte Datadog. À la fin du mois, Datadog calcule le montant facturé à partir de la moyenne des nombres de fonctions enregistrés chaque heure. Les forfaits Pro et Enterprise incluent cinq Custom Metrics par fonction facturable.

La facturation de Serverless APM repose sur le nombre total d'invocations AWS Lambda associées à des spans ingérés par l'APM au cours d'un mois donné. Vous serez également facturé pour le nombre total de [spans indexés][4] transmis au service Datadog APM à la fin du mois qui dépasse la quantité incluse. Aucun [APM Hosts][4] n'est facturable lorsque vous utilisez Serverless.

Pour plus d'informations, consultez la [page de facturation Serverless][5] et la [page de tarification Datadog][6].

### IoT {#iot}

Datadog mesure le nombre d'appareils IoT toutes les heures. Le nombre facturable d'appareils IoT est calculé à la fin du mois à partir du nombre maximal relevé parmi les 99 % d'heures où l'utilisation est la plus faible, en excluant les 1 % d'heures où elle est la plus élevée afin de réduire l'impact des pics d'utilisation sur votre facture.

Pour plus d'informations sur la facturation IoT, consultez la [page de tarification Datadog][7].

## Détails du forfait {#plan-details}

Pour gérer vos {{< ui >}}Payment Method{{< /ui >}} et afficher {{< ui >}}Subscription Details{{< /ui >}}, vous devez être un utilisateur Datadog Admin.

Sinon, les rôles disposant des [autorisations][8] Billing Read (`billing_read`) et Contract Read (`contract_read`) peuvent consulter ces données. La gestion de votre mode de paiement nécessite également l'autorisation Billing Edit (`billing_edit`).

### Gestion de votre mode de paiement {#managing-your-payment-method}

La section [**Payment Method**][9] contient des détails sur vos options de paiement. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Mode de paiement sur la page Plan" style="width:90%;" >}}

{{< ui >}}Edit Payment{{< /ui >}} fournit des options pour gérer les modes de paiement. Vous pouvez modifier ou supprimer des cartes, et demander à passer d'un paiement par carte à un paiement sur facture, ou inversement. 

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Paramètres de paiement sur la page Plan" style="width:90%;" >}}

### Gestion de vos coordonnées de facturation {#managing-your-billing-contact-details}

Vous pouvez consulter vos coordonnées de facturation dans la section [**Billing Contact Details**][9]. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Coordonnées de facturation sur la page Plan" style="width:90%;" >}}

{{< ui >}}Edit Details{{< /ui >}} pour ajouter, modifier ou supprimer votre adresse de facturation. Vous pouvez également spécifier les adresses e-mail auxquelles les factures doivent être envoyées.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Modification des coordonnées de facturation sur la page Plan" style="width:90%;" >}}

**Remarque** : L'adresse e-mail n'a pas besoin d'être celle d'un membre de l'équipe au sein de Datadog. Par exemple, vous pourriez utiliser `invoices@example.com`.

### Voir les détails de votre abonnement {#view-your-subscription-details}

La section [Subscription Details][9] inclut la quantité, le prix contractuel et le prix à la demande pour tous les produits faisant l'objet d'un engagement.

{{< img src="/account_management/billing/subscription_details.png" alt="Page Account Plan & Usage mettant en évidence la section Subscription Details" style="width:90%;" >}}

**Remarque** : Si votre facturation est gérée directement par un partenaire Datadog, la section Subscription Details n'est pas disponible.

## Paiement {#payment}

Il existe deux choix pour le mode de paiement :
- Carte de crédit
- Facturation (ACH, virement ou chèque)

### Carte de crédit {#credit-card}

Si vous payez par carte de crédit, les reçus des mois précédents sont accessibles aux [Administrators][10] dans [Billing History][11]. Pour obtenir des copies de vos factures, envoyez un e-mail à [Datadog billing][13].

Consultez [Facturation par carte de crédit][12] pour plus de détails.

### Facturation {#invoicing}

Si vous payez par chèque, ACH ou virement, les factures sont envoyées par e-mail aux adresses e-mail de facturation vers le 10e jour ouvrable de chaque mois. Pour demander une copie supplémentaire, envoyez un e-mail à [Datadog billing][13]. Les détails sur l'endroit où effectuer le paiement se trouvent sur la facture.

## Contact {#contact}

| Question ou préoccupation                                                                                                                                                                               | Contact                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Litige et demande de crédit<br>Utilisation<br>Changement de mode de paiement<br>Problème de paiement<br>Questions générales sur le compte<br>Mise à jour des contacts<br>Relevé de compte<br>Mise à jour des informations de facturation et d'expédition | success@datadoghq.com        |
| Copies de factures<br>Demandes urgentes concernant les frais<br>Détail de la facturation<br>Invitation au portail                                                                                                        | billing@datadoghq.com        |
| Remise de paiement                                                                                                                                                                                | remittances@datadoghq.com    |
| Copies de bons de commande                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Pour aller plus loin {#further-reading}

{{< whatsnext desc="Sujets de facturation spécifiques :">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Tarification{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Détails de l’utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métriques d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Carte de crédit{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Gestion des logs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (traçage distribué et Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}Intégration AWS{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Intégration Azure{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Intégration Alibaba{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Intégration Google Cloud{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}Intégration vSphere{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Attribution de l'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credits/" >}}Crédits IA{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credit_limits/" >}}Limites de crédits IA{{< /nextlink >}}
{{< /whatsnext >}}



[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /fr/infrastructure/
[3]: /fr/agent/
[4]: /fr/account_management/billing/pricing/#apm
[5]: /fr/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /fr/account_management/rbac/permissions/#billing-and-usage
[9]: https://app.datadoghq.com/billing/plan
[10]: /fr/account_management/rbac/#datadog-default-roles
[11]: https://app.datadoghq.com/account/billing_history
[12]: /fr/account_management/billing/credit_card/
[13]: mailto:billing@datadoghq.com