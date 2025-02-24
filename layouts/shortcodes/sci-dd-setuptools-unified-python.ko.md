setuptools로 애플리케이션이 패키지된 경우:

1. [`dd-trace` 패키지](https://github.com/DataDog/dd-trace-py)를 설치하세요.
1. `setup.py` 파일에 처음으로 가져올 항목으로 `import ddtrace.sourcecode.setuptools_auto`를 추가하세요.
1. 환경 변수 `DD_MAIN_PACKAGE`를 주 Python 패키지 이름으로 설정하세요.

애플리케이션이 통일된 Python 프로젝트 설정 파일을 사용하는 경우:

1. `hatch-datadog-build-metadata` 플러그인을 설치하고 git 메타데이터를 포함하도록 구성하세요. 프로젝트에 이미 URL이 있는 경우 동적이 되도록 재구성하고 다른 구성 섹션으로 옮기세요. 자세한 정보는 [플러그인 소스 코드](https://github.com/DataDog/hatch-datadog-build-metadata#readme)를 참고하세요.
1. 환경 변수 `DD_MAIN_PACKAGE`를 주 Python 패키지 이름으로 설정하세요.
