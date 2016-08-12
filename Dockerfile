#Datadog nanoc + Jenkins Dockerfile

FROM quay.io/datadog/jenkins-slave
MAINTAINER Ilan Rabinovitch <ilan@datadoghq.com>

# Install depdencies
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y git python-pip nodejs
RUN pip install awscli


COPY Gemfile Gemfile.lock /home/jenkins/
RUN mkdir /cache
RUN chown jenkins:jenkins /home/jenkins/Gemfile /home/jenkins/Gemfile.lock /cache

USER jenkins
WORKDIR /home/jenkins

RUN /bin/bash -l -c "bundle config --global path /cache/"
RUN /bin/bash -l -c "gem install bundler"
RUN /bin/bash -l -c "bundle install"

USER root
