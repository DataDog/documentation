   The library collects security data from your application and sends it to the Agent, which sends it to Datadog, where [out-of-the-box detection rules][202] flag attacker techniques and potential misconfigurations so you can take steps to remediate. 
   
1.  **To see Application Security threat detection in action, send known attack patterns to your application**. The *Security Scanner Detected* rule features three cases:

      - INFO / Random scan
      - LOW / Real routes targeted
      - MEDIUM / HTTP 5xx server error triggered

      Trigger this rule by running the following curl script:
      ```
      for ((i=1;i<=200;i++)); 
      do
      # Target existing service’s routes
      curl https://your-application-url/existing-route -A Arachni/v1.0;
      # Target non existing service’s routes
      curl https://your-application-url/non-existing-route -A Arachni/v1.0;
      Done
      ```

      <div class="alert alert-info"><p><strong>Note</strong>: The <code>Arachni/v1.0</code> user-agent is likely to be blocked by a web application firewall sitting in front of the web application. If this happens, use the built-in <code>dd-test-scanner-log</code> canary rule.</p>
      <pre><code>for ((i=1;i<=200;i++)); <br>do<br># Target real routes<br>curl https://your-application-url existing-route -A 'dd-test-scanner-log';<br># Target non existing paths<br>curl https://your-application-url/non-existing-route -A 'dd-test-scanner-log';<br>done   </code></pre></div>

      A few minutes after you enable your application and exercise it, **threat information appears in the [Application Security page][201] in Datadog**.

[201]: https://app.datadoghq.com/security/appsec
[202]: /security_platform/default_rules/#cat-application-security
