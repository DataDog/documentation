1. Optionnellement, basculez l'interrupteur pour activer **Buffering Options**. Activez un tampon configurable sur votre destination pour garantir qu'une latence intermittente ou une panne sur votre destination ne génère pas immédiatement de backpressure, et pour permettre aux événements de continuer à être ingérés depuis votre source. Les tampons disque peuvent également accroître la durabilité du pipeline en écrivant les journaux sur le disque, garantissant ainsi que les journaux mis en tampon persistent après un redémarrage de Worker. Consultez [Destination buffers][100] pour plus d'informations.
	- S'il n'est pas configuré, votre destination utilise un tampon mémoire d'une capacité de 500 événements.
	- Pour configurer un tampon sur votre destination :
		1. Sélectionnez le type de tampon que vous souhaitez définir (**Memory** ou **Disk**).
		1. Saisissez la taille du tampon et sélectionnez l'unité.
			1. La taille maximale du tampon mémoire est de 128 Go.
			1. La taille maximale du tampon disque est de 5 To.
				- **Remarque** : Pour les versions 2.20.x et antérieures de Worker, la taille maximale du tampon disque est de 500 Go.
		1. Dans le menu déroulant **Behavior on full buffer**, sélectionnez si vous souhaitez **block** les événements ou **drop new events** lorsque le tampon est plein.

[100]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers