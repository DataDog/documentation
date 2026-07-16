 이 구성을 완료하면 라이브러리가 애플리케이션에서 보안 데이터를 수집해 에이전트로 전송하고, 이 데이터는 다시 Datadog로 전송됩니다. 그러면 [기본 감지 규칙][202]에 기반해 공격자 기술과 잠재 구성 오류가 플래그되며, 이를 기반으로 문제 해결 단계를 진행할 수 있습니다.

3.  **애플리케이션 보안 관리에서 감지 활동을 잘 하고 있는지 확인하려면 알려진 공격 패턴을 애플리케이션으로 보내세요**. 예를 들어 다음 curl 스크립트가 포함된 파일을 실행해 [보안 스캐너 감지됨][203] 규칙을 트리거할 수 있습니다.
    <div>
    <pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A dd-test-scanner-log;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A dd-test-scanner-log;<br>done</code></pre></div>

    **참고**: `dd-test-scanner-log` 값은 최신 릴리스에서 지원됩니다.

    애플리케이션을 활성화하고 실행한 몇 분 후 **[Application Signals Explorer][201]에서 위협 정보가 표시**되고 **[Vulnerability Explorer][204]에 취약 정보가 표시**됩니다. 

[201]: https://app.datadoghq.com/security/appsec
[202]: /security/default_rules/#cat-application-security
[203]: /security/default_rules/security-scan-detected/
[204]: https://app.datadoghq.com/security/appsec/vm/