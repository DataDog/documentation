---
description: Définissez une tarification spécifique au client depuis la page Tarification
  client pour permettre la visibilité des coûts pour vos clients dans Datadog.
further_reading:
- link: /partners/multi_tenant_billing/
  tag: Documentation
  text: Mesure et facturation de l'utilisation multi-locataire
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: Documentation
  text: Visibilité des coûts pour les clients qui achètent via un partenaire
- link: /account_management/plan_and_usage/partner_experience/
  tag: Documentation
  text: Expérience Plan & utilisation pour les partenaires
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentation
  text: Aperçu de la facturation
title: Tarification client
---
La page [Customer Pricing][2] permet aux partenaires de définir des tarifs spécifiques aux clients qui permettent la visibilité des coûts pour leurs clients revendeurs. La définition des tarifs est une configuration unique par client, et vous pouvez mettre à jour la tarification à tout moment. Pour en savoir plus sur l'expérience client ou pour trouver une ressource à partager avec vos clients, consultez [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Prérequis {#prerequisites}

Pour définir la tarification client, vous avez besoin de :

- Une organisation d'administration Datadog, que vous pouvez demander via le programme [Multi-Tenant Usage Metering and Billing][3]. 
- L'autorisation Billing Edit (`billing_edit`). Les utilisateurs disposant uniquement de l'autorisation Billing Read (`billing_read`) peuvent consulter les tarifs client enregistrés ou publiés, mais ne peuvent pas les modifier.

## Configurer la tarification client {#set-up-customer-pricing}

1. Connectez-vous à votre organisation d'administration Datadog.
1. Accédez à [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}][2].
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="Onglet Tarification client dans la section Plan & Usage." >}}
1. Sélectionnez un client dans la liste déroulante. Seuls les clients disposant d'un contrat de revente éligible sont répertoriés.
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="Liste déroulante de sélection des clients répertoriant les clients revendeurs." >}}
1. Examinez les produits sous contrat du client et les prix de vente correspondants dans le tableau.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}} et saisissez les prix client pour chaque produit sous contrat. Vous pouvez modifier les prix en masse, individuellement ou en combinant les deux.
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="Contrôles de modification des prix en masse pour les produits sous contrat d'un client." >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="Champs de prix brouillon individuels pour chaque produit sous contrat." >}}
1. Définissez une règle de tarification par défaut pour les produits qui ne figurent pas dans le contrat du client. 
    - Par défaut, les tarifs à la demande pour les produits hors contrat sont fixés au prix catalogue Datadog. Vous pouvez à la place appliquer une majoration en pourcentage au prix de vente et, éventuellement, plafonner les tarifs majorés au prix catalogue Datadog.
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="Configuration de la règle de tarification par défaut pour les produits hors contrat." >}}
1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour enregistrer un brouillon. Les brouillons ne sont visibles qu'au sein de votre organisation d'administration Datadog. 
1. Vérifiez vos saisies, puis cliquez sur {{< ui >}}Publish{{< /ui >}}.

Une fois la publication effectuée, la visibilité des coûts est activée pour ce client dans les 24 heures. Le client peut alors consulter ses coûts estimés et historiques dans son organisation Datadog, en fonction de son utilisation et des tarifs que vous fournissez. Les prix publiés prennent effet à compter de la modification la plus récente du contrat du client, qu'il s'agisse d'un nouveau contrat ou d'une modification des conditions d'un contrat existant.

## Mettre à jour la tarification {#update-pricing}

Pour modifier les tarifs d'un client après publication, revenez à la page {{< ui >}}Customer Pricing{{< /ui >}}, modifiez les valeurs et republiez. Les mises à jour peuvent prendre jusqu'à 24 heures pour devenir visibles pour le client.

## Limitations {#limitations}

Pour apparaître dans la liste déroulante des clients, un client doit disposer d'un contrat de revente éligible. La tarification client ne prend pas en charge les types de contrats et d'organisations suivants :

- **Contrats de fournisseur de services gérés (MSP) hérités**, où de nombreux clients sont couverts par un seul contrat.
- **Contrats Cloud Marketplace sans accord de prélèvement**, pour les clients achetant via AWS, Google Cloud ou Azure Marketplace.
- **Contrats où le client s'approvisionne simultanément auprès de deux partenaires de distribution.** Par exemple, Datadog vers le Partenaire 1 vers le Partenaire 2 vers le client.
- **Organisations GovCloud.**

Pour la liste complète des limitations, y compris les mises en garde concernant la disponibilité des fonctionnalités et la précision des coûts, consultez [Cost Visibility for Customers Who Purchase Through a Partner][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
[3]: /fr/partners/multi_tenant_billing/#requesting-an-admin-org