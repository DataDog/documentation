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

**Cross-Organization viewer**: Permet à un compte parent d'être associé à un nombre quelconque d'organisations enfants. Ces organisations enfants transmettent automatiquement toutes les métriques système à leur compte parent. Pour activer le Cross-Organization viewer, envoyez un courriel à [l'équipe support de Datadog](/help).

Les alertes de monitor peuvent également être transmises au compte parent via la configuration de [intégration Webhooks](/integrations/webhooks) dans l'organisation enfant associée à [API Datadog Events](/api). Par exemple: Une telle configuration de Webhooks atteindrait:

*  `https://api.datadoghq.com/api/v1/events?api_key=<API_KEY>` (l'API_KEY associé au compte parent auquel l'événement est posté)

Accès à plusieurs comptes cloud: les comptes parent peuvent également accéder aux comptes AWS, Azure et Google Cloud pour chacune de leurs organisations enfants via les intégrations de leurs fournisseurs de cloud respectifs.
Combiné avec le Cross-Organization viewer ci-dessus, cela permet une configuration plus fédérée entre plusieurs équipes, utilisateurs et groupes au sein d'un plateforme Datadog.

{{< partial name="whats-next/whats-next.html" >}}