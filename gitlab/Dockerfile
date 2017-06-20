FROM node:alpine

WORKDIR /etc

COPY etc/* ./

# install dependencies
RUN echo "ipv6" >> /etc/modules
RUN apk update && apk add $(grep -vE "^\s*#" deps.txt  | tr "\n" " ") && rm -rf /var/cache/apk/*

# python
RUN pip install --upgrade pip && pip install -r requirements.txt && \
    python3 --version && \
    pip3 install --upgrade pip && \
    pip3 install -r requirements3.txt

# gulp
RUN npm install --global --production gulp-cli && \
    npm install

# install hugo
ENV HUGO_VERSION 0.23
ENV HUGO_BINARY hugo_${HUGO_VERSION}_Linux-64bit
ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /tmp/
RUN  tar -xvzf /tmp/${HUGO_BINARY}.tar.gz -C /tmp/ \
	&& ls /tmp && mv /tmp/hugo_${HUGO_VERSION}_linux_amd64/hugo_${HUGO_VERSION}_linux_amd64 /usr/bin/hugo \
	&& rm -rf /tmp/hugo* && hugo version

# install testing utils
COPY bin/* /usr/local/bin/
