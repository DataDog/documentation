### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Configurer le monitor de test

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Cette section vous permet de définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][101], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide du menu déroulant.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][104] standard ainsi que les [variables conditionnelles][102] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | &#x7b;&#x7b; #is_alert &#x7d;&#x7d;            | S'affiche lorsque le test envoie une alerte.                                          |
    | &#x7b;&#x7b; ^is_alert &#x7d;&#x7d;            | S'affiche lorsque le test n'envoie pas d'alerte.                                        |
    | &#x7b;&#x7b; #is_recovery &#x7d;&#x7d;         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | &#x7b;&#x7b; ^is_recovery &#x7d;&#x7d;         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |
    | &#x7b;&#x7b; #is_renotify &#x7d;&#x7d;         | S'affiche lorsque le monitor renvoie des notifications.                                   |
    | &#x7b;&#x7b; ^is_renotify &#x7d;&#x7d;         | S'affiche lorsque le monitor ne renvoie pas de notification.                                 |
    | &#x7b;&#x7b; #is_priority &#x7d;&#x7d;         | S'affiche lorsque le monitor correspond à la priorité (P1 à P5).                  |
    | &#x7b;&#x7b; ^is_priority &#x7d;&#x7d;         | S'affiche lorsque le monitor ne correspond pas à la priorité (P1 à P5).                |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

4. Cliquez sur **Create** pour enregistrer la configuration de votre test et votre monitor.

Pour en savoir plus, consultez la section [Utiliser des monitors de test Synthetic][103].

[101]: /monitors/notify/?tab=is_alert#configure-notifications-and-automations
[102]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[103]: /synthetics/guide/synthetic-test-monitors/
[104]: http://daringfireball.net/projects/markdown/syntax