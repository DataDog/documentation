---
cascade:
  algolia:
    subcategory: Getting Started
description: Bien démarrer avec Datadog pour les partenaires de vente et de services
title: Débuter
---
Datadog fournit des informations sur les infrastructures cloud hybrides et les applications de vos clients. L'interface utilisateur intuitive et l'API puissante vous permettent d'intégrer, de provisionner et de gérer les divers environnements de vos clients, tout en établissant la sécurité des données dans chaque compte.

Cette section couvre les meilleures pratiques et vous aide à commencer à surveiller les environnements de vos clients grâce aux éléments suivants. Les sujets suivants sont abordés :

- [Préparation du terrain][1] : contient des informations sur la façon de commencer et les décisions clés que vous devez prendre dès le début.
- [Ingestion de données][2] : explique comment les données peuvent être transmises à Datadog et quels prérequis doivent être remplis dans vos environnements.
- [Apporter de la valeur][3] : présente les étapes recommandées une fois que les données circulent dans Datadog.
- [Facturation et rapport d'utilisation][4] : couvre la surveillance de l'utilisation individuelle des clients et de l'utilisation globale de la plateforme Datadog dans les configurations de compte à organisation unique et multi-organisations.
- [Mesure et facturation de l'utilisation multi-tenant][12] : couvre l'Admin Org, utilisé pour gérer de manière centralisée l'utilisation, les coûts et la facturation pour les clients finaux.

## Guide d'aide à la vente pour les partenaires {#partner-sales-enablement-guide}

Consultez le [guide de formation aux processus de vente pour les partenaires][5] afin d'obtenir une feuille de route pour la formation au processus d'ingénierie commerciale de Datadog.
## Rester à jour avec Datadog {#staying-up-to-date-with-datadog}

Il existe différentes façons de se tenir informé de l'actualité de Datadog et des nouvelles fonctionnalités :
- Vous pouvez [consulter les notes de version][6] sur le site de Datadog
- En tant que membre du réseau de partenaires Datadog, vous bénéficiez d'un accès exclusif au [portail du réseau de partenaires Datadog][7]. Vous y trouverez :
  - Supports de communication et de formation
  - Le webinaire trimestriel DPN Live Briefing : consultez les sessions enregistrées dans la bibliothèque de ressources ou surveillez votre boîte de réception pour l'invitation.
- Datadog partage les nombreuses leçons apprises sur les systèmes distribués et évolutifs dans le cloud avec la série [Datadog on...][8].

### Informations sur le statut {#status-information}

Datadog fournit les ressources suivantes pour obtenir des informations à jour sur le statut du service :
- Région États-Unis : [https://status.datadoghq.com][9]
- Région UE : [https://status.datadoghq.eu][10]

Abonnez-vous à cette page afin d'être informé des changements de statut.

Si vous souhaitez connaître le statut d'intégrations tierces que vous avez activées pour votre compte Datadog, consultez la page suivante : [https://datadogintegrations.statuspage.io][11].

### Autres ressources {#other-resources}

Explorez d'autres ressources importantes pour rester au fait de l'actualité de Datadog :

{{< whatsnext desc="Dépôts GitHub" >}}
    {{< nextlink href="https://github.com/DataDog/datadog-agent/" >}}Datadog Agent : Le code source du Datadog Agent version 7 et version 6. {{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-core/" >}}Integrations core : Agent Integrations que Datadog développe et prend en charge officiellement.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-extras/" >}}Integrations extras : Datadog Integrations maintenues par la communauté.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/Miscellany" >}}Miscellany : Scripts et outils divers de Datadog.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/dpn" >}}DPN : Exemples d'applications pour les partenaires.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Blog Datadog et réseaux sociaux" >}}
    {{< nextlink href="https://www.datadoghq.com/blog/" >}}Blog Datadog{{< /nextlink >}}
    {{< nextlink href="https://www.linkedin.com/company/datadog/" >}}LinkedIn{{< /nextlink >}}
    {{< nextlink href="https://x.com/datadoghq" >}}X{{< /nextlink >}}
    {{< nextlink href="https://www.facebook.com/datadoghq/" >}}Facebook{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="YouTube" >}}
    {{< nextlink href="https://www.youtube.com/user/DatadogHQ" >}}Chaîne YouTube officielle{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE" >}}Playlist de conseils et recommandations{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Playlists des conférences Dash" >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPzYWUp9NA8IfbC47zxM57M" >}}Dash 2026{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO91zHnerkZ5EZJ-qcqK4ib" >}}Dash 2025{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaNd5cmcY3ey4QoeyDk6aMKz" >}}Dash 2024{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPhn1p7Sz6nc_6-9YInd__u" >}}Dash 2023{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaOlLse2WlvFXYRJ8iirG2QO" >}}Dash 2022{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO-_rgnDSBn221gWacNCkDr" >}}Dash 2021{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaMlgvtlJRyXGgt4i-9Oiyi1" >}}Dash 2020{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPkMoleskq9YcWMWvYfBCRB" >}}Dash 2019{{< /nextlink >}}

{{< /whatsnext >}}

[1]: /fr/partners/laying-the-groundwork/
[2]: /fr/partners/data-intake/
[3]: /fr/partners/delivering-value/
[4]: /fr/partners/billing-and-usage-reporting/
[5]: /fr/partners/sales-enablement/
[6]: https://app.datadoghq.com/release-notes
[7]: https://partners.datadoghq.com/
[8]: https://datadogon.datadoghq.com/
[9]: https://status.datadoghq.com
[10]: https://status.datadoghq.eu
[12]: /fr/partners/multi_tenant_billing/
[11]: https://datadogintegrations.statuspage.io