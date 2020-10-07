---
title: Partage
kind: documentation
aliases:
  - /fr/graphing/faq/is-there-a-way-to-share-graphs
  - /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
  - /fr/graphing/dashboards/shared_graph/
further_reading:
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

Les graphiques et les screenboards partagés vous permettent d'afficher des visualisations de métrique, de trace et de log en dehors de Datadog.

## Graphiques

### Partager

Pour partager un graphique à partir d'un [timeboard][1] ou d'un [screenboard][2] :

2. Cliquez sur l'icône en forme de crayon en haut à droite du graphique que vous souhaitez partager.
3. Dans la section *Graph your data*, sélectionnez l'onglet **Share**.
4. Choisissez un intervalle pour votre graphique.
5. Choisissez la taille de votre graphique.
6. Choisissez d'inclure ou non la légende.
7. Cliquez sur le bouton *Generate embed code* pour obtenir le code de l'embed.

{{< img src="dashboards/sharing/share_graph.png" alt="Graphique partagé" style="width:75%;">}}

### Révoquer

Pour révoquer les clés utilisées pour partager des graphiques (intégrés) individuels :

1. Accédez à [**Integrations -> Embeds**][3] pour consulter la liste de tous les graphiques partagés.
2. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.
3. Le graphique est alors déplacé vers la liste **Revoked**.

## Dashboards

### Partager

Partagez un dashboard entier en générant une URL publique :

1. Sur la page du dashboard, cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
2. Choisissez l'option **Generate public URL**.
3. Sélectionnez les options de configuration pour « Allow changing timeframe » ou les tags de template variable visibles.
4. Copiez l'URL et cliquez sur **Done**.

L'URL créée permet un accès en lecture seule au contenu de ce dashboard spécifique, mis à jour en temps réel.

**Remarque **: les sélecteurs de [template variable][4] sont uniquement disponibles pour les dashboards lorsque vous configurez des tags visibles. Les valeurs par défaut des template variables sont les valeurs par défaut définies dans Datadog. En outre, les données des widgets basés sur des requêtes de traces APM ne sont pas visibles sur les dashboards publics. Tous les logs basés sur des requêtes affichent des données, sauf le widget Flux de logs.

### Révoquer

Pour révoquer un dashboard partagé :

1. Accédez à la [liste des dashboards][5].
2. Sélectionnez le dashboard dont vous souhaitez révoquer l'accès.
3. Cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
4. Cliquez sur **Configure sharing**.
5. Cliquez sur **Revoke public URL**.

### Appliquer des restrictions

Vous pouvez restreindre l'accès à votre dashboard en fonction de l'adresse IP. Envoyez un e-mail à [l'équipe d'assistance Datadog][6] pour activer la fonctionnalité d'ajout d'adresses IP à la liste blanche et ainsi permettre aux administrateurs de spécifier les adresses IP autorisées à accéder aux dashboards partagés. Une fois cette fonctionnalité activée, vous pourrez gérer vos restrictions sur la [page des paramètres de sécurité][7] pour votre organisation.

### Mode sombre

Un mode sombre est disponible sur les dashboards publics. Celui-ci peut être activé ou désactivé par chaque utilisateur en cliquant sur l'icône en forme de soleil ou de lune en haut à droite. Un paramètre d'URL `theme` est également disponible. Les valeurs possibles sont `dark` et `light`.

### Mode TV

Le mode TV est disponible sur les screenboards publics. Utilisez le raccourci clavier `F` ou cliquez sur l'icône en forme de téléviseur en haut à droite.

## API

Datadog propose une [API dédiée][8] qui vous permet d'interagir avec vos graphiques partagés (embeds) :

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Récupérer tous les embeds][9]     | Récupère la liste des graphiques intégrables précédemment créés.                     |
| [Créer un embed][10]       | Crée un nouveau graphique intégrable.                                         |
| [Récupérer un embed spécifique][11] | Récupère le fragment HTML d'un embed généré précédemment avec `embed_id`. |
| [Activer un embed][12]       | Active l'embed spécifié.                                             |
| [Révoquer un embed][13]       | Révoque l'embed spécifié.                                             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/timeboard/
[2]: /fr/dashboards/screenboard/
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /fr/dashboards/template_variables/
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /fr/help/
[7]: https://app.datadoghq.com/account/org_security
[8]: /fr/api/v1/embeddable-graphs/
[9]: /fr/api/v1/embeddable-graphs/#get-all-embeds
[10]: /fr/api/v1/embeddable-graphs/#create-embed
[11]: /fr/api/v1/embeddable-graphs/#get-specific-embed
[12]: /fr/api/v1/embeddable-graphs/#enable-embed
[13]: /fr/api/v1/embeddable-graphs/#revoke-embed