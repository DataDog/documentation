   La bibliothèque recueille des données de sécurité à partir de votre application et les envoie à l'Agent, qui les transmet à son tour à Datadog. Les [règles de détection prêtes à l'emploi][202] signalent alors les attaques et les problèmes potentiels de configuration, afin que vous puissiez agir en conséquence.

3.  **Pour tester la détection des menaces Application Security Management, envoyez des patterns d'attaque connus à votre application**. Par exemple, exécutez un fichier contenant le script curl suivant afin de déclencher la règle de [détection de scanner de sécurité][203] :
    <div>
    <pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A dd-test-scanner-log;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A dd-test-scanner-log;<br>done</code></pre></div>

    **Remarque** : la plupart des versions récentes prennent en charge la valeur `dd-test-scanner-log`.

    Quelques minutes après avoir activé votre application et envoyé les patterns d'attaque, **des informations sur les menaces s'affichent dans l'[Application Trace and Signals Explorer][201]** de Datadog.

[201]: https://app.datadoghq.com/security/appsec
[202]: /security/default_rules/#cat-application-security
[203]: /security/default_rules/security-scan-detected/
