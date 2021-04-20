---
title: Partage
kind: documentation
aliases:
  - /fr/graphing/faq/is-there-a-way-to-share-graphs
  - /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
  - /fr/graphing/dashboards/shared_graph/
further_reading:
  - link: 'https://www.datadoghq.com/blog/dashboard-sharing/'
    tag: Blog
    text: Partager des dashboards en toute sécurité avec des utilisateurs en dehors de votre organisation
  - link: /dashboards/
    tag: Documentation
    text: Créer des dashboards dans Datadog
  - link: /dashboards/template_variables/
    tag: Documentation
    text: Améliorer vos dashboards avec les template variables
  - link: /dashboards/widgets/
    tag: Documentation
    text: Découvrir les widgets disponibles pour votre dashboard
---
## Présentation

Les dashboards et les graphiques partagés vous permettent d'afficher des visualisations de métrique, de trace et de log en dehors de Datadog.

## Dashboards
Lorsque vous partagez un dashboard à l'aide d'une URL ou d'un lien inclus dans un e-mail, la page partagée affiche le contenu en temps réel et en lecture seule de ce dashboard.

### Partager un dashboard à l'aide d'une URL publique

Pour partager un dashboard entier en générant une URL publique :

1. Sur la page du dashboard, cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
2. Sélectionnez **Generate public URL**.
3. Sous **Time & Variable Settings**, vous pouvez configurer des options afin de définir l'intervalle, d'indiquer si les utilisateurs peuvent modifier ou non l'intervalle et de sélectionner les tags visibles pour les templates variables pouvant être sélectionnées.
4. Copiez l'URL et cliquez sur **Done**.

### Partager un dashboard à partir d'adresses e-mail individuelles

Pour autoriser une ou plusieurs adresses e-mail spécifiques à consulter la page d'un dashboard :

1. Sur la page du dashboard, cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
2. Sélectionnez **Generate public URL**.
3. Sélectionnez l'option **Only specified people** afin de préciser les personnes pouvant accéder à ce dashboard.
4. Ajoutez l'adresse e-mail des personnes avec lesquelles vous souhaitez partager votre dashboard.
5. Sous **Time & Variable Settings**, vous pouvez configurer des options afin de définir l'intervalle, d'indiquer si les utilisateurs peuvent modifier ou non l'intervalle et de sélectionner les tags visibles pour les templates variables pouvant être sélectionnées.
6. (Facultatif) Vous pouvez copier l'URL du dashboard à partager. Un e-mail contenant un lien vers le dashboard sera également envoyé aux adresses e-mails que vous avez renseignées.
7. Cliquez sur **Done**.

**Remarque** : les widgets reposant sur les traces de l'APM n'affichent pas de données sur les dashboard publics, tout comme le widget Flux de logs. Toutefois, vous pouvez visualiser les données des requêtes basées sur des logs.

### Révoquer

Pour révoquer un dashboard partagé :

1. Accédez à la [liste des dashboards][1].
2. Sélectionnez le dashboard dont vous souhaitez révoquer l'accès.
3. Cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
4. Cliquez sur **Configure sharing**.
5. Cliquez sur **Revoke public URL**.

## Graphiques

### Partager

Pour partager un graphique depuis un [timeboard][2] ou un [screenboard][3] :

2. Cliquez sur l'icône en forme de crayon en haut à droite du graphique que vous souhaitez partager.
3. Dans la section *Graph your data*, sélectionnez l'onglet **Share**.
4. Choisissez un intervalle pour votre graphique.
5. Choisissez la taille de votre graphique.
6. Choisissez d'inclure ou non la légende.
7. Cliquez sur le bouton *Generate embed code* pour obtenir le code de l'embed.

{{< img src="dashboards/sharing/share_graph.png" alt="Graphique partagé" style="width:75%;">}}

### Révoquer

Pour révoquer les clés utilisées pour partager des graphiques (intégrés) individuels :

1. Accédez à [**Integrations -> Embeds**][4] pour consulter la liste de tous les graphiques partagés.
2. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.
3. Le graphique est alors déplacé vers la liste **Revoked**.

### Appliquer des restrictions

Vous pouvez restreindre l'accès à votre dashboard en fonction des adresses IP de votre liste d'autorisation. Envoyez un e-mail à [l'équipe d'assistance Datadog][6] pour activer cette fonctionnalité. Les administrateurs pourront spécifier les adresses IP autorisées à accéder aux dashboards partagés. Une fois cette fonctionnalité activée, consultez la [page de sécurité][6] de votre organisation pour gérer les restrictions.

### Mode sombre

Un mode sombre est disponible sur les dashboards publics. Celui-ci peut être activé ou désactivé par chaque utilisateur en cliquant sur l'icône en forme de soleil ou de lune en haut à droite. Un paramètre d'URL `theme` est également disponible. Les valeurs possibles sont `dark` et `light`.

### Mode TV

Le mode TV est disponible sur les screenboards publics. Utilisez le raccourci clavier `F` ou cliquez sur l'icône en forme de téléviseur en haut à droite.

## API

Datadog propose une [API dédiée][7] qui vous permet d'interagir avec vos graphiques partagés (embeds) :

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Récupérer tous les embeds][8]     | Récupère la liste des graphiques intégrables précédemment créés.                     |
| [Créer un embed][9]       | Crée un nouveau graphique intégrable.                                         |
| [Récupérer un embed spécifique][10] | Récupérez le fragment HTML d'un embed généré précédemment avec `embed_id`. |
| [Activer un embed][11]       | Active l'embed spécifié.                                             |
| [Révoquer un embed][12]       | Révoque l'embed spécifié.                                             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /fr/dashboards/timeboard/
[3]: /fr/dashboards/screenboard/
[4]: https://app.datadoghq.com/account/settings#embeds
[5]: /fr/help/
[6]: https://app.datadoghq.com/account/org_security
[7]: /fr/api/v1/embeddable-graphs/
[8]: /fr/api/v1/embeddable-graphs/#get-all-embeds
[9]: /fr/api/v1/embeddable-graphs/#create-embed
[10]: /fr/api/v1/embeddable-graphs/#get-specific-embed
[11]: /fr/api/v1/embeddable-graphs/#enable-embed
[12]: /fr/api/v1/embeddable-graphs/#revoke-embed