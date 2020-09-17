FROM debian:10.5

RUN apt-get update && \
    apt-get install -y curl git hugo \
    python3-dev python3-pip python3-venv python3-wheel

# install node and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs


WORKDIR /docs
CMD ["make", "start-no-pre-build"]
