호스트 또는 컨테이너에 설치된 Datadog 에이전트 버전 `7.46` 이상.

### CSM 취약성

| 구성 요소                | 버전/요구 사항                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][102]            | v3.49.6 이상(쿠버네티스(Kubernetes) 전용)      |
| [containerd][103]              | v1.5.6 이상(쿠버네티스(Kubernetes) 및 호스트 전용)|

**참고**: CSM 취약성은 다음 환경에서 사용할 수 **없습니다**.

  - 윈도우즈(Windows)
  - AWS Fargate 
  - CRI-O 런타임
  - podman 런타임

[102]: /containers/kubernetes/installation/?tab=helm
[103]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/