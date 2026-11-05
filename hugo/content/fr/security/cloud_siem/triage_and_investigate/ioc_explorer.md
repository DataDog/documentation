---
further_reading:
- link: /security/threat_intelligence/
  tag: Documentation
  text: Renseignements sur les menaces
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: Documentation
  text: Apportez votre propre renseignement sur les menaces
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: Blog
  text: Intégrer les renseignements sur les menaces Recorded Future avec Datadog Cloud
    SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM : enquêtes assistées par IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
- link: /security/cloud_siem/ingest_and_enrich/muted_indicators/
  tag: Documentation
  text: Muted Indicators
title: IOC Explorer
---
## Présentation {#overview}

Les indicateurs de compromission (IOC) sont des données de réputation associées à des entités telles que des adresses IP, des hachages de fichiers et des domaines qui aident les intervenants à prendre des décisions éclairées concernant les attaques et les compromissions potentielles. L'[IOC Explorer][1] est une interface d'investigation dans laquelle vous pouvez effectuer des recherches et appliquer des filtres pour analyser, trier et hiérarchiser les compromissions. Vous pouvez également afficher les correspondances associées dans Signals Explorer et Logs Explorer, afin d'étudier plus en détail les compromissions potentielles.

{{< img src="security/security_monitoring/ioc_explorer_2.png" alt="L'IOC Explorer, affichant une adresse IP qui a été signalée comme indicateur de compromission" style="width:100%;" >}}

## Prérequis {#prerequisites}

Pour afficher des données dans l'IOC Explorer, toutes les conditions suivantes doivent être remplies :
- Votre organisation doit être abonnée à Cloud SIEM.
- L'indicateur de compromission doit figurer dans un flux de menaces disponible pour Datadog au moment de l'acquisition du log.
  - Pour plus d'informations sur les flux de renseignement sur les menaces dont l'IOC Explorer affiche le contenu, consultez [Sources de renseignement sur les menaces][2].
- La période couverte par l'Explorer est fixée aux 30 derniers jours. Le log doit dater de cette période. Si votre organisation a été intégrée récemment, l'Explorer affiche les données à partir de la date de votre intégration.

## Utilisez l'IOC Explorer {#use-the-ioc-explorer}

Pour accéder à l'IOC Explorer dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][1].

### Interrogez et filtrez les indicateurs de compromission {#query-and-filter-indicators-of-compromise}

Vous pouvez rédiger des requêtes personnalisées ou appliquer des filtres pour déterminer quels indicateurs de compromission vous pouvez voir dans l'Explorer. Vous pouvez interroger ou filtrer par :
- Score de gravité
- Nom du signal
- [Source de renseignement sur les menaces][2]
- Tag, y compris les résultats du moteur de notation
- Indicateur
- [Type d'indicateur][3]
- [Catégorie de renseignement sur les menaces][4]
- Type de système autonome (AS)
- [Champs OCSF correspondants](#understand-ocsf-matching)
- [État de mise en sourdine](#mute-benign-indicators)

De plus, vous pouvez cliquer sur un en-tête de colonne dans l'Explorer pour trier selon les valeurs de cette colonne.

### Comprenez la correspondance OCSF {#understand-ocsf-matching}

Vous pouvez activer ou désactiver le commutateur {{< ui >}}OCSF Matching{{< /ui >}} pour mieux contrôler la manière dont Datadog identifie les correspondances d'IOC.
- Réglez le commutateur sur **activé** si vous souhaitez des **correspondances plus fiables** liées à des attributs de sécurité normalisés.
  
  Lorsque le commutateur est activé, les correspondances d'IOC n'apparaissent dans l'IOC Explorer que si les valeurs figurent dans des champs OCSF mappés, tels que l'IP source, l'IP de destination ou l'IP client. Cela permet de garantir que la correspondance reflète la signification structurée des données, plutôt que la simple présence de l'IOC quelque part dans le log brut.
- Réglez le commutateur sur **désactivé** si vous souhaitez une **recherche de menaces plus large** sur l'ensemble de la charge utile de l'événement.
  
  Lorsque le commutateur est désactivé, les correspondances d'IOC apparaissent dans l'IOC Explorer si les IOC figurent n'importe où dans l'événement, y compris dans du texte non structuré comme un corps de message ou d'autres champs de forme libre.

#### Exemple {#example}

Alice envoie à Bob un e-mail dont le corps du message mentionne `192.0.2.100`, une adresse IP qui est un IOC.
- Si le commutateur OCSF Matching est **activé**, Datadog ne détecte des correspondances que pour les IOC trouvés dans les champs OCSF mappés pertinents, tels que les champs d'adresse IP source ou de destination normalisés dans l'événement e-mail. Comme `192.0.2.100` apparaît uniquement dans le corps du message et non dans un champ OCSF mappé, il n'apparaît pas dans l'IOC Explorer.
- Si le commutateur OCSF Matching est **désactivé**, Datadog détecte une correspondance pour `192.0.2.100` car la recherche porte sur l'ensemble de la charge utile de l'événement, y compris sur le texte non structuré tel que le corps du message. L'IOC apparaît dans l'IOC Explorer.

### Obtenez plus de contexte sur un indicateur de compromission {#get-more-context-on-an-indicator-of-compromise}

Dans l'IOC Explorer, cliquez sur un indicateur de compromission pour afficher des informations supplémentaires que vous pouvez utiliser pour hiérarchiser vos efforts de remédiation :
- Toutes les catégories attribuées à l'indicateur et les flux de renseignement sur les menaces dans lesquels il est apparu
- Toutes les évaluations attribuées à l'indicateur et les flux de renseignement sur les menaces associés à ces évaluations
- Une ventilation du score de gravité de l'indicateur
- L'environnement associé à l'indicateur, y compris les sources et services connexes
- Éléments connexes sur lesquels l'indicateur peut avoir un impact
- Liens vers des surfaces d'investigation connexes :
  - Correspondances de signaux, que vous pouvez consulter dans [Signals Explorer][6]
  - Logs associés, que vous pouvez consulter dans [Log Explorer][7]

### Mettez en sourdine les indicateurs bénins {#mute-benign-indicators}

Si un indicateur est bénin pour votre organisation, comme l'adresse IP de sortie de son VPN d'entreprise, cliquez sur {{< ui >}}Mute This IoC{{< /ui >}} dans son panneau latéral ou sélectionnez plusieurs indicateurs et mettez-les en sourdine en une seule fois. Les indicateurs mis en sourdine restent dans l'Explorer et leurs évaluations issues du renseignement sur les menaces passent à « bénin » pour votre organisation. La colonne {{< ui >}}Custom mute{{< /ui >}} et la facette {{< ui >}}Muted{{< /ui >}} indiquent les indicateurs que votre organisation a mis en sourdine, et le bouton {{< ui >}}Muted Indicators{{< /ui >}} répertorie toutes les mises en sourdine actives. Pour plus de détails, consultez [Indicateurs mis en sourdine][8].

## Comprenez le score de gravité {#understand-severity-scoring}

Il est important d'avoir un contexte approprié pour le score de gravité d'un indicateur, afin de pouvoir hiérarchiser correctement les enquêtes. Par exemple, les [adresses IP][5] peuvent être volatiles et nécessitent par conséquent des réévaluations fréquentes.

Dans le panneau latéral de l'IOC Explorer, vous pouvez voir les facteurs qui contribuent au score de gravité. Le score de gravité part d'un score de base déterminé par la classification, puis augmente ou diminue en fonction de facteurs supplémentaires :
- **Classification** : le score de base associé à la catégorie et à l'intention de l'indicateur
- **Corroboration** : si l'indicateur apparaît dans plusieurs flux de renseignement sur les menaces
- **Persistance** : depuis combien de temps les flux de renseignement sur les menaces signalent l'indicateur
- **Type d'hébergement** : utilisé pour les entités de type adresse IP et domaine ; évalue si le type d'infrastructure d'hébergement est couramment utilisé pour des attaques
- **Activité des signaux** : si l'indicateur a été observé dans Signals

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /fr/security/threat_intelligence/#threat-intelligence-sources
[3]: /fr/security/threat_intelligence/#entity-types
[4]: /fr/security/threat_intelligence/#threat-intelligence-categories
[5]: /fr/security/threat_intelligence/#ip-addresses-dynamic-and-transient
[6]: /fr/security/cloud_siem/triage_and_investigate/investigate_security_signals/#signals-explorer
[7]: /fr/logs/explorer/
[8]: /fr/security/cloud_siem/ingest_and_enrich/muted_indicators/