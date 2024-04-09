---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: 블로그
  text: Datadog에서 신서틱 프라이빗 위치로 모니터링하기
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: 첫 API 테스트 만들기
- link: /getting_started/synthetics/browser_test
  tag: 설명서
  text: 첫 브라우저 테스트 만들기
- link: /synthetics/private_locations
  tag: 설명서
  text: 프라이빗 위치 자세히 알아보기
kind: 설명서
title: 프라이빗 위치로 시작하기
---

<div class="alert alert-info">
Windows 개인 위치 베타에 추가하려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 개요

프라이빗 위치를 사용하면 **내부용 애플리케이션의 모니터링**이나, 공용 인터넷에서 액세스할 수 없는 비공개(프라이빗) URL의 모니터링을 수행할 수 있습니다.

{{< img src="getting_started/synthetics/pl-list.png" alt="설정 페이지에 표시된 프라이빗 위치 목록" style="width:100%;">}}

프라이빗 위치는 다음에도 사용할 수 있습니다.

- 비즈니스 핵심 영역에 **커스텀 위치를 생성**합니다.
- [CI/CD 파이프라인에서 신서틱 테스트][1]를 사용하여 실제 환경에 신기능을 출시하기 전에 **내부 테스트 환경에서 애플리케이션 성능을 확인**합니다.
- 내부 네트워크의 내외부에서 **애플리케이션 성능을 비교**합니다.

프라이빗 위치는 프라이빗 네트워크 내 어디서나 설치할 수 있는 Docker 컨테이너입니다. Google Container Registry를 통해 [프라이빗 위치 워커 이미지][2]에 접근할 수 있습니다.

프라이빗 위치를 생성하고 설치한 후에는 관리형 위치(Managed location)와 마찬가지로 [신서틱 테스트][3]를 프라이빗 위치에 할당할 수 있습니다.

프라이빗 위치 테스트 결과는 관리형 위치 테스트 결과와 동일하게 표시됩니다.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="프라이빗 위치에 신서틱 테스트 할당" style="width:100%;">}}

## 프라이빗 위치 만들기

1. [Docker][4]를 유닉스 계열 기계에 설치하거나 [Podman][10]과 같은 다른 컨테이너 런타임을 사용합니다.

   빨리 시작하려면 [Vagrant Ubuntu 22.04][11]와 같은 가상 시스템에 Docker를 설치하세요.

2. Datadog 사이트에서 **[UX Monitoring][5]**에 커서를 올린 다음 **Settings** > **Private Locations**를 선택합니다. 
3. **Add Private Location**를 클릭합니다.
4. 프라이빗 위치 상세 정보를 입력합니다. `Name`과 `API key`는 필수 입력 필드입니다.
5. **Save Location and Generate Configuration File**을 클릭해 워커의 프라이빗 위치와 연관된 설정 파일을 생성합니다.
6. 프라이빗 위치를 어디에 설치하느냐에 따라 설정 파일에 추가 파라미터를 입력해야 할 수 있습니다.
    - 프록시를 사용한다면 URL에 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`를 입력하세요.
    - 예약한 IP를 차단하려면 **Block reserved IPs**를 토글하고 IP 범위를 입력하세요.

    자세한 정보는 [프라이빗 위치 설정 옵션][6] 및 [프라이빗 위치에서 신서틱 테스트 실행하기][7] 가이드를 참고하세요.

7. 프라이빗 위치 설정 파일을 작업 디렉터리에 복사해 붙여넣습니다.

   **참조**: 설정 파일에는 개인 위치 인증, 테스트 설정 복호화, 테스트 결과 암호화 등의 비밀 정보가 포함되어 있습니다. Datadog는 비밀 정보를 저장하지 않으므로, **프라이빗 위치** 생성 양식을 닫기 전에 해당 정보를 로컬로 저장해주세요. **프라이빗 위치에 워커를 추가하려면 이 비밀 정보를 다시 확인할 수 있어야 합니다.**
8. 준비가 되었다면 **View Installation Instructions**를 클릭합니다.
9. 프라이빗 위치 워커를 실행 중인 환경을 바탕으로 설치 안내를 따라주세요.
10. Docker를 사용 중인 경우, Docker `run` 명령과 구성 파일을 사용해 워커를 독립형 컨테이너로 실행하세요.

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    이 명령어는 Docker 컨테이너를 부팅하고 테스트를 수행하기 위한 프라이빗 위치를 준비해줍니다. Datadog는 적절한 재시작 정책으로서 컨테이너를 분리(detached) 모드로 실행하시길 권장합니다.

    <div class="alert alert-info">Podman과 같은 다른 컨테이너 런타임을 사용할 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">개인 위치 설명서</a>를 참고하세요.</div>

11. 프라이빗 위치에서 Datadog로 정확하게 보고한다면 건전성 상태가 **Private Location Status** 및 **Settings** 페이지의 **Private Locations** 에서 `OK`로 표시됩니다.

    {{< img src="synthetics/private_locations/pl_health.png" alt="프라이빗 위치 건전성" style="width:100%;">}}

    또, 프라이빗 위치 로그를 터미널에서 확인할 수 있습니다.

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
12. 내부 엔드포인트 테스트를 완료했다면 **OK**를 클릭하세요.



## 프라이빗 위치에서 신서틱 테스트 실행하기

관리형 위치와 마찬가지로, 신서틱 테스트에서 새 프라이빗 위치를 사용할 수 있습니다.

1. 모니터링하고자 하는 내부 엔드포인트나 애플리케이션에서 [API 테스트][2], [멀티스텝 API 테스트][8], 또는 [브라우저 테스트][9]를 생성하세요.
2. **Private Locations**에서 새 프라이빗 위치를 선택합니다.

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="프라이빗 위치에 신서틱 테스트 할당" style="width:100%;">}}

3. 계속 테스트 상세 정보를 입력하시면 됩니다!

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /ko/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /ko/synthetics/private_locations/configuration/#configuration-options
[7]: /ko/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /ko/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /ko/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64