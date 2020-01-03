---
title: Graphiques partagés
kind: documentation
aliases:
  - /fr/graphing/faq/is-there-a-way-to-share-graphs
  - /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Créer des dashboards dans Datadog
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: Améliorer vos dashboards avec des template variables
  - link: graphing/widgets
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
5. Choisissez une taille de graphique.
6. Choisissez d'inclure ou non la légende.
7. Cliquez sur le bouton *Generate embed code* pour obtenir le code de l'embed.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Graphique partagé"  style="width:75%;">}}

### Révoquer

Pour révoquer les clés utilisées pour partager des graphiques (intégrés) individuels :

1. Accédez à [**Integrations -> Embeds**][3] pour consulter la liste de tous les graphiques partagés.
2. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.
3. Le graphique est alors déplacé vers la liste **Revoked**.

## Screenboards
### Partager

Partagez un screenboard entier en générant une URL publique :

1. Sur la page du screenboard, cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
2. Choisissez l'option **Generate public URL**.
3. Si le [sélecteur d'intervalle global][4] est activé, choisissez le paramètre d'intervalle global pour le screenboard public.
4. Copiez l'URL et cliquez sur **Done**.

L'URL créée permet un accès en lecture seule au contenu de ce screenboard spécifique, mis à jour en temps réel.

**Remarque** : les sélecteurs de [template variable][5] ne sont pas disponibles sur le screenboard public. Les valeurs des template variables sont les valeurs par défaut définies dans Datadog. En outre, les données des widgets basés sur l'APM et les requêtes de log ne sont pas visibles sur les screenboards publics.

### Révoquer

Pour révoquer un screenboard partagé :

1. Accédez à la [liste des dashboards][6].
2. Sélectionnez le screenboard dont vous souhaitez révoquer l'accès.
3. Cliquez sur l'icône des paramètres en forme d'engrenage en haut à droite.
4. Cliquez sur **Configure sharing**.
5. Cliquez sur **Revoke public URL**.

### Appliquer des restrictions

Vous pouvez restreindre l'accès à votre screenboard en fonction de l'adresse IP. Envoyez un e-mail à [l'équipe d'assistance Datadog][7] pour activer la fonctionnalité d'ajout d'adresses IP à la liste blanche et ainsi permettre aux administrateurs de spécifier les adresses IP autorisées à accéder aux screenboards partagés. Une fois cette fonctionnalité activée, vous pourrez gérer vos restrictions sur la [page des paramètres de sécurité][8] pour votre organisation.

### Mode sombre

Un mode sombre est disponible sur les screenboards publics. Celui-ci peut être activé ou désactivé par chaque utilisateur en cliquant sur l'icône en forme de soleil ou de lune en haut à droite. Un paramètre d'URL `theme` est également disponible. Les valeurs possibles sont `dark` et `light`.

### Mode TV

Le mode TV est disponible sur les screenboards publics. Utilisez le raccourci clavier `F` ou cliquez sur l'icône en forme de téléviseur en haut à droite.

## API

Datadog propose une [API dédiée][9] qui vous permet d'interagir avec vos graphiques partagés (embeds) :

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Récupérer tous les embeds][10]      | Récupère la liste des graphiques intégrables précédemment créés.                     |
| [Créer un embed][11]       | Crée un nouveau graphique intégrable.                                         |
| [Récupérer un embed spécifique][12] | Récupère le fragment HTML d'un embed généré précédemment avec `embed_id`. |
| [Activer un embed][13]       | Active l'embed spécifié.                                             |
| [Révoquer un embed][14]       | Révoque l'embed spécifié.                                             |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/graphing/dashboards/screenboard
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /fr/graphing/dashboards/screenboard/#global-time-selector
[5]: /fr/graphing/dashboards/template_variables
[6]: https://app.datadoghq.com/dashboard/lists
[7]: /fr/help
[8]: https://app.datadoghq.com/account/org_security
[9]: /fr/api/?lang=python#embeddable-graphs
[10]: /fr/api/?lang=python#get-all-embeds
[11]: /fr/api/?lang=python#create-embed
[12]: /fr/api/?lang=python#get-specific-embed
[13]: /fr/api/?lang=python#enable-embed
[14]: /fr/api/?lang=python#revoke-embed