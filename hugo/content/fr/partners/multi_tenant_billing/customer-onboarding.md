---
description: Comment un partenaire fait passer un client potentiel d'une affaire enregistrée
  à une organisation cliente connectée.
title: Intégration d'un nouveau client
---
## Présentation {#overview}

Lorsqu'un partenaire a un prospect intéressé par Datadog, le chemin de cette première conversation vers une organisation cliente connectée comporte trois parties : enregistrer l'opportunité, créer un Trial Org pour la preuve de valeur, et travailler avec l'équipe de compte partenaire tout au long de l'opportunité pour établir et dimensionner un contrat. 

Chaque étape ci-dessous est importante : elle permet de maintenir l'opportunité correctement enregistrée auprès de Datadog et, une fois le contrat établi, donne au partenaire une visibilité sur les informations de facturation du client dans l'Admin Org.

## Enregistrer l'opportunité {#register-the-opportunity}

Enregistrez l'opportunité sur le [Partner Portal][1] le plus tôt possible. Enregistrement :

- Augmente les chances que l'opportunité soit reconnue comme provenant du partenaire.
- Donne à Datadog une visibilité sur l'implication du partenaire si Datadog est déjà en contact avec le même prospect, permettant une collaboration plutôt qu'un chevauchement.
- Crée un enregistrement partagé et transparent entre Datadog et le partenaire pour suivre l'opportunité jusqu'à sa conclusion.

Pour enregistrer une affaire :

1. Connectez-vous au [Partner Portal][1].
2. Depuis le {{< ui >}}Deal Dashboard{{< /ui >}}, cliquez sur {{< ui >}}Register Deal{{< /ui >}}.
3. Remplissez les champs obligatoires en incluant autant de détails que possible : nom de l'opportunité, nom du client, date de clôture prévue, cas d'utilisation, principales parties prenantes et ARR estimé.
4. Cliquez sur {{< ui >}}Submit{{< /ui >}}.

Après la soumission, informez l'équipe de compte partenaire qu'une nouvelle opportunité a été enregistrée. Contactez [partner-support@datadoghq.com][2] si vous ne savez pas qui contacter.

## Créer un Trial Org {#create-a-trial-org}

Une fois l'opportunité enregistrée, créez un Trial Org pour le prospect. Cette opération nécessite un Admin Org disposant de la fonctionnalité Trial Org Provisioner activée. Consultez la section [Requesting an Admin Org][3] si aucun n'est encore configuré.

Lors de la sélection d'une région pour le Trial Org, faites correspondre l'environnement du prospect si possible, en tenant compte du fournisseur cloud, de la géographie et des besoins de conformité. Par exemple, un client Azure potentiel convient au site US3 (Azure). Utilisez US1 par défaut en l'absence de contraintes spécifiques, ou alignez-vous sur l'équipe de compte partenaire en cas de doute.

Consultez [Trial Org Provisioning][4] pour la procédure complète.

## Partagez le Trial Org avec l'équipe de compte {#share-the-trial-org-with-the-account-team}

Partagez les informations du nouveau Trial Org avec l'équipe de compte partenaire, afin qu'elles puissent être associées à l'opportunité enregistrée. Continuez à travailler avec l'équipe de compte partenaire à mesure que l'opportunité progresse vers la signature d'un contrat.

## Documentation associée {#related-docs}

- [Cost and Usage Visibility][5] : Comment les données d'utilisation et de coût apparaissent depuis l'Admin Org après l'activation du contrat d'une organisation cliente.
- [Troubleshooting][6] : Problèmes courants rencontrés en cours de route.

[1]: https://partners.datadoghq.com
[2]: mailto:partner-support@datadoghq.com
[3]: /fr/partners/multi_tenant_billing/#requesting-an-admin-org
[4]: /fr/partners/multi_tenant_billing/trial-org-provisioning/
[5]: /fr/partners/multi_tenant_billing/cost-and-usage-visibility/
[6]: /fr/partners/multi_tenant_billing/troubleshooting/