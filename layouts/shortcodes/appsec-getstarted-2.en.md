   The library collects security data from your application and sends it to the Agent, which sends it to Datadog, where [out-of-the-box detection rules][202] flag attacker techniques and potential misconfigurations so you can take steps to remediate. 
   
1.  **To see Application Security Management threat detection in action, send known attack patterns to your application**. For example, trigger the [Security Scanner Detected][203] rule by running a file that contains the following curl script:
    <div>
    <pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A Arachni/v1.0;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A Arachni/v1.0;<br>done</code></pre></div>

    A few minutes after you enable your application and exercise it, **threat information appears in the [Application Trace and Signals Explorer][201] in Datadog**.

[201]: https://app.datadoghq.com/security/appsec
[202]: /security/default_rules/#cat-application-security
[203]: /security/default_rules/security-scan-detected/
