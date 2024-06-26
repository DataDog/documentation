   After this configuration is complete, the library collects security data from your application and sends it to the Agent, which sends it to Datadog, where [out-of-the-box detection rules][202] flag attacker techniques and potential misconfigurations so you can take steps to remediate. 
   
3.  **To see Application Security Management threat detection in action, send known attack patterns to your application**. For example, trigger the [Security Scanner Detected][203] rule by running a file that contains the following curl script:
    <div>
    <pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A dd-test-scanner-log;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A dd-test-scanner-log;<br>done</code></pre></div>

    **Note**: The `dd-test-scanner-log` value is supported in the most recent releases.

    A few minutes after you enable your application and exercise it, **threat information appears in the [Application Signals Explorer][201]** and **vulnerability information appears in the [Vulnerability Explorer][204]**.

[201]: https://app.datadoghq.com/security/appsec
[202]: /security/default_rules/#cat-application-security
[203]: /security/default_rules/security-scan-detected/
[204]: https://app.datadoghq.com/security/appsec/vm/