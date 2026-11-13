---
description: Analysez et comprenez les utilisateurs individuels et les segments de
  votre base d'utilisateurs.
further_reading:
- link: /product_analytics/
  tag: Documentation
  text: Product Analytics
title: Gestion des profils et intégration d'attributs personnalisés
---
## Présentation {#overview}

Les pages [User Profiles][7] et [Account Profiles][8] contiennent des données enrichies sur les utilisateurs et les comptes interagissant avec votre produit.

Ces pages de profil intègrent des attributs extraits d'événements collectés avec des informations provenant de sources tierces. Des exemples de ces attributs incluent l'horodatage `first_seen` d'un utilisateur ou le code ISO du `last_seen_country` de l'utilisateur. Ensemble, ils aident à créer des profils complets et centralisés.

Ces profils enrichis permettent une segmentation plus précise et une analyse plus approfondie du comportement des utilisateurs, vous aidant à identifier des tendances au fil du temps, à suivre des cohortes clés (par exemple, les utilisateurs actifs après six mois) et à orienter les décisions relatives au produit et les stratégies d'engagement.

## Profils {#profiles}

Les profils utilisateur et de compte sont générés à partir d'événements RUM collectés via le RUM SDK. Utilisez `datadogRum.setUser` pour [définir des attributs utilisateur][2] et `datadogRum.setAccount` pour définir des [attributs de compte][3].

Les profils utilisateur sont regroupés par l'attribut `user_id`, tandis que les profils de compte sont regroupés par `account_id`.

Pour les utilisateurs non authentifiés ou les visiteurs qui n'appellent jamais `setUser`, le RUM SDK suit automatiquement l'activité à l'aide de `usr.anonymous_id`. Consultez [Suivre les utilisateurs non authentifiés][9] pour plus de détails.

Vous pouvez également personnaliser ces pages en ajoutant les attributs qui comptent le plus pour votre équipe. Consultez la section [Attributs personnalisés](#use-custom-attributes-to-enrich-profiles) pour savoir comment adapter les données de profil à vos besoins.


### Profils utilisateur {#user-profiles}

La page [User Profiles][7] répertorie les utilisateurs qui interagissent avec votre application. Vous pouvez sélectionner un utilisateur pour afficher des informations détaillées sur son activité, notamment ses pages les plus visitées, ses actions fréquentes et l'historique de ses sessions.

{{< img src="product_analytics/user_profile2ui.png" alt="Une vue de la page User profiles." style="width:80%;" >}}

Chaque profil possède des attributs pour vous aider à mieux segmenter vos utilisateurs. Vous pouvez effectuer une recherche en texte intégral ou trier et filtrer en fonction de l'un de ces attributs. Vous pouvez également personnaliser cette page avec des attributs pertinents pour vos besoins analytiques. Consultez la section [Attributs personnalisés](#use-custom-attributes-to-enrich-profiles) pour savoir comment faire.


{{% collapse-content title="Liste des attributs des profils utilisateur" level="h4" expanded=false id="user-profile-attributes" %}}

<!-- #### User attributes  -->
User ID `REQUIRED`
: `type:string` <br> Un identifiant utilisateur unique.<br>

User Email
: `type:string` <br> L'adresse e-mail de l'utilisateur.

User Name
: `type:string` <br> Le nom complet de l'utilisateur.

<!-- #### Time based attributes  -->
First Seen
: `type:timestamp` <br> La date de la première session de l'utilisateur.

Last Seen
: `type:timestamp`  <br> La date de la session la plus récente de l'utilisateur.

<!-- #### First touch attribution  -->
Premier référent
: `type:string`  <br> L'URL de la page depuis laquelle l'utilisateur a accédé à l'application lors de sa première session. Vide si l'utilisateur a accédé directement à l'application.

Host du premier référent
: `type:string`  <br> Le nom d'hôte de la page depuis laquelle l'utilisateur a accédé à l'application lors de sa première session. Vide si l'utilisateur a accédé directement à l'application.

Première campagne UTM
: `type:string`  <br> La valeur du paramètre `utm_campaign` dans l'URL de la première session de l'utilisateur.

Premier contenu UTM
: `type:string`  <br> La valeur du paramètre `utm_content` dans l'URL de la première session de l'utilisateur.

Premier support UTM
: `type:string`  <br> La valeur du paramètre `utm_medium` dans l'URL de la première session de l'utilisateur.

Première source UTM
: `type:string`  <br> La valeur du paramètre `utm_source` dans l'URL de la première session de l'utilisateur.

Premier terme UTM
: `type:string`  <br> La valeur du paramètre `utm_term` dans l'URL de la première session de l'utilisateur.


<!-- #### application based attributes  -->
First Seen Application
: `type:string`  <br> L'identifiant de la première application à laquelle l'utilisateur a accédé.

Last Seen Application
: `type:string`  <br> L'identifiant de la dernière application à laquelle l'utilisateur a accédé.


<!-- #### Geo based attributes  -->
First City
: `type:string` <br> La ville de la première session de l'utilisateur.

Last City
: `type:string` <br> La ville de la dernière session de l'utilisateur.

First Seen Country
: `type:string` <br> Le code ISO du pays pour la première session de l'utilisateur. Le code du pays est enregistré dans le backend et le nom du pays est affiché dans l'interface utilisateur.

Last Seen Country
: `type:string` <br> Le code ISO du pays pour la dernière session de l'utilisateur. Le code du pays est enregistré dans le backend et le nom du pays est affiché dans l'interface utilisateur.

First Region
: `type:string` <br> La région de la première session de l'utilisateur.

Last Region
: `type:string` <br> La région de la dernière session de l'utilisateur.


<!-- #### Device related attributes  -->
First Device Type
: `type:string` <br> L'appareil utilisé lors de la première session de l'utilisateur (par exemple: ordinateur de bureau, tablette).

Last Device Type
: `type:string` <br> L'appareil utilisé lors de la dernière session de l'utilisateur (par exemple : ordinateur de bureau, tablette).


<!-- #### OS related attributes  -->
First OS Name
: `type:string` <br> Le système d'exploitation de la première session de l'utilisateur (par exemple: Windows, iOS).

Last OS Name
: `type:string` <br> Le système d'exploitation de la dernière session de l'utilisateur (par exemple: Windows, iOS).

First OS Version
: `type:string` <br> La version du système d'exploitation de la première session de l'utilisateur.

Last OS Version
: `type:string` <br> La version du système d'exploitation de la dernière session de l'utilisateur.


<!-- #### Browser related attributes  -->
First Browser Name
: `type:string` <br> Le navigateur utilisé lors de la première session de l'utilisateur (par exemple: Chrome, Safari).

Last Browser Name
: `type:string` <br> Le navigateur utilisé lors de la dernière session de l'utilisateur (par exemple: Chrome, Safari).

First Browser Version
: `type:string` <br> La version du navigateur de la première session de l'utilisateur.

Last Browser Version
: `type:string` <br> La version du navigateur de la dernière session de l'utilisateur.

{{% /collapse-content %}}
<br>


### Profils de compte {#account-profiles}
La page Account Profiles affiche une liste des organisations interagissant avec votre application.

{{< img src="product_analytics/account_profile_ui3.png" alt="Une vue de la page User profiles." style="width:80%;" >}}

Chaque profil inclut quatre attributs par défaut pour vous aider à identifier et à suivre l'activité du compte au fil du temps. Ces attributs par défaut sont :
- `account_id`
- `account_name`
- `first_seen`
- `last_seen`

Vous pouvez personnaliser la page Account Profiles pour inclure des attributs supplémentaires, ce qui vous permet d'adapter la vue à vos besoins en matière d'observabilité et d'analyse de produit.



## Utilisez des attributs personnalisés pour enrichir les profils {#use-custom-attributes-to-enrich-profiles}

### Comment configurer des attributs personnalisés à l'aide d'intégrations {#how-to-configure-custom-attributes-using-integrations}

Utilisez des intégrations ou des Reference Tables pour importer automatiquement des données d'attributs personnalisés dans les profils. Ces données sont synchronisées régulièrement et reflètent les dernières valeurs du système source, afin que les profils restent à jour et exacts.

Sur la [page Integrations][4], vous pouvez explorer les intégrations compatibles avec les attributs personnalisés.

Sur cette même page, vous pouvez sélectionner l'onglet [{{< ui >}}Custom Attributes{{< /ui >}}][5] pour afficher les attributs importés pour les profils utilisateur et les profils de compte.

{{< img src="product_analytics/integration_page5.png" alt="Consultez les intégrations compatibles avec Product Analytics." style="width:80%;" >}}

Pour importer des attributs à partir d'une Reference Table ou d'une intégration telle que Salesforce ou Snowflake, sélectionnez le bouton {{< ui >}}Add Attributes{{< /ui >}} et indiquez si les attributs sont destinés aux profils utilisateur ou aux profils de compte. Ensuite, suivez les instructions pour :


{{< img src="product_analytics/add_attribute2_button.png" alt="Ajoutez de nouveaux attributs pour enrichir vos profils." style="width:80%;" >}}


1. Choisissez {{< ui >}}source of the data{{< /ui >}} à importer.

{{< img src="product_analytics/choose_integration1.png" alt="Choisissez une source de données à importer." style="width:80%;" >}}


2. Sélectionnez {{< ui >}}table{{< /ui >}} contenant les données utilisateur souhaitées.

{{< img src="product_analytics/add_table_and_key3.png" alt="sélectionnez les données à fusionner avec vos profils." style="width:80%;" >}}


3. Sélectionnez {{< ui >}}join key{{< /ui >}} et {{< ui >}}Product Analytics key{{< /ui >}} pour fusionner la table avec vos profils. Ensuite, sélectionnez les {{< ui >}}attributes{{< /ui >}} de la liste à ajouter à vos profils. Chaque ligne nécessite une valeur dans la colonne de clé de jointure pour correspondre à un profil, et les lignes sans valeur sont ignorées. Si aucune ligne ne possède de valeur de clé de jointure, la synchronisation planifiée se termine avec succès mais n'importe aucun attribut. Si cela se produit, vérifiez que la clé de jointure est définie sur la colonne correcte dans votre table.

{{< img src="product_analytics/select_integration_attributes5.png" alt="La fenêtre modale Configure import pour Snowflake affiche la configuration de la clé de jointure et une liste d'attributs sélectionnables avec les noms des colonnes, les types et des exemples de valeurs." style="width:80%;" >}}


<br>

## Comment interroger vos attributs personnalisés {#how-to-query-your-custom-attributes}

Vous pouvez filtrer ces attributs personnalisés dans toute la plateforme d'analyse de produits sans avoir besoin de les ajouter au préalable à un [segment][6]. Par exemple, vous pouvez créer un graphique analytique pour visualiser le volume de sessions des utilisateurs ayant dépensé plus de $100.

{{< img src="product_analytics/query_custom_attribute_analytics3.png" alt="Interrogez vos attributs personnalisés dans un graphique analytique." style="width:80%;" >}}


## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}


[2]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-user-session
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-account
[4]: https://app.datadoghq.com/product-analytics/integrations
[5]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes
[6]: https://app.datadoghq.com/product-analytics/segments
[7]: https://app.datadoghq.com/product-analytics/profiles
[8]: https://app.datadoghq.com/product-analytics/profiles/accounts
[9]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users