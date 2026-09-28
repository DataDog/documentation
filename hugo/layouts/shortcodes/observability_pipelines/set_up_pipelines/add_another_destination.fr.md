Si vous souhaitez ajouter une destination supplémentaire à un groupe de processeurs, cliquez sur le signe plus (**+**) à droite du groupe de processeurs.

Pour supprimer une destination, cliquez sur l'icône de corbeille dans le coin supérieur droit de la destination.
- Si vous supprimez une destination d'un groupe de processeurs qui comporte plusieurs destinations, seule cette destination est supprimée.
- Si vous supprimez une destination d'un groupe de processeurs qui ne comporte qu'une seule destination, la destination et le groupe de processeurs sont tous deux supprimés.

**Remarques** :

- Un pipeline doit comporter au moins une destination. Si un groupe de processeurs ne comporte qu'une seule destination, cette destination ne peut pas être supprimée.
- Vous pouvez ajouter un total de 20 destinations pour un pipeline.
- Si vous ajoutez plusieurs destinations du même type à un pipeline, vous devez utiliser [Secrets Management][101]. Par exemple, si vous ajoutez deux destinations HTTP Client pour deux HTTP Clients différents, vous devez utiliser des identifiants secrets pour les HTTP Client URIs. Vous ne pouvez pas utiliser la valeur par défaut `DESTINATION_HTTP_CLIENT_URI` pour stocker les deux HTTP Client URIs.

[101]: /fr/observability_pipelines/configuration/secrets_management/