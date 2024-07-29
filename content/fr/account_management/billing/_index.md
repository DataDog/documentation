---
title: Facturation
---

## Présentation

Le cycle de facturation commence le premier jour du mois (UTC), quelle que soit votre date d'inscription. Votre premier mois est calculé au prorata en fonction de votre date d'inscription.

Datadog mesure le nombre total de hosts et de métriques custom toutes les heures. La quantité de hosts facturable est calculée à la fin du mois en prenant la limite inférieure du 99e centile d'utilisation durant ces heures. Le dernier centile est exclu afin de réduire l'impact des pics d'utilisation sur votre facture. La quantité de métriques custom facturable est basée sur le nombre moyen de métriques custom par heure pour le mois. Consultez votre page [Usage][1] dans Datadog pour en savoir plus. Seuls les utilisateurs disposant d'un rôle admin dans Datadog peuvent accéder aux pages de facturation.

### Hosts

Un host est une instance de système d'exploitation physique ou virtuelle que vous surveillez avec Datadog. Il peut s'agir d'un serveur, d'une machine virtuelle, d'un nœud (pour Kubernetes), d'un plan App Service (pour Azure App Service), ou encore d'un dyno Heroku (dans le cas de la plateforme Heroku). Les hosts peuvent désigner les instances sur lesquelles l'Agent Datadog est installé, ainsi que toute machine virtuelle Amazon EC2, Google Cloud, Azure ou vSphere surveillée par les intégrations Datadog. Les instances EC2 ou les machines virtuelles sur lesquelles l'Agent est installé comptent comme une seule instance (pas de double facturation).

Les hosts qui n'envoient pas de données (statut `???` dans votre [liste d'infrastructures][2]) ne sont pas pris en compte dans la facturation. Jusqu'à 2 heures peuvent être nécessaires pour que ces hosts disparaissent de la [liste d'infrastructures][2]. Datadog conserve les données historiques pour ces hosts (comptes abonnés à une offre). Les métriques peuvent être représentées graphiquement sur un dashboard en spécifiant le hostname spécifique ou les tags.

### Conteneurs

Il est conseillé de surveiller les conteneurs avec un seul Agent conteneurisé par host. Cet Agent recueille les métriques de conteneur et de host. Si vous choisissez d'installer l'Agent directement dans chaque conteneur, chaque conteneur est compté comme un host lors de la facturation. Pour en savoir plus, consultez la documentation relative à l'[installation de l'Agent][3].

### Environnement sans serveur

La facturation de Datadog repose sur le nombre moyen de fonctions par heure sur un mois pour l'ensemble de vos comptes. Chaque heure, Datadog enregistre le nombre de fonctions exécutées une ou plusieurs fois et surveillées par votre compte Datadog. À la fin du mois, Datadog détermine le montant à facturer en calculant la moyenne horaire du nombre de fonctions enregistrées. Les offres Pro et Enterprise comprennent cinq métriques custom par fonction facturable.

La facturation pour APM sans serveur dépend du nombre total d'invocations AWS Lambda associées aux spans APM ingérées sur un mois donné. Vous payez également pour le nombre total de [spans indexées][4] qui sont envoyées au service APM Datadog et qui dépassent la quantité incluse avec votre offre à la fin du mois. Les [hosts APM][4] ne sont pas facturés pour la surveillance sans serveur.

Pour en savoir plus, consultez la [page Facturation des fonctions sans serveur][5] et la page [Tarification Datadog][6].

### IoT

Datadog mesure le nombre d'appareils IoT toutes les heures. La quantité d'appareils IoT facturable est calculée à la fin du mois en prenant la limite inférieure du 99e centile d'utilisation durant ces heures. Le dernier centile est exclu afin de réduire l'impact des pics d'utilisation sur votre facture.

Pour en savoir plus sur la facturation des appareils IoT, consultez la page des [tarifs][7].

## Détails de l'abonnement

Pour gérer votre **mode de paiement** et voir les **détails de l'abonnement**, vous devez être un utilisateur Datadog Admin.

Les rôles disposant des [autorisations][8] de lecture des factures (`billing_read`) et de modification des factures (`billing_edit`) peuvent également consulter ces informations.

### Gérer votre moyen de paiement

La section [**Payment Method**][9] affiche des informations sur vos moyens de paiement.

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Section Payment Method sur la page de l'abonnement" style="width:90%;" >}}

Cliquez sur **Edit Payment** pour afficher les options de gestion des moyens de paiement. Vous pouvez modifier ou supprimer des cartes, ou encore demander à passer du mode de paiement par carte au mode de paiement par facture (et inversement).

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Paramètres de paiement sur la page de l'abonnement" style="width:90%;" >}}

### Gérer vos coordonnées de facturation

Vous pouvez consulter vos coordonnées de facturation depuis la section [**Billing Contact Details**][9]. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Section Billing Contact Details sur la page de l'abonnement" style="width:90%;" >}}

Cliquez sur **Edit Details** pour ajouter, modifier ou supprimer votre adresse de facturation. Vous pouvez également spécifier l'adresse e-mail à laquelle les factures doivent être envoyées.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Option de modification des coordonnées de facturation sur la page de l'abonnement" style="width:90%;" >}}

**Remarque** : l'adresse e-mail ne doit pas nécessairement correspondre à un membre de l'équipe dans Datadog. Par exemple, vous pouvez utiliser `factures@exemple.com`.

### Consulter les détails de votre abonnement

La section [Subscription Details][9] indique la quantité, le prix fixé dans le contrat et le prix à la demande pour tous les produits souscrits.

{{< img src="/account_management/billing/subscription_details.png" alt="Section Subscription Details mise en évidence sur la page Account Plan & Usage" style="width:90%;" >}}

**Remarque** : si vous passez par un partenaire Datadog pour votre facturation, la section Subscription Details n'affiche aucune information.

## Paiement

Vous pouvez choisir parmi deux modes de paiement différents :
- Paiement par carte bancaire
- Paiement via factures (ACH, virement ou chèque)

### Paiement par carte bancaire

Si vous payez par carte bancaire, les [administrateurs][10] peuvent consulter les reçus des mois précédents dans [l'historique de facturation][11]. Pour obtenir un double d'une facture, envoyez un e-mail au [service Facturation de Datadog][12].

Consultez la section [Paiements par carte bancaire][13] pour en savoir plus.

### Factures

Si vous payez par chèque, transfert ACH ou virement, les factures sont envoyées aux adresses e-mail de facturation renseignées aux alentours du 10e jour ouvrable de chaque mois. Pour obtenir un double d'une facture, envoyez un e-mail au [service Facturation de Datadog][12]. Les coordonnées de paiement à utiliser sont disponibles sur les factures.

## Contact

| Questions ou demandes                                                                                                                                                                               | Contact                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Litige et demande de crédit<br>Utilisation<br>Changement de mode de paiement<br>Demandes concernant un paiement<br>Demandes générales concernant votre compte<br>Mise à jour des contacts<br>Relevé de compte<br>Mise à jour des informations de facturation et d'expédition | success@datadoghq.com        |
| Copies de factures<br>Demandes de règlement urgentes <br>Détails des factures<br>Invitation au portail                                                                                                        | billing@datadoghq.com        |
| Versement des paiements                                                                                                                                                                                | remittances@datadoghq.com    |
| Copies des bons de commande                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Pour aller plus loin

{{< whatsnext desc="Rubriques concernant la facturation :">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Tarifs{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Détails d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métriques d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Carte bancaire{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Métriques custom{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Conteneurs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log Management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (tracing distribué et profileur en continu){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Fonctions sans serveur{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}Intégration AWS{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Intégration Azure{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Intégration Alibaba{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Intégration Google Cloud{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}Intégration vSphere{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Attribution de l'utilisation{{< /nextlink >}}
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
[12]: mailto:billing@datadoghq.com
[13]: /fr/account_management/billing/credit_card/