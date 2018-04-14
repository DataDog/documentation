---
title: Quelles données de mes sous-organisations puis-je voir dans mon compte parent?
kind: faq
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: Configurez SAML pour votre compte Datadog
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: Configurez vos Teams et Organisations avec plusieurs comptes
---

Datadog fournit des options pour accéder aux métriques du système, surveiller les monitors et plusieurs comptes cloud dans plusieurs sous-organisations du compte parent, comme décrit ci-dessous.

**Cross-Organization viewer**: Allows a Parent account to be associated with any number of child organizations. These child organizations automatically forward all system metrics to their Parent account. To enable the cross-organization viewer, email the [Datadog support team][1].  

Monitor alerts can also be forwarded to the Parent account through the configuration of the [Webhooks integration][2] in the child organization combined with the [Datadog Events API][3]. For e.g.: One such Webhooks configuration would reach out to:

*  `https://api.datadoghq.com/api/v1/events?api_key=` (the API_KEY associated with the parent account to which the event is posted)

Accès à plusieurs comptes cloud: les comptes parent peuvent également accéder aux comptes AWS, Azure et Google Cloud pour chacune de leurs organisations enfants via les intégrations de leurs fournisseurs de cloud respectifs.
Combiné avec le Cross-Organization viewer ci-dessus, cela permet une configuration plus fédérée entre plusieurs équipes, utilisateurs et groupes au sein d'un plateforme Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /integrations/webhooks
[3]: /api