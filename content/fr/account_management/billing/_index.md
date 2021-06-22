---
title: Facturation
kind: documentation
---
## Présentation

Le cycle de facturation commence le premier jour du mois, quelle que soit votre date d'inscription. Votre premier mois est calculé au prorata en fonction de votre date d'inscription.

Datadog mesure le nombre de total de hosts et de métriques custom toutes les heures. La quantité de hosts facturable est calculée à la fin du mois en prenant la limite inférieure du 99e centile d'utilisation durant ces heures. Le dernier centile est exclu afin de réduire l'impact des pics d'utilisation sur votre facture. La quantité de métriques custom facturable est basée sur le nombre moyen de métriques custom par heure pour le mois. Consultez votre page [Usage][1] dans Datadog. Les pages de facturation sont uniquement accessibles aux utilisateurs avec le rôle Admin Datadog.

### Hosts

Un host est une instance de système d'exploitation physique ou virtuelle que vous surveillez avec Datadog. Il peut s'agir d'un serveur, d'une machine virtuelle, d'un nœud (pour Kubernetes) ou encore d'un plan App Service (pour Azure App Services). Les hosts peuvent désigner les instances sur lesquelles l'Agent Datadog est installé, ainsi que toute machine virtuelle AWS EC2, GCP, Azure ou vSphere surveillée par nos intégrations. Les instances EC2 ou les machines virtuelles sur lesquelles l'Agent est installé comptent comme une seule instance (pas de double facturation).

Les hosts qui n'envoient pas de données (statut `???` dans votre [liste d'infrastructures][2]) ne sont pas pris en compte dans la facturation. Jusqu'à 2 heures peuvent être nécessaires pour que ces hosts disparaissent de la [liste d'infrastructures][2]. Datadog conserve les données historiques pour ces hosts (comptes abonnés à une offre). Les métriques peuvent être représentées graphiquement sur un dashboard en spécifiant le hostname spécifique ou les tags.

### Conteneurs

Il est conseillé de surveiller les conteneurs avec un seul Agent conteneurisé par host. Cet Agent recueille les métriques de conteneur et de host. Si vous choisissez d'installer l'Agent directement dans chaque conteneur, chaque conteneur est compté comme un host lors de la facturation. Pour en savoir plus, consultez la documentation relative à l'[installation de l'Agent][3].

### Environnement sans serveur

La facturation de Datadog repose sur la somme des appels Lambda AWS sur un mois pour vos comptes. Les offres Pro et Enterprise prévoient un quota de 150 000 spans indexées et 5 métriques custom par million d'appels. La facturation pour l'APM sans serveur dépend du nombre total de [spans indexées][4] dépassant ce quota envoyées au service APM de Datadog à la fin du mois. Aucun [host APM][4] n'est facturable pour un déploiement sans serveur.

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

Pour en savoir plus, consultez la [page Facturation des fonctions sans serveur][5] et la page [Tarification Datadog][6].

### IoT

Datadog mesure le nombre d'appareils IoT toutes les heures. La quantité d'appareils IoT facturable est calculée à la fin du mois en prenant la limite inférieure du 99e centile d'utilisation durant ces heures. Le dernier centile est exclu afin de réduire l'impact des pics d'utilisation sur votre facture.

Pour en savoir plus sur la facturation des appareils IoT, consultez la page des [tarifs][7].

## Factures

Si vous payez par carte bancaire, les reçus des mois précédents sont disponibles pour les [administrateurs][8] dans [l'historique de facturation][9].

Si vous payez par chèque ou virement, les factures sont envoyées par e-mail aux adresses e-mail de facturation lorsqu'elles sont dues. Pour obtenir un double d'une facture, envoyez un e-mail au [service facturation de Datadog][10].

### E-mails de facturation

Pour définir les adresses e-mails auxquelles vous souhaitez recevoir les factures, accédez à la section **Manager Billing Emails** de la page [Plan][11] :

{{< img src="account_management/billing/billing01.png" alt="Gérer les e-mails de facturation" >}}

**Remarque** : l'adresse e-mail ne doit pas nécessairement correspondre à un membre de l'équipe dans Datadog. Par exemple, vous pouvez utiliser `factures@votresociete.com`.

## Pour aller plus loin

{{< whatsnext desc="Rubriques concernant la facturation :">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Tarifs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}Détails d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métriques d'utilisation{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Carte bancaire{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Métriques custom{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Conteneurs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (tracing distribué et profileur en continu){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Fonctions sans serveur{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}FAQ sur la facturation de Real User Monitoring{{< /nextlink >}}
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
[4]: https://docs.datadoghq.com/fr/account_management/billing/pricing/#apm
[5]: https://docs.datadoghq.com/fr/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /fr/account_management/users/default_roles/
[9]: https://app.datadoghq.com/account/billing_history
[10]: mailto:billing@datadoghq.com
[11]: https://app.datadoghq.com/account/billing