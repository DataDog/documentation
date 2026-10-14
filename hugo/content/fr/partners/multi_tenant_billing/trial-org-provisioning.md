---
description: Provisionnez des Datadog Trial Orgs pour les clients directement depuis
  une Admin Org.
title: Provisionnement des Trial Orgs.
---
## Présentation {#overview}

Une Admin Org avec la capacité Trial Org Provisioner activée peut provisionner directement des Datadog Trial Orgs pour des clients potentiels. Cela accélère la réalisation d'engagements de preuve de concept à grande échelle. L'opportunité sous-jacente doit toujours être enregistrée auprès de Datadog, afin que l'affaire soit suivie et créditée au partenaire ; consultez [Onboarding a New Customer][4] pour le processus complet. Les organisations d'essai créées de cette manière fonctionnent pendant 30 jours, au lieu de la période d'essai standard de 14 jours.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="Page de Trial Org Provisioning sur la page d'accueil de l'Admin Org." style="width:100%;" >}}

Si la page {{< ui >}}Trial Org Provisioning{{< /ui >}} n'est pas disponible dans l'Admin Org, contactez [partner-support@datadoghq.com][1] pour activer cette fonctionnalité.

## Provisionnez un Trial Org {#provision-a-trial-org}

1. Connectez-vous à l'Admin Org. La page {{< ui >}}Trial Org Provisioning{{< /ui >}} apparaît en tant que page d'accueil. Pour y revenir depuis un autre endroit de l'Admin Org, cliquez sur le logo Datadog en haut à gauche.
2. Remplissez le formulaire :

    | Champ | Requis | Description |
    |---|---|---|
    | Region | Yes | `ap1`, `eu1`, `us1`, `us3` or `us5`. Faites correspondre, dans la mesure du possible, le cloud provider, la géographie et les besoins de conformité du client; utilisez `us1` par défaut s'il n'y a pas d'exigences spécifiques. |
    | Trial Org Name | Yes | Ne doit pas dépasser 32 caractères. |
    | Customer Name | Yes | Le client final pour lequel ce Trial Org est destiné. |
    | Partner Notes | No | Tout contexte utile à partager avec l'équipe de compte Datadog. |
    | Invitee(s) List | Yes | Adresses e-mail séparées par des virgules à inviter dans la new org avec le rôle Admin. |

3. Cliquez sur {{< ui >}}Submit{{< /ui >}}.

L'organisation d'essai est créée immédiatement. Le panneau de résultats affiche le nom de la nouvelle organisation, l'ID de l'organisation et le message d'état.

## Trouvez l'ID de l'organisation d'essai {#find-the-trial-org-id}

Si l'ID d'organisation du panneau de résultats n'a pas été capturé, récupérez-le en vous connectant au Trial Org et en ouvrant la console JavaScript du navigateur :

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

Un bookmarklet fonctionne également : créez un signet nommé `Get Datadog Org ID` avec l'URL suivante, puis cliquez dessus depuis n'importe quelle page du Trial Org pour afficher l'ID dans une alerte du navigateur :

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog Org ID is " + orgId);})();
```

## Après le provisioning {#after-provisioning}

L'utilisation d'un Trial Org n'est pas visible depuis l'Admin Org seule. Partagez le nom et l'ID d'organisation du nouveau Trial Org avec l'équipe de compte partenaire afin qu'il soit associé à l'opportunité enregistrée sur le [Partner Portal][2]. L'organisation cliente est connectée à l'Admin Org, et son utilisation devient visible, une fois qu'elle dispose d'un contrat actif associé au partenariat.

## Prochaines étapes {#whats-next}

Consultez [Cost and Usage Visibility][3] pour savoir comment les données d'utilisation et de coût apparaissent depuis l'Admin Org une fois qu'une organisation cliente est connectée.

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /fr/partners/multi_tenant_billing/cost-and-usage-visibility/
[4]: /fr/partners/multi_tenant_billing/customer-onboarding/