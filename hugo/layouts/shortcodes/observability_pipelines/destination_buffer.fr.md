Actionnez le commutateur pour activer les **Options de mise en tampon**. Activez un tampon configurable sur votre destination pour garantir qu'une latence intermittente ou une panne au niveau de la destination ne crée pas de contre-pression immédiate, et permettez aux événements de continuer à être ingérés depuis votre source. Les tampons disque peuvent également accroître la durabilité du pipeline en écrivant les données sur le disque, garantissant ainsi que les données mises en tampon persistent après un redémarrage de Worker. Consultez [Tampons de destination][100] pour plus d'informations.
- S'il n'est pas configuré, votre destination utilise un tampon mémoire d'une capacité de 500 événements.
- Pour configurer un tampon sur votre destination :
    1. Sélectionnez le type de tampon que vous souhaitez définir (**Mémoire** ou **Disque**).
    1. Saisissez la taille du tampon et sélectionnez l'unité.
        1. La taille maximale du tampon mémoire est de 128 Go.
        1. La taille maximale du tampon disque est de 5 To.
            - **Remarque** : Pour les versions 2.20.x et antérieures de Worker, la taille maximale du tampon disque est de 500 Go.
    1. Dans le menu déroulant **Comportement en cas de tampon plein**, sélectionnez si vous souhaitez **bloquer** les événements ou **rejeter les nouveaux événements** lorsque le tampon est plein.

[100]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers